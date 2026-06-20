import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GlowCard } from '../glow-card';

describe('GlowCard component', () => {
  it('renders children correctly', () => {
    render(<GlowCard>Glow Content</GlowCard>);
    expect(screen.getByText('Glow Content')).toBeInTheDocument();
  });

  it('applies border and shadow classes by default', () => {
    const { container } = render(<GlowCard>Content</GlowCard>);
    const card = container.querySelector(
      '.rounded-\\[32px\\]'
    ) as HTMLDivElement;
    expect(card).toHaveClass('bg-[#05070b]');
    expect(card).toHaveClass('shadow-[0_8px_32px_rgba(0,0,0,0.5)]');
  });

  it('supports custom className prop', () => {
    const { container } = render(
      <GlowCard className="custom-glow-123">Content</GlowCard>
    );
    const card = container.querySelector(
      '.rounded-\\[32px\\]'
    ) as HTMLDivElement;
    expect(card).toHaveClass('custom-glow-123');
  });
});
