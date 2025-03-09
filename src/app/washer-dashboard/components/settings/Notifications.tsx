'use client'

import { useState } from 'react'
import { Bell, Mail, MessageSquare } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from '@/hooks/use-toast'


export default function NotificationsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const {toast} = useToast()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log({ emailNotifications, pushNotifications, smsNotifications })
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved successfully.",
    })
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Notification Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-orange-500" />
            <Label htmlFor="email-notifications">Email Notifications</Label>
          </div>
          <Switch
            id="email-notifications"
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-orange-500" />
            <Label htmlFor="push-notifications">Push Notifications</Label>
          </div>
          <Switch
            id="push-notifications"
            checked={pushNotifications}
            onCheckedChange={setPushNotifications}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-orange-500" />
            <Label htmlFor="sms-notifications">SMS Notifications</Label>
          </div>
          <Switch
            id="sms-notifications"
            checked={smsNotifications}
            onCheckedChange={setSmsNotifications}
          />
        </div>
        <Button type="submit">
          Save Notification Settings
        </Button>
      </form>
    </div>
  )
}

