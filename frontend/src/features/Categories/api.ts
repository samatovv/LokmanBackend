import { apiRoot } from "@/api"

export const api = {
    getCategories: () => {
        return apiRoot.get('/categories', {
            withCredentials: true
        })
    },
    getCategoryById: (id: number) => {
        return apiRoot.get(`/categories/${id}`, {
            withCredentials: true
        })
    },
    createCategory: (data: FormData) => {
        return apiRoot.post('/categories', data, {
            withCredentials: true
        })
    },
    updateCategory: (id: number, data: FormData) => {
        return apiRoot.put(`/categories/${id}`, data, {
            withCredentials: true
        })
    },
    deleteCategory: (id: number) => {
        return apiRoot.delete(`/categories/${id}`, {
            withCredentials: true
        })
    },
    createSubCategory: (data: FormData) => {
        return apiRoot.post(`/categories/sub`, data, {
            withCredentials: true
        })
    },
    deleteSubCategory: (id: number) => {
        return apiRoot.delete(`/categories/sub/${id}`, {
            withCredentials: true
        })
    },
    updateSubCategory: (id: number, data: FormData) => {
        return apiRoot.put(`/categories/sub/${id}`, data, {
            withCredentials: true
        })
    }
}