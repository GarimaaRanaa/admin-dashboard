// Button.tsx — the base reusable button. Every button in the app should use this component instead of a raw <button> tag.
import { theme } from "@/config/theme";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  disabled?: boolean;
}

export function Button({ label, onClick, variant = "primary", type = "button", disabled = false }: ButtonProps) {
  const style =
    variant === "primary"
      ? { backgroundColor: theme.colors.primary, color: "#fff", boxShadow: "0 8px 18px rgba(109, 93, 251, 0.18)" }
      : { backgroundColor: "#fff", color: "#4f46b8", border: "1px solid #dedcf8" };

  return (
    <button type={type} onClick={onClick} disabled={disabled} style={style} className="rounded-xl px-4 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0">
      {label}
    </button>
  );
}
