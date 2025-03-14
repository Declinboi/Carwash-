import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios";
import { BASE_URL } from "@/redux/constants";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosInstance;
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
