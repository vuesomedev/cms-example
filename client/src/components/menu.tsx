import { MouseEventHandler } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/auth';

export function Menu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const isAdmin = auth.loggedIn && auth.roles.includes('administrator');
  const isEditor = auth.loggedIn && auth.roles.includes('content_editor');
  const isSignedIn = auth.loggedIn && auth.roles.includes('signed_in');

  const handleLogout: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    dispatch(logout())
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">CMS Example</a>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            {(isAdmin || isSignedIn) && (
              <li className="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
              </li>
            )}
            {(isAdmin || isEditor) && (
              <li className="nav-item">
                <Link className="nav-link" to="/content">Content</Link>
              </li>
            )}
            {!auth.loggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/">Login</Link>
              </li>
            )}
            {auth.loggedIn && (
              <li className="nav-item">
                <a onClick={handleLogout} className="nav-link" href="#">Logout</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
