import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-primary mb-6">Refund Policy</h1>
      <Card>
        <CardHeader>
          <CardTitle>MobileWash Refund Policy</CardTitle>
          <CardDescription>Last updated: June 1, 2023</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            At MobileWash, we strive to provide the highest quality car washing services. If you are not completely satisfied with our service, we offer the following refund policy:
          </p>
          <h2 className="text-xl font-semibold">1. Service Quality Guarantee</h2>
          <p>
            If you are not satisfied with the quality of our service, please notify us within 24 hours of the service completion. We will either re-clean your vehicle at no additional cost or provide a full refund.
          </p>
          <h2 className="text-xl font-semibold">2. Cancellations</h2>
          <p>
            - Cancellations made more than 24 hours before the scheduled service will receive a full refund.
            <br />
            - Cancellations made within 24 hours of the scheduled service will receive a 50% refund.
            <br />
            - No refund will be provided for no-shows or cancellations after our team has arrived at the service location.
          </p>
          <h2 className="text-xl font-semibold">3. Refund Process</h2>
          <p>
            Refunds will be processed to the original method of payment within 5-10 business days.
          </p>
          <h2 className="text-xl font-semibold">4. Exceptions</h2>
          <p>
            We reserve the right to deny refund requests in cases of repeated claims or suspected abuse of our refund policy.
          </p>
          <p>
            For any questions or to request a refund, please contact our customer service team at support@mobilewash.com or call us at (555) 123-4567.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

