import { useNavigate } from 'react-router';

const Logout = () => {
  const navigate = useNavigate();

  const doLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      <h1>Logout</h1>
      <button onClick={doLogout}>Logout</button>
    </>
  );
};

export default Logout;