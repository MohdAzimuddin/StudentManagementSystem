import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { questionBank as staticQuestionBank } from '../../data/QuestionBank';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../Context/AuthContext';
import TestDetailsForm from '../../components/test_assignment/TestDetailsForm';
import CustomQuestionForm from '../../components/test_assignment/CustomQuestionForm';
import QuestionList from '../../components/test_assignment/QuestionList';

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
    
    setSelectedSubject(question.subject || selectedSubject);
    setSelectedChapter(question.chapter || selectedChapter);
    
    window.scrollTo({
      top: 580,
      behavior: 'smooth'
    });
  };

  const handleAssignTest = () => {
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

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create New Test</h2>

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
          <button
            onClick={() => setIsAddingCustomQuestion(true)}
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            + Add Custom Question
          </button>
        ) : (
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