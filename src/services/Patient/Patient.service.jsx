const Get = () => {
    const fetchPatient = async() => {
        const response = await fetch('http://localhost:3000/patients')
        const data = await response.json()
        return data
    }

    return fetchPatient()
}

const Show = (id) => {
    const fetchPatient = async() => {
        const response = await fetch(`http://localhost:3000/patients/${ id }`)
        const data = await response.json()
        return data
    }

    return fetchPatient()
}

const Create = (data) => {
    const fetchPatient = async() => {
        const response = await fetch('http://localhost:3000/patients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )
        })

        return response
    }

    return fetchPatient()
}

const Update = (id, data) => {
    const fetchPatient = async() => {
        const response = await fetch(`http://localhost:3000/patients/${ id }`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )
        })

        return response
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
    Show,
    Create,
    Update,
    Delete
}