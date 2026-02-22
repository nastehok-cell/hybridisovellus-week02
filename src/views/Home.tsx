import { useMedia } from '../hooks/apiHooks';
import MediaRow from '../components/MediaRow';

const Home = () => {
  const { mediaArray } = useMedia();

  return (
    <>
      <h2>My Media</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="*:p-4 *:text-left">
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Owner</th>
            <th>Actions</th>
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