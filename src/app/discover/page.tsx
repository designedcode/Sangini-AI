
'use client';
import React from "react";
import { listModels, listCategories } from "@/demo/api";
import Link from "next/link";
import LanguageGateModal from "@/components/LanguageGateModal";

export default function Discover() {
  const [showLang, setShowLang] = React.useState(true);
  const [lang, setLang] = React.useState<string>("en");
  const [models,setModels] = React.useState<any[]>([]);
  const [cats,setCats] = React.useState<any[]>([]);

  React.useEffect(()=>{
    listCategories().then(setCats);
    listModels().then(setModels);
  },[]);

  return (
    <div className="py-4 space-y-4">
      {showLang && <LanguageGateModal onSelect={(l)=>{ setLang(l); setShowLang(false); }} />}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {cats.map(c=>(<span key={c.id} className="px-3 py-1 rounded-full border border-white/20 text-sm">{c.name}</span>))}
      </div>
      <div className="grid gap-3">
        {models.map(m=>(
          <div key={m.id} className="rounded-xl border border-white/10 p-4 bg-gradient-to-br from-white/5 to-white/0">
            <div className="text-lg font-semibold">{m.name}</div>
            <div className="opacity-70 text-sm">{m.tagline}</div>
            <Link href={"/chat/"+m.id} className="mt-3 inline-block bg-white text-black px-4 py-2 rounded-md font-semibold">Start Chat</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
