"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { DataTable, type Column } from "@/components/project/DataTable";
import { Modal } from "@/components/project/Modal";
import { moduleDefinitions, type ModuleKey, type ModuleRecord } from "@/data/modules";
import { moduleRecordSchema, type ModuleRecordValues } from "@/lib/validation";
import { useAdminStore } from "@/store/useAdminStore";

const statusStyle: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700", Published: "bg-emerald-50 text-emerald-700", Ready: "bg-emerald-50 text-emerald-700",
  Invited: "bg-blue-50 text-blue-700", Review: "bg-amber-50 text-amber-700", Processing: "bg-amber-50 text-amber-700", Generating: "bg-amber-50 text-amber-700",
  Unread: "bg-primary/10 text-primary", Suspended: "bg-rose-50 text-rose-700", Hidden: "bg-gray-100 text-gray-600", Draft: "bg-gray-100 text-gray-600",
};

export function ModulePage({ moduleKey }: { moduleKey: ModuleKey }) {
  const definition = moduleDefinitions[moduleKey];
  const records = useAdminStore((state) => state.records[moduleKey]);
  const addRecord = useAdminStore((state) => state.addRecord);
  const deleteRecord = useAdminStore((state) => state.deleteRecord);
  const [modalMode, setModalMode] = useState<"closed" | "create" | "details" | "delete">("closed");
  const [selectedRecord, setSelectedRecord] = useState<ModuleRecord | null>(null);
  const [toast, setToast] = useState("");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ModuleRecordValues>({
    resolver: zodResolver(moduleRecordSchema),
    defaultValues: { name: "", type: "", status: defaultStatus(moduleKey), description: "" },
  });

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const columns: Column<ModuleRecord>[] = [
    { key: "id", label: "ID" }, { key: "name", label: "Name" }, { key: "type", label: "Type" },
    { key: "status", label: "Status", render: (row) => <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[row.status] ?? "bg-gray-100 text-gray-700"}`}>{row.status}</span> },
    { key: "updated", label: "Updated" },
  ];

  function closeModal() { setModalMode("closed"); setSelectedRecord(null); reset({ name: "", type: "", status: defaultStatus(moduleKey), description: "" }); }
  async function createRecord(values: ModuleRecordValues) {
    await new Promise((resolve) => setTimeout(resolve, 250));
    addRecord(moduleKey, values); closeModal(); setToast(`${definition.singular} created successfully.`);
  }
  function confirmDelete() {
    if (!selectedRecord) return;
    deleteRecord(moduleKey, selectedRecord.id); closeModal(); setToast(`${definition.singular} deleted.`);
  }

  return <div className="space-y-5">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Management</p><h1 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-950">{definition.title}</h1><p className="mt-1 text-[13px] text-slate-500">{definition.description}</p></div><button type="button" onClick={() => setModalMode("create")} className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-gradient-to-r from-[#6d5dfb] to-[#7f5cf4] px-4 py-2 text-[13px] font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 sm:self-auto"><Plus size={16} />{definition.actionLabel}</button></div>
    <div className="grid gap-4 sm:grid-cols-3"><Summary label="Total records" value={String(records.length)} /><Summary label="Active or ready" value={String(records.filter((record) => ["Active", "Ready", "Published"].includes(record.status)).length)} /><Summary label="Updated today" value={String(records.filter((record) => record.updated.includes("Today") || record.updated.includes("minute") || record.updated.includes("hour") || record.updated.includes("Just")).length)} /></div>
    <DataTable columns={columns} data={records} onRowClick={(record) => { setSelectedRecord(record); setModalMode("details"); }} />

    <Modal isOpen={modalMode === "create"} onClose={closeModal} title={definition.actionLabel}>
      <form noValidate onSubmit={handleSubmit(createRecord)} className="space-y-4"><FormField label="Name" error={errors.name?.message}><input {...register("name")} className={fieldClass(Boolean(errors.name))} placeholder={`Enter ${definition.singular} name`} /></FormField><FormField label="Type" error={errors.type?.message}><input {...register("type")} className={fieldClass(Boolean(errors.type))} placeholder="Enter a type or role" /></FormField><FormField label="Status" error={errors.status?.message}><select {...register("status")} className={fieldClass(Boolean(errors.status))}>{statusOptions(moduleKey).map((status) => <option key={status}>{status}</option>)}</select></FormField><FormField label="Description" error={errors.description?.message}><textarea {...register("description")} className={`${fieldClass(Boolean(errors.description))} min-h-24`} placeholder="Add a short description" /></FormField><div className="flex justify-end gap-3"><Button label="Cancel" variant="secondary" onClick={closeModal} /><Button label={isSubmitting ? "Saving..." : "Save"} type="submit" disabled={isSubmitting} /></div></form>
    </Modal>

    <Modal isOpen={modalMode === "details"} onClose={closeModal} title={`${definition.singular} details`}>
      {selectedRecord && <div className="space-y-3 text-sm">{Object.entries(selectedRecord).map(([key, value]) => <div key={key} className="flex justify-between gap-6 border-b pb-2"><span className="capitalize text-gray-500">{key}</span><span className="text-right font-medium text-gray-900">{String(value)}</span></div>)}<div className="flex flex-col-reverse justify-end gap-3 pt-2 sm:flex-row"><button type="button" onClick={() => setModalMode("delete")} className="inline-flex items-center justify-center gap-2 rounded-md border border-rose-200 px-4 py-2 font-medium text-rose-700 hover:bg-rose-50"><Trash2 size={16} />Delete</button><Button label="Close" variant="secondary" onClick={closeModal} /></div></div>}
    </Modal>

    <Modal isOpen={modalMode === "delete"} onClose={closeModal} title={`Delete ${definition.singular}?`}><p className="text-sm text-gray-600">This will remove <strong>{selectedRecord?.name}</strong> from the saved demo data. This action cannot be undone.</p><div className="mt-6 flex justify-end gap-3"><Button label="Cancel" variant="secondary" onClick={closeModal} /><button type="button" onClick={confirmDelete} className="rounded-md bg-rose-700 px-4 py-2 font-medium text-white hover:bg-rose-800">Delete</button></div></Modal>
    {toast && <Toast message={toast} onClose={() => setToast("")} />}
  </div>;
}

function Summary({ label, value }: { label: string; value: string }) { return <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-panel before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-gradient-to-b before:from-indigo-400 before:to-violet-500"><p className="text-[12px] font-medium text-slate-500">{label}</p><p className="mt-1 text-xl font-bold tracking-tight text-slate-950">{value}</p></div>; }
function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) { return <label className="block text-sm font-medium text-gray-700">{label}{children}{error && <span className="mt-1 block text-xs text-rose-600">{error}</span>}</label>; }
function fieldClass(invalid: boolean) { return `mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${invalid ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100" : "focus:border-primary focus:ring-primary/10"}`; }
function defaultStatus(moduleKey: ModuleKey) { return moduleKey === "content" ? "Draft" : moduleKey === "notifications" ? "Unread" : moduleKey === "reports" ? "Ready" : moduleKey === "media" ? "Ready" : "Active"; }
function statusOptions(moduleKey: ModuleKey) { if (moduleKey === "content") return ["Draft", "Review", "Published"]; if (moduleKey === "notifications") return ["Unread", "Read"]; if (moduleKey === "reports") return ["Ready", "Generating"]; if (moduleKey === "media") return ["Ready", "Processing"]; return ["Active", "Invited", "Suspended"]; }
