import { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from './ui/textarea'


  

type BookingModalProps = {
  isOpen: boolean
  onClose: () => void
  onComplete: (details: any) => void
  service: any
}

export function BookingModal({ isOpen, onClose, onComplete, service }: BookingModalProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState<string>('')
  const [vehicleType, setVehicleType] = useState<'saloon' | 'suv'>('saloon')
  const [specialRequests, setSpecialRequests] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete({
      date,
      time,
      vehicleType,
      specialRequests,
      price: vehicleType === 'saloon' ? service.price.saloon : service.price.suv
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book {service.name}</DialogTitle>
          <DialogDescription>
            Fill in the details for your {service.name} appointment.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <div className="col-span-3">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <Select onValueChange={setTime} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">09:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="13:00">01:00 PM</SelectItem>
                  <SelectItem value="15:00">03:00 PM</SelectItem>
                  <SelectItem value="17:00">05:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vehicleType" className="text-right">
                Vehicle Type
              </Label>
              <RadioGroup
                defaultValue="saloon"
                onValueChange={(value) => setVehicleType(value as 'saloon' | 'suv')}
                className="col-span-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="saloon" id="saloon" />
                  <Label htmlFor="saloon">Saloon</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="suv" id="suv" />
                  <Label htmlFor="suv">SUV</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="specialRequests" className="text-right">
                Special Requests
              </Label>
              <Textarea
                id="specialRequests"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600">Proceed to Payment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

