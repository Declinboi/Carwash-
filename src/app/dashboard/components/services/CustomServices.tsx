'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from '@/hooks/use-toast'
import { Checkbox } from '@/components/ui/checkbox'



type WashOption = {
  id: string
  name: string
  price: number
}

const baseWashOptions: WashOption[] = [
  { id: 'basic', name: 'Basic Wash', price: 10 },
  { id: 'deluxe', name: 'Deluxe Wash', price: 20 },
  { id: 'premium', name: 'Premium Wash', price: 30 },
]

const additionalOptions: WashOption[] = [
  { id: 'wax', name: 'Wax Application', price: 15 },
  { id: 'interior', name: 'Interior Detailing', price: 25 },
  { id: 'tire', name: 'Tire Shine', price: 5 },
  { id: 'polish', name: 'Paint Polish', price: 20 },
  { id: 'headlight', name: 'Headlight Restoration', price: 30 },
]

export default function CustomWashesPage() {
  const [selectedBaseWash, setSelectedBaseWash] = useState<WashOption | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [specialRequests, setSpecialRequests] = useState('')
 const {toast} = useToast()
  const totalPrice = (selectedBaseWash?.price || 0) + 
    additionalOptions.filter(option => selectedOptions.includes(option.id))
      .reduce((sum, option) => sum + option.price, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedBaseWash) {
      toast({
        title: "Error",
        description: "Please select a base wash option.",
        variant: "destructive"
      })
      return
    }
    // Here you would typically send this data to your backend
    console.log({
      baseWash: selectedBaseWash,
      additionalOptions: selectedOptions,
      specialRequests,
      totalPrice
    })
    toast({
      title: "Custom wash request submitted",
      description: "Your custom wash request has been sent successfully.",
    })
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Create Your Custom Wash</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Choose Your Base Wash</CardTitle>
            <CardDescription>Select the starting point for your custom wash</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            {baseWashOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={option.id}
                  name="baseWash"
                  value={option.id}
                  checked={selectedBaseWash?.id === option.id}
                  onChange={() => setSelectedBaseWash(option)}
                  className="w-4 h-4 text-orange-600"
                />
                <Label htmlFor={option.id} className="flex-grow">{option.name}</Label>
                <span className="text-sm font-semibold">${option.price.toFixed(2)}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Services</CardTitle>
            <CardDescription>Customize your wash with these extra options</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            {additionalOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={selectedOptions.includes(option.id)}
                  onCheckedChange={(checked) => {
                    setSelectedOptions(
                      checked
                        ? [...selectedOptions, option.id]
                        : selectedOptions.filter((id) => id !== option.id)
                    )
                  }}
                />
                <Label htmlFor={option.id} className="flex-grow">{option.name}</Label>
                <span className="text-sm font-semibold">${option.price.toFixed(2)}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Special Requests</CardTitle>
            <CardDescription>Let us know if you have any specific requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter any special requests or instructions here..."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Base Wash:</span>
              <span>{selectedBaseWash ? `$${selectedBaseWash.price.toFixed(2)}` : 'Not selected'}</span>
            </div>
            <div className="flex justify-between">
              <span>Additional Services:</span>
              <span>${(totalPrice - (selectedBaseWash?.price || 0)).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total Price:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
              Submit Custom Wash Request
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

