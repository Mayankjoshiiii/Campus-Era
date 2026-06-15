"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../(legal)/legal.module.css";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.wrap}>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Legal</span>
            <h1 className={styles.title}>Terms of Service</h1>
            <p className={styles.subtitle}>Last updated: January 2025</p>
          </div>

          <div className={styles.card}>
            <div className={styles.section}>
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using Campus Era ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Platform.
              </p>
            </div>

            <div className={styles.section}>
              <h2>2. Eligibility</h2>
              <p>Campus Era is intended for use by students and property owners in India. By using the Platform you confirm that:</p>
              <ul>
                <li>You are at least 18 years of age</li>
                <li>You will provide accurate, current, and complete information</li>
                <li>You will not use the Platform for any unlawful purpose</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>3. Listings &amp; Content</h2>
              <p>Property owners are responsible for the accuracy of their listings. Campus Era reserves the right to remove any listing that:</p>
              <ul>
                <li>Contains false or misleading information</li>
                <li>Violates any applicable law or regulation</li>
                <li>Is reported and found to be fraudulent by our team</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>4. No Brokerage Guarantee</h2>
              <p>
                Campus Era does not charge students any brokerage or finder's fee. Any direct financial arrangement between a student and a property owner is solely between those parties. Campus Era is not liable for such transactions.
              </p>
            </div>

            <div className={styles.section}>
              <h2>5. Limitation of Liability</h2>
              <p>
                Campus Era provides a platform to connect students with housing providers. We do not independently verify every listing detail and are not responsible for the quality, safety, or legality of any property or mess service listed. Users interact with listings at their own risk.
              </p>
            </div>

            <div className={styles.section}>
              <h2>6. Intellectual Property</h2>
              <p>
                All content, trademarks, and data on the Platform, including the Campus Era name and logo, are the property of Campus Era Technologies Pvt. Ltd. You may not reproduce or distribute them without our written consent.
              </p>
            </div>

            <div className={styles.section}>
              <h2>7. Termination</h2>
              <p>
                We reserve the right to suspend or terminate your access to the Platform at any time, with or without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
              </p>
            </div>

            <div className={styles.section}>
              <h2>8. Governing Law</h2>
              <p>
                These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in New Delhi, India.
              </p>
            </div>

            <div className={styles.section}>
              <h2>9. Contact</h2>
              <p>
                For questions about these Terms, contact us at{" "}
                <a href="mailto:legal@campusera.in">legal@campusera.in</a>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}