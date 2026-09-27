// theme.ts — the ONE file that makes this codebase reusable for a new client. Change brand name / colors / feature flags here — never inside a component.
export const theme = {
  brandName: "Admin",
  brandTagline: "Universal workspace",
  colors: {
    primary: "#6D5DFB",
    secondary: "#12152B",
    accent: "#9B8CFF",
  },
  features: {
    booking: true,
    gallery: true,
    reviews: true,
  },
};
