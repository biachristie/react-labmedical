import { useContext, useEffect } from 'react'

import { UsersContext } from './context/users/users.context'

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
    <>
      
    </>
  )
}

export default App
