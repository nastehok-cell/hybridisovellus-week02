import type{ MediaItem } from 'hybrid-types/DBTypes';

const SingleView = (props: {
  item: MediaItem;
  setSelectedItem: (item: MediaItem | undefined) => void;
}) => {
  const { item, setSelectedItem } = props;

  return (
    <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>

      {item.media_type.startsWith('image') ? (
        <img src={item.filename} alt={item.title} />
      ) : (
        <video src={item.filename} controls />
      )}

      <button onClick={() => setSelectedItem(undefined)}>Close</button>
    </div>
  );
};

export default SingleView;
