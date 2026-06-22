'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';

export interface HalftoneImageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The source image URL. If omitted and allowUpload is true, shows an upload prompt. */
  src?: string;
  /** Allow user to upload their own image */
  allowUpload?: boolean;
  /** The spacing between dots in pixels (density). Lower value = higher detail. */
  dotSpacing?: number;
  /** The maximum dot radius. Defaults to dotSpacing * 0.7. */
  maxDotRadius?: number;
  /** Color of the halftone dots. If 'currentColor', it reads the text color of parent elements. */
  inkColor?: string;
  /** Multiple colors for dither particles. Cycles through colors. */
  colors?: string[];
  /** Color of the background paper layer. If 'transparent', the original page background shows through. */
  paperColor?: string;
  /** Contrast adjustment factor (e.g. 1.0 = normal, 1.5 = high contrast) */
  contrast?: number;
  /** Brightness adjustment factor (e.g. 1.0 = normal, 1.2 = brighter) */
  brightness?: number;
  /** Toggle interactive mouse hover warp effect */
  interactive?: boolean;
  /** The radius of mouse influence for distortion in pixels */
  hoverRadius?: number;
  /** The strength of the warping push/pull distortion */
  distortionStrength?: number;
  /** Scale factor of the dots under the cursor (e.g., 0.5 to shrink, 1.5 to grow) */
  dotScaleStrength?: number;
  /** Alt description for accessibility */
  alt?: string;
}

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (value: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

const HalftoneImage = React.forwardRef<HTMLDivElement, HalftoneImageProps>(
  (
    {
      src,
      allowUpload = false,
      dotSpacing = 8,
      maxDotRadius,
      inkColor = 'currentColor',
      colors,
      paperColor = 'transparent',
      contrast = 1.2,
      brightness = 1.0,
      interactive = true,
      hoverRadius = 100,
      distortionStrength = 8,
      dotScaleStrength = 1.2,
      alt = 'Halftone artwork',
      className,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const imageRef = React.useRef<HTMLImageElement | null>(null);

    const [localSrc, setLocalSrc] = React.useState<string | null>(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const currentSrc = localSrc || src;

    // Animation state
    const mouseRef = React.useRef({ x: -1000, y: -1000, active: false });
    const animationFrameId = React.useRef<number | null>(null);

    // Load image and analyze pixel data
    React.useEffect(() => {
      if (!currentSrc) {
        setIsLoaded(false);
        setError(null);
        return;
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = currentSrc;
      imageRef.current = img;

      img.onload = () => {
        setIsLoaded(true);
        setError(null);
      };

      img.onerror = () => {
        setIsLoaded(false);
        setError('Failed to load image.');
      };

      return () => {
        img.onload = null;
        img.onerror = null;
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
      };
    }, [currentSrc]);

    // Draw function
    const draw = React.useCallback(() => {
      const canvas = canvasRef.current;
      const img = imageRef.current;
      if (!canvas || !img || !isLoaded) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      // Read computed color values
      let resolvedInkColor = inkColor;
      if (inkColor === 'currentColor') {
        const computedStyle = window.getComputedStyle(canvas);
        resolvedInkColor = computedStyle.color || '#000000';
      }

      // 1. Draw original image onto offscreen buffer (or temp canvas) to analyze pixels
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = width;
      tempCanvas.height = height;
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      // Use object-fit: contain logic to draw responsively without stretching
      const imgRatio = img.width / img.height;
      const canvasRatio = width / height;
      let drawW = width;
      let drawH = height;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > canvasRatio) {
        drawH = width / imgRatio;
        offsetY = (height - drawH) / 2;
      } else {
        drawW = height * imgRatio;
        offsetX = (width - drawW) / 2;
      }

      tempCtx.drawImage(img, offsetX, offsetY, drawW, drawH);
      const imgData = tempCtx.getImageData(0, 0, width, height);
      const pixels = imgData.data;

      // 2. Clear canvas with background paper color
      ctx.clearRect(0, 0, width, height);
      if (paperColor !== 'transparent') {
        ctx.fillStyle = paperColor;
        ctx.fillRect(0, 0, width, height);
      }

      // 3. Draw dot matrix
      ctx.fillStyle = resolvedInkColor;

      const radiusLimit = maxDotRadius || dotSpacing * 0.7;
      const mouse = mouseRef.current;
      const hasColors = colors && colors.length > 0;

      for (let y = 0; y < height; y += dotSpacing) {
        for (let x = 0; x < width; x += dotSpacing) {
          // Compute center of grid cell
          const cellCenterX = x + dotSpacing / 2;
          const cellCenterY = y + dotSpacing / 2;

          // Check brightness in original pixels
          // Fall back to closest integer bounds to avoid boundary errors
          const px = Math.min(width - 1, Math.max(0, Math.floor(cellCenterX)));
          const py = Math.min(height - 1, Math.max(0, Math.floor(cellCenterY)));
          const idx = (py * width + px) * 4;

          const a = pixels[idx + 3];
          if (a < 10) continue; // Skip transparent areas where image didn't draw

          const r = pixels[idx];
          const g = pixels[idx + 1];
          const b = pixels[idx + 2];

          // Compute relative luminance
          let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          // Apply brightness modification
          luminance = Math.min(1.0, luminance * brightness);

          // Apply contrast modification centered around 0.5 midtone
          luminance = 0.5 + (luminance - 0.5) * contrast;
          luminance = Math.min(1.0, Math.max(0.0, luminance));

          // Darkness level determines base size of dot
          const darkness = 1.0 - luminance;

          // Calculate distance to mouse cursor for interactive warp
          let drawX = cellCenterX;
          let drawY = cellCenterY;
          let dotRadius = darkness * radiusLimit;

          if (interactive && mouse.active) {
            const dx = mouse.x - cellCenterX;
            const dy = mouse.y - cellCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < hoverRadius) {
              const influence = 1.0 - distance / hoverRadius;

              // 1. Warp displacement (push dots away from cursor)
              if (distortionStrength !== 0) {
                const angle = Math.atan2(dy, dx);
                // Displace coordinates outward
                const push = influence * distortionStrength;
                drawX -= Math.cos(angle) * push;
                drawY -= Math.sin(angle) * push;
              }

              // 2. Scale size modulation (increase contrast/size near cursor)
              if (dotScaleStrength !== 1) {
                dotRadius *= 1.0 + influence * (dotScaleStrength - 1);
              }
            }
          }

          // Render dot if visible
          if (dotRadius > 0.4) {
            if (hasColors) {
              const dotIdx =
                Math.floor(y / dotSpacing) * Math.floor(width / dotSpacing) +
                Math.floor(x / dotSpacing);
              ctx.fillStyle = colors[dotIdx % colors.length];
            } else {
              ctx.fillStyle = resolvedInkColor;
            }
            ctx.beginPath();
            ctx.arc(drawX, drawY, dotRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }, [
      isLoaded,
      dotSpacing,
      maxDotRadius,
      inkColor,
      colors,
      paperColor,
      contrast,
      brightness,
      interactive,
      hoverRadius,
      distortionStrength,
      dotScaleStrength,
    ]);

    // Loop animation for smooth mouse tracking
    const loop = React.useCallback(() => {
      draw();
      if (interactive && mouseRef.current.active) {
        animationFrameId.current = requestAnimationFrame(loop);
      }
    }, [draw, interactive]);

    // Redraw whenever canvas resizes or settings change
    React.useEffect(() => {
      if (!isLoaded) return;

      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      // Sync display size
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          if (width > 0 && height > 0) {
            // Set drawing buffer resolution matching screen pixel density
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            // Scale canvas contexts to draw at physical size automatically
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.scale(dpr, dpr);
            }
            draw();
          }
        }
      });

      resizeObserver.observe(container);
      return () => {
        resizeObserver.disconnect();
      };
    }, [isLoaded, draw]);

    // Mouse handlers
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive || !canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      // Translate client coordinate to relative coordinate inside canvas
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };

      // Start animation loop if not already running
      if (!animationFrameId.current) {
        animationFrameId.current = requestAnimationFrame(loop);
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      // Re-draw one final time to restore default state
      draw();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setLocalSrc(url);
      }
    };

    return (
      <div
        ref={mergeRefs(ref, containerRef)}
        className={cn(
          'relative overflow-hidden select-none w-full h-full min-h-[100px]',
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        role="img"
        aria-label={alt}
        {...props}
      >
        {allowUpload && (
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        )}

        {!currentSrc ? (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors border border-dashed border-zinc-200 dark:border-zinc-800 m-4 rounded-xl"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="size-8 text-zinc-400 mb-3" />
            <span className="text-sm font-medium text-zinc-500">
              Upload Image
            </span>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 text-xs text-zinc-400 dark:bg-zinc-900">
            {error}
          </div>
        ) : !isLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider animate-pulse">
              Dithering...
            </span>
          </div>
        ) : null}

        {allowUpload && currentSrc && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute top-4 right-4 z-20 bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-800 text-zinc-900 dark:text-white p-2 rounded-full shadow-sm backdrop-blur-md transition-all active:scale-95"
            aria-label="Upload new image"
            title="Upload new image"
          >
            <Upload className="size-4" />
          </button>
        )}

        <canvas
          ref={canvasRef}
          className="block w-full h-full object-contain"
        />
      </div>
    );
  }
);

HalftoneImage.displayName = 'HalftoneImage';

export { HalftoneImage };
