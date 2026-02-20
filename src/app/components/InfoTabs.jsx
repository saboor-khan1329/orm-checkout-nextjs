"use client";

import { useState } from "react";
import "./InfoTabs.scss"
import Image from "next/image";

const FEATURES = [
    {
        id: "warranty",
        title: "3 Year Extended Warranty",
        imgSrc:"/images/cart/Warranty-logo.svg",
        content: (
            <>
                <h3>3 Year Extended Warranty</h3>
                <p>
                    Get peace of mind with our extended 3-year warranty covering
                    manufacturing defects and hardware issues.
                </p>
            </>
        ),
    },
    {
        id: "shipping",
        title: "Same-day Shipping",
        imgSrc:"/images/cart/shipping-same-day.svg",
        content: (
            <>
                <h3>Same-day Shipping</h3>
                <p>
                    Orders placed before cutoff time are shipped the same day
                    for faster delivery.
                </p>
            </>
        ),
    },
    {
        id: "guarantee",
        title: "14-Day Money Back Guarantee",
        imgSrc:"/images/cart/money-back.svg",
        content: (
            <>
                <h3>14-Day Money Back Guarantee</h3>
                <p>
                    Not satisfied? Return the product within 14 days for a full refund.
                </p>
            </>
        ),
    },
];


const InfoTabs = () => {
    const [active, setActive] = useState(null);

    return (
        <>
            <div className="feature-tabs">
                {FEATURES.map((item) => (
                    <button
                        key={item.id}
                        className="feature-row"
                        onClick={() => setActive(item)}
                    >
                        <div className="row-img">
                            <Image src={item.imgSrc} width={25} height={25} alt={item.title} />
                        </div>
                        <span className="tabs-title">{item.title}</span>
                        <span className="arrow">›</span>
                    </button>
                ))}
            </div>

            {/* Overlay */}
            {active && (
                <div className="sidebar-overlay" onClick={() => setActive(null)} />
            )}

            {/* Sidebar */}
            <aside className={`sidebar ${active ? "open" : ""}`}>
                <button className="sidebar-close" onClick={() => setActive(null)}>
                    ×
                </button>
                <div className="sidebar-content">{active?.content}</div>
            </aside>
        </>
    );
}

export default InfoTabs