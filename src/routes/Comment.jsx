import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Comment() {
  const { id } = useParams();

    return (
        <>
            <p><Link to={`/details/${id}`}>← Back to Occasion</Link></p>
            
            <form className="w-100 p-3 border rounded">
                <div className="mb-3">
                    <label for="author" className="form-label">Author</label>
                    <input type="text" className="form-control" id="author" />
                </div>
                <div className="mb-3">
                    <label for="body" className="form-label">Body</label>
                    <textarea className="form-control" id="body" rows="3"></textarea>
                    {/* <input type="" className="form-control" id="body" /> */}
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            
        </>
    );
}

export default Comment;
