import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserLoader } from '../browser-loader';

describe('BrowserLoader component', () => {
  it('renders loading text correctly in the mock browser window tab', () => {
    render(<BrowserLoader loadingText="Compiling code..." />);

    // Check if the loading text is rendered inside the SVG (using textContent)
    const textNode = screen.getByText('Compiling code...');
    expect(textNode).toBeInTheDocument();
  });

  it('supports custom className prop on container wrapper', () => {
    const { container } = render(
      <BrowserLoader className="test-custom-loader-class" />
    );

    const wrapper = container.querySelector('.test-custom-loader-class');
    expect(wrapper).toBeInTheDocument();
  });

  it('renders background grid lines by default', () => {
    const { container } = render(<BrowserLoader />);

    const gridGroup = container.querySelector('#grid');
    expect(gridGroup).toBeInTheDocument();
  });

  it('hides background grid lines when showGrid is false', () => {
    const { container } = render(<BrowserLoader showGrid={false} />);

    const gridGroup = container.querySelector('#grid');
    expect(gridGroup).toBeNull();
  });

  it('renders exactly 4 flowing trace paths', () => {
    const { container } = render(<BrowserLoader />);

    const tracePaths = container.querySelectorAll('#traces path');
    expect(tracePaths.length).toBe(4);
  });

  it('uses matching linear gradient definitions and references them', () => {
    const { container } = render(<BrowserLoader themeColor="indigo" />);

    const gradients = container.querySelectorAll('defs linearGradient');
    expect(gradients.length).toBe(4);

    // Verify each path stroke refers to a gradient ID
    const paths = container.querySelectorAll('#traces path');
    paths.forEach((path) => {
      const strokeVal = path.getAttribute('style') || '';
      expect(strokeVal).toContain('url(');
      expect(strokeVal).toContain('-traceGradient');
    });
  });

  it('renders browser layout elements when variant is browser', () => {
    const { container } = render(<BrowserLoader variant="browser" />);

    // Title block is 180 wide
    const titleBlock = container.querySelector('rect[width="180"]');
    expect(titleBlock).toBeInTheDocument();

    // Sidebar divider should not be present
    const sidebarDivider = container.querySelector('line[x1="330"]');
    expect(sidebarDivider).toBeNull();
  });

  it('renders sidebar layout elements when variant is sidebar', () => {
    const { container } = render(<BrowserLoader variant="sidebar" />);

    // Sidebar divider exists at x1="330"
    const sidebarDivider = container.querySelector('line[x1="330"]');
    expect(sidebarDivider).toBeInTheDocument();
  });

  it('renders dashboard layout elements when variant is dashboard', () => {
    const { container } = render(<BrowserLoader variant="dashboard" />);

    // Bar chart rectangles should exist (width is 12)
    const barSkeletons = container.querySelectorAll('rect[width="12"]');
    expect(barSkeletons.length).toBeGreaterThan(0);
  });
});
