"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import axios from "axios" // or axiosInstance if you have a custom instance
import Image from "next/image"
import { Edit2, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import axiosInstance from "@/lib/utils"

type ServiceAPIResponse = {
  id: number
  title: string
  description: string
  file_path: string
  saloon_price: number
  suv_price: number
}

type Service = {
  id: number
  name: string
  description: string
  price: {
    saloon: string
    suv: string
  }
  image: string
}

export default function EditServicesPage() {
  const { toast } = useToast()

  const [services, setServices] = useState<Service[]>([])
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null)

  // 1. Fetch services from the backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get<ServiceAPIResponse[]>(`${process.env.NEXT_PUBLIC_API_URL}services`)
        // Map the API fields to your local structure
        const mapped = res.data.map((item) => ({
          id: item.id,
          name: item.title,
          description: item.description,
          image: item.file_path,
          price: {
            saloon: item.saloon_price.toString(),
            suv: item.suv_price.toString(),
          },
        }))
        setServices(mapped)
      } catch (error: any) {
        console.error("Error fetching services:", error)
        toast({
          title: "Error",
          description:
            error.response?.data?.message ||
            "Could not fetch services from the server.",
          variant: "destructive",
        })
      }
    }

    fetchServices()
  }, [toast])

  // 2. Handle "Edit" button: open modal
  const handleEdit = (service: Service) => {
    setEditingService({ ...service })
    setIsEditModalOpen(true)
  }

  // 3. Save changes (PUT request)
  const handleSave = async () => {
    if (!editingService) return

    try {
      // Convert saloon and suv prices to number
      const saloonPriceNum = parseFloat(editingService.price.saloon)
      const suvPriceNum = parseFloat(editingService.price.suv)

      const payload = {
        title: editingService.name,
        description: editingService.description,
        file_path: editingService.image,
        saloon_price: saloonPriceNum,
        suv_price: suvPriceNum,
      }

      await axiosInstance.put(`/services/${editingService.id}`, payload)

      // Update local state
      setServices((prev) =>
        prev.map((svc) =>
          svc.id === editingService.id ? editingService : svc
        )
      )

      toast({
        title: "Service updated",
        description: `${editingService.name} has been updated successfully.`,
      })
      setIsEditModalOpen(false)
    } catch (error: any) {
      console.error("Error updating service:", error)
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "Could not update service. Please try again.",
        variant: "destructive",
      })
    }
  }

  // 4. Handle "Delete" button: open confirm dialog
  const handleDelete = (service: Service) => {
    setServiceToDelete(service)
    setIsDeleteDialogOpen(true)
  }

  // 5. Confirm delete (DELETE request)
  const confirmDelete = async () => {
    if (!serviceToDelete) return

    try {
      await axiosInstance.delete(`/services/${serviceToDelete.id}`)
      setServices((prev) =>
        prev.filter((svc) => svc.id !== serviceToDelete.id)
      )
      toast({
        title: "Service deleted",
        description: `${serviceToDelete.name} has been deleted successfully.`,
      })
    } catch (error: any) {
      console.error("Error deleting service:", error)
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "Could not delete service. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleteDialogOpen(false)
    }
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Services</h2>

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
                <Image
                  src={service.image}
                  alt={service.name}
                  width={100}
                  height={75}
                />
              </TableCell>
              <TableCell>{service.name}</TableCell>
              <TableCell>{service.description}</TableCell>
              <TableCell>{service.price.saloon}</TableCell>
              <TableCell>{service.price.suv}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleEdit(service)}
                  className="bg-orange-500 hover:bg-orange-600 mr-2"
                >
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(service)}
                  variant="destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          {editingService && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSave()
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editingService.name}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingService.description}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priceSaloon">Price (Saloon)</Label>
                  <Input
                    id="priceSaloon"
                    value={editingService.price.saloon}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        price: {
                          ...editingService.price,
                          saloon: e.target.value,
                        },
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceSUV">Price (SUV)</Label>
                  <Input
                    id="priceSUV"
                    value={editingService.price.suv}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        price: {
                          ...editingService.price,
                          suv: e.target.value,
                        },
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={editingService.image}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      image: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this service?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              service
              {serviceToDelete && ` "${serviceToDelete.name}"`} and remove it
              from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                confirmDelete()
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
