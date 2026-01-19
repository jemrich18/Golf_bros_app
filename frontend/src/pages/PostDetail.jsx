import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await API.get(`posts/${id}/`);
        setPost(postResponse.data);
        setEditForm(postResponse.data);
        
        const commentsResponse = await API.get(`posts/${id}/comments/`);
        setComments(commentsResponse.data);

        // Get current user
        try {
          const profileResponse = await API.get('profile/');
          setCurrentUser(profileResponse.data.username);
        } catch {
          setCurrentUser(null);
        }
      } catch (err) {
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleLike = async () => {
  try {
    const response = await API.post(`posts/${id}/like/`);
    setPost({ ...post, like_count: response.data.like_count });
    setLiked(response.data.liked);
  } catch (err) {
    console.error('Failed to toggle like');
  }
};

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await API.post(`posts/${id}/comments/`, {
        content: newComment,
      });
      setComments([...comments, response.data]);
      setNewComment('');
      setPost({ ...post, comment_count: post.comment_count + 1 });
    } catch (err) {
      console.error('Failed to add comment');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await API.delete(`posts/${id}/`);
      navigate('/');
    } catch (err) {
      console.error('Failed to delete post');
    }
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.put(`posts/${id}/`, editForm);
      setPost(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update post');
    }
  };

  const isAuthor = currentUser && post && currentUser === post.author;

  if (loading) return <p className="loading">Loading post...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!post) return <p className="loading">Post not found</p>;

  return (
    <div className="post-detail">
      <Link to="/" style={{ color: '#666', fontSize: '0.9rem' }}>← Back to posts</Link>
      
      {isEditing ? (
        <form onSubmit={handleEditSubmit} style={{ marginTop: '20px' }}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="post_title"
              value={editForm.post_title}
              onChange={handleEditChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Course Name</label>
            <input
              type="text"
              name="course_name"
              value={editForm.course_name}
              onChange={handleEditChange}
              required
            />
          </div>
          <div className="form-group">
            <label>City, State</label>
            <input
              type="text"
              name="course_city_state"
              value={editForm.course_city_state}
              onChange={handleEditChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Course Type</label>
            <select name="course_type" value={editForm.course_type} onChange={handleEditChange}>
              <option value="PB">Public</option>
              <option value="PR">Private</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date Played</label>
            <input
              type="date"
              name="date_played"
              value={editForm.date_played}
              onChange={handleEditChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Score</label>
            <input
              type="number"
              name="score"
              value={editForm.score || ''}
              onChange={handleEditChange}
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              name="post_content"
              value={editForm.post_content}
              onChange={handleEditChange}
              required
            />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn">Save Changes</button>
            <button type="button" className="btn" style={{ background: '#666' }} onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <h2 style={{ marginTop: '15px' }}>{post.post_title}</h2>
          <p className="card-meta">Posted by {post.author}</p>
          
          {isAuthor && (
            <div className="author-actions" style={{ margin: '15px 0' }}>
              <button onClick={() => setIsEditing(true)} className="edit-btn">✏️ Edit</button>
              <button onClick={handleDelete} className="delete-btn">🗑️ Delete</button>
            </div>
          )}
          
          <div className="course-info">
            <p><strong>📍 {post.course_name}</strong></p>
            <p>{post.course_city_state} • {post.course_type === 'PB' ? 'Public' : 'Private'}</p>
            <p>🗓️ Played on {post.date_played}</p>
            {post.score && <p>🏌️ Score: {post.score}</p>}
          </div>

          <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>{post.post_content}</p>
          
          {post.image && (
            <img src={post.image} alt="Course" className="post-image" />
          )}
          
          <div className="post-actions">
            <button onClick={handleLike} className={`like-btn ${liked ? 'liked' : ''}`}>
              {liked ? '❤️' : '🤍'} {post.like_count} Likes
            </button>
            <span style={{ padding: '10px', color: '#666' }}>
              💬 {post.comment_count} Comments
            </span>
          </div>
        </>
      )}

      <div className="comments-section">
        <h3>Comments</h3>
        
        <form onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button type="submit">Post</button>
        </form>

        {comments.length === 0 ? (
          <p style={{ color: '#666' }}>No comments yet. Be the first!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <strong>{comment.author}</strong>: {comment.content}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PostDetail;