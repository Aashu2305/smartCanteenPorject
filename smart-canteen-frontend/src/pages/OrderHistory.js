import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import OrderDetailsModal from '../components/OrderDetailsModal'; // 👈 Import the new modal
import './OrderHistory.css';

function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null); // 👈 State for the selected order

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/api/orders/my-orders');
                setOrders(response.data);
            } catch (err) {
                setError('Could not fetch order history. Please try again later.');
                console.error("Fetch orders error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div className="order-history-container"><h2>Loading Your Orders...</h2></div>;
    if (error) return <div className="order-history-container"><h2>{error}</h2></div>;

    return (
        <>
            <div className="order-history-container">
                <h1>My Order History</h1>
                {orders.length === 0 ? (
                    <p>You haven't placed any orders yet.</p>
                ) : (
                    <div className="orders-list">
                        {orders.map(order => (
                            // 👇 Each card is now clickable
                            <div key={order.id} className="order-card" onClick={() => setSelectedOrder(order)}>
                                <div className="order-card-header">
                                    <h3>Order #{order.id}</h3>
                                    <span>{new Date(order.orderTimestamp).toLocaleDateString()}</span>
                                </div>
                                <div className="order-card-summary">
                                    {JSON.parse(order.orderItems).slice(0, 2).map((item, index) => (
                                        <span key={index}>{item.name}{index === 0 && JSON.parse(order.orderItems).length > 1 ? ', ' : ''}</span>
                                    ))}
                                    {JSON.parse(order.orderItems).length > 2 && '...'}
                                </div>
                                <div className="order-card-footer">
                                    <strong>Total: ₹{order.totalPrice.toFixed(2)}</strong>
                                    <span className="view-details-prompt">View Details →</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {/* 👇 Render the new Order Details Modal */}
            <OrderDetailsModal 
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
            />
        </>
    );
}

export default OrderHistory;
