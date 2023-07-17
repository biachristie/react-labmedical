import './Login.style.css'

import LoginForm from "../../components/LoginFormComponent/LoginForm.component";

function LoginPage() {
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
                    <a className='login-page-register' href="#">Sign up here</a>
                </div>
            </section>
        </div>
    );
}

export default LoginPage;