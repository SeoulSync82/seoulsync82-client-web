import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/layouts';
import Home from '@/pages/home';
import Login from '@/pages/login';
import MyCourse from '@/pages/my-course';
import MyCourseDetail from '@/pages/my-course/detail';
import AiRecommend from '@/pages/ai-recommend';
import Community from '@/pages/community';
import MyPage from '@/pages/my-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: '/my-course',
    element: <Layout />,
    children: [{ index: true, element: <MyCourse /> }],
  },
  {
    path: '/my-course/:id',
    element: <Layout />,
    children: [{ index: true, element: <MyCourseDetail /> }],
  },
  {
    path: '/ai-recommend',
    element: <Layout />,
    children: [{ index: true, element: <AiRecommend /> }],
  },
  {
    path: '/community',
    element: <Layout />,
    children: [{ index: true, element: <Community /> }],
  },
  {
    path: '/my-page',
    element: <Layout />,
    children: [{ index: true, element: <MyPage /> }],
  },
  {
    path: '/login',
    element: <Layout />,
    children: [{ index: true, element: <Login /> }],
  },
]);
