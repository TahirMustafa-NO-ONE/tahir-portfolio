# Portfolio AI Chatbot — Architecture & Design

**Analysis based on:** HeroSection, AboutSection, SkillsSection, ExperienceSection, ProjectsSection, ContactSection, TechStackSection

No implementation code below — this is the design decision phase, as requested.

---

## 1. What's actually in the data (and what isn't)

| Section | Chatbot-relevant facts | Notes |
|---|---|---|
| Hero | Name, 4 role titles, one-paragraph tagline | Mostly presentational (animations, avatar) — low knowledge density |
| About | Bio paragraphs, degree, 4 "highlight" areas | Good source for "tell me about yourself" |
| Skills | 5 categories, ~40 technologies | Structured array already — easiest to reuse as-is |
| Experience | 1 education entry + 2 project-as-experience entries | You have no traditional job history in the data; the bot should say so if asked "where have you worked full-time" rather than implying otherwise |
| Projects | 7 projects: title, subtitle, description, tech[], github/live links, featured/comingSoon | Richest section — most "explain project X" / "compare X and Y" questions come from here |
| Contact | Email, phone, location, GitHub, LinkedIn | Simple lookup table |
| TechStack | Logo list, mostly a visual duplicate of Skills | Not a new data source — skip it in the context builder to avoid double-counting technologies |

**Gap:** Certifications, Achievements, and Services sections mentioned in your brief don't exist in these 7 files. Design the schema (below) with optional fields for these now, so adding them later is a data change, not a rebuild.

---

## 2. Architecture decision: static context injection (not RAG)

| Approach | Fit for this portfolio | Why |
|---|---|---|
| **Static prompt/context injection** | ✅ Recommended | Your entire knowledge base — bio, skills, 7 projects, timeline, contact — is roughly 1,500–3,000 tokens as compact JSON. That fits comfortably in a system prompt on *every* request with room to spare. |
| RAG / embeddings / vector DB | ❌ Overkill | RAG earns its cost when the corpus is too large to fit in context (dozens of long documents, a blog archive, etc.) or when retrieval accuracy across large content matters. At ~10 structured records, RAG adds infrastructure (embedding pipeline, vector store, retrieval logic, cache invalidation) for zero practical benefit and can occasionally *hurt* answer quality (imperfect retrieval on a small corpus vs. just handing over everything). |
| JSON search (keyword/fuzzy match) | ❌ Unnecessary layer | Same reasoning — the "search" step is solving a problem you don't have yet. |
| Function calling | 🟡 Optional, not required | Could be used for the "recommend project by interest" case, but you can get equivalent behavior just by describing that capability in the system prompt, since the model already has full project data. Only worth adding if you want deterministic, non-LLM-decided filtering logic (e.g., a hard rule "if user mentions 'Docker' return Smith CRM"). |
| Hybrid | 🟡 Future-proofing only | Reasonable next step *if* the portfolio grows to 30+ projects or gains long blog-style content. Not justified today. |

**Bottom line:** one system prompt built from a structured content object, regenerated at build time, sent whole with every chat request. Revisit RAG only if the content volume grows roughly 5–10x.

---

## 3. Technology stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js App Router (already in use) | No change needed |
| API | Next.js Route Handler (`app/api/chat/route.ts`) | You already have at least one API route (`/api/logs` in ContactSection), confirming the site isn't a fully static export — a streaming chat route fits the same deployment model |
| AI SDK | Vercel AI SDK (`ai` package) + `useChat` hook | Handles streaming, message state, and abort/cancel out of the box — avoids hand-rolling SSE parsing |
| Model provider | OpenAI or Anthropic via their respective AI SDK provider package | Either works with the AI SDK identically; pick based on cost/quality preference, not architecture |
| LangChain | ❌ Skip | Adds abstraction for chaining/retrieval you don't need at this scale — the AI SDK alone covers streaming + tool calls |
| Embeddings / vector DB | ❌ Skip (see §2) | — |
| State | React state via `useChat`, no external store needed | Single session, no persistence requirement stated |

---

## 4. Data processing: the context builder

Goal: **one source of truth, zero duplication.** Instead of copying strings out of your components into a separate chatbot file, extract the existing arrays (`highlights`, `skillCategories`, `timeline`, `projects`, `contactInfo`) into a shared `data/portfolio.ts` module that both the UI components *and* the chatbot import.

Suggested normalized shape (structure only, not full implementation):

```
PortfolioContext {
  identity: { name, taglineRoles[], summary }
  about: { bioParagraphs[], highlights[] }
  skills: { category, items[] }[]
  experience: { type: "education" | "project", title, org, date, description }[]
  projects: { title, subtitle, description, tech[], links, featured, comingSoon }[]
  contact: { email, phone, location, social[] }
  // reserved for future data, currently empty:
  certifications: []
  achievements: []
  services: []
}
```

