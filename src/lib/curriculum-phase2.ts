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
    "memoryViz": "┌──────────────────────────────────────────────────────────┐\n│              VECTOR MEMORY LAYOUT                        │\n│                                                          │\n│  vector<int> v = {10, 20, 30};                           │\n│                                                          │\n│  size = 3, capacity = 3                                  │\n│  ┌────┬────┬────┐                                        │\n│  │ 10 │ 20 │ 30 │  ← used elements (size)               │\n│  └────┴────┴────┘                                        │\n│                                                          │\n│  After v.push_back(40):                                  │\n│  size = 4, capacity = 6 (doubled!)                       │\n│  ┌────┬────┬────┬────┬────┬────┐                         │\n│  │ 10 │ 20 │ 30 │ 40 │ ?? │ ?? │  ← extra capacity       │\n│  └────┴────┴────┴────┴────┴────┘                         │\n│                                                          │\n│  OPERATIONS:                                             │\n│  push_back(50) → O(1) amortized                          │\n│  pop_back()     → O(1)                                   │\n│  v[i]           → O(1) random access                     │\n│  insert(begin)  → O(n) slow!                             │\n│  erase(begin)   → O(n) slow!                             │\n└──────────────────────────────────────────────────────────┘",
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
      "dryRun": "nums = [2,7,11,15], target = 9\n\ni=0: num=2, need=7, map={} → not found, add {2:0}\ni=1: num=7, need=2, map={2:0} → FOUND! return [0,1]\n\nOutput: [0,1]",
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
  }
};
