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

    const { usersList } = useContext(UsersContext)

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
            messageApi.open({ type: 'error', content: 'User was not found' })
            form.resetFields()
            return
        }

        if (password === user.password) {
            localStorage.setItem('id', user.id)
            localStorage.setItem('name', user.name)
            redirectToHome(user)
        } else {
            messageApi.open({ type: 'error', content: 'Wrong credentials. Invalid user and/or password' })
        }
    }

    const redirectToHome = (user) => {
        setAuth({ user, isLogged: true })
        navigate('/')
    }

    return (
        <div className='login-form-section'>
            { contextHolder }

            <div className='login-form-container'>
                <h1 id='login-form-title'>Welcome Back</h1>
                <p id='login-form-description'>Enter your e-mail and password to access your account.</p>
            
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
                        placeholder='Enter your e-mail'
                        type='email'
                    />

                    <InputComponent
                        label='Password'
                        required={ true }
                        id='password'
                        placeholder='Enter your password'
                        type='password'
                    />

                    <div className='login-form-remember'>
                        <Form.Item
                            name='remember'
                            valuePropName='checked'
                        >
                            <Checkbox className='login-form-checkbox'>Keep me signed in</Checkbox>
                        </Form.Item>

                        <Tooltip
                            overlayClassName='login-form-tooltip'
                            placement='bottom' 
                            title='Under construction'
                            color='#DE541E'
                        >
                            <a className='login-form-forgot' href="#">Forgot your password?</a>
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
                            Login
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
    )
}

export default LoginForm;