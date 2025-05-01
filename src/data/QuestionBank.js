// src/data/QuestionBank.js
export const questionBank = {
  Mathematics: {
    "Calculus": [
      {
        id: "math-calc-6",
        question: "Find the area bounded by the curves y = x² and y = 2x - x²   azzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
        questionImage: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTAiIGhlaWdodD0iMjUwIj48cGF0aCBkPSJNIDI1LDIyNSBsIDIwMCwtMjAwIiBzdHJva2U9ImJsdWUiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik0gMjUsMjUgYyA3NSwxNTAgMTUwLDAgMjAwLC0yMCIgc3Ryb2tlPSJyZWQiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMiIvPjx0ZXh0IHg9IjEyMCIgeT0iMTMwIiBmb250LXNpemU9IjE0Ij55ID0gMnggLSB4PHN1cD4yPC9zdXA+PC90ZXh0Pjx0ZXh0IHg9Ijg1IiB5PSI2MCIgZm9udC1zaXplPSIxNCI+eSA9IHg8c3VwPjI8L3N1cD48L3RleHQ+PC9zdmc+",
        options: ["1/3", "2/3", "1", "4/3"],
        correctAnswer: "2/3",
        marks: 4
      },
   {
        id: "math-calc-7",
        question: "The graph of function f(x) is shown below. What is ∫₀² f(x)dx?",
        questionImage: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTAiIGhlaWdodD0iMjUwIj48cGF0aCBkPSJNIDI1LDIyNSBsIDIwMCwtMjAwIiBzdHJva2U9ImJsdWUiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik0gMjUsMjUgYyA3NSwxNTAgMTUwLDAgMjAwLC0yMCIgc3Ryb2tlPSJyZWQiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMiIvPjxsaW5lIHgxPSIwIiB5MT0iMTI1IiB4Mj0iMjUwIiB5Mj0iMTI1IiBzdHJva2U9ImJsYWNrIi8+PGxpbmUgeDE9IjEyNSIgeTE9IjAiIHgyPSIxMjUiIHkyPSIyNTAiIHN0cm9rZT0iYmxhY2siLz48L3N2Zz4=",
        options: [
          { text: "4", image: null },
          { text: "3", image: "data:image/svg+xml;base64,..." }, // Shaded area diagram
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
        questionImage: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48bGluZSB4MT0iNTAiIHkxPSI1MCIgeDI9IjE1MCIgeTI9IjUwIiBzdHJva2U9ImJsdWUiIHN0cm9rZS13aWR0aD0iMiIvPjxsaW5lIHgxPSI1MCIgeTE9IjUwIiB4Mj0iMTAwIiB5Mj0iMTUwIiBzdHJva2U9InJlZCIgc3Ryb2tlLXdpZHRoPSIyIi8+PHRleHQgeD0iMTYwIiB5PSI1MCI+QTwvdGV4dD48dGV4dCB4PSIxMTAiIHk9IjE2MCI+QjwvdGV4dD48L3N2Zz4=",
        options: ["30°", "45°", "60°", "90°"],
        correctAnswer: "45°",
        marks: 3
      },
      {
        id: "math-vec-2",
        question: "Which diagram represents the sum of vectors A and B?",
        questionImage: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48bGluZSB4MT0iNTAiIHkxPSIxMDAiIHgyPSIxMDAiIHkyPSI1MCIgc3Ryb2tlPSJibHVlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1hcnJvdz0iZW5kIi8+PHRleHQgeD0iODAiIHk9IjQwIj5BPC90ZXh0PjxsaW5lIHgxPSI1MCIgeTE9IjEwMCIgeDI9IjEyMCIgeTI9IjEyMCIgc3Ryb2tlPSJyZWQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWFycm93PSJlbmQiLz48dGV4dCB4PSIxMzAiIHk9IjEyNSI+QjwvdGV4dD48L3N2Zz4=",
        options: [
          {
            text: "Option A", 
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48bGluZSB4MT0iMjAiIHkxPSI1MCIgeDI9IjgwIiB5Mj0iMjAiIHN0cm9rZT0iZ3JlZW4iIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWFycm93PSJlbmQiLz48L3N2Zz4="
          },
          {
            text: "Option B", 
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48bGluZSB4MT0iMjAiIHkxPSI1MCIgeDI9IjkwIiB5Mj0iNzAiIHN0cm9rZT0iZ3JlZW4iIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWFycm93PSJlbmQiLz48L3N2Zz4="
          },
          {
            text: "Option C", 
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48bGluZSB4MT0iMjAiIHkxPSI1MCIgeDI9IjUwIiB5Mj0iNTAiIHN0cm9rZT0iZ3JlZW4iIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWFycm93PSJlbmQiLz48L3N2Zz4="
          },
          {
            text: "Option D", 
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48bGluZSB4MT0iMjAiIHkxPSI1MCIgeDI9IjcwIiB5Mj0iNzAiIHN0cm9rZT0iZ3JlZW4iIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWFycm93PSJlbmQiLz48L3N2Zz4="
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
        questionImage: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTAiIGhlaWdodD0iMjUwIj48cG9seWdvbiBwb2ludHM9IjUwLDIwMCAxMDAsMTUwIDE1MCwyMjAiIHN0cm9rZT0iYmx1ZSIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+",
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
        questionImage: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIj48bGluZSB4MT0iNTAiIHkxPSIxMDAiIHgyPSIyNTAiIHkyPSIxMDAiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjE1MCIgY3k9IjEwMCIgcj0iMTAwIiBzdHJva2U9ImJsYWNrIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiLz48bGluZSB4MT0iMTAwIiB5MT0iNTAiIHgyPSIxMDAiIHkyPSIxNTAiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMiIvPjxsaW5lIHgxPSIyMCIgeTE9IjgwIiB4Mj0iMTAwIiB5Mj0iODAiIHN0cm9rZT0icmVkIiBzdHJva2Utd2lkdGg9IjIiLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSIxMDAiIHI9IjMiIGZpbGw9ImJsYWNrIi8+PC9zdmc+",
        options: [
          { text: "Between F and 2F", image: null },
          { text: "At 2F", image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+PGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMiIgZmlsbD0icmVkIi8+PC9zdmc+" },
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
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMzUiIHN0cm9rZT0iIzAwMDBmZiIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+" 
          },
          { 
            text: "Parallel lines inside", 
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBzdHJva2U9IiMwMDAwZmYiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMiIvPjxsaW5lIHgxPSIwIiB5MT0iNDAiIHgyPSI4MCIgeTI9IjQwIiBzdHJva2U9IiMwMDAwZmYiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==" 
          },
          { 
            text: "Concentric circles", 
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMzAiIHN0cm9rZT0iIzAwMDBmZiIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMjAiIHN0cm9rZT0iIzAwMDBmZiIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+" 
          },
          { 
            text: "Alternating loops", 
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PHBhdGggZD0iTTQwLDEwIHEyMCwzMCA0MCwwIiBzdHJva2U9IiMwMDAwZmYiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik00MCwzMCBxMjAsMzAgNDAsMCIgc3Ryb2tlPSIjMDAwMGZmIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=" 
          }
        ],
        correctAnswer: "Parallel lines inside",
        correctAnswerIndex: 1,
        marks: 3
      },
      {
        id: "phy-em-5",
        question: "Which diagram represents Lenz's Law for induced current?",
        questionImage: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTAiIGhlaWdodD0iMTgwIj48Y2lyY2xlIGN4PSIxMjAiIGN5PSI5MCIgcj0iNzAiIHN0cm9rZT0iYmxhY2siIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMiIvPjxhcnJvdyB4MT0iODAiIHkxPSI5MCIgeDI9IjEwMCIgeTI9IjkwIiBzdHJva2U9ImJsdWUiLz48dGV4dCB4PSI0MCIgeT0iMjAiPkxlbnonJ3MgTGF3PzwvdGV4dD48L3N2Zz4=",
        options: [
          {
            text: "Case A", 
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgc3Ryb2tlPSJibGFjayIgZmlsbD0ibm9uZSIvPjxhcnJvdyB4MT0iNTAiIHkxPSIxMCIgeDI9IjUwIiB5Mj0iMzAiIHN0cm9rZT0icmVkIi8+PGFycm93IHgxPSI1MCIgeTE9IjkwIiB4Mj0iNTAiIHkyPSI3MCIgc3Ryb2tlPSJibHVlIi8+PC9zdmc+"
          },
          {
            text: "Case B", 
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgc3Ryb2tlPSJibGFjayIgZmlsbD0ibm9uZSIvPjxhcnJvdyB4MT0iMTAiIHkxPSI1MCIgeDI9IjMwIiB5Mj0iNTAiIHN0cm9rZT0icmVkIi8+PGFycm93IHgxPSI5MCIgeTE9IjUwIiB4Mj0iNzAiIHkyPSI1MCIgc3Ryb2tlPSJibHVlIi8+PC9zdmc+"
          },
          {
            text: "Case C", 
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgc3Ryb2tlPSJibGFjayIgZmlsbD0ibm9uZSIvPjxhcnJvdyB4MT0iNTAiIHkxPSIxMCIgeDI9IjUwIiB5Mj0iMzAiIHN0cm9rZT0icmVkIi8+PGFycm93IHgxPSI1MCIgeTE9IjcwIiB4Mj0iNTAiIHkyPSI5MCIgc3Ryb2tlPSJibHVlIi8+PC9zdmc+"
          },
          {
            text: "Case D", 
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgc3Ryb2tlPSJibGFjayIgZmlsbD0ibm9uZSIvPjxhcnJvdyB4MT0iMTAiIHkxPSI1MCIgeDI9IjMwIiB5Mj0iNTAiIHN0cm9rZT0icmVkIi8+PGFycm93IHgxPSI3MCIgeTE9IjUwIiB4Mj0iOTAiIHkyPSI1MCIgc3Ryb2tlPSJibHVlIi8+PC9zdmc+"
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
        question: "For the PV diagram shown, calculate work done:",
        questionImage: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNIDUwLDE1MCBsIDUwLC0xMDAgNTAsMTAwIDUwLC0xMDAiIHN0cm9rZT0iYmx1ZSIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PHRleHQgeD0iMjAwIiB5PSIxODAiPlY8L3RleHQ+PHRleHQgeD0iMzAiIHk9IjEwMCI+UDwvdGV4dD48L3N2Zz4=",
        options: ["300 J", "400 J", "500 J", "600 J"],
        correctAnswer: "500 J",
        marks: 3
      }
    ],
    "Waves": [
      {
        id: "phy-wave-1",
        question: "Identify the standing wave pattern shown:",
        questionImage: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTAiIGhlaWdodD0iMTUwIj48cGF0aCBkPSJNIDUwLDEwMCBjIDUwLC01MCAxMDAsNTAgMTUwLDAiIHN0cm9rZT0iYmx1ZSIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+",
        options: [
          { text: "1st Harmonic", image: null },
          { text: "3rd Harmonic", image: "data:image/svg+xml;base64,..." },
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
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMzAiIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iNSIgZmlsbD0iI2ZmMDAwMCIvPjxjaXJjbGUgY3g9IjYwIiBjeT0iMjAiIHI9IjUiIGZpbGw9IiNmZjAwMDAiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjYwIiByPSI1IiBmaWxsPSIjZmYwMDAwIi8+PGNpcmNsZSBjeD0iNjAiIGN5PSI2MCIgcj0iNSIgZmlsbD0iI2ZmMDAwMCIvPjwvc3ZnPg=="
          },
          {
            text: "Square Planar",
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBzdHJva2U9IiMwMDAwMDAiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjQwIiBjeT0iMjAiIHI9IjUiIGZpbGw9IiNmZjAwMDAiLz48Y2lyY2xlIGN4PSI2MCIgY3k9IjQwIiByPSI1IiBmaWxsPSIjZmYwMDAwIi8+PGNpcmNsZSBjeD0iNDAiIGN5PSI2MCIgcj0iNSIgZmlsbD0iI2ZmMDAwMCIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iNDAiIHI9IjUiIGZpbGw9IiNmZjAwMDAiLz48L3N2Zz4="
          },
          {
            text: "Octahedral",
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMzAiIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PGNpcmNsZSBjeD0iNDAiIGN5PSIxNSIgcj0iNSIgZmlsbD0iI2ZmMDAwMCIvPjxjaXJjbGUgY3g9IjY1IiBjeT0iNDAiIHI9IjUiIGZpbGw9IiNmZjAwMDAiLz48Y2lyY2xlIGN4PSI0MCIgY3k9IjY1IiByPSI1IiBmaWxsPSIjZmYwMDAwIi8+PGNpcmNsZSBjeD0iMTUiIGN5PSI0MCIgcj0iNSIgZmlsbD0iI2ZmMDAwMCIvPjxjaXJjbGUgY3g9IjQwIiBjeT0iNDAiIHI9IjUiIGZpbGw9IiNmZjAwMDAiLz48L3N2Zz4="
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
        questionImage: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMTAwIj48dGV4dCB4PSIyMCIgeT0iNDAiIGZvbnQtc2l6ZT0iMTQiPkJlbnplbmUgKyBDbG88L3RleHQ+PHBhdGggZD0iTTE1MCw0MCBsNDAsMCIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIi8+PHRleHQgeD0iMjAwIiB5PSI0MCIgZm9udC1zaXplPSIxNCI+RmVDbDxzdWI+Mzwvc3ViPjwvdGV4dD48L3N2Zz4=",
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
        questionImage: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTAiIGhlaWdodD0iMTUwIj48cGF0aCBkPSJNIDUwLDc1IGwgNTAsMCAwLC01MCIgc3Ryb2tlPSJibGFjayIvPjxwb2x5Z29uIHBvaW50cz0iMTUwLDUwIDE3NSw3NSAyMDAsNTAiIHN0cm9rZT0iYmx1ZSIvPjx0ZXh0IHg9IjEwMCIgeT0iMzAiPkFycm93PC90ZXh0Pjwvc3ZnPg==",
        options: [
          { text: "SN¹", image: null },
          { text: "SN²", image: "data:image/svg+xml;base64,..." },
          { text: "E1", image: null },
          { text: "E2", image: null }
        ],
        correctAnswer: "SN²",
        marks: 3
      }


    ]
  }
};




