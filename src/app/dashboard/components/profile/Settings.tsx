'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from '@/hooks/use-toast'


export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    address: '123 Main St, City, Country',
    preferredLanguage: 'english',
  })

  const {toast} = useToast()

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (type: 'email' | 'sms' | 'push') => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }))
  }

  const handleSaveSettings = () => {
    // Here you would typically send this data to your backend
    console.log('Profile:', profile)
    console.log('Notifications:', notifications)
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    })
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Account Settings</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleProfileChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={profile.phone}
              onChange={handleProfileChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              value={profile.address}
              onChange={handleProfileChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="preferredLanguage">Preferred Language</Label>
            <Select 
              value={profile.preferredLanguage} 
              onValueChange={(value) => setProfile(prev => ({ ...prev, preferredLanguage: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Manage how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="emailNotifications">Email Notifications</Label>
            <Switch
              id="emailNotifications"
              checked={notifications.email}
              onCheckedChange={() => handleNotificationChange('email')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="smsNotifications">SMS Notifications</Label>
            <Switch
              id="smsNotifications"
              checked={notifications.sms}
              onCheckedChange={() => handleNotificationChange('sms')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="pushNotifications">Push Notifications</Label>
            <Switch
              id="pushNotifications"
              checked={notifications.push}
              onCheckedChange={() => handleNotificationChange('push')}
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSaveSettings} className="bg-orange-500 hover:bg-orange-600">
        Save Settings
      </Button>
    </div>
  )
}

