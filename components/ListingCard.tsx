"use client";

import Link from "next/link";
import styles from "./ListingCard.module.css";

// -------------------- TYPES --------------------

// PG type
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

// Mess type
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

// Props type
type ListingCardProps =
  | { type: "pg"; item: PG }
  | { type: "mess"; item: Mess };

// -------------------- COMPONENT --------------------

export default function ListingCard(props: ListingCardProps) {
  const { type, item } = props;
const isPg = props.type === "pg";
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

  const badge = isPg
    ? (item as PG).type
    : (item as Mess).foodtype === "veg"
    ? "🟢 Veg"
    : (item as Mess).foodtype === "nonveg"
    ? "🔴 Non-Veg"
    : "🟡 Veg & Non-Veg";

  return (
    <Link href={href} className={`${styles.card} ${isPg ? styles.pgCard : styles.messCard}`}>
      <div className={styles.imgWrap}>
        <img
          src={item.image}
          alt={title}
          className={styles.img}
          loading="lazy"
        />

        {item.rating > 0 && (
          <span className={styles.rating}>
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
            {item.rating.toFixed(1)}
          </span>
        )}

        <span
          className={`${styles.badge} ${
            isPg ? styles.pgBadge : styles.messBadge
          }`}
        >
          {badge}
        </span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.loc}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {item.location}
        </div>

        <div className={styles.footer}>
          <span
            className={`${styles.price} ${
              isPg ? styles.pgPrice : styles.messPrice
            }`}
          >
            ₹
            {typeof price === "number"
              ? price.toLocaleString("en-IN")
              : price}
            <span className={styles.unit}>{unit}</span>
          </span>

          <span className={styles.reviews}>
            {item.reviews} reviews
          </span>
        </div>
      </div>
    </Link>
  );
}