"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Toast } from "@/components/ui/Toast";
import { profileSchema, type ProfileValues } from "@/lib/validation";
import { useAdminStore } from "@/store/useAdminStore";

export function ProfilePage() {
  const profile = useAdminStore((state) => state.profile);
  const saveProfile = useAdminStore((state) => state.saveProfile);
  const [toast, setToast] = useState("");
  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm<ProfileValues>({ resolver: zodResolver(profileSchema), defaultValues: profile });
  useEffect(() => reset(profile), [profile, reset]);
  useEffect(() => { if (!toast) return; const timer = window.setTimeout(() => setToast(""), 3500); return () => window.clearTimeout(timer); }, [toast]);
  const firstName = watch("firstName"); const lastName = watch("lastName");
  async function onSubmit(values: ProfileValues) { await new Promise((resolve) => setTimeout(resolve, 250)); saveProfile(values); setToast("Profile updated successfully."); }

  return <div className="mx-auto max-w-4xl space-y-5"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Account</p><h1 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-950">Profile</h1><p className="mt-1 text-[13px] text-slate-500">Keep your personal information and security details up to date.</p></div>
    <Card><div className="flex flex-col gap-5 sm:flex-row sm:items-center"><div className="grid h-24 w-24 place-items-center rounded-full bg-primary text-2xl font-bold text-white">{initials(firstName, lastName)}</div><div><h2 className="text-xl font-bold text-gray-950">{firstName || "Admin"} {lastName || "User"}</h2><p className="text-sm text-gray-500">Administrator · Kathmandu, Nepal</p><button type="button" onClick={() => setToast("Photo uploads are ready for backend integration.")} className="mt-3 rounded-lg border px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">Change photo</button></div></div></Card>
    <form noValidate onSubmit={handleSubmit(onSubmit)}><Card><h2 className="font-bold text-gray-950">Personal information</h2><div className="mt-4 grid gap-4 sm:grid-cols-2"><Field label="First name" error={errors.firstName?.message}><input {...register("firstName")} className={inputClass(Boolean(errors.firstName))} /></Field><Field label="Last name" error={errors.lastName?.message}><input {...register("lastName")} className={inputClass(Boolean(errors.lastName))} /></Field><Field label="Email" error={errors.email?.message}><input {...register("email")} type="email" className={inputClass(Boolean(errors.email))} /></Field><Field label="Phone" error={errors.phone?.message}><input {...register("phone")} type="tel" className={inputClass(Boolean(errors.phone))} /></Field><Field label="Bio" error={errors.bio?.message} wide><textarea {...register("bio")} className={`${inputClass(Boolean(errors.bio))} min-h-28`} /></Field></div><div className="mt-5 flex justify-end"><Button label={isSubmitting ? "Updating..." : "Update profile"} type="submit" disabled={isSubmitting} /></div></Card></form>
    {toast && <Toast message={toast} onClose={() => setToast("")} />}
  </div>;
}
function Field({ label, error, wide = false, children }: { label: string; error?: string; wide?: boolean; children: React.ReactNode }) { return <label className={`block text-sm font-medium text-gray-700 ${wide ? "sm:col-span-2" : ""}`}>{label}{children}{error && <span className="mt-1 block text-xs text-rose-600">{error}</span>}</label>; }
function inputClass(invalid: boolean) { return `mt-1 w-full rounded-lg border px-3 py-2.5 outline-none focus:ring-2 ${invalid ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100" : "focus:border-primary focus:ring-primary/10"}`; }
function initials(firstName: string, lastName: string) { return `${firstName?.[0] ?? "A"}${lastName?.[0] ?? "D"}`.toUpperCase(); }
