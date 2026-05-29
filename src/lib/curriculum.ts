// ============================================
// C++ LEARNING PLATFORM - COMPLETE CURRICULUM
// ============================================

export interface Topic {
  id: string;
  title: string;
  phaseId: string;
  phaseTitle: string;
  subtopics: string[];
  story: string;
  memoryViz: string;
  stepByStep: { line: string; explanation: string; memoryChange: string; output: string }[];
  code: string;
  syntaxCard: { title: string; content: string };
  mistakes: { wrong: string; correct: string; explanation: string }[];
  leetcode: { problem: string; approach: string; dryRun: string; code: string; complexity: string };
  checkpoint: { question: string; options: string[]; answer: number };
}

export interface Phase {
  id: string;
  title: string;
  icon: string;
  color: string;
  topics: { id: string; title: string }[];
}

export const phases: Phase[] = [
  {
    id: "phase-1",
    title: "C++ Foundation",
    icon: "🧱",
    color: "from-emerald-500 to-teal-600",
    topics: [
      { id: "1.1", title: "What is Programming?" },
      { id: "1.2", title: "Variables & Data Types" },
      { id: "1.3", title: "Operators" },
      { id: "1.4", title: "Input & Output" },
      { id: "1.5", title: "Conditionals" },
      { id: "1.6", title: "Loops" },
      { id: "1.7", title: "Functions" },
      { id: "1.8", title: "Arrays" },
      { id: "1.9", title: "Strings" },
      { id: "1.10", title: "Pointers & References" },
      { id: "1.11", title: "Dynamic Memory" },
      { id: "1.12", title: "Structures" },
      { id: "1.13", title: "Enumerations" },
      { id: "1.14", title: "Namespaces" },
      { id: "1.15", title: "Header Files & Macros" },
      { id: "1.16", title: "Templates" },
      { id: "1.17", title: "Exception Handling" },
    ],
  },
  {
    id: "phase-2",
    title: "STL Module",
    icon: "📦",
    color: "from-violet-500 to-purple-600",
    topics: [
      { id: "2.1", title: "Vector" },
      { id: "2.2", title: "Pair & Tuple" },
      { id: "2.3", title: "Stack" },
      { id: "2.4", title: "Queue" },
      { id: "2.5", title: "Deque" },
      { id: "2.6", title: "Priority Queue" },
      { id: "2.7", title: "Set" },
      { id: "2.8", title: "Multiset" },
      { id: "2.9", title: "Unordered Set" },
      { id: "2.10", title: "Map" },
      { id: "2.11", title: "Multimap" },
      { id: "2.12", title: "Unordered Map" },
      { id: "2.13", title: "List" },
      { id: "2.14", title: "Forward List" },
      { id: "2.15", title: "Bitset" },
    ],
  },
  {
    id: "phase-3",
    title: "STL Algorithms",
    icon: "⚙️",
    color: "from-amber-500 to-orange-600",
    topics: [
      { id: "3.1", title: "sort()" },
      { id: "3.2", title: "stable_sort()" },
      { id: "3.3", title: "reverse()" },
      { id: "3.4", title: "max_element()" },
      { id: "3.5", title: "min_element()" },
      { id: "3.6", title: "count()" },
      { id: "3.7", title: "find()" },
      { id: "3.8", title: "binary_search()" },
      { id: "3.9", title: "lower_bound()" },
      { id: "3.10", title: "upper_bound()" },
      { id: "3.11", title: "next_permutation()" },
      { id: "3.12", title: "prev_permutation()" },
      { id: "3.13", title: "accumulate()" },
      { id: "3.14", title: "unique()" },
      { id: "3.15", title: "fill()" },
      { id: "3.16", title: "copy()" },
      { id: "3.17", title: "rotate()" },
      { id: "3.18", title: "nth_element()" },
    ],
  },
  {
    id: "phase-4",
    title: "Problem Solving Patterns",
    icon: "🧩",
    color: "from-rose-500 to-pink-600",
    topics: [
      { id: "4.1", title: "Brute Force" },
      { id: "4.2", title: "Prefix Sum" },
      { id: "4.3", title: "Sliding Window" },
      { id: "4.4", title: "Two Pointers" },
      { id: "4.5", title: "Fast & Slow Pointers" },
      { id: "4.6", title: "Binary Search" },
      { id: "4.7", title: "Greedy" },
      { id: "4.8", title: "Hashing" },
      { id: "4.9", title: "Monotonic Stack" },
      { id: "4.10", title: "Monotonic Queue/Deque" },
      { id: "4.11", title: "Recursion" },
      { id: "4.12", title: "Backtracking" },
      { id: "4.13", title: "Divide & Conquer" },
      { id: "4.14", title: "Meet in the Middle" },
    ],
  },
  {
    id: "phase-5",
    title: "Data Structures Deep Dive",
    icon: "🌳",
    color: "from-cyan-500 to-blue-600",
    topics: [
      { id: "5.1", title: "Arrays (Advanced)" },
      { id: "5.2", title: "Strings (Advanced)" },
      { id: "5.3", title: "Linked Lists" },
      { id: "5.4", title: "Trees" },
      { id: "5.5", title: "Graphs" },
    ],
  },
  {
    id: "phase-6",
    title: "Dynamic Programming",
    icon: "📊",
    color: "from-lime-500 to-green-600",
    topics: [
      { id: "6.1", title: "Fibonacci" },
      { id: "6.2", title: "0/1 Knapsack" },
      { id: "6.3", title: "Unbounded Knapsack" },
      { id: "6.4", title: "LCS" },
      { id: "6.5", title: "LIS" },
      { id: "6.6", title: "Coin Change" },
      { id: "6.7", title: "Edit Distance" },
      { id: "6.8", title: "Matrix Chain Multiplication" },
      { id: "6.9", title: "Partition Equal Subset Sum" },
      { id: "6.10", title: "Rod Cutting" },
      { id: "6.11", title: "DP on Trees" },
      { id: "6.12", title: "DP on Graphs" },
      { id: "6.13", title: "Bitmask DP" },
    ],
  },
  {
    id: "phase-7",
    title: "Object Oriented Programming",
    icon: "🏗️",
    color: "from-fuchsia-500 to-purple-600",
    topics: [
      { id: "7.1", title: "Classes & Objects" },
      { id: "7.2", title: "Constructors & Destructors" },
      { id: "7.3", title: "Encapsulation" },
      { id: "7.4", title: "Abstraction" },
      { id: "7.5", title: "Inheritance" },
      { id: "7.6", title: "Polymorphism" },
      { id: "7.7", title: "Virtual Functions" },
      { id: "7.8", title: "Operator Overloading" },
      { id: "7.9", title: "Friend Functions & Classes" },
      { id: "7.10", title: "Static Members" },
      { id: "7.11", title: "Templates in OOP" },
    ],
  },
  {
    id: "phase-8",
    title: "Interview Preparation",
    icon: "🎯",
    color: "from-red-500 to-rose-600",
    topics: [
      { id: "8.1", title: "LeetCode Problem Track" },
      { id: "8.2", title: "C++ Interview Questions" },
      { id: "8.3", title: "OOP Interview Questions" },
      { id: "8.4", title: "DSA Interview Questions" },
      { id: "8.5", title: "System Design Basics" },
      { id: "8.6", title: "DBMS Quick Revision" },
      { id: "8.7", title: "OS Quick Revision" },
      { id: "8.8", title: "Computer Networks" },
      { id: "8.9", title: "Mock Interview Simulator" },
    ],
  },
];

// ============================================
// DETAILED TOPIC CONTENT
// ============================================

