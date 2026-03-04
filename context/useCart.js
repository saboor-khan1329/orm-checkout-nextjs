"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "@/lib/cartApi";

export function useCart() {
  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const data = await cartApi.getCart();
      return data;
    },
  });

  const relatedQuery = useQuery({
    queryKey: ["related"],
    queryFn: async () => {
      const data = await cartApi.getRelated();
      return data?.data || [];
    },
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["cart"] });
    queryClient.invalidateQueries({ queryKey: ["related"] });
  };

  const addItem = useMutation({
    mutationFn: cartApi.addItem,
    onSuccess: invalidate,
  });

  const updateItem = useMutation({
    mutationFn: ({ id, qty }) => cartApi.updateItem(id, qty),
    onSuccess: invalidate,
  });

  const removeItem = useMutation({
    mutationFn: cartApi.removeItem,
    onSuccess: invalidate,
  });

  return {
    cart: cartQuery.data?.cart,
    summary: cartQuery.data?.cartSummary,
    loading: cartQuery.isLoading,
    related: relatedQuery.data,
    addItem,
    updateItem,
    removeItem,
  };
}
