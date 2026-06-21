'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  Battery as BatteryIcon,
  Cpu,
  Terminal,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Define custom interface overrides for legacy/experimental APIs to avoid typescript lint issues
interface BatteryManager {
  level: number;
  charging: boolean;
  addEventListener(type: string, listener: () => void): void;
  removeEventListener(type: string, listener: () => void): void;
}

interface NavigatorWithBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
}

interface PerformanceWithMemory extends Performance {
  memory?: {
    usedJSHeapSize: number;
    jsHeapLimit: number;
  };
}

interface NetworkConnection {
  rtt?: number;
  downlink?: number;
  effectiveType?: string;
  addEventListener(type: string, listener: () => void): void;
  removeEventListener(type: string, listener: () => void): void;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkConnection;
  mozConnection?: NetworkConnection;
  webkitConnection?: NetworkConnection;
}

interface WindowWithWebkitAudio extends Window {
  webkitAudioContext?: typeof AudioContext;
}

// --- Web Audio API Synth ---
let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as WindowWithWebkitAudio).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

function playSynthSound(type: 'tick' | 'beep' | 'tink') {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Resume context if suspended (browser security policies)
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  try {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    if (type === 'tick') {
      // Tactile click
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.015);
      gainNode.gain.setValueAtTime(0.015, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + 0.015
      );
      osc.start();
      osc.stop(ctx.currentTime + 0.015);
    } else if (type === 'beep') {
      // Alarm/alert
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.03, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + 0.08
      );
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'tink') {
      // Micro interface feedback
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2000, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + 0.01
      );
      osc.start();
      osc.stop(ctx.currentTime + 0.01);
    }
  } catch {
    // Ignore block failures
  }
}

// --- Subcomponent: TelemetrySegbar ---
export interface TelemetrySegbarProps {
  total?: number;
  on: number;
  color?: 'white' | 'green' | 'orange' | 'zinc';
}

export function TelemetrySegbar({
  total = 20,
  on,
  color = 'white',
}: TelemetrySegbarProps) {
  return (
    <div className="flex gap-1 h-2.5 mt-auto w-full">
      {Array.from({ length: total }, (_, i) => {
        const isActive = i < on;
        return (
          <div
            key={i}
            className={cn(
              'flex-1 rounded-xs transition-colors duration-300',
              isActive
                ? cn(
                    color === 'white' && 'bg-zinc-100 dark:bg-zinc-200',
                    color === 'green' && 'bg-emerald-500',
                    color === 'orange' && 'bg-amber-500',
                    color === 'zinc' && 'bg-zinc-500'
                  )
                : 'bg-zinc-200/10 dark:bg-zinc-800/40'
            )}
          />
        );
      })}
    </div>
  );
}

// --- Subcomponent: TelemetryCard ---
export interface TelemetryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  right?: React.ReactNode;
  status?: 'live' | 'sim' | 'off';
  essential?: boolean;
  onHoverAction?: () => void;
}

