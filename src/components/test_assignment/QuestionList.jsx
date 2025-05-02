import { toast } from 'react-hot-toast';

const QuestionList = ({ 
  questions, 
  selectedQuestions, 
  setSelectedQuestions, 
  selectedChapter,
  startEditingQuestion,
  setIsAddingCustomQuestion,
  testDetails,
  handleAssignTest
}) => {
  const renderQuestionContent = (question) => {
    if (typeof question === 'object') {
      return (
        <>
          {question.text}
          {question.image && (
            <img
              src={question.image}
              alt="Question illustration"
              className="max-h-40 rounded mb-2"
            />
          )}
        </>
      );
    }
    return question;
  };

  const renderOptionContent = (opt) => {
    if (typeof opt === 'object') {
      return (
        <>
          {opt.text}
          {opt.image && (
            <img
              src={opt.image}
              alt="Option visual"
              className="max-h-20 rounded mt-1"
            />
          )}
        </>
      );
    }
    return opt;
  };

  const handleQuestionSelect = (question) => {
    setSelectedQuestions(prev =>
      prev.some(q => q.id === question.id)
        ? prev.filter(q => q.id !== question.id)
        : [...prev, question]
    );
  };

  return (
    <>
      {questions.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap justify-between items-center mb-4">
            <h3 className="text-lg font-bold">
              {selectedChapter} Questions ({questions.length})
            </h3>
            <div className="space-x-2">
              <button
                onClick={() => setSelectedQuestions(questions)}
                className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
              >
                Select All
              </button>
              <button
                onClick={() => setSelectedQuestions([])}
                className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {questions.map(question => (
              <div
                key={question.id}
                className={`border rounded p-4 cursor-pointer ${
                  selectedQuestions.some(q => q.id === question.id)
                    ? 'bg-blue-50 border-blue-300'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleQuestionSelect(question)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 overflow-hidden">
                    <pre className="font-medium whitespace-pre-wrap break-words mb-2">
                      {renderQuestionContent(question.question)}
                    </pre>
                    {question.questionImage && (
                      <img
                        src={question.questionImage}
                        alt="Question"
                        className="max-h-40 rounded mb-2"
                      />
                    )}
                    <div className="grid md:grid-cols-2 gap-2">
                      {question.options.map((opt, idx) => (
                        <div
                          key={idx}
                          className={`p-2 rounded ${
                            idx === question.correctAnswerIndex
                              ? 'bg-green-100 border-green-300'
                              : 'bg-gray-100'
                          }`}
                        >
                          <span className="font-bold">{String.fromCharCode(65 + idx)}.</span>
                          <span className="ml-2 whitespace-pre-wrap break-words">
                            {typeof opt === 'object' ? opt.text : opt}
                          </span>
                          {/* Only render the image once by prioritizing optionImages if it exists */}
                          {question.optionImages?.[idx] && (
                            <img
                              src={question.optionImages[idx]}
                              alt={`Option ${idx + 1}`}
                              className="max-h-20 rounded mt-1"
                            />
                          )}
                          {/* If no optionImages exists, check for the image in the opt object */}
                          {!question.optionImages?.[idx] && typeof opt === 'object' && opt.image && (
                            <img
                              src={opt.image}
                              alt={`Option ${idx + 1}`}
                              className="max-h-20 rounded mt-1"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="ml-4 text-sm text-gray-600 flex flex-col items-end">
                    <p>{question.marks} marks</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditingQuestion(question);
                      }}
                      className="mt-2 text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedQuestions.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-wrap justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Selected Questions ({selectedQuestions.length})</h3>
            <div className="flex items-center gap-4">
              <p className="text-lg font-semibold">Total Marks: {testDetails.totalMarks}</p>
              <button
                onClick={() => setIsAddingCustomQuestion(true)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add Question
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {selectedQuestions.map((question, idx) => (
              <div key={question.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center">
                    <span className="font-medium mr-2 flex-shrink-0">{idx + 1}.</span>
                    <p className="whitespace-pre-wrap break-words">
                      {typeof question.question === 'object'
                        ? question.question.text
                        : question.question}
                    </p>
                  </div>
                  {(question.questionImage || 
                   (typeof question.question === 'object' && question.question.image)) && (
                    <span className="ml-2 text-blue-600">[Image]</span>
                  )}
                </div>
                <div className="flex items-center ml-2">
                  <span className="text-sm text-gray-600 mr-2">{question.marks} marks</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditingQuestion(question);
                    }}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedQuestions(prev => prev.filter(q => q.id !== question.id));
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleAssignTest}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mt-4"
          >
            Assign Test
          </button>
        </div>
      )}
    </>
  );
};

export default QuestionList;