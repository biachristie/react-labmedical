const Get = () => {
    const fetchAppointment = async() => {
        const responseAppointments = await fetch('http://localhost:3000/appointments')
        const dataAppointments = await responseAppointments.json()
        return dataAppointments
    }

    return fetchAppointment()
}

const Create = (data) => {
    const fetchAppointment = async() => {
        await fetch('http://localhost:3000/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )
        })
    }

    return fetchAppointment()
}

export const AppointmentService = {
    Get,
    Create
}