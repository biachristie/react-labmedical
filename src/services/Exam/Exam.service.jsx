const Get = () => {
    const fetchExam = async() => {
        const responseExams = await fetch('http://localhost:3000/exams')
        const dataExams = await responseExams.json()
        return dataExams
    }

    return fetchExam()
}

export const ExamService = {
    Get
}