import { useContext, useEffect } from "react"
import { Navigate } from "react-router-dom"

import { TitlesContext } from '../../context/titles/titles.context'

function PatientRecordPage() {
    const isLogged = JSON.parse(localStorage.getItem('isLogged'))
    
    const { setTitle } = useContext(TitlesContext)
    useEffect(() => {
        setTitle('Detalhes do Paciente')
    }, [])
    
    const render = () => {
        return (
                <>
                    
                </>
            )
        }

    return isLogged ? render() : <Navigate to='/' />
}

export default PatientRecordPage