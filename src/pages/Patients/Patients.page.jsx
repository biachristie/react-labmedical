import './Patients.page.css'

function PatientsPage() {
    const isLogged = JSON.parse(localStorage.getItem('isLogged'))
    
    const renderPage = () => {
        return(
            <>
            
            </>
        )
    }
    
    return isLogged ? renderPage() : <Navigate to='/login' />

}

export default PatientsPage