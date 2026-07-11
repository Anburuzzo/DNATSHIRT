export interface Product {
  id: string;

  name: string;

  price: number;

  category: string;

  image: string;

  description?: string;

  stock: number;

  status: "Active" | "Out of Stock";

  createdAt?: string;
}