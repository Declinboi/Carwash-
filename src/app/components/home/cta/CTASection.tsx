import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 dark:from-orange-700 dark:via-orange-800 dark:to-orange-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <Image
          src="https://res.cloudinary.com/matrix-ecommerce/image/upload/v1732542806/A-white-jeep-car-on-transparent-background-PNG_k7tbld.png"
          alt="Car wash background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 md:mr-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get 50% Off Your First Car Wash
            </h2>
            <p className="text-orange-100 text-lg max-w-md">
              Experience our premium car wash service at half the price. Limited time offer for new customers!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-white text-orange-600 hover:bg-orange-100 dark:bg-orange-200 dark:text-orange-800 dark:hover:bg-orange-300"
            >
              <Link href="/dashboard" >
              
      Book Now            </Link>
          
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-orange-700/50 dark:hover:bg-orange-700/50"
            >
              <Link href="/about-us" >
             Learn More   </Link>
            
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

