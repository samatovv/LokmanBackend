import { apiRoot } from "@/api"
import { UserState } from "./type"


export const api = {
    getProfile: () => {
        return apiRoot.get('/users/me', {
            withCredentials: true
        })
    },
    getUsers: () => {
        return apiRoot.get('/users', {
            withCredentials: true
        })
    },
    getUserById: (id: number) => {
        return apiRoot.get(`/users/${id}`, {
            withCredentials: true
        })
    },
    deleteUser: (id: number) => {
        return apiRoot.delete(`/users/${id}`, {
            withCredentials: true
        })
    },
    updateUser: (id: number, data: UserState) => {
        return apiRoot.put(`/users/${id}`, data, {
            withCredentials: true,
        })
    },
    createUser: (data: UserState) => {
        return apiRoot.post('/users', data, {
            withCredentials: true
        })
    }
}