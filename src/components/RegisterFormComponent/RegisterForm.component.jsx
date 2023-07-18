import { useEffect, useState } from 'react'
import { Button, Form } from 'antd'

import './RegisterForm.component.css'
import InputComponent from '../InputComponent/Input.component'

function RegisterForm() {
    const [form] = Form.useForm()

    const [submit, setSubmit] = useState(false)
    const data = Form.useWatch([], form)

    useEffect(() => {
        form
            .validateFields({ validateOnly: true })
            .then(() => { setSubmit(true) }, () => { setSubmit(false) })
    }, [data])

    return (
        <div className='register-form-section'>
            <div className='register-form-container'>
                <h1 id='register-form-title'>Create an account</h1>
                <p id='register-form-description'>Enter your name, e-mail and password to create your account.</p>
            
                <Form 
                    form={ form } 
                    name='register-form'
                    className='register-form'
                    layout='vertical'
                    initialValues={{
                        email: '',
                        password: '',
                        remember: true 
                    }}
                    // onFinish={ '' }
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