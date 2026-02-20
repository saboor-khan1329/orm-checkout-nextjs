import useBreakpoint from "@/hooks/useBreakpoint";
import { useCheckout } from "./CheckoutProvider";
import "./ContactStep.scss"
import dynamic from "next/dynamic";


const Select = dynamic(() => import("react-select"), {
    ssr: false, 
});

const options = [
    { value: 'UK', label: 'United Kingdom' },
    { value: 'US', label: 'United States' },
    { value: 'PK', label: 'Pakistan' },
];

export default function ContactStep() {
    const { state, dispatch } = useCheckout();
    const isDesktop = useBreakpoint(767);
    const data = state.contact;

    const update = (field, value) => {
        dispatch({
            type: "SET_CONTACT",
            payload: { [field]: value }, 
        });
    };

    const submit = () => {
        if (
            !data.email ||
            !data.name ||
            !data.phone ||
            !data.address ||
            !data.zip ||
            !data.city
        ) {
            alert("Please fill all required fields");
            return;
        }

        dispatch({ type: "SET_STEP", payload: 2 });
    };

    const customStyles = {
        control: (base, state) => ({
            ...base,
            height: isDesktop ? 52 : 44,
            border: '1px solid #7d7d7d',
            boxShadow: 'none',
            borderRadius: 0,
            padding: '0 8px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: state.isDisabled ? '#f2f2f2' : '#fff',
            '&:hover': {
                borderColor: '#165dba',
            },
        }),
        placeholder: (base) => ({
            ...base,
            color: '#7d7d7d',
            fontSize: isDesktop ? "16px" : "14px",
        }),
        menu: (base) => ({
            ...base,
            fontSize: '14px',
            zIndex: 9999,
        }),
        option: (base, { isFocused }) => ({
            ...base,
            backgroundColor: isFocused ? '#f0f0f0' : '#fff',
            color: '#333',
            cursor: 'pointer',
        }),
    };

    return (
        <div className="step">
            <h2>1. Contact</h2>

            <div className="Contact-wrap">
                <div className="emailwrap">
                    {/* ===== Email ===== */}
                    <label>Your Email Address</label>
                    <input
                        placeholder="Email *"
                        value={data.email}
                        onChange={(e) => update("email", e.target.value)}
                        className="checkout-input"
                    />
                </div>

                {/* ===== About You ===== */}
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
                        options={options}
                        isClearable
                        isSearchable
                        onChange={(selectedOption) => update("country", selectedOption?.value || "")}
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

                <button onClick={submit}>
                    Continue To Payment Details
                </button>
            </div>
        </div>
    );
}
