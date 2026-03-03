"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { cartApi } from "@/lib/cartApi";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [summary, setSummary] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const data = await cartApi.get();
      if (data.success) {
        setCart(data.cart);
        setSummary(data.cartSummary);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchRelated = async () => {
    const data = await cartApi.related();
    if (data.success) setRelated(data.data);
  };

  const addToCart = async (productId) => {
    const data = await cartApi.add(productId);
    if (data.success) {
      setCart(data.cart);
      setSummary(data.cartSummary);
      fetchRelated();
    }
  };

  const updateQuantity = async (itemId, qty) => {
    const data = await cartApi.update(itemId, qty);
    if (data.success) {
      setCart(data.cart);
      setSummary(data.cartSummary);
    }
  };

  const removeItem = async (itemId) => {
    const data = await cartApi.remove(itemId);
    if (data.success) {
      setCart(data.cart);
      setSummary(data.cartSummary);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchRelated();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        summary,
        related,
        loading,
        addToCart,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
