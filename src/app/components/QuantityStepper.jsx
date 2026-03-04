"use client";

import { useEffect, useState } from "react";
import "./QuantityStepper.scss";
import { useCart } from "@/context/CartContext";

const QuantityStepper = ({ itemId, value = 1 }) => {
  const [qty, setQty] = useState(value);

  const { updateQty } = useCart();

  useEffect(() => {
    setQty(value);
  }, [value]);

  const update = (newQty) => {
    if (newQty < 1) return;

    setQty(newQty);

    updateQty.mutate({
      itemId,
      quantity: newQty,
    });
  };

  return (
    <div className="qty-stepper">
      <button className="qty-btn" onClick={() => update(qty - 1)}>
        −
      </button>

      <span className="qty-value">{qty}</span>

      <button className="qty-btn" onClick={() => update(qty + 1)}>
        +
      </button>
    </div>
  );
};

export default QuantityStepper;
