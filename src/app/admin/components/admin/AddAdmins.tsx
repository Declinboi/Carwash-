'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserPlus } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from '@/hooks/use-toast'
import { BASE_URL } from '@/redux/constants'
import axios from 'axios'


export default function AddAdminPage() {

  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!role) {
      toast({
        title: "Error",
        description: "Please select a role.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(
        `${BASE_URL}/api/create`,
        { email, name, role },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          // withCredentials: true, // If authentication is required
        }
      )

      console.log("API Response:", response.data)
      toast({
        title: "Admin added",
        description: `${name} has been added as a new admin.`,
      })
      router.push('/dashboard/admins')
    } catch (error: any) {
      console.error("Error adding admin:", error)
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to add admin.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }


  // const router = useRouter()
  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [role, setRole] = useState('')
  //  const {toast} = useToast()


  // const handleSubmit = async(e: React.FormEvent) => {
  //   e.preventDefault()
  //   // Here you would typically send this data to your backend
  //   const response = await axios.post(
  //     `${BASE_URL}/api/create`,
  //     { email,name, role },
  //     {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     }
  //   )

  //   console.log({ name, email, role })
  //   toast({
  //     title: "Admin added",
  //     description: `${name} has been added as a new admin.`,
  //   })
  //   router.push('/dashboard/admins')
  // }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Add New Admin</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <Label htmlFor="role">Role</Label>
          <Select onValueChange={setRole} required>
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="supervisor">Supervisor</SelectItem>
              <SelectItem value="staff">Staff</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="bg-orange-500 hover:bg-orange-600" disabled={loading} >
        {loading ? "Adding..." : <><UserPlus className="mr-2 h-4 w-4" /> Add Admin</>}
        </Button>
      </form>
    </div>
  )
}

