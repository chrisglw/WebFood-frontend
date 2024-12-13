import React, { useEffect, useState } from 'react';
import { getTotalOrders, getTotalRevenue, getOrderTrends } from '../../api/api';
import { Line } from 'react-chartjs-2'; // Chart.js for visualization
import './Report.css';

function SalesReport() {
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [trends, setTrends] = useState([]);

    useEffect(() => {
        getTotalOrders().then(data => setTotalOrders(data.total_orders));
        getTotalRevenue().then(data => setTotalRevenue(data.total_revenue));
        getOrderTrends().then(data => setTrends(data.trends));
    }, []);

    const chartData = {
        labels: trends.map(trend => trend.created_at__date),
        datasets: [
            {
                label: 'Orders',
                data: trends.map(trend => trend.order_count),
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Orders',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="sales-report">
            <h1>Sales Report</h1>

            <div className="report-summary">
                <div className="summary-item">
                    <h2>Total Orders</h2>
                    <p>{totalOrders}</p>
                </div>
                <div className="summary-item">
                    <h2>Total Revenue</h2>
                    <p>${totalRevenue.toFixed(2)}</p>
                </div>
            </div>

            <div className="report-trends">
                <h2>Order Trends</h2>
                {trends.length > 0 ? (
                    <div className="chart-container">
                        <Line data={chartData} options={chartOptions} />
                    </div>
                ) : (
                    <p>No trend data available.</p>
                )}
            </div>
        </div>
    );
}

export default SalesReport;
