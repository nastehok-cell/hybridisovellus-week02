import { useEffect, useRef } from 'react';
import { useCommentStore } from '../store';
import { useUserContext } from '../hooks/ContextHooks';
import useForm from '../hooks/formHooks';
import { useComment } from '../hooks/apiHooks';

const Comments = ({ media_id }: { media_id: number }) => {
  const { comments, setComments } = useCommentStore();
  const { user } = useUserContext();
  const { postComment, getCommentsByMediaId } = useComment();
  const formRef = useRef<HTMLFormElement>(null);

  const initValues = { comment_text: '' };

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getCommentsByMediaId(media_id);
      setComments(fetchedComments);
    };
    fetchComments();
  }, [media_id]);

  const doComment = async () => {
    if (!user) return;
    const token = localStorage.getItem('token') || '';
    await postComment(inputs.comment_text, media_id, token);
    const updatedComments = await getCommentsByMediaId(media_id);
    setComments(updatedComments);
    formRef.current?.reset();
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(doComment, initValues);

  const mediaComments = comments.filter((c) => c.media_id === media_id);

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold mb-2">Comments</h4>

      {user && (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center"
        >
          <div className="flex flex-col w-4/5">
            <label htmlFor="comment_text">Add a comment</label>
            <input
              name="comment_text"
              id="comment_text"
              type="text"
              onChange={handleInputChange}
              className="my-[10px] p-[10px] border border-[#ccc] rounded-[5px]"
            />
          </div>
          <button
            type="submit"
            className="my-[10px] p-[10px] rounded-[5px] bg-[#363636] text-white border-none cursor-pointer hover:bg-[#111111]"
          >
            Post comment
          </button>
        </form>
      )}

      <ul className="list-none p-0 mt-4 w-full">
        {mediaComments.map((comment) => (
          <li
            key={comment.comment_id}
            className="border border-[#444] rounded-[5px] p-3 mb-2"
          >
            <span className="font-semibold text-white/80">{comment.username}</span>
            <span className="text-white/50 text-sm ml-2">
              {new Date(comment.created_at!).toLocaleString('fi-FI')}
            </span>
            <p className="mt-1">{comment.comment_text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;