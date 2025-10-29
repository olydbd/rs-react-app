import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root/root.tsx';
import About from './routes/About/About.tsx';
import ErrorPage from './routes/ErrorPage/ErrorPage.tsx';
import NotFoundPage from './routes/NotFoundPage/NotFoundPage.tsx';
import Main from './routes/Main/Main.tsx';
import Details from './routes/Details/Details.tsx';
import ThemeProvider from './components/contexts/theme/provider.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'characters',
        element: <Main />,
        children: [
          {
            path: ':characterId',
            element: <Details />,
          },
        ],
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
