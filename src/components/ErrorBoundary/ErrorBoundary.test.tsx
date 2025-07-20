import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

vi.mock('./ErrorFallback', () => ({
  default: ({ error, onReset }: { error: Error; onReset: () => void }) => (
    <div role="fallback">
      <p>{error.message}</p>
      <button onClick={onReset}>Try again</button>
    </div>
  ),
}));

const ThrowErrorComponent = () => {
  throw new Error('Test error');
};

const ErrorButton = () => {
  const [error, setError] = useState(false);

  if (error) {
    throw new Error('Button error');
  }

  return <button onClick={() => setError(true)}>Error button</button>;
};

describe('Error Boundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Error Catching Tests', () => {
    it('catches errors and display fallback UI', () => {
      render(
        <ErrorBoundary>
          <ThrowErrorComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText('Test error')).toBeInTheDocument();
    });

    it('logs error to console', () => {
      render(
        <ErrorBoundary>
          <ThrowErrorComponent />
        </ErrorBoundary>
      );

      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('Error Button Tests', () => {
    it('throws error when test button is clicked', async () => {
      render(
        <ErrorBoundary>
          <ErrorButton />
        </ErrorBoundary>
      );

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(screen.getByText('Button error')).toBeInTheDocument();
    });

    it('triggers error boundary fallback UI', async () => {
      render(
        <ErrorBoundary>
          <ErrorButton />
        </ErrorBoundary>
      );

      const button = screen.getByRole('button');
      await userEvent.click(button);

      const fallback = screen.getByRole('fallback');
      expect(fallback).toBeInTheDocument();
    });
  });
});
