import { useContext } from 'react'
import { Navigate } from 'react-router'

import { AuthContext } from '../../context/auth/auth.context'

function HomePage() {
    const { auth } = useContext(AuthContext)

    const renderPage = () => {
        return (
            <>
                Home
            </>
        )
    }

    return auth.isLogged ? renderPage() : <Navigate to={ '/login' } />

}

export default HomePage;