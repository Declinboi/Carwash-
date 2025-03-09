'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from '@/hooks/use-toast'


export default function GeneralSettingsPage() {
  const [companyName, setCompanyName] = useState('My Car Wash Company')
  const [address, setAddress] = useState('123 Main St, City, Country')
  const [phone, setPhone] = useState('+1 234 567 8900')
  const [email, setEmail] = useState('contact@carwash.com')
  const [description, setDescription] = useState('We provide top-notch car washing services.')
   const {toast} = useToast();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log({ companyName, address, phone, email, description })
    toast({
      title: "Settings updated",
      description: "Your general settings have been saved successfully.",
    })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">General Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Company Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>
        <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
          Save Changes
        </Button>
      </form>
    </div>
  )
}

