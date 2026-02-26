import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { AppShell } from "@/components/layout/AppShell";

// ─── Font Setup ─────────────────────────────────────────────

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

// ─── Metadata ───────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: "SyncUp — Job Dashboard",
    template: "%s | SyncUp",
  },
  description:
    "Your professional networking and job tracking platform. Track applications, discover opportunities, and connect with your network.",
  keywords: ["jobs", "networking", "career", "dashboard", "applications"],
  icons: "/favicon.png",
};

// ─── Viewport ───────────────────────────────────────────────

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// ─── Root Layout ────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} `}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}