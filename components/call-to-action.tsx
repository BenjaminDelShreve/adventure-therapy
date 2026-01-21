import { Button } from "@/components/ui/button"
import Image from "next/image"

export function CallToAction() {
  return (
    <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background image with opacity */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/group-snow-hike.jpg"
          alt=""
          fill
          className="object-cover opacity-30"
          priority={false}
        />
      </div>
      <div className="relative z-10 container mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-at-dark-green sm:text-4xl lg:text-5xl">
          Are You Ready?
        </h2>
        <div className="mt-6 flex items-center justify-center">
          <Button size="lg" className="bg-at-orange text-at-dark-green hover:bg-at-orange/90 shadow-2xl border-[3px] border-at-dark-green font-bold text-sm sm:text-base px-6 sm:px-8 py-3 drop-shadow-lg [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]">
            Get Started
          </Button>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed font-semibold text-at-dark-green drop-shadow-lg [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]">
          find out if you qualify for an adventure scholarship
        </p>
      </div>
    </section>
  )
}
