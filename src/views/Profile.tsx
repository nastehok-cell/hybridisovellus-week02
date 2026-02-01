import { useEffect, useState } from 'react';
import { useUser } from '../hooks/apiHooks';

const Profile = () => {
  const { getUserByToken } = useUser();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }
        const userData = await getUserByToken(token);
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </>
  );
};

export default Profile;
