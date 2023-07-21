import { useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import {
    BarChartOutlined,
    CalendarOutlined,
    CarryOutOutlined,
    EditOutlined,
    ExperimentOutlined,
    IdcardOutlined,
    LogoutOutlined,
    MedicineBoxOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons'

import './Menubar.component.css'

function MenuBarComponent() {
    const items = [ 
        { label: 'Início', key: '/', icon: <BarChartOutlined /> },
        { label: 'Pacientes', icon: <UserOutlined />, children: [
            { label: 'Listar Prontuários', key: '/pacients', icon: <IdcardOutlined /> },
            { label: 'Cadastrar Paciente', key: '/pacientRegister', icon: <EditOutlined /> },
        ]},
        { label: 'Consultas', icon: <CalendarOutlined />, children: [
            { label: 'Listar Consultas', key: '/appointments', icon: <CarryOutOutlined /> },
            { label: 'Cadastrar Consulta', key: '/appointmentRegister', icon: <EditOutlined /> },
        ]},
        { label: 'Exames', icon: <ExperimentOutlined />, children: [
            { label: 'Listar Exames', key: '/exams', icon: <MedicineBoxOutlined />},
            { label: 'Cadastrar Exames', key: '/examRegister', icon: <EditOutlined /> },
        ]},
        { label: 'Em Construção', key: '/underConstruction' , icon: <SettingOutlined /> },
        { label: 'Sair', key: 'signout', icon: <LogoutOutlined /> },
    ]

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
                    mode='inline'
                    defaultSelectedKeys={['/']}
                    items={ items }
                    style={{
                        minWidth: 0,
                        flex: 'auto'
                    }}
                    onClick={ ({key}) => { key === 'signout' ? handleSignOut() : navigate(key) }}
                />
            </nav>
        </>
    )
}

export default MenuBarComponent