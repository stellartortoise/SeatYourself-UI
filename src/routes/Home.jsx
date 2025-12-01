import { useEffect, useState } from 'react';
import OccasionCard from '../ui/OccasionCard';
// import {useNavigate, useLocation } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Home() 
{
  const [occasions, setOccasions] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getOccasions = async () => {
      const response = await fetch(apiUrl);
      const result = await response.json();

      if (response.ok) {
        setOccasions(result);
      }
    }

    getOccasions();

  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initial = params.get('q') ?? '';

  const [query, setQuery] = useState(initial);

  useEffect(() => {
    // keep input in sync when user navigates (back/forward)
    const p = new URLSearchParams(location.search).get('q') ?? '';
    setQuery(p);
  }, [location.search]);

  const onChange = (e) => {
    const v = e.target.value;
    setQuery(v);
    const p = new URLSearchParams(location.search);
    if (v.trim() === '') {
      p.delete('q');
    } else {
      p.set('q', v);
    }
    // replace so typing doesn't create history entries
    navigate({ pathname: location.pathname, search: p.toString() ? `?${p.toString()}` : '' }, { replace: true });
  };

  //Search filter
  const q = new URLSearchParams(location.search).get('q') ?? '';
  const qLower = q.trim().toLowerCase();
  const filtered = qLower === ''
    ? occasions
    : occasions.filter(o => (o.Title || o.title || '').toString().toLowerCase().includes(qLower));

  return (
    <>
      <h3 className="center">Welcome to SeatYourself</h3>
        <div className="search-wrapper">
          <input
            value={query}
            onChange={onChange}
            className="search"
            placeholder="Search titles..."
            aria-label="Search occasions"
          />
        </div>
      {/* Non-Searchable elements here */}
      {/* <div className="grid-container">
        <div className="occasion-grid">
        {
          occasions.length > 0 && (
              occasions.map((occasion => (
                <div key={occasion.OccasionId ?? occasion.id}>
                  <OccasionCard OccasionId={occasion.OccasionId} Filename={occasion.Filename} Title={occasion.Title} Description={occasion.Description} Date={occasion.Date} Time={occasion.Time} Location={occasion.Location} Price={occasion.Price} />
                </div>
              ))))
        }
        </div>
      </div> */}
      <div className="grid-container">
        <div className="occasion-grid">
        {filtered.length === 0 && occasions.length === 0 && <p>Loading...</p>}
          {filtered.map((occasion) => (
            <div key={occasion.OccasionId ?? occasion.id}>
              <OccasionCard
               OccasionId={occasion.OccasionId}
                Filename={occasion.Filename}
                Title={occasion.Title}
                Description={occasion.Description}
                Date={occasion.Date}
                Time={occasion.Time}
                Location={occasion.Location}
                Price={occasion.Price}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  ); 


}

export default Home