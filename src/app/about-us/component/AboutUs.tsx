import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const teamMembers = [
  { name: 'Udeogu Henry Ifeanyi', role: 'Founder & CEO', image: '/assets/profile.jpeg' },

]

export default function AboutUs() {
  return (
    <div className="bg-orange-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-orange-600 overflow-hidden">
        <Image
          src="https://res.cloudinary.com/matrix-ecommerce/image/upload/v1732542806/A-white-jeep-car-on-transparent-background-PNG_k7tbld.png"
          alt="Car wash team"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">About PlatonicWash</h1>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-orange-950 mb-6 text-center">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-orange-800 mb-4">
                Founded in 2024, PlatonicWash started with a simple idea: bring the car wash to the customer. Our founder, John Doe, recognized the need for a convenient, high-quality car washing service that could meet the demands of busy professionals and families.
              </p>
              <p className="text-orange-800">
                From our humble beginnings with just one van and a dream, we&apos;ve grown into a fleet of mobile washing units, serving thousands of satisfied customers across the country. Our commitment to quality, convenience, and customer satisfaction remains at the heart of everything we do.
              </p>
            </div>
            <div className="relative h-64 md:h-full">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="PlatonicWash van"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-4 bg-orange-100">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-orange-950 mb-6 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['Quality', 'Convenience', 'Eco-Friendly'].map((value, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-orange-950 mb-2">{value}</h3>
                  <p className="text-orange-800">
                    We are committed to delivering the highest {value.toLowerCase()} in every aspect of our service.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-orange-950 mb-6 text-center">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6 text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-orange-950">{member.name}</h3>
                  <p className="text-orange-800">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-orange-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience PlatonicWash?</h2>
          <p className="mb-8">Join thousands of satisfied customers and give your car the care it deserves.</p>
          <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-100">
          <Link href='/dashboard' > Book Your Wash Now</Link>
           
          </Button>
        </div>
      </section>
    </div>
  )
}

