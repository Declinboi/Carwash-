"use client";

import { useState } from "react";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useCartStore } from "@/lib/store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import Cookies from "js-cookie";
import { logout } from "@/redux/feature/authSlice";
import { useLogoutMutation } from "@/redux/api/userApiSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, addItem, removeItem, updateQuantity } = useCartStore();
  const totalItems = items?.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items?.reduce(
    (sum, item) =>
      sum +
      parseInt(item?.service?.price[item.carType].replace(",", "")) *
        item.quantity,
    0
  );

  const dropdownVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleIncrement = (serviceId: string, carType: "saloon" | "suv") => {
    const item = items.find(
      (item) => item.service.id === serviceId && item.carType === carType
    );
    if (item) {
      updateQuantity(serviceId, carType, item.quantity + 1);
    }
  };

  const handleDecrement = (serviceId: string, carType: "saloon" | "suv") => {
    const item = items.find(
      (item) => item.service.id === serviceId && item.carType === carType
    );
    if (item && item.quantity > 1) {
      updateQuantity(serviceId, carType, item.quantity - 1);
    } else if (item && item.quantity === 1) {
      removeItem(serviceId, carType);
    }
  };

  const dispatch = useDispatch();
  const router = useRouter();

  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  // const handleLogout = async () => {
  //   try {
  //     await axios.post(`${process.env.NEXT_PUBLIC_API_URL}logout`, null, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //   } catch (error) {
  //     console.error('Logout error:', error);
  //   }
  //   // Remove the token from cookies
  //   Cookies.remove('auth_token');
  //   // Redirect to login page or home
  //   window.location.href = '/login';
  // };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center gap-2">
          <DropdownMenu open={isCartOpen} onOpenChange={setIsCartOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-orange-500 text-xs text-white flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <AnimatePresence>
              {isCartOpen && (
                <DropdownMenuContent
                  align="end"
                  className="w-80"
                  forceMount
                  asChild
                >
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    transition={{ duration: 0.2 }}
                  >
                    <DropdownMenuLabel>Cart Preview</DropdownMenuLabel>
                    <ScrollArea className="h-[300px]">
                      {items.map((item) => (
                        <DropdownMenuItem
                          key={`${item.service.id}-${item.carType}`}
                          className="flex-col items-start"
                        >
                          <div className="flex justify-between w-full">
                            <span>
                              {item.service.name} ({item.carType})
                            </span>
                            <span>
                              ₦
                              {parseInt(
                                item.service.price[item.carType].replace(
                                  ",",
                                  ""
                                )
                              ) * item.quantity}
                            </span>
                          </div>
                          <div className="flex items-center mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                handleDecrement(item.service.id, item.carType)
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="mx-2">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                handleIncrement(item.service.id, item.carType)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 ml-2"
                              onClick={() =>
                                removeItem(item.service.id, item.carType)
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </ScrollArea>
                    <Separator />
                    <div className="p-2">
                      <div className="flex justify-between font-semibold mb-2">
                        <span>Total:</span>
                        <span>₦{totalAmount}</span>
                      </div>
                      <div className="space-y-2">
                        <Link href="/dashboard/cart" passHref>
                          <Button className="w-full">View Cart</Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </DropdownMenuContent>
              )}
            </AnimatePresence>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Upgrade to Pro
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="/dashboard/account/profile">
                  <DropdownMenuItem>
                    <BadgeCheck className="mr-2 h-4 w-4" />
                    Account
                  </DropdownMenuItem>
                </Link>
                <Link href="/dashboard/account/my-bookings">
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    My Bookings
                  </DropdownMenuItem>
                </Link>
                <Link href="/dashboard/account/notifications">
                  <DropdownMenuItem>
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
