"use client";

import React, { useState } from "react";

export default function PaymentPage() {
    const [selectedItems, setSelectedItems] = useState({
        1: true,
        2: true,
        3: true,
        5: true,
        6: true,
    });

    const [isLoading, setIsLoading] = useState(false);

    const invoiceData = [
        {
            id: 1,
            event: "Pre Wedding",
            services: ["Candid Photography", "Cinematography", "Drone Coverage"],
            equipment: ["SONY A7R4", "SONY FX3", "DJI AIR 3S"],
            date: "Feb 2026",
            price: 35000,
        },
        {
            id: 2,
            event: "Home Rituals (Bride & Groom)",
            services: ["Traditional Photography"],
            equipment: ["SONY M4"],
            date: "9th or 10th April 2026",
            price: 16000,
        },
        {
            id: 3,
            event: "Haldi (Bride & Groom)",
            services: ["Traditional Photography"],
            equipment: ["SONY M4"],
            date: "9th or 10th April 2026",
            price: 16000,
        },
        {
            id: 5,
            event: "Reception",
            services: [
                "Candid Photography",
                "Traditional Photography",
                "Traditional Videography X2",
                "Cinematography",
                "Drone Coverage",
            ],
            equipment: ["SONY A7R4", "SONY M4", "SONY FX-30", "SONY FX3", "DJI AIR 3S"],
            date: "11th April 2026",
            price: 70000,
        },
        {
            id: 6,
            event: "Muhurtham",
            services: [
                "Candid Photography",
                "Traditional Photography",
                "Traditional Videography X2",
                "Cinematography",
                "Drone Coverage",
            ],
            equipment: ["SONY A7R4", "SONY M4", "SONY FX-30", "SONY FX3", "DJI AIR 3S"],
            date: "12th April 2026",
            price: 70000,
        },
    ];

    const handleCheckboxChange = (id) => {
        setSelectedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const totalAmount = invoiceData.reduce((sum, item) => {
        return selectedItems[item.id] ? sum + item.price : sum;
    }, 0);

    const displayRazorpay = async () => {
        if (totalAmount <= 0) {
            alert("Please select at least one event to pay.");
            return;
        }

        if (!window.Razorpay) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        setIsLoading(true);

        const options = {
            key: "rzp_test_PLACEHOLDER", // Use your Razorpay Test Key ID here
            amount: totalAmount * 100, // Amount in paise
            currency: "INR",
            name: "Team Alpha Photography",
            description: "Payment for selected event services",
            image: "/logo_new.png",
            handler: function (response) {
                alert(`Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`);
                setIsLoading(false);
            },
            prefill: {
                name: "Client Name",
                email: "client@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Photography Portal Service",
            },
            theme: {
                color: "#1c1c1c",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        setIsLoading(false);
    };

    return (
        <section id="payment" className="payment-section">
            <div className="container">
                <h2 className="section-title">Invoice & Payment</h2>
                <div className="test-badge">SANDBOX TEST MODE</div>
                <p className="section-subtitle">Select the events to proceed with your premium booking.</p>

                <div className="invoice-text-wrapper">
                    {invoiceData.map((item) => (
                        <div
                            key={item.id}
                            className={`invoice-item ${selectedItems[item.id] ? "selected" : ""}`}
                            onClick={() => handleCheckboxChange(item.id)}
                        >
                            <div className="item-header">
                                <div className="item-title-group">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems[item.id]}
                                        onChange={() => handleCheckboxChange(item.id)}
                                        className="checkbox-custom"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <span className="item-event">{item.event}</span>
                                </div>
                                <span className="item-price">₹{item.price.toLocaleString()}/-</span>
                            </div>

                            <div className="item-details">
                                <div className="detail-row">
                                    <span className="detail-label">Services:</span>
                                    <span className="detail-text">{item.services.join(", ")}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Equipment:</span>
                                    <span className="detail-text">{item.equipment.join(", ")}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Date:</span>
                                    <span className="detail-text">{item.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="total-summary">
                        <span className="total-label">TOTAL DUE</span>
                        <span className="total-amount">₹{totalAmount.toLocaleString()}/-</span>
                    </div>
                </div>

                <div className="checkout-container">
                    <div className="payment-description">
                        <h3>Ready to secure your date?</h3>
                        <p>Click below to pay via our secure Razorpay gateway. We accept all UPI apps, Credit/Debit cards, and Netbanking.</p>
                    </div>

                    <button
                        className={`pay-now-btn ${isLoading ? 'loading' : ''}`}
                        onClick={displayRazorpay}
                        disabled={isLoading || totalAmount <= 0}
                    >
                        {isLoading ? "Preparing Gateway..." : `PAY ₹${totalAmount.toLocaleString()} NOW`}
                    </button>

                    <div className="secure-badge">
                        <span className="lock-icon">🔒</span> SECURE PAYMENTS BY <span className="rzp-text">Razorpay</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .payment-section {
          padding: 80px 24px;
          background-color: #f7f5f2;
          min-height: 100vh;
        }

        :global(.section-title) {
          font-family: "Playfair Display", serif;
          font-size: 2.5rem !important;
          text-align: center;
          margin-bottom: 8px;
          color: #1c1c1c;
          font-weight: 400;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .test-badge {
           background: #ecc94b;
           color: #1c1c1c;
           font-size: 0.7rem;
           font-weight: 700;
           padding: 4px 12px;
           border-radius: 12px;
           width: fit-content;
           margin: 0 auto 16px auto;
           letter-spacing: 1px;
        }

        .section-subtitle {
          text-align: center;
          color: #888;
          margin-bottom: 60px;
          font-family: "Inter", sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .invoice-text-wrapper {
          max-width: 800px;
          margin: 0 auto 40px auto;
          background: #fff;
          padding: 0 40px;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        }

        .invoice-item {
          padding: 30px 0;
          border-bottom: 1px solid #f0f0f0;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .invoice-item:last-child {
          border-bottom: none;
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .item-title-group {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .checkbox-custom {
          transform: scale(1.3);
          cursor: pointer;
          accent-color: #1c1c1c;
        }

        :global(.item-event) {
          font-family: "Playfair Display", serif;
          font-size: 1.4rem;
          color: #1c1c1c;
        }

        .item-price {
          font-size: 1.2rem;
          font-weight: 500;
          color: #1c1c1c;
        }

        .item-details {
          padding-left: 36px;
          font-size: 0.95rem;
          color: #666;
          line-height: 1.6;
          font-weight: 300;
        }

        .detail-label {
          font-weight: 400;
          color: #333;
          margin-right: 8px;
        }

        .total-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 40px 0;
          border-top: 2px solid #1c1c1c;
          margin-top: 20px;
        }

        .total-label {
          font-family: "Playfair Display", serif;
          font-size: 1.5rem;
          letter-spacing: 1px;
        }

        .total-amount {
          font-size: 2rem;
          font-weight: 400;
          color: #1c1c1c;
        }

        .checkout-container {
           max-width: 800px;
           margin: 0 auto;
           text-align: center;
           padding: 40px;
           background: #fff;
           border-radius: 8px;
           box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        }

        .payment-description h3 {
           font-family: "Playfair Display", serif;
           margin-bottom: 12px;
           font-size: 1.6rem;
        }

        .payment-description p {
           color: #666;
           margin-bottom: 32px;
           font-weight: 300;
        }

        .pay-now-btn {
          background-color: #1c1c1c;
          color: #f7f5f2;
          border: none;
          padding: 20px 60px;
          font-size: 1.1rem;
          font-weight: 500;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.3s;
          border-radius: 4px;
          width: 100%;
          max-width: 400px;
        }

        .pay-now-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        .pay-now-btn:disabled {
           background-color: #ccc;
           cursor: not-allowed;
        }

        .secure-badge {
           margin-top: 24px;
           font-size: 0.8rem;
           color: #888;
           letter-spacing: 1px;
        }

        .rzp-text {
           font-weight: 700;
           color: #1c1c1c;
        }

        @media (max-width: 600px) {
          .item-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .item-price {
            margin-top: 8px;
            margin-left: 36px;
          }
          .total-amount {
            font-size: 1.5rem;
          }
        }
      `}</style>
        </section>
    );
}
