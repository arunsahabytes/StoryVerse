import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComments } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../contexts/AuthContext';
import './StoryList.css';

function StoryList() {
  const [stories, setStories] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/stories?page=${currentPage}&limit=10`);
        setStories(res.data.stories);
        setPagination(res.data.pagination);
        setError(null);
      } catch (err) {
        console.error('Error fetching stories:', err);
        setError('Failed to fetch stories. Please try again.');
      } finally {
        setLoading(false);
        setPageLoading(false);
      }
    };

    fetchStories();
  }, [currentPage]);

  const handleLike = async (storyId) => {
    if (!user) return; // Ensure user is logged in
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/stories/${storyId}/like`, {}, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setStories(stories.map(story => 
        story._id === storyId ? { ...story, likes: res.data.likes } : story
      ));
    } catch (err) {
      console.error('Error liking story:', err);
    }
  };

  const handlePageChange = (newPage) => {
    setPageLoading(true);
    setCurrentPage(newPage);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="stories-page">
      <h1 className="stories-title">Explore Stories</h1>
      
      <div className="stories-container">
        {stories.map((story) => (
          <div key={story._id} className="story-card">
            <h2 className="story-title">{story.title}</h2>
            <p className="story-author">by {story.author?.name || 'Unknown'}</p>
            <p className="story-excerpt">{story.content?.substring(0, 100)}...</p>
            <div className="story-stats">
              <button onClick={() => handleLike(story._id)} className={`like-button ${user && story.likes?.includes(user._id) ? 'liked' : ''}`}>
                <FontAwesomeIcon icon={faHeart} />
                <span>{story.likes?.length || 0}</span>
              </button>
              <span><FontAwesomeIcon icon={faComments} /> {story.contributions?.length || 0}</span>
            </div>
            <Link to={`/stories/${story._id}`} className="read-more-btn">Read More</Link>
          </div>
        ))}
      </div>
      
      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!pagination.hasPrevPage || pageLoading}
            className="pagination-btn"
          >
            {pageLoading ? 'Loading...' : 'Previous'}
          </button>
          <span className="pagination-info">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!pagination.hasNextPage || pageLoading}
            className="pagination-btn"
          >
            {pageLoading ? 'Loading...' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
}

export default StoryList;
