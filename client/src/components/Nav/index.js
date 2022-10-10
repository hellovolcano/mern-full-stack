import { Link } from 'react-router-dom'
import Auth from '../../utils/auth'

const Nav = () => {
    const logout = event => {
        event.preventDefault()
        Auth.logout()

    }

    return(
        <nav>
            <ul>
            {Auth.loggedIn() ? (
                <>
                    <li><Link to="/profile">Me</Link></li>
                    <a href="/" onClick={logout}>Logout</a>
                </>
            ) : (
                <>
                    <li><Link to="/signup">Sign up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </>
            )}
        </ul>    
            
            
        </nav>
    )
}

export default Nav
