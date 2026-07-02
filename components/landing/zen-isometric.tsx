'use client';

import * as React from 'react';

export function ZenIsometric() {
  const sceneRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let frameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from -1 to 1 based on screen center
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const handleMouseLeave = () => {
      mouseX = 0;
      mouseY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      // Lerp (Linear Interpolation) for smooth drag effect
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      // Apply the rotation (limited to subtle angles for the 3D effect)
      const rotateX = currentY * -12; // Max tilt up/down
      const rotateY = currentX * 12; // Max tilt left/right

      if (sceneRef.current) {
        sceneRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }

      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-visible bg-transparent">
      <div ref={sceneRef} className="zen-scene">
        <div className="isometric-grid">
          {/* Floor grid */}
          <div className="floor" />

          {/* Connection rails */}
          <div className="connection conn-1" />
          <div className="connection conn-2" />

          {/* Component 1: Main Server */}
          <div className="zen-component comp-main group">
            {/* Construction Lines */}
            <div className="absolute top-0 left-0 w-px h-0 group-hover:h-[120px] origin-top [transform:rotateX(-90deg)] border-l border-dashed border-zinc-300 dark:border-zinc-700 transition-all duration-500 ease-out z-0" />
            <div className="absolute top-0 right-0 w-px h-0 group-hover:h-[120px] origin-top [transform:rotateX(-90deg)] border-l border-dashed border-zinc-300 dark:border-zinc-700 transition-all duration-500 ease-out z-0" />
            <div className="absolute bottom-0 left-0 w-px h-0 group-hover:h-[120px] origin-top [transform:rotateX(-90deg)] border-l border-dashed border-zinc-300 dark:border-zinc-700 transition-all duration-500 ease-out z-0" />
            <div className="absolute bottom-0 right-0 w-px h-0 group-hover:h-[120px] origin-top [transform:rotateX(-90deg)] border-l border-dashed border-zinc-300 dark:border-zinc-700 transition-all duration-500 ease-out z-0" />

            <div className="zen-layer layer-base" />
            <div className="zen-layer layer-core">
              <svg
                className="w-16 h-16 text-zinc-900 dark:text-zinc-100"
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
            <div className="zen-layer layer-glass" />
            <div className="zen-layer layer-ui">
              <div className="flex items-start justify-between w-full">
                <span className="text-sm font-bold text-foreground select-none">
                  Core Engine
                </span>
                <span className="text-[10px] font-mono font-bold text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 rounded select-none">
                  v2.4.0
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-snug mt-2 select-none text-left">
                Main processing unit handling all state logic.
              </p>
              <div className="flex items-center gap-4 mt-auto pt-3 border-t border-border/60">
                <div className="flex flex-col text-left">
                  <span className="font-mono text-sm font-semibold text-foreground">
                    14.2
                    <span className="text-[10px] text-muted-foreground ml-0.5">
                      ms
                    </span>
                  </span>
                  <span className="text-[8px] uppercase tracking-wider text-muted-foreground font-medium">
                    Latency
                  </span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-mono text-sm font-semibold text-foreground">
                    99.9
                    <span className="text-[10px] text-muted-foreground ml-0.5">
                      %
                    </span>
                  </span>
                  <span className="text-[8px] uppercase tracking-wider text-muted-foreground font-medium">
                    Uptime
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Component 2: Node 1 (Cache Node) */}
          <div className="zen-component comp-node-1 group">
            {/* Construction Lines */}
            <div className="absolute top-0 left-0 w-px h-0 group-hover:h-[80px] origin-top [transform:rotateX(-90deg)] border-l border-dashed border-zinc-300 dark:border-zinc-700 transition-all duration-500 ease-out z-0" />
            <div className="absolute top-0 right-0 w-px h-0 group-hover:h-[80px] origin-top [transform:rotateX(-90deg)] border-l border-dashed border-zinc-300 dark:border-zinc-700 transition-all duration-500 ease-out z-0" />
            <div className="absolute bottom-0 left-0 w-px h-0 group-hover:h-[80px] origin-top [transform:rotateX(-90deg)] border-l border-dashed border-zinc-300 dark:border-zinc-700 transition-all duration-500 ease-out z-0" />
            <div className="absolute bottom-0 right-0 w-px h-0 group-hover:h-[80px] origin-top [transform:rotateX(-90deg)] border-l border-dashed border-zinc-300 dark:border-zinc-700 transition-all duration-500 ease-out z-0" />

            <div className="zen-layer layer-base" />
            <div className="zen-layer layer-core">
              <svg
                className="w-10 h-10 text-zinc-900 dark:text-zinc-100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
            </div>
            <div className="zen-layer layer-glass" />
            <div className="zen-layer layer-ui">
              <div className="flex items-start justify-between w-full">
                <span className="text-[11px] font-bold text-foreground select-none">
                  Cache Node
                </span>
                <span className="text-[8px] font-mono font-bold text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-1.5 py-0.5 rounded select-none">
                  DB_L1
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-snug mt-1 select-none text-left">
                In-memory fast state.
              </p>
              <div className="flex items-center gap-4 mt-auto pt-2 border-t border-border/60">
                <div className="flex flex-col text-left">
                  <span className="font-mono text-xs font-semibold text-foreground">
                    99.8%
                  </span>
                  <span className="text-[8px] uppercase tracking-wider text-muted-foreground font-medium">
                    Hit Rate
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Component 3: Node 2 (Edge Proxy) */}
          <div className="zen-component comp-node-2 group">
            {/* Construction Lines */}
            <div className="absolute top-0 left-0 w-px h-0 group-hover:h-[80px] origin-top [transform:rotateX(-90deg)] border-l border-dashed border-zinc-300 dark:border-zinc-700 transition-all duration-500 ease-out z-0" />
            <div className="absolute top-0 right-0 w-px h-0 group-hover:h-[80px] origin-top [transform:rotateX(-90deg)] border-l border-dashed border-zinc-300 dark:border-zinc-700 transition-all duration-500 ease-out z-0" />
            <div className="absolute bottom-0 left-0 w-px h-0 group-hover:h-[80px] origin-top [transform:rotateX(-90deg)] border-l border-dashed border-zinc-300 dark:border-zinc-700 transition-all duration-500 ease-out z-0" />
            <div className="absolute bottom-0 right-0 w-px h-0 group-hover:h-[80px] origin-top [transform:rotateX(-90deg)] border-l border-dashed border-zinc-300 dark:border-zinc-700 transition-all duration-500 ease-out z-0" />

            <div className="zen-layer layer-base" />
            <div className="zen-layer layer-core">
              <svg
                className="w-10 h-10 text-zinc-900 dark:text-zinc-100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                <polyline points="15 13 18 16 21 13" />
                <line x1="18" y1="16" x2="18" y2="10" />
              </svg>
            </div>
            <div className="zen-layer layer-glass" />
            <div className="zen-layer layer-ui">
              <div className="flex items-start justify-between w-full">
                <span className="text-[11px] font-bold text-foreground select-none">
                  Edge Proxy
                </span>
                <span className="text-[8px] font-mono font-bold text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-1.5 py-0.5 rounded select-none">
                  CDN
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-snug mt-1 select-none text-left">
                Global Edge Routing.
              </p>
              <div className="flex items-center gap-4 mt-auto pt-2 border-t border-border/60">
                <div className="flex flex-col text-left">
                  <span className="font-mono text-xs font-semibold text-foreground">
                    12ms
                  </span>
                  <span className="text-[8px] uppercase tracking-wider text-muted-foreground font-medium">
                    Ping
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
