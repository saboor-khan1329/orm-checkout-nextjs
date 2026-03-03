"use client";

import Image from "next/image";
import React from "react";
import "./CartLayout.scss";
import CartCard from "./CartCard";
import OrderSummary from "./OrderSummary";
import InfoTabs from "./InfoTabs";
import FrequentlyBought from "./FrequentlyBought";
import useBreakpoint from "@/hooks/useBreakpoint";
import { useCart } from "../../../context/CartContext";

const CartLayout = () => {
  const isDesktop = useBreakpoint(767);
  const { cart, loading } = useCart();

  const itemCount =
    cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  if (loading) return <p>Loading cart...</p>;

  return (
    <section className="CartLayout-sp">
      <div className="container">
        <p className="back-btn">
          <Image
            src="/images/cart/left-arrow.svg"
            width={5}
            height={10}
            alt=""
          />
          Back to shopping
        </p>
        <p className="title">
          Your Cart<span>{itemCount} items</span>
        </p>
        <div className="CartLayout-wrap">
          <div className="card-wrap">
            {/* <CartCard /> */}
            <CartCard items={cart?.items} />
            {isDesktop && (
              <FrequentlyBought
                products={[
                  {
                    image: "/images/cart/product-img.jpg",
                    sku: "C9300L-24P-4G-E",
                    title: "CATALYST 9300L 24P POE NTWK ESSENTIALS 4X1G UPLINK",
                    oldPrice: "1,354.99",
                    price: "979.99",
                  },
                  {
                    image: "/images/cart/product-img.jpg",
                    sku: "C9300L-24P-4G-E",
                    title: "CATALYST 9300L 24P POE NTWK ESSENTIALS 4X1G UPLINK",
                    oldPrice: "1,354.99",
                    price: "979.99",
                  },
                  {
                    image: "/images/cart/product-img.jpg",
                    sku: "C9300L-24P-4G-E",
                    title: "CATALYST 9300L 24P POE NTWK ESSENTIALS 4X1G UPLINK",
                    oldPrice: "1,354.99",
                    price: "979.99",
                  },
                  {
                    image: "/images/cart/product-img.jpg",
                    sku: "C9300L-24P-4G-E",
                    title: "CATALYST 9300L 24P POE NTWK ESSENTIALS 4X1G UPLINK",
                    oldPrice: "1,354.99",
                    price: "979.99",
                  },
                ]}
              />
            )}
          </div>

          <div className="card-aside-wrap">
            <div className="aside-sticky">
              <OrderSummary showMeta={true} />

              <InfoTabs />

              {!isDesktop && (
                <FrequentlyBought
                  products={[
                    {
                      image: "/images/cart/product-img.jpg",
                      sku: "C9300L-24P-4G-E",
                      title:
                        "CATALYST 9300L 24P POE NTWK ESSENTIALS 4X1G UPLINK",
                      oldPrice: "1,354.99",
                      price: "979.99",
                    },
                    {
                      image: "/images/cart/product-img.jpg",
                      sku: "C9300L-24P-4G-E",
                      title:
                        "CATALYST 9300L 24P POE NTWK ESSENTIALS 4X1G UPLINK",
                      oldPrice: "1,354.99",
                      price: "979.99",
                    },
                    {
                      image: "/images/cart/product-img.jpg",
                      sku: "C9300L-24P-4G-E",
                      title:
                        "CATALYST 9300L 24P POE NTWK ESSENTIALS 4X1G UPLINK",
                      oldPrice: "1,354.99",
                      price: "979.99",
                    },
                    {
                      image: "/images/cart/product-img.jpg",
                      sku: "C9300L-24P-4G-E",
                      title:
                        "CATALYST 9300L 24P POE NTWK ESSENTIALS 4X1G UPLINK",
                      oldPrice: "1,354.99",
                      price: "979.99",
                    },
                  ]}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartLayout;
