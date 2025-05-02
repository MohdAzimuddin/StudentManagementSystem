import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { questionBank as staticQuestionBank } from '../../data/QuestionBank';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../Context/AuthContext';

const TestAssignment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [testDetails, setTestDetails] = useState({
    title: '',
    dueDate: '',
    totalMarks: 0,
    subject: '',
    assignedTo: 'all',
    duration: 60
  });
  
  const [isAddingCustomQuestion, setIsAddingCustomQuestion] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [mergedQuestionBank, setMergedQuestionBank] = useState(staticQuestionBank);
  const [customQuestion, setCustomQuestion] = useState({
    question: '',
    questionImage: null,
    questionImagePreview: null,
    options: ['', '', '', ''],
    optionImages: [null, null, null, null],
    optionImagePreviews: [null, null, null, null],
    correctAnswer: 0,
    marks: 1,
    subject: '',
    chapter: ''
  });

  const questionImageInputRef = useRef(null);
  const optionImageInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const storedQB = localStorage.getItem('questionBank');
    if (storedQB) {
      const customQB = JSON.parse(storedQB);
      const merged = { ...staticQuestionBank };
      for (const subject in customQB) {
        if (!merged[subject]) merged[subject] = {};
        for (const chapter in customQB[subject]) {
          merged[subject][chapter] = [
            ...(merged[subject][chapter] || []),
            ...customQB[subject][chapter]
          ];
        }
      }
      setMergedQuestionBank(merged);
    }
  }, []);

  const subjects = Object.keys(mergedQuestionBank);
  const chapters = selectedSubject ? Object.keys(mergedQuestionBank[selectedSubject]) : [];
  const questions = selectedChapter ? mergedQuestionBank[selectedSubject][selectedChapter] : [];

  useEffect(() => {
    const total = selectedQuestions.reduce((sum, q) => sum + q.marks, 0);
    setTestDetails(prev => ({ ...prev, totalMarks: total }));
  }, [selectedQuestions]);

  useEffect(() => {
    if (selectedSubject) {
      setTestDetails(prev => ({ ...prev, subject: selectedSubject }));
      setCustomQuestion(prev => ({ ...prev, subject: selectedSubject }));
    }
  }, [selectedSubject]);

  useEffect(() => {
    if (selectedChapter) {
      setCustomQuestion(prev => ({ ...prev, chapter: selectedChapter }));
    }
  }, [selectedChapter]);

  const handleQuestionSelect = (question) => {
    setSelectedQuestions(prev =>
      prev.some(q => q.id === question.id)
        ? prev.filter(q => q.id !== question.id)
        : [...prev, question]
    );
  };

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
      setCustomQuestion(prev => ({
        ...prev,
        questionImage: file,
        questionImagePreview: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleOptionImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (!file || !validateImageFile(file)) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCustomQuestion(prev => {
        const newImages = [...prev.optionImages];
        const newPreviews = [...prev.optionImagePreviews];
        newImages[index] = file;
        newPreviews[index] = reader.result;
        return { ...prev, optionImages: newImages, optionImagePreviews: newPreviews };
      });
    };
    reader.readAsDataURL(file);
  };

  const removeQuestionImage = () => {
    setCustomQuestion(prev => ({ ...prev, questionImage: null, questionImagePreview: null }));
    if (questionImageInputRef.current) questionImageInputRef.current.value = "";
  };

  const removeOptionImage = (index) => {
    setCustomQuestion(prev => {
      const newImages = [...prev.optionImages];
      const newPreviews = [...prev.optionImagePreviews];
      newImages[index] = newPreviews[index] = null;
      return { ...prev, optionImages: newImages, optionImagePreviews: newPreviews };
    });
    if (optionImageInputRefs[index].current) optionImageInputRefs[index].current.value = "";
  };

  const handleCustomQuestionChange = (field, value) => {
    setCustomQuestion(prev => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index, value) => {
    setCustomQuestion(prev => {
      const newOptions = [...prev.options];
      newOptions[index] = value;
      return { ...prev, options: newOptions };
    });
  };

  const validateQuestionForm = () => {
    if (!customQuestion.subject) {
      toast.error('Please select a subject');
      return false;
    }
    if (!customQuestion.chapter) {
      toast.error('Please select a chapter');
      return false;
    }
    if (!customQuestion.question.trim() && !customQuestion.questionImagePreview) {
      toast.error('Question text or image required');
      return false;
    }
    if (customQuestion.options.some((opt, idx) => !opt.trim() && !customQuestion.optionImagePreviews[idx])) {
      toast.error('All options require text or image');
      return false;
    }
    return true;
  };

  const saveCustomQuestion = () => {
    if (!validateQuestionForm()) return;

    const subject = customQuestion.subject;
    const chapter = customQuestion.chapter;

    const newQuestion = {
      id: editingQuestion ? editingQuestion.id : `custom-${Date.now()}`,
      question: customQuestion.question,
      questionImage: customQuestion.questionImagePreview,
      options: customQuestion.options,
      optionImages: customQuestion.optionImagePreviews,
      correctAnswer: customQuestion.options[customQuestion.correctAnswer],
      correctAnswerIndex: customQuestion.correctAnswer,
      marks: parseInt(customQuestion.marks),
      subject: subject,
      chapter: chapter,
      isCustom: true
    };

    const storedQB = JSON.parse(localStorage.getItem('questionBank') || '{}');
    if (!storedQB[subject]) storedQB[subject] = {};
    if (!storedQB[subject][chapter]) storedQB[subject][chapter] = [];
    
    if (editingQuestion) {
      const index = storedQB[subject][chapter].findIndex(q => q.id === newQuestion.id);
      if (index >= 0) {
        storedQB[subject][chapter][index] = newQuestion;
      } else {
        let found = false;
        for (const subj in storedQB) {
          for (const chap in storedQB[subj]) {
            const idx = storedQB[subj][chap].findIndex(q => q.id === newQuestion.id);
            if (idx >= 0) {
              storedQB[subj][chap].splice(idx, 1);
              found = true;
              break;
            }
          }
          if (found) break;
        }
        storedQB[subject][chapter].push(newQuestion);
      }
    } else {
      storedQB[subject][chapter].push(newQuestion);
    }
    
    localStorage.setItem('questionBank', JSON.stringify(storedQB));

    setMergedQuestionBank(prev => {
      const updated = { ...prev };
      if (!updated[subject]) updated[subject] = {};
      if (!updated[subject][chapter]) updated[subject][chapter] = [];
      
      if (editingQuestion) {
        if (editingQuestion.subject !== subject || editingQuestion.chapter !== chapter) {
          const oldSubject = editingQuestion.subject || selectedSubject;
          const oldChapter = editingQuestion.chapter || selectedChapter;
          
          if (updated[oldSubject] && updated[oldSubject][oldChapter]) {
            updated[oldSubject][oldChapter] = updated[oldSubject][oldChapter].filter(
              q => q.id !== editingQuestion.id
            );
          }
        }
        
        const existingIndex = updated[subject][chapter].findIndex(q => q.id === newQuestion.id);
        if (existingIndex >= 0) {
          updated[subject][chapter][existingIndex] = newQuestion;
        } else {
          updated[subject][chapter].push(newQuestion);
        }
      } else {
        updated[subject][chapter].push(newQuestion);
      }
      
      return updated;
    });
    
    if (editingQuestion) {
      setSelectedQuestions(prev => 
        prev.map(q => q.id === editingQuestion.id ? newQuestion : q)
      );
    }

    setCustomQuestion({
      question: '',
      questionImage: null,
      questionImagePreview: null,
      options: ['', '', '', ''],
      optionImages: [null, null, null, null],
      optionImagePreviews: [null, null, null, null],
      correctAnswer: 0,
      marks: 1,
      subject: subject,
      chapter: chapter
    });
    
    setIsAddingCustomQuestion(false);
    setEditingQuestion(null);
    setSelectedSubject(subject);
    setSelectedChapter(chapter);
    
    toast.success(editingQuestion ? 'Question updated!' : 'Question added!');
  };

  const startEditingQuestion = (question) => {
    setEditingQuestion(question);
    setIsAddingCustomQuestion(true);
    
    setCustomQuestion({
      question: question.question || '',
      questionImagePreview: question.questionImage || null,
      options: question.options || ['', '', '', ''],
      optionImagePreviews: question.optionImages || [null, null, null, null],
      correctAnswer: question.correctAnswerIndex || 0,
      marks: question.marks || 1,
      subject: question.subject || selectedSubject,
      chapter: question.chapter || selectedChapter
    });
    
    setSelectedSubject(question.subject || selectedSubject);
    setSelectedChapter(question.chapter || selectedChapter);
    
    window.scrollTo({
      top: 580,
      behavior: 'smooth'
    });
  };

  const handleAssignTest = () => {
    if (!testDetails.title.trim() || !testDetails.dueDate || selectedQuestions.length === 0) {
      toast.error('Please fill all required fields');
      return;
    }

    const newTest = {
      ...testDetails,
      subject: selectedSubject,
      questions: selectedQuestions.map(q => ({
        ...q,
        chapter: q.chapter || selectedChapter,
        subject: q.subject || selectedSubject
      })),
      assignedDate: new Date().toISOString(),
      id: Date.now().toString(),
      createdBy: user.email,
      teacherName: user.name,
      results: {}
    };

    const storedTests = JSON.parse(localStorage.getItem('assignedTests') || '[]');
    localStorage.setItem('assignedTests', JSON.stringify([...storedTests, newTest]));
    localStorage.setItem('lastAssignedTestUpdate', Date.now().toString());
    window.dispatchEvent(new Event('assignedTestsUpdated'));
    toast.success('Test assigned!');
    navigate('/teacher/dashboard');
  };

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

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create New Test</h2>

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
              value={selectedChapter}
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
              onChange={(e) => setTestDetails({ ...testDetails, duration: e.target.value })}
              className="border p-2 rounded w-full"
              required
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        {!isAddingCustomQuestion ? (
          <button
            onClick={() => setIsAddingCustomQuestion(true)}
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            + Add Custom Question
          </button>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-bold">
                {editingQuestion ? 'Edit Question' : 'New Custom Question'}
              </h3>
              <button
                onClick={() => { setIsAddingCustomQuestion(false); setEditingQuestion(null); }}
                className="text-gray-200 p-2 rounded-md hover:text-gray-700 bg-red-500 active:bg-red-100"
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
                    <button onClick={removeQuestionImage} className="ml-2 text-red-600">
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
                    <label className={`text-sm ${customQuestion.correctAnswer === index ? 'text-green-600' : 'text-gray-700'}`}>
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
        )}
      </div>

      {questions.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap justify-between items-center mb-4">
            <h3 className="text-lg font-bold">
              {selectedChapter} Questions ({questions.length})
            </h3>
            <div className="space-x-2">
              <button
                onClick={() => setSelectedQuestions(questions)}
                className="px-4 py-2 bg-blue-100 text-blue-600 rounded"
              >
                Select All
              </button>
              <button
                onClick={() => setSelectedQuestions([])}
                className="px-4 py-2 bg-red-100 text-red-600 rounded"
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
                            {renderOptionContent(opt)}
                          </span>
                          {(question.optionImages?.[idx] || 
                           (typeof opt === 'object' && opt.image)) && (
                            <img
                              src={question.optionImages?.[idx] || opt.image}
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
              {/* <button
                onClick={() => setIsAddingCustomQuestion(true)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add Question
              </button> */}
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
                      setSelectedQuestions(prev => prev.filter(q => q.id !== question.id));
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
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
    </div>
  );
};

export default TestAssignment;