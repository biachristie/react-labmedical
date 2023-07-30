import { useContext, useEffect } from "react"
import { Navigate } from "react-router-dom"

import { TitlesContext } from '../../context/titles/titles.context'

function RegisterExamPage() {
    const isLogged = JSON.parse(localStorage.getItem('isLogged'))
    
    const { setTitle } = useContext(TitlesContext)
    useEffect(() => { setTitle('Cadastro de Exame') }, [])

    const render = () => {
        return (
            <>
                
            </>
        )
    }

    return isLogged ? render() : <Navigate to='/login' />
}

export default RegisterExamPage