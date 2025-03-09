"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { NavUser } from "@/components/nav-user";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Breadcrumbs } from "../components/navigation/Breadcrum";

// Data for user
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

// Extract Breadcrumb component

// Extract content logic into a separate component

// Main Page Component
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Log data for client-side

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex pr-5 h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />

            <Breadcrumbs />
          </div>
          <div>
            <NavUser user={data.user} />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
