import { createBrowserRouter } from 'react-router-dom';
import { APP_ROUTE } from './route.constant';

import Layout from '@/components/global/layout/Layout';
import DashboardLayout from '@/components/global/layout/DashboardLayout';

import { HomePage } from '@/pages/home/HomePage';
import { NotFoundPage } from '@/pages/not-found-page/NotFoundPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import ProductPage from '@/pages/product/ProductPage';
import AddProductPage from '@/pages/add-product/AddProductPage';
import EditProductPage from '@/pages/edit-product/EditProductPage';
import BlogPage from '@/pages/blog/BlogPage';
import AddBlogPage from '@/pages/add-blog/AddBlogPage';
import DetailBlogPage from '@/pages/detail-blog/DetailBlogPage';
import CartPage from '@/pages/cart/CartPage';
import AddCartPage from '@/pages/add-cart/AddCartPage';

export const router = createBrowserRouter([
  {
    path: APP_ROUTE.HOME,
    element: <Layout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: APP_ROUTE.DASHBOARD,
    element: <DashboardLayout />,
    children: [{ index: true, element: <DashboardPage /> }],
  },
  {
    path: APP_ROUTE.MANAGMENT,
    element: <DashboardLayout />,
    children: [
      { path: APP_ROUTE.PRODUCTS, element: <ProductPage /> },
      { path: APP_ROUTE.ADD_PRODUCT, element: <AddProductPage /> },
      { path: APP_ROUTE.EDIT_PRODUCT, element: <EditProductPage /> },
      { path: APP_ROUTE.DETAIL_PRODUCT, element: <div>DetailProductPage</div> },
      { path: APP_ROUTE.CARTS, element: <CartPage /> },
      { path: APP_ROUTE.ADD_CART, element: <AddCartPage /> },
      { path: APP_ROUTE.BLOGS, element: <BlogPage /> },
      { path: APP_ROUTE.ADD_BLOG, element: <AddBlogPage /> },
      { path: APP_ROUTE.DETAIL_BLOG, element: <DetailBlogPage /> },
    ],
  },
  {
    path: APP_ROUTE.ROLES,
    element: <DashboardLayout />,
    children: [
      { path: APP_ROUTE.CUSTOMERS, element: <div>CustomersPage</div> },
      { path: APP_ROUTE.STAFFS, element: <div>StaffsPage</div> },
    ],
  },
  {
    path: APP_ROUTE.SETTINGS,
    element: <DashboardLayout />,
    children: [{ index: true, element: <div>SettingsPage</div> }],
  },
  { path: '/*', element: <NotFoundPage /> },
]);
