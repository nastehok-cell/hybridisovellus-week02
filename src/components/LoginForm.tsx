import useForm from '../hooks/formHooks';
import type { Credentials } from '../types/LocalTypes';
import { useAuthentication } from '../hooks/apiHooks';
import { useNavigate } from 'react-router';

const LoginForm = () => {
  const initValues: Credentials = {
    username: '',
    password: '',
  };

  const { postLogin } = useAuthentication();
  const navigate = useNavigate();

  const doLogin = async () => {
    try {
      const result = await postLogin( inputs as Credentials);
      console.log(result);
      localStorage.setItem('token', result.token);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const { inputs, handleInputChange, handleSubmit } =
    useForm(doLogin, initValues);

  console.log(inputs);

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginusername">Username</label>
          <input
            name="username"
            type="text"
            id="loginusername"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
