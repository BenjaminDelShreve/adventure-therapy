import Image from "next/image"

const values = [
  {
    title: "Evidence-Based",
    description:
      "We use proven therapeutic methods backed by research, combined with the natural benefits of outdoor activity.",
  },
  {
    title: "Safety First",
    description:
      "Physical and emotional safety are our top priorities. All staff are trained in wilderness medicine and trauma-informed care.",
  },
  {
    title: "Person-Centered",
    description: "Your goals guide the work. We meet you where you are and move at a pace that feels right for you.",
  },
  {
    title: "Experienced Guides",
    description:
      "Our team includes licensed therapists and certified outdoor educators who bring both clinical expertise and wilderness skills.",
  },
]

export function OurApproach() {
  return (
    <section id="about" className="bg-background py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-at-dark-green sm:text-4xl lg:text-5xl">
              About Us
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-foreground/80">
              We created Adventure Therapy because we've lived the struggles—veterans & first responders, partners, and
              people in recovery. Adventure became our lifeline, helping us heal, grow, and reconnect. Now, we share that
              path with others, guiding adventures that restore hope, resilience, and joy.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg">
            <Image
              src="/images/founders2.jpg"
              alt="Adventure Therapy founders"
              width={800}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="overflow-hidden rounded-lg">
            <Image
              src="/images/kilimanjaro-hiker.webp"
              alt="Adventure Therapy founder at Kilimanjaro National Park"
              width={800}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-at-dark-green sm:text-4xl lg:text-5xl">
              Jessy Davis
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-foreground/80">
              Jessy served 6 years in the Arkansas Army National Guard. She is also a volunteer Firefighter and Emergency
              Medical Responder. Jessy struggled with alcohol abuse for 10 years but has been sober for 5. Adventure
              became her lifeline when she stopped drinking and now it's her mission to empower others through the healing
              power of nature and adventure.
            </p>
          </div>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="overflow-hidden rounded-lg">
            <Image
              src="/images/CDAVIS_SURF.jpeg"
              alt="Chris surfing on a wave"
              width={800}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-at-dark-green sm:text-4xl lg:text-5xl">
              Chris Davis
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-foreground/80">
              Chris served 25 years in the Arkansas Army National Guard. He also served Northwest Arkansas as an EMT,
              Firefighter and Paramedic. Chris has suffered from PTSD, depression and substance abuse for over half of his
              life. Since getting sober 3 years ago, Adventure has unlocked a second chance at life and a desire to share
              his testimony with others.
            </p>
          </div>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:gap-12">
          {values.map((value) => (
            <div key={value.title} className="space-y-3">
              <h3 className="text-xl font-bold text-at-dark-green">{value.title}</h3>
              <p className="leading-relaxed text-foreground/80">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
