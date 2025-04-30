// // src/pages/tests/Taketest
// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../Context/AuthContext';
// import { toast } from 'react-hot-toast';

// const TakeTest = () => {
// const { testId } = useParams();
// const { user } = useAuth();
// const navigate = useNavigate();
// const [test, setTest] = useState(null);
// const [answers, setAnswers] = useState({});
// const [timeRemaining, setTimeRemaining] = useState(3600);

// useEffect(() => {
// const tests = JSON.parse(localStorage.getItem('assignedTests')) || [];
// const selectedTest = tests.find(t => t.id === testId);

// if (!selectedTest) {
//   toast.error('Test not found');
//   navigate('/dashboard');
//   return;
// }

// setTest(selectedTest);

// // Timer
// const timer = setInterval(() => {
//   setTimeRemaining(prev => Math.max(0, prev - 1));
// }, 1000);

// return () => clearInterval(timer);
// }, [testId, navigate]);

// const handleAnswerSelect = (questionId, selectedOption) => {
// setAnswers(prev => ({ ...prev, [questionId]: selectedOption }));
// };

// const calculateScore = () => {
// return test.questions.reduce((score, question) => {
// return answers[question.id] === question.correctAnswer
// ? score + question.marks
// : score;
// }, 0);
// };

// const handleSubmit = () => {
// const tests = JSON.parse(localStorage.getItem('assignedTests')) || [];
// const updatedTests = tests.map(t =>
// t.id === testId ? {
// ...t,
// results: {
// ...t.results,
// [user.email]: {
// score: calculateScore(),
// answers,
// submittedAt: new Date().toISOString()
// }
// },
// notifications: [...(t.notifications || []), {
// student: user.email,
// testId,
// submittedAt: new Date().toISOString()
// }]
// } : t
// );

// localStorage.setItem('assignedTests', JSON.stringify(updatedTests));
// toast.success('Test submitted successfully!');
// navigate('/dashboard');
// };

// const formatTime = (seconds) => {
// const hrs = Math.floor(seconds / 3600);
// const mins = Math.floor((seconds % 3600) / 60);
// const secs = seconds % 60;
// // return ${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')};
// return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

// };

// return (
// <div className="p-6 max-w-4xl mx-auto">
// {test && (
// <div className="bg-white rounded-lg shadow p-6">
// <div className="flex justify-between items-center mb-6">
// <h1 className="text-2xl font-bold">{test.title}</h1>
// <div className="bg-red-100 px-4 py-2 rounded-lg">
// Time Remaining: {formatTime(timeRemaining)}
// </div>
// </div>

//       <div className="space-y-6">
//         {test.questions.map((question, index) => (
//           <div key={question.id} className="border rounded p-4">
//             <h3 className="font-medium mb-2">
//               Question {index + 1}: {question.question}
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//               {question.options.map((option, optIndex) => (
//                 <button
//                   key={optIndex}
//                   onClick={() => handleAnswerSelect(question.id, option)}
//                   className={`p-2 rounded ${
//                     answers[question.id] === option
//                       ? 'bg-blue-100 border-blue-500'
//                       : 'bg-gray-100 hover:bg-gray-200'
//                   }`}
//                 >
//                   <span className="font-bold mr-2">
//                     {String.fromCharCode(65 + optIndex)}.
//                   </span>
//                   {option}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={handleSubmit}
//         className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//       >
//         Submit Test
//       </button>
//     </div>
//   )}
// </div>
// );
// };

// export default TakeTest;





// src/pages/tests/TakeTest.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../Context/AuthContext';

const TakeTest = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch test data
  useEffect(() => {
    const fetchTest = () => {
      try {
        const storedTests = localStorage.getItem('assignedTests');
        if (!storedTests) {
          toast.error('No tests found');
          navigate('/tests');
          return;
        }
        
        const allTests = JSON.parse(storedTests);
        const currentTest = allTests.find(t => t.id === testId);
        
        if (!currentTest) {
          toast.error('Test not found');
          navigate('/tests');
          return;
        }
        
        // Check if the student has already completed this test
        const completedTests = JSON.parse(localStorage.getItem('completedTests') || '[]');
        if (user && completedTests.some(ct => ct.testId === testId && ct.studentEmail === user.email)) {
          toast.error('You have already completed this test');
          navigate('/tests');
          return;
        }
        
        setTest(currentTest);
        setTimeLeft(currentTest.duration * 60); // Convert minutes to seconds
        
        // Initialize answers object with empty selections
        const initialAnswers = {};
        currentTest.questions.forEach(q => {
          initialAnswers[q.id] = '';
        });
        setAnswers(initialAnswers);
        
      } catch (error) {
        console.error('Error fetching test:', error);
        toast.error('Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchTest();
    }
  }, [testId, navigate, user]);
  
  // Timer functionality
  useEffect(() => {
    if (!test || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [test, timeLeft]);
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle answer selection
  const handleAnswerSelect = (questionId, selectedOption) => {
    setAnswers({
      ...answers,
      [questionId]: selectedOption
    });
  };
  
  // Calculate score
  const calculateScore = () => {
    if (!test) return 0;
    
    let score = 0;
    test.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        score += question.marks;
      }
    });
    
    return score;
  };
  
  // Handle time up
  const handleTimeUp = () => {
    toast.error("Time's up! Submitting your answers...");
    handleSubmitTest();
  };
  
  // Submit test
  const handleSubmitTest = async () => {
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      
      if (!user || !user.email) {
        toast.error('User not authenticated');
        return;
      }
      
      const score = calculateScore();
      const totalPossible = test.totalMarks;
      const percentage = Math.round((score / totalPossible) * 100);
      
      const testResult = {
        testId: test.id,
        studentEmail: user.email,
        studentName: user.name || user.email,
        answers: answers,
        score: score,
        totalPossible: totalPossible,
        percentage: percentage,
        submittedAt: new Date().toISOString(),
        timeRemaining: timeLeft
      };
      
      // 1. Save to test results
      const storedTests = localStorage.getItem('assignedTests');
      if (storedTests) {
        const allTests = JSON.parse(storedTests);
        const testIndex = allTests.findIndex(t => t.id === testId);
        
        if (testIndex !== -1) {
          // Add result to the test
          if (!allTests[testIndex].results) {
            allTests[testIndex].results = {};
          }
          allTests[testIndex].results[user.email] = testResult;
          
          // Add notification for teacher
          if (!allTests[testIndex].notifications) {
            allTests[testIndex].notifications = [];
          }
          
          allTests[testIndex].notifications.push({
            student: user.name || user.email,
            submittedAt: new Date().toISOString(),
            message: `${user.name || user.email} has submitted the test "${test.title}"`,
            read: false
          });
          
          localStorage.setItem('assignedTests', JSON.stringify(allTests));
          
          // Trigger update event for other tabs
          window.dispatchEvent(new Event('assignedTestsUpdated'));
        }
      }
      
      // 2. Save to completed tests for this student
      const completedTests = JSON.parse(localStorage.getItem('completedTests') || '[]');
      completedTests.push({
        testId: test.id,
        testTitle: test.title,
        studentEmail: user.email,
        submittedAt: new Date().toISOString(),
        score: score,
        totalPossible: totalPossible,
        percentage: percentage
      });
      
      localStorage.setItem('completedTests', JSON.stringify(completedTests));
      
      toast.success('Test submitted successfully!');
      navigate('/test-result/' + test.id);
      
    } catch (error) {
      console.error('Error submitting test:', error);
      toast.error('Failed to submit test. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Confirm before leaving page
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!isSubmitting && test) {
        const message = 'Your test progress will be lost. Are you sure you want to leave?';
        e.returnValue = message;
        return message;
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [test, isSubmitting]);
  
  // Loading state
  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Loading Test...</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-center">Please wait while we load your test...</p>
        </div>
      </div>
    );
  }
  
  // Test not found state
  if (!test) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Test Not Found</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-center">This test could not be found or has been removed.</p>
          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/tests')}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Back to Tests
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 max-w-4xl mx-auto mb-12">
      {/* Test Header */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">{test.title}</h1>
          <div className="text-right">
            <div className={`text-lg font-mono ${timeLeft < 300 ? 'text-red-600 font-bold' : ''}`}>
              Time: {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-gray-600">
              Total Marks: {test.totalMarks}
            </div>
          </div>
        </div>
      </div>
      
      {/* Questions */}
      <div className="space-y-6">
        {test.questions.map((question, index) => (
          <div key={question.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between">
              <h3 className="text-lg font-medium mb-4">
                Q{index + 1}: {question.question}
              </h3>
              <span className="text-sm text-gray-600">
                [{question.marks} marks]
              </span>
            </div>
            
            <div className="space-y-3 mt-4">
              {question.options.map((option, optIndex) => (
                <div
                  key={optIndex}
                  className={`border rounded p-3 cursor-pointer transition-colors ${
                    answers[question.id] === option
                      ? 'bg-blue-100 border-blue-400'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleAnswerSelect(question.id, option)}
                >
                  <div className="flex items-center">
                    <span className="mr-2 font-bold">
                      {String.fromCharCode(65 + optIndex)}.
                    </span>
                    <span>{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">
              {Object.values(answers).filter(a => a).length} of {test.questions.length} questions answered
            </p>
          </div>
          <button
            onClick={handleSubmitTest}
            disabled={isSubmitting}
            className={`bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-700 transition-colors ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Test'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TakeTest;