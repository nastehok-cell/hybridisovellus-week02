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
      <td className="p-4">
        <div className="flex gap-2">
          <Link
            to="/single"
            state={{ item }}
            className="text-white no-underline bg-[#363636] border-none p-2 hover:bg-[#111111]"
          >
            Show
          </Link>
          {canEdit && (
            <>
              <button
                className="bg-[#363636] text-white border-none p-2 cursor-pointer hover:bg-[#111111]"
                onClick={() => console.log('modify', item)}
              >
                Modify
              </button>
              <button
                className="bg-[#363636] text-white border-none p-2 cursor-pointer hover:bg-[#111111]"
                onClick={() => console.log('delete', item)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default MediaRow;