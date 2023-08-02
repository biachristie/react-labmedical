import { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import LayoutComponent from './layout/Layout'
import { UsersContext } from './context/users/users.context'
import LoginPage from './pages/Login/Login.page' 
import HomePage from './pages/Home/Home.page'
import RegisterPage from './pages/Register/Register.page'
import PatientsPage from './pages/Patients/Patients.page'
import PatientRecordPage from './pages/PatientRecord/PatientRecord.page'
import RegisterPatientPage from './pages/RegisterPatient/RegisterPatient.page'
import RegisterAppointmentPage from './pages/RegisterAppointment/RegisterAppointment.page'
import RegisterExamPage from './pages/RegisterExam/RegisterExam.page'

function App() {
  const { setUsersList } = useContext(UsersContext)

    useEffect (() => {
      const fetchData = async() => {
        const response = await fetch('http://localhost:3000/users')
        const data = await response.json()
        setUsersList(data)
      }

      fetchData()
    }, [])

    return (
      <Router>
        <Routes>
          <Route element={ <LayoutComponent /> }>
            <Route path='/' element={ <HomePage /> } />
            <Route path='/patients' element={ <PatientsPage /> } />
            <Route path='/patientRecord' element={ <PatientRecordPage /> } />
            <Route path='/patientRegister' element={ <RegisterPatientPage /> } />
            <Route path='/appointmentRegister' element={ <RegisterAppointmentPage /> } />
            <Route path='/examRegister' element={ <RegisterExamPage /> } />
            <Route path='*' element={ <><p>Página não existe</p></> } />
          </Route>

          <Route path='/login' element={ <LoginPage /> } />
          <Route path='/register' element={ <RegisterPage /> } />
        </Routes>
      </Router>
  )
}

export default App
