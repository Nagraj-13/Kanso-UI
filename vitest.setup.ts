import '@testing-library/jest-dom';
import ResizeObserver from 'resize-observer-polyfill';

// Polyfill ResizeObserver globally using a real polyfill implementation
global.ResizeObserver = ResizeObserver;

// Provide a standard compliant window.matchMedia implementation
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {}, // Deprecated
      removeListener: () => {}, // Deprecated
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}
