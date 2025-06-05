export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    quantity: string;
    article: string;
    category: Category;
    // subcategory?: Category[];
    createdAt: string; 
    isTop: boolean
  }

  export type Category = {
    id: number;
    name?: string;
  }

  export interface ProductReq {
    id?: number;
    name: string;
    price: number;
    description: string;
    image: File | string | null;
    quantity: string;
    article: string;
    category: Category;
    subcategory?: Category;
    isTop?: boolean
  }

  export interface ProductResponse {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;       
    quantity: string;
    article: string;
    category: Category;
    createdAt: string;
    isTop: boolean
  }
  
  export type CartItem = {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
  