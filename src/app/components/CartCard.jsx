"use client";

import Image from "next/image";
import React from "react";
import "./CartCard.scss";
import QuantityStepper from "./QuantityStepper";
import { useCart } from "@/context/CartContext";

const CartCard = ({ items = [] }) => {
  const { removeItem } = useCart();

  if (!items?.length) return <p>Your cart is empty.</p>;

  return (
    <div className="CartCard-wrap">
      {items.map((item) => (
        <div key={item.id} className="box">
          <Image
            src={item.thumbnail}
            width={172}
            height={128}
            alt={item.name}
            className="box-img"
            unoptimized
          />

          <div className="Card-content">
            <p className="content-title">{item.sku}</p>
            <p className="content-dec">{item.name}</p>

            <Image
              src="/images/cart/product-img.jpg"
              width={172}
              height={128}
              alt=""
              className="box-img-mob"
            />
            <hr className="d-block d-md-none" />

            <span className="content-recently">
              Added <strong>{item.quantity}</strong> time(s)
            </span>
          </div>

          <div className="card-pricing">
            <div>
              <p className="main-price">
                {item.symbol}
                {item.price}
              </p>

              <p className="saving">
                Savings: &nbsp;
                {/* {item.symbol}
                {item.previous_price - item.price} */}
                {(
                  ((item.previous_price - item.price) / item.previous_price) *
                  100
                ).toFixed(2)}
                %
              </p>
            </div>

            <QuantityStepper itemId={item.id} value={item.quantity} />
          </div>

          <div className="remove-btn">
            <span className="d-none">Save for later</span>{" "}
            <span onClick={() => removeItem.mutate(item.id)}>Remove</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartCard;
