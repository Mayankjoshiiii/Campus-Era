"use client";

import Link from "next/link";
import Tilt3D from "@/components/Tilt3D";
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

  // Extracts neighborhood name (e.g. Bidholi or Premnagar) from full location string
  const areaName = item.location.split(",")[0].trim();

  return (
    <Link href={href} className={styles.linkWrapper}>
      <Tilt3D maxTilt={16} scale={1.04} className={styles.tiltWrap}>
        <div className={`${styles.card} ${isPg ? styles.pgCard : styles.messCard}`}>
          <div className={styles.imgWrap}>
            <img
              src={item.image}
              alt={title}
              className={styles.img}
              loading="lazy"
            />

            {item.rating > 0 && (
              <div className={styles.ratingBadge}>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
                <span>{ratingVal}</span>
              </div>
            )}
          </div>

          <div className={styles.body}>
            <div className={styles.metaRow}>
              <span className={isPg ? styles.tagPg : styles.tagMess}>
                {categoryText}
              </span>
              <span className={styles.metaDot}>&bull;</span>
              <span className={styles.metaLoc}>{areaName}</span>
            </div>

            <h3 className={styles.title}>{title}</h3>

            <div className={styles.divider} />

            <div className={styles.footer}>
              <div className={styles.priceCol}>
                <span className={styles.priceLabel}>Starts from</span>
                <span className={styles.priceVal}>
                  ₹{typeof price === "number" ? price.toLocaleString("en-IN") : price}
                  <span className={styles.unit}>{unit}</span>
                </span>
              </div>

              <div className={styles.reviewsCol}>
                <span className={styles.reviewsCount}>{item.reviews} reviews</span>
              </div>
            </div>
          </div>
        </div>
      </Tilt3D>
    </Link>
  );
}