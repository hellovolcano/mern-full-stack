import React from 'react';
import { Link } from 'react-router-dom'
import Auth from '../../utils/auth'

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <div>
        <Link to="/">
          <h1>Syntax Poetry</h1>
        </Link>
      </div>
      <nav>
        <ul>
            {Auth.loggedIn() ? (
            <>
              <li><Link to="/profile">Me</Link></li>
              <li><a href="/" onClick={logout}>
                Logout
              </a></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
