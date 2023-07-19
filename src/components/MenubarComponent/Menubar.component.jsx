import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Menu } from 'antd'
import {
    CalendarOutlined,
    ClockCircleOutlined,
    ExperimentOutlined,
    FormOutlined,
    HomeFilled,
    IdcardOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlusOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons'

import './Menubar.component.css'

function MenuBarComponent() {
    const items = [
        { label: 'Home', key: '/', icon: <HomeFilled /> },
        { label: 'Pacients', key: '/patients', icon: <UserOutlined />},
        { label: 'Appointments', key: '/appointments', icon: <CalendarOutlined />},
        { label: 'Exams', key: '/exams', icon: <ExperimentOutlined />},
        { label: 'Registration', icon: <FormOutlined />, children: [
            { label: 'Pacient', key: '/pacientRegister', icon: <IdcardOutlined /> },
            { label: 'Appointment', key: '/appointmentRegister', icon: <ClockCircleOutlined /> },
            { label: 'Exam', key: '/examRegister', icon: <PlusOutlined /> }
        ]},
        { label: 'Settings', key: 'settings', icon: <SettingOutlined /> },
        { label: 'Signout', key: 'signout', icon: <LogoutOutlined /> },
    ]

    const [collapsed, setCollapsed] = useState(false)
    const toggleCollapsed = () => setCollapsed(!collapsed)
    
    const navigate = useNavigate()

    const handleSignOut = () => {
        window.location.href='/'
        localStorage.clear()
    }

    return (
        <>
            <nav className='menuBar-container'>
                <Menu
                    className='menuBar'
                    mode="inline" 
                    defaultSelectedKeys={['home']}
                    inlineCollapsed={ collapsed }
                    items={ items }
                    onClick={ ({key}) => { key === 'signout' ? handleSignOut() : navigate(key) }
                    }
                />
                <div className='menuBar-button'>
                    <Button
                        className='menuBar-toggle'
                        type='default'
                        onClick={ toggleCollapsed }
                        >
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </Button>
                </div>
            </nav>
        </>
    )
}

export default MenuBarComponent