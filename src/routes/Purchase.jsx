import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

function Purchase() {
    const { id } = useParams();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const [occasion, setOccasion] = useState(null);

    const apiUrlOccasion = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const getOccasionById = async () => {
            const response = await fetch(`${apiUrlOccasion}/${id}`);
            const result = await response.json();
            
            if (response.ok) {
                setOccasion(result);
            }
        };

        getOccasionById();
    }, [apiUrlOccasion, id]);

    const onSubmit = async(formData) => {
        setSubmitting(true);
        setErrorMessage(null);

        // normalize/prepare payload using the fields requested
        const payload = {
            NumTicketsOrdered: Number(formData.NumTicketsOrdered || 1),
            CustomerFirstName: formData.CustomerFirstName || '',
            CustomerLastName: formData.CustomerLastName || '',
            CustomerEmail: formData.CustomerEmail || '',
            CustomerPhone: formData.CustomerPhone || '',
            CustomerAddress: formData.CustomerAddress || '',
            CreditCardNumber: formData.CreditCardNumber || '',
            CreditCardExpiry: formData.CreditCardExpiry || '',
            CreditCardCvv: formData.CreditCardCvv || '',
            PurchaseDate: new Date().toISOString(),
            OccasionId: String(id)
        };

        try {
            const response = await fetch(import.meta.env.VITE_API_URL + '/purchases', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                setSubmitted(true);
            } else {
                setErrorMessage(result.message || 'Failed to create purchase. Please try again.');
                console.error('Purchase creation failed', result);
            }
        } catch (err) {
            setErrorMessage('Network error while creating purchase: ' + err.message);
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    }

    if (!occasion) return <p>Loading...</p>;

    return (
        <>
            <p><Link to={`/details/${id}`}>← Back to Occasion</Link></p>

            <h2>{occasion.Title}</h2>
            <img src={occasion.Filename} alt={occasion.Title} width="600" />
            
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            
            {!submitted && (
            <form onSubmit={handleSubmit(onSubmit)} className="w-100 p-3 border rounded">
                {/* Hidden fields */}
                <input type="hidden" value={id} {...register('OccasionId')} />
                <input type="hidden" value={new Date().toISOString()} {...register('PurchaseDate')} />

                <div className="mb-3">
                    <label htmlFor="NumTicketsOrdered" className="form-label">Number of Tickets</label>
                    <input type="number" className="form-control" id="NumTicketsOrdered"
                     defaultValue={1} min={1}
                     {...register('NumTicketsOrdered', { required: true, valueAsNumber: true })} />
                     {errors.NumTicketsOrdered && <span className="text-danger">Please enter a quantity</span>}
                </div>

                <div className="row">
                  <div className="col mb-3">
                    <label htmlFor="CustomerFirstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="CustomerFirstName"
                     {...register('CustomerFirstName', { required: true })} />
                     {errors.CustomerFirstName && <span className="text-danger">Required</span>}
                  </div>
                  <div className="col mb-3">
                    <label htmlFor="CustomerLastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="CustomerLastName"
                     {...register('CustomerLastName', { required: true })} />
                     {errors.CustomerLastName && <span className="text-danger">Required</span>}
                  </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="CustomerEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="CustomerEmail"
                     {...register('CustomerEmail', { 
                       required: 'Email is required',
                       pattern: {
                         value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                         message: 'Please enter a valid email address'
                       }
                     })} />
                     {errors.CustomerEmail && <span className="text-danger">{errors.CustomerEmail.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="CustomerPhone" className="form-label">Phone</label>
                    <input type="tel" className="form-control" id="CustomerPhone"
                     {...register('CustomerPhone')} />
                </div>

                <div className="mb-3">
                    <label htmlFor="CustomerAddress" className="form-label">Address</label>
                    <input className="form-control" id="CustomerAddress" rows="2"
                    {...register('CustomerAddress', { required: true })} />
                    {errors.CustomerAddress && <span className="text-danger">Required</span>}
                </div>

                <hr />

                <div className="mb-3">
                    <label htmlFor="CreditCardNumber" className="form-label">Card Number</label>
                    <input type="text" inputMode="numeric" className="form-control" id="CreditCardNumber"
                     {...register('CreditCardNumber', { required: true })} />
                     {errors.CreditCardNumber && <span className="text-danger">Required</span>}
                </div>

                <div className="row">
                  <div className="col mb-3">
                    <label htmlFor="CreditCardExpiry" className="form-label">Expiry (MM/YY)</label>
                    <input type="text" className="form-control" id="CreditCardExpiry" placeholder="MM/YY"
                     {...register('CreditCardExpiry', { required: true })} />
                     {errors.CreditCardExpiry && <span className="text-danger">Required</span>}
                  </div>
                  <div className="col mb-3">
                    <label htmlFor="CreditCardCvv" className="form-label">CVV</label>
                    <input type="password" inputMode="numeric" maxLength={4} className="form-control" id="CreditCardCvv"
                     {...register('CreditCardCvv', { required: true })} />
                     {errors.CreditCardCvv && <span className="text-danger">Required</span>}
                  </div>
                </div>

                <div className="mb-3">
                    <h4>Order Summary</h4>
                    <div><strong>Occasion:</strong> {occasion.Title}</div>
                    <div><strong>Price per Ticket:</strong> ${Number(occasion.Price).toFixed(2)}</div>
                    <div><strong>Number of Tickets:</strong> {watch('NumTicketsOrdered') || 1}</div>
                    <div><strong>Total Price:</strong> ${((Number(occasion.Price) || 0) * (Number(watch('NumTicketsOrdered') || 1))).toFixed(2)}</div>
                </div>


                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Processing…' : 'Proceed to Payment'}
                </button>
            </form>
            )}

            {submitted && (
                <div className="alert alert-success" role="alert">
                    Purchase submitted successfully!
                </div>
            )}
            
        </>
    );
}

export default Purchase;
