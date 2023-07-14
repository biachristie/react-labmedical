import { BellFilled, MailFilled, UserOutlined } from '@ant-design/icons'
import { Avatar, Badge, Col, Drawer, Row, Space } from 'antd'

import './ToolbarComponent.style.css'
import { useState } from 'react';

function ToolBarComponent() {
    const [openDM, setOpenDM] = useState(false)
    const [openNotification, setOpenNotification] = useState(false)

    const handleOpenDM = () => setOpenDM(true)
    const handleCloseDM = () => setOpenDM(false)
    const handleOpenNotification = () => setOpenNotification(true)
    const handleCloseNotification = () => setOpenNotification(false)

    return (
        <header className='header-container'>
            <Row className='header-row'>
                <Col className='header-col-1' >
                    <div className='header-brand-container'>
                        <img className='header-brand-logo' src="./logo.png" alt="Sante logo" />
                        <h1 className='header-brand-title'>Santé</h1>
                    </div>
                </Col>
                <Col className='header-col-2' >
                    <Space className='header-icons-container' size={ 23 } >
                        <Badge count={ 1 } overflowCount={ 99 }>
                            <MailFilled className='header-icon' onClick={ handleOpenDM } />
                        </Badge>
                        <Badge count={ 5 } overflowCount={ 10 }>
                            <BellFilled className='header-icon' onClick={ handleOpenNotification } />
                        </Badge>
                        <Avatar className='header-icon-user' size='large' icon={ <UserOutlined /> } />
                    </Space>
                    <div className='header-user-container'>
                        <span id='header-user-name'>Beatriz</span>
                        <span id='header-user-occupation'>Médica</span>
                    </div>
                    <Drawer
                        className='header-drawer'
                        placement='right'
                        title='Direct Messages'
                        open={ openDM }
                        onClose={ handleCloseDM }
                        maskClosable
                    >
                        Conteúdo das mensagens diretas
                    </Drawer>
                    <Drawer
                        className='header-drawer'
                        placement='right'
                        title='Notifications'
                        open={ openNotification }
                        onClose={ handleCloseNotification }
                        maskClosable
                    >
                        Conteúdo das Notificações
                    </Drawer>
                </Col>
            </Row>
        </header>
    );
}

export default ToolBarComponent;