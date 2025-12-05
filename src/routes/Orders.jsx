
import { useState, useEffect } from 'react';
import OrderCard from '../ui/OrderCard.jsx';

function Orders() {

    const [orders, setOrders] = useState([]);

    const apiUrl = import.meta.env.VITE_API_URL + '/purchases';

    useEffect(() => {
    const getOrders = async () => {
        const response = await fetch(apiUrl);
        const result = await response.json();

        if (response.ok) {
        setOrders(result);
        }
    }

    getOrders();
    }, []);
    
    return (
        <div>
            <h2>Orders Page</h2>
            <p>This is where users can view their past orders.</p>

            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="list-group">
                {orders.map((order) => (
                    <OrderCard key={order.OrderId} {...order} />
                ))}
                </div>
            )}
        </div>
    );

}

export default Orders;