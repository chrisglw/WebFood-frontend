import React, { useState } from 'react';
import './ManageOrders.css';

function ManageOrders({ orders, setOrders }) {
    const [declineReason, setDeclineReason] = useState({});
    const [customDeclineReason, setCustomDeclineReason] = useState({});
    const [editingOrderId, setEditingOrderId] = useState(null);
    const [editedOrder, setEditedOrder] = useState(null);
    const [cancelReason, setCancelReason] = useState({});

    const handleStatusChange = (orderId, newStatus) => {
        const updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
    };

    const handleDecline = (orderId, reason) => {
        const declineText = reason === 'Other' ? customDeclineReason[orderId] : reason;
        const updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, status: 'Declined', declineReason: declineText } : order
        );
        setOrders(updatedOrders);
    };

    const handleEdit = (orderId) => {
        const orderToEdit = orders.find(order => order.id === orderId);
        setEditingOrderId(orderId);
        setEditedOrder({ ...orderToEdit, items: [...orderToEdit.items] });
    };

    const handleSaveEdit = () => {
        if (!editedOrder) return;

        
        const updatedSubtotal = editedOrder.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
        const updatedTax = updatedSubtotal * 0.06; 
        const updatedTotal = updatedSubtotal + updatedTax;

        const finalEditedOrder = {
            ...editedOrder,
            subtotal: updatedSubtotal.toFixed(2),
            tax: updatedTax.toFixed(2),
            total: updatedTotal.toFixed(2),
        };

        const updatedOrders = orders.map(order =>
            order.id === editingOrderId ? finalEditedOrder : order
        );

        setOrders(updatedOrders);
        setEditingOrderId(null);
        setEditedOrder(null); 
    };

    // Cancel editing
    const handleCancelEdit = () => {
        setEditingOrderId(null); 
        setEditedOrder(null); 
    };

    const handleEditChange = (index, field, value) => {
        setEditedOrder(prev => {
            const updatedItems = prev.items.map((item, idx) =>
                idx === index ? { ...item, [field]: value } : item
            );

            const updatedSubtotal = updatedItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );
            const updatedTax = updatedSubtotal * 0.06;
            const updatedTotal = updatedSubtotal + updatedTax;

            return {
                ...prev,
                items: updatedItems,
                subtotal: updatedSubtotal.toFixed(2),
                tax: updatedTax.toFixed(2),
                total: updatedTotal.toFixed(2),
            };
        });
    };

    return (
        <div className="menu-container">
            <h1 className="menu-title">Manage Orders</h1>
            {orders.length === 0 ? (
                <p className="no-items-message">No orders available.</p>
            ) : (
                [...orders].sort((a, b) => b.id - a.id).map(order => (
                    <div key={order.id} className="order-item">
                        <h2>Order #{order.id}</h2>
                        <p><strong>Customer:</strong> {order.customerName}</p>
                        <p><strong>Email:</strong> {order.email}</p>
                        {editingOrderId === order.id ? (
                            <div className="edit-order">
                                <ul>
                                    {editedOrder.items.map((item, index) => (
                                        <li key={index}>
                                            <input
                                                type="text"
                                                value={item.name}
                                                onChange={(e) =>
                                                    handleEditChange(index, 'name', e.target.value)
                                                }
                                            /> - $
                                            <input
                                                type="number"
                                                value={item.price}
                                                onChange={(e) =>
                                                    handleEditChange(index, 'price', parseFloat(e.target.value) || 0)
                                                }
                                            /> x
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    handleEditChange(index, 'quantity', parseInt(e.target.value) || 1)
                                                }
                                            />
                                        </li>
                                    ))}
                                </ul>
                                <p><strong>Subtotal:</strong> ${editedOrder.subtotal}</p>
                                <p><strong>Tax:</strong> ${editedOrder.tax}</p>
                                <p><strong>Total:</strong> ${editedOrder.total}</p>
                                <button onClick={handleSaveEdit}>Save</button>
                                <button onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        ) : (
                            <ul>
                                {order.items.map((item, index) => (
                                    <li key={index}>
                                        {item.quantity} x {item.name} (${item.price.toFixed(2)})
                                    </li>
                                ))}
                            </ul>
                        )}
                        <p><strong>Subtotal:</strong> ${order.subtotal}</p>
                        <p><strong>Tax:</strong> ${order.tax}</p>
                        <p><strong>Total:</strong> ${order.total}</p>
                        <p><strong>Status:</strong> {order.status}</p>

                        {order.status === 'Pending' && (
                            <div className="order-actions">
                                <button onClick={() => handleStatusChange(order.id, 'Accepted')}>
                                    Accept
                                </button>
                                <button onClick={() => handleEdit(order.id)}>Edit</button>
                                <button
                                    onClick={() =>
                                        setDeclineReason({ ...declineReason, [order.id]: true })
                                    }
                                >
                                    Decline
                                </button>
                                {declineReason[order.id] && (
                                    <>
                                        <select
                                            onChange={(e) =>
                                                setDeclineReason({ ...declineReason, [order.id]: e.target.value })
                                            }
                                        >
                                            <option value="" disabled>Select Reason</option>
                                            <option value="Out of stock">Out of stock</option>
                                            <option value="Incorrect order">Incorrect order</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {declineReason[order.id] === 'Other' && (
                                            <textarea
                                                placeholder="Enter custom reason..."
                                                onChange={(e) =>
                                                    setCustomDeclineReason({ ...customDeclineReason, [order.id]: e.target.value })
                                                }
                                            />
                                        )}
                                        <button onClick={() => handleDecline(order.id, declineReason[order.id])}>
                                            Confirm Decline
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                        {order.status === 'Accepted' && (
                            <div className="order-actions">
                                <button onClick={() => handleStatusChange(order.id, 'Ready for Pick Up')}>
                                    Ready for Pick Up
                                </button>
                                <button
                                    onClick={() =>
                                        setCancelReason({ ...cancelReason, [order.id]: true })
                                    }
                                >
                                    Cancel Order
                                </button>
                                {cancelReason[order.id] && (
                                    <>
                                        <select
                                            onChange={(e) =>
                                                setCancelReason({ ...cancelReason, [order.id]: e.target.value })
                                            }
                                        >
                                            <option value="" disabled>Select Reason</option>
                                            <option value="Customer requested cancellation">Customer requested cancellation</option>
                                            <option value="Restaurant issue">Restaurant issue</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {cancelReason[order.id] === 'Other' && (
                                            <textarea
                                                placeholder="Enter custom reason..."
                                                onChange={(e) =>
                                                    setCustomDeclineReason({ ...customDeclineReason, [order.id]: e.target.value })
                                                }
                                            />
                                        )}
                                        <button onClick={() => handleDecline(order.id, cancelReason[order.id])}>
                                            Confirm Cancellation
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default ManageOrders;
