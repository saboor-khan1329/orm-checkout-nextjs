"use client";

import Image from "next/image";
import React from "react";
import "./CartLayout.scss";
import CartCard from "./CartCard";
import OrderSummary from "./OrderSummary";
import InfoTabs from "./InfoTabs";
import FrequentlyBought from "./FrequentlyBought";
import useBreakpoint from "@/hooks/useBreakpoint";
import { useCart } from "@/context/CartContext";

const CartLayout = () => {
  const isDesktop = useBreakpoint(767);
  const { cart, related } = useCart();
  const items = cart?.items ?? [];
  const itemCount = items.length;

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
            <CartCard items={items} />

            {isDesktop && <FrequentlyBought products={related} />}
          </div>

          <div className="card-aside-wrap">
            <div className="aside-sticky">
              <OrderSummary showMeta={true} />

              <InfoTabs />

              {!isDesktop && <FrequentlyBought products={related} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartLayout;
