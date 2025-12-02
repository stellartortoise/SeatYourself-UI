import { useParams } from 'react-router-dom';
import { Link} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

function Comment() {
  const { id } = useParams();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
    // const [comments, setComments] = useState([]);
  
    // const apiUrl = import.meta.env.VITE_API_URL + '/comments';
  
    // useEffect(() => {
    //   const getComments = async () => {
    //     const response = await fetch(apiUrl);
    //     const result = await response.json();
  
    //     if (response.ok) {
    //       setComments(result);
    //     }
    //   }
  
    //   getComments();
  
    // }, []);

  const onSubmit = async(data) => {
    console.log(data);
    setSubmitting(true);

    const response = await fetch(import.meta.env.VITE_API_URL + '/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
          setSubmitted(true);
        } else {
            console.error('Failed to submit comment', result);
        }
        setSubmitting(false);


        // if (response.ok) {
        //     alert('Comment submitted successfully!');
        // } else {
        //     alert('Failed to submit comment.');
        // }
    }

    return (
        <>
            <p><Link to={`/details/${id}`}>← Back to Occasion</Link></p>
            
            {!submitted && (
            <form onSubmit={handleSubmit(onSubmit)} className="w-100 p-3 border rounded">
                <input type="hidden" value={id} {...register('OccasionId')} />
                {/* <input type="hidden" value={new Date().toISOString()} {...register('CreatedAt')} /> */}

                <div className="mb-3">
                    <label htmlFor="Author" className="form-label">Author</label>
                    <input type="text" className="form-control" id="Author"
                     {...register('Author', { required: true })} />
                     {errors.Author && <span className="text-danger">This field is required</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="Body" className="form-label">Body</label>
                    <textarea className="form-control" id="Body" rows="3" 
                    {...register('Body', { required: true })}></textarea>
                    {errors.Body && <span className="text-danger">This field is required</span>}
                </div>

                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Submitting…' : 'Submit'}
                </button>
            </form>
            )}

            {submitted && (
                <div className="alert alert-success" role="alert">
                    Comment submitted successfully!
                </div>
            )}
            
        </>
    );
}

export default Comment;
