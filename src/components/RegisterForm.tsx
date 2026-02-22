import useForm from '../hooks/formHooks';
import { useUser } from '../hooks/apiHooks';

const RegisterForm = () => {
  const initValues = {
    username: '',
    password: '',
    email: '',
  };

  const { postRegister } = useUser();

  const doRegister = async () => {
    const result = await postRegister(inputs);
    console.log(result);
  };

  const { inputs, handleInputChange, handleSubmit } =
    useForm(doRegister, initValues);

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        <div className="flex flex-col w-4/5">
          <label>Username</label>
          <input
            name="username"
            onChange={handleInputChange}
            className="my-[10px] p-[10px] border border-[#ccc] rounded-[5px]"
          />
        </div>
        <div className="flex flex-col w-4/5">
          <label>Password</label>
          <input
            name="password"
            type="password"
            onChange={handleInputChange}
            className="my-[10px] p-[10px] border border-[#ccc] rounded-[5px]"
          />
        </div>
        <div className="flex flex-col w-4/5">
          <label>Email</label>
          <input
            name="email"
            type="email"
            onChange={handleInputChange}
            className="my-[10px] p-[10px] border border-[#ccc] rounded-[5px]"
          />
        </div>
        <button type="submit" className="my-[10px] py-[10px] px-[10px] rounded-[5px] bg-[#363636] text-white border-none cursor-pointer hover:bg-[#111111]">
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;