import { Component, type ReactNode } from 'react';

interface Props {
  error: Error | null;
}

class ErrorFallback extends Component<Props> {
  render(): ReactNode {
    const { error } = this.props;
    return (
      <div>
        <h2>Something went wrong</h2>
        <p>{error?.message || 'Unknown error occured'}</p>
        <p>Please reload the page and try again</p>
      </div>
    );
  }
}

export default ErrorFallback;
