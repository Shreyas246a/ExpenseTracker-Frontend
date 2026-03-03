import { useEffect, useState } from "react";
import api from "../api/api";

const Dashboard = () => {

    const currentYear = new Date().getFullYear();

    const [year, setYear] = useState(currentYear);
    const [month, setMonth] = useState(new Date().getMonth() + 1);

    const [yearlyData, setYearlyData] = useState(0);
    const [monthlyData, setMonthlyData] = useState(0);
    const [total, setTotal] = useState(0);

    const months = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];

    const fetchData = async () => {
        try {
            const response = await api.get("/dashboard/summary", {
                params: { month, year },
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            setYearlyData(response.data.data.yearlyExpense);
            setMonthlyData(response.data.data.monthlyExpense);
            setTotal(response.data.data.totalExpense);

        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [month, year]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Expense Dashboard
            </h1>

            {/* Filters */}
            <div className="flex gap-4 mb-6">

                <select
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    className="p-2 border rounded-lg shadow-sm"
                >
                    {months.map((m, index) => (
                        <option key={index} value={index + 1}>
                            {m}
                        </option>
                    ))}
                </select>

                <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="p-2 border rounded-lg shadow-sm"
                >
                    {[currentYear, currentYear - 1, currentYear - 2].map(y => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-gray-500 text-sm">Monthly Expense</h2>
                    <p className="text-2xl font-bold mt-2">₹ {monthlyData}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-gray-500 text-sm">Yearly Expense</h2>
                    <p className="text-2xl font-bold mt-2">₹ {yearlyData}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-gray-500 text-sm">Total Expense</h2>
                    <p className="text-2xl font-bold mt-2">₹ {total}</p>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;