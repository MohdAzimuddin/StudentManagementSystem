// // // // import { useState, useEffect } from 'react';
// // // // import { Link } from 'react-router-dom';
// // // // import { useAuth } from '../../Context/AuthContext';

// // // // const AssignedTests = () => {
// // // //   const { user } = useAuth();
// // // //   const [tests, setTests] = useState([]);

// // // //   useEffect(() => {
// // // //     const fetchTests = () => {
// // // //       const storedTests = localStorage.getItem('assignedTests');
// // // //       const allTests = storedTests ? JSON.parse(storedTests) : [];
      
// // // //       // Filter tests relevant to the student
// // // //       const studentTests = allTests.filter(test => 
// // // //         new Date(test.dueDate) > new Date() &&
// // // //         !test.results?.[user?.email] &&
// // // //         (test.assignedTo === 'all' || test.assignedTo?.includes(user?.email))
// // // //       );

// // // //       setTests(studentTests);
// // // //     };

// // // //     fetchTests();
// // // //     window.addEventListener('storage', fetchTests);
// // // //     return () => window.removeEventListener('storage', fetchTests);
// // // //   }, [user?.email]);

// // // //   return (
// // // //     <div className="p-6">
// // // //       <h1 className="text-2xl font-bold mb-6">Assigned Tests</h1>
// // // //       <div className="space-y-4">
// // // //         {tests.map(test => (
// // // //           <div key={test.id} className="bg-white p-4 rounded-lg shadow">
// // // //             <h2 className="text-xl font-semibold">{test.title}</h2>
// // // //             <p className="text-gray-600 mt-2">Subject: {test.subject}</p>
// // // //             <p className="text-gray-600">Due Date: {new Date(test.dueDate).toLocaleDateString()}</p>
// // // //             <Link
// // // //               to={`/take-test/${test.id}`}
// // // //               className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// // // //             >
// // // //               Take Test
// // // //             </Link>
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default AssignedTests;





// // // // // src/pages/tests/AssignedTests.jsx
// // // // import { useState, useEffect } from 'react';
// // // // import { Link } from 'react-router-dom';
// // // // import { useAuth } from '../../Context/AuthContext';

// // // // const AssignedTests = () => {
// // // //   const { user } = useAuth();
// // // //   const [tests, setTests] = useState([]);

// // // //   useEffect(() => {
// // // //     const fetchTests = () => {
// // // //       try {
// // // //         const storedTests = localStorage.getItem('assignedTests');
// // // //         const allTests = storedTests ? JSON.parse(storedTests) : [];
        
// // // //         // Filter tests relevant to the student
// // // //         const studentTests = allTests.filter(test => 
// // // //           new Date(test.dueDate) > new Date() &&
// // // //           !test.results?.[user?.email] &&
// // // //           (test.assignedTo === 'all' || test.assignedTo?.includes(user?.email))
// // // //         );

// // // //         setTests(studentTests);
// // // //       } catch (error) {
// // // //         console.error('Error loading tests:', error);
// // // //       }
// // // //     };

// // // //     fetchTests();
    
// // // //     // Add both storage and custom event listeners
// // // //     window.addEventListener('storage', fetchTests);
// // // //     window.addEventListener('assignedTestsUpdated', fetchTests);
    
// // // //     return () => {
// // // //       window.removeEventListener('storage', fetchTests);
// // // //       window.removeEventListener('assignedTestsUpdated', fetchTests);
// // // //     };
// // // //   }, [user?.email]);

// // // //   return (
// // // //     <div className="p-6">
// // // //       <h1 className="text-2xl font-bold mb-6">Assigned Tests</h1>
// // // //       <div className="space-y-4">
// // // //         {tests.map(test => (
// // // //           <div key={test.id} className="bg-white p-4 rounded-lg shadow">
// // // //             <div className="mb-4">
// // // //               <h2 className="text-xl font-semibold">{test.title}</h2>
// // // //               <p className="text-gray-600 mt-2">
// // // //                 Subject: {test.subject} | Due: {new Date(test.dueDate).toLocaleDateString()}
// // // //               </p>
// // // //               <p className="text-gray-600">Total Marks: {test.totalMarks}</p>
// // // //             </div>

