// TestResult.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const TestResult = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [test, setTest] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestAndResult = () => {
      try {
        if (!user || !user.email) {
          throw new Error('User not authenticated');
        }

        const storedTests = localStorage.getItem('assignedTests');
        if (!storedTests) {
          throw new Error('No tests found');
        }

        const allTests = JSON.parse(storedTests);
        const currentTest = allTests.find(t => t.id === testId);
        
        if (!currentTest) {
          throw new Error('Test not found');
        }
        
        setTest(currentTest);
        
        if (currentTest.results && currentTest.results[user.email]) {
          setResult(currentTest.results[user.email]);
        } else {
          const completedTests = JSON.parse(localStorage.getItem('completedTests') || '[]');
          const completedTest = completedTests.find(
            ct => ct.testId === testId && ct.studentEmail === user.email
          );
          
          if (completedTest) {
            setResult(completedTest);
          } else {
            throw new Error('No results found for this test');
          }
        }
      } catch (error) {
        console.error('Error fetching test result:', error);
        navigate('/tests');
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchTestAndResult();
    }
  }, [testId, user, navigate]);

  const renderQuestionContent = (question) => {
    if (!question) return null;
    
    if (typeof question === 'object' && question.text) {
      return (
        <>
          <span className="whitespace-pre-wrap break-words">{question.text}</span>
          {question.image && (
            <div className="mt-2 flex justify-center">
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
        <span className="whitespace-pre-wrap break-words">{question}</span>
      </>
    );
  };

  const renderOptionContent = (option, optionImage) => {
    if (!option) return null;
    
    if (typeof option === 'object' && option.text) {
      return (
        <>
          <span className="whitespace-pre-wrap break-words">{option.text}</span>
          {option.image && (
            <div className="mt-2 flex justify-center">
              <img 
                src={option.image} 
                alt="Option visual" 
                className="max-w-full h-auto max-h-20 rounded" 
              />
            </div>
          )}
        </>
      );
    }
    
    return (
      <>
        <span className="whitespace-pre-wrap break-words">{option}</span>
        {optionImage && (
          <div className="mt-2 flex justify-center">
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
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Loading Result...</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-center">Please wait while we load your test result...</p>
        </div>
      </div>
    );
  }
  
  if (!test || !result) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Result Not Found</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-center">We couldn't find your result for this test.</p>
          <div className="text-center mt-4">
            <Link
              to="/tests"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Back to Tests
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Test Result</h1>
      
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 md:p-6 border-b">
          <h2 className="text-xl font-bold mb-2 break-words">{test.title}</h2>
          <p className="text-gray-600">Subject: {test.subject}</p>
          <p className="text-gray-600">Submitted: {new Date(result.submittedAt).toLocaleString()}</p>
        </div>
        
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-lg font-medium">Your Score</p>
              <p className="text-3xl font-bold">
                {result.score} / {result.totalPossible}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-medium">Percentage</p>
              <p 
                className={`text-3xl font-bold ${
                  result.percentage >= 70 ? 'text-green-600' : 
                  result.percentage >= 50 ? 'text-yellow-600' : 
                  'text-red-600'
                }`}
              >
                {result.percentage}%
              </p>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div 
              className={`h-4 rounded-full ${
                result.percentage >= 70 ? 'bg-green-600' : 
                result.percentage >= 50 ? 'bg-yellow-500' : 
                'bg-red-600'
              }`}
              style={{ width: `${result.percentage}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {result.answers && test.questions && (
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 md:p-6 border-b">
            <h3 className="text-lg font-bold">Your Answers</h3>
          </div>
          
          <div className="p-4 md:p-6">
            <div className="space-y-6">
              {test.questions.map((question, index) => {
                const userAnswer = result.answers[question.id];
                let isCorrect = false;
                
                if (typeof question.correctAnswer === 'object' && question.correctAnswer.text) {
                  isCorrect = userAnswer === question.correctAnswer.text;
                } else if (question.correctAnswerIndex !== undefined) {
                  isCorrect = userAnswer === question.options[question.correctAnswerIndex];
                } else {
                  isCorrect = userAnswer === question.correctAnswer;
                }
                
                return (
                  <div 
                    key={question.id} 
                    className={`p-4 rounded-lg border ${
                      isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row justify-between flex-wrap gap-2">
                      <div className="font-medium mb-2 max-w-xl break-words">
                        <span className="mr-2">Q{index + 1}:</span>
                        {renderQuestionContent(question.question)}
                        {question.questionImage && (
                          <div className="mt-2 flex justify-center">
                            <img 
                              src={question.questionImage} 
                              alt="Question illustration" 
                              className="max-w-full h-auto max-h-32 rounded object-contain" 
                            />
                          </div>
                        )}
                      </div>
                      
                      <span className="font-medium whitespace-nowrap">
                        {isCorrect ? (
                          <span className="text-green-600">✓ Correct</span>
                        ) : (
                          <span className="text-red-600">✗ Incorrect</span>
                        )}
                      </span>
                    </div>
                    
                    <div className="mt-3 space-y-2">
                      {question.options.map((option, optIndex) => {
                        let isCorrectOption = false;
                        if (question.correctAnswerIndex !== undefined) {
                          isCorrectOption = optIndex === question.correctAnswerIndex;
                        } else {
                          isCorrectOption = option === question.correctAnswer;
                        }
                        
                        let isUserChoice = false;
                        if (typeof option === 'object' && option.text) {
                          isUserChoice = userAnswer === option.text;
                        } else {
                          isUserChoice = userAnswer === option;
                        }
                        
                        return (
                          <div 
                            key={optIndex}
                            className={`p-2 rounded ${
                              isCorrectOption
                                ? 'bg-green-100 border border-green-300'
                                : isUserChoice && !isCorrectOption
                                  ? 'bg-red-100 border border-red-300'
                                  : 'bg-gray-50'
                            }`}
                          >
                            <div className="flex items-start">
                              <span className="mr-2 font-bold">
                                {String.fromCharCode(65 + optIndex)}.
                              </span>
                              <div className="flex-1 break-words">
                                {renderOptionContent(
                                  option, 
                                  question.optionImages && question.optionImages[optIndex]
                                )}
                              </div>
                              {isCorrectOption && (
                                <span className="ml-auto text-green-600 text-sm font-medium whitespace-nowrap">
                                  Correct answer
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="mt-2 text-right">
                      <span className="text-sm text-gray-600">
                        Worth: {question.marks} marks
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-center">
        <Link 
          to="/assigned-tests" 
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
        >
          Back to Tests
        </Link>
      </div>
    </div>
  );
};

export default TestResult;