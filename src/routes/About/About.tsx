import { Link } from 'react-router-dom';
import Title from '../../components/Title/Title';

export default function About() {
  return (
    <div className="flex flex-col items-center px-4 text-center">
      <Title text="About Me" />
      <div className="w-full max-w-xl rounded-lg p-8 shadow-md dark:bg-gray-700">
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Hi! My name is <strong>Olya</strong>. I&apos;ve completed training at{' '}
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            className="text-[#BFDE42] hover:underline dark:text-fuchsia-400"
            rel="noreferrer"
          >
            RS School
          </a>
          . You can view my work on{' '}
          <a
            href="https://github.com/olydbd"
            target="_blank"
            className="text-[#BFDE42] hover:underline dark:text-fuchsia-400"
            rel="noreferrer"
          >
            GitHub
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
