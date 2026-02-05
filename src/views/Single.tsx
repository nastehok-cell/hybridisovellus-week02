import {useLocation, useNavigate} from 'react-router';
import type {MediaItem} from 'hybrid-types/DBTypes';

const Single = () => {
  const {state} = useLocation();
  const navigate = useNavigate();

  const item: MediaItem = state.item;

  return (
    <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>

      {item.media_type.startsWith('image') ? (
        <img src={item.filename} alt={item.title} />
      ) : (
        <video src={item.filename} controls />
      )}

      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};

export default Single;
