"use client";

import { createContext, useContext, useReducer } from "react";

const CheckoutContext = createContext(null);

const initialState = {
    step: 2,

    contact: {
        email: "",
        name: "",
        phone: "",
        company: "",
        country: "",
        address: "",
        zip: "",
        city: "",
    },


    delivery: {
        partner: "fedex",
        option: null,
    },

    payment: {
        method: "electronic", // electronic | bank
        screenshot: null,
    },
};

function reducer(state, action) {
    switch (action.type) {

        case "SET_CONTACT":
            return {
                ...state,
                contact: { ...state.contact, ...action.payload }
            };

        case "SET_DELIVERY":
            return {
                ...state,
                delivery: { ...state.delivery, ...action.payload }
            };

        case "SET_PAYMENT":
            return {
                ...state,
                payment: { ...state.payment, ...action.payload }
            };

        case "SET_STEP":
            return {
                ...state,
                step: action.payload 
            };

        case "NEXT_STEP":
            return {
                ...state,
                step: Math.min(state.step + 1, 2)
            };

        case "PREV_STEP":
            return {
                ...state,
                step: Math.max(state.step - 1, 1)
            };

        default:
            return state;
    }
}


export const CheckoutProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <CheckoutContext.Provider value={{ state, dispatch }}>
            {children}
        </CheckoutContext.Provider>
    );
};

export const useCheckout = () => useContext(CheckoutContext);
