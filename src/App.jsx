import { useContext, useEffect } from 'react'

import { UsersContext } from './context/users/users.context'

function App() {
  const { setUsersList } = useContext(UsersContext)

    useEffect (() => {
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(data => setUsersList(data))
    }, [])

    return (
    <>
      
    </>
  )
}

export default App
