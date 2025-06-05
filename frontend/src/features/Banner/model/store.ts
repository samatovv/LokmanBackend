import { create } from "zustand"
import { BannerState } from "../type"
import { api } from "../api"

interface BannerStoreState {
    loading: boolean
    banners: BannerState[]
    banner: BannerState
    fetchBanners: () => void
    getBannerById: (id: number) => void
    createBanner: (data: FormData) => Promise<void>
    updateBanner: (id: number, data: FormData) => void
    deleteBanner: (id: number) => void
}

export const useBannerStore = create<BannerStoreState>((set) => ({
    loading: false,
    banners: [],
    banner: {} as BannerState,
    fetchBanners: async () => {
        set({ loading: true });
        try {
            const res = await api.getBanners();
            set({ banners: res.data, loading: false });
        } catch (error) {
            console.error('Get banners error:', error);
            set({ loading: false });
        }
    },
    getBannerById: async (id: number) => {
        try {
            const res = await api.getBannerById(id);
            set({ banner: res.data });
        } catch (error) {
            console.error('Get banner by ID error:', error);
        }
    },
    createBanner: async (data) => {
        try {
            const res = await api.createBanner(data);
            set((state) => ({ 
                banners: [...state.banners, res.data] 
            }));
        } catch (error) {
            console.error('Create banner error:', error);
            throw error;
        }
    },
    updateBanner: async (id, data) => {
        try {
          const res = await api.updateBanner(id, data);
          set((state) => ({
            banners: state.banners.map(banner =>
              banner.id === id ? res.data : banner
            )
          }));
        } catch (error) {
          console.error("Update banner error:", error);
        }
      },
      deleteBanner: async (id) => {
        try {
          await api.deleteBanner(id);
          set((state) => ({ 
            banners: state.banners.filter(banner => banner.id !== id) 
          }));
        } catch (error) {
          console.error('Delete banner error:', error);
        }
      }
}))