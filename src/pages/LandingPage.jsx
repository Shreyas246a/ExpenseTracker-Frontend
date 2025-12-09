import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
    return (
 <div className="flex flex-col justify-center gap-7 items-center h-auto bg-gradient-to-br from-lime-600 to-lime-900 px-6">

  <div className="hover:scale-110 transition-all duration-150 backdrop-blur-md bg-white/10 rounded-3xl p-10 max-w-3xl text-center shadow-2xl">

    <h1 className="text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
      Take control of your money
    </h1>

    <p className="mt-6 text-xl text-lime-200 leading-relaxed">
      A smart expense tracking app that gives you clarity and helps you stay in control of your financial habits.
    </p>

    <button onClick={() => navigate("/signup")} className="mt-10 bg-white text-lime-700 font-semibold px-8 py-3 rounded-lg shadow hover:bg-lime-200 transition-all">
      Get Started
    </button>

  </div>
  <section className="hover:scale-110 transition-all duration-150 py-20 bg-white rounded-3xl shadow-2xl max-w-7xl w-full">

  <h2 className="text-4xl font-bold text-center text-lime-800 mb-12">
    What can you do?
  </h2>

  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-15 px-10">

    <div className="bg-lime-50 border border-lime-200 rounded-xl p-8 shadow-md text-center hover:shadow-xl hover:scale-110 transition-all">
      <h3 className="text-2xl font-semibold text-lime-700 mb-3">Track Spending</h3>
      <p className="text-gray-700">Monitor every transaction and stay aware of your financial habits.</p>
    </div>

    <div className="bg-lime-50 border border-lime-200 rounded-xl p-8 shadow-md text-center hover:shadow-xl hover:scale-110 transition-all">
      <h3 className="text-2xl font-semibold text-lime-700 mb-3">Set Budgets</h3>
      <p className="text-gray-700">Create smart budgets and avoid overspending on things that don’t matter.</p>
    </div>

    <div className="bg-lime-50 border border-lime-200 rounded-xl p-8 shadow-md text-center hover:shadow-xl hover:scale-110 transition-all">
      <h3 className="text-2xl font-semibold text-lime-700 mb-3">Visual Insights</h3>
      <p className="text-gray-700">Get beautiful charts and real-time analytics to understand money better.</p>
    </div>
  </div>
</section>

<section className="rounded-2xl hover:scale-110 transition-all duration-150 py-10 bg-gradient-to-br from-lime-600 to-lime-900 text-white">

  <h2 className="text-4xl font-bold text-center mb-12">
    Why Expense Tracker?
  </h2>

  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">

    <div className="bg-white/10 p-8 rounded-xl backdrop-blur-md shadow hover:shadow-xl hover:scale-110 transition-all ">
      <h3 className="text-2xl font-semibold mb-3">Simple</h3>
      <p className="text-lime-50">
        Clean UI that takes the stress out of managing finances.
      </p>
    </div>

    <div className="bg-white/10 p-8 rounded-xl backdrop-blur-md shadow hover:shadow-xl hover:scale-110 transition-all   ">
      <h3 className="text-2xl font-semibold mb-3">Fast</h3>
      <p className="text-lime-50">
        Add expenses in seconds and get instant insights.
      </p>
    </div>

    <div className="bg-white/10 p-8 rounded-xl backdrop-blur-md shadow hover:shadow-xl hover:scale-110 transition-all">
      <h3 className="text-2xl font-semibold mb-3">Secure</h3>
      <p className="text-lime-50">
        Your data is protected with secure authentication.
      </p>
    </div>

  </div>
</section>


</div>



    )
}

export default LandingPage;