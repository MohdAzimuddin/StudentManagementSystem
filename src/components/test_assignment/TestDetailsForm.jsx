import { useEffect } from 'react';

const TestDetailsForm = ({
  testDetails,
  setTestDetails,
  subjects,
  selectedSubject,
  setSelectedSubject,
  chapters,
  setSelectedChapter
}) => {
  useEffect(() => {
    if (selectedSubject) {
      setTestDetails(prev => ({ ...prev, subject: selectedSubject }));
    }
  }, [selectedSubject, setTestDetails]);

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Test Title *</label>
          <input
            type="text"
            value={testDetails.title}
            onChange={(e) => setTestDetails({ ...testDetails, title: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Due Date *</label>
          <input
            type="date"
            value={testDetails.dueDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setTestDetails({ ...testDetails, dueDate: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Subject *</label>
          <select
            className="border p-2 rounded w-full"
            value={selectedSubject}
            onChange={(e) => { setSelectedSubject(e.target.value); setSelectedChapter(''); }}
            required
          >
            <option value="">Select Subject</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Chapter *</label>
          <select
            className="border p-2 rounded w-full"
            value={testDetails.chapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            disabled={!selectedSubject}
            required
          >
            <option value="">Select Chapter</option>
            {chapters.map(chapter => (
              <option key={chapter} value={chapter}>{chapter}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Duration (mins) *</label>
          <input
            type="number"
            min="10"
            max="180"
            value={testDetails.duration}
            onChange={(e) => setTestDetails({ ...testDetails, duration: parseInt(e.target.value) })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default TestDetailsForm;