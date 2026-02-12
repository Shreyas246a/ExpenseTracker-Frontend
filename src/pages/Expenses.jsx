import { useEffect, useState } from "react";
import api from "../api/api";
import ExpenseModal from "../components/ExpenseModal";

const Expenses = () =>{
  
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [minAmount, setMinAmount] = useState("");
  const [date, setDate] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [maxAmount,setMaxAmount] = useState("");
  const [startDate,setStartDate] = useState("");
  const [endDate,setEndDate] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [order, setOrder] = useState("desc");
  const [expenses, setExpenses] = useState([{}]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [size] = useState(10);
  const [categoryFilter,setCategoryFilter] = useState();

const [filters, setFilters] = useState({
  categoryFilter: null,
  startDate: "",
  endDate: "",
  minAmount: "",
  maxAmount: "",
});
const [appliedFilters, setAppliedFilters] = useState(filters);



// Fetch expenses on component mount
useEffect(()=>{
        api.get("/expenses/expenses", {
          params:{
        page,
        size,
        categoryId: categoryFilter,
        startDate,
        minAmount,
        maxAmount,
        endDate,
        sortBy,
        order,
          }
,
        headers:{Authorization: "Bearer " + localStorage.getItem("token")}
        }).then((response) =>{
            console.log(response.data)
            setExpenses(response.data.data.content);
            setTotalPages(response.data.data.totalPages);
        }).catch((error) =>{
            console.log("Error fetching expenses:", error);
            if(error.response.status === 403){
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        })

},[page, appliedFilters, sortBy, order]);

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
            <div className="flex gap-3 mb-4 flex-wrap">

 <select
        className="border rounded px-3 py-2"
        value={categoryFilter}
        onChange={(e) =>{
          console.log(typeof e.target.value)
          setCategoryFilter(
    e.target.value ? Number(e.target.value) : null
  )
   console.log(typeof categoryFilter)
}
}
      >
        <option value="">All Categories</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      {/* Dates */}
      <input
        type="date"
        className="border rounded px-3 py-2"
        value={startDate}
        onChange={(e) => {
          setStartDate(e.target.value);
          setPage(0);
        }}
      />

      <input
        type="date"
        className="border rounded px-3 py-2"
        value={endDate}
        onChange={(e) => {
          setEndDate(e.target.value);
          setPage(0);
        }}
      />

      {/* Amount */}
      <input
        type="number"
        placeholder="Min"
        className="border rounded px-3 py-2 w-24"
        value={minAmount}
        onChange={(e) => {
          setMinAmount(e.target.value);
          setPage(0);
        }}
      />

      <input
        type="number"
        placeholder="Max"
        className="border rounded px-3 py-2 w-24"
        value={maxAmount}
        onChange={(e) => {
          setMaxAmount(e.target.value);
          setPage(0);
        }}
      />

      {/* Sorting */}
      <select
        className="border rounded px-3 py-2"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="date">Date</option>
        <option value="amount">Amount</option>
      </select>

      <select
        className="border rounded px-3 py-2"
        value={order}
        onChange={(e) => setOrder(e.target.value)}
      >
        <option value="desc">Desc</option>
        <option value="asc">Asc</option>
      </select>
<button onClick={() => {
  setFilters({categoryFilter:categoryFilter,minAmount:minAmount,maxAmount:maxAmount,startDate:startDate,endDate:endDate})
  setAppliedFilters(filters);
  setPage(0);
}}>
  Apply
</button>
      {/* Clear Filters Button */}
      <button
        className="ml-auto bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        onClick={() => {
          setCategoryFilter("");
          setStartDate("");
          setEndDate("");
          setMinAmount("");
          setMaxAmount("");
          setSortBy("date");
          setOrder("desc");
          setPage(0);
        }}
      >
        Clear
      </button>


</div>
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
<div className="flex justify-center items-center gap-3 mt-6">

  <button
    disabled={page === 0}
    onClick={() => setPage(page - 1)}
    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
  >
    Prev
  </button>

  <span>
    Page {page + 1} of {totalPages}
  </span>
  
  
{ (page < totalPages - 1)  &&

  <button
    disabled={page === totalPages - 1}
    onClick={() => setPage(page + 1)}
    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
  >
    Next
  </button>
}
</div>
    </div>
)

}

export default Expenses;