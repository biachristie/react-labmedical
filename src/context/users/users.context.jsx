import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const UsersContext = createContext({
    usersList: [],
    setUsersList: () => {}
})

export const UsersProvider = ({ children }) => {
    const [usersList, setUsersList] = useState([])

    return(
        <UsersContext.Provider value={{ usersList, setUsersList }}>
            { children }
        </UsersContext.Provider>
    )
}

UsersProvider.propTypes = {
    children: PropTypes.node
}