import { Button, Divider, Form } from "antd"
import { 
    CloseCircleOutlined,
    DeleteOutlined,
    EditOutlined, 
    SaveOutlined,
} from '@ant-design/icons'

import InputComponent from "../InputComponent/Input.component"

function RegisterAppointmentForm() {
    return (
        <>
            <Divider
                orientation="center" 
                style={{ marginTop: '40px' }}
                plain
            >
                Informações 
            </Divider>

            <Form
                // form={ } 
                name='register-form'
                className='register-appointment-form'
                layout='vertical'
                // onFinish={ }
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
                            // onChange={ }
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
                            style={{ width: '20%' }}
                            // format={  }
                            placeholder='Selecione a data'
                            // onChange={  }
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
                            style={{ width: '20%' }}
                            // format={  }
                            placeholder='Selecione a hora'
                            // onChange={  }
                            type='hour'
                        />
                        
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
                            style={{ width: '40%' }}
                            placeholder='Insira o motivo da consulta'
                            type='text'
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
                            style={{ width: '20%' }}
                            options={[
                                { label: 'Aguardando Atendimento', value: 'Aguardando Atendimento' },
                                { label: 'Em Andamento', value:'Em Andamento' },
                                { label: 'Atendido', value: 'Atendido' }
                            ]}
                            type='select'
                        />
                    </div>

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
                    style={{ marginTop: '40px' }}
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
                            // disabled={ }
                        >
                            <EditOutlined /> Editar
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button 
                            className='register-patient-btn-delete'
                            type='primary'
                            // disabled={ }
                            // onClick={ }
                        >
                            <DeleteOutlined /> Excluir
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button 
                            className='register-patient-btn-save'
                            type='primary'
                            htmlType='submit' 
                            // disabled={ }
                        >
                            <SaveOutlined /> Salvar
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            className='register-patient-btn-cancel'
                            type='primary'
                            htmlType='button'
                            // onClick={ }
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