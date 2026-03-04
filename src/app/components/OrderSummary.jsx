"use client";

import React from "react";
import "./OrderSummary.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { cartApi } from "@/lib/cartApi";

const OrderSummary = ({ showMeta = true }) => {
  const { summary, cart } = useCart();
  const router = useRouter();

  if (!summary) return null;

  const currency = cart?.items?.[0]?.symbol || "$";

  const subtotal = Number(summary.subtotal || 0);
  const shipping = Number(summary.shipping || 0);
  const tax = Number(summary.tax || 0);
  const taxpercent = Number(summary.tax_rate || 0);
  const total = Number(summary.total || 0);
  const savings = Number(summary.savings || 0);

  const format = (value) => `${currency}${value.toFixed(2)}`;

  const handleCheckout = async () => {
    try {
      const res = await cartApi.validateCart();

      if (!res.valid) {
        alert(res.message || "Cart validation failed");
        return;
      }

      router.push("/checkout");
    } catch (err) {
      alert(err.message || "Unable to validate cart");
    }
  };

  return (
    <div className="order-summary">
      <h3 className="order-title">ORDER SUMMARY</h3>

      <div className="order-rows">
        <div className="order-row">
          <span>Sub-total</span>
          <strong>{format(subtotal)}</strong>
        </div>

        <div className="order-row">
          <span>Delivery</span>
          <strong className="green">
            {shipping === 0 ? "Free" : format(shipping)}
          </strong>
        </div>

        <div className="order-row">
          <span>Estimated VAT rate</span>
          <strong>{taxpercent.toFixed(0)}%</strong>
        </div>

        <div className="order-row">
          <span>Estimated VAT</span>
          <strong>{format(tax)}</strong>
        </div>
      </div>

      <hr />

      <div className="order-total">
        <div>
          <h4>Estimated Total</h4>
          <small>Tax included</small>
        </div>

        <strong className="total-price">{format(total)}</strong>
      </div>

      <div className="order-savings">
        <span>Total Savings</span>
        <strong className="green">{format(savings)}</strong>
      </div>

      <hr />

      <button onClick={handleCheckout} className="checkout-btn">
        PROCEED TO CHECKOUT
      </button>

      {showMeta && (
        <div className="order-meta">
          <div className="d-flex align-items-center gap-2">
            <strong>Shipping:</strong>
            <div className="logos">
              <Image
                src="/images/cart/shipping-logo.svg"
                width={100}
                height={20}
                alt=""
              />
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            <strong>Payment:</strong>

            <span className="Payment-logos">
              <div className="logo-box">
                <Image
                  src="/images/cart/payment-logo-1.svg"
                  width={215}
                  height={21}
                  alt=""
                />
              </div>

              <div className="logo-box">
                <Image
                  src="/images/cart/payment-logo-2.svg"
                  width={215}
                  height={21}
                  alt=""
                />
              </div>

              <div className="logo-box">
                <Image
                  src="/images/cart/payment-logo-3.svg"
                  width={215}
                  height={21}
                  alt=""
                />
              </div>

              <div className="logo-box">
                <Image
                  src="/images/cart/payment-logo-4.svg"
                  width={215}
                  height={21}
                  alt=""
                />
              </div>

              <div className="logo-box">
                <Image
                  src="/images/cart/payment-logo-5.svg"
                  width={215}
                  height={21}
                  alt=""
                />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
