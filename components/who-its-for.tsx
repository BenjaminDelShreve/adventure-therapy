import { Card } from "@/components/ui/card"
import Image from "next/image"

export function WhoItsFor() {
  return (
    <section id="who" className="bg-muted py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-at-dark-green sm:text-4xl lg:text-5xl">
            Who is Adventure Therapy for?
          </h2>
          <h3 className="mt-8 text-2xl font-bold text-at-dark-green">HEROES</h3>
          <p className="mx-auto mt-4 max-w-3xl text-pretty text-lg leading-relaxed text-foreground/80">
            We empower Veterans and First Responders by providing outdoor adventures and group activities in nature that
            promote healing, resilience, and camaraderie. Through challenging and restorative experiences in the great
            outdoors, we foster mental and physical well-being, strengthen community connections, and support the
            transition to a healthier, purpose-driven life. We are committed to honoring those who have served by
            offering a space for growth, adventure, and renewal.
          </p>
        </div>
        <div className="mt-16">
          <Card className="border-border bg-card p-8 sm:p-10 lg:p-12">
            <h3 className="text-2xl font-bold text-at-dark-green">
              Qualifying Applicants Must Be (Active or Retired):
            </h3>
            <ul className="mt-6 space-y-3 text-lg leading-relaxed text-foreground/80">
              <li className="flex items-start">
                <span className="mr-3 text-at-orange">•</span>
                <span>U.S. Military Veteran or Active Duty</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-at-orange">•</span>
                <span>Firefighter</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-at-orange">•</span>
                <span>Law Enforcement</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-at-orange">•</span>
                <span>EMT/Paramedic</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-at-orange">•</span>
                <span>Public Safety Dispatcher</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-at-orange">•</span>
                <span>Emergency Room Personnel</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-at-orange">•</span>
                <span>At least 18 years of age</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-at-orange">•</span>
                <span>Not have any convictions or pending convictions that are violent in nature</span>
              </li>
            </ul>
          </Card>
        </div>
        <div className="mt-16">
          <Card className="border-border bg-card p-8 sm:p-10 lg:p-12">
            <h3 className="text-2xl font-bold text-at-dark-green">THE WHY</h3>
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
