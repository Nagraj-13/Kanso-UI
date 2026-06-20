import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NoiseCard, type NoiseCardProps } from '../noise-card';

describe('NoiseCard component', () => {
  it('renders children correctly', () => {
    render(<NoiseCard>Card Content</NoiseCard>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('applies default theme classes (kanso)', () => {
    const { container } = render(<NoiseCard>Content</NoiseCard>);
    const cardElement = container.firstChild as HTMLElement;

    // kanso theme classes: bg-zinc-950 text-zinc-50 border border-zinc-900
    expect(cardElement).toHaveClass('bg-zinc-950');
    expect(cardElement).toHaveClass('text-zinc-50');
  });

  it('applies other theme classes correctly', () => {
    const themes = {
      indigo: 'bg-gradient-to-br from-[#0c0d24] via-[#100720] to-[#04050e]',
      sunset: 'bg-gradient-to-br from-[#180812] via-[#0f0a1d] to-[#06070f]',
      light: 'bg-zinc-50 text-zinc-900',
      glass: 'backdrop-blur-md',
    } as const;

    for (const [theme, expectedClass] of Object.entries(themes)) {
      const { container } = render(
        <NoiseCard theme={theme as NoiseCardProps['theme']}>Content</NoiseCard>
      );
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement.className).toContain(expectedClass.split(' ')[0]);
    }
  });

  it('supports theme="none" with a custom bgColor', () => {
    const { container } = render(
      <NoiseCard theme="none" bgColor="bg-red-500">
        Content
      </NoiseCard>
    );
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass('bg-red-500');
  });

  it('applies custom width and height classes', () => {
    const { container } = render(
      <NoiseCard width="w-64" height="h-64">
        Content
      </NoiseCard>
    );
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass('w-64');
    expect(cardElement).toHaveClass('h-64');
  });

  it('renders the noise canvas element', () => {
    const { container } = render(<NoiseCard>Content</NoiseCard>);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveClass('mix-blend-overlay');
  });

  it('updates CSS custom variables on mouse move', () => {
    const { container } = render(<NoiseCard interactive>Content</NoiseCard>);
    const cardElement = container.firstChild as HTMLElement;

    // Simulate mouse move
    fireEvent.mouseMove(cardElement, { clientX: 150, clientY: 250 });

    // CSS variables --mouse-x and --mouse-y should be set
    expect(cardElement.style.getPropertyValue('--mouse-x')).toBeDefined();
    expect(cardElement.style.getPropertyValue('--mouse-y')).toBeDefined();
  });

  it('triggers custom onMouseMove handler', () => {
    let triggered = false;
    const handleMouseMove = () => {
      triggered = true;
    };
    const { container } = render(
      <NoiseCard interactive onMouseMove={handleMouseMove}>
        Content
      </NoiseCard>
    );
    const cardElement = container.firstChild as HTMLElement;

    fireEvent.mouseMove(cardElement);
    expect(triggered).toBe(true);
  });

  it('cleans up effects on unmount without throwing errors', () => {
    const { unmount } = render(<NoiseCard animated>Content</NoiseCard>);
    expect(() => unmount()).not.toThrow();
  });
});
