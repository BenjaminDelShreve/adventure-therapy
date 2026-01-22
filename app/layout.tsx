import type React from "react"
import type { Metadata } from "next"
import { Open_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import "./globals.css"

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://adventure-therapy.vercel.app')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Adventure Therapy | Healing Through Nature",
  description:
    "Evidence-based outdoor therapy programs combining wilderness experiences with professional mental health support.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Adventure Therapy | Healing Through Nature",
    description:
      "Evidence-based outdoor therapy programs combining wilderness experiences with professional mental health support.",
    type: "website",
    images: [
      {
        url: "/images/og-adventure-therapy.jpg",
        width: 1200,
        height: 630,
        alt: "Adventure Therapy - Healing Through Nature",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adventure Therapy | Healing Through Nature",
    description:
      "Evidence-based outdoor therapy programs combining wilderness experiences with professional mental health support.",
    images: ["/images/og-adventure-therapy.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={openSans.variable}>
      <body className="font-sans antialiased">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
