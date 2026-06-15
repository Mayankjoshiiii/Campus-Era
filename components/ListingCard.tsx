"use client";

import Link from "next/link";
import React from "react";
import styles from "./ListingCard.module.css";

// -------------------- TYPES --------------------

type PG = {
  id: string | number;
  title: string;
  price: number;
  image: string;
  rating: number;
  location: string;
  reviews: number;
  type: string;
};

type Mess = {
  id: string | number;
  name: string;
  pricepermonth: number;
  image: string;
  rating: number;
  location: string;
  reviews: number;
  foodtype: "veg" | "nonveg" | "both";
};

type ListingCardProps =
  | { type: "pg"; item: PG }
  | { type: "mess"; item: Mess };

// -------------------- COMPONENT --------------------

export default function ListingCard(props: ListingCardProps) {
  const { type, item } = props;
  const isPg = type === "pg";

  const title = isPg
    ? (item as PG).title
    : (item as Mess).name;

  const price = isPg
    ? (item as PG).price
    : (item as Mess).pricepermonth;

  const unit = "/mo";

  const href = isPg
    ? `/rooms/${item.id}`
    : `/mess/${item.id}`;

  const ratingVal = item.rating > 0 ? item.rating.toFixed(1) : "N/A";

  const categoryText = isPg
    ? `${(item as PG).type} Sharing`
    : (item as Mess).foodtype === "veg"
    ? "Veg Only"
    : (item as Mess).foodtype === "nonveg"
    ? "Non-Veg Only"
    : "Veg & Non-Veg";

  const areaName = item.location.split(",")[0].trim();

  // Mouse move handler for spotlight glow
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <Link
      href={href}
      className={`${styles.card} ${isPg ? styles.pgCard : styles.messCard}`}
      onMouseMove={handleMouseMove}
    >
      {/* Background Image Section */}
      <div className={styles.imgWrap}>
        <img
          src={item.image}
          alt={title}
          className={styles.img}
          loading="lazy"
        />
        <div className={styles.shadowOverlay} />
      </div>

      {/* Floating Glassmorphic Details Box */}
      <div className={styles.detailsBox}>
        {/* Header Row: Category Tag & Rating */}
        <div className={styles.metaRow}>
          <span className={isPg ? styles.tagPg : styles.tagMess}>
            {categoryText}
          </span>
          {item.rating > 0 && (
            <div className={styles.ratingBadge}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
              <span>{ratingVal}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className={styles.title}>{title}</h3>

        {/* Location & Reviews Row */}
        <div className={styles.locRow}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{areaName}</span>
          <span className={styles.metaDot}>&bull;</span>
          <span>{item.reviews} reviews</span>
        </div>

        <div className={styles.divider} />

        {/* Price Row */}
        <div className={styles.priceRow}>
          <div className={styles.priceCol}>
            <span className={styles.priceLabel}>Starts from</span>
            <span className={styles.priceVal}>
              ₹{typeof price === "number" ? price.toLocaleString("en-IN") : price}
              <span className={styles.unit}>{unit}</span>
            </span>
          </div>
          <span className={styles.arrowIcon}>→</span>
        </div>
      </div>
    </Link>
  );
}