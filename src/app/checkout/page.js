"use client";

import { CheckoutProvider, useCheckout } from "./components/CheckoutProvider";
import ContactStep from "./components/ContactStep";
import DeliveryStep from "./components/DeliveryStep";
import Stepper from "./components/Stepper";
import "./CheckoutLayout.scss";
import OrderSummary from "../components/OrderSummary";
import CartBox from "./components/CartBox";
import { ShipToSummary } from "./components/ShipToSummary";
import OrderSummaryMob from "./components/OrderSummaryMob";
import useBreakpoint from "@/hooks/useBreakpoint";
import { useCart } from "@/context/CartContext";
import { createCartHash } from "@/lib/cartHash";
import { useEffect } from "react";

function CheckoutContent() {
  const { state, dispatch } = useCheckout();
  const { cart } = useCart();

  const isDesktop = useBreakpoint(1199);

  const items = cart?.items ?? [];

  useEffect(() => {
    if (!state.contact.checkout_id) return;

    const hash = createCartHash(items);

    if (state.contact.cart_hash !== hash) {
      dispatch({
        type: "SET_CONTACT",
        payload: {
          checkout_id: null,
          cart_hash: null,
        },
      });

      dispatch({ type: "SET_STEP", payload: 1 });

      alert("Cart changed. Please confirm contact details again.");
    }
    // }, [items]);
    // }, [items.length]);
  }, [JSON.stringify(items)]);

  return (
    <>
      <Stepper />

      <section className="checkout-wrap">
        <div className="container">
          <div className="checkout-layout">
            <div className="checkout-left ">
              {state.step === 1 && <ContactStep />}

              {state.step >= 2 && <DeliveryStep />}
            </div>

            {isDesktop === true && (
              <div className="checkout-right">
                <OrderSummary showMeta={false} />

                <CartBox />

                {state.step >= 2 && (
                  <ShipToSummary
                    onEdit={() => dispatch({ type: "SET_STEP", payload: 1 })}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {isDesktop === false && <OrderSummaryMob />}
      </section>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <CheckoutProvider>
      <CheckoutContent />
    </CheckoutProvider>
  );
}
