import { Outlet, useNavigation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import Spinner from '../../components/ui/Spinner/Spinner';

export default function Root() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <>
      <ErrorBoundary>
        <Header />
        <main className="relative mx-auto min-h-screen bg-white transition-all duration-500 dark:bg-gray-900">
          {isNavigating && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-gray-600/70">
              <Spinner />
            </div>
          )}
          <Outlet />
        </main>
      </ErrorBoundary>
    </>
  );
}
