import { Link } from 'react-router-dom'
import Auth from '../../utils/auth'

const Nav = () => {
    const logout = event => {
        event.preventDefault()
        Auth.logout()

    }

    return(
        <nav>
            {Auth.loggedIn() ? (
                <>
                    <Link to="/profile">Me</Link>
                    <a href="/" onClick={logout}>Logout</a>
                </>
            ) : (
                <>
                    <Link to="/signup">Sign up</Link>
                    <Link to="/login">Login</Link>
                </>
            )}
            
            
            
        </nav>
    )
}

export default Nav
