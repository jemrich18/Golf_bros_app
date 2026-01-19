import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

function CreatePost() {
  const [formData, setFormData] = useState({
    post_title: '',
    post_content: '',
    course_name: '',
    course_city_state: '',
    course_type: 'PB',
    date_played: '',
    score: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await API.post('posts/', formData);
      navigate('/');
    } catch (err) {
      setError('Failed to create post. Are you logged in?');
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: '600px' }}>
      <h2>Share Your Round</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="post_title"
            value={formData.post_title}
            onChange={handleChange}
            placeholder="e.g., Amazing day at Pebble Beach"
            required
          />
        </div>
        <div className="form-group">
          <label>Course Name</label>
          <input
            type="text"
            name="course_name"
            value={formData.course_name}
            onChange={handleChange}
            placeholder="e.g., Pebble Beach Golf Links"
            required
          />
        </div>
        <div className="form-group">
          <label>City, State</label>
          <input
            type="text"
            name="course_city_state"
            value={formData.course_city_state}
            onChange={handleChange}
            placeholder="e.g., Pebble Beach, CA"
            required
          />
        </div>
        <div className="form-group">
          <label>Course Type</label>
          <select name="course_type" value={formData.course_type} onChange={handleChange}>
            <option value="PB">Public</option>
            <option value="PR">Private</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date Played</label>
          <input
            type="date"
            name="date_played"
            value={formData.date_played}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Score (optional)</label>
          <input
            type="number"
            name="score"
            value={formData.score}
            onChange={handleChange}
            placeholder="e.g., 85"
          />
        </div>
        <div className="form-group">
          <label>How was your round?</label>
          <textarea
            name="post_content"
            value={formData.post_content}
            onChange={handleChange}
            placeholder="Tell us about the course conditions, highlights, and experience..."
            required
          />
        </div>
        <button type="submit" className="btn">Post Round</button>
      </form>
    </div>
  );
}

export default CreatePost;