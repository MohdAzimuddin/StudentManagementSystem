// src/data/QuestionBank
export const questionBank = {
  Mathematics: {
    "Basic Algebra": [
      {
        id: "math-alg-1",
        question: "Solve for x: 2x + 5 = 15",
        options: ["5", "10", "7.5", "3"],
        correctAnswer: "5",
        marks: 2
      },
      {
        id: "math-alg-2",
        question: "What is the value of x in the equation 3x - 7 = 14?",
        options: ["7", "9", "5", "21"],
        correctAnswer: "7",
        marks: 2
      },
      {
        id: "math-alg-3",
        question: "Simplify: 2(3x - 4) + 5x",
        options: ["11x - 8", "6x - 8", "11x - 4", "6x - 4"],
        correctAnswer: "11x - 8",
        marks: 3
      },
      {
        id: "math-alg-4",
        question: "Factor: x² - 9",
        options: ["(x+3)(x-3)", "(x+9)(x-1)", "(x+4.5)(x-2)", "(x-3)²"],
        correctAnswer: "(x+3)(x-3)",
        marks: 3
      },
      {
        id: "math-alg-5",
        question: "What is the solution to 2x² - 8 = 0?",
        options: ["x = ±2", "x = 4", "x = ±4", "x = 2"],
        correctAnswer: "x = ±2",
        marks: 3
      }
    ],
    "Geometry": [
      {
        id: "math-geo-1",
        question: "What is the sum of angles in a triangle?",
        options: ["90°", "180°", "270°", "360°"],
        correctAnswer: "180°",
        marks: 1
      },
      {
        id: "math-geo-2",
        question: "What is the formula for the area of a circle?",
        options: ["πr²", "2πr", "πd", "πr²/2"],
        correctAnswer: "πr²",
        marks: 2
      },
      {
        id: "math-geo-3",
        question: "A rectangle has length 8 cm and width 5 cm. What is its area?",
        options: ["13 cm²", "26 cm²", "40 cm²", "20 cm²"],
        correctAnswer: "40 cm²",
        marks: 2
      },
      {
        id: "math-geo-4",
        question: "What is the Pythagorean theorem?",
        options: ["a² + b² = c²", "a + b + c = 180°", "a = bh/2", "a = πr²"],
        correctAnswer: "a² + b² = c²",
        marks: 2
      },
      {
        id: "math-geo-5",
        question: "What is the formula for the volume of a sphere?",
        options: ["4/3πr³", "πr²", "πr²h", "4πr²"],
        correctAnswer: "4/3πr³",
        marks: 3
      }
    ],
    "Calculus": [
      {
        id: "math-calc-1",
        question: "What is the derivative of x²?",
        options: ["2x", "x", "2", "x³"],
        correctAnswer: "2x",
        marks: 2
      },
      {
        id: "math-calc-2",
        question: "What is the integral of 2x?",
        options: ["x² + C", "x²", "2x² + C", "x + C"],
        correctAnswer: "x² + C",
        marks: 3
      },
      {
        id: "math-calc-3",
        question: "The derivative of sin(x) is:",
        options: ["cos(x)", "-sin(x)", "tan(x)", "-cos(x)"],
        correctAnswer: "cos(x)",
        marks: 2
      },
      {
        id: "math-calc-4",
        question: "What is the chain rule used for?",
        options: [
          "Finding derivatives of composite functions",
          "Calculating limits",
          "Solving integrals",
          "Finding areas under curves"
        ],
        correctAnswer: "Finding derivatives of composite functions",
        marks: 3
      },
      {
        id: "math-calc-5",
        question: "What is the limit of (sin x)/x as x approaches 0?",
        options: ["0", "1", "∞", "undefined"],
        correctAnswer: "1",
        marks: 3
      }
    ]
  },
  Science: {
    "Physics Mechanics": [
      {
        id: "sci-mech-1",
        question: "What is Newton's first law of motion?",
        options: [
          "F = ma",
          "Every action has an equal and opposite reaction",
          "An object at rest stays at rest unless acted upon by an external force",
          "Energy cannot be created or destroyed"
        ],
        correctAnswer: "An object at rest stays at rest unless acted upon by an external force",
        marks: 2
      },
      {
        id: "sci-mech-2",
        question: "What is the formula for kinetic energy?",
        options: ["1/2mv²", "mgh", "F = ma", "P = mv"],
        correctAnswer: "1/2mv²",
        marks: 2
      },
      {
        id: "sci-mech-3",
        question: "What is the SI unit of force?",
        options: ["Newton", "Joule", "Watt", "Pascal"],
        correctAnswer: "Newton",
        marks: 1
      },
      {
        id: "sci-mech-4",
        question: "What does the law of conservation of momentum state?",
        options: [
          "Total momentum before a collision equals total momentum after",
          "Energy can neither be created nor destroyed",
          "Force equals mass times acceleration",
          "For every action, there's an equal and opposite reaction"
        ],
        correctAnswer: "Total momentum before a collision equals total momentum after",
        marks: 3
      },
      {
        id: "sci-mech-5",
        question: "A 2kg object moving at 3m/s has a kinetic energy of:",
        options: ["3J", "6J", "9J", "12J"],
        correctAnswer: "9J",
        marks: 2
      }
    ],
    "Chemistry": [
      {
        id: "sci-chem-1",
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: "Au",
        marks: 1
      },
      {
        id: "sci-chem-2",
        question: "What is the pH of a neutral solution at 25°C?",
        options: ["0", "7", "14", "1"],
        correctAnswer: "7",
        marks: 1
      },
      {
        id: "sci-chem-3",
        question: "Which of the following is a noble gas?",
        options: ["Oxygen", "Chlorine", "Helium", "Nitrogen"],
        correctAnswer: "Helium",
        marks: 2
      },
      {
        id: "sci-chem-4",
        question: "What is the chemical formula for water?",
        options: ["H2O", "CO2", "NaCl", "O2"],
        correctAnswer: "H2O",
        marks: 1
      },
      {
        id: "sci-chem-5",
        question: "Which of these is an example of a chemical change?",
        options: [
          "Melting ice",
          "Grinding salt",
          "Rusting iron",
          "Dissolving sugar in water"
        ],
        correctAnswer: "Rusting iron",
        marks: 2
      }
    ],
    "Biology": [
      {
        id: "sci-bio-1",
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
        correctAnswer: "Mitochondria",
        marks: 1
      },
      {
        id: "sci-bio-2",
        question: "Which of these is NOT a function of the skeletal system?",
        options: [
          "Production of blood cells", 
          "Digestion of food", 
          "Protection of organs", 
          "Support for the body"
        ],
        correctAnswer: "Digestion of food",
        marks: 2
      },
      {
        id: "sci-bio-3",
        question: "What is photosynthesis?",
        options: [
          "The process of breaking down food for energy",
          "The process by which plants make food using sunlight",
          "The process of cell division",
          "The process of water movement through a plant"
        ],
        correctAnswer: "The process by which plants make food using sunlight",
        marks: 2
      },
      {
        id: "sci-bio-4",
        question: "Which of the following is NOT a component of DNA?",
        options: ["Adenine", "Uracil", "Guanine", "Thymine"],
        correctAnswer: "Uracil",
        marks: 3
      },
      {
        id: "sci-bio-5",
        question: "The process of converting genetic information from DNA to protein is called:",
        options: ["Replication", "Transcription and translation", "Mitosis", "Meiosis"],
        correctAnswer: "Transcription and translation",
        marks: 3
      }
    ]
  }
};