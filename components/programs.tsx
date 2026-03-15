import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const programs = [
  {
    name: "HEROES",
    duration: "Veterans & First Responders",
    image: "/images/heroes (1).JPG",
    imageAlt: "Heroes program participants",
    description:
      "We empower Veterans and First Responders by providing outdoor adventures and group activities in nature that promote healing, resilience, and camaraderie. Through challenging and restorative experiences in the great outdoors, we foster mental and physical well-being, strengthen community connections, and support the transition to a healthier, purpose-driven life. We are committed to honoring those who have served by offering a space for growth, adventure, and renewal.",
    features: [
      "U.S. Military Veteran or Active Duty",
      "Firefighter",
      "Law Enforcement",
      "EMT/Paramedic",
      "Public Safety Dispatcher",
      "Emergency Room Personnel",
      "At least 18 years of age",
      "Not have any convictions or pending convictions that are violent in nature",
    ],
    featuresTitle: "Qualifying Applicants Must Be (Active or Retired):",
  },
  {
    name: "RECOVERY",
    duration: "Substance Abuse Recovery",
    image: "/recovery.png",
    imageAlt: "Recovery program participants",
    description:
      "Nature and adventure play a crucial role in helping recovering addicts by providing a healing environment. Immersing oneself in nature reduces stress, anxiety, and depression, which are common triggers for relapse. Outdoor activities like hiking, kayaking, or rock climbing offer a healthy way to channel energy, build resilience, and develop a sense of accomplishment.",
    features: [
      "Be in Recovery (clean & sober) from Substance Abuse Disorders for a minimum of 6 months",
      "Provide references and any necessary probation approvals",
      "Be at least 18 years of age",
      "Not have any convictions or pending convictions that are violent in nature",
    ],
    featuresTitle: "Qualifying Applicants Must:",
  },
  {
    name: "COUPLES",
    duration: "Relationship Enhancement",
    image: "/images/couples.JPG",
    imageAlt: "Couples program participants",
    description:
      "Adventure is great for couples because it strengthens their bond through shared experiences, excitement, and teamwork. Trying new activities together—whether hiking, traveling, or skydiving—creates lasting memories, deepens trust, and reignites passion. Stepping out of the comfort zone fosters communication and connection, helping couples grow both individually and as a team. Plus, the thrill of adventure boosts happiness, making relationships more vibrant and fulfilling.",
    features: [
      "Be married or in a long-term committed relationship",
      "Be at least 21 years of age",
      "Not have any convictions or pending convictions that are violent in nature",
    ],
    featuresTitle: "Qualifying Applicants Must:",
  },
  {
    name: "SURVIVORS",
    duration: "Women Who Have Survived Domestic Violence",
    image: "/images/survivors.jpg",
    imageAlt: "Survivors program participants",
    description:
      "Nature and adventure can be powerful tools for healing after trauma. For women who have survived domestic violence, stepping into the restorative space of nature can help rebuild confidence, strength, and a sense of personal freedom. Through supportive group experiences and empowering outdoor challenges like hiking, kayaking, and biking, participants reconnect with their inner resilience while forming meaningful bonds with other women on similar paths toward healing and renewal.",
    features: [
      "Be a woman who has survived domestic violence or an abusive relationship",
      "Be currently in a safe and stable living situation",
      "Be at least 18 years of age",
      "Be willing to participate in a supportive group environment focused on healing and growth",
      "Provide references and/or support documentation if requested",
      "Not have any convictions or pending convictions that are violent in nature",
    ],
    featuresTitle: "Qualifying Applicants Must",
  },
]

export function Programs() {
  return (
    <section id="programs" className="py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-at-blue sm:text-4xl lg:text-5xl">
            Our Programs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-foreground/80">
            We offer different program formats to meet you where you are. All programs include professional therapeutic
            support and carefully designed outdoor experiences.
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {programs.map((program) => (
            <div key={program.name} className="flex flex-col">
              <div className="mb-4 overflow-hidden rounded-lg lg:aspect-[4/3]">
                <Image
                  src={program.image}
                  alt={program.imageAlt}
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover"
                />
              </div>
              <Card className="flex flex-1 flex-col border-border bg-card p-8">
                <div className="flex-1">
                  <div className="text-sm font-semibold uppercase tracking-wide text-at-light-green">
                    {program.duration}
                  </div>
                  <h3 className="mt-2 text-2xl font-bold text-at-blue">{program.name}</h3>
                  <p className="mt-4 leading-relaxed text-foreground/80">{program.description}</p>
                  {program.featuresTitle && (
                    <h4 className="mt-6 font-bold text-at-blue">{program.featuresTitle}</h4>
                  )}
                  <ul className="mt-6 space-y-3">
                    {program.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <svg
                          className="h-5 w-5 shrink-0 text-at-orange"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm leading-relaxed text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/apply" className="mt-8 block">
                  <Button className="w-full bg-at-orange text-at-dark-green hover:bg-at-orange/90 shadow-lg border-2 border-at-orange font-semibold">
                    Apply
                  </Button>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
