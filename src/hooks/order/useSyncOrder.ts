import { useEffect } from 'react';
import { LOCAL_STORAGE_ORDER_KEY } from '@/constants';
import { useOrdersQuery } from '@/queries';
import { useOrderStore } from '@/store';
import { Order, OrderState } from '@/types';
import { localStorageUtil } from '@/utils';

export const useSyncOrder = () => {
  const ordersQuery = useOrdersQuery();
  const orderStore = useOrderStore();

  useEffect(() => {
    try {
      const localStorageOrders = localStorageUtil.getItem<OrderState>(LOCAL_STORAGE_ORDER_KEY);
      const serverOrders = ordersQuery.data || [];
      const localOrders = localStorageOrders?.state.orders || [];
      const localOrdersMap = new Map(localOrders.map((localOrder) => [localOrder.id, localOrder]));

      const mergedOrders =
        serverOrders.length > 0
          ? serverOrders.reduce<Order[]>((merged, serverOrder) => {
              const localOrder = localOrdersMap.get(serverOrder.id);
              if (localOrder) {
                localOrdersMap.delete(serverOrder.id);
                return [...merged, localOrder];
              }
              return [...merged, serverOrder];
            }, [])
          : [];

      const additionalLocalOrders = Array.from(localOrdersMap.values());
      const finalOrders = [...mergedOrders, ...additionalLocalOrders];

      orderStore.setOrders(finalOrders);
    } catch (error) {
      console.error('useSyncOrder useEffect Error:', error);
    }
  }, [ordersQuery.data]);
};
