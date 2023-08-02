import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const TitlesContext = createContext({
    title: '',
    setTitle: () => {}
})

export const TitlesProvider = ({ children }) => {
    const [title, setTitle] = useState('')

    return(
        <TitlesContext.Provider value={{ title, setTitle }}>
            { children }
        </TitlesContext.Provider>
    )
}

TitlesProvider.propTypes = {
    children: PropTypes.node
}