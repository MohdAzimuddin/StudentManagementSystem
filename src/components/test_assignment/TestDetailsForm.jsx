import { useEffect } from 'react';

// This component is responsible for rendering and managing the form where test details are entered.
const TestDetailsForm = ({
  testDetails,              // Current state object holding all the test details (title, due date, subject, etc.)
  setTestDetails,          // Function to update testDetails state
  subjects,                // Array of available subjects
  selectedSubject,         // Currently selected subject
  setSelectedSubject,      // Function to update selected subject
  chapters,                // Array of chapters (filtered based on selected subject)
  setSelectedChapter       // Function to update selected chapter
}) => {

  // Automatically update the subject in testDetails when selectedSubject changes
  useEffect(() => {
    if (selectedSubject) {
      setTestDetails(prev => ({ ...prev, subject: selectedSubject }));
    }
  }, [selectedSubject, setTestDetails]);

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      {/* Row for Test Title and Due Date */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Test Title Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Test Title *</label>
          <input
            type="text"
            value={testDetails.title}
            onChange={(e) => setTestDetails({ ...testDetails, title: e.target.value })} // Update title in testDetails
            className="border p-2 rounded w-full"
            required
          />
        </div>

        {/* Due Date Picker */}
        <div>
          <label className="block text-sm font-medium mb-1">Due Date *</label>
          <input
            type="date"
            value={testDetails.dueDate}
            min={new Date().toISOString().split('T')[0]} // Restrict to today's date or later
            onChange={(e) => setTestDetails({ ...testDetails, dueDate: e.target.value })} // Update dueDate
            className="border p-2 rounded w-full"
            required
          />
        </div>
      </div>

      {/* Row for Subject, Chapter, and Duration */}
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        {/* Subject Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-1">Subject *</label>
          <select
            className="border p-2 rounded w-full"
            value={selectedSubject}
            onChange={(e) => { 
              setSelectedSubject(e.target.value);     // Update selected subject
              setSelectedChapter('');                 // Reset chapter selection when subject changes
            }}
            required
          >
            <option value="">Select Subject</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        {/* Chapter Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-1">Chapter *</label>
          <select
            className="border p-2 rounded w-full"
            value={testDetails.chapter}
            onChange={(e) => setSelectedChapter(e.target.value)} // Update selected chapter
            disabled={!selectedSubject}                          // Disable dropdown if subject isn't selected
            required
          >
            <option value="">Select Chapter</option>
            {chapters.map(chapter => (
              <option key={chapter} value={chapter}>{chapter}</option>
            ))}
          </select>
        </div>

        {/* Duration Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Duration (mins) *</label>
          <input
            type="number"
            min="10"
            max="180"
            value={testDetails.duration}
            onChange={(e) => 
              setTestDetails({ ...testDetails, duration: parseInt(e.target.value) }) // Update duration as number
            }
            className="border p-2 rounded w-full"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default TestDetailsForm;
