import { useEffect, useState } from "react";
import api from "../api/api";
import ExpenseModal from "../components/ExpenseModal";

const Expenses = () =>{
const [expenses, setExpenses] = useState([{}]);
const [modalOpen, setModalOpen] = useState(false);
const [editingExpense, setEditingExpense] = useState(null);

// Fetch expenses on component mount
useEffect(()=>{
  
         api.get("/expenses/expenses", {
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


const [title, setTitle] = useState("");
const [amount, setAmount] = useState("");
const [date, setDate] = useState("");
const [categories, setCategories] = useState([]);
const [category, setCategory] = useState("");

// Function to handle adding a new expense
const handleAddExpense = async () => {
  try {
    const response = await api.post(
      "/expenses/add",
      {
        title,
        amount,
        date,
        category,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    // Add new expense to UI
    setExpenses(prev => [response.data.data, ...prev]);

    // Reset form
    setTitle("");
    setAmount("");
    setDate("");
    setCategory("");
    setModalOpen(false);

  } catch (error) {
    console.error("Add expense failed:", error);
  }
};

const openEditModal = (expense) => {
  setEditingExpense(expense);
  setTitle(expense.title);
  setAmount(expense.amount);
  setDate(expense.date);
  setCategory(expense.category?.name || expense.category);
  setModalOpen(true);
};

// Fetch categories for the dropdown
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await api.get("categories/allCategories", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(res.data);
      setCategories(res.data); // adjust if response shape differs
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  fetchCategories();
}, []);


const handleUpdateExpense = async () => {
  try {
    const res = await api.put(
      `/expenses/update/${editingExpense.id}`,
      {
        title,
        amount,
        date,
        category,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    setExpenses((prev) =>
      prev.map((e) =>
        e.id === editingExpense.id ? res.data.data : e
      )
    );

    // Reset state
    setEditingExpense(null);
    setModalOpen(false);
    setTitle("");
    setAmount("");
    setDate("");
    setCategory("");

  } catch (error) {
    console.error("Failed to update expense", error);
  }
};


const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
  if (!confirmDelete) return;

  try {
    await api.delete(`/expenses/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  } catch (error) {
    console.error("Failed to delete expense", error);
  }
};



return(

    // Expense List UI
    <div className="p-6">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Your Expenses</h1>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setModalOpen(true)}>Add Expense + </button>
        </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 grid-flow-row">
        {expenses.map((expense)=>{
            return(<div key={expense.id} className="grid border p-4 m-4 rounded shadow " > 
                <h2 className="text-xl font-bold">{expense.title}</h2>
                <p className="text-gray-600">Amount: Rs {expense.amount}</p>
                <p className="text-gray-600">Date: {new Date(expense.date).toLocaleDateString()}</p>
                <p className="text-gray-600">Category: {expense.category}</p>
                <div className="flex gap-4 pt-3">
                <button
              onClick={() => handleDelete(expense.id)} className="text-red-600 py-2 px-2 rounded bg-red-100 hover:underline">Delete</button>
    <button onClick={() => openEditModal(expense)} className="text-green-600 py-2 px-4 rounded bg-green-100 hover:underline">Edit</button>
</div>   
</div>
)  
})} 
</div>



        {modalOpen && (
// Modal for Adding Expense
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

    <div className="bg-white p-6 rounded-lg w-[350px]">
      <h2 className="text-xl font-bold mb-4">Add Expense</h2>

      <input
        className="w-full border p-2 mb-3"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        className="w-full border p-2 mb-3"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="date"
        className="w-full border p-2 mb-3"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

    <select
  className="w-full border p-2 mb-4"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>

  <option value="">Select Category</option>

  {categories.map((cat) => (
    <option key={cat.id} value={cat.name}>
      {cat.name}
    </option>
  ))}
</select>


      <div className="flex justify-end gap-3">
        <button
          onClick={() => setModalOpen(false)}
          className="border px-4 py-2 rounded"
        >
          Cancel
        </button>

  <button
  onClick={editingExpense ? handleUpdateExpense : handleAddExpense}
  className="bg-lime-700 text-white px-4 py-2 rounded"
>
  {editingExpense ? "Update" : "Save"}
</button>
      </div>
    </div>
  </div>
)}

    </div>
)

}

export default Expenses;