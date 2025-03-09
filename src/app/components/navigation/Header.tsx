'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const Header = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="w-full">
      <div className="container px-4 mx-auto">
        <nav className="flex items-center justify-between py-6">
          <Link href="/" className="text-2xl text-primary font-bold ">
            <Image
            src={"/assets/logo1.png"}
            alt="PlatonicWash Logo"
            width={100}
            height={100}
            className='object-cover sm:w-[200px] w-[130px]  absolute -top-10  sm:-top-16 '
            />
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium text-black hover:text-blue-100">
              Home
            </Link>
            <Link href="/about-us" className="text-sm font-medium text-black hover:text-blue-100">
              About Us
            </Link>
            <Link href="/product" className="text-sm font-medium text-black hover:text-blue-100">
              Product
            </Link>
            <Link href="/contact" className="text-sm font-medium text-black hover:text-blue-100">
              Contact Us
            </Link>
            <Button onClick={() => {router.push('/login')}} variant="outline" className="text-primary border-white hover:bg-white hover:text-blue-600">
              Login
            </Button>
            <Button onClick={() => {router.push('/register')}} className="bg-white text-primary hover:bg-blue-100">
              Register
            </Button>
          </div>
          <div className="md:hidden absolute z-20 top-4 right-4 ">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden flex flex-col px-5 py-5 bg-white absolute z-10 top-0 left-0 right-0 w-full" >
             <Link href="/" className="text-2xl text-black font-bold">
            Platonic<span className='text-primary' >Wash</span>
          </Link>
            <div className="flex flex-col space-y-4 px-3 py-4">
              <Link href="/" className="text-sm font-medium text-black hover:text-blue-100">
                Home
              </Link>
              <Link href="/about-us" className="text-sm font-medium text-black hover:text-blue-100">
                About Us
              </Link>
              <Link href="/product" className="text-sm font-medium text-black hover:text-blue-100">
                Product
              </Link>
              <Link href="/contact" className="text-sm font-medium text-black hover:text-blue-100">
                Contact Us
              </Link>
              <Button onClick={() => {router.push('/login')}} variant="outline" className="text-primary border-white hover:bg-white hover:text-blue-600">
                Login
              </Button>
              <Button onClick={() => {router.push('/register')}} className="bg-white text-primary hover:bg-blue-100">
                Register
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

