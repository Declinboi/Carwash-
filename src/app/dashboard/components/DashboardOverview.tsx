'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CalendarIcon, Car, DollarSign, Users, PlusCircle, ClipboardList, Settings } from 'lucide-react'
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
import axios from 'axios'
import { BASE_URL } from '@/redux/constants'
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '@/redux/api/userApiSlice'
import { logout } from '@/redux/feature/authSlice'

// Mock data
const clientName = "John"
const stats = [
  { title: "Total Bookings", value: "1,234", icon: Car, color: "text-blue-600" },
  { title: "Amount Spent", value: "$45,678", icon: DollarSign, color: "text-green-600" },
  { title: "Active Bookings", value: "890", icon: Users, color: "text-purple-600" },
]
const recentBookings = [
  { id: 1, customer: "Alice Johnson", service: "Full Wash", date: "2023-06-15", status: "Completed" },
  { id: 2, customer: "Bob Smith", service: "Interior Cleaning", date: "2023-06-16", status: "Pending" },
  { id: 3, customer: "Charlie Brown", service: "Express Wash", date: "2023-06-17", status: "In Progress" },
]

export default function DashboardOverview() {
  
  const [date, setDate] = useState<Date | undefined>(new Date())
  // const [user, setUser] = useState<{ id: number; name: string; email: string } | null>(null)
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  
  const dispatch = useDispatch();
  const router = useRouter();

  // const [logoutApiCall] = useLogoutMutation();

  // const logoutHandler = async () => {
  //   try {
  //     await logoutApiCall().unwrap();
  //     dispatch(logout());
  //     router.push("/login");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  return (
    <div className="container mx-auto ">
      <h1 className="text-2xl font-bold  mb-6">Welcome back, {userInfo?.name || "Guest"} </h1>
      
      {/* Key Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
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

      {/* Recent Bookings and Calendar */}
      <div className="grid gap-4 md:grid-cols-2 mb-8">
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
              className="w-full bg-orange-500 hover:bg-orange-600"
              onClick={() => router.push('/dashboard/bookings')}
            >
              View All Bookings
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used actions for easy access</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => router.push('/dashboard/bookings/add')}>
            <PlusCircle className="mr-2 h-4 w-4" /> New Booking
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => router.push('/dashboard/services')}>
            <ClipboardList className="mr-2 h-4 w-4" /> Booking History
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => router.push('/dashboard/customers')}>
            <Users className="mr-2 h-4 w-4" /> Active Bookings
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => router.push('/dashboard/settings')}>
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

