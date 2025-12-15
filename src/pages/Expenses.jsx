import { useEffect, useState } from "react";
import api from "../api/api";

const Expenses = () =>{
const [expenses, setExpenses] = useState([{}]);
const [modalOpen, setModalOpen] = useState(false);
useEffect(()=>{
  
         api.get("/expenses/Allexpenses", {
            headers:{Authorization: "Bearer " + localStorage.getItem("token")}
        }).then((response) =>{
            console.log(response.data.data.content)
            setExpenses(response.data.data.content);
            console.log(expenses);
        }).catch((error) =>{
            console.log("Error fetching expenses:", error);
            if(error.response.status === 403){
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        })

},[]);

return(
    <div className="p-6">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Your Expenses</h1>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setModalOpen(true)}>Add Expense + </button>
        </div>
        {expenses.map((expense)=>{
            return(<div key={expense.id} className="border p-4 m-4 rounded shadow">
                <h2 className="text-xl font-bold">{expense.title}</h2>
                <p className="text-gray-600">Amount: {expense.amount}</p>
                <p className="text-gray-600">Date: {new Date(expense.date).toLocaleDateString()}</p>
                <p className="text-gray-600">Category: {expense.category}</p>
            </div>
            )
        })}
    </div>
)

}

export default Expenses;