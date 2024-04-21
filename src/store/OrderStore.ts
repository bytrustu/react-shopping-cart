import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { LOCAL_STORAGE_ORDER_KEY } from '@/constants';
import { Order } from '@/types/order.type';

type OrderStore = {
  orders: Order[];
  addOrder: (order: Order) => void;
  setOrder: (order: Order) => void;
  setOrders: (orders: Order[]) => void;
  getOrderById: (orderId: number) => Order | undefined;
  isPaid: (orderId: number) => boolean;
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) => {
        set((state) => ({
          orders: [...state.orders, order],
        }));
      },

      setOrder: (newOrder) => {
        const newOrders = get().orders.map((order) => (order.id === newOrder.id ? newOrder : order));
        set({ orders: newOrders });
      },

      setOrders: (orders) => {
        set({ orders });
      },

      getOrderById: (orderId) => get().orders.find((order) => order.id === orderId),

      isPaid: (orderId) => {
        const order = get().getOrderById(orderId);
        return Boolean(order?.payment);
      },
    }),
    {
      name: LOCAL_STORAGE_ORDER_KEY,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    },
  ),
);
