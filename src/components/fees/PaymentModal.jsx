const PaymentModal = ({ paymentRequest, handleInputChange, handleSubmit, onClose, remainingFees }) => {
    const paymentMethods = ['UPI', 'Bank Transfer', 'Cash', 'Credit Card'];
    const receivers = ['Admin', 'Accountant'];
   
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Submit Payment Request</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (Max: ₹{remainingFees.toLocaleString()})
                </label>
                <input
                  type="number"
                  name="amount"
                  value={paymentRequest.amount}
                  onChange={handleInputChange}
                  max={remainingFees}
                  min="1"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <select
                  name="method"
                  value={paymentRequest.method}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  {paymentMethods.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Receiver
                </label>
                <select
                  name="receiver"
                  value={paymentRequest.receiver}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  {receivers.map(receiver => (
                    <option key={receiver} value={receiver}>{receiver}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-600"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default PaymentModal;