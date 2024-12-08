import React, { useState, useEffect } from 'react';
import { getOrders, updateOrder } from '../../api/api';
import './ManageOrders.css';

function ManageOrders({ orders, setOrders }) {
    const [editingOrderId, setEditingOrderId] = useState(null);
    const [editedOrder, setEditedOrder] = useState(null);
    const [filterStatus, setFilterStatus] = useState('realtime');

    useEffect(() => {
        getOrders().then((data) => {
            // Sort by newest first for 'realtime' default
            const sorted = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setOrders(sorted);
        });
    }, [setOrders]);

    // Map user-facing statuses to backend values
    const statusMapping = {
        'Pending': 'Pending',
        'Accepted': 'Accepted',
        'Declined': 'Declined',
        'Ready for Pick Up': 'ReadyForPickUp', // Backend value must match model's choice
        'Completed': 'Completed'
    };

    const handleStatusChange = async (orderId, newStatus) => {
        const backendStatus = statusMapping[newStatus];
        if (!backendStatus) {
            console.error('Invalid status:', newStatus);
            return;
        }

        const orderToUpdate = orders.find(order => order.id === orderId);
        if (!orderToUpdate) return;

        const transformedItems = orderToUpdate.items.map(item => ({
            menu_item: item.id,
            quantity: item.quantity
        }));

        const updatedOrder = {
            customer_name: orderToUpdate.customer_name,
            email: orderToUpdate.email,
            status: backendStatus, // Use backend-friendly status
            items: transformedItems
        };

        try {
            await updateOrder(orderId, updatedOrder);
            setOrders(
                orders.map(order =>
                    (order.id === orderId ? { ...order, status: newStatus } : order)
                )
            );
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleEdit = (orderId) => {
        const orderToEdit = orders.find(order => order.id === orderId);
        const clonedItems = orderToEdit.items.map(item => ({ ...item }));
        setEditingOrderId(orderId);
        setEditedOrder({ ...orderToEdit, items: clonedItems });
    };

    const handleSaveEdit = async () => {
        if (!editedOrder) return;

        const updatedSubtotal = editedOrder.items.reduce(
            (total, item) => total + Number(item.price) * item.quantity,
            0
        );
        const updatedTax = updatedSubtotal * 0.06;
        const updatedTotal = updatedSubtotal + updatedTax;

        // Convert the edited order status to its backend value
        const backendStatus = statusMapping[editedOrder.status] || editedOrder.status;

        const finalEditedOrder = {
            customer_name: editedOrder.customer_name,
            email: editedOrder.email,
            status: backendStatus,
            items: editedOrder.items.map(item => ({
                menu_item: item.id,
                quantity: item.quantity
            }))
        };

        try {
            await updateOrder(editingOrderId, finalEditedOrder);
            const updatedOrders = orders.map(order =>
                order.id === editingOrderId
                    ? { ...editedOrder, subtotal: updatedSubtotal, tax: updatedTax, total: updatedTotal }
                    : order
            );
            setOrders(updatedOrders);
            setEditingOrderId(null);
            setEditedOrder(null);
        } catch (error) {
            console.error('Error saving edited order:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingOrderId(null);
        setEditedOrder(null);
    };

    const handleDeleteItem = (itemIndex) => {
        setEditedOrder(prev => ({
            ...prev,
            items: prev.items.filter((_, index) => index !== itemIndex)
        }));
    };

    let displayedOrders = [...orders];

    if (filterStatus !== 'realtime') {
        displayedOrders = displayedOrders.filter(order => order.status === filterStatus);
    } else {
        displayedOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return (
        <div className="menu-container">
            <h1 className="menu-title">Manage Orders</h1>

            <div className="filter-section">
                <label htmlFor="statusFilter">Filter by Status:</label>
                <select
                    id="statusFilter"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="realtime">Real Time</option>
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Ready for Pick Up">Ready for Pick Up</option>
                    <option value="Declined">Declined</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            {displayedOrders.length === 0 ? (
                <p className="no-items-message">No orders available.</p>
            ) : (
                displayedOrders.map(order => (
                    <div key={order.id} className="order-item">
                        <h2>Order #{order.id}</h2>
                        <p><strong>Customer:</strong> {order.customer_name}</p>
                        <p><strong>Email:</strong> {order.email}</p>

                        {editingOrderId === order.id ? (
                            <div className="edit-order">
                                <ul>
                                    {editedOrder.items.map((item, index) => (
                                        <li key={index}>
                                            <input
                                                type="text"
                                                value={item.name || ''}
                                                onChange={(e) =>
                                                    setEditedOrder(prev => {
                                                        const updatedItems = [...prev.items];
                                                        updatedItems[index].name = e.target.value;
                                                        return { ...prev, items: updatedItems };
                                                    })
                                                }
                                            /> - $
                                            <input
                                                type="number"
                                                value={item.price || ''}
                                                onChange={(e) =>
                                                    setEditedOrder(prev => {
                                                        const updatedItems = [...prev.items];
                                                        updatedItems[index].price = e.target.value;
                                                        return { ...prev, items: updatedItems };
                                                    })
                                                }
                                            /> x
                                            <input
                                                type="number"
                                                value={item.quantity || ''}
                                                onChange={(e) =>
                                                    setEditedOrder(prev => {
                                                        const updatedItems = [...prev.items];
                                                        updatedItems[index].quantity = Number(e.target.value);
                                                        return { ...prev, items: updatedItems };
                                                    })
                                                }
                                            />
                                            <button
                                                onClick={() => handleDeleteItem(index)}
                                                className="delete-item-button"
                                            >
                                                Delete
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <p><strong>Subtotal:</strong> $
                                    {editedOrder.items
                                        .reduce((total, item) => total + Number(item.price) * item.quantity, 0)
                                        .toFixed(2)}
                                </p>
                                <p><strong>Tax:</strong> $
                                    {(editedOrder.items.reduce((total, item) => total + Number(item.price) * item.quantity, 0) * 0.06).toFixed(2)}
                                </p>
                                <p><strong>Total:</strong> $
                                    {(editedOrder.items.reduce((total, item) => total + Number(item.price) * item.quantity, 0) * 1.06).toFixed(2)}
                                </p>
                                <button onClick={handleSaveEdit}>Save</button>
                                <button onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        ) : (
                            <ul>
                                {order.items.map((item, index) => (
                                    <li key={index}>
                                        {item.quantity} x {item.name || 'Unknown'} (${Number(item.price).toFixed(2)})
                                    </li>
                                ))}
                            </ul>
                        )}

                        <p><strong>Status:</strong> {order.status}</p>
                        <div className="order-actions">
                            {order.status === 'Pending' && (
                                <>
                                    <button onClick={() => handleStatusChange(order.id, 'Accepted')}>Accept</button>
                                    <button onClick={() => handleEdit(order.id)}>Edit</button>
                                    <button onClick={() => handleStatusChange(order.id, 'Declined')}>Decline</button>
                                </>
                            )}
                            {order.status === 'Accepted' && (
                                <button onClick={() => handleStatusChange(order.id, 'Ready for Pick Up')}>
                                    Ready for Pick Up
                                </button>
                            )}
                            {order.status === 'Ready for Pick Up' && (
                                <button onClick={() => handleStatusChange(order.id, 'Completed')}>
                                    Complete
                                </button>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default ManageOrders;
