import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KeyboardButton } from '../keyboard-button';

describe('KeyboardButton component', () => {
  it('renders children correctly', () => {
    render(<KeyboardButton>cmd</KeyboardButton>);
    expect(screen.getByRole('button', { name: /cmd/i })).toBeInTheDocument();
  });

  it('renders icon/symbol correctly', () => {
    render(<KeyboardButton icon="ctrl">Ctrl</KeyboardButton>);
    expect(screen.getByText('ctrl')).toBeInTheDocument();
  });

  it('applies default size (lg) and color (dark) classes', () => {
    const { container } = render(<KeyboardButton>cmd</KeyboardButton>);
    const button = container.firstChild as HTMLButtonElement;

    // Default size lg: h-[65px] min-w-[70px]
    expect(button).toHaveClass('h-[65px]');

    // Default variantColor dark: bg-zinc-900 text-zinc-100
    expect(button).toHaveClass('bg-zinc-900');
    expect(button).toHaveClass('text-zinc-100');
  });

  it('applies custom size (sm) and color (blue) classes correctly', () => {
    const { container } = render(
      <KeyboardButton size="sm" variantColor="blue">
        C
      </KeyboardButton>
    );
    const button = container.firstChild as HTMLButtonElement;

    // Size sm: h-[45px] min-w-[45px]
    expect(button).toHaveClass('h-[45px]');

    // VariantColor blue: bg-blue-600 text-white
    expect(button).toHaveClass('bg-blue-600');
    expect(button).toHaveClass('text-white');
  });

  it('handles clicks successfully', async () => {
    let clicked = false;
    render(
      <KeyboardButton
        onClick={() => {
          clicked = true;
        }}
      >
        click
      </KeyboardButton>
    );
    const button = screen.getByRole('button', { name: /click/i });

    await userEvent.click(button);
    expect(clicked).toBe(true);
  });
});
