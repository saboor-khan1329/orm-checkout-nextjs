import React from 'react'
import "./OrderSummary.scss"
import Image from 'next/image';
import Link from 'next/link';


const OrderSummary = ({ showMeta = true }) => {

    return (
        <div className="order-summary">
            <h3 className="order-title">ORDER SUMMARY</h3>

            <div className="order-rows">
                <div className="order-row">
                    <span>Sub-total</span>
                    <strong>$3,099.00</strong>
                </div>

                <div className="order-row">
                    <span>Delivery</span>
                    <strong className="green">Free</strong>
                </div>

                <div className="order-row">
                    <span>Estimated Tax</span>
                    <strong>$73.66</strong>
                </div>
            </div>

            <hr />

            <div className="order-total">
                <div>
                    <h4>Estimated Total</h4>
                    <small>Tax included</small>
                </div>
                <strong className="total-price">$1,549000.50</strong>
            </div>

            <div className="order-savings">
                <span>Total Savings</span>
                <strong className="green">$3099.00</strong>
            </div>

            <hr />

            <Link href="/checkout" className="checkout-btn">PROCEED TO CHECKOUT</Link>

            {showMeta && (
                <div className="order-meta">
                    <div className='d-flex align-items-center gap-2'>
                        <strong>Shipping:</strong>
                        <div className="logos"> <Image src="/images/cart/shipping-logo.svg" width={100} height={20} alt='' /></div>
                    </div>

                    <div className='d-flex align-items-center gap-2'>
                        <strong>Payment:</strong>
                        <span className="Payment-logos">
                            <div className="logo-box">
                                <Image src="/images/cart/payment-logo-1.svg" width={215} height={21} alt='' />
                            </div>
                            <div className="logo-box">
                                <Image src="/images/cart/payment-logo-2.svg" width={215} height={21} alt='' />
                            </div>
                            <div className="logo-box">
                                <Image src="/images/cart/payment-logo-3.svg" width={215} height={21} alt='' />
                            </div>
                            <div className="logo-box">
                                <Image src="/images/cart/payment-logo-4.svg" width={215} height={21} alt='' />
                            </div>
                            <div className="logo-box">
                                <Image src="/images/cart/payment-logo-5.svg" width={215} height={21} alt='' />

                            </div>
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderSummary