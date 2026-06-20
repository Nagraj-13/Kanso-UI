import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RayCard } from '../ray-card';

describe('RayCard component', () => {
  it('renders metric variant values and labels correctly', () => {
    render(<RayCard variant="metric" value="99.9%" label="Uptime Guarantee" />);

    expect(screen.getByText('99.9%')).toBeInTheDocument();
    expect(screen.getByText('Uptime Guarantee')).toBeInTheDocument();
  });

  it('renders feature variant title and description correctly', () => {
    render(
      <RayCard
        variant="feature"
        title="Custom Analytics"
        label="Track and gather important visitor details in real-time."
      />
    );

    expect(screen.getByText('Custom Analytics')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Track and gather important visitor details in real-time.'
      )
    ).toBeInTheDocument();
  });

  it('renders custom variant children correctly', () => {
    render(
      <RayCard variant="custom">
        <div data-testid="custom-child-element">Custom Child</div>
      </RayCard>
    );

    expect(screen.getByTestId('custom-child-element')).toBeInTheDocument();
  });

  it('supports custom class names on wrapper container', () => {
    const { container } = render(<RayCard className="my-ray-card-test" />);

    const wrapper = container.querySelector('.my-ray-card-test');
    expect(wrapper).toBeInTheDocument();
  });

  it('toggles grid blueprint lines based on showGridLines prop', () => {
    const { container: withGrid } = render(<RayCard showGridLines={true} />);
    expect(withGrid.querySelector('.kanso-ray-card-topl')).toBeInTheDocument();

    const { container: withoutGrid } = render(
      <RayCard showGridLines={false} />
    );
    expect(withoutGrid.querySelector('.kanso-ray-card-topl')).toBeNull();
  });

  it('applies tracing animation duration style based on speed prop', () => {
    const { container } = render(<RayCard speed={12} />);

    const tracerDot = container.querySelector('.kanso-ray-card-dot');
    expect(tracerDot).toBeInTheDocument();

    const styleVal =
      container.querySelector('.outer-card-container')?.getAttribute('style') ||
      '';
    expect(styleVal).toContain('--speed: 12s');
  });

  it('applies style finish variant classes correctly', () => {
    const { container: glossy } = render(<RayCard styleVariant="glossy" />);
    expect(glossy.querySelector('.style-glossy')).toBeInTheDocument();

    const { container: matte } = render(<RayCard styleVariant="matte" />);
    expect(matte.querySelector('.style-matte')).toBeInTheDocument();
  });

  it('forwards component reference correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<RayCard ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
