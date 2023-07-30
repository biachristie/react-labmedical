import { Navigate } from "react-router-dom"

function RegisterAppointmentPage() {
    const isLogged = JSON.parse(localStorage.getItem('isLogged'))

    const render = () => {
        return (
                <>

                </>
            )
        }

    return isLogged ? render() : <Navigate to='/login' />
}

export default RegisterAppointmentPage