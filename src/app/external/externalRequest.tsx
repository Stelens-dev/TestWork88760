import axios from "axios";
import { ApiResponse } from "./interface";

export const fetchExternalData = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>("https://dummyjson.com/products/category/smartphones");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching external data:", error.message);
    } else {
      console.error("An unknown error occurred");
    }
    throw error;
  }
};
