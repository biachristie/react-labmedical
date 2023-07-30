import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

import { TitlesContext } from '../../context/titles/titles.context'
import { PatientService } from "../../services/Patient/Patient.service"

function PatientRecordPage() {
    const isLogged = JSON.parse(localStorage.getItem('isLogged'))

    let params = new URL(document.location).searchParams
    let patientId = params.get('id')

    const [patient, setPatient] = useState([])

    const { setTitle } = useContext(TitlesContext)
    useEffect(() => {
        setTitle('Detalhes do Paciente')

        if (patientId !== null) { 
            PatientService.Show(patientId).then(result => setPatient(result))
        }
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