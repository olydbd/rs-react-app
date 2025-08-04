interface Props {
  error: Error | null;
  onReset: () => void;
}

export default function ErrorFallback(props: Props) {
  const { error, onReset } = props;

  return (
    <div className="flex h-screen w-screen items-center justify-center dark:bg-gray-900">
      <div className="text-center">
        <h2 className="dark:text-white">Something went wrong</h2>
        <p className="py-5 font-bold dark:text-white">
          {error?.message || 'Unknown error occurred'}
        </p>
        <button
          className="cursor-pointer rounded-full bg-[#48699b] px-6 py-2 text-xs font-medium text-white uppercase hover:bg-[#2e4464] dark:bg-fuchsia-400 hover:dark:bg-fuchsia-600"
          onClick={onReset}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
