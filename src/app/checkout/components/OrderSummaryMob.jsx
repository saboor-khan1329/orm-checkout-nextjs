"use client";

import React, { useState } from 'react'
import { useCheckout } from "./CheckoutProvider";
import "./OrderSummaryMob.scss"
import OrderSummary from '@/app/components/OrderSummary'
import CartBox from './CartBox';
import Image from 'next/image';
import { ShipToSummary } from './ShipToSummary';



const OrderSummaryMob = () => {
    const [open, setOpen] = useState(false);
    const { state } = useCheckout();

    return (
        <div className='OrderSummaryMob-wrap'>
            <div className="container">
                <div className="header" onClick={() => setOpen(!open)}>
                    <div className="content">
                        <p className={`text-1 ${open ? "big" : ""}`}>Order Summary</p>
                        {!open && <p className='text-2'>$1,458.99</p>}
                    </div>

                    <div className="buttons">
                        {!open && <span className='view'>View <Image src="/images/cart/Capa_1.webp" width={11} height={7} alt='' /></span>}
                        {open && <p className='cross-btn'>x</p>}
                    </div>

                </div>

                <div className={`OrderSummaryMob-body ${open ? "open" : ""}`}>
                    <OrderSummary showMeta={false} />

                    <CartBox />

                    {state.step === 2 && (
                        <ShipToSummary
                            onEdit={() => dispatch({ type: "SET_STEP", payload: 1 })}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default OrderSummaryMob