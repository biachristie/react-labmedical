import { useContext, useEffect } from "react"
import { Navigate } from "react-router-dom"

import { TitlesContext } from '../../context/titles/titles.context'
import RegisterAppointmentForm from "../../components/RegisterAppointmentForm/RegisterAppointmentForm.component"

function RegisterAppointmentPage() {
    const isLogged = JSON.parse(localStorage.getItem('isLogged'))

    const { setTitle } = useContext(TitlesContext)
    useEffect(() => { 
        setTitle('Cadastro de Consulta')
    }, [])

    const render = () => {
        return (
                <>
                    <RegisterAppointmentForm />
                </>
            )
        }

    return isLogged ? render() : <Navigate to='/login' />
}

export default RegisterAppointmentPage