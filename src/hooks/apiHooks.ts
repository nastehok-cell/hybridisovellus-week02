import { useEffect, useState } from 'react';
import type { MediaItem, UserWithNoPassword } from 'hybrid-types/DBTypes';
import type { MediaItemWithOwner, UploadResponse } from '../types/MediaTypes';
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

  const postMedia = async (
    file: UploadResponse,
    inputs: Record<string, string>,
    token: string
  ) => {
    const mediaData = {
      title: inputs.title,
      description: inputs.description,
      filename: file.data.filename,
      media_type: file.data.media_type,
      filesize: file.data.filesize,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(mediaData),
    };

    return await fetchData<MediaItem>(
      import.meta.env.VITE_MEDIA_API + '/media',
      options
    );
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

    return await fetchData<{ token: string; user: UserWithNoPassword }>(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions
    );
  };

  return { postLogin };
};

const useUser = () => {
  const getUserByToken = async (token: string): Promise<UserWithNoPassword | null> => {
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

  const getUsernameAvailable = async (username: string) => {
    const response = await fetch(import.meta.env.VITE_AUTH_API + `/users/username/${username}`);
    const data = await response.json();
    return data.available;
  };

  const getEmailAvailable = async (email: string) => {
    const response = await fetch(import.meta.env.VITE_AUTH_API + `/users/email/${email}`);
    const data = await response.json();
    return data.available;
  };

  return { getUserByToken, postRegister, getUsernameAvailable, getEmailAvailable };
};

const useFile = () => {
  const postFile = async (file: File, token: string) => {
    const formData = new FormData();
    formData.append('file', file);

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    return await fetchData<UploadResponse>(
      import.meta.env.VITE_UPLOAD_SERVER + '/upload',
      options
    );
  };

  return { postFile };
};

const useLike = () => {
  const postLike = async (media_id: number, token: string) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ media_id }),
    };
    return await fetchData(import.meta.env.VITE_MEDIA_API + '/likes', options);
  };

  const deleteLike = async (like_id: number, token: string) => {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await fetchData(import.meta.env.VITE_MEDIA_API + `/likes/${like_id}`, options);
  };

  const getCountByMediaId = async (media_id: number) => {
    return await fetchData(import.meta.env.VITE_MEDIA_API + `/likes/count/${media_id}`);
  };

  const getUserLike = async (media_id: number, token: string) => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await fetchData(import.meta.env.VITE_MEDIA_API + `/likes/bymedia/user/${media_id}`, options);
  };

  return { postLike, deleteLike, getCountByMediaId, getUserLike };
};

const useComment = () => {
  const postComment = async (
    comment_text: string,
    media_id: number,
    token: string
  ) => {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment_text, media_id }),
    };
    return await fetchData(import.meta.env.VITE_MEDIA_API + '/comments', options);
  };

  const getCommentsByMediaId = async (media_id: number) => {
    const comments = await fetchData<(Comment & { user_id: number })[]>(
      import.meta.env.VITE_MEDIA_API + `/comments/bymedia/${media_id}`
    );

    const commentsWithUsernames = await Promise.all(
      comments.map(async (comment) => {
        try {
          const user = await fetchData<{ username: string }>(
            import.meta.env.VITE_AUTH_API + '/users/' + comment.user_id
          );
          return { ...comment, username: user.username };
        } catch {
          return { ...comment, username: 'Unknown' };
        }
      })
    );

    return commentsWithUsernames;
  };

  return { postComment, getCommentsByMediaId };
};

export { useMedia, useAuthentication, useUser, useFile, useLike, useComment };