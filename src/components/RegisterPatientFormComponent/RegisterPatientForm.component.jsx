import { useEffect, useState } from "react"
import { Form } from "antd"

import InputComponent from "../InputComponent/Input.component"

function RegisterPatientForm() {
    const [form] = Form.useForm()
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

    return (
        <>
            <Form 
                    form={ form } 
                    name='register-form'
                    className='register-patient-form'
                    layout='vertical'
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
                        // onChange={ }
                        type='number'
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
                        // onChange={ }
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
                                required: true,
                                message: '${label} é obrigatório'
                            },
                            {
                                type: 'object',
                                message: '${label} não é um ${type} válido(a)'
                            }
                        ]}
                        style={{ width: '20%' }}
                        format={ monthFormat }
                        picker='month'
                        placeholder='Selecione a validade'
                        // onChange={ }
                        type='date'
                    />

                </Form>
        </>
    )
}

export default RegisterPatientForm