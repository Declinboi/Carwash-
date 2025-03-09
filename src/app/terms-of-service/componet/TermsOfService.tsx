import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-primary mb-6">Terms of Service</h1>
      <Card>
        <CardHeader>
          <CardTitle>MobileWash Terms of Service</CardTitle>
          <CardDescription>Last updated: June 1, 2023</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Welcome to MobileWash. By using our services, you agree to comply with and be bound by the following terms and conditions. Please read these carefully.
          </p>
          <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
          <p>
            By accessing or using MobileWash services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.
          </p>
          <h2 className="text-xl font-semibold">2. Use of Services</h2>
          <p>
            You agree to use MobileWash services only for lawful purposes and in accordance with these Terms of Service. You are responsible for maintaining the confidentiality of your account and password.
          </p>
          <h2 className="text-xl font-semibold">3. Service Availability</h2>
          <p>
            MobileWash reserves the right to modify, suspend, or discontinue any part of our services at any time without notice or liability.
          </p>
          <h2 className="text-xl font-semibold">4. Pricing and Payments</h2>
          <p>
            Prices for our services are subject to change without notice. We reserve the right to refuse service to anyone for any reason at any time.
          </p>
          <h2 className="text-xl font-semibold">5. Liability</h2>
          <p>
            MobileWash is not liable for any damages to your vehicle that are not directly caused by our services. We are not responsible for any pre-existing damage or wear and tear.
          </p>
          <h2 className="text-xl font-semibold">6. Privacy</h2>
          <p>
            Your use of MobileWash services is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.
          </p>
          <h2 className="text-xl font-semibold">7. Modifications to Terms</h2>
          <p>
            MobileWash reserves the right to modify these Terms of Service at any time. We will notify users of any significant changes via email or through our website.
          </p>
          <p>
            If you have any questions about these Terms of Service, please contact us at legal@mobilewash.com.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

