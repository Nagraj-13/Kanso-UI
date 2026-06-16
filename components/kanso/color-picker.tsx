'use client';

import Color from 'color';
import { Pipette } from 'lucide-react';
import { Slider as SliderPrimitive } from '@base-ui/react/slider';
import {
  type ComponentProps,
  createContext,
  type HTMLAttributes,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface ColorPickerContextValue {
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
  mode: string;
  setHue: (hue: number) => void;
  setSaturation: (saturation: number) => void;
  setLightness: (lightness: number) => void;
  setAlpha: (alpha: number) => void;
  setMode: (mode: string) => void;
}

const ColorPickerContext = createContext<ColorPickerContextValue | undefined>(
  undefined
);

export const useColorPicker = () => {
  const context = useContext(ColorPickerContext);

  if (!context) {
    throw new Error('useColorPicker must be used within a ColorPickerProvider');
  }

  return context;
};

export type ColorPickerProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange'
> & {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export const ColorPicker = ({
  value,
  defaultValue = '#000000',
  onChange,
  className,
  ...props
}: ColorPickerProps) => {
  const initialColor = useMemo(
    () => Color(value || defaultValue),
    [value, defaultValue]
  );

  const [hue, setHue] = useState(initialColor.hue() || 0);
  const [saturation, setSaturation] = useState(initialColor.saturationl() || 0);
  const [lightness, setLightness] = useState(initialColor.lightness() || 0);
  const [alpha, setAlpha] = useState(initialColor.alpha() * 100);
  const [mode, setMode] = useState('hex');

  // Update color when controlled value changes
  useEffect(() => {
    if (value) {
      try {
        const color = Color(value).hsl();
        const newHue = color.hue() || 0;
        const newSat = color.saturationl() || 0;
        const newLight = color.lightness() || 0;
        const newAlpha = color.alpha() * 100;

        const handle = requestAnimationFrame(() => {
          setHue(newHue);
          setSaturation(newSat);
          setLightness(newLight);
          setAlpha(newAlpha);
        });
        return () => cancelAnimationFrame(handle);
      } catch {
        // Handle malformed colors gracefully
      }
    }
  }, [value]);

  // Notify parent of changes
  useEffect(() => {
    if (onChange) {
      try {
        const color = Color.hsl(hue, saturation, lightness).alpha(alpha / 100);
        let colorString = '';
        if (mode === 'hex') {
          colorString = color.alpha() === 1 ? color.hex() : color.toString();
        } else if (mode === 'rgb') {
          colorString = color.rgb().toString();
        } else if (mode === 'hsl') {
          colorString = color.hsl().toString();
        } else {
          colorString = color.toString();
        }
        onChange(colorString);
      } catch {
        // Safe fallback
      }
    }
  }, [hue, saturation, lightness, alpha, mode, onChange]);

  return (
    <ColorPickerContext.Provider
      value={{
        hue,
        saturation,
        lightness,
        alpha,
        mode,
        setHue,
        setSaturation,
        setLightness,
        setAlpha,
        setMode,
      }}
    >
      <div
        className={cn('flex size-full flex-col gap-4', className)}
        {...props}
      />
    </ColorPickerContext.Provider>
  );
};

export type ColorPickerSelectionProps = HTMLAttributes<HTMLDivElement>;

export const ColorPickerSelection = memo(
  ({ className, ...props }: ColorPickerSelectionProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const { hue, saturation, lightness, setSaturation, setLightness } =
      useColorPicker();

    const backgroundGradient = useMemo(() => {
      return `linear-gradient(0deg, rgba(0,0,0,1), rgba(0,0,0,0)),
            linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0)),
            hsl(${hue}, 100%, 50%)`;
    }, [hue]);

    // Derive coordinates directly from saturation and lightness state
    const x = saturation / 100;
    const topLightness = x < 0.01 ? 100 : 50 + 50 * (1 - x);
    const positionX = Math.max(0, Math.min(1, x));
    const positionY = Math.max(0, Math.min(1, 1 - lightness / topLightness));

    const handlePointerMove = useCallback(
      (event: PointerEvent) => {
        if (!(isDragging && containerRef.current)) {
          return;
        }
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(
          0,
          Math.min(1, (event.clientX - rect.left) / rect.width)
        );
        const y = Math.max(
          0,
          Math.min(1, (event.clientY - rect.top) / rect.height)
        );

        setSaturation(x * 100);
        const topLightness = x < 0.01 ? 100 : 50 + 50 * (1 - x);
        const newLightness = topLightness * (1 - y);
        setLightness(newLightness);
      },
      [isDragging, setSaturation, setLightness]
    );

    useEffect(() => {
      const handlePointerUp = () => setIsDragging(false);

      if (isDragging) {
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
      }

      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      };
    }, [isDragging, handlePointerMove]);

    return (
      <div
        className={cn('relative size-full cursor-crosshair rounded', className)}
        onPointerDown={(e) => {
          e.preventDefault();
          setIsDragging(true);
          // Delay action to coordinate client rect accurately
          setTimeout(() => {
            if (containerRef.current) {
              const rect = containerRef.current.getBoundingClientRect();
              const x = Math.max(
                0,
                Math.min(1, (e.clientX - rect.left) / rect.width)
              );
              const y = Math.max(
                0,
                Math.min(1, (e.clientY - rect.top) / rect.height)
              );
              setSaturation(x * 100);
              const topLightness = x < 0.01 ? 100 : 50 + 50 * (1 - x);
              const newLightness = topLightness * (1 - y);
              setLightness(newLightness);
            }
          }, 0);
        }}
        ref={containerRef}
        style={{
          background: backgroundGradient,
        }}
        {...props}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute h-4 w-4 rounded-full border-2 border-white"
          style={{
            left: `${positionX * 100}%`,
            top: `${positionY * 100}%`,
            boxShadow: '0 0 0 1px rgba(0,0,0,0.5)',
          }}
        />
      </div>
    );
  }
);

ColorPickerSelection.displayName = 'ColorPickerSelection';

export type ColorPickerHueProps = React.ComponentPropsWithoutRef<
  typeof SliderPrimitive.Root
>;

export const ColorPickerHue = ({
  className,
  ...props
}: ColorPickerHueProps) => {
  const { hue, setHue } = useColorPicker();

  return (
    <SliderPrimitive.Root
      className={cn('w-full data-horizontal:w-full', className)}
      max={360}
      onValueChange={(val) => setHue(Array.isArray(val) ? val[0] : val)}
      step={1}
      value={[hue]}
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none h-4">
        <SliderPrimitive.Track className="relative grow h-3 rounded-full bg-[linear-gradient(90deg,#FF0000,#FFFF00,#00FF00,#00FFFF,#0000FF,#FF00FF,#FF0000)] select-none" />
        <SliderPrimitive.Thumb className="block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden" />
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
};

export type ColorPickerAlphaProps = React.ComponentPropsWithoutRef<
  typeof SliderPrimitive.Root
>;

export const ColorPickerAlpha = ({
  className,
  ...props
}: ColorPickerAlphaProps) => {
  const { alpha, setAlpha } = useColorPicker();

  return (
    <SliderPrimitive.Root
      className={cn('w-full data-horizontal:w-full', className)}
      max={100}
      onValueChange={(val) => setAlpha(Array.isArray(val) ? val[0] : val)}
      step={1}
      value={[alpha]}
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none h-4">
        <SliderPrimitive.Track
          className="relative grow h-3 rounded-full overflow-hidden select-none"
          style={{
            background:
              'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==") left center',
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent to-black/50" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden" />
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
};

export type ColorPickerEyeDropperProps = ComponentProps<typeof Button>;

export const ColorPickerEyeDropper = ({
  className,
  ...props
}: ColorPickerEyeDropperProps) => {
  const { setHue, setSaturation, setLightness, setAlpha } = useColorPicker();

  const handleEyeDropper = async () => {
    try {
      // @ts-expect-error - EyeDropper API is experimental
      const eyeDropper = new EyeDropper();
      const result = await eyeDropper.open();
      const color = Color(result.sRGBHex);
      const [h, s, l] = color.hsl().array();

      setHue(h);
      setSaturation(s);
      setLightness(l);
      setAlpha(100);
    } catch (error) {
      console.error('EyeDropper failed:', error);
    }
  };

  return (
    <Button
      className={cn('shrink-0 text-muted-foreground', className)}
      onClick={handleEyeDropper}
      size="icon"
      type="button"
      variant="outline"
      {...props}
    >
      <Pipette size={16} />
    </Button>
  );
};

export type ColorPickerOutputProps = ComponentProps<typeof SelectTrigger>;

const formats = ['hex', 'rgb', 'hsl'];

export const ColorPickerOutput = ({
  className,
  ...props
}: ColorPickerOutputProps) => {
  const { mode, setMode } = useColorPicker();

  return (
    <Select
      onValueChange={(val) => {
        if (val) setMode(val);
      }}
      value={mode}
    >
      <SelectTrigger
        className={cn('h-8 w-20 shrink-0 text-xs', className)}
        {...props}
      >
        <SelectValue placeholder="Mode" />
      </SelectTrigger>
      <SelectContent>
        {formats.map((format) => (
          <SelectItem
            className="text-xs cursor-pointer"
            key={format}
            value={format}
          >
            {format.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

type PercentageInputProps = ComponentProps<typeof Input>;

const PercentageInput = ({ className, ...props }: PercentageInputProps) => {
  return (
    <div className="relative">
      <Input
        readOnly
        type="text"
        {...props}
        className={cn(
          'h-8 w-[3.25rem] rounded-l-none bg-secondary px-2 text-xs shadow-none',
          className
        )}
      />
      <span className="-translate-y-1/2 absolute top-1/2 right-2 text-muted-foreground text-xs">
        %
      </span>
    </div>
  );
};

export type ColorPickerFormatProps = HTMLAttributes<HTMLDivElement>;

export const ColorPickerFormat = ({
  className,
  ...props
}: ColorPickerFormatProps) => {
  const { hue, saturation, lightness, alpha, mode } = useColorPicker();
  const color = Color.hsl(hue, saturation, lightness, alpha / 100);

  if (mode === 'hex') {
    const hex = color.hex();

    return (
      <div
        className={cn(
          '-space-x-px relative flex w-full items-center rounded-md shadow-sm',
          className
        )}
        {...props}
      >
        <Input
          className="h-8 rounded-r-none bg-secondary px-2 text-xs shadow-none"
          readOnly
          type="text"
          value={hex}
        />
        <PercentageInput value={alpha} />
      </div>
    );
  }

  if (mode === 'rgb') {
    const rgb = color
      .rgb()
      .array()
      .map((value) => Math.round(value));

    return (
      <div
        className={cn(
          '-space-x-px flex items-center rounded-md shadow-sm',
          className
        )}
        {...props}
      >
        {rgb.map((value, index) => (
          <Input
            className={cn(
              'h-8 rounded-r-none bg-secondary px-2 text-xs shadow-none',
              index && 'rounded-l-none',
              className
            )}
            key={index}
            readOnly
            type="text"
            value={value}
          />
        ))}
        <PercentageInput value={alpha} />
      </div>
    );
  }

  if (mode === 'hsl') {
    const hsl = color
      .hsl()
      .array()
      .map((value) => Math.round(value));

    return (
      <div
        className={cn(
          '-space-x-px flex items-center rounded-md shadow-sm',
          className
        )}
        {...props}
      >
        {hsl.map((value, index) => (
          <Input
            className={cn(
              'h-8 rounded-r-none bg-secondary px-2 text-xs shadow-none',
              index && 'rounded-l-none',
              className
            )}
            key={index}
            readOnly
            type="text"
            value={value}
          />
        ))}
        <PercentageInput value={alpha} />
      </div>
    );
  }

  return null;
};
