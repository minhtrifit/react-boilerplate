import { createBrowserRouter } from 'react-router-dom';
import { APP_ROUTE } from './route.constant';

import Layout from '@/components/global/layout/Layout';
import DashboardLayout from '@/components/global/layout/DashboardLayout';

import { HomePage } from '@/pages/home/HomePage';
import { NotFoundPage } from '@/pages/not-found-page/NotFoundPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ path: APP_ROUTE.HOME, element: <HomePage /> }],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [{ path: APP_ROUTE.DASHBOARD, element: <DashboardPage /> }],
  },
  { path: '/*', element: <NotFoundPage /> },
]);
