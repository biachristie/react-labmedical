const Get = () => {
    const fetchPatient = async() => {
        const responsePatients = await fetch('http://localhost:3000/patients')
        const dataPatients = await responsePatients.json()
        return dataPatients
    }

    return fetchPatient()
}

const Create = (data) => {
    const fetchPatient = async() => {
        await fetch('http://localhost:3000/patients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )
        })
    }

    return fetchPatient()
}

export const PatientService = {
    Get,
    Create
}