export const topicContent: Record<string, Topic> = {
  "1.1": {
    id: "1.1",
    title: "What is Programming?",
    phaseId: "phase-1",
    phaseTitle: "C++ Foundation",
    subtopics: ["What computers do", "What code is", "Why C++ exists", "Compilation pipeline"],
    story: `Imagine you have a robot butler named **Blinky**. Blinky is incredibly fast and never gets tired — but Blinky is completely stupid. He will only do exactly what you tell him, in the exact order you say it.

You want Blinky to make you a sandwich. So you write a list:

1. Open the fridge
2. Take out bread
3. Take out butter
4. Put butter on bread
5. Close the fridge
6. Bring sandwich to me

That list of instructions? **That's a program.**

Forget step 2? Blinky puts butter on nothing. That's a **bug**.
Never say "stop making sandwiches"? Blinky makes them forever. That's an **infinite loop**.

**Programming = writing precise instructions for a computer** so it does exactly what you want, at lightning speed.

**Why C++?** Think of programming languages as different ways to talk to Blinky:
- Python = simple English, easy, but Blinky moves slow
- C = raw machine commands, super fast, but you manage everything manually
- **C++ = the sweet spot** — high-level convenience + raw speed when you need it

C++ was created in 1979 by Bjarne Stroustrup. Today it powers game engines, browsers, operating systems, and competitive programming!`,
    memoryViz: `┌─────────────────────────────────────────────────────────────────────────┐
│                    THE C++ COMPILATION PIPELINE                         │
│                                                                         │
│  ┌───────────┐    ┌──────────────┐    ┌──────────┐    ┌─────────────┐  │
│  │  SOURCE    │    │ PREPROCESSED │    │ OBJECT   │    │ EXECUTABLE  │  │
│  │  CODE     │    │   CODE       │    │  CODE    │    │  (.exe)     │  │
│  │ (.cpp)    │    │              │    │  (.o)    │    │             │  │
│  │           │    │              │    │          │    │             │  │
│  │ main.cpp  │───►│ main.ii     │───►│ main.o   │───►│ program.exe │  │
│  └───────────┘    └──────────────┘    └──────────┘    └─────────────┘  │
│        ▲                ▲                  ▲                ▲           │
│        │                │                  │                │           │
│   You write this   PREPROCESSOR       COMPILER          LINKER        │
│   in a editor       (Step 1)          (Step 2)         (Step 3)       │
└─────────────────────────────────────────────────────────────────────────┘

STEP 1: PREPROCESSOR — The Copy-Paste Robot
  BEFORE:                          AFTER:
  ┌──────────────────┐             ┌──────────────────────────┐
  │#include <iostream│  ────────►  │// 5000+ lines from       │
  │int main() {      │             │// iostream pasted here!  │
  │  cout << "Hi";   │             │int main() {              │
  │}                 │             │  cout << "Hi";           │
  └──────────────────┘             │}                         │
                                   └──────────────────────────┘

STEP 2: COMPILER — The Translator
  C++ code ────────► Machine code (0s and 1s)
  Leaves "sticky notes" for unresolved references (like cout)

STEP 3: LINKER — The Puzzle Solver
  Your .o file  +  Standard Library  ────────►  Complete .exe
  [needs cout]     [cout lives here]            [cout linked!]`,
    stepByStep: [
      { line: '#include <iostream>', explanation: "Tells the preprocessor: copy-paste the iostream library here. This gives us cout and cin.", memoryChange: "No memory change — text replacement only", output: "None" },
      { line: 'using namespace std;', explanation: "Lets us write 'cout' instead of 'std::cout'. The std namespace contains all standard library names.", memoryChange: "No memory change — just a declaration", output: "None" },
      { line: 'int main() {', explanation: "main() is where EVERY C++ program starts. The OS calls this function. 'int' means it returns an integer when done.", memoryChange: "A stack frame for main() is created in RAM", output: "None" },
      { line: '    cout << "Hello, World!" << endl;', explanation: "cout = Console OUTput. << pushes data to the screen. endl moves to next line.", memoryChange: 'String "Hello, World!" loaded, sent to output buffer', output: "Hello, World!" },
      { line: '    return 0;', explanation: "Tells the OS: program finished successfully! (0 = success, non-zero = error)", memoryChange: "main() stack frame is destroyed, memory freed", output: "Process exits with code 0" },
      { line: '}', explanation: "Closing brace marks end of main()", memoryChange: "—", output: "—" },
    ],
    code: `// ============================================
// PROGRAM: My First C++ Program
// PURPOSE: Print a greeting and do basic math
// ============================================

#include <iostream>    // Include the input/output library
                     // Without this, cout and cin won't work

using namespace std;  // Use the "standard" namespace
                     // Lets us write "cout" instead of "std::cout"

// main() is the ENTRY POINT of every C++ program
// The operating system starts executing your code from here
// "int" means this function returns an integer
int main() {
    
    // cout = Console OUTput — prints text to the screen
    // << = insertion operator — pushes data to cout
    // endl = end line — moves cursor to next line
    cout << "Hello, World!" << endl;
    
    // You can chain multiple << operators
    cout << "I am learning C++!" << endl;
    
    // You can print numbers — no quotes needed
    cout << "My favorite number is: " << 42 << endl;
    
    // You can do math inside cout
    cout << "5 + 3 = " << 5 + 3 << endl;
    cout << "10 - 4 = " << 10 - 4 << endl;
    cout << "6 * 7 = " << 6 * 7 << endl;
    
    // return 0 tells the OS: "Everything went well!"
    return 0;
}

// EXPECTED OUTPUT:
// Hello, World!
// I am learning C++!
// My favorite number is: 42
// 5 + 3 = 8
// 10 - 4 = 6
// 6 * 7 = 42`,
    syntaxCard: {
      title: "SYNTAX: Basic C++ Program Structure",
      content: `#include <library>    // Include a library
using namespace std;  // Avoid typing std:: everywhere

int main() {              // Program starts here
    cout << "text";       // Print text (no newline)
    cout << "text" << endl;  // Print text + newline
    cout << number;       // Print a number
    cout << x + y;        // Print result of expression
    return 0;             // Exit successfully
}                          // End of program

KEY POINTS:
• Every statement ends with a semicolon ;
• main() must return int
• { } define a block of code
• // for single-line comments
• Strings go in "double quotes"
• Numbers print without quotes
• endl = newline + flush buffer
• "\\n" = just newline (faster, no flush)`,
    },
    mistakes: [
      { wrong: `cout << "Hello"     // Missing semicolon\ncout << "World";`, correct: `cout << "Hello";   // Semicolon added\ncout << "World";`, explanation: "The compiler uses semicolons to know where one instruction ends. Without ;, it tries to read the next line as part of the same instruction and throws an error." },
      { wrong: `int main() {\n    cout << "Hello";\n}`, correct: `#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello";\n}`, explanation: "Without #include <iostream>, the compiler doesn't know what cout is. Always include the necessary libraries before using their features." },
      { wrong: `#include <iostream>\nint main() {\n    cout << "Hello";  // Missing namespace\n}`, correct: `#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello";\n}\n// OR: std::cout << "Hello";`, explanation: "cout lives inside the std namespace. Either add 'using namespace std;' at the top, or write std::cout every time." },
    ],
    leetcode: {
      problem: "LeetCode #412 — Fizz Buzz\n\nGiven an integer n, return a string array answer (1-indexed) where:\n- answer[i] == \"FizzBuzz\" if i is divisible by 3 and 5\n- answer[i] == \"Fizz\" if i is divisible by 3\n- answer[i] == \"Buzz\" if i is divisible by 5\n- answer[i] == i (as a string) otherwise",
      approach: "This problem tests the most basic programming skill: writing a loop and using conditionals (if/else). We iterate from 1 to n, check divisibility using the modulo operator (%), and build our answer array. The key insight is to check the most specific condition first (divisible by BOTH 3 and 5) before checking individual conditions.",
      dryRun: `Input: n = 5

i=1: 1%3≠0, 1%5≠0 → push "1"       answer = ["1"]
i=2: 2%3≠0, 2%5≠0 → push "2"       answer = ["1","2"]
i=3: 3%3=0, 3%5≠0 → push "Fizz"    answer = ["1","2","Fizz"]
i=4: 4%3≠0, 4%5≠0 → push "4"       answer = ["1","2","Fizz","4"]
i=5: 5%3≠0, 5%5=0 → push "Buzz"    answer = ["1","2","Fizz","4","Buzz"]

Output: ["1","2","Fizz","4","Buzz"]`,
      code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

vector<string> fizzBuzz(int n) {
    vector<string> answer;  // Create empty vector of strings
    
    for (int i = 1; i <= n; i++) {  // Loop from 1 to n
        if (i % 3 == 0 && i % 5 == 0) {    // Divisible by BOTH?
            answer.push_back("FizzBuzz");    // Push "FizzBuzz"
        } else if (i % 3 == 0) {            // Divisible by 3 only?
            answer.push_back("Fizz");        // Push "Fizz"
        } else if (i % 5 == 0) {            // Divisible by 5 only?
            answer.push_back("Buzz");        // Push "Buzz"
        } else {                             // Neither?
            answer.push_back(to_string(i));  // Push number as string
        }
    }
    
    return answer;  // Return the complete answer
}

int main() {
    int n = 15;
    vector<string> result = fizzBuzz(n);
    for (int i = 0; i < result.size(); i++) {
        cout << result[i] << endl;
    }
    return 0;
}`,
      complexity: "Time: O(n) — we visit each number exactly once\nSpace: O(n) — we store n strings in the answer vector",
    },
    checkpoint: {
      question: "In a C++ program, which function does the operating system call first to start execution?",
      options: ["start()", "begin()", "main()", "run()"],
      answer: 2,
    },
  },

  "1.2": {
    id: "1.2",
    title: "Variables & Data Types",
    phaseId: "phase-1",
    phaseTitle: "C++ Foundation",
    subtopics: ["The labeled box analogy", "int, long, float, double, char, bool, string", "Size in bytes", "Signed vs unsigned", "Type overflow", "Declaration, initialization, assignment"],
    story: `Imagine you have a bunch of labeled boxes in a warehouse. Each box has a **name tag** on it and holds exactly **one thing** inside.

- A box labeled "age" contains the number **20**
- A box labeled "grade" contains the letter **'A'**
- A box labeled "isHappy" contains **true**

That's exactly what a **variable** is in programming! A variable is a **named container** in the computer's memory that stores a value.

But here's the catch — not all boxes are the same size:
- A tiny box (bool) holds just yes/no — 1 byte
- A small box (char) holds one letter — 1 byte
- A medium box (int) holds a whole number — 4 bytes
- A big box (double) holds a decimal number — 8 bytes

If you try to put a HUGE number in a small box, it **overflows** — like trying to pour a gallon of water into a cup. The extra spills over and you get wrong results!

**Why does this matter?** Choosing the right box size saves memory and prevents bugs. C++ gives you fine-grained control over exactly how much memory each box uses — that's one reason it's so fast!`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│                    RAM MEMORY LAYOUT                     │
│                                                          │
│  Each row = 1 byte    Address                             │
│                                                          │
│  ┌────┬────┬────┬────┐  0x1000                          │
│  │ 20 │ 00 │ 00 │ 00 │  int age = 20 (4 bytes)          │
│  └────┴────┴────┴────┘                                   │
│  ┌────┬────┬────┬────┬────┬────┬────┬────┐  0x1004      │
│  │ 9A │ 99 │ 99 │ 99 │ 99 │ 99 │ B9 │ 3F │  float gpa  │
│  └────┴────┴────┴────┴────┴────┴────┴────┘  (4 bytes)   │
│  ┌────┐  0x100C                                          │
│  │ 41 │  char grade = 'A' (ASCII 65 = 0x41) (1 byte)    │
│  └────┘                                                   │
│  ┌────┐  0x100D                                          │
│  │ 01 │  bool isHappy = true (1 byte)                    │
│  └────┘                                                   │
│  ┌────┬────┬────┬────┬────┬────┬────┬────┐  0x100E      │
│  │ 2A │ 00 │ 00 │ 00 │ 00 │ 00 │ 00 │ 00 │  long bigNum │
│  └────┴────┴────┴────┴────┴────┴────┴────┘  (8 bytes)   │
│                                                          │
│  DATA TYPE SIZES:                                        │
│  ┌───────────┬──────┬─────────────────────────────┐      │
│  │ Type      │Bytes │ Range                       │      │
│  ├───────────┼──────┼─────────────────────────────┤      │
│  │ bool      │  1   │ true(1) or false(0)         │      │
│  │ char      │  1   │ -128 to 127                 │      │
│  │ int       │  4   │ -2.1B to +2.1B              │      │
│  │ long long │  8   │ -9.2Q to +9.2Q              │      │
│  │ float     │  4   │ ~7 decimal digits           │      │
│  │ double    │  8   │ ~15 decimal digits          │      │
│  │ string    │ var  │ depends on length            │      │
│  └───────────┴──────┴─────────────────────────────┘      │
│                                                          │
│  OVERFLOW: int max = 2,147,483,647                       │
│  2,147,483,647 + 1 = -2,147,483,648  💥 OVERFLOW!       │
│  The number wraps around like a car odometer!            │
└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: 'int age = 20;', explanation: "Create an int variable named 'age' and store 20 in it. 'int' = whole number, 4 bytes.", memoryChange: "4 bytes allocated at some address, value 20 stored", output: "None" },
      { line: 'double gpa = 3.85;', explanation: "Create a double variable for decimal numbers. 8 bytes of precision.", memoryChange: "8 bytes allocated, 3.85 stored in IEEE 754 format", output: "None" },
      { line: 'char grade = \'A\';', explanation: "Create a char variable. Stores a single character using its ASCII code. 'A' = 65.", memoryChange: "1 byte allocated, value 65 (0x41) stored", output: "None" },
      { line: 'bool isHappy = true;', explanation: "Create a boolean variable. Can only be true (1) or false (0).", memoryChange: "1 byte allocated, value 1 stored", output: "None" },
      { line: 'string name = "Alex";', explanation: "Create a string variable. Strings are objects that can hold text of any length.", memoryChange: "String object created, 'A','l','e','x' stored + null terminator", output: "None" },
      { line: 'cout << age << " " << gpa;', explanation: "Print the values stored in variables. We read FROM the box.", memoryChange: "Values read from memory, no change", output: "20 3.85" },
    ],
    code: `#include <iostream>
#include <string>       // Need this for string type
using namespace std;

int main() {
    // ===== DECLARATION + INITIALIZATION =====
    // Type  name  = value;
    
    int age = 20;              // Integer (whole number), 4 bytes
    long long bigNum = 9999999999LL;  // Large integer, 8 bytes
    float pi = 3.14f;          // Decimal number, 4 bytes (f suffix!)
    double precise = 3.14159265358979; // More precise decimal, 8 bytes
    char grade = 'A';          // Single character, 1 byte (single quotes!)
    bool isHappy = true;       // Boolean, 1 byte (true or false)
    string name = "Alex";      // String, variable size (double quotes!)
    
    // ===== PRINTING VARIABLES =====
    cout << "Name: " << name << endl;
    cout << "Age: " << age << endl;
    cout << "Grade: " << grade << endl;
    cout << "GPA: " << precise << endl;
    cout << "Happy? " << isHappy << endl;  // prints 1 for true, 0 for false
    
    // ===== CHECKING SIZE IN BYTES =====
    cout << "\\nSize of int: " << sizeof(int) << " bytes" << endl;
    cout << "Size of long long: " << sizeof(long long) << " bytes" << endl;
    cout << "Size of double: " << sizeof(double) << " bytes" << endl;
    cout << "Size of char: " << sizeof(char) << " bytes" << endl;
    cout << "Size of bool: " << sizeof(bool) << " bytes" << endl;
    
    // ===== INTEGER OVERFLOW DEMONSTRATION =====
    int maxInt = 2147483647;   // Maximum int value
    cout << "\\nMax int: " << maxInt << endl;
    cout << "Max int + 1: " << maxInt + 1 << endl;  // OVERFLOW! Prints negative!
    
    // ===== UNSIGNED TYPES =====
    unsigned int positiveOnly = 4000000000;  // No negatives, but bigger max
    cout << "Unsigned int: " << positiveOnly << endl;
    
    return 0;
}`,
    syntaxCard: {
      title: "SYNTAX: Variables & Data Types",
      content: `// Declaration: type name;
int x;

// Initialization: type name = value;
int x = 10;

// Assignment: name = value; (after declaration)
x = 20;

// COMMON TYPES:
int    num = 42;            // whole number (4 bytes)
long long big = 999999LL;   // big whole number (8 bytes)
float  f = 3.14f;           // decimal (4 bytes, use f suffix)
double d = 3.14159;         // precise decimal (8 bytes)
char   c = 'A';             // single char (1 byte, single quotes)
bool   b = true;            // true/false (1 byte)
string s = "Hello";         // text (variable size, needs #include <string>)

// UNSIGNED (no negative numbers, bigger positive range):
unsigned int pos = 4000000000;

// SIZE CHECK:
sizeof(int)  // returns 4 (bytes)

// CONSTANTS (cannot be changed):
const double PI = 3.14159;`,
    },
    mistakes: [
      { wrong: `char c = "A";  // Double quotes!`, correct: `char c = 'A';  // Single quotes for char`, explanation: "Double quotes create a string (\"A\" is a string with 2 bytes: 'A' + null). Single quotes create a single char (1 byte). char can only hold ONE character." },
      { wrong: `float f = 3.14;  // Missing f suffix`, correct: `float f = 3.14f;  // f suffix tells compiler it's a float`, explanation: "Without the 'f' suffix, 3.14 is treated as a double (8 bytes). The compiler may warn about possible data loss when converting double to float." },
      { wrong: `int max = 2147483647;\nint overflow = max + 1;  // Expecting 2147483648`, correct: `long long max = 2147483647LL;\nlong long safe = (long long)max + 1;  // Use long long for big numbers`, explanation: "When int exceeds 2,147,483,647, it OVERFLOWS and wraps to a negative number! Use long long for numbers that might exceed int's range." },
    ],
    leetcode: {
      problem: "LeetCode #2235 — Add Two Integers\n\nGiven two integers num1 and num2, return the sum of the two integers.\n\nThis is the simplest LeetCode problem — perfect for your first one!",
      approach: "This problem simply tests that you understand variables and basic arithmetic. We declare two integer variables, add them using the + operator, and return the result. It's as straightforward as it gets!",
      dryRun: `Input: num1 = 12, num2 = 5

Step 1: num1 = 12    (stored in memory)
Step 2: num2 = 5     (stored in memory)
Step 3: sum = 12 + 5 = 17
Step 4: return 17

Memory:
┌──────────────┐
│ num1 → 12    │
│ num2 → 5     │
│ sum  → 17    │
└──────────────┘

Output: 17`,
      code: `class Solution {
public:
    int sum(int num1, int num2) {
        // Simply add the two numbers and return
        int result = num1 + num2;
        return result;
    }
};

// Testing it:
#include <iostream>
using namespace std;

int main() {
    Solution sol;
    cout << sol.sum(12, 5) << endl;    // Output: 17
    cout << sol.sum(-10, 4) << endl;   // Output: -6
    cout << sol.sum(0, 0) << endl;     // Output: 0
    return 0;
}`,
      complexity: "Time: O(1) — single addition operation\nSpace: O(1) — only one extra variable",
    },
    checkpoint: {
      question: "What happens when you add 1 to the maximum value of an int (2,147,483,647)?",
      options: ["It becomes 2,147,483,648", "It becomes 0", "It wraps around to -2,147,483,648 (overflow)", "The program crashes"],
      answer: 2,
    },
  },

  "1.3": {
    id: "1.3",
    title: "Operators",
    phaseId: "phase-1",
    phaseTitle: "C++ Foundation",
    subtopics: ["Arithmetic", "Relational", "Logical", "Bitwise", "Assignment", "Ternary", "Precedence"],
    story: `Think of operators as the **verbs** of programming — they DO things to values.

**Arithmetic operators** are like a calculator:
- You have 5 apples. Someone gives you 3 more. That's 5 + 3 = 8.
- You have 10 candies. You eat 4. That's 10 - 4 = 6.
- BUT there's a trap! 5 / 2 = 2 (not 2.5!) in integer division. It's like splitting 5 cookies among 2 friends — each gets 2 whole cookies, and 1 cookie is left over. That leftover is the **modulo** operator: 5 % 2 = 1.

**Relational operators** are like a referee making calls:
- Is 5 > 3? YES (true)
- Is 5 == 5? YES (true)
- Is 5 != 3? YES (true)

**Logical operators** are like combining conditions:
- You can go out IF you finished homework AND it's not raining (&&)
- You can stay home IF you're sick OR it's a holiday (||)
- NOT hungry? (!hungry)

**Bitwise operators** are like flipping switches on a control panel — each switch is a 0 or 1, and you can flip them individually. This is how computers think at the lowest level!`,
    memoryViz: `┌─────────────────────────────────────────────────────────┐
│              ARITHMETIC OPERATORS VISUALIZED            │
│                                                         │
│  5 / 2 = 2  (NOT 2.5!)  ← INTEGER DIVISION TRAP       │
│  ┌───────────────────────────────────┐                  │
│  │ 5 cookies, 2 friends:            │                  │
│  │ Friend 1: 🍪🍪                  │                  │
│  │ Friend 2: 🍪🍪                  │                  │
│  │ Left over: 🍪 ← this is 5 % 2 = 1 │                 │
│  └───────────────────────────────────┘                  │
│                                                         │
│  BITWISE OPERATIONS (on 8-bit numbers):                 │
│                                                         │
│  a = 12  →  0 0 0 0 1 1 0 0                            │
│  b = 10  →  0 0 0 0 1 0 1 0                            │
│  ─────────────────────────                              │
│  a & b   →  0 0 0 0 1 0 0 0  (AND: both 1 → 1)        │
│  a | b   →  0 0 0 0 1 1 1 0  (OR: any 1 → 1)         │
│  a ^ b   →  0 0 0 0 0 1 1 0  (XOR: different → 1)     │
│  ~a      →  1 1 1 1 0 0 1 1  (NOT: flip all bits)     │
│  a << 2  →  0 0 1 1 0 0 0 0  (LEFT SHIFT: ×4)         │
│  a >> 2  →  0 0 0 0 0 0 1 1  (RIGHT SHIFT: ÷4)        │
│                                                         │
│  TRUTH TABLES:                                          │
│  ┌───┬───┬───────┬──────┬───────┐                      │
│  │ A │ B │ A&&B  │ A||B │  !A   │                      │
│  ├───┼───┼───────┼──────┼───────┤                      │
│  │ T │ T │  T    │  T   │  F    │                      │
│  │ T │ F │  F    │  T   │  F    │                      │
│  │ F │ T │  F    │  T   │  T    │                      │
│  │ F │ F │  F    │  F   │  T    │                      │
│  └───┴───┴───────┴──────┴───────┘                      │
└─────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: 'int a = 17, b = 5;', explanation: "Declare two integer variables to demonstrate operators.", memoryChange: "a = 17 @ some address, b = 5 @ another address", output: "None" },
      { line: 'cout << a + b;', explanation: "Addition: 17 + 5 = 22", memoryChange: "Result 22 computed in CPU register, no new variable", output: "22" },
      { line: 'cout << a / b;', explanation: "Integer division: 17 / 5 = 3 (fractional part is DISCARDED)", memoryChange: "Result 3 computed", output: "3" },
      { line: 'cout << a % b;', explanation: "Modulo (remainder): 17 % 5 = 2 (because 17 = 5*3 + 2)", memoryChange: "Result 2 computed", output: "2" },
      { line: 'cout << (a > b);', explanation: "Relational: Is 17 > 5? Yes → returns 1 (true)", memoryChange: "Boolean result 1 computed", output: "1" },
      { line: 'cout << (a == b);', explanation: "Equality: Is 17 == 5? No → returns 0 (false)", memoryChange: "Boolean result 0 computed", output: "0" },
    ],
    code: `#include <iostream>
using namespace std;

int main() {
    // ===== ARITHMETIC OPERATORS =====
    int a = 17, b = 5;
    cout << "a + b = " << a + b << endl;    // 22 (addition)
    cout << "a - b = " << a - b << endl;    // 12 (subtraction)
    cout << "a * b = " << a * b << endl;    // 85 (multiplication)
    cout << "a / b = " << a / b << endl;    // 3  (integer division! NOT 3.4)
    cout << "a % b = " << a % b << endl;    // 2  (remainder/modulo)
    
    // THE INTEGER DIVISION TRAP:
    cout << "5 / 2 = " << 5 / 2 << endl;           // 2 (NOT 2.5!)
    cout << "5.0 / 2 = " << 5.0 / 2 << endl;       // 2.5 (use decimal!)
    
    // ===== RELATIONAL OPERATORS (return true/false) =====
    cout << "\\n(a > b) = " << (a > b) << endl;     // 1 (true)
    cout << "(a < b) = " << (a < b) << endl;       // 0 (false)
    cout << "(a == b) = " << (a == b) << endl;     // 0 (false)
    cout << "(a != b) = " << (a != b) << endl;     // 1 (true)
    cout << "(a >= b) = " << (a >= b) << endl;     // 1 (true)
    cout << "(a <= b) = " << (a <= b) << endl;     // 0 (false)
    
    // ===== LOGICAL OPERATORS =====
    bool x = true, y = false;
    cout << "\\n(x && y) = " << (x && y) << endl;   // 0 (AND: both must be true)
    cout << "(x || y) = " << (x || y) << endl;     // 1 (OR: at least one true)
    cout << "(!x) = " << (!x) << endl;             // 0 (NOT: flips true/false)
    
    // ===== ASSIGNMENT OPERATORS =====
    int n = 10;
    n += 5;   cout << "n += 5: " << n << endl;    // 15 (same as n = n + 5)
    n -= 3;   cout << "n -= 3: " << n << endl;    // 12
    n *= 2;   cout << "n *= 2: " << n << endl;    // 24
    n /= 4;   cout << "n /= 4: " << n << endl;    // 6
    n %= 4;   cout << "n %= 4: " << n << endl;    // 2
    
    // ===== TERNARY OPERATOR =====
    int age = 20;
    string result = (age >= 18) ? "Adult" : "Minor";
    cout << "\\nTernary: " << result << endl;       // Adult
    
    // ===== INCREMENT / DECREMENT =====
    int c = 5;
    cout << "c++ = " << c++ << endl;  // prints 5, THEN c becomes 6
    cout << "++c = " << ++c << endl;  // c becomes 7, THEN prints 7
    
    return 0;
}`,
    syntaxCard: {
      title: "SYNTAX: Operators",
      content: `// ARITHMETIC:  +  -  *  /  %  ++  --
5 / 2 = 2      // integer division (trap!)
5.0 / 2 = 2.5  // float division
5 % 2 = 1      // remainder

// RELATIONAL:  ==  !=  <  >  <=  >=
// Returns: 1 (true) or 0 (false)

// LOGICAL:  && (AND)  || (OR)  ! (NOT)
(x && y)  // true only if BOTH are true
(x || y)  // true if AT LEAST ONE is true
(!x)      // flips true ↔ false

// BITWISE:  &  |  ^  ~  <<  >>
12 & 10 = 8     // AND on bits
12 | 10 = 14    // OR on bits
12 ^ 10 = 6     // XOR on bits
~12 = -13       // NOT (flip all bits)
12 << 2 = 48    // left shift (= multiply by 2^n)
12 >> 2 = 3     // right shift (= divide by 2^n)

// ASSIGNMENT:  =  +=  -=  *=  /=  %=
n += 5;  // same as n = n + 5;

// TERNARY:
condition ? value_if_true : value_if_false
int max = (a > b) ? a : b;`,
    },
    mistakes: [
      { wrong: `if (a = 5) { ... }  // Using = instead of ==`, correct: `if (a == 5) { ... }  // == for comparison`, explanation: "Single = is ASSIGNMENT (sets a to 5). Double == is COMPARISON (checks if a equals 5). Using = in an if-statement is ALWAYS a bug, but the compiler won't always catch it!" },
      { wrong: `int result = 5 / 2;  // Expecting 2.5`, correct: `double result = 5.0 / 2;  // Use at least one decimal`, explanation: "When both operands are integers, C++ performs INTEGER division, which truncates the decimal. Make at least one operand a decimal (5.0) to get float division." },
      { wrong: `int c = 5;\ncout << c++ << c++;  // Expecting 5 then 6`, correct: `int c = 5;\ncout << c++ << endl;  // 5\ncout << c++ << endl;  // 6`, explanation: "Multiple ++ on the same variable in one statement is undefined behavior. Always put increment/decrement on separate lines to be safe." },
    ],
    leetcode: {
      problem: "LeetCode #1512 — Number of Good Pairs\n\nGiven an array of integers nums, return the number of good pairs. A pair (i, j) is called good if nums[i] == nums[j] and i < j.",
      approach: "We use a nested loop (two loops) to check every possible pair. For each pair (i, j) where i < j, we check if nums[i] equals nums[j]. If it does, we increment our count. This is a brute force approach — simple and correct.",
      dryRun: `Input: nums = [1,2,3,1,1,3]

Checking all pairs (i, j) where i < j:
(0,1): 1≠2  (0,2): 1≠3  (0,3): 1==1 ✓ count=1
(0,4): 1==1 ✓ count=2   (0,5): 1≠3
(1,2): 2≠3  (1,3): 2≠1  (1,4): 2≠1  (1,5): 2≠3
(2,3): 3≠1  (2,4): 3≠1  (2,5): 3==3 ✓ count=3
(3,4): 1==1 ✓ count=4   (3,5): 1≠3
(4,5): 1≠3

Output: 4`,
      code: `class Solution {
public:
    int numIdenticalPairs(vector<int>& nums) {
        int count = 0;  // Initialize counter to 0
        
        // Outer loop: pick first element of pair
        for (int i = 0; i < nums.size(); i++) {
            // Inner loop: pick second element (must come after i)
            for (int j = i + 1; j < nums.size(); j++) {
                // Check if this is a "good pair"
                if (nums[i] == nums[j]) {
                    count++;  // Found one! Increment counter
                }
            }
        }
        
        return count;  // Return total number of good pairs
    }
};`,
      complexity: "Time: O(n²) — nested loops checking all pairs\nSpace: O(1) — only using a counter variable",
    },
    checkpoint: {
      question: "What does 17 / 5 evaluate to in C++ when both are integers?",
      options: ["3.4", "3", "4", "2"],
      answer: 1,
    },
  },

  "1.4": {
    id: "1.4",
    title: "Input & Output",
    phaseId: "phase-1",
    phaseTitle: "C++ Foundation",
    subtopics: ["cout, cin, endl", "getline()", "stringstream", "Formatted output"],
    story: `Think of **cout** as a **megaphone** — you speak into it and your voice goes out to the world (the screen).

Think of **cin** as a **mailbox** — the user drops a message in, and you open it to read what they sent.

But there's a quirk! Imagine your mailbox (cin) only accepts one **word** at a time. If someone types "Hello World", cin only grabs "Hello" and leaves "World" sitting in the mailbox for next time. To grab the ENTIRE line including spaces, you need a bigger mailbox — that's **getline()**.

And **stringstream**? Think of it as a smart assistant that can read a long sentence and break it into individual words or numbers — like slicing a pizza into pieces!`,
    memoryViz: `┌─────────────────────────────────────────────────────────┐
│              INPUT/OUTPUT BUFFER VISUALIZED             │
│                                                         │
│  cout << "Hello" << endl;                              │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐       │
│  │ "Hello"  │ ──► │ OUTPUT   │ ──► │  SCREEN  │       │
│  │  endl    │     │ BUFFER   │     │  DISPLAY │       │
│  └──────────┘     └──────────┘     └──────────┘       │
│                                                         │
│  cin >> name;                                          │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐       │
│  │  KEYBOARD│ ──► │ INPUT    │ ──► │ variable │       │
│  │  "Alex"  │     │ BUFFER   │     │ name     │       │
│  └──────────┘     └──────────┘     └──────────┘       │
│                                                         │
│  THE cin >> TRAP:                                      │
│  User types: "Hello World"                             │
│  cin >> word;  → word = "Hello"  (stops at space!)     │
│  "World" stays in buffer for next read!                 │
│                                                         │
│  getline(cin, line);  → line = "Hello World" (full!)   │
│                                                         │
│  endl vs "\\n":                                        │
│  endl  = newline + FLUSH buffer (slower)                │
│  "\\n"  = newline only (faster, no flush)               │
│  ┌──────────────────────────────┐                      │
│  │ Buffer: [H][e][l][l][o][\\n] │ ← \\n just adds it   │
│  │ Buffer: [FLUSHED TO SCREEN]  │ ← endl forces write  │
│  └──────────────────────────────┘                      │
└─────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: 'int age;\ncout << "Enter age: ";', explanation: "Declare an int variable, then prompt the user. cout displays text asking for input.", memoryChange: "4 bytes allocated for age (garbage value initially)", output: "Enter age: " },
      { line: 'cin >> age;', explanation: "cin reads from keyboard, >> extracts the value and stores it in age. Program PAUSES until user types and presses Enter.", memoryChange: "User's input value stored in age variable", output: "None (waiting for input)" },
      { line: 'cout << "You are " << age << " years old";', explanation: "Chain multiple << operators to print text + variable + more text.", memoryChange: "Values read from memory, no change", output: "You are 20 years old" },
      { line: 'string fullName;\ngetline(cin, fullName);', explanation: "getline reads the ENTIRE line including spaces. cin >> would only read until the first space.", memoryChange: "Full line stored in fullName string", output: "None" },
    ],
    code: `#include <iostream>
#include <string>       // for string and getline
#include <sstream>      // for stringstream
#include <iomanip>      // for setw and setprecision
using namespace std;

int main() {
    // ===== BASIC INPUT/OUTPUT =====
    int age;
    cout << "Enter your age: ";    // Prompt the user
    cin >> age;                     // Read integer from keyboard
    cout << "You are " << age << " years old!" << endl;
    
    // ===== THE cin >> TRAP WITH STRINGS =====
    string firstName;
    cout << "Enter first name: ";
    cin >> firstName;               // Only reads ONE word (stops at space)
    cout << "First name: " << firstName << endl;
    
    // ===== cin leaves newline in buffer! =====
    // After cin >> firstName, there's a '\\n' left in the buffer
    // If we use getline next, it will read that leftover '\\n' as empty input!
    // FIX: use cin.ignore() to discard the leftover newline
    cin.ignore();   // Clear the leftover newline from buffer
    
    // ===== getline FOR FULL LINES =====
    string fullName;
    cout << "Enter full name: ";
    getline(cin, fullName);         // Reads ENTIRE line including spaces
    cout << "Full name: " << fullName << endl;
    
    // ===== STRINGSTREAM — PARSING =====
    string data = "Alex 20 3.85";
    stringstream ss(data);          // Put string into stringstream
    
    string name;
    int age2;
    double gpa;
    ss >> name >> age2 >> gpa;     // Extract values one by one
    cout << "Parsed: " << name << ", " << age2 << ", " << gpa << endl;
    
    // ===== FORMATTED OUTPUT =====
    double pi = 3.14159265358979;
    
    // setprecision — control decimal places
    cout << fixed << setprecision(2);  // 2 decimal places
    cout << "Pi = " << pi << endl;     // Pi = 3.14
    
    cout << setprecision(5);
    cout << "Pi = " << pi << endl;     // Pi = 3.14159
    
    // setw — set minimum width (like column alignment)
    cout << "\\nFormatted Table:" << endl;
    cout << setw(15) << "Name" << setw(10) << "Age" << setw(10) << "GPA" << endl;
    cout << setw(15) << "Alex" << setw(10) << 20 << setw(10) << 3.85 << endl;
    cout << setw(15) << "Bob" << setw(10) << 22 << setw(10) << 3.92 << endl;
    
    return 0;
}`,
    syntaxCard: {
      title: "SYNTAX: Input & Output",
      content: `// OUTPUT:
cout << "text";              // print text
cout << 42;                  // print number
cout << "x=" << x << endl;  // chained, with newline
cout << "x=" << x << "\\n";  // same but faster (no flush)

// INPUT:
cin >> x;                    // read one value
cin >> a >> b >> c;          // read multiple values

// FULL LINE INPUT:
string line;
getline(cin, line);          // read entire line (with spaces)
// IMPORTANT: after cin >>, use cin.ignore() before getline!

// STRINGSTREAM:
#include <sstream>
stringstream ss("Hello 42 3.14");
ss >> word >> num >> dec;    // parse mixed data from string

// FORMATTED OUTPUT:
#include <iomanip>
cout << fixed << setprecision(2);  // 2 decimal places
cout << setw(10) << value;         // minimum width 10
cout << setfill('0') << setw(5) << 42;  // "00042"`,
    },
    mistakes: [
      { wrong: `int n;\nstring s;\ncin >> n;\ngetline(cin, s);  // s will be EMPTY!`, correct: `int n;\nstring s;\ncin >> n;\ncin.ignore();  // Clear the leftover newline!\ngetline(cin, s);`, explanation: "After cin >> n, the newline character (\\n) from pressing Enter stays in the input buffer. getline reads it immediately and thinks you entered an empty string. Always use cin.ignore() between cin >> and getline()." },
      { wrong: `cin >> fullName;  // User types "John Smith"`, correct: `getline(cin, fullName);  // Gets "John Smith"`, explanation: "cin >> stops reading at the first space. If the user types 'John Smith', cin >> only gets 'John'. Use getline() to read the entire line including spaces." },
    ],
    leetcode: {
      problem: "LeetCode #1360 — Number of Days Between Two Dates\n\nGiven two dates, compute the number of days between them. This problem requires parsing string input into numeric components — perfect for practicing stringstream and string manipulation.",
      approach: "We use stringstream to parse the date string (YYYY-MM-DD) into year, month, and day integers. Then we convert each date to a total number of days from a reference point, and subtract to find the difference. The tricky part is handling leap years correctly.",
      dryRun: `Input: date1 = "2019-06-29", date2 = "2019-06-30"

Parse date1: year=2019, month=6, day=29
Parse date2: year=2019, month=6, day=30

days1 = days from epoch to 2019-06-29
days2 = days from epoch to 2019-06-30

|days2 - days1| = 1

Output: 1`,
      code: `class Solution {
public:
    int daysBetweenDates(string date1, string date2) {
        // Parse dates using stringstream trick
        // Replace '-' with space so >> can extract numbers
        for (char& c : date1) if (c == '-') c = ' ';
        for (char& c : date2) if (c == '-') c = ' ';
        
        stringstream ss1(date1), ss2(date2);
        int y1, m1, d1, y2, m2, d2;
        ss1 >> y1 >> m1 >> d1;
        ss2 >> y2 >> m2 >> d2;
        
        // Convert each date to days and subtract
        return abs(daysFromEpoch(y1, m1, d1) - daysFromEpoch(y2, m2, d2));
    }
    
    int daysFromEpoch(int y, int m, int d) {
        int days = 0;
        // Add days for complete years
        for (int i = 1971; i < y; i++)
            days += isLeap(i) ? 366 : 365;
        // Add days for complete months
        int monthDays[] = {0,31,28,31,30,31,30,31,31,30,31,30,31};
        if (isLeap(y)) monthDays[2] = 29;
        for (int i = 1; i < m; i++)
            days += monthDays[i];
        // Add remaining days
        days += d;
        return days;
    }
    
    bool isLeap(int y) {
        return (y % 4 == 0 && y % 100 != 0) || (y % 400 == 0);
    }
};`,
      complexity: "Time: O(y) where y is the year range for counting days\nSpace: O(1) — constant extra space",
    },
    checkpoint: {
      question: "What must you do before using getline() after cin >> to avoid reading an empty string?",
      options: ["Nothing special", "Use cin.ignore() to clear the leftover newline", "Use cin.clear()", "Declare a new string"],
      answer: 1,
    },
  },

  "1.5": {
    id: "1.5",
    title: "Conditionals",
    phaseId: "phase-1",
    phaseTitle: "C++ Foundation",
    subtopics: ["if/else if/else", "Nested if-else", "switch-case", "Common mistakes"],
    story: `Imagine you're at an amusement park. The ride operator checks your height before letting you on:

- If you're 48 inches or taller → "You can ride!"
- Else if you're 42-47 inches → "You need an adult"
- Else → "Sorry, too short!"

That's exactly how **if / else if / else** works in code! The computer checks conditions one by one from top to bottom, and runs the FIRST one that's true.

**switch-case** is like a vending machine: you press button A1, you get chips. Press B2, you get a soda. Press anything else (default), you get an error. It's perfect when you're checking one variable against many exact values.

**BUT WATCH OUT!** The most dangerous bug for beginners: using **=** (assignment) instead of **==** (comparison) in an if-statement. It's like accidentally pressing the "go" button instead of the "check" button!`,
    memoryViz: `┌─────────────────────────────────────────────────────────┐
│              IF-ELSE FLOWCHART                         │
│                                                         │
│         ┌─────────────┐                                 │
│         │ condition ? │                                 │
│         └──────┬──────┘                                 │
│           ╱         ╲                                   │
│        TRUE        FALSE                                │
│         ╱             ╲                                 │
│  ┌──────────┐   ┌─────────────┐                        │
│  │ if block │   │ else if ?   │                        │
│  └──────────┘   └──────┬──────┘                        │
│                    ╱         ╲                           │
│                 TRUE        FALSE                        │
│                  ╱             ╲                         │
│           ┌───────────┐  ┌──────────┐                  │
│           │else if blk│  │  else    │                  │
│           └───────────┘  └──────────┘                  │
│                                                         │
│  SWITCH-CASE FLOW:                                     │
│  ┌─────────────────────────────┐                       │
│  │ switch(variable) {          │                       │
│  │   case 1: ──► do A; break; │  ← break exits switch │
│  │   case 2: ──► do B; break; │                       │
│  │   case 3: ──► do C; break; │                       │
│  │   default: ──► do Z;       │  ← no match? do this  │
│  │ }                           │                       │
│  └─────────────────────────────┘                       │
│                                                         │
│  WITHOUT break: FALL-THROUGH!                          │
│  case 1: do A;  ← no break, falls into case 2!        │
│  case 2: do B;  ← executes even though case 1 matched │
│  THIS IS A COMMON BUG!                                  │
└─────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: 'int score = 85;', explanation: "Store a test score in a variable.", memoryChange: "score = 85 allocated in memory", output: "None" },
      { line: 'if (score >= 90) {', explanation: "Check: is 85 >= 90? NO → skip this block.", memoryChange: "CPU evaluates condition: 85 >= 90 → false", output: "None" },
      { line: '} else if (score >= 80) {', explanation: "Check: is 85 >= 80? YES → enter this block!", memoryChange: "CPU evaluates: 85 >= 80 → true", output: "None" },
      { line: '    cout << "Grade: B";', explanation: "Since the condition was true, print Grade B.", memoryChange: "No change", output: "Grade: B" },
      { line: '}', explanation: "End of the else-if block. Skip all remaining else-if and else.", memoryChange: "—", output: "—" },
    ],
    code: `#include <iostream>
using namespace std;

int main() {
    // ===== IF / ELSE IF / ELSE =====
    int score = 85;
    
    if (score >= 90) {
        cout << "Grade: A" << endl;
    } else if (score >= 80) {
        cout << "Grade: B" << endl;      // This runs! 85 >= 80
    } else if (score >= 70) {
        cout << "Grade: C" << endl;      // Skipped (already matched above)
    } else if (score >= 60) {
        cout << "Grade: D" << endl;      // Skipped
    } else {
        cout << "Grade: F" << endl;      // Skipped (else = nothing else matched)
    }
    
    // ===== SWITCH-CASE =====
    int day = 3;
    
    switch (day) {
        case 1:
            cout << "Monday" << endl;
            break;          // DON'T forget break!
        case 2:
            cout << "Tuesday" << endl;
            break;
        case 3:
            cout << "Wednesday" << endl;  // This runs!
            break;
        case 4:
            cout << "Thursday" << endl;
            break;
        case 5:
            cout << "Friday" << endl;
            break;
        default:                    // If no case matches
            cout << "Weekend!" << endl;
            break;
    }
    
    // ===== NESTED IF-ELSE =====
    int age = 25;
    bool hasID = true;
    
    if (age >= 18) {
        if (hasID) {
            cout << "You can enter the venue" << endl;
        } else {
            cout << "You need an ID" << endl;
        }
    } else {
        cout << "Too young to enter" << endl;
    }
    
    // ===== THE = vs == BUG =====
    int x = 5;
    // WRONG: if (x = 10) { ... }  // This ASSIGNS 10 to x, then checks if 10 is true!
    // CORRECT:
    if (x == 10) {
        cout << "x is 10" << endl;
    } else {
        cout << "x is not 10" << endl;    // This runs correctly
    }
    
    return 0;
}`,
    syntaxCard: {
      title: "SYNTAX: Conditionals",
      content: `// IF-ELSE
if (condition) {
    // runs when condition is true
} else if (anotherCondition) {
    // runs when first is false, this is true
} else {
    // runs when nothing above matched
}

// SWITCH-CASE
switch (variable) {
    case value1:
        // code for value1
        break;    // EXIT the switch!
    case value2:
        // code for value2
        break;
    default:
        // code if no case matched
        break;
}

// TERNARY (shorthand if-else)
result = (condition) ? valueIfTrue : valueIfFalse;

// IMPORTANT:
// ==  means COMPARE (is it equal?)
// =   means ASSIGN (set it to this value)
// NEVER use = in an if-condition!`,
    },
    mistakes: [
      { wrong: `if (x = 5) { cout << "yes"; }`, correct: `if (x == 5) { cout << "yes"; }`, explanation: "= is assignment (sets x to 5, then evaluates 5 as true). == is comparison (checks if x equals 5). This is the #1 most common beginner bug in C++!" },
      { wrong: `switch(x) {\n  case 1: cout << "one";\n  case 2: cout << "two";\n}`, correct: `switch(x) {\n  case 1: cout << "one"; break;\n  case 2: cout << "two"; break;\n}`, explanation: "Without break, code 'falls through' to the next case. If x=1, it prints 'onetwo'. Always add break at the end of each case (unless you intentionally want fall-through)." },
      { wrong: `if (x > 0);\n  cout << "positive";`, correct: `if (x > 0)\n  cout << "positive";`, explanation: "The semicolon after if() creates an EMPTY if-statement. The cout always runs regardless of the condition! Never put a semicolon right after if()." },
    ],
    leetcode: {
      problem: "LeetCode #976 — Largest Perimeter Triangle\n\nGiven an integer array nums, return the largest perimeter of a triangle with a non-zero area, formed from three of these lengths. If it's impossible, return 0.",
      approach: "A triangle is valid if the sum of any two sides is greater than the third side. For the largest perimeter, we sort the array in descending order and check consecutive triplets. The first valid triplet gives the largest perimeter because we're checking from largest to smallest.",
      dryRun: `Input: nums = [2,1,2]

Sort descending: [2,2,1]
Check: 2, 2, 1 → 2+2>1 ✓, 2+1>2 ✓, 2+1>2 ✓ → VALID!
Perimeter = 2+2+1 = 5

Output: 5`,
      code: `class Solution {
public:
    int largestPerimeter(vector<int>& nums) {
        // Sort in descending order to find largest perimeter first
        sort(nums.begin(), nums.end(), greater<int>());
        
        // Check each consecutive triplet
        for (int i = 0; i < nums.size() - 2; i++) {
            int a = nums[i];     // largest side
            int b = nums[i+1];  // second side
            int c = nums[i+2];  // smallest side
            
            // Triangle inequality: sum of two smaller > largest
            if (b + c > a) {
                return a + b + c;  // Found largest valid perimeter
            }
        }
        
        return 0;  // No valid triangle possible
    }
};`,
      complexity: "Time: O(n log n) for sorting\nSpace: O(1) extra space (sort is in-place)",
    },
    checkpoint: {
      question: "What happens if you forget 'break' in a switch-case statement?",
      options: ["The program crashes", "Code falls through to the next case and executes it too", "The switch exits normally", "Only the default case runs"],
      answer: 1,
    },
  },

  "1.6": {
    id: "1.6",
    title: "Loops",
    phaseId: "phase-1",
    phaseTitle: "C++ Foundation",
    subtopics: ["for loop", "while loop", "do-while loop", "Nested loops", "break & continue", "Infinite loops"],
    story: `Imagine you're doing laundry:

**For loop** = "Wash exactly 5 shirts" — you know exactly how many times to repeat.
- Shirt 1: wash, dry, fold
- Shirt 2: wash, dry, fold
- ...up to Shirt 5

**While loop** = "Keep washing until the basket is empty" — you don't know how many shirts there are, but you keep going while the basket has clothes.

**Do-while loop** = "Try the door. If it's locked, keep trying until it opens" — you ALWAYS try at least once, then check the condition.

**Nested loops** = "For each row in the theater, check each seat" — a loop INSIDE a loop. The outer loop handles rows, the inner loop handles seats.

**break** = "Stop the entire loop right now!" — like hitting the emergency stop button.
**continue** = "Skip this one iteration and move to the next" — like saying "skip this shirt, do the next one."`,
    memoryViz: `┌─────────────────────────────────────────────────────────┐
│              LOOP EXECUTION VISUALIZED                  │
│                                                         │
│  FOR LOOP: for(int i=0; i<5; i++)                      │
│  ┌──────────────────────────────────────────┐          │
│  │ i=0 → check 0<5? YES → run body → i++   │          │
│  │ i=1 → check 1<5? YES → run body → i++   │          │
│  │ i=2 → check 2<5? YES → run body → i++   │          │
│  │ i=3 → check 3<5? YES → run body → i++   │          │
│  │ i=4 → check 4<5? YES → run body → i++   │          │
│  │ i=5 → check 5<5? NO  → EXIT LOOP        │          │
│  └──────────────────────────────────────────┘          │
│                                                         │
│  NESTED LOOP: for i in 0..2, for j in 0..2             │
│  ┌──────────────────────────────────────────┐          │
│  │ i=0: j=0  j=1  j=2                       │          │
│  │ i=1: j=0  j=1  j=2     ← Like a grid!   │          │
│  │ i=2: j=0  j=1  j=2                       │          │
│  └──────────────────────────────────────────┘          │
│  Total iterations: 3 × 3 = 9                           │
│                                                         │
│  BREAK vs CONTINUE:                                     │
│  for(int i=0; i<5; i++) {                              │
│    if(i==2) break;    → exits ENTIRE loop at i=2       │
│    if(i==3) continue; → skips i=3, continues with i=4  │
│  }                                                      │
│                                                         │
│  INFINITE LOOP — NEVER DOES THIS:                       │
│  while(true) { ... }  ← runs forever!                  │
│  for(;;) { ... }      ← also forever!                  │
│  int i=0; while(i<5) { } ← forgot i++! FOREVER!       │
└─────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: 'for (int i = 0; i < 5; i++) {', explanation: "Initialize i=0, check if i<5 (yes), enter loop body.", memoryChange: "i = 0 created in loop scope", output: "None" },
      { line: '    cout << i << " ";', explanation: "Print current value of i.", memoryChange: "No change", output: "0 " },
      { line: '}', explanation: "i++ increments i to 1. Check: 1<5? Yes → loop again.", memoryChange: "i becomes 1, then 2, 3, 4, 5", output: "0 1 2 3 4 " },
      { line: 'int count = 0;\nwhile (count < 3) {', explanation: "Check condition FIRST. If true, enter loop body.", memoryChange: "count = 0", output: "None" },
      { line: '    count++;', explanation: "Increment counter. Without this: INFINITE LOOP!", memoryChange: "count becomes 1, then 2, then 3", output: "None" },
    ],
    code: `#include <iostream>
using namespace std;

int main() {
    // ===== FOR LOOP — when you know how many times =====
    cout << "For loop: ";
    for (int i = 0; i < 5; i++) {   // init; condition; update
        cout << i << " ";            // prints: 0 1 2 3 4
    }
    cout << endl;
    
    // ===== WHILE LOOP — when you don't know the count =====
    cout << "While loop: ";
    int n = 12345;
    int digitCount = 0;
    while (n > 0) {           // keep going while n is positive
        n = n / 10;           // remove last digit
        digitCount++;         // count it
    }
    cout << digitCount << " digits" << endl;  // 5
    
    // ===== DO-WHILE — runs at least once =====
    cout << "Do-while: ";
    int x;
    do {
        // This body runs BEFORE the condition is checked
        x = 42;  // (simulating user input)
    } while (x < 0);   // check AFTER first run
    cout << "x = " << x << endl;
    
    // ===== NESTED LOOPS — like a grid =====
    cout << "\\nNested loops (3x3 grid):" << endl;
    for (int i = 0; i < 3; i++) {       // outer: rows
        for (int j = 0; j < 3; j++) {   // inner: columns
            cout << "(" << i << "," << j << ") ";
        }
        cout << endl;  // new line after each row
    }
    
    // ===== BREAK — exit loop immediately =====
    cout << "\\nBreak demo: ";
    for (int i = 0; i < 10; i++) {
        if (i == 5) break;    // stop at 5!
        cout << i << " ";     // prints: 0 1 2 3 4
    }
    cout << endl;
    
    // ===== CONTINUE — skip this iteration =====
    cout << "Continue demo: ";
    for (int i = 0; i < 6; i++) {
        if (i == 3) continue;  // skip 3!
        cout << i << " ";      // prints: 0 1 2 4 5
    }
    cout << endl;
    
    // ===== RANGE-BASED FOR LOOP (C++11) =====
    cout << "Range-based: ";
    int arr[] = {10, 20, 30, 40, 50};
    for (int val : arr) {
        cout << val << " ";    // prints: 10 20 30 40 50
    }
    cout << endl;
    
    return 0;
}`,
    syntaxCard: {
      title: "SYNTAX: Loops",
      content: `// FOR LOOP (when you know the count)
for (init; condition; update) {
    // body
}
for (int i = 0; i < n; i++) { ... }

// WHILE LOOP (when you don't know the count)
while (condition) {
    // body (must update condition variable!)
}

// DO-WHILE (run at least once)
do {
    // body
} while (condition);  // ← semicolon required!

// RANGE-BASED FOR (iterate over array/container)
for (int val : container) { ... }
for (int& val : container) { ... }  // by reference (can modify)

// BREAK — exit loop immediately
if (condition) break;

// CONTINUE — skip to next iteration
if (condition) continue;

// COMMON INFINITE LOOP MISTAKES:
// while(i < 5) { }        ← forgot i++!
// for(int i=0; i<5; ) { } ← forgot update!`,
    },
    mistakes: [
      { wrong: `int i = 0;\nwhile (i < 5) {\n    cout << i;\n    // forgot i++!\n}`, correct: `int i = 0;\nwhile (i < 5) {\n    cout << i;\n    i++;  // Must update loop variable!\n}`, explanation: "Without i++, the condition i < 5 is ALWAYS true, creating an INFINITE LOOP. The program freezes forever. Always make sure your loop variable is being updated inside the loop." },
      { wrong: `for (int i = 0; i < 5; i++);\n{\n    cout << i;\n}`, correct: `for (int i = 0; i < 5; i++) {\n    cout << i;\n}`, explanation: "The semicolon after the for() creates an empty loop body. The { cout << i; } block runs only ONCE after the loop ends — and i is out of scope! Never put a semicolon between for() and its body." },
      { wrong: `for (int i = 10; i >= 0; i++) {\n    // i++ instead of i--!`, correct: `for (int i = 10; i >= 0; i--) {\n    // i-- to count DOWN`, explanation: "Starting at 10 with i++ means i goes 10, 11, 12, ... forever! The condition i >= 0 is always true. When counting down, use i-- not i++." },
    ],
    leetcode: {
      problem: "LeetCode #1822 — Sign of the Product of an Array\n\nGiven an integer array nums, return 1 if the product of all elements is positive, -1 if negative, and 0 if equal to 0.",
      approach: "We don't need to actually compute the product (it could overflow!). Instead, we loop through the array and track: if we see a 0, the product is 0. Otherwise, count negative numbers. If the count of negatives is even, the product is positive (1). If odd, it's negative (-1).",
      dryRun: `Input: nums = [-1,-2,-3,-4,3,2,1]

Loop through:
-1: negative, negCount=1
-2: negative, negCount=2
-3: negative, negCount=3
-4: negative, negCount=4
3:  positive, negCount=4
2:  positive, negCount=4
1:  positive, negCount=4

negCount=4 (even) → return 1 (positive)

Output: 1`,
      code: `class Solution {
public:
    int arraySign(vector<int>& nums) {
        int negativeCount = 0;  // Count negative numbers
        
        for (int num : nums) {       // Loop through each number
            if (num == 0) {
                return 0;            // Found a zero → product is 0
            }
            if (num < 0) {
                negativeCount++;     // Count negatives
            }
        }
        
        // Even number of negatives = positive product
        // Odd number of negatives = negative product
        return (negativeCount % 2 == 0) ? 1 : -1;
    }
};`,
      complexity: "Time: O(n) — single pass through the array\nSpace: O(1) — only one counter variable",
    },
    checkpoint: {
      question: "What is the key difference between a while loop and a do-while loop?",
      options: ["while is faster than do-while", "do-while checks the condition AFTER running the body (guaranteed at least one run)", "while can't use break", "There is no difference"],
      answer: 1,
    },
  },

  "1.7": {
    id: "1.7",
    title: "Functions",
    phaseId: "phase-1",
    phaseTitle: "C++ Foundation",
    subtopics: ["What is a function", "Declaration vs definition", "Parameters vs arguments", "Return values", "Call stack", "Pass by value vs reference", "Recursion"],
    story: `Think of a function as a **vending machine**:

1. You put money in (these are **arguments/parameters**)
2. You press a button (this is **calling the function**)
3. The machine does its work internally (the **function body**)
4. A snack comes out (this is the **return value**)

For example, a "makeCoffee" function:
- Input: sugar level (1-5)
- Process: grind beans, add sugar, pour hot water
- Output: a cup of coffee

**Why functions?** Imagine you need coffee 10 times a day. Without a function, you'd write all 10 steps every single time. WITH a function, you just say "makeCoffee(3)" and it's done! This is called **DRY** — Don't Repeat Yourself.

**The Call Stack** is like a stack of papers on your desk. Each time you call a function, you put a new paper on top. When a function finishes, you remove the top paper and go back to what you were doing before. This is how the computer remembers where it was!`,
    memoryViz: `┌─────────────────────────────────────────────────────────┐
│              FUNCTION CALL STACK                        │
│                                                         │
│  Code: int add(int a, int b) { return a+b; }           │
│        int main() { int r = add(3, 5); }               │
│                                                         │
│  STEP 1: main() is called by OS                        │
│  ┌──────────────────────────────────┐                  │
│  │ main() stack frame               │                  │
│  │   r = ? (not yet assigned)       │                  │
│  └──────────────────────────────────┘                  │
│                                                         │
│  STEP 2: add(3, 5) is called                           │
│  ┌──────────────────────────────────┐                  │
│  │ add() stack frame    ← TOP       │                  │
│  │   a = 3                          │                  │
│  │   b = 5                          │                  │
│  │   return value = 8               │                  │
│  ├──────────────────────────────────┤                  │
│  │ main() stack frame               │                  │
│  │   r = ?                          │                  │
│  └──────────────────────────────────┘                  │
│                                                         │
│  STEP 3: add() returns 8, frame destroyed              │
│  ┌──────────────────────────────────┐                  │
│  │ main() stack frame               │                  │
│  │   r = 8  ← now assigned!         │                  │
│  └──────────────────────────────────┘                  │
│                                                         │
│  PASS BY VALUE vs REFERENCE:                           │
│  ┌─────────────────┐  ┌─────────────────┐             │
│  │ Pass by VALUE   │  │ Pass by REF     │             │
│  │ func(int x)     │  │ func(int& x)    │             │
│  │ COPY of value   │  │ ORIGINAL var    │             │
│  │ x=10 (copy)     │  │ x→10 (alias)    │             │
│  │ changes lost!   │  │ changes kept!   │             │
│  └─────────────────┘  └─────────────────┘             │
└─────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: 'int add(int a, int b) {', explanation: "Declare a function named 'add' that takes two int parameters and returns an int.", memoryChange: "Function code stored in code segment", output: "None" },
      { line: '    return a + b;', explanation: "Compute a + b and send the result back to the caller.", memoryChange: "Result computed in CPU register", output: "None" },
      { line: '}', explanation: "End of function definition.", memoryChange: "—", output: "—" },
      { line: 'int result = add(3, 5);', explanation: "Call add with arguments 3 and 5. A new stack frame is created with a=3, b=5.", memoryChange: "add() frame: a=3, b=5. Returns 8. Frame destroyed. result=8 in main's frame.", output: "None" },
      { line: 'cout << result;', explanation: "Print the returned value.", memoryChange: "No change", output: "8" },
    ],
    code: `#include <iostream>
using namespace std;

// ===== FUNCTION DECLARATION (prototype) =====
int add(int a, int b);           // Tell compiler this function exists

// ===== FUNCTION DEFINITION =====
int add(int a, int b) {          // Parameters: a and b
    return a + b;                // Return the sum
}

// ===== VOID FUNCTION (no return value) =====
void greet(string name) {        // void = returns nothing
    cout << "Hello, " << name << "!" << endl;
}

// ===== PASS BY REFERENCE =====
void doubleIt(int& x) {          // & means REFERENCE — modifies original!
    x = x * 2;
}

// ===== DEFAULT PARAMETERS =====
void power(string name = "World") {  // Default value if not provided
    cout << "Hello, " << name << "!" << endl;
}

// ===== FUNCTION OVERLOADING =====
int multiply(int a, int b) {     // Version 1: two ints
    return a * b;
}
double multiply(double a, double b) {  // Version 2: two doubles
    return a * b;
}

// ===== RECURSION — function calling itself =====
int factorial(int n) {
    if (n <= 1) return 1;           // Base case: stop recursing!
    return n * factorial(n - 1);     // Recursive case: n * (n-1)!
}

int main() {
    // Basic function call
    int result = add(3, 5);          // Arguments: 3 and 5
    cout << "3 + 5 = " << result << endl;  // 8
    
    // Void function
    greet("Alex");
    
    // Pass by reference
    int num = 10;
    doubleIt(num);                   // num is NOW 20 (original changed!)
    cout << "Doubled: " << num << endl;
    
    // Default parameters
    power();                         // Hello, World! (uses default)
    power("Alex");                   // Hello, Alex! (overrides default)
    
    // Function overloading
    cout << multiply(3, 4) << endl;       // 12 (int version)
    cout << multiply(3.5, 2.0) << endl;   // 7.0 (double version)
    
    // Recursion
    cout << "5! = " << factorial(5) << endl;  // 120
    
    return 0;
}`,
    syntaxCard: {
      title: "SYNTAX: Functions",
      content: `// DECLARATION (prototype)
returnType functionName(parameters);

// DEFINITION
returnType functionName(parameters) {
    // body
    return value;  // (skip if void)
}

// PARAMETERS vs ARGUMENTS:
// Parameter: variable in function signature (int a)
// Argument: actual value passed (add(3) → 3 is argument)

// PASS BY VALUE: func(int x)       → copy, original unchanged
// PASS BY REF:   func(int& x)      → alias, original changes!

// DEFAULT PARAMETERS:
void greet(string name = "World");

// OVERLOADING: same name, different parameter types
int add(int a, int b);
double add(double a, double b);

// RECURSION:
int fact(int n) {
    if (n <= 1) return 1;    // BASE CASE (stop!)
    return n * fact(n-1);    // RECURSIVE CASE
}`,
    },
    mistakes: [
      { wrong: `void add(int a, int b) {\n    return a + b;  // void can't return value!`, correct: `int add(int a, int b) {\n    return a + b;  // Return type must match`, explanation: "A void function cannot return a value. If you want to return a result, change the return type from void to the appropriate type (int, double, string, etc.)." },
      { wrong: `void doubleIt(int x) {\n    x = x * 2;  // Only modifies the copy!\n}\nint main() {\n    int n = 5;\n    doubleIt(n);\n    // n is still 5, not 10!`, correct: `void doubleIt(int& x) {\n    x = x * 2;  // Modifies the ORIGINAL!\n}\nint main() {\n    int n = 5;\n    doubleIt(n);\n    // n is now 10`, explanation: "Pass by VALUE creates a COPY — changes inside the function don't affect the original. Use pass by REFERENCE (int&) to modify the original variable." },
      { wrong: `int factorial(int n) {\n    return n * factorial(n-1);  // No base case!`, correct: `int factorial(int n) {\n    if (n <= 1) return 1;  // BASE CASE — stop condition!\n    return n * factorial(n-1);\n}`, explanation: "Without a base case, the function calls itself forever (until the stack overflows and the program crashes). Every recursive function MUST have a stopping condition." },
    ],
    leetcode: {
      problem: "LeetCode #344 — Reverse String\n\nWrite a function that reverses a string. The input string is given as a vector of characters. You must do it in-place with O(1) extra memory.",
      approach: "Use two pointers: one at the start (left) and one at the end (right). Swap the characters at these positions, then move left forward and right backward. Stop when they meet in the middle. This is efficient and uses no extra memory.",
      dryRun: `Input: s = ['h','e','l','l','o']

Step 1: left=0, right=4 → swap 'h' and 'o' → ['o','e','l','l','h']
Step 2: left=1, right=3 → swap 'e' and 'l' → ['o','l','l','e','h']
Step 3: left=2, right=2 → they meet, STOP!

Output: ['o','l','l','e','h']`,
      code: `class Solution {
public:
    void reverseString(vector<char>& s) {
        int left = 0;                    // Start pointer
        int right = s.size() - 1;        // End pointer
        
        while (left < right) {           // Until they meet
            // Swap characters at left and right
            char temp = s[left];
            s[left] = s[right];
            s[right] = temp;
            
            left++;    // Move left forward
            right--;   // Move right backward
        }
    }
};`,
      complexity: "Time: O(n) — each element visited once\nSpace: O(1) — only two pointer variables",
    },
    checkpoint: {
      question: "What's the difference between pass by value and pass by reference?",
      options: ["They're the same thing", "Pass by value copies the argument; pass by reference gives the function access to the original variable", "Pass by reference is slower", "Pass by value only works with integers"],
      answer: 1,
    },
  },
};