A build-time (or request-time, since it's cheap) function serializes this into a compact plain-text or JSON block for the system prompt — not a copy of the React JSX, just the factual fields (title/description/tech/links), stripped of icons, animation config, and styling.

---

## 5. Chatbot features mapped to data

| Feature | Data source | Notes |
|---|---|---|
| "Tell me about yourself" | About + Hero | Straightforward summary |
| "What technologies do you use" | Skills (TechStack is redundant, skip) | |
| Project explanation / comparison | Projects | Model can compare directly from the 7 project objects |
| "Which project uses Docker" | Skills doesn't list Docker per-project, only globally — **check your `projects[].tech` arrays; none currently list "Docker" explicitly.** The bot should say it can't confirm rather than guess. This is a good real test case for the no-hallucination guardrail. |
| Freelance availability | Not present anywhere in the data | Bot must say this isn't specified rather than invent an answer — flag as a config value you may want to add explicitly (e.g., `identity.availableForWork: true/false`) |
| Contact guidance | Contact | Direct lookup |
| "Learning roadmap" | Not present | Same as above — either add a field or have the bot decline gracefully |

This table is useful as a test checklist once built: the freelance-availability and "learning roadmap" questions are good adversarial prompts to verify your guardrails actually hold instead of the model improvising something plausible-sounding.

---

## 6. Guardrails (system prompt design)

The system prompt should state, roughly:
- Identity: "You are an assistant representing Tahir Mustafa on his portfolio site."
- Scope: answer only from the supplied context block.
- Explicit instruction: if asked something not covered (availability, rates, unlisted skills, opinions on unrelated topics), say so plainly rather than inferring.
- Tone: professional, concise, first person ("I built..." on Tahir's behalf) or third person — pick one and be consistent.
- Redirect off-topic questions (general coding help, unrelated trivia) back to portfolio-relevant territory politely.

Practically, this is enforced by prompt wording plus keeping the context block as the *only* factual input — there's no retrieval step to bypass, so hallucination risk is already lower than a general-purpose assistant.

---

## 7. UI integration

- Floating action button, bottom-right, consistent with your existing `glow-primary` / `card-hover` visual language already used across sections
- Expandable panel (not full-screen) — fits the single-page portfolio feel
- Streaming text via `useChat`'s built-in token-by-token rendering
- Typing indicator during the gap before first token
- 4–6 suggested prompt chips on first open (e.g., "Tell me about your projects," "What's your tech stack?") — reduces blank-input friction
- Auto-scroll to latest message
- Respect existing dark/light mode via your current CSS variables (`bg-card/30`, `border-border/50`, etc. — reuse rather than reinvent)
- Keyboard accessible: focus trap while open, Escape to close, ARIA live region for streamed responses

---

## 8. Performance

- System prompt built once from structured data (not re-derived from JSX at runtime) — keep it as a small serialized string, target under ~1,500 tokens
- No conversation history sent beyond the current session (no persistence requirement stated) — keeps per-request token cost flat
- Since the whole context fits in one system prompt, there's no retrieval latency to optimize — the main performance lever is model choice (a smaller/faster model is plenty for this scope)

---

## 9. Folder structure

```
app/
  api/
    chat/route.ts          — streaming chat endpoint
data/
  portfolio.ts             — single source of truth (shared with UI components)
lib/
  ai/
    system-prompt.ts       — builds the system prompt string from data/portfolio.ts
  context/
    serialize.ts           — converts structured data → compact prompt text
components/
  chat/
    ChatWidget.tsx          — floating button + panel
    ChatMessage.tsx
    SuggestedPrompts.tsx
types/
  portfolio.ts             — shared TypeScript types for the schema in §4
```

- `data/` — the factual content, reused by both UI sections and the bot
- `lib/ai/` — prompt construction, kept separate from `lib/context/` (which is pure data shaping) so prompt wording changes don't touch data logic
- No `lib/parser/` needed given the small, already-structured source data — that folder only earns its place if you're scraping unstructured content later

---

## 10. Implementation plan

1. Extract `highlights`, `skillCategories`, `timeline`, `projects`, `contactInfo` into `data/portfolio.ts`, typed per §4 — update existing components to import from there instead of local arrays (removes duplication immediately)
2. Add empty `certifications`, `achievements`, `services` arrays now so the schema doesn't need to change later
3. Write `lib/context/serialize.ts` to turn the data object into a compact text block
4. Write `lib/ai/system-prompt.ts` combining the serialized context with the guardrail instructions from §6
5. Build `app/api/chat/route.ts` using the AI SDK's `streamText`, passing the system prompt + user messages
6. Build `ChatWidget.tsx` with `useChat`, styled to match existing design tokens
7. Add suggested-prompt chips and typing indicator
8. Manual test pass against the feature table in §5, specifically the two "no data available" cases (Docker-per-project, freelance availability) to confirm the guardrail holds instead of hallucinating
9. Deploy on Vercel (no special config beyond the existing setup, since `/api/logs` already proves API routes work in your deployment)
10. Future: if the portfolio grows substantially (blog, many more projects, longer case studies), revisit RAG/embeddings at that point — not before

---

## 11. Security & scalability notes

- Keep the API key server-side only, inside the route handler — never exposed to the client
- Rate-limit the `/api/chat` route (simple IP or session-based throttle) since it's publicly reachable and each request costs API tokens
- Since the assistant only ever answers from a fixed, non-user-supplied context, prompt injection risk is lower than a general chatbot, but still sanitize/cap user message length to avoid abuse (e.g., someone pasting huge text to run up token costs)
- Scalability path: this architecture scales fine content-wise until context size becomes unwieldy; traffic-wise, it scales the same way any serverless Next.js API route does — no bot-specific bottleneck introduced