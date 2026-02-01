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
      <form onSubmit={handleSubmit}>
        <input name="username" onChange={handleInputChange} />
        <input name="password" type="password" onChange={handleInputChange} />
        <input name="email" type="email" onChange={handleInputChange} />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
