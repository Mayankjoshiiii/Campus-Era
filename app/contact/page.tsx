"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./contact.module.css";
export default function ContactPage() {
  const [sent, setSent]     = useState(false);
  const [form, setForm]     = useState({ name: "", email: "", subject: "general", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.wrap}>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Get In Touch</span>
            <h1 className={styles.title}>Contact Us</h1>
            <p className={styles.subtitle}>We usually respond within 24 hours</p>
          </div>

          <div className={styles.card}>
            {sent ? (
              <div className={styles.successBox}>
                <span className={styles.successIcon}>🎉</span>
                <h2>Message Sent!</h2>
                <p>Thanks for reaching out. We'll get back to you at <strong>{form.email}</strong> within 24 hours.</p>
              </div>
            ) : (
              <div className={styles.section} style={{ borderBottom: "none", paddingBottom: 0, marginBottom: 0 }}>
                <h2>Send a Message</h2>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Your Name</label>
                    <input id="name" name="name" type="text" placeholder="Riya Sharma" value={form.name} onChange={handleChange} />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input id="email" name="email" type="email" placeholder="riya@example.com" value={form.email} onChange={handleChange} />
                  </div>
                  <div className={`${styles.formGroup} ${styles.full}`}>
                    <label htmlFor="subject">Subject</label>
                    <select id="subject" name="subject" value={form.subject} onChange={handleChange}>
                      <option value="general">General Enquiry</option>
                      <option value="list">List My PG / Mess</option>
                      <option value="issue">Report an Issue</option>
                      <option value="partner">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className={`${styles.formGroup} ${styles.full}`}>
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" placeholder="Tell us how we can help..." value={form.message} onChange={handleChange} />
                  </div>
                </div>
                <button className={styles.submitBtn} onClick={handleSubmit}>
                  Send Message →
                </button>
              </div>
            )}
          </div>

          {/* Quick contact info */}
          <div className={styles.helpNote}>
            📧 For quick help, email us at{" "}
            <a href="mailto:support@campusera.in">support@campusera.in</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}