"use client";

import { CheckCircle2, X } from "lucide-react";

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return <div role="status" className="fixed bottom-4 right-4 z-[60] flex max-w-sm items-center gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-xl"><CheckCircle2 className="shrink-0 text-emerald-600" size={20} /><span className="font-medium">{message}</span><button type="button" onClick={onClose} aria-label="Dismiss notification" className="ml-2 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"><X size={16} /></button></div>;
}
