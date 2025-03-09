'use client'

import { useState } from 'react'
import { Edit2, Trash2 } from 'lucide-react'
import Image from 'next/image'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast'

// Mock data for services
const initialServices = [
  { 
    id: 1, 
    name: 'Belgium Wash', 
    description: 'Remove Chairs and Extensive Cleaning & Washing of the Interior', 
    price: { saloon: "4,500", suv: "5,000" },
    image: "/placeholder.svg?height=300&width=400"
  },
  { 
    id: 2, 
    name: 'Express Wash', 
    description: 'Quick exterior wash', 
    price: { saloon: "2,500", suv: "3,000" },
    image: "/placeholder.svg?height=300&width=400"
  },
  { 
    id: 3, 
    name: 'Interior Detailing', 
    description: 'Deep clean of car interior', 
    price: { saloon: "7,500", suv: "8,500" },
    image: "/placeholder.svg?height=300&width=400"
  },
]

type Service = typeof initialServices[0]

export default function EditServicesPage() {
  const [services, setServices] = useState(initialServices)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null)
   const { toast } = useToast()

 
  const handleEdit = (service: Service) => {
    setEditingService({ ...service })
    setIsEditModalOpen(true)
  }

  const handleSave = () => {
    if (editingService) {
      setServices(services.map(service => 
        service.id === editingService.id ? editingService : service
      ))
      setIsEditModalOpen(false)
      toast({
        title: "Service updated",
        description: `${editingService.name} has been updated successfully.`,
      })
    }
  }

  const handleDelete = (service: Service) => {
    setServiceToDelete(service)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (serviceToDelete) {
      setServices(services.filter(service => service.id !== serviceToDelete.id))
      setIsDeleteDialogOpen(false)
      toast({
        title: "Service deleted",
        description: `${serviceToDelete.name} has been deleted successfully.`,
      })
    }
  }

  return (
    <div className="container mx-auto ">
   <h2 className="text-2xl font-bold">
       Edit Service 
        </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price (Saloon)</TableHead>
            <TableHead>Price (SUV)</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell>
                <Image src={service.image} alt={service.name} width={100} height={75} />
              </TableCell>
              <TableCell>{service.name}</TableCell>
              <TableCell>{service.description}</TableCell>
              <TableCell>{service.price.saloon}</TableCell>
              <TableCell>{service.price.suv}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(service)} className="bg-orange-500 hover:bg-orange-600 mr-2">
                  <Edit2 className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button onClick={() => handleDelete(service)} variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          {editingService && (
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editingService.name}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priceSaloon">Price (Saloon)</Label>
                  <Input
                    id="priceSaloon"
                    value={editingService.price.saloon}
                    onChange={(e) => setEditingService({ ...editingService, price: { ...editingService.price, saloon: e.target.value } })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceSUV">Price (SUV)</Label>
                  <Input
                    id="priceSUV"
                    value={editingService.price.suv}
                    onChange={(e) => setEditingService({ ...editingService, price: { ...editingService.price, suv: e.target.value } })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={editingService.image}
                  onChange={(e) => setEditingService({ ...editingService, image: e.target.value })}
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600">Save changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this service?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the service
              {serviceToDelete && ` "${serviceToDelete.name}"`} and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

