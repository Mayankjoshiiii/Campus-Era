import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MESS } from "@/lib/data";
import styles from "./detail.module.css";

export default function MessDetail({ params }: { params: { id: string } }) {  const { id } = params;

  const mess = MESS.find(m => m.id === id);
  if (!mess) notFound();


  const foodBadge =
    mess.foodtype === "veg"    ? "🟢 Veg Only"       :
    mess.foodtype === "nonveg" ? "🔴 Non-Veg Only"   :
                                 "🟡 Veg & Non-Veg";

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.hero}>
          <img src={mess.image} alt={mess.name} className={styles.heroImg} />
          <div className={styles.heroOverlay} />
          <a href="/mess" className={styles.back}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15,18 9,12 15,6" />
            </svg>
          </a>
        </div>

        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Left */}
            <div className={styles.left}>
              <span className={`${styles.typeBadge} ${styles.messBadge}`}>{foodBadge}</span>
              <h1 className={styles.title}>{mess.name}</h1>
              <div className={styles.loc}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                {mess.location}
              </div>
              {mess.rating > 0 && (
                <div className={styles.rating}>
                  <span className={styles.star}>★</span>
                  <strong>{mess.rating.toFixed(1)}</strong>
                  <span className={styles.ratingCount}>({mess.reviews} reviews)</span>
                </div>
              )}

              {/* Menu */}
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>🍱 Today's Menu</h3>
                <div className={styles.chips}>
                  {mess.menu.map(item => (
                    <span key={item} className={styles.chip}>
                      <span className={`${styles.chipDot} ${styles.chipAccent}`} />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* About */}
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>About this Mess</h3>
                <p className={styles.about}>
                  {mess.name} is a popular {mess.foodtype === "veg" ? "vegetarian" : mess.foodtype === "nonveg" ? "non-vegetarian" : "veg and non-veg"} mess
                  located in {mess.location}, serving students near {mess.university}.
                  Open from {mess.timings}, it offers freshly prepared, home-style meals at student-friendly prices.
                </p>
              </div>

              {/* Timings card */}
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>⏰ Timings</h3>
                <p className={styles.timingText}>{mess.timings}</p>
              </div>
            </div>

            {/* Right sidebar */}
            <div className={styles.right}>
              <div className={styles.priceCard}>
                <p className={styles.priceLabel}>Monthly Subscription</p>
                <p className={styles.price}>₹{mess.pricepermonth.toLocaleString("en-IN")}</p>
                <p className={styles.priceSub}>per person / month</p>
                <a href={`tel:${mess.contact}`} className={styles.callBtn}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.36a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.76.32 1.55.55 2.36.68A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Call Owner
                </a>
                <p className={styles.appNote}>📱 Full menu & booking available in the <strong>Roomix App</strong></p>
              </div>

              <div className={styles.infoCard}>
                {[
                  { l: "Food Type",  v: foodBadge                          },
                  { l: "University", v: mess.university                     },
                  { l: "Timings",    v: mess.timings                        },
                  { l: "Contact",    v: mess.contact                        },
                  { l: "Rating",     v: `${mess.rating}★ (${mess.reviews} reviews)` },
                ].map(row => (
                  <div key={row.l} className={styles.infoRow}>
                    <span className={styles.infoLabel}>{row.l}</span>
                    <span className={styles.infoValue}>{row.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}