export function TelemetryCard({
  label,
  right,
  status = 'live',
  essential = false,
  className,
  children,
  onHoverAction,
  ...props
}: TelemetryCardProps) {
  const [shining, setShining] = React.useState(false);

  const handleMouseEnter = () => {
    setShining(true);
    if (onHoverAction) onHoverAction();
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      className={cn(
        'group relative overflow-hidden bg-zinc-950 border border-zinc-200/10 dark:border-zinc-800/80 rounded-2xl p-5 flex flex-col justify-between text-zinc-100 hover:border-zinc-200/30 dark:hover:border-zinc-700/50 transition-colors duration-300',
        essential ? '' : 'opacity-95 hover:opacity-100',
        className
      )}
      {...props}
    >
      {/* Skewed Sweep Shine Overlay */}
      <span
        className={cn(
          'absolute top-[-30%] bottom-[-30%] left-[-140px] w-[110px] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-14deg] pointer-events-none z-10 opacity-0',
          shining && 'animate-[kanso-shimmer-sweep_0.95s_ease-out_forwards]'
        )}
        onAnimationEnd={() => setShining(false)}
      />

      {/* Header Metadata Row */}
      <div className="flex justify-between items-center text-[10px] font-mono tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-4 select-none z-10">
        <div className="flex items-center gap-1.5">
          <span>{label}</span>
        </div>
        <div className="flex items-center gap-2">
          {right && <span className="font-light">{right}</span>}
          {status !== 'off' && (
            <span
              className={cn(
                'px-1.5 py-0.5 rounded text-[8px] font-bold tracking-normal leading-none flex items-center gap-1',
                status === 'live'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              )}
            >
              <span
                className={cn(
                  'size-1 rounded-full',
                  status === 'live'
                    ? 'bg-emerald-400 animate-pulse'
                    : 'bg-amber-400'
                )}
              />
              {status.toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col z-10">{children}</div>
    </div>
  );
}

// --- Widget 1: TelemetryClock ---
export interface TelemetryClockProps {
  soundEnabled?: boolean;
}

export function TelemetryClock({ soundEnabled = true }: TelemetryClockProps) {
  const [time, setTime] = React.useState<Date | null>(null);
  const [soundOn, setSoundOn] = React.useState(soundEnabled);
  const lastSecond = React.useRef(-1);

  React.useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setTime(new Date());
    });
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now);
      if (soundOn && now.getSeconds() !== lastSecond.current) {
        lastSecond.current = now.getSeconds();
        playSynthSound('tick');
      }
    }, 100);
    return () => {
      cancelAnimationFrame(animationFrame);
      clearInterval(timer);
    };
  }, [soundOn]);

  if (!time) {
    return (
      <TelemetryCard
        label="System Clock"
        status="live"
        className="col-span-full md:col-span-2 min-h-[190px]"
      >
        <div className="flex-1 flex items-center justify-center font-mono text-zinc-500">
          Syncing...
        </div>
      </TelemetryCard>
    );
  }

  const pad = (n: number) => String(n).padStart(2, '0');
  const hours = pad(time.getHours());
  const minutes = pad(time.getMinutes());
  const seconds = pad(time.getSeconds());

  const formattedDate = time
    .toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
    .toUpperCase();

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextVal = !soundOn;
    setSoundOn(nextVal);
    playSynthSound('tink');
  };

  return (
    <TelemetryCard
      label="System Clock · UTC"
      status="live"
      right={
        <button
          onClick={toggleSound}
          className="flex items-center gap-1.5 p-1 rounded hover:bg-zinc-800/40 text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
          title={soundOn ? 'Mute tick sound' : 'Unmute tick sound'}
        >
          {soundOn ? (
            <Volume2 className="size-3.5" />
          ) : (
            <VolumeX className="size-3.5" />
          )}
          <span className="text-[9px] font-mono tracking-wider">
            {soundOn ? 'AUDIO ON' : 'AUDIO MUTED'}
          </span>
        </button>
      }
      className="col-span-full md:col-span-2 min-h-[190px] relative"
    >
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-baseline gap-2 justify-center">
          <div className="font-mono text-5xl md:text-6xl font-bold tracking-tight text-white select-all">
            {hours}:{minutes}
          </div>
          <div className="font-mono text-xl text-zinc-400 select-all font-light w-8">
            {seconds}
          </div>
        </div>
        <div className="text-center font-mono text-xs text-zinc-500 tracking-widest mt-2 select-none">
          {formattedDate} · TZ LOCAL
        </div>
      </div>
    </TelemetryCard>
  );
}

