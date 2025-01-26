import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { useAuthHandler } from './hooks/useAuthHandler';

export default function App() {
  useAuthHandler();

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
