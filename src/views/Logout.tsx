import { useUserContext } from '../hooks/ContextHooks';

const Logout = () => {
  const { handleLogout } = useUserContext();

  return (
    <>
      <h1>Logout</h1>
      <button
        onClick={handleLogout}
        className="my-[10px] p-[10px] rounded-[5px] bg-[#363636] text-white border-none cursor-pointer hover:bg-[#111111]"
      >
        Logout
      </button>
    </>
  );
};

export default Logout;
