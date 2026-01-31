import { useEffect, useState } from 'react';
import type { MediaItem } from 'hybrid-types/DBTypes';
import MediaRow from '../components/MediaRow';
import { fetchData } from '../hooks/fetchData';

const Home = () => {
  const [mediaArray, setMediaArray] = useState<MediaItem[]>([]);

  const getMedia = async () => {
    try {
      const json = await fetchData<MediaItem[]>('test.json');
      setMediaArray(json);
      console.log(json);
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
            <th></th>
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
