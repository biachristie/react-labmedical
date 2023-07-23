import { useState } from 'react';
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';

import './Layout.css'
import MenuBarComponent from '../components/MenubarComponent/Menubar.component';

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
                        <img className='layout-brand-logo' src="./logo.png" alt="Sante logo" />
                        <span className='layout-brand-title'>Santé</span>
                    </div>
                    <MenuBarComponent />
                </Sider>
            </Layout>
        </>
    )
}

export default LayoutComponent;