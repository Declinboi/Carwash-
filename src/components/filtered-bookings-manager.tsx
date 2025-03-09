'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { CalendarIcon, Edit, Eye } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { StatusBadge } from './status-badge'

// Mock data for bookings and admins
const allBookings = [
  { id: 1, customerId: 1, customerName: "Alice Johnson", service: "Full Wash", date: "2023-06-15", time: "10:00 AM", status: "Pending", assignedTo: null },
  { id: 2, customerId: 3, customerName: "Charlie Brown", service: "Interior Cleaning", date: "2023-06-15", time: "11:30 AM", status: "Confirmed", assignedTo: "admin1" },
  { id: 3, customerId: 2, customerName: "Bob Smith", service: "Express Wash", date: "2023-06-16", time: "09:00 AM", status: "Completed", assignedTo: "admin2" },
  { id: 4, customerId: 4, customerName: "Diana Ross", service: "Full Detailing", date: "2023-06-16", time: "02:00 PM", status: "Cancelled", assignedTo: "admin2" },
  { id: 5, customerId: 5, customerName: "Edward Norton", service: "Exterior Wash", date: "2023-06-17", time: "11:00 AM", status: "Pending", assignedTo: null },
]

const admins = [
  { id: "admin1", name: "John Doe" },
  { id: "admin2", name: "Jane Smith" },
  { id: "admin3", name: "Mike Johnson" },
]

type Booking = typeof allBookings[0]

interface FilteredBookingsManagerProps {
  statusFilter?: string
}

export function FilteredBookingsManager({ statusFilter }: FilteredBookingsManagerProps) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editedBooking, setEditedBooking] = useState<Booking | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Filter bookings based on statusFilter
    const filteredBookings = statusFilter
      ? allBookings.filter(booking => booking.status.toLowerCase() === statusFilter.toLowerCase())
      : allBookings
    setBookings(filteredBookings)
  }, [statusFilter])

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking)
    setIsViewModalOpen(true)
  }

  const handleEditBooking = (booking: Booking) => {
    setSelectedBooking(booking)
    setEditedBooking({ ...booking })
    setIsEditModalOpen(true)
  }

  const handleSaveEdit = () => {
    if (editedBooking) {
      // In a real application, you would update the booking in your database here
      console.log("Saving edited booking:", editedBooking)
      toast({
        title: "Booking updated",
        description: `Booking #${editedBooking.id} has been updated successfully.`,
      })
      setIsEditModalOpen(false)
      
      // Update the local state
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking.id === editedBooking.id ? editedBooking : booking
        )
      )
    }
  }

  const handleAssignAdmin = (bookingId: number, adminId: string) => {
    // In a real application, you would update the booking in your database here
    console.log(`Assigning booking #${bookingId} to admin ${adminId}`)
    toast({
      title: "Admin assigned",
      description: `Booking #${bookingId} has been assigned to ${admins.find(admin => admin.id === adminId)?.name}.`,
    })

    // Update the local state
    setBookings(prevBookings => 
      prevBookings.map(booking => 
        booking.id === bookingId ? { ...booking, assignedTo: adminId } : booking
      )
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        {statusFilter ? `${statusFilter} Bookings` : 'All Bookings'}
      </h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.id}</TableCell>
              <TableCell>{booking.customerName}</TableCell>
              <TableCell>{booking.service}</TableCell>
              <TableCell>{booking.date}</TableCell>
              <TableCell>{booking.time}</TableCell>
              <TableCell><StatusBadge status={booking.status} /></TableCell>
              <TableCell>
                <Select
                  defaultValue={booking.assignedTo || ""}
                  onValueChange={(value) => handleAssignAdmin(booking.id, value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Assign admin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Unassigned">Unassigned</SelectItem>
                    {admins.map((admin) => (
                      <SelectItem key={admin.id} value={admin.id}>
                        {admin.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => handleViewBooking(booking)}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View booking</span>
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleEditBooking(booking)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit booking</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="booking-id" className="text-right">
                  Booking ID
                </Label>
                <div id="booking-id" className="col-span-3">
                  {selectedBooking.id}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customer-name" className="text-right">
                  Customer
                </Label>
                <div id="customer-name" className="col-span-3">
                  {selectedBooking.customerName}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="service" className="text-right">
                  Service
                </Label>
                <div id="service" className="col-span-3">
                  {selectedBooking.service}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date-time" className="text-right">
                  Date & Time
                </Label>
                <div id="date-time" className="col-span-3">
                  {selectedBooking.date} at {selectedBooking.time}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <div id="status" className="col-span-3">
                <StatusBadge status={selectedBooking.status} />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assigned-to" className="text-right">
                  Assigned To
                </Label>
                <div id="assigned-to" className="col-span-3">
                  {selectedBooking.assignedTo
                    ? admins.find((admin) => admin.id === selectedBooking.assignedTo)?.name
                    : "Unassigned"}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
          </DialogHeader>
          {editedBooking && (
            <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-customer-name" className="text-right">
                  Customer
                </Label>
                <Input
                  id="edit-customer-name"
                  value={editedBooking.customerName}
                  onChange={(e) => setEditedBooking({ ...editedBooking, customerName: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-service" className="text-right">
                  Service
                </Label>
                <Input
                  id="edit-service"
                  value={editedBooking.service}
                  onChange={(e) => setEditedBooking({ ...editedBooking, service: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-date" className="text-right">
                  Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !editedBooking.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {editedBooking.date ? format(new Date(editedBooking.date), "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={new Date(editedBooking.date)}
                      onSelect={(date) => setEditedBooking({ ...editedBooking, date: format(date as Date, "yyyy-MM-dd") })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-time" className="text-right">
                  Time
                </Label>
                <Input
                  id="edit-time"
                  value={editedBooking.time}
                  onChange={(e) => setEditedBooking({ ...editedBooking, time: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select
                  value={editedBooking.status}
                  onValueChange={(value) => setEditedBooking({ ...editedBooking, status: value })}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-assigned-to" className="text-right">
                  Assigned To
                </Label>
                <Select
                  value={editedBooking.assignedTo || ""}
                  onValueChange={(value) => setEditedBooking({ ...editedBooking, assignedTo: value || null })}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Assign admin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Unassigned">Unassigned</SelectItem>
                    {admins.map((admin) => (
                      <SelectItem key={admin.id} value={admin.id}>
                        {admin.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="ml-auto">Save changes</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

