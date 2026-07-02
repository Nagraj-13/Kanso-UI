'use client';

import * as React from 'react';

export function Bento3DCube() {
  return (
    <div
      className="relative w-full h-[500px] flex items-center justify-center overflow-visible bg-transparent cursor-default"
      style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
    >
      <div
        className="bento-wrapper duration-200 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="iso-bento relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Construction Lines Floor (Elegant Grid) */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] pointer-events-none [mask-image:radial-gradient(circle_at_center,black_20%,transparent_70%)]"
            style={{
              transform: 'translateZ(-40px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Center Crosshair / Core highlight */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-zinc-300/50 dark:border-zinc-700/50 rounded-full" />

            {/* Primary Axes (renders as center diagonals) */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2 border-t border-dashed border-zinc-400 dark:border-zinc-700" />
            <div className="absolute top-0 left-1/2 w-[1px] h-full -translate-x-1/2 border-l border-dashed border-zinc-400 dark:border-zinc-700" />

            {/* Secondary Parallel Lines */}
            <div className="absolute top-[calc(50%-160px)] left-0 w-full h-[1px] -translate-y-1/2 border-t border-dashed border-zinc-300 dark:border-zinc-800" />
            <div className="absolute top-[calc(50%+160px)] left-0 w-full h-[1px] -translate-y-1/2 border-t border-dashed border-zinc-300 dark:border-zinc-800" />

            <div className="absolute top-0 left-[calc(50%-160px)] w-[1px] h-full -translate-x-1/2 border-l border-dashed border-zinc-300 dark:border-zinc-800" />
            <div className="absolute top-0 left-[calc(50%+160px)] w-[1px] h-full -translate-x-1/2 border-l border-dashed border-zinc-300 dark:border-zinc-800" />

            {/* Tertiary Parallel Lines */}
            <div className="absolute top-[calc(50%-320px)] left-0 w-full h-[1px] -translate-y-1/2 border-t border-dashed border-zinc-200 dark:border-zinc-800/50" />
            <div className="absolute top-[calc(50%+320px)] left-0 w-full h-[1px] -translate-y-1/2 border-t border-dashed border-zinc-200 dark:border-zinc-800/50" />

            <div className="absolute top-0 left-[calc(50%-320px)] w-[1px] h-full -translate-x-1/2 border-l border-dashed border-zinc-200 dark:border-zinc-800/50" />
            <div className="absolute top-0 left-[calc(50%+320px)] w-[1px] h-full -translate-x-1/2 border-l border-dashed border-zinc-200 dark:border-zinc-800/50" />

            {/* Tech labels */}
            <div className="absolute top-1/2 right-[25%] -translate-y-[14px] text-[10px] tracking-widest font-mono text-zinc-400 dark:text-zinc-600 font-medium">
              FTG_001
            </div>
            <div className="absolute top-[calc(50%+160px)] left-[30%] -translate-y-[14px] text-[10px] tracking-widest font-mono text-zinc-300 dark:text-zinc-700 font-medium">
              SEC_002
            </div>
          </div>

          {/* Block 1: Large Core (2x2) */}
          <div
            className="bento-block col-start-1 col-span-2 row-start-1 row-span-2 group"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="bento-face bottom top-0 left-0" />
            <div className="bento-face back-right" />
            <div className="bento-face back-left" />
            <div className="bento-face front-left" />
            <div className="bento-face front-right" />
            <div className="bento-face top top-0 left-0">
              <div className="size-[60px] rounded-full border-2 border-dashed border-zinc-300 dark:border-white/10 flex items-center justify-center animate-[spin-bento_8s_linear_infinite] group-hover:border-zinc-500/40 group-hover:animate-[spin-bento_4s_linear_infinite] relative">
                <div className="absolute size-[30px] rounded-full border-2 border-zinc-900 dark:border-white border-t-transparent animate-[spin-bento_3s_linear_infinite_reverse] group-hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] dark:group-hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
              </div>
              <span className="absolute bottom-2 left-2.5 font-mono text-[10px] font-medium text-muted-foreground transition-colors duration-300 z-10 group-hover:text-foreground">
                CORE_01
              </span>
            </div>
          </div>

          {/* Block 2: Sys Racks (1x1) */}
          <div
            className="bento-block col-start-3 col-span-1 row-start-1 row-span-1 group"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="bento-face bottom top-0 left-0" />
            <div className="bento-face back-right" />
            <div className="bento-face back-left" />
            <div className="bento-face front-left" />
            <div className="bento-face front-right" />
            <div className="bento-face top top-0 left-0">
              <div className="flex flex-col gap-1.5 w-3/5">
                <div className="w-full h-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black flex items-center px-1.5">
                  <div className="size-1 rounded-full bg-zinc-900 dark:bg-zinc-300 animate-[blink-led-bento_1s_infinite_alternate] group-hover:bg-zinc-900 dark:group-hover:bg-white group-hover:shadow-[0_0_6px_rgba(0,0,0,0.5)] dark:group-hover:shadow-[0_0_6px_#fff] group-hover:[animation-duration:0.2s]" />
                </div>
                <div className="w-full h-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black flex items-center px-1.5">
                  <div className="size-1 rounded-full bg-zinc-400 dark:bg-zinc-600 animate-[blink-led-bento_0.6s_infinite_alternate-reverse] group-hover:bg-zinc-900 dark:group-hover:bg-white group-hover:shadow-[0_0_6px_rgba(0,0,0,0.5)] dark:group-hover:shadow-[0_0_6px_#fff] group-hover:[animation-duration:0.2s]" />
                </div>
                <div className="w-full h-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black flex items-center px-1.5">
                  <div className="size-1 rounded-full bg-zinc-900 dark:bg-zinc-300 animate-[blink-led-bento_1.2s_infinite_alternate] group-hover:bg-zinc-900 dark:group-hover:bg-white group-hover:shadow-[0_0_6px_rgba(0,0,0,0.5)] dark:group-hover:shadow-[0_0_6px_#fff] group-hover:[animation-duration:0.2s]" />
                </div>
              </div>
              <span className="absolute bottom-2 left-2.5 font-mono text-[10px] font-medium text-muted-foreground transition-colors duration-300 z-10 group-hover:text-foreground">
                SYS
              </span>
            </div>
          </div>

          {/* Block 3: Net Radar (1x1) */}
          <div
            className="bento-block col-start-3 col-span-1 row-start-2 row-span-1 group"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="bento-face bottom top-0 left-0" />
            <div className="bento-face back-right" />
            <div className="bento-face back-left" />
            <div className="bento-face front-left" />
            <div className="bento-face front-right" />
            <div className="bento-face top top-0 left-0">
              <div className="size-[40px] rounded-full border border-zinc-200 dark:border-zinc-800 animate-[spin-bento_3s_linear_infinite] group-hover:animate-[spin-bento_1s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_70%,rgba(0,0,0,0.05)_100%)] dark:bg-[conic-gradient(from_0deg,transparent_70%,rgba(255,255,255,0.05)_100%)] group-hover:bg-[conic-gradient(from_0deg,transparent_70%,rgba(0,0,0,0.15)_100%)] dark:group-hover:bg-[conic-gradient(from_0deg,transparent_70%,rgba(255,255,255,0.2)_100%)]" />
              <span className="absolute bottom-2 left-2.5 font-mono text-[10px] font-medium text-muted-foreground transition-colors duration-300 z-10 group-hover:text-foreground">
                NET
              </span>
            </div>
          </div>

          {/* Block 4: Equalizer Graph (1x1) */}
          <div
            className="bento-block col-start-1 col-span-1 row-start-3 row-span-1 group"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="bento-face bottom top-0 left-0" />
            <div className="bento-face back-right" />
            <div className="bento-face back-left" />
            <div className="bento-face front-left" />
            <div className="bento-face front-right" />
            <div className="bento-face top top-0 left-0">
              <div className="flex items-end gap-1 h-[30px] w-[70%]">
                <div
                  className="flex-1 h-[40%] bg-zinc-300 dark:bg-zinc-600 animate-[equalize-bento_2s_ease-in-out_infinite_alternate] origin-bottom group-hover:bg-zinc-900 dark:group-hover:bg-white group-hover:[animation-duration:0.4s]"
                  style={{ animationDelay: '0.1s' }}
                />
                <div
                  className="flex-1 h-[80%] bg-zinc-900 dark:bg-zinc-300 animate-[equalize-bento_2s_ease-in-out_infinite_alternate] origin-bottom group-hover:bg-zinc-900 dark:group-hover:bg-white group-hover:shadow-[0_0_8px_rgba(0,0,0,0.5)] dark:group-hover:shadow-[0_0_8px_rgba(255,255,255,0.6)] group-hover:[animation-duration:0.4s]"
                  style={{ animationDelay: '0.3s' }}
                />
                <div
                  className="flex-1 h-[60%] bg-zinc-300 dark:bg-zinc-600 animate-[equalize-bento_2s_ease-in-out_infinite_alternate] origin-bottom group-hover:bg-zinc-900 dark:group-hover:bg-white group-hover:[animation-duration:0.4s]"
                  style={{ animationDelay: '0.2s' }}
                />
              </div>
              <span className="absolute bottom-2 left-2.5 font-mono text-[10px] font-medium text-muted-foreground transition-colors duration-300 z-10 group-hover:text-foreground">
                MEM_L2
              </span>
            </div>
          </div>

          {/* Block 5: Flow Wave (1x1) */}
          <div
            className="bento-block col-start-2 col-span-1 row-start-3 row-span-1 group"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="bento-face bottom top-0 left-0" />
            <div className="bento-face back-right" />
            <div className="bento-face back-left" />
            <div className="bento-face front-left" />
            <div className="bento-face front-right" />
            <div className="bento-face top top-0 left-0">
              <svg
                className="size-full absolute inset-0 opacity-70 group-hover:opacity-100 transition-opacity"
                viewBox="0 0 80 80"
                preserveAspectRatio="none"
              >
                <path
                  d="M 0,40 Q 20,10 40,40 T 80,40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="6,4"
                  className="text-zinc-900 dark:text-zinc-300 animate-[dash-bento_4s_linear_infinite] group-hover:animate-[dash-bento_1.5s_linear_infinite] group-hover:text-zinc-900 dark:group-hover:text-white"
                />
              </svg>
              <span className="absolute bottom-2 left-2.5 font-mono text-[10px] font-medium text-muted-foreground transition-colors duration-300 z-10 group-hover:text-foreground">
                FLOW
              </span>
            </div>
          </div>

          {/* Block 6: Key dot (1x1) */}
          <div
            className="bento-block col-start-3 col-span-1 row-start-3 row-span-1 group"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="bento-face bottom top-0 left-0" />
            <div className="bento-face back-right" />
            <div className="bento-face back-left" />
            <div className="bento-face front-left" />
            <div className="bento-face front-right" />
            <div className="bento-face top top-0 left-0">
              <div className="size-3 bg-zinc-900 dark:bg-zinc-200 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_10px_rgba(255,255,255,0.4)] animate-[heartbeat-bento_2s_ease-in-out_infinite] group-hover:animate-[heartbeat-bento_0.5s_ease-in-out_infinite] group-hover:scale-150 group-hover:shadow-[0_0_15px_rgba(0,0,0,0.4),0_0_30px_rgba(0,0,0,0.2)] dark:group-hover:shadow-[0_0_20px_rgba(255,255,255,0.8),0_0_40px_rgba(255,255,255,0.4)]" />
              <span className="absolute bottom-2 left-2.5 font-mono text-[10px] font-medium text-muted-foreground transition-colors duration-300 z-10 group-hover:text-foreground">
                KEY_0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
