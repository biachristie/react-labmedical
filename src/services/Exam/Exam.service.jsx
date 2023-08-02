const Get = () => {
    const fetchExam = async() => {
        const response = await fetch('http://localhost:3000/exams')
        const data = await response.json()
        return data
    }

    return fetchExam()
}

const Show = (id) => {
    const fetchExam = async() => {
        const response = await fetch(`http://localhost:3000/exams/${ id }`)
        const data = await response.json()
        return data
    }

    return fetchExam()
}

const Create = (data) => {
    const fetchExam = async() => {
        const response = await fetch('http://localhost:3000/exams', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )
        })

        return response
    }

    return fetchExam()
}

const Update = (id, data) => {
    const fetchExam = async() => {
        const response = await fetch(`http://localhost:3000/exams/${ id }`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )
        })

        return response
    }

    return fetchExam()
}

const Delete = (id) => {
    const fetchExam = async() => {
        const response = await fetch(`http://localhost:3000/exams/${ id }`, {
            method: 'DELETE',
        })

        return response
    }

    return fetchExam()
}

export const ExamService = {
    Get,
    Show,
    Create,
    Update,
    Delete
}