import React from 'react'
import { Checkbox, Form, Input } from 'antd'

import './LoginForm.component.css'

function LoginForm() {
    const [form] = Form.useForm()

    const onFinish = (values) => {
        console.log('Success: ', values);
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed: ', errorInfo);
    }

    const validateMessages = {
        required: ` is required!`,
        types: {
            email: 'This is not a valid e-mail!',
            password: 'Should be a combination of letters, numbers and symbols'
        }
    }

    return (
            <Form 
                form={ form } 
                name='login-form'
                className='login-form'
                layout='vertical'
                initialValues={{ remember: true }}
                onFinish={ onFinish }
                onFinishFailed={ onFinishFailed }
                validateMessages={ validateMessages }
                autoComplete='off'
            >

                <Form.Item
                    className='login-form-field'
                    label='E-mail Address'
                    name='email'
                    rules={[
                        {
                            required: true,
                            type: 'email'
                        }
                    ]}
                    hasFeedback
                >
                    <Input
                        className='login-form-input'
                        placeholder='name@example.com'
                        type='email' 
                    />  
                </Form.Item>

                <Form.Item
                    className='login-form-field'
                    label='Password'
                    name='password'
                    rules={[
                        {
                            required: true,
                            type: 'password',
                        }
                    ]}
                    hasFeedback
                >
                    <Input.Password 
                        className='login-form-input'
                        placeholder='Enter your password'
                        minLength={ 8 }
                        maxLength={ 12 }
                    />
                </Form.Item>

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
    );
}

export default LoginForm;