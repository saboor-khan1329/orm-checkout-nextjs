import { useState } from "react";
import { useCheckout } from "./CheckoutProvider";
import DeliveryOptions from "./DeliveryOptions";
import "./DeliveryStep.scss"
import BankTransferDetails from "./BankTransferDetails";
import Image from "next/image";

export default function DeliveryStep() {
  const { state, dispatch } = useCheckout();


  const [partner, setPartner] = useState("fedex");
  const method = state.payment.method;
  const isDeliveryComplete = !!state.delivery.option;



  return (
    <div className="step step-2-wraper">
      <button
        type="button"
        className="btn-back"
        onClick={() => dispatch({ type: "SET_STEP", payload: 1 })}
      >
        <Image src="/images/cart/left-arrow.svg" width={5} height={10} alt='' /> Back
      </button>
      <div className="box-wrap">
        <h2>2. Delivery</h2>

        <div className="box-shap">
          <p className="title">Select Your Delivery Partner</p>
          <div className="radio-btn">
            <label>
              <input
                type="radio"
                checked={partner === "fedex"}
                onChange={() => {
                  setPartner("fedex");
                  dispatch({
                    type: "SET_DELIVERY",
                    payload: {
                      partner: "fedex",
                      option: null,
                    },
                  });
                }}
              />
              <Image src="/images/checkout/fedex.svg" width={89} height={24} alt='fedex icon' />
            </label>

            <label>
              <input
                type="radio"
                checked={partner === "dhl"}
                onChange={() => {
                  setPartner("dhl");

                  dispatch({
                    type: "SET_DELIVERY",
                    payload: {
                      partner: "dhl",
                      option: null,
                    },
                  });
                }}
              />
              <Image src="/images/checkout/dhl.svg" width={89} height={24} alt='dhl icon' />
            </label>
          </div>
          <DeliveryOptions partner={partner} />
          {state.step < 3 && (
            <button disabled={!isDeliveryComplete} onClick={() => dispatch({ type: "SET_STEP", payload: 3 })}>
              Continue
            </button>
          )}
        </div>


      </div>

      {state.step >= 3 && (
        <>
          <div className="box-wrap">
            <h2>3. Payment Method</h2>

            <div className="box-shap">
              <p className="title">Choose Your Payment Method</p>
              <div className="radio-btn payment-radio">
                <label>
                  <input
                    type="radio"
                    checked={method === "electronic"}
                    onChange={() =>
                      dispatch({ type: "SET_PAYMENT", payload: { method: "electronic" } })
                    }
                  />
                  <div className="d-flex align-items-center">
                    <Image src="/images/checkout/electronic-payment.svg" width={18} height={21} alt='electronic payment icon' />
                    <p className="">Electronic Payment <span>(debit card, credit card, & Paypal)</span></p>

                  </div>
                </label>
                {method === "electronic" && (
                  <div className="payment-box">🔄 Loading payment API…</div>
                )}

                <label>
                  <input
                    type="radio"
                    checked={method === "bank"}
                    onChange={() =>
                      dispatch({ type: "SET_PAYMENT", payload: { method: "bank" } })
                    }
                  />
                  <div className="d-flex align-items-center">
                    <Image src="/images/checkout/bank-transfer.svg" width={18} height={21} alt='bank transfer icon' />
                    <p>Bank Transfer  <span>(No Merchant Fees)</span></p>
                  </div>
                </label>

                {method === "bank" && <BankTransferDetails />}


              </div>

              <button className="cta">Process Your Order</button>
            </div>

          </div>
        </>
      )}
    </div>
  );
}
