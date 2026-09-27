"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { theme } from "@/config/theme";
import { createAuthFormSchema, type AuthFormValues } from "@/lib/validation";

type AuthMode = "login" | "register" | "forgot";
const copy = {
  login: { title: "Welcome back", description: "Sign in to continue to your admin workspace.", submit: "Sign in" },
  register: { title: "Create your account", description: "Start managing your workspace in a few simple steps.", submit: "Create account" },
  forgot: { title: "Reset your password", description: "We'll email you a secure password reset link.", submit: "Send reset link" },
};

export function AuthForm({ mode }: { mode: AuthMode }) {
  const [submitted, setSubmitted] = useState(false);
  const content = copy[mode];
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AuthFormValues>({ resolver: zodResolver(createAuthFormSchema(mode)), defaultValues: { fullName: "", email: "", password: "", remember: false, terms: false } });

  return <div className="grid min-h-screen bg-white lg:grid-cols-[minmax(360px,0.85fr)_minmax(520px,1.15fr)]">
    <aside className="relative hidden overflow-hidden bg-[#12152b] p-10 text-white lg:flex lg:flex-col xl:p-14">
      <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" /><div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-violet-500/15 blur-3xl" />
      <Link href="/dashboard" className="relative flex items-center gap-3"><BrandMark /><span><span className="block text-lg font-bold">{theme.brandName}</span><span className="block text-[11px] tracking-wide text-indigo-200/60">{theme.brandTagline}</span></span></Link>
      <div className="relative my-auto max-w-md"><span className="inline-flex items-center gap-2 rounded-full border border-indigo-300/20 bg-indigo-300/10 px-3 py-1.5 text-xs font-semibold text-indigo-100"><Sparkles size={14} />Universal by design</span><h2 className="mt-6 text-4xl font-bold leading-tight tracking-tight xl:text-5xl">One admin system.<br /><span className="text-indigo-300">Every kind of business.</span></h2><p className="mt-5 max-w-sm text-sm leading-7 text-indigo-100/60">A flexible workspace for teams, content, analytics, media, reports, and operations—all shaped by a single design system.</p><div className="mt-9 grid gap-3"><Feature icon={Layers3} text="Modular pages and reusable components" /><Feature icon={ShieldCheck} text="Validated interactions and persistent state" /></div></div>
      <p className="relative text-xs text-indigo-100/35">Secure demo workspace · Built with Next.js</p>
    </aside>

    <main className="relative grid place-items-center bg-[radial-gradient(circle_at_top_right,rgba(109,93,251,0.08),transparent_35%)] px-5 py-12 sm:px-10"><div className="w-full max-w-md"><Link href="/dashboard" className="mb-10 flex items-center gap-3 lg:hidden"><BrandMark /><span className="font-bold text-slate-900">{theme.brandName}</span></Link><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Secure access</p><h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">{content.title}</h1><p className="mt-2 text-sm leading-6 text-slate-500">{content.description}</p>
      {submitted ? <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-100"><CheckCircle2 className="text-emerald-600" size={28} /></span><p className="mt-4 font-bold text-emerald-900">{mode === "forgot" ? "Check your inbox" : "Demo submitted successfully"}</p><p className="mt-1 text-sm text-emerald-700/70">Your request was validated and processed.</p><Link href={mode === "forgot" ? "/login" : "/dashboard"} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Continue <ArrowRight size={16} /></Link></div> : <form noValidate onSubmit={handleSubmit(async () => { await new Promise((resolve) => setTimeout(resolve, 300)); setSubmitted(true); })} className="mt-8 space-y-5">
        {mode === "register" && <Field label="Full name" error={errors.fullName?.message}><input {...register("fullName")} type="text" placeholder="Your full name" className={inputClass(Boolean(errors.fullName))} /></Field>}
        <Field label="Email address" error={errors.email?.message}><input {...register("email")} type="email" placeholder="you@example.com" className={inputClass(Boolean(errors.email))} /></Field>
        {mode !== "forgot" && <Field label="Password" error={errors.password?.message}><input {...register("password")} type="password" placeholder="At least 8 characters" className={inputClass(Boolean(errors.password))} /></Field>}
        {mode === "register" && <div><label className="flex gap-2.5 text-sm text-slate-600"><input {...register("terms")} type="checkbox" className="mt-0.5 accent-primary" />I agree to the terms and privacy policy.</label>{errors.terms && <p className="mt-1.5 text-xs text-rose-600">{errors.terms.message}</p>}</div>}
        {mode === "login" && <div className="flex items-center justify-between text-sm"><label className="flex gap-2 text-slate-600"><input {...register("remember")} type="checkbox" className="accent-primary" />Remember me</label><Link href="/forgot-password" className="font-semibold text-primary">Forgot password?</Link></div>}
        <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-gradient-to-r from-[#6d5dfb] to-[#7f5cf4] px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60">{isSubmitting ? "Please wait..." : content.submit}</button>
      </form>}
      {!submitted && <p className="mt-7 text-center text-sm text-slate-500">{mode === "login" ? <>New here? <Link href="/register" className="font-semibold text-primary">Create account</Link></> : mode === "register" ? <>Already registered? <Link href="/login" className="font-semibold text-primary">Sign in</Link></> : <Link href="/login" className="font-semibold text-primary">Back to sign in</Link>}</p>}
    </div></main>
  </div>;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) { return <label className="block text-sm font-semibold text-slate-700">{label}{children}{error && <span className="mt-1.5 block text-xs font-medium text-rose-600">{error}</span>}</label>; }
function inputClass(invalid: boolean) { return `mt-2 w-full rounded-xl border bg-slate-50/60 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${invalid ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100" : "border-slate-200 focus:border-indigo-300 focus:ring-indigo-100/60"}`; }
function Feature({ icon: Icon, text }: { icon: typeof Layers3; text: string }) { return <div className="flex items-center gap-3 text-sm font-medium text-indigo-100/80"><span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-indigo-200"><Icon size={17} /></span>{text}</div>; }
function BrandMark() { return <span className="grid h-10 w-10 shrink-0 grid-cols-2 gap-1 rounded-xl bg-white/10 p-1.5"><span className="rounded-full rounded-br-sm bg-[#8b7cff]" /><span className="rounded-full rounded-bl-sm bg-[#6d5dfb]" /><span className="rounded-full rounded-tr-sm bg-[#6d5dfb]" /><span className="rounded-full rounded-tl-sm bg-[#a99fff]" /></span>; }
