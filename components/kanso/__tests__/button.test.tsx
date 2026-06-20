import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../button';

describe('Button component', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument();
  });

  it('applies default variant, size, and color classes', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });

    // Default variants include 'bg-zinc-950', 'text-zinc-50' (compound variant for zinc/primary)
    expect(button).toHaveClass('bg-zinc-950');
    expect(button).toHaveClass('text-zinc-50');
  });

  it('supports custom variant, size, and color combinations', () => {
    render(
      <Button variant="outline" size="sm" color="blue">
        Custom Button
      </Button>
    );
    const button = screen.getByRole('button', { name: /custom button/i });

    // Compound variant for outline/blue: border-blue-200, text-blue-600
    expect(button).toHaveClass('border-blue-200');
    expect(button).toHaveClass('text-blue-600');

    // Size sm: h-8.5 rounded-md px-3 text-xs
    expect(button).toHaveClass('h-8.5');
  });

  it('supports custom className prop', () => {
    render(<Button className="custom-class-123">Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass('custom-class-123');
  });

  it('disables the button when inactive is true', () => {
    render(<Button inactive>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeDisabled();
  });

  it('handles click events when enabled', async () => {
    let clicked = false;
    render(
      <Button
        onClick={() => {
          clicked = true;
        }}
      >
        Click me
      </Button>
    );
    const button = screen.getByRole('button', { name: /click me/i });

    await userEvent.click(button);
    expect(clicked).toBe(true);
  });

  it('does not trigger click event when disabled/inactive', async () => {
    let clicked = false;
    render(
      <Button
        inactive
        onClick={() => {
          clicked = true;
        }}
      >
        Click me
      </Button>
    );
    const button = screen.getByRole('button', { name: /click me/i });

    await userEvent.click(button);
    expect(clicked).toBe(false);
  });

  it('forwards refs correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Click me</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
