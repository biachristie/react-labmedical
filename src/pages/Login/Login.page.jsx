import './Login.style.css'

import LoginForm from "../../components/LoginFormComponent/LoginForm.component";

function LoginPage() {
    return (
        <div className='login-page-container'>
            <section className='login-page-brand'>
                <p>Section 1</p>
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