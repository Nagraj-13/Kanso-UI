import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn helper', () => {
  it('merges class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('handles conditional class names', () => {
    expect(cn('class1', true && 'class2', false && 'class3')).toBe(
      'class1 class2'
    );
  });

  it('resolves Tailwind conflicts correctly', () => {
    // p-4 and p-2 conflict; tailwind-merge should resolve to p-2
    expect(cn('p-4', 'p-2')).toBe('p-2');

    // bg-red-500 and bg-blue-500 conflict; last one wins
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });

  it('handles nested arrays or empty/falsy inputs gracefully', () => {
    expect(cn('class1', null, undefined, '', 'class2')).toBe('class1 class2');
    expect(cn(['class1', 'class2'])).toBe('class1 class2');
  });
});
