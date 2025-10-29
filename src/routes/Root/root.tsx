import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

export default function Root() {
  return (
    <>
      <ErrorBoundary>
        <Header />
        <main className="relative mx-auto min-h-screen bg-white transition-all duration-500 dark:bg-gray-900">
          <Outlet />
        </main>
      </ErrorBoundary>
    </>
  );
}
