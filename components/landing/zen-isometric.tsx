'use client';

import * as React from 'react';

export function ZenIsometric() {
  return (
    <div
      className="relative w-full h-[550px] flex items-center justify-center overflow-visible bg-transparent cursor-default select-none"
      style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}
    >
      <style>{`
        .zen-scene {
          position: relative;
          width: 600px;
          height: 600px;
          display: flex;
          justify-content: center;
          align-items: center;
          transform-style: preserve-3d;
          pointer-events: none;
        }

        .zen-grid {
          position: relative;
          width: 600px;
          height: 600px;
          transform-style: preserve-3d;
          transform: rotateX(60deg) rotateZ(-45deg);
        }


        .zen-comp {
          position: absolute;
          transform-style: preserve-3d;
          cursor: pointer;
          pointer-events: auto;
        }

        .zen-comp-main { top: 250px; left: 250px; width: 200px; height: 200px; }
        .zen-comp-node-1 { top: 40px; left: 280px; width: 140px; height: 140px; }
        .zen-comp-node-2 { top: 280px; left: 40px; width: 140px; height: 140px; }

        .zen-connection {
          position: absolute;
          background: rgba(99, 102, 241, 0.2);
          box-shadow: 0 0 12px rgba(99, 102, 241, 0.1);
          transform: translateZ(-5px);
          pointer-events: none;
        }

        .dark .zen-connection {
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.02);
        }

        .zen-conn-1 { top: 110px; left: 350px; width: 4px; height: 140px; }
        .zen-conn-2 { top: 350px; left: 110px; width: 140px; height: 4px; }

        .zen-layer {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          transform-style: preserve-3d;
        }

        .zen-layer-base {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.06);
          transform: translateZ(0px);
          box-shadow: 15px 15px 30px rgba(0, 0, 0, 0.04);
        }

        .dark .zen-layer-base {
          background: #09090b;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 20px 20px 40px rgba(0, 0, 0, 0.8);
        }

        .zen-layer-core {
          background: rgba(250, 250, 250, 0.95);
          border: 1px solid rgba(0, 0, 0, 0.06);
          transform: translateZ(10px); 
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .dark .zen-layer-core {
          background: rgba(9, 9, 11, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .zen-layer-glass {
          background: rgba(255, 255, 255, 0.6); 
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 0, 0, 0.08);
          transform: translateZ(20px); 
          box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.01);
        }

        .dark .zen-layer-glass {
          background: rgba(20, 20, 23, 0.7); 
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.01);
        }

        .zen-layer-ui {
          background: transparent;
          border: 1px solid rgba(0, 0, 0, 0.1);
          transform: translateZ(30px); 
          padding: 20px;
          pointer-events: none; 
        }

        .dark .zen-layer-ui {
          border-color: rgba(255, 255, 255, 0.15);
        }

        .zen-comp-main:hover .zen-layer-base { 
          transform: translateZ(0px); 
          box-shadow: 25px 25px 50px rgba(0, 0, 0, 0.08); 
        }
        .dark .zen-comp-main:hover .zen-layer-base { 
          box-shadow: 30px 30px 60px rgba(0,0,0,1); 
        }

        .zen-comp-main:hover .zen-layer-core { 
          transform: translateZ(50px); 
          box-shadow: 0 10px 35px rgba(99, 102, 241, 0.15); 
          border-color: rgba(99, 102, 241, 0.4); 
        }
        .dark .zen-comp-main:hover .zen-layer-core { 
          box-shadow: 0 10px 40px rgba(99, 102, 241, 0.35); 
          border-color: #6366f1; 
        }

        .zen-comp-main:hover .zen-layer-glass { 
          transform: translateZ(100px); 
          background: rgba(255, 255, 255, 0.2); 
          border-color: rgba(0, 0, 0, 0.15); 
        }
        .dark .zen-comp-main:hover .zen-layer-glass { 
          background: rgba(20, 20, 23, 0.3); 
          border-color: rgba(255, 255, 255, 0.25); 
        }

        .zen-comp-main:hover .zen-layer-ui { 
          transform: translateZ(150px); 
        }

        .zen-comp-node-1:hover .zen-layer-core { 
          transform: translateZ(40px); 
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.15); 
          border-color: rgba(16, 185, 129, 0.4); 
        }
        .dark .zen-comp-node-1:hover .zen-layer-core { 
          box-shadow: 0 10px 40px rgba(16, 185, 129, 0.35); 
          border-color: #10b981; 
        }

        .zen-comp-node-1:hover .zen-layer-glass { 
          transform: translateZ(80px); 
          background: rgba(255, 255, 255, 0.2); 
        }
        .dark .zen-comp-node-1:hover .zen-layer-glass { 
          background: rgba(20, 20, 23, 0.3); 
        }

        .zen-comp-node-1:hover .zen-layer-ui { 
          transform: translateZ(120px); 
        }

        .zen-comp-node-2:hover .zen-layer-core { 
          transform: translateZ(40px); 
          box-shadow: 0 10px 30px rgba(6, 182, 212, 0.15); 
          border-color: rgba(6, 182, 212, 0.4); 
        }
        .dark .zen-comp-node-2:hover .zen-layer-core { 
          box-shadow: 0 10px 40px rgba(6, 182, 212, 0.35); 
          border-color: #06b6d4; 
        }

        .zen-comp-node-2:hover .zen-layer-glass { 
          transform: translateZ(80px); 
          background: rgba(255, 255, 255, 0.2); 
        }
        .dark .zen-comp-node-2:hover .zen-layer-glass { 
          background: rgba(20, 20, 23, 0.3); 
        }

        .zen-comp-node-2:hover .zen-layer-ui { 
          transform: translateZ(120px); 
        }
      `}</style>
      <div
        className="scale-[0.5] sm:scale-[0.7] md:scale-[0.8] lg:scale-[0.7] xl:scale-[0.85] transition-transform duration-500 transform-gpu"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="zen-scene">
          <div className="zen-grid">
            {/* Connection Lines */}
            <div className="zen-connection zen-conn-1" />
            <div className="zen-connection zen-conn-2" />

            {/* Kanso Core (comp-main) */}
            <div className="zen-comp zen-comp-main group">
              <div className="zen-layer zen-layer-base" />
              <div className="zen-layer zen-layer-core">
                <svg
                  className="w-[60%] h-[60%] text-indigo-500 dark:text-indigo-400 filter drop-shadow-[0_0_8px_rgba(99,102,241,0.4)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                  <circle cx="12" cy="12" r="3" fill="currentColor"></circle>
                </svg>
              </div>
              <div className="zen-layer zen-layer-glass" />
              <div className="zen-layer zen-layer-ui">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-[1.1rem] font-semibold text-zinc-900 dark:text-white leading-none">
                    Kanso Core
                  </h2>
                  <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded text-indigo-600 bg-indigo-500/10 border border-indigo-500/20 dark:text-indigo-400">
                    v1.0.0
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal mb-auto">
                  Minimalist component engine. Copy-paste React primitives.
                </p>
                <div className="flex gap-4 mt-auto pt-3 border-t border-zinc-200/50 dark:border-zinc-800/50">
                  <div className="flex flex-col">
                    <span className="font-mono text-[13px] font-bold text-zinc-800 dark:text-zinc-200">
                      0kb
                    </span>
                    <span className="text-[8px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                      Overhead
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[13px] font-bold text-zinc-800 dark:text-zinc-200">
                      100%
                    </span>
                    <span className="text-[8px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                      Custom
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Base UI (comp-node-1) */}
            <div className="zen-comp zen-comp-node-1 group">
              <div className="zen-layer zen-layer-base" />
              <div className="zen-layer zen-layer-core">
                <svg
                  className="w-[60%] h-[60%] text-emerald-500 dark:text-emerald-400 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <circle cx="12" cy="11" r="3" />
                  <path d="M12 14v4" />
                </svg>
              </div>
              <div className="zen-layer zen-layer-glass" />
              <div className="zen-layer zen-layer-ui">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-[14px] font-semibold text-zinc-900 dark:text-white leading-none">
                    Base UI
                  </h2>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal mb-auto">
                  Unstyled structural layers. Built-in ARIA.
                </p>
                <div className="flex gap-4 mt-auto pt-3 border-t border-zinc-200/50 dark:border-zinc-800/50">
                  <div className="flex flex-col">
                    <span className="font-mono text-[13px] font-bold text-zinc-800 dark:text-zinc-200">
                      100%
                    </span>
                    <span className="text-[8px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                      A11y
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Framer Motion (comp-node-2) */}
            <div className="zen-comp zen-comp-node-2 group">
              <div className="zen-layer zen-layer-base" />
              <div className="zen-layer zen-layer-core">
                <svg
                  className="w-[60%] h-[60%] text-cyan-500 dark:text-cyan-400 filter drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <div className="zen-layer zen-layer-glass" />
              <div className="zen-layer zen-layer-ui">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-[14px] font-semibold text-zinc-900 dark:text-white leading-none">
                    Motion
                  </h2>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal mb-auto">
                  Fluid micro-interactions and tactile 3D physics.
                </p>
                <div className="flex gap-4 mt-auto pt-3 border-t border-zinc-200/50 dark:border-zinc-800/50">
                  <div className="flex flex-col">
                    <span className="font-mono text-[13px] font-bold text-zinc-800 dark:text-zinc-200">
                      60fps
                    </span>
                    <span className="text-[8px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                      Smooth
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
