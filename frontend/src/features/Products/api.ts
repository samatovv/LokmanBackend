import { apiRoot } from "@/api"
import { ProductResponse } from "./type"

export const api = {
    getProducts: (params?: { categoryId?: number, subCategoryId?: number, minPrice?: number, maxPrice?: number }) => {
        return apiRoot.get('/products', {
            params,
            withCredentials: true
        })
    },
    createProduct: async (data: FormData): Promise<ProductResponse> => {
        const response = await apiRoot.post('/products', data, {
            withCredentials: true
        });
    
        return response.data;
    },
    updateProduct: (id: number, data: FormData) => {
        return apiRoot.put(`/products/${id}`, data, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    deleteProduct: (id: number) => {
        return apiRoot.delete(`/products/${id}`, {
            withCredentials: true
        })
    },
    getProductById: (id: number) => {
        return apiRoot.get(`/products/${id}`, {
            withCredentials: true
        })
    }
}