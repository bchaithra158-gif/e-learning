/**
 * LearnSphere E-Learning Platform - Comprehensive Courses Catalog
 * 6 Core Curriculums: Python, Java, HTML/CSS, JavaScript, C, SQL
 * Real YouTube tutorials from reputable channels (freeCodeCamp, Bro Code, Telusko, Mosh, etc.)
 * Structured into Beginner, Intermediate, and Advanced modules with coding tasks, smart quizzes & resources.
 */

const COURSES_DATA = [
  // ==========================================
  // 1. PYTHON PROGRAMMING (Beginner to Advanced)
  // ==========================================
  {
    id: "course-python",
    title: "Python Programming: Beginner to Advanced",
    shortTitle: "Python Programming",
    slug: "python-programming",
    category: "Programming Languages",
    level: "Beginner to Advanced",
    duration: "24 Hours",
    totalModules: 3,
    totalLessons: 12,
    rating: 4.96,
    reviewsCount: 5420,
    studentsCount: 28400,
    badge: "🔥 Most Popular",
    bannerGradient: "from-blue-600 via-indigo-600 to-purple-700",
    description: "Comprehensive Python masterclass covering fundamentals, data structures, OOP, file handling, exception handling, and hands-on projects with verified real YouTube tutorials.",
    instructor: {
      name: "LearnSphere Faculty & Curators",
      role: "Leading Open-Source Python Instructors"
    },
    // Real Tutorial Options (at least 4 different reputable options)
    tutorialOptions: [
      {
        id: "py-tut-1",
        title: "Python for Beginners, Full Course",
        channel: "Programming with Mosh",
        topic: "Complete Python syntax, variables, operators, control flow & project",
        level: "Beginner",
        youtubeId: "eWRfhZUzrAc",
        watchUrl: "https://www.youtube.com/watch?v=eWRfhZUzrAc",
        isSearch: false
      },
      {
        id: "py-tut-2",
        title: "Learn Python, Full Course for Beginners",
        channel: "freeCodeCamp.org",
        topic: "Core programming concepts, functions, lists, dictionaries & games",
        level: "Beginner",
        youtubeId: "rfscVS0vtbw",
        watchUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
        isSearch: false
      },
      {
        id: "py-tut-3",
        title: "Python Beginner Tutorials Series",
        channel: "Telusko",
        topic: "Step-by-step Python programming from absolute zero to functions",
        level: "Beginner to Intermediate",
        youtubeId: "QXeEoD0pB3E",
        watchUrl: "https://www.youtube.com/results?search_query=Telusko+Python+tutorial+for+beginners",
        isSearch: true
      },
      {
        id: "py-tut-4",
        title: "Intermediate and Advanced Python Course",
        channel: "freeCodeCamp.org",
        topic: "OOP, generators, decorators, multithreading, context managers & lambdas",
        level: "Intermediate to Advanced",
        youtubeId: "HGOBQPFzWKo",
        watchUrl: "https://www.youtube.com/results?search_query=freeCodeCamp+intermediate+advanced+Python+course",
        isSearch: true
      }
    ],
    readingResources: [
      { title: "Official Python 3 Documentation Tutorial", url: "https://docs.python.org/3/tutorial/" },
      { title: "W3Schools Python Comprehensive Guide", url: "https://www.w3schools.com/python/" }
    ],
    modules: [
      {
        id: "py-mod-1",
        title: "Module 1: Beginner Foundations & Control Flow",
        level: "Beginner",
        duration: "7 Hours",
        description: "Variables, data types, arithmetic operators, user input, if-else statements, loops and pattern printing.",
        lessons: [
          {
            id: "py-les-1",
            title: "Lesson 1: Introduction to Python & Hello World",
            duration: "30m",
            youtubeId: "eWRfhZUzrAc",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "Setting up Python, running scripts, and understanding standard output."
          },
          {
            id: "py-les-2",
            title: "Lesson 2: Variables, Data Types & Operators",
            duration: "45m",
            youtubeId: "rfscVS0vtbw",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "Integers, floats, booleans, string manipulation, and arithmetic expressions."
          },
          {
            id: "py-les-3",
            title: "Lesson 3: Conditionals & Logical Decision Making",
            duration: "40m",
            youtubeId: "eWRfhZUzrAc",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "If, elif, else constructs and boolean logic operators (and, or, not)."
          },
          {
            id: "py-les-4",
            title: "Lesson 4: While Loops, For Loops & Pattern Printing",
            duration: "50m",
            youtubeId: "QXeEoD0pB3E",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "Iterating with range(), break, continue, and building star/number patterns."
          }
        ],
        tasks: [
          {
            id: "py-task-1",
            title: "Task 1: Print Hello World",
            instructions: "Write a Python statement that outputs exactly 'Hello, World!' to the console.",
            starterCode: "# Print Hello World\n",
            expectedOutput: "Hello, World!",
            validationType: "stdout",
            testCode: "Hello, World!"
          },
          {
            id: "py-task-2",
            title: "Task 2: Variables & Data Types",
            instructions: "Declare a variable named `name` with value 'LearnSphere' and `year` with value 2026. Print both separated by a space.",
            starterCode: "# Create variables and print\nname = 'LearnSphere'\nyear = 2026\nprint(f'{name} {year}')\n",
            expectedOutput: "LearnSphere 2026",
            validationType: "stdout",
            testCode: "LearnSphere 2026"
          },
          {
            id: "py-task-3",
            title: "Task 3: If-Else Condition Checker",
            instructions: "Write a program with variable `score = 85`. If score is >= 70, print 'Passed', otherwise print 'Failed'.",
            starterCode: "score = 85\nif score >= 70:\n    print('Passed')\nelse:\n    print('Failed')\n",
            expectedOutput: "Passed",
            validationType: "stdout",
            testCode: "Passed"
          },
          {
            id: "py-task-4",
            title: "Task 4: Loops & Sum of Numbers",
            instructions: "Use a loop to calculate and print the sum of integers from 1 to 5 inclusive (1+2+3+4+5 = 15).",
            starterCode: "total = 0\nfor i in range(1, 6):\n    total += i\nprint(total)\n",
            expectedOutput: "15",
            validationType: "stdout",
            testCode: "15"
          }
        ],
        quiz: {
          id: "py-quiz-1",
          title: "Module 1 Mastery Quiz",
          timeLimitSeconds: 60,
          passingScore: 70,
          questions: [
            {
              question: "What is the correct syntax to output 'Hello' in Python?",
              options: ["echo 'Hello'", "print('Hello')", "console.log('Hello')", "System.out.println('Hello')"],
              answerIndex: 1,
              explanation: "Python uses the built-in print() function to write output to the standard stream."
            },
            {
              question: "Which of the following is an immutable data type in Python?",
              options: ["List", "Dictionary", "Tuple", "Set"],
              answerIndex: 2,
              explanation: "Tuples cannot be modified after creation; they are immutable sequences."
            },
            {
              question: "What will `type(3.14)` evaluate to in Python?",
              options: ["<class 'int'>", "<class 'float'>", "<class 'double'>", "<class 'number'>"],
              answerIndex: 1,
              explanation: "Floating-point numbers with decimals are instances of the float class in Python."
            },
            {
              question: "What does the `//` operator perform in Python?",
              options: ["Exponentiation", "Floor/Integer division", "Modulo remainder", "Comment line"],
              answerIndex: 1,
              explanation: "The // operator performs floor division, rounding down to the nearest integer."
            },
            {
              question: "How do you start writing a while loop in Python?",
              options: ["while x > y {", "while (x > y)", "while x > y:", "x > y while:"],
              answerIndex: 2,
              explanation: "Python while loops end with a colon `:` without requiring parentheses or curly braces."
            }
          ]
        }
      },
      {
        id: "py-mod-2",
        title: "Module 2: Intermediate Data Structures & Functions",
        level: "Intermediate",
        duration: "8 Hours",
        description: "Lists, tuples, sets, dictionaries, user-defined functions, keyword arguments, and lambda expressions.",
        lessons: [
          {
            id: "py-les-5",
            title: "Lesson 5: Lists, Tuples & Slicing Operations",
            duration: "55m",
            youtubeId: "rfscVS0vtbw",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "List indexing, append, pop, sorting, and slicing techniques [start:stop:step]."
          },
          {
            id: "py-les-6",
            title: "Lesson 6: Dictionaries, Key-Value Pairs & Sets",
            duration: "45m",
            youtubeId: "QXeEoD0pB3E",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "Storing structured data, hash sets, dictionary comprehensions, and keys/values iteration."
          },
          {
            id: "py-les-7",
            title: "Lesson 7: Functions, Scope, *args & **kwargs",
            duration: "50m",
            youtubeId: "eWRfhZUzrAc",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "Defining functions with def, default parameters, variable-length arguments, and return values."
          },
          {
            id: "py-les-8",
            title: "Lesson 8: Lambda Functions & Built-in Utilities (map, filter)",
            duration: "40m",
            youtubeId: "HGOBQPFzWKo",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "Anonymous lambda expressions, map(), filter(), and list comprehensions."
          }
        ],
        tasks: [
          {
            id: "py-task-5",
            title: "Task 5: List Manipulation & Slicing",
            instructions: "Create a list `nums = [10, 20, 30, 40, 50]`. Reverse it using slicing `[::-1]` and print the result.",
            starterCode: "nums = [10, 20, 30, 40, 50]\nprint(nums[::-1])\n",
            expectedOutput: "[50, 40, 30, 20, 10]",
            validationType: "stdout",
            testCode: "[50, 40, 30, 20, 10]"
          },
          {
            id: "py-task-6",
            title: "Task 6: Dictionary Lookup",
            instructions: "Create a dictionary `user = {'name': 'Alex', 'role': 'Developer'}`. Print the value of the 'role' key.",
            starterCode: "user = {'name': 'Alex', 'role': 'Developer'}\nprint(user['role'])\n",
            expectedOutput: "Developer",
            validationType: "stdout",
            testCode: "Developer"
          },
          {
            id: "py-task-7",
            title: "Task 7: Functions & Math Calculation",
            instructions: "Define a function `square(n)` that returns `n * n`. Call `print(square(6))`.",
            starterCode: "def square(n):\n    return n * n\n\nprint(square(6))\n",
            expectedOutput: "36",
            validationType: "stdout",
            testCode: "36"
          }
        ],
        quiz: {
          id: "py-quiz-2",
          title: "Module 2 Mastery Quiz",
          timeLimitSeconds: 60,
          passingScore: 70,
          questions: [
            {
              question: "How do you add an element to the end of a Python list?",
              options: ["list.add(item)", "list.append(item)", "list.push(item)", "list.insertEnd(item)"],
              answerIndex: 1,
              explanation: "The append() method appends an element to the end of an existing list."
            },
            {
              question: "What is the output of `len({'a': 1, 'b': 2, 'c': 3})`?",
              options: ["6", "3", "2", "None"],
              answerIndex: 1,
              explanation: "len() counts the number of top-level keys in a dictionary."
            },
            {
              question: "Which keyword defines an anonymous inline function in Python?",
              options: ["def", "func", "lambda", "inline"],
              answerIndex: 2,
              explanation: "The lambda keyword creates small anonymous functions without a def statement."
            },
            {
              question: "What does `*args` in a function signature allow?",
              options: ["Passing a variable number of positional arguments", "Multiplying numbers", "Creating global variables", "Importing all modules"],
              answerIndex: 0,
              explanation: "*args collects arbitrary positional arguments into a tuple."
            },
            {
              question: "What is the result of `[x * 2 for x in [1, 2, 3]]`?",
              options: ["[1, 2, 3]", "[2, 4, 6]", "12", "Error"],
              answerIndex: 1,
              explanation: "This list comprehension multiplies every item by 2, yielding [2, 4, 6]."
            }
          ]
        }
      },
      {
        id: "py-mod-3",
        title: "Module 3: Advanced OOP, File Handling & Mini-Project",
        level: "Advanced",
        duration: "9 Hours",
        description: "Object-Oriented Programming (classes, inheritance, encapsulation), try-except blocks, file I/O, and capstone project.",
        lessons: [
          {
            id: "py-les-9",
            title: "Lesson 9: Classes, Objects & `__init__` Constructor",
            duration: "55m",
            youtubeId: "HGOBQPFzWKo",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "Building custom classes, instance attributes, self reference, and methods."
          },
          {
            id: "py-les-10",
            title: "Lesson 10: Inheritance, Polymorphism & Encapsulation",
            duration: "50m",
            youtubeId: "HGOBQPFzWKo",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "Subclasses, super(), method overriding, and private attributes."
          },
          {
            id: "py-les-11",
            title: "Lesson 11: File Handling & Exception Handling (try-except-finally)",
            duration: "45m",
            youtubeId: "rfscVS0vtbw",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "Reading/writing files using with open(), catching specific exceptions gracefully."
          },
          {
            id: "py-les-12",
            title: "Lesson 12: Capstone Mini-Project: CLI Student Grade Tracker",
            duration: "60m",
            youtubeId: "eWRfhZUzrAc",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "Bringing together OOP, collections, file persistence, and user input into a working app."
          }
        ],
        tasks: [
          {
            id: "py-task-8",
            title: "Task 8: Object-Oriented Class Creation",
            instructions: "Create a class `Car` with an `__init__(self, brand)` method that sets `self.brand = brand`. Instantiate with 'Tesla' and print `car.brand`.",
            starterCode: "class Car:\n    def __init__(self, brand):\n        self.brand = brand\n\ncar = Car('Tesla')\nprint(car.brand)\n",
            expectedOutput: "Tesla",
            validationType: "stdout",
            testCode: "Tesla"
          },
          {
            id: "py-task-9",
            title: "Task 9: Exception Handling with Try-Except",
            instructions: "Write a try-except block that attempts to divide 10 by 0, catches `ZeroDivisionError`, and prints 'Cannot divide by zero'.",
            starterCode: "try:\n    res = 10 / 0\nexcept ZeroDivisionError:\n    print('Cannot divide by zero')\n",
            expectedOutput: "Cannot divide by zero",
            validationType: "stdout",
            testCode: "Cannot divide by zero"
          },
          {
            id: "py-task-10",
            title: "Task 10: Capstone Project - Grade Calculator",
            instructions: "Create a function `calculate_grade(score)` that returns 'A' if score >= 90, 'B' if >= 80, otherwise 'C'. Call `print(calculate_grade(92))`.",
            starterCode: "def calculate_grade(score):\n    if score >= 90:\n        return 'A'\n    elif score >= 80:\n        return 'B'\n    return 'C'\n\nprint(calculate_grade(92))\n",
            expectedOutput: "A",
            validationType: "stdout",
            testCode: "A"
          }
        ],
        quiz: {
          id: "py-quiz-3",
          title: "Module 3 Mastery & Final Assessment",
          timeLimitSeconds: 75,
          passingScore: 70,
          isFinalAssessment: true,
          questions: [
            {
              question: "What is the purpose of the `__init__` method in a Python class?",
              options: [
                "It deletes the object from memory",
                "It initializes a newly created object's attributes",
                "It prints the class definition",
                "It imports external libraries"
              ],
              answerIndex: 1,
              explanation: "The __init__ method is the class constructor that initializes object state upon instantiation."
            },
            {
              question: "Which keyword is used to call a parent class constructor?",
              options: ["parent()", "super()", "base()", "this()"],
              answerIndex: 1,
              explanation: "super() delegates method calls to the parent/superclass in the inheritance hierarchy."
            },
            {
              question: "What block guarantees execution regardless of whether an exception occurred?",
              options: ["catch", "finally", "except", "always"],
              answerIndex: 1,
              explanation: "The finally block always executes after try-except blocks, commonly used for resource cleanup."
            },
            {
              question: "What does the statement `with open('data.txt', 'r') as f:` do?",
              options: [
                "Opens a file and automatically closes it when exiting the block",
                "Permanently deletes the file",
                "Encrypts the file with a password",
                "Uploads the file to the web"
              ],
              answerIndex: 0,
              explanation: "The context manager `with` ensures file handles are cleanly closed even if exceptions occur."
            },
            {
              question: "What will `issubclass(Dog, Animal)` return if Dog inherits from Animal?",
              options: ["True", "False", "None", "Error"],
              answerIndex: 0,
              explanation: "issubclass() returns True if the first argument class derives directly or indirectly from the second."
            }
          ]
        }
      }
    ]
  },

  // ==========================================
  // 2. JAVA PROGRAMMING (Beginner to Advanced)
  // ==========================================
  {
    id: "course-java",
    title: "Java Programming: Beginner to Advanced",
    shortTitle: "Java Programming",
    slug: "java-programming",
    category: "Programming Languages",
    level: "Beginner to Advanced",
    duration: "26 Hours",
    totalModules: 3,
    totalLessons: 12,
    rating: 4.93,
    reviewsCount: 4210,
    studentsCount: 21800,
    badge: "⚡ High Demand",
    bannerGradient: "from-amber-600 via-orange-600 to-red-700",
    description: "Master enterprise Java from mathematical first principles, Object-Oriented design, JVM memory model, Collections Framework, Multithreading, and real projects.",
    instructor: {
      name: "LearnSphere Faculty & Curators",
      role: "Senior Java Architects & CNCF Contributors"
    },
    tutorialOptions: [
      {
        id: "java-tut-1",
        title: "Java Full Course for Beginners",
        channel: "freeCodeCamp.org",
        topic: "Complete Java syntax, variables, data structures, and OOP",
        level: "Beginner",
        youtubeId: "A74TOX803D0",
        watchUrl: "https://www.youtube.com/results?search_query=freeCodeCamp+Java+full+course+for+beginners",
        isSearch: true
      },
      {
        id: "java-tut-2",
        title: "Java Full Course (Bro Code)",
        channel: "Bro Code",
        topic: "12 hours comprehensive Java mastery, GUI, OOP & practical drills",
        level: "Beginner to Intermediate",
        youtubeId: "xk4_1Fz6Es8",
        watchUrl: "https://www.youtube.com/results?search_query=Bro+Code+Java+full+course",
        isSearch: true
      },
      {
        id: "java-tut-3",
        title: "Java Tutorial for Beginners Series",
        channel: "Telusko",
        topic: "Core Java, JVM internals, bytecode, loops, arrays & OOP",
        level: "Beginner",
        youtubeId: "BGTx91t8q50",
        watchUrl: "https://www.youtube.com/results?search_query=Telusko+Java+tutorial+for+beginners",
        isSearch: true
      },
      {
        id: "java-tut-4",
        title: "Advanced Java OOP, Collections & Multithreading",
        channel: "freeCodeCamp / Telusko",
        topic: "Generics, ArrayList/HashMap, Lambdas, Streams & Concurrency",
        level: "Advanced",
        youtubeId: "grEKMHGYyns",
        watchUrl: "https://www.youtube.com/results?search_query=Java+advanced+OOP+collections+multithreading+tutorial",
        isSearch: true
      }
    ],
    readingResources: [
      { title: "Official Oracle Java Documentation (dev.java)", url: "https://dev.java/learn/" },
      { title: "W3Schools Java Interactive Tutorial", url: "https://www.w3schools.com/java/" }
    ],
    modules: [
      {
        id: "java-mod-1",
        title: "Module 1: Java Basics, Syntax & Control Flow",
        level: "Beginner",
        duration: "8 Hours",
        description: "JVM/JRE/JDK, main method, primitive types, conditional statements, and loops.",
        lessons: [
          {
            id: "java-les-1",
            title: "Lesson 1: JVM Architecture & Writing First Program",
            duration: "40m",
            youtubeId: "xk4_1Fz6Es8",
            videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
            summary: "How Java bytecode executes on the JVM, javac compiler, and standard output."
          },
          {
            id: "java-les-2",
            title: "Lesson 2: Primitive Data Types, Variables & Type Casting",
            duration: "45m",
            youtubeId: "A74TOX803D0",
            videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
            summary: "int, double, boolean, char, String, and widening/narrowing casting."
          },
          {
            id: "java-les-3",
            title: "Lesson 3: Conditionals (if-else, switch-case)",
            duration: "40m",
            youtubeId: "BGTx91t8q50",
            videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
            summary: "Decision structures, relational operators, and modern switch expressions."
          },
          {
            id: "java-les-4",
            title: "Lesson 4: Loops & Array Fundamentals",
            duration: "50m",
            youtubeId: "xk4_1Fz6Es8",
            videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
            summary: "for, enhanced for-each, while loops, and fixed-size arrays."
          }
        ],
        tasks: [
          {
            id: "java-task-1",
            title: "Task 1: Java Hello World",
            instructions: "Write standard Java code to print 'Hello, World!' using System.out.println().",
            starterCode: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}\n",
            expectedOutput: "Hello, World!",
            validationType: "stdout",
            testCode: "Hello, World!"
          },
          {
            id: "java-task-2",
            title: "Task 2: Variables & Addition",
            instructions: "Declare integer `a = 15` and `b = 25`. Print their sum `40`.",
            starterCode: "public class Main {\n    public static void main(String[] args) {\n        int a = 15;\n        int b = 25;\n        System.out.println(a + b);\n    }\n}\n",
            expectedOutput: "40",
            validationType: "stdout",
            testCode: "40"
          }
        ],
        quiz: {
          id: "java-quiz-1",
          title: "Module 1 Mastery Quiz",
          timeLimitSeconds: 60,
          passingScore: 70,
          questions: [
            {
              question: "What is the entry point method signature for every standalone Java program?",
              options: [
                "public void main(String args)",
                "public static void main(String[] args)",
                "static void main()",
                "void main(String[] args)"
              ],
              answerIndex: 1,
              explanation: "The JVM looks specifically for `public static void main(String[] args)`."
            },
            {
              question: "Which of the following is NOT a primitive data type in Java?",
              options: ["int", "boolean", "String", "double"],
              answerIndex: 2,
              explanation: "String is a class reference type in java.lang, not a primitive."
            },
            {
              question: "What does the `javac` tool do?",
              options: [
                "Executes Java bytecode",
                "Compiles Java source code (.java) into bytecode (.class)",
                "Formats Java source files",
                "Packages code into a ZIP file"
              ],
              answerIndex: 1,
              explanation: "javac is the official Java compiler converting source into JVM bytecode."
            },
            {
              question: "How do you access the length of an array `nums` in Java?",
              options: ["nums.length()", "nums.length", "nums.size()", "nums.count"],
              answerIndex: 1,
              explanation: "Array length in Java is a public final property accessed as `nums.length`."
            },
            {
              question: "What is the default value of a boolean variable declared as a class field?",
              options: ["true", "false", "null", "0"],
              answerIndex: 1,
              explanation: "In Java, uninitialized instance/static boolean fields default to false."
            }
          ]
        }
      },
      {
        id: "java-mod-2",
        title: "Module 2: Object-Oriented Programming (OOP) in Java",
        level: "Intermediate",
        duration: "9 Hours",
        description: "Encapsulation, Inheritance, Polymorphism, Abstract classes, and Interfaces.",
        lessons: [
          {
            id: "java-les-5",
            title: "Lesson 5: Classes, Objects & Constructors",
            duration: "50m",
            youtubeId: "xk4_1Fz6Es8",
            videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
            summary: "Instance fields, parameterized constructors, getters and setters."
          },
          {
            id: "java-les-6",
            title: "Lesson 6: Inheritance & Method Overriding",
            duration: "55m",
            youtubeId: "A74TOX803D0",
            videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
            summary: "The `extends` keyword, super constructor calls, and @Override annotation."
          },
          {
            id: "java-les-7",
            title: "Lesson 7: Interfaces & Abstract Classes",
            duration: "45m",
            youtubeId: "BGTx91t8q50",
            videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
            summary: "Contract-driven programming, default methods, and multiple interface implementation."
          },
          {
            id: "java-les-8",
            title: "Lesson 8: Exception Handling (try-catch-finally, throws)",
            duration: "40m",
            youtubeId: "grEKMHGYyns",
            videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
            summary: "Checked vs unchecked exceptions, custom exception classes, and robust cleanup."
          }
        ],
        tasks: [
          {
            id: "java-task-3",
            title: "Task 3: Object Instantiation",
            instructions: "Create a class `Student` with field `String name = \"Alex\";`. Print the name in `main`.",
            starterCode: "class Student {\n    String name = \"Alex\";\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s = new Student();\n        System.out.println(s.name);\n    }\n}\n",
            expectedOutput: "Alex",
            validationType: "stdout",
            testCode: "Alex"
          }
        ],
        quiz: {
          id: "java-quiz-2",
          title: "Module 2 Mastery Quiz",
          timeLimitSeconds: 60,
          passingScore: 70,
          questions: [
            {
              question: "Which keyword prevents a class from being inherited in Java?",
              options: ["static", "final", "abstract", "private"],
              answerIndex: 1,
              explanation: "The `final` keyword on a class prohibits other classes from extending it."
            },
            {
              question: "Can a Java class implement multiple interfaces?",
              options: ["Yes", "No", "Only if abstract", "Only in Java 8 and earlier"],
              answerIndex: 0,
              explanation: "Java permits multiple interface implementation via comma separation."
            },
            {
              question: "What is method overloading?",
              options: [
                "Two methods in same class with same name but different parameter lists",
                "Redefining a parent method with exact same signature",
                "Calling a method indefinitely",
                "Converting methods to variables"
              ],
              answerIndex: 0,
              explanation: "Overloading occurs when methods share names but have differing argument types/counts."
            },
            {
              question: "Which exception type is checked by the compiler at build time?",
              options: ["NullPointerException", "ArithmeticException", "IOException", "ArrayIndexOutOfBoundsException"],
              answerIndex: 2,
              explanation: "IOException inherits from Exception (not RuntimeException) and must be handled or declared."
            },
            {
              question: "What does `this` keyword refer to in an instance method?",
              options: ["The current class constructor", "The current calling object instance", "The parent class", "The JVM itself"],
              answerIndex: 1,
              explanation: "`this` represents the reference to the current object instance executing the method."
            }
          ]
        }
      },
      {
        id: "java-mod-3",
        title: "Module 3: Collections Framework, Generics & Final Assessment",
        level: "Advanced",
        duration: "9 Hours",
        description: "List, Set, Map, HashMap, Streams API, Lambda expressions, and Capstone Mini-Project.",
        lessons: [
          {
            id: "java-les-9",
            title: "Lesson 9: ArrayList & LinkedList Operations",
            duration: "50m",
            youtubeId: "grEKMHGYyns",
            videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
            summary: "Dynamic array resizing, amortized time complexity, and iterator usage."
          },
          {
            id: "java-les-10",
            title: "Lesson 10: HashMap & HashSet Hashing Mechanics",
            duration: "45m",
            youtubeId: "xk4_1Fz6Es8",
            videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
            summary: "equals() and hashCode() contracts, hash buckets, and collision resolution."
          },
          {
            id: "java-les-11",
            title: "Lesson 11: Java Streams API & Functional Lambdas",
            duration: "55m",
            youtubeId: "grEKMHGYyns",
            videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
            summary: "Declarative collection processing: filter(), map(), reduce(), and collectors."
          },
          {
            id: "java-les-12",
            title: "Lesson 12: Capstone Mini-Project: Bank Account Management System",
            duration: "65m",
            youtubeId: "A74TOX803D0",
            videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
            summary: "Build an end-to-end OOP banking simulator with transaction histories and balance validations."
          }
        ],
        tasks: [
          {
            id: "java-task-4",
            title: "Task 4: ArrayList Creation & Iteration",
            instructions: "Create an ArrayList of Strings, add 'Java' and 'Python', and print `list.size()`.",
            starterCode: "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> list = new ArrayList<>();\n        list.add(\"Java\");\n        list.add(\"Python\");\n        System.out.println(list.size());\n    }\n}\n",
            expectedOutput: "2",
            validationType: "stdout",
            testCode: "2"
          }
        ],
        quiz: {
          id: "java-quiz-3",
          title: "Module 3 Mastery & Final Assessment",
          timeLimitSeconds: 75,
          passingScore: 70,
          isFinalAssessment: true,
          questions: [
            {
              question: "What is the average time complexity of `HashMap.get(key)`?",
              options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
              answerIndex: 0,
              explanation: "Properly distributed hash tables achieve O(1) constant time average access."
            },
            {
              question: "Which collection allows duplicate elements while maintaining insertion order?",
              options: ["HashSet", "ArrayList", "TreeSet", "HashMap"],
              answerIndex: 1,
              explanation: "ArrayList implements List, which allows duplicates and preserves sequential insertion order."
            },
            {
              question: "What does the `transient` keyword do on a variable in Java?",
              options: [
                "Makes it available across threads",
                "Prevents it from being serialized during ObjectOutputStream writes",
                "Makes it constant",
                "Accelerates memory allocation"
              ],
              answerIndex: 1,
              explanation: "transient fields are omitted during standard Java object serialization."
            },
            {
              question: "In the Java Streams API, what type of operation is `.filter()`?",
              options: ["Terminal operation", "Intermediate operation", "Static operation", "Volatile operation"],
              answerIndex: 1,
              explanation: "filter() is lazy and intermediate; it transforms a stream into another stream."
            },
            {
              question: "Which garbage collector in modern OpenJDK aims for sub-millisecond maximum pause times?",
              options: ["Serial GC", "ZGC (Z Garbage Collector)", "Parallel GC", "CMS"],
              answerIndex: 1,
              explanation: "ZGC is a scalable low-latency garbage collector with pause times under 1ms."
            }
          ]
        }
      }
    ]
  },

  // ==========================================
  // 3. HTML AND CSS (Web Foundations)
  // ==========================================
  {
    id: "course-html-css",
    title: "HTML and CSS: Complete Responsive Web Design",
    shortTitle: "HTML & CSS",
    slug: "html-and-css",
    category: "Web Development",
    level: "Beginner to Advanced",
    duration: "18 Hours",
    totalModules: 3,
    totalLessons: 9,
    rating: 4.95,
    reviewsCount: 3950,
    studentsCount: 24100,
    badge: "⭐ Essential",
    bannerGradient: "from-pink-600 via-rose-600 to-indigo-700",
    description: "Learn how modern websites are structured and styled: Semantic HTML5, Flexbox, Grid, Responsive Design, and CSS Animations.",
    instructor: {
      name: "LearnSphere Faculty & Curators",
      role: "Frontend Specialists & UI Engineers"
    },
    tutorialOptions: [
      {
        id: "html-tut-1",
        title: "HTML & CSS Full Course - Beginner to Pro",
        channel: "SuperSimpleDev",
        topic: "Comprehensive practical walkthrough building real websites from scratch",
        level: "Beginner to Intermediate",
        youtubeId: "G3e-cpL7ofc",
        watchUrl: "https://www.youtube.com/watch?v=G3e-cpL7ofc",
        isSearch: false
      },
      {
        id: "html-tut-2",
        title: "HTML & CSS Crash Course Tutorial",
        channel: "freeCodeCamp.org",
        topic: "Semantic tags, typography, CSS cascade, layouts and flexbox",
        level: "Beginner",
        youtubeId: "mU6anWqZJcc",
        watchUrl: "https://www.youtube.com/watch?v=mU6anWqZJcc",
        isSearch: false
      },
      {
        id: "html-tut-3",
        title: "HTML and CSS Full Course",
        channel: "Bro Code",
        topic: "Complete elements, forms, positioning, pseudo-classes & animations",
        level: "Beginner to Intermediate",
        youtubeId: "HGTJBPNC-Gw",
        watchUrl: "https://www.youtube.com/watch?v=HGTJBPNC-Gw",
        isSearch: false
      },
      {
        id: "html-tut-4",
        title: "Responsive Web Design & Modern CSS Architecture",
        channel: "Kevin Powell",
        topic: "Modern layouts, clamp(), container queries, grid & fluid design",
        level: "Intermediate to Advanced",
        youtubeId: "bn-D83EBjLw",
        watchUrl: "https://www.youtube.com/results?search_query=Kevin+Powell+responsive+web+design+CSS",
        isSearch: true
      }
    ],
    readingResources: [
      { title: "MDN Web Docs HTML Learning Pathway", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML" },
      { title: "W3Schools HTML & CSS Reference", url: "https://www.w3schools.com/html/" }
    ],
    modules: [
      {
        id: "html-mod-1",
        title: "Module 1: Semantic HTML5 & Document Structure",
        level: "Beginner",
        duration: "5 Hours",
        description: "Tags, elements, attributes, forms, inputs, tables, and accessibility.",
        lessons: [
          {
            id: "html-les-1",
            title: "Lesson 1: Document Structure & Semantic Elements",
            duration: "35m",
            youtubeId: "G3e-cpL7ofc",
            videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            summary: "DOCTYPE, html, head, body, header, nav, main, article, and footer tags."
          },
          {
            id: "html-les-2",
            title: "Lesson 2: Forms, Inputs & Accessible Controls",
            duration: "40m",
            youtubeId: "mU6anWqZJcc",
            videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            summary: "Form submission, inputs, labels, buttons, and validation attributes."
          },
          {
            id: "html-les-3",
            title: "Lesson 3: Tables, Lists & Media Embedding",
            duration: "35m",
            youtubeId: "HGTJBPNC-Gw",
            videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            summary: "Ordered/unordered lists, tables, images, and video/audio tags."
          }
        ],
        tasks: [
          {
            id: "html-task-1",
            title: "Task 1: Semantic HTML Heading & Paragraph",
            instructions: "Write HTML with an `<h1>Welcome</h1>` and a `<p>Learn web development</p>`.",
            starterCode: "<h1>Welcome</h1>\n<p>Learn web development</p>\n",
            expectedOutput: "Welcome",
            validationType: "html",
            testCode: "Welcome"
          }
        ],
        quiz: {
          id: "html-quiz-1",
          title: "Module 1 Mastery Quiz",
          timeLimitSeconds: 60,
          passingScore: 70,
          questions: [
            {
              question: "Which HTML5 tag is most appropriate for high-level site navigation links?",
              options: ["<div class='nav'>", "<nav>", "<menu>", "<navigate>"],
              answerIndex: 1,
              explanation: "The <nav> semantic element designates major navigation link sections."
            },
            {
              question: "What attribute specifies an alternate text for an image if it cannot be displayed?",
              options: ["title", "alt", "src", "desc"],
              answerIndex: 1,
              explanation: "The `alt` attribute provides accessible descriptions for screen readers and broken image states."
            },
            {
              question: "Which HTML element represents the independent, self-contained content item?",
              options: ["<section>", "<article>", "<aside>", "<div>"],
              answerIndex: 1,
              explanation: "<article> represents a standalone composition intended to be independently reusable."
            },
            {
              question: "What is the correct HTML element for inserting a line break?",
              options: ["<lb>", "<break>", "<br>", "<newline>"],
              answerIndex: 2,
              explanation: "<br> produces a line break in text."
            },
            {
              question: "Which tag is used to create a hyperlink?",
              options: ["<link>", "<a>", "<href>", "<url>"],
              answerIndex: 1,
              explanation: "The <a> (anchor) tag creates hyperlinks via its href attribute."
            }
          ]
        }
      },
      {
        id: "html-mod-2",
        title: "Module 2: Modern CSS Layouts (Flexbox & Grid)",
        level: "Intermediate",
        duration: "7 Hours",
        description: "The CSS box model, selectors, Flexbox alignment, and CSS Grid templates.",
        lessons: [
          {
            id: "html-les-4",
            title: "Lesson 4: The Box Model & CSS Specificity",
            duration: "45m",
            youtubeId: "G3e-cpL7ofc",
            videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            summary: "Content, padding, border, margin, box-sizing: border-box, and specificity math."
          },
          {
            id: "html-les-5",
            title: "Lesson 5: Flexbox Mastery (Axes, Alignment & Wrapping)",
            duration: "55m",
            youtubeId: "bn-D83EBjLw",
            videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            summary: "justify-content, align-items, flex-direction, flex-grow, and gap properties."
          },
          {
            id: "html-les-6",
            title: "Lesson 6: CSS Grid (Templates, Areas & Minmax)",
            duration: "50m",
            youtubeId: "HGTJBPNC-Gw",
            videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            summary: "grid-template-columns, fr units, repeat(), minmax(), and grid areas."
          }
        ],
        tasks: [
          {
            id: "html-task-2",
            title: "Task 2: Flexbox Centering",
            instructions: "Write CSS rule for `.container` to center children both horizontally and vertically using Flexbox.",
            starterCode: ".container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n",
            expectedOutput: "center",
            validationType: "css",
            testCode: "justify-content: center"
          }
        ],
        quiz: {
          id: "html-quiz-2",
          title: "Module 2 Mastery Quiz",
          timeLimitSeconds: 60,
          passingScore: 70,
          questions: [
            {
              question: "What CSS property ensures padding and borders are included in an element's total width and height?",
              options: ["box-sizing: content-box", "box-sizing: border-box", "display: block", "margin: 0 auto"],
              answerIndex: 1,
              explanation: "border-box includes padding and border within the specified width."
            },
            {
              question: "In Flexbox, which property aligns items along the primary main axis?",
              options: ["align-items", "justify-content", "align-content", "flex-direction"],
              answerIndex: 1,
              explanation: "justify-content aligns items along the main axis."
            },
            {
              question: "What does `1fr` represent in CSS Grid?",
              options: ["One frame", "One fraction of the available free space", "One fixed rem", "One fluid radius"],
              answerIndex: 1,
              explanation: "The fr unit represents a fraction of the remaining free space in the grid container."
            },
            {
              question: "Which selector has the highest specificity?",
              options: [".button.primary", "#main-nav", "nav ul li a", "button:hover"],
              answerIndex: 1,
              explanation: "ID selectors (#) have a higher specificity tier (100) than class/attribute selectors (10)."
            },
            {
              question: "How do you apply a style only when screen width is 768px or narrower?",
              options: [
                "@media screen and (max-width: 768px) { ... }",
                "@screen (width < 768) { ... }",
                "@responsive 768px { ... }",
                "@mobile-only { ... }"
              ],
              answerIndex: 0,
              explanation: "CSS media queries use `@media (max-width: 768px)` for mobile/tablet responsive breakpoints."
            }
          ]
        }
      },
      {
        id: "html-mod-3",
        title: "Module 3: Responsive Design, Animations & Capstone Assessment",
        level: "Advanced",
        duration: "6 Hours",
        description: "Media queries, responsive typography, CSS variables, transitions, and capstone landing page.",
        lessons: [
          {
            id: "html-les-7",
            title: "Lesson 7: Fluid Typography with clamp() & CSS Variables",
            duration: "40m",
            youtubeId: "bn-D83EBjLw",
            videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            summary: "Custom properties (--primary-color), var(), and dynamic fluid clamp() scaling."
          },
          {
            id: "html-les-8",
            title: "Lesson 8: Transitions, Transforms & @keyframes Animations",
            duration: "45m",
            youtubeId: "HGTJBPNC-Gw",
            videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            summary: "Hardware-accelerated CSS animations using transform, opacity, and timing functions."
          },
          {
            id: "html-les-9",
            title: "Lesson 9: Capstone: Building a Complete Responsive Landing Page",
            duration: "60m",
            youtubeId: "G3e-cpL7ofc",
            videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            summary: "Constructing a responsive hero, navigation drawer, card grid, and accessible footer."
          }
        ],
        tasks: [
          {
            id: "html-task-3",
            title: "Task 3: CSS Custom Property (Variable)",
            instructions: "Declare a CSS variable `--brand-blue: #3b82f6;` inside `:root`.",
            starterCode: ":root {\n  --brand-blue: #3b82f6;\n}\n",
            expectedOutput: "#3b82f6",
            validationType: "css",
            testCode: "--brand-blue"
          }
        ],
        quiz: {
          id: "html-quiz-3",
          title: "Module 3 Mastery & Final Assessment",
          timeLimitSeconds: 75,
          passingScore: 70,
          isFinalAssessment: true,
          questions: [
            {
              question: "What CSS function enables responsive typography bounded by minimum, preferred, and maximum values?",
              options: ["calc()", "clamp()", "minmax()", "fluid()"],
              answerIndex: 1,
              explanation: "clamp(min, preferred, max) clamps a value between lower and upper bounds dynamically."
            },
            {
              question: "Which CSS properties are best suited for performant 60fps animations?",
              options: ["width and height", "transform and opacity", "margin and padding", "top and left"],
              answerIndex: 1,
              explanation: "transform and opacity can be composited directly on the GPU without triggering layout recalculations."
            },
            {
              question: "How do you access a CSS custom property `--main-color`?",
              options: ["$main-color", "var(--main-color)", "get(--main-color)", "prop(--main-color)"],
              answerIndex: 1,
              explanation: "CSS variables are referenced using the `var(--name)` function."
            },
            {
              question: "What is the purpose of `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">`?",
              options: [
                "Sets the color theme to dark mode",
                "Instructs mobile browsers to render the viewport width according to device width without auto-zooming out",
                "Encrypts HTML transmission",
                "Loads fonts asynchronously"
              ],
              answerIndex: 1,
              explanation: "The viewport meta tag establishes the responsive viewport scale on mobile devices."
            },
            {
              question: "What does the `:root` pseudo-class match in HTML documents?",
              options: ["The <body> tag", "The <html> tag", "The <head> tag", "The server root"],
              answerIndex: 1,
              explanation: "In HTML, :root represents the <html> element with higher specificity than the html type selector."
            }
          ]
        }
      }
    ]
  },

  // ==========================================
  // 4. JAVASCRIPT (Modern ES6+ to Advanced)
  // ==========================================
  {
    id: "course-javascript",
    title: "JavaScript: Modern ES6+ & Full-Stack Foundations",
    shortTitle: "JavaScript",
    slug: "javascript",
    category: "Web Development",
    level: "Beginner to Advanced",
    duration: "22 Hours",
    totalModules: 3,
    totalLessons: 9,
    rating: 4.96,
    reviewsCount: 6100,
    studentsCount: 31000,
    badge: "🚀 High Growth",
    bannerGradient: "from-amber-500 via-yellow-600 to-indigo-800",
    description: "The engine of the modern web: variables, closures, DOM manipulation, asynchronous promises, async/await, APIs, and modern ES6 modules.",
    instructor: {
      name: "LearnSphere Faculty & Curators",
      role: "Senior Frontend Engineers"
    },
    tutorialOptions: [
      {
        id: "js-tut-1",
        title: "JavaScript Full Course for Beginners",
        channel: "Bro Code",
        topic: "Complete 12-hour video tutorial covering modern JS from zero to advanced",
        level: "Beginner to Intermediate",
        youtubeId: "lfmg-EJ8gm4",
        watchUrl: "https://www.youtube.com/watch?v=lfmg-EJ8gm4",
        isSearch: false
      },
      {
        id: "js-tut-2",
        title: "JavaScript Programming - Full Course",
        channel: "freeCodeCamp.org",
        topic: "Hands-on projects, games, functions, arrays, objects & DOM",
        level: "Beginner",
        youtubeId: "jS4aFq5-91M",
        watchUrl: "https://www.youtube.com/watch?v=jS4aFq5-91M",
        isSearch: false
      },
      {
        id: "js-tut-3",
        title: "JavaScript Tutorial for Beginners",
        channel: "Programming with Mosh",
        topic: "Core fundamentals, operators, objects, arrays and clean code",
        level: "Beginner",
        youtubeId: "W6NZfCO5SIk",
        watchUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
        isSearch: false
      },
      {
        id: "js-tut-4",
        title: "Modern JavaScript & Asynchronous Programming",
        channel: "The Net Ninja",
        topic: "Async/await, fetch API, promises, closures, and ES6 modular code",
        level: "Intermediate to Advanced",
        youtubeId: "Z7t1p1Yn7QY",
        watchUrl: "https://www.youtube.com/results?search_query=Net+Ninja+modern+JavaScript+tutorial",
        isSearch: true
      }
    ],
    readingResources: [
      { title: "The Modern JavaScript Tutorial (javascript.info)", url: "https://javascript.info/" },
      { title: "MDN Web Docs JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" }
    ],
    modules: [
      {
        id: "js-mod-1",
        title: "Module 1: Language Syntax, Variables & DOM Interaction",
        level: "Beginner",
        duration: "7 Hours",
        description: "let/const, arrow functions, template literals, event listeners, and DOM selectors.",
        lessons: [
          {
            id: "js-les-1",
            title: "Lesson 1: Variables (var vs let vs const) & Data Types",
            duration: "40m",
            youtubeId: "lfmg-EJ8gm4",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "Block scoping, temporal dead zone, primitive types, and objects."
          },
          {
            id: "js-les-2",
            title: "Lesson 2: Functions, Arrow Syntax & Template Literals",
            duration: "45m",
            youtubeId: "jS4aFq5-91M",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "Function declarations, expressions, concise arrow functions, and `${expression}` strings."
          },
          {
            id: "js-les-3",
            title: "Lesson 3: DOM Selectors & Event Listeners (click, input)",
            duration: "50m",
            youtubeId: "W6NZfCO5SIk",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "document.querySelector, addEventListener, event bubbling, and modifying element classes."
          }
        ],
        tasks: [
          {
            id: "js-task-1",
            title: "Task 1: Arrow Function Creation",
            instructions: "Write an arrow function `const double = (n) => n * 2;` and print `double(7)` to console.",
            starterCode: "const double = (n) => n * 2;\nconsole.log(double(7));\n",
            expectedOutput: "14",
            validationType: "stdout",
            testCode: "14"
          }
        ],
        quiz: {
          id: "js-quiz-1",
          title: "Module 1 Mastery Quiz",
          timeLimitSeconds: 60,
          passingScore: 70,
          questions: [
            {
              question: "Which keyword creates a block-scoped variable that cannot be reassigned?",
              options: ["var", "let", "const", "static"],
              answerIndex: 2,
              explanation: "`const` declares block-scoped constants whose binding cannot be reassigned."
            },
            {
              question: "What is the value of `typeof null` in JavaScript?",
              options: ["'null'", "'object'", "'undefined'", "'boolean'"],
              answerIndex: 1,
              explanation: "Due to a historical bug retained for backwards compatibility, typeof null returns 'object'."
            },
            {
              question: "Which method selects the first element matching a specified CSS selector?",
              options: ["document.select()", "document.querySelector()", "document.find()", "document.getSelector()"],
              answerIndex: 1,
              explanation: "document.querySelector returns the first element matching a given CSS selector."
            },
            {
              question: "What is the result of `2 + '2'` in JavaScript?",
              options: ["4", "'22'", "NaN", "Error"],
              answerIndex: 1,
              explanation: "The + operator concatenates when one operand is a string, producing the string '22'."
            },
            {
              question: "How do you define an arrow function that returns the square of x?",
              options: ["x => x * x", "function(x) { return x * x }", "x -> x * x", "x === x * x"],
              answerIndex: 0,
              explanation: "Arrow functions with a single argument and expression return concise syntax: `x => x * x`."
            }
          ]
        }
      },
      {
        id: "js-mod-2",
        title: "Module 2: Asynchronous JavaScript (Promises & Async/Await)",
        level: "Intermediate",
        duration: "8 Hours",
        description: "The Event Loop, Callbacks, Promises, Fetch API, and async/await syntax.",
        lessons: [
          {
            id: "js-les-4",
            title: "Lesson 4: The Event Loop & Call Stack Mechanics",
            duration: "45m",
            youtubeId: "lfmg-EJ8gm4",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "Single-threaded non-blocking concurrency, microtasks vs macrotasks."
          },
          {
            id: "js-les-5",
            title: "Lesson 5: Promises (.then, .catch, .finally)",
            duration: "50m",
            youtubeId: "jS4aFq5-91M",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "Pending, fulfilled, and rejected promise states, chaining and Promise.all."
          },
          {
            id: "js-les-6",
            title: "Lesson 6: Modern Async/Await & Fetching REST APIs",
            duration: "55m",
            youtubeId: "Z7t1p1Yn7QY",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "Syntactic sugar over promises with try-catch error handling and JSON parsing."
          }
        ],
        tasks: [
          {
            id: "js-task-2",
            title: "Task 2: Async Function Execution",
            instructions: "Write an async function `async function greet() { return 'Hello LearnSphere'; }` and print its resolved value.",
            starterCode: "async function greet() {\n  return 'Hello LearnSphere';\n}\ngreet().then(console.log);\n",
            expectedOutput: "Hello LearnSphere",
            validationType: "stdout",
            testCode: "Hello LearnSphere"
          }
        ],
        quiz: {
          id: "js-quiz-2",
          title: "Module 2 Mastery Quiz",
          timeLimitSeconds: 60,
          passingScore: 70,
          questions: [
            {
              question: "What does an `async` function always return?",
              options: ["A string", "A boolean", "A Promise", "Undefined"],
              answerIndex: 2,
              explanation: "Functions declared with async always wrap their return value in a resolved Promise."
            },
            {
              question: "Which keyword halts execution inside an async function until a Promise settles?",
              options: ["wait", "yield", "await", "defer"],
              answerIndex: 2,
              explanation: "The `await` keyword pauses execution inside an async function until the promise completes."
            },
            {
              question: "What method parses an incoming HTTP response body as JSON in fetch()?",
              options: ["response.toJson()", "response.json()", "JSON.parse(response)", "response.body()"],
              answerIndex: 1,
              explanation: "Calling `await response.json()` reads and parses the JSON response stream."
            },
            {
              question: "Where do Promise resolution callbacks (.then) run in the event loop?",
              options: ["Macrotask queue", "Microtask queue", "Rendering thread", "DOM thread"],
              answerIndex: 1,
              explanation: "Promise handlers are queued in the high-priority microtask queue."
            },
            {
              question: "How do you catch errors when using async/await syntax?",
              options: ["try / catch block", "catch() clause only", "window.onerror only", "if (err)"],
              answerIndex: 0,
              explanation: "async/await pairs naturally with standard synchronous `try { ... } catch (err) { ... }` blocks."
            }
          ]
        }
      },
      {
        id: "js-mod-3",
        title: "Module 3: Advanced Patterns, Closures & Capstone Project",
        level: "Advanced",
        duration: "7 Hours",
        description: "Closures, Prototypes, Array higher-order methods, ES modules, and mini-project.",
        lessons: [
          {
            id: "js-les-7",
            title: "Lesson 7: Closures, Lexical Scope & Currying",
            duration: "50m",
            youtubeId: "W6NZfCO5SIk",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "Retaining access to outer scope variables and private state encapsulation."
          },
          {
            id: "js-les-8",
            title: "Lesson 8: Array Power Methods: map, filter, reduce & flatMap",
            duration: "45m",
            youtubeId: "jS4aFq5-91M",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "Functional array pipelines without mutating original datasets."
          },
          {
            id: "js-les-9",
            title: "Lesson 9: Capstone: Interactive Task Tracker with localStorage",
            duration: "65m",
            youtubeId: "lfmg-EJ8gm4",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "Building an interactive CRUD application with client-side state persistence."
          }
        ],
        tasks: [
          {
            id: "js-task-3",
            title: "Task 3: Array Reduce Accumulation",
            instructions: "Use `[1, 2, 3, 4].reduce((acc, curr) => acc + curr, 0)` and print the total.",
            starterCode: "const sum = [1, 2, 3, 4].reduce((acc, curr) => acc + curr, 0);\nconsole.log(sum);\n",
            expectedOutput: "10",
            validationType: "stdout",
            testCode: "10"
          }
        ],
        quiz: {
          id: "js-quiz-3",
          title: "Module 3 Mastery & Final Assessment",
          timeLimitSeconds: 75,
          passingScore: 70,
          isFinalAssessment: true,
          questions: [
            {
              question: "What is a closure in JavaScript?",
              options: [
                "A syntax error that terminates the program",
                "A function bundled together with references to its surrounding lexical environment",
                "Closing a browser tab",
                "Deleting an object from RAM"
              ],
              answerIndex: 1,
              explanation: "A closure gives a function access to its outer scope even after the outer function has finished executing."
            },
            {
              question: "What is the difference between `==` and `===` in JavaScript?",
              options: [
                "== checks type only, === checks value",
                "== performs type coercion before comparison, while === checks both value and type strictly",
                "There is no difference",
                "=== is only for numbers"
              ],
              answerIndex: 1,
              explanation: "=== enforces strict equality without performing automatic type conversion."
            },
            {
              question: "How do you store a JavaScript object in `localStorage`?",
              options: [
                "localStorage.setItem('user', user)",
                "localStorage.setItem('user', JSON.stringify(user))",
                "localStorage.saveObject(user)",
                "localStorage.set(user)"
              ],
              answerIndex: 1,
              explanation: "localStorage only stores strings, so objects must be serialized with JSON.stringify()."
            },
            {
              question: "What does `Object.freeze(obj)` accomplish?",
              options: [
                "Prevents modifying existing properties, adding new properties, or removing properties",
                "Converts the object to cold storage",
                "Converts all keys to uppercase",
                "Makes the object invisible"
              ],
              answerIndex: 0,
              explanation: "Object.freeze creates an immutable object that cannot be altered in strict mode."
            },
            {
              question: "Which Array method tests whether at least one element passes a provided test function?",
              options: ["every()", "some()", "find()", "includes()"],
              answerIndex: 1,
              explanation: "some() tests whether at least one element satisfies the callback predicate."
            }
          ]
        }
      }
    ]
  },

  // ==========================================
  // 5. C PROGRAMMING (Low-Level Systems)
  // ==========================================
  {
    id: "course-c",
    title: "C Programming: Systems, Pointers & Memory Management",
    shortTitle: "C Programming",
    slug: "c-programming",
    category: "Systems & Architecture",
    level: "Beginner to Advanced",
    duration: "20 Hours",
    totalModules: 3,
    totalLessons: 9,
    rating: 4.92,
    reviewsCount: 3100,
    studentsCount: 17500,
    badge: "⚙️ Core Systems",
    bannerGradient: "from-slate-800 via-indigo-900 to-sky-800",
    description: "Understand computer hardware from the metal up: memory addresses, pointers, dynamic memory allocation (malloc/free), structs, and low-level algorithms.",
    instructor: {
      name: "LearnSphere Faculty & Curators",
      role: "Systems Engineers & Kernel Programmers"
    },
    tutorialOptions: [
      {
        id: "c-tut-1",
        title: "C Programming Tutorial for Beginners",
        channel: "freeCodeCamp.org",
        topic: "Complete 4-hour introduction to C language, pointers and memory",
        level: "Beginner",
        youtubeId: "KJgsSFOSQv0",
        watchUrl: "https://www.youtube.com/watch?v=KJgsSFOSQv0",
        isSearch: false
      },
      {
        id: "c-tut-2",
        title: "C Full Course (Bro Code)",
        channel: "Bro Code",
        topic: "Variables, math, if statements, loops, functions, pointers & structs",
        level: "Beginner to Intermediate",
        youtubeId: "87SH2RN54_w",
        watchUrl: "https://www.youtube.com/watch?v=87SH2RN54_w",
        isSearch: false
      },
      {
        id: "c-tut-3",
        title: "C Programming Full Course Series",
        channel: "Neso Academy",
        topic: "In-depth computer science academic course on C syntax and pointers",
        level: "Beginner to Advanced",
        youtubeId: "rLf3jnHxSmU",
        watchUrl: "https://www.youtube.com/results?search_query=Neso+Academy+C+programming+full+course",
        isSearch: true
      },
      {
        id: "c-tut-4",
        title: "Harvard CS50 C Language Lecture",
        channel: "CS50 / David J. Malan",
        topic: "Memory layout, call stack, heap, buffers, pointers and memory leaks",
        level: "Intermediate to Advanced",
        youtubeId: "e9Eds2Rc_x8",
        watchUrl: "https://www.youtube.com/results?search_query=Harvard+CS50+C+programming+lecture",
        isSearch: true
      }
    ],
    readingResources: [
      { title: "Learn C Interactive Tutorials (learn-c.org)", url: "https://www.learn-c.org/" },
      { title: "GeeksforGeeks C Programming Language Guide", url: "https://www.geeksforgeeks.org/c-programming-language/" }
    ],
    modules: [
      {
        id: "c-mod-1",
        title: "Module 1: C Basics, Data Types & Control Flow",
        level: "Beginner",
        duration: "6 Hours",
        description: "stdio.h, printf/scanf, integers, floats, chars, if conditions, and loops.",
        lessons: [
          {
            id: "c-les-1",
            title: "Lesson 1: Structure of a C Program & printf",
            duration: "35m",
            youtubeId: "KJgsSFOSQv0",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "#include <stdio.h>, main function returning 0, and format specifiers (%d, %f, %s)."
          },
          {
            id: "c-les-2",
            title: "Lesson 2: Data Types, Sizes & Operators",
            duration: "40m",
            youtubeId: "87SH2RN54_w",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "sizeof operator, int (4 bytes), char (1 byte), and arithmetic/bitwise operators."
          },
          {
            id: "c-les-3",
            title: "Lesson 3: Decision Making & Iterations",
            duration: "45m",
            youtubeId: "KJgsSFOSQv0",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "if-else branching, switch statements, for and while loops."
          }
        ],
        tasks: [
          {
            id: "c-task-1",
            title: "Task 1: C Hello World",
            instructions: "Write a standard C program that prints 'Hello, World!' followed by a newline.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}\n",
            expectedOutput: "Hello, World!",
            validationType: "stdout",
            testCode: "Hello, World!"
          }
        ],
        quiz: {
          id: "c-quiz-1",
          title: "Module 1 Mastery Quiz",
          timeLimitSeconds: 60,
          passingScore: 70,
          questions: [
            {
              question: "Which header file is required for `printf()` and `scanf()` in C?",
              options: ["<stdlib.h>", "<stdio.h>", "<string.h>", "<math.h>"],
              answerIndex: 1,
              explanation: "<stdio.h> stands for Standard Input Output header."
            },
            {
              question: "What is the format specifier for printing a signed integer in `printf`?",
              options: ["%f", "%s", "%d", "%c"],
              answerIndex: 2,
              explanation: "%d (or %i) formats signed decimal integers."
            },
            {
              question: "What is the return type of the standard `main()` function in C?",
              options: ["void", "int", "char", "float"],
              answerIndex: 1,
              explanation: "The ANSI/ISO C standard requires `int main()` to return a status code (0 for success)."
            },
            {
              question: "How many bytes does a standard `char` occupy in C?",
              options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"],
              answerIndex: 0,
              explanation: "By definition in the C specification, sizeof(char) is always 1 byte."
            },
            {
              question: "What character terminates every C string in memory?",
              options: ["\\n", "\\0 (null terminator)", ";", "EOF"],
              answerIndex: 1,
              explanation: "C strings are null-terminated byte arrays ending with the '\\0' character."
            }
          ]
        }
      },
      {
        id: "c-mod-2",
        title: "Module 2: Pointers, Arrays & Memory Addresses",
        level: "Intermediate",
        duration: "7 Hours",
        description: "Memory addresses (&), pointer dereferencing (*), pointer arithmetic, and arrays as pointers.",
        lessons: [
          {
            id: "c-les-4",
            title: "Lesson 4: Memory Addresses & Pointer Operators (& and *)",
            duration: "50m",
            youtubeId: "87SH2RN54_w",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "Understanding stack memory layout, declaring pointers, and dereferencing values."
          },
          {
            id: "c-les-5",
            title: "Lesson 5: Pointer Arithmetic & Array Equivalence",
            duration: "45m",
            youtubeId: "KJgsSFOSQv0",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "*(arr + i) vs arr[i], passing pointers to functions (pass-by-reference simulation)."
          },
          {
            id: "c-les-6",
            title: "Lesson 6: Dynamic Memory Allocation (malloc, calloc, free)",
            duration: "55m",
            youtubeId: "e9Eds2Rc_x8",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "Heap allocation, checking for NULL pointers, and avoiding memory leaks."
          }
        ],
        tasks: [
          {
            id: "c-task-2",
            title: "Task 2: Pointer Value Modification",
            instructions: "Create `int val = 10;`, a pointer `int *p = &val;`, change `*p = 50;` and print `val`.",
            starterCode: "#include <stdio.h>\n\nint main() {\n    int val = 10;\n    int *p = &val;\n    *p = 50;\n    printf(\"%d\\n\", val);\n    return 0;\n}\n",
            expectedOutput: "50",
            validationType: "stdout",
            testCode: "50"
          }
        ],
        quiz: {
          id: "c-quiz-2",
          title: "Module 2 Mastery Quiz",
          timeLimitSeconds: 60,
          passingScore: 70,
          questions: [
            {
              question: "What operator is used to obtain the memory address of a variable?",
              options: ["*", "&", "->", "%"],
              answerIndex: 1,
              explanation: "The ampersand `&` is the address-of operator in C."
            },
            {
              question: "What happens if dynamic memory allocated with `malloc()` is never freed before program exit?",
              options: [
                "The computer reboots immediately",
                "A memory leak occurs until the operating system reclaims the process memory",
                "The C compiler throws an error",
                "The memory converts into an array"
              ],
              answerIndex: 1,
              explanation: "Failing to release heap memory creates memory leaks that degrade system performance."
            },
            {
              question: "What does `free(ptr)` do in C?",
              options: [
                "Deletes the pointer variable itself",
                "Releases the heap memory block pointed to by ptr back to the OS allocator",
                "Sets ptr to 0",
                "Clears the screen"
              ],
              answerIndex: 1,
              explanation: "free() relinquishes the dynamically allocated memory block back to the heap."
            },
            {
              question: "What is a segmentation fault (SIGSEGV)?",
              options: [
                "An attempt to access unauthorized or unmapped memory",
                "A fast CPU optimization",
                "A successful file save",
                "An integer overflow"
              ],
              answerIndex: 0,
              explanation: "Segmentation faults happen when code tries to read or write to illegal virtual memory addresses."
            },
            {
              question: "What does `calloc(n, size)` do differently than `malloc(n * size)`?",
              options: [
                "It allocates on the stack",
                "It initializes all allocated bytes to zero",
                "It is 10 times faster",
                "It cannot fail"
              ],
              answerIndex: 1,
              explanation: "calloc zeroes out the allocated memory block before returning the pointer."
            }
          ]
        }
      },
      {
        id: "c-mod-3",
        title: "Module 3: Structs, File I/O & Final Assessment",
        level: "Advanced",
        duration: "7 Hours",
        description: "Custom user types (struct, typedef), arrow operator (->), file I/O (fopen, fclose), and final project.",
        lessons: [
          {
            id: "c-les-7",
            title: "Lesson 7: Structs, Typedef & Nested Structures",
            duration: "50m",
            youtubeId: "87SH2RN54_w",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "Grouping heterogeneous variables, memory alignment, and struct pointers."
          },
          {
            id: "c-les-8",
            title: "Lesson 8: File Input/Output (fopen, fprintf, fscanf, fclose)",
            duration: "45m",
            youtubeId: "KJgsSFOSQv0",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "Writing to and reading from disk files in text and binary modes."
          },
          {
            id: "c-les-9",
            title: "Lesson 9: Capstone: Building a Phonebook Directory in C",
            duration: "65m",
            youtubeId: "e9Eds2Rc_x8",
            videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
            summary: "Constructing an interactive contact management system using structs and dynamic arrays."
          }
        ],
        tasks: [
          {
            id: "c-task-3",
            title: "Task 3: Struct Definition & Member Access",
            instructions: "Define a struct `Point { int x; int y; };`, set `p.x = 5; p.y = 12;`, and print `p.x + p.y`.",
            starterCode: "#include <stdio.h>\n\nstruct Point {\n    int x;\n    int y;\n};\n\nint main() {\n    struct Point p = {5, 12};\n    printf(\"%d\\n\", p.x + p.y);\n    return 0;\n}\n",
            expectedOutput: "17",
            validationType: "stdout",
            testCode: "17"
          }
        ],
        quiz: {
          id: "c-quiz-3",
          title: "Module 3 Mastery & Final Assessment",
          timeLimitSeconds: 75,
          passingScore: 70,
          isFinalAssessment: true,
          questions: [
            {
              question: "Which operator accesses a struct member through a pointer to the struct?",
              options: [".", "->", "::", "&"],
              answerIndex: 1,
              explanation: "The arrow operator `->` dereferences a pointer and accesses the member: `ptr->member`."
            },
            {
              question: "What does `fopen(\"test.txt\", \"w\")` do if the file already exists?",
              options: [
                "Appends to the end",
                "Truncates the file to zero length (overwrites it)",
                "Returns an error",
                "Prompts the user"
              ],
              answerIndex: 1,
              explanation: "Opening in 'w' write mode truncates an existing file to 0 bytes."
            },
            {
              question: "What is a `union` in C?",
              options: [
                "A struct where all members share the same starting memory location",
                "A set of unique numbers",
                "A compiler directive",
                "An operating system thread"
              ],
              answerIndex: 0,
              explanation: "Unions allocate enough memory for their largest member, sharing memory across all fields."
            },
            {
              question: "What value does `fopen()` return if it fails to open a requested file?",
              options: ["-1", "0", "NULL", "EOF"],
              answerIndex: 2,
              explanation: "fopen() returns a NULL pointer on error or failure."
            },
            {
              question: "What does `typedef` accomplish in C?",
              options: [
                "Creates an alias/synonym for an existing data type",
                "Allocates memory",
                "Prints type information",
                "Prevents variable mutation"
              ],
              answerIndex: 0,
              explanation: "typedef gives new alias names to types for cleaner, self-documenting code."
            }
          ]
        }
      }
    ]
  },

  // ==========================================
  // 6. SQL AND DATABASE MANAGEMENT
  // ==========================================
  {
    id: "course-sql",
    title: "SQL and Relational Database Management",
    shortTitle: "SQL & Databases",
    slug: "sql-and-databases",
    category: "Database & Backend",
    level: "Beginner to Advanced",
    duration: "20 Hours",
    totalModules: 3,
    totalLessons: 9,
    rating: 4.97,
    reviewsCount: 5120,
    studentsCount: 26500,
    badge: "📊 Data Essential",
    bannerGradient: "from-teal-600 via-cyan-700 to-indigo-900",
    description: "Master relational databases from scratch: querying data, filtering, joins, aggregations, subqueries, database schemas, indexing, and performance optimization.",
    instructor: {
      name: "LearnSphere Faculty & Curators",
      role: "Lead Database Architects & Data Engineers"
    },
    tutorialOptions: [
      {
        id: "sql-tut-1",
        title: "SQL Tutorial - Full Database Course for Beginners",
        channel: "freeCodeCamp.org",
        topic: "Complete 4-hour SQL fundamentals, schema creation, tables and queries",
        level: "Beginner",
        youtubeId: "HXV3zeQKqGY",
        watchUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
        isSearch: false
      },
      {
        id: "sql-tut-2",
        title: "SQL Tutorial for Beginners",
        channel: "Programming with Mosh",
        topic: "Complete SQL guide: SELECT, JOINs, INSERT, UPDATE, DELETE & Transactions",
        level: "Beginner to Intermediate",
        youtubeId: "7S_tz1z_5bA",
        watchUrl: "https://www.youtube.com/watch?v=7S_tz1z_5bA",
        isSearch: false
      },
      {
        id: "sql-tut-3",
        title: "MySQL Full Course (Bro Code)",
        channel: "Bro Code",
        topic: "MySQL tables, primary keys, foreign keys, views, indexes and procedures",
        level: "Beginner to Intermediate",
        youtubeId: "5OdVJb3qcpg",
        watchUrl: "https://www.youtube.com/watch?v=5OdVJb3qcpg",
        isSearch: false
      },
      {
        id: "sql-tut-4",
        title: "SQL Portfolio Project & Advanced Queries",
        channel: "Alex The Analyst",
        topic: "Window functions, CTEs (Common Table Expressions), partition by & joins",
        level: "Intermediate to Advanced",
        youtubeId: "qfyynHBFOsM",
        watchUrl: "https://www.youtube.com/results?search_query=Alex+The+Analyst+SQL+portfolio+project+course",
        isSearch: true
      }
    ],
    readingResources: [
      { title: "W3Schools SQL Tutorial & Reference", url: "https://www.w3schools.com/sql/" },
      { title: "SQLBolt - Interactive SQL Lessons", url: "https://sqlbolt.com/" }
    ],
    modules: [
      {
        id: "sql-mod-1",
        title: "Module 1: Relational Concepts, SELECT & Filtering",
        level: "Beginner",
        duration: "6 Hours",
        description: "RDBMS tables, SELECT, WHERE, ORDER BY, LIMIT, LIKE, and DISTINCT clauses.",
        lessons: [
          {
            id: "sql-les-1",
            title: "Lesson 1: Introduction to Databases & SELECT Queries",
            duration: "40m",
            youtubeId: "HXV3zeQKqGY",
            videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            summary: "Relational database tables, rows, columns, and retrieving data with SELECT."
          },
          {
            id: "sql-les-2",
            title: "Lesson 2: Filtering with WHERE, AND/OR, IN & BETWEEN",
            duration: "45m",
            youtubeId: "7S_tz1z_5bA",
            videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            summary: "Restricting query results with logical comparison operators and range filters."
          },
          {
            id: "sql-les-3",
            title: "Lesson 3: Sorting (ORDER BY) & Limiting Results",
            duration: "35m",
            youtubeId: "5OdVJb3qcpg",
            videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            summary: "ASC and DESC sorting, pagination with LIMIT and OFFSET."
          }
        ],
        tasks: [
          {
            id: "sql-task-1",
            title: "Task 1: Basic SELECT Query",
            instructions: "Write a SQL query to select `name` and `email` from the `students` table where `active = 1`.",
            starterCode: "SELECT name, email FROM students WHERE active = 1;\n",
            expectedOutput: "SELECT name, email FROM students WHERE active = 1;",
            validationType: "sql",
            testCode: "SELECT"
          }
        ],
        quiz: {
          id: "sql-quiz-1",
          title: "Module 1 Mastery Quiz",
          timeLimitSeconds: 60,
          passingScore: 70,
          questions: [
            {
              question: "Which SQL clause is used to extract only unique distinct values from a column?",
              options: ["UNIQUE", "DISTINCT", "DIFFERENT", "FILTER"],
              answerIndex: 1,
              explanation: "SELECT DISTINCT removes duplicate rows from the returned result set."
            },
            {
              question: "How do you select all records where `country` starts with the letter 'U'?",
              options: [
                "WHERE country LIKE 'U%'",
                "WHERE country = 'U*'",
                "WHERE country IN ('U')",
                "WHERE country STARTS 'U'"
              ],
              answerIndex: 0,
              explanation: "In SQL, the % wildcard matches zero or more characters in LIKE expressions."
            },
            {
              question: "Which clause sorts the result set in descending alphabetical or numeric order?",
              options: ["SORT DESC", "ORDER BY column DESC", "ORDER DOWN", "GROUP DESC"],
              answerIndex: 1,
              explanation: "ORDER BY column_name DESC sorts results from highest to lowest."
            },
            {
              question: "What keyword specifies the number of rows to return from a query?",
              options: ["MAX", "TOP / LIMIT", "BOUND", "COUNT"],
              answerIndex: 1,
              explanation: "LIMIT (or TOP in SQL Server) limits the total number of records returned."
            },
            {
              question: "What does SQL stand for?",
              options: [
                "Structured Query Language",
                "Simple Question Language",
                "Sequential Query Logic",
                "System Quantitative Layout"
              ],
              answerIndex: 0,
              explanation: "SQL stands for Structured Query Language."
            }
          ]
        }
      },
      {
        id: "sql-mod-2",
        title: "Module 2: Aggregations, GROUP BY & Table JOINs",
        level: "Intermediate",
        duration: "7 Hours",
        description: "COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING, INNER JOIN, LEFT JOIN, and RIGHT JOIN.",
        lessons: [
          {
            id: "sql-les-4",
            title: "Lesson 4: Aggregate Functions & GROUP BY",
            duration: "45m",
            youtubeId: "HXV3zeQKqGY",
            videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            summary: "Grouping records, calculating totals, and filtering aggregates with HAVING."
          },
          {
            id: "sql-les-5",
            title: "Lesson 5: Relational JOINs (INNER, LEFT, RIGHT & FULL)",
            duration: "55m",
            youtubeId: "7S_tz1z_5bA",
            videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            summary: "Combining tables based on primary and foreign keys using JOIN conditions."
          },
          {
            id: "sql-les-6",
            title: "Lesson 6: Data Modification: INSERT, UPDATE & DELETE",
            duration: "40m",
            youtubeId: "5OdVJb3qcpg",
            videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            summary: "Inserting records, updating values safely with WHERE, and table truncation."
          }
        ],
        tasks: [
          {
            id: "sql-task-2",
            title: "Task 2: INNER JOIN Query",
            instructions: "Write a SQL query joining `users` and `orders` on `users.id = orders.user_id`.",
            starterCode: "SELECT users.name, orders.amount \nFROM users \nINNER JOIN orders ON users.id = orders.user_id;\n",
            expectedOutput: "INNER JOIN",
            validationType: "sql",
            testCode: "INNER JOIN"
          }
        ],
        quiz: {
          id: "sql-quiz-2",
          title: "Module 2 Mastery Quiz",
          timeLimitSeconds: 60,
          passingScore: 70,
          questions: [
            {
              question: "What is the difference between WHERE and HAVING in SQL?",
              options: [
                "WHERE filters rows before aggregation; HAVING filters grouped rows after aggregation",
                "They are exact synonyms",
                "WHERE is only for strings",
                "HAVING is only for JOINs"
              ],
              answerIndex: 0,
              explanation: "WHERE filters raw rows prior to grouping, while HAVING filters aggregated group metrics."
            },
            {
              question: "Which JOIN returns all rows from the left table and matched rows from the right table?",
              options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "CROSS JOIN"],
              answerIndex: 1,
              explanation: "LEFT (OUTER) JOIN retains all left table rows, populating right table mismatches with NULL."
            },
            {
              question: "What happens if an `UPDATE` statement is executed without a `WHERE` clause?",
              options: [
                "It updates only the first row",
                "It throws a syntax error",
                "It updates EVERY row in the entire table",
                "It does nothing"
              ],
              answerIndex: 2,
              explanation: "Executing UPDATE without a WHERE clause inadvertently updates every record in the table."
            },
            {
              question: "Which aggregate function computes the arithmetic mean of numeric values?",
              options: ["MEAN()", "AVG()", "TOTAL()", "MEDIAN()"],
              answerIndex: 1,
              explanation: "AVG() returns the average value of a numeric column."
            },
            {
              question: "What is a Primary Key?",
              options: [
                "A column that allows duplicates",
                "A unique identifier for each row in a database table that cannot contain NULL values",
                "The password to access the database",
                "The first column created"
              ],
              answerIndex: 1,
              explanation: "A Primary Key uniquely identifies each record and enforces uniqueness and non-null constraints."
            }
          ]
        }
      },
      {
        id: "sql-mod-3",
        title: "Module 3: Subqueries, Indexing, Transactions & Capstone Assessment",
        level: "Advanced",
        duration: "7 Hours",
        description: "Nested subqueries, B-tree indexes, ACID transactions, views, and database optimization.",
        lessons: [
          {
            id: "sql-les-7",
            title: "Lesson 7: Subqueries & Common Table Expressions (CTEs)",
            duration: "50m",
            youtubeId: "qfyynHBFOsM",
            videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            summary: "Correlated subqueries, WITH cte AS (...), and temporary result tables."
          },
          {
            id: "sql-les-8",
            title: "Lesson 8: Database Indexing, B-Trees & Query Optimization",
            duration: "45m",
            youtubeId: "7S_tz1z_5bA",
            videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            summary: "EXPLAIN query plans, index seek vs table scans, and composite indexes."
          },
          {
            id: "sql-les-9",
            title: "Lesson 9: ACID Transactions (BEGIN, COMMIT, ROLLBACK) & Mini-Project",
            duration: "65m",
            youtubeId: "HXV3zeQKqGY",
            videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            summary: "Atomicity, Consistency, Isolation, Durability, and database schema design capstone."
          }
        ],
        tasks: [
          {
            id: "sql-task-3",
            title: "Task 3: Subquery Calculation",
            instructions: "Write a query to select `name` from `employees` where `salary > (SELECT AVG(salary) FROM employees)`.",
            starterCode: "SELECT name FROM employees \nWHERE salary > (SELECT AVG(salary) FROM employees);\n",
            expectedOutput: "AVG(salary)",
            validationType: "sql",
            testCode: "SELECT name FROM employees"
          }
        ],
        quiz: {
          id: "sql-quiz-3",
          title: "Module 3 Mastery & Final Assessment",
          timeLimitSeconds: 75,
          passingScore: 70,
          isFinalAssessment: true,
          questions: [
            {
              question: "What does the 'A' in ACID database transactions stand for?",
              options: ["Authentication", "Atomicity (all-or-nothing execution)", "Availability", "Allocation"],
              answerIndex: 1,
              explanation: "Atomicity guarantees that all statements within a transaction succeed together or all roll back."
            },
            {
              question: "What is the primary benefit of creating an index on a frequently searched column?",
              options: [
                "It makes INSERT and UPDATE operations 10x faster",
                "It drastically speeds up SELECT lookups from O(n) table scans to O(log n) index searches",
                "It reduces disk storage usage",
                "It encrypts the column automatically"
              ],
              answerIndex: 1,
              explanation: "Indexes speed up data retrieval at the minor cost of extra disk space and slower writes."
            },
            {
              question: "What command reverses all modifications made in an uncommitted transaction?",
              options: ["COMMIT", "ROLLBACK", "REVERT", "UNDO"],
              answerIndex: 1,
              explanation: "ROLLBACK restores the database state to the beginning of the transaction."
            },
            {
              question: "What is a Foreign Key constraint?",
              options: [
                "A key stored on a remote server",
                "A field in one table that uniquely identifies a row in another table, enforcing referential integrity",
                "A translation dictionary",
                "A temporary key for guest users"
              ],
              answerIndex: 1,
              explanation: "Foreign keys enforce referential integrity between parent and child tables."
            },
            {
              question: "Which clause introduces a Common Table Expression (CTE)?",
              options: ["USING", "WITH", "DECLARE", "TEMP"],
              answerIndex: 1,
              explanation: "CTEs are defined with the `WITH cte_name AS (...)` clause before the main query."
            }
          ]
        }
      }
    ]
  }
];

