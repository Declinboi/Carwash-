import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItem = {
  service: any
  carType: 'saloon' | 'suv'
  quantity: number
}

type CartStore = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (serviceId: string, carType: 'saloon' | 'suv') => void
  updateQuantity: (serviceId: string, carType: 'saloon' | 'suv', quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state: any) => {
        if (!item.service?.id) {
          console.error('Service ID is undefined:', item.service);
          return state; // Skip if service ID is invalid
        }
     
        const existingItem = state.items.find(
          (i: any) => i.service.id === item.service.id && i.carType === item.carType
        );
      
        if (existingItem) {
          return {
            items: state.items.map((i: any) =>
              i.service.id === item.service.id && i.carType === item.carType
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          };
        }
        return { items: [...state.items, item] };
      }),
      
      removeItem: (serviceId, carType) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.service.id === serviceId && item.carType === carType)
          ),
        })),
      updateQuantity: (serviceId, carType, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.service.id === serviceId && item.carType === carType
              ? { ...item, quantity }
              : item
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
)

