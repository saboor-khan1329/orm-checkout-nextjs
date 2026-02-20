"use client";

import Image from "next/image";
import "./CartBox.scss";

export default function CartBox() {
  return (
    <div className="cart-box">

      <div className="cart-header">
        <h2>Your Cart</h2>
        <span>2 items</span>
      </div>

      {/* Item 1 */}
      <div className="cart-item">
        <div className="cart-img">
          <Image
            src="/images/cart/product-img.jpg"   // apna image path
            width={120}
            height={60}
            alt="product"
          />
        </div>

        <div className="cart-info">
          <h3>C9300L-24P-4G-E</h3>
          <p>CATALYST 9300L 24P POE NTWK ESSENTIALS 4X1G UPLINK</p>

          <div className="cart-price-row">
            <span className="qty">x1</span>

            <div className="price">
              <strong>$979.99</strong>
              <span className="old-price">$1,354.99</span>
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* Item 2 */}
      <div className="cart-item">
        <div className="cart-img">
          <Image
            src="/images/cart/product-img.jpg"
            width={120}
            height={60}
            alt="product"
          />
        </div>

        <div className="cart-info">
          <h3>C9300L-24P-4G-E</h3>
          <p>CATALYST 9300L 24P POE NTWK ESSENTIALS 4X1G UPLINK</p>

          <div className="cart-price-row">
            <span className="qty">x1</span>

            <div className="price">
              <strong>$979.99</strong>
              <span className="old-price">$1,354.99</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
