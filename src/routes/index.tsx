import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/layouts';
import Home from '@/pages/home';
import Login from '@/pages/login';
import DefaultLayout from '@/layouts/default';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: '/login',
    element: <DefaultLayout />,
    children: [{ index: true, element: <Login /> }],
  },
]);
