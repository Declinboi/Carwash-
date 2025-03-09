'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PlusCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from '@/hooks/use-toast'


export default function AddServicePage() {
    const router = useRouter()
    const [serviceName, setServiceName] = useState('')
    const [description, setDescription] = useState('')
    const [priceSaloon, setPriceSaloon] = useState('')
    const [priceSUV, setPriceSUV] = useState('')
    const [image, setImage] = useState('/placeholder.svg?height=300&width=400')
   const {toast}  = useToast();
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      // Here you would typically send this data to your backend
      const newService = {
        name: serviceName,
        description,
        price: { saloon: priceSaloon, suv: priceSUV },
        image
      }
      console.log(newService)
      toast({
        title: "Service added",
        description: `${serviceName} has been added successfully.`,
      })
      router.push('/dashboard/services')
    }
  
    return (
        <div className="space-y-4">
      <h2 className="text-2xl font-bold">Add New Services</h2>
<div className='flex items-center justify-center w-full' >
     <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <div className="space-y-2">
            <Label htmlFor="serviceName">Service Name</Label>
            <Input
              id="serviceName"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priceSaloon">Price (Saloon)</Label>
              <Input
                id="priceSaloon"
                value={priceSaloon}
                onChange={(e) => setPriceSaloon(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priceSUV">Price (SUV)</Label>
              <Input
                id="priceSUV"
                value={priceSUV}
                onChange={(e) => setPriceSUV(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Service
          </Button>
        </form> 
</div>
      
      </div>
    )
  }
  
  
