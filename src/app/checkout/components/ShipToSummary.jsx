"use client";

import { useCheckout } from "./CheckoutProvider";
import "./ShipToSummary.scss";

export function ShipToSummary() {
  const { state, dispatch } = useCheckout();

  const { contact } = state;

  return (
    <div className="ship-summary">

      {/* Header */}
      <div className="ship-header">
        <h3>Ship To:</h3>

        <button
          type="button"
          className="edit-btn"
          onClick={() => dispatch({ type: "SET_STEP", payload: 1 })}
        >
          Edit ✎
        </button>
      </div>

      <hr />

      {/* Info */}
      <div className="ship-info">

        <p>
          <strong>Name:</strong> {contact.name}
        </p>

        <p>
          <strong>Email:</strong> {contact.email}
        </p>

        <p>
          <strong>Phone:</strong> {contact.phone}
        </p>

        <p>
          <strong>Address:</strong>{" "}
          {contact.address}, {contact.city}, {contact.country}, {contact.zip}
        </p>

      </div>
    </div>
  );
}
