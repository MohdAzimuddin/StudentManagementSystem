// src/pages/teacher/TeacherViewResult.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const TeacherViewResult = () => {
  const { testId, studentId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [test, setTest] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTestAndResult = () => {
      try {
        if (!user || user.role !== 'teacher') {
          setError('Unauthorized access');
          return;
        }

        // Decode student ID (which is actually the student name/email)
        const decodedStudentId = decodeURIComponent(studentId);
        setStudentName(decodedStudentId);

        // Fetch test details
        const storedTests = localStorage.getItem('assignedTests');
        if (!storedTests) {
          setError('Test not found');
          return;
        }

        const allTests = JSON.parse(storedTests);
        const currentTest = allTests.find(t => t.id === testId);
        
        if (!currentTest) {
          setError('Test not found');
          return;
        }
        
        // Check if this test was created by the current teacher
        if (currentTest.createdBy !== user.email && currentTest.teacherName !== user.name) {
          setError('You do not have permission to view this test result');
          return;
        }
        
        setTest(currentTest);
        
        // Extract student's email from results
        let studentEmail = '';
        let studentResult = null;
        
        for (const [email, resultData] of Object.entries(currentTest.results || {})) {
          if (resultData.studentName === decodedStudentId || email === decodedStudentId) {
            studentEmail = email;
            studentResult = resultData;
            break;
          }
        }
        
        if (!studentResult) {
          setError(`No result found for student: ${decodedStudentId}`);
        } else {
          setResult(studentResult);
        }
      } catch (error) {
        console.error('Error fetching test result:', error);
        setError('Failed to load test result');
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchTestAndResult();
    }
  }, [testId, studentId, user, navigate]);

  // Mark a notification as read
  const markNotificationAsRead = () => {
    try {
      const storedTests = localStorage.getItem('assignedTests');
      if (!storedTests) return;
      
      const tests = JSON.parse(storedTests);
      const testIndex = tests.findIndex(t => t.id === testId);
      
      if (testIndex === -1) return;
      
      // Find the notification related to this student
      const test = tests[testIndex];
      if (!test.notifications) return;
      
      const notificationIndex = test.notifications.findIndex(
        n => n.student === studentName && !n.read
      );
      
      if (notificationIndex === -1) return;
      
      // Mark as read
      tests[testIndex].notifications[notificationIndex].read = true;
      
      // Save back to localStorage
      localStorage.setItem('assignedTests', JSON.stringify(tests));
      
      // Trigger event for other tabs
      window.dispatchEvent(new Event('assignedTestsUpdated'));
      
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Mark notification as read when viewing result
  useEffect(() => {
    if (test && result) {
      markNotificationAsRead();
    }
  }, [test, result]);

  // Loading state
  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Loading Result...</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-center">Please wait while we load the test result...</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Error</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-center text-red-600">{error}</p>
          <div className="text-center mt-4">
            <Link
              to="/teacher/dashboard"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Test or result not found
  if (!test || !result) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Result Not Found</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-center">We couldn't find this test result.</p>
          <div className="text-center mt-4">
            <Link
              to="/teacher/dashboard"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate performance metrics
  const scorePercentage = ((result.score / result.totalPossible) * 100).toFixed(1);
  const passingGrade = scorePercentage >= 60; // Common passing threshold

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Test Result</h1>
        <Link
          to="/teacher/dashboard"
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Back to Dashboard
        </Link>
      </div>
      
      {/* Student and Test Info */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold mb-2">{test.title}</h2>
              <p className="text-gray-600">Subject: {test.subject}</p>
              <p className="text-gray-600">Student: {studentName}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">Submitted: {new Date(result.submittedAt).toLocaleString()}</p>
              <p className="text-gray-600">Time remaining: {Math.floor(result.timeRemaining / 60)}:{(result.timeRemaining % 60).toString().padStart(2, '0')}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-lg font-medium">Student's Score</p>
              <p className="text-3xl font-bold">
                {result.score} / {result.totalPossible}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-medium">Percentage</p>
              <p className={`text-3xl font-bold ${passingGrade ? 'text-green-600' : 'text-red-600'}`}>
                {scorePercentage}%
              </p>
              <p className={`text-sm font-medium ${passingGrade ? 'text-green-600' : 'text-red-600'}`}>
                {passingGrade ? 'PASS' : 'FAIL'}
              </p>
            </div>
          </div>
          
          {/* Performance Summary */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">Performance Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="text-sm text-gray-500">Correct Answers</p>
                <p className="font-bold">{result.correctAnswers || 0} questions</p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="text-sm text-gray-500">Incorrect Answers</p>
                <p className="font-bold">{(result.answers?.length || 0) - (result.correctAnswers || 0)} questions</p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="text-sm text-gray-500">Unanswered</p>
                <p className="font-bold">{(test.questions?.length || 0) - (result.answers?.length || 0)} questions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Question-by-Question Review */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Question-by-Question Review</h2>
        </div>
        
        <div className="p-6">
          {test.questions.map((question, index) => {
            const studentAnswer = result.answers?.find(a => a.questionId === question.id);
            const isCorrect = studentAnswer?.isCorrect;
            const isUnanswered = !studentAnswer;
            
            return (
              <div 
                key={question.id} 
                className={`mb-6 p-4 rounded-lg border ${
                  isUnanswered 
                    ? 'border-yellow-300 bg-yellow-50' 
                    : isCorrect 
                      ? 'border-green-300 bg-green-50' 
                      : 'border-red-300 bg-red-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">Question {index + 1}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isUnanswered 
                      ? 'bg-yellow-200 text-yellow-800' 
                      : isCorrect 
                        ? 'bg-green-200 text-green-800' 
                        : 'bg-red-200 text-red-800'
                  }`}>
                    {isUnanswered ? 'Unanswered' : isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-800">{question.text}</p>
                  {question.image && (
                    <div className="mt-2">
                      <img 
                        src={question.image} 
                        alt={`Question ${index + 1}`} 
                        className="max-w-full h-auto rounded"
                      />
                    </div>
                  )}
                </div>
                
                {/* Options */}
                <div className="mb-4 ml-4">
                  {question.options.map((option, optIndex) => {
                    const isStudentSelection = studentAnswer?.selectedOptionId === option.id;
                    const isCorrectOption = option.id === question.correctOptionId;
                    
                    return (
                      <div 
                        key={option.id}
                        className={`flex items-start p-2 rounded ${
                          isStudentSelection && isCorrectOption
                            ? 'bg-green-100'
                            : isStudentSelection && !isCorrectOption
                              ? 'bg-red-100'
                              : !isStudentSelection && isCorrectOption
                                ? 'bg-green-100'
                                : ''
                        }`}
                      >
                        <div className="flex-shrink-0 mr-2">
                          {isStudentSelection ? (
                            <span className={`inline-block w-6 h-6 rounded-full flex items-center justify-center ${
                              isCorrectOption ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                            }`}>
                              {isCorrectOption ? '✓' : '✗'}
                            </span>
                          ) : isCorrectOption ? (
                            <span className="inline-block w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center">
                              ✓
                            </span>
                          ) : (
                            <span className="inline-block w-6 h-6 rounded-full border-2 border-gray-300"></span>
                          )}
                        </div>
                        <div>
                          <p className={`${
                            (isStudentSelection && isCorrectOption) || (!isStudentSelection && isCorrectOption)
                              ? 'font-medium'
                              : ''
                          }`}>
                            {String.fromCharCode(65 + optIndex)}. {option.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Explanation */}
                {(question.explanation || !isCorrect) && (
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">
                      {question.explanation || "This question was answered incorrectly."}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Teacher Feedback Section */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Teacher Feedback</h2>
        </div>
        
        <div className="p-6">
          <textarea
            className="w-full p-3 border rounded-lg resize-y min-h-[120px]"
            placeholder="Enter feedback for the student here..."
            defaultValue={result.teacherFeedback || ""}
            onChange={(e) => {
              // Save feedback to local storage
              try {
                const storedTests = localStorage.getItem('assignedTests');
                if (!storedTests) return;
                
                const tests = JSON.parse(storedTests);
                const testIndex = tests.findIndex(t => t.id === testId);
                
                if (testIndex === -1) return;
                
                // Update feedback
                const test = tests[testIndex];
                if (!test.results) test.results = {};
                
                // Find student's result
                for (const [email, resultData] of Object.entries(test.results)) {
                  if (resultData.studentName === studentName || email === studentName) {
                    resultData.teacherFeedback = e.target.value;
                    break;
                  }
                }
                
                // Save back to localStorage
                localStorage.setItem('assignedTests', JSON.stringify(tests));
                
                // Trigger event for other tabs
                window.dispatchEvent(new Event('assignedTestsUpdated'));
              } catch (error) {
                console.error('Error saving feedback:', error);
              }
            }}
          ></textarea>
          
          <button
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={() => {
              alert('Feedback saved!');
            }}
          >
            Save Feedback
          </button>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-between">
        <Link
          to={`/teacher/tests/${testId}`}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          View Test Details
        </Link>
        
        <div>
          <button
            onClick={() => {
              // Generate PDF report logic would go here
              alert('PDF report generation would be implemented here.');
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 mr-2"
          >
            Generate Report
          </button>
          
          <Link
            to="/teacher/dashboard"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherViewResult;



