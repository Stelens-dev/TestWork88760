interface ProductI {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  images: string[];
}

interface ApiResponse {
  products: ProductI[];
  total: number;
  skip: number;
  limit: number;
}

export type { ApiResponse, ProductI };
