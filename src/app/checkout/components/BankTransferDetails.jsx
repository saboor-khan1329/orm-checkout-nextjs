"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function BankTransferDetails() {
  const [preview, setPreview] = useState(null);

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Only allow images
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <div className="bank-details">
      <p className="title">Make Payment through Wire Transfer</p>
      <p className="bank-details-desc">Account Information (USD ONLY)</p>

      <div className="details-table">
        <table>
          <tbody>
            <tr><td>Bank Name</td><td>Barclays Bank plc</td></tr>
            <tr><td>Account Title</td><td>ORM Systems (UK) Ltd</td></tr>
            <tr><td>Account Number</td><td>52685222</td></tr>
            <tr><td>Sort Code</td><td>20-25-19</td></tr>
            <tr><td>Swift Code</td><td>BUKBGB22</td></tr>
            <tr><td>IBAN</td><td>GB61BUKB20251952685222</td></tr>
          </tbody>
        </table>
      </div>

      <label className="payment-already-made">
        <input type="checkbox" /> Payment already made
      </label>

      {/* Upload Box */}
      <div className="upload-box">

        {/* Show Preview If Exists */}
        {preview ? (
          <div className="upload-preview">
            <Image
              src={preview}
              alt="Payment Screenshot"
              fill
              className="preview-img"
            />
          </div>
        ) : (
          <>
            <div className="upload-icon">
              <Image
                src="/images/checkout/ss-upload.svg"
                width={56}
                height={49}
                alt=""
              />
            </div>

            <p className="upload-text">
              Drop payment screenshot here
            </p>
          </>
        )}

        {/* Upload Button */}
        <label className="upload-btn">
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
          {preview ? "Change Image" : "Upload"}
        </label>
      </div>
    </div>
  );
}
