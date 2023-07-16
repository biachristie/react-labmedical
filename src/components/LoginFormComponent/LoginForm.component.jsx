import { useState } from 'react'
import { Checkbox, Form, Input } from 'antd'

import './LoginForm.component.css'

function LoginForm() {
    const [form] = Form.useForm()

    const onFinish = (values) => {
        console.log('Success: ', values)
    }

    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed: ', errorInfo)
    // }

    const validateMessages = {
        required: '${label} is required',
        whitespace: '${label} cannot be empty',
        types: {
            email: '${label} is not a valid e-mail',
            // password: '${label} should be a combination of letters, numbers and symbols'
        }
    }

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const handleInput = (e) => {
        e.preventDefault()
        const { value, id } = e.target
        setData({ ...data, [id]: value })
        console.log(data);
    }

    return (
            <Form 
                form={ form } 
                name='login-form'
                className='login-form'
                layout='vertical'
                initialValues={{ remember: true }}
                onFinish={ onFinish }
                // onFinishFailed={ onFinishFailed }
                validateMessages={ validateMessages }
                autoComplete='off'
            >

                <Form.Item
                    className='login-form-field'
                    label='E-mail'
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
                        id='email'
                        placeholder='name@example.com'
                        type='email' 
                        onInput={ handleInput }
                    />  
                </Form.Item>

                <Form.Item
                    className='login-form-field'
                    label='Password'
                    name='password'
                    rules={[
                        {
                            required: true,
                            whitespace: true
                        },
                        {
                            min: 8,
                            max: 12,
                            message: '${label} must be between ${min} and ${max} characters'
                        }
                    ]}
                    hasFeedback
                >
                    <Input.Password 
                        className='login-form-input'
                        id='password'
                        placeholder='Enter your password'
                        onInput={ handleInput }
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