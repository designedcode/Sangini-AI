
'use client';
import React from "react";
export default function CallOverlay({ onClose }:{ onClose:()=>void }){
  const [seconds, setSeconds] = React.useState(0);
  React.useEffect(()=>{
    const id = setInterval(()=>setSeconds(s=>s+1),1000);
    return ()=>clearInterval(id);
  },[]);
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="text-center space-y-4">
        <div className="text-6xl">📞</div>
        <div className="text-xl">Call in progress</div>
        <div className="opacity-70">{Math.floor(seconds/60)}:{(seconds%60).toString().padStart(2,'0')}</div>
        <button onClick={onClose} className="bg-white text-black rounded-md px-6 py-3 font-semibold">End</button>
      </div>
    </div>
  );
}
