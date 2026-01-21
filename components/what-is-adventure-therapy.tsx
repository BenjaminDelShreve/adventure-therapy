export function WhatIsAdventureTherapy() {
  return (
    <section id="what" className="py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-at-dark-green sm:text-4xl lg:text-5xl">
              Our Mission
            </h2>
            <div className="mt-6 space-y-4 text-pretty leading-relaxed text-foreground/80">
              <p>
                At Adventure Therapy, our mission is to ignite the spirit of adventure within everyone. We believe that
                the great outdoors is the ultimate playground, where nature's beauty and adrenaline come together to
                create unforgettable experiences. Our carefully curated adventures foster camaraderie and exploration,
                bringing together like-minded adventurers to share moments that will be cherished for a lifetime.
              </p>
              <p>
                We curate worry-free adventures that blend outdoor exploration, physical activity, holistic wellness
                practices, and guided conversations—creating space for healing, growth, and belonging. By combining
                nature's proven impact on mental health with the strength of human connection, we empower veterans,
                couples, and those in recovery to build healthier lives, cultivate resilience, and rediscover joy.
              </p>
              <p>
                Our purpose is simple yet profound: to turn struggle into strength, and to help every participant return
                home not just with memories of adventure, but with tools for lasting well-being.
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg">
            <img
              src="/images/teamwork.png"
              alt="Outdoor therapy session"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
