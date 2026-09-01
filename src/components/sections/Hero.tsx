// Hero.tsx — the big banner section at the top of the homepage. Copy this pattern for any other homepage section (About, Gallery, Reviews, etc).
import { theme } from "@/config/theme";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="px-4 py-12 text-center sm:py-16" style={{ backgroundColor: `${theme.colors.primary}10` }}>
      <h1 className="text-3xl font-bold text-gray-950 sm:text-4xl">{theme.brandName}</h1>
      <p className="mx-auto mt-3 max-w-2xl text-gray-600">
        A reusable admin UI system for dashboards, content management, reports, and client-ready modules.
      </p>
      <div className="mt-6 flex justify-center">
        <Button label="Get Started" />
      </div>
    </section>
  );
}
