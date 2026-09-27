"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, ChevronsUpDown, Search } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export interface Column<T> { key: keyof T; label: string; render?: (row: T) => React.ReactNode; }
interface DataTableProps<T> { columns: Column<T>[]; data: T[]; loading?: boolean; onRowClick?: (row: T) => void; searchable?: boolean; pageSize?: number; }

export function DataTable<T extends Record<string, unknown>>({ columns, data, loading = false, onRowClick, searchable = true, pageSize = 5 }: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const rows = normalizedQuery ? data.filter((row) => Object.values(row).some((value) => String(value).toLowerCase().includes(normalizedQuery))) : [...data];
    if (!sortKey) return rows;
    return rows.sort((first, second) => { const comparison = String(first[sortKey] ?? "").localeCompare(String(second[sortKey] ?? ""), undefined, { numeric: true }); return sortDirection === "asc" ? comparison : -comparison; });
  }, [data, query, sortDirection, sortKey]);
  const pageCount = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const visibleRows = filteredRows.slice((safePage - 1) * pageSize, safePage * pageSize);
  function sortBy(key: keyof T) { if (sortKey === key) setSortDirection((direction) => direction === "asc" ? "desc" : "asc"); else { setSortKey(key); setSortDirection("asc"); } setPage(1); }
  if (loading) return <LoadingSpinner />;

  return <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-panel">
    {searchable && <div className="border-b border-slate-100 p-4"><label className="relative block max-w-xs"><span className="sr-only">Search records</span><Search className="pointer-events-none absolute left-3 top-2 text-slate-400" size={16} /><input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Search records..." className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2 pl-9 pr-3 text-[13px] outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100/60" /></label></div>}
    {visibleRows.length === 0 ? <EmptyState message={query ? `No results for "${query}".` : "No records found."} /> : <div className="overflow-x-auto"><table className="w-full min-w-[680px] text-[13px]"><thead className="bg-slate-50/80 text-left text-[10px] uppercase tracking-[0.12em] text-slate-400"><tr>{columns.map((column) => { const isSorted = sortKey === column.key; const SortIcon = !isSorted ? ChevronsUpDown : sortDirection === "asc" ? ChevronUp : ChevronDown; return <th key={String(column.key)} className="px-4 py-3 font-semibold"><button type="button" onClick={() => sortBy(column.key)} className="inline-flex items-center gap-1.5 hover:text-slate-700">{column.label}<SortIcon size={12} /></button></th>; })}</tr></thead><tbody className="divide-y divide-slate-100">{visibleRows.map((row, index) => <tr key={String(row.id ?? index)} onClick={() => onRowClick?.(row)} className={`${onRowClick ? "cursor-pointer" : ""} transition hover:bg-indigo-50/30`}>{columns.map((column) => <td key={String(column.key)} className="whitespace-nowrap px-4 py-3 text-slate-600">{column.render ? column.render(row) : String(row[column.key] ?? "-")}</td>)}</tr>)}</tbody></table></div>}
    <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-3 text-[12px] text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span>Showing {visibleRows.length === 0 ? 0 : (safePage - 1) * pageSize + 1}-{Math.min(safePage * pageSize, filteredRows.length)} of {filteredRows.length}</span><div className="flex items-center gap-2"><button type="button" disabled={safePage === 1} onClick={() => setPage((current) => Math.max(1, current - 1))} className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-medium disabled:cursor-not-allowed disabled:opacity-40">Previous</button><span className="px-1 text-[11px] font-medium">{safePage} / {pageCount}</span><button type="button" disabled={safePage === pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))} className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-medium disabled:cursor-not-allowed disabled:opacity-40">Next</button></div></div>
  </div>;
}
