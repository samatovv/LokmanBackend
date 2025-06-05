import { apiRoot } from "@/api"

export const api = {
    getBanners: () => {
        return apiRoot.get('/banners', {
            withCredentials: true
        })
    },
    getBannerById: (id: number) => {
        return apiRoot.get(`/banners/${id}`, {
            withCredentials: true
        })
    },
    createBanner: (data: FormData) => {
        return apiRoot.post('/banners', data, {
            withCredentials: true
        })
    },
    updateBanner: (id: number, data: FormData) => {
        return apiRoot.put(`/banners/${id}`, data, {
            withCredentials: true
        })
    },
    deleteBanner: (id: number) => {
        return apiRoot.delete(`/banners/${id}`, {
            withCredentials: true
        })
    }
}