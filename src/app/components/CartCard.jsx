"use client";

import Image from "next/image";
import React from "react";
import "./CartCard.scss";
import QuantityStepper from "./QuantityStepper";

const CartCard = ({ items = [] }) => {
  // 👇 Always guarantee array
  if (!Array.isArray(items) || items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

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
          />

          <div className="Card-content">
            <p className="content-title">{item.sku}</p>
            <p className="content-dec">{item.name}</p>

            <Image
              src={item.thumbnail}
              width={172}
              height={128}
              alt={item.name}
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
                Savings: {item.symbol}
                {item.previous_price - item.price}
              </p>
            </div>

            {/* <QuantityStepper quantity={item.quantity} /> */}
            <QuantityStepper quantity={item.quantity} itemId={item.id} />
          </div>

          <div className="remove-btn">
            <span>Save for later</span> | <span>Remove</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartCard;
