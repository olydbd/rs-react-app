import { render, screen } from '@testing-library/react';
import { useNavigation } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Root from './root';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigation: vi.fn(),
    Outlet: () => <div>Mock Outlet</div>,
  };
});

vi.mock('../../components/Header/Header', () => ({
  default: () => <div>Mock Header</div>,
}));

vi.mock('../../components/ui/Spinner/Spinner', () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));

describe('Root Component', () => {
  it('renders without spinner when not navigating', () => {
    vi.mocked(useNavigation).mockReturnValue({
      location: null,
    } as unknown as ReturnType<typeof useNavigation>);
    render(<Root />);

    expect(screen.getByText('Mock Header')).toBeVisible();
    expect(screen.getByText('Mock Outlet')).toBeVisible();
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });

  it('shows spinner when navigating', () => {
    vi.mocked(useNavigation).mockReturnValue({
      location: '/about',
    } as unknown as ReturnType<typeof useNavigation>);
    render(<Root />);

    expect(screen.getByTestId('spinner')).toBeVisible();
  });
});
