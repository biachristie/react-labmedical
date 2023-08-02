import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Divider, Form, Input, message } from 'antd'
import { 
    CloseCircleOutlined,
    DeleteOutlined,
    EditOutlined, 
    SaveOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'

import './RegisterExamForm.component.css'
import InputComponent from '../InputComponent/Input.component'
import { ExamService } from '../../services/Exam/Exam.service'
import { PatientService } from '../../services/Patient/Patient.service'

function RegisterExamForm() {
    let params = new URL(document.location).searchParams
    const examId = params.get('id')

    useEffect(() => { 
        form.resetFields()
        fetchExamsList()
    }, [])

    const [examsList, setExamsList] = useState([])
    const fetchExamsList = async() => {
        ExamService.Get().then(result => setExamsList(result))
    }

    const [isExamId, setIsExamId] = useState(false)
    useEffect(() => { 
        if (examId !== null) {
            setIsExamId(true)
        }
    }, [examId])

    useEffect(() => { 
        if (examId !== null) { filterExam() }
    }, [examsList])

    const [exam, setExam] = useState([])
    const filterExam = () => {
        const filteredExam = examsList.filter(exam => String(exam.id).includes(examId))
        setExam(filteredExam)
    }

    useEffect(() => {
        if(exam.length > 0) {
            form.setFieldsValue({ 
                idPatient: exam[0].idPatient,
                patientName: exam[0].patientName,
                idDoctor: exam[0].idUser,
                doctor: exam[0].doctor,
                date: dayjs(exam[0].date, "DD/MM/YYYY", 'pt-br'),
                hour: dayjs(exam[0].hour, "HH:mm", 'pt-br'),
                status: exam[0].status,
                type: exam[0].type,
                examName: exam[0].examName,
                lab: exam[0].lab,
                reasoning: exam[0].reasoning,
                urlDocument: exam[0].urlDocument,
                results: exam[0].results,
            })

            setExamDate(form.getFieldValue('date').format('DD/MM/YYYY'))
            setExamHour(form.getFieldValue('hour').format('HH:mm'))
        }
    }, [exam])

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
    const [examDate, setExamDate] = useState('')
    const onChangeDate = (_, dateString) => { setExamDate(dateString) }

    const hourFormat = 'HH:mm'
    const [examHour, setExamHour] = useState('')
    const onChangeHour = (_, hourString) => { setExamHour(hourString) }

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

    const isExamRegistered = () => {
        let filteredPatientExams = examsList.filter(exam => String(exam.idPatient).includes(dataForm.idPatient))
        let filteredDate = filteredPatientExams.filter(exam => exam.date.includes(examDate))
        let filteredHour = filteredDate.filter(exam => exam.hour.includes(examHour))

        if (filteredHour.length > 0) {
            messageApi.open({ type: 'error', content: 'Esse paciente já possui exame cadastrado nesse dia e horário.' })
            filteredPatientExams = []
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
            idUser: dataForm.idDoctor,
            doctor: dataForm.doctor,
            date: examDate,
            hour: examHour,
            status: dataForm.status,
            type: dataForm.type,
            examName: dataForm.examName,
            lab: dataForm.lab,
            reasoning: dataForm.reasoning,
            urlDocument: dataForm.urlDocument,
            results: dataForm.results,
            created_at: Date.now()
        }

        examId ? onUpdate(submitData) : onSave(submitData)
    }

    const onUpdate = async(submitData) => {
        await ExamService.Update(examId, submitData)
            .then(() => {
                messageApi.open({ type: 'success', content: 'Sucesso! Exame editado.' })
                form.resetFields()
            })
            .catch(() => {
                messageApi.open({ type: 'error', content: 'Erro no cadastro. Por favor, tente novamente.' })
                form.resetFields()
            })
    }

    const onSave = async(submitData) => {
        if(isExamRegistered()) { return }

        await ExamService.Create(submitData)
            .then(() => {
                messageApi.open({ type: 'success', content: 'Sucesso! Exame cadastrado.' })
                form.resetFields()
            })
            .catch(() => {
                messageApi.open({ type: 'error', content: 'Erro no cadastro. Por favor, tente novamente.' })
                form.resetFields()
            })
    }

    const onDelete = async() => {
        const response = await ExamService.Delete(examId)
        
        if(response.status === 200) {
            messageApi.open({ type: 'success', content: 'Sucesso! Exame excluído.' })
            form.resetFields()
        } else if (response.status === 404) {
            messageApi.open({ type: 'error', content: 'Erro na exclusão! Exame não existe.' })
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

            <div className='register-exam-form-container'>
                <Divider 
                    orientation="center" 
                    plain
                >
                    Informações 
                </Divider>

                <Form 
                    form={ form } 
                    name='register-form'
                    className='register-exam-form'
                    layout='vertical'
                    onFinish={ onSubmitForm }
                    autoComplete='off'
                >

                    <div className='register-exam-form-section'>
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
                                style={{ width: '30%' }}
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
                                style={{ width: '70%' }}
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
                                style={{ width: '30%' }}
                                onChange={ onChangeDoctor }
                                placeholder='Insira o código do médico'
                                type='number'
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
                                style={{ width: '70%' }}
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
                                    { label: 'Aguardando Atendimento', value: 'Aguardando Atendimento' },
                                    { label: 'Em Andamento', value:'Em Andamento' },
                                    { label: 'Atendido', value: 'Atendido' }
                                ]}
                                type='select'
                            />
                        </div>

                        <div className='form-section-inner-container'>
                            <InputComponent 
                                label="Tipo de Exame"
                                id="type"
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
                                style={{ width: '30%' }}
                                placeholder='Insira o tipo de exame'
                                type='text'
                            />

                            <InputComponent 
                                label="Nome do Exame"
                                id="examName"
                                rules={[
                                    {
                                        required: true,
                                        message: '${label} é obrigatório'
                                    },
                                    {
                                        min: 5,
                                        max: 30,
                                        message: '${label} deve conter entre ${min} e ${max} caracteres'
                                    },
                                    {
                                        type: 'text',
                                        message: '${label} não é um ${type} válido(a)'
                                    }
                                ]}
                                style={{ width: '70%' }}
                                placeholder='Insira o nome do exame'
                                type='text'
                            />
                        </div>

                        <div className='form-section-inner-container'>
                            <InputComponent 
                                label="Laboratório"
                                id="lab"
                                rules={[
                                    {
                                        required: true,
                                        message: '${label} é obrigatório'
                                    },
                                    {
                                        min: 5,
                                        max: 30,
                                        message: '${label} deve conter entre ${min} e ${max} caracteres'
                                    },
                                    {
                                        type: 'text',
                                        message: '${label} não é um ${type} válido(a)'
                                    }
                                ]}
                                style={{ width: '40%' }}
                                placeholder='Insira o nome do laboratório'
                                type='text'
                            />

                            <InputComponent 
                                label="Indicação"
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
                                style={{ width: '60%' }}
                                placeholder='Insira a indicação do exame'
                                type='text'
                            />
                        </div>
                    </div>

                    <Divider 
                        orientation="center" 
                        plain
                    >
                        Resultados 
                    </Divider>

                    <div className='register-exam-form-section'>
                        <InputComponent 
                            label="Documento"
                            id="urlDocument"
                            rules={[
                                {
                                    type: 'text',
                                    message: '${label} não é um ${type} válido(a)'
                                }
                            ]}
                            placeholder='Insira o link do exame'
                            type='text'
                        />

                        <InputComponent 
                            label="Resultados"
                            id="results"
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
                            placeholder='Insira os resultados'
                            maxLength={ 1000 }
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
                                disabled={ !isExamId }
                            >
                                <EditOutlined /> Editar
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <Button 
                                className='register-patient-btn-delete'
                                type='primary'
                                disabled={ !isExamId }
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
            </div>
        </>
    )
}

export default RegisterExamForm