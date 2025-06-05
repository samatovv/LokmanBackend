import { create } from "zustand";
import { Product, ProductReq, ProductResponse } from "../type";
import { api } from "../api";

interface ProductStoreState {
    products: Product[]
    product: Product
    loading: boolean
    fetchProducts: (params?: { categoryId?: number, minPrice?: number, maxPrice?: number }) => void
    createProduct: (data: FormData) => Promise<ProductResponse>
    updateProduct: (id: number, data: ProductReq) => void
    deleteProduct: (id: number) => void
    getProductById: (id: number) => void
}

export const useProductStore = create<ProductStoreState>((set) => ({
    products: [],
    product: {} as Product,
    loading: false,
    fetchProducts: async (params) => {
        set({ loading: true });
        try {
            await new Promise((resolve) => setTimeout(resolve, 700));

            const res = await api.getProducts(params);
            set({ products: res.data, loading: false });
        } catch (error) {
            console.error('Get products error:', error);
            set({ loading: false });
        }
    },
    createProduct: async (data) => {
        try {
            const res = await api.createProduct(data);
            set((state) => ({ 
                products: [...state.products, res] 
            }));
            return res;
        } catch (error) {
            console.error('Create product error:', error);
            throw error;
        }
    },
    updateProduct: async (id, data) => {
        try {
          const formData = new FormData();
          formData.append("name", data.name);
          formData.append("price", data.price.toString());
          formData.append("description", data.description);
          formData.append("quantity", data.quantity);
          formData.append("article", data.article);
          formData.append("categoryId", data.category.id.toString());
          formData.append('isTop', data.isTop ? 'true' : 'false');
    
          if (data.image instanceof File) {
            formData.append("image", data.image);
          }
    
          const res = await api.updateProduct(id, formData);
    
          set((state) => ({
            products: state.products.map(product =>
              product.id === id ? res.data : product
            )
          }));
        } catch (error) {
          console.error("Update product error:", error);
        }
      },
    deleteProduct: async (id: number) => {
        try {
            await api.deleteProduct(id);
            set((state) => ({ 
                products: state.products.filter(product => product.id !== id) 
            }));
        } catch (error) {
            console.error('Delete product error:', error);
        }
    },
    getProductById: async (id: number) => {
        try {
            const res = await api.getProductById(id);
            set({ product: res.data });
            return res.data;
        } catch (error) {
            console.error('Get product by ID error:', error);
        }
    }
}));