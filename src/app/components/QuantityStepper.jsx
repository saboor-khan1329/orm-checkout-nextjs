"use client";

import { useEffect, useState } from "react";
import { useCart } from "../../../context/CartContext";
import "./QuantityStepper.scss";

const QuantityStepper = ({ quantity, itemId }) => {
  const { updateItem } = useCart();
  const [qty, setQty] = useState(quantity);

  useEffect(() => {
    setQty(quantity);
  }, [quantity]);

  const updateQty = (newQty) => {
    if (newQty < 1) return;
    setQty(newQty);
    updateItem.mutate({ id: itemId, qty: newQty });
  };

  return (
    <div className="qty-stepper">
      <button
        type="button"
        className="qty-btn"
        onClick={() => updateQty(qty - 1)}
      >
        −
      </button>

      <span className="qty-value">{qty}</span>

      <button
        type="button"
        className="qty-btn"
        onClick={() => updateQty(qty + 1)}
      >
        +
      </button>
    </div>
  );
};

export default QuantityStepper;
