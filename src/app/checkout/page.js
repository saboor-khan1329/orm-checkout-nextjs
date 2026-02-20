"use client";

import { CheckoutProvider, useCheckout } from "./components/CheckoutProvider";
import ContactStep from "./components/ContactStep";
import DeliveryStep from "./components/DeliveryStep";
import Stepper from "./components/Stepper";
import "./CheckoutLayout.scss"
import OrderSummary from "../components/OrderSummary";
import CartBox from "./components/CartBox";
import { ShipToSummary } from "./components/ShipToSummary";
import OrderSummaryMob from "./components/OrderSummaryMob";
import useBreakpoint from "@/hooks/useBreakpoint";



function CheckoutContent() {
    const { state } = useCheckout();
    const isDesktop = useBreakpoint(1199);

    // console.log(state);

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

                                {state.step === 2 && (
                                    <ShipToSummary
                                        onEdit={() => dispatch({ type: "SET_STEP", payload: 1 })}
                                    />
                                )}


                            </div>
                        )}

                    </div>

                </div>
                {isDesktop === false && (
                    < OrderSummaryMob />
                )
                }
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
