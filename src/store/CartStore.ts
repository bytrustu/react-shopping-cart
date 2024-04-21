import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { LOCAL_STORAGE_CART_KEY } from '@/constants';
import { Cart, Product } from '@/types';

type CartState = {
  cartProducts: Cart[];
  addProduct: (product: Product, quantity?: number) => void;
  addCartProducts: (products: Cart[]) => void;
  setCartProducts: (products: Cart[]) => void;
  removeProduct: (productId: number) => void;
  removeProducts: (productIds: number[]) => void;
  updateProductQuantity: (productId: number, quantity: number) => void;
  toggleProductCheck: (productId: number) => void;
  toggleAllProductsCheck: () => void;
  getCartProduct: (productId: number) => Cart | undefined;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartProducts: [],

      addProduct: (product, quantity = 1) => {
        const existingProduct = get().getCartProduct(product.id);
        if (existingProduct) {
          get().updateProductQuantity(product.id, existingProduct.quantity + quantity);
        } else {
          set((state) => ({
            cartProducts: [...state.cartProducts, { product, quantity, checked: true }],
          }));
        }
      },

      addCartProducts: (products) => {
        set((state) => ({
          cartProducts: [...state.cartProducts, ...products],
        }));
      },

      setCartProducts: (products) => {
        set({ cartProducts: products });
      },

      removeProduct: (productId) => {
        set((state) => ({
          cartProducts: state.cartProducts.filter((item) => item.product.id !== productId),
        }));
      },

      removeProducts: () => {
        get().cartProducts.forEach((item) => {
          if (item.checked) {
            get().removeProduct(item.product.id);
          }
        });
      },

      updateProductQuantity: (productId, quantity) => {
        set((state) => ({
          cartProducts: state.cartProducts.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item,
          ),
        }));
      },

      toggleProductCheck: (productId) => {
        set((state) => ({
          cartProducts: state.cartProducts.map((item) =>
            item.product.id === productId ? { ...item, checked: !item.checked } : item,
          ),
        }));
      },

      toggleAllProductsCheck: () => {
        const allChecked = get().cartProducts.every((item) => item.checked);
        set((state: { cartProducts: Cart[] }) => ({
          cartProducts: state.cartProducts.map((item) => ({ ...item, checked: !allChecked })),
        }));
      },

      getCartProduct: (productId) => get().cartProducts.find((item) => item.product.id === productId),
    }),
    {
      name: LOCAL_STORAGE_CART_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
