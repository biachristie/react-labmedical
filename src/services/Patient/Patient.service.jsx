const Get = () => {
    const fetchPatient = async() => {
        const responsePatients = await fetch('http://localhost:3000/patients')
        const dataPatients = await responsePatients.json()
        return dataPatients
    }

    return fetchPatient()
}

export const PatientService = {
    Get
}