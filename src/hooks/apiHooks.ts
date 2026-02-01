import { useEffect, useState } from 'react';
import type { MediaItem } from 'hybrid-types/DBTypes';
import type { MediaItemWithOwner } from '../types/MediaTypes';
import { fetchData } from './fetchData';

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

export { useMedia };
