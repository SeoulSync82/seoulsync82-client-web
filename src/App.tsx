import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { useAuthHandler } from '@/hooks/useAuthHandler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalPortal } from '@/context/GlobalPortal';

const queryClient = new QueryClient();

export default function App() {
  useAuthHandler();

  return (
    <GlobalPortal.Provider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </GlobalPortal.Provider>
  );
}