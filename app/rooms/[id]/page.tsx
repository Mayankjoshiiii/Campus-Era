"use client";
import { notFound } from "next/navigation";
import { use, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ROOMS } from "@/lib/data";
import styles from "./detail.module.css";

export default function RoomDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const room = ROOMS.find(r => r.id === id);
  if (!room) notFound();

  const [requestSent, setRequestSent] = useState(false);
  const [reqForm, setReqForm] = useState({
    name: "",
    phone: "",
    date: "",
    sharing: "Double",
  });

  const handleRequestSubmit = () => {
    if (!reqForm.name || !reqForm.phone) return;

    const subjectText = `PG Booking Request [${room.title.toUpperCase()}] - ${reqForm.name}`;
    const bodyText = `Hi Campus Era Team,\n\nI want to submit a booking/visit request for a PG:\n\n` +
      `PG Name: ${room.title}\n` +
      `Location: ${room.location}\n` +
      `Monthly Rent: ₹${room.price}/month\n\n` +
      `User Details:\n` +
      `- Name: ${reqForm.name}\n` +
      `- Phone: ${reqForm.phone}\n` +
      `- Move-in Date: ${reqForm.date || "Not specified"}\n` +
      `- Room Preference: ${reqForm.sharing}\n`;

    const mailtoUrl = `mailto:campus.era.tech@gmail.com?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;
    window.location.href = mailtoUrl;
    setRequestSent(true);
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.hero}>
          <img src={room.image} alt={room.title} className={styles.heroImg} />
          <div className={styles.heroOverlay} />
          <a href="/rooms" className={styles.back}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15,18 9,12 15,6" />
            </svg>
          </a>
        </div>

        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.left}>
              <span className={styles.typeBadge}>{room.type}</span>
              <h1 className={styles.title}>{room.title}</h1>
              <div className={styles.loc}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                {room.location}
              </div>
              {room.rating > 0 && (
                <div className={styles.rating}>
                  <span className={styles.star}>★</span>
                  <strong>{room.rating.toFixed(1)}</strong>
                  <span className={styles.ratingCount}>({room.reviews} reviews)</span>
                </div>
              )}
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Amenities</h3>
                <div className={styles.chips}>
                  {room.amenities.map(a => (
                    <span key={a} className={styles.chip}>
                      <span className={styles.chipDot} />
                      {a}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>About this PG</h3>
                <p className={styles.about}>
                  {room.title} is a well-maintained {room.type.toLowerCase()} sharing PG located in {room.location},
                  close to {room.university}. It offers a safe, comfortable environment for students with all
                  essential amenities included in the monthly rent.
                </p>
              </div>
            </div>

            <div className={styles.right}>
              <div className={styles.priceCard}>
                <p className={styles.priceLabel}>Monthly Rent</p>
                <p className={styles.price}>₹{room.price.toLocaleString("en-IN")}</p>
                <p className={styles.priceSub}>per person / month</p>
                <a href={`tel:${room.contact}`} className={styles.callBtn}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.36a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.76.32 1.55.55 2.36.68A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Call Owner
                </a>
                <p className={styles.appNote}>📱 Full details & booking available in the <strong>Campus Era App</strong></p>
              </div>

              <div className={styles.infoCard}>
                {[
                  { l: "Type",       v: room.type },
                  { l: "University", v: room.university },
                  { l: "Contact",    v: room.contact },
                  { l: "Rating",     v: `${room.rating}★ (${room.reviews} reviews)` },
                ].map(row => (
                  <div key={row.l} className={styles.infoRow}>
                    <span className={styles.infoLabel}>{row.l}</span>
                    <span className={styles.infoValue}>{row.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Request Form (Landscape/Full Width below the grid) */}
          <div className={styles.requestCard}>
            {requestSent ? (
              <div className={styles.successBox}>
                <span className={styles.successIcon}>🎉</span>
                <h4 className={styles.successTitle}>Request Submitted!</h4>
                <p className={styles.successDesc}>
                  Doon senior student matchers will reach out to you within a few hours to confirm availability and schedule a visit.
                </p>
              </div>
            ) : (
              <>
                <div>
                  <h4 className={styles.formTitle}>Submit Booking / Visit Request</h4>
                  <p className={styles.formSub}>No deposit needed yet. We will verify room availability and schedule a free visit.</p>
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="req-name">Your Name</label>
                    <input
                      id="req-name"
                      type="text"
                      placeholder="Riya Sharma"
                      className={styles.inputField}
                      value={reqForm.name}
                      onChange={(e) => setReqForm(f => ({ ...f, name: e.target.value }))}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="req-phone">Phone Number</label>
                    <input
                      id="req-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      className={styles.inputField}
                      value={reqForm.phone}
                      onChange={(e) => setReqForm(f => ({ ...f, phone: e.target.value }))}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="req-date">Move-in Date</label>
                    <input
                      id="req-date"
                      type="date"
                      className={styles.inputField}
                      value={reqForm.date}
                      onChange={(e) => setReqForm(f => ({ ...f, date: e.target.value }))}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="req-sharing">Room Preference</label>
                    <select
                      id="req-sharing"
                      className={styles.selectField}
                      value={reqForm.sharing}
                      onChange={(e) => setReqForm(f => ({ ...f, sharing: e.target.value }))}
                    >
                      <option value="Single">Single Sharing</option>
                      <option value="Double">Double Sharing</option>
                      <option value="Triple">Triple Sharing</option>
                    </select>
                  </div>

                  <div className={styles.submitBtnGroup}>
                    <button className={styles.submitBtn} onClick={handleRequestSubmit}>
                      Submit Request →
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}