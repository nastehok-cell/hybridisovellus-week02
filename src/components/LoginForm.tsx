import useForm from '../hooks/formHooks';
import type {Credentials} from '../types/LocalTypes';
import {useUserContext} from '../hooks/ContextHooks';

const LoginForm = () => {
  const {handleLogin} = useUserContext();

  const initValues: Credentials = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    handleLogin(inputs as Credentials);
  };

  const {inputs, handleInputChange, handleSubmit} =
    useForm(doLogin, initValues);

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        <div className="flex flex-col w-4/5">
          <label htmlFor="loginusername">Username</label>
          <input
            name="username"
            type="text"
            id="loginusername"
            onChange={handleInputChange}
            className="my-[10px] p-[10px] border border-[#ccc] rounded-[5px]"
          />
        </div>
        <div className="flex flex-col w-4/5">
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            className="my-[10px] p-[10px] border border-[#ccc] rounded-[5px]"
          />
        </div>
        <button type="submit" className="my-[10px] py-[10px] px-[10px] rounded-[5px] bg-[#363636] text-white border-none cursor-pointer hover:bg-[#111111]">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;