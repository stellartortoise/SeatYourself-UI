import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Comment() {
  const { id } = useParams();
    return (
        <>
            <p><Link to={`/details/${id}`}>Go to Details</Link></p>
            <div>
                <h2>Comment Component for ID: {id}</h2>
            </div>
            
        </>
    );
}

export default Comment;