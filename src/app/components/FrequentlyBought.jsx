"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "./FrequentlyBought.scss";

const FrequentlyBought = ({ products = [] }) => {
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
                    loop={true}
                    className="cart-slider"
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        450: {
                            slidesPerView: 1.5,
                        },
                        992: {
                            slidesPerView: 2,
                        },
                        1200: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {products.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="fbt-card">
                                <Image
                                    src={item.image}
                                    width={200}
                                    height={150}
                                    alt={item.title || item.sku}
                                />

                                <h4>{item.sku}</h4>
                                <p>{item.title}</p>

                                <div className="fbt-price">
                                    <span className="old">${item.oldPrice}</span>
                                    <strong>${item.price}</strong>
                                </div>

                                <button className="fbt-btn">Add to Cart</button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Navigation buttons */}
                <button className="fbt-arrow left">‹</button>
                <button className="fbt-arrow right">›</button>
            </div>
        </div>
    );
};

export default FrequentlyBought;
