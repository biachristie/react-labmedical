import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Divider, Form, message } from 'antd'
import { 
    CloseCircleOutlined,
    DeleteOutlined,
    EditOutlined, 
    SaveOutlined,
} from '@ant-design/icons'

import InputComponent from '../InputComponent/Input.component'
import { ExamService } from '../../services/Exam/Exam.service'

function RegisterExamForm() {
    let params = new URL(document.location).searchParams
    const examId = params.get('id')

    const [form] = Form.useForm()
    const dataForm = Form.useWatch([], form)

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

    const onSave = async(submitData) => {
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

            <div className='register-exam-form-container'>
                <Divider 
                    orientation="center" 
                    style={{ marginTop: '40px' }}
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
                                style={{ width: '20%' }}
                                disabled={ true }
                                type='number'
                            />
                            
                            <InputComponent 
                                label="Nome Completo"
                                id="fullname"
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
                                style={{ width: '20%' }}
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
                                style={{ width: '80%' }}
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
                        style={{ marginTop: '40px' }}
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

                    <div className='register-exam-buttons-container'>
                        <Form.Item>
                            <Button 
                                className='register-patient-btn-edit'
                                type='primary'
                                htmlType='submit'
                                // disabled={  }
                            >
                                <EditOutlined /> Editar
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <Button 
                                className='register-patient-btn-delete'
                                type='primary'
                                // disabled={  }
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
                                // disabled={  }
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