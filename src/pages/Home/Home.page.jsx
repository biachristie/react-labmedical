import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Spin } from 'antd'
import { CalendarOutlined, ExperimentOutlined, UserOutlined } from '@ant-design/icons'
import Meta from 'antd/es/card/Meta'

import './Home.page.css'
import { TitlesContext } from '../../context/titles/titles.context'

function HomePage() {
    const isLogged = JSON.parse(localStorage.getItem('isLogged'))
    
    const { setTitle } = useContext(TitlesContext)

    useEffect(() => {
        setTitle('Estatísticas e Informações')
    }, [])

    const renderPage = () => {
        return (
            <>
                <section className='layout-content-section-1'>
                    <h2 className='layout-content-title'>Estatísticas do Sistema</h2>
                    <div className='layout-content-cards'>
                        <Link to={'/patients'}>
                            <Card
                                className='stats-cards'
                                hoverable
                                bodyStyle={{ padding: 0 }}
                                cover={ 
                                    <div className='stats-cards-icon-container'>
                                        <UserOutlined className='stats-cards-icon' id='patient' />
                                    </div>  
                                }
                            >
                                <Meta 
                                    title={
                                        <span className='stats-cards-title' >
                                            { <Spin size='small' /> }
                                        </span>} 
                                    description="Pacientes" 
                                />
                            </Card>
                        </Link>
                        <Link to={'/appointments'}>
                            <Card
                                className='stats-cards'
                                hoverable
                                bodyStyle={{ padding: 0 }}
                                cover={ 
                                    <div className='stats-cards-icon-container'>
                                        <CalendarOutlined className='stats-cards-icon' id='appointment' />
                                    </div>  
                                }
                                >
                                <Meta 
                                    title={
                                        <span className='stats-cards-title' >
                                            { <Spin size='small' /> }
                                        </span>} 
                                    description="Consultas" 
                                    />
                            </Card>
                        </Link>
                        <Link to={'/exams'}>
                            <Card
                                className='stats-cards'
                                hoverable
                                bodyStyle={{ padding: 0 }}
                                cover={ 
                                    <div className='stats-cards-icon-container'>
                                        <ExperimentOutlined className='stats-cards-icon' id='exam' />
                                    </div>  
                                }
                                >
                                <Meta 
                                    title={
                                        <span className='stats-cards-title' >
                                            { <Spin size='small' /> }
                                        </span>} 
                                    description="Exames" 
                                    />
                            </Card>                                
                        </Link>
                    </div>
                </section>
            </>
        )
    }

    return isLogged ? renderPage() : <Navigate to='/login' />

}

export default HomePage