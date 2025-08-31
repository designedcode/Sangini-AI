
'use client';
import React from "react";
import { useStore } from "@/demo/store";
import UpsellModal from "@/components/UpsellModal";

export default function Gallery(){
  const [show,setShow] = React.useState(false);
  const myMedia = Object.values(useStore.getState().chats).flatMap(c=>c.messages).filter(m=>m.type!=='text');
  const community = useStore(s=>s.communityMediaIds);
  return (
    <div className="py-4 space-y-4">
      <h2 className="text-xl font-semibold">Your media</h2>
      <div className="flex gap-3 overflow-x-auto">
        {myMedia.map(m=>(<div key={m.id} onClick={()=>setShow(true)} className="w-32 h-40 border border-white/10 rounded-lg flex items-center justify-center">🔒</div>))}
        {!myMedia.length && <div className="opacity-70">Nothing yet—ask in chat.</div>}
      </div>
      <h2 className="text-xl font-semibold">Community</h2>
      <div className="grid grid-cols-3 gap-2">
        {community.map(id=>(<div key={id} className="w-full aspect-[3/4] border border-white/10 rounded-lg flex items-center justify-center">🔒</div>))}
      </div>
      {show && <UpsellModal onClose={()=>setShow(false)} />}
    </div>
  );
}
