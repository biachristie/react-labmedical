import { useEffect, useState } from 'react'
import { Badge, Button, Col, Drawer, Modal, Row, Space } from 'antd'
import { BellFilled, MailFilled, UserOutlined } from '@ant-design/icons'

import './ToolbarComponent.style.css'

function ToolBarComponent() {
    const [username, setUsername] = useState()

    useEffect(() => {
        setUsername(localStorage.getItem('firstname'))
    }, [])

    const [openDM, setOpenDM] = useState(false)
    const [openNotification, setOpenNotification] = useState(false)

    const handleOpenDM = () => setOpenDM(true)
    const handleCloseDM = () => setOpenDM(false)
    const handleOpenNotification = () => setOpenNotification(true)
    const handleCloseNotification = () => setOpenNotification(false)

    const [openUserAvatar, setOpenUserAvatar] = useState(false)

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
                        <Button 
                            className='header-icon-user' 
                            type='default' 
                            shape='circle' 
                            size='large'
                            icon={ <UserOutlined /> } 
                            onClick={ () => setOpenUserAvatar(true) }
                        />
                        <Modal
                            className='header-user-modal'
                            title = 'title'
                            open={ openUserAvatar }
                            onOk={ () => setOpenUserAvatar(false) }
                            onCancel={ () => setOpenUserAvatar(false) }
                        >
                            Modal
                        </Modal>
                    </Space>
                    <div className='header-user-container'>
                        <span id='header-user-name'>{ username }</span>
                    </div>
                    <Drawer
                        className='header-drawer'
                        placement='right'
                        title='Direct Messages'
                        open={ openDM }
                        onClose={ handleCloseDM }
                        maskClosable
                    >
                        Under construction
                    </Drawer>
                    <Drawer
                        className='header-drawer'
                        placement='right'
                        title='Notifications'
                        open={ openNotification }
                        onClose={ handleCloseNotification }
                        maskClosable
                    >
                        Under construction
                    </Drawer>
                </Col>
            </Row>
        </header>
    );
}

export default ToolBarComponent;