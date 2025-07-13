import { Component, type ReactNode } from 'react';

interface Props {
  error: Error | null;
  onReset: () => void;
}

class ErrorFallback extends Component<Props> {
  render(): ReactNode {
    const { error, onReset } = this.props;
    return (
      <div className="w-full p-10 text-center">
        <h2>Something went wrong</h2>
        <p className="py-5 font-bold">
          {error?.message || 'Unknown error occured'}
        </p>
        <button
          className="cursor-pointer rounded-full bg-[#48699b] px-6 py-2 text-xs font-medium text-white uppercase hover:bg-[#2e4464]"
          onClick={onReset}
        >
          Try Again
        </button>
      </div>
    );
  }
}

export default ErrorFallback;
