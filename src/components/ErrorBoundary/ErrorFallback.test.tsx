import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorFallback from './ErrorFallback';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('Error Fallback Component', () => {
  it('renders error messages from props', () => {
    const error = new Error('Test error');
    const onReset = vi.fn();

    render(<ErrorFallback error={error} onReset={onReset} />);

    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onReset when button is clicked', async () => {
    const error = new Error('Test error');
    const onReset = vi.fn();

    render(<ErrorFallback error={error} onReset={onReset} />);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
