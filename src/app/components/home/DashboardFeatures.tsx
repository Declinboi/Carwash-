import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

export function DashboardFeature() {
  return (
    <section className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-orange-600">
              Manage Your Car Wash Experience
            </h2>
            <p className="mx-auto max-w-[700px] text-sm text-gray-600 md:text-sm/relaxed lg:text-sm/relaxed xl:text-base/relaxed">
              Get access to our specialized dashboard and take control of your car wash appointments, history, and preferences.
            </p>
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Features</CardTitle>
                <CardDescription>Everything you need at your fingertips</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-4 md:grid-cols-2">
                  {[
                    "Book and manage appointments",
                    "View service history",
                    "Manage account and settings",
                    "Manage payment methods",
                    "Receive personalized offers",
                    "Access booking history"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-orange-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Link href="/register" >Create account now</Link> 
            </Button>
          </div>
          <div className="mx-auto w-full max-w-[600px] aspect-video relative">
            <Image
              src="https://res.cloudinary.com/matrix-ecommerce/image/upload/v1732920751/Specilized_dashboard_to_track_and_monitor_activities_whyivl.png"
              alt="MobileWash Dashboard Screenshot"
              layout="fill"
              objectFit="cover"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

