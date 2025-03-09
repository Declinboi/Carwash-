import { FilteredBookingsManager } from "@/components/filtered-bookings-manager";


export default function CancelledBookingsPage() {
  return (
    <div className="container mx-auto py-10">
      <FilteredBookingsManager statusFilter="Cancelled" />
    </div>
  )
}

