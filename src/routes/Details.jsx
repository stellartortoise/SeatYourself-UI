import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CommentCard from '../ui/CommentCard.jsx';

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

    const [comments, setComments] = useState([]);

    const apiUrlComments = import.meta.env.VITE_API_URL + '/comments';

    useEffect(() => {
        const getComments = async () => {
            const response = await fetch(apiUrlComments);
            const result = await response.json();

            if (response.ok) {
                setComments(result);
            }
        }

        getComments();
    }, []);

    if (!occasion) return <p>Loading...</p>;

    const formattedDate = occasion.Date
    ? (() => {
        const date = new Date(occasion.Date);
        return isNaN(date.getTime()) ? occasion.Date : date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
      })()
    : '';

    const formattedTime = occasion.Time
    ? (() => {
        const time = String(occasion.Time).trim();
        let parsedDate = new Date(time);
        // If parsing failed, try parsing time-only formats like "18:30" or "6:30 PM"
        if (isNaN(parsedDate.getTime())) {
        const timeOnly = /^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM|am|pm)?$/;
        const timeMatchResults = time.match(timeOnly);
        if (timeMatchResults) {
            parsedDate = new Date();
            let hour = parseInt(timeMatchResults[1], 10);
            const minute = parseInt(timeMatchResults[2], 10);
            const sec = timeMatchResults[3] ? parseInt(timeMatchResults[3], 10) : 0;
            const ampm = timeMatchResults[4];
            if (ampm) {
            const up = ampm.toUpperCase();
            if (up === 'PM' && hour < 12) hour += 12;
            if (up === 'AM' && hour === 12) hour = 0;
            }
            d.setHours(hour, minute, sec, 0);
        }
        }
        
        if (isNaN(parsedDate.getTime())) return occasion.Time;

          // Format as 12-hour with uppercase AM/PM (no dots)
          let hours = parsedDate.getHours();
          const minutes = parsedDate.getMinutes();
          const ampmLabel = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12 || 12;
          const minuteStr = String(minutes).padStart(2, '0');
          return `${hours}:${minuteStr} ${ampmLabel}`;
        })()
    : '';

    const formattedPrice = (() => {
        if (occasion.Price === undefined || occasion.Price === null) return '';
        // try numeric conversion first
        const num = Number(occasion.Price);
        if (!isNaN(num)) return num.toFixed(2);
        // strip non-numeric characters and try parseFloat
        const cleaned = String(occasion.Price).replace(/[^0-9.\-]+/g, '');
        const parsed = parseFloat(cleaned);
         return isNaN(parsed) ? String(occasion.Price) : parsed.toFixed(2);
    })();

    const filteredComments = comments.filter(c => String(c.OccasionId) === String(id));

    return (
        <>
            <p><Link to="/">← Back to Home</Link></p>

            <div>
                {occasion && (
                    <>
                    <div className="occasion-details">
                        <h2>{occasion.Title}</h2>
                        <img src={occasion.Filename} alt={occasion.Title} width="600" />
                        <p>{occasion.Description}</p>
                        <div className="details-info">
                            <div><strong>Date:</strong> {formattedDate}</div>
                            <div><strong>Time:</strong> {formattedTime}</div>
                            <div><strong>Location:</strong> {occasion.Location}</div>
                            <div><strong>Owner:</strong> {occasion.Owner}</div>
                            <div><strong>Category:</strong> {occasion.Name}</div>
                            <div><strong>Price:</strong> ${formattedPrice}</div>
                        </div>
                    </div>
                    </>
                )}
            </div>

            <h3>Comments</h3>


            <div>
            {filteredComments.length > 0 ? (
              filteredComments.map(comment => (
                <div key={comment.CommentId ?? comment.id}>
                 <CommentCard Author={comment.Author} Body={comment.Body} CreatedAt={comment.CreatedAt} />
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
            </div>

            <p><Link to={`/comments/${id}`}>Add a Comment</Link></p>
        </>
    );
}

export default Details;