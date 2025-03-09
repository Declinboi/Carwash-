import Image from "next/image"
import { Card } from "@/components/ui/card"

const features = [
  {
    title: "Preparing Paint Condition",
    description: "Our expert technicians thoroughly assess and prepare your vehicle's paint condition, ensuring the best possible treatment for your car's specific needs.",
    image: "/assets/paint_condition.jpg",
  },
  {
    title: "Protecting Corrosion",
    description: "We apply specialized protective coatings that guard your vehicle against corrosion, extending the life and maintaining the beauty of your car's exterior.",
    image: "/assets/protective_coating.jpg",
  },
  {
    title: "Avoiding Price of Ownership",
    description: "Regular professional car washing and maintenance helps reduce the overall cost of ownership by preventing expensive damage and maintaining your vehicle's value.",
    image: "/assets/engine_maintain.jpg",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16  dark:bg-orange-900">
      <div className="container mx-auto px-4">
        <div className="mb-12">
        <h2 className="text-lg font-semibold text-primary text-center dark:text-orange-300 mb-2">Our Features</h2>
        <h3 className="text-3xl font-bold text-orange-950 text-center dark:text-orange-50 mb-8">We deliver the best wash and experience</h3>
        </div>
        
        <div className="space-y-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-white dark:bg-orange-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-semibold text-orange-950 dark:text-orange-50">
                    {feature.title}
                  </h3>
                  <p className="text-orange-700 dark:text-orange-200">
                    {feature.description}
                  </p>
                </div>
                <div className="w-full md:w-1/3 flex-shrink-0">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

