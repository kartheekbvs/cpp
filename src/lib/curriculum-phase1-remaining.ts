import { Topic } from './curriculum';

export const phase1Remaining: Record<string, Topic> = {
  "1.8": {
    id: "1.8",
    title: "Arrays",
    phaseId: "phase-1",
    phaseTitle: "C++ Foundation",
    subtopics: ["Declaration & initialization", "Accessing elements", "Traversal", "2D arrays", "Array decay to pointer"],
    story: `Imagine a **row of mailboxes** outside an apartment building. Each mailbox has a number (0, 1, 2, 3...) and they are all the **same size** — each one holds exactly one letter.

That's an **array** — a collection of boxes of the **same type**, placed **next to each other** in memory, each with an **index number** starting from 0.

Why start from 0? Think of it as "how many steps from the first mailbox." The first mailbox is 0 steps away, the second is 1 step away, the third is 2 steps away...

Here's the key: arrays give you **instant access** to any mailbox. Want mailbox #999? You jump there directly — no need to check mailboxes 0 through 998 first. This is called **O(1) random access**.

But there's a catch! Once you build a row of 10 mailboxes, you **can't add an 11th**. Arrays have a **fixed size** that you decide when you create them. Need more flexibility? That's what vectors are for (we'll learn those in Phase 2).

**2D arrays** are like a parking lot — rows and columns. Row 0 has spots 0,1,2,3... Row 1 has spots 0,1,2,3... You need TWO numbers to find your car: row number and column number.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│                ARRAY MEMORY LAYOUT                       │
│                                                          │
│  int arr[5] = {10, 20, 30, 40, 50};                     │
│                                                          │
│  Index:    [0]    [1]    [2]    [3]    [4]               │
│          ┌──────┬──────┬──────┬──────┬──────┐            │
│  Value:  │  10  │  20  │  30  │  40  │  50  │            │
│          └──────┴──────┴──────┴──────┴──────┘            │
│  Addr:   0x100  0x104  0x108  0x10C  0x110              │
│          ─────── 4 bytes per int ───────                 │
│                                                          │
│  KEY: arr[0] is at address 0x100                        │
│       arr[1] is at address 0x100 + 4 = 0x104           │
│       arr[i] is at address 0x100 + (i * 4)             │
│                                                          │
│  2D ARRAY: int mat[3][4]                                │
│                                                          │
│       Col0  Col1  Col2  Col3                            │
│  Row0 ┌────┬────┬────┬────┐                             │
│       │ 1  │ 2  │ 3  │ 4  │  ← stored first in memory  │
│  Row1 ├────┼────┼────┼────┤                             │
│       │ 5  │ 6  │ 7  │ 8  │  ← stored second           │
│  Row2 ├────┼────┼────┼────┤                             │
│       │ 9  │ 10 │ 11 │ 12 │  ← stored third            │
│       └────┴────┴────┴────┘                             │
│                                                          │
│  In memory (ROW-MAJOR): 1,2,3,4,5,6,7,8,9,10,11,12    │
│  mat[i][j] = base + (i * cols + j) * sizeof(int)        │
└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: 'int arr[5] = {10, 20, 30, 40, 50};', explanation: "Create an array of 5 integers. Memory is allocated as 5 consecutive 4-byte slots.", memoryChange: "20 bytes allocated (5 x 4), values stored contiguously", output: "None" },
      { line: 'cout << arr[0];', explanation: "Access the first element. Index 0 means '0 steps from the start'.", memoryChange: "CPU reads value at base address", output: "10" },
      { line: 'cout << arr[2];', explanation: "Access the third element. Index 2 means '2 steps from the start'. Address = base + 2*4.", memoryChange: "CPU calculates address and reads", output: "30" },
      { line: 'arr[3] = 99;', explanation: "Modify the 4th element. We write 99 into the slot at index 3.", memoryChange: "Value at index 3 changes from 40 to 99", output: "None" },
      { line: 'for(int i=0; i<5; i++) cout << arr[i];', explanation: "Traverse the array from index 0 to 4, printing each element.", memoryChange: "Reads each element sequentially, no changes", output: "10 20 30 99 50" },
      { line: 'int mat[2][3] = {{1,2,3},{4,5,6}};', explanation: "Create a 2D array (2 rows, 3 columns). Stored row-by-row in memory.", memoryChange: "24 bytes allocated (2*3*4), values stored in row-major order", output: "None" },
    ],
    code: `#include <iostream>
using namespace std;

int main() {
    // ===== 1D ARRAY =====
    // Declaration + Initialization
    int arr[5] = {10, 20, 30, 40, 50};
    
    // Print all elements
    cout << "1D Array: ";
    for (int i = 0; i < 5; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    // Modify an element
    arr[2] = 99;  // Change 3rd element
    cout << "After modification: ";
    for (int i = 0; i < 5; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    // Partial initialization (rest = 0)
    int zeros[5] = {1, 2};  // {1, 2, 0, 0, 0}
    cout << "Partial init: ";
    for (int i = 0; i < 5; i++) cout << zeros[i] << " ";
    cout << endl;
    
    // All zeros
    int allZeros[5] = {};  // {0, 0, 0, 0, 0}
    
    // ===== 2D ARRAY =====
    int mat[3][4] = {
        {1,  2,  3,  4},
        {5,  6,  7,  8},
        {9, 10, 11, 12}
    };
    
    cout << "\\n2D Array (Matrix):" << endl;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) {
            cout << mat[i][j] << "\\t";
        }
        cout << endl;
    }
    
    // ===== ARRAY SIZE =====
    // Size of entire array in bytes
    cout << "\\nTotal bytes: " << sizeof(arr) << endl;     // 20
    cout << "Per element: " << sizeof(arr[0]) << endl;      // 4
    cout << "Number of elements: " << sizeof(arr)/sizeof(arr[0]) << endl; // 5
    
    return 0;
}`,
    syntaxCard: {
      title: "SYNTAX: Arrays",
      content: `// 1D ARRAY:
type name[size];              // Declaration
type name[size] = {v1,v2,...}; // With values
type name[] = {v1,v2,...};    // Size auto-deduced

// ACCESS:
arr[index]     // Read element at index
arr[index] = x // Write to element at index

// TRAVERSE:
for (int i = 0; i < n; i++) { arr[i]; }

// 2D ARRAY:
type name[rows][cols];
type name[rows][cols] = {{r1c1,r1c2,...},{r2c1,...}};

// ACCESS:
mat[row][col]

// GET SIZE (compile-time only):
sizeof(arr) / sizeof(arr[0])

// COMMON PITFALLS:
// - Index starts at 0, ends at size-1
// - No bounds checking! arr[5] on arr[5] is UNDEFINED
// - Cannot assign arrays: arr2 = arr1; // ERROR
// - Array decays to pointer when passed to function`,
    },
    mistakes: [
      { wrong: `int arr[5];\ncout << arr[5];  // Accessing index 5`, correct: `int arr[5];\ncout << arr[4];  // Last valid index is 4`, explanation: "An array of size 5 has indices 0-4. Accessing arr[5] reads memory OUTSIDE the array — undefined behavior! Could print garbage, crash, or seem to work." },
      { wrong: `int arr[5] = {1,2,3,4,5};\nint brr[5];\nbrr = arr;  // Trying to copy array`, correct: `int arr[5] = {1,2,3,4,5};\nint brr[5];\nfor(int i=0;i<5;i++) brr[i]=arr[i]; // Copy element by element`, explanation: "You cannot assign one array to another with =. Arrays decay to pointers, and you can't assign to a pointer like that. Copy elements manually or use a loop." },
      { wrong: `int n = 5;\nint arr[n];  // Variable-length array`, correct: `const int n = 5;\nint arr[n];  // Constant size is valid\n// OR: int* arr = new int[n]; // Dynamic allocation`, explanation: "In standard C++, array size must be a compile-time constant. Using a variable (VLA) is a GCC extension but not standard C++. Use const or dynamic allocation." },
    ],
    leetcode: {
      problem: "LeetCode #1929 — Concatenation of Array\n\nGiven an integer array nums of length n, you want to create an array ans of length 2n where ans[i] == nums[i] and ans[i + n] == nums[i] for 0 <= i < n.\n\nReturn the array ans.",
      approach: "We create an array of double the length. The first half is just the original array. The second half is also the original array. So ans[i] = nums[i % n] works perfectly — when i < n, i%n = i, and when i >= n, i%n wraps around.",
      dryRun: `Input: nums = [1,2,1]

Step 1: Create ans[6]
Step 2: i=0: ans[0] = nums[0] = 1, ans[3] = nums[0] = 1
Step 3: i=1: ans[1] = nums[1] = 2, ans[4] = nums[1] = 2
Step 4: i=2: ans[2] = nums[2] = 1, ans[5] = nums[2] = 1

ans = [1,2,1,1,2,1]`,
      code: `class Solution {
public:
    vector<int> getConcatenation(vector<int>& nums) {
        int n = nums.size();
        vector<int> ans(2 * n);  // Double size
        
        for (int i = 0; i < n; i++) {
            ans[i] = nums[i];       // First half
            ans[i + n] = nums[i];   // Second half (copy)
        }
        
        return ans;
    }
};`,
      complexity: "Time: O(n) — single pass through the array\nSpace: O(n) — result array of size 2n",
    },
    checkpoint: {
      question: "In C++, if you declare int arr[5], what are the valid indices for accessing elements?",
      options: ["1 to 5", "0 to 5", "0 to 4", "1 to 4"],
      answer: 2,
    },
  },

  "1.9": {
    id: "1.9",
    title: "Strings",
    phaseId: "phase-1",
    phaseTitle: "C++ Foundation",
    subtopics: ["C-string vs string class", "string methods", "substring", "find", "compare", "concatenation"],
    story: `Think of a **string** as a **necklace of letters**. Each bead on the necklace is one character, and the whole necklace forms a word or sentence.

In the old days of C, strings were just **arrays of characters** with a special **null terminator** (\\0) at the end — like a stop sign that says "the word ends here." So "Hello" was stored as ['H','e','l','l','o','\\0']. If you forgot the stop sign? The computer would keep reading garbage memory until it randomly found a zero!

C++ introduced the **string class** — think of it as a **smart necklace** that:
- **Automatically resizes** (add beads without worrying about space)
- **Knows its own length** (no need to count beads manually)
- **Can be compared** with == (no more strcmp confusion)
- **Can be joined** with + (just clasp two necklaces together)

The string class is one of the biggest quality-of-life improvements in C++ over C. For competitive programming, you'll use it constantly!`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│              C-STRING vs C++ STRING                      │
│                                                          │
│  C-STRING (char array):                                  │
│  char str[] = "Hello";                                   │
│  ┌────┬────┬────┬────┬────┬────┐                        │
│  │ H  │ e  │ l  │ l  │ o  │ \\0 │  ← null terminator!   │
│  └────┴────┴────┴────┴────┴────┘                        │
│  Fixed size, cannot grow, dangerous!                     │
│                                                          │
│  C++ STRING:                                             │
│  string s = "Hello";                                     │
│  ┌────────────────────────────────┐                      │
│  │  size: 5   capacity: 15       │  ← metadata          │
│  │  ┌──┬──┬──┬──┬──┐             │                      │
│  │  │H │e │l │l │o │             │  ← character data    │
│  │  └──┴──┴──┴──┴──┘             │                      │
│  │  Extra space for growth       │                      │
│  └────────────────────────────────┘                      │
│                                                          │
│  STRING OPERATIONS:                                      │
│  s = "Hello"                                             │
│  s + " World" → "Hello World"   // concatenation        │
│  s.length()   → 5               // length               │
│  s.substr(1,3)→ "ell"           // substring            │
│  s.find("ll") → 2               // find position        │
│  s[0]        → 'H'              // access char          │
└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: 'string s = "Hello";', explanation: "Create a string object. The string class manages memory automatically.", memoryChange: "String object created, 'Hello' stored with length 5", output: "None" },
      { line: 's = s + " World";', explanation: "Concatenate two strings using +. The string class handles memory reallocation.", memoryChange: "New memory allocated for 'Hello World', old 'Hello' freed", output: "None" },
      { line: 'cout << s.length();', explanation: "Get the length of the string. Unlike C-strings, no need to count until \\0.", memoryChange: "No change — length is stored as metadata", output: "11" },
      { line: 'cout << s.substr(0, 5);', explanation: "Extract substring starting at index 0, length 5 characters.", memoryChange: "New temporary string 'Hello' created", output: "Hello" },
      { line: 'cout << s.find("World");', explanation: "Find the starting position of 'World' in the string. Returns index.", memoryChange: "No change — search only", output: "6" },
      { line: 's[0] = "h";', explanation: "Modify a single character. Strings are mutable in C++!", memoryChange: "First character changed from 'H' to 'h'", output: "None" },
    ],
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // ===== CREATION =====
    string s1 = "Hello";          // From string literal
    string s2(5, 'x');            // "xxxxx" — 5 copies of 'x'
    string s3(s1);                // Copy of s1
    string s4 = s1 + " World";   // Concatenation
    
    cout << "s1: " << s1 << endl;     // Hello
    cout << "s2: " << s2 << endl;     // xxxxx
    cout << "s4: " << s4 << endl;     // Hello World
    
    // ===== ACCESS =====
    cout << "First char: " << s1[0] << endl;      // H
    cout << "Last char: " << s1.back() << endl;    // o
    cout << "Front: " << s1.front() << endl;       // H
    
    // ===== MODIFICATION =====
    s1.push_back('!');           // Append character
    cout << "After push_back: " << s1 << endl;  // Hello!
    s1.pop_back();               // Remove last character
    cout << "After pop_back: " << s1 << endl;   // Hello
    
    // ===== SUBSTRING & FIND =====
    string text = "Hello, World!";
    cout << "Substring: " << text.substr(7, 5) << endl;  // World
    cout << "Find 'World': " << text.find("World") << endl; // 7
    cout << "Find 'xyz': " << (int)text.find("xyz") << endl; // npos (huge number)
    
    // ===== COMPARISON =====
    string a = "apple", b = "banana";
    cout << "a == b: " << (a == b) << endl;     // 0 (false)
    cout << "a < b: " << (a < b) << endl;       // 1 (true — 'a' < 'b')
    
    // ===== ITERATION =====
    string word = "C++";
    for (int i = 0; i < word.length(); i++) {
        cout << "char[" << i << "] = " << word[i] << endl;
    }
    
    // ===== REVERSE A STRING =====
    string rev = "hello";
    int left = 0, right = rev.length() - 1;
    while (left < right) {
        swap(rev[left], rev[right]);
        left++; right--;
    }
    cout << "Reversed: " << rev << endl;  // olleh
    
    return 0;
}`,
    syntaxCard: {
      title: "SYNTAX: Strings",
      content: `// CREATION:
