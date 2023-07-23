import { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import LayoutComponent from './layout/Layout'
import { UsersContext } from './context/users/users.context'
import LoginPage from './pages/Login/Login.page' 
import HomePage from './pages/Home/Home.page'
import RegisterPage from './pages/Register/Register.page'

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
            <Route path='*' element={ <><p>Página não existe</p></> } />
          </Route>

          <Route path='/login' element={ <LoginPage /> } />
          <Route path='/register' element={ <RegisterPage /> } />
        </Routes>
      </Router>
  )
}

export default App