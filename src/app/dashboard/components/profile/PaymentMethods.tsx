"use client"

import { useState, useEffect } from 'react'
import axios from 'axios'
import { PlusCircle, Trash2, CreditCard } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type PaymentMethod = {
  id: string
  type: 'credit' | 'debit'
  cardNumber: string
  expiryDate: string
  cvv: string
  cardholderName: string
}

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}v1/usercards`)
        setPaymentMethods(response.data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch payment methods.",
          variant: "destructive"
        })
      }
    }
    fetchPaymentMethods()
  }, [])

  const [newMethod, setNewMethod] = useState<Omit<PaymentMethod, 'id'>>({
    type: 'credit',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewMethod(prev => ({ ...prev, [name]: value }))
  }

  const handleAddPaymentMethod = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}v1/cards`, {
        card_name: newMethod.cardholderName,
        card_number: newMethod.cardNumber,
        expiry_date: newMethod.expiryDate,
        cvv: newMethod.cvv,
        card_type: newMethod.type
      })

      const id = response.data.id || Math.random().toString(36).substr(2, 9)
      setPaymentMethods(prev => [...prev, { ...newMethod, id }])
      setNewMethod({ type: 'credit', cardNumber: '', expiryDate: '', cvv: '', cardholderName: '' })

      toast({
        title: "Payment method added",
        description: "Your new payment method has been added successfully."
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add payment method. Please try again.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Payment Methods</h1>
      <div className="grid gap-6">
        {paymentMethods.map((method) => (
          <Card key={method.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2" />
                {method.type === 'credit' ? 'Credit Card' : 'Debit Card'}
              </CardTitle>
              <CardDescription>{method.cardholderName}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{method.cardNumber}</p>
              <p>Expires: {method.expiryDate}</p>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" onClick={() => setPaymentMethods(prev => prev.filter(m => m.id !== method.id))}>
                <Trash2 className="mr-2 h-4 w-4" /> Remove
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-6 bg-orange-500 hover:bg-orange-600">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Payment Method
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>Enter your card details to add a new payment method.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <RadioGroup defaultValue="credit" onValueChange={(value) => setNewMethod(prev => ({ ...prev, type: value as 'credit' | 'debit' }))}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit" id="credit" />
                <Label htmlFor="credit">Credit Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="debit" id="debit" />
                <Label htmlFor="debit">Debit Card</Label>
              </div>
            </RadioGroup>
            <Label>Card Number</Label>
            <Input name="cardNumber" value={newMethod.cardNumber} onChange={handleInputChange} />
            <Label>Expiry Date</Label>
            <Input name="expiryDate" value={newMethod.expiryDate} onChange={handleInputChange} placeholder="YYYY-MM-DD" />
            <Label>CVV</Label>
            <Input name="cvv" value={newMethod.cvv} onChange={handleInputChange} type="password" />
            <Label>Cardholder Name</Label>
            <Input name="cardholderName" value={newMethod.cardholderName} onChange={handleInputChange} />
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddPaymentMethod} className="bg-orange-500 hover:bg-orange-600">Add Payment Method</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
