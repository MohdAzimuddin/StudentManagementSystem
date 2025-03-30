import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import FilterDropdown from '../../components/common/FilterDropdown'

const TestRecords = () => {
  // Sample data - replace with API data
  const [testData, setTestData] = useState([
    { subject: 'Mathematics', date: '2025-01-15', score: 85, total: 100, status: 'Passed' },
    { subject: 'Science', date: '2025-02-20', score: 72, total: 100, status: 'Passed' },
    { subject: 'History', date: '2025-03-02', score: 45, total: 100, status: 'Failed' },
    { subject: 'English', date: '2025-03-10', score: 90, total: 100, status: 'Passed' },
  ])

  const [filters, setFilters] = useState({
    subject: 'all',
    month: 'all'
  })

  const subjects = ['All', 'Mathematics', 'Science', 'History', 'English']
  const months = ['All', 'January 2025', 'February 2025', 'March 2025']

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }))
  }

  // Filter data based on selections
  const filteredData = testData.filter(test => {
    return (
      (filters.subject === 'all' || test.subject === filters.subject) &&
      (filters.month === 'all' || test.date.includes(filters.month.split(' ')[0]))
    )
  })

  // Prepare chart data
  const chartData = filteredData.map(test => ({
    name: test.subject,
    score: test.score,
    date: test.date
  }))

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Test Records</h1>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <FilterDropdown 
          options={subjects}
          selected={filters.subject}
          onChange={(value) => handleFilterChange('subject', value)}
          label="Subject"
        />
        <FilterDropdown 
          options={months}
          selected={filters.month}
          onChange={(value) => handleFilterChange('month', value)}
          label="Month"
        />
      </div>

      {/* Performance Chart */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Performance Trend</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#4f46e5" name="Test Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Test List */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Test Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((test, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{test.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{test.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{test.score}/{test.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${test.status === 'Passed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {test.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TestRecords
