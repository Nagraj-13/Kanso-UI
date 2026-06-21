'use client';

import * as React from 'react';
import { TelemetryGrid } from '@/components/kanso/telemetry-widgets';

export function TelemetryShowcase() {
  return (
    <section className="py-24 border-t border-b border-zinc-200/40 dark:border-zinc-800/80 bg-zinc-950 text-white relative overflow-hidden">
      {/* Editorial Tech Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-10 flex flex-col items-center gap-14">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-[10px] font-mono tracking-widest text-amber-500 uppercase select-none">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live telemetry feed node
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-mono uppercase">
            Zen Instrumentation
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-xl select-none">
            A real-time telemetry dashboard measuring browser events, pointer
            velocity, and memory heap. Premium micro-interactions and audio
            feedback engineered in pure React.
          </p>
        </div>

        {/* Live Bento Dashboard */}
        <div className="w-full flex justify-center mt-2">
          <TelemetryGrid className="w-full" />
        </div>
      </div>
    </section>
  );
}
