import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotFoundPage from './NotFoundPage';
import { MemoryRouter } from 'react-router-dom';

describe('NotFoundPage', () => {
  it('renders 404 message and back link', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 2 })).toBeVisible();
    expect(screen.getByRole('link', { name: /GET ME HOME/i })).toHaveAttribute(
      'href',
      '/',
    );
  });
});