// ============================================
// MERGE ALL PHASE CONTENT
// ============================================
import { phase1Remaining } from './curriculum-phase1-remaining';
import { phase2Content } from './curriculum-phase2';
import { phase3Content } from './curriculum-phase3';
import { phase4Content } from './curriculum-phase4';
import { phase5Content, phase6Content } from './curriculum-phase5-6';
import { phase7Content, phase8Content } from './curriculum-phase7-8';

// Merge all topic content into one lookup
const allTopicContent: Record<string, Topic> = {
  ...topicContent,
  ...phase1Remaining,
  ...phase2Content,
  ...phase3Content,
  ...phase4Content,
  ...phase5Content,
  ...phase6Content,
  ...phase7Content,
  ...phase8Content,
};

// Helper function to get topic by ID
export function getTopic(id: string): Topic | undefined {
  return allTopicContent[id];
}

// Helper to get all topic IDs
export function getAllTopicIds(): string[] {
  return phases.flatMap(p => p.topics.map(t => t.id));
}

// Helper to get next topic
export function getNextTopic(currentId: string): string | null {
  const allIds = getAllTopicIds();
  const idx = allIds.indexOf(currentId);
  if (idx === -1 || idx === allIds.length - 1) return null;
  return allIds[idx + 1];
}

// Helper to get previous topic
export function getPrevTopic(currentId: string): string | null {
  const allIds = getAllTopicIds();
  const idx = allIds.indexOf(currentId);
  if (idx <= 0) return null;
  return allIds[idx - 1];
}
