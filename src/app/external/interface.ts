// Define an interface for a product
interface ProductI {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  images: string[];
}

// Define an interface for the API response
interface ApiResponse {
  products: ProductI[];
  total: number;
  skip: number;
  limit: number;
}

export type { ApiResponse, ProductI };