// // // //             <div className="space-y-4">
// // // //               {test.questions.map((question, index) => (
// // // //                 <div key={question.id} className="border rounded p-4">
// // // //                   <h3 className="font-medium mb-2">
// // // //                     Question {index + 1}: {question.question}
// // // //                   </h3>
// // // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
// // // //                     {question.options.map((option, optIndex) => (
// // // //                       <div
// // // //                         key={optIndex}
// // // //                         className={`p-2 rounded ${
// // // //                           option === question.correctAnswer 
// // // //                             ? 'bg-green-100 border-green-300' 
// // // //                             : 'bg-gray-100'
// // // //                         }`}
// // // //                       >
// // // //                         <span className="font-bold mr-2">
// // // //                           {String.fromCharCode(65 + optIndex)}.
// // // //                         </span>
// // // //                         {option}
// // // //                       </div>
// // // //                     ))}
// // // //                   </div>
// // // //                 </div>
// // // //               ))}
// // // //             </div>

// // // //             <Link
// // // //               to={`/take-test/${test.id}`}
// // // //               className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// // // //             >
// // // //               Take Test
// // // //             </Link>
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default AssignedTests;



// // // // src/pages/tests/AssignedTests.jsx
// // // import { useState, useEffect } from 'react';
// // // import { Link } from 'react-router-dom';
// // // import { useAuth } from '../../Context/AuthContext';

// // // const AssignedTests = () => {
// // //   const { user } = useAuth();
// // //   const [tests, setTests] = useState([]);

// // //   const fetchTests = () => {
// // //     try {
// // //       const storedTests = localStorage.getItem('assignedTests');
// // //       const allTests = storedTests ? JSON.parse(storedTests) : [];

// // //       const studentTests = allTests.filter(test =>
// // //         new Date(test.dueDate) > new Date() &&
// // //         !test.results?.[user?.email] &&
// // //         (test.assignedTo === 'all' || test.assignedTo?.includes(user?.email))
// // //       );

// // //       setTests(studentTests);
// // //     } catch (error) {
// // //       console.error('Error loading tests:', error);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchTests();

// // //     // Force reload when a new test is added via storage
// // //     const handleStorage = (e) => {
// // //       if (e.key === 'lastAssignedTestUpdate') {
// // //         fetchTests();
// // //       }
// // //     };

// // //     window.addEventListener('storage', handleStorage);

// // //     return () => {
// // //       window.removeEventListener('storage', handleStorage);
// // //     };
// // //   }, [user?.email]);

// // //   return (
// // //     <div className="p-6">
// // //       <h1 className="text-2xl font-bold mb-6">Assigned Tests</h1>
// // //       <div className="space-y-4">
// // //         {tests.length > 0 ? (
// // //           tests.map(test => (
// // //             <div key={test.id} className="bg-white p-4 rounded-lg shadow">
// // //               <div className="mb-4">
// // //                 <h2 className="text-xl font-semibold">{test.title}</h2>
// // //                 <p className="text-gray-600 mt-2">
// // //                   Subject: {test.subject} | Due: {new Date(test.dueDate).toLocaleDateString()}
// // //                 </p>
// // //                 <p className="text-gray-600">Total Marks: {test.totalMarks}</p>
// // //               </div>

// // //               <div className="space-y-4">
// // //                 {test.questions.map((question, index) => (
// // //                   <div key={question.id} className="border rounded p-4">
// // //                     <h3 className="font-medium mb-2">
// // //                       Question {index + 1}: {question.question}
// // //                     </h3>
// // //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
// // //                       {question.options.map((option, optIndex) => (
// // //                         <div
// // //                           key={optIndex}
// // //                           className={`p-2 rounded ${
// // //                             option === question.correctAnswer
// // //                               ? 'bg-green-100 border-green-300'
// // //                               : 'bg-gray-100'
// // //                           }`}
// // //                         >
// // //                           <span className="font-bold mr-2">
// // //                             {String.fromCharCode(65 + optIndex)}.
// // //                           </span>
// // //                           {option}
// // //                         </div>
// // //                       ))}
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>

// // //               <Link
// // //                 to={`/take-test/${test.id}`}
// // //                 className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// // //               >
// // //                 Take Test
// // //               </Link>
// // //             </div>
// // //           ))
// // //         ) : (
// // //           <p className="text-gray-500">No assigned tests available at the moment.</p>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default AssignedTests;


// // // src/pages/tests/AssignedTests.jsx
// // import { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import { useAuth } from '../../Context/AuthContext';

