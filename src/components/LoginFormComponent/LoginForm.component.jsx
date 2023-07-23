import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Tooltip, message } from 'antd'

import './LoginForm.component.css'
import InputComponent from '../InputComponent/Input.component'
import { AuthContext } from '../../context/auth/auth.context'
import { UsersContext } from '../../context/users/users.context'

function LoginForm() {
    const navigate = useNavigate()
    const { setAuth } = useContext(AuthContext)

    const [form] = Form.useForm()

    const [messageApi, contextHolder] = message.useMessage();

    const { usersList,setUsersList } = useContext(UsersContext)

    useEffect (() => {
        const fetchData = async() => {
            const response = await fetch('http://localhost:3000/users')
            const data = await response.json()
            setUsersList(data)
        }

        fetchData()
    }, [])

    const [submit, setSubmit] = useState(false)
    const data = Form.useWatch([], form)

    useEffect(() => {
        form
            .validateFields({ validateOnly: true })
            .then(() => { setSubmit(true) }, () => { setSubmit(false) })
    }, [data])

    const onSubmitForm = (data) => {
        const { email, password } = data
        const user = usersList.find(user => user.email === email)

        if (!user) {
            messageApi.open({ type: 'error', content: 'Usuário não encontrado' })
            form.resetFields()
            return
        }

        if (password === user.password) {
            localStorage.setItem('id', user.id)
            localStorage.setItem('name', user.name)
            redirectToHome(user)
        } else {
            messageApi.open({ type: 'error', content: 'Credenciais erradas. E-mail e/ou senha inválidos' })
        }
    }

    const redirectToHome = (user) => {
        setAuth({ user, isLogged: true })
        localStorage.setItem('isLogged', JSON.stringify(true))
        navigate('/')
    }

    return (
        <div className='login-form-section'>
            { contextHolder }

            <div className='login-form-container'>
                <h1 id='login-form-title'>Seja bem-vindo(a)</h1>
                <p id='login-form-description'>Insira seu e-mail e senha para acessar sua conta.</p>
            
                <Form 
                    form={ form } 
                    name='login-form'
                    className='login-form'
                    layout='vertical'
                    initialValues={{
                        email: '',
                        password: '',
                        remember: true 
                    }}
                    onFinish={ onSubmitForm }
                    autoComplete='off'
                >

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

                    <div className='login-form-remember'>
                        <Form.Item
                            name='remember'
                            valuePropName='checked'
                        >
                            <Checkbox className='login-form-checkbox'>Mantenha-me conectado</Checkbox>
                        </Form.Item>

                        <Tooltip
                            overlayClassName='login-form-tooltip'
                            placement='bottom' 
                            title='Em construção'
                            color='#DE541E'
                        >
                            <a className='login-form-forgot' href="#">Esqueceu sua senha?</a>
                        </Tooltip>
                    </div>

                    <Form.Item className='form-field-button'>
                        <Button 
                            className='login-form-button' 
                            type='primary' 
                            htmlType='submit' 
                            block 
                            disabled={ !submit }
                        >
                            Entrar
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
    )
}

export default LoginForm;