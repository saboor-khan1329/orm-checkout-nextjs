import { useState } from "react";
import { useCheckout } from "./CheckoutProvider";

export default function DeliveryOptions({ partner }) {
  const { state, dispatch } = useCheckout();
  const [showAll, setShowAll] = useState(false);

  const options = {
    fedex: [
      "FEDEX – FedEx First Overnight® Freight - £726.26",
      "FEDEX | FedEx 1Day® Freight - £511.07",
      "FEDEX | FedEx 2Day® Freight- £447.19",
      "FEDEX | FedEx 3Day® Freight - £432.62",
      "FedEx Economy",
    ],
    dhl: ["DHL Express", "DHL Economy"],
  };

  const list = showAll ? options[partner] : options[partner].slice(0, 4);

  return (
    <div>
      <div className="delivery-box-wrap">
        {list.map((o) => (
          <div key={o} className="delivery-box">
            <input
              type="radio"
              name="deliveryOption"
              checked={state.delivery.option === o}
              onChange={() =>
                dispatch({
                  type: "SET_DELIVERY",
                  payload: {
                    partner: partner,
                    option: o,
                  },
                })
              }
            />
            {o}
          </div>
        ))}
      </div>
      {options[partner].length > 4 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="view-more"
        >
          View more*
        </button>
      )}

    </div>
  );
}
