"use client"

import * as React from "react"
import {
  AudioWaveform,
  BarChart,
  BookOpen,
  Bot,
  CalendarIcon,
  CarIcon,
  Command,
  DollarSign,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboardIcon,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  UserIcon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "PlatonicWash",
      logo: GalleryVerticalEnd,
      plan: "washers dashboard",
    }
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard?view=overview",
      icon: LayoutDashboardIcon,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/washer-dashboard/dashboard/overview",
        },
        {
          title: "Notifications",
          url: "/washer-dashboard/dashboard/notifications",
        }
        // {
        //   title: "Analytics",
        //   url: "?view=analytics",
        // },
        // {
        //   title: "Performance",
        //   url: "?view=performance",
        // },
      ],
    },
    {
      title: "Bookings",
      url: "/bookings?status=all",
      icon: CalendarIcon,
      isActive: true,
      items: [
         {
          title: "Washer Bookings",
          url: "/washer-dashboard/bookings/all-bookings",
        },
        {
          title: "Pending",
          url: "/washer-dashboard/bookings/pending-bookings",
        },
        {
          title: "Completed",
          url: "/washer-dashboard/bookings/completed-bookings",
        },
        {
          title: "Cancelled",
          url: "/washer-dashboard/bookings/cancelled-bookings",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      isActive: true,
      items: [
        {
          title: "General",
          url: "/washer-dashboard/settings/general",
        },
        {
          title: "Notifications",
          url: "/washer-dashboard/settings/notifications-settings",
        }
      ],
    },
  ]
}

export function WasherSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
