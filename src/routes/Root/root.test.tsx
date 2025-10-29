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

describe('Root Component', () => {
  it('renders without spinner when not navigating', () => {
    vi.mocked(useNavigation).mockReturnValue({
      location: null,
    } as unknown as ReturnType<typeof useNavigation>);
    render(<Root />);

    expect(screen.getByText('Mock Header')).toBeVisible();
    expect(screen.getByText('Mock Outlet')).toBeVisible();
  });
});
