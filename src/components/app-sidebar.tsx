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
      name: "MobileWash",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
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
          url: "/admin/dashboard/overview",
        },
        {
          title: "Notifications",
          url: "/admin/dashboard/notifications",
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
          title: "All Bookings",
          url: "/admin/bookings/all-bookings",
        },
        {
          title: "Pending",
          url: "/admin/bookings/pending-bookings",
        },
        {
          title: "Completed",
          url: "/admin/bookings/completed-bookings",
        },
        {
          title: "Cancelled",
          url: "/admin/bookings/cancelled-bookings",
        },
      ],
    },
    {
      title: "Services",
      url: "/services",
      icon: CarIcon,
      isActive: true,
      items: [
        {
          title: "Add Service",
          url: "/admin/services/add-services",
        },
        {
          title: "Edit Services",
          url: "/admin/services/edit-services",
        },
      ],
    },
    {
      title: "Admins",
      url: "/settings",
      icon: UserIcon,
      isActive: true,
      items: [
        {
          title: "All Admins",
          url: "/admin/admins/all-admins",
        },
        {
          title: "Add Admins",
          url: "/admin/admins/add-admins",
        },
        {
          title: "Edit Admins",
          url: "/admin/admins/edit-admins",
        }
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
          url: "/admin/settings/general",
        },
        {
          title: "Notifications",
          url: "/admin/settings/notifications-settings",
        }
      ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
