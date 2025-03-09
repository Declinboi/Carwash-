'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookingModal } from '@/components/booking-modal'
import { PaymentModal } from '@/components/payment-modal'
import { useCartStore } from '@/lib/store'



const services: any[] = [
  {
    id: '1',
    name: "Belgium Wash",
    description: "Remove Chairs and Extensive Cleaning & Washing of the Interior",
    price: { saloon: "4,500", suv: "5,000" },
    image: "/placeholder.svg?height=300&width=400"
  },
  {
    id: '2',
    name: "Express Wash",
    description: "Quick exterior wash for a speedy clean",
    price: { saloon: "2,500", suv: "3,000" },
    image: "/placeholder.svg?height=300&width=400"
  },
  {
    id: '3',
    name: "Interior Detailing",
    description: "Deep clean of car interior for a fresh feel",
    price: { saloon: "7,500", suv: "8,500" },
    image: "/placeholder.svg?height=300&width=400"
  },
]

export default function BookingsPage() {
  const [selectedService, setSelectedService] = useState<any | null>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [bookingDetails, setBookingDetails] = useState<any>(null)
  const addItem = useCartStore((state) => state.addItem)

  const handleBook = (service: any) => {
    setSelectedService(service)
    setIsBookingModalOpen(true)
  }

  const handleAddToCart = (service: any, carType: 'saloon' | 'suv') => {
    if (!service?.id) {
      console.error('Invalid service object:', service);
      return;
    }
    console.log(service)
    addItem({ service, carType, quantity: 1 });
  };
  

  const handleBookingComplete = (details: any) => {
    setBookingDetails(details)
    setIsBookingModalOpen(false)
    setIsPaymentModalOpen(true)
  }

  const handlePaymentComplete = () => {
    console.log("Booking completed:", { service: selectedService, details: bookingDetails })
    setIsPaymentModalOpen(false)
    setSelectedService(null)
    setBookingDetails(null)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-orange-600">Our Services</h1>
        <ShoppingCart />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{service.name}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <Image
                src={service.image}
                alt={service.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-md"
              />
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <div className="flex justify-between w-full mb-4">
                <span>Saloon: {service.price.saloon}</span>
                <span>SUV: {service.price.suv}</span>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Button 
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                  onClick={() => handleBook(service)}
                >
                  Book Now
                </Button>

<div className="flex items-center justify-between gap-3" >
    <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleAddToCart(service, 'saloon')}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add Saloon
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleAddToCart(service, 'suv')}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add SUV
                </Button>
</div>
              


              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedService && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          onComplete={handleBookingComplete}
          service={selectedService}
        />
      )}

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onComplete={handlePaymentComplete}
        bookingDetails={bookingDetails}
        service={selectedService}
      />
    </div>
  )
}

