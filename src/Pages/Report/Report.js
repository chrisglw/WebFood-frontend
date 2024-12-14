import React, { useEffect, useState } from 'react';
import './Report.css';

function SalesReport() {
    const [salesData, setSalesData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSalesReport = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:8000/api/orders/sales-report/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch sales report.');
                }

                const data = await response.json();
                setSalesData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSalesReport();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!salesData) {
        return <div>Failed to load sales report.</div>;
    }

    return (
        <div className="sales-report">
            <h1>Sales Report</h1>
            <div className="sales-summary">
                <p><strong>Total Revenue:</strong> ${salesData.total_revenue.toFixed(2)}</p>
                <p><strong>Total Orders:</strong> {salesData.total_orders}</p>
            </div>
            <h2>Popular Items</h2>
            <ul>
                {salesData.popular_items.map((item, index) => (
                    <li key={index}>
                        {item.item_name}: {item.quantity_sold} sold
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SalesReport;
