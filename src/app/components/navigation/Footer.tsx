import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="relative bg-orange-900 text-orange-100 py-16 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 z-0" 
        style={{ backgroundImage: "url('https://res.cloudinary.com/matrix-ecommerce/image/upload/v1732542806/A-white-jeep-car-on-transparent-background-PNG_k7tbld.png')" }}
      ></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-orange-300">PlatonicWash</h2>
            <p className="text-sm">You like it clean, we like it dirty.</p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-orange-300 transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="hover:text-orange-300 transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="hover:text-orange-300 transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="hover:text-orange-300 transition-colors">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-300">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About", "Services", "Pricing", "Contact"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-orange-300 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-300">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span>+234 806 668 3467</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span>info@mobilewash.com</span>
              </li>
              <li className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span>123 Wash St, Clean City, ST 12345</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-300">Newsletter</h3>
            <p className="text-sm mb-4">Stay updated with our latest offers and news.</p>
            <form className="space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-orange-800 border-orange-700 text-orange-100 placeholder-orange-400"
              />
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-orange-800 text-center">
          <p className="text-sm">&copy; 2023 PlatonicWash. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

