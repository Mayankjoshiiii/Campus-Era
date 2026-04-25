"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import { MESS } from "@/lib/data";
import styles from "./mess.module.css";

const FILTERS = [
  { key: "all",  label: "All"          },
  { key: "veg",  label: "🟢 Veg"      },
  { key: "both", label: "🟡 Veg & Non-Veg" },
];

export default function MessPage() {
  const [filter, setFilter] = useState("all");
  const list = filter === "all" ? MESS : MESS.filter(m => m.foodtype === filter);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.header}>
          <span className={styles.eyebrow}>🍽️ Mess &amp; Tiffin</span>
          <h1 className={styles.title}>Browse All Mess Services</h1>
          <p className={styles.sub}>Find healthy, home-style food near your campus</p>
          <div className={styles.pills}>
            {FILTERS.map(f => (
              <button
                key={f.key}
                className={`${styles.pill} ${filter === f.key ? styles.pillActive : ""}`}
                onClick={() => setFilter(f.key)}
              >{f.label}</button>
            ))}
          </div>
        </section>

        <section className={styles.gridWrap}>
          {list.length === 0 ? (
            <p className={styles.empty}>No mess services found.</p>
          ) : (
            <div className={styles.grid}>
              {list.map(m => <ListingCard key={m.id} item={m} type="mess" />)}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}