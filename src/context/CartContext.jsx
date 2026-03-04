"use client";

import { createContext, useContext, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "@/lib/cartApi";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: cartApi.getCart,
    refetchInterval: 15000,
    refetchOnWindowFocus: true,
  });
  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: ["cart"] });
  };

  const addItem = useMutation({
    mutationFn: cartApi.addItem,
    onSuccess: invalidate,
  });

  const updateQty = useMutation({
    mutationFn: cartApi.updateQty,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
    },
    onSuccess: invalidate,
  });

  const removeItem = useMutation({
    mutationFn: cartApi.removeItem,
    onSuccess: invalidate,
  });

  const value = useMemo(
    () => ({
      cart: cartQuery.data?.cart ?? { items: [] },
      summary: cartQuery.data?.cartSummary ?? null,
      related: cartQuery.data?.related ?? [],
      loading: cartQuery.isLoading,

      addItem,
      updateQty,
      removeItem,
    }),
    [cartQuery.data, cartQuery.isLoading, addItem, updateQty, removeItem],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
