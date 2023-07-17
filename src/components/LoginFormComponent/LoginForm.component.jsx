import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Tooltip, message } from 'antd'

import './LoginForm.component.css'
import InputComponent from '../InputComponent/Input.component'

function LoginForm() {
    const navigate = useNavigate()
    const redirectToHome = () => navigate('/home')

    const [form] = Form.useForm()

    const [messageApi, contextHolder] = message.useMessage();

    const [users, setUsers] = useState([])

    const fetchUserData = () => {
        fetch('https://dummyjson.com/users')
            .then(response => response.json())
            .then(data => setUsers(data))
    }

    useEffect(() => { fetchUserData() }, [])

    const [submit, setSubmit] = useState(false)
    const data = Form.useWatch([], form)

    useEffect(() => {
        form
            .validateFields({ validateOnly: true })
            .then(() => { setSubmit(true) }, () => { setSubmit(false) })
    }, [data])

    const onSubmitForm = (data) => {
        const { email, password } = data
        const user = users.users.find(user => user.email === email)

        if (!user) {
            messageApi.open({ type: 'error', content: 'User was not found' })
            form.resetFields()
            return
        }

        if (password === user.password) {
            localStorage.setItem('firstname', user.firstName)
            localStorage.setItem('lastname', user.lastName)
            localStorage.setItem('title', user.company.title)
            localStorage.setItem('avatar', user.image)
            redirectToHome()
        } else {
            messageApi.open({ type: 'error', content: 'Wrong credentials. Invalid user and/or password' })
        }
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