import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import ptBR from 'antd/lib/locale/pt_BR.js'

import { UsersProvider } from './context/users/users.context.jsx'
import { TitlesProvider } from './context/titles/titles.context.jsx'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
      locale={ ptBR }
      theme={{
        components: {
          Menu: {
            itemColor: '#fffffb',
            subMenuItemBorderRadius: 6,
            itemHoverColor: '#de5417e0',
            itemBg: '#082F4B',
            itemSelectedBg: '#fcf0eb',
            itemSelectedColor: '#de541e',
            darkSubMenuItemBg: '#000c17',
            darkItemBg: '#001529',
            colorText: '#ffffffdf',
            groupTitleColor: '#ea8761',
            lineWidth: 1,
          }
        },
        token: {
          colorPrimary: '#DE541E',
          // colorError: '#DE541E',
          colorInfo: "#DE541E",
          // colorBgBase: "#082F4B",
          colorSuccess: '#358423',
          colorPrimaryBg: '#FCF0EB',
          borderRadius: 10,
          wireframe: false
        }
      }}
    >
      <UsersProvider>
        <TitlesProvider>
          <App />
        </TitlesProvider>
      </UsersProvider>
    </ConfigProvider>
  </React.StrictMode>,
)