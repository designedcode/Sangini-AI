
import React from "react";

export default function MediaTile({ locked }:{ locked: boolean }){
  return (
    <div className="w-40 h-56 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/0 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl">🔒</div>
        <div className="text-xs opacity-70 mt-1">{locked ? "Tap to unlock" : "Open"}</div>
      </div>
    </div>
  );
}
