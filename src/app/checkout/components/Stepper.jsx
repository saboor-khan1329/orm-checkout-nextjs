"use client";

import { useCheckout } from "./CheckoutProvider";

export default function Stepper() {
  const { state, dispatch } = useCheckout();
  const step = state.step;

  return (
    <div className="checkout-stepper">
      <div
        className={`step-item ${step >= 1 ? "active" : ""}`}
        onClick={() => dispatch({ type: "SET_STEP", payload: 1 })}
      >
        <span className="circle">1</span>
        <span className="label">Contact</span>
      </div>

      <div className={`line ${step >= 2 ? "active" : ""}`} />

      <div
        className={`step-item ${step >= 2 ? "active" : ""}`}
        onClick={() => step > 1 && dispatch({ type: "SET_STEP", payload: 2 })}
      >
        <span className="circle">2</span>
        <span className="label">Delivery & Payment</span>
      </div>
    </div>
  );
}
