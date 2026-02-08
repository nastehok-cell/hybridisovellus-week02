import { useEffect, useState } from 'react';
import { useUser } from '../hooks/apiHooks';
import type { UserWithNoPassword } from 'hybrid-types/DBTypes';

const Profile = () => {
  const [user, setUser] = useState<UserWithNoPassword | null>(null);
  const { getUserByToken } = useUser();

  useEffect(() => {
  const fetchUser = async () => {
    const userData = await getUserByToken();
    console.log('Profile userData:', userData);
    setUser(userData);
  };
  fetchUser();
}, []);

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