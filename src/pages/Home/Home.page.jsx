import { Navigate } from 'react-router'

function HomePage() {
    const isLogged = JSON.parse(localStorage.getItem('isLogged'))

    const renderPage = () => {
        return (
            <>
                Home
            </>
        )
    }

    return isLogged ? renderPage() : <Navigate to='/login' />

}

export default HomePage;