
import languages from "@/demo/seeds/languages.json";
import stateOrder from "@/demo/seeds/state_lang_order.json";
import categories from "@/demo/seeds/categories.json";
import models from "@/demo/seeds/models.json";
import scenes from "@/demo/seeds/scenes.json";
import skus from "@/demo/seeds/skus.json";
import { useStore, type Message } from "./store";

function delay(ms: number) { return new Promise(r => setTimeout(r, ms)); }

export async function getMockStateFromIP(): Promise<string|null> {
  // Showcase: pretend IP geo says "Punjab"
  await delay(200);
  return "Punjab";
}

export function sortLanguages(detectedState: string|null, supported: string[], devicePref: string[]) {
  const uniq = (xs: string[]) => Array.from(new Set(xs));
  const byState: string[] = detectedState && (stateOrder as any)[detectedState] ? (stateOrder as any)[detectedState] : [];
  const device = devicePref.map(l => l.split('-')[0]);
  const national = ["en","hi", ...supported.filter(l=>!["en","hi"].includes(l))];
  return uniq([...byState, ...device, ...national]).filter(l => supported.includes(l));
}

export async function requestOtp(phone: string): Promise<{ ok: boolean }> {
  await delay(300);
  return { ok: true };
}

export async function verifyOtp(phone: string, code: string, lang: string, state: string|null) {
  await delay(300);
  if (code !== "0000") throw new Error("Invalid OTP (use 0000 in showcase)");
  const user = {
    id: "u_"+phone,
    phone,
    lang,
    state: state || undefined,
    publishToGallery: true,
    readReceipts: true,
    walletPaise: 0,
    authed: true,
  };
  useStore.getState().setUser(user as any);
  return user;
}

export async function listCategories() { await delay(80); return categories as any[]; }
export async function listModels(categoryId?: string) {
  await delay(120);
  const all = models as any[];
  return categoryId ? all.filter(m => m.categories.includes(categoryId)) : all;
}
export async function listScenes() { await delay(80); return scenes as any[]; }
export async function listSkus() { await delay(80); return skus as any[]; }

export async function sendText(chatId: string, text: string): Promise<Message[]> {
  const store = useStore.getState();
  const now = Date.now();
  const userMsg: Message = { id: "m"+now, chatId, sender:"user", type:"text", text, createdAt: now, ticks:"sent" };
  store.upsertChat(chatId, (c)=>({ ...c, messages: [...c.messages, userMsg] }));
  await delay(150);
  // delivered
  store.upsertChat(chatId, (c)=>{
    const last = c.messages[c.messages.length-1];
    if (last && last.id === userMsg.id) last.ticks = "delivered";
    return { ...c, messages: [...c.messages] };
  });
  // model reply
  await delay(600);
  const reply: Message = { id: "r"+now, chatId, sender:"model", type:"text", text: "😉 "+text, createdAt: Date.now(), ticks:"read" };
  store.upsertChat(chatId, (c)=>({ ...c, messages: [...c.messages, reply] }));
  // mark as read
  store.upsertChat(chatId, (c)=>{
    const idx = c.messages.findIndex(m=>m.id===userMsg.id);
    if (idx>=0) c.messages[idx].ticks = "read";
    return { ...c, messages: [...c.messages] };
  });
  return [userMsg, reply];
}

export async function requestPhoto(chatId: string, prompt: string) {
  const now = Date.now();
  const msg: Message = { id: "p"+now, chatId, sender:"model", type:"image", mediaUrl: null, locked: true, createdAt: now, ticks:"delivered" };
  useStore.getState().upsertChat(chatId, (c)=>({ ...c, messages: [...c.messages, msg] }));
  return msg;
}
export async function requestVideo(chatId: string, prompt: string) {
  const now = Date.now();
  const msg: Message = { id: "v"+now, chatId, sender:"model", type:"video", mediaUrl: null, locked: true, createdAt: now, ticks:"delivered" };
  useStore.getState().upsertChat(chatId, (c)=>({ ...c, messages: [...c.messages, msg] }));
  return msg;
}

export async function startCall(modelId: string) {
  await delay(300);
  return { ok: true, startedAt: Date.now(), secondsLeft: 180 };
}

export async function getWallet() {
  await delay(80);
  return { balancePaise: useStore.getState().walletPaise };
}

export async function buySku(skuId: string) {
  await delay(200);
  // In demo, give simple unlock by adding wallet credit use:
  return { ok: true, entitlement: skuId };
}

export async function addReferralCredit() {
  await delay(200);
  useStore.getState().creditWallet(1000); // ₹10
  return { ok: true, creditedPaise: 1000 };
}
