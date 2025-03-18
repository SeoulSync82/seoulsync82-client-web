import React, { Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  ScrollRestoration,
} from 'react-router';
import Layout from '@/layouts/default';
import Loading from '@/components/Loading';
import { authLoader } from './loader';
// TODO: lazy loading
import HomePage from '@/pages/Home';
import MyPage from '@/pages/MyPage';
import MyCoursePage from '@/pages/Course';
import CourseDetailPage from '@/pages/Course/CourseDetail';
import AiRecommendPage from '@/pages/AiRecommendPage';
import CulturePage from '@/pages/Culture';
import CultureDetailPage from '@/pages/Culture/CultureDetail';
import NotificationsPage from '@/pages/Notifications';
import MapPage from '@/pages/Map';
import CommunityPage from '@/pages/Community';
import LoginPage from '@/pages/Login';

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
