import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteShell } from "@/components/site-shell";
import { readSiteSettings } from "@/lib/data/site-data.server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "Algerian Badminton Federation — ABF",
    template: "%s — ABF",
  },
  description: "Official website of the Algerian Badminton Federation (ABF / FABA).",
  authors: [{ name: "ABF" }],
  openGraph: {
    title: "Algerian Badminton Federation — ABF",
    description: "Official website of the Algerian Badminton Federation (ABF / FABA).",
    type: "website",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4c38d646-25fe-43de-9e55-1a1891561278/id-preview-712e0696--1d08eef1-d21f-4799-93c4-cca274e7136b.lovable.app-1780385714549.png",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Algerian Badminton Federation — ABF",
    description: "Official website of the Algerian Badminton Federation (ABF / FABA).",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await readSiteSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&family=Cairo:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-svh antialiased">
        <Providers initialSettings={settings}>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
