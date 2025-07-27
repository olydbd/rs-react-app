import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from './About';
import { describe, it, expect } from 'vitest';

describe('About Component', () => {
  it('renders heading and content correctly', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    expect(screen.getByText('About Me')).toBeVisible();
    expect(screen.getByText(/Hi! My name is/i)).toBeVisible();
    expect(screen.getByRole('link', { name: /RS School/i })).toHaveAttribute(
      'href',
      expect.stringContaining('rs.school'),
    );
    expect(screen.getByRole('link', { name: /Back to Home/i })).toHaveAttribute(
      'href',
      '/',
    );
  });
});
