import { useEffect, useState } from 'react';
import type { MediaItem, UserWithNoPassword } from 'hybrid-types/DBTypes';
import type { MediaItemWithOwner } from '../types/MediaTypes';
import { fetchData } from './fetchData';
import type { Credentials } from '../types/LocalTypes';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);

  const getMedia = async () => {
    try {
      const media = await fetchData<MediaItem[]>(
        import.meta.env.VITE_MEDIA_API + '/media'
      );

      const mediaWithOwners = await Promise.all<MediaItemWithOwner>(
        media.map(async (item) => {
          const user = await fetchData<{ username: string }>(
            import.meta.env.VITE_AUTH_API + '/users/' + item.user_id
          );

          return { ...item, username: user.username };
        })
      );

      setMediaArray(mediaWithOwners);
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return { mediaArray };
};

const useAuthentication = () => {
  const postLogin = async (inputs: Credentials) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    const loginResult = await fetchData<{ token: string }>(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions
);

    return loginResult;
  };

  return { postLogin };
};

const useUser = () => {
  const getUserByToken = async (): Promise<UserWithNoPassword | null> => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const options: RequestInit = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const result = await fetchData<{ user: UserWithNoPassword }>(
    import.meta.env.VITE_AUTH_API + '/users/token',
    options
  );

  console.log('getUserByToken result:', result); 
  return result.user; 
};

  const postRegister = async (inputs: Record<string, string>) => {
    const options: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputs),
    };
    return await fetchData(import.meta.env.VITE_AUTH_API + '/users', options);
};

  return { getUserByToken, postRegister };
};

export { useMedia, useAuthentication, useUser };