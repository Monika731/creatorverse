// src/pages/CreatorDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './CreatorDetail.css';

const CreatorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Fetch creator by ID
  const fetchCreator = async () => {
    const { data, error } = await supabase.from('creators').select('*').eq('id', id).single();
    if (error) {
      alert('Error fetching creator');
    } else {
      setCreator(data);
      setName(data.name);
      setUrl(data.url);
      setDescription(data.description);
      setImageURL(data.image_url || '');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCreator();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('creators').update({
      name,
      url,
      description,
      image_url: imageURL
    }).eq('id', id);

    if (error) alert('Update failed: ' + error.message);
    else alert('Creator updated!');
  };

  const deleteConfirmed = async () => {
    const { error } = await supabase.from('creators').delete().eq('id', id);
    if (error) alert('Delete failed: ' + error.message);
    else navigate('/');
  };

  if (loading) return <p>Loading...</p>;
  if (!creator) return <p>Creator not found.</p>;

  return (
    <div className="form-container">
      <h2>Edit Creator</h2>
      <form onSubmit={handleUpdate}>
        <label>Name *</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Channel URL *</label>
        <input value={url} onChange={(e) => setUrl(e.target.value)} required />

        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Image URL</label>
        <input value={imageURL} onChange={(e) => setImageURL(e.target.value)} />

        <div className="button-row">
            <button type="submit">Update Creator</button>
            <button type="button" className="delete-btn" onClick={() => setShowModal(true)}>
                Delete Creator
            </button>
        </div>

        <a className="back-link" href="/">← Back to Home</a>
      </form>
      {showModal && (
        <div className="modal-overlay">
            <div className="modal-content">
            <h2>⚠️ WAIT!!!! ⚠️</h2>
            <p>Are you sure you want to delete <strong>{name}</strong>???</p>
            <div className="modal-buttons">
                <button className="cancel-btn" onClick={() => setShowModal(false)}>
                NAH, NEVER MIND
                </button>
                <button className="confirm-btn" onClick={deleteConfirmed}>
                YES! TOTALLY SURE
                </button>
            </div>
            </div>
        </div>
        )}
        
    </div>
  );
};

export default CreatorDetails;
