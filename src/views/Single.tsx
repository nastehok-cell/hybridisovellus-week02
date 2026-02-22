import { useLocation, useNavigate } from 'react-router';
import type { MediaItemWithOwner } from '../types/MediaTypes';
import Likes from '../components/Likes';
import Comments from '../components/Comments';

const Single = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const item: MediaItemWithOwner = state.item;

  return (
    <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <p>Owner: {item.username}</p>
      {item.media_type.startsWith('image') ? (
        <img src={item.filename} alt={item.title} className="max-w-full" />
      ) : (
        <video src={item.filename} controls className="max-w-full" />
      )}
      <Likes item={item} />
      <Comments media_id={item.media_id} />
      <button
        onClick={() => navigate(-1)}
        className="my-[10px] p-[10px] rounded-[5px] bg-[#363636] text-white border-none cursor-pointer hover:bg-[#111111]"
      >
        Go back
      </button>
    </div>
  );
};

export default Single;