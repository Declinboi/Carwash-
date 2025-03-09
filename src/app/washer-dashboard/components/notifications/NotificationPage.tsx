'use client'

import { useState } from 'react'
import { Bell, Check, Trash2, ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for notifications
const initialNotifications = [
  { 
    id: 1, 
    title: "New booking request", 
    message: "You have a new booking request from Alice Johnson for a Full Wash service.", 
    time: new Date(2023, 5, 20, 10, 30), 
    read: false,
    type: "booking"
  },
  { 
    id: 2, 
    title: "Booking completed", 
    message: "Booking #1234 for Bob Smith has been marked as completed.", 
    time: new Date(2023, 5, 19, 15, 45), 
    read: true,
    type: "completion"
  },
  { 
    id: 3, 
    title: "Customer feedback received", 
    message: "New feedback received for booking #5678 from Charlie Brown. Rating: 5 stars", 
    time: new Date(2023, 5, 18, 9, 0), 
    read: false,
    type: "feedback"
  },
  { 
    id: 4, 
    title: "Maintenance reminder", 
    message: "Scheduled maintenance for the main washing equipment is due tomorrow.", 
    time: new Date(2023, 5, 17, 11, 20), 
    read: false,
    type: "maintenance"
  },
  { 
    id: 5, 
    title: "Low inventory alert", 
    message: "Car shampoo is running low. Please reorder soon to avoid stockouts.", 
    time: new Date(2023, 5, 16, 14, 10), 
    read: true,
    type: "inventory"
  },
]

export function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([])

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id))
    setSelectedNotifications(selectedNotifications.filter(selectedId => selectedId !== id))
  }

  const toggleSelectNotification = (id: number) => {
    setSelectedNotifications(prev => 
      prev.includes(id) ? prev.filter(selectedId => selectedId !== id) : [...prev, id]
    )
  }

  const markSelectedAsRead = () => {
    setNotifications(notifications.map(notif => 
      selectedNotifications.includes(notif.id) ? { ...notif, read: true } : notif
    ))
    setSelectedNotifications([])
  }

  const deleteSelected = () => {
    setNotifications(notifications.filter(notif => !selectedNotifications.includes(notif.id)))
    setSelectedNotifications([])
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center">
          <Link href="/washer-dashboard" className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          Notifications
        </h1>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={markSelectedAsRead}
            disabled={selectedNotifications.length === 0}
          >
            <Check className="mr-2 h-4 w-4" /> Mark as Read
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={deleteSelected}
            disabled={selectedNotifications.length === 0}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className={notification.read ? 'bg-gray-50' : ''}>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="flex-1">
                <CardTitle className="text-lg flex items-center">
                  <Checkbox
                    checked={selectedNotifications.includes(notification.id)}
                    onCheckedChange={() => toggleSelectNotification(notification.id)}
                    className="mr-2"
                  />
                  {notification.title}
                </CardTitle>
                <CardDescription>{format(notification.time, 'PPpp')}</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Bell className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                    <Check className="mr-2 h-4 w-4" /> Mark as read
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => deleteNotification(notification.id)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <p>{notification.message}</p>
            </CardContent>
            <CardFooter>
              <Button variant="link" size="sm">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

