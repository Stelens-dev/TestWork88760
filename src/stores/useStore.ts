// store.ts
import { ProductI } from "@/app/external/interface";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "./interface";

interface Store {
  products: ProductI[];
  loading: boolean;
  user: User | null;
  error: string | null;
  currentYear: number;
  setProducts: (products: ProductI[]) => void;
  setLoading: (loading: boolean) => void;
  setUser: (user: User) => void;
  setError: (error: string | null) => void;
  clearUser: () => void;
}

const useStore = create<Store>()(
  persist(
    (set) => ({
      // Page Home
      products: [],
      loading: true,
      setProducts: (products) => set({ products }),
      setLoading: (loading) => set({ loading }),

      // Page Login
      user: null,
      error: null,
      setUser: (user) => set({ user }),
      setError: (error) => set({ error }),

      // Header
      clearUser: () => set({ user: null }),

      // Footer
      currentYear: new Date().getFullYear(),
    }),
    {
      name: "Store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ user: state.user }),
    },
  ),
);

export default useStore;
