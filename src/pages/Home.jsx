// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Home.css';

const Home = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCreators = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('creators').select('*');
    if (error) {
      console.error('Error fetching creators:', error.message);
    } else {
      setCreators(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCreators();
  }, []);

  return (
    <div className="home-container">
      <h1>🌟 Creatorverse</h1>
      <p className="subtitle">
        A person's top content creators can say a lot about them.
        Do they prefer lockpicking videos 🛠️, casual art streams 🖌️, or hustle-culture TikTokers 📱?
      </p>

      <button className="add-btn" onClick={() => navigate('/add')}>
        ➕ Add a Creator
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : creators.length === 0 ? (
        <p className="empty-state">No creators yet 😞</p>
      ) : (
        <div className="creator-grid">
        {creators.map((c) => (
            <div key={c.id} className="creator-card">
                <div className="card-actions">
                <span 
          onClick={() => navigate(`/about/${c.id}`)} 
          className="icon-btn" 
          title="View Creator"
        >
          👁️
        </span>
        <span 
          onClick={() => navigate(`/creator/${c.id}`)} 
          className="icon-btn" 
          title="Edit Creator"
        >
          ✏️
        </span>
            </div>
            {c.image_url && <img src={c.image_url} alt={c.name} />}
            <div className="card-overlay">
                <h3>{c.name}</h3>
                <p className="card-description">{c.description}</p>
            </div>
            </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default Home;
