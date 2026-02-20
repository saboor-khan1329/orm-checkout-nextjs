"use client";

import { useState } from "react";
import "./QuantityStepper.scss"

const QuantityStepper = ({
    min = 1,
    max = 999,
    value = 1,
    onChange,
}) => {

    const [qty, setQty] = useState(value);

    const updateQty = (newQty) => {
        if (newQty < min || newQty > max) return;
        setQty(newQty);
        if (onChange) onChange(newQty);
    };
    return (
        <div className="qty-stepper">
            <button
                type="button"
                className="qty-btn"
                onClick={() => updateQty(qty - 1)}
                disabled={qty <= min}
            >
                −
            </button>

            <span className="qty-value">{qty}</span>

            <button
                type="button"
                className="qty-btn"
                onClick={() => updateQty(qty + 1)}
                disabled={qty >= max}
            >
                +
            </button>
        </div>
    );
}

export default QuantityStepper