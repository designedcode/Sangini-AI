
'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
const tabs = [
  { href: "/chats", label: "Chats" },
  { href: "/discover", label: "Discover" },
  { href: "/gallery", label: "Gallery" },
  { href: "/profile", label: "Profile" },
];
export default function BottomBar() {
  const p = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 grid grid-cols-4 text-center text-sm">
      {tabs.map(t => {
        const active = p===t.href || p.startsWith(t.href);
        return <Link key={t.href} href={t.href} className={"py-3 "+(active ? "font-bold" : "opacity-70")}>{t.label}</Link>;
      })}
    </nav>
  );
}
