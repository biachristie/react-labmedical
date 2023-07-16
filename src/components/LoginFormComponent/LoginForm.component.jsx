import { Checkbox, Form } from 'antd'

import './LoginForm.component.css'
import InputComponent from '../InputComponent/Input.component'

function LoginForm() {
    const [form] = Form.useForm()

    const onFinishFailed = (errorInfo) => {
        console.log('Failed: ', errorInfo)
    }

    return (
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
                // onFinish={ onSubmitForm }
                onFinishFailed={ onFinishFailed }
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
    );
}

export default LoginForm;