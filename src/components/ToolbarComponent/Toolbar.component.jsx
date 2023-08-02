import { useEffect, useState, useContext } from 'react'
import { Badge, Button, Col, Drawer, Form, Modal, Row, Space, Spin } from 'antd'
import { BellFilled, MailFilled, UserOutlined } from '@ant-design/icons'

import './Toolbar.component.css'
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
        urlAvatar ? setAvatar(<img className='header-icon-avatar' src={ urlAvatar } alt='Avatar' />) : null
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
                    <div className='header-title-container'>
                        <h1 id='header-title'>{ title }</h1>
                    </div>
                </Col>
                <Col className='header-col-2' >
                    <Space className='header-icons-container' size={ 23 } >
                        <Badge>
                            <MailFilled className='header-icon' onClick={ () => setOpenDM(true) } />
                        </Badge>
                        <Badge>
                            <BellFilled className='header-icon' onClick={ () => setOpenNotification(true) } />
                        </Badge>
                        <Button 
                            className='header-icon-user' 
                            type='default' 
                            shape='square' 
                            size='large'
                            icon={ avatar || <UserOutlined /> } 
                            onClick={ () => setOpenUserAvatar(true) }
                        />
                        <Modal
                            className='header-user-modal'
                            title = 'Mude sua foto de perfil'
                            open={ openUserAvatar }
                            onOk={ onOkModal }
                            onCancel={ () => setOpenUserAvatar(false) }
                        >
                            <Form className='header-user-modal-form'>
                                <InputComponent
                                    label='Link para foto de perfil'
                                    id='avatar'
                                    placeholder='Insira sua foto'
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
                        title='Mensagens Diretas'
                        open={ openDM }
                        onClose={ () => setOpenDM(false) }
                        maskClosable
                    >
                        Em construção
                    </Drawer>
                    <Drawer
                        className='header-drawer'
                        placement='right'
                        title='Notificações'
                        open={ openNotification }
                        onClose={ () => setOpenNotification(false) }
                        maskClosable
                    >
                        Em construção
                    </Drawer>
                </Col>
            </Row>
        </header>
    );
}

export default ToolBarComponent;