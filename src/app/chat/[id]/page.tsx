
'use client';
import React from "react";
import { useParams } from "next/navigation";
import { useStore } from "@/demo/store";
import { sendText, requestPhoto, requestVideo } from "@/demo/api";
import UpsellModal from "@/components/UpsellModal";
import CallOverlay from "@/components/CallOverlay";
import MediaTile from "@/components/MediaTile";

export default function ChatView() {
  const params = useParams<{id:string}>();
  const chatId = params.id;
  const [input,setInput] = React.useState("");
  const [upsell,setUpsell] = React.useState(false);
  const [calling,setCalling] = React.useState(false);
  const chat = useStore(s => s.chats[chatId] || { id: chatId, modelId: chatId, messages: [] });

  async function onSend(){
    if(!input.trim()) return;
    await sendText(chatId, input.trim());
    setInput("");
  }

  return (
    <div className="flex flex-col h-[calc(100dvh-4rem)]">
      <div className="sticky top-0 bg-black z-10 py-2 border-b border-white/10">
        <div className="flex gap-2 px-1">
          <button onClick={()=>requestPhoto(chatId, 'preset')} className="px-3 py-2 rounded-full border border-white/30 text-sm">Request Photo</button>
          <button onClick={()=>requestVideo(chatId, 'preset')} className="px-3 py-2 rounded-full border border-white/30 text-sm">Request Video</button>
          <button onClick={()=>alert('Scene picker (stub)')} className="px-3 py-2 rounded-full border border-white/30 text-sm">Choose Scene</button>
        </div>
      </div>
      <div className="flex-1 overflow-auto space-y-3 py-3">
        {chat.messages.map(m => (
          <div key={m.id} className={"px-3 flex "+(m.sender==='user'?'justify-end':'justify-start')}>
            <div className={"max-w-[80%] rounded-2xl px-3 py-2 "+(m.sender==='user'?'bg-white text-black':'bg-white/10')}>
              {m.type==='text' && <div>{m.text}</div>}
              {m.type!=='text' && (
                <div onClick={()=>setUpsell(true)}>
                  <MediaTile locked={true}/>
                </div>
              )}
              <div className="text-[10px] opacity-60 mt-1">
                {m.sender==='user' && (m.ticks==='sent'?'✓': m.ticks==='delivered'?'✓✓':'✓✓')} {m.ticks==='read'?'(blue)':''}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="sticky bottom-16 left-0 right-0 bg-black py-2 border-t border-white/10">
        <div className="flex gap-2">
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type a message"
            className="flex-1 bg-black border border-white/20 rounded-full px-3 py-2" />
          <button onClick={onSend} className="bg-white text-black rounded-full px-4">Send</button>
          <button onClick={()=>setCalling(true)} className="border border-white/30 rounded-full px-3">Call</button>
        </div>
        <div className="text-[11px] opacity-60 mt-1">Adults only • Consenting roleplay only • No real-person uploads</div>
      </div>
      {upsell && <UpsellModal onClose={()=>setUpsell(false)} />}
      {calling && <CallOverlay onClose={()=>setCalling(false)} />}
    </div>
  );
}
