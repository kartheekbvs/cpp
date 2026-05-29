import { Topic } from './curriculum';

export const phase2Content: Record<string, Topic> = {
  "2.1": {
    "id": "2.1",
    "title": "Vector",
    "phaseId": "phase-2",
    "phaseTitle": "STL Module",
    "subtopics": [
      "Declaration & initialization",
      "push_back, pop_back",
      "size, capacity, resize",
      "Iterators",
      "2D vectors"
    ],
    "story": "Imagine you have a **magic backpack**. A regular backpack has a fixed number of pockets - once it is full, you cannot fit anything else. But a **vector** is like a magic backpack that **automatically grows** when you add more items and **shrinks** when you take items out!\n\nIn Phase 1, we learned that arrays have a fixed size. Vectors solve that problem completely. They are the **most used container** in competitive programming because you do not need to know the size in advance, you can add elements anytime with push_back(), you can remove elements from the end with pop_back(), and you can access any element instantly with [].\n\nBehind the scenes, the vector allocates more memory than it currently needs (called **capacity**). When you fill it up, it automatically doubles its space and copies everything over. It is like moving from a small apartment to a bigger one when your family grows!",
    "memoryViz": "┌──────────────────────────────────────────────────────────┐\n│              VECTOR MEMORY LAYOUT                        │\n│                                                          │\n│  vector<int> v = {10, 20, 30};                           │\n│                                                          │\n│  size = 3, capacity = 3                                  │\n│  ┌────┬────┬────┐                                        │\n│  │ 10 │ 20 │ 30 │  ← used elements (size)               │\n│  └────┴────┴────┘                                        │\n│                                                          │\n│  After v.push_back(40):                                  │\n│  size = 4, capacity = 6 (doubled!)                       │\n│  ┌────┬────┬────┬────┬────┬────┐                         │\n│  │ 10 │ 20 │ 30 │ 40 │ ?? │ ?? │  ← extra capacity       │\n│  └────┴────┴────┴────┴────┴────┘                         │\n│                                                          │\n│  OPERATIONS:                                             │\n│  push_back(50) -> O(1) amortized                          │\n│  pop_back()     -> O(1)                                   │\n│  v[i]           -> O(1) random access                     │\n│  insert(begin)  -> O(n) slow!                             │\n│  erase(begin)   -> O(n) slow!                             │\n└──────────────────────────────────────────────────────────┘",
    "stepByStep": [
      {
        "line": "vector<int> v;",
        "explanation": "Declare an empty vector of integers.",
        "memoryChange": "Vector object created on stack, no heap allocation yet",
        "output": "None"
      },
      {
        "line": "v.push_back(10);",
        "explanation": "Add 10 to the end. Vector allocates space and stores value.",
        "memoryChange": "Heap memory allocated, value 10 stored",
        "output": "None"
      },
      {
        "line": "v.push_back(20); v.push_back(30);",
        "explanation": "Add more elements. Capacity may double when needed.",
        "memoryChange": "Elements added, capacity grows as needed",
        "output": "None"
      },
      {
        "line": "cout << v[1];",
        "explanation": "Access element at index 1. O(1) random access.",
        "memoryChange": "Value read from memory, no changes",
        "output": "20"
      },
      {
        "line": "v.pop_back();",
        "explanation": "Remove last element. Size decreases by 1.",
        "memoryChange": "Size becomes 2, last element destroyed",
        "output": "None"
      },
      {
        "line": "for(int x : v) cout << x;",
        "explanation": "Range-based for loop traverses all elements.",
        "memoryChange": "Elements read sequentially",
        "output": "10 20"
      }
    ],
    "code": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    // ===== CREATION =====\n    vector<int> v1;                    // Empty vector\n    vector<int> v2 = {10, 20, 30};    // Initialized\n    vector<int> v3(5, 100);            // 5 elements, all 100\n    \n    // ===== ADDING ELEMENTS =====\n    v1.push_back(1);    // v1 = {1}\n    v1.push_back(2);    // v1 = {1, 2}\n    v1.push_back(3);    // v1 = {1, 2, 3}\n    \n    // ===== ACCESSING =====\n    cout << v1[0] << endl;       // 1 (no bounds check)\n    cout << v1.at(1) << endl;    // 2 (with bounds check)\n    cout << v1.front() << endl;  // 1\n    cout << v1.back() << endl;   // 3\n    \n    // ===== SIZE & CAPACITY =====\n    cout << \"Size: \" << v1.size() << endl;\n    cout << \"Capacity: \" << v1.capacity() << endl;\n    \n    // ===== REMOVING =====\n    v1.pop_back();     // Removes last element\n    \n    // ===== ITERATION =====\n    for (int x : v2) cout << x << \" \";\n    cout << endl;\n    \n    // ===== 2D VECTOR =====\n    vector<vector<int>> matrix = {\n        {1, 2, 3},\n        {4, 5, 6},\n        {7, 8, 9}\n    };\n    cout << \"matrix[1][2] = \" << matrix[1][2] << endl;  // 6\n    \n    return 0;\n}",
    "syntaxCard": {
      "title": "SYNTAX: Vector",
      "content": "#include <vector>\nusing namespace std;\n\n// CREATION:\nvector<int> v;              // empty\nvector<int> v = {1,2,3};    // with values\nvector<int> v(n, 0);        // n elements, all 0\n\n// ADD:\nv.push_back(x);    // add to end - O(1) amortized\nv.emplace_back(x);  // construct in-place - faster\nv.insert(it, x);    // insert at iterator - O(n)\n\n// REMOVE:\nv.pop_back();       // remove last - O(1)\nv.erase(it);        // remove at iterator - O(n)\nv.clear();          // remove all\n\n// ACCESS:\nv[i]          // no bounds check\nv.at(i)       // with bounds check\nv.front()     // first element\nv.back()      // last element\n\n// SIZE:\nv.size()       // number of elements\nv.capacity()   // allocated space\nv.empty()      // is empty?\nv.resize(n)    // change size\n\n// 2D:\nvector<vector<int>> mat(r, vector<int>(c, 0));"
    },
    "mistakes": [
      {
        "wrong": "vector<int> v;\nv[0] = 10;  // Accessing empty vector!",
        "correct": "vector<int> v;\nv.push_back(10);  // Add element first",
        "explanation": "Accessing v[0] on an empty vector is undefined behavior. Use push_back() to add elements first."
      },
      {
        "wrong": "for(int i=0; i<=v.size(); i++) cout << v[i];",
        "correct": "for(int i=0; i<v.size(); i++) cout << v[i];",
        "explanation": "Using <= instead of < goes one past the last valid index. For size n, valid indices are 0 to n-1."
      },
      {
        "wrong": "v.erase(v.begin() + i);  // During iteration",
        "correct": "// Use erase-remove idiom:\nv.erase(remove(v.begin(), v.end(), val), v.end());",
        "explanation": "Erasing from the middle is O(n). Be careful erasing in a loop since the iterator is invalidated."
      }
    ],
    "leetcode": {
      "problem": "LeetCode #1 — Two Sum\n\nGiven an array of integers nums and an integer target, return indices of the two numbers that add up to target.",
      "approach": "Use a hash map to store each number and its index. For each number, check if (target - current) exists in the map. O(n) time instead of O(n^2) brute force.",
      "dryRun": "nums = [2,7,11,15], target = 9\n\ni=0: num=2, need=7, map={} -> not found, add {2:0}\ni=1: num=7, need=2, map={2:0} -> FOUND! return [0,1]\n\nOutput: [0,1]",
      "code": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> mp;\n        for (int i = 0; i < nums.size(); i++) {\n            int need = target - nums[i];\n            if (mp.find(need) != mp.end()) {\n                return {mp[need], i};\n            }\n            mp[nums[i]] = i;\n        }\n        return {};\n    }\n};",
      "complexity": "Time: O(n) — single pass with hash lookup\nSpace: O(n) — hash map storage"
    },
    "checkpoint": {
      "question": "What is the time complexity of push_back() on a vector?",
      "options": [
        "Always O(1)",
        "O(n) always",
        "O(1) amortized — occasionally O(n) when resizing",
        "O(log n)"
      ],
      "answer": 2
    }
  },
  "2.2": {
    id: "2.2", title: "Pair & Tuple", phaseId: "phase-2", phaseTitle: "STL Module",
    subtopics: ["pair<T1,T2>", "make_pair", "tuple", "get<N>"],
    story: `Imagine you need to store a **student's name AND grade** together — they belong as a unit. A **pair** is like a **two-pocket folder** — one pocket for the name, another for the grade. You access them with .first and .second.

A **tuple** extends this to any number of pockets — name, grade, age, GPA, all bundled together. You access elements with get<0>(t), get<1>(t), etc. Pairs are essential for maps (which store key-value pairs) and for returning multiple values from functions.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│  pair<string, int> p = {"Alice", 95};                    │
│  ┌──────────────┬──────┐                                 │
│  │ .first       │ .second│                                │
│  │ "Alice"      │  95   │                                 │
│  └──────────────┴──────┘                                 │
│                                                          │
│  tuple<string, int, double> t = {"Bob", 20, 3.8};        │
│  ┌────────┬──────┬──────┐                                │
│  │ get<0> │get<1>│get<2>│                                │
│  │ "Bob"  │  20  │ 3.8  │                                │
│  └────────┴──────┴──────┘                                │
│  COMPLEXITY: O(1) access                                 │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "pair<string,int> p = {\"Alice\", 95};", explanation: "Create a pair with string and int", memoryChange: "Two values stored together", output: "None" },
      { line: "cout << p.first << p.second;", explanation: "Access members with .first and .second", memoryChange: "No change", output: "Alice 95" },
      { line: "auto t = make_tuple(\"Bob\", 20, 3.8);", explanation: "Create tuple with 3 values", memoryChange: "Three values stored", output: "None" },
      { line: "cout << get<0>(t) << get<2>(t);", explanation: "Access tuple elements by index", memoryChange: "No change", output: "Bob 3.8" },
    ],
    code: \`#include <iostream>
#include <utility>
#include <tuple>
using namespace std;

int main() {
    pair<string, int> p1 = {"Alice", 95};
    auto p2 = make_pair("Bob", 87);
    cout << p1.first << ": " << p1.second << endl;

    // Pair comparison: compares first, then second
    vector<pair<int,int>> v = {{3,1},{1,4},{2,2}};
    sort(v.begin(), v.end());

    // Tuple
    auto t = make_tuple("Charlie", 22, 3.9);
    cout << get<0>(t) << " " << get<1>(t) << " " << get<2>(t) << endl;
    return 0;
}\`,
    syntaxCard: { title: "SYNTAX: Pair & Tuple", content: \`pair<T1,T2> p = {a, b};
p.first, p.second
make_pair(a, b)

tuple<T1,T2,T3> t = {a, b, c};
get<0>(t), get<1>(t)
make_tuple(a, b, c)\` },
    mistakes: [
      { wrong: "pair p = {1, 2};  // missing types", correct: "pair<int,int> p = {1, 2};", explanation: "In most contexts, C++ needs the type parameters. Use auto or explicit types." },
    ],
    leetcode: { problem: "LeetCode #1 — Two Sum (store index pairs)", approach: "Use pairs to store value-index pairs, then sort.", dryRun: "pairs: [(2,0),(7,1),(11,2)] -> Two Sum found", code: "vector<pair<int,int>> vp;\nfor(int i=0;i<n;i++) vp.push_back({nums[i],i});", complexity: "O(n log n)" },
    checkpoint: { question: "How do you access the second element of a pair?", options: ["pair[1]", "pair.second", "pair[2]", "pair.last"], answer: 1 }
  },

  "2.3": {
    id: "2.3", title: "Stack", phaseId: "phase-2", phaseTitle: "STL Module",
    subtopics: ["LIFO principle", "push, pop, top", "Valid parentheses", "Monotonic stack"],
    story: \`A **stack** is like a **stack of plates** in a cafeteria — you can only add (push) or remove (pop) from the TOP. The last plate placed is the first one taken — **Last In, First Out (LIFO)**. You can't pull a plate from the middle!

Stacks are everywhere in programming: the **call stack** tracks function calls, **undo** operations use a stack, and **bracket matching** (is this expression valid?) uses a stack. Whenever you need to reverse something or track "most recent," think stack!\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│           STACK — LAST IN, FIRST OUT                     │
│                                                          │
│  push(10) -> push(20) -> push(30)                         │
│  ┌────┐                                                  │
│  │ 30 │ ← top (last in, first out!)                     │
│  ├────┤                                                  │
│  │ 20 │                                                  │
│  ├────┤                                                  │
│  │ 10 │ ← bottom                                         │
│  └────┘                                                  │
│  pop() -> removes 30, top becomes 20                     │
│  COMPLEXITY: push O(1), pop O(1), top O(1)               │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "stack<int> s;", explanation: "Create empty stack", memoryChange: "Empty stack object", output: "None" },
      { line: "s.push(10); s.push(20); s.push(30);", explanation: "Push three elements", memoryChange: "30 on top", output: "None" },
      { line: "cout << s.top(); s.pop();", explanation: "Access top (30) then remove it", memoryChange: "20 now on top", output: "30" },
    ],
    code: \`#include <iostream>
#include <stack>
using namespace std;

int main() {
    stack<int> s;
    s.push(10); s.push(20); s.push(30);
    cout << "Top: " << s.top() << endl;  // 30
    s.pop();
    cout << "Top: " << s.top() << endl;  // 20
    cout << "Size: " << s.size() << endl;  // 2
    cout << "Empty: " << s.empty() << endl;  // 0
    return 0;
}\`,
    syntaxCard: { title: "SYNTAX: Stack", content: \`stack<T> s;
s.push(x);    // add to top
s.pop();      // remove top
s.top();      // peek top
s.size();     // count
s.empty();    // is empty?
// LIFO: Last In, First Out\` },
    mistakes: [
      { wrong: "s.pop();  // just checking top", correct: "s.top();  // peek, s.pop();  // remove", explanation: "pop() removes the element and returns void. Use top() to peek before popping." },
    ],
    leetcode: { problem: "LeetCode #20 - Valid Parentheses - Check if brackets are properly matched.", approach: "Push opening brackets, pop when closing matches. Stack must be empty at end.", dryRun: "push (, pop match, push [, pop match, push {, pop match -> valid!", code: "class Solution { public: bool isValid(string s) { stack<char> st; for (char c : s) { if (c=='('||c=='['||c=='{') st.push(c); else { if (st.empty()) return false; char t=st.top(); st.pop(); if (c==')'&&t!='(') return false; if (c==']'&&t!='[') return false; if (c=='}'&&t!='{') return false; } } return st.empty(); } };", complexity: "Time: O(n), Space: O(n)" },
    checkpoint: { question: "What principle does a stack follow?", options: ["FIFO", "LIFO", "Priority", "Random"], answer: 1 }
  },

  "2.4": {
    id: "2.4", title: "Queue", phaseId: "phase-2", phaseTitle: "STL Module",
    subtopics: ["FIFO principle", "push, pop, front, back", "BFS with queue"],
    story: \`A **queue** is like a **line at a ticket counter** — the first person in line is the first person served. **First In, First Out (FIFO)**. New people join at the back, service happens at the front.

Queues are essential for **BFS (Breadth-First Search)** — exploring a graph level by level. They're also used in task scheduling, print spooling, and anywhere you need fair ordering.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│           QUEUE — FIRST IN, FIRST OUT                    │
│                                                          │
│  push(10) -> push(20) -> push(30)                         │
│  Front -> [10, 20, 30] ← Back                            │
│  pop() -> removes 10 (first in, first out!)              │
│  COMPLEXITY: push O(1), pop O(1), front O(1)             │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "queue<int> q; q.push(10); q.push(20);", explanation: "Add elements to back", memoryChange: "10 at front, 20 at back", output: "None" },
      { line: "cout << q.front(); q.pop();", explanation: "Access and remove front element", memoryChange: "20 now at front", output: "10" },
    ],
    code: \`#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    q.push(10); q.push(20); q.push(30);
    cout << "Front: " << q.front() << endl;  // 10
    cout << "Back: " << q.back() << endl;    // 30
    q.pop();
    cout << "Front after pop: " << q.front() << endl;  // 20
    return 0;
}\`,
    syntaxCard: { title: "SYNTAX: Queue", content: \`queue<T> q;
q.push(x);     // add to back
q.pop();       // remove front
q.front();     // peek front
q.back();      // peek back
q.size(); q.empty();
// FIFO: First In, First Out\` },
    mistakes: [
      { wrong: "q.pop() to get value", correct: "int val = q.front(); q.pop();", explanation: "pop() returns void. Call front() first to get the value, then pop() to remove it." },
    ],
    leetcode: { problem: "LeetCode #933 — Number of Recent Calls", approach: "Use queue to store timestamps, remove old ones, return size.", dryRun: "ping(1)->1, ping(100)->2, ping(3001)->3", code: "class RecentCounter {\n    queue<int> q;\npublic:\n    int ping(int t) {\n        q.push(t);\n        while(q.front()<t-3000) q.pop();\n        return q.size();\n    }\n};", complexity: "Time: O(1) amortized, Space: O(n)" },
    checkpoint: { question: "What principle does a queue follow?", options: ["LIFO", "FIFO", "Priority", "Random"], answer: 1 }
  },

  "2.5": {
    id: "2.5", title: "Deque", phaseId: "phase-2", phaseTitle: "STL Module",
    subtopics: ["Double-ended queue", "push/pop from both ends", "Sliding window"],
    story: \`A **deque** (double-ended queue) is like a **two-door bus** — people can board and exit from BOTH front and back! Unlike a regular queue (front only) or stack (top only), a deque lets you add and remove from both ends efficiently.

This makes deques perfect for **sliding window maximum/minimum** problems — you maintain a monotonic deque that keeps elements in decreasing order, giving you O(1) access to the current maximum.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│  DEQUE — DOUBLE-ENDED QUEUE                              │
│  push_front ← [3, 5, 8] -> push_back                     │
│  pop_front  ->           ← pop_back                      │
│  Access both ends in O(1)!                                │
│  COMPLEXITY: O(1) push/pop both ends, O(1) random access │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "deque<int> dq; dq.push_back(10); dq.push_front(5);", explanation: "Add to both ends", memoryChange: "Deque: [5, 10]", output: "None" },
      { line: "dq.pop_front();", explanation: "Remove from front", memoryChange: "Deque: [10]", output: "None" },
    ],
    code: \`#include <iostream>
#include <deque>
using namespace std;

int main() {
    deque<int> dq;
    dq.push_back(10);
    dq.push_front(5);
    dq.push_back(20);
    cout << "Front: " << dq.front() << endl;  // 5
    cout << "Back: " << dq.back() << endl;    // 20
    dq.pop_front();
    dq.pop_back();
    cout << "Remaining: " << dq[0] << endl;  // 10
    return 0;
}\`,
    syntaxCard: { title: "SYNTAX: Deque", content: \`deque<T> dq;
dq.push_front(x);  dq.push_back(x);
dq.pop_front();    dq.pop_back();
dq.front();  dq.back();  dq[i];
// O(1) both ends, O(1) random access\` },
    mistakes: [
      { wrong: "Using vector for front insertions", correct: "Use deque for front insertions (O(1) vs O(n))", explanation: "Inserting at the front of a vector requires shifting all elements. Deque handles front operations in O(1)." },
    ],
    leetcode: { problem: "LeetCode #239 — Sliding Window Maximum", approach: "Monotonic deque: maintain decreasing order, front always has maximum.", dryRun: "[1,3,-1,-3,5,3,6,7], k=3 -> [3,3,5,5,6,7]", code: "class Solution {\npublic:\n    vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n        deque<int> dq; vector<int> res;\n        for (int i=0;i<nums.size();i++) {\n            while(!dq.empty()&&nums[dq.back()]<nums[i]) dq.pop_back();\n            dq.push_back(i);\n            if (dq.front()<=i-k) dq.pop_front();\n            if (i>=k-1) res.push_back(nums[dq.front()]);\n        }\n        return res;\n    }\n};", complexity: "Time: O(n), Space: O(k)" },
    checkpoint: { question: "What makes a deque different from a queue?", options: ["It's slower", "You can add/remove from both ends", "It only allows integers", "It's stack-based"], answer: 1 }
  },

  "2.6": {
    id: "2.6", title: "Priority Queue", phaseId: "phase-2", phaseTitle: "STL Module",
    subtopics: ["Max heap", "Min heap", "Top-K elements", "Dijkstra"],
    story: \`A **priority queue** is like the **emergency room** at a hospital — patients aren't seen in arrival order, but by **severity**. The most critical patient gets treated first, regardless of when they arrived.

In C++, priority_queue is a **max-heap** by default — the largest element is always at the top. Need a min-heap? Use \`priority_queue<int, vector<int>, greater<int>>\`. Priority queues are essential for Dijkstra's shortest path, Huffman coding, and finding top-K elements efficiently.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│  PRIORITY QUEUE — MAX HEAP                               │
│  pq.push(30); pq.push(10); pq.push(20);                  │
│           30                                             │
│          /  \                                            │
│        20    10                                          │
│  top() = 30 (always max!)                                │
│  COMPLEXITY: push O(log n), pop O(log n), top O(1)       │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "priority_queue<int> pq;", explanation: "Create max-heap", memoryChange: "Empty heap", output: "None" },
      { line: "pq.push(30); pq.push(10); pq.push(20);", explanation: "Elements arranged as max-heap", memoryChange: "30 at top", output: "None" },
      { line: "cout << pq.top(); pq.pop();", explanation: "Get max, then remove it", memoryChange: "20 now at top", output: "30" },
    ],
    code: \`#include <iostream>
#include <queue>
using namespace std;

int main() {
    // Max heap (default)
    priority_queue<int> maxPQ;
    maxPQ.push(30); maxPQ.push(10); maxPQ.push(20);
    cout << "Max: " << maxPQ.top() << endl;  // 30

    // Min heap
    priority_queue<int, vector<int>, greater<int>> minPQ;
    minPQ.push(30); minPQ.push(10); minPQ.push(20);
    cout << "Min: " << minPQ.top() << endl;  // 10
    return 0;
}\`,
    syntaxCard: { title: "SYNTAX: Priority Queue", content: \`// Max heap (default):
priority_queue<int> pq;

// Min heap:
priority_queue<int, vector<int>, greater<int>> pq;

pq.push(x);  // O(log n)
pq.pop();     // O(log n)
pq.top();     // O(1)\` },
    mistakes: [
      { wrong: "priority_queue<int, greater<int>> pq;  // missing vector", correct: "priority_queue<int, vector<int>, greater<int>> pq;", explanation: "Min-heap requires all three template parameters: type, underlying container, and comparator." },
    ],
    leetcode: { problem: "LeetCode #215 — Kth Largest Element\n\nFind the kth largest element.", approach: "Maintain min-heap of size k. Top is kth largest.", dryRun: "[3,2,1,5,6,4], k=2 -> min-heap of {5,6}, top=5", code: "class Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        priority_queue<int,vector<int>,greater<int>> pq;\n        for (int n:nums) {\n            pq.push(n);\n            if (pq.size()>k) pq.pop();\n        }\n        return pq.top();\n    }\n};", complexity: "Time: O(n log k), Space: O(k)" },
    checkpoint: { question: "What is the default behavior of C++ priority_queue?", options: ["Min heap", "Max heap", "FIFO", "Sorted array"], answer: 1 }
  },

  "2.7": {
    id: "2.7", title: "Set", phaseId: "phase-2", phaseTitle: "STL Module",
    subtopics: ["Sorted unique elements", "Insert, find, erase", "Lower/upper bound"],
    story: \`A **set** is like a **VIP club** — only UNIQUE guests allowed, and they stand in **sorted order** by name. If you try to add "Alice" twice, the second one is ignored. You can quickly check if someone is in the club (O(log n)), and you can iterate through all members in alphabetical order.

Internally, sets use a **red-black tree** — a self-balancing binary search tree. This guarantees O(log n) for insert, delete, and search. Sets are perfect when you need unique, sorted elements!\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│  SET — SORTED, UNIQUE ELEMENTS                           │
│  set<int> s = {5, 3, 1, 3, 5};                           │
│  Result: {1, 3, 5}  (duplicates removed, sorted!)        │
│  Tree:     3                                             │
│           / \                                            │
│          1   5                                            │
│  COMPLEXITY: insert O(log n), find O(log n), erase O(log n)│
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "set<int> s = {5, 3, 1, 3};", explanation: "Create set — duplicates removed, sorted", memoryChange: "Set: {1, 3, 5}", output: "None" },
      { line: "s.insert(4); s.erase(3);", explanation: "Insert 4, remove 3", memoryChange: "Set: {1, 4, 5}", output: "None" },
      { line: "if(s.count(4)) cout << "found";", explanation: "Check if 4 exists", memoryChange: "No change", output: "found" },
    ],
    code: \`#include <iostream>
#include <set>
using namespace std;

int main() {
    set<int> s = {5, 3, 1, 3, 5};
    for (int x : s) cout << x << " ";  // 1 3 5
    s.insert(4); s.erase(3);
    cout << "\nCount 4: " << s.count(4) << endl;  // 1
    auto it = s.lower_bound(3);  // first >= 3
    cout << "Lower bound 3: " << *it << endl;  // 4
    return 0;
}\`,
    syntaxCard: { title: "SYNTAX: Set", content: \`set<int> s;
s.insert(x);   // O(log n)
s.erase(x);    // O(log n)
s.count(x);    // 0 or 1
s.find(x);     // iterator or s.end()
s.lower_bound(x); s.upper_bound(x);
// Sorted, unique, O(log n) operations\` },
    mistakes: [
      { wrong: "Accessing set elements by index: s[0]", correct: "Use iterator or range-based for loop", explanation: "Sets don't support random access. Use *s.begin() for the smallest element or iterate through the set." },
    ],
    leetcode: { problem: "LeetCode #217 — Contains Duplicate\n\nCheck if array has duplicates.", approach: "Insert into set, compare sizes. Or check if set.count() before inserting.", dryRun: "[1,2,3,1] -> set size 3 < array size 4 -> true", code: "class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        return set<int>(nums.begin(),nums.end()).size()<nums.size();\n    }\n};", complexity: "Time: O(n log n), Space: O(n)" },
    checkpoint: { question: "Does a C++ set allow duplicate elements?", options: ["Yes", "No — only unique elements", "Only if inserted twice", "Depends on type"], answer: 1 }
  },

  "2.8": {
    id: "2.8", title: "Multiset", phaseId: "phase-2", phaseTitle: "STL Module",
    subtopics: ["Allows duplicates", "Sorted", "Count and erase"],
    story: \`A **multiset** is like a **set that allows twins** — you can have multiple copies of the same value, and they're all stored in sorted order. Where a set says "one per customer," a multiset says "come on in, everyone welcome!"

This is useful for problems like "find the median of a stream" where you need sorted order AND duplicates. Be careful with erase() — it removes ALL copies! Use erase(find()) to remove just one.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│  MULTISET — SORTED, DUPLICATES ALLOWED                   │
│  multiset<int> ms = {3, 1, 3, 5, 3};                     │
│  Result: {1, 3, 3, 3, 5}                                 │
│  ms.erase(3) -> removes ALL 3s!                           │
│  ms.erase(ms.find(3)) -> removes ONE 3                    │
│  COMPLEXITY: O(log n) for all operations                  │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "multiset<int> ms = {3, 1, 3, 5};", explanation: "Create multiset with duplicates", memoryChange: "Stored: {1, 3, 3, 5}", output: "None" },
      { line: "ms.erase(ms.find(3));", explanation: "Remove just ONE 3", memoryChange: "Stored: {1, 3, 5}", output: "None" },
    ],
    code: \`#include <iostream>
#include <set>
using namespace std;

int main() {
    multiset<int> ms = {3, 1, 3, 5, 3};
    cout << "Count of 3: " << ms.count(3) << endl;  // 3
    ms.erase(ms.find(3));  // remove ONE 3
    cout << "Count of 3: " << ms.count(3) << endl;  // 2
    return 0;
}\`,
    syntaxCard: { title: "SYNTAX: Multiset", content: \`multiset<int> ms;
ms.insert(x);  ms.erase(ms.find(x));  // remove ONE
ms.erase(x);   // remove ALL copies
ms.count(x);   // number of copies
// Same as set but allows duplicates\` },
    mistakes: [
      { wrong: "ms.erase(3); // wanting to remove one 3", correct: "ms.erase(ms.find(3)); // remove ONE 3", explanation: "erase(value) removes ALL elements with that value. Use erase(find(value)) to remove just one." },
    ],
    leetcode: { problem: "LeetCode #480 — Sliding Window Median", approach: "Use two multisets to track lower and upper halves.", dryRun: "Window median using multiset balance", code: "// Advanced: dual multiset approach", complexity: "Time: O(n log k), Space: O(k)" },
    checkpoint: { question: "How do you remove just one copy from a multiset?", options: ["ms.erase(val)", "ms.erase(ms.find(val))", "ms.remove(val)", "ms.pop(val)"], answer: 1 }
  },

  "2.9": {
    id: "2.9", title: "Unordered Set", phaseId: "phase-2", phaseTitle: "STL Module",
    subtopics: ["Hash-based", "O(1) average", "Not sorted"],
    story: \`An **unordered_set** is like a **coat check** — you hand in your coat, get a ticket, and later retrieve it instantly by ticket number. The coats aren't organized by color or size — they're placed wherever there's space. But retrieval is SUPER fast!

Unlike set (O(log n) with red-black tree), unordered_set uses a **hash table** for O(1) average time on insert/find/erase. The tradeoff: elements are NOT sorted, and worst case is O(n) if there are many hash collisions.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│  UNORDERED_SET — HASH TABLE, NOT SORTED                  │
│  unordered_set<int> us = {5, 1, 3};                      │
│  Iteration order: ANY (1,5,3 or 3,1,5...)               │
│  COMPLEXITY: O(1) average, O(n) worst case               │
│  vs set: O(log n) guaranteed, sorted                     │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "unordered_set<int> us; us.insert(5); us.insert(1);", explanation: "Insert elements (not sorted)", memoryChange: "Hash table entries created", output: "None" },
      { line: "cout << us.count(5);", explanation: "O(1) average lookup", memoryChange: "No change", output: "1" },
    ],
    code: \`#include <iostream>
#include <unordered_set>
using namespace std;

int main() {
    unordered_set<int> us = {5, 1, 3};
    us.insert(7);
    cout << "Has 3: " << us.count(3) << endl;  // 1
    for (int x : us) cout << x << " ";  // order NOT guaranteed
    return 0;
}\`,
    syntaxCard: { title: "SYNTAX: Unordered Set", content: \`unordered_set<int> us;
us.insert(x);  us.erase(x);  us.count(x);  us.find(x);
// O(1) average, NOT sorted
// Use when order doesn't matter and speed does\` },
    mistakes: [
      { wrong: "Expecting sorted iteration from unordered_set", correct: "Use set for sorted iteration", explanation: "unordered_set does NOT maintain sorted order. Use set if you need elements in order." },
    ],
    leetcode: { problem: "LeetCode #217 — Contains Duplicate", approach: "Faster than set solution — O(n) average with unordered_set.", dryRun: "Insert each element, check if already exists before inserting", code: "class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        unordered_set<int> s;\n        for (int n:nums) { if (s.count(n)) return true; s.insert(n); }\n        return false;\n    }\n};", complexity: "Time: O(n) average, Space: O(n)" },
    checkpoint: { question: "What is the average time complexity of unordered_set operations?", options: ["O(log n)", "O(1)", "O(n)", "O(n log n)"], answer: 1 }
  },

  "2.10": {
    id: "2.10", title: "Map", phaseId: "phase-2", phaseTitle: "STL Module",
    subtopics: ["Key-value pairs", "Sorted by key", "operator[]", "find and insert"],
    story: \`A **map** is like a **dictionary** — you look up a word (key) and find its definition (value). Each key maps to exactly one value, and keys are stored in **sorted order**. Maps use a red-black tree internally, so all operations are O(log n).

The powerful **operator[]** lets you read AND create entries: \`m["age"] = 20\` creates the key "age" if it doesn't exist. But be careful — just checking \`m["age"]\` creates an entry with default value! Use \`count()\` or \`find()\` to check without creating.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│  MAP — SORTED KEY-VALUE PAIRS                            │
│  map<string, int> m = {{"age",20}, {"grade",95}};        │
│  Sorted by key: age->20, grade->95                         │
│  m["age"] = 20;     // access or create                  │
│  m.count("age");    // check without creating            │
│  COMPLEXITY: O(log n) for all operations                  │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "map<string,int> m; m["age"]=20; m["grade"]=95;", explanation: "Create map with key-value pairs", memoryChange: "Two entries in red-black tree", output: "None" },
      { line: "cout << m["age"];", explanation: "Access value by key", memoryChange: "No change", output: "20" },
      { line: "if(m.count("name")) cout << m["name"];", explanation: "Safe check before access", memoryChange: "No change", output: "Nothing (key doesn't exist)" },
    ],
    code: \`#include <iostream>
#include <map>
using namespace std;

int main() {
    map<string, int> m;
    m["age"] = 20;
    m["grade"] = 95;
    m.insert({"level", 3});
    
    for (auto& [key, val] : m)
        cout << key << ": " << val << endl;
    
    if (m.count("age")) cout << "Age: " << m["age"] << endl;
    
    auto it = m.find("grade");
    if (it != m.end()) cout << "Grade: " << it->second << endl;
    return 0;
}\`,
    syntaxCard: { title: "SYNTAX: Map", content: \`map<K,V> m;
m[key] = val;    // insert or update
m[key];          // access (creates if missing!)
m.count(key);    // 0 or 1
m.find(key);     // iterator or m.end()
m.erase(key);
for (auto& [k,v] : m)  // sorted iteration\` },
    mistakes: [
      { wrong: "if(m["x"]) { ... }  // checking if key exists", correct: "if(m.count("x")) { ... }  // safe check", explanation: "Using operator[] creates the key with default value if it doesn't exist. Always use count() or find() to check existence." },
    ],
    leetcode: { problem: "LeetCode #1 — Two Sum\n\nReturn indices that add to target.", approach: "Use map to store value->index. O(n) with one pass.", dryRun: "See Phase 2.1 vector example — same hash map approach", code: "// Use unordered_map for O(1) lookup — see 2.12", complexity: "O(n) with unordered_map, O(n log n) with map" },
    checkpoint: { question: "What happens if you access m[key] and the key doesn't exist?", options: ["Returns 0", "Throws error", "Creates entry with default value", "Returns null"], answer: 2 }
  },

  "2.11": {
    id: "2.11", title: "Multimap", phaseId: "phase-2", phaseTitle: "STL Module",
    subtopics: ["Duplicate keys", "Sorted by key", "equal_range"],
    story: \`A **multimap** is like a **phone book** where multiple people can share the same name — "John Smith" might appear multiple times with different phone numbers. Unlike a regular map (one value per key), multimap allows **duplicate keys**.

You can't use operator[] since keys aren't unique. Instead, use insert() and find()/equal_range() to access values.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│  MULTIMAP — DUPLICATE KEYS ALLOWED                       │
│  multimap<string,int> mm;                                │
│  mm.insert({"John", 555}); mm.insert({"John", 556});      │
│  Two entries for "John"!                                  │
│  Use equal_range("John") to get all values               │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "multimap<string,int> mm; mm.insert({"John",555}); mm.insert({"John",556});", explanation: "Insert duplicate keys", memoryChange: "Two John entries", output: "None" },
    ],
    code: \`#include <iostream>
#include <map>
using namespace std;

int main() {
    multimap<string, int> mm;
    mm.insert({"John", 555});
    mm.insert({"John", 556});
    auto range = mm.equal_range("John");
    for (auto it=range.first; it!=range.second; ++it)
        cout << it->first << ": " << it->second << endl;
    return 0;
}\`,
    syntaxCard: { title: "SYNTAX: Multimap", content: \`multimap<K,V> mm;
mm.insert({key, val});  // NO operator[]!
mm.equal_range(key);    // all values for key
mm.count(key);          // number of values\` },
    mistakes: [
      { wrong: "mm["key"] = val; // operator[]", correct: "mm.insert({"key", val}); // use insert", explanation: "Multimap doesn't support operator[] because keys aren't unique. Use insert() instead." },
    ],
    leetcode: { problem: "Group values by key", approach: "Use multimap or map<vector> for grouping.", dryRun: "Multiple entries per key", code: "// See example above", complexity: "O(log n)" },
    checkpoint: { question: "Why doesn't multimap support operator[]?", options: ["It's too slow", "Keys aren't unique — ambiguous which value to return", "It's a bug", "It does support it"], answer: 1 }
  },

  "2.12": {
    id: "2.12", title: "Unordered Map", phaseId: "phase-2", phaseTitle: "STL Module",
    subtopics: ["Hash-based map", "O(1) average", "Most used for competitive programming"],
    story: \`An **unordered_map** is the **most used container** in competitive programming! It's like a **super-fast dictionary** — hash table gives O(1) average lookup instead of O(log n) with regular map. When order doesn't matter, always prefer unordered_map for speed.

It's the go-to for frequency counting, two-sum problems, memoization, and any "have I seen this before?" scenarios. The only downside: no sorted iteration and rare O(n) worst case.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│  UNORDERED_MAP — HASH TABLE, O(1) AVERAGE                │
│  unordered_map<string,int> m;
│  m["age"]=20;  // hash("age") -> bucket -> O(1) store     │
│  m["age"];     // hash("age") -> bucket -> O(1) find      │
│  NOT sorted, but BLAZING FAST                            │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "unordered_map<string,int> m; m["count"]=1; m["count"]++;", explanation: "Hash-based insert and increment", memoryChange: "count=2 in hash table", output: "None" },
    ],
    code: \`#include <iostream>
#include <unordered_map>
using namespace std;

int main() {
    unordered_map<string, int> m;
    m["apple"] = 3;
    m["banana"] = 5;
    m["apple"]++;  // now 4
    
    for (auto& [k, v] : m)
        cout << k << ": " << v << endl;
    return 0;
}\`,
    syntaxCard: { title: "SYNTAX: Unordered Map", content: \`unordered_map<K,V> m;
m[key] = val;  m[key]++;  m.count(key);
m.find(key);  m.erase(key);
// O(1) average, NOT sorted
// #1 choice for competitive programming\` },
    mistakes: [
      { wrong: "unordered_map with custom types without hash", correct: "Provide custom hash or use map instead", explanation: "unordered_map needs a hash function for the key type. Built-in types (int, string) work. Custom types need std::hash specialization." },
    ],
    leetcode: { problem: "LeetCode #1 — Two Sum\n\nReturn indices adding to target.", approach: "unordered_map for O(n) single-pass solution.", dryRun: "[2,7,11,15], target=9 -> map stores {2:0}, finds 7 needs 2 -> [0,1]", code: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int,int> mp;\n        for (int i=0;i<nums.size();i++) {\n            int need=target-nums[i];\n            if (mp.count(need)) return {mp[need],i};\n            mp[nums[i]]=i;\n        }\n        return {};\n    }\n};", complexity: "Time: O(n) average, Space: O(n)" },
    checkpoint: { question: "Why prefer unordered_map over map for competitive programming?", options: ["It's sorted", "O(1) average vs O(log n)", "It uses less memory", "It's safer"], answer: 1 }
  },

  "2.13": {
    id: "2.13", title: "List", phaseId: "phase-2", phaseTitle: "STL Module",
    subtopics: ["Doubly linked list", "O(1) insert/erase anywhere", "No random access"],
    story: \`An STL **list** is a **doubly linked list** — each node points to both its previous and next neighbor. Unlike vectors, you can insert and erase elements ANYWHERE in O(1) time (if you have the iterator). But you CAN'T jump to position 500 instantly — you must walk there from the beginning (O(n)).

Use list when you need frequent insertions/deletions in the middle and don't need random access. Otherwise, vector is almost always better (cache-friendly!).\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│  LIST — DOUBLY LINKED LIST                               │
│  NULL ← [10] ⇄ [20] ⇄ [30] -> NULL                      │
│  insert at iterator: O(1)                                │
│  erase at iterator: O(1)                                 │
│  access by index: O(n) — must traverse!                  │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "list<int> l = {10, 20, 30};", explanation: "Create doubly linked list", memoryChange: "Three nodes linked", output: "None" },
      { line: "auto it = l.begin(); advance(it, 1); l.insert(it, 15);", explanation: "Insert 15 before position 1", memoryChange: "New node: 10->15->20->30", output: "None" },
    ],
    code: \`#include <iostream>
#include <list>
using namespace std;

int main() {
    list<int> l = {10, 20, 30};
    l.push_front(5);
    l.push_back(40);
    l.insert(++l.begin(), 15);  // insert after first
    for (int x : l) cout << x << " ";  // 5 15 10 20 30 40
    l.erase(l.begin());  // remove first
    return 0;
}\`,
    syntaxCard: { title: "SYNTAX: List", content: \`list<T> l;
l.push_front(x); l.push_back(x);
l.pop_front(); l.pop_back();
l.insert(it, x); l.erase(it);
l.sort(); l.reverse(); l.unique();
// O(1) insert/erase with iterator, O(n) access\` },
    mistakes: [
      { wrong: "l[3]; // random access", correct: "auto it=l.begin(); advance(it,3); *it;", explanation: "List doesn't support random access. Use advance() or next() to move iterators." },
    ],
    leetcode: { problem: "LeetCode #146 — LRU Cache", approach: "Use list for order + unordered_map for O(1) access.", dryRun: "put(1,1) put(2,2) get(1) -> reorder", code: "// Combine list + map for O(1) LRU", complexity: "O(1) per operation" },
    checkpoint: { question: "What is the main advantage of list over vector?", options: ["Random access", "O(1) insert/erase at any position with iterator", "Less memory", "Sorted automatically"], answer: 1 }
  },

  "2.14": {
    id: "2.14", title: "Forward List", phaseId: "phase-2", phaseTitle: "STL Module",
    subtopics: ["Singly linked list", "Less memory than list", "Only forward iteration"],
    story: \`A **forward_list** is a **singly linked list** — each node only knows the NEXT node, not the previous one. It uses less memory than list (one pointer per node instead of two) but you can only move forward, not backward.

It's useful when memory is tight and you only need forward traversal. Otherwise, list or vector is usually preferred.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│  FORWARD_LIST — SINGLY LINKED LIST                       │
│  [10] -> [20] -> [30] -> NULL                              │
│  Only forward: begin() to end()                          │
│  push_front O(1), NO push_back                           │
│  Less memory than list (1 pointer vs 2 per node)         │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "forward_list<int> fl = {10, 20, 30};", explanation: "Create singly linked list", memoryChange: "Three nodes, forward only", output: "None" },
    ],
    code: \`#include <iostream>
#include <forward_list>
using namespace std;

int main() {
    forward_list<int> fl = {10, 20, 30};
    fl.push_front(5);
    for (int x : fl) cout << x << " ";  // 5 10 20 30
    fl.pop_front();
    return 0;
}\`,
    syntaxCard: { title: "SYNTAX: Forward List", content: \`forward_list<T> fl;
fl.push_front(x); fl.pop_front();
fl.insert_after(it, x); fl.erase_after(it);
// NO push_back, NO backward iteration
// Less memory than list\` },
    mistakes: [
      { wrong: "fl.push_back(x);", correct: "forward_list has NO push_back! Use insert_after or push_front", explanation: "Singly linked list can't efficiently add to the back — it would require traversing the entire list." },
    ],
    leetcode: { problem: "Memory-constrained linked list operations", approach: "Use forward_list when memory matters more than backward access.", dryRun: "Push front, iterate forward only", code: "// See example above", complexity: "O(1) front ops, O(n) other" },
    checkpoint: { question: "Why doesn't forward_list have push_back()?", options: ["It's a bug", "Singly linked list can't efficiently add to the back", "It's not needed", "Use insert instead"], answer: 1 }
  },

  "2.15": {
    id: "2.15", title: "Bitset", phaseId: "phase-2", phaseTitle: "STL Module",
    subtopics: ["Fixed-size bit array", "Bitwise operations", "Subset enumeration"],
    story: \`A **bitset** is like a **row of light switches** — each switch is either ON (1) or OFF (0). You can flip them individually, check their state, and perform bitwise operations on the entire row at once.

Bitsets are incredibly memory-efficient: 1000 boolean values take just 125 bytes (vs 4000 bytes with bool array)! They're essential for subset enumeration in competitive programming — each bit represents whether an element is included in a subset.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│  BITSET — FIXED-SIZE BIT ARRAY                           │
│  bitset<8> b(42);  // 42 = 00101010                      │
│  [0][0][1][0][1][0][1][0]                                 │
│  b[0]=0, b[1]=1, b[2]=0, b[3]=1, ...                    │
│  b.count() = 3  (three 1s)                                │
│  b.set(7); b.flip(3); b.test(1);                         │
│  COMPLEXITY: O(n/word_size) for operations                │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "bitset<8> b(42);", explanation: "Create bitset from integer 42 = 00101010", memoryChange: "8 bits stored in 1 byte", output: "None" },
      { line: "cout << b.count() << b.test(1);", explanation: "Count set bits, test bit 1", memoryChange: "No change", output: "3 1" },
    ],
    code: \`#include <iostream>
#include <bitset>
using namespace std;

int main() {
    bitset<8> b(42);  // 00101010
    cout << b << endl;         // 00101010
    cout << b.count() << endl; // 3 (three 1s)
    cout << b.test(1) << endl; // 1 (bit 1 is set)
    b.set(0);    // set bit 0 to 1
    b.reset(5);  // set bit 5 to 0
    b.flip();    // flip all bits
    cout << b << endl;
    
    // Subset enumeration
    for (int mask = 0; mask < (1 << 3); mask++) {
        bitset<3> subset(mask);
        cout << subset << endl;
    }
    return 0;
}\`,
    syntaxCard: { title: "SYNTAX: Bitset", content: \`bitset<N> b;       // N bits, all 0
bitset<N> b(42);   // from integer
bitset<N> b(s);    // from string
b.set(i); b.reset(i); b.flip(i);
b.test(i); b.count(); b.any(); b.none();
b & b2; b | b2; b ^ b2; ~b;\` },
    mistakes: [
      { wrong: "bitset<n> b; // n must be compile-time constant", correct: "bitset<8> b; // size must be known at compile time", explanation: "Bitset size must be a compile-time constant. For runtime-sized bit arrays, use vector<bool> or dynamic bitset." },
    ],
    leetcode: { problem: "LeetCode #78 — Subsets\n\nReturn all possible subsets.", approach: "Enumerate all 2^n bitmasks, each bit represents inclusion.", dryRun: "[1,2,3] -> 8 subsets from 000 to 111", code: "class Solution {\npublic:\n    vector<vector<int>> subsets(vector<int>& nums) {\n        int n=nums.size();\n        vector<vector<int>> result;\n        for (int mask=0;mask<(1<<n);mask++) {\n            vector<int> subset;\n            for (int i=0;i<n;i++)\n                if (mask&(1<<i)) subset.push_back(nums[i]);\n            result.push_back(subset);\n        }\n        return result;\n    }\n};", complexity: "Time: O(n * 2^n), Space: O(n * 2^n)" },
    checkpoint: { question: "What is the main advantage of bitset over bool array?", options: ["It's faster for sorting", "Much less memory (1 bit per element vs 1 byte)", "It supports random access", "It's resizable"], answer: 1 }
  }
};