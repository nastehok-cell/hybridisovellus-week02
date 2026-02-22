import type { MediaItemWithOwner } from '../types/MediaTypes';
import { Link } from 'react-router';
import { useUserContext } from '../hooks/ContextHooks';

const MediaRow = (props: { item: MediaItemWithOwner }) => {
  const { item } = props;
  const { user } = useUserContext();

  const canEdit =
    user &&
    (user.username === item.username || user.username === 'mediaAdmin');

  return (
    <tr>
      <td className="p-4">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-[260px] h-[200px] object-cover"
        />
      </td>
      <td className="p-4">{item.title}</td>
      <td className="p-4">{item.description}</td>
      <td className="p-4">{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td className="p-4">{item.filesize}</td>
      <td className="p-4">{item.media_type}</td>
      <td className="p-4">{item.username}</td>
      <td className="p-4 flex gap-2">
        <Link
          to="/single"
          state={{ item }}
          className="bg-[#363636] text-white px-2 py-1 hover:bg-[#111111] no-underline"
        >
          Show
        </Link>
        {canEdit && (
          <>
            <button
              className="bg-[#363636] text-white px-2 py-1 hover:bg-[#111111]"
              onClick={() => console.log('modify', item)}
            >
              Modify
            </button>
            <button
              className="bg-[#363636] text-white px-2 py-1 hover:bg-[#111111]"
              onClick={() => console.log('delete', item)}
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default MediaRow;