import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center dark:bg-gray-900">
      <div className="text-center">
        <h1 className="font-bold dark:text-white">PAGE NOT FOUND</h1>
        <Link
          to="/"
          className="mt-4 inline-block rounded bg-[#BFDE42] px-4 py-2 text-white transition hover:bg-[#acc05a] dark:bg-fuchsia-400 hover:dark:bg-fuchsia-600"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
