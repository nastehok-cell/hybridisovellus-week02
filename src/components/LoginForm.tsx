import useForm from '../hooks/formHooks';
import type { Credentials } from '../types/LocalTypes';
import { useUserContext } from '../hooks/ContextHooks';

const LoginForm = () => {
  const { handleLogin } = useUserContext();

  const initValues: Credentials = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    console.log('Submitting login:', inputs);
    await handleLogin(inputs as Credentials);
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