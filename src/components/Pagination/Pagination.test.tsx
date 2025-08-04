import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import type { ReactElement } from 'react';
import Pagination from './Pagination';
import { MemoryRouter } from 'react-router-dom';

function renderWithRouter(ui: ReactElement, route = '/?page=2') {
  window.history.pushState({}, 'Test page', route);
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('Pagination Component', () => {
  it.each(['1', '2', '3', '4', '5', '→', '←'])(
    'render pagination item %s',
    (i) => {
      renderWithRouter(<Pagination current={2} total={5} />);
      expect(screen.getByText(i)).toBeVisible();
    },
  );

  it('disables prev arrow on first page', () => {
    renderWithRouter(<Pagination current={1} total={5} />);
    const prev = screen.getByText('←');
    expect(prev).toHaveClass('pointer-events-none');
  });

  it('disables next arrow on last page', () => {
    renderWithRouter(<Pagination current={5} total={5} />);
    const next = screen.getByText('→');
    expect(next).toHaveClass('pointer-events-none');
  });

  it('disables current page button', () => {
    renderWithRouter(<Pagination current={3} total={5} />);
    const currentPage = screen.getByText('3');
    expect(currentPage).toHaveClass('pointer-events-none');
  });
});
