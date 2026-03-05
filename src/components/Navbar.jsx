import React from "react";
import "./Navbar.scss";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="Navbar-sp">
      <div className="container">
        <div className="Navbar-wrap">
          <p className="Navbar-title d-none d-md-block">Store Checkout</p>
          <Link href="https://ormsystems.com">
            <Image
              src="/images/cart/logo.svg"
              width={108}
              height={45}
              alt=""
              className="Navbar-logo"
            />
          </Link>

          <div className="icons-wrap">
            <Image
              src="/images/cart/dashboard.svg"
              width={25}
              height={25}
              alt=""
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
