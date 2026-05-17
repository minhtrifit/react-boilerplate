import { createBrowserRouter } from 'react-router-dom';
import {
  DEFAULT_ROUTE,
  DASHBOARD_ROUTE,
  MANAGEMENT_ROUTE,
  PRODUCT_ROUTE,
  ADD_PRODUCT_ROUTE,
  EDIT_PRODUCT_ROUTE,
  DETAIL_PRODUCT_ROUTE,
  CARTS_ROUTE,
  ADD_CART_ROUTE,
  BLOGS_ROUTE,
  ADD_BLOG_ROUTE,
  DETAIL_BLOG_ROUTE,
  ROLES_ROUTE,
  CUSTOMERS_ROUTE,
  STAFFS_ROUTE,
  SETTINGS_ROUTE,
} from './route.constant';

import Layout from '@/components/global/layout/Layout';
import DashboardLayout from '@/components/global/layout/DashboardLayout';

import { HomePage } from '@/pages/home';
import { NotFoundPage } from '@/pages/not-found-page';
import DashboardPage from '@/pages/dashboard';
import ProductPage from '@/pages/product/list';
import CreateProductPage from '@/pages/product/create';
import EditProductPage from '@/pages/product/edit';
import BlogPage from '@/pages/blog/list';
import CreateBlogPage from '@/pages/blog/create';
import DetailBlogPage from '@/pages/blog/detail';
import CartPage from '@/pages/cart/list';
import CreateCartPage from '@/pages/cart/create';

export const router = createBrowserRouter([
  {
    path: DEFAULT_ROUTE,
    element: <Layout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: DASHBOARD_ROUTE,
    element: <DashboardLayout />,
    children: [{ index: true, element: <DashboardPage /> }],
  },
  {
    path: MANAGEMENT_ROUTE,
    element: <DashboardLayout />,
    children: [
      // Products
      { path: PRODUCT_ROUTE, element: <ProductPage /> },
      { path: ADD_PRODUCT_ROUTE, element: <CreateProductPage /> },
      { path: EDIT_PRODUCT_ROUTE, element: <EditProductPage /> },
      { path: DETAIL_PRODUCT_ROUTE, element: <div>DetailProductPage</div> },
      // Carts
      { path: CARTS_ROUTE, element: <CartPage /> },
      { path: ADD_CART_ROUTE, element: <CreateCartPage /> },
      // Blogs
      { path: BLOGS_ROUTE, element: <BlogPage /> },
      { path: ADD_BLOG_ROUTE, element: <CreateBlogPage /> },
      { path: DETAIL_BLOG_ROUTE, element: <DetailBlogPage /> },
    ],
  },
  {
    path: ROLES_ROUTE,
    element: <DashboardLayout />,
    children: [
      { path: CUSTOMERS_ROUTE, element: <div>CustomersPage</div> },
      { path: STAFFS_ROUTE, element: <div>StaffsPage</div> },
    ],
  },
  {
    path: SETTINGS_ROUTE,
    element: <DashboardLayout />,
    children: [{ index: true, element: <div>SettingsPage</div> }],
  },
  { path: '/*', element: <NotFoundPage /> },
]);
