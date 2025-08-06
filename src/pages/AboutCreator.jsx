import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './AboutCreator.css';

const AboutCreator = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase.from('creators').select('*').eq('id', id).single();
      if (error) {
        alert('Failed to load creator');
      } else {
        setCreator(data);
      }
      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!creator) return <p>Creator not found</p>;

  return (
    <div className="about-container">
      <div className="about-card">
        <img src={creator.image_url} alt={creator.name} className="about-img" />
        <div className="about-info">
          <h2>{creator.name.toUpperCase()}</h2>
          <p>{creator.description}</p>
          <p>🔗 <a href={creator.url} target="_blank" rel="noopener noreferrer">{creator.url}</a></p>
          <div className="about-buttons">
            <Link to={`/creator/${creator.id}`} className="edit-btn">EDIT</Link>
            <Link to="/" className="delete-btn">DELETE</Link> {/* Optional */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCreator;
