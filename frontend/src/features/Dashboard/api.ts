import { apiRoot } from "@/api"

export const api = {
    getAnalytics: () => {
        return apiRoot.get('/analytics/products')
    }
}