import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/layouts';
import Home from '@/pages/home';
import Login from '@/pages/login';
import MyCourse from '@/pages/my-course';
import MyCourseDetail from '@/pages/my-course/detail';
import AiRecommend from '@/pages/ai-recommend';
import Community from '@/pages/community';
import MyPage from '@/pages/my-page';
import PlaceDetail from '@/pages/place';
import Culture from '@/pages/place/culture';
import Popups from '@/pages/place/culture/popups';
import Exhibitions from '@/pages/place/culture/exhibitions';

// TODO: react-router-v7 업그레이드할것
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
  {
    path: '/place/:id',
    element: <Layout />,
    children: [{ index: true, element: <PlaceDetail /> }],
  },
  {
    path: '/culture',
    element: <Layout />,
    children: [{ index: true, element: <Culture /> }],
  },
  {
    path: '/culture/popups',
    element: <Layout />,
    children: [{ index: true, element: <Popups /> }],
  },
  {
    path: '/culture/exhibitions',
    element: <Layout />,
    children: [{ index: true, element: <Exhibitions /> }],
  },
]);
