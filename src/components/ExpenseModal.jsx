import { useState } from "react";

const ExpenseModal = () => {
const [title, setTitle] = useState("");
const [amount, setAmount] = useState("");
const [date, setDate] = useState("");
const [category, setCategory] = useState("");

const handleAddExpense = async () => {
  try {
    const res = await api.post(
      "/expenses",
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

    // Update UI without refetch
    setExpenses((prev) => [res.data.data, ...prev]);

    // Reset form
    setTitle("");
    setAmount("");
    setDate("");
    setCategory("");
    setShowModal(false);

  } catch (error) {
    console.log("Error adding expense:", error);
  }
};



   return (  <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

    <div className="bg-white p-6 rounded-lg w-[350px]">
      <h2 className="text-2xl font-bold mb-4">Add Expense</h2>

      <input
        className="w-full border p-2 mb-3 rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        className="w-full border p-2 mb-3 rounded"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="date"
        className="w-full border p-2 mb-3 rounded"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        className="w-full border p-2 mb-4 rounded"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={handleAddExpense}
          className="px-4 py-2 bg-lime-700 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>

  </div>
)
}
export default ExpenseModal;