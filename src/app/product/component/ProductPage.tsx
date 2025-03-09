import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from 'lucide-react'

const products = [
  {
    name: "Regular Wash",
    description: "Vacuum, Interior Cleaning And Washing Of Exterior",
    price: { saloon: "2,000", suv: "2,500" },
    image: "/assets/regular_wash.jpg"
  },
  {
    name: "Detailed Wash",
    description: "Vacuum, Detailed Interior Cleaning E.G Chair, Roof etc. And Washing Of Exterior",
    price: { saloon: "3,500", suv: "4,000" },
    image: "/assets/detailed_wash.jpg"
  },
  {
    name: "Engine Wash",
    description: "Washing of the Engine",
    price: { saloon: "2,500", suv: "3,000" },
    image: "/assets/engine_wash.jpg"
  },
  {
    name: "Car Wax & Buffing",
    description: "Waxing & Buffing of the Exterior",
    price: { saloon: "2,000", suv: "2,500" },
    image: "/assets/car_wax.jpg"
  },
  {
    name: "Water Extraction",
    description: "Remove Water flooded parts of the Interior",
    price: { saloon: "6,000", suv: "7,000" },
    image: "/assets/water_extraction.jpg"
  },
  {
    name: "Exterior Only",
    description: "Exterior Washing of the Car",
    price: { saloon: "1,500", suv: "1,500" },
    image: "/assets/exterior.jpg"
  },
  {
    name: "Interior Only",
    description: "Vacuum & Interior Cleaning of the Car",
    price: { saloon: "1,500", suv: "1,500" },
    image: "/assets/interior.jpg"
  },
  {
    name: "Belgium Wash",
    description: "Remove Chairs and Extensive Cleaning & Washing of the Interior",
    price: { saloon: "4,500", suv: "5,000" },
    image: "/assets/belgium.jpeg"
  }
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-orange-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-orange-600 overflow-hidden">
        <Image
          src="https://res.cloudinary.com/matrix-ecommerce/image/upload/v1732542806/A-white-jeep-car-on-transparent-background-PNG_k7tbld.png"
          alt="Car wash services"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">Our Services</h1>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader className="p-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="flex-grow p-6">
                  <CardTitle className="text-2xl font-bold text-orange-950 mb-4">{product.name}</CardTitle>
                  <p className="text-orange-800 mb-6">{product.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-orange-700">
                      <span className="flex items-center">
                        <Check className="w-4 h-4 mr-2" />
                        Saloon Car
                      </span>
                      <span className="font-semibold">₦{product.price.saloon}</span>
                    </div>
                    <div className="flex items-center justify-between text-orange-700">
                      <span className="flex items-center">
                        <Check className="w-4 h-4 mr-2" />
                        SUV/Jeep
                      </span>
                      <span className="font-semibold">₦{product.price.suv}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Note Section */}
      <section className="py-8 px-4 bg-orange-100">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-orange-800 text-sm">
            Note: While tipping our workers is allowed, tip soliciting is highly prohibited. 
            Kindly report such act or unprofessional behaviour.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-orange-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Our Service?</h2>
          <p className="mb-8">Choose the perfect wash for your vehicle and enjoy our professional service.</p>
          <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-100">
            <Link href="/login">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

