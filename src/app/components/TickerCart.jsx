import React from 'react'
import "./TickerCart.scss"
import Image from 'next/image'
import Link from 'next/link'


const TickerCart = () => {
    return (
        <section className='TickerCart-sp'>
            <div className="container">
                <div className="TickerCart-wrap">
                    <Image src="/images/cart/logo.svg" width={108} height={45} alt='orm logo' />

                    <div className="TickerCart-content">
                        <p className='content-title'>Your setup isn’t complete without the right accessories.</p>
                        <p className='content-para'>Take an extra 10% off select Lenovo accessories when you purchase a PC.</p>
                    </div>

                    <Link href="" className='cta'>SHOP NOW</Link>
                </div>
            </div>
        </section>
    )
}

export default TickerCart