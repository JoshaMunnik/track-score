import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button.tsx';
import {describe, expect, it, vi} from "vitest";
import {ButtonType} from "../../../../types/enums/ui/ButtonType.ts";

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Submit</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as <button> when no special props are set', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button.tagName).toBe('BUTTON');
  });

  it('renders as <a> when href is provided', () => {
    render(<Button href="https://example.com">Click me</Button>);
    const link = screen.getByRole('link');
    expect(link.tagName).toBe('A');
  });

  it('renders as <a> when to is provided', () => {
    render(<Button to="/path">Click me</Button>);
    const link = screen.getByRole('link');
    expect(link.tagName).toBe('A'); // React Router Link renders as <a>
  });

  it('renders as <span> when passive prop is true', () => {
    render(<Button passive={true}>Click me</Button>);
    const span = screen.getByText('Click me');
    expect(span?.tagName).toBe('SPAN');
  });

  it('renders as <span> when type is Disabled', () => {
    render(<Button type={ButtonType.Disabled}>Click me</Button>);
    const span = screen.getByText('Click me');
    expect(span?.tagName).toBe('SPAN');
  });

  it('renders as <span> when type is Selected', () => {
    render(<Button type={ButtonType.Selected}>Click me</Button>);
    const span = screen.getByText('Click me');
    expect(span?.tagName).toBe('SPAN');
  });
});
