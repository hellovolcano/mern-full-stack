import Nav from '../components/Nav'
import PoemList from '../components/PoemList'
import PoemForm from '../components/PoemForm'

function Home() {
    return(
        <>  
            <Nav />
            <h1>Syntax</h1>

            <PoemForm/>
            
            <PoemList />
        </>
    )
}

export default Home