import { useContext, useEffect, useState } from 'react'
import { Button, Form, message } from 'antd'

import './RegisterForm.component.css'
import InputComponent from '../InputComponent/Input.component'
import { UsersContext } from '../../context/users/users.context'

function RegisterForm() {
    const [form] = Form.useForm()

    const [messageApi, contextHolder] = message.useMessage();
    
    const { usersList } = useContext(UsersContext)
    const [filteredEmail, setFilteredEmail] = useState([])

    useEffect(() => {
        if (usersList.length > 0) {
            setFilteredEmail(usersList.filter(user => user.email.includes(data.email)))
        }
    }, [usersList])

    const [submit, setSubmit] = useState(false)
    const data = Form.useWatch([], form)

    useEffect(() => {
        form
            .validateFields({ validateOnly: true })
            .then(() => { setSubmit(true) }, () => { setSubmit(false) })
    }, [data])

    const onSubmitForm = () => {
        if (filteredEmail.length > 0) {
            messageApi.open({ type: 'error', content: 'Esse e-mail já está em uso.' })
            setFilteredEmail([])
            return
        }

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password
            })
        })
        .then(() => {
            messageApi.open({ type: 'success', content: 'Sucesso! Você foi cadastrado.' })
            form.resetFields()
        })
        .catch(() => {
            messageApi.open({ type: 'error', content: 'Erro no cadastro. Por favor, tente novamente.' })
            form.resetFields()
        })
    }

    return (
        <div className='register-form-section'>
            { contextHolder }

            <div className='register-form-container'>
                <h1 id='register-form-title'>Criar uma conta</h1>
                <p id='register-form-description'>Insira seu nome, e-mail e senha para criar usa conta.</p>
            
                <Form 
                    form={ form } 
                    name='register-form'
                    className='register-form'
                    layout='vertical'
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                    }}
                    onFinish={ onSubmitForm }
                    autoComplete='off'
                >

                    <InputComponent
                        label='Nome'
                        required={ true }
                        id='name'
                        placeholder='Insira seu nome'
                        type='text'
                    />

                    <InputComponent
                        label='E-mail'
                        required={ true }
                        id='email'
                        placeholder='Insira seu e-mail'
                        type='email'
                    />

                    <InputComponent
                        label='Senha'
                        required={ true }
                        id='password'
                        placeholder='Insira sua senha'
                        type='password'
                    />

                    <Form.Item className='form-field-button'>
                        <Button 
                            className='register-form-button' 
                            type='primary' 
                            htmlType='submit' 
                            block 
                            disabled={ !submit }
                        >
                            Criar conta
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
    )
}

export default RegisterForm;