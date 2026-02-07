import { useUserContext } from '../hooks/ContextHooks';

const Profile = () => {
  const { user } = useUserContext();

  console.log('Profile user:', user);

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <h1>Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </>
  );
};

export default Profile;
