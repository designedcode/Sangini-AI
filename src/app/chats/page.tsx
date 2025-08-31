
'use client';
import React from "react";
import Link from "next/link";
import { useStore } from "@/demo/store";
export default function Chats() {
  const chats = useStore(s=>Object.values(s.chats));
  if (!chats.length) return <div className="py-6">No chats yet. Go to <Link className="underline" href="/discover">Discover</Link>.</div>;
  return (
    <div className="py-3 space-y-2">
      {chats.map(c=>(
        <Link href={"/chat/"+c.id} key={c.id} className="block border-b border-white/10 py-3">
          <div className="font-semibold">Chat with {c.modelId}</div>
          <div className="text-sm opacity-70">{c.messages.at(-1)?.text || "No messages yet"}</div>
        </Link>
      ))}
    </div>
  );
}
