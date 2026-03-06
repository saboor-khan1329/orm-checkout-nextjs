"use client";

import Image from "next/image";
import "./CartBox.scss";
import { useCart } from "@/context/CartContext";

export default function CartBox() {
  const { cart } = useCart();

  const items = cart?.items ?? [];

  if (!items.length) {
    return (
      <div className="cart-box">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <span>0 items</span>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-box">
      <div className="cart-header">
        <h2>Your Cart</h2>
        <span>{items.length} items</span>
      </div>

      {items.map((item, index) => (
        <div key={item.id}>
          <div className="cart-item">
            <div className="cart-img">
              <Image
                src={item.thumbnail || "/images/cart/product-img.jpg"}
                width={120}
                height={60}
                alt={item.name}
                unoptimized
              />
            </div>

            <div className="cart-info">
              <h3>{item.sku}</h3>

              <p>{item.name}</p>

              <div className="cart-price-row">
                <span className="qty">x{item.quantity}</span>

                <div className="price">
                  <strong>
                    {item.symbol}
                    {Number(item.price).toFixed(2)}
                  </strong>

                  {item.previous_price > 0 && (
                    <span className="old-price">
                      {item.symbol}
                      {Number(item.previous_price).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {index !== items.length - 1 && <hr />}
        </div>
      ))}
    </div>
  );
}
