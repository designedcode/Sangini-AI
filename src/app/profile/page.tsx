
'use client';
import React from "react";
import { useStore } from "@/demo/store";
import Link from "next/link";

export default function Profile(){
  const user = useStore(s=>s.user);
  const setUser = useStore(s=>s.setUser);
  const wallet = useStore(s=>s.walletPaise);
  if(!user) return <div className="py-6">Not logged in. Start any chat to authenticate.</div>;
  return (
    <div className="py-4 space-y-4">
      <div className="border border-white/10 rounded-lg p-3">
        <div className="font-semibold">{user.phone || "User"}</div>
        <div className="text-sm opacity-70">Language: {user.lang} • State: {user.state || "-"}</div>
      </div>
      <div className="border border-white/10 rounded-lg p-3 space-y-2">
        <div className="font-semibold">Privacy</div>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={user.publishToGallery} onChange={e=>setUser({...user, publishToGallery:e.target.checked})}/>
          <span>Publish my media to Community (default ON)</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={user.readReceipts} onChange={e=>setUser({...user, readReceipts:e.target.checked})}/>
          <span>Read receipts</span>
        </label>
      </div>
      <div className="border border-white/10 rounded-lg p-3">
        <div className="font-semibold">Wallet</div>
        <div>Balance: ₹{(wallet/100).toFixed(2)}</div>
        <Link className="underline" href="/refer">Refer & Earn</Link>
      </div>
      <div className="border border-white/10 rounded-lg p-3">
        <div className="font-semibold">Links</div>
        <div className="flex gap-3">
          <a className="underline" href="https://t.me" target="_blank">Telegram</a>
          <a className="underline" href="https://discord.com" target="_blank">Discord</a>
          <a className="underline" href="https://x.com" target="_blank">X.com</a>
        </div>
      </div>
    </div>
  );
}
