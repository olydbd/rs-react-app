import {
  Link,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

export default function Details() {
  const character = useLoaderData();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleOverlayClick = () => {
    navigate({
      pathname: '/characters',
      search: searchParams.toString(),
    });
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 bg-black/40" onClick={handleOverlayClick}>
      <div
        onClick={handleModalClick}
        className="animate-slide-in absolute top-0 right-0 h-full w-full overflow-y-auto bg-white p-6 shadow-xl md:w-1/3"
      >
        <img
          src={character.image}
          alt={character.name}
          className="mb-4 w-full rounded"
        />
        <ul className="space-y-2">
          <li>
            <strong>{character.name}</strong>
          </li>
          <li>
            <strong>Status: </strong>
            {character.status}
          </li>
          <li>
            <strong>Species: </strong>
            {character.species}
          </li>
          <li>
            <strong>Gender: </strong>
            {character.gender}
          </li>
          <li>
            <strong>Location: </strong>
            {character.location?.name}
          </li>
          <li>
            <strong>Origin: </strong>
            {character.origin?.name}
          </li>
        </ul>

        <Link
          className="absolute right-0 bottom-0 p-5 text-[#BFDE42]"
          to={{ pathname: '/characters', search: searchParams.toString() }}
        >
          Close
        </Link>
      </div>
    </div>
  );
}
