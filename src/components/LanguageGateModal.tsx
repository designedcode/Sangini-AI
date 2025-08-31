
'use client';
import React from "react";
import langs from "@/demo/seeds/languages.json";
import { getMockStateFromIP, sortLanguages } from "@/demo/api";

export default function LanguageGateModal({ onSelect }:{ onSelect:(code:string)=>void }) {
  const [ordered, setOrdered] = React.useState<string[]>([]);

  React.useEffect(()=>{
    (async ()=>{
      const state = await getMockStateFromIP();
      const supported = Object.keys(langs);
      const localePref = [navigator.language || "en"];
      setOrdered(sortLanguages(state, supported, localePref));
    })();
  },[]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-black border border-white/20 w-[92%] max-w-sm rounded-xl p-4">
        <h2 className="text-xl font-bold mb-2">Choose your language</h2>
        <div className="max-h-72 overflow-auto divide-y divide-white/10">
        {ordered.map(code => (
          <button key={code} className="w-full text-left py-2" onClick={()=>onSelect(code)}>
            {langs[code as keyof typeof langs].label} <span className="opacity-60 text-sm">({code})</span>
          </button>
        ))}
        </div>
      </div>
    </div>
  );
}
