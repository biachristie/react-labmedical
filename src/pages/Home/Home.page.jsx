import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Input, Skeleton, Spin } from 'antd'
import { CalendarOutlined, ExperimentOutlined, UserOutlined } from '@ant-design/icons'
import Meta from 'antd/es/card/Meta'

import './Home.page.css'
import { TitlesContext } from '../../context/titles/titles.context'

function HomePage() {
    const isLogged = JSON.parse(localStorage.getItem('isLogged'))
    
    const { setTitle } = useContext(TitlesContext)

    const [patientCardInfo, setPatientCardInfo] = useState([])
    const [appointmentCardInfo, setAppointmentCardInfo] = useState([])
    const [examCardInfo, setExamCardInfo] = useState([])

    useEffect(() => {
        setTitle('Estatísticas e Informações')
        const fetchData = async() => {
            const responsePatients = await fetch('http://localhost:3000/patients')
            const responseAppointments = await fetch('http://localhost:3000/appointments')
            const responseExams = await fetch('http://localhost:3000/exams')
            const dataPatients = await responsePatients.json()
            const dataAppointments = await responseAppointments.json()
            const dataExams = await responseExams.json()
            setPatientCardInfo(dataPatients)
            setAppointmentCardInfo(dataAppointments)
            setExamCardInfo(dataExams)
        }
    
        fetchData()
    }, [])

    const [searchedTerm, setSearchedTerm] = useState('')

    const searchTerm = (value) => {
        if (!searchedTerm) {
            return value
        } else if (value.fullname.toLowerCase().includes(searchedTerm.toString().toLowerCase())) {
            return value
        } else if (value.telephone.includes(searchedTerm)) {
            return value
        } else if (value.cellphone.includes(searchedTerm)) {
            return value
        } else if (value.email.includes(searchedTerm)) {
            return value
        }
    }

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
                                            { patientCardInfo.length || <Spin size='small' /> }
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
                                            { appointmentCardInfo.length || <Spin size='small' /> }
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
                                            { examCardInfo.length || <Spin size='small' /> }
                                        </span>} 
                                    description="Exames" 
                                    />
                            </Card>                                
                        </Link>
                    </div>
                </section>
                <section className='layout-content-section-2'>
                    <h2 className='layout-content-title'>Informações rápidas de pacientes</h2>
                    <div className='layout-content-search-container'>
                        <Input.Search
                            className='layout-content-search'
                            placeholder='Insira o nome, telefone ou e-mail do paciente'
                            allowClear
                            onSearch={ value => setSearchedTerm(value) }
                        />
                    </div>
                    <div className='layout-content-patients-cards-container'>
                        <Skeleton>
                            <div className='layout-content-patients-cards'>
                                { 
                                    patientCardInfo
                                        .filter(searchTerm)
                                }
                            </div>
                        </Skeleton>
                    </div>
                </section>
            </>
        )
    }

    return isLogged ? renderPage() : <Navigate to='/login' />

}

export default HomePage