// --- Widget 2: TelemetryBattery ---
export function TelemetryBattery() {
  const [level, setLevel] = React.useState(0.85);
  const [charging, setCharging] = React.useState(false);
  const [isSimulated, setIsSimulated] = React.useState(() => {
    if (typeof navigator === 'undefined') return true;
    const nav = navigator as unknown as NavigatorWithBattery;
    return !nav.getBattery;
  });

  React.useEffect(() => {
    const nav = navigator as unknown as NavigatorWithBattery;
    if (!nav.getBattery) return;

    let activeBat: BatteryManager | null = null;
    let onLevelChange: (() => void) | null = null;
    let onChargingChange: (() => void) | null = null;

    nav
      .getBattery()
      .then((bat) => {
        activeBat = bat;
        setLevel(bat.level);
        setCharging(bat.charging);

        onLevelChange = () => setLevel(bat.level);
        onChargingChange = () => setCharging(bat.charging);

        bat.addEventListener('levelchange', onLevelChange);
        bat.addEventListener('chargingchange', onChargingChange);
      })
      .catch(() => {
        setIsSimulated(true);
      });

    return () => {
      if (activeBat) {
        if (onLevelChange)
          activeBat.removeEventListener('levelchange', onLevelChange);
        if (onChargingChange)
          activeBat.removeEventListener('chargingchange', onChargingChange);
      }
    };
  }, []);

  // Simulating small battery discharges if simulated
  React.useEffect(() => {
    if (!isSimulated) return;
    const interval = setInterval(() => {
      setLevel((prev) => {
        if (prev <= 0.05) return 1.0; // Recharge back
        return Math.max(0.01, prev - 0.001);
      });
    }, 8000);
    return () => clearInterval(interval);
  }, [isSimulated]);

  const pct = Math.round(level * 100);
  const barOnCount = Math.round(level * 24);

  return (
    <TelemetryCard
      label="Battery Status"
      status={isSimulated ? 'sim' : 'live'}
      right={
        <div className="flex items-center gap-1.5 text-zinc-400">
          <BatteryIcon className="size-3.5" />
          <span className="text-[9px] font-mono tracking-wider">
            {charging ? 'CHARGING' : 'DISCHARGING'}
          </span>
        </div>
      }
      className="col-span-full sm:col-span-1 min-h-[190px]"
    >
      <div className="flex-1 flex flex-col justify-between">
        <div className="mt-2 flex items-baseline gap-1 select-all">
          <span className="font-mono text-5xl font-bold tracking-tight text-white">
            {pct}
          </span>
          <span className="font-mono text-sm text-zinc-400 font-light">%</span>
        </div>

        <div className="my-2">
          <TelemetrySegbar
            total={24}
            on={barOnCount}
            color={charging ? 'green' : pct < 20 ? 'orange' : 'white'}
          />
        </div>

        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider select-none">
          {charging
            ? 'AC source · drawing power'
            : 'Internal cell · on discharge'}
        </div>
      </div>
    </TelemetryCard>
  );
}

// --- Widget 3: TelemetryMemory ---
export function TelemetryMemory() {
  const [heapMB, setHeapMB] = React.useState(124);
  const [heapLimitGB, setHeapLimitGB] = React.useState(4.2);
  const [percent, setPercent] = React.useState(3.5);
  const [isSimulated] = React.useState(() => {
    if (typeof window === 'undefined') return true;
    const perf = window.performance as unknown as PerformanceWithMemory;
    return !perf.memory;
  });

  React.useEffect(() => {
    const updateMemory = () => {
      const perf =
        typeof window !== 'undefined'
          ? (window.performance as unknown as PerformanceWithMemory)
          : null;
      if (perf && perf.memory) {
        const mem = perf.memory;
        const usedMB = Math.round(mem.usedJSHeapSize / 1024 / 1024);
        const limitGB = parseFloat(
          (mem.jsHeapLimit / 1024 / 1024 / 1024).toFixed(1)
        );
        const pct = parseFloat(
          ((mem.usedJSHeapSize / mem.jsHeapLimit) * 100).toFixed(1)
        );

        setHeapMB(usedMB);
        setHeapLimitGB(limitGB);
        setPercent(pct);
      } else {
        // Simulated oscillation
        const limit = 4.2;
        setHeapLimitGB(limit);
        const base = 120 + Math.sin(Date.now() / 6000) * 15;
        const randomSpike = Math.random() > 0.95 ? 45 : 0;
        const finalVal = Math.round(base + randomSpike);
        setHeapMB(finalVal);
        setPercent(parseFloat(((finalVal / (limit * 1024)) * 100).toFixed(1)));
      }
    };

    updateMemory();
    const interval = setInterval(updateMemory, 1500);
    return () => clearInterval(interval);
  }, []);

  // SVG Ring values
  const radius = 32;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  // Cap visual percent at 100, memory usually occupies tiny percentage of limits
  const visualPct = Math.min(100, Math.max(1, percent * 5)); // Scaled for aesthetic ring
  const strokeDashoffset = circumference - (visualPct / 100) * circumference;

  return (
    <TelemetryCard
      label="Engine Memory"
      status={isSimulated ? 'sim' : 'live'}
      right={
        <div className="flex items-center gap-1 text-zinc-400">
          <Cpu className="size-3.5" />
          <span className="text-[9px] font-mono tracking-wider">JS HEAP</span>
        </div>
      }
      className="col-span-full sm:col-span-1 min-h-[190px]"
    >
      <div className="flex-1 flex items-center justify-between gap-4 mt-2">
        <div className="flex-1 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-baseline gap-1 select-all">
              <span className="font-mono text-4xl font-bold tracking-tight text-white">
                {heapMB}
              </span>
              <span className="font-mono text-xs text-zinc-400 font-light">
                MB
              </span>
            </div>
            <div className="font-mono text-[10px] text-zinc-500 uppercase mt-1 tracking-wider">
              / {heapLimitGB} GB Limit
            </div>
          </div>
          <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mt-4">
            {percent}% UTILIZED
          </div>
        </div>

        {/* Circular Indicator */}
        <div className="relative size-18 shrink-0 flex items-center justify-center">
          <svg className="size-full transform rotate-[-90deg]">
            <circle
              cx="36"
              cy="36"
              r={radius}
              className="stroke-zinc-200/5 dark:stroke-zinc-800/80 fill-none"
              strokeWidth={strokeWidth}
            />
            <circle
              cx="36"
              cy="36"
              r={radius}
              className="stroke-amber-500 fill-none transition-all duration-700 ease-out"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
            <span className="text-xs font-mono font-bold text-white">
              {Math.round(percent)}%
            </span>
          </div>
        </div>
      </div>
    </TelemetryCard>
  );
}

