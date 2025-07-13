import { useTranslation } from 'react-i18next';
import { Layout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleSidebar } from '@/store/actions/user.action';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import './styles.scss';
import { useMemo } from 'react';

const APP_NAME = import.meta.env.VITE_APP_NAME;

const { Sider } = Layout;

interface PropType {
  showToggle?: boolean;
}

const Sidebar = (props: PropType) => {
  const { showToggle = true } = props;

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isOpenSidebar: boolean = useSelector((state: RootState) => state.users.isOpenSidebar);
  const selectedKey = location.pathname;

  const siderStyle: React.CSSProperties = {
    background: '#fff',
    overflow: 'auto',
    height: '100vh',
    position: 'sticky',
    top: 0,
    bottom: 0,
  };

  const menuItems = [
    {
      key: '/dashboard',
      icon: <HomeOutlined style={{ fontSize: '18px' }} />,
      label: t('dashboard'),
    },
    {
      key: '/dashboard/management',
      icon: <AppstoreOutlined style={{ fontSize: '18px' }} />,
      label: t('management'),
      children: [
        {
          key: '/dashboard/products',
          icon: <ShopOutlined style={{ fontSize: '18px' }} />,
          label: t('products'),
        },
        {
          key: '/dashboard/carts',
          icon: <ShoppingCartOutlined style={{ fontSize: '18px' }} />,
          label: t('carts'),
        },
      ],
    },
    {
      key: '/settings',
      icon: <SettingOutlined style={{ fontSize: '18px' }} />,
      label: t('settings'),
    },
  ];

  const openKey = useMemo(() => {
    for (const item of menuItems) {
      if (item.children?.some((child) => child.key === selectedKey)) {
        return item.key;
      }
    }

    return '';
  }, [selectedKey]);

  return (
    <Sider style={siderStyle} width={250} collapsible collapsed={!isOpenSidebar} trigger={null}>
      <div className='w-full h-[64px] flex items-center px-[5px]'>
        <div
          className='flex items-center hover:cursor-pointer'
          onClick={() => {
            navigate('/dashboard');
          }}
        >
          <div className='w-[70px] flex items-center justify-center'>
            <img className='w-full h-full' src='/assets/images/logo.png' alt='logo' />
          </div>

          {isOpenSidebar && (
            <span className='text-primary-500 text-[1rem] font-bold'>{APP_NAME ?? 'APP NAME'}</span>
          )}
        </div>
      </div>

      <Menu
        className='[&_.ant-menu-item-selected]:font-[500]'
        theme='light'
        mode='inline'
        defaultOpenKeys={[openKey as string]}
        selectedKeys={[location.pathname]}
        onClick={(e) => navigate(e.key)}
        items={menuItems}
      />

      {showToggle && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            padding: '12px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
          onClick={() => dispatch(toggleSidebar())}
        >
          {isOpenSidebar ? (
            <MenuUnfoldOutlined style={{ color: 'black', fontSize: '1rem' }} />
          ) : (
            <MenuFoldOutlined style={{ color: 'black', fontSize: '1rem' }} />
          )}
        </div>
      )}
    </Sider>
  );
};

export default Sidebar;
