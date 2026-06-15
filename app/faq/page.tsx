"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../(legal)/legal.module.css";

const FAQS = [
  {
    q: "Is Campus Era free for students?",
    a: "Yes! Campus Era is completely free for students. You can browse listings, contact owners, and find roommates without paying anything. We never charge brokerage.",
  },
  {
    q: "How are PG listings verified?",
    a: "Every listing goes through a manual review where we verify the owner's contact details, confirm the address, and check that photos are authentic. Verified listings display a blue checkmark badge.",
  },
  {
    q: "Can I list my PG or mess on Campus Era?",
    a: "Absolutely! Visit our Contact page and select 'List My PG / Mess' as the subject, or email us at campus.era.tech@gmail.com. Our team will onboard you within 48 hours.",
  },
  {
    q: "Which cities is Campus Era available in?",
    a: "We are currently live exclusively in Dehradun — including areas near UPES (Bidholi & Kandoli), Graphic Era University, DIT University, IMS Unison, and UTU. We are focused on providing the best student housing experience in Dehradun.",
  },
  {
    q: "How do I contact a PG or mess owner?",
    a: "Each listing page has a 'Call Owner' button with the owner's phone number. You can call directly — no middleman involved. More booking features are available in the Campus Era app.",
  },
  {
    q: "Is my personal data safe?",
    a: "Yes. We do not sell your data to third parties. Your phone number and email are used only for account management and relevant notifications. See our Privacy Policy for full details.",
  },
  {
    q: "Can I leave a review for a PG or mess?",
    a: "Yes, through the Campus Era app. Reviews can only be submitted by verified students who have stayed at the PG or subscribed to the mess, ensuring authenticity.",
  },
  {
    q: "What is the Roommate Finder feature?",
    a: "The Roommate Finder lets you create a profile with your lifestyle preferences, budget, and preferred location. Campus Era then matches you with compatible students looking for a roommate — no awkward cold calls.",
  },
];

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.wrap}>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Help Center</span>
            <h1 className={styles.title}>Frequently Asked Questions</h1>
            <p className={styles.subtitle}>Everything you need to know about Campus Era</p>
          </div>

          <div className={styles.card}>
            {FAQS.map((faq, i) => (
              <div key={i} className={styles.faqItem}>
                <p className={styles.faqQ}>{faq.q}</p>
                <p className={styles.faqA}>{faq.a}</p>
              </div>
            ))}
          </div>

          <div className={styles.helpNote}>
            Still have questions? Reach us at{" "}
            <a href="mailto:campus.era.tech@gmail.com">campus.era.tech@gmail.com</a> or use our{" "}
            <a href="/contact">contact form</a>.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}