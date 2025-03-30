import { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer 
} from 'recharts';
import PaymentModal from '../../components/fees/PaymentModal';

const Fees = () => {
  // Sample data
  const [feesData, setFeesData] = useState({
    total: 10000,
    paid: 7500,
    remaining: 2500,
    history: [
      { date: '2025-03-15', amount: 3000, method: 'UPI', receiver: 'Accountant' },
      { date: '2025-02-10', amount: 2500, method: 'Bank Transfer', receiver: 'Admin' },
      { date: '2025-01-05', amount: 2000, method: 'Cash', receiver: 'Accountant' },
    ]
  });

  const [paymentRequest, setPaymentRequest] = useState({
    amount: '',
    method: 'UPI',
    receiver: 'Accountant'
  });

  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentRequest(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPayment = {
      date: new Date().toISOString().split('T')[0],
      amount: Number(paymentRequest.amount),
      method: paymentRequest.method,
      receiver: paymentRequest.receiver,
      status: 'Pending'
    };
    
    setFeesData(prev => ({
      ...prev,
      paid: prev.paid + newPayment.amount,
      remaining: prev.remaining - newPayment.amount,
      history: [newPayment, ...prev.history]
    }));
    
    setShowModal(false);
    setPaymentRequest({ amount: '', method: 'UPI', receiver: 'Accountant' });
  };

  // Prepare chart data
  const chartData = feesData.history.map(payment => ({
    date: payment.date,
    amount: payment.amount
  })).reverse();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Fees Management</h1>
      
      {/* Fees Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-blue-800">Total Fees</h3>
          <p className="text-2xl font-bold">₹{feesData.total.toLocaleString()}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-green-800">Paid Fees</h3>
          <p className="text-2xl font-bold">₹{feesData.paid.toLocaleString()}</p>
          <p className="text-sm text-green-600">
            {Math.round((feesData.paid / feesData.total) * 100)}% paid
          </p>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-red-800">Remaining Fees</h3>
          <p className="text-2xl font-bold">₹{feesData.remaining.toLocaleString()}</p>
          <p className="text-sm text-red-600">
            {Math.round((feesData.remaining / feesData.total) * 100)}% remaining
          </p>
        </div>
      </div>

      {/* Payment Trend Chart */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Payment Trend</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#4f46e5" 
                name="Amount Paid"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payment Controls */}
      <div className="flex justify-end mb-6">
        <button 
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-600"
        >
          Submit Payment Request
        </button>
      </div>

      {/* Payment History */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Payment History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Receiver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feesData.history.map((payment, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{payment.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.method}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.receiver}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {payment.status || 'Completed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <PaymentModal 
          paymentRequest={paymentRequest}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Fees;
 