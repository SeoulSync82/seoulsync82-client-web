import React, { Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  ScrollRestoration,
} from 'react-router-dom';
import Layout from '@/layouts/default';
import Loading from '@/components/Loading';
import { ErrorBoundaryWrapper } from '@/components/ErrorBoundary';
const HomePage = React.lazy(() => import('@/pages/HomePage'));
const MyPage = React.lazy(() => import('@/pages/MyPage'));
const EditProfilePage = React.lazy(() => import('@/pages/MyPage/EditProfilePage'));
const SocialLoginInfoPage = React.lazy(() => import('@/pages/MyPage/SocialLoginInfoPage'));
const MyCoursePage = React.lazy(() => import('@/pages/MyCoursePage'));
const NoticePage = React.lazy(() => import('@/pages/MyPage/NoticePage'));
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
        {/* <Suspense fallback={<Loading />}> */}
        <Outlet />
        {/* </Suspense> */}
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
      {
        path: '/my-page',
        element: <MyPage />,
      },
      { path: '/my-page/notice', element: <NoticePage /> },
      { path: '/my-page/edit-profile', element: <EditProfilePage /> },
      { path: '/my-page/social-login-info', element: <SocialLoginInfoPage /> },
      { path: '/course', element: <MyCoursePage /> },
      {
        path: '/course/:id',
        element: <CourseDetailPage />,
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
      },
    ],
  },
  { path: '/map', element: <MapPage /> },
  { path: '*', element: <Navigate to="/" /> },
];

export const router = createBrowserRouter(routes);
