import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function ThankYouPage() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <div className="flex justify-center mb-10">
          <Image
            src="/images/AT_Logo_Black.svg"
            alt="Adventure Therapy Logo"
            width={120}
            height={100}
            className="h-20 w-auto"
            priority
          />
        </div>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-at-blue sm:text-4xl lg:text-5xl">
          Thank you!
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-foreground/80 sm:text-xl">
          Your application has been successfully submitted.
        </p>
        <div className="mt-10">
          <Link href="/">
            <Button
              size="lg"
              className="bg-at-orange text-at-dark-green hover:bg-at-orange/90 shadow-lg border-2 border-at-dark-green font-semibold px-8 py-3"
            >
              Return to Adventure Therapy Website
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
