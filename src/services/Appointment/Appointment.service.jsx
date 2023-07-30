const Get = () => {
    const fetchAppointment = async() => {
        const response = await fetch('http://localhost:3000/appointments')
        const data = await response.json()
        return data
    }

    return fetchAppointment()
}

const Show = (id) => {
    const fetchAppointment = async() => {
        const response = await fetch(`http://localhost:3000/appointments/${ id }`)
        const data = await response.json()
        return data
    }

    return fetchAppointment()
}

const Create = (data) => {
    const fetchAppointment = async() => {
        const response = await fetch('http://localhost:3000/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )
        })
        
        return response
    }

    return fetchAppointment()
}

const Update = (id, data) => {
    const fetchAppointment = async() => {
        const response = await fetch(`http://localhost:3000/appointments/${ id }`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )
        })

        return response
    }

    return fetchAppointment()
}

const Delete = (id) => {
    const fetchAppointment = async() => {
        const response = await fetch(`http://localhost:3000/appointments/${ id }`, {
            method: 'DELETE',
        })

        return response
    }

    return fetchAppointment()
}

export const AppointmentService = {
    Get,
    Show,
    Create,
    Update,
    Delete
}