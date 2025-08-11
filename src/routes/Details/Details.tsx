import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useGetCharacterByIdQuery } from '../../services/character';
import Spinner from '../../components/ui/Spinner/Spinner';
import Button from '../../components/ui/Button/Button';

export default function Details() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { characterId } = useParams();

  if (!characterId) throw new Error('Character ID is missing');

  const { data, isError, isLoading, refetch } =
    useGetCharacterByIdQuery(characterId);

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
        {isLoading && (
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        )}
        {isError && (
          <div className="flex h-full items-center justify-center">
            <p className="font-bold text-red-500">Error occurred</p>
          </div>
        )}
        {data && (
          <>
            <img
              src={data.image}
              alt={data.name}
              className="mb-4 w-full rounded"
            />
            <ul className="space-y-2 dark:text-white">
              <li className="text-xl">
                <strong>Galactic Registry — Citadel of Ricks</strong>
              </li>
              <li>
                <strong>Subject: </strong> {data.name}
              </li>
              <li>
                <strong>Species: </strong> {data.species}
              </li>
              <li>
                <strong>Gender: </strong> {data.gender}
              </li>
              <li>
                <strong>Status: </strong> {data.status}
              </li>
              <li>
                <strong>Last Known Location: </strong>{' '}
                {data.location.name !== 'unknown'
                  ? data.location.name
                  : 'Location data is currently unavailable.'}
              </li>
              <li>
                <strong>Origin: </strong>{' '}
                {data.origin.name !== 'unknown'
                  ? data.origin.name
                  : 'Origin details remain unverified or classified.'}
              </li>
              <li>
                <strong>Notes:</strong>{' '}
                {`Subject exhibits typical behavior for species ${data.species}, with no exceptional traits reported. Current status ${data.status !== 'unknown' ? 'confirmed' : 'currently unverified or unknown'}, though subject's survival beyond this report is subject to cosmic probability and/or Rick-level chaos.`}
              </li>
              <li>
                {data.origin.name !== 'unknown' ? (
                  <>
                    Origin details have been recorded as{' '}
                    <strong>{data.origin.name}</strong>.
                  </>
                ) : (
                  <>Origin details remain unverified or classified.</>
                )}
              </li>
              <li>
                {data.location.name !== 'unknown' ? (
                  <>
                    Last known location is documented as{' '}
                    <strong>{data.location.name}</strong>.
                  </>
                ) : (
                  <>Location data is currently unavailable.</>
                )}
              </li>
              <li>Monitoring continues.</li>
            </ul>
          </>
        )}
        <div className="flex items-center justify-center pt-10">
          <Button onClick={() => refetch()}>Refresh</Button>
        </div>
      </div>
    </div>
  );
}
