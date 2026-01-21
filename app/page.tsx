import { Hero } from "@/components/hero"
import { WhatIsAdventureTherapy } from "@/components/what-is-adventure-therapy"
import { WhoItsFor } from "@/components/who-its-for"
import { Programs } from "@/components/programs"
import { AdventureExample } from "@/components/adventure-example"
import { OurApproach } from "@/components/our-approach"
import { CallToAction } from "@/components/call-to-action"

export default function Home() {
  return (
    <>
      <Hero />
      <WhatIsAdventureTherapy />
      <WhoItsFor />
      <Programs />
      <AdventureExample />
      <OurApproach />
      <CallToAction />
    </>
  )
}
