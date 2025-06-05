import { create } from "zustand";
import { CategoryReq } from "../type";
import { api } from "../api";

interface CategoryStoreState {
    categories: CategoryReq[];
    fetchCategories: () => Promise<void>;
    createCategory: (data: FormData) => Promise<void>;
    updateCategory: (id: number, data: FormData) => Promise<void>;
    deleteCategory: (id: number) => Promise<void>;
    createSubCategory: (data: FormData) => Promise<void>;
    updateSubCategory: (id: number, data: FormData) => Promise<void>;
    deleteSubCategory: (id: number) => Promise<void>;
}

export const useCategoryStore = create<CategoryStoreState>((set) => ({
    categories: [],

    fetchCategories: async () => {
        const res = await api.getCategories();
        set({ categories: res.data });
    },

    createCategory: async (data) => {
        const res = await api.createCategory(data);
        set((state) => ({
            categories: [...state.categories, res.data]
        }));
    },

    updateCategory: async (id: number, data) => {
        const res = await api.updateCategory(id, data);
        set((state) => ({
            categories: state.categories.map((cat) =>
                cat.id === id ? res.data : cat
            ),
        }));
    },    

    deleteCategory: async (id) => {
        await api.deleteCategory(id);
        set((state) => ({
            categories: state.categories.filter((cat) => cat.id !== id),
        }));
    },

    createSubCategory: async (data) => {
        const res = await api.createSubCategory(data);
        set((state) => ({
            categories: [...state.categories, res.data]
        }));
    },

    updateSubCategory: async (id: number, data) => {
        const res = await api.updateSubCategory(id, data);
        set((state) => ({
            categories: state.categories.map((cat) =>
                cat.id === id ? res.data : cat
            ),
        }));
    },    

    deleteSubCategory: async (id) => {
        await api.deleteSubCategory(id);
        set((state) => ({
            categories: state.categories.filter((cat) => cat.id !== id),
        }));
    }
}));
