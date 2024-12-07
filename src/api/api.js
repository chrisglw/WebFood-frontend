import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

// Categories
export const getMenuCategories = async () => {
    const response = await axios.get(`${API_BASE_URL}categories/`);
    return response.data;
};

export const createCategory = async (categoryData) => {
    const response = await axios.post(`${API_BASE_URL}categories/`, categoryData);
    return response.data;
};

export const updateCategory = async (categoryId, categoryData) => {
    const response = await axios.put(`${API_BASE_URL}categories/${categoryId}/`, categoryData);
    return response.data;
};

export const deleteCategory = async (categoryId) => {
    await axios.delete(`${API_BASE_URL}categories/${categoryId}/`);
};

// Items
export const getMenuItems = async (categoryId = null) => {
    const url = categoryId ? `${API_BASE_URL}items/?category=${categoryId}` : `${API_BASE_URL}items/`;
    const response = await axios.get(url);
    return response.data;
};

export const createMenuItem = async (menuItemData) => {
    const response = await axios.post(`${API_BASE_URL}items/`, menuItemData);
    return response.data;
};

export const updateMenuItem = async (menuItemId, menuItemData) => {
    const response = await axios.put(`${API_BASE_URL}items/${menuItemId}/`, menuItemData);
    return response.data;
};

export const deleteMenuItem = async (menuItemId) => {
    await axios.delete(`${API_BASE_URL}items/${menuItemId}/`);
};

// Orders
export const getOrders = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}orders/`);
        const orders = response.data;

        // Enrich order items with full details
        const enrichedOrders = await Promise.all(
            orders.map(async (order) => {
                const enrichedItems = await Promise.all(
                    order.items.map(async (orderItem) => {
                        const menuItemResponse = await axios.get(
                            `${API_BASE_URL}items/${orderItem.menu_item}/`
                        );
                        return {
                            ...menuItemResponse.data, // Enriched with name, price
                            quantity: orderItem.quantity,
                        };
                    })
                );
                return {
                    ...order,
                    items: enrichedItems,
                };
            })
        );

        return enrichedOrders;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
};

export const createOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}orders/`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export const updateOrder = async (orderId, orderData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}orders/${orderId}/`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error updating order:', error.response?.data || error);
        throw error;
    }
};

export const deleteOrder = async (orderId) => {
    await axios.delete(`${API_BASE_URL}orders/${orderId}/`);
};

// Order Items
export const getOrderItems = async () => {
    const response = await axios.get(`${API_BASE_URL}order-items/`);
    return response.data;
};

export const createOrderItem = async (orderItemData) => {
    const response = await axios.post(`${API_BASE_URL}order-items/`, orderItemData);
    return response.data;
};

export const updateOrderItem = async (orderItemId, orderItemData) => {
    const response = await axios.put(`${API_BASE_URL}order-items/${orderItemId}/`, orderItemData);
    return response.data;
};

export const deleteOrderItem = async (orderItemId) => {
    await axios.delete(`${API_BASE_URL}order-items/${orderItemId}/`);
};
