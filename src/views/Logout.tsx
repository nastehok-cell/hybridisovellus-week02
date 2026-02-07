import { useEffect } from 'react';
import { useUserContext } from '../hooks/ContextHooks';

const Logout = () => {
  const { handleLogout } = useUserContext();

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div>
      <h1>Logged Out</h1>
      <p>You have been successfully logged out.</p>
    </div>
  );
};

export default Logout;