export interface Certification {
  id: number;
  title: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  badge: string;
  skills: string[];
  description: string;
}

export const certifications: Certification[] = [
  {
    id: 1,
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM SkillsBuild",
    issueDate: "july 17, 2026", 
    credentialId: "CREDLY-29bdaec3-af04-458e-a70e-2e6fa78c5dd5",
    credentialUrl:
      "https://www.credly.com/badges/a1b8456c-ae18-49ac-95a9-136bc4f898dc/public_url",
    badge: "/certifications/AIF.png",
    skills: [
      "Artificial Intelligence",
      "AI Applications",
      "AI Capabilities",
      "AI Ethics",
      "Artificial Neural Networks",
      "Chatbots",
      "Computer Vision",
      "Deep Learning",
      "Machine Learning",
      "Natural Language Processing",
      "Watson Studio",
    ],
    description:
      "Demonstrates foundational knowledge of Artificial Intelligence, including natural language processing, computer vision, machine learning, deep learning, chatbots, neural networks, AI ethics, and the use of IBM Watson Studio to build AI models. Covers essential AI concepts, real-world applications, and career-ready skills.",
  },
];