// // const AssignedTests = () => {
// //   const { user } = useAuth();
// //   const [tests, setTests] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const fetchTests = () => {
// //     try {
// //       setLoading(true);
// //       const storedTests = localStorage.getItem('assignedTests');
// //       const allTests = storedTests ? JSON.parse(storedTests) : [];
      
// //       // Filter tests that:
// //       // 1. Are not due yet
// //       // 2. Have not been taken by the current user
// //       // 3. Are assigned to all students or specifically to this user
// //       const studentTests = allTests.filter(test => 
// //         new Date(test.dueDate) >= new Date() && // Test is still open
// //         (!test.results || !test.results[user?.email]) && // Student hasn't taken the test yet
// //         (test.assignedTo === 'all' || 
// //           (Array.isArray(test.assignedTo) && test.assignedTo.includes(user?.email)))
// //       );
      
// //       setTests(studentTests);
// //     } catch (error) {
// //       console.error('Error loading tests:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (user?.email) {
// //       fetchTests();
// //     }
    
// //     // Listen for storage events from other tabs
// //     const handleStorageChange = (e) => {
// //       if (e.key === 'assignedTests') {
// //         fetchTests();
// //       }
// //     };
    
// //     // Listen for custom event triggered when tests are updated
// //     const handleTestsUpdated = () => {
// //       fetchTests();
// //     };
    
// //     window.addEventListener('storage', handleStorageChange);
// //     window.addEventListener('assignedTestsUpdated', handleTestsUpdated);
    
// //     return () => {
// //       window.removeEventListener('storage', handleStorageChange);
// //       window.removeEventListener('assignedTestsUpdated', handleTestsUpdated);
// //     };
// //   }, [user?.email]);

// //   if (loading) {
// //     return <div className="p-6 text-center">Loading assigned tests...</div>;
// //   }

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-bold mb-6">Assigned Tests</h1>
// //       <div className="space-y-4">
// //         {tests.length > 0 ? (
// //           tests.map(test => (
// //             <div key={test.id} className="bg-white p-4 rounded-lg shadow">
// //               <div className="flex justify-between items-start mb-4">
// //                 <div>
// //                   <h2 className="text-xl font-semibold">{test.title}</h2>
// //                   <p className="text-gray-600 mt-2">
// //                     Subject: {test.subject} | Due: {new Date(test.dueDate).toLocaleDateString()}
// //                   </p>
// //                   <p className="text-gray-600">Total Marks: {test.totalMarks}</p>
// //                   <p className="text-gray-600">Duration: {test.duration} minutes</p>
// //                   <p className="text-gray-600">Teacher: {test.teacherName}</p>
// //                 </div>
// //                 <Link
// //                   to={`/take-test/${test.id}`}
// //                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// //                 >
// //                   Take Test
// //                 </Link>
// //               </div>
              
// //               <div className="border-t pt-4 mt-2">
// //                 <h3 className="font-medium mb-2">Test Overview: {test.questions.length} Questions</h3>
// //                 <p className="text-sm text-gray-500">
// //                   This test contains {test.questions.length} questions from {test.subject}.
// //                   Click "Take Test" to begin. Make sure you have {test.duration} minutes available before starting.
// //                 </p>
// //               </div>
// //             </div>
// //           ))
// //         ) : (
// //           <div className="bg-white p-6 rounded-lg shadow text-center">
// //             <p className="text-gray-500">No assigned tests available at the moment.</p>
// //             <p className="text-sm text-gray-400 mt-2">When your teacher assigns tests, they will appear here.</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AssignedTests;




// // src/pages/tests/AssignedTests.jsx
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../Context/AuthContext';

// const AssignedTests = () => {
//   const { user } = useAuth();
//   const [tests, setTests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [debugInfo, setDebugInfo] = useState({
//     allTests: [],
//     userEmail: '',
//     filteringReason: []
//   });

//   console.log("Current user in AssignedTests:", user);

//   const fetchTests = () => {
//     try {
//       setLoading(true);
//       const storedTests = localStorage.getItem('assignedTests');
//       const allTests = storedTests ? JSON.parse(storedTests) : [];
      
//       // For debugging
//       setDebugInfo({
//         allTests: allTests,
//         userEmail: user?.email || 'No user email',
//         filteringReason: []
//       });
      
//       // Filter tests with debugging
//       const studentTests = [];
//       const reasons = [];
      
