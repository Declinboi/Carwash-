'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Edit2, Trash2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

const initialAdmins = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Manager" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Supervisor" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Staff" },
]

type Admin = typeof initialAdmins[0]

export default function EditAdminsPage() {
  const [admins, setAdmins] = useState(initialAdmins)
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [adminToDelete, setAdminToDelete] = useState<Admin | null>(null)
  const {toast} = useToast()
  const handleEdit = (admin: Admin) => {
    setEditingAdmin({ ...admin })
    setIsEditModalOpen(true)
  }

  const handleSave = () => {
    if (editingAdmin) {
      setAdmins(admins.map(admin => 
        admin.id === editingAdmin.id ? editingAdmin : admin
      ))
      setIsEditModalOpen(false)
      toast({
        title: "Admin updated",
        description: `${editingAdmin.name}'s information has been updated successfully.`,
      })
    }
  }

  const handleDelete = (admin: Admin) => {
    setAdminToDelete(admin)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (adminToDelete) {
      setAdmins(admins.filter(admin => admin.id !== adminToDelete.id))
      setIsDeleteDialogOpen(false)
      toast({
        title: "Admin deleted",
        description: `${adminToDelete.name} has been removed from the system.`,
      })
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Edit Admins</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.map((admin) => (
            <TableRow key={admin.id}>
              <TableCell>{admin.name}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>{admin.role}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(admin)} className="bg-orange-500 hover:bg-orange-600 mr-2">
                  <Edit2 className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button onClick={() => handleDelete(admin)} variant="destructive">
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
            <DialogTitle>Edit Admin</DialogTitle>
          </DialogHeader>
          {editingAdmin && (
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editingAdmin.name}
                  onChange={(e) => setEditingAdmin({ ...editingAdmin, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editingAdmin.email}
                  onChange={(e) => setEditingAdmin({ ...editingAdmin, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select 
                  value={editingAdmin.role} 
                  onValueChange={(value) => setEditingAdmin({ ...editingAdmin, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Supervisor">Supervisor</SelectItem>
                    <SelectItem value="Staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
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
            <AlertDialogTitle>Are you sure you want to delete this admin?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the admin account
              {adminToDelete && ` for ${adminToDelete.name}`} and remove their access to the system.
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

