import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { isClerkConfigured } from "@/lib/env";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgriConnect | Connect Kenyan Produce with Buyers",
  description: "Discover available agricultural produce and connect Kenyan farmers with buyers.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        {isClerkConfigured() ? (
          <ClerkProvider>
            <SiteHeader clerkEnabled />
            {children}
            <SiteFooter />
          </ClerkProvider>
        ) : (
          <>
            <SiteHeader clerkEnabled={false} />
            {children}
            <SiteFooter />
          </>
        )}
      </body>
    </html>
  );
}