string s = "Hello";
string s(n, 'x');       // n copies of 'x'
string s2 = s1;         // copy

// CONCATENATION:
s1 + s2    // returns new string
s1 += s2   // append in-place

// ACCESS:
s[i]          // char at index i
s.at(i)       // safe access (throws if out of bounds)
s.front()     // first char
s.back()      // last char

// SIZE:
s.length() / s.size()  // number of chars

// MODIFY:
s.push_back('x')  // append char
s.pop_back()      // remove last char
s.clear()         // empty the string

// SEARCH:
s.find("sub")     // position or string::npos
s.substr(pos, len)// substring

// COMPARE:
s1 == s2 / s1 < s2 / s1 != s2

// ITERATE:
for (char c : s) { ... }
for (int i = 0; i < s.length(); i++) { s[i]; }`,
    },
    mistakes: [
      { wrong: `string s;\ncin >> s;  // User types "Hello World"\ncout << s;  // Prints only "Hello"`, correct: `string s;\ngetline(cin, s);  // Reads entire line\ncout << s;  // Prints "Hello World"`, explanation: "cin >> stops reading at whitespace. Use getline(cin, s) to read an entire line including spaces." },
      { wrong: `string s = "Hello";\nif (s == "hello") { ... }  // Case-sensitive!`, correct: `// Convert to same case first, or use case-insensitive compare\n// For competitive programming, just be aware of case`, explanation: "String comparison is case-sensitive! 'H' and 'h' are different characters. 'Hello' != 'hello'. Always check the problem's case requirements." },
      { wrong: `string s = "Hello";\nfor(int i=0; i<=s.length(); i++) cout << s[i];`, correct: `for(int i=0; i<s.length(); i++) cout << s[i];`, explanation: "s.length() returns 5, so valid indices are 0-4. Using <= accesses s[5] which is the null terminator or out of bounds." },
    ],
    leetcode: {
      problem: "LeetCode #344 — Reverse String\n\nWrite a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.",
      approach: "Use two pointers — one at the start (left) and one at the end (right). Swap the characters at these positions, then move left forward and right backward. Stop when they meet in the middle. This reverses the string in-place without extra memory.",
      dryRun: `Input: s = ['h','e','l','l','o']

Step 1: left=0, right=4 → swap('h','o') → ['o','e','l','l','h']
Step 2: left=1, right=3 → swap('e','l') → ['o','l','l','e','h']
Step 3: left=2, right=2 → meet in middle, STOP

Output: ['o','l','l','e','h']`,
      code: `class Solution {
public:
    void reverseString(vector<char>& s) {
        int left = 0, right = s.size() - 1;
        while (left < right) {
            swap(s[left], s[right]);
            left++;
            right--;
        }
    }
};`,
      complexity: "Time: O(n) — visit each pair once\nSpace: O(1) — only two pointer variables",
    },
    checkpoint: {
      question: "What does the find() method return when the substring is NOT found in a C++ string?",
      options: ["-1", "0", "string::npos", "An empty string"],
      answer: 2,
    },
  },

  "1.10": {
    id: "1.10",
    title: "Pointers & References",
    phaseId: "phase-1",
    phaseTitle: "C++ Foundation",
    subtopics: ["Memory addresses", "Pointer declaration", "Dereferencing", "References vs pointers", "Pointer arithmetic"],
    story: `Imagine every variable is a **house** in a city. Each house has a unique **street address** (like 123 Main Street).

A **pointer** is like a piece of paper with an address written on it. You don't know what's inside the house just by looking at the paper — but you can **go to that address** and look inside. That's called **dereferencing**.

A **reference** is like a **nickname** for a person. If your friend's name is "Alexander" but everyone calls him "Alex" — both names refer to the same person. You can't have a nickname that refers to "nobody" and you can't change a nickname to refer to someone else.

Key differences:
- **Pointer**: Can be null (empty address), can change where it points, needs * to read value
- **Reference**: Cannot be null, cannot rebind, works like the original variable

**Pointer arithmetic** is like walking down the street — if each house is 4 steps apart, and you're at house #0, then going 3 houses forward means walking 12 steps. That's why ptr + 1 moves 4 bytes for an int pointer!`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│            POINTERS & REFERENCES IN MEMORY               │
│                                                          │
│  int x = 42;                                             │
│  int* ptr = &x;   // ptr holds address of x             │
│  int& ref = x;    // ref IS x (nickname)                │
│                                                          │
│  Variable   Memory Address   Value                       │
│  ┌─────┐    0x1000          ┌────┐                      │
│  │  x  │ ────────────────►  │ 42 │                      │
│  └─────┘                    └────┘                      │
│  ┌─────┐    0x2000          ┌────────┐                  │
│  │ ptr │ ────────────────►  │ 0x1000 │ ──┐              │
│  └─────┘                    └────────┘   │              │
│                                          │ ptr points to│
│                                          ▼              │
│                                    ┌────┐               │
│                                    │ 42 │  ← x's value │
│                                    └────┘               │
│  ┌─────┐    ref IS x, no separate memory!               │
│  │ ref │ ────────────────► same as x (0x1000)           │
│  └─────┘                                                 │
│                                                          │
│  POINTER ARITHMETIC:                                     │
│  int arr[] = {10, 20, 30};                               │
│  int* p = arr;   // p points to arr[0]                  │
│                                                          │
│  p      → &arr[0] = 0x100,  *p = 10                    │
│  p + 1  → &arr[1] = 0x104,  *(p+1) = 20  (+4 bytes!)  │
│  p + 2  → &arr[2] = 0x108,  *(p+2) = 30  (+8 bytes!)  │
└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: 'int x = 42;', explanation: "Create an integer variable. It lives at some memory address.", memoryChange: "4 bytes allocated, value 42 stored at address 0x1000", output: "None" },
      { line: 'int* ptr = &x;', explanation: "Create a pointer that stores the ADDRESS of x. & means 'address of'.", memoryChange: "8 bytes allocated for pointer, stores address 0x1000", output: "None" },
      { line: 'cout << *ptr;', explanation: "Dereference the pointer: go to the address stored in ptr and read the value.", memoryChange: "CPU reads from address 0x1000", output: "42" },
      { line: 'int& ref = x;', explanation: "Create a reference to x. ref is now another name for x — same memory.", memoryChange: "No new memory! ref is an alias for x", output: "None" },
      { line: 'ref = 99;', explanation: "Modify x through the reference. Since ref IS x, x also changes.", memoryChange: "Value at 0x1000 changes from 42 to 99", output: "None" },
      { line: 'cout << ptr + 1;', explanation: "Pointer arithmetic: moves forward by sizeof(int) = 4 bytes.", memoryChange: "No change to ptr itself, just computes new address", output: "0x1004" },
    ],
    code: `#include <iostream>
using namespace std;

int main() {
    // ===== POINTERS =====
    int x = 42;
    int* ptr = &x;   // ptr stores the ADDRESS of x
    
    cout << "Value of x: " << x << endl;          // 42
    cout << "Address of x: " << &x << endl;        // 0x...
    cout << "Value of ptr: " << ptr << endl;        // same as &x
    cout << "Dereference ptr: " << *ptr << endl;    // 42
    
    // Modify through pointer
    *ptr = 100;  // Change x via pointer
    cout << "x is now: " << x << endl;   // 100
    
    // ===== REFERENCES =====
    int y = 10;
    int& ref = y;   // ref IS y (must initialize!)
    
    ref = 20;       // Changes y
    cout << "y = " << y << endl;    // 20
    
    // ===== POINTER ARITHMETIC =====
    int arr[] = {10, 20, 30, 40, 50};
    int* p = arr;   // Points to arr[0]
    
    cout << "\\nPointer arithmetic:" << endl;
    cout << "*p = " << *p << endl;           // 10
    cout << "*(p+1) = " << *(p+1) << endl;   // 20
    cout << "*(p+2) = " << *(p+2) << endl;   // 30
    
    // Incrementing pointer
    p++;  // Now points to arr[1]
    cout << "After p++: *p = " << *p << endl; // 20
    
    // ===== NULL POINTER =====
    int* nullPtr = nullptr;  // Points to nothing
    if (nullPtr == nullptr) {
        cout << "\\nPointer is null!" << endl;
    }
    
    // ===== POINTER VS REFERENCE SUMMARY =====
    // Pointer: can be null, can reassign, needs * and &
    // Reference: can't be null, can't reassign, like alias
    
    return 0;
}`,
    syntaxCard: {
      title: "SYNTAX: Pointers & References",
      content: `// POINTER:
int* ptr;       // Declare pointer to int
ptr = &x;       // Assign address of x
*ptr            // Dereference (get value at address)
ptr = nullptr;  // Null pointer

// REFERENCE:
int& ref = x;   // MUST initialize! alias for x
ref = 10;       // Same as x = 10

// ADDRESS-OF:
&x   // gives address of x

// POINTER ARITHMETIC:
ptr + n   // moves n * sizeof(type) bytes
ptr - n   // moves backward
ptr++     // move to next element
ptr--     // move to previous element
ptr1 - ptr2  // number of elements between

// KEY DIFFERENCES:
// Pointer: can be null, can reassign, needs *
// Reference: can't be null, can't reassign, no *

// COMMON USE:
// Pointers: dynamic memory, arrays, polymorphism
// References: function parameters, return values`,
    },
    mistakes: [
      { wrong: `int* ptr;  // Uninitialized pointer\ncout << *ptr;  // Dereferencing garbage!`, correct: `int* ptr = nullptr;  // Initialize to null\nif (ptr != nullptr) cout << *ptr;`, explanation: "An uninitialized pointer contains a RANDOM address. Dereferencing it is undefined behavior — could crash, could print garbage, could seem to work. Always initialize pointers!" },
      { wrong: `int& ref;  // Reference without initializer`, correct: `int x = 10;\nint& ref = x;  // Must initialize at declaration`, explanation: "References MUST be initialized when declared. You can't have a reference that refers to nothing — that's the whole point of references being safer than pointers." },
      { wrong: `int* ptr = &x;\nint y = 20;\nptr = &y;  // ptr now points to y\n// x is NOT affected`, correct: `int& ref = x;\nint y = 20;\nref = y;  // This ASSIGNS y's value to x!\n// ref still refers to x, x becomes 20`, explanation: "Reassigning a pointer changes what it POINTS to. But 'reassigning' a reference actually assigns the VALUE to the original variable. References cannot be rebound!" },
    ],
    leetcode: {
      problem: "LeetCode #1470 — Shuffle the Array\n\nGiven the array nums consisting of 2n elements [x1,x2,...,xn,y1,y2,...,yn], return the array [x1,y1,x2,y2,...,xn,yn].",
      approach: "Create a new array of size 2n. Use two pointers: i starts at 0 (for x values) and j starts at n (for y values). Fill the result array by alternating: result[k] = nums[i] when k is even, nums[j] when k is odd.",
      dryRun: `Input: nums = [2,5,1,3,4,7], n = 3
       x: [2,5,1]  y: [3,4,7]

k=0: result[0] = nums[0] = 2, i=0→1
k=1: result[1] = nums[3] = 3, j=3→4
k=2: result[2] = nums[1] = 5, i=1→2
k=3: result[3] = nums[4] = 4, j=4→5
k=4: result[4] = nums[2] = 1, i=2→3
k=5: result[5] = nums[5] = 7, j=5→6

Output: [2,3,5,4,1,7]`,
      code: `class Solution {
public:
    vector<int> shuffle(vector<int>& nums, int n) {
        vector<int> result(2 * n);
        int i = 0, j = n;  // Two pointers
        
        for (int k = 0; k < 2 * n; k++) {
            if (k % 2 == 0) {
                result[k] = nums[i++];  // Take from x half
            } else {
                result[k] = nums[j++];  // Take from y half
            }
        }
        
        return result;
    }
};`,
      complexity: "Time: O(n) — single pass\nSpace: O(n) — result array",
    },
    checkpoint: {
      question: "What does the & operator do when placed BEFORE a variable name (e.g., &x)?",
      options: ["It creates a reference to x", "It returns the memory address of x", "It performs a bitwise AND", "It dereferences a pointer"],
      answer: 1,
    },
  },

  "1.11": {
    id: "1.11",
    title: "Dynamic Memory",
    phaseId: "phase-1",
    phaseTitle: "C++ Foundation",
    subtopics: ["new & delete", "new[] & delete[]", "Memory leaks", "Smart pointers intro"],
    story: `Imagine you're at a **hotel**. Regular variables are like hotel rooms that the front desk automatically assigns and reclaims when you check out. **Dynamic memory** is like renting an apartment — YOU are responsible for getting the keys (new) and returning them when done (delete).

When you write \`int* p = new int(42);\`, you're asking the computer: "Hey, find me an empty spot in the **heap** (big memory area) and give me its address." The computer gives you the address, and now YOU own that memory.

The golden rule: **Every new needs a delete. Every new[] needs a delete[].**

If you forget to delete? That's a **memory leak** — like checking out of a hotel but keeping the key. The room stays reserved forever, and eventually the hotel runs out of rooms. Your program slows down and crashes.

**Smart pointers** are like automatic checkout — when you leave, the room is automatically freed. We'll learn about unique_ptr and shared_ptr — they're the modern C++ way to avoid memory leaks entirely!`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│              STACK vs HEAP MEMORY                        │
│                                                          │
│  STACK (automatic):          HEAP (dynamic):             │
│  ┌──────────────────┐       ┌──────────────────┐        │
│  │ int x = 10;      │       │ new int(42)      │        │
│  │ int arr[5];      │       │ new int[100]     │        │
│  │                  │       │ new Student()    │        │
│  │ Auto-managed!    │       │                  │        │
│  │ Fast allocation  │       │ YOU manage it!   │        │
│  │ Limited size     │       │ Large size       │        │
│  └──────────────────┘       └──────────────────┘        │
│                                                          │
│  ALLOCATION:                                             │
│  int* p = new int(42);                                  │
│  ┌─────────────────┐                                    │
│  │ STACK: p ───────┼────► HEAP: ┌────┐                  │
│  │ (8 bytes)       │            │ 42 │ (4 bytes)        │
│  └─────────────────┘            └────┘                  │
│                                                          │
│  ARRAY ALLOCATION:                                       │
│  int* arr = new int[5] {1,2,3,4,5};                     │
│  HEAP: ┌───┬───┬───┬───┬───┐                            │
│        │ 1 │ 2 │ 3 │ 4 │ 5 │  ← 20 bytes               │
│        └───┴───┴───┴───┴───┘                            │
│  arr points here ──▲                                     │
│                                                          │
│  MEMORY LEAK:                                            │
│  int* p = new int(42);                                  │
│  p = new int(99);  // Original 42 is LOST forever!      │
│  ┌───┐      ┌───┐                                       │
│  │42 │  ☠   │99 │  ← 42's memory can never be freed     │
│  └───┘      └───┘                                       │
└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: 'int* p = new int(42);', explanation: "Allocate a single int on the heap. new returns the address.", memoryChange: "4 bytes allocated on heap, pointer p on stack", output: "None" },
      { line: 'cout << *p;', explanation: "Dereference the pointer to read the heap value.", memoryChange: "No change — just reading", output: "42" },
      { line: '*p = 100;', explanation: "Modify the heap value through the pointer.", memoryChange: "Heap value changes from 42 to 100", output: "None" },
      { line: 'delete p;', explanation: "Free the heap memory! The 4 bytes are returned to the system.", memoryChange: "Heap memory freed, p now points to invalid location", output: "None" },
      { line: 'int* arr = new int[5];', explanation: "Allocate an array of 5 ints on the heap.", memoryChange: "20 bytes allocated on heap", output: "None" },
      { line: 'delete[] arr;', explanation: "Free the array memory. MUST use delete[] not delete for arrays!", memoryChange: "20 bytes freed, arr now invalid", output: "None" },
    ],
    code: `#include <iostream>
using namespace std;

int main() {
    // ===== SINGLE DYNAMIC ALLOCATION =====
    int* p = new int(42);        // Allocate + initialize
    cout << "Value: " << *p << endl;  // 42
    *p = 100;                    // Modify
    cout << "New value: " << *p << endl;  // 100
    delete p;                    // FREE the memory!
    p = nullptr;                 // Good practice: null the pointer
    
    // ===== DYNAMIC ARRAY =====
    int n;
    cout << "Enter array size: ";
    cin >> n;
    
    int* arr = new int[n];       // Allocate n ints on heap
    for (int i = 0; i < n; i++) {
        arr[i] = i * 10;         // Initialize
    }
    
    cout << "Dynamic array: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    delete[] arr;                // MUST use delete[] for arrays!
    arr = nullptr;
    
    // ===== SMART POINTERS (Modern C++) =====
    #include <memory>
    // unique_ptr: automatically deletes when out of scope
    unique_ptr<int> up = make_unique<int>(42);
    cout << "Smart ptr: " << *up << endl;  // 42
    // No delete needed! Frees automatically!
    
    // shared_ptr: multiple pointers can share ownership
    shared_ptr<int> sp1 = make_shared<int>(99);
    shared_ptr<int> sp2 = sp1;  // Both own the same int
    cout << "Shared count: " << sp1.use_count() << endl;  // 2
    // Deletes when last shared_ptr goes out of scope
    
    return 0;
}`,
    syntaxCard: {
      title: "SYNTAX: Dynamic Memory",
      content: `// SINGLE ALLOCATION:
int* p = new int;         // uninitialized
int* p = new int(42);    // initialized to 42
delete p;                 // free memory
p = nullptr;              // good practice

// ARRAY ALLOCATION:
int* arr = new int[n];   // n elements
delete[] arr;            // MUST use delete[]

// DANGERS:
// Memory leak: new without delete
// Dangling pointer: using pointer after delete
// Double free: deleting same memory twice
// Wrong delete: delete instead of delete[]

// SMART POINTERS (Modern C++11+):
#include <memory>
auto p1 = make_unique<int>(42);   // exclusive ownership
auto p2 = make_shared<int>(42);   // shared ownership

// unique_ptr: can't copy, only move
// shared_ptr: tracks reference count
// No manual delete needed!`,
    },
    mistakes: [
      { wrong: `int* p = new int(42);\n// ... forgot to delete p!\n// Memory leak!`, correct: `int* p = new int(42);\n// ... use p\ndelete p;\np = nullptr;`, explanation: "Every new MUST have a corresponding delete. Without it, the memory is permanently lost (leaked). Over time, leaks accumulate and your program runs out of memory." },
      { wrong: `int* arr = new int[5];\ndelete arr;  // Wrong! Should be delete[]`, correct: `int* arr = new int[5];\ndelete[] arr;  // Correct! Use delete[] for arrays`, explanation: "Using delete instead of delete[] for arrays only frees the first element. The rest of the array leaks. Always match new[] with delete[]." },
      { wrong: `int* p = new int(42);\ndelete p;\ncout << *p;  // Using after delete!`, correct: `int* p = new int(42);\ndelete p;\np = nullptr;\nif (p) cout << *p;  // Safe check`, explanation: "After delete, the pointer still holds the old address (dangling pointer). Dereferencing it is undefined behavior. Set pointer to nullptr after deleting." },
    ],
    leetcode: {
      problem: "LeetCode #1480 — Running Sum of 1d Array\n\nGiven an array nums, return an array runningSum where runningSum[i] = sum(nums[0]...nums[i]).",
      approach: "We iterate through the array once, maintaining a running total. At each position, we add the current element to the running sum and store it. This builds the prefix sum in-place.",
      dryRun: `Input: nums = [1,2,3,4]

i=0: sum = 0+1 = 1, result[0] = 1
i=1: sum = 1+2 = 3, result[1] = 3
i=2: sum = 3+3 = 6, result[2] = 6
i=3: sum = 6+4 = 10, result[3] = 10

Output: [1,3,6,10]`,
      code: `class Solution {
public:
    vector<int> runningSum(vector<int>& nums) {
        int sum = 0;
        for (int i = 0; i < nums.size(); i++) {
            sum += nums[i];       // Add current to running total
            nums[i] = sum;        // Store running sum in-place
        }
        return nums;
    }
};`,
      complexity: "Time: O(n) — single pass\nSpace: O(1) — in-place modification",
    },
    checkpoint: {
      question: "What happens if you use 'delete' instead of 'delete[]' to free a dynamically allocated array?",
      options: ["It works correctly", "Only the first element is properly freed, causing a memory leak", "The entire array is freed correctly", "The program immediately crashes"],
      answer: 1,
    },
  },

  "1.12": {
    id: "1.12",
    title: "Structures",
    phaseId: "phase-1",
    phaseTitle: "C++ Foundation",
    subtopics: ["struct definition", "Member access", "Nested structs", "Struct arrays", "Struct functions"],
    story: `Imagine you're filling out a **student ID card**. It has:
- Name (string)
- Age (int)  
- GPA (double)
- Grade (char)

Instead of creating 4 separate variables for each student, wouldn't it be nice to bundle them into one **container**? That's exactly what a **struct** does — it's a **custom box** that holds multiple related variables together.

Think of a struct as a **form** or **template**. You design the form once, then you can fill out as many copies as you want. Each filled-out copy is called an **object** (or instance).

Structs are the foundation of organizing data in C++. They're also your first step toward Object-Oriented Programming — a struct is basically a class where everything is public by default!`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│              STRUCT MEMORY LAYOUT                        │
│                                                          │
│  struct Student {                                        │
│      string name;  // 32 bytes (pointer + size + cap)   │
│      int age;      // 4 bytes                            │
│      double gpa;   // 8 bytes                            │
│      char grade;   // 1 byte + 3 padding                 │
│  };                                                      │
│                                                          │
│  Student s1 = {"Alex", 20, 3.85, 'A'};                  │
│                                                          │
│  ┌─────────────────────────────────────────┐             │
│  │  name: "Alex" (32 bytes)                │             │
│  │  age:  20        (4 bytes)              │             │
│  │  gpa:  3.85      (8 bytes)              │             │
│  │  grade: 'A'      (1 byte + 3 padding)   │             │
│  └─────────────────────────────────────────┘             │
│                                                          │
│  ARRAY OF STRUCTS:                                       │
│  Student class[3];                                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                │
│  │ Student 0│ │ Student 1│ │ Student 2│                │
│  │ Alex,20  │ │ Bob,21   │ │ Cara,19  │                │
│  └──────────┘ └──────────┘ └──────────┘                │
│                                                          │
│  ACCESS: s1.name  s1.age  s1.gpa  s1.grade             │
│  POINTER: ptr->name  ptr->age  ptr->gpa                 │
└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: 'struct Student { string name; int age; double gpa; };', explanation: "Define a struct template. This creates a NEW type called Student.", memoryChange: "No memory yet — just a blueprint", output: "None" },
      { line: 'Student s1 = {"Alex", 20, 3.85};', explanation: "Create a Student object. Memory is now allocated for all members.", memoryChange: "Struct allocated with name, age, gpa initialized", output: "None" },
      { line: 'cout << s1.name;', explanation: "Access a member using the dot operator.", memoryChange: "Reads name from struct", output: "Alex" },
      { line: 's1.age = 21;', explanation: "Modify a member using the dot operator.", memoryChange: "age field changes from 20 to 21", output: "None" },
      { line: 'Student* ptr = &s1;', explanation: "Create a pointer to the struct.", memoryChange: "8 bytes for pointer, stores address of s1", output: "None" },
      { line: 'cout << ptr->age;', explanation: "Access member through pointer using arrow operator.", memoryChange: "Reads age via pointer", output: "21" },
    ],
    code: `#include <iostream>
#include <string>
using namespace std;

// Define a struct
struct Student {
    string name;
    int age;
    double gpa;
    char grade;
    
    // Struct can have functions too!
    void display() {
        cout << name << " | Age: " << age 
             << " | GPA: " << gpa << " | Grade: " << grade << endl;
    }
    
    bool isPassing() {
        return gpa >= 2.0;
    }
};

// Nested struct
struct Date {
    int day, month, year;
};

struct Event {
    string title;
    Date date;  // Struct inside struct!
};

int main() {
    // Create and initialize
    Student s1 = {"Alex", 20, 3.85, 'A'};
    Student s2 = {"Bob", 22, 1.5, 'D'};
    
    // Access members
    cout << s1.name << " is " << s1.age << " years old" << endl;
    
    // Call member function
    s1.display();
    s2.display();
    
    // Modify members
    s1.age = 21;
    s1.gpa = 3.9;
    
    // Pointer to struct
    Student* ptr = &s1;
    cout << "Via pointer: " << ptr->name << ", GPA: " << ptr->gpa << endl;
    
    // Array of structs
    Student classroom[3] = {
        {"Alice", 19, 3.7, 'A'},
        {"Bob", 20, 3.2, 'B'},
        {"Cara", 21, 3.9, 'A'}
    };
    
    cout << "\\nClassroom:" << endl;
    for (int i = 0; i < 3; i++) {
        classroom[i].display();
    }
    
    // Nested struct
    Event ev = {"C++ Exam", {15, 6, 2025}};
    cout << "\\n" << ev.title << " on " 
         << ev.date.day << "/" << ev.date.month << "/" << ev.date.year << endl;
    
    return 0;
}`,
    syntaxCard: {
      title: "SYNTAX: Structures",
      content: `// DEFINE:
struct Name {
    type member1;
    type member2;
    // ... can have functions too
};

// CREATE:
Name obj = {val1, val2, ...};

// ACCESS:
obj.member       // dot operator
ptr->member      // arrow operator (via pointer)

// NESTED:
struct Inner { int x; };
struct Outer { Inner inner; };
Outer o;
o.inner.x = 10;

// ARRAY:
Name arr[n];
arr[i].member

// POINTER:
Name* ptr = &obj;
ptr->member  // same as (*ptr).member`,
    },
    mistakes: [
      { wrong: `Student s;\ncout << s.name;  // Uninitialized!`, correct: `Student s = {"", 0, 0.0, ' '};  // Initialize\n// Or use constructor`, explanation: "Unlike primitive types, struct members are NOT automatically initialized. Reading an uninitialized string can crash your program. Always initialize structs." },
      { wrong: `Student* ptr;\ncout << ptr->name;  // Dereferencing uninitialized pointer!`, correct: `Student s = {"Alex", 20, 3.85, 'A'};\nStudent* ptr = &s;\ncout << ptr->name;`, explanation: "An uninitialized pointer points to random memory. Using -> on it is undefined behavior. Always make the pointer point to a valid object first." },
      { wrong: `struct Student { string name; }  // Forgot semicolon!`, correct: `struct Student { string name; };  // Semicolon required!`, explanation: "The closing brace of a struct definition MUST be followed by a semicolon. This is different from functions! Forgetting it causes confusing compiler errors." },
    ],
    leetcode: {
      problem: "LeetCode #1773 — Count Items Matching a Rule\n\nYou are given an array items where items[i] = [typei, colori, namei]. You are also given a ruleKey and ruleValue. Return the number of items that match the rule.",
      approach: "Map the ruleKey to the corresponding index in each item array (type=0, color=1, name=2). Then iterate through all items and count how many have the matching value at that index.",
      dryRun: `items = [["phone","blue","pixel"],["computer","silver","phone"]]
ruleKey = "color", ruleValue = "blue"

ruleKey "color" → index 1
Check item 0: items[0][1] = "blue" == "blue" ✓ count=1
Check item 1: items[1][1] = "silver" != "blue" ✗

Output: 1`,
      code: `class Solution {
public:
    int countMatches(vector<vector<string>>& items, string ruleKey, string ruleValue) {
        // Map ruleKey to index
        int idx = (ruleKey == "type") ? 0 : (ruleKey == "color") ? 1 : 2;
        
        int count = 0;
        for (auto& item : items) {
            if (item[idx] == ruleValue) {
                count++;
            }
        }
        return count;
    }
};`,
      complexity: "Time: O(n) — check each item once\nSpace: O(1) — only a counter variable",
    },
    checkpoint: {
      question: "What operator do you use to access a struct member through a pointer?",
      options: ["The dot operator (.)", "The arrow operator (->)", "The double colon (::)", "The ampersand (&)"],
      answer: 1,
    },
  },

  "1.13": {
    id: "1.13",
    title: "Enumerations",
    phaseId: "phase-1",
    phaseTitle: "C++ Foundation",
    subtopics: ["enum", "enum class", "Underlying type", "Scoped vs unscoped"],
    story: `Imagine a restaurant menu where every dish has a **category**: Appetizer, Main Course, Dessert, Drink. You could use numbers: 0 = Appetizer, 1 = Main Course, 2 = Dessert, 3 = Drink. But that's confusing — what does category 2 mean again?

**Enumerations** (enum) solve this by giving **names to numbers**. Instead of writing if (category == 2), you write if (category == DESSERT). Much clearer!

There are two types:
- **Unscoped enum** (old C style): The names leak into the surrounding scope — like shouting in a restaurant. If two menus both have "SOUP", they clash!
- **Scoped enum** (enum class, modern C++): The names stay inside their own namespace — like using a specific menu. You write Menu::SOUP and Dessert::SOUP — no clash!

For competitive programming, enums are less common, but they're essential for writing readable, bug-free code in larger projects.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│              ENUMERATIONS IN MEMORY                      │
│                                                          │
│  UNSCOPED ENUM:                                          │
│  enum Color { RED, GREEN, BLUE };                        │
│  ┌────────┬───────┐                                     │
│  │  Name  │ Value │  Stored as int!                      │
│  ├────────┼───────┤                                     │
│  │  RED   │   0   │  Auto-assigned starting from 0      │
│  │  GREEN │   1   │                                     │
│  │  BLUE  │   2   │                                     │
│  └────────┴───────┘                                     │
│                                                          │
│  CUSTOM VALUES:                                          │
│  enum Status { OK=200, NOT_FOUND=404, ERROR=500 };      │
│                                                          │
│  SCOPED ENUM (enum class):                               │
│  enum class Direction { UP, DOWN, LEFT, RIGHT };        │
│                                                          │
│  Direction d = Direction::UP;  // Must use Direction::  │
│  int val = static_cast<int>(d); // Must cast to int     │
│                                                          │
│  WHY SCOPED IS BETTER:                                   │
│  enum Color { RED };                                     │
│  enum Traffic { RED };  // ERROR! RED already defined    │
│                                                          │
│  enum class Color { RED };    // OK                      │
│  enum class Traffic { RED };  // OK — different scope    │
│  Color c = Color::RED;       // No confusion             │
│  Traffic t = Traffic::RED;   // No confusion             │
└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: 'enum Day { MON, TUE, WED, THU, FRI, SAT, SUN };', explanation: "Define an unscoped enum. MON=0, TUE=1, etc. automatically.", memoryChange: "No runtime memory — compile-time constants", output: "None" },
      { line: 'Day today = WED;', explanation: "Create a variable of enum type. Stored as int internally.", memoryChange: "4 bytes for 'today', value 2", output: "None" },
      { line: 'cout << today;', explanation: "Print the enum value — it prints as an integer (2), not 'WED'.", memoryChange: "No change", output: "2" },
      { line: 'enum class Color { RED, GREEN, BLUE };', explanation: "Define a scoped enum. Values are NOT accessible without Color::", memoryChange: "Compile-time only", output: "None" },
      { line: 'Color c = Color::GREEN;', explanation: "Must use scope resolution. GREEN alone would be an error.", memoryChange: "4 bytes for 'c', value 1", output: "None" },
      { line: 'int val = static_cast<int>(c);', explanation: "Must explicitly cast scoped enum to int. No implicit conversion.", memoryChange: "Integer value 1 extracted", output: "1" },
    ],
    code: `#include <iostream>
using namespace std;

// Unscoped enum
enum Day { MON=1, TUE, WED, THU, FRI, SAT, SUN };

// Scoped enum (preferred in modern C++)
enum class Color { RED, GREEN, BLUE };

// Custom values
enum HTTPStatus { OK=200, NOT_FOUND=404, ERROR=500 };

// Specify underlying type
enum class Flags : unsigned char { A=1, B=2, C=4 };

int main() {
    // Unscoped enum
    Day today = WED;
    cout << "Day value: " << today << endl;  // 3
    cout << "Is weekend: " << (today >= SAT) << endl;
    
    // Switch with enum
    switch (today) {
        case MON: cout << "Start of week" << endl; break;
        case WED: cout << "Midweek!" << endl; break;
        case FRI: cout << "TGIF!" << endl; break;
        default: cout << "Regular day" << endl;
    }
    
    // Scoped enum — must use Color:: and static_cast
    Color c = Color::GREEN;
    // cout << c;  // ERROR! Can't implicitly convert
    cout << "Color value: " << static_cast<int>(c) << endl;  // 1
    
    // Compare
    if (c == Color::GREEN) {
        cout << "It's green!" << endl;
    }
    
    // Custom values
    HTTPStatus status = NOT_FOUND;
    cout << "HTTP " << status << " - Not Found" << endl;
    
    return 0;
}`,
    syntaxCard: {
      title: "SYNTAX: Enumerations",
      content: `// UNSCOPED ENUM:
enum Name { VAL1, VAL2, VAL3 };
enum Name { A=10, B=20, C=30 };  // Custom values
// Implicit conversion to int

// SCOPED ENUM (preferred):
enum class Name { VAL1, VAL2, VAL3 };
// Must use Name::VAL1
// Must static_cast<int>() to get int

// UNDERLYING TYPE:
enum class Name : uint8_t { A, B, C };

// USAGE:
Name var = Name::VAL1;
switch(var) {
    case Name::VAL1: ...; break;
    case Name::VAL2: ...; break;
}
int val = static_cast<int>(var);`,
    },
    mistakes: [
      { wrong: `enum Color { RED, GREEN, BLUE };\nenum Fruit { APPLE, ORANGE, RED };  // RED already defined!`, correct: `enum class Color { RED, GREEN, BLUE };\nenum class Fruit { APPLE, ORANGE, RED };  // OK, scoped!`, explanation: "Unscoped enum names pollute the global namespace. Two enums can't both have RED. Use enum class to avoid name collisions." },
      { wrong: `enum class Color { RED, GREEN, BLUE };\nColor c = RED;  // Error!`, correct: `Color c = Color::RED;  // Must use scope`, explanation: "Scoped enums require the enum name prefix. RED alone is not in scope. This is a feature, not a bug — it prevents accidental name conflicts." },
      { wrong: `enum class Color { RED, GREEN, BLUE };\nint x = Color::GREEN;  // Error!`, correct: `int x = static_cast<int>(Color::GREEN);`, explanation: "Scoped enums don't implicitly convert to int. This is by design — it prevents accidental integer comparisons. Use static_cast when you need the integer value." },
    ],
    leetcode: {
      problem: "LeetCode #1365 — How Many Numbers Are Smaller Than the Current Number\n\nGiven the array nums, for each nums[i] find out how many numbers in the array are smaller than it.",
      approach: "For each element, count how many other elements are smaller. A simple approach: for each element, iterate through all other elements and count those that are smaller. This is O(n^2) but works for small inputs.",
      dryRun: `Input: nums = [8,1,2,2,3]

For 8: smaller = {1,2,2,3} → 4 numbers smaller
For 1: smaller = {} → 0 numbers smaller
For 2: smaller = {1} → 1 number smaller
For 2: smaller = {1} → 1 number smaller
For 3: smaller = {1,2,2} → 3 numbers smaller

Output: [4,0,1,1,3]`,
      code: `class Solution {
public:
    vector<int> smallerNumbersThanCurrent(vector<int>& nums) {
        vector<int> result;
        for (int i = 0; i < nums.size(); i++) {
            int count = 0;
            for (int j = 0; j < nums.size(); j++) {
                if (nums[j] < nums[i]) count++;
            }
            result.push_back(count);
        }
        return result;
    }
};`,
      complexity: "Time: O(n^2) — nested loops\nSpace: O(n) — result array",
    },
    checkpoint: {
      question: "What is the key advantage of 'enum class' over a regular 'enum' in C++?",
      options: ["It uses less memory", "It allows string values", "It prevents name collisions and implicit conversions", "It allows floating-point values"],
      answer: 2,
    },
  },

  "1.14": {
    id: "1.14",
    title: "Namespaces",
    phaseId: "phase-1",
    phaseTitle: "C++ Foundation",
    subtopics: ["Namespace declaration", "using directive", "Nested namespaces", "Anonymous namespaces", "std namespace"],
    story: `Imagine a school with two students both named **Alex**. One is in Class 10A, the other in Class 10B. When the teacher shouts "Alex!" in the hallway, both turn around — confusion!

But when the teacher says **"Alex from Class 10A"**, there's no confusion. The **class** acts as a **namespace** — it groups names together and prevents mix-ups.

In C++, **namespaces** do the same thing for code. The C++ standard library has thousands of names (cout, vector, sort, etc.). They're all in the **std** namespace. Without namespaces, if you created your own "vector" class, it would clash with std::vector!

With namespaces:
- std::vector = the standard library vector
- mylib::vector = YOUR vector
- No conflict!

The line \`using namespace std;\` is like saying "I'm the only class in this school, so just call me by first name." It's convenient for small programs but risky in large projects — you might accidentally use a name that conflicts with std.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│              NAMESPACES VISUALIZED                       │
│                                                          │
│  WITHOUT NAMESPACE:         WITH NAMESPACE:              │
│  ┌──────────────┐          ┌──────────────────┐         │
│  │ vector       │          │ std::             │         │
│  │ sort         │          │  ├─ vector        │         │
│  │ find         │          │  ├─ sort          │         │
│  │ count        │          │  ├─ find          │         │
│  │ ...          │          │  └─ count         │         │
│  └──────────────┘          ├──────────────────┤         │
│                             │ mylib::           │         │
│  NAME COLLISION!            │  ├─ vector        │         │
│  Which vector?!             │  └─ find          │         │
│                             └──────────────────┘         │
│                                                          │
│  NESTED NAMESPACE:                                       │
│  namespace Company {                                     │
│    namespace Project {                                   │
│      int version = 2;                                    │
│    }                                                     │
│  }                                                       │
│  Company::Project::version  // Access like a path       │
│                                                          │
│  C++17 SHORTHAND:                                        │
│  namespace Company::Project { int version = 2; }        │
└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: 'namespace Math { const double PI = 3.14159; }', explanation: "Create a namespace called Math with PI inside.", memoryChange: "PI stored in data segment under Math namespace", output: "None" },
      { line: 'cout << Math::PI;', explanation: "Access PI using the namespace qualifier.", memoryChange: "Read from Math namespace", output: "3.14159" },
      { line: 'using namespace Math;', explanation: "Import all names from Math into current scope. Now PI works without prefix.", memoryChange: "No runtime change — compile-time directive", output: "None" },
      { line: 'cout << PI;', explanation: "Now PI is accessible directly because of the using directive.", memoryChange: "No change", output: "3.14159" },
      { line: 'namespace A { namespace B { int x = 42; } }', explanation: "Create nested namespaces.", memoryChange: "x stored under A::B namespace", output: "None" },
      { line: 'cout << A::B::x;', explanation: "Access deeply nested namespace member using :: chain.", memoryChange: "Read x from nested namespace", output: "42" },
    ],
    code: `#include <iostream>
#include <vector>
using namespace std;

// Custom namespace
namespace Physics {
    const double GRAVITY = 9.81;
    const double SPEED_OF_LIGHT = 299792458;
    
    double freeFallDistance(double time) {
        return 0.5 * GRAVITY * time * time;
    }
}

// Nested namespace (C++17 shorthand)
namespace Math::Geometry {
    const double PI = 3.14159265358979;
    double circleArea(double radius) {
        return PI * radius * radius;
    }
}

// Anonymous namespace (file-local only)
namespace {
    int secretCounter = 0;  // Only visible in this file!
}

int main() {
    // Fully qualified access
    cout << "Gravity: " << Physics::GRAVITY << endl;
    cout << "Free fall 2s: " << Physics::freeFallDistance(2.0) << "m" << endl;
    
    // Nested namespace
    cout << "PI: " << Math::Geometry::PI << endl;
    cout << "Circle area: " << Math::Geometry::circleArea(5.0) << endl;
    
    // Using specific names
    using Physics::GRAVITY;
    cout << "Gravity (using): " << GRAVITY << endl;
    
    // Anonymous namespace
    secretCounter++;
    cout << "Counter: " << secretCounter << endl;
    
    // std namespace (the one you use every day!)
    std::vector<int> v = {1, 2, 3};  // Without 'using namespace std'
    
    return 0;
}`,
    syntaxCard: {
      title: "SYNTAX: Namespaces",
      content: `// DEFINE:
namespace name {
    // variables, functions, classes
}

// NESTED (C++17):
namespace A::B { int x = 42; }

// ACCESS:
name::member        // qualified access
A::B::x            // nested access

// USING:
using namespace name;    // import ALL names (risky!)
using name::member;      // import specific name (safer)

// ANONYMOUS (file-local):
namespace { int x = 0; } // only this file sees x

// COMMON:
using namespace std;  // import standard library
// In large projects, prefer explicit std:: prefix`,
    },
    mistakes: [
      { wrong: `using namespace std;  // In a header file!`, correct: `// In header files, use explicit std:: prefix\n// using namespace in headers pollutes ALL includers`, explanation: "Putting 'using namespace std' in a header file forces it on everyone who includes that header. This can cause mysterious name collisions in large projects. Always use fully qualified names in headers." },
      { wrong: `namespace Math { int x = 5; }\nnamespace Math { int y = 10; }  // Is this OK?`, correct: `namespace Math { int x = 5; int y = 10; }  // Better: keep together`, explanation: "Actually, multiple namespace blocks with the same name ARE allowed and they merge. But it's better to keep related code together for readability. Split them only when separating across files." },
      { wrong: `using namespace std;\nint distance = 5;  // Shadows std::distance!`, correct: `using namespace std;\nint myDistance = 5;  // Use a different name`, explanation: "std::distance is a real function in <iterator>. 'using namespace std' brings it into scope, and your 'distance' variable shadows it. This can cause bizarre compiler errors." },
    ],
    leetcode: {
      problem: "LeetCode #1431 — Kids With the Greatest Number of Candies\n\nGiven candies[i] for each kid and extraCandies, return a boolean array where result[i] is true if kid i can have the greatest number of candies after adding extraCandies.",
      approach: "First find the current maximum number of candies. Then for each kid, check if their candies + extraCandies >= max. If yes, they can be the greatest!",
      dryRun: `candies = [2,3,5,1,3], extraCandies = 3

Max candies = 5
Kid 0: 2+3=5 >= 5 → true
Kid 1: 3+3=6 >= 5 → true
Kid 2: 5+3=8 >= 5 → true
Kid 3: 1+3=4 >= 5 → false
Kid 4: 3+3=6 >= 5 → true

Output: [true,true,true,false,true]`,
      code: `class Solution {
public:
    vector<bool> kidsWithCandies(vector<int>& candies, int extraCandies) {
        int maxCandies = *max_element(candies.begin(), candies.end());
        vector<bool> result;
        
        for (int c : candies) {
            result.push_back(c + extraCandies >= maxCandies);
        }
        
        return result;
    }
};`,
      complexity: "Time: O(n) — two passes\nSpace: O(n) — result array",
    },
    checkpoint: {
      question: "Why is 'using namespace std;' considered bad practice in header files?",
      options: ["It makes the program slower", "It can cause name collisions for anyone who includes the header", "It's not valid C++ syntax", "It only works in .cpp files"],
      answer: 1,
    },
  },

  "1.15": {
    id: "1.15",
    title: "Header Files & Macros",
    phaseId: "phase-1",
    phaseTitle: "C++ Foundation",
    subtopics: ["#include", "#define", "#ifdef", "Include guards", "#pragma once"],
    story: `Think of a **header file** as a **menu** at a restaurant. The menu tells you what dishes are available (function declarations), but the actual cooking happens in the **kitchen** (the .cpp file with function definitions).

When you write \`#include <iostream>\`, you're saying "give me the menu for iostream so I know what functions are available." You don't need to know how cout works internally — you just need to know it exists and how to call it.

**Macros** are like **find-and-replace** on steroids. When you write \`#define PI 3.14\`, the preprocessor literally replaces every "PI" in your code with "3.14" BEFORE the compiler even sees it. It's dumb text replacement — no type checking, no debugging, no scope.

That's why modern C++ prefers:
- \`const double PI = 3.14;\` instead of \`#define PI 3.14\`
- \`inline functions\` instead of \`#define macros\`
- \`constexpr\` for compile-time constants

But you still need to understand macros because they're used in older code and competitive programming templates!`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│          PREPROCESSOR DIRECTIVES FLOW                   │
│                                                          │
│  YOUR CODE:                    AFTER PREPROCESSOR:       │
│  ┌────────────────────┐       ┌────────────────────┐    │
│  │#include <iostream> │       │// 5000+ lines from  │    │
│  │#define MAX 100     │  ───► │// iostream pasted   │    │
│  │int arr[MAX];       │       │// here!             │    │
│  │                    │       │int arr[100]; // MAX │    │
│  └────────────────────┘       │// replaced!         │    │
│                               └────────────────────┘    │
│                                                          │
│  INCLUDE GUARDS:                                         │
│  ┌──────────────────────────────────┐                   │
│  │ #ifndef MYHEADER_H   ← if not   │                   │
│  │ #define MYHEADER_H   ← defined  │                   │
│  │                                  │                   │
│  │   // header content here         │                   │
│  │                                  │                   │
│  │ #endif              ← close     │                   │
│  └──────────────────────────────────┘                   │
│                                                          │
│  First include: MYHEADER_H not defined → include content │
│  Second include: MYHEADER_H defined → SKIP content      │
│                                                          │
│  #pragma once: Same effect, simpler, but non-standard   │
│  (Works on all major compilers though!)                  │
└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: '#include <iostream>', explanation: "Preprocessor copies the entire iostream header into your file.", memoryChange: "Text replacement only — no runtime effect", output: "None" },
      { line: '#define MAX_SIZE 100', explanation: "Define a macro. Every occurrence of MAX_SIZE will be replaced with 100.", memoryChange: "No memory — text substitution", output: "None" },
      { line: 'int arr[MAX_SIZE];', explanation: "After preprocessing, this becomes int arr[100];", memoryChange: "Array of 100 ints allocated after preprocessing", output: "None" },
      { line: '#ifdef DEBUG', explanation: "Conditional compilation. Code inside is only compiled if DEBUG is defined.", memoryChange: "No runtime effect — compile-time decision", output: "None" },
      { line: '#define SQUARE(x) ((x)*(x))', explanation: "Macro function. SQUARE(5) becomes ((5)*(5)). Note the extra parentheses!", memoryChange: "Text replacement", output: "None" },
      { line: 'cout << SQUARE(3+1);', explanation: "Expands to ((3+1)*(3+1)) = 16. Without parentheses: 3+1*3+1 = 7!", memoryChange: "Result computed at runtime", output: "16" },
    ],
    code: `#include <iostream>
using namespace std;

// ===== MACROS =====
#define MAX_SIZE 100
#define PI 3.14159
#define SQUARE(x) ((x)*(x))    // Always use parentheses!
#define MAX(a,b) ((a)>(b)?(a):(b))

// Conditional compilation
#define DEBUG

int main() {
    int arr[MAX_SIZE];  // int arr[100];
    cout << "PI: " << PI << endl;
    cout << "Square of 5: " << SQUARE(5) << endl;
    cout << "Max of 3,7: " << MAX(3,7) << endl;
    
    // Conditional compilation
    #ifdef DEBUG
        cout << "[DEBUG] Program running..." << endl;
    #endif
    
    #ifndef RELEASE
        cout << "[INFO] Not in release mode" << endl;
    #endif
    
    // Modern alternatives (PREFER THESE):
    const double Pi = 3.14159;          // Typed constant
    constexpr int MaxSize = 100;        // Compile-time constant
    inline int square(int x) { return x*x; }  // Type-safe function
    
    cout << "Modern square: " << square(5) << endl;
    
    return 0;
}`,
    syntaxCard: {
      title: "SYNTAX: Header Files & Macros",
      content: `// INCLUDE:
#include <header>     // System header (angle brackets)
#include "header.h"   // User header (double quotes)

// MACROS:
#define NAME value        // Constant macro
#define FUNC(x) ((x)*(x)) // Function-like macro
#undef NAME              // Remove a macro

// CONDITIONAL:
#ifdef NAME    // if defined
#ifndef NAME   // if not defined
#endif         // end conditional block
#if expr       // if expression is true
#elif expr     // else if
#else          // else

// INCLUDE GUARDS:
#ifndef MYHEADER_H
#define MYHEADER_H
// ... content ...
#endif

// PRAGMA ONCE (simpler):
#pragma once

// MODERN ALTERNATIVES:
const type NAME = value;        // Typed constant
constexpr type NAME = value;    // Compile-time
inline type func(args) { ... }  // Type-safe function`,
    },
    mistakes: [
      { wrong: `#define SQUARE(x) x*x\nSQUARE(3+1)  // Expands to 3+1*3+1 = 7!`, correct: `#define SQUARE(x) ((x)*(x))\nSQUARE(3+1)  // Expands to ((3+1)*(3+1)) = 16`, explanation: "Macros are dumb text replacement. Without parentheses around each parameter and the whole expression, operator precedence causes wrong results. ALWAYS use full parentheses in macros!" },
      { wrong: `#define MAX(a,b) ((a)>(b)?(a):(b))\nMAX(x++, y++)  // x or y incremented twice!`, correct: `inline int maxVal(int a, int b) { return (a>b)?a:b; }\nmaxVal(x++, y++);  // Each incremented exactly once`, explanation: "In the macro, the 'winning' argument gets evaluated twice (both in comparison and result). This causes double increment. Use inline functions instead!" },
      { wrong: `// header.h (no include guard)\nint x = 5;  // Definition in header!`, correct: `// header.h\n#pragma once\nextern int x;  // Declaration only\n// Definition goes in .cpp file`, explanation: "Without include guards, including the header twice causes redefinition errors. And defining variables in headers causes multiple definition errors when included from multiple .cpp files." },
    ],
    leetcode: {
      problem: "LeetCode #1859 — Sorting the Sentence\n\nA sentence is a list of words separated by single spaces with each word containing an integer at the end representing its position. Reconstruct the original sentence.",
      approach: "Split the sentence into words. For each word, extract the position number (last character) and the actual word (everything except last character). Place each word at its correct position, then join them.",
      dryRun: `Input: "is2 sentence4 This1 a3"

Split: ["is2", "sentence4", "This1", "a3"]
Word "is2" → position 2, word "is"
Word "sentence4" → position 4, word "sentence"
Word "This1" → position 1, word "This"
Word "a3" → position 3, word "a"

Position: 1→This, 2→is, 3→a, 4→sentence
Output: "This is a sentence"`,
      code: `class Solution {
public:
    string sortSentence(string s) {
        vector<string> words;
        string word;
        stringstream ss(s);
        while (ss >> word) words.push_back(word);
        
        vector<string> result(words.size() + 1);
        for (auto& w : words) {
            int pos = w.back() - '0';     // Last char = position
            result[pos] = w.substr(0, w.size()-1);  // Word without number
        }
        
        string ans;
        for (int i = 1; i < result.size(); i++) {
            if (i > 1) ans += " ";
            ans += result[i];
        }
        return ans;
    }
};`,
      complexity: "Time: O(n) — process each word once\nSpace: O(n) — store words and result",
    },
    checkpoint: {
      question: "Why should you always use extra parentheses in macro definitions like #define SQUARE(x) ((x)*(x))?",
      options: ["It makes the code look professional", "It prevents operator precedence issues during text substitution", "It makes the macro run faster", "It allows the macro to work with floats"],
      answer: 1,
    },
  },

  "1.16": {
    id: "1.16",
    title: "Templates",
    phaseId: "phase-1",
    phaseTitle: "C++ Foundation",
    subtopics: ["Function templates", "Class templates", "Template specialization", "Multiple type parameters"],
    story: `Imagine you're a **chef** with a recipe for "chocolate cake." One day, someone asks for "vanilla cake" and another for "strawberry cake." The recipe is exactly the same — only the **flavor** changes. Instead of writing three separate recipes, you write ONE recipe template: "Cake with [FLAVOR]."

That's exactly what **templates** do in C++! Instead of writing:
- \`int max(int a, int b)\` for integers
- \`double max(double a, double b)\` for doubles
- \`string max(string a, string b)\` for strings

You write ONE template: \`T max(T a, T b)\` where **T** can be any type. The compiler generates the specific versions for you!

Templates are the backbone of the C++ STL — vector<int>, vector<string>, vector<double> are all generated from the SAME template code. Without templates, we'd need thousands of nearly-identical functions!`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│              TEMPLATE MECHANISM                          │
│                                                          │
│  TEMPLATE:                                               │
│  template <typename T>                                   │
│  T maxVal(T a, T b) { return (a>b)?a:b; }               │
│                                                          │
│  COMPILER GENERATES:                                     │
│  ┌─────────────────────────────────────────┐             │
│  │ Call: maxVal(3, 5)                      │             │
│  │ T = int → generates:                    │             │
│  │   int maxVal(int a, int b){...}         │             │
│  ├─────────────────────────────────────────┤             │
│  │ Call: maxVal(3.14, 2.72)                │             │
│  │ T = double → generates:                 │             │
│  │   double maxVal(double a, double b){...}│             │
│  ├─────────────────────────────────────────┤             │
│  │ Call: maxVal(string("a"), string("b"))  │             │
│  │ T = string → generates:                 │             │
│  │   string maxVal(string a, string b){...}│             │
│  └─────────────────────────────────────────┘             │
│                                                          │
│  CLASS TEMPLATE:                                         │
│  template <typename T>                                   │
│  class Box { T value; public: T get(); void set(T v); }; │
│                                                          │
│  Box<int> b1;    → compiler generates Box<int>           │
│  Box<string> b2; → compiler generates Box<string>       │
└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: 'template <typename T>', explanation: "Declare T as a type parameter. T will be replaced by the actual type when called.", memoryChange: "No code generated yet — just a blueprint", output: "None" },
      { line: 'T maxVal(T a, T b) { return (a>b)?a:b; }', explanation: "Define a template function. Both parameters and return type use T.", memoryChange: "Still just a blueprint — no code generated", output: "None" },
      { line: 'cout << maxVal(3, 5);', explanation: "Call with ints. Compiler generates maxVal(int, int) from the template.", memoryChange: "Function code generated for int version", output: "5" },
      { line: 'cout << maxVal(3.14, 2.72);', explanation: "Call with doubles. Compiler generates maxVal(double, double).", memoryChange: "Function code generated for double version", output: "3.14" },
      { line: 'template <typename T, typename U>', explanation: "Template with TWO type parameters. Allows different types for different parameters.", memoryChange: "No code yet — blueprint with 2 types", output: "None" },
      { line: 'U convert(T input) { return (U)input; }', explanation: "Template function converting from type T to type U.", memoryChange: "Generated when called", output: "None" },
    ],
    code: `#include <iostream>
#include <string>
using namespace std;

// ===== FUNCTION TEMPLATE =====
template <typename T>
T maxVal(T a, T b) {
    return (a > b) ? a : b;
}

// Explicit specialization for char*
template <>
const char* maxVal<const char*>(const char* a, const char* b) {
    return (strcmp(a, b) > 0) ? a : b;
}

// ===== CLASS TEMPLATE =====
template <typename T>
class Box {
private:
    T value;
public:
    Box(T v) : value(v) {}
    T get() { return value; }
    void set(T v) { value = v; }
};

// ===== MULTIPLE TYPE PARAMETERS =====
template <typename K, typename V>
class Pair {
public:
    K key;
    V value;
    Pair(K k, V v) : key(k), value(v) {}
};

int main() {
    // Function template — type deduced automatically
    cout << "Max int: " << maxVal(3, 5) << endl;
    cout << "Max double: " << maxVal(3.14, 2.72) << endl;
    cout << "Max char: " << maxVal('a', 'z') << endl;
    
    // Explicit type specification
    cout << "Max long: " << maxVal<long>(100L, 200L) << endl;
    
    // Class template
    Box<int> intBox(42);
    Box<string> strBox("Hello");
    cout << "Int box: " << intBox.get() << endl;
    cout << "Str box: " << strBox.get() << endl;
    
    // Multiple type parameters
    Pair<string, int> student("Alex", 20);
    cout << student.key << " is " << student.value << " years old" << endl;
    
    return 0;
}`,
    syntaxCard: {
      title: "SYNTAX: Templates",
      content: `// FUNCTION TEMPLATE:
template <typename T>
T funcName(T a, T b) { ... }

// CALL:
funcName(3, 5);        // T deduced as int
funcName<double>(1,2); // Explicit type

// CLASS TEMPLATE:
template <typename T>
class ClassName {
    T member;
public:
    T method();
};

// USE:
ClassName<int> obj;
ClassName<string> obj2;

// MULTIPLE TYPES:
template <typename T, typename U>
U convert(T input) { return (U)input; }

// SPECIALIZATION:
template <>
type funcName<specific_type>(...) { ... }

// NON-TYPE PARAMETER:
template <typename T, int SIZE>
class Array { T arr[SIZE]; };`,
    },
    mistakes: [
      { wrong: `template <typename T>\nT add(T a, T b) { return a+b; }\ncout << add(3, 5.5);  // T can't be both int and double!`, correct: `cout << add<double>(3, 5.5);  // Force T=double\n// Or: template<typename T, typename U>`, explanation: "When both parameters use the same T, the compiler can't deduce T if the arguments are different types. Either explicitly specify the type or use two template parameters." },
      { wrong: `// Template definition in .cpp file\n// Template declaration in .h file\n// Linker error!`, correct: `// Put BOTH declaration AND definition in header\n// Or use explicit instantiation`, explanation: "Templates are compiled on demand. If the definition is in a .cpp file, other files can't see it and the compiler can't generate the code. Put template definitions in headers." },
      { wrong: `template <typename T>\nclass Stack { ... };\nStack s;  // Missing type argument!`, correct: `Stack<int> s;  // Must specify the type`, explanation: "Class templates always need explicit type arguments. Unlike function templates, the compiler can't deduce the type from constructor arguments (until C++17 CTAD)." },
    ],
    leetcode: {
      problem: "LeetCode #1 — Two Sum\n\nGiven an array of integers nums and an integer target, return indices of the two numbers that add up to target.",
      approach: "Use a hash map (unordered_map) to store each number and its index. For each number, check if target - num exists in the map. This gives O(n) time instead of O(n^2) brute force.",
      dryRun: `nums = [2,7,11,15], target = 9

i=0: num=2, need=9-2=7, not in map → store {2:0}
i=1: num=7, need=9-7=2, found in map! → return [0,1]

Output: [0,1]`,
      code: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;  // value → index
        
        for (int i = 0; i < nums.size(); i++) {
            int need = target - nums[i];
            if (mp.find(need) != mp.end()) {
                return {mp[need], i};  // Found pair!
            }
            mp[nums[i]] = i;  // Store current
        }
        
        return {};  // No solution (shouldn't happen per problem)
    }
};`,
      complexity: "Time: O(n) — single pass with hash lookup\nSpace: O(n) — hash map storage",
    },
    checkpoint: {
      question: "What happens when you call a function template with arguments of two different types when the template uses only one type parameter T?",
      options: ["The compiler picks the larger type", "The compiler cannot deduce T and gives an error", "It automatically converts to the first type", "It works fine at runtime"],
      answer: 1,
    },
  },

  "1.17": {
    id: "1.17",
    title: "Exception Handling",
    phaseId: "phase-1",
    phaseTitle: "C++ Foundation",
    subtopics: ["try", "catch", "throw", "Multiple catch blocks", "Standard exceptions"],
    story: `Imagine you're driving and there's a **road closure** ahead. You have two choices:
