
'use client';
import React from "react";
import { addReferralCredit } from "@/demo/api";
import { useStore } from "@/demo/store";

export default function Refer() {
  const wallet = useStore(s=>s.walletPaise);
  const credit = useStore(s=>s.creditWallet);
  return (
    <div className="py-4 space-y-4">
      <h1 className="text-xl font-semibold">Refer & Earn</h1>
      <p>Invite a friend and get <b>₹10 wallet credit</b> (demo: click button).</p>
      <button onClick={async()=>{ const res = await addReferralCredit(); credit(res.creditedPaise); }} className="bg-white text-black rounded-md px-4 py-2 font-semibold">Simulate friend join (+₹10)</button>
      <div className="opacity-70">Wallet: ₹{(wallet/100).toFixed(2)}</div>
    </div>
  );
}
