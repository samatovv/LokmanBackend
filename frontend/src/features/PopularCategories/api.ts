import { apiRoot } from "@/api"

export const api = {
    getPopularCategories: () => {
        return apiRoot.get('/categories?popular=true', {
            withCredentials: true
        })
    },
    getTopProducts: (params?: { categoryId?: string }) => {
        return apiRoot.get(`/products/top/${params?.categoryId}`, {
            params, 
            withCredentials: true,
        });
    },
    
}