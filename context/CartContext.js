"use client";

import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "../lib/cartApi";
// import { cartApi } from "@/lib/cartApi";

const CartContext = createContext();

export function CartProvider({ children }) {
  const queryClient = useQueryClient();

  // Fetch cart
  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: cartApi.getCart,
    staleTime: 1000 * 60 * 5,
  });

  // Fetch related
  const relatedQuery = useQuery({
    queryKey: ["related"],
    queryFn: cartApi.getRelated,
    staleTime: 1000 * 60 * 5,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["cart"] });
    queryClient.invalidateQueries({ queryKey: ["related"] });
  };

  const updateItem = useMutation({
    mutationFn: ({ id, qty }) => cartApi.updateItem(id, qty),
    onSuccess: invalidate,
  });

  const removeItem = useMutation({
    mutationFn: cartApi.removeItem,
    onSuccess: invalidate,
  });

  return (
    <CartContext.Provider
      value={{
        cart: cartQuery.data?.cart,
        summary: cartQuery.data?.cartSummary,
        related: relatedQuery.data?.data || [],
        loading: cartQuery.isLoading,
        updateItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
