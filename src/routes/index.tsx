import { createBrowserRouter } from 'react-router';
import Layout from '@/layouts/default';
import Home from '@/pages/home';
import Login from '@/pages/login';
import MyCourse from '@/pages/course';
import AiRecommend from '@/pages/ai-recommend';
import Community from '@/pages/community';
import MyPage from '@/pages/my-page';
import Culture from '@/pages/culture';
import Notifications from '@/pages/notifications';
import CultureDetail from '@/pages/culture/detail';
import CourseDetail from '@/pages/course/detail';
import Map from '@/pages/map';

export const router = createBrowserRouter([
  { path: '/map', element: <Map /> },
  {
    element: <Layout />,
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
]);
