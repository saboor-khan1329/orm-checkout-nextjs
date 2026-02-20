import Image from 'next/image'
import React from 'react'
import "./CartCard.scss"
import QuantityStepper from './QuantityStepper'


const CartCard = () => {
    return (
        <div className='CartCard-wrap'>

            {[1, 2, 3].map((mun) => (
                <div key={mun} className="box">
                    <Image src="/images/cart/product-img.jpg" width={172} height={128} alt='' className='box-img' />

                    <div className="Card-content">
                        <p className='content-title'>C9300L-24P-4G-E</p>
                        <p className='content-dec'>CATALYST 9300L 24P POE NTWK ESSENTIALS 4X1G UPLINK</p>
                        <Image src="/images/cart/product-img.jpg" width={172} height={128} alt='' className='box-img-mob' />
                        <hr className='d-block d-md-none' />
                        <span className='content-recently'>
                            <Image src="/images/cart/like.svg" width={12} height={11} alt='' />Added to cart <strong>13+</strong> times recently</span>
                    </div>

                    <div className="card-pricing">
                        <div className="">
                            <p className='main-price'>$979.99</p>
                            <p className='saving'>Savings: $1,549.50 <span>(50%)</span></p>
                        </div>
                        <QuantityStepper />
                    </div>

                    <div className="remove-btn">
                        <span>Save for later</span> |
                        <span>Remove</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CartCard