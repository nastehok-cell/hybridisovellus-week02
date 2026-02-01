import { useEffect, useState } from 'react';
import type { MediaItem } from 'hybrid-types/DBTypes';
import type { MediaItemWithOwner } from '../types/MediaTypes';
import { fetchData } from './fetchData';
import type { Credentials } from '../types/LocalTypes';
import type { UploadResponse, MediaInput } from '../types/MediaTypes';

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

  const postMedia = async (
    inputs: MediaInput,
    token: string
  ): Promise<MediaItem> => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(inputs),
    };

    return await fetchData('https://media2.edu.metropolia.fi/upload-api/uploads', options);

  };

  return { mediaArray, postMedia };
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

    return await fetchData<{ token: string }>(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions
    );
  };

  return { postLogin };
};

const useUser = () => {
  const getUserByToken = async (token: string) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData(import.meta.env.VITE_AUTH_API + '/users/token', options);
  };

  const postRegister = async (inputs: Record<string, string>) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    return await fetchData(import.meta.env.VITE_AUTH_API + '/users', options);
  };

  return { getUserByToken, postRegister };
};

const useFile = () => {
  const postFile = async (file: File, token: string): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    return await fetchData(import.meta.env.VITE_UPLOAD_SERVER + '/uploads', options);
  };

  return { postFile };
};

export { useMedia, useAuthentication, useUser, useFile };
