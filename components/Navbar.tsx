"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useDarkMode } from "./DarkModeProvider";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const { dark, toggle }        = useDarkMode();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { href: "/rooms", label: "PG & Rooms" },
    { href: "/mess",  label: "Mess"        },
    { href: "/about", label: "About"       },
  ];

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>

        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoMark}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/>
            </svg>
          </div>
          <span className={styles.logoText}>Room<span className={styles.logoAccent}>ix</span></span>
        </Link>

        {/* Desktop links */}
        <nav className={styles.links}>
          {links.map(l => (
            <Link key={l.href} href={l.href} className={styles.link}>{l.label}</Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className={styles.actions}>
          <button className={styles.themeBtn} onClick={toggle} aria-label="Toggle theme">
            {dark
              ? <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            }
          </button>
          <a href="#download" className={styles.cta}>Download App</a>
          <button className={`${styles.burger} ${open ? styles.open : ""}`} onClick={() => setOpen(o => !o)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className={styles.drawer}>
          {links.map(l => (
            <Link key={l.href} href={l.href} className={styles.drawerLink} onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          <div className={styles.drawerDivider}/>
          <button className={styles.drawerTheme} onClick={toggle}>
            {dark ? "☀️  Light Mode" : "🌙  Dark Mode"}
          </button>
          <a href="#download" className={styles.drawerCta} onClick={() => setOpen(false)}>Download App →</a>
        </div>
      )}
    </header>
  );
}