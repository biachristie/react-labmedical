import { useContext, useEffect } from "react"
import { Navigate } from "react-router-dom"

import { TitlesContext } from '../../context/titles/titles.context'
import RegisterExamForm from "../../components/RegisterExamFormComponent/RegisterExamForm.component"

function RegisterExamPage() {
    const isLogged = JSON.parse(localStorage.getItem('isLogged'))
    
    const { setTitle } = useContext(TitlesContext)
    useEffect(() => { setTitle('Cadastro de Exame') }, [])

    const render = () => {
        return (
            <>
                <RegisterExamForm />
            </>
        )
    }

    return isLogged ? render() : <Navigate to='/login' />
}

export default RegisterExamPage