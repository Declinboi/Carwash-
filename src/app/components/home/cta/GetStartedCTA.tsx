import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export function GetStartedCTA() {
  return (
    <section className="py-16  dark:bg-orange-900">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto shadow-xl overflow-hidden">
          <CardContent className="p-8 md:p-12 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-950 dark:text-orange-50 mb-4">
              Ready to Experience PlatonicWash?
            </h2>
            <p className="text-lg text-orange-700 dark:text-orange-200 mb-8 max-w-2xl">
              Join thousands of satisfied customers who have discovered the convenience of our mobile car wash service. It&apos;s time to give your car the care it deserves.
            </p>
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg">
              <Link href="/login">
                Get Started Now
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

