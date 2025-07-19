import React from 'react';
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import AuthProvider from '@/+core/provider/AuthProvider';
import AuthProtectProvider from '@/+core/provider/AuthProtectProvider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useIsMobile } from '@/hooks/useIsMobile';
import { toggleSidebar } from '@/store/actions/user.action';
import Sidebar from '../Sidebar/Sidebar';
import LanguageToggle from '../LanguageToggle/LanguageToggle';
import UserDropdown from '@/components/ui/UserDropdown/UserDropdown';
import NotificationDropdown from '../NotificationDropdown/NotificationDropdown';

const APP_NAME = import.meta.env.VITE_APP_NAME;

const { Header, Content, Footer } = Layout;

const DashboardLayout: React.FC = () => {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const isOpenSidebar: boolean = useSelector((state: RootState) => state.users.isOpenSidebar);

  return (
    <AuthProvider>
      <AuthProtectProvider>
        <Layout style={{ minHeight: '100vh' }}>
          <Sidebar showToggle={false} />

          <Layout>
            <Header
              className='flex items-center justify-between px-[15px] transition-all duration-300'
              style={{
                background: colorBgContainer,
                position: 'fixed',
                top: 0,
                left: isOpenSidebar ? 250 : 80,
                right: 0,
                height: 64,
                zIndex: 1000,
              }}
            >
              {isMobile ? (
                <div className='opacity-0'>field</div>
              ) : (
                <div className='hover:cursor-pointer' onClick={() => dispatch(toggleSidebar())}>
                  {isOpenSidebar ? (
                    <MenuFoldOutlined style={{ color: 'black', fontSize: '1rem' }} />
                  ) : (
                    <MenuUnfoldOutlined style={{ color: 'black', fontSize: '1rem' }} />
                  )}
                </div>
              )}

              <div className='hidden md:flex items-center gap-8'>
                <LanguageToggle />
                <NotificationDropdown />
                <UserDropdown />
              </div>
            </Header>

            <Content style={{ margin: '12px', marginTop: '76px' }}>
              <div
                className='min-h-full p-[24px]'
                style={{
                  background: colorBgContainer,
                }}
              >
                <Outlet />
              </div>
            </Content>

            <Footer style={{ textAlign: 'center' }}>
              ©{new Date().getFullYear()} by {APP_NAME} with ❤️
            </Footer>
          </Layout>
        </Layout>
      </AuthProtectProvider>
    </AuthProvider>
  );
};

export default DashboardLayout;
