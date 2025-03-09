'use client'

import { useState } from 'react'
import { ArrowLeft, Wallet, CreditCard, Gift, HelpCircle } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

type PaymentMethod = 'wallet' | 'card' | 'transfer'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  bookingDetails: {
    location: string
    time: string
    address: string
  }
}

export function CheckoutModal({ isOpen, onClose, bookingDetails }: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card')
  const [promoCode, setPromoCode] = useState('')
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)

  const subtotal = items.reduce((sum, item) => 
    sum + (parseInt(item.service.price[item.carType].replace(',', '')) * item.quantity), 0
  )
  const deliveryFee = 1000
  const serviceFee = 600
  const total = subtotal + deliveryFee + serviceFee

  const handlePayment = () => {
    // Handle payment logic here
    console.log('Processing payment...', {
      paymentMethod,
      total,
      bookingDetails,
      items
    })
    clearCart()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle>Checkout</DialogTitle>
          </div>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="space-y-6 p-4">
            {/* Progress Indicator */}
            <div className="flex justify-between mb-6">
              <div className="flex-1 mr-2">
                <div className="h-2 bg-orange-500 rounded" />
                <p className="text-sm mt-1">Your Order</p>
              </div>
              <div className="flex-1">
                <div className="h-2 bg-orange-500 rounded" />
                <p className="text-sm mt-1">Delivery & Payment</p>
              </div>
            </div>

            {/* Payment Summary */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
              
              {/* Promo Code */}
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Use Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button variant="outline">Apply</Button>
              </div>

              {/* Summary Items */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Sub-total ({items.length} items)</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center">
                    Service Fee
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 ml-1" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Platform service charge</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                  <span>₦{serviceFee.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
              
              {/* Promo Banner */}
              <div className="bg-green-50 p-4 rounded-lg mb-4 flex items-start">
                <Gift className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                <p className="text-sm text-green-700">
                  Enjoy 10% cashback when you pay with a Verve card from Thursdays to Sundays.
                </p>
              </div>

              <RadioGroup
                value={paymentMethod}
                onValueChange={(value: PaymentMethod) => setPaymentMethod(value)}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="wallet" id="wallet" />
                  <Label htmlFor="wallet" className="flex items-center">
                    <Wallet className="h-4 w-4 mr-2" />
                    Wallet (₦0)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay online
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="transfer" id="transfer" />
                  <Label htmlFor="transfer" className="flex items-center">
                    <Gift className="h-4 w-4 mr-2" />
                    Pay for me
                  </Label>
                </div>
              </RadioGroup>

              {/* Payment Method Specific Fields */}
              {paymentMethod === 'card' && (
                <div className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'transfer' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm mb-2">Bank Transfer Details:</p>
                  <p className="text-sm">Bank: First Bank</p>
                  <p className="text-sm">Account: 1234567890</p>
                  <p className="text-sm">Name: Car Wash Services</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <Button 
              className="w-full bg-orange-500 hover:bg-orange-600"
              onClick={handlePayment}
            >
              Pay ₦{total.toLocaleString()}
            </Button>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

