
'use client';
import React from "react";
import { requestOtp, verifyOtp } from "@/demo/api";
import { useStore } from "@/demo/store";
export default function AuthModal({ lang, state, onClose }:{ lang:string; state:string|null; onClose:()=>void }){
  const [phone, setPhone] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [err,setErr] = React.useState<string|null>(null);
  const user = useStore(s=>s.user);
  React.useEffect(()=>{ if(user?.authed) onClose(); },[user]);
  async function send(){
    try{
      await requestOtp(phone);
      setSent(true);
      setErr(null);
    }catch(e:any){ setErr(e.message); }
  }
  async function verify(){
    try{
      await verifyOtp(phone, code, lang, state);
      onClose();
    }catch(e:any){ setErr(e.message); }
  }
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-black border border-white/20 w-[92%] max-w-sm rounded-xl p-4 space-y-3">
        <h2 className="text-xl font-bold">Verify your number</h2>
        <p className="text-sm opacity-70">+91 demo • By continuing I confirm I’m 18+ and agree to ToC/Privacy</p>
        <input placeholder="+91 phone" value={phone} onChange={e=>setPhone(e.target.value)}
          className="w-full bg-black border border-white/20 rounded p-2" />
        {!sent ? (
          <button onClick={send} className="w-full bg-white text-black rounded-md py-3 font-semibold">Send OTP on WhatsApp</button>
        ) : (
          <div className="space-y-2">
            <input placeholder="Enter OTP (0000)" value={code} onChange={e=>setCode(e.target.value)}
              className="w-full bg-black border border-white/20 rounded p-2" />
            <button onClick={verify} className="w-full bg-white text-black rounded-md py-3 font-semibold">Verify</button>
          </div>
        )}
        {err && <p className="text-red-400 text-sm">{err}</p>}
        <button onClick={onClose} className="w-full border border-white/30 rounded-md py-2">Close</button>
      </div>
    </div>
  );
}
