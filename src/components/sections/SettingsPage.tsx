"use client";

import { useEffect, useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Toast } from "@/components/ui/Toast";
import { settingsSchema, type SettingsValues } from "@/lib/validation";
import { useAdminStore } from "@/store/useAdminStore";

export function SettingsPage() {
  const settings = useAdminStore((state) => state.settings);
  const saveSettings = useAdminStore((state) => state.saveSettings);
  const resetDemoData = useAdminStore((state) => state.resetDemoData);
  const [toast, setToast] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<SettingsValues>({ resolver: zodResolver(settingsSchema), defaultValues: settings });

  useEffect(() => reset(settings), [reset, settings]);
  useEffect(() => { if (!toast) return; const timer = window.setTimeout(() => setToast(""), 3500); return () => window.clearTimeout(timer); }, [toast]);

  async function onSubmit(values: SettingsValues) { await new Promise((resolve) => setTimeout(resolve, 250)); saveSettings(values); setToast("Settings saved successfully."); }

  return <div className="mx-auto max-w-4xl space-y-5"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Workspace</p><h1 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-950">Settings</h1><p className="mt-1 text-[13px] text-slate-500">Configure branding, preferences, and notification defaults.</p></div>
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6"><Card><h2 className="font-bold text-gray-950">General</h2><div className="mt-4 grid gap-4 sm:grid-cols-2"><Field label="Workspace name" error={errors.workspaceName?.message}><input {...register("workspaceName")} className={inputClass(Boolean(errors.workspaceName))} /></Field><Field label="Support email" error={errors.supportEmail?.message}><input {...register("supportEmail")} type="email" className={inputClass(Boolean(errors.supportEmail))} /></Field><Field label="Timezone" error={errors.timezone?.message}><select {...register("timezone")} className={inputClass(Boolean(errors.timezone))}><option>Asia/Kathmandu</option><option>UTC</option><option>America/New_York</option></select></Field><Field label="Language" error={errors.language?.message}><select {...register("language")} className={inputClass(Boolean(errors.language))}><option>English</option><option>Nepali</option></select></Field></div></Card>
      <Card><h2 className="font-bold text-gray-950">Notifications</h2><div className="mt-4 space-y-3"><Toggle registration={register("emailSummaries")} label="Email summaries" description="Receive a weekly activity summary." /><Toggle registration={register("securityAlerts")} label="Security alerts" description="Get notified about important account events." /><Toggle registration={register("productUpdates")} label="Product updates" description="Hear about new dashboard features." /></div></Card><div className="flex justify-end"><Button label={isSubmitting ? "Saving..." : "Save settings"} type="submit" disabled={isSubmitting} /></div></form>
    <Card><h2 className="font-bold text-gray-950">Demo data</h2><p className="mt-2 text-sm text-gray-600">Restore all module records, settings, and profile fields to their original sample values.</p>{confirmReset ? <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-4"><p className="text-sm font-medium text-rose-800">Reset all locally saved changes?</p><div className="mt-3 flex gap-3"><Button label="Cancel" variant="secondary" onClick={() => setConfirmReset(false)} /><button type="button" onClick={() => { resetDemoData(); setConfirmReset(false); setToast("Demo data restored."); }} className="rounded-md bg-rose-700 px-4 py-2 text-sm font-medium text-white">Reset data</button></div></div> : <button type="button" onClick={() => setConfirmReset(true)} className="mt-4 rounded-lg border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50">Reset demo data</button>}</Card>
    {toast && <Toast message={toast} onClose={() => setToast("")} />}
  </div>;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) { return <label className="block text-sm font-medium text-gray-700">{label}{children}{error && <span className="mt-1 block text-xs text-rose-600">{error}</span>}</label>; }
function Toggle({ registration, label, description }: { registration: UseFormRegisterReturn; label: string; description: string }) { return <label className="flex items-start gap-3 rounded-lg border p-3"><input {...registration} type="checkbox" className="mt-1 h-4 w-4 accent-primary" /><span><span className="block text-sm font-semibold text-gray-800">{label}</span><span className="text-sm text-gray-500">{description}</span></span></label>; }
function inputClass(invalid: boolean) { return `mt-1 w-full rounded-lg border px-3 py-2.5 outline-none focus:ring-2 ${invalid ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100" : "focus:border-primary focus:ring-primary/10"}`; }
