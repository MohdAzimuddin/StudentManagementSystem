// QuestionList.jsx
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

  // Renders the content of a question, including image if present
  const renderQuestionContent = (question) => {
    if (typeof question === 'object') {
      return (
        <>
          {question.text}
          {question.image && (
            <div className="w-full flex justify-center my-2">
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
    return question; // Fallback for string-only questions
  };

  // Renders the content of an option, including image if present
  const renderOptionContent = (opt) => {
    if (typeof opt === 'object') {
      return (
        <>
          {opt.text}
          {opt.image && (
            <div className="w-full flex justify-center my-1">
              <img
                src={opt.image}
                alt="Option visual"
                className="max-w-full h-auto max-h-20 rounded object-contain"
              />
            </div>
          )}
        </>
      );
    }
    return opt; // Fallback for string-only options
  };

  // Adds/removes a question from the selectedQuestions array
  const handleQuestionSelect = (question) => {
    setSelectedQuestions(prev =>
      prev.some(q => q.id === question.id)
        ? prev.filter(q => q.id !== question.id) // Deselect if already selected
        : [...prev, question] // Add if not selected
    );
  };

  // Placeholder for delete functionality — currently just shows toast
  const handleDeleteQuestion = (e, questionId) => {
    e.stopPropagation(); // Prevents triggering parent click
    toast.success('Question deleted'); // Notification
  };

  return (
    <>
      {questions.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-6">
          <div className="flex flex-wrap justify-between items-center mb-12">
            <h3 className="text-lg font-bold">
              {selectedChapter} Questions ({questions.length}) {/* Shows chapter and count */}
            </h3>
            <div className="space-x-2">
              <button
                onClick={() => setSelectedQuestions([])} // Clears all selected questions
                className="px-3 py-1 md:px-4 md:py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="space-y-8">
            {questions.map((question, index) => (
              <div
                key={question.id}
                className={`border rounded p-3 md:p-6 cursor-pointer ${
                  selectedQuestions.some(q => q.id === question.id)
                    ? 'bg-blue-50 border-blue-300' // Highlight if selected
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleQuestionSelect(question)} // Toggle selection
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-start mb-3">
                      <span className="font-bold text-lg mr-2">Q{index + 1}.</span>
                      <pre className="font-medium whitespace-pre-wrap break-words mb-8 flex-1">
                        {renderQuestionContent(question.question)} {/* Render question text/image */}
                      </pre>
                    </div>
                    {question.questionImage && (
                      <div className="w-full flex justify-center mb-3">
                        <img
                          src={question.questionImage}
                          alt="Question"
                          className="max-w-full h-auto max-h-32 rounded object-contain"
                        />
                      </div>
                    )}

                    {/* Display options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {question.options.map((opt, idx) => (
                        <div
                          key={idx}
                          className={`p-2 rounded ${
                            idx === question.correctAnswerIndex
                              ? 'bg-green-100 border-green-300' // Highlight correct option
                              : 'bg-gray-100'
                          }`}
                        >
                          <span className="font-bold">{String.fromCharCode(65 + idx)}.</span>
                          <span className="ml-2 whitespace-pre-wrap break-words">
                            {typeof opt === 'object' ? opt.text : opt} {/* Render option text */}
                          </span>
                          {/* Render image if exists in optionImages */}
                          {question.optionImages?.[idx] && (
                            <div className="w-full flex justify-center mt-1">
                              <img
                                src={question.optionImages[idx]}
                                alt={`Option ${idx + 1}`}
                                className="max-w-full h-auto max-h-20 rounded object-contain"
                              />
                            </div>
                          )}
                          {/* Or render from object structure if optionImages are not available */}
                          {!question.optionImages?.[idx] && typeof opt === 'object' && opt.image && (
                            <div className="w-full flex justify-center mt-1">
                              <img
                                src={opt.image}
                                alt={`Option ${idx + 1}`}
                                className="max-w-full h-auto max-h-20 rounded object-contain"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Side panel: marks, edit, delete */}
                  <div className="ml-2 md:ml-4 text-sm text-gray-600 flex flex-col items-end">
                    <p>{question.marks} marks</p>
                    <div className="flex flex-col mt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditingQuestion(question); // Opens in edit mode
                        }}
                        className="text-blue-600 hover:text-blue-800 mb-2"
                      >
                        Edit
                      </button>
                      {/* Uncomment to enable delete */}
                      {/* <button
                        onClick={(e) => handleDeleteQuestion(e, question.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Render selected questions summary if any */}
      {selectedQuestions.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex flex-wrap justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Selected Questions ({selectedQuestions.length})</h3>
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <p className="text-base md:text-lg font-semibold">
                Total Marks: {testDetails.totalMarks} {/* Display total marks */}
              </p>
              <button
                onClick={() => setIsAddingCustomQuestion(true)} // Opens custom question form
                className="px-3 py-1 md:px-4 md:py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add Question
              </button>
            </div>
          </div>

          {/* List of selected questions */}
          <div className="space-y-2">
            {selectedQuestions.map((question, idx) => (
              <div key={question.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-start md:items-center">
                    <span className="font-medium mr-2 flex-shrink-0">{idx + 1}.</span>
                    <p className="whitespace-pre-wrap break-words">
                      {typeof question.question === 'object'
                        ? question.question.text
                        : question.question}
                    </p>
                  </div>
                  {/* Show if image exists */}
                  {(question.questionImage || 
                   (typeof question.question === 'object' && question.question.image)) && (
                    <span className="ml-2 text-blue-600">[Image]</span>
                  )}
                </div>
                {/* Action buttons */}
                <div className="flex items-center ml-2">
                  <span className="text-sm text-gray-600 mr-2">{question.marks} marks</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditingQuestion(question); // Open edit mode
                    }}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedQuestions(prev => prev.filter(q => q.id !== question.id)); // Remove from selected
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Final submission button */}
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
