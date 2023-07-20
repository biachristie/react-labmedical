import { useEffect, useState, useContext } from 'react'
import { Badge, Button, Col, Drawer, Form, Modal, Row, Space, Spin } from 'antd'
import { BellFilled, MailFilled, UserOutlined } from '@ant-design/icons'

import './ToolbarComponent.style.css'
import { TitlesContext } from '../../context/titles/titles.context'
import { UsersContext } from '../../context/users/users.context'
import InputComponent from '../InputComponent/Input.component'

function ToolBarComponent() {
    const { title } = useContext(TitlesContext)
    const { usersList } = useContext(UsersContext)

    const [user, setUser] = useState()
    const [avatar, setAvatar] = useState('')

    useEffect(() => {
        if (usersList.length > 0) {
            const id = localStorage.getItem('id')
            const data = usersList.find(user => user.id.toString().includes(id))
            setUser(data)
            data.avatar ? setAvatar(<img className='header-icon-avatar' src={ data.avatar } alt='Avatar' />) : null
        }
    }, [usersList])
    
    const [openDM, setOpenDM] = useState(false)
    const [openNotification, setOpenNotification] = useState(false)

    const [openUserAvatar, setOpenUserAvatar] = useState(false)
    const [urlAvatar, setUrlAvatar] = useState('')

    const onOkModal = () => {
        setAvatar(<img className='header-icon-avatar' src={ urlAvatar } alt='Avatar' />)
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
                <Col className='header-col-2'>
                    <div className='header-title-container'>
                        <h2 id='header-title'>{ title }</h2>
                    </div>
                </Col>
                <Col className='header-col-3' >
                    <Space className='header-icons-container' size={ 23 } >
                        <Badge count={ 1 } overflowCount={ 99 }>
                            <MailFilled className='header-icon' onClick={ () => setOpenDM(true) } />
                        </Badge>
                        <Badge count={ 5 } overflowCount={ 10 }>
                            <BellFilled className='header-icon' onClick={ () => setOpenNotification(true) } />
                        </Badge>
                        <Button 
                            className='header-icon-user' 
                            type='default' 
                            shape='circle' 
                            size='large'
                            icon={ avatar || <UserOutlined /> } 
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
                        onClose={ () => setOpenDM(false) }
                        maskClosable
                    >
                        Under construction
                    </Drawer>
                    <Drawer
                        className='header-drawer'
                        placement='right'
                        title='Notifications'
                        open={ openNotification }
                        onClose={ () => setOpenNotification(false) }
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