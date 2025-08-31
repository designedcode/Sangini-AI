
import "./globals.css";
import type { Metadata } from "next";
import BottomBar from "@/components/BottomBar";
import Hamburger from "@/components/Hamburger";

export const metadata: Metadata = {
  title: "Sangini AI (Showcase)",
  description: "Showcase mode — no images, demo data only",
  themeColor: "#000000",
  manifest: "/manifest.webmanifest"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="app">
          <div className="container flex items-center h-12">
            <Hamburger />
            <div className="font-bold text-lg ml-2">Sangini AI</div>
          </div>
        </header>
        <main className="pb-16 container">{children}</main>
        <BottomBar />
        <script async src="/sw.js"></script>
      </body>
    </html>
  );
}
