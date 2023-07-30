import { Navigate } from "react-router-dom"

import RegisterPatientForm from "../../components/RegisterPatientFormComponent/RegisterPatientForm.component"

function RegisterPatientPage() {
    const isLogged = JSON.parse(localStorage.getItem('isLogged'))
    
    const render = () => {
        

        return (
            <>
                <RegisterPatientForm />
            </>
        )
    }

    return isLogged ? render() : <Navigate to='/login' />
}

export default RegisterPatientPage