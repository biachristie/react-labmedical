import './Home.page.css'
import { TitlesContext } from '../../context/titles/titles.context'

function HomePage() {
    const isLogged = JSON.parse(localStorage.getItem('isLogged'))
    
    const { setTitle } = useContext(TitlesContext)

    useEffect(() => {
        setTitle('Estatísticas e Informações')
    }, [])

    const renderPage = () => {
        return (
            <>
                
            </>
        )
    }

    return isLogged ? renderPage() : <Navigate to='/login' />

}

export default HomePage;