import { useEffect, useState } from 'react'
import { Button, Form, message } from 'antd'

import './RegisterForm.component.css'
import InputComponent from '../InputComponent/Input.component'

function RegisterForm() {
    const [form] = Form.useForm()

    const [messageApi, contextHolder] = message.useMessage();
    
    const [users, setUsers] = useState([])
    
    useEffect (() => {
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(data => setUsers(data))
    }, [])

    const [submit, setSubmit] = useState(false)
    const data = Form.useWatch([], form)

    useEffect(() => {
        form
            .validateFields({ validateOnly: true })
            .then(() => { setSubmit(true) }, () => { setSubmit(false) })
    }, [data])

    const onSubmitForm = () => {
        let filterEmail = users.filter(user => user.email.includes(data.email))

        if (filterEmail.length > 0) {
            messageApi.open({ type: 'error', content: 'This e-mail is already in use.' })
            filterEmail = []
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
            messageApi.open({ type: 'success', content: 'Success! You have been registered.' })
            form.resetFields()
        })
        .catch(() => {
            messageApi.open({ type: 'error', content: 'Registration failed. Please try again.' })
            form.resetFields()
        })
    }

    return (
        <div className='register-form-section'>
            { contextHolder }

            <div className='register-form-container'>
                <h1 id='register-form-title'>Create an account</h1>
                <p id='register-form-description'>Enter your name, e-mail and password to create your account.</p>
            
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
                        label='Name'
                        required={ true }
                        id='name'
                        placeholder='Enter your name'
                        type='text'
                    />

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

                    <Form.Item className='form-field-button'>
                        <Button 
                            className='register-form-button' 
                            type='primary' 
                            htmlType='submit' 
                            block 
                            disabled={ !submit }
                        >
                            Create account
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
    )
}

export default RegisterForm;