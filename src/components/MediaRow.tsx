import type { MediaItemWithOwner } from '../types/MediaTypes';
import { Link } from 'react-router';

const MediaRow = (props: { item: MediaItemWithOwner }) => {
  const { item } = props;

  return (
    <tr>
      <td>
        <img src={item.thumbnail} alt={item.title} width="100" />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>{item.username}</td>
      <td>
        <Link to="/single" state={{ item }}>Show</Link>
      </td>
    </tr>
  );
};

export default MediaRow;
