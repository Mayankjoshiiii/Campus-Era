"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../(legal)/legal.module.css";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.wrap}>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Our Story</span>
            <h1 className={styles.title}>About Campus Era</h1>
            <p className={styles.subtitle}>Built by students, for students</p>
          </div>

          <div className={styles.card}>
            <div className={styles.section}>
              <h2>Who We Are</h2>
              <p>
                Campus Era was founded in 2024 by a group of local college students in Dehradun who were frustrated with the chaos of finding a PG — spam calls, unreliable listings, fake photos, and zero transparency. We built the platform we wish had existed when we first arrived in the city.
              </p>
              <p>
                Today, Campus Era helps hundreds of students across Dehradun find verified PGs, mess services, and compatible roommates near their campuses — all without a single rupee of brokerage.
              </p>
            </div>

            <div className={styles.section}>
              <h2>Our Numbers</h2>
              <div className={styles.statsGrid}>
                <div className={styles.statBox}>
                  <p className={styles.statNum}>500+</p>
                  <p className={styles.statLbl}>Students Housed</p>
                </div>
                <div className={styles.statBox}>
                  <p className={styles.statNum}>50+</p>
                  <p className={styles.statLbl}>PG Listings</p>
                </div>
                <div className={styles.statBox}>
                  <p className={styles.statNum}>4.7★</p>
                  <p className={styles.statLbl}>Avg Rating</p>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2>Our Mission</h2>
              <p>
                Every student deserves a safe, comfortable, and affordable place to live and eat. Our mission is to remove the friction from student housing — no middlemen, no fake listings, no brokerage fees.
              </p>
              <ul>
                <li>100% verified listings with real photos</li>
                <li>Direct contact with owners — no middlemen</li>
                <li>Student-first pricing with zero brokerage</li>
                <li>Honest reviews from real students</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>Currently Live In</h2>
              <p>We operate <strong>exclusively in Dehradun</strong> to provide the most reliable localized experience for students studying at premier institutions:</p>
              <ul>
                <li>UPES (Bidholi &amp; Kandoli Campus)</li>
                <li>Graphic Era University (Clement Town)</li>
                <li>DIT University &amp; IMS Unison (Mussoorie Diversion)</li>
                <li>UTU, Uttaranchal University &amp; Premnagar areas</li>
              </ul>
              <p>We are dedicated to serving the Dehradun student community with 100% verified local listings.</p>
            </div>

            <div className={styles.section}>
              <h2>Get In Touch</h2>
              <p>
                Want to list your PG on Campus Era, partner with us, or just say hi?
                Reach us at <a href="mailto:campus.era.tech@gmail.com">campus.era.tech@gmail.com</a> or use our{" "}
                <a href="/contact">contact form</a>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}