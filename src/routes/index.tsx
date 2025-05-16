import React from 'react';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  ScrollRestoration,
} from 'react-router-dom';
import Layout from '@/layouts/default';
import { ErrorBoundaryWrapper } from '@/components/ErrorBoundary';

const Home = React.lazy(() => import('@/pages/Home'));
const MyPage = React.lazy(() => import('@/pages/MyPage'));
const Notice = React.lazy(() => import('@/pages/MyPage/Notice'));
const NoticeDetail = React.lazy(() => import('@/pages/MyPage/Notice/NoticeDetail'));
const EditProfile = React.lazy(() => import('@/pages/MyPage/EditProfile'));
const SocialLoginInfo = React.lazy(() => import('@/pages/MyPage/SocialLoginInfo'));
const MyCourse = React.lazy(() => import('@/pages/MyCourse'));
const MyCourseDetail = React.lazy(() => import('@/pages/MyCourse/MyCourseDetail'));
const AiRecommend = React.lazy(() => import('@/pages/AiRecommend'));
const Culture = React.lazy(() => import('@/pages/Culture'));
const CultureDetail = React.lazy(() => import('@/pages/Culture/CultureDetail'));
const Notifications = React.lazy(() => import('@/pages/Notifications'));
const Map = React.lazy(() => import('@/pages/Map'));
const Community = React.lazy(() => import('@/pages/Community'));
const Login = React.lazy(() => import('@/pages/Login'));

const Root = () => {
  return (
    <Layout>
      <ErrorBoundaryWrapper>
        <Outlet />
      </ErrorBoundaryWrapper>
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
      { path: '/my-page', element: <MyPage /> },
      { path: '/my-page/notice', element: <Notice /> },
      { path: '/my-page/notice/:id', element: <NoticeDetail /> },
      { path: '/my-page/edit-profile', element: <EditProfile /> },
      { path: '/my-page/social-login-info', element: <SocialLoginInfo /> },
      { path: '/course', element: <MyCourse /> },
      { path: '/course/:type/:id', element: <MyCourseDetail /> },
      { path: '/ai-recommend', element: <AiRecommend /> },
      { path: '/culture', element: <Culture /> },
      { path: '/culture/:type/:id', element: <CultureDetail /> },
      { path: '/notifications', element: <Notifications /> },
    ],
  },
  { path: '/map', element: <Map /> },
  { path: '*', element: <Navigate to="/" /> },
];

export const router = createBrowserRouter(routes);
