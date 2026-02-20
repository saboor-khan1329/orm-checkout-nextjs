import { useCheckout } from "./CheckoutProvider";
import BankTransferDetails from "./BankTransferDetails";

export default function PaymentStep() {
  const { state, dispatch } = useCheckout();

  const method = state.payment.method;

  return (
    <div className="step">
      <h2>3. Payment</h2>

      <label>
        <input
          type="radio"
          checked={method === "electronic"}
          onChange={() =>
            dispatch({ type: "SET_PAYMENT", payload: { method: "electronic" } })
          }
        />
        Electronic Payment
      </label>

      <label>
        <input
          type="radio"
          checked={method === "bank"}
          onChange={() =>
            dispatch({ type: "SET_PAYMENT", payload: { method: "bank" } })
          }
        />
        Bank Transfer
      </label>

      {method === "electronic" && (
        <div className="payment-box">🔄 Loading payment API…</div>
      )}

      {method === "bank" && <BankTransferDetails />}
    </div>
  );
}
