import { useEffect, useState, useContext } from 'react'
import { Badge, Button, Col, Drawer, Form, Modal, Row, Space, Spin } from 'antd'
import { BellFilled, MailFilled, UserOutlined } from '@ant-design/icons'

import './ToolbarComponent.style.css'
import { UsersContext } from '../../context/users/users.context'
import InputComponent from '../InputComponent/Input.component'

function ToolBarComponent() {
    const { usersList } = useContext(UsersContext)

    const [user, setUser] = useState()
    const [avatar, setAvatar] = useState('')

    useEffect(() => {
        if (usersList.length > 0) {
            const id = localStorage.getItem('id')
            const data = usersList.find(user => user.id.toString().includes(id))
            setUser(data)
            setAvatar(<img className='avatar' src={ data.avatar } alt='Avatar' />)
        }
    }, [usersList])
    
    const [openDM, setOpenDM] = useState(false)
    const [openNotification, setOpenNotification] = useState(false)

    const handleOpenDM = () => setOpenDM(true)
    const handleCloseDM = () => setOpenDM(false)
    const handleOpenNotification = () => setOpenNotification(true)
    const handleCloseNotification = () => setOpenNotification(false)

    const [openUserAvatar, setOpenUserAvatar] = useState(false)
    const [urlAvatar, setUrlAvatar] = useState('')

    const onOkModal = () => {
        setAvatar(<img className='avatar' src={ urlAvatar } alt='Avatar' />)
        fetch(`http://localhost:3000/users/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                avatar: `${urlAvatar}`
            })
        })
        setOpenUserAvatar(false)
    }

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
                            icon={ avatar ? avatar : <UserOutlined /> } 
                            onClick={ () => setOpenUserAvatar(true) }
                        />
                        <Modal
                            className='header-user-modal'
                            title = 'Change Profile Avatar'
                            open={ openUserAvatar }
                            onOk={ onOkModal }
                            onCancel={ () => setOpenUserAvatar(false) }
                        >
                            <Form className='header-user-modal-form'>
                                <InputComponent
                                    label='Avatar'
                                    id='avatar'
                                    placeholder='Enter your avatar'
                                    type='text'
                                    onInput = { (e) => setUrlAvatar(e.target.value) }
                                />
                            </Form>
                        </Modal>
                    </Space>
                    <div className='header-user-container'>
                        <span id='header-user-name'>{ user ? user.name : <Spin size='small' /> }</span>
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