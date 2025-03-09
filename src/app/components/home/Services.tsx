import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
  {
    title: "Regular Wash",
    description: "Vacuum, Interior Cleaning And Washing Of Exterior",
    image: "/assets/regular_wash.jpg",
  },
  {
    title: "Detailed Wash",
    description: "Vacuum, Detailed Interior Cleaning E.G Chair, Roof etc. And Washing Of Exterior.",
    image: "/assets/detailed_wash.jpg",
  },
  {
    title: "Engine Wash",
    description: "Washing of the Engine.",
    image: "/assets/engine_wash.jpg",
  },
]

export function ServicesSection() {
  return (
    <section className="py-16 bg-orange-100 dark:bg-orange-900">
      <div className="container mx-auto px-4">
        <h2 className="text-lg font-semibold text-primary text-center dark:text-orange-300 mb-2">Our Services</h2>
        <h3 className="text-3xl font-bold text-orange-950 text-center dark:text-orange-50 mb-8">Professional Car Cleaning Solutions</h3>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-white dark:bg-orange-800 border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-0">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl font-semibold text-orange-950 dark:text-orange-50 mb-2">{service.title}</CardTitle>
                <CardDescription className="text-orange-700 dark:text-orange-200">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
<div className="flex items-center justify-center w-full mt-5" >
         <Button className="!py-6" > <Link href="/product" >Explore Our Services</Link>  </Button>
</div>
   
      </div>
    </section>
  )
}

