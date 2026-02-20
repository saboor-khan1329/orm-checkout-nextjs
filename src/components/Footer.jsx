import React from 'react'
import "./Footer.scss"
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className='Footer-sp'>
            <div className="container">
                <div className="Footer-wrap">
                    <p className='Footer-text'>Copyright ©2026 ORM Systems - Powered by Bridgeway Digital</p>
                    <hr />
                    <ul className='Footer-list'>
                        <li>
                            <Link href="#">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link href="#">Terms & Conditions</Link>
                        </li>
                        <li>
                            <Link href="#">Return Policy</Link>
                        </li>
                        <li>
                            <Link href="#">Warranty Policy</Link>
                        </li>
                        <li>
                            <Link href="#">Sign in</Link>
                        </li>
                        <li>
                            <Link href="#">Contact us</Link>
                        </li>
                        <li>
                            <Link href="#">FAQs</Link>
                        </li>
                        <li>
                            <Link href="#">Track Order</Link>
                        </li>
                        <li>
                            <Link href="#">Become A Partner</Link>
                        </li>
                        <li>
                            <Link href="#">Locations</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer