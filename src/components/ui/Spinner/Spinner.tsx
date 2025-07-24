import { Component, type ReactNode } from 'react';

class Spinner extends Component {
  render(): ReactNode {
    return (
      <div
        aria-label="Loading..."
        role="status"
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      />
    );
  }
}

export default Spinner;
