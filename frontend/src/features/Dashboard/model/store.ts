import { create } from "zustand";
import { ProductAnalyticsRes } from "../type";
import { api } from "../api";

interface AnalyticsStoreState {
  analytics: ProductAnalyticsRes | null;
  fetchAnalytics: () => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsStoreState>((set) => ({
  analytics: null,
  fetchAnalytics: async () => {
    try {
      const res = await api.getAnalytics();
      set({ analytics: res.data });
    } catch (error) {
      console.error('Get analytics error:', error);
    }
  }
}));
