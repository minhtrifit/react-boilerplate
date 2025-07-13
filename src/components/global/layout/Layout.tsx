import AuthProvider from '@/+core/provider/AuthProvider';
import { Layout as LayoutAntDesign } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content } = LayoutAntDesign;

export default function Layout() {
  return (
    <AuthProvider>
      <LayoutAntDesign className={'bg-white duration-500 ease-in-out'}>
        <Content className='m-auto transition w-full min-h-screen'>
          <Outlet />
        </Content>
      </LayoutAntDesign>
    </AuthProvider>
  );
}
