import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Divider, Form, Input, message } from "antd"
import { 
    CloseCircleOutlined,
    DeleteOutlined,
    EditOutlined, 
    SaveOutlined,
} from '@ant-design/icons'
import dayjs from "dayjs"

import './RegisterAppointmentForm.component.css'
import InputComponent from "../InputComponent/Input.component"
import { AppointmentService } from "../../services/Appointment/Appointment.service"
import { PatientService } from "../../services/Patient/Patient.service"

function RegisterAppointmentForm() {
    let params = new URL(document.location).searchParams
    const appointmentId = params.get('id')

    useEffect(() => { 
        form.resetFields()
        fetchAppointmentsList()
    }, [])

    const [appointmentsList, setAppointmentsList] = useState([])
    const fetchAppointmentsList = async() => {
        AppointmentService.Get().then(result => setAppointmentsList(result))
    }

    const [isAppointmentId, setIsAppointmentId] = useState(false)
    useEffect(() => { 
        if (appointmentId !== null) {
            setIsAppointmentId(true)
        }
    }, [appointmentId])

    useEffect(() => { 
        if (appointmentId !== null) { filterAppointment() }
    }, [appointmentsList])

    const [appointment, setAppointment] = useState([])
    const filterAppointment = () => {
        const filteredAppointment = appointmentsList.filter(appointment => String(appointment.id).includes(appointmentId))
        setAppointment(filteredAppointment)
    }

    useEffect(() => {
        if(appointment.length > 0) {
            form.setFieldsValue({ 
                idPatient: appointment[0].idPatient,
                patientName: appointment[0].patientName,
                date: dayjs(appointment[0].date, "DD/MM/YYYY", 'pt-br'),
                hour: dayjs(appointment[0].hour, "HH:mm", 'pt-br'),
                idDoctor: appointment[0].idUser,
                medicalSpecialty: appointment[0].medicalSpecialty,
                doctor: appointment[0].doctor,
                reasoning: appointment[0].reasoning,
                issueDescription: appointment[0].issueDescription,
                medication: appointment[0].medication,
                dosagePrecautions: appointment[0].dosagePrecautions,
                status: appointment[0].status,
            })

            setAppointmentDate(form.getFieldValue('date').format('DD/MM/YYYY'))
            setAppointmentHour(form.getFieldValue('hour').format('HH:mm'))
        }
    }, [appointment])

    const [form] = Form.useForm()
    const dataForm = Form.useWatch([], form)

    const [submit, setSubmit] = useState(false)
    useEffect(() => {
        form
            .validateFields({ validateOnly: true })
            .then(() => { setSubmit(true) }, () => { setSubmit(false) })
    }, [dataForm])

    const searchTerm = (value) => { setPatientId(value) }

    const [patientId, setPatientId] = useState('')
    useEffect(() => { 
        if (patientId !== null) {
            fetchPatient()
        }
    }, [patientId])

    const [patient, setPatient] = useState([])
    const fetchPatient = async() => {
        const response = await PatientService.Show(patientId)
        setPatient(response)
    }

    useEffect(() => {
        if((Object.keys(patient).length > 0)) {
            form.setFieldsValue({ 
                idPatient: patient.id,
                patientName: patient.fullname
            })
        }
    }, [patient])

    const dateFormat = 'DD/MM/YYYY'
    const [appointmentDate, setAppointmentDate] = useState('')
    const onChangeDate = (_, dateString) => { setAppointmentDate(dateString) }

    const hourFormat = 'HH:mm'
    const [appointmentHour, setAppointmentHour] = useState('')
    const onChangeHour = (_, hourString) => { setAppointmentHour(hourString) }

    const onChangeDoctor = (value) => {
        const doctorId = value

        const fetchDoctor = async() => {
            const responseDoctor = await fetch(`http://localhost:3000/users/${ doctorId }`)
            const dataDoctor = await responseDoctor.json()
            form.setFieldsValue({ 
                doctor : dataDoctor.name
            })
        }
        
        doctorId > 0 ? fetchDoctor() : null
    }

    const isAppointmentRegistered = () => {
        let filteredPatientAppointments = appointmentsList.filter(appointment => String(appointment.idPatient).includes(dataForm.idPatient))
        let filteredDate = filteredPatientAppointments.filter(appointment => appointment.date.includes(appointmentDate))
        let filteredHour = filteredDate.filter(appointment => appointment.hour.includes(appointmentHour))

        if (filteredHour.length > 0) {
            messageApi.open({ type: 'error', content: 'Esse paciente já possui consulta cadastrada nesse dia e horário.' })
            filteredPatientAppointments = []
            filteredDate = []
            filteredHour = []
            return true
        }

        return false
    }

    const [messageApi, contextHolder] = message.useMessage()

    const onSubmitForm = async() => {
        const submitData = {
            idPatient: dataForm.idPatient,
            patientName: dataForm.patientName,
            date: appointmentDate,
            hour: appointmentHour,
            medicalSpecialty: dataForm.medicalSpecialty,
            idUser: dataForm.idDoctor,
            doctor: dataForm.doctor,
            reasoning: dataForm.reasoning,
            issueDescription: dataForm.issueDescription,
            medication: dataForm.medication,
            dosagePrecautions: dataForm.dosagePrecautions,
            status: dataForm.status,
            created_at: Date.now()
        }

        appointmentId ? onUpdate(submitData) : onSave(submitData)
    }

    const onUpdate = async(submitData) => {
        await AppointmentService.Update(appointmentId, submitData)
            .then(() => {
                messageApi.open({ type: 'success', content: 'Sucesso! Consulta editada.' })
                form.resetFields()
            })
            .catch(() => {
                messageApi.open({ type: 'error', content: 'Erro no cadastro. Por favor, tente novamente.' })
                form.resetFields()
            })
    }

    const onSave = async(submitData) => {
        if(isAppointmentRegistered()) { return }

        await AppointmentService.Create(submitData)
            .then(() => {
                messageApi.open({ type: 'success', content: 'Sucesso! Consulta cadastrada.' })
                form.resetFields()
            })
            .catch(() => {
                messageApi.open({ type: 'error', content: 'Erro no cadastro. Por favor, tente novamente.' })
                form.resetFields()
            })
    }

    const onDelete = async() => {
        const response = await AppointmentService.Delete(appointmentId)
        
        if(response.status === 200) {
            messageApi.open({ type: 'success', content: 'Sucesso! Consulta excluída.' })
            form.resetFields()
        } else if (response.status === 404) {
            messageApi.open({ type: 'error', content: 'Erro na exclusão! Consulta não existe.' })
            form.resetFields()
        } else {
            messageApi.open({ type: 'error', content: 'Erro na exclusão. Por favor, tente novamente.' })
            form.resetFields()
        }
    }

    const navigate = useNavigate()
    const onCancel = () => { navigate('/') }

    return (
        <>
            { contextHolder }

            <div className='register-appointment-search-container'>
                <Input.Search
                    className='register-patient-search'
                    placeholder='Insira o código do paciente'
                    allowClear
                    onSearch={ searchTerm }
                />
            </div>

            <Divider
                orientation="center" 
                plain
            >
                Informações 
            </Divider>

            <Form
                form={ form } 
                name='register-form'
                className='register-appointment-form'
                layout='vertical'
                onFinish={ onSubmitForm }
                autoComplete='off'
            >

                <div className='register-appointment-form-section'>
                    <div className='form-section-inner-container'>
                        <InputComponent 
                            label="Código do Paciente"
                            id="idPatient"
                            rules={[
                                {
                                    required: true,
                                    message: '${label} é obrigatório'
                                },
                                {
                                    type: 'number',
                                    message: '${label} não é um ${type} válido(a)'
                                }
                            ]}
                            style={{ width: '20%' }}
                            disabled={ true }
                            type='number'
                        />
                        
                        <InputComponent 
                            label="Nome Completo"
                            id="patientName"
                            rules={[
                                {
                                    required: true,
                                    message: '${label} é obrigatório'
                                },
                                {
                                    min: 5,
                                    max: 50,
                                    message: '${label} deve conter entre ${min} e ${max} caracteres'
                                },
                                {
                                    type: 'text',
                                    message: '${label} não é um ${type} válido(a)'
                                }
                            ]}
                            style={{ width: '80%' }}
                            disabled={ true }
                            type='text'
                        />
                    </div>

                    <div className='form-section-inner-container'>
                        <InputComponent 
                            label="Código do Médico(a)"
                            id="idDoctor"
                            rules={[
                                {
                                    required: true,
                                    message: '${label} é obrigatório'
                                },
                                {
                                    type: 'number',
                                    message: '${label} não é um ${type} válido(a)'
                                }
                            ]}
                            style={{ width: '20%' }}
                            onChange={ onChangeDoctor }
                            placeholder='Insira o código do médico'
                            type='number'
                        />
                        
                        <InputComponent
                            label='Especialidade Médica'
                            id='medicalSpecialty'
                            rules={[
                                {
                                    required: true,
                                    message: '${label} é obrigatório'
                                }
                            ]}
                            style={{ width: '30%' }}
                            options={[
                                { label: 'Clínica Médica', value: 'Clínica Médica' },
                                { label: 'Cardiologia', value:'Cardiologia' },
                                { label: 'Neurologia', value: 'Neurologia' },
                                { label: 'Psiquiatria', value: 'Psiquiatria' },
                                { label: 'Endocrinologia', value: 'Endocrinologia' },
                                { label: 'Ortopedia', value: 'Ortopedia' },
                                { label: 'Dermatologia', value: 'Dermatologia' },
                                { label: 'Oftalmologia', value: 'Oftalmologia' },
                                { label: 'Ginecologia', value: 'Ginecologia' },
                                { label: 'Pediatria', value: 'Pediatria' }
                            ]}
                            type='select'
                        />

                        <InputComponent 
                            label="Médico(a)"
                            id="doctor"
                            rules={[
                                {
                                    required: true,
                                    message: '${label} é obrigatório'
                                },
                                {
                                    min: 5,
                                    max: 50,
                                    message: '${label} deve conter entre ${min} e ${max} caracteres'
                                },
                                {
                                    type: 'text',
                                    message: '${label} não é um ${type} válido(a)'
                                }
                            ]}
                            style={{ width: '50%' }}
                            disabled={ true }
                            type='text'
                        />
                    </div>

                    <div className='form-section-inner-container'>
                        <InputComponent
                            label='Data'
                            id='date'
                            rules={[
                                {
                                    required: true,
                                    message: '${label} é obrigatório'
                                },
                                {
                                    type: 'object',
                                    message: '${label} não é um ${type} válido(a)'
                                }
                            ]}
                            style={{ width: '30%' }}
                            format={ dateFormat }
                            placeholder='Selecione a data'
                            onChange={ onChangeDate }
                            type='date'
                        />

                        <InputComponent
                            label='Hora'
                            id='hour'
                            rules={[
                                {
                                    required: true,
                                    message: '${label} é obrigatório'
                                },
                                {
                                    type: 'object',
                                    message: '${label} não é um ${type} válido(a)'
                                }
                            ]}
                            style={{ width: '30%' }}
                            format={ hourFormat }
                            placeholder='Selecione a hora'
                            onChange={ onChangeHour }
                            type='hour'
                        />

                        <InputComponent
                            label='Status'
                            id='status'
                            rules={[
                                {
                                    required: true,
                                    message: '${label} é obrigatório'
                                }
                            ]}
                            style={{ width: '40%' }}
                            options={[
                                { label: 'Aguardando Atendimento', value: 'Aguardando atendimento' },
                                { label: 'Em Andamento', value:'Em Andamento' },
                                { label: 'Atendido', value: 'Atendido' }
                            ]}
                            type='select'
                        />
                    </div>

                    <InputComponent 
                        label="Motivo da Consulta"
                        id="reasoning"
                        rules={[
                            {
                                required: true,
                                message: '${label} é obrigatório'
                            },
                            {
                                min: 6,
                                max: 60,
                                message: '${label} deve conter entre ${min} e ${max} caracteres'
                            },
                            {
                                type: 'text',
                                message: '${label} não é um ${type} válido(a)'
                            }
                        ]}
                        placeholder='Insira o motivo da consulta'
                        type='text'
                    />

                    <InputComponent 
                        label="Descrição da Consulta"
                        id="issueDescription"
                        rules={[
                            {
                                required: true,
                                message: '${label} é obrigatório'
                            },
                            {
                                min: 15,
                                max: 1000,
                                message: '${label} deve conter entre ${min} e ${max} caracteres'
                            },
                            {
                                type: 'text',
                                message: '${label} não é um ${type} válido(a)'
                            }
                        ]}
                        maxLength={ 1000 }
                        maxRows={ 8 }
                        placeholder='Insira detalhes sobre a consulta'
                        type='textarea'
                    />
                </div>

                <Divider 
                    orientation="center" 
                    plain
                >
                    Prescrição Médica 
                </Divider>

                <div className='register-appointment-form-section'>
                    <InputComponent
                        label='Medicação'
                        id='medication'
                        rules={[
                            {
                                type: 'text',
                                message: '${label} não é um ${type} válido(a)'
                            }
                        ]}
                        placeholder='Insira a medicação receitada'
                        type='text'
                    />

                    <InputComponent 
                        label="Dosagem e Precauções"
                        id="dosagePrecautions"
                        rules={[
                            {
                                required: true,
                                message: '${label} é obrigatório'
                            },
                            {
                                min: 15,
                                max: 250,
                                message: '${label} deve conter entre ${min} e ${max} caracteres'
                            },
                            {
                                type: 'text',
                                message: '${label} não é um ${type} válido(a)'
                            }
                        ]}
                        maxLength={ 250 }
                        maxRows={ 6 }
                        type='textarea'
                    />
                </div>

                <div className='register-patient-buttons-container'>
                    <Form.Item>
                        <Button 
                            className='register-patient-btn-edit'
                            type='primary'
                            htmlType='submit'
                            disabled={ !isAppointmentId }
                        >
                            <EditOutlined /> Editar
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button 
                            className='register-patient-btn-delete'
                            type='primary'
                            disabled={ !isAppointmentId }
                            onClick={ onDelete }
                        >
                            <DeleteOutlined /> Excluir
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button 
                            className='register-patient-btn-save'
                            type='primary'
                            htmlType='submit' 
                            disabled={ !submit }
                        >
                            <SaveOutlined /> Salvar
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            className='register-patient-btn-cancel'
                            type='primary'
                            htmlType='button'
                            onClick={ onCancel }
                        >
                            <CloseCircleOutlined /> Cancelar
                        </Button>
                    </Form.Item>
                </div>

            </Form>
        </>
    )
}

export default RegisterAppointmentForm