const Get = () => {
    const fetchAppointment = async() => {
        const responseAppointments = await fetch('http://localhost:3000/appointments')
        const dataAppointments = await responseAppointments.json()
        return dataAppointments
    }

    return fetchAppointment()
}

export const AppointmentService = {
    Get
}