import { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"


type PaymentModalProps = {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  bookingDetails: any
  service: any | null
}

export function PaymentModal({ isOpen, onClose, onComplete, bookingDetails, service }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically process the payment or save the payment method
    onComplete()
  }

  if (!service || !bookingDetails) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Payment for {service.name}</DialogTitle>
          <DialogDescription>
            Choose your payment method and complete your booking.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paymentMethod" className="text-right">
                Payment Method
              </Label>
              <RadioGroup
                defaultValue="card"
                onValueChange={(value) => setPaymentMethod(value as 'card' | 'cash')}
                className="col-span-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">Card Payment</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash">Pay on Delivery</Label>
                </div>
              </RadioGroup>
            </div>
            {paymentMethod === 'card' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cardNumber" className="text-right">
                    Card Number
                  </Label>
                  <Input
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="expiryDate" className="text-right">
                    Expiry Date
                  </Label>
                  <Input
                    id="expiryDate"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cvv" className="text-right">
                    CVV
                  </Label>
                  <Input
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="col-span-3"
                    required
                  />
                </div>
              </>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Total Price</Label>
              <div className="col-span-3 font-bold">
                {bookingDetails.price}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
              {paymentMethod === 'card' ? 'Pay Now' : 'Confirm Booking'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

