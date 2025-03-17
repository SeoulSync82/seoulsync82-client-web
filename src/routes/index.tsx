import { Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet, ScrollRestoration } from 'react-router';
import Layout from '@/layouts/default';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import MyCourse from '@/pages/Course';
import AiRecommend from '@/pages/AiRecommend';
import Community from '@/pages/Community';
import MyPage from '@/pages/MyPage';
import Culture from '@/pages/Culture';
import Notifications from '@/pages/Notifications';
import CultureDetail from '@/pages/Culture/CultureDetail';
import CourseDetail from '@/pages/Course/CourseDetail';
import Map from '@/pages/Map';
import Loading from '@/components/Loading';

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

const routes = [
  {
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/community', element: <Community /> },
      { path: '/my-page', element: <MyPage /> },
      { path: '/course', element: <MyCourse /> },
      {
        path: '/course/:id',
        element: <CourseDetail />,
      },
      { path: '/ai-recommend', element: <AiRecommend /> },
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
      },
    ],
  },
  { path: '/map', element: <Map /> },
  { path: '*', element: <Navigate to="/" /> },
];

export const router = createBrowserRouter(routes);
