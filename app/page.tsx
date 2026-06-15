"use client";
import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import DoonMatcher from "@/components/DoonMatcher";
import { ROOMS, MESS, FEATURES } from "@/lib/data";
import styles from "./page.module.css";

export default function Home() {
  const topRooms = ROOMS.slice(0, 3);
  const topMess  = MESS.slice(0, 3);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main className={styles.main}>

        {/* ── HERO ── */}
        <section className={styles.hero}>
          <div className={`${styles.heroPill} reveal`}>
            <span className={styles.pillDot}/>
            Now live exclusively in Dehradun
          </div>
          <h1 className={`${styles.heroTitle} reveal delay1`}>
            Student Housing,<br/>
            <span className={`${styles.heroGrad} doodleHighlight`}>Finally Sorted.</span>
          </h1>
          <p className={`${styles.heroSub} reveal delay2`}>
            Bidholi or Clement Town, we've got you covered. Find verified PGs, mess services, and compatible roommates near your college. Zero brokerage, zero fake pictures, 100% student vibes.
          </p>
          <div className={`${styles.heroActions} reveal delay3`}>
            <a href="#download" className={styles.btnPrimary}>
              Download App
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
            </a>
            <Link href="/rooms" className={styles.btnSecondary}>Browse PGs</Link>
            <div className="handwritten" style={{ marginLeft: "1.5rem", position: "relative", top: "8px" }}>
              No brokerage, ever! 🤝
            </div>
          </div>

          {/* Stats strip */}
          <div className={`${styles.stats} reveal delay4`}>
            {[
              { n: "500+",  l: "Students Housed"  },
              { n: "50+",   l: "PG Listings"       },
              { n: "20+",   l: "Mess Services"     },
              { n: "4.7★",  l: "Average Rating"    },
            ].map(s => (
              <div key={s.l} className={styles.stat}>
                <span className={styles.statN}>{s.n}</span>
                <span className={styles.statL}>{s.l}</span>
              </div>
            ))}
          </div>

          {/* Hero image grid */}
          <div className={`${styles.heroGrid} reveal delay5`}>
            <img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=700&q=80" alt="PG room" className={styles.hImg1}/>
            <img src="https://images.unsplash.com/photo-1567337710282-00832b415979?w=500&q=80" alt="Mess food" className={styles.hImg2}/>
            <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&q=80" alt="Student room" className={styles.hImg3}/>
          </div>
        </section>

        {/* ── DOON MATCHER WIDGET ── */}
        <div className="reveal">
          <DoonMatcher />
        </div>

        {/* ── TOP PGs ── */}
        <section className={styles.section}>
          <div className={`${styles.secHead} reveal`}>
            <div>
              <p className={styles.secEyebrow}>🏠 PG &amp; Rooms</p>
              <h2 className={styles.secTitle}>Top Rated PGs Near Campus</h2>
            </div>
            <Link href="/rooms" className={styles.seeAll}>See all →</Link>
          </div>
          <div className={styles.grid}>
            {topRooms.map((r, i) => (
              <div key={r.id} className={`reveal delay${i + 1}`}>
                <ListingCard item={r} type="pg"/>
              </div>
            ))}
          </div>
        </section>

        {/* ── TOP MESS ── */}
        <section className={styles.section}>
          <div className={`${styles.secHead} reveal`}>
            <div>
              <p className={styles.secEyebrow}>🍽️ Mess &amp; Tiffin</p>
              <h2 className={styles.secTitle}>Best Mess Services Near You</h2>
            </div>
            <Link href="/mess" className={styles.seeAll}>See all →</Link>
          </div>
          <div className={styles.grid}>
            {topMess.map((m, i) => (
              <div key={m.id} className={`reveal delay${i + 1}`}>
                <ListingCard item={m} type="mess"/>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className={styles.section} id="features">
          <div className={`${styles.secHead} reveal`}>
            <div>
              <p className={styles.secEyebrow}>✨ Everything You Need</p>
              <h2 className={styles.secTitle}>Why Students Love Campus Era</h2>
            </div>
          </div>
          <div className={styles.featGrid}>
            {FEATURES.map((f, i) => (
              <div key={f.title} className={`${styles.featCard} reveal delay${(i % 3) + 1}`}>
                <span className={styles.featIcon}>{f.icon}</span>
                <h3 className={styles.featTitle}>{f.title}</h3>
                <p className={styles.featDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── DEHRADUN SURVIVAL GUIDE ── */}
        <section className={styles.survivalSection}>
          <div className={`${styles.secHead} reveal`} style={{ justifyContent: "center", textAlign: "center", marginBottom: "3rem" }}>
            <div>
              <p className={styles.secEyebrow}>⛰️ Dehradun Student Corner</p>
              <h2 className={styles.secTitle}>Doon Student Survival Guide</h2>
            </div>
          </div>
          <div className={styles.survivalGrid}>
            <div className={`${styles.survivalCard} reveal delay1`}>
              <span className={styles.survivalIcon}>🚌</span>
              <h3 className={styles.survivalTitle}>Vikram Route Cheat Sheet</h3>
              <p className={styles.survivalDesc}>
                Dehradun's shared blue autos (Vikrams) are cheap but have fixed routes. Route 5 goes to Premnagar/Sudhowala (ideal for UTU/Uttaranchal), and Route 1 goes to Rajpur Road. Memorize these to save heavy private auto charges!
              </p>
            </div>
            <div className={`${styles.survivalCard} reveal delay2`}>
              <span className={styles.survivalIcon}>🍜</span>
              <h3 className={styles.survivalTitle}>Late Night Chai &amp; Maggi</h3>
              <p className={styles.survivalDesc}>
                Exam stress? Bidholi's local valley Maggi points, Clement Town's momo stalls, and Jakhan's cafes are the ultimate saviors. Maggi point views are free, tea is ₹10!
              </p>
            </div>
            <div className={`${styles.survivalCard} reveal delay3`}>
              <span className={styles.survivalIcon}>🏡</span>
              <h3 className={styles.survivalTitle}>PG Contract Rules</h3>
              <p className={styles.survivalDesc}>
                Most PGs in Doon have strict entry timings (typically 9:30 PM). Always clarify if the food menu includes Sunday dinner and if high-speed WiFi actually reaches your room before paying deposit.
              </p>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className={styles.howSection}>
          <p className={`${styles.secEyebrow} reveal`} style={{textAlign:"center"}}>📱 How It Works</p>
          <h2 className={`${styles.secTitle} reveal delay1`} style={{textAlign:"center",marginBottom:"3rem"}}>Find Your Place in 3 Simple Steps</h2>
          <div className={styles.steps}>
            {[
              { n:"01", title:"Download the App",    desc:"Available on Android (iOS coming soon). Free to use for students." },
              { n:"02", title:"Browse Listings",      desc:"Filter by location, budget, food type, and university."           },
              { n:"03", title:"Connect Directly",     desc:"Call or message the owner directly. No brokerage, no middleman."  },
            ].map((s, i) => (
              <div key={s.n} className={`${styles.step} reveal delay${i + 1}`}>
                <span className={styles.stepN}>{s.n}</span>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── DOWNLOAD CTA ── */}
        <section className={`${styles.downloadSection} reveal`} id="download">
          <div className={styles.downloadCard}>
            <div className={styles.downloadText}>
              <h2 className={styles.downloadTitle}>Ready to Find Your Perfect Student Home?</h2>
              <p className={styles.downloadSub}>Join 500+ students already using Campus Era. Download the app — it's completely free.</p>
              <div className={styles.downloadBtns}>
                <a href="#" className={styles.storBtn} style={{ opacity: 0.6, cursor: "not-allowed" }} onClick={(e) => e.preventDefault()}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  <div><small>App Store</small><strong>Coming Soon</strong></div>
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.company.campusera&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" className={styles.storBtn}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76a2 2 0 0 0 2.76.74l11.34-6.54-2.9-2.9-11.2 8.7zM20.9 10.37 17.5 8.44 14.28 11.5l3.22 3.22 3.42-1.96a2 2 0 0 0-.02-3.39zM2 2.24v19.52l10-10L2 2.24zM5.94.5l11.34 6.54-2.9 2.9L5.04 1.24A2 2 0 0 1 5.94.5z"/></svg>
                  <div><small>Get it on</small><strong>Google Play</strong></div>
                </a>
              </div>
            </div>
            <div className={styles.downloadImgs}>
              <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80" alt="App preview" className={styles.dlImg}/>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}