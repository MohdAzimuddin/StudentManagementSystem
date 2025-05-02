// src/data/QuestionBank.js
export const questionBank = {
  Mathematics: {
    "Calculus": [
      {
        id: "math-calc-6",
        question: "Find the area bounded by the curves y = x² and y = 2x - x²?",
        questionImage: "/Question_images/q1.png",
        options: ["1/3", "2/3", "1", "4/3"],
        correctAnswer: "2/3",
        marks: 4
      },
   {
        id: "math-calc-7",
        question: "The graph of function f(x) is shown below. What is ∫₀² f(x)dx?",
        questionImage: "/Question_images/q2.png",
        options: [
          { text: "4", image: null },
          { text: "3", image: "/Question_images/q_op1.png" }, // Shaded area diagram
          { text: "2.5", image: null },
          { text: "5", image: null }
        ],
        correctAnswer: "3",
        marks: 4,
      }
    ],
    
    "Vectors": [
      {
        id: "math-vec-1",
        question: "Find the angle between vectors A and B shown in the diagram:",
        questionImage: "/Question_images/q3.png",
        options: ["30°", "45°", "60°", "90°"],
        correctAnswer: "45°",
        marks: 3
      },
      {
        id: "math-vec-2",
        question: "Which diagram represents the sum of vectors A and B?",
        questionImage: "/Question_images/q4.png",
        options: [
          {
            text: "Option A", 
            image: "/Question_images/q_op1.png"
          },
          {
            text: "Option B", 
            image: "/Question_images/q_op2.png"
          },
          {
            text: "Option C", 
            image: "/Question_images/q_op3.png"
          },
          {
            text: "Option D", 
            image: "/Question_images/q_op4.png"
          },
    ],
      correctAnswer: "Option D",
        correctAnswerIndex: 3,
        marks: 3
  }
    ],
    "Coordinate Geometry": [
      {
        id: "math-cg-1",
        question: "What is the area of triangle formed by points (2,3), (4,5), and (6,1)?",
        questionImage: "/Question_images/q5.png",
        options: ["6", "8", "10", "12"],
        correctAnswer: "8",
        marks: 3
      }
    ]

      },
  Physics: {
    "Optics": [
      {
        id: "phy-opt-1",
        question: "In the given ray diagram for a convex lens, where will the image form?",
        questionImage: "/Question_images/q6.png",
        options: [
          { text: "Between F and 2F", image: null },
          { text: "At 2F", image: "/Question_images/q_op5.png" },
          { text: "Beyond 2F", image: null },
          { text: "On the same side as object", image: null }
        ],
        correctAnswer: "At 2F",
        correctAnswerIndex: 1,
        marks: 3
      }
    ],
    "Electromagnetism": [
      {
        id: "phy-em-4",
        question: "The magnetic field pattern around a current carrying solenoid is:",
        options: [
          { 
            text: "Radially outward", 
            image: "/Question_images/q_op3.png" 
          },
          { 
            text: "Parallel lines inside", 
            image: "/Question_images/q_op4.png" 
          },
          { 
            text: "Concentric circles", 
            image: "/Question_images/q_op5.png" 
          },
          { 
            text: "Alternating loops", 
            image: "/Question_images/q_op6.png" 
          }
        ],
        correctAnswer: "Parallel lines inside",
        correctAnswerIndex: 1,
        marks: 3
      },
      {
        id: "phy-em-5",
        question: "Which diagram represents Lenz's Law for induced current?",
        questionImage: "/Question_images/q7.png",
        options: [
          {
            text: "Case A", 
            image: "/Question_images/q12.png"
          },
          {
            text: "Case B", 
            image: "/Question_images/q13.png"
          },
          {
            text: "Case C", 
            image: "/Question_images/q14.png"
          },
          {
            text: "Case D", 
            image: "/Question_images/q15.png"
          }
        ],
        correctAnswer: "Case A",
        correctAnswerIndex: 0,
        marks: 4
      }
    ],
    "Thermodynamics": [
      {
        id: "phy-thermo-1",
        question: "For the PV diagram shown, calculate work done:?",
        questionImage: "/Question_images/q8.png",
        options: ["300 J", "400 J", "500 J", "600 J"],
        correctAnswer: "500 J",
        marks: 3
      }
    ],
    "Waves": [
      {
        id: "phy-wave-1",
        question: "Identify the standing wave pattern shown:",
        questionImage: "/Question_images/q9.png",
        options: [
          { text: "1st Harmonic", image: null },
          { text: "3rd Harmonic", image: "/Question_images/q_op1.png" },
          { text: "5th Harmonic", image: null },
          { text: "2nd Overtone", image: null },
        ]
      }
        ],
      },
  Chemistry: {
    "Coordination Compounds": [
      {
        id: "chem-cc-1",
        question: "Identify the geometry of [Ni(CN)₄]²⁻ complex:",
        options: [
          {
            text: "Tetrahedral",
            image:"/Question_images/q_op1.png"
          },
          {
            text: "Square Planar",
            image: "/Question_images/q_op2.png"
          },
          {
            text: "Octahedral",
            image: "/Question_images/q_op3.png"
          }
        ],
        correctAnswer: "Square Planar",
        correctAnswerIndex: 1,
        marks: 3
      }
    ],
    "Organic Chemistry": [
      {
        id: "chem-org-2",
        question: "Identify the product of the given reaction:",
        questionImage: "/Question_images/q9.png",
        options: [
          "Chlorobenzene",
          "Benzene hexachloride",
          "o-Dichlorobenzene",
          "Cyclohexane"
        ],
        correctAnswer: "Chlorobenzene",
        marks: 3
      },
      {
        id: "chem-org-3",
        question: "Identify the reaction mechanism shown:",
        questionImage: "/Question_images/q10.png",
        options: [
          { text: "SN¹", image: null },
          { text: "SN²", image: "/Question_images/q12.png" },
          { text: "E1", image: null },
          { text: "E2", image: null }
        ],
        correctAnswer: "SN²",
        marks: 3
      }


    ]
  }
};




