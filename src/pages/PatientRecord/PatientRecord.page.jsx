import { Navigate } from "react-router-dom"

function PatientRecordPage() {
    const isLogged = JSON.parse(localStorage.getItem('isLogged'))
    
    const render = () => {
        return (
                <>
                    
                </>
            )
        }

    return isLogged ? render() : <Navigate to='/' />
}

export default PatientRecordPage