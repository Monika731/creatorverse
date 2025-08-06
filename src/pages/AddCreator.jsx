// src/pages/AddCreator.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './AddCreator.css';

const AddCreator = () => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('creators').insert([
      { name, url, description, image_url: imageURL }
    ]);

    setLoading(false);

    if (error) {
      alert('Error adding creator: ' + error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="add-container">
      <h2>Add a New Creator</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name *</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="url">Channel URL *</label>
        <input
          id="url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="imageURL">Image URL (optional)</label>
        <input
          id="imageURL"
          type="text"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Creator'}
        </button>
      </form>

      <a href="/" className="back-link">← Back to Home</a>
    </div>
  );
};

export default AddCreator;
