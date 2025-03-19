import React, { Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  ScrollRestoration,
} from 'react-router';
import { authLoader } from './loader';
// TODO: lazy loading, alias 적용
import Layout from '../layouts/default';
import Loading from '../components/Loading';
import HomePage from '../pages/HomePage';
import MyPage from '../pages/MyPage';
import MyCoursePage from '../pages/MyCoursePage';
import CourseDetailPage from '../pages/CourseDetailPage';
import AiRecommendPage from '../pages/AiRecommendPage';
import CulturePage from '../pages/CulturePage';
import CultureDetailPage from '../pages/CultureDetailPage';
import NotificationsPage from '../pages/NotificationsPage';
import MapPage from '../pages/MapPage';
import CommunityPage from '../pages/CommunityPage';

const LoginPage = React.lazy(() => import('@/pages/LoginPage'));

const Root = () => {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <ScrollRestoration />
    </Layout>
  );
};

const routes: RouteObject[] = [
  {
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/community', element: <CommunityPage /> },
      { path: '/my-page', element: <MyPage />, loader: authLoader },
      { path: '/course', element: <MyCoursePage />, loader: authLoader },
      {
        path: '/course/:id',
        element: <CourseDetailPage />,
        loader: authLoader,
      },
      { path: '/ai-recommend', element: <AiRecommendPage /> },
      {
        path: '/culture',
        element: <CulturePage />,
      },
      {
        path: '/culture/:type/:id',
        element: <CultureDetailPage />,
      },
      {
        path: '/notifications',
        element: <NotificationsPage />,
        loader: authLoader,
      },
    ],
  },
  { path: '/map', element: <MapPage /> },
  { path: '*', element: <Navigate to="/" /> },
];

export const router = createBrowserRouter(routes);
