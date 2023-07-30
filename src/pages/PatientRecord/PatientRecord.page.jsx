import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { Avatar, Button, Card, Input, Space, Table, Tabs, Tag, Typography } from "antd"
import { 
    EditOutlined,
    MailOutlined, 
    MobileOutlined, 
    PhoneOutlined, 
    PrinterOutlined,
    SendOutlined,
    ShareAltOutlined,
    UserOutlined 
} from '@ant-design/icons'

import './Patientrecord.page.css'
import { TitlesContext } from '../../context/titles/titles.context'
import { PatientService } from "../../services/Patient/Patient.service"
import { AppointmentService } from "../../services/Appointment/Appointment.service"
import { ExamService } from "../../services/Exam/Exam.service"

function PatientRecordPage() {
    const isLogged = JSON.parse(localStorage.getItem('isLogged'))

    let params = new URL(document.location).searchParams
    let patientId = params.get('id')

    const [patient, setPatient] = useState([])
    const [appointments, setAppointments] = useState([])
    const [exams, setExams] = useState([])

    const { setTitle } = useContext(TitlesContext)
    useEffect(() => {
        setTitle('Detalhes do Paciente')

        if (patientId !== null) { 
            PatientService.Show(patientId).then(result => setPatient(result))
            AppointmentService.Get().then(result => setAppointments(result))
            ExamService.Get().then(result => setExams(result))
        }
    }, [])

    const [filteredAppointments, setFilteredAppointments] = useState([])   
    const [filteredExams, setFilteredExams] = useState([])   

    useEffect(() => {
        setFilteredAppointments(appointments.filter(value => value.idPatient.toString().includes(patientId)))
        setFilteredExams(exams.filter(value => value.idPatient.toString().includes(patientId)))
    }, [appointments])

    const [searchedAppointment, setSearchedAppointment] = useState('')
    const searchAppointment = (value, record) => { return String(record.date).includes(value) }

    const [searchedExam, setSearchedExam] = useState('')
    const searchExams = (value, record) => { 
        return String(record.date).includes(value) || 
        String(record.examName).toLowerCase().includes(value.toLowerCase())
    }

    const tabItems = [
        {
            key: '1',
            label: 'Alergias',
            children: (
                <span>
                    { patient.alergyList || null}
                </span>
            )
        },
        {
            key: '2',
            label: 'Cuidados Especiais',
            children: (
                <span>
                    { patient.specialCareList || null}
                </span>
            )
        },
    ]

    const columnsAppointments = [
        {
            key: 'id',
            title: 'ID',
            dataIndex: 'id',
            align: 'center',
        },
        {
            key: 'reasoning',
            title: 'Motivo',
            dataIndex: 'reasoning',
            sorter: (a, b) => a.reasoning > b.reasoning,
        },
        {
            key: 'date',
            title: 'Data',
            dataIndex: 'date',
            filteredValue: [ searchedAppointment ],
            onFilter: searchAppointment,
            sorter: (a, b) => a.date > b.date,
            align: 'center'
        },
        {
            key: 'hour',
            title: 'Hora',
            dataIndex: 'hour',
            sorter: (a, b) => a.hour > b.hour,
            align: 'center'
        },
        {
            key: 'medication',
            title: 'Prescrição Médica',
            dataIndex: 'medication',
            sorter: (a, b) => a.medication > b.medication,
            render: (_, record) => {
                return  <div>
                            <span>{ record.medication }, { record.dosagePrecautions }</span>
                        </div>
            }
        },
        {
            key: 'issueDescription',
            title: 'Descrição',
            dataIndex: 'issueDescription',
            sorter: (a, b) => a.issueDescription > b.issueDescription,
        },
        {
            key: 'doctor',
            title: 'Médico(a)',
            dataIndex: 'doctor',
            sorter: (a, b) => a.doctor > b.doctor,
        },
        {
            key: 'medicalSpecialty',
            title: 'Especialidade',
            dataIndex: 'medicalSpecialty',
            sorter: (a, b) => a.medicalSpecialty > b.medicalSpecialty,
        },
        {
            key: 'status',
            title: 'Status',
            dataIndex: 'status',
            render: (_, record) => {
                const color = (record) => {
                    switch (record.status) {
                        case 'Aguardando atendimento':
                            return '#FAAD14'
                        case 'Em andamento':
                            return '#979797'
                        case 'Atendido':
                            return '#358423'
                        default:
                            break;
                    }
                }

                return  <Tag color={ color(record) }>
                            { record.status }
                        </Tag>
            },
            align: 'center'
        },
        {
            key:'actions',
            title: 'Ações',
            render: (_, record) => (
                <Space>
                    <a href={ `/appointmentRegister?id=${record.id}` }>
                        <EditOutlined className='layout-content-table-edit' />
                    </a>
                </Space>
            ),
            align: 'center'
        }
    ]

    const columnsExams = [
        {
            key: 'id',
            title: 'ID',
            dataIndex: 'id',
            align: 'center',
        },
        {
            key: 'examName',
            title: 'Nome',
            dataIndex:'examName',
            filteredValue: [ searchedExam ],
            onFilter: searchExams,
            sorter: (a, b) => a.name > b.name,
        },
        {
            key: 'type',
            title: 'Tipo',
            dataIndex:'type',
            sorter: (a, b) => a.type > b.type,
        },
        {
            key: 'lab',
            title: 'Laboratório',
            dataIndex:'lab',
            sorter: (a, b) => a.lab > b.lab,
        },
        {
            key: 'date',
            title: 'Data',
            dataIndex: 'date',
            filteredValue: [ searchedExam ],
            onFilter: searchExams,
            sorter: (a, b) => a.date > b.date,
            align: 'center'
        },
        {
            key: 'hour',
            title: 'Hora',
            dataIndex: 'hour',
            sorter: (a, b) => a.hour > b.hour,
        },
        {
            key: 'urlDocument',
            title: 'Documento',
            dataIndex: 'urlDocument',
            render: (_, record) => {
                return  <a href={ `${record.urlDocument}` }>
                            <Typography.Text
                                ellipsis={{ tooltip: `${ record.urlDocument }` }}
                                style={{ width: 150, fontSize: 12 }}
                            >
                                { record.urlDocument }
                            </Typography.Text>
                        </a>
            }
        },
        {
            key: 'results',
            title: 'Resultados',
            dataIndex: 'results',
            sorter: (a, b) => a.results > b.results,
        },
        {
            key: 'doctor',
            title: 'Médico(a)',
            dataIndex: 'doctor',
            sorter: (a, b) => a.doctor > b.doctor,
        },
        {
            key: 'status',
            title: 'Status',
            dataIndex: 'status',
            render: (_, record) => {
                const color = (record) => {
                    switch (record.status) {
                        case 'Aguardando atendimento':
                            return '#FAAD14'
                        case 'Em andamento':
                            return '#979797'
                        case 'Atendido':
                            return '#358423'
                        default:
                            break;
                    }
                }

                return  <Tag color={ color(record) }>
                            { record.status }
                        </Tag>
            },
            align: 'center',
        },
        {
            key:'actions',
            title: 'Ações',
            render: (_, record) => (
                <Space>
                    <a href={ `/examRegister?id=${record.id}` }>
                        <EditOutlined className='layout-content-table-edit' />
                    </a>
                </Space>
            ),
            align: 'center',
        }
    ]

    const render = () => {
        return (
                <>
                    <section className='layout-content-section-pr1'>
                        <Card
                            className='patient-record-card'
                            title={
                                <Avatar
                                    className='patient-record-avatar'
                                    size={{
                                        xs: 80,
                                        sm: 100,
                                        md: 150,
                                        lg: 150,
                                        xl: 150,
                                        xxl: 150,
                                    }}
                                    shape='square'
                                    icon={ <UserOutlined />}
                                    src={ patient.avatar }
                                />
                            }
                            bordered={ false }
                            headStyle={{     
                                display: 'flex',
                                justifyContent: 'start',
                                paddingTop: '30px',
                                paddingLeft: '30px'
                            }}
                            bodyStyle={{
                                paddingLeft: '5px',
                                paddingRight: '30px',
                                width: '100%'
                            }}
                        >
                            <div className='patient-record-info-container'>
                                <div className='patient-record-data'>
                                    <div className='patient-record-info'>
                                        <h2>{ patient.fullname }</h2>
                                        <ul className='patient-info'>
                                            <li>Idade: { patient.age } anos</li>
                                            <li>Convênio: { patient.healthPlanName || null }</li>
                                            <li>Contato de emergência: { patient.emergencyPhone }</li>
                                        </ul>
                                        <ul className='patient-address'>
                                            <li>{ patient.address || null }, { patient.addressNumber || null }{ '- ' + patient.complement || null }</li>
                                            <li>{ patient.district || null }, { patient.city || null } - { patient.state || null }</li>
                                            <li>{ patient.postalCode ? patient.postalCode.substring(0, 5).concat('-', patient.postalCode.substring(5, 8)) : null }</li>
                                            <li>{ patient.references || null }</li>
                                        </ul>
                                    </div>
                                    <div className='patient-record-contact'>
                                        <ul>
                                            <li>
                                                <PhoneOutlined style={{ marginRight: 10 }} />
                                                { patient.telephone || 'Não informado' }
                                            </li>
                                            <li>
                                                <MobileOutlined style={{ marginRight: 10 }} />
                                                { patient.cellphone || 'Não informado' }
                                            </li>
                                            <li>
                                                <MailOutlined style={{ marginRight: 10 }} />
                                                { patient.email || 'Não informado' }
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='patient-record-buttons'>
                                    <Button>
                                        <ShareAltOutlined style={{ marginRight: 5 }} /> Compartilhar
                                    </Button>
                                    <Button>
                                        <SendOutlined style={{ marginRight: 5 }} /> Enviar
                                    </Button>
                                    <Button>
                                        <PrinterOutlined style={{ marginRight: 5 }} /> Imprimir
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </section>

                    <section className='layout-content-section-pr2'>
                        <div className='patient-record-medical-info'>
                            <Tabs
                                className='patient-record-tab'
                                defaultActiveKey='1'
                                items={ tabItems }
                            />
                        </div>
                    </section>

                    <section className='layout-content-section-pr3'>
                        <Table
                            className='layout-content-table'
                            // loading={ }
                            columns={ columnsAppointments }
                            dataSource={ filteredAppointments }
                            rowKey= { (record) => record.id }
                            caption={
                                <div className='table-patient-record-search-container'>
                                    <h2>Consultas</h2>
                                    <Input.Search
                                        className='table-search'
                                        placeholder='Insira a data da consulta'
                                        allowClear
                                        onSearch={ value => setSearchedAppointment(value) }
                                    />
                                </div>
                            }
                            style={{ tableLayout: 'fixed' }}
                            scroll={{ x: '100%' }}
                            pagination={{ 
                                position: ['bottomLeft'], 
                                size: 'small',
                            }}
                        />
                    </section>

                    <section className='layout-content-section-pr4'>
                        <Table
                            className='layout-content-table'
                            columns={ columnsExams }
                            dataSource={ filteredExams }
                            rowKey= { (record) => record.id }
                            caption={
                                <div className='table-patient-record-search-container'>
                                    <h2>Exames</h2>
                                    <Input.Search
                                        className='table-search'
                                        placeholder='Insira a data ou o nome do exame'
                                        allowClear
                                        onSearch={ value => setSearchedExam(value) }
                                    />
                                </div>
                            }
                            style={{ tableLayout: 'fixed' }}
                            scroll={{ x: '100%' }}
                            pagination={{ 
                                position: ['bottomLeft'], 
                                size: 'small',
                            }}
                        />
                    </section>
                </>
            )
        }

    return isLogged ? render() : <Navigate to='/' />
}

export default PatientRecordPage