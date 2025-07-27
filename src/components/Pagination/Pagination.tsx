import { Link, useSearchParams } from 'react-router-dom';

const LENGTH = 7;

interface Props {
  current: number;
  total: number;
}

export default function Pagination({ current, total }: Props) {
  const [searchParams] = useSearchParams();

  const makePageLink = (page: string | number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', page.toString());
    return `?${newParams.toString()}`;
  };

  const head = [1, current > 3 ? '...' : 2].slice(0, total);
  const tail =
    total > 5
      ? [current < total - 3 ? '...' : total - 1, total].slice(
          Math.max(LENGTH - total, 0),
        )
      : [];
  const body = [
    Math.max(3, Math.min(current - 1, total - 4)),
    Math.max(4, Math.min(current, total - 3)),
    Math.max(5, Math.min(current + 1, total - 2)),
  ].slice(0, total - 2);
  const pages = [...head, ...body, ...tail];

  return (
    <div className="my-4 flex justify-center gap-2">
      <Link
        to={makePageLink(current - 1)}
        className={`rounded px-3 py-1 transition ${current === 1 ? 'pointer-events-none text-gray-500' : 'text-black hover:text-gray-500'}`}
      >
        &larr;
      </Link>
      {pages.map((p, i) => {
        const isActive = current === p || p === '...';

        return (
          <Link
            key={i}
            to={makePageLink(p)}
            className={`rounded px-3 py-1 transition ${isActive ? 'pointer-events-none text-black' : 'text-gray-500 hover:text-black'}`}
          >
            {p}
          </Link>
        );
      })}

      <Link
        to={makePageLink(current + 1)}
        className={`rounded px-3 py-1 transition ${current === total ? 'pointer-events-none text-gray-500' : 'text-black hover:text-gray-500'}`}
      >
        &rarr;
      </Link>
    </div>
  );
}
