interface Props {
  error: Error | null;
  onReset: () => void;
}

export default function ErrorFallback(props: Props) {
  const { error, onReset } = props;

  return (
    <div className="w-full p-10 text-center">
      <h2>Something went wrong</h2>
      <p className="py-5 font-bold">
        {error?.message || 'Unknown error occurred'}
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
