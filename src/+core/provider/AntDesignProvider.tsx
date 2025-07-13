import { ConfigProvider } from 'antd';

export default function AntDesignProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#78c6e3',
        },
        components: {
          Form: {
            itemMarginBottom: 0,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
