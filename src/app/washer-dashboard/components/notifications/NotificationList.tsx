import { Bell } from 'lucide-react'

const notifications = [
  { id: 1, message: "New booking request from Alice Johnson", time: "5 minutes ago" },
  { id: 2, message: "Booking #1234 has been completed", time: "1 hour ago" },
  { id: 3, message: "Customer feedback received for booking #5678", time: "2 hours ago" },
  { id: 4, message: "Reminder: Vehicle maintenance scheduled for tomorrow", time: "1 day ago" },
]

export function NotificationList() {
  return (
    <ul className="space-y-4">
      {notifications.map((notification) => (
        <li key={notification.id} className="flex items-start space-x-4">
          <Bell className="h-5 w-5 mt-0.5 text-blue-500" />
          <div>
            <p className="text-sm font-medium">{notification.message}</p>
            <p className="text-xs text-gray-500">{notification.time}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

