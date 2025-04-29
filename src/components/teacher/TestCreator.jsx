// src/components/teacher/TestCreator
import { useState, useEffect } from 'react';
import { questionBank } from '../../data/QuestionBank';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../Context/AuthContext';

const TestCreator = () => {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [testDetails, setTestDetails] = useState({
    title: '',
    dueDate: '',
    totalMarks: 0,
    subject: '',
    assignedTo: 'all',
    duration: 60 // Default duration in minutes
  });

  const subjects = Object.keys(questionBank);
  const chapters = selectedSubject ? Object.keys(questionBank[selectedSubject]) : [];
  const questions = selectedChapter ? questionBank[selectedSubject][selectedChapter] : [];

  useEffect(() => {
    const total = selectedQuestions.reduce((sum, q) => sum + q.marks, 0);
    setTestDetails(prev => ({ ...prev, totalMarks: total }));
  }, [selectedQuestions]);

  // Update subject when selected in dropdown
  useEffect(() => {
    if (selectedSubject) {
      setTestDetails(prev => ({ ...prev, subject: selectedSubject }));
    }
  }, [selectedSubject]);

  const handleQuestionSelect = (question) => {
    setSelectedQuestions(prev =>
      prev.some(q => q.id === question.id)
        ? prev.filter(q => q.id !== question.id)
        : [...prev, question]
    );
  };

  const validateTest = () => {
    if (!testDetails.title.trim()) {
      toast.error('Please enter a test title');
      return false;
    }
    if (!testDetails.dueDate) {
      toast.error('Please select a due date');
      return false;
    }
    if (selectedQuestions.length === 0) {
      toast.error('Please select at least one question');
      return false;
    }
    return true;
  };

  const handleAssignTest = () => {
    if (!validateTest()) return;

    try {
      const storedTests = localStorage.getItem('assignedTests');
      const existingTests = storedTests ? JSON.parse(storedTests) : [];

      const newTest = {
        ...testDetails,
        subject: selectedSubject,
        questions: selectedQuestions.map(q => ({
          ...q,
          chapter: selectedChapter
        })),
        assignedDate: new Date().toISOString(),
        notifiedStudents: [],
        id: Date.now().toString(),
        status: 'active',
        createdBy: user?.email || 'unknown',
        teacherName: user?.name || 'Teacher',
        duration: parseInt(testDetails.duration) || 60 // Convert to number
      };

      const updatedTests = [...existingTests, newTest];
      localStorage.setItem('assignedTests', JSON.stringify(updatedTests));

      // Dispatch event to notify other components
      window.dispatchEvent(new Event('assignedTestsUpdated'));
      
      // Force refresh across tabs
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'assignedTests',
        newValue: JSON.stringify(updatedTests)
      }));

      toast.success('Test assigned successfully!');

      // Reset form
      setSelectedQuestions([]);
      setSelectedChapter('');
      setTestDetails({
        title: '',
        dueDate: '',
        totalMarks: 0,
        subject: '',
        assignedTo: 'all',
        duration: 60
      });
    } catch (error) {
      console.error('Error saving test:', error);
      toast.error('Failed to save test');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create New Test</h2>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Test Title</label>
            <input
              type="text"
              placeholder="Enter test title"
              className="border p-2 rounded w-full"
              value={testDetails.title}
              onChange={(e) => setTestDetails({ ...testDetails, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              className="border p-2 rounded w-full"
              value={testDetails.dueDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setTestDetails({ ...testDetails, dueDate: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select
              className="border p-2 rounded w-full"
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSelectedChapter('');
              }}
            >
              <option value="">Select Subject</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Chapter</label>
            <select
              className="border p-2 rounded w-full"
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              disabled={!selectedSubject}
            >
              <option value="">Select Chapter</option>
              {chapters.map(chapter => (
                <option key={chapter} value={chapter}>{chapter}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
            <input
              type="number"
              min="10"
              max="180"
              className="border p-2 rounded w-full"
              value={testDetails.duration}
              onChange={(e) => setTestDetails({ ...testDetails, duration: e.target.value })}
            />
          </div>
        </div>
      </div>

      {questions.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">
            Available Questions from {selectedChapter} ({questions.length})
          </h3>
          <div className="space-y-4">
            {questions.map(question => (
              <div
                key={question.id}
                className={`border rounded p-4 cursor-pointer transition-colors ${
                  selectedQuestions.some(q => q.id === question.id)
                    ? 'bg-blue-50 border-blue-300'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleQuestionSelect(question)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium mb-2">{question.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      {question.options.map((option, index) => (
                        <div
                          key={index}
                          className={`flex items-center p-2 rounded ${
                            option === question.correctAnswer 
                              ? 'bg-green-100 border border-green-300' 
                              : 'bg-gray-100'
                          }`}
                        >
                          <span className="mr-2 font-bold">
                            {String.fromCharCode(65 + index)}.
                          </span>
                          <span>{option}</span>
                          {option === question.correctAnswer && (
                            <span className="ml-auto text-green-600 text-sm font-medium">✓ Correct</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="ml-4 text-sm text-gray-600 text-right">
                    <p>Marks: {question.marks}</p>
                    <p className="text-xs mt-1">ID: {question.id}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedQuestions.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">
              Selected Questions ({selectedQuestions.length})
            </h3>
            <div className="text-right">
              <p className="text-lg font-semibold">
                Total Marks: {testDetails.totalMarks}
              </p>
              <p className="text-sm text-gray-600">
                Subject: {selectedSubject}
              </p>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            {selectedQuestions.map((question, idx) => (
              <div key={question.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-medium">{idx + 1}. {question.question}</span>
                <span className="text-sm text-gray-600">({question.marks} marks)</span>
              </div>
            ))}
          </div>
          <button
            onClick={handleAssignTest}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Assign Test to Students
          </button>
        </div>
      )}
    </div>
  );
};

export default TestCreator;