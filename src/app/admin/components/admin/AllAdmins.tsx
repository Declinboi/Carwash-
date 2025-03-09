import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PlusCircle } from 'lucide-react'
import Link from "next/link"

const admins = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Manager" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Supervisor" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Staff" },
]

export default function AllAdminsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-orange-600">All Admins</h1>
        <Link href="/dashboard/admins/add">
          <Button className="bg-orange-500 hover:bg-orange-600">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Admin
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
           
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.map((admin) => (
            <TableRow key={admin.id}>
              <TableCell>{admin.name}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>{admin.role}</TableCell>
           
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

