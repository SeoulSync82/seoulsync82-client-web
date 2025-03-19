import React, { Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  ScrollRestoration,
} from 'react-router';
import { authLoader } from './loader';
import Layout from '@/layouts/default';
import Loading from '@/components/Loading';
import { ErrorBoundaryWrapper } from '@/components/ErrorBoundary';

const HomePage = React.lazy(() => import('@/pages/HomePage'));
const MyPage = React.lazy(() => import('@/pages/MyPage'));
const MyCoursePage = React.lazy(() => import('@/pages/MyCoursePage'));
const CourseDetailPage = React.lazy(() => import('@/pages/CourseDetailPage'));
const AiRecommendPage = React.lazy(() => import('@/pages/AiRecommendPage'));
const CulturePage = React.lazy(() => import('@/pages/CulturePage'));
const CultureDetailPage = React.lazy(() => import('@/pages/CultureDetailPage'));
const NotificationsPage = React.lazy(() => import('@/pages/NotificationsPage'));
const MapPage = React.lazy(() => import('@/pages/MapPage'));
const CommunityPage = React.lazy(() => import('@/pages/CommunityPage'));
const LoginPage = React.lazy(() => import('@/pages/LoginPage'));

const Root = () => {
  return (
    <Layout>
      <ErrorBoundaryWrapper>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </ErrorBoundaryWrapper>
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
