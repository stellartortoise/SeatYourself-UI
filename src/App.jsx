import { useEffect, useState } from 'react'


function App() {
  const [ocassion, setOcassion] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getOcassion = async () => {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        setOcassion(data);
      }
    }

    getOcassion();

    console.log('Ocassion data:', ocassion);

  }, []);

  return (
    <>
      <p>Welcome to My Awesome App!</p>
      <div className="masonry-grid">
      {
        ocassion.length > 0 && (
            ocassion.map((item) => (
              <div key={item.OccasionId}>
                <h2>{item.Title}</h2>
                <img src={item.Filename} alt={item.Title} />
                <p>{item.Description}</p>
              </div>
            )))
      }
      </div>
    </>
  )
}

export default App
