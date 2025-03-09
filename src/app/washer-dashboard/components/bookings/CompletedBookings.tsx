import { FilteredBookingsManager } from "@/components/filtered-bookings-manager"

export default function CompletedBookingsPage() {
  return (
    <div className="container mx-auto py-10">
      <FilteredBookingsManager statusFilter="Completed" />
    </div>
  )
}

