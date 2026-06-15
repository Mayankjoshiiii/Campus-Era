"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./legal.module.css";
export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.wrap}>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Legal</span>
            <h1 className={styles.title}>Privacy Policy</h1>
            <p className={styles.subtitle}>Last updated: January 2025</p>
          </div>
          <div className={styles.card}>
            <div className={styles.section}>
              <h2>1. Information We Collect</h2>
              <p>We collect information you provide directly when you create an account, list a property, or contact us. This includes:</p>
              <ul>
                <li>Name, email address, and phone number</li>
                <li>University affiliation and location preferences</li>
                <li>Property listing details and images</li>
                <li>Reviews and ratings you submit</li>
              </ul>
            </div>
            <div className={styles.section}>
              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Connect students with PG and mess listings near their campus</li>
                <li>Send updates about new listings matching your preferences</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze usage trends</li>
              </ul>
            </div>
            <div className={styles.section}>
              <h2>3. Information Sharing</h2>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share information only in these circumstances:</p>
              <ul>
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect the rights and safety of Campus Era users</li>
                <li>With service providers who assist us in operating the platform</li>
              </ul>
            </div>
            <div className={styles.section}>
              <h2>4. Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, or destruction. However, no method of transmission over the Internet is 100% secure.</p>
            </div>
            <div className={styles.section}>
              <h2>5. Cookies</h2>
              <p>We use cookies and similar tracking technologies to track activity and store certain preferences (such as dark/light mode). You can instruct your browser to refuse all cookies.</p>
            </div>
            <div className={styles.section}>
              <h2>6. Your Rights</h2>
              <ul>
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your account and data</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </div>
            <div className={styles.section}>
              <h2>7. Contact</h2>
              <p>Questions about this policy? Email us at <a href="mailto:campus.era.tech@gmail.com">campus.era.tech@gmail.com</a>.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}