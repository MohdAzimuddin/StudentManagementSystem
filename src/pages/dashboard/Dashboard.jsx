import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import TestPerformanceChart from '../../components/charts/TestPerformanceChart';
import AttendanceChart from '../../components/charts/AttendanceChart';
import FeesSummaryCard from '../../components/common/FeesSummaryCard';

const Dashboard = ({ studentName }) => {
  const { user } = useContext(AuthContext);

  // Mock data - replace with API calls
  const testData = [
    { name: 'Jan', score: 75 },
    { name: 'Feb', score: 82 },
    { name: 'Mar', score: 68 },
  ];

  const attendanceData = [
    { name: 'Present', value: 85 },
    { name: 'Absent', value: 10 },
    { name: 'Late', value: 5 },
  ];

  const feesData = {
    total: 10000,
    paid: 7500,
    remaining: 2500,
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Welcome, {studentName || user?.name}!
      </h1>

      {/* New Assigned Tests Button */}
      <div className="mb-6">
        <Link 
          to="/assigned-tests"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Assigned Tests
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Test Performance</h2>
          <TestPerformanceChart data={testData} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Attendance Overview</h2>
          <AttendanceChart data={attendanceData} />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <FeesSummaryCard {...feesData} />
      </div>
    </div>
  );
};

export default Dashboard;