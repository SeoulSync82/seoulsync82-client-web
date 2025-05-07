import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { useAuthHandler } from '@/hooks/useAuthHandler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalPortal } from '@/context/GlobalPortal';
import { ToastProvider } from '@/context/ToastContext';

const queryClient = new QueryClient();

export default function App() {
  useAuthHandler();

  return (
    <GlobalPortal.Provider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </QueryClientProvider>
    </GlobalPortal.Provider>
  );
}
