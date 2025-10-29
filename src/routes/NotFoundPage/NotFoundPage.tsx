import { Link } from 'react-router-dom';
import notFoundImage from '../../assets/images/404-sun.png';

export default function NotFoundPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center dark:bg-gray-900">
      <div className="max-w-md text-center">
        <h2 className="mb-10 font-bold dark:text-white">
          The page you are trying to search has been moved to another universe.
        </h2>

        <div className="mb-10 flex items-center justify-center text-9xl font-bold">
          <span className="dark:text-white">4</span>
          <img
            src={notFoundImage}
            alt="Rick Head"
            className="mx-4 h-[120px] w-[120px] object-contain"
          />
          <span className="dark:text-white">4</span>
        </div>

        <Link
          to="/"
          className="inline-block rounded-full bg-[#BFDE42] px-4 py-2 text-white transition hover:bg-[#acc05a] dark:bg-fuchsia-400 hover:dark:bg-fuchsia-600"
        >
          GET ME HOME
        </Link>
      </div>
    </div>
  );
}
