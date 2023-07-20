import { Button } from 'antd'
import { Navigate, useNavigate } from 'react-router-dom'

import './Login.style.css'

import LoginForm from "../../components/LoginFormComponent/LoginForm.component";

function LoginPage() {
    const isLogged = JSON.parse(localStorage.getItem('isLogged'))

    const navigate = useNavigate()
    const redirectToRegister = () => navigate('/register')

    const render = () => {
        return (
            <div className='login-page-container'>
                <section className='login-page-brand'>
                    <h1 className='login-page-title'>Santé</h1>
                    <img className='login-page-logo' src="./logo.png" alt="Santé logo" />
                </section>
                <section className='login-page-form'>
                    <LoginForm />
                    <div className='login-page-signUp'>
                        <p>Don't have an account?</p>
                        <Button 
                            className='login-page-button'
                            type='primary' 
                            htmlType='button'
                            onClick={ redirectToRegister }
                        >
                            Sign up!
                        </Button>
                    </div>
                </section>
            </div>
        )
    }

    return isLogged ? <Navigate to='/' /> : render()
}

export default LoginPage;