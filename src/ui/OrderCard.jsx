import React from 'react';


function OrderCard(props) {

    const formattedDate = props.Date
    ? (() => {
        const parsedDate = new Date(props.Date);
        if (isNaN(parsedDate.getTime())) return props.Date;
        return parsedDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
        })()
    : '';

    return (
        <>
        <div key={props.PurchaseId} className="order-card border p-3 mb-3 rounded">
            <h4>Order #{props.PurchaseId}</h4>
            <div><strong>Occasion:</strong> {props.OccasionTitle}</div>
            <div><strong>Date:</strong> {formattedDate}</div>
            <div><strong>Number of Tickets:</strong> {props.NumTicketsOrdered}</div>
            <div><strong>Total Price:</strong> ${Number(props.TotalPrice).toFixed(2)}</div>
        </div>  
        </>
    );
}

export default OrderCard;