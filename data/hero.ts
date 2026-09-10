import { Github, Linkedin, Mail, type LucideIcon } from "lucide-react";

export const greeting = "<Hello World />";

export const name = {
  prefix: "I'm ",
  highlight: "Tahir Mustafa",
};

export const roles = [
  "Full-Stack Developer",
  "Web3 Enthusiast",
  "Flutter Developer",
  "Blockchain Explorer",
];

export const description =
  "Bringing visions to life through code and creativity. I design and develop " +
  "cutting-edge web and mobile applications that prioritize user experience " +
  "and technical excellence. Whether it's exploring new technologies or refining " +
  "the details, every line of code is written with purpose and passion.";

export const ctaButtons = {
  primary: {
    label: "View Projects",
    href: "#projects",
    arrow: "→",
  },
  secondary: {
    label: "Download Resume",
    href: "/Tahir-Software-Engineer-CV.pdf",
    download: "Tahir_Mustafa_Resume.pdf",
  },
};

export interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

export const socialLinks: SocialLink[] = [
  {
    icon: Github,
    href: "https://github.com/TahirMustafa-NO-ONE",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/tahir-mustafa-2b385b2b9",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:tahirmustafa161123@gmail.com",
    label: "Email",
  },
];

export const avatar = {
  src: "/profile-avatar4.png",
  alt: "Tahir Mustafa",
  fullAlt: "Tahir Mustafa - Full Size",
  dialogTitle: "Profile Picture",
};

export const scrollIndicatorLabel = "SCROLL";
