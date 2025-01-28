import Layout from '@/layouts/default';
import Home from '@/pages/home';
import Login from '@/pages/login';
import MyCourse from '@/pages/my-course';
import MyCourseDetail from '@/pages/my-course/detail';
import AiRecommend from '@/pages/ai-recommend';
import Community from '@/pages/community';
import MyPage from '@/pages/my-page';
import PlaceDetail from '@/pages/place';
import Culture from '@/pages/culture';
import Popups from '@/pages/culture/popups';
import Exhibitions from '@/pages/culture/exhibitions';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/community', element: <Community /> },
      { path: '/my-page', element: <MyPage /> },
      {
        path: '/place/:id',
        element: <PlaceDetail />,
      },
      { path: '/my-course', element: <MyCourse /> },
      {
        path: '/my-course/:id',
        element: <MyCourseDetail />,
      },
      { path: '/ai-recommend', element: <AiRecommend /> },
      {
        path: '/culture',
        element: <Culture />,
        children: [
          { path: 'popups', element: <Popups /> },
          { path: 'exhibitions', element: <Exhibitions /> },
        ],
      },
    ],
  },
]);
