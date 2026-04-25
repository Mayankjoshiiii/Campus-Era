import { Inter, Instrument_Sans } from "next/font/google"; // Updated fonts
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

export const metadata = {
  title: "Roomix — Student Housing, Simplified",
  description: "Find PGs, mess services, and connect with roommates near your campus. Roomix is the #1 student housing ecosystem.",
  keywords: ["PG", "student housing", "mess", "hostel", "roommate", "accommodation", "college"],
  openGraph: {
    title: "Roomix — Student Housing, Simplified",
    description: "Find PGs, mess services & roommates near your campus.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {  return (
    <html lang="en" className={`${inter.variable} ${instrument.variable}`} suppressHydrationWarning>
      <body>
        <DarkModeProvider>{children}</DarkModeProvider>
      </body>
    </html>
  );
}