// Helper functions for courses
function getCourseById(courseId) {
  return COURSES_DATA.find(c => c.id === courseId) || null;
}

function getAllCategories() {
  const cats = new Set(COURSES_DATA.map(c => c.category));
  return ["All", ...Array.from(cats)];
}

/**
 * Calculates complete student progress according to strict completion rules:
 * - Completed lessons/tutorials
 * - Completed practical coding tasks
 * - Passed quizzes (>= 70%)
 * - Passed final assessment (>= 70%)
 */
function calculateCourseProgress(courseId, userProgress = {}) {
  const course = getCourseById(courseId);
  if (!course) return { percent: 0, completedCount: 0, totalCount: 0, isFinished: false, tasksDone: 0, quizzesDone: 0, finalPassed: false };

  const completedLessonIds = userProgress.completedLessons || [];
  const completedTaskIds = userProgress.completedTasks || [];
  const quizScores = userProgress.quizScores || {}; // { [quizId]: scorePercent }

  let totalItems = 0;
  let finishedItems = 0;

  let totalLessons = 0;
  let lessonsDone = 0;

  let totalTasks = 0;
  let tasksDone = 0;

  let totalQuizzes = 0;
  let quizzesPassed = 0;

  let hasFinalAssessment = false;
  let finalPassed = false;

  course.modules.forEach(mod => {
    // Lessons
    if (mod.lessons) {
      mod.lessons.forEach(les => {
        totalItems++;
        totalLessons++;
        if (completedLessonIds.includes(les.id)) {
          finishedItems++;
          lessonsDone++;
        }
      });
    }

    // Coding Tasks
    if (mod.tasks) {
      mod.tasks.forEach(task => {
        totalItems++;
        totalTasks++;
        if (completedTaskIds.includes(task.id)) {
          finishedItems++;
          tasksDone++;
        }
      });
    }

    // Module Quiz
    if (mod.quiz) {
      totalItems++;
      totalQuizzes++;
      if (mod.quiz.isFinalAssessment) {
        hasFinalAssessment = true;
      }
      const score = quizScores[mod.quiz.id];
      if (score !== undefined && score >= (mod.quiz.passingScore || 70)) {
        finishedItems++;
        quizzesPassed++;
        if (mod.quiz.isFinalAssessment) {
          finalPassed = true;
        }
      }
    }
  });

  const percent = totalItems > 0 ? Math.round((finishedItems / totalItems) * 100) : 0;
  
  // Strictest completion requirement: ALL items done and final assessment passed
  const isFinished = totalItems > 0 && finishedItems === totalItems && (!hasFinalAssessment || finalPassed);

  return {
    percent,
    completedCount: finishedItems,
    totalCount: totalItems,
    lessonsDone,
    totalLessons,
    tasksDone,
    totalTasks,
    quizzesPassed,
    totalQuizzes,
    finalPassed,
    isFinished
  };
}