1. **Crash into the barrier** (program crash / undefined behavior)
2. **Take a detour** (handle the problem gracefully)

**Exception handling** is C++'s detour system. When something goes wrong (division by zero, file not found, out of memory), instead of crashing, your code can **throw** an exception — like waving a red flag. Then, a **catch** block somewhere up the call chain can handle it — like a detour sign.

The flow:
1. **try** { code that might fail } — "I think this road might be blocked"
2. **throw** errorValue — "Road blocked! Take a detour!"
3. **catch** (type) { handle it } — "Here's the detour plan"

Without exceptions, every function would need to return error codes, and you'd have to check every single return value. With exceptions, error handling is separated from normal logic — cleaner and more maintainable!

For competitive programming, you rarely use exceptions. But for real-world C++ projects, they're essential!`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│          EXCEPTION HANDLING FLOW                         │
│                                                          │
│  int main() {                                            │
│    try {                                                 │
│      ┌──────────────────────┐                           │
│      │ riskyFunction();     │                            │
│      │   if(bad) throw 42;  │ ─── throw! ───┐           │
│      │   cout << "ok";      │               │           │
│      └──────────────────────┘               │           │
│    }                                       │           │
│    catch (int e) {  ◄──────────────────────┘           │
│      ┌──────────────────────┐                           │
│      │ cout << "Error:"<e;  │  ← Detour taken!         │
│      └──────────────────────┘                           │
│    }                                                     │
│    // Execution continues here after catch              │
│  }                                                       │
│                                                          │
│  STACK UNWINDING:                                        │
│  funcA() → funcB() → funcC() throws                     │
│     ↑          ↑          ↑                              │
│     │          │    catch in funcA                       │
│     │    funcB's locals destroyed                       │
│     funcA catches, funcC's locals destroyed             │
│                                                          │
│  STANDARD EXCEPTIONS:                                    │
│  ┌──────────────────────────────┐                       │
│  │ exception (base)             │                       │
│  │  ├─ runtime_error            │                       │
│  │  ├─ range_error              │                       │
│  │  ├─ overflow_error           │                       │
│  │  ├─ logic_error              │                       │
│  │  │  ├─ invalid_argument      │                       │
│  │  │  ├─ out_of_range          │                       │
│  │  │  └─ length_error          │                       │
│  │  └─ bad_alloc (new fails)    │                       │
│  └──────────────────────────────┘                       │
└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: 'try {', explanation: "Start a try block. Any exception thrown inside will be caught.", memoryChange: "Stack frame setup for exception handling", output: "None" },
      { line: '    int result = 10 / 0;', explanation: "Division by zero! This would cause undefined behavior or crash.", memoryChange: "Hardware may raise exception", output: "None" },
      { line: '    throw runtime_error("Division by zero!");', explanation: "Instead, we explicitly throw an exception with a descriptive message.", memoryChange: "Exception object created, stack unwinding begins", output: "None" },
      { line: '} catch (const runtime_error& e) {', explanation: "Catch the specific exception type. Reference avoids copying.", memoryChange: "Exception object caught, stack unwinding stops", output: "None" },
      { line: '    cout << e.what();', explanation: "Call the what() method to get the error message.", memoryChange: "Error message string accessed", output: "Division by zero!" },
      { line: '}', explanation: "End of catch block. Execution continues after the catch.", memoryChange: "Exception object destroyed, normal flow resumes", output: "None" },
    ],
    code: `#include <iostream>
#include <stdexcept>
using namespace std;

// Custom exception
class InsufficientFundsException : public runtime_error {
public:
    double amount;
    InsufficientFundsException(double amt) 
        : runtime_error("Insufficient funds!"), amount(amt) {}
};

double divide(double a, double b) {
    if (b == 0) throw runtime_error("Division by zero!");
    return a / b;
}

void withdraw(double balance, double amount) {
    if (amount > balance) throw InsufficientFundsException(amount - balance);
    cout << "Withdrawn: " << amount << endl;
}

int main() {
    // ===== BASIC TRY-CATCH =====
    try {
        cout << divide(10.0, 2.0) << endl;  // OK
        cout << divide(5.0, 0.0) << endl;   // Throws!
        cout << "This never prints" << endl;
    } catch (const runtime_error& e) {
        cout << "Caught: " << e.what() << endl;
    }
    
    // ===== MULTIPLE CATCH BLOCKS =====
    try {
        withdraw(100, 150);  // Throws custom exception
    } catch (const InsufficientFundsException& e) {
        cout << e.what() << " Need " << e.amount << " more" << endl;
    } catch (const runtime_error& e) {
        cout << "Runtime error: " << e.what() << endl;
    } catch (...) {
        cout << "Unknown exception caught" << endl;  // Catch-all
    }
    
    // ===== STANDARD EXCEPTIONS =====
    try {
        vector<int> v = {1, 2, 3};
        cout << v.at(10) << endl;  // at() throws out_of_range
    } catch (const out_of_range& e) {
        cout << "Out of range: " << e.what() << endl;
    }
    
    // ===== NOEXCEPT (promise not to throw) =====
    auto safeFunc = []() noexcept { return 42; };
    cout << "Noexcept: " << safeFunc() << endl;
    
    cout << "Program continues normally" << endl;
    return 0;
}`,
    syntaxCard: {
      title: "SYNTAX: Exception Handling",
      content: `// TRY-CATCH:
try {
    // risky code
    throw SomeException("message");
}
catch (const ExceptionType& e) {
    // handle exception
    cout << e.what();  // get message
}
catch (...) {
    // catch-all handler
}

// STANDARD EXCEPTIONS:
#include <stdexcept>
runtime_error("msg")
invalid_argument("msg")
out_of_range("msg")
length_error("msg")
overflow_error("msg")

// CUSTOM EXCEPTION:
class MyError : public runtime_error {
public:
    MyError() : runtime_error("My error") {}
};

// NOEXCEPT (promise not to throw):
void safe() noexcept;

// RE-THROW:
catch (const exception& e) {
    throw;  // re-throw same exception
}`,
    },
    mistakes: [
      { wrong: `catch (exception e) { ... }  // Catching by VALUE`, correct: `catch (const exception& e) { ... }  // Catch by reference`, explanation: "Catching by value slices off derived class information. If a runtime_error is caught as exception by value, you lose the runtime_error-specific data. Always catch by const reference." },
      { wrong: `try { /* nothing */ }\ncatch (...) { /* silently ignore */ }`, correct: `catch (...) { cerr << "Unknown error" << endl; }`, explanation: "Silently swallowing all exceptions hides bugs. At minimum, log the error. The catch-all handler should never be empty in production code." },
      { wrong: `throw;  // Outside of catch block!`, correct: `throw;  // Only inside a catch block\n// To throw new exception:\nthrow runtime_error("error");`, explanation: "A bare 'throw' (re-throw) can only be used inside a catch block to re-throw the currently caught exception. Using it outside a catch block calls terminate()." },
    ],
    leetcode: {
      problem: "LeetCode #35 — Search Insert Position\n\nGiven a sorted array and a target value, return the index if found. If not found, return the index where it would be inserted to keep the array sorted.",
      approach: "Use binary search. Maintain a 'low' and 'high' pointer. While low <= high, check the middle element. If target equals mid, return mid. If target is less, search left. If greater, search right. When the loop ends, 'low' is the insert position.",
      dryRun: `nums = [1,3,5,6], target = 5

low=0, high=3, mid=1: nums[1]=3 < 5 → low=2
low=2, high=3, mid=2: nums[2]=5 == 5 → return 2

nums = [1,3,5,6], target = 2

low=0, high=3, mid=1: nums[1]=3 > 2 → high=0
low=0, high=0, mid=0: nums[0]=1 < 2 → low=1
low=1, high=0: loop ends → return 1`,
      code: `class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;  // Avoid overflow
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        
        return low;  // Insert position
    }
};`,
      complexity: "Time: O(log n) — binary search\nSpace: O(1) — only pointers",
    },
    checkpoint: {
      question: "Why should you catch exceptions by const reference instead of by value?",
      options: ["It's faster to type", "It prevents object slicing and preserves derived class information", "It uses less disk space", "It's required by the C++ standard"],
      answer: 1,
    },
  },
};
