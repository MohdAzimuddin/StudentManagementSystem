// // src/pages/tests/Taketest

// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../Context/AuthContext';
// import { toast } from 'react-hot-toast';

// const TakeTest = () => {
//   const { testId } = useParams();
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [test, setTest] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds

//   useEffect(() => {
//     const tests = JSON.parse(localStorage.getItem('assignedTests')) || [];
//     const selectedTest = tests.find(t => t.id === testId);
    
//     if (!selectedTest) {
//       toast.error('Test not found');
//       navigate('/dashboard');
//       return;
//     }
    
//     setTest(selectedTest);
    
//     // Timer setup
//     const timer = setInterval(() => {
//       setTimeRemaining(prev => Math.max(0, prev - 1));
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [testId, navigate]);

//   const handleAnswerSelect = (questionId, selectedOption) => {
//     setAnswers(prev => ({
//       ...prev,
//       [questionId]: selectedOption
//     }));
//   };

//   const calculateScore = () => {
//     return test.questions.reduce((score, question) => {
//       return answers[question.id] === question.correctAnswer 
//         ? score + question.marks 
//         : score;
//     }, 0);
//   };

//   const handleSubmit = () => {
//     const tests = JSON.parse(localStorage.getItem('assignedTests')) || [];
//     const updatedTests = tests.map(t => 
//       t.id === testId ? {
//         ...t,
//         results: {
//           ...t.results,
//           [user.email]: {
//             score: calculateScore(),
//             answers,
//             submittedAt: new Date().toISOString()
//           }
//         }
//       } : t
//     );
    
//     localStorage.setItem('assignedTests', JSON.stringify(updatedTests));
//     toast.success('Test submitted successfully!');
//     navigate('/dashboard');
//   };

//   const formatTime = (seconds) => {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       {test && (
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-2xl font-bold">{test.title}</h1>
//             <div className="bg-red-100 px-4 py-2 rounded-lg">
//               Time Remaining: {formatTime(timeRemaining)}
//             </div>
//           </div>
          
//           <div className="space-y-6">
//             {test.questions.map((question, index) => (
//               <div key={question.id} className="border rounded p-4">
//                 <h3 className="font-medium mb-2">
//                   Question {index + 1}: {question.question}
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                   {question.options.map((option, optIndex) => (
//                     <button
//                       key={optIndex}
//                       onClick={() => handleAnswerSelect(question.id, option)}
//                       className={`p-2 rounded ${
//                         answers[question.id] === option
//                           ? 'bg-blue-100 border-blue-500'
//                           : 'bg-gray-100 hover:bg-gray-200'
//                       }`}
//                     >
//                       <span className="font-bold mr-2">
//                         {String.fromCharCode(65 + optIndex)}.
//                       </span>
//                       {option}
//                     </button>
//                   ))}
//                 </div>
//                 <div className="mt-2 text-sm text-gray-600">
//                   Marks: {question.marks} | Chapter: {question.chapter}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={handleSubmit}
//             className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//           >
//             Submit Test
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TakeTest;




// src/pages/tests/Taketest
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-hot-toast';

const TakeTest = () => {
const { testId } = useParams();
const { user } = useAuth();
const navigate = useNavigate();
const [test, setTest] = useState(null);
const [answers, setAnswers] = useState({});
const [timeRemaining, setTimeRemaining] = useState(3600);

useEffect(() => {
const tests = JSON.parse(localStorage.getItem('assignedTests')) || [];
const selectedTest = tests.find(t => t.id === testId);

if (!selectedTest) {
  toast.error('Test not found');
  navigate('/dashboard');
  return;
}

setTest(selectedTest);

// Timer
const timer = setInterval(() => {
  setTimeRemaining(prev => Math.max(0, prev - 1));
}, 1000);

return () => clearInterval(timer);
}, [testId, navigate]);

const handleAnswerSelect = (questionId, selectedOption) => {
setAnswers(prev => ({ ...prev, [questionId]: selectedOption }));
};

const calculateScore = () => {
return test.questions.reduce((score, question) => {
return answers[question.id] === question.correctAnswer
? score + question.marks
: score;
}, 0);
};

const handleSubmit = () => {
const tests = JSON.parse(localStorage.getItem('assignedTests')) || [];
const updatedTests = tests.map(t =>
t.id === testId ? {
...t,
results: {
...t.results,
[user.email]: {
score: calculateScore(),
answers,
submittedAt: new Date().toISOString()
}
},
notifications: [...(t.notifications || []), {
student: user.email,
testId,
submittedAt: new Date().toISOString()
}]
} : t
);

localStorage.setItem('assignedTests', JSON.stringify(updatedTests));
toast.success('Test submitted successfully!');
navigate('/dashboard');
};

const formatTime = (seconds) => {
const hrs = Math.floor(seconds / 3600);
const mins = Math.floor((seconds % 3600) / 60);
const secs = seconds % 60;
// return ${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')};
return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

};

return (
<div className="p-6 max-w-4xl mx-auto">
{test && (
<div className="bg-white rounded-lg shadow p-6">
<div className="flex justify-between items-center mb-6">
<h1 className="text-2xl font-bold">{test.title}</h1>
<div className="bg-red-100 px-4 py-2 rounded-lg">
Time Remaining: {formatTime(timeRemaining)}
</div>
</div>

      <div className="space-y-6">
        {test.questions.map((question, index) => (
          <div key={question.id} className="border rounded p-4">
            <h3 className="font-medium mb-2">
              Question {index + 1}: {question.question}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {question.options.map((option, optIndex) => (
                <button
                  key={optIndex}
                  onClick={() => handleAnswerSelect(question.id, option)}
                  className={`p-2 rounded ${
                    answers[question.id] === option
                      ? 'bg-blue-100 border-blue-500'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <span className="font-bold mr-2">
                    {String.fromCharCode(65 + optIndex)}.
                  </span>
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Submit Test
      </button>
    </div>
  )}
</div>
);
};

export default TakeTest;