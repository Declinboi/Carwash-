'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckoutModal } from './CheckoutModal'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore()
  const [location, setLocation] = useState('')
  const [time, setTime] = useState('')
  const [address, setAddress] = useState('')
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)

  const subtotal = items.reduce((sum, item) => 
    sum + (parseInt(item.service.price[item.carType].replace(',', '')) * item.quantity), 0
  )
  const serviceFee = 500
  const total = subtotal + serviceFee

  const handleProceedToCheckout = () => {
    if (!location || !time || !address) {
      alert('Please fill in all required fields')
      return
    }
    setIsCheckoutModalOpen(true)
  }

  return (
    <div className="container mx-auto px-10 py-10">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">Your cart is empty</p>
          <Link href="/bookings">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Car Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={`${item.service.id}-${item.carType}`}>
                    <TableCell>{item.service.name}</TableCell>
                    <TableCell className="capitalize">{item.carType}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.service.id, item.carType, parseInt(e.target.value))}
                        className="w-16"
                      />
                    </TableCell>
                    <TableCell>₦{parseInt(item.service.price[item.carType].replace(',', '')) * item.quantity}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.service.id, item.carType)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Select onValueChange={setLocation}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="location1">Location 1.</SelectItem>
                    <SelectItem value="location2">Location 2</SelectItem>
                    <SelectItem value="location3">Location 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                />
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₦{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Service Fee</span>
                <span>₦{serviceFee}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₦{total}</span>
              </div>
            </div>
            <Button
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        bookingDetails={{
          location,
          time,
          address
        }}
      />
    </div>
  )
}

