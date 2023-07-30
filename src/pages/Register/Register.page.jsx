import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

import './Register.style.css'

import RegisterForm from '../../components/RegisterFormComponent/RegisterForm.component'

function RegisterPage() {
    const navigate = useNavigate()
    const redirectToLogin = () => navigate('/login')

    return (
        <div className='register-container'>
            <section className='register-brand'>
                <img className='register-logo' src="./logo.png" alt="LABMedical logo" />
            </section>
            <section className='register-form-main'>
                <RegisterForm />
                <div className='register-signUp'>
                    <p>Já possui uma conta?</p>
                    <Button 
                        className='register-button'
                        type='primary' 
                        htmlType='button'
                        onClick={ redirectToLogin }
                    >
                        Entre!
                    </Button>
                </div>
            </section>
        </div>
    );
}

export default RegisterPage;