// --- Widget 4: TelemetrySeismograph ---
export function TelemetrySeismograph() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [evtRate, setEvtRate] = React.useState(0);
  const eventCounter = React.useRef(0);
  const velocityHistory = React.useRef<number[]>(new Array(150).fill(0));

  // Real-time mouse speed sensors
  React.useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastTime = Date.now();
    let currentVelocity = 0;

    const onMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = Math.max(1, now - lastTime);
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      currentVelocity = dist / dt; // pixels per millisecond
      eventCounter.current += 1;

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;
    };

    const onKeyDown = () => {
      eventCounter.current += 1;
      currentVelocity = 2.5; // Simulate impulse on keyboard hit
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('keydown', onKeyDown);

    // Event rate ticker (calculate events per minute dynamically)
    const rateInterval = setInterval(() => {
      setEvtRate(eventCounter.current * 12); // Extrapolate rate to events per minute
      eventCounter.current = 0;
    }, 5000);

    // Canvas drawing loop
    const canvas = canvasRef.current;
    let animationId = 0;

    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const resizeCanvas = () => {
          if (!canvas || !containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const dpr = window.devicePixelRatio || 1;

          canvas.style.width = `${rect.width}px`;
          canvas.style.height = `${rect.height}px`;

          canvas.width = rect.width * dpr;
          canvas.height = rect.height * dpr;

          ctx.scale(dpr, dpr);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        let t = 0;
        const render = () => {
          t += 0.05;

          // Slowly decay current velocity
          currentVelocity = Math.max(0, currentVelocity * 0.96);

          // Push new velocity
          velocityHistory.current.shift();
          velocityHistory.current.push(currentVelocity);

          // Get dimensions in CSS pixels
          const cssW = canvas.clientWidth;
          const cssH = canvas.clientHeight;

          ctx.clearRect(0, 0, cssW, cssH);

          // Draw grid line
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
          ctx.lineWidth = 1;
          for (let gridX = 0; gridX < cssW; gridX += 20) {
            ctx.beginPath();
            ctx.moveTo(gridX, 0);
            ctx.lineTo(gridX, cssH);
            ctx.stroke();
          }

          // Draw waveform
          ctx.beginPath();
          ctx.lineWidth = 1.6;
          ctx.strokeStyle = '#fafafa'; // Silver

          const maxVelocity = 4.0; // Clamp reference
          const samples = velocityHistory.current;
          const len = samples.length;

          for (let i = 0; i < len; i++) {
            const v = samples[i];
            const x = (i / (len - 1)) * cssW;

            // Add a tiny micro noise to simulate analog signal
            const noise = Math.sin(t * 1.5 + i * 0.15) * 0.7;
            const normalizedV = Math.min(1.0, v / maxVelocity);

            // Invert Y so bottom is zero activity, top is peak
            const y = cssH * 0.78 - normalizedV * (cssH * 0.65) + noise;

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();

          // Draw red scanning marker line
          ctx.fillStyle = '#ef4444'; // red
          ctx.fillRect(cssW - 3, 2, 2, cssH - 4);

          animationId = requestAnimationFrame(render);
        };

        render();

        return () => {
          cancelAnimationFrame(animationId);
          window.removeEventListener('resize', resizeCanvas);
        };
      }
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('keydown', onKeyDown);
      clearInterval(rateInterval);
    };
  }, []);

  return (
    <TelemetryCard
      label="Input Oscilloscope · CH 01"
      status="live"
      right={
        <span className="flex items-center gap-1.5 text-rose-500 font-bold tracking-wider">
          <span className="size-1.5 rounded-full bg-rose-500 animate-[pulse_1.2s_infinite]" />
          REC
        </span>
      }
      className="col-span-full md:col-span-2 min-h-[190px]"
    >
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-baseline select-none">
          <div className="flex items-baseline gap-1 select-all">
            <span className="font-mono text-3xl font-bold tracking-tight text-white">
              {evtRate}
            </span>
            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-light">
              EVT/MIN
            </span>
          </div>
          <span className="text-[9px] font-mono text-zinc-500 tracking-wider">
            POINTER + KEYBOARD
          </span>
        </div>

        <div
          ref={containerRef}
          className="flex-1 min-h-[75px] mt-4 relative bg-zinc-950/20 border border-zinc-200/5 dark:border-zinc-800/40 rounded-lg overflow-hidden select-none"
        >
          <canvas ref={canvasRef} />
        </div>
      </div>
    </TelemetryCard>
  );
}

