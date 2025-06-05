import { create } from "zustand";
import { LoginReq, LoginRes } from "../type";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { api } from "../api";

interface AuthStoreState {
    logout: () => Promise<void>
    signIn: (data: LoginReq, router: AppRouterInstance) => Promise<LoginRes>
    loading: boolean
}

export const useAuthStore = create<AuthStoreState>((set) => ({
    loading: false,
    signIn: async (data, router) => {
        set({ loading: true });
        try {
            const res = await api.signIn(data);
            if(res.data.role === 'admin') {
                await router.push('/admin')
            }else if(res.data.role === 'user') {
                await router.push('/')
            }
            return res.data;
        } catch (error) {
            throw error;
        } finally {
            set({ loading: false });
        }
    },
    logout: async () => {
        try {
            await api.logout();
        } catch (error) {
            throw error;
        }
    }
}));