import type{ MediaItem } from 'hybrid-types/DBTypes';

const MediaRow = (props: {
  item: MediaItem;
  setSelectedItem: (item: MediaItem) => void;
}) => {
  const { item, setSelectedItem } = props;

  return (
    <tr>
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>
        <button onClick={() => setSelectedItem(item)}>Open</button>
      </td>
    </tr>
  );
};

export default MediaRow;
