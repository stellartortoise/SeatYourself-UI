import { useEffect, useState } from 'react';
import OccasionCard from '../ui/OccasionCard';

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

  return (
    <>
      <h3 className="center">Welcome to SeatYourself</h3>
      <div className="grid-container">
        <div className="occasion-grid">
        {
          occasions.length > 0 && (
              occasions.map((occasion => (
                <div key={occasion.OccasionId}>
                  <OccasionCard OccasionId={occasion.OccasionId} Filename={occasion.Filename} Title={occasion.Title}/>
                </div>
              ))))
        }
        </div>
      </div>
    </>
  ); 


}

export default Home