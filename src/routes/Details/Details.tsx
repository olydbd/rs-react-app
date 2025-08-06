import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';

export default function Details() {
  const character = useLoaderData();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleOverlayClick = () => {
    navigate({
      pathname: '/',
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
        className="animate-slide-in absolute top-0 right-0 h-full w-full overflow-y-auto bg-white p-6 shadow-xl md:w-1/3 dark:bg-gray-700"
      >
        <img
          src={character.image}
          alt={character.name}
          className="mb-4 w-full rounded"
        />
        <ul className="space-y-2 dark:text-white">
          <li className="text-xl">
            <strong>Galactic Registry — Citadel of Ricks</strong>
          </li>
          <li>
            <strong>Subject: </strong> {character.name}
          </li>
          <li>
            <strong>Species: </strong> {character.species}
          </li>
          <li>
            <strong>Gender: </strong> {character.gender}
          </li>
          <li>
            <strong>Status: </strong> {character.status}
          </li>
          <li>
            <strong>Last Known Location: </strong>{' '}
            {character.location.name !== 'unknown'
              ? character.location.name
              : 'Location data is currently unavailable.'}
          </li>
          <li>
            <strong>Origin: </strong>{' '}
            {character.origin.name !== 'unknown'
              ? character.origin.name
              : 'Origin details remain unverified or classified.'}
          </li>
          <li>
            <strong>Notes:</strong>{' '}
            {`Subject exhibits typical behavior for species ${character.species}, with no exceptional traits reported. Current status ${character.status !== 'unknown' ? 'confirmed' : 'currently unverified or unknown'}, though subject's survival beyond this report is subject to cosmic probability and/or Rick-level chaos.`}
          </li>
          <li>
            {character.origin.name !== 'unknown' ? (
              <>
                Origin details have been recorded as{' '}
                <strong>{character.origin.name}</strong>.
              </>
            ) : (
              <>Origin details remain unverified or classified.</>
            )}
          </li>
          <li>
            {character.location.name !== 'unknown' ? (
              <>
                Last known location is documented as{' '}
                <strong>{character.location.name}</strong>.
              </>
            ) : (
              <>Location data is currently unavailable.</>
            )}
          </li>
          <li>Monitoring continues.</li>
        </ul>
      </div>
    </div>
  );
}