// --- Widget 5: TelemetryActivity ---
const LOG_MESSAGES = [
  "git commit -m 'core: patch scheduler'",
  'npm install framer-motion tailwindcss',
  'pnpm build:registry --force',
  'deployment pipeline initialized',
  'asset compilation complete [341ms]',
  'route pre-render (5 pages)',
  'lighthouse score audit: 100/100/98',
  'cloudflare deployment successful',
  'vitest execution: 12 tests passed',
  'eslint validator initialized successfully',
  'server: telemetry database socket connected',
  'docker container healthcheck status: green',
];

interface LogLine {
  id: string;
  msg: string;
  targetLength: number;
  time: string;
}

export function TelemetryActivity() {
  const [logs, setLogs] = React.useState<LogLine[]>([]);
  const lineCounter = React.useRef(0);

  React.useEffect(() => {
    let index = 0;
    let timer: NodeJS.Timeout;

    const pad = (n: number) => String(n).padStart(2, '0');

    const triggerNextLog = () => {
      const now = new Date();
      const timestamp = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      const rawText = LOG_MESSAGES[index % LOG_MESSAGES.length];
      index++;

      const logId = `log-${lineCounter.current++}`;
      const newLog: LogLine = {
        id: logId,
        msg: '',
        targetLength: rawText.length,
        time: timestamp,
      };

      setLogs((prev) => [newLog, ...prev].slice(0, 6));

      // Simulate character typewriter
      let charIdx = 0;
      const type = () => {
        setLogs((prevList) =>
          prevList.map((item) => {
            if (item.id === logId) {
              return { ...item, msg: rawText.slice(0, charIdx + 1) };
            }
            return item;
          })
        );
        charIdx++;
        if (charIdx < rawText.length) {
          timer = setTimeout(type, 15);
        } else {
          // Trigger next full log sequence after gap
          timer = setTimeout(triggerNextLog, 4000 + Math.random() * 2000);
        }
      };

      type();
    };

    triggerNextLog();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <TelemetryCard
      label="Pipeline Activity"
      status="sim"
      right={
        <div className="flex items-center gap-1.5 text-zinc-400">
          <Terminal className="size-3.5" />
          <span className="text-[9px] font-mono tracking-wider">DEVSTREAM</span>
        </div>
      }
      className="col-span-full md:col-span-2 min-h-[190px]"
    >
      <div className="flex-1 flex flex-col justify-end mt-2 overflow-hidden select-text">
        <div className="flex flex-col gap-2 font-mono text-[11px] text-zinc-200/90 leading-tight">
          <AnimatePresence initial={false}>
            {logs.map((log, i) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: Math.max(0.18, 1 - i * 0.16),
                  y: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-between gap-4 border-b border-zinc-200/5 dark:border-zinc-800/10 pb-1.5 last:border-0"
              >
                <span className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
                  <span className="text-[9px] text-zinc-500 font-semibold">{`>`}</span>
                  <span className="truncate">
                    {log.msg}
                    {i === 0 && log.msg.length < log.targetLength && (
                      <span className="inline-block w-1.5 h-3 bg-amber-500/80 animate-[pulse_0.4s_infinite] ml-1 align-middle" />
                    )}
                  </span>
                </span>
                <span className="text-zinc-500 select-none text-[10px] tabular-nums shrink-0">
                  {log.time}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </TelemetryCard>
  );
}

// --- Widget 6: TelemetryNetwork ---
export function TelemetryNetwork() {
  const [latency, setLatency] = React.useState(32);
  const [speed, setSpeed] = React.useState(54);
  const [type, setType] = React.useState('4G');
  const [isSimulated] = React.useState(() => {
    if (typeof navigator === 'undefined') return true;
    const nav = navigator as unknown as NavigatorWithConnection;
    const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
    return !conn;
  });

  React.useEffect(() => {
    const nav = navigator as unknown as NavigatorWithConnection;
    const conn =
      typeof navigator !== 'undefined'
        ? nav.connection || nav.mozConnection || nav.webkitConnection
        : null;
    if (conn) {
      const updateConn = () => {
        setLatency(conn.rtt || 24);
        setSpeed(conn.downlink || 45);
        setType((conn.effectiveType || '4g').toUpperCase());
      };
      updateConn();
      conn.addEventListener('change', updateConn);
      return () => conn.removeEventListener('change', updateConn);
    } else {
      // Simulated fluctuations
      const interval = setInterval(() => {
        setLatency(
          Math.max(12, Math.round(28 + Math.sin(Date.now() / 4000) * 12))
        );
        setSpeed(
          Math.max(10, Math.round(52 + Math.cos(Date.now() / 6000) * 8))
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, []);

  const signalStrength = Math.min(
    20,
    Math.max(2, Math.round((speed / 100) * 20))
  );

  return (
    <TelemetryCard
      label="Network Pipeline"
      status={isSimulated ? 'sim' : 'live'}
      right={
        <span className="text-[9px] font-mono tracking-wider">{type} LINK</span>
      }
      className="col-span-full sm:col-span-1 min-h-[190px]"
    >
      <div className="flex-1 flex flex-col justify-between">
        <div className="mt-2 select-all">
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-3xl font-bold tracking-tight text-white">
              {latency}
            </span>
            <span className="font-mono text-xs text-zinc-400 font-light">
              MS RTT
            </span>
          </div>
          <div className="font-mono text-[10px] text-zinc-500 uppercase mt-1 tracking-wider">
            DL RATE: {speed} MBPS
          </div>
        </div>

        <div className="my-2">
          <TelemetrySegbar total={20} on={signalStrength} color="white" />
        </div>

        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider select-none">
          RTT JITTER: ±{Math.round(latency * 0.1)}ms · STABLE
        </div>
      </div>
    </TelemetryCard>
  );
}

// --- Widget 7: TelemetryStorage ---
export function TelemetryStorage() {
  const [usedMB, setUsedMB] = React.useState(2.4);
  const [quotaGB, setQuotaGB] = React.useState(32);
  const [percent, setPercent] = React.useState(0.1);
  const [isSimulated, setIsSimulated] = React.useState(() => {
    if (typeof navigator === 'undefined') return true;
    return !(navigator.storage && navigator.storage.estimate);
  });

  React.useEffect(() => {
    if (
      typeof navigator !== 'undefined' &&
      navigator.storage &&
      navigator.storage.estimate
    ) {
      navigator.storage
        .estimate()
        .then((est) => {
          const used = est.usage
            ? parseFloat((est.usage / 1024 / 1024).toFixed(2))
            : 0;
          const quota = est.quota
            ? parseFloat((est.quota / 1024 / 1024 / 1024).toFixed(1))
            : 32;
          const pct =
            est.usage && est.quota ? (est.usage / est.quota) * 100 : 0.1;
          setUsedMB(used);
          setQuotaGB(quota);
          setPercent(pct);
        })
        .catch(() => {
          setIsSimulated(true);
        });
    }
  }, []);

  return (
    <TelemetryCard
      label="Browser Storage"
      status={isSimulated ? 'sim' : 'live'}
      right={
        <span className="text-[9px] font-mono tracking-wider">SANDBOX</span>
      }
      className="col-span-full sm:col-span-1 min-h-[190px]"
    >
      <div className="flex-1 flex flex-col justify-between">
        <div className="mt-2 select-all">
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-3xl font-bold tracking-tight text-white">
              {usedMB < 1
                ? `${Math.round(usedMB * 1024)} KB`
                : `${usedMB.toFixed(1)} MB`}
            </span>
          </div>
          <div className="font-mono text-[10px] text-zinc-500 uppercase mt-1 tracking-wider">
            / {quotaGB} GB ALLOCATED
          </div>
        </div>

        <div className="my-2">
          <TelemetrySegbar
            total={20}
            on={Math.max(1, Math.round(percent * 50))}
            color="orange"
          />
        </div>

        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider select-none">
          INDEXEDDB + CACHE STORAGE
        </div>
      </div>
    </TelemetryCard>
  );
}

// --- Widget 8: TelemetryAudioVisualizer ---
export function TelemetryAudioVisualizer() {
  const [isHovered, setIsHovered] = React.useState(false);
  const [heights, setHeights] = React.useState<number[]>(
    new Array(16).fill(15)
  );
  const animFrame = React.useRef<number>(0);

  React.useEffect(() => {
    let t = 0;
    const updateSpectrum = () => {
      t += isHovered ? 0.25 : 0.08;

      const newHeights = Array.from({ length: 16 }, (_, i) => {
        // Compose multiple sine waves for organic motion
        const base = Math.sin(t + i * 0.4) * Math.cos(t * 0.6 - i * 0.2);
        const noise = Math.sin(t * 2.2 + i * 0.85) * 0.15;
        const normalized = Math.max(0.1, (base + 1) / 2 + noise);

        // Dynamic amplitude based on hover status
        const amp = isHovered ? 52 : 32;
        const minVal = isHovered ? 12 : 6;

        return Math.round(normalized * amp + minVal);
      });

      setHeights(newHeights);
      animFrame.current = requestAnimationFrame(updateSpectrum);
    };

    updateSpectrum();

    return () => cancelAnimationFrame(animFrame.current);
  }, [isHovered]);

  return (
    <TelemetryCard
      label="Audio Spectrum Analyzer"
      status="sim"
      right={
        <span className="text-[9px] font-mono tracking-wider">
          16 CH · GAIN ON
        </span>
      }
      onHoverAction={() => {}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="col-span-full md:col-span-2 min-h-[190px]"
    >
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-baseline select-none">
          <div className="flex items-baseline gap-1 select-all">
            <span className="font-mono text-3xl font-bold tracking-tight text-white">
              {isHovered ? '96' : '64'}
            </span>
            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-light">
              DB SPL
            </span>
          </div>
          <span className="text-[9px] font-mono text-zinc-500 tracking-wider">
            ACTIVE SYNTH MONITOR
          </span>
        </div>

        {/* Visualizer bars */}
        <div className="flex items-end justify-between h-20 bg-zinc-950/20 border border-zinc-200/5 dark:border-zinc-800/40 rounded-lg p-3 mt-3 select-none">
          {heights.map((h, i) => (
            <div
              key={i}
              className={cn(
                'w-[5%] rounded-t-xs transition-all duration-75',
                isHovered ? 'bg-amber-500' : 'bg-zinc-100 dark:bg-zinc-200'
              )}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </TelemetryCard>
  );
}

// --- Main Grid Component ---
export interface TelemetryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  soundEnabled?: boolean;
}

export function TelemetryGrid({
  className,
  children,
  soundEnabled = true,
  ...props
}: TelemetryGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-5xl',
        className
      )}
      {...props}
    >
      {children || (
        <>
          <TelemetryClock soundEnabled={soundEnabled} />
          <TelemetryBattery />
          <TelemetryMemory />
          <TelemetrySeismograph />
          <TelemetryActivity />
          <TelemetryAudioVisualizer />
          <TelemetryNetwork />
          <TelemetryStorage />
        </>
      )}
    </div>
  );
}
