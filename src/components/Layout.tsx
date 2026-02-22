import {Link, Outlet} from 'react-router';
import {useEffect} from 'react';
import {useUserContext} from '../hooks/ContextHooks';

const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <div>
      <nav>
        <ul className="list-none m-0 p-0 overflow-hidden bg-[#333333] flex justify-end">
          <li>
            <Link className="block text-white text-center p-4 no-underline hover:bg-[#111111]" to="/">
              Home
            </Link>
          </li>
          {user && (
            <li>
              <Link className="block text-white text-center p-4 no-underline hover:bg-[#111111]" to="/profile">
                Profile
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link className="block text-white text-center p-4 no-underline hover:bg-[#111111]" to="/upload">
                Upload
              </Link>
            </li>
          )}
          {!user && (
            <li>
              <Link className="block text-white text-center p-4 no-underline hover:bg-[#111111]" to="/login">
                Login
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link className="block text-white text-center p-4 no-underline hover:bg-[#111111]" to="/logout">
                Logout
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
