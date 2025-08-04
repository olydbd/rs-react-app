import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="flex items-center justify-center px-4 py-10 text-center">
      <div className="w-full max-w-xl rounded-lg p-8 shadow-md dark:bg-gray-700">
        <h1 className="mb-4 text-2xl font-bold dark:text-white">About Me</h1>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Hi! My name is <strong>Olya</strong>.{' '}
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            className="text-[#BFDE42] hover:underline dark:text-fuchsia-400"
            rel="noreferrer"
          >
            RS School
          </a>
          .
        </p>
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
