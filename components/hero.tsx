"use client"

import { useState } from "react"
import { HeroBackgroundCarousel } from "@/components/HeroBackgroundCarousel"

// Bright images that need enhanced text contrast
const BRIGHT_IMAGES = ["/images/snow-river.jpg", "/images/kayaking.png"]

export function Hero() {
  const [activeImagePath, setActiveImagePath] = useState<string>("")
  const isBrightImage = activeImagePath && BRIGHT_IMAGES.includes(activeImagePath)

  return (
    <section className="relative min-h-[600px] overflow-hidden text-white sm:min-h-[700px] lg:min-h-[800px]">
      <HeroBackgroundCarousel onActiveImageChange={setActiveImagePath} />
      <div className="relative z-20 container mx-auto max-w-7xl px-4 pt-6 pb-24 sm:px-6 sm:pt-8 sm:pb-32 lg:px-8 lg:pt-10 lg:pb-40">
        <div className="max-w-3xl">
          <h1
            className={`text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl transition-[font-weight,filter,text-shadow] duration-200 ease-in-out ${
              isBrightImage ? "font-black drop-shadow-2xl [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]" : ""
            }`}
          >
            Adventure Therapy
          </h1>
          <p
            className={`mt-3 text-pretty text-xl text-white sm:text-2xl transition-[font-weight,filter,text-shadow] duration-200 ease-in-out ${
              isBrightImage ? "font-semibold drop-shadow-xl [text-shadow:0_2px_6px_rgba(0,0,0,0.7)]" : ""
            }`}
          >
            more than just a trip...
          </p>
          <p
            className={`mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white sm:text-xl transition-[font-weight,filter,text-shadow] duration-200 ease-in-out ${
              isBrightImage ? "font-medium drop-shadow-lg [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]" : ""
            }`}
          >
            Evidence-based therapy programs that combine professional mental health support with transformative outdoor
            experiences. Find clarity, build resilience, and reconnect with yourself.
          </p>
        </div>
      </div>
    </section>
  )
}
