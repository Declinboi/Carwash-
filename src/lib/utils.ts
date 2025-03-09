import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // e.g., "https://investment-api-oobo.onrender.com/api/v1"
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
