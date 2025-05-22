import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { questionBank as staticQuestionBank } from '../../data/QuestionBank';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../Context/AuthContext';
import TestDetailsForm from '../../components/test_assignment/TestDetailsForm';
import CustomQuestionForm from '../../components/test_assignment/CustomQuestionForm';
import QuestionList from '../../components/test_assignment/QuestionList';

const TestAssignment = () => {
  // Authentication and navigation hooks
  const { user } = useAuth();
  const navigate = useNavigate();

  // State for subject, chapter and selected questions
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  // State for test details form
  const [testDetails, setTestDetails] = useState({
    title: '',
    dueDate: '',
    totalMarks: 0,
    subject: '',
    assignedTo: 'all',
    duration: 60
  });
  
  // State for custom question form
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

  // Effect to merge static question bank with custom questions from localStorage
  useEffect(() => {
    const storedQB = localStorage.getItem('questionBank');
    if (storedQB) {
      const customQB = JSON.parse(storedQB);
      const merged = { ...staticQuestionBank };
      
      // Merge custom questions with static question bank
      for (const subject in customQB) {
        if (!merged[subject]) merged[subject] = {};
        for (const chapter in customQB[subject]) {
          if (!merged[subject][chapter]) merged[subject][chapter] = [];
          const existingIds = new Set(merged[subject][chapter].map(q => q.id));
          const filteredCustom = customQB[subject][chapter].filter(q => !existingIds.has(q.id));
          merged[subject][chapter] = [
            ...merged[subject][chapter],
            ...filteredCustom
          ];
        }
      }
      setMergedQuestionBank(merged);
    }
  }, []);

  // Derived values for subjects, chapters and questions based on selections
  const subjects = Object.keys(mergedQuestionBank);
  const chapters = selectedSubject ? Object.keys(mergedQuestionBank[selectedSubject]) : [];
  const questions = selectedChapter ? mergedQuestionBank[selectedSubject][selectedChapter] : [];

  // Effect to update total marks whenever selected questions change
  useEffect(() => {
    const total = selectedQuestions.reduce((sum, q) => sum + q.marks, 0);
    setTestDetails(prev => ({ ...prev, totalMarks: total }));
  }, [selectedQuestions]);

  // Effect to update test details and custom question form when subject changes
  useEffect(() => {
    if (selectedSubject) {
      setTestDetails(prev => ({ ...prev, subject: selectedSubject }));
      setCustomQuestion(prev => ({ ...prev, subject: selectedSubject }));
    }
  }, [selectedSubject]);

  // Effect to update custom question form when chapter changes
  useEffect(() => {
    if (selectedChapter) {
      setCustomQuestion(prev => ({ ...prev, chapter: selectedChapter }));
    }
  }, [selectedChapter]);

  // Function to validate custom question form
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
    if (customQuestion.options.some((opt, idx) => 
      !opt.trim() && !customQuestion.optionImagePreviews[idx])) {
      toast.error('All options require text or image');
      return false;
    }
    return true;
  };

  // Function to save custom question to localStorage and state
  const saveCustomQuestion = () => {
    if (!validateQuestionForm()) return;

    const subject = customQuestion.subject;
    const chapter = customQuestion.chapter;

    // Create new question object
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

    // Get current localStorage state
    const storedQB = JSON.parse(localStorage.getItem('questionBank') || '{}');
    
    // First, remove the question if it's being edited
    if (editingQuestion) {
      // Search all subjects and chapters in localStorage
      for (const subj in storedQB) {
        for (const chap in storedQB[subj]) {
          storedQB[subj][chap] = storedQB[subj][chap].filter(q => q.id !== editingQuestion.id);
        }
      }
    }
    
    // Then add the question to the new location
    if (!storedQB[subject]) storedQB[subject] = {};
    if (!storedQB[subject][chapter]) storedQB[subject][chapter] = [];
    storedQB[subject][chapter].push(newQuestion);
    
    // Save back to localStorage
    localStorage.setItem('questionBank', JSON.stringify(storedQB));

    // Update state with the merged question bank
    setMergedQuestionBank(prev => {
      const updated = { ...prev };
      
      // First, remove the question if it's being edited
      if (editingQuestion) {
        for (const subj in updated) {
          for (const chap in updated[subj]) {
            updated[subj][chap] = updated[subj][chap].filter(q => q.id !== editingQuestion.id);
          }
        }
      }
      
      // Then add the question to the new location, ensuring no duplicates
      if (!updated[subject]) updated[subject] = {};
      if (!updated[subject][chapter]) updated[subject][chapter] = [];
      // Check if the question already exists in the array and replace it
      const existingIndex = updated[subject][chapter].findIndex(q => q.id === newQuestion.id);
      if (existingIndex >= 0) {
        updated[subject][chapter][existingIndex] = newQuestion;
      } else {
        updated[subject][chapter] = [...updated[subject][chapter], newQuestion];
      }
      
      return updated;
    });
    
    // Update selectedQuestions if we were editing a selected question
    if (editingQuestion) {
      setSelectedQuestions(prev => 
        prev.map(q => q.id === editingQuestion.id ? newQuestion : q)
      );
    }

    // Reset form state
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
    
    // Reset editing state
    setIsAddingCustomQuestion(false);
    setEditingQuestion(null);
    setSelectedSubject(subject);
    setSelectedChapter(chapter);
    
    toast.success(editingQuestion ? 'Question updated!' : 'Question added!');
  };

  // Function to start editing an existing question
  const startEditingQuestion = (question) => {
    setEditingQuestion(question);
    setIsAddingCustomQuestion(true);
    
    // Populate form with question data
    setCustomQuestion({
      question: question.question || '',
      questionImage: null,
      questionImagePreview: question.questionImage || null,
      options: question.options || ['', '', '', ''],
      optionImages: Array(4).fill(null),
      optionImagePreviews: question.optionImages || [null, null, null, null],
      correctAnswer: question.correctAnswerIndex || 0,
      marks: question.marks || 1,
      subject: question.subject || selectedSubject,
      chapter: question.chapter || selectedChapter
    });
    
    // Update subject/chapter selections
    setSelectedSubject(question.subject || selectedSubject);
    setSelectedChapter(question.chapter || selectedChapter);
    
    // Scroll to the form
    window.scrollTo({
      top: 580,
      behavior: 'smooth'
    });
  };

  // Function to assign the test
  const handleAssignTest = () => {
    // Validate form inputs
    if (!testDetails.title.trim()) {
      toast.error('Please enter a test title');
      return;
    }
    
    if (!testDetails.dueDate) {
      toast.error('Please select a due date');
      return;
    }
    
    if (selectedQuestions.length === 0) {
      toast.error('Please select at least one question');
      return;
    }

    // Create new test object
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

    // Save to localStorage and notify other components
    const storedTests = JSON.parse(localStorage.getItem('assignedTests') || '[]');
    localStorage.setItem('assignedTests', JSON.stringify([...storedTests, newTest]));
    localStorage.setItem('lastAssignedTestUpdate', Date.now().toString());
    window.dispatchEvent(new Event('assignedTestsUpdated'));
    toast.success('Test assigned!');
    navigate('/teacher/dashboard');
  };

  // Handler for custom question form changes
  const handleCustomQuestionChange = (field, value) => {
    setCustomQuestion(prev => ({ ...prev, [field]: value }));
  };

  // Handler for option changes in custom question form
  const handleOptionChange = (index, value) => {
    setCustomQuestion(prev => {
      const newOptions = [...prev.options];
      newOptions[index] = value;
      return { ...prev, options: newOptions };
    });
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create New Test</h2>

      {/* Test details form component */}
      <TestDetailsForm 
        testDetails={testDetails}
        setTestDetails={setTestDetails}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        selectedChapter={selectedChapter}
        setSelectedChapter={setSelectedChapter}
        subjects={subjects}
        chapters={chapters}
      />

      <div className="mb-6">
        {!isAddingCustomQuestion ? (
          // Button to show custom question form
          <button
            onClick={() => setIsAddingCustomQuestion(true)}
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            + Add Custom Question
          </button>
        ) : (
          // Custom question form component
          <CustomQuestionForm
            customQuestion={customQuestion}
            handleCustomQuestionChange={handleCustomQuestionChange}
            handleOptionChange={handleOptionChange}
            saveCustomQuestion={saveCustomQuestion}
            setIsAddingCustomQuestion={setIsAddingCustomQuestion}
            editingQuestion={editingQuestion}
            setEditingQuestion={setEditingQuestion}
            subjects={subjects}
            mergedQuestionBank={mergedQuestionBank}
          />
        )}
      </div>

      {/* Question list component (shown when questions exist and not adding custom question) */}
      {questions.length > 0 && !isAddingCustomQuestion && (
        <QuestionList
          questions={questions}
          selectedQuestions={selectedQuestions}
          setSelectedQuestions={setSelectedQuestions}
          selectedChapter={selectedChapter}
          startEditingQuestion={startEditingQuestion}
          setIsAddingCustomQuestion={setIsAddingCustomQuestion}
          testDetails={testDetails}
          handleAssignTest={handleAssignTest}
        />
      )}
    </div>
  );
};

export default TestAssignment;