import { Link } from 'react-router-dom'
import Auth from '../../utils/auth'

const Nav = () => {
    const logout = event => {
        event.preventDefault()
        Auth.logout()
        // TODO: Remove this console.log once feature fully implemented
        console.log("logout click")
    }

    // TODO: delete this tester variable once we have Auth implemented on the front end
    const loggedIn = true
    return(
        <nav>
            {/* TODO: Change this to Auth.loggedIn() once we've imported Auth */}
            {loggedIn ? (
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
