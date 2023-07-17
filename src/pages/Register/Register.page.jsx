import { Button } from 'antd'

import './Register.style.css'

function RegisterPage() {
    return (
        <div className='register-container'>
            <section className='register-brand'>
                <h1 className='register-title'>Santé</h1>
                <img className='register-logo' src="./logo.png" alt="Santé logo" />
            </section>
            <section className='register-form'>
                {/* Inserir RegisterForm */}
                <div className='register-signUp'>
                    <p>Don't have an account?</p>
                    <Button 
                        className='register-button'
                        type='primary' 
                        htmlType='button'
                    >
                        Sign up!
                    </Button>
                </div>
            </section>
        </div>
    );
}

export default RegisterPage;