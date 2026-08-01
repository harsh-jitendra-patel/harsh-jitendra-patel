import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harsh Patel | Lead Software Engineer & Full-Stack Engineer",
  description:
    "Lead Software Engineer with 11+ years of experience building scalable enterprise applications with .NET Core, Angular, Python, Node.js, Azure, and AI-driven workflows.",
  keywords: [
    "Lead Software Engineer",
    "Full-Stack Developer",
    ".NET Core",
    "Angular",
    "Python",
    "TypeScript",
    "JavaScript",
    "Microsoft Azure",
    "Microservices",
    "Bengaluru",
    "Software Architect"
  ],
  authors: [{ name: "Harsh Patel" }],
  openGraph: {
    title: "Harsh Patel | Lead Software Engineer & Full-Stack Engineer",
    description:
      "Building scalable enterprise applications, high-performance microservices, and AI-driven workflows across .NET Core, Angular, Python, Node.js and Microsoft Azure.",
    type: "website",
    locale: "en_US",
    siteName: "Harsh Patel Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Patel | Lead Software Engineer",
    description:
      "Building scalable enterprise applications with .NET Core, Angular, Python, Node.js and Azure.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased transition-colors duration-300">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("hp_loader_seen")){document.documentElement.classList.add("loader-seen")}}catch(e){}`,
          }}
        />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