//       for (const test of allTests) {
//         let isFiltered = false;
        
//         // Check due date
//         if (new Date(test.dueDate) < new Date()) {
//           reasons.push(`Test "${test.title}" filtered out: Due date ${test.dueDate} has passed`);
//           isFiltered = true;
//         }
        
//         // Check if already taken by user
//         if (!isFiltered && test.results && test.results[user?.email]) {
//           reasons.push(`Test "${test.title}" filtered out: Already taken by ${user?.email}`);
//           isFiltered = true;
//         }
        
//         // Check if assigned to current user
//         if (!isFiltered && test.assignedTo !== 'all' && 
//             (!Array.isArray(test.assignedTo) || !test.assignedTo.includes(user?.email))) {
//           reasons.push(`Test "${test.title}" filtered out: Not assigned to ${user?.email} (assigned to ${test.assignedTo})`);
//           isFiltered = true;
//         }
        
//         if (!isFiltered) {
//           studentTests.push(test);
//           reasons.push(`Test "${test.title}" INCLUDED for user ${user?.email}`);
//         }
//       }
      
//       setDebugInfo(prev => ({...prev, filteringReason: reasons}));
//       console.log("Debug info:", {
//         allTests: allTests,
//         userEmail: user?.email,
//         filteringReason: reasons
//       });
      
