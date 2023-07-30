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

const Update = (id, data) => {
    const fetchPatient = async() => {
        await fetch(`http://localhost:3000/patients/${ id }`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )
        })
    }

    return fetchPatient()
}

const Delete = (id) => {
    const fetchPatient = async() => {
        const response = await fetch(`http://localhost:3000/patients/${ id }`, {
            method: 'DELETE',
        })
        return response.status
    }

    return fetchPatient()
}

export const PatientService = {
    Get,
    Create,
    Update,
    Delete
}