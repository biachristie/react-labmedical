import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Layout } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'

import MenuBarComponent from '../../components/MenubarComponent/Menubar.component'
import ToolBarComponent from '../../components/ToolbarComponent/ToolbarComponent'

function HomePage() {
    const isLogged = JSON.parse(localStorage.getItem('isLogged'))

    const renderPage = () => {

        const [collapsed, setCollapsed] = useState(false);

        return (
            <>
                <Layout hasSider>
                    <Sider 
                        className='layout-sider'
                        collapsible 
                        collapsed={ collapsed } 
                        onCollapse={(value) => setCollapsed(value)}
                        defaultCollapsed={ true }
                        width={ 240 }
                        collapsedWidth={ 80 }
                        breakpoint='xxl'
                        style={{
                            overflow: 'hidden',
                            background: '#082F4B'
                        }}
                    >
                    </Sider>
                        <div className='layout-brand-container'>
                            <img className='layout-brand-logo' src="./logo.png" alt="Sante logo" />
                        </div>
                        <MenuBarComponent />
                    <Layout>
                        <Header className='layout-header'>
                            <ToolBarComponent />
                        </Header>
                        <Content className='layout-content'
                            style={{
                                margin: '24px 16px 0',
                                overflow: 'initial',
                            }}
                        >
                            <p>Content</p>
                        </Content>
                        <Footer className='layout-footer'>
                            <p>Santé ©2023 Criado por Beatriz Christie</p>
                        </Footer>
                    </Layout>
                </Layout>
            </>
        )
    }

    return isLogged ? renderPage() : <Navigate to='/login' />

}

export default HomePage;