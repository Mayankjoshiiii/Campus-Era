"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const Ctx = createContext({ dark: false, toggle: () => {} });
export const useDarkMode = () => useContext(Ctx);

export default function DarkModeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("roomix-theme");
    if (stored) {
      setDark(stored === "dark");
    } else {
      setDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("roomix-theme", dark ? "dark" : "light");
  }, [dark, mounted]);

  return (
    <Ctx.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      {children}
    </Ctx.Provider>
  );
}