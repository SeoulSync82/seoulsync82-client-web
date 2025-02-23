import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@/assets/styles/index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalPortal } from './components/GlobalPortal.tsx';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <GlobalPortal.Provider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </GlobalPortal.Provider>,
);
