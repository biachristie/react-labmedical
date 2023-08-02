import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'

import './Layout.css'
import MenuBarComponent from '../components/MenubarComponent/Menubar.component'
import ToolBarComponent from '../components/ToolbarComponent/Toolbar.component'

function LayoutComponent() {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <>
            <Layout className='layout-container' hasSider>
                <Sider 
                    className='layout-sider'
                    collapsible 
                    collapsed={ collapsed } 
                    onCollapse={(value) => setCollapsed(value)}
                    defaultCollapsed={ true }
                    width={ 240 }
                    collapsedWidth={ 80 }
                    breakpoint='xxl'
                >
                    <div className='layout-brand-container'>
                        <img className='layout-brand-logo' src="./logo.png" alt="LABMedical logo" />
                    </div>
                    <MenuBarComponent />
                </Sider>
                <Layout>
                    <Header className='layout-header'>
                        <ToolBarComponent />
                    </Header>
                    <Content className='layout-content'>
                        <Outlet />
                    </Content>
                    <Footer className='layout-footer'>
                        <p>Santé ©2023 Criado por Beatriz Christie</p>
                    </Footer>
                </Layout>
            </Layout>
        </>
    )
}

export default LayoutComponent