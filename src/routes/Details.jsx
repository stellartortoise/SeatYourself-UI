import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Details() {

    const { id } = useParams();

    const [occasion, setOccasion] = useState(null);

    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const getOccasionById = async () => {
            const response = await fetch(`${apiUrl}/${id}`);
            const result = await response.json();
            
            if (response.ok) {
                setOccasion(result);
            }
        };

        getOccasionById();
    }, []);

    return (
        <>
            <p><Link to="/">Go to Home</Link></p>

            <div>
                {occasion && (
                    <>
                        <h2>{occasion.Title}</h2>
                        <img src={occasion.Filename} alt={occasion.Title} />
                        <p>{occasion.Description}</p>
                    </>
                )}
            </div>

            {/* <div>Details Page for ID: {id}</div>

            <h2>Comments</h2>

            <p>Coming Soon...</p> */}

            <p><Link to={`/comments/${id}`}>Add a Comment</Link></p>
        </>
    );
}

export default Details;