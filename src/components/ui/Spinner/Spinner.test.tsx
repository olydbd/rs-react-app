import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Spinner from './Spinner';
import '@testing-library/jest-dom';

describe('Spinner Component', () => {
  it('renders loading indicator', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('has appropriate ARIA labels for screen readers', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAccessibleName('Loading...');
  });
});
