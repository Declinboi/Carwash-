import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Header from "../navigation/Header";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <div className="relative ">
      <Header />
      <div className="absolute overflow-hidden right-0 bottom-0 top-0 w-[37vw] -z-10 bg-primary "></div>
      <div className="grid lg:grid-cols-2 px-4 mx-auto container min-h-[90vh] gap-8 items-center py-12">
        <div className="space-y-8 backdrop-blur-md bg-white/30 py-4 rounded-lg md:backdrop-blur-none ">
          <h1 className="text-5xl md:text-6xl font-black text-black ">
            Ultimate care
            <br /> for your car
          </h1>
          <p className="text-gray-700 max-w-lg text-base">
            Get a sparkling clean car without breaking the bank! Our state of
            art car wash uses eco-friendly products and advance technology to
            give your vehicle the ultimate shine
          </p>
          <Button size="lg" className="  ">
            Order Now
          </Button>

          {/* Social Links */}
          <div className="flex space-x-4">
            <Link
              href="#"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20"
            >
              <Facebook className="w-5 h-5 text-black" />
            </Link>
            <Link
              href="#"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20"
            >
              <Twitter className="w-5 h-5 text-black" />
            </Link>
            <Link
              href="#"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20"
            >
              <Instagram className="w-5 h-5 text-black" />
            </Link>
            <Link
              href="#"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20"
            >
              <Linkedin className="w-5 h-5 text-black" />
            </Link>
          </div>
        </div>

        <div className="absolute o  -right-[250px] -z-10">
          <Image
            src="https://res.cloudinary.com/matrix-ecommerce/image/upload/v1732542806/A-white-jeep-car-on-transparent-background-PNG_k7tbld.png"
            alt="Modern car"
            width={7000}
            height={5000}
            className="object-contain h-[1000px]  w-[1000px] "
            priority
          />
        </div>
      </div>

      <div style={{textShadow: '2px 2px 4px rgba(255, 165, 0, 0.8)'}} className="absolute right-10 text-white bottom-10">
      you like it clean, we like it dirty.
      </div>
    </div>
  );
};

export default HeroSection;
