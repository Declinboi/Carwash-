'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type FAQItem = {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "What types of vehicles do you service?",
    answer: "We service all types of personal vehicles including cars, SUVs, vans, and trucks. For commercial vehicles or special requests, please contact us directly."
  },
  {
    question: "How long does a typical car wash take?",
    answer: "A standard exterior wash typically takes about 15-20 minutes. For a full service wash including interior cleaning, it usually takes 30-45 minutes depending on the size and condition of the vehicle."
  },
  {
    question: "Do I need to be present for the car wash?",
    answer: "For mobile services, you don't need to be present as long as we have access to your vehicle. For in-station services, you can wait in our comfortable waiting area or drop off your car and pick it up later."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, and mobile payment options like Apple Pay and Google Pay. Cash is also accepted for in-person transactions."
  },
  {
    question: "Is your car wash eco-friendly?",
    answer: "Yes, we use environmentally friendly, biodegradable cleaning products and have water reclamation systems in place to minimize water waste."
  }
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    )
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-primary mb-6">Frequently Asked Questions</h1>
      <Card>
        <CardHeader>
          <CardTitle>Common Questions About Our Services</CardTitle>
          <CardDescription>Find answers to the most frequently asked questions about MobileWash</CardDescription>
        </CardHeader>
        <CardContent>
          {faqData.map((item, index) => (
            <div key={index} className="mb-4">
              <Button
                variant="ghost"
                className="w-full justify-between text-left font-medium"
                onClick={() => toggleItem(index)}
              >
                {item.question}
                {openItems.includes(index) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              {openItems.includes(index) && (
                <div className="mt-2 pl-4 text-gray-600">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

