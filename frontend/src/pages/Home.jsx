import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await API.get('posts/');
        setPosts(response.data);
      } catch (err) {
        console.error('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="loading">Loading posts...</p>;

  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#2e7d32' }}>Recent Rounds</h2>
      {posts.length === 0 ? (
        <div className="card">
          <p>No posts yet. Be the first to share your round!</p>
        </div>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="card">
            <Link to={`/posts/${post.id}`}>
              <h3>{post.post_title}</h3>
            </Link>
            <p className="card-meta">
              <strong>{post.course_name}</strong> • {post.course_city_state} • {post.course_type === 'PB' ? 'Public' : 'Private'}
            </p>
            <p className="card-content">{post.post_content}</p>
            <div className="card-footer">
              <span>🏌️ Score: {post.score || 'N/A'}</span>
              <span>👤 {post.author}</span>
              <span>❤️ {post.like_count}</span>
              <span>💬 {post.comment_count}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;