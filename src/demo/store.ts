
'use client';

import { create } from 'zustand';

export type User = {
  id: string;
  phone: string;
  lang: string;
  state?: string;
  publishToGallery: boolean;
  readReceipts: boolean;
  walletPaise: number;
  authed: boolean;
};

export type Message = {
  id: string;
  chatId: string;
  sender: 'user'|'model'|'system';
  type: 'text'|'image'|'video';
  text?: string;
  mediaUrl?: string | null; // null in showcase
  locked?: boolean;
  ticks?: 'sent'|'delivered'|'read';
  createdAt: number;
};

export type Chat = { id: string; modelId: string; messages: Message[] };

type State = {
  user: User | null;
  chats: Record<string, Chat>;
  walletPaise: number;
  communityMediaIds: string[];
  setUser(u: User|null): void;
  upsertChat(chatId: string, updater: (c: Chat)=>Chat): void;
  creditWallet(paise: number): void;
  addCommunityMedia(id: string): void;
};

export const useStore = create<State>((set, get) => ({
  user: null,
  chats: {},
  walletPaise: 0,
  communityMediaIds: [],
  setUser(u) { set({ user: u }); },
  upsertChat(chatId, updater) {
    const cur = get().chats[chatId] || { id: chatId, modelId: chatId, messages: [] };
    set({ chats: { ...get().chats, [chatId]: updater(cur) } });
  },
  creditWallet(paise) {
    set({ walletPaise: get().walletPaise + paise });
  },
  addCommunityMedia(id) {
    set({ communityMediaIds: [id, ...get().communityMediaIds.slice(0,200)] });
  }
}));
