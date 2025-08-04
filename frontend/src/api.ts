import axios from "axios";

export const apiRoot = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://backend.sigmamedtrade.kg",
  })
  
  export const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://backend.sigmamedtrade.kg"
  