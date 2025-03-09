"use client";

import * as React from "react"
import { CarFront, GalleryVerticalEnd } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import Link from "next/link";
import { usePathname } from "next/navigation";

// This is sample data.
const data = {
    navMain: [
      {
        title: "Home",
        url: "/dashboard",
        items: [],
      },
      {
        title: "Services",
        url: "/services",
        items: [
       
          {
            title: "Book a Wash",
            url: "/dashboard/book-wash",
          },
          {
            title: "Custom Washes",
            url: "/dashboard/services/custom",
          },
          {
            title: "Apply as Washer",
            url: "/dashboard/services/washer-application",
          },
        ],
      },
      {
        title: "My Account",
        url: "/account",
        items: [
          {
            title: "Profile",
            url: "/dashboard/account/profile",
          },
          {
            title: "My Bookings",
            url: "/dashboard/account/my-bookings",
          },
          {
            title: "Payment Methods",
            url: "/dashboard/account/payment-methods",
          },
      
          {
            title: "Settings",
            url: "/dashboard/account/settings",
          },
        ],
      },
      {
        title: "Help & Support",
        url: "/support",
        items: [
          {
            title: "FAQs",
            url: "/faq",
          },
          {
            title: "Contact Us",
            url: "/contact",
          },
          {
            title: "Refund Policy",
            url: "/refund-policy",
          },
          {
            title: "Terms of Service",
            url: "/terms-of-service",
          },
        ],
      },
    ],
  };
  

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
                  <CarFront  className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">PlatonicWash</span>
                  <span className="">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
             {item.items?.length ?  <p>{item.title}</p> : <a href={item.url}   
                  className={` ${
                            `${pathname}` === item.url
                              ? "text-orange-500 bg-[#ffedd5]"
                              : ""
                          }  font-medium `} 
                          >
                    {item.title}
                  </a>  }     
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild 
                       
                        className={` ${
                            `${pathname}` === item.url
                              ? "text-orange-500 bg-[#ffedd5]"
                              : ""
                          }   `}
                        >
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
