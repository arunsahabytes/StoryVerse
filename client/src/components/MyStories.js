import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash, faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import './MyStories.css';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';

function MyStories() {
  const [stories, setStories] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState(null);

  useEffect(() => {
    const fetchMyStories = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/stories/user/mystories?page=${currentPage}&limit=10`, {
          headers: { 'x-auth-token': token }
        });
        setStories(res.data.stories);
        setPagination(res.data.pagination);
        setError(null);
      } catch (err) {
        console.error('Error fetching my stories:', err);
        setError('Failed to fetch stories. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMyStories();
    }
  }, [user, currentPage]);

  const handleDeleteClick = (storyId) => {
    setStoryToDelete(storyId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/stories/${storyToDelete}`, {
        headers: { 'x-auth-token': token }
      });
      setStories(stories.filter(story => story._id !== storyToDelete));
      toast.success('Story deleted successfully');
    } catch (err) {
      console.error('Error deleting story:', err);
      toast.error('Failed to delete story');
    }
    setShowModal(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!user) return <div>Please log in to view your stories.</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="my-stories">
      <h2>My Stories</h2>
      {stories.length === 0 ? (
        <p>You haven't created any stories yet.</p>
      ) : (
        <div className="stories-grid">
          {stories.map((story) => (
            <div key={story._id} className="story-card">
              <h3 className="story-title">{story.title}</h3>
              <p className="story-date">Created on: {formatDate(story.createdAt)}</p>
              <p className="story-excerpt">{story.content.substring(0, 100)}...</p>
              <div className="story-stats">
                <span><FontAwesomeIcon icon={faHeart} /> {story.likes ? story.likes.length : 0}</span>
                <span><FontAwesomeIcon icon={faComment} /> {story.contributions ? story.contributions.length : 0}</span>
              </div>
              <div className="story-actions">
                <Link to={`/stories/${story._id}`} className="view-btn">
                  <FontAwesomeIcon icon={faEye} /> View
                </Link>
                <button onClick={() => handleDeleteClick(story._id)} className="delete-btn">
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!pagination.hasPrevPage}
            className="pagination-btn"
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!pagination.hasNextPage}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this story? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyStories;
