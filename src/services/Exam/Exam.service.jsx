const Get = () => {
    const fetchExam = async() => {
        const responseExams = await fetch('http://localhost:3000/exams')
        const dataExams = await responseExams.json()
        return dataExams
    }

    return fetchExam()
}

const Create = (data) => {
    const fetchExam = async() => {
        await fetch('http://localhost:3000/exams', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )
        })
    }

    return fetchExam()
}

const Update = (id, data) => {
    const fetchExam = async() => {
        await fetch(`http://localhost:3000/exams/${ id }`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )
        })
    }

    return fetchExam()
}

export const ExamService = {
    Get,
    Create,
    Update
}