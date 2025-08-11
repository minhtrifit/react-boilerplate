import React from 'react';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import enUS from 'antd/locale/en_US';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import 'dayjs/locale/en';
import { useTranslation } from 'react-i18next';

export default function AntDesignProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  // Chọn locale Antd dựa vào i18n
  const antdLocale = i18n.language === 'vi' ? viVN : enUS;

  // Chọn locale dayjs
  dayjs.locale(i18n.language === 'vi' ? 'vi' : 'en');

  return (
    <ConfigProvider
      locale={antdLocale}
      theme={{
        token: {
          colorPrimary: '#78c6e3',
          fontFamily: 'Inter, sans-serif',
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
