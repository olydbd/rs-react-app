import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorPage from './ErrorPage';
import { useRouteError } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useRouteError: vi.fn(),
    isRouteErrorResponse: vi.fn(() => false),
  };
});

describe('ErrorPage', () => {
  it('renders error message from Error object', () => {
    (useRouteError as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      new Error('Something went wrong'),
    );

    render(<ErrorPage />);

    expect(screen.getByText('Oops!')).toBeVisible();
    expect(screen.getByText('Something went wrong')).toBeVisible();
  });

  it('renders fallback message for unknown error', () => {
    (useRouteError as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      null,
    );

    render(<ErrorPage />);

    expect(screen.getByText('Unknown error occurred')).toBeVisible();
  });
});
