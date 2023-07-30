import { useContext, useEffect } from "react"
import { Navigate } from "react-router-dom"

import { TitlesContext } from '../../context/titles/titles.context'
import RegisterPatientForm from "../../components/RegisterPatientFormComponent/RegisterPatientForm.component"

function RegisterPatientPage() {
    const isLogged = JSON.parse(localStorage.getItem('isLogged'))
    
    const { setTitle } = useContext(TitlesContext)
    useEffect(() => { setTitle('Cadastro de Paciente') }, [])

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