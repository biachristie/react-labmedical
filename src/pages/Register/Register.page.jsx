import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

import './Register.style.css'

import RegisterForm from '../../components/RegisterFormComponent/RegisterForm.component'

function RegisterPage() {
    const navigate = useNavigate()
    const redirectToLogin = () => navigate('/')

    return (
        <div className='register-container'>
            <section className='register-brand'>
                <h1 className='register-title'>Santé</h1>
                <img className='register-logo' src="./logo.png" alt="Santé logo" />
            </section>
            <section className='register-form-main'>
                <RegisterForm />
                <div className='register-signUp'>
                    <p>Already have an account?</p>
                    <Button 
                        className='register-button'
                        type='primary' 
                        htmlType='button'
                        onClick={ redirectToLogin }
                    >
                        Log in!
                    </Button>
                </div>
            </section>
        </div>
    );
}

export default RegisterPage;