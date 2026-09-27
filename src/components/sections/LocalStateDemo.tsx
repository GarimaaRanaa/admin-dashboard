"use client";

import { useLocalState } from "@/hooks/useLocalState";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function LocalStateDemo() {
  const counter = useLocalState(0);
  const name = useLocalState("Guest");

  return (
    <section className="mx-auto max-w-6xl border-x bg-gray-50 px-4 py-8 sm:px-6">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Custom hook demo</p>
        <h2 className="mt-1 text-2xl font-bold text-gray-950">useLocalState in action</h2>
        <p className="mt-2 text-gray-600">
          Both examples reuse the same hook. Each keeps its own value, exposes a setter, and can reset to its
          initial value.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="font-semibold text-gray-950">Number state</h3>
          <p className="my-5 text-4xl font-bold text-blue-700" aria-live="polite">
            {counter.value}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button label="Decrease" variant="secondary" onClick={() => counter.setValue((value) => value - 1)} />
            <Button label="Increase" onClick={() => counter.setValue((value) => value + 1)} />
            <Button label="Reset" variant="secondary" onClick={counter.reset} />
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-950">String state</h3>
          <label className="mt-4 block text-sm font-medium text-gray-700" htmlFor="local-state-name">
            Display name
          </label>
          <input
            id="local-state-name"
            className="mb-4 mt-1 w-full rounded-md border px-3 py-2 text-gray-950 outline-none focus:border-blue-600"
            value={name.value}
            onChange={(event) => name.setValue(event.target.value)}
          />
          <p className="mb-4 text-gray-700" aria-live="polite">
            Hello, <span className="font-semibold">{name.value || "anonymous user"}</span>!
          </p>
          <Button label="Reset to Guest" variant="secondary" onClick={name.reset} />
        </Card>
      </div>
    </section>
  );
}
