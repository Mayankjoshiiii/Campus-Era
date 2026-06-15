import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logoRow}>
              <div className={styles.logoMark}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/>
                </svg>
              </div>
              <span className={styles.logoText}>Campus <span>Era</span></span>
            </div>
            <p className={styles.tagline}>The #1 student housing ecosystem. Find PGs, mess services, roommates, and more — all in one app.</p>
            <div className={styles.badges}>
              <span className={styles.badge} style={{ opacity: 0.6, cursor: "not-allowed" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                App Store (Soon Coming)
              </span>
              <a href="https://play.google.com/store/apps/details?id=com.company.campusera&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" className={styles.badge}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76a2 2 0 0 0 2.76.74l11.34-6.54-2.9-2.9-11.2 8.7zM20.9 10.37 17.5 8.44 14.28 11.5l3.22 3.22 3.42-1.96a2 2 0 0 0-.02-3.39zM2 2.24v19.52l10-10L2 2.24zM5.94.5l11.34 6.54-2.9 2.9L5.04 1.24A2 2 0 0 1 5.94.5z"/></svg>
                Play Store
              </a>
            </div>
          </div>

          <div className={styles.col}>
            <h5>Explore</h5>
            <Link href="/rooms">PG &amp; Rooms</Link>
            <Link href="/mess">Mess Services</Link>
            <Link href="/about">About Campus Era</Link>
            <Link href="/#features">Features</Link>
          </div>

          <div className={styles.col}>
            <h5>Company</h5>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/faq">FAQ</Link>
          </div>

          <div className={styles.col}>
            <h5>Legal</h5>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <a href="mailto:campus.era.tech@gmail.com">campus.era.tech@gmail.com</a>
          </div>
        </div>

        <div className={styles.divider}/>
        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} Campus Era. All rights reserved.</p>
          <p>Made with ❤️ for students</p>
        </div>
      </div>
    </footer>
  );
}