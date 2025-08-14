import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useGetCharacterByIdQuery } from '../../services/character';
import Spinner from '../../components/ui/Spinner/Spinner';
import Button from '../../components/ui/Button/Button';
import CardDetails from '../../components/CardDetails/CardDetails';

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
        {data && <CardDetails data={data} />}
        <div className="flex items-center justify-center pt-10">
          <Button onClick={refetch}>Refresh ↻</Button>
        </div>
      </div>
    </div>
  );
}
