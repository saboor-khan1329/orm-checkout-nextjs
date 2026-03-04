"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useCart } from "@/context/CartContext";
import "swiper/css";
import "swiper/css/navigation";
import "./FrequentlyBought.scss";

const FrequentlyBought = ({ products = [] }) => {
  const { addItem } = useCart();

  if (!products.length) return null;

  return (
    <div className="fbt-wrapper">
      <h3 className="fbt-title">Frequently bought together</h3>

      <div className="fbt-container">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".fbt-arrow.right",
            prevEl: ".fbt-arrow.left",
          }}
          spaceBetween={20}
          slidesPerView={3}
          loop
          className="cart-slider"
          breakpoints={{
            0: { slidesPerView: 1 },
            450: { slidesPerView: 1.5 },
            992: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
        >
          {products.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="fbt-card">
                <Image
                  src={item.thumbnail}
                  width={200}
                  height={150}
                  alt={item.name}
                />

                <h4>{item.sku}</h4>

                <p>{item.name}</p>

                <div className="fbt-price">
                  <span className="old">
                    ${Number(item.previous_price).toFixed(2)}
                  </span>

                  <strong>${Number(item.current_price).toFixed(2)}</strong>
                </div>

                <button
                  className="fbt-btn"
                  onClick={() =>
                    addItem.mutate({
                      product_id: item.id,
                      quantity: 1,
                      condition: item.condition ?? "new",
                    })
                  }
                >
                  Add to Cart
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="fbt-arrow left">‹</button>
        <button className="fbt-arrow right">›</button>
      </div>
    </div>
  );
};

export default FrequentlyBought;
