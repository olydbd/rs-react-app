import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="text-center">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error instanceof Error && error.message}</i>
        </p>
      </div>
    </div>
  );
}
