import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import './OrderHistory.css';

function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/api/orders/my-orders');
                
                // Sort newest first
                const sortedOrders = response.data.sort(
                    (a, b) => new Date(b.orderTimestamp) - new Date(a.orderTimestamp)
                );

                setOrders(sortedOrders);
            } catch (err) {
                setError('Could not fetch order history. Please try again later.');
                console.error("Fetch orders error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="order-history-container">
                <div className="skeleton-loader">Loading your tasty orders...</div>
            </div>
        );
    }

    if (error) {
        return <div className="order-history-container"><h2>{error}</h2></div>;
    }

    return (
        <div className="order-history-container">
            <h1>📜 My Orders</h1>
            {orders.length === 0 ? (
                <p className="empty-msg">You haven’t placed any orders yet. Time to fix that! 🍽️</p>
            ) : (
                <div className="orders-list">
                    {orders.map(order => (
                        <div key={order.id} className="order-card">
                            <div className="order-card-header">
                                <div>
                                    <h3>Order #{order.id}</h3>
                                    <span className="order-date">
                                        {new Date(order.orderTimestamp).toLocaleDateString()} • {new Date(order.orderTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <span className={`order-status ${order.status?.toLowerCase() || 'completed'}`}>
                                    {order.status || 'Completed'}
                                </span>
                            </div>

                            <div className="order-items">
                                {JSON.parse(order.orderItems).map(item => (
                                    <div key={item.id} className="order-item">
                                        <span className="item-quantity">{item.quantity}×</span>
                                        <span className="item-name">{item.name}</span>
                                        <span className="item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="order-card-footer">
                                <strong>Total: ₹{order.totalPrice.toFixed(2)}</strong>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrderHistory;

