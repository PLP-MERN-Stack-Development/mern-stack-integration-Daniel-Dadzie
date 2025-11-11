import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getComments, postComment } from '../services/commentService';

function CommentSection({ postId }) {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    getComments(postId).then((res) => setComments(res.data));
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const newComment = { text, postId };
    const res = await postComment(newComment);
    setComments((prev) => [...prev, res.data]);
    setText('');
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      {user && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            className="w-full border p-2 rounded h-24"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Post Comment
          </button>
        </form>
      )}
      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c._id} className="bg-gray-100 p-4 rounded">
            <p className="text-gray-800">{c.text}</p>
            <p className="text-sm text-gray-500 mt-1">By {c.authorName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;