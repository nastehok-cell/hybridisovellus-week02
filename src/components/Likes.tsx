import type { MediaItemWithOwner } from '../types/MediaTypes';
import type { Like } from 'hybrid-types/DBTypes';
import { useLike } from '../hooks/apiHooks';
import { useReducer, useEffect } from 'react';
import { useUserContext } from '../hooks/ContextHooks';

type LikeState = {
  count: number;
  userLike: Like | null;
};

type LikeAction =
  | { type: 'setLikeCount'; count: number }
  | { type: 'setUserLike'; like: Like | null };

const likeInitialState: LikeState = {
  count: 0,
  userLike: null,
};

function likeReducer(state: LikeState, action: LikeAction): LikeState {
  switch (action.type) {
    case 'setLikeCount':
      return { ...state, count: action.count };
    case 'setUserLike':
      return { ...state, userLike: action.like };
    default:
      return state;
  }
}

const Likes = ({ item }: { item: MediaItemWithOwner | null }) => {
  const [likeState, likeDispatch] = useReducer(likeReducer, likeInitialState);
  const { postLike, deleteLike, getCountByMediaId, getUserLike } = useLike();
  const { user } = useUserContext();

  useEffect(() => {
    const fetchLikes = async () => {
      if (!item) return;

      const countResult = (await getCountByMediaId(
        item.media_id
      )) as { count: number };
      likeDispatch({ type: 'setLikeCount', count: countResult.count });

      if (user) {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
          const userLike = (await getUserLike(
            item.media_id,
            token
          )) as Like | null;
          likeDispatch({ type: 'setUserLike', like: userLike });
        } catch {
          likeDispatch({ type: 'setUserLike', like: null });
        }
      }
    };

    fetchLikes();
  }, [item, user]);

  const handleLike = async () => {
    if (!item || !user) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    if (likeState.userLike) {
      await deleteLike(likeState.userLike.like_id, token);
      likeDispatch({ type: 'setUserLike', like: null });
      likeDispatch({ type: 'setLikeCount', count: likeState.count - 1 });
    } else {
      const newLike = (await postLike(item.media_id, token)) as Like;
      likeDispatch({ type: 'setUserLike', like: newLike });
      likeDispatch({ type: 'setLikeCount', count: likeState.count + 1 });
    }
  };

  if (!item) return null;

  return (
    <div>
      <p>Likes: {likeState.count}</p>
      {user && (
        <button onClick={handleLike}>
          {likeState.userLike ? 'Unlike' : 'Like'}
        </button>
      )}
    </div>
  );
};

export default Likes;