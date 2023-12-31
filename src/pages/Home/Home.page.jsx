import { Fragment, useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Avatar, Card, Input, Pagination, Skeleton, Typography } from 'antd'
import { 
    CalendarOutlined, 
    EllipsisOutlined, 
    ExperimentOutlined, 
    UserOutlined 
} from '@ant-design/icons'
import Meta from 'antd/es/card/Meta'

import './Home.page.css'
import { TitlesContext } from '../../context/titles/titles.context'

function HomePage() {
    const isLogged = JSON.parse(localStorage.getItem('isLogged'))
    const navigate = useNavigate()
    
    const { setTitle } = useContext(TitlesContext)
    
    const [loading, setLoading] = useState(true)
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

    useEffect(() => {
        if (patientCardInfo.length > 0) { setLoading(false) }
    }, [patientCardInfo])

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

    const renderPatientCard = (patientCardInfo) => {
        return (
            <Fragment key={ patientCardInfo.id } >
                <Card
                    className='patients-cards'
                    actions={[
                        <div>
                            <EllipsisOutlined 
                                key="ellipsis" 
                                onClick={ () => navigate(`/patientRegister?id=${patientCardInfo.id}`) } 
                                />
                        </div>
                    ]}
                >
                    <Meta
                        className='patients-cards-info'
                        avatar={
                            <Avatar 
                                className='patients-cards-avatar'
                                shape='square'
                                src={ patientCardInfo.avatar || <UserOutlined /> }
                            />
                        }
                        title={
                            <Typography.Text 
                                className='patients-cards-title'
                                ellipsis={ true } 
                            >
                                { patientCardInfo.fullname }
                            </Typography.Text>
                        }
                        description={
                            <div className='patients-cards-description'>
                                <span>{ `Idade: ${ patientCardInfo.age } anos` }</span>
                                <span>{ `Celular: ${ patientCardInfo.cellphone }` }</span>
                                <span>{ `Convênio: ${ patientCardInfo.healthPlanName || '' }` }</span>
                            </div>
                        }
                    />
                </Card>
            </Fragment>
        )
    }

    const numEachPage = 10
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(numEachPage)

    const handleChange = (value) => {
        setMinValue( (value - 1) * numEachPage )
        setMaxValue( value * numEachPage )
    }

    const renderPage = () => {
        return (
            <>
                <section className='layout-content-section-h1'>
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
                                                { patientCardInfo ? patientCardInfo.length : 0 }
                                            </span>
                                        } 
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
                                            { appointmentCardInfo ? appointmentCardInfo.length : 0 }
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
                                            { examCardInfo.length ? examCardInfo.length : 0 }
                                        </span>} 
                                    description="Exames" 
                                    />
                            </Card>                                
                        </Link>
                    </div>
                </section>
                <section className='layout-content-section-h2'>
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
                        { patientCardInfo.length > 0 && <Skeleton loading= { loading }>
                            <div className='layout-content-patients-cards'>
                                { 
                                    patientCardInfo
                                    .filter(searchTerm)
                                    .slice(minValue, maxValue)
                                    .map(renderPatientCard) 
                                }
                            </div>
                            <Pagination 
                                defaultCurrent={ 1 }
                                defaultPageSize={ numEachPage }
                                onChange={ handleChange }
                                total={ patientCardInfo.length }  
                                size='small'
                            />
                        </Skeleton>}
                    </div>
                </section>
            </>
        )
    }

    return isLogged ? renderPage() : <Navigate to='/login' />

}

export default HomePage