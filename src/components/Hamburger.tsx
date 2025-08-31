
'use client';
import React from "react";
export default function Hamburger() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative">
      <button onClick={()=>setOpen(!open)} aria-label="menu" className="p-2">☰</button>
      {open && (
        <div className="absolute left-0 top-10 bg-black text-white border border-white/10 rounded-md w-64 p-2 space-y-1 z-50">
          <a className="block p-2 hover:bg-white/10 rounded" href="https://t.me" target="_blank">Telegram</a>
          <a className="block p-2 hover:bg-white/10 rounded" href="https://discord.com" target="_blank">Discord</a>
          <a className="block p-2 hover:bg-white/10 rounded" href="https://x.com" target="_blank">X.com</a>
        </div>
      )}
    </div>
  );
}
