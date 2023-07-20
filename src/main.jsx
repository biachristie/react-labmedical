import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import ptBR from 'antd/lib/locale/pt_BR.js'

import { UsersProvider } from './context/users/users.context.jsx'
import { TitlesProvider } from './context/titles/titles.context.jsx'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider locale={ ptBR }>
      <UsersProvider>
        <TitlesProvider>
          <App />
        </TitlesProvider>
      </UsersProvider>
    </ConfigProvider>
  </React.StrictMode>,
)