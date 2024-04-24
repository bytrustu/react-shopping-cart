import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { CART_MAX_QUANTITY_VALUE, LOCAL_STORAGE_CART_KEY } from '@/constants';
import { Cart, Product } from '@/types';

type CartState = {
  cartProducts: Cart[];
  addProduct: (product: Product, quantity?: number) => void;
  setCartProducts: (cartProducts: Cart[]) => void;
  removeProduct: (productId: number) => void;
  removeProducts: (productIds: number[]) => void;
  updateProductQuantity: (productId: number, quantity: number) => void;
  toggleProductCheck: (productId: number) => void;
  toggleAllProductsCheck: () => void;
  clearCart: () => void;
  getCartProduct: (productId: number) => Cart | undefined;
  getCartProducts: () => Cart[];
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartProducts: [],

      addProduct: (product, quantity = 1) => {
        const existingProduct = get().getCartProduct(product.id);
        if (existingProduct) {
          get().updateProductQuantity(
            product.id,
            Math.min(existingProduct.quantity + quantity, CART_MAX_QUANTITY_VALUE),
          );
        } else {
          set((state) => ({
            cartProducts: [...state.cartProducts, { product, quantity, checked: true }],
          }));
        }
      },

      setCartProducts: (cartProducts) => {
        set({ cartProducts });
      },

      removeProduct: (productId) => {
        set((state) => ({
          cartProducts: state.cartProducts.filter((item) => item.product.id !== productId),
        }));
      },

      removeProducts: (productIds: number[]) => {
        if (!productIds || productIds.length === 0) {
          return;
        }
        productIds.forEach((productId) => {
          get().removeProduct(productId);
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

      clearCart: () => {
        set({ cartProducts: [] });
      },

      getCartProduct: (productId) => get().cartProducts.find((item) => item.product.id === productId),

      getCartProducts: () => get().cartProducts,
    }),
    {
      name: LOCAL_STORAGE_CART_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
