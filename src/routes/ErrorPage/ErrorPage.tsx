import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  const message =
    error instanceof Error
      ? error.message
      : isRouteErrorResponse(error)
        ? `${error.status} ${error.statusText}`
        : 'Unknown error occurred';

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="text-center">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{message}</i>
        </p>
      </div>
    </div>
  );
}
