// TakeTest.jsx
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
  
  useEffect(() => {
    const fetchTest = () => {
      try {
        const storedTests = localStorage.getItem('assignedTests');
        if (!storedTests) {
          toast.error('No tests found');
          navigate('/assigned-tests');
          return;
        }
        
        const allTests = JSON.parse(storedTests);
        const currentTest = allTests.find(t => t.id === testId);
        
        if (!currentTest) {
          toast.error('Test not found');
          navigate('/assigned-tests');
          return;
        }
        
        const completedTests = JSON.parse(localStorage.getItem('completedTests') || '[]');
        if (user && completedTests.some(ct => ct.testId === testId && ct.studentEmail === user.email)) {
          toast.error('You have already completed this test');
          navigate('/completed-tests');
          return;
        }
        
        setTest(currentTest);
        setTimeLeft(currentTest.duration * 60);
        
        const initialAnswers = {};
        currentTest.questions.forEach(q => {
          initialAnswers[q.id] = null;
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
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleAnswerSelect = (questionId, optionIndex) => {
    setAnswers({
      ...answers,
      [questionId]: optionIndex
    });
  };
  
  const calculateScore = () => {
    if (!test) return 0;
    
    let score = 0;
    test.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswerIndex) {
        score += question.marks;
      }
    });
    
    return score;
  };
  
  const handleTimeUp = () => {
    toast.error("Time's up! Submitting your answers...");
    handleSubmitTest();
  };
  
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
      
      const storedTests = localStorage.getItem('assignedTests');
      if (storedTests) {
        const allTests = JSON.parse(storedTests);
        const testIndex = allTests.findIndex(t => t.id === testId);
        
        if (testIndex !== -1) {
          if (!allTests[testIndex].results) {
            allTests[testIndex].results = {};
          }
          allTests[testIndex].results[user.email] = testResult;
          
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
          window.dispatchEvent(new Event('assignedTestsUpdated'));
        }
      }
      
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
  
  const renderQuestionContent = (question) => {
    if (typeof question === 'object') {
      return (
        <>
          <div className="whitespace-pre-wrap break-words w-full">{question.text}</div>
          {question.image && (
            <div className="mt-2 flex justify-start">
              <img
                src={question.image}
                alt="Question illustration"
                className="max-w-full h-auto max-h-32 rounded object-contain"
              />
            </div>
          )}
        </>
      );
    }
    return (
      <>
        <div className="whitespace-pre-wrap break-words w-full">{question}</div>
        {typeof question === 'string' && test.questions.find(q => q.question === question)?.questionImage && (
          <div className="mt-2 flex justify-start">
            <img
              src={test.questions.find(q => q.question === question).questionImage}
              alt="Question illustration"
              className="max-w-full h-auto max-h-32 rounded object-contain"
            />
          </div>
        )}
      </>
    );
  };

  const renderOptionContent = (option, optionImage) => {
    if (typeof option === 'object') {
      return (
        <>
          <div className="whitespace-pre-wrap break-words w-full">{option.text}</div>
          {option.image && (
            <div className="mt-1 flex justify-start">
              <img
                src={option.image}
                alt="Option visual"
                className="max-w-full h-auto max-h-20 rounded object-contain"
              />
            </div>
          )}
        </>
      );
    }
    return (
      <>
        <div className="whitespace-pre-wrap break-words w-full">{option}</div>
        {optionImage && (
          <div className="mt-1 flex justify-start">
            <img
              src={optionImage}
              alt="Option visual"
              className="max-w-full h-auto max-h-20 rounded object-contain"
            />
          </div>
        )}
      </>
    );
  };

  if (loading) {
    return (
      <div className="p-6 w-full max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Loading Test...</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-center">Please wait while we load your test...</p>
        </div>
      </div>
    );
  }
  
  if (!test) {
    return (
      <div className="p-6 w-full max-w-4xl mx-auto">
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
    <div className="p-4 md:p-6 w-full max-w-4xl mx-auto mb-12">
      <div className="bg-white rounded-lg shadow p-4 mb-6 sticky top-0 z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <h1 className="text-xl font-bold break-words w-full md:w-auto">{test.title}</h1>
          <div className="text-right w-full md:w-auto">
            <div className={`text-lg font-mono ${timeLeft < 300 ? 'text-red-600 font-bold' : ''}`}>
              Time: {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-gray-600">
              Total Marks: {test.totalMarks}
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6 w-full">
        {test.questions.map((question, index) => {
          const questionContent = typeof question.question === 'object' 
            ? question.question.text 
            : question.question;
          const questionImage = typeof question.question === 'object' 
            ? question.question.image 
            : question.questionImage;

          return (
            <div key={question.id} className="bg-white rounded-lg shadow p-4 md:p-6 w-full">
              <div className="flex flex-col md:flex-row justify-between gap-2 w-full">
                <div className="flex-1 min-w-0"> {/* Added min-w-0 to prevent flex item overflow */}
                  <h3 className="text-lg font-medium mb-2 md:mb-4 w-full">
                    <span className="inline-block">Q{index + 1}:</span>{' '}
                    <div className="whitespace-pre-wrap break-words inline-block w-full">
                      {questionContent}
                    </div>
                    {questionImage && (
                      <div className="mt-2 flex justify-start w-full">
                        <img
                          src={questionImage}
                          alt="Question illustration"
                          className="max-w-full h-auto max-h-32 rounded object-contain"
                        />
                      </div>
                    )}
                  </h3>
                </div>
                <span className="text-sm text-gray-600 whitespace-nowrap md:ml-2 self-start md:self-center">
                  [{question.marks} marks]
                </span>
              </div>
              
              <div className="space-y-3 mt-4 w-full">
                {question.options.map((option, optIndex) => {
                  const optionText = typeof option === 'object' ? option.text : option;
                  const optionImage = typeof option === 'object' 
                    ? option.image 
                    : (question.optionImages && question.optionImages[optIndex]);
                  
                  return (
                    <div
                      key={optIndex}
                      className={`border rounded p-3 cursor-pointer transition-colors w-full ${
                        answers[question.id] === optIndex
                          ? 'bg-blue-100 border-blue-400'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleAnswerSelect(question.id, optIndex)}
                    >
                      <div className="flex items-start w-full">
                        <span className="mr-2 font-bold mt-1 min-w-[20px]"> {/* Added min-width to prevent shifting */}
                          {String.fromCharCode(65 + optIndex)}.
                        </span>
                        <div className="flex-1 break-words min-w-0"> {/* Added min-w-0 */}
                          {renderOptionContent(option, optionImage)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md">
        <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="w-full md:w-auto">
            <p className="text-sm text-gray-600">
              {Object.values(answers).filter(a => a !== null).length} of {test.questions.length} questions answered
            </p>
          </div>
          <button
            onClick={handleSubmitTest}
            disabled={isSubmitting}
            className={`bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto ${
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