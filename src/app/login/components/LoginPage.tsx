"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { BASE_URL } from "@/redux/constants";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useLoginMutation } from "@/redux/api/userApiSlice";
import { RootState } from "@/redux/store";
import { setCredentials } from "@/redux/feature/authSlice";
import { toast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();
  const router = useRouter();

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const searchParams = useSearchParams(); 
  const redirect = searchParams.get("redirect") || "/dashboard"; 

  useEffect(() => {
    if (userInfo) {
      router.push (redirect);
    }
  }, [router, redirect, userInfo]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials(res)); // No need to spread `res`
      router.push(redirect);
    } catch (error: any) {
      setError("Login failed. Please check your credentials and try again.");
    }

    // const handleLogin = async (e: React.FormEvent) => {
    //   e.preventDefault()
    //   setError(null)
    //   try {
    //     const response = await axios.post(
    //       `${BASE_URL}/api/login`,
    //       { email, password },
    //       {
    //         headers: {
    //           'Content-Type': 'application/json'
    //         }
    //       }
    //     )

    //     // Assuming response.data has the following structure:
    //     // {
    //     //   "user": { ... },
    //     //   "role": "user",
    //     //   "token": "your_jwt_token"
    //     // }
    //     const { token } = response.data

    //     // Store the token in a cookie (expires in 1 day, Secure and SameSite options added)
    //     Cookies.set('auth_token', token, { expires: 1, secure: true, sameSite: 'strict' })

    //     console.log('Login successful. Token stored in cookie:', token)
    //     // Redirect to a protected route (e.g., dashboard)
    //     window.location.href = '/dashboard'
    //   } catch (err: any) {
    //     console.error('Login error:', err)
    //     setError('Login failed. Please check your credentials and try again.')
    //   }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col lg:flex-row">
      {/* Left side - Image with overlay */}
      <div className="lg:flex-1 lg:relative">
        <div className="lg:absolute inset-0 bg-orange-900 opacity-50 z-10" />
        <Image
          src="https://res.cloudinary.com/matrix-ecommerce/image/upload/v1732542806/A-white-jeep-car-on-transparent-background-PNG_k7tbld.png"
          alt="Car wash service"
          layout="fill"
          objectFit="cover"
          className="hidden lg:block"
        />
        <div className="lg:hidden h-48 relative">
          <div className="absolute inset-0 bg-orange-900 opacity-50 z-10" />
          <Image
            src="https://res.cloudinary.com/matrix-ecommerce/image/upload/v1732542806/A-white-jeep-car-on-transparent-background-PNG_k7tbld.png"
            alt="Car wash service"
            layout="fill"
            objectFit="cover"
          />
        </div>
        {/* Text overlay */}
        <div className="lg:absolute hidden inset-0 items-center justify-center z-20">
          <h1 className="text-4xl font-bold text-white text-center px-4">
            Welcome to MobileWash
          </h1>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-orange-950">
              Log In
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="rounded border-gray-300 text-orange-600 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-600">
                      Remember me
                    </Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-orange-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white mt-4"
                disabled={isLoading}
              >
               {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <p className="text-sm text-center text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-orange-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
