"use client";
import { useState, useEffect } from "react";
import { ROOMS } from "@/lib/data";
import styles from "./DoonMatcher.module.css";

const COLLEGES = [
  "All Colleges",
  "UPES",
  "Graphic Era",
  "DIT University",
  "IMS Unison",
  "UTU"
];

const DOON_TIPS: Record<string, string> = {
  "All Colleges": "🍵 Doon Tip: Clement Town, Rajpur Road, and Premnagar have the highest concentration of student PGs and food joints.",
  "UPES": "🌲 UPES Tip: Bidholi is in the hills (approx 18km from Dehradun city center). Since shared transport stops early, prefer PGs with shuttle facilities or rent a local scooty!",
  "Graphic Era": "🍲 Graphic Era Tip: Clement Town (Subhash Nagar) is absolute heaven for foodies. PGs fill up super early here, so book well in advance of the semester!",
  "DIT University": "❄️ DIT Tip: Mussoorie Diversion gets quite cold in winter. Make sure your PG rent includes hot water/geyser facilities or double-check the electricity unit rates.",
  "IMS Unison": "🌄 IMS Tip: Located near the picturesque Mussoorie road, it's scenic but gets rainy. Carry a good umbrella. Many PGs here offer excellent balcony views!",
  "UTU": "🚌 UTU/Premnagar Tip: Shared Vikrams (blue autos) are your lifeline. Route 5 goes towards Premnagar/Sudhowala and is extremely pocket-friendly."
};

export default function DoonMatcher() {
  const [college, setCollege] = useState("All Colleges");
  const [budget, setBudget] = useState(9000);
  const [gender, setGender] = useState("All");
  const [matches, setMatches] = useState(ROOMS);

  useEffect(() => {
    let filtered = ROOMS;

    if (college !== "All Colleges") {
      filtered = filtered.filter(
        r => r.university.toLowerCase() === college.toLowerCase()
      );
    }

    filtered = filtered.filter(r => r.price <= budget);

    if (gender !== "All") {
      // simple match logic based on title/type
      if (gender === "Girls") {
        filtered = filtered.filter(
          r => r.title.toLowerCase().includes("girl") || r.title.toLowerCase().includes("women") || r.id === "r2"
        );
      } else if (gender === "Boys") {
        filtered = filtered.filter(
          r => r.title.toLowerCase().includes("boy") || r.title.toLowerCase().includes("men") || r.id === "r1" || r.id === "r5"
        );
      }
    }

    setMatches(filtered);
  }, [college, budget, gender]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        ⚡ Doon PG Matcher &amp; Survival Tool
      </h2>
      <p className={styles.subtitle}>
        Drag and select to find matching rooms near your college. Created by seniors who survived Doon's PG hunt.
      </p>

      {/* Filter Grid */}
      <div className={styles.grid}>
        {/* College selector */}
        <div className={styles.col}>
          <label className={styles.label}>Where's your college?</label>
          <select
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            className={styles.select}
          >
            {COLLEGES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Budget Slider */}
        <div className={styles.col}>
          <label className={styles.label}>
            Max Monthly Budget: <span className={styles.budgetValue}>₹{budget.toLocaleString()}</span>
          </label>
          <div className={styles.sliderContainer}>
            <input
              type="range"
              min="5000"
              max="12000"
              step="500"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className={styles.slider}
            />
          </div>
        </div>

        {/* Gender Selection */}
        <div className={styles.col}>
          <label className={styles.label}>PG Preference</label>
          <div className={styles.radioGroup}>
            {["All", "Boys", "Girls"].map((g) => (
              <div key={g} style={{ flex: 1, display: "flex" }}>
                <input
                  type="radio"
                  id={`gender-${g}`}
                  name="gender"
                  value={g}
                  checked={gender === g}
                  onChange={() => setGender(g)}
                  className={styles.radioInput}
                />
                <label htmlFor={`gender-${g}`} className={styles.radioLabel}>
                  {g}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Local Doon Tip Box */}
      <div className={styles.tipBox}>
        <span className={styles.tipIcon}>💡</span>
        <div>
          <strong>Doon Senior Tip:</strong> {DOON_TIPS[college]}
        </div>
      </div>

      {/* Matching Results */}
      <div>
        <div className={styles.resultsHeader}>
          <span>Matching PGs near you</span>
          <span className={styles.countBadge}>{matches.length} found</span>
        </div>

        <div className={styles.resultsGrid}>
          {matches.length > 0 ? (
            matches.map((room) => (
              <div key={room.id} className={styles.card}>
                <div className={styles.cardInfo}>
                  <div className={styles.cardTitle}>{room.title}</div>
                  <div className={styles.cardMeta}>
                    <span>📍 {room.location}</span>
                    <span>•</span>
                    <span>🎓 {room.university}</span>
                  </div>
                </div>
                <div className={styles.cardPrice}>
                  <span className={styles.priceNum}>₹{room.price.toLocaleString()}</span>
                  <span className={styles.pricePeriod}>per month</span>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              😔 No rooms match your filters. Try increasing the budget slider!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
