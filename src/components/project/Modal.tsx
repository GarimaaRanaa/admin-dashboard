"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode; }
export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => { if (!isOpen) return; const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose(); document.addEventListener("keydown", closeOnEscape); const previousOverflow = document.body.style.overflow; document.body.style.overflow = "hidden"; return () => { document.removeEventListener("keydown", closeOnEscape); document.body.style.overflow = previousOverflow; }; }, [isOpen, onClose]);
  if (!isOpen) return null;
  return <div role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"><div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="w-full max-w-lg rounded-2xl border border-white/60 bg-white p-6 shadow-2xl shadow-slate-950/20"><div className="mb-5 flex items-center justify-between gap-4"><h2 id="modal-title" className="text-lg font-bold tracking-tight text-slate-950">{title}</h2><button type="button" onClick={onClose} aria-label="Close dialog" className="rounded-xl border border-slate-200 p-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-800"><X size={18} /></button></div>{children}</div></div>;
}
