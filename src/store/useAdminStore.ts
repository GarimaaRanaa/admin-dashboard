import { create } from "zustand";
import { persist } from "zustand/middleware";
import { moduleDefinitions, type ModuleKey, type ModuleRecord } from "@/data/modules";
import { theme } from "@/config/theme";
import type { ModuleRecordValues, ProfileValues, SettingsValues } from "@/lib/validation";

const initialRecords = Object.fromEntries(
  Object.entries(moduleDefinitions).map(([key, definition]) => [key, definition.records.map((record) => ({ ...record }))]),
) as Record<ModuleKey, ModuleRecord[]>;

export const defaultSettings: SettingsValues = {
  workspaceName: theme.brandName,
  supportEmail: "support@example.com",
  timezone: "Asia/Kathmandu",
  language: "English",
  emailSummaries: true,
  securityAlerts: true,
  productUpdates: false,
};

export const defaultProfile: ProfileValues = {
  firstName: "Admin",
  lastName: "User",
  email: "admin@example.com",
  phone: "+977 9800000000",
  bio: "Frontend administrator managing content and workspace operations.",
};

interface AdminState {
  records: Record<ModuleKey, ModuleRecord[]>;
  settings: SettingsValues;
  profile: ProfileValues;
  addRecord: (moduleKey: ModuleKey, values: ModuleRecordValues) => void;
  deleteRecord: (moduleKey: ModuleKey, id: string) => void;
  saveSettings: (values: SettingsValues) => void;
  saveProfile: (values: ProfileValues) => void;
  resetDemoData: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      records: initialRecords,
      settings: defaultSettings,
      profile: defaultProfile,
      addRecord: (moduleKey, values) => set((state) => ({
        records: {
          ...state.records,
          [moduleKey]: [
            { id: `${moduleKey.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-6)}`, name: values.name, type: values.type, status: values.status, updated: "Just now" },
            ...state.records[moduleKey],
          ],
        },
      })),
      deleteRecord: (moduleKey, id) => set((state) => ({ records: { ...state.records, [moduleKey]: state.records[moduleKey].filter((record) => record.id !== id) } })),
      saveSettings: (settings) => set({ settings }),
      saveProfile: (profile) => set({ profile }),
      resetDemoData: () => set({ records: initialRecords, settings: defaultSettings, profile: defaultProfile }),
    }),
    { name: "admin-dashboard-week-6", skipHydration: true },
  ),
);
