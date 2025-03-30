const FeesSummaryCard = ({ total, paid, remaining }) => {
    const paidPercentage = Math.round((paid / total) * 100)
  
    return (
      <div>
        <h2 className="text-lg font-semibold mb-4">Fees Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800">Total Fees</h3>
            <p className="text-2xl font-bold">₹{total.toLocaleString()}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-800">Paid Fees</h3>
            <p className="text-2xl font-bold">₹{paid.toLocaleString()}</p>
            <p className="text-sm text-green-600">{paidPercentage}% paid</p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-red-800">Remaining Fees</h3>
            <p className="text-2xl font-bold">₹{remaining.toLocaleString()}</p>
            <p className="text-sm text-red-600">{100 - paidPercentage}% remaining</p>
          </div>
        </div>
        
        <div className="mt-4">
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-600">
            Pay Now
          </button>
        </div>
      </div>
    )
  }
  
  export default FeesSummaryCard