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

const Home = React.lazy(() => import('@/pages/Home'));
const MyPage = React.lazy(() => import('@/pages/MyPage'));
const MyCourse = React.lazy(() => import('@/pages/Course'));
const CourseDetail = React.lazy(() => import('@/pages/Course/CourseDetail'));
const AiRecommendPage = React.lazy(() => import('@/pages/AiRecommendPage'));
const Culture = React.lazy(() => import('@/pages/Culture'));
const CultureDetail = React.lazy(() => import('@/pages/Culture/CultureDetail'));
const Notifications = React.lazy(() => import('@/pages/Notifications'));
const Map = React.lazy(() => import('@/pages/Map'));
const Community = React.lazy(() => import('@/pages/Community'));
const Login = React.lazy(() => import('@/pages/Login'));

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
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/community', element: <Community /> },
      { path: '/my-page', element: <MyPage />, loader: authLoader },
      { path: '/course', element: <MyCourse />, loader: authLoader },
      {
        path: '/course/:id',
        element: <CourseDetail />,
        loader: authLoader,
      },
      { path: '/ai-recommend', element: <AiRecommendPage /> },
      {
        path: '/culture',
        element: <Culture />,
      },
      {
        path: '/culture/:type/:id',
        element: <CultureDetail />,
      },
      {
        path: '/notifications',
        element: <Notifications />,
        loader: authLoader,
      },
    ],
  },
  { path: '/map', element: <Map /> },
  { path: '*', element: <Navigate to="/" /> },
];

export const router = createBrowserRouter(routes);
