"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/redux/api/userApiSlice";
import { setCredentials } from "@/redux/feature/authSlice";
import { useDispatch } from "react-redux";

// Create an Axios instance with a default base URL

export default function RegisterPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    city: "",
    address: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [register, { isLoading }] = useRegisterMutation(); // Redux mutation hook

  // Handle text input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select changes (for dropdowns like gender)
  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure passwords match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
      });
      return;
    }

    // Prepare API payload
    const payload = {
      name: formData.name,
      email: formData.email,
      country: formData.country,
      city: formData.city,
      address: formData.address,
      gender: formData.gender,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
    };

    try {
      const response = await register(payload).unwrap();
      console.log("Registration response:", response);

      // Store user data in Redux state
      dispatch(setCredentials(response));

      // Show success message
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully.",
      });

      // Redirect user after successful registration
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Registration error:", error);

      // Display API error message if available
      toast({
        title: "Registration Failed",
        description:
          error?.data?.message ||
          "Something went wrong while creating your account.",
      });
    }
  };

  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   country: '',
  //   city: '',
  //   address: '',
  //   gender: '',
  //   password: '',
  //   confirmPassword: '',
  // })

  // const { toast } = useToast()
  //  const router = useRouter()
  // // Handle text input changes
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target
  //   setFormData(prev => ({ ...prev, [name]: value }))
  // }

  // // Handle select change
  // const handleSelectChange = (name: string) => (value: string) => {
  //   setFormData(prev => ({ ...prev, [name]: value }))
  // }

  // // Handle form submission and send registration data using the Axios instance
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()

  //   // Map confirmPassword to password_confirmation for the API.
  //   const payload = {
  //     name: formData.name,
  //     email: formData.email,
  //     country: formData.country,
  //     city: formData.city,
  //     address: formData.address,
  //     gender: formData.gender,
  //     password: formData.password,
  //     password_confirmation: formData.confirmPassword,
  //   }

  //   try {
  //     const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}register`, payload)
  //     console.log('Registration response:', response.data)
  //     toast({
  //       title: "Registration Successful",
  //       description: "Your account has been created successfully.",
  //     })
  //    router.push("/dashboard")

  //   } catch (error: any) {
  //     console.error('Registration error:', error)
  //     toast({
  //       title: "Registration Failed",
  //       description: error.response?.data?.message || "Something went wrong while creating your account.",
  //     })
  //   }
  // }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-1/2 relative">
        <Image
          src="https://res.cloudinary.com/matrix-ecommerce/image/upload/v1732542806/A-white-jeep-car-on-transparent-background-PNG_k7tbld.png"
          alt="Registration background"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-orange-600 bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">
            Join MobileWash Today
          </h1>
        </div>
      </div>
      <div className="md:w-1/2 p-8 flex items-center justify-center flex-col ">
        <h2 className="text-2xl font-bold mb-6">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6 w-[90%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={handleSelectChange("gender")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-primary !py-4 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>
      </div>
    </div>
  );
}
