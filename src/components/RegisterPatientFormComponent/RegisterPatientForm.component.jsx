import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Form, message } from "antd"
import { 
    CloseCircleOutlined,
    DeleteOutlined,
    EditOutlined, 
    SaveOutlined,
} from '@ant-design/icons'

import InputComponent from "../InputComponent/Input.component"
import { PatientService } from "../../services/Patient/Patient.service"

function RegisterPatientForm() {
    let params = new URL(document.location).searchParams
    let patientId = params.get('id')

    const [isPatientId, setIsPatientId] = useState(false)
    useEffect(() => { 
        if (patientId !== null) {
            setIsPatientId(true)
        }
    }, [patientId])

    const [form] = Form.useForm()
    const dataForm = Form.useWatch([], form)

    const [submit, setSubmit] = useState(false)
    useEffect(() => {
        form
            .validateFields({ validateOnly: true })
            .then(() => { setSubmit(true) }, () => { setSubmit(false) })
    }, [dataForm])

    const dateFormat = 'DD/MM/YYYY'
    const monthFormat = 'MM/YYYY'

    const [birthDate, setBirthDate] = useState('')
    const onChangeBirthDate = (_, dateString) => { setBirthDate(dateString) }
    
    const [patientAge, setPatientAge] = useState('')
    useEffect(() => {
        const calcPatientAge = (value) => {
            const year = new Date().getFullYear()
            const birthDate = value
            const birthYear = birthDate.split('/')[2]
            const age = year - birthYear
            return age
        }

        setPatientAge(calcPatientAge(birthDate))
    }, [birthDate])

    const [expireMonth, setExpireMonth] = useState('')
    const onChangeExpireMonth = (_, dateString) => { setExpireMonth(dateString) }

    const onChangeCEP = (e) => {
        const cep = e.target.value

        const fetchData = async() => {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json`)
            const dataCep = await response.json()
            form.setFieldsValue({ 
                address : dataCep.logradouro,
                district : dataCep.bairro,
                city : dataCep.localidade,
                state : dataCep.uf
            })
        }
        
        cep.length === 8 ? fetchData() : null
    }

    const [messageApi, contextHolder] = message.useMessage()

    const onSubmitForm = async() => {
        const submitData = {
            avatar: dataForm.avatar,
            fullname: dataForm.fullname,
            cpf: dataForm.cpf,
            rg: dataForm.rg,
            issuingAuthority: dataForm.issuingAuthority,
            birthDate: birthDate,
            age: patientAge,
            gender: dataForm.gender,
            nationality: dataForm.nationality,
            maritalStatus: dataForm.maritalStatus,
            alergyList: dataForm.alergyList,
            specialCareList: dataForm.specialCareList,
            postalCode: dataForm.postalCode,
            address: dataForm.address,
            addressNumber: dataForm.addressNumber,
            district: dataForm.district,
            city: dataForm.city,
            state: dataForm.state,
            complement: dataForm.complement,
            references: dataForm.references,
            email: dataForm.email,
            telephone: dataForm.telephone,
            cellphone: dataForm.cellphone,
            emergencyPhone: dataForm.emergencyPhone,
            healthPlanName: dataForm.healthPlanName,
            healthPlanNumber: dataForm.healthPlanNumber,
            healthPlanExpire: expireMonth == 'Invalid Date' ? '' : expireMonth,
            created_at: Date.now()
        }

        await PatientService.Create(submitData)
        .then(() => {
            messageApi.open({ type: 'success', content: 'Sucesso! Paciente cadastrado.' })
            form.resetFields()
        })
        .catch(() => {
            messageApi.open({ type: 'error', content: 'Erro no cadastro. Por favor, tente novamente.' })
            form.resetFields()
        })
    }

    const onDelete = async () => {
        const response = await PatientService.Delete(patientId)
        
        if(response === 200) {
            messageApi.open({ type: 'success', content: 'Sucesso! Paciente excluído.' })
            form.resetFields()
        } else if (response === 404) {
            messageApi.open({ type: 'error', content: 'Erro na exclusão! Paciente não existe.' })
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

            <Form 
                    form={ form } 
                    name='register-form'
                    className='register-patient-form'
                    layout='vertical'
                    onFinish={ onSubmitForm }
                    autoComplete='off'
                >

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
                        placeholder='Insira seu nome completo'
                        type='text'
                    />

                    <InputComponent
                        label='Link da Foto'
                        id='avatar'
                        rules={[
                            {
                                type: 'text',
                                message: '${label} não é um ${type} válido(a)'
                            }
                        ]}
                        placeholder='Insira o link da foto'
                        type='text'
                    />

                    <InputComponent
                        label='CPF'
                        id='cpf'
                        rules={[
                            {
                                required: true,
                                message: '${label} é obrigatório',
                            },
                            {
                                pattern: RegExp(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}/g),
                                message: '${label} inválido'
                            },
                            {
                                type: 'text',
                                message: '${label} não é um ${type} válido(a)'
                            }
                        ]}
                        style={{ width: '40%' }}
                        placeholder='XXX.XXX.XXX-XX'
                        type='text'
                    />

                    <InputComponent
                        label='RG'
                        id='rg'
                        rules={[
                            {
                                required: true,
                                message: '${label} é obrigatório',
                            },
                            {
                                pattern: RegExp(/[0-9]{2}\.[0-9]{3}\.[0-9]{3}\-[0-9]{1}/g),
                                message: '${label} inválido'
                            },
                            {
                                type: 'text',
                                message: '${label} não é um ${type} válido(a)'
                            }
                        ]}
                        style={{ width: '40%' }}
                        placeholder='XX.XXX.XXX-X'
                        type='text'
                    />

                    <InputComponent
                        label='Órgão Emissor'
                        id='issuingAuthority'
                        rules={[
                            {
                                required: true,
                                message: '${label} é obrigatório',
                            },
                            {
                                max: 20,
                                message: '${label} deve conter máximo de ${max} caracteres'
                            },
                            {
                                type: 'text',
                                message: '${label} não é um ${type} válido(a)'
                            }
                        ]}
                        style={{ width: '20%' }}
                        placeholder='Insira o órgão emissor'
                        type='text'
                    />

                    <InputComponent
                        label='Data de Nascimento'
                        id='birthDate'
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
                        format={ dateFormat }
                        placeholder='Selecione a data'
                        onChange={ onChangeBirthDate }
                        type='date'
                    />

                    <InputComponent
                        label='Gênero'
                        id='gender'
                        rules={[
                            {
                                required: true,
                                message: '${label} é obrigatório'
                            }
                        ]}
                        style={{ width: '20%' }}
                        options={[
                            { label: 'Feminino', value: 'Feminino' },
                            { label: 'Masculino', value:'Masculino' },
                            { label: 'Outros', value: 'Outros' }
                        ]}
                        placeholder='Selecione uma das opções'
                        type='select'
                    />

                    <InputComponent
                        label='Naturalidade'
                        id='nationality'
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
                        style={{ width: '40%' }}
                        placeholder='Insira sua nacionalidade'
                        type='text'
                    />

                    <InputComponent
                        label='Estado Civil'
                        id='maritalStatus'
                        rules={[
                            {
                                required: true,
                                message: '${label} é obrigatório'
                            }
                        ]}
                        style={{ width: '20%' }}
                        options={[
                            { label: 'Solteiro', value: 'Solteiro' },
                            { label: 'Casado', value:'Casado' },
                            { label: 'Divorciado', value: 'Divorciado' },
                            { label: 'Viúvo', value: 'Viúvo' },
                            { label: 'Outros', value: 'Outros' }
                        ]}
                        placeholder='Selecione uma das opções'
                        type='select'
                    />

                    <InputComponent
                        label='Alergias'
                        id='alergyList'
                        rules={[
                            {
                                type: 'text',
                                message: '${label} não é um ${type} válido(a)'
                            }
                        ]}
                        maxLength={ 100 }
                        maxRows={ 4 }
                        placeholder='Insira alergias'
                        type='textarea'
                    />

                    <InputComponent
                        label='Cuidados Especiais'
                        id='specialCareList'
                        rules={[
                            {
                                type: 'text',
                                message: '${label} não é um ${type} válido(a)'
                            }
                        ]}
                        maxLength={ 250 }
                        maxRows={ 6 }
                        placeholder='Insira cuidados especiais ou informações relevantes sobre o paciente'
                        type='textarea'
                    />

                    <InputComponent
                        label='CEP'
                        id='postalCode'
                        rules={[
                            {
                                max: 8,
                                message: '${label} deve conter máximo de ${max} caracteres'
                            },
                            {
                                pattern: RegExp(/^[0-9]{8}$/),
                                message: '${label} inválido'
                            },
                            {
                                type: 'text',
                                message: '${label} não é um ${type} válido(a)'
                            }
                        ]}
                        style={{ width: '30%' }}
                        placeholder='XXXXXXXX'
                        onChange={ onChangeCEP }
                        type='text'
                    />

                    <InputComponent
                        label='Logradouro'
                        id='address'
                        rules={[
                            {
                                type: 'text',
                                message: '${label} não é um ${type} válido(a)'
                            }
                        ]}
                        style={{ width: '70%' }}
                        placeholder='Avenida, Travessa, Rua, ...'
                        disabled={ true }
                        type='text'
                    />
                    
                    <InputComponent
                        label='Número'
                        id='addressNumber'
                        rules={[
                            {
                                type: 'number',
                                message: '${label} não é um ${type} válido(a)'
                            }
                        ]}
                        placeholder='Insira seu número'
                        type='number'
                    />

                    <InputComponent
                        label='Bairro'
                        id='district'
                        rules={[
                            {
                                type: 'text',
                                message: '${label} não é um ${type} válido(a)'
                            }
                        ]}
                        style={{ width: '20%' }}
                        placeholder='...'
                        disabled={ true }
                        type='text'
                    />
                    
                    <InputComponent
                        label='Cidade'
                        id='city'
                        rules={[
                            {
                                type: 'text',
                                message: '${label} não é um ${type} válido(a)'
                            }
                        ]}
                        style={{ width: '20%' }}
                        placeholder='...'
                        disabled={ true }
                        type='text'
                    />
                    
                    <InputComponent
                        label='Estado'
                        id='state'
                        rules={[
                            {
                                type: 'text',
                                message: '${label} não é um ${type} válido(a)'
                            }
                        ]}
                        style={{ width: '10%' }}
                        placeholder='...'
                        disabled={ true }
                        type='text'
                    />
                    
                    <InputComponent
                        label='Complemento'
                        id='complement'
                        rules={[
                            {
                                type: 'text',
                                message: '${label} não é um ${type} válido(a)'
                            }
                        ]}
                        placeholder='Insira seu complemento'
                        type='text'
                    />
                
                    <InputComponent
                        label='Ponto de Referência'
                        id='references'
                        rules={[
                            {
                                type: 'text',
                                message: '${label} não é um ${type} válido(a)'
                            }
                        ]}
                        placeholder='Insira seu complemento'
                        type='text'
                    />

                    <InputComponent
                        label='E-mail'
                        id='email'
                        rules={[
                            {
                                type: 'email',
                                message: '${label} não é um ${type} válido(a)'
                            }
                        ]}
                        placeholder='Insira seu e-mail'
                        type='email'
                    />

                    <InputComponent
                        label='Telefone'
                        id='telephone'
                        rules={[
                            {
                                required: true,
                                message: '${label} é obrigatório',
                            },
                            {
                                pattern: RegExp(/\(\d{2}\)\s\d{1}?\s\d{4}-\d{4}/g),
                                message: '${label} inválido'
                            },
                            {
                                type: 'text',
                                message: '${label} não é um ${type} válido(a)'
                            }
                        ]}
                        style={{ width: '25%' }}
                        placeholder='(XX) X XXXX-XXXX'
                        addonBefore='+55'
                        type='text'
                    />

                    <InputComponent
                        label='Celular'
                        id='cellphone'
                        rules={[
                            {
                                required: true,
                                message: '${label} é obrigatório',
                            },
                            {
                                pattern: RegExp(/\(\d{2}\)\s\d{1}\s\d{4,5}-\d{4}/g),
                                message: '${label} inválido'
                            },
                            {
                                type: 'text',
                                message: '${label} não é um ${type} válido(a)'
                            }
                        ]}
                        style={{ width: '25%' }}
                        placeholder='(XX) X XXXX-XXXX'
                        addonBefore='+55'
                        type='text'
                    />

                    <InputComponent
                        label='Contato de Emergência'
                        id='emergencyPhone'
                        rules={[
                            {
                                required: true,
                                message: '${label} é obrigatório',
                            },
                            {
                                pattern: RegExp(/\(\d{2}\)\s\d{1}?\s\d{4}-\d{4}/g),
                                message: '${label} inválido'
                            },
                            {
                                type: 'text',
                                message: '${label} não é um ${type} válido(a)'
                            }
                        ]}
                        style={{ width: '25%' }}
                        placeholder='(XX) X XXXX-XXXX'
                        addonBefore='+55'
                        type='text'
                    />

                    <InputComponent
                        label='Convênio'
                        id='healthPlanName'
                        rules={[
                            {
                                type: 'text',
                                message: '${label} não é um ${type} válido(a)'
                            }
                        ]}
                        placeholder='Insira seu convênio'
                        type='text'
                    />

                    <InputComponent
                        label='Número de Inscrição'
                        id='healthPlanNumber'
                        rules={[
                            {
                                type: 'number',
                                message: '${label} não é um ${type} válido(a)'
                            }
                        ]}
                        placeholder='Insira seu número de inscrição'
                        type='number'
                    />

                    <InputComponent
                        label='Validade'
                        id='healthPlanExpire'
                        rules={[
                            {
                                type: 'object',
                                message: '${label} não é um ${type} válido(a)'
                            }
                        ]}
                        style={{ width: '20%' }}
                        format={ monthFormat }
                        picker='month'
                        placeholder='Selecione a validade'
                        onChange={ onChangeExpireMonth }
                        type='date'
                    />

                    <Form.Item>
                        <Button 
                            className='register-patient-btn-edit'
                            type='primary'
                            htmlType='submit'
                            disabled={ !isPatientId }
                        >
                            <EditOutlined /> Editar
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button 
                            className='register-patient-btn-delete'
                            type='primary'
                            disabled={ !isPatientId }
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
                </Form>
        </>
    )
}

export default RegisterPatientForm