import { Component, type ReactNode } from 'react';

interface Props {
  error: Error | null;
  onReset: () => void;
}

class ErrorFallback extends Component<Props> {
  render(): ReactNode {
    const { error, onReset } = this.props;
    return (
      <div>
        <h2>Something went wrong</h2>
        <p>{error?.message || 'Unknown error occured'}</p>
        <button onClick={onReset}>Try Again</button>
      </div>
    );
  }
}

export default ErrorFallback;
