
'use client';
import React from "react";
import { listSkus, buySku, addReferralCredit } from "@/demo/api";
import { useStore } from "@/demo/store";

export default function UpsellModal({ onClose }:{ onClose:()=>void }){
  const [skus,setSkus] = React.useState<any[]>([]);
  const wallet = useStore(s=>s.walletPaise);
  const credit = useStore(s=>s.creditWallet);
  React.useEffect(()=>{ listSkus().then(setSkus); },[]);
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-black border border-white/20 w-[92%] max-w-sm rounded-xl p-4 space-y-3">
        <h2 className="text-xl font-bold">Unlock content</h2>
        <p className="text-sm opacity-70">Wallet ₹{(wallet/100).toFixed(2)}</p>
        <div className="grid grid-cols-2 gap-2">
          {skus.map(s=>(
            <button key={s.id} onClick={async()=>{ await buySku(s.id); }} className="border border-white/20 rounded p-3 text-left">
              <div className="font-semibold">{s.label}</div>
              <div className="text-xs opacity-70">₹{(s.pricePaise/100).toFixed(0)}</div>
            </button>
          ))}
        </div>
        <div className="border-t border-white/10 pt-2">
          <button className="w-full border border-white/30 rounded-md py-2"
            onClick={async()=>{ const res = await addReferralCredit(); credit(res.creditedPaise); }}>
            Refer & Earn: +₹10 wallet
          </button>
        </div>
        <button onClick={onClose} className="w-full bg-white text-black rounded-md py-2">Close</button>
      </div>
    </div>
  );
}
