import { Card } from "@/components/ui/card"
import Image from "next/image"

export function WhoItsFor() {
  return (
    <section id="who" className="bg-muted py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <Card className="border-border bg-card p-8 sm:p-10 lg:p-12">
            <h3 className="text-2xl font-bold text-at-blue">THE WHY</h3>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/80">
              <p>
                The statistics are alarming and it's no secret that the mental and physical health of Americans has been
                on a declining trend for far too long. While we are just now starting to see politicians and government
                officials take notice, the amount of work required to reverse the trends is daunting.
              </p>
              <p>
                Throughout our years of healing, growth and sobriety - we've found a set of experiences to be
                immeasurably powerful for our wellbeing. And we have decided to make it our life's work to share these
                tools with others like us - people who crave connection, inspiration, better physical and mental health,
                and an adventure of a lifetime.
              </p>
            </div>
            <div className="mt-8">
              <Image
                src="/images/the-why-statistics.png"
                alt="Mental health statistics for Veterans and First Responders"
                width={1500}
                height={800}
                className="w-full rounded-lg"
              />
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