//       setTests(studentTests);
//     } catch (error) {
//       console.error('Error loading tests:', error);
//       setDebugInfo(prev => ({...prev, error: error.message}));
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user?.email) {
//       fetchTests();
//       console.log("Fetching tests for user:", user.email);
//     }
    
//     // Listen for storage events from other tabs
//     const handleStorageChange = (e) => {
//       console.log("Storage event detected:", e.key);
//       if (e.key === 'assignedTests') {
//         fetchTests();
//       }
//     };
    
//     // Listen for custom event triggered when tests are updated
//     const handleTestsUpdated = () => {
//       console.log("assignedTestsUpdated event detected");
//       fetchTests();
//     };
    
//     window.addEventListener('storage', handleStorageChange);
//     window.addEventListener('assignedTestsUpdated', handleTestsUpdated);
    
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('assignedTestsUpdated', handleTestsUpdated);
//     };
//   }, [user?.email]);

//   // Force check localStorage directly
//   const checkLocalStorage = () => {
//     const storedData = localStorage.getItem('assignedTests');
//     console.log("Raw localStorage data:", storedData);
//     setDebugInfo(prev => ({...prev, rawStorage: storedData}));
//     fetchTests();
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Assigned Tests</h1>
      
//       {/* Debug panel - remove this in production */}
//       <div className="mb-4 p-4 border border-orange-300 bg-orange-50 rounded">
//         <h2 className="font-bold text-orange-700">Debug Panel (Remove in Production)</h2>
//         <p>User: {user?.email || 'Not logged in'} (Role: {user?.role || 'Unknown'})</p>
//         <p>Tests in localStorage: {debugInfo.allTests.length}</p>
//         <button 
//           onClick={checkLocalStorage}
//           className="bg-blue-500 text-white px-2 py-1 rounded text-sm mt-2"
//         >
//           Force Refresh from localStorage
//         </button>
        
//         <div className="mt-2">
//           <p className="font-semibold">Filtering Logic:</p>
//           <ul className="text-xs max-h-40 overflow-y-auto">
//             {debugInfo.filteringReason.map((reason, idx) => (
//               <li key={idx} className="mb-1">{reason}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
      
//       <div className="space-y-4">
//         {tests.length > 0 ? (
//           tests.map(test => (
//             <div key={test.id} className="bg-white p-4 rounded-lg shadow">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h2 className="text-xl font-semibold">{test.title}</h2>
//                   <p className="text-gray-600 mt-2">
//                     Subject: {test.subject} | Due: {new Date(test.dueDate).toLocaleDateString()}
//                   </p>
//                   <p className="text-gray-600">Total Marks: {test.totalMarks}</p>
//                   <p className="text-gray-600">Duration: {test.duration} minutes</p>
//                   <p className="text-gray-600">Teacher: {test.teacherName}</p>
//                 </div>
//                 <Link
//                   to={`/take-test/${test.id}`}
//                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                   Take Test
//                 </Link>
//               </div>
              
//               <div className="border-t pt-4 mt-2">
//                 <h3 className="font-medium mb-2">Test Overview: {test.questions.length} Questions</h3>
//                 <p className="text-sm text-gray-500">
//                   This test contains {test.questions.length} questions from {test.subject}.
//                   Click "Take Test" to begin. Make sure you have {test.duration} minutes available before starting.
//                 </p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="bg-white p-6 rounded-lg shadow text-center">
//             <p className="text-gray-500">No assigned tests available at the moment.</p>
//             <p className="text-sm text-gray-400 mt-2">When your teacher assigns tests, they will appear here.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AssignedTests;




// src/pages/tests/AssignedTests.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const AssignedTests = () => {
  const { user } = useAuth();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch tests from localStorage
    const fetchTests = () => {
      try {
        setLoading(true);
        // Get data from localStorage
        const storedTests = localStorage.getItem('assignedTests');
        
        if (!storedTests) {
          console.log("No tests found in localStorage");
          setTests([]);
          return;
        }
        
        let allTests = [];
        try {
          allTests = JSON.parse(storedTests);
          console.log("All tests from localStorage:", allTests);
        } catch (e) {
          console.error("Error parsing tests from localStorage:", e);
          setTests([]);
          return;
        }
        
        // Make sure we have a valid user
        if (!user || !user.email) {
          console.log("No user is logged in");
          setTests([]);
          return;
        }
        
        // For simplicity and to make sure tests appear properly,
        // just filter by due date for now
        const availableTests = allTests.filter(test => {
          const dueDate = new Date(test.dueDate);
          const today = new Date();
          // Clear time part for accurate date comparison
          today.setHours(0, 0, 0, 0);
          return dueDate >= today;
        });
        
        console.log("Available tests after filtering:", availableTests);
        setTests(availableTests);
        
      } catch (error) {
        console.error('Error loading tests:', error);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    if (user) {
      fetchTests();
    }
    
    // Set up event listeners for updates
    const handleStorageChange = () => {
      console.log("Storage changed, refreshing tests");
      fetchTests();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('assignedTestsUpdated', handleStorageChange);
    
    // Manual polling as a fallback (every 5 seconds)
    const interval = setInterval(fetchTests, 5000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('assignedTestsUpdated', handleStorageChange);
      clearInterval(interval);
    };
  }, [user]);

  // Force manual refresh
  const refreshTests = () => {
    setLoading(true);
    
    // Small delay to make the loading state visible
    setTimeout(() => {
      const storedTests = localStorage.getItem('assignedTests');
      console.log("Raw tests from localStorage:", storedTests);
      
      if (storedTests) {
        try {
          const allTests = JSON.parse(storedTests);
          const availableTests = allTests.filter(test => {
            const dueDate = new Date(test.dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return dueDate >= today;
          });
          setTests(availableTests);
        } catch (e) {
          console.error("Error parsing:", e);
        }
      }
      setLoading(false);
    }, 300);
  };

  // Render loading state
  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Assigned Tests</h1>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-500">Loading your assigned tests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Assigned Tests</h1>
        <button 
          onClick={refreshTests}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Refresh Tests
        </button>
      </div>
      
      {/* Debug section - remove in production */}
      <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-bold">Debug Info:</h3>
        <p>Logged in user: {user?.email} (Role: {user?.role})</p>
        <p>Tests found: {tests.length}</p>
      </div>
      
      <div className="space-y-4">
        {tests.length > 0 ? (
          tests.map(test => (
            <div key={test.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{test.title}</h2>
                  <p className="text-gray-600 mt-2">
                    Subject: {test.subject} | Due: {new Date(test.dueDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">Total Marks: {test.totalMarks}</p>
                  <p className="text-gray-600">Duration: {test.duration} minutes</p>
                  <p className="text-gray-600">Teacher: {test.teacherName}</p>
                </div>
                <Link
                  to={`/take-test/${test.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Take Test
                </Link>
              </div>
              
              <div className="border-t pt-4 mt-2">
                <h3 className="font-medium mb-2">Test Overview: {test.questions.length} Questions</h3>
                <p className="text-sm text-gray-500">
                  This test contains {test.questions.length} questions from {test.subject}.
                  Click "Take Test" to begin. Make sure you have {test.duration} minutes available before starting.
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-gray-500">No assigned tests available at the moment.</p>
            <p className="text-sm text-gray-400 mt-2">When your teacher assigns tests, they will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignedTests;