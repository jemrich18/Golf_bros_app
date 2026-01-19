import { useState, useEffect } from 'react';
import API from '../api/axios';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get('profile/');
        setProfile(response.data);
      } catch (err) {
        setError('Failed to load profile. Are you logged in?');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('profile_pic', selectedFile);

    try {
      const response = await API.patch('profile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProfile(response.data);
      setSelectedFile(null);
    } catch (err) {
      setError('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePic = async () => {
    if (!window.confirm('Remove your profile picture?')) return;

    try {
      const response = await API.patch('profile/', { profile_pic: null });
      setProfile(response.data);
    } catch (err) {
      setError('Failed to remove picture');
    }
  };

  if (loading) return <p className="loading">Loading profile...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-pic-container">
            {profile.profile_pic ? (
              <img src={profile.profile_pic} alt="Profile" className="profile-pic" />
            ) : (
              <div className="profile-pic-placeholder">
                {profile.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <h2>{profile.username}</h2>
          <p className="profile-email">{profile.email}</p>
        </div>

        <div className="profile-section">
          <h3>Update Profile Picture</h3>
          <form onSubmit={handleUpload} className="upload-form">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id="profile-pic-input"
            />
            <label htmlFor="profile-pic-input" className="file-label">
              {selectedFile ? selectedFile.name : 'Choose an image'}
            </label>
            {selectedFile && (
              <button type="submit" className="btn" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            )}
          </form>
          
          {profile.profile_pic && (
            <button onClick={handleRemovePic} className="remove-pic-btn">
              Remove Profile Picture
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;