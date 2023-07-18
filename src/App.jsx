import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/Login/Login.page' 
import HomePage from './pages/Home/Home.page'
import RegisterPage from './pages/Register/Register.page'

import './App.css'

function App() {
    return (
      <Router>
        <Routes>
          <Route path='/' element={ <HomePage /> } />
          <Route path='/login' element={ <LoginPage /> } />
          <Route path='/register' element={ <RegisterPage /> } />
          <Route path='*' element={ <><p>Página não existe</p></> } />
        </Routes>
      </Router>
  )
}

export default App