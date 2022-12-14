import { useAppSelector } from '../store/hooks';
import { useLogoutThunk } from '../store/thunks/logout.thunk';
import { useDispatch } from 'react-redux';
import { MenuItemComponent } from './menu-item.component';
import {
  isAdminSelector,
  isEditorSelector,
  isLoggedInSelector,
  isSignedInSelector
} from '../store/reducers/auth.reducer';

export function Menu() {
  const dispatch = useDispatch();
  const auth = useAppSelector((state) => state.auth);
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const isAdmin = useAppSelector(isAdminSelector);
  const isEditor = useAppSelector(isEditorSelector);
  const isSignedIn = useAppSelector(isSignedInSelector);
  const logoutThunk = useLogoutThunk();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutThunk);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">CMS Example</a>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            {(isAdmin || isSignedIn) && (<MenuItemComponent name={'Home'} link={'/home'} />)}
            {(isAdmin || isEditor) && (<MenuItemComponent name={'Content'} link={'/content'} />)}
            {!isLoggedIn && (<MenuItemComponent name={'Login'} link={'/'} />)}
            {isLoggedIn && (
              <li className="nav-item">
                <a onClick={handleLogout} className="nav-link" href="#">Logout</a>
              </li>
            )}
          </ul>

          {isLoggedIn && (
            <form className="d-flex">
              <button className="btn btn-outline-success" type="submit">
                {`${auth.username} (${auth.email} as ${auth.roles.join(',')})`}
              </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}
