import { useLocation, useNavigate } from 'react-router';
import type { MediaItemWithOwner } from '../types/MediaTypes';
import Likes from '../components/Likes'; 

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
        <img src={item.filename} alt={item.title} />
      ) : (
        <video src={item.filename} controls />
      )}

      <Likes item={item} />

      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};

export default Single;
