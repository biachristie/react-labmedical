import { BellFilled, MailFilled, UserOutlined } from '@ant-design/icons'
import { Avatar, Badge, Col, Row, Space } from 'antd'

import './ToolbarComponent.style.css'

function ToolBarComponent() {
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
                    <Space className='header-icons-container'>
                        <Badge count={ 1 }>
                            <Avatar className='header-icon-message' shape='circle' icon={ <MailFilled /> } />
                        </Badge>
                        <Badge count={ 0 }>
                            <Avatar className='header-icon-notification' shape='circle' icon={ <BellFilled /> } />
                        </Badge>
                        <Avatar className='header-icon-user' size='large' icon={ <UserOutlined /> } />
                    </Space>
                    <div className='header-user-container'>
                        <span id='header-user-name'>Beatriz</span>
                        <span id='header-user-occupation'>Médica</span>
                    </div>
                </Col>
            </Row>
        </header>
    );
}

export default ToolBarComponent;