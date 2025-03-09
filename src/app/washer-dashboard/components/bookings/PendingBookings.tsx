import { FilteredBookingsManager } from "@/components/filtered-bookings-manager"

export default function PendingBookingsPage() {
  return (
    <div className="container mx-auto py-10">
      <FilteredBookingsManager statusFilter="Pending" />
    </div>
  )
}