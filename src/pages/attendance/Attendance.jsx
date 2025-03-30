import { useState } from 'react';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, 
  Tooltip, Legend, ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';
import FilterDropdown from '../../components/common/FilterDropdown';
 
const Attendance = () => {  
  // Sample data 
  const [attendanceData, setAttendanceData] = useState([
    { date: '2025-01-05', status: 'Present' },
    { date: '2025-01-06', status: 'Present' },
    { date: '2025-01-07', status: 'Absent' },
    { date: '2025-01-08', status: 'Late' },
    { date: '2025-01-09', status: 'Present' },
    { date: '2025-02-10', status: 'Present' },
    { date: '2025-02-11', status: 'Absent' },
    { date: '2025-02-12', status: 'Late' },
    { date: '2025-03-15', status: 'Present' },
    { date: '2025-03-16', status: 'Absent' },
  ]);

  const [filters, setFilters] = useState({
    month: 'all',
    status: 'all'
  });

  const months = ['All', 'January 2025', 'February 2025', 'March 2025'];
  const statuses = ['All', 'Present', 'Absent', 'Late'];

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  // Filter data based on selections
  const filteredData = attendanceData.filter(record => {
    const recordMonth = new Date(record.date).toLocaleString('default', { month: 'long', year: 'numeric' });
    return (
      (filters.month === 'all' || recordMonth === filters.month) &&
      (filters.status === 'all' || record.status === filters.status)
    );
  });

  // Prepare chart data
  const statusCount = filteredData.reduce((acc, record) => {
    acc[record.status] = (acc[record.status] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.keys(statusCount).map(key => ({
    name: key,
    value: statusCount[key],
    color: key === 'Present' ? '#4ade80' : key === 'Absent' ? '#f87171' : '#fbbf24'
  }));

  const barChartData = Object.keys(statusCount).map(key => ({
    name: key,
    count: statusCount[key],
    color: key === 'Present' ? '#4ade80' : key === 'Absent' ? '#f87171' : '#fbbf24'
  }));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Attendance Records</h1>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <FilterDropdown 
          options={months}
          selected={filters.month}
          onChange={(value) => handleFilterChange('month', value)}
          label="Month"
        />
        <FilterDropdown 
          options={statuses}
          selected={filters.status}
          onChange={(value) => handleFilterChange('status', value)}
          label="Status"
        />
      </div>

      {/* Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Attendance Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Attendance Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8">
                {barChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Attendance List */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Detailed Attendance</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((record, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${record.status === 'Present' ? 'bg-green-100 text-green-800' : 
                        record.status === 'Absent' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
