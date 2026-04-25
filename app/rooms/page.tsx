"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import { ROOMS } from "@/lib/data";
import styles from "./rooms.module.css";

const TYPES   = ["All", "Single", "Double", "Triple"];
const UNIVS   = ["All Universities", "Delhi University", "GGSIPU", "Amity University", "NSIT"];
const BUDGETS = [
  { label: "Any Budget", min: 0,     max: Infinity },
  { label: "Under ₹6k",  min: 0,     max: 6000     },
  { label: "₹6k – ₹8k",  min: 6000,  max: 8000     },
  { label: "₹8k – ₹10k", min: 8000,  max: 10000    },
  { label: "Above ₹10k", min: 10000, max: Infinity  },
];

export default function RoomsPage() {
  const [roomType,  setRoomType]  = useState("All");
  const [university, setUniversity] = useState("All Universities");
  const [budgetIdx,  setBudgetIdx]  = useState(0);

  const budget = BUDGETS[budgetIdx];

  const list = ROOMS.filter(r => {
    const typeOk  = roomType   === "All"               || r.type       === roomType;
    const univOk  = university === "All Universities"  || r.university === university;
    const budgOk  = r.price >= budget.min && r.price <= budget.max;
    return typeOk && univOk && budgOk;
  });

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.header}>
          <span className={styles.eyebrow}>🏠 PG &amp; Rooms</span>
          <h1 className={styles.title}>Browse All PG Listings</h1>
          <p className={styles.sub}>Verified accommodations near your campus — no brokerage</p>
        </section>

        {/* Filters */}
        <div className={styles.filtersWrap}>
          <div className={styles.filters}>
            {/* Room Type */}
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Room Type</span>
              <div className={styles.pills}>
                {TYPES.map(t => (
                  <button
                    key={t}
                    className={`${styles.pill} ${roomType === t ? styles.pillActive : ""}`}
                    onClick={() => setRoomType(t)}
                  >{t}</button>
                ))}
              </div>
            </div>

            {/* University */}
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>University</span>
              <div className={styles.pills}>
                {UNIVS.map(u => (
                  <button
                    key={u}
                    className={`${styles.pill} ${university === u ? styles.pillActive : ""}`}
                    onClick={() => setUniversity(u)}
                  >{u === "All Universities" ? "All" : u}</button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Budget</span>
              <div className={styles.pills}>
                {BUDGETS.map((b, i) => (
                  <button
                    key={b.label}
                    className={`${styles.pill} ${budgetIdx === i ? styles.pillActive : ""}`}
                    onClick={() => setBudgetIdx(i)}
                  >{b.label}</button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.resultCount}>
            <span className={styles.count}>{list.length}</span> listing{list.length !== 1 ? "s" : ""} found
          </div>
        </div>

        <section className={styles.gridWrap}>
          {list.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>🏚️</span>
              <p>No PGs found for the selected filters.</p>
              <button className={styles.resetBtn} onClick={() => { setRoomType("All"); setUniversity("All Universities"); setBudgetIdx(0); }}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className={styles.grid}>
              {list.map(r => <ListingCard key={r.id} item={r} type="pg" />)}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}