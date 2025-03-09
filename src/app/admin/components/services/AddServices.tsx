"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { PlusCircle, Upload } from "lucide-react"
import Image from "next/image"
import { useDropzone } from "react-dropzone"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import axiosInstance from "@/lib/utils"
import axios from "axios"

export default function AddServicePage() {
  const router = useRouter()
  const { toast } = useToast()

  const [serviceName, setServiceName] = useState("")
  const [description, setDescription] = useState("")
  const [priceSaloon, setPriceSaloon] = useState("")
  const [priceSUV, setPriceSUV] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setFile(file)
    setPreview(URL.createObjectURL(file))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let filePath = ""
      if (file) {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "prtybrxe") // replace with your preset

        const cloudRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dzhglqjrj/image/upload", // replace YOUR_CLOUD_NAME
          formData,
        )
        filePath = cloudRes.data.secure_url
      } else {
        filePath = "placeholder.jpg"
      }

      const newService = {
        title: serviceName,
        description,
        file_path: filePath,
        saloon_price: Number.parseFloat(priceSaloon),
        suv_price: Number.parseFloat(priceSUV),
      }

      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}CreateService`, newService)
      console.log("Service added:", res.data)
      toast({
        title: "Service added",
        description: `${serviceName} has been added successfully.`,
      })
      router.push("/dashboard/services")
    } catch (error: any) {
      console.error("Error adding service:", error)
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred while adding the service.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 p-6">
      <h2 className="text-2xl font-bold">Add New Service</h2>
      <div className="flex items-center justify-center w-full">
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl">
          <div className="space-y-2">
            <Label htmlFor="serviceName">Service Name</Label>
            <Input id="serviceName" value={serviceName} onChange={(e) => setServiceName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priceSaloon">Price (Saloon)</Label>
              <Input id="priceSaloon" value={priceSaloon} onChange={(e) => setPriceSaloon(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priceSUV">Price (SUV)</Label>
              <Input id="priceSUV" value={priceSUV} onChange={(e) => setPriceSUV(e.target.value)} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Upload Image</Label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
            >
              <input {...getInputProps()} />
              {preview ? (
                <div className="relative h-40 w-full">
                  <Image src={preview || "/placeholder.svg"} alt="Preview" layout="fill" objectFit="contain" />
                </div>
              ) : (
                <div>
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Drag and drop an image here, or click to select a file</p>
                </div>
              )}
            </div>
          </div>
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600 w-full" disabled={loading}>
            <PlusCircle className="mr-2 h-4 w-4" /> {loading ? "Processing..." : "Add Service"}
          </Button>
        </form>
      </div>
    </div>
  )
}

