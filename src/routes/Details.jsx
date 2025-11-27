import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
            <p><Link to="/">← Back to Home</Link></p>

            <div>
                {occasion && (
                    <>
                        <h2>{occasion.Title}</h2>
                        <img src={occasion.Filename} alt={occasion.Title} width="600" />
                        <p>{occasion.Description}</p>
                    </>
                )}
            </div>

            <h3>Comments</h3>

            <p>Coming Soon...</p>

            <p><Link to={`/comments/${id}`}>Add a Comment</Link></p>
        </>
    );
}

export default Details;