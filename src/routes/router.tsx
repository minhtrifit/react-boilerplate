import { createBrowserRouter } from 'react-router-dom';
import { APP_ROUTE } from './route.constant';

import Layout from '@/components/global/layout/Layout';
import DashboardLayout from '@/components/global/layout/DashboardLayout';

import { HomePage } from '@/pages/home/HomePage';
import { NotFoundPage } from '@/pages/not-found-page/NotFoundPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import ProductPage from '@/pages/product/ProductPage';

export const router = createBrowserRouter([
  {
    path: APP_ROUTE.HOME,
    element: <Layout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: APP_ROUTE.DASHBOARD,
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: APP_ROUTE.PRODUCTS, element: <ProductPage /> },
    ],
  },
  { path: '/*', element: <NotFoundPage /> },
]);
