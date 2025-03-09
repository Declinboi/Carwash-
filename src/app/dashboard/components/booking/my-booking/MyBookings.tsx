'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'

type Booking = {
  id: string
  serviceName: string
  date: Date
  time: string
  location: string
  status: 'upcoming' | 'completed' | 'cancelled'
}

const mockBookings: Booking[] = [
  { id: '1', serviceName: 'Belgium Wash', date: new Date(2023, 5, 15), time: '10:00 AM', location: '123 Main St, City', status: 'upcoming' },
  { id: '2', serviceName: 'Express Wash', date: new Date(2023, 5, 10), time: '2:00 PM', location: '456 Elm St, Town', status: 'completed' },
  { id: '3', serviceName: 'Interior Detailing', date: new Date(2023, 5, 20), time: '11:30 AM', location: '789 Oak St, Village', status: 'upcoming' },
]

export default function MyBookingsPage() {

   const {toast} = useToast() 
  const [bookings, setBookings] = useState<Booking[]>(mockBookings)

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}bookings/${bookingId}`);
  
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
  
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been cancelled successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">My Bookings</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => (
          <Card key={booking.id} className={booking.status === 'cancelled' ? 'opacity-60' : ''}>
            <CardHeader>
              <CardTitle>{booking.serviceName}</CardTitle>
              <CardDescription>{booking.status}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{format(booking.date, 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{booking.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{booking.location}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {booking.status === 'upcoming' && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Cancel Booking</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure you want to cancel this booking?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. You will need to make a new booking if you change your mind.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => {}}>No, keep my booking</Button>
                      <Button variant="destructive" onClick={() => handleCancelBooking(booking.id)}>Yes, cancel booking</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
              {booking.status === 'completed' && (
                <Button variant="outline">Leave a Review</Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

