import React from "react";
import "./Footer.scss";
import Link from "next/link";

const footerLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-condition", label: "Terms & Conditions" },
  { href: "/return-policy", label: "Return Policy" },
  { href: "/warranty", label: "Warranty Policy" },
  { href: "/contact-us", label: "Contact us" },
  { href: "/all-faqs", label: "FAQs" },
  { href: "/track-your-order", label: "Track Order" },
  { href: "/partner-showcase", label: "Become A Partner" },
  { href: "/all-locations", label: "Locations" },
];

const Footer = () => {
  const baseUrlOrm = process.env.NEXT_PUBLIC_BASE_URL_ORM;
  return (
    <footer className="Footer-sp">
      <div className="container">
        <div className="Footer-wrap">
          <p className="Footer-text">
            Copyright ©2026 ORM Systems - Powered by{" "}
            <Link href="https://bridgewaydigital.com">Bridgeway Digital</Link>
          </p>
          <hr />
          <ul className="Footer-list">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={`${baseUrlOrm}${link.href}`}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
