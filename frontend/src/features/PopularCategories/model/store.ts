import { PopularCategoryState } from "@/features/Categories/type";
import { create } from "zustand";
import { api } from "../api";
import { Product } from "@/features/Products/type";

type PopularCategoriesStoreState = {
    popularCategories: PopularCategoryState[];
    fetchPopularCategories: () => void;
    fetchPopularProducts: (params: { categoryId: string }) => Promise<void>;
    popularProductsByCategory: Record<string, Product[]>; // 👈 новое поле
};

export const usePopularCategoriesStore = create<PopularCategoriesStoreState>((set, get) => ({
    popularCategories: [],
    popularProductsByCategory: {},

    fetchPopularCategories: async () => {
        const res = await api.getPopularCategories();
        set({ popularCategories: res.data });
    },

    fetchPopularProducts: async ({ categoryId }) => {
        try {
            const res = await api.getTopProducts({ categoryId });
            const current = get().popularProductsByCategory;

            set({
                popularProductsByCategory: {
                    ...current,
                    [categoryId]: res.data,
                }
            });
        } catch (error) {
            console.error("Get products error:", error);
        }
    },
}));
