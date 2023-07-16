import { useEffect, useState } from 'react'
import { Checkbox, Form, message } from 'antd'

import './LoginForm.component.css'
import InputComponent from '../InputComponent/Input.component'

function LoginForm() {
    const [messageApi, contextHolder] = message.useMessage();

    const [users, setUsers] = useState([])

    const fetchUserData = () => {
        fetch('https://dummyjson.com/users')
            .then(response => response.json())
            .then(data => setUsers(data))
    }

    useEffect(() => { fetchUserData() }, [])

    const onSubmitForm = (data) => {
        const { email, password } = data
        const user = users.users.find(user => user.email === email)

        if (!user) {
            messageApi.open({ type: 'error', content: 'User was not found' })
            form.resetFields()
            return
        }

        password === user.password 
            ? console.log('Success: ', data) 
            : messageApi.open({ type: 'error', content: 'Wrong credentials. Invalid user and/or password' })
    }

    const [form] = Form.useForm()

    return (
        <>
            { contextHolder }

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

                    <a className='login-form-forgot' href="#">Forgot your password?</a>
                </div>

            </Form>
        </>
    )
}

export default LoginForm;