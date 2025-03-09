'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CalendarIcon, Car, DollarSign, Users, PlusCircle, ClipboardList, Settings, Bell } from 'lucide-react'
import { format } from 'date-fns'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const notifications = [
  { id: 1, message: "New booking request from Alice Johnson", time: "5 minutes ago" },
  { id: 2, message: "Booking #1234 has been completed", time: "1 hour ago" },
  { id: 3, message: "Customer feedback received for booking #5678", time: "2 hours ago" },
  { id: 4, message: "Reminder: Vehicle maintenance scheduled for tomorrow", time: "1 day ago" },
]


// Mock data
const clientName = "John"
const stats = [
  { title: "Total Bookings", value: "1,234", icon: Car, color: "text-blue-600" },
  { title: "Revenue", value: "$45,678", icon: DollarSign, color: "text-green-600" },
  { title: "Active Bookings", value: "23", icon: Users, color: "text-purple-600" },
]
const recentBookings = [
  { id: 1, customer: "Alice Johnson", service: "Full Wash", date: "2023-06-15", status: "Completed" },
  { id: 2, customer: "Bob Smith", service: "Interior Cleaning", date: "2023-06-16", status: "Pending" },
  { id: 3, customer: "Charlie Brown", service: "Express Wash", date: "2023-06-17", status: "In Progress" },
  { id: 4, customer: "Diana Prince", service: "Full Detail", date: "2023-06-18", status: "Scheduled" },
  { id: 5, customer: "Ethan Hunt", service: "Exterior Wash", date: "2023-06-19", status: "Completed" },
]

export default function WasherOverview() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="container overflow-x-hidden mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className=" text-xl sm:text-3xl font-bold">Welcome back, {clientName}</h1>
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
      
      {/* Key Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={cn("h-4 w-4", stat.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart and Calendar */}
      <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
          <ul className="space-y-4">
      {notifications.map((notification) => (
        <li key={notification.id} className="flex items-start space-x-4">
          <Bell className="h-5 w-5 mt-0.5 text-blue-500" />
          <div>
            <p className="text-sm font-medium">{notification.message}</p>
            <p className="text-xs text-gray-500">{notification.time}</p>
          </div>
        </li>
      ))}
    </ul>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
          </CardHeader>
          <CardContent className='flex w-full items-center justify-center' >
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md  border"
            />
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings and Notifications */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.customer}</TableCell>
                    <TableCell>{booking.service}</TableCell>
                    <TableCell>{booking.date}</TableCell>
                    <TableCell>{booking.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              onClick={() => router.push('/dashboard/bookings')}
            >
              View All Bookings
            </Button>
          </CardFooter>
        </Card>

        <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used actions for easy access</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 ">
          <Button onClick={() => router.push('/dashboard/bookings/add')}>
            <PlusCircle className="mr-2 h-4 w-4" /> New Booking
          </Button>
          <Button variant="secondary" onClick={() => router.push('/dashboard/services')}>
            <ClipboardList className="mr-2 h-4 w-4" /> Manage Services
          </Button>
          <Button variant="secondary" onClick={() => router.push('/dashboard/customers')}>
            <Users className="mr-2 h-4 w-4" /> Customer List
          </Button>
          <Button variant="outline" onClick={() => router.push('/dashboard/settings')}>
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
        </CardContent>
      </Card>
      </div>

      {/* Quick Actions */}
   
    </div>
  )
}

