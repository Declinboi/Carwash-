'use client'

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CalendarIcon, CheckCircle } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from '@/hooks/use-toast'


const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  dateOfBirth: z.date({
    required_error: "Please select a date of birth.",
  }),
  address: z.string().min(5, {
    message: "Please enter your full address.",
  }),
  experience: z.enum(["0-1", "1-3", "3-5", "5+"]),
  ownTransportation: z.enum(["yes", "no"]),
  availability: z.string().min(1, {
    message: "Please describe your availability.",
  }),
  whyJoin: z.string().min(50, {
    message: "Please provide at least 50 characters.",
  }),
})

export default function ApplyAsWasherPage() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
 const {toast }  = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      address: "",
      experience: "0-1",
      ownTransportation: "no",
      availability: "",
      whyJoin: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you would typically send this data to your backend
    console.log(values)
    setIsSuccessModalOpen(true)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Apply as a Washer</h1>
      
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-orange-100">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Why Become a MobileWash Washer?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Flexible working hours - perfect for students or as a side hustle</li>
              <li>Competitive pay with opportunities for bonuses</li>
              <li>Be part of a growing community of car care professionals</li>
              <li>Regular training and skill development opportunities</li>
              <li>Potential for career growth within the company</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-orange-100">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Fill out the application form below</li>
              <li>Our team will review your application</li>
              <li>If selected, you&apos;ll be invited for an interview and skills assessment</li>
              <li>Complete our comprehensive training program</li>
              <li>Start earning as a MobileWash professional!</li>
            </ol>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Application Form</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+234 806 668 3467" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                field.value.toLocaleDateString()
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St, City, State, ZIP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Car Washing Experience</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your experience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 years</SelectItem>
                          <SelectItem value="1-3">1-3 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5+">5+ years</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ownTransportation"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Do you have your own transportation?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="yes" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Yes
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="no" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              No
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please describe your availability (e.g., weekdays, weekends, specific hours)"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="whyJoin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Why do you want to join MobileWash?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us why you'd be a great addition to our team..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Please provide at least 50 characters.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600">Submit Application</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Application Submitted Successfully!</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col items-center mt-4">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <p className="text-center">
                  Thank you for your interest in joining MobileWash as a washer. We have received your application and our team will review it shortly. If your qualifications match our current needs, we will contact you for the next steps in the process.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setIsSuccessModalOpen(false)} className="mt-4 bg-orange-500 hover:bg-orange-600">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

