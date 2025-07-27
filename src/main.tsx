import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root/root.tsx';
import About from './routes/About/About.tsx';
import ErrorPage from './routes/ErrorPage/ErrorPage.tsx';
import NotFoundPage from './routes/NotFoundPage/NotFoundPage.tsx';
import Main from './routes/Main/Main.tsx';
import { detailsLoader, mainLoader } from './services/loaders.ts';
import Details from './routes/Details/Details.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Main />,
        loader: mainLoader,
      },
      {
        path: 'characters',
        element: <Main />,
        loader: mainLoader,
        children: [
          {
            path: ':characterId',
            element: <Details />,
            loader: detailsLoader,
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
    <RouterProvider router={router} />
  </StrictMode>,
);
