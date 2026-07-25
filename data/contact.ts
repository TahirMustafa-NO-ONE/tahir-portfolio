import { Mail, MapPin, Phone, Github, Linkedin, type LucideIcon } from "lucide-react";

export const sectionLabel = "06. CONTACT";

export const heading = {
  prefix: "Let's ",
  highlight: "Connect",
};

export const description =
  "Have a project in mind or just want to say hello? I'd love to hear from you. " +
  "Let's build something amazing together!";

export interface ContactInfoItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}

export const contactInfo: ContactInfoItem[] = [
  {
    icon: Mail,
    label: "Email",
    value: "tahirmustafa161123@gmail.com",
    href: "mailto:tahirmustafa161123@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+92 319 429 1096",
    href: "tel:+923194291096",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Lahore, Punjab, Pakistan",
    href: "#",
  },
];

export interface SocialLink {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/TahirMustafa-NO-ONE",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/tahir-mustafa-2b385b2b9",
  },
];

export const socialPrompt = "Or find me on social media:";

export const emailConfig = {
  publicKey: "y_FfAKnBYkrIr_t3v",
  serviceId: "service_portfolio_gmail",
  templateId: "template_portfolio_conta",
  logEndpoint: "/api/logs",
  logSource: "ContactSection - EmailJS",
};

export const toastMessages = {
  missingFields: {
    title: "Missing fields",
    description: "Please fill in all fields before sending.",
  },
  success: {
    title: "Message sent!",
    description: "Thanks for reaching out. I'll get back to you soon!",
  },
  failure: {
    title: "Failed to send message",
    fallbackDescription:
      "Something went wrong. Please try again or contact me directly.",
  },
};

export const formFields = {
  name: {
    label: "Your Name",
    placeholder: "John Doe",
  },
  email: {
    label: "Your Email",
    placeholder: "john@example.com",
  },
  message: {
    label: "Your Message",
    placeholder: "Tell me about your project or just say hi...",
  },
};

export const submitButton = {
  idleLabel: "Send Message",
  sendingLabel: "Sending...",
};