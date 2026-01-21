import Image from "next/image"

export function AdventureExample() {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-at-dark-green sm:text-4xl lg:text-5xl text-center mb-12">
          Adventure Example
        </h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg leading-relaxed text-foreground/80 mb-8">
            Most curated adventures will consist of either five or six days - depending on the activities. Each adventure will include a water activity, a biking excursion and a semi-challenging hike. Participants can expect a version of the following itinerary:
          </p>
          
          <div className="space-y-6 mb-12">
            <div>
              <h3 className="font-bold text-at-dark-green text-xl mb-2">Day 1: Travel to Destination; intro briefing at dinner</h3>
            </div>
            
            <div>
              <h3 className="font-bold text-at-dark-green text-xl mb-2">Day 2: Water Day (any of the following)</h3>
              <ul className="list-disc list-inside ml-4 space-y-1 text-foreground/80">
                <li>Kayaking</li>
                <li>White Water Rafting</li>
                <li>Paddle Boarding</li>
                <li>Boating & Tubing</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-at-dark-green text-xl mb-2">Day 3: E-Bike Day</h3>
              <p className="text-foreground/80 ml-4">(moderate; warm up muscles for the following day)</p>
            </div>
            
            <div>
              <h3 className="font-bold text-at-dark-green text-xl mb-2">Day 4: Hike Day</h3>
              <p className="text-foreground/80 ml-4">(may be two days depending on distance & elevation)</p>
            </div>
            
            <div>
              <h3 className="font-bold text-at-dark-green text-xl mb-2">Day 5: Travel to Home</h3>
            </div>
          </div>

          <div className="mb-12 space-y-6">
            <p className="text-lg leading-relaxed text-foreground/80">
              Each adventure will be led by trained and qualified Coaches.
            </p>
            <p className="text-lg leading-relaxed text-foreground/80">
              At least one Coach on every adventure will be certified in BCLS (Basic Cardiac Life Support) which includes CPR (cardiac pulmonary resuscitation) and EMR (Emergency Medical Responder) as a minimum.
            </p>
            <p className="text-lg leading-relaxed text-foreground/80">
              Adventurers will be provided with preparation practices and training plans leading up to the excursion; periodic group calls will also be implemented.
            </p>
            <p className="text-lg leading-relaxed text-foreground/80">
              (Almost) everything is provided: gear, nutrition, lodging and guidance. The adventures are fully and carefully curated - just bring your clothes, willingness and best effort!
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 mt-12">
            <div className="overflow-hidden rounded-lg">
              <Image
                src="/images/rafting.png"
                alt="White water rafting adventure"
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <Image
                src="/images/group-hike-steep.jpg"
                alt="Group hiking on steep terrain"
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <Image
                src="/images/jessy-mountain-top.jpg"
                alt="Jessy at mountain top"
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

