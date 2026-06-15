import { Inter, Instrument_Sans, Caveat } from "next/font/google"; // Updated fonts
import "./globals.css";
import DarkModeProvider from "@/components/DarkModeProvider";

// Inter for body text
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-body", 
  display: "swap" 
});

// Instrument Sans for minimal headings
const instrument = Instrument_Sans({ 
  subsets: ["latin"], 
  variable: "--font-display", 
  display: "swap" 
});

// Caveat for hand-drawn stickers and notes
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwritten",
  display: "swap"
});

export const metadata = {
  title: "Campus Era — Student Housing, Simplified",
  description: "Find PGs, mess services, and connect with roommates near your campus. Campus Era is the #1 student housing ecosystem.",
  keywords: ["PG", "student housing", "mess", "hostel", "roommate", "accommodation", "college"],
  openGraph: {
    title: "Campus Era — Student Housing, Simplified",
    description: "Find PGs, mess services & roommates near your campus.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {  return (
    <html lang="en" className={`${inter.variable} ${instrument.variable} ${caveat.variable}`} suppressHydrationWarning>
      <body>
        <DarkModeProvider>{children}</DarkModeProvider>
      </body>
    </html>
  );
}