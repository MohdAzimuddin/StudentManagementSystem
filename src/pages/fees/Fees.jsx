import { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer 
} from 'recharts';
import PaymentModal from '../../components/fees/PaymentModal';
import toast, { Toaster } from 'react-hot-toast';

const Fees = () => {
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

  const handlePayNow = () => {
    toast.dismiss();
    toast(
      <div>
        <p className="font-semibold">UPI Credentials:</p>
        <p className="text-sm">Receiver: Accountant</p>
        <p className="text-sm">UPI ID: accountant@upi</p>
        <button onClick={() => toast.dismiss()} className="mt-2 px-4 py-1 bg-red-500 text-white rounded text-xs">Dismiss</button>
      </div>,
      {
        duration: Infinity,
        position: 'top-right',
        style: { background: '#fff', padding: '10px', borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }
      }
    );
  };

  const chartData = feesData.history.map(payment => ({
    date: payment.date,
    amount: payment.amount
  })).reverse();

  return (
    <div className="p-4">
      <Toaster />
      <h1 className="text-2xl font-bold mb-6">Fees Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-blue-800">Total Fees</h3>
          <p className="text-2xl font-bold">₹{feesData.total.toLocaleString()}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-green-800">Paid Fees</h3>
          <p className="text-2xl font-bold">₹{feesData.paid.toLocaleString()}</p>
          <p className="text-sm text-green-600">{Math.round((feesData.paid / feesData.total) * 100)}% paid</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-red-800">Remaining Fees</h3>
          <p className="text-2xl font-bold">₹{feesData.remaining.toLocaleString()}</p>
          <p className="text-sm text-red-600">{Math.round((feesData.remaining / feesData.total) * 100)}% remaining</p>
        </div>
      </div>

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

      <div className="flex justify-end mb-6 space-x-4">
        <button onClick={handlePayNow} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Pay Now
        </button>
        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-600">
          Submit Payment Request
        </button>
      </div>

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