import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Tahir Mustafa | Software Engineer",
  description:
    "Full-Stack Developer specializing in React, Next.js, Node.js, Flutter, and Web3/Blockchain technologies. Building cutting-edge web and mobile applications.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
