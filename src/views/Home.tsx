import { useEffect, useState } from 'react';
import type { MediaItem } from 'hybrid-types/DBTypes';
import type { MediaItemWithOwner } from '../types/MediaTypes';
import MediaRow from '../components/MediaRow';
import { fetchData } from '../hooks/fetchData';

const Home = () => {
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

  return (
    <>
      <h2>My Media</h2>

      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow key={item.media_id} item={item} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
