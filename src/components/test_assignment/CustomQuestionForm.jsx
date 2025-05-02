import { useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const CustomQuestionForm = ({
  customQuestion,
  handleCustomQuestionChange,
  handleOptionChange,
  saveCustomQuestion,
  setIsAddingCustomQuestion,
  editingQuestion,
  setEditingQuestion,
  subjects,
  mergedQuestionBank
}) => {
  const questionImageInputRef = useRef(null);
  const optionImageInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const validateImageFile = (file) => {
    if (!file) return true;
    if (file.size > 2 * 1024 * 1024) {
      toast.error(`File size exceeds 2MB: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
      return false;
    }
    if (!['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'].includes(file.type)) {
      toast.error('Allowed formats: JPG, PNG, GIF, SVG');
      return false;
    }
    return true;
  };

  const handleQuestionImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !validateImageFile(file)) return;
    const reader = new FileReader();
    reader.onload = () => {
      handleCustomQuestionChange('questionImage', file);
      handleCustomQuestionChange('questionImagePreview', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleOptionImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (!file || !validateImageFile(file)) return;
    const reader = new FileReader();
    reader.onload = () => {
      const newImages = [...customQuestion.optionImages];
      const newPreviews = [...customQuestion.optionImagePreviews];
      newImages[index] = file;
      newPreviews[index] = reader.result;
      handleCustomQuestionChange('optionImages', newImages);
      handleCustomQuestionChange('optionImagePreviews', newPreviews);
    };
    reader.readAsDataURL(file);
  };

  const removeQuestionImage = () => {
    handleCustomQuestionChange('questionImage', null);
    handleCustomQuestionChange('questionImagePreview', null);
    if (questionImageInputRef.current) questionImageInputRef.current.value = "";
  };

  const removeOptionImage = (index) => {
    const newImages = [...customQuestion.optionImages];
    const newPreviews = [...customQuestion.optionImagePreviews];
    newImages[index] = newPreviews[index] = null;
    handleCustomQuestionChange('optionImages', newImages);
    handleCustomQuestionChange('optionImagePreviews', newPreviews);
    if (optionImageInputRefs[index].current) optionImageInputRefs[index].current.value = "";
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-bold">
          {editingQuestion ? 'Edit Question' : 'New Custom Question'}
        </h3>
        <button
          onClick={() => { setIsAddingCustomQuestion(false); setEditingQuestion(null); }}
          className="text-red-500 hover:text-red-700 font-medium px-3 py-1 rounded"
        >
          Cancel
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Subject *</label>
          <select
            className="border p-2 rounded w-full"
            value={customQuestion.subject}
            onChange={(e) => {
              handleCustomQuestionChange('subject', e.target.value);
              handleCustomQuestionChange('chapter', '');
            }}
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
            value={customQuestion.chapter}
            onChange={(e) => handleCustomQuestionChange('chapter', e.target.value)}
            disabled={!customQuestion.subject}
            required
          >
            <option value="">Select Chapter</option>
            {customQuestion.subject && 
              Object.keys(mergedQuestionBank[customQuestion.subject] || {}).map(chapter => (
                <option key={chapter} value={chapter}>{chapter}</option>
              ))
            }
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Question *</label>
        <textarea
          rows="3"
          value={customQuestion.question}
          onChange={(e) => handleCustomQuestionChange('question', e.target.value)}
          className="border p-2 rounded w-full mb-2 whitespace-pre-wrap"
        />
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Question Image</label>
          <div className="flex items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleQuestionImageUpload}
              ref={questionImageInputRef}
              className="text-sm file:mr-4 file:p-2 file:bg-blue-50 file:text-blue-700 file:border-0 rounded"
            />
            {customQuestion.questionImagePreview && (
              <button 
                type="button"
                onClick={removeQuestionImage} 
                className="ml-2 text-red-600"
              >
                Remove
              </button>
            )}
          </div>
          {customQuestion.questionImagePreview && (
            <img
              src={customQuestion.questionImagePreview}
              alt="Preview"
              className="mt-2 max-h-40 rounded"
            />
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Options *</label>
        {customQuestion.options.map((option, index) => (
          <div key={index} className="mb-4 p-3 bg-gray-50 rounded">
            <div className="flex items-center mb-2">
              <input
                type="radio"
                name="correctAnswer"
                checked={customQuestion.correctAnswer === index}
                onChange={() => handleCustomQuestionChange('correctAnswer', index)}
                className="mr-2"
              />
              <label className={`text-sm ${customQuestion.correctAnswer === index ? 'text-green-600 font-medium' : 'text-gray-700'}`}>
                {String.fromCharCode(65 + index)}. {customQuestion.correctAnswer === index && '(Correct)'}
              </label>
            </div>
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="border p-2 rounded w-full mb-2"
            />
            <div className="flex items-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleOptionImageUpload(index, e)}
                ref={optionImageInputRefs[index]}
                className="text-sm file:mr-4 file:p-1 file:bg-blue-50 file:text-blue-700 file:border-0 rounded"
              />
              {customQuestion.optionImagePreviews[index] && (
                <button
                  type="button"
                  onClick={() => removeOptionImage(index)}
                  className="ml-2 text-red-600 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            {customQuestion.optionImagePreviews[index] && (
              <img
                src={customQuestion.optionImagePreviews[index]}
                alt={`Option ${index + 1}`}
                className="mt-2 max-h-20 rounded"
              />
            )}
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Marks *</label>
        <input
          type="number"
          min="1"
          value={customQuestion.marks}
          onChange={(e) => handleCustomQuestionChange('marks', e.target.value)}
          className="border p-2 rounded w-32"
        />
      </div>

      <button
        onClick={saveCustomQuestion}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        {editingQuestion ? 'Update Question' : 'Add Question'}
      </button>
    </div>
  );
};

export default CustomQuestionForm;