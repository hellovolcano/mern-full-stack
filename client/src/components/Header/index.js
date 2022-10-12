import React from 'react';
import { Link } from 'react-router-dom'
import Auth from '../../utils/auth'

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <h1>Syntax Poetry</h1>
        </Link>

        <nav className="text-center">
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
      </div>
    </header>
  );
};

export default Header;
