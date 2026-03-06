"use client";

import useBreakpoint from "@/hooks/useBreakpoint";
import { useCheckout } from "./CheckoutProvider";
import "./ContactStep.scss";
import dynamic from "next/dynamic";
import { useCheckoutContext } from "@/hooks/useCheckoutContext";
import { checkoutApi } from "@/lib/checkoutApi";
import { useMutation } from "@tanstack/react-query";
import { useCart } from "@/context/CartContext";
import { createCartHash } from "@/lib/cartHash";
import { useEffect, useRef } from "react";

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function ContactStep() {
  const { state, dispatch } = useCheckout();
  const { cart, updateSummary } = useCart();

  const isDesktop = useBreakpoint(767);
  const data = state.contact;

  const { data: contextData } = useCheckoutContext();

  const vatTimer = useRef(null);

  /*
  ------------------------------------------------------------
  STEP1 SUBMIT
  ------------------------------------------------------------
  */

  const mutation = useMutation({
    mutationFn: checkoutApi.submitStep1,

    onSuccess: (res) => {
      const hash = createCartHash(cart?.items ?? []);

      dispatch({
        type: "SET_CONTACT",
        payload: {
          checkout_id: res.checkout_id,
          submitted_at: Date.now(),
          cart_hash: hash,
        },
      });

      /*
      update order summary with backend values
      */

      if (res.summary) {
        updateSummary({
          subtotal: res.summary.subtotal,
          tax: res.summary.tax,
          total: res.summary.total,
          tax_rate: res.summary.tax_rate ?? 0,
        });
      }

      dispatch({ type: "SET_STEP", payload: 2 });
    },

    onError: (err) => {
      alert(err.message || "Checkout failed");
    },
  });

  /*
  ------------------------------------------------------------
  VAT PREVIEW
  ------------------------------------------------------------
  */

  const vatPreview = useMutation({
    mutationFn: checkoutApi.previewVat,

    onSuccess: (res) => {
      if (!res?.summary) return;

      updateSummary({
        subtotal: res.summary.subtotal,
        tax: res.summary.tax,
        total: res.summary.total,
        tax_rate: res.summary.tax_rate ?? 0,
      });
    },

    onError: () => {
      // silently fail to avoid UX disruption
    },
  });

  /*
  ------------------------------------------------------------
  COUNTRIES
  ------------------------------------------------------------
  */

  const countries =
    contextData?.countries?.map((c) => ({
      value: c.code,
      label: c.name,
    })) || [];

  /*
  ------------------------------------------------------------
  RESTORE EXISTING CHECKOUT
  ------------------------------------------------------------
  */

  useEffect(() => {
    if (!contextData?.existing_checkout) return;

    const c = contextData.existing_checkout;

    dispatch({
      type: "SET_CONTACT",
      payload: {
        email: c.user_email,
        name: c.name,
        phone: c.user_phone,
        company: c.company_name,
        address: c.address,
        city: c.city,
        zip: c.zip_code,
        country: c.country_code,
        checkout_id: c.id,
      },
    });
  }, [contextData]);

  /*
  ------------------------------------------------------------
  UPDATE FIELD
  ------------------------------------------------------------
  */

  const update = (field, value) => {
    dispatch({
      type: "SET_CONTACT",
      payload: { [field]: value },
    });
  };

  /*
  ------------------------------------------------------------
  COUNTRY CHANGE HANDLER
  ------------------------------------------------------------
  */

  const handleCountryChange = (o) => {
    const code = o?.value || "";

    update("country", code);

    if (!code) return;

    /*
    debounce VAT preview
    prevents API spam
    */

    if (vatTimer.current) {
      clearTimeout(vatTimer.current);
    }

    vatTimer.current = setTimeout(() => {
      vatPreview.mutate(code);
    }, 300);
  };

  /*
  ------------------------------------------------------------
  VALIDATION
  ------------------------------------------------------------
  */

  const validate = () => {
    if (!data.email) return "Email required";
    if (!data.email.includes("@")) return "Invalid email";
    if (!data.name) return "Full name required";
    if (!data.phone) return "Phone required";
    if (!data.country) return "Country required";
    if (!data.address) return "Address required";
    if (!data.zip) return "Zip required";
    if (!data.city) return "City required";

    return null;
  };

  /*
  ------------------------------------------------------------
  SUBMIT
  ------------------------------------------------------------
  */

  const submit = () => {
    const error = validate();

    if (error) {
      alert(error);
      return;
    }

    mutation.mutate({
      user_email: data.email,
      user_phone: data.phone,
      name: data.name,
      company_name: data.company || null,

      address: data.address,
      city: data.city,
      state: "",
      zip_code: data.zip,

      country_code: data.country,
    });
  };

  /*
  ------------------------------------------------------------
  SELECT STYLES
  ------------------------------------------------------------
  */

  const customStyles = {
    control: (base, state) => ({
      ...base,
      height: isDesktop ? 52 : 44,
      border: "1px solid #7d7d7d",
      boxShadow: "none",
      borderRadius: 0,
      padding: "0 8px",
      fontSize: "16px",
      cursor: "pointer",
      backgroundColor: state.isDisabled ? "#f2f2f2" : "#fff",

      "&:hover": {
        borderColor: "#165dba",
      },
    }),
  };

  /*
  ------------------------------------------------------------
  UI
  ------------------------------------------------------------
  */

  return (
    <div className="step">
      <h2>1. Contact</h2>

      <div className="Contact-wrap">
        <div className="emailwrap">
          <label>Your Email Address</label>

          <input
            placeholder="Email *"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            className="checkout-input"
          />
        </div>

        <h3>About You</h3>

        <div className="input-grid">
          <input
            placeholder="Full Name *"
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            className="checkout-input"
          />

          <input
            placeholder="Phone Number *"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="checkout-input"
          />

          <input
            placeholder="Company name"
            value={data.company}
            onChange={(e) => update("company", e.target.value)}
            className="checkout-input"
          />

          <Select
            options={countries}
            isClearable
            isSearchable
            value={countries.find((c) => c.value === data.country) || null}
            onChange={handleCountryChange}
            placeholder="country"
            styles={customStyles}
          />

          <input
            placeholder="Address *"
            value={data.address}
            onChange={(e) => update("address", e.target.value)}
            className="full-row checkout-input"
          />

          <input
            placeholder="Zip Code *"
            value={data.zip}
            onChange={(e) => update("zip", e.target.value)}
            className="checkout-input"
          />

          <input
            placeholder="City *"
            value={data.city}
            onChange={(e) => update("city", e.target.value)}
            className="checkout-input"
          />
        </div>

        <hr />

        <button onClick={submit} disabled={mutation.isPending}>
          {mutation.isPending ? "Processing..." : "Continue To Payment Details"}
        </button>
      </div>
    </div>
  );
}
