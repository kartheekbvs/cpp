import { Topic } from './curriculum';

export const phase3Content: Record<string, Topic> = {
  "3.1": {
    id: "3.1",
    title: "sort()",
    phaseId: "phase-3",
    phaseTitle: "STL Algorithms",
    subtopics: ["Default sort", "Custom comparator", "Partial sort", "Sort with lambda"],
    story: `Imagine you have a **stack of exam papers** in random order and you need to arrange them from highest score to lowest. You could compare each paper with every other paper, but that would take forever with 1000 papers!\n\nThat's where C++'s **sort()** comes in — it's like having a super-fast teaching assistant who uses the best possible strategy. Under the hood, it uses **Introsort** — a hybrid of Quick Sort, Heap Sort, and Insertion Sort.\n\nThe result? It sorts in **O(n log n)** time — for 1 million elements, that's about 20 million operations instead of 1 trillion with bubble sort! By default, sort() arranges in **ascending** order, but you can give it a **custom comparator** to sort by any criteria you want.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐\n│              sort() — INTROSORT IN ACTION                │\n│                                                          │\n│  Before: [5, 2, 8, 1, 9, 3, 7, 4, 6]                   │\n│                                                          │\n│  Step 1: Pick pivot, partition around it                 │\n│  [2,1,3,4]  [5]  [8,9,7,6]                              │\n│                                                          │\n│  Step 2: Recursively sort each side                      │\n│  [1,2,3,4]  [5]  [6,7,8,9]                              │\n│                                                          │\n│  After:  [1, 2, 3, 4, 5, 6, 7, 8, 9]                   │\n│                                                          │\n│  COMPLEXITY: O(n log n) average and worst case           │\n│  NOT STABLE — equal elements may reorder!                │\n└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "#include <algorithm>", explanation: "Include the algorithm library for sort()", memoryChange: "No memory change", output: "None" },
      { line: "vector<int> v = {5, 2, 8, 1, 9};", explanation: "Create unsorted vector", memoryChange: "5 elements on heap", output: "None" },
      { line: "sort(v.begin(), v.end());", explanation: "Sort ascending using Introsort algorithm", memoryChange: "Elements rearranged to {1,2,5,8,9}", output: "None" },
      { line: "sort(v.begin(), v.end(), greater<int>());", explanation: "Sort descending using greater comparator", memoryChange: "Elements rearranged to {9,8,5,2,1}", output: "None" },
      { line: "for(int x : v) cout << x;", explanation: "Print sorted elements", memoryChange: "Read only", output: "9 8 5 2 1" },
    ],
    code: \`#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> v = {5, 2, 8, 1, 9, 3};\n    sort(v.begin(), v.end());\n    cout << "Ascending: ";\n    for (int x : v) cout << x << " ";  // 1 2 3 5 8 9\n    cout << endl;\n\n    sort(v.begin(), v.end(), greater<int>());\n    cout << "Descending: ";\n    for (int x : v) cout << x << " ";  // 9 8 5 3 2 1\n    cout << endl;\n\n    // Sort by last digit using lambda\n    vector<int> nums = {23, 12, 45, 7, 31};\n    sort(nums.begin(), nums.end(), [](int a, int b) {\n        return (a % 10) < (b % 10);\n    });\n    cout << "By last digit: ";\n    for (int x : nums) cout << x << " ";\n\n    // Sort array\n    int arr[] = {9, 1, 7, 3, 5};\n    sort(arr, arr + 5);\n\n    // Sort string\n    string s = "dcbae";\n    sort(s.begin(), s.end());\n    cout << "Sorted string: " << s << endl;  // abcde\n\n    return 0;\n}\`,
    syntaxCard: { title: "SYNTAX: sort()", content: \`sort(begin, end);                   // ascending\nsort(begin, end, greater<T>());     // descending\nsort(begin, end, comparator);       // custom\n\n// LAMBDA:\nsort(v.begin(), v.end(), [](const T& a, const T& b) {\n    return a < b;\n});\n\n// WORKS ON: vector, array, string\n// COMPLEXITY: O(n log n)\n// NOT STABLE: use stable_sort() instead\` },
    mistakes: [
      { wrong: "sort(v.end(), v.begin());", correct: "sort(v.begin(), v.end());", explanation: "First arg must be begin, second must be end. Reversed iterators cause undefined behavior." },
      { wrong: "sort(v.begin(), v.end(), [](int a, int b) { return a <= b; });", correct: "sort(v.begin(), v.end(), [](int a, int b) { return a < b; });", explanation: "Using <= violates strict weak ordering and causes undefined behavior. Must use strict less-than." },
      { wrong: "vector<int> v = {3,1,2}; sort(v+0, v+3);", correct: "sort(v.begin(), v.end());", explanation: "Vectors use iterators, not pointer arithmetic. Use begin()/end()." },
    ],
    leetcode: {
      problem: "LeetCode #912 — Sort an Array\n\nSort an array of integers in ascending order.",
      approach: "Use merge sort for guaranteed O(n log n), or just std::sort() in practice. The key insight is understanding O(n log n) vs O(n^2) performance.",
      dryRun: "Input: [5,2,3,1]\nMerge Sort: split → [5][2][3][1]\nMerge: [2,5] [1,3] → [1,2,3,5]\nOutput: [1,2,3,5]",
      code: "class Solution {\npublic:\n    vector<int> sortArray(vector<int>& nums) {\n        sort(nums.begin(), nums.end());\n        return nums;\n    }\n};",
      complexity: "Time: O(n log n), Space: O(log n) for sort stack"
    },
    checkpoint: { question: "What is the time complexity of std::sort()?", options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"], answer: 1 }
  },

  "3.2": {
    id: "3.2", title: "stable_sort()", phaseId: "phase-3", phaseTitle: "STL Algorithms",
    subtopics: ["Stability concept", "When to use", "Performance tradeoff"],
    story: \`Imagine sorting students by height, but two students — **Ali and Sara** — are the exact same height. Ali was before Sara originally.\n\nWith **regular sort()**, Sara might end up before Ali — equal elements may reorder. But with **stable_sort()**, if Ali was before Sara originally, Ali will STILL be before Sara after sorting. The **relative order of equal elements is preserved**.\n\nThis matters for multi-key sorting: sort by salary first with stable_sort, then by department with stable_sort — employees in the same department will still be ordered by salary!\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐\n│       stable_sort() vs sort() — STABILITY               │\n│                                                          │\n│  Input: (B,5) (A,3) (C,5) (D,1)                        │\n│                                                          │\n│  sort():        (D,1) (A,3) (C,5) (B,5)                 │\n│                             C before B — MAY swap!       │\n│                                                          │\n│  stable_sort(): (D,1) (A,3) (B,5) (C,5)                 │\n│                             B before C — ORDER KEPT      │\n│                                                          │\n│  COMPLEXITY: O(n log^2 n) — slightly slower than sort    │\n└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "vector<pair<string,int>> v = {{\"B\",5},{\"A\",3},{\"C\",5}};", explanation: "Create pairs with duplicate values", memoryChange: "3 pairs in vector", output: "None" },
      { line: "stable_sort(v.begin(), v.end(), [](auto& a, auto& b){ return a.second < b.second; });", explanation: "Stable sort by second value, preserving B before C", memoryChange: "Sorted but B(5) stays before C(5)", output: "None" },
      { line: "for(auto& p : v) cout << p.first;", explanation: "Print sorted result", memoryChange: "Read only", output: "A B C" },
    ],
    code: \`#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<pair<string, int>> v = {\n        {"Bob", 50}, {"Alice", 50}, {"Carol", 70}, {"Dave", 30}\n    };\n\n    stable_sort(v.begin(), v.end(), [](const auto& a, const auto& b) {\n        return a.second < b.second;\n    });\n\n    for (auto& p : v)\n        cout << p.first << ": " << p.second << endl;\n    // Bob stays before Alice (both score 50)\n    return 0;\n}\`,
    syntaxCard: { title: "SYNTAX: stable_sort()", content: \`stable_sort(begin, end);            // ascending, stable\nstable_sort(begin, end, comp);       // custom, stable\n\n// USE WHEN: equal elements must keep original order\n// COMPLEXITY: O(n log^2 n) — slightly slower than sort()\n// GUARANTEE: Preserves relative order of equivalent elements\` },
    mistakes: [
      { wrong: "Using sort() for multi-key sorting", correct: "Use stable_sort() for multi-key sorting", explanation: "Regular sort() destroys the previous sort order for equal elements. stable_sort() preserves it." },
      { wrong: "stable_sort(v.begin(), v.end(), [](int a, int b){ return a <= b; });", correct: "Use < not <=", explanation: "The comparator must use strict less-than to satisfy strict weak ordering." },
    ],
    leetcode: { problem: "LeetCode #1451 — Rearrange Words in a Sentence\n\nSort words by length, maintaining original order for same-length words.", approach: "Perfect use for stable_sort! Split sentence, stable_sort by word length, rejoin.", dryRun: "\"Leetcode is cool\" → [\"is\",\"cool\",\"Leetcode\"]", code: "class Solution {\npublic:\n    string arrangeWords(string text) {\n        text[0] = tolower(text[0]);\n        vector<string> words;\n        stringstream ss(text);\n        string word;\n        while (ss >> word) words.push_back(word);\n        stable_sort(words.begin(), words.end(), [](const string& a, const string& b) {\n            return a.size() < b.size();\n        });\n        string result = words[0];\n        result[0] = toupper(result[0]);\n        for (int i = 1; i < words.size(); i++) result += \" \" + words[i];\n        return result;\n    }\n};", complexity: "Time: O(n log n), Space: O(n)" },
    checkpoint: { question: "What is the key difference between sort() and stable_sort()?", options: ["stable_sort() is faster", "stable_sort() preserves relative order of equal elements", "stable_sort() only works on vectors", "stable_sort() always uses more memory"], answer: 1 }
  },

  "3.3": {
    id: "3.3", title: "reverse()", phaseId: "phase-3", phaseTitle: "STL Algorithms",
    subtopics: ["Reverse vector", "Reverse string", "Reverse substring"],
    story: \`Think of **reverse()** as a **U-turn** for your data. It flips the entire sequence so the last element becomes first and the first becomes last. Every element swaps with its mirror position.\n\nA powerful trick: combining **sort() + reverse()** gives you descending order! Or reverse a string and compare with the original to check for palindromes.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐\n│              reverse() — IN-PLACE REVERSAL               │\n│                                                          │\n│  Before: [1, 2, 3, 4, 5]                                │\n│  Step 1: swap(1,5) → [5, 2, 3, 4, 1]                    │\n│  Step 2: swap(2,4) → [5, 4, 3, 2, 1]                    │\n│  Step 3: middle reached → DONE!                          │\n│  COMPLEXITY: O(n/2) swaps = O(n) time, O(1) space       │\n└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "vector<int> v = {1, 2, 3, 4, 5};", explanation: "Create vector", memoryChange: "5 elements allocated", output: "None" },
      { line: "reverse(v.begin(), v.end());", explanation: "Swap first↔last, second↔second-to-last", memoryChange: "Vector becomes {5,4,3,2,1}", output: "None" },
      { line: "string s = \"hello\"; reverse(s.begin(), s.end());", explanation: "Reverse string characters", memoryChange: "String becomes 'olleh'", output: "None" },
    ],
    code: \`#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <string>\nusing namespace std;\n\nint main() {\n    vector<int> v = {1, 2, 3, 4, 5};\n    reverse(v.begin(), v.end());\n    for (int x : v) cout << x << " ";  // 5 4 3 2 1\n\n    string s = "hello world";\n    reverse(s.begin(), s.end());\n    cout << s << endl;  // dlrow olleh\n\n    // Palindrome check\n    string word = "racecar";\n    string rev = word;\n    reverse(rev.begin(), rev.end());\n    cout << (word == rev ? "Palindrome!" : "Not palindrome") << endl;\n    return 0;\n}\`,
    syntaxCard: { title: "SYNTAX: reverse()", content: \`reverse(begin, end);        // reverse entire range\nreverse(s.begin(), s.end()); // reverse string\nreverse(arr, arr + n);       // reverse array\n\n// COMPLEXITY: O(n) time, O(1) space\n// MODIFIES IN-PLACE\` },
    mistakes: [
      { wrong: "string r = reverse(s.begin(), s.end());", correct: "reverse(s.begin(), s.end()); // returns void", explanation: "reverse() returns void and modifies in-place. It does NOT return a new reversed copy." },
    ],
    leetcode: { problem: "LeetCode #344 — Reverse String\n\nReverse a string in-place with O(1) memory.", approach: "Simply use reverse() on the character vector.", dryRun: "['h','e','l','l','o'] → swap pairs → ['o','l','l','e','h']", code: "class Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        reverse(s.begin(), s.end());\n    }\n};", complexity: "Time: O(n), Space: O(1)" },
    checkpoint: { question: "What does reverse() return?", options: ["A new reversed copy", "void (modifies in-place)", "The original container", "A boolean"], answer: 1 }
  },

  "3.4": {
    id: "3.4", title: "max_element()", phaseId: "phase-3", phaseTitle: "STL Algorithms",
    subtopics: ["Find maximum", "Custom comparator", "Return iterator"],
    story: \`Imagine you're a teacher scanning 100 exam papers to find the **highest score**. That's exactly what **max_element()** does — it scans through the entire range and returns the position of the largest element.\n\nThe key thing: max_element returns an **iterator** (like a pointer), not the value! Use *it to get the value, or it - v.begin() to get the index.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐\n│           max_element() — FIND THE MAXIMUM              │\n│                                                          │\n│  v = [3, 7, 2, 9, 5, 1]                                 │\n│                   MAX → max_element points here!         │\n│                                                          │\n│  auto it = max_element(v.begin(), v.end());              │\n│  *it = 9              // value                           │\n│  it - v.begin() = 3   // index                          │\n│  COMPLEXITY: O(n)                                        │\n└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "vector<int> v = {3, 7, 2, 9, 5};", explanation: "Create vector", memoryChange: "5 elements allocated", output: "None" },
      { line: "auto it = max_element(v.begin(), v.end());", explanation: "Scan all elements for maximum", memoryChange: "Iterator points to 9", output: "None" },
      { line: "cout << *it;", explanation: "Dereference to get value", memoryChange: "No change", output: "9" },
      { line: "cout << (it - v.begin());", explanation: "Calculate index", memoryChange: "No change", output: "3" },
    ],
    code: \`#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> v = {3, 7, 2, 9, 5, 1};\n    auto it = max_element(v.begin(), v.end());\n    cout << "Max: " << *it << " at index " << (it - v.begin()) << endl;\n\n    auto minIt = min_element(v.begin(), v.end());\n    cout << "Min: " << *minIt << endl;\n\n    auto [lo, hi] = minmax_element(v.begin(), v.end());\n    cout << "Min: " << *lo << ", Max: " << *hi << endl;\n    return 0;\n}\`,
    syntaxCard: { title: "SYNTAX: max_element()", content: \`auto it = max_element(begin, end);\n*it                   // value\nit - v.begin()        // index\n\nauto [lo,hi] = minmax_element(begin, end);  // both!\n// COMPLEXITY: O(n), RETURNS: iterator\` },
    mistakes: [
      { wrong: "int m = max_element(v.begin(), v.end());", correct: "int m = *max_element(v.begin(), v.end());", explanation: "max_element returns an ITERATOR. Must dereference with * to get the value." },
    ],
    leetcode: { problem: "LeetCode #53 — Maximum Subarray\n\nFind the subarray with the largest sum.", approach: "Kadane's algorithm: track running sum and max sum. Reset running sum when negative.", dryRun: "[-2,1,-3,4,-1,2,1,-5,4] → max subarray sum = 6", code: "class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        int maxSum = nums[0], curr = 0;\n        for (int n : nums) {\n            curr += n;\n            maxSum = max(maxSum, curr);\n            if (curr < 0) curr = 0;\n        }\n        return maxSum;\n    }\n};", complexity: "Time: O(n), Space: O(1)" },
    checkpoint: { question: "What does max_element() return?", options: ["The maximum value", "An iterator to the maximum element", "The index of the maximum", "A boolean"], answer: 1 }
  },

  "3.5": {
    id: "3.5", title: "min_element()", phaseId: "phase-3", phaseTitle: "STL Algorithms",
    subtopics: ["Find minimum", "minmax_element", "Custom comparator"],
    story: \`If max_element() finds the **tallest person** in a lineup, then min_element() finds the **shortest person**. It scans every element and returns an iterator to the smallest value.\n\nPro tip: if you need BOTH min and max, use **minmax_element()** — it finds both in a single pass!\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐\n│           min_element() — FIND THE MINIMUM              │\n│  v = [5, 3, 8, 1, 9, 2]                                 │\n│              MIN → min_element points here!               │\n│  *minIt = 1, minmax: *lo=1, *hi=9                       │\n│  COMPLEXITY: O(n)                                        │\n└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "vector<int> v = {5, 3, 8, 1, 9};", explanation: "Create vector", memoryChange: "5 elements allocated", output: "None" },
      { line: "auto it = min_element(v.begin(), v.end());", explanation: "Find minimum position", memoryChange: "Iterator points to 1", output: "None" },
      { line: "cout << *it;", explanation: "Get value", memoryChange: "No change", output: "1" },
    ],
    code: \`#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> v = {5, 3, 8, 1, 9, 2};\n    auto minIt = min_element(v.begin(), v.end());\n    cout << "Min: " << *minIt << " at index " << (minIt - v.begin()) << endl;\n\n    auto [lo, hi] = minmax_element(v.begin(), v.end());\n    cout << "Min: " << *lo << ", Max: " << *hi << endl;\n    return 0;\n}\`,
    syntaxCard: { title: "SYNTAX: min_element()", content: \`auto it = min_element(begin, end);\n*it                         // value\nauto [lo,hi] = minmax_element(begin, end);\n// COMPLEXITY: O(n)\` },
    mistakes: [
      { wrong: "int m = min_element(v.begin(), v.end());", correct: "int m = *min_element(v.begin(), v.end());", explanation: "Returns iterator — must dereference with *." },
    ],
    leetcode: { problem: "LeetCode #209 — Minimum Size Subarray Sum", approach: "Sliding window to find smallest subarray with sum >= target.", dryRun: "target=7, nums=[2,3,1,2,4,3] → min length = 2", code: "class Solution {\npublic:\n    int minSubArrayLen(int target, vector<int>& nums) {\n        int n=nums.size(), left=0, sum=0, minLen=n+1;\n        for (int right=0; right<n; right++) {\n            sum += nums[right];\n            while (sum >= target) {\n                minLen = min(minLen, right-left+1);\n                sum -= nums[left++];\n            }\n        }\n        return minLen == n+1 ? 0 : minLen;\n    }\n};", complexity: "Time: O(n), Space: O(1)" },
    checkpoint: { question: "How do you find both min and max in a single pass?", options: ["Call min_element then max_element", "Use minmax_element()", "Use sort()", "Impossible"], answer: 1 }
  },

  "3.6": {
    id: "3.6", title: "count()", phaseId: "phase-3", phaseTitle: "STL Algorithms",
    subtopics: ["Count occurrences", "count_if"],
    story: \`Imagine you're a **ticket collector** checking every person to count how many have a specific ticket type. That's **count()** — it walks through the range and counts matching elements.\n\nFor complex conditions (like "count even numbers"), use **count_if()** with a predicate function.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐\n│  v = [1, 3, 5, 3, 3, 7, 9]                              │\n│  count(v, 3) → 3 occurrences                             │\n│  count_if(even) → 0  (no even numbers)                   │\n│  COMPLEXITY: O(n)                                        │\n└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "vector<int> v = {1, 3, 5, 3, 3, 7};", explanation: "Create vector", memoryChange: "Elements allocated", output: "None" },
      { line: "int c = count(v.begin(), v.end(), 3);", explanation: "Count occurrences of 3", memoryChange: "No change", output: "3" },
      { line: "int e = count_if(v.begin(), v.end(), [](int x){return x%2==0;});", explanation: "Count even numbers", memoryChange: "No change", output: "0" },
    ],
    code: \`#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> v = {1, 3, 5, 3, 3, 7, 9};\n    cout << "Count of 3: " << count(v.begin(), v.end(), 3) << endl;\n    cout << "Even count: " << count_if(v.begin(), v.end(), [](int x){return x%2==0;}) << endl;\n    string s = "hello world";\n    cout << "Spaces: " << count(s.begin(), s.end(), ' ') << endl;\n    return 0;\n}\`,
    syntaxCard: { title: "SYNTAX: count() / count_if()", content: \`count(begin, end, value);           // count matching\ncount_if(begin, end, predicate);    // count satisfying condition\n// COMPLEXITY: O(n)\` },
    mistakes: [
      { wrong: "count(v.begin(), v.end()); // no value", correct: "count(v.begin(), v.end(), targetValue);", explanation: "count() requires the value to search for as the third argument." },
    ],
    leetcode: { problem: "LeetCode #136 — Single Number\n\nEvery element appears twice except one. Find it.", approach: "XOR all elements — pairs cancel to 0, leaving the single number.", dryRun: "[4,1,2,1,2] → 4^1^2^1^2 = 4", code: "class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        int r = 0;\n        for (int n : nums) r ^= n;\n        return r;\n    }\n};", complexity: "Time: O(n), Space: O(1)" },
    checkpoint: { question: "What is the time complexity of count()?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], answer: 1 }
  },

  "3.7": {
    id: "3.7", title: "find()", phaseId: "phase-3", phaseTitle: "STL Algorithms",
    subtopics: ["Linear search", "find_if", "Return iterator"],
    story: \`Think of **find()** as a **detective** searching through a lineup for a suspect. It checks each element one by one and stops at the first match, returning an iterator to that position. If not found, it returns **end()** — always check before dereferencing!\n\nFor sorted containers, binary_search() is much faster, but find() works on any container regardless of order.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐\n│  v = [10, 20, 30, 40, 50]                               │\n│  find(30) → iterator to index 2  ✓                       │\n│  find(99) → v.end()  ✗                                  │\n│  COMPLEXITY: O(n) — linear search                        │\n└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "auto it = find(v.begin(), v.end(), 30);", explanation: "Linear search for value 30", memoryChange: "Iterator points to 30", output: "None" },
      { line: "if (it != v.end()) cout << *it;", explanation: "Check found before dereferencing", memoryChange: "No change", output: "30" },
    ],
    code: \`#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> v = {10, 20, 30, 40, 50};\n    auto it = find(v.begin(), v.end(), 30);\n    if (it != v.end()) cout << "Found at index " << (it - v.begin()) << endl;\n\n    auto even = find_if(v.begin(), v.end(), [](int x) { return x % 20 == 0; });\n    if (even != v.end()) cout << "First div by 20: " << *even << endl;\n    return 0;\n}\`,
    syntaxCard: { title: "SYNTAX: find() / find_if()", content: \`auto it = find(begin, end, value);\nauto it = find_if(begin, end, predicate);\nif (it != v.end()) { /* found */ }\n// COMPLEXITY: O(n)\` },
    mistakes: [
      { wrong: "if (find(v.begin(), v.end(), x)) { ... }", correct: "if (find(v.begin(), v.end(), x) != v.end()) { ... }", explanation: "find returns an iterator, not a boolean. Compare with end() to check if found." },
    ],
    leetcode: { problem: "LeetCode #278 — First Bad Version\n\nFind the first bad version using isBadVersion() API.", approach: "Binary search for the first version where isBadVersion is true.", dryRun: "n=5, bad=4 → binary search → answer 4", code: "class Solution {\npublic:\n    int firstBadVersion(int n) {\n        int lo=1, hi=n;\n        while (lo < hi) {\n            int mid = lo + (hi-lo)/2;\n            if (isBadVersion(mid)) hi = mid;\n            else lo = mid+1;\n        }\n        return lo;\n    }\n};", complexity: "Time: O(log n), Space: O(1)" },
    checkpoint: { question: "What does find() return when element is not found?", options: ["0", "nullptr", "end() iterator", "-1"], answer: 2 }
  },

  "3.8": {
    id: "3.8", title: "binary_search()", phaseId: "phase-3", phaseTitle: "STL Algorithms",
    subtopics: ["Binary search on sorted range", "Return boolean"],
    story: \`Looking up a word in a **dictionary** — you don't read every page, you open to the middle and narrow your search by half each time. That's **binary_search()**!\n\nIt requires the range to be **sorted** first. Returns a boolean — true if found, false if not. If you need the position, use lower_bound() instead.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐\n│  Sorted: [1, 3, 5, 7, 9, 11, 13]                       │\n│  binary_search(7) → true (found)                         │\n│  binary_search(8) → false (not found)                    │\n│  COMPLEXITY: O(log n)                                    │\n└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "bool found = binary_search(v.begin(), v.end(), 7);", explanation: "Binary search for 7 in sorted range", memoryChange: "No change", output: "true" },
    ],
    code: \`#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> v = {1, 3, 5, 7, 9, 11, 13};\n    cout << binary_search(v.begin(), v.end(), 7) << endl;  // 1\n    cout << binary_search(v.begin(), v.end(), 8) << endl;  // 0\n    return 0;\n}\`,
    syntaxCard: { title: "SYNTAX: binary_search()", content: \`binary_search(begin, end, value);  // returns bool\n// MUST BE SORTED FIRST!\n// COMPLEXITY: O(log n)\` },
    mistakes: [
      { wrong: "binary_search on unsorted container", correct: "sort first, then binary_search", explanation: "binary_search requires sorted input. On unsorted data, results are undefined." },
    ],
    leetcode: { problem: "LeetCode #704 — Binary Search\n\nFind target in sorted array, return index or -1.", approach: "Classic binary search with left/right pointers.", dryRun: "nums=[-1,0,3,5,9,12], target=9 → index 4", code: "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int lo=0, hi=nums.size()-1;\n        while (lo<=hi) {\n            int mid=lo+(hi-lo)/2;\n            if (nums[mid]==target) return mid;\n            else if (nums[mid]<target) lo=mid+1;\n            else hi=mid-1;\n        }\n        return -1;\n    }\n};", complexity: "Time: O(log n), Space: O(1)" },
    checkpoint: { question: "What must be true before using binary_search()?", options: ["Must be a vector", "Must be sorted", "Must have unique elements", "Must be non-empty"], answer: 1 }
  },

  "3.9": {
    id: "3.9", title: "lower_bound()", phaseId: "phase-3", phaseTitle: "STL Algorithms",
    subtopics: ["First element >= value", "Insertion point", "Binary search variant"],
    story: \`Imagine a line of people sorted by height. You want the **first person who is at least 170cm**. That's **lower_bound()** — it finds the first element NOT LESS THAN the target.\n\nIf the target exists, it points to its first occurrence. If not, it points to where it WOULD be inserted. Incredibly useful for insertion points and range queries!\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐\n│  v = [1, 3, 3, 5, 7, 9]                                 │\n│  lower_bound(3) → index 1 (first 3)                      │\n│  lower_bound(4) → index 3 (first >= 4 is 5)              │\n│  COMPLEXITY: O(log n) on sorted range                    │\n└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "auto it = lower_bound(v.begin(), v.end(), 4);", explanation: "Find first element >= 4", memoryChange: "Iterator points to 5", output: "None" },
      { line: "cout << *it << \" at \" << (it-v.begin());", explanation: "Get value and index", memoryChange: "No change", output: "5 at 3" },
    ],
    code: \`#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> v = {1, 3, 3, 5, 7, 9};\n    cout << *lower_bound(v.begin(), v.end(), 3) << endl;  // 3\n    cout << *lower_bound(v.begin(), v.end(), 4) << endl;  // 5\n\n    // Check if element exists\n    int target = 5;\n    auto it = lower_bound(v.begin(), v.end(), target);\n    if (it != v.end() && *it == target) cout << "exists\\n";\n\n    // Count occurrences\n    auto lo = lower_bound(v.begin(), v.end(), 3);\n    auto hi = upper_bound(v.begin(), v.end(), 3);\n    cout << "Count of 3: " << (hi - lo) << endl;  // 2\n    return 0;\n}\`,
    syntaxCard: { title: "SYNTAX: lower_bound()", content: \`auto it = lower_bound(begin, end, value);  // first >= value\n*it  // value, it-begin  // index\n// Count: upper_bound(x) - lower_bound(x)\n// O(log n) on sorted range\` },
    mistakes: [
      { wrong: "Using lower_bound on unsorted data", correct: "Sort first, then use lower_bound", explanation: "lower_bound uses binary search internally and requires sorted input." },
    ],
    leetcode: { problem: "LeetCode #35 — Search Insert Position\n\nFind index if found, or insertion index.", approach: "This is literally lower_bound! It finds the first position for insertion.", dryRun: "nums=[1,3,5,6], target=5→2, target=2→1, target=7→4", code: "class Solution {\npublic:\n    int searchInsert(vector<int>& nums, int target) {\n        return lower_bound(nums.begin(), nums.end(), target) - nums.begin();\n    }\n};", complexity: "Time: O(log n), Space: O(1)" },
    checkpoint: { question: "What does lower_bound() return if target doesn't exist?", options: ["end()", "Position where it would be inserted", "-1", "undefined"], answer: 1 }
  },

  "3.10": {
    id: "3.10", title: "upper_bound()", phaseId: "phase-3", phaseTitle: "STL Algorithms",
    subtopics: ["First element > value", "Range queries", "Combined with lower_bound"],
    story: \`If lower_bound() finds the first position >= target, upper_bound() finds the first position > target. Together, they form a **range** — the distance between them tells you how many copies of the target exist in O(log n) time!\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐\n│  v = [1, 3, 3, 3, 5, 7]                                 │\n│  upper_bound(3) → index 4 (first > 3 is 5)               │\n│  Count of 3: upper-lower = 4-1 = 3                       │\n│  COMPLEXITY: O(log n)                                    │\n└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "auto it = upper_bound(v.begin(), v.end(), 3);", explanation: "Find first element > 3", memoryChange: "Iterator points to 5", output: "None" },
      { line: "cout << (upper_bound(v.begin(),v.end(),3) - lower_bound(v.begin(),v.end(),3));", explanation: "Count occurrences of 3", memoryChange: "No change", output: "3" },
    ],
    code: \`#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> v = {1, 3, 3, 3, 5, 7};\n    auto lo = lower_bound(v.begin(), v.end(), 3);\n    auto hi = upper_bound(v.begin(), v.end(), 3);\n    cout << "Count of 3: " << (hi - lo) << endl;  // 3\n    return 0;\n}\`,
    syntaxCard: { title: "SYNTAX: upper_bound()", content: \`auto it = upper_bound(begin, end, value);  // first > value\n// Count: upper_bound(x) - lower_bound(x)\n// O(log n)\` },
    mistakes: [
      { wrong: "upper_bound finds last occurrence", correct: "upper_bound finds first element > value (one past last occurrence)", explanation: "upper_bound points PAST the last occurrence of the value, not to it." },
    ],
    leetcode: { problem: "LeetCode #34 — Find First and Last Position\n\nFind starting and ending position of target in sorted array.", approach: "lower_bound for first, upper_bound-1 for last position.", dryRun: "nums=[5,7,7,8,8,10], target=8 → [3,4]", code: "class Solution {\npublic:\n    vector<int> searchRange(vector<int>& nums, int target) {\n        auto lo = lower_bound(nums.begin(), nums.end(), target);\n        auto hi = upper_bound(nums.begin(), nums.end(), target);\n        if (lo == hi) return {-1,-1};\n        return {(int)(lo-nums.begin()), (int)(hi-nums.begin()-1)};\n    }\n};", complexity: "Time: O(log n), Space: O(1)" },
    checkpoint: { question: "How do you count occurrences in a sorted vector using STL?", options: ["count()", "upper_bound(x) - lower_bound(x)", "binary_search()", "find()"], answer: 1 }
  },

  "3.11": {
    id: "3.11", title: "next_permutation()", phaseId: "phase-3", phaseTitle: "STL Algorithms",
    subtopics: ["Generate all permutations", "Lexicographic order"],
    story: \`Imagine arranging letters of "ABC" in every possible order. **next_permutation()** transforms the current arrangement into the NEXT one in dictionary order. To generate ALL permutations, start sorted and keep calling it until it returns false!\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐\n│  "123" → "132" → "213" → "231" → "312" → "321" → wrap  │\n│  Total: n! permutations                                  │\n│  COMPLEXITY: O(n) per call                               │\n└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "sort(v.begin(), v.end());", explanation: "Must start sorted!", memoryChange: "Elements sorted", output: "None" },
      { line: "do { print(v); } while(next_permutation(v.begin(), v.end()));", explanation: "Generate and print all permutations", memoryChange: "Elements rearranged each call", output: "All permutations" },
    ],
    code: \`#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> v = {1, 2, 3};\n    sort(v.begin(), v.end());\n    do {\n        for (int x : v) cout << x << " ";\n        cout << endl;\n    } while (next_permutation(v.begin(), v.end()));\n    return 0;\n}\`,
    syntaxCard: { title: "SYNTAX: next_permutation()", content: \`do { ... } while (next_permutation(begin, end));\n// MUST sort first! Returns false when wrapped.\n// O(n) per call, n! total permutations\` },
    mistakes: [
      { wrong: "Calling without sorting first", correct: "Always sort before the do-while loop", explanation: "Without sorting first, you miss permutations that come before the initial arrangement." },
    ],
    leetcode: { problem: "LeetCode #46 — Permutations\n\nReturn all possible permutations of distinct integers.", approach: "Sort, then use do-while with next_permutation.", dryRun: "[1,2,3] → 6 permutations generated", code: "class Solution {\npublic:\n    vector<vector<int>> permute(vector<int>& nums) {\n        vector<vector<int>> result;\n        sort(nums.begin(), nums.end());\n        do { result.push_back(nums); } while (next_permutation(nums.begin(), nums.end()));\n        return result;\n    }\n};", complexity: "Time: O(n! * n), Space: O(n! * n)" },
    checkpoint: { question: "What must you do before using next_permutation() for all permutations?", options: ["Nothing", "Sort the sequence first", "Reverse the sequence", "Clear the vector"], answer: 1 }
  },

  "3.12": {
    id: "3.12", title: "prev_permutation()", phaseId: "phase-3", phaseTitle: "STL Algorithms",
    subtopics: ["Previous permutation", "Reverse lexicographic order"],
    story: \`While next_permutation() moves forward through permutations, **prev_permutation()** moves backward! It's like rewinding — turning the page back to the previous arrangement.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐\n│  "321" → "312" → "231" → "213" → "132" → "123" → wrap  │\n│  Same as next_permutation but in reverse!                 │\n│  COMPLEXITY: O(n) per call                               │\n└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "sort(v.begin(), v.end(), greater<int>());", explanation: "Start in descending order", memoryChange: "Elements sorted descending", output: "None" },
      { line: "do { print(v); } while(prev_permutation(v.begin(), v.end()));", explanation: "Generate permutations in reverse", memoryChange: "Elements rearranged", output: "All permutations in reverse" },
    ],
    code: \`#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> v = {3, 2, 1};\n    sort(v.begin(), v.end(), greater<int>());\n    do {\n        for (int x : v) cout << x << " ";\n        cout << endl;\n    } while (prev_permutation(v.begin(), v.end()));\n    return 0;\n}\`,
    syntaxCard: { title: "SYNTAX: prev_permutation()", content: \`do { ... } while (prev_permutation(begin, end));\n// Goes backward through permutations\n// O(n) per call\` },
    mistakes: [
      { wrong: "Using without sorting descending first", correct: "Sort descending before do-while loop", explanation: "To generate ALL permutations going backward, start from the last permutation (descending)." },
    ],
    leetcode: { problem: "LeetCode #31 — Next Permutation\n\nRearrange into lexicographically next greater permutation.", approach: "Use next_permutation() directly, or implement the algorithm manually.", dryRun: "[1,2,3] → [1,3,2]", code: "class Solution {\npublic:\n    void nextPermutation(vector<int>& nums) {\n        next_permutation(nums.begin(), nums.end());\n    }\n};", complexity: "Time: O(n), Space: O(1)" },
    checkpoint: { question: "What happens when prev_permutation() is called on the first permutation?", options: ["Crashes", "Returns false and wraps to last", "Does nothing", "Returns true"], answer: 1 }
  },

  "3.13": {
    id: "3.13", title: "accumulate()", phaseId: "phase-3", phaseTitle: "STL Algorithms",
    subtopics: ["Sum of elements", "Custom operation", "Initial value"],
    story: \`Think of **accumulate()** as a **cash register** — start with an initial amount (0 for sum, 1 for product), then scan each item and combine it with the running total.\n\nThe **initial value** determines the return type! Use 0LL for long long sums, 0.0 for double, string("") for concatenation.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐\n│  v = [1, 2, 3, 4, 5]                                    │\n│  accumulate(..., 0) → 15  (sum)                         │\n│  accumulate(..., 1, multiplies) → 120  (product)        │\n│  accumulate(..., 0LL) → 15LL  (long long sum)           │\n│  COMPLEXITY: O(n)                                        │\n└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "int sum = accumulate(v.begin(), v.end(), 0);", explanation: "Sum all elements starting from 0", memoryChange: "Running total computed", output: "15" },
      { line: "long long safeSum = accumulate(v.begin(), v.end(), 0LL);", explanation: "Sum with long long to avoid overflow", memoryChange: "Running total in long long", output: "15" },
    ],
    code: \`#include <iostream>\n#include <vector>\n#include <numeric>\nusing namespace std;\n\nint main() {\n    vector<int> v = {1, 2, 3, 4, 5};\n    cout << "Sum: " << accumulate(v.begin(), v.end(), 0) << endl;\n    cout << "Safe sum: " << accumulate(v.begin(), v.end(), 0LL) << endl;\n    cout << "Product: " << accumulate(v.begin(), v.end(), 1, multiplies<int>()) << endl;\n\n    vector<string> words = {"Hello", " ", "World"};\n    cout << accumulate(words.begin(), words.end(), string("")) << endl;\n    return 0;\n}\`,
    syntaxCard: { title: "SYNTAX: accumulate()", content: \`accumulate(begin, end, init);                // sum\naccumulate(begin, end, init, operation);      // custom\n// init=0 (sum), 1 (product), 0LL (long long)\n// #include <numeric>\n// O(n)\` },
    mistakes: [
      { wrong: "accumulate(v.begin(), v.end(), 0);  // for large sums", correct: "accumulate(v.begin(), v.end(), 0LL);", explanation: "Starting with 0 gives int result which may overflow. Use 0LL for long long." },
    ],
    leetcode: { problem: "LeetCode #1480 — Running Sum of 1d Array", approach: "Build prefix sum by adding each element to running total.", dryRun: "[1,2,3,4] → [1,3,6,10]", code: "class Solution {\npublic:\n    vector<int> runningSum(vector<int>& nums) {\n        for (int i=1; i<nums.size(); i++) nums[i] += nums[i-1];\n        return nums;\n    }\n};", complexity: "Time: O(n), Space: O(1)" },
    checkpoint: { question: "Why is the initial value in accumulate() important?", options: ["It's optional", "It determines return type and starting value", "It sets array size", "It's always 0"], answer: 1 }
  },

  "3.14": {
    id: "3.14", title: "unique()", phaseId: "phase-3", phaseTitle: "STL Algorithms",
    subtopics: ["Remove consecutive duplicates", "Erase-remove idiom"],
    story: \`**unique()** removes **consecutive** duplicates — keeps the first of each group and shifts the rest left. To remove ALL duplicates, **sort first**, then apply unique().\n\nImportant: unique() doesn't resize the container! Use the **erase-remove idiom**: v.erase(unique(v.begin(), v.end()), v.end()).\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐\n│  v = [1, 1, 2, 2, 3, 3, 3, 4]                          │\n│  After unique: [1, 2, 3, 4, ?, ?, ?, ?]                  │\n│  After erase:  [1, 2, 3, 4]  (properly resized)          │\n│  COMPLEXITY: O(n)                                        │\n└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "sort(v.begin(), v.end());", explanation: "Sort to group duplicates together", memoryChange: "Elements sorted", output: "None" },
      { line: "v.erase(unique(v.begin(), v.end()), v.end());", explanation: "Remove consecutive duplicates and erase extras", memoryChange: "Container resized to unique elements only", output: "None" },
    ],
    code: \`#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> v = {3, 1, 2, 3, 1, 2, 4};\n    sort(v.begin(), v.end());\n    v.erase(unique(v.begin(), v.end()), v.end());\n    for (int x : v) cout << x << " ";  // 1 2 3 4\n    return 0;\n}\`,
    syntaxCard: { title: "SYNTAX: unique()", content: \`auto it = unique(begin, end);\nv.erase(it, v.end());  // erase-remove idiom\n// Sort first to remove ALL duplicates\n// O(n)\` },
    mistakes: [
      { wrong: "unique() without sort for removing all duplicates", correct: "sort first, then unique + erase", explanation: "unique() only removes CONSECUTIVE duplicates. Sort first to group them." },
    ],
    leetcode: { problem: "LeetCode #26 — Remove Duplicates from Sorted Array", approach: "This is literally the unique() algorithm! Use erase-remove idiom.", dryRun: "[0,0,1,1,1,2,2,3,3,4] → new length 5", code: "class Solution {\npublic:\n    int removeDuplicates(vector<int>& nums) {\n        nums.erase(unique(nums.begin(), nums.end()), nums.end());\n        return nums.size();\n    }\n};", complexity: "Time: O(n), Space: O(1)" },
    checkpoint: { question: "What must you do before unique() to remove ALL duplicates?", options: ["Nothing", "Sort first", "Reverse", "Use a set"], answer: 1 }
  },

  "3.15": {
    id: "3.15", title: "fill()", phaseId: "phase-3", phaseTitle: "STL Algorithms",
    subtopics: ["Fill range with value", "fill_n"],
    story: \`**fill()** is like a **paint roller** — it applies one value across an entire range. Initialize an array to 0, set a vector to -1, or fill a string with dashes.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐\n│  fill(v.begin(), v.end(), 0);  → [0,0,0,0,0]            │\n│  fill_n(v.begin(), 3, 7);      → [7,7,7,0,0]            │\n│  COMPLEXITY: O(n)                                        │\n└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "fill(v.begin(), v.end(), 42);", explanation: "Fill entire range with 42", memoryChange: "All elements set to 42", output: "None" },
      { line: "fill_n(v.begin(), 3, 0);", explanation: "Fill first 3 elements with 0", memoryChange: "First 3 elements set to 0", output: "None" },
    ],
    code: \`#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> v(5);\n    fill(v.begin(), v.end(), 42);\n    fill_n(v.begin(), 3, 0);\n    for (int x : v) cout << x << " ";  // 0 0 0 42 42\n    return 0;\n}\`,
    syntaxCard: { title: "SYNTAX: fill()", content: \`fill(begin, end, value);\nfill_n(begin, count, value);\n// O(n)\` },
    mistakes: [
      { wrong: "fill on empty vector", correct: "Resize vector first or use back_inserter", explanation: "fill doesn't create elements — the range must already exist." },
    ],
    leetcode: { problem: "LeetCode #73 — Set Matrix Zeroes", approach: "Track zero positions, then fill rows and columns with 0.", dryRun: "[[1,1,1],[1,0,1],[1,1,1]] → [[1,0,1],[0,0,0],[1,0,1]]", code: "class Solution {\npublic:\n    void setZeroes(vector<vector<int>>& matrix) {\n        int m=matrix.size(), n=matrix[0].size();\n        vector<bool> row(m), col(n);\n        for (int i=0;i<m;i++) for (int j=0;j<n;j++) if (!matrix[i][j]) row[i]=col[j]=true;\n        for (int i=0;i<m;i++) if (row[i]) fill(matrix[i].begin(), matrix[i].end(), 0);\n        for (int j=0;j<n;j++) if (col[j]) for (int i=0;i<m;i++) matrix[i][j]=0;\n    }\n};", complexity: "Time: O(m*n), Space: O(m+n)" },
    checkpoint: { question: "What is the time complexity of fill()?", options: ["O(1)", "O(n)", "O(n log n)", "O(n^2)"], answer: 1 }
  },

  "3.16": {
    id: "3.16", title: "copy()", phaseId: "phase-3", phaseTitle: "STL Algorithms",
    subtopics: ["Copy range", "copy_if", "back_inserter"],
    story: \`**copy()** is a **photocopier** — it copies elements from one range to another. A powerful combo is **copy_if() + back_inserter()** — copies elements that pass a test and automatically pushes them to the destination.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐\n│  copy(src.begin(), src.end(), dst.begin());              │\n│  copy_if(src, back_inserter(evens), [](int x){x%2==0}); │\n│  COMPLEXITY: O(n)                                        │\n└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "copy(v.begin(), v.end(), dst.begin());", explanation: "Copy entire range to destination", memoryChange: "Destination filled with copies", output: "None" },
      { line: "copy_if(v.begin(), v.end(), back_inserter(evens), [](int x){return x%2==0;});", explanation: "Copy only even elements to new vector", memoryChange: "evens vector populated", output: "None" },
    ],
    code: \`#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> src = {1, 2, 3, 4, 5, 6};\n    vector<int> dst(6);\n    copy(src.begin(), src.end(), dst.begin());\n\n    vector<int> evens;\n    copy_if(src.begin(), src.end(), back_inserter(evens),\n            [](int x) { return x % 2 == 0; });\n    for (int x : evens) cout << x << " ";  // 2 4 6\n    return 0;\n}\`,
    syntaxCard: { title: "SYNTAX: copy() / copy_if()", content: \`copy(src_begin, src_end, dst_begin);\ncopy_if(src_begin, src_end, back_inserter(dst), pred);\ncopy_n(src_begin, count, dst_begin);\n// O(n)\` },
    mistakes: [
      { wrong: "copy to smaller destination without back_inserter", correct: "Use back_inserter or ensure destination is large enough", explanation: "copy() doesn't auto-resize. Use back_inserter to grow destination automatically." },
    ],
    leetcode: { problem: "LeetCode #1089 — Duplicate Zeros", approach: "Shift elements right when encountering zero.", dryRun: "[1,0,2,3,0,4] → [1,0,0,2,3,0]", code: "class Solution {\npublic:\n    void duplicateZeros(vector<int>& arr) {\n        int n=arr.size();\n        for (int i=0;i<n;i++) {\n            if (!arr[i]) { arr.insert(arr.begin()+i,0); arr.pop_back(); i++; }\n        }\n    }\n};", complexity: "Time: O(n), Space: O(1)" },
    checkpoint: { question: "What does back_inserter() do with copy()?", options: ["Copies to front", "Auto-pushes to back", "Reverses copy", "Creates new container"], answer: 1 }
  },

  "3.17": {
    id: "3.17", title: "rotate()", phaseId: "phase-3", phaseTitle: "STL Algorithms",
    subtopics: ["Rotate left", "Rotate right", "Circular shift"],
    story: \`**rotate()** is a **circular shift** — it makes the element at the middle position become the new first element. For left rotation by k, use rotate(begin, begin+k, end). For right rotation by k, use rotate(begin, end-k, end).\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐\n│  v = [1, 2, 3, 4, 5]                                    │\n│  Left by 2: rotate(begin, begin+2, end)                  │\n│  Result: [3, 4, 5, 1, 2]                                │\n│  Right by 2: rotate(begin, end-2, end)                   │\n│  Result: [4, 5, 1, 2, 3]                                │\n│  COMPLEXITY: O(n)                                        │\n└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "rotate(v.begin(), v.begin()+2, v.end());", explanation: "Left rotate by 2 positions", memoryChange: "Elements shifted circularly", output: "None" },
    ],
    code: \`#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> v = {1, 2, 3, 4, 5};\n    rotate(v.begin(), v.begin()+2, v.end());  // left by 2\n    for (int x : v) cout << x << " ";  // 3 4 5 1 2\n\n    rotate(v.begin(), v.end()-2, v.end());  // right by 2\n    for (int x : v) cout << x << " ";  // 1 2 3 4 5\n    return 0;\n}\`,
    syntaxCard: { title: "SYNTAX: rotate()", content: \`rotate(begin, new_first, end);\n// Left by k: rotate(begin, begin+k, end)\n// Right by k: rotate(begin, end-k, end)\n// O(n)\` },
    mistakes: [
      { wrong: "rotate(v.begin(), v.begin()+k, v.end()); // right rotate", correct: "For right rotate: rotate(v.begin(), v.end()-k, v.end())", explanation: "begin+k is LEFT rotation. For RIGHT rotation, use end-k." },
    ],
    leetcode: { problem: "LeetCode #189 — Rotate Array\n\nRotate array to the right by k steps.", approach: "Use rotate() or 3-reverse method.", dryRun: "[1,2,3,4,5,6,7], k=3 → [5,6,7,1,2,3,4]", code: "class Solution {\npublic:\n    void rotate(vector<int>& nums, int k) {\n        k %= nums.size();\n        std::rotate(nums.begin(), nums.end()-k, nums.end());\n    }\n};", complexity: "Time: O(n), Space: O(1)" },
    checkpoint: { question: "How do you right-rotate a vector by k?", options: ["rotate(begin, begin+k, end)", "rotate(begin, end-k, end)", "rotate(end-k, begin, end)", "rotate(begin, begin, end-k)"], answer: 1 }
  },

  "3.18": {
    id: "3.18", title: "nth_element()", phaseId: "phase-3", phaseTitle: "STL Algorithms",
    subtopics: ["Partial sorting", "Quickselect", "Find kth element"],
    story: \`Imagine 1000 test scores and you only need the **median** (500th score). You don't need to sort ALL 1000 — just put the 500th in its correct position with smaller on left and larger on right. That's **nth_element()**!\n\nIt's O(n) on average — much faster than sorting (O(n log n)) when you only need the kth element.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐\n│  nth_element: put kth element in correct position        │\n│  v = [7, 2, 5, 1, 8, 3, 9, 4, 6]                       │\n│  nth_element(begin, begin+3, end)                        │\n│  Result: [?, ?, ?, 4, ?, ?, ?, ?, ?]                     │\n│  v[3]=4 (correct!), left <= 4, right >= 4               │\n│  COMPLEXITY: O(n) average                                │\n└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "nth_element(v.begin(), v.begin()+3, v.end());", explanation: "Place 4th smallest in correct position", memoryChange: "v[3] is now the 4th smallest", output: "None" },
      { line: "cout << v[3];", explanation: "Access the kth element", memoryChange: "No change", output: "4" },
    ],
    code: \`#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> v = {7, 2, 5, 1, 8, 3, 9, 4, 6};\n    nth_element(v.begin(), v.begin()+3, v.end());\n    cout << "4th smallest: " << v[3] << endl;  // 4\n\n    // Find median\n    vector<int> v2 = {3, 1, 4, 1, 5, 9, 2, 6, 5};\n    nth_element(v2.begin(), v2.begin()+v2.size()/2, v2.end());\n    cout << "Median: " << v2[v2.size()/2] << endl;\n    return 0;\n}\`,
    syntaxCard: { title: "SYNTAX: nth_element()", content: \`nth_element(begin, nth, end);\n// *nth is the element that WOULD be at this position if sorted\n// Elements before nth are <= *nth (unsorted)\n// Elements after nth are >= *nth (unsorted)\n// O(n) average\` },
    mistakes: [
      { wrong: "Expecting full sort from nth_element", correct: "Use sort() for full sorting, nth_element for kth element only", explanation: "nth_element only guarantees the nth element is in the right place. Elements around it are NOT sorted." },
    ],
    leetcode: { problem: "LeetCode #215 — Kth Largest Element\n\nFind the kth largest element.", approach: "Use nth_element to place kth largest in position.", dryRun: "[3,2,1,5,6,4], k=2 → 5", code: "class Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        nth_element(nums.begin(), nums.end()-k, nums.end());\n        return nums[nums.size()-k];\n    }\n};", complexity: "Time: O(n) average, Space: O(1)" },
    checkpoint: { question: "What is the average time complexity of nth_element()?", options: ["O(n log n)", "O(n)", "O(log n)", "O(n^2)"], answer: 1 }
  }
};
