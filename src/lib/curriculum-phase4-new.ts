import { Topic } from './curriculum';

export const phase4Content: Record<string, Topic> = {
  "4.1": {
    id: "4.1",
    title: "Brute Force",
    phaseId: "phase-4",
    phaseTitle: "Problem Solving Patterns",
    subtopics: ["Nested loops", "Try all combinations", "Generate and test", "When brute force is acceptable"],
    story: `Imagine you lost your keys somewhere in your house. A **brute force** approach means you check every single room, every drawer, every pocket — systematically exhausting every possibility until you find them. It's not elegant, but it's **guaranteed** to work.\n\nIn programming, brute force means trying **every possible combination** to find the answer. Two numbers that sum to target? Try every pair. Maximum subarray? Check every possible subarray. It's the baseline strategy — simple to code, correct by construction, but often **too slow** for large inputs.\n\nThe key skill is knowing WHEN brute force works (small constraints) and when you MUST optimize. Always start with brute force to understand the problem, then optimize!\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│          BRUTE FORCE — TRY EVERY POSSIBILITY             │
│                                                          │
│  Problem: Find pair that sums to 9                       │
│  Array:  [2, 7, 11, 15, 1, 8]                           │
│                                                          │
│  i=0  j=1: 2+7=9  ✓ FOUND!                              │
│  i=0  j=2: 2+11=13 ✗                                     │
│  i=0  j=3: 2+15=17 ✗                                     │
│  ... (check all n*(n-1)/2 pairs)                         │
│                                                          │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐       │
│  │ 2   │ │ 7   │ │ 11  │ │ 15  │ │  1  │ │  8  │       │
│  └──┬──┘ └──┬──┘ └─────┘ └─────┘ └─────┘ └─────┘       │
│     └──9──┘   ✓                                         │
│                                                          │
│  TIME: O(n²) — nested loops over all pairs               │
│  SPACE: O(1) — no extra memory needed                    │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "for (int i = 0; i < n; i++)", explanation: "Outer loop picks first element of the pair", memoryChange: "i = 0, start from beginning", output: "None" },
      { line: "  for (int j = i+1; j < n; j++)", explanation: "Inner loop picks second element (j > i avoids duplicates)", memoryChange: "j starts after i", output: "None" },
      { line: "    if (arr[i] + arr[j] == target)", explanation: "Test if this pair sums to target", memoryChange: "No change, just comparison", output: "None" },
      { line: "      return {i, j};", explanation: "Found the answer! Return indices", memoryChange: "Result stored", output: "[0, 1]" },
      { line: "return {-1, -1};", explanation: "No pair found after checking all possibilities", memoryChange: "Default result", output: "[-1, -1]" },
    ],
    code: \`#include <iostream>
#include <vector>
using namespace std;

// Brute Force: Two Sum
vector<int> twoSum(vector<int>& nums, int target) {
    int n = nums.size();
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (nums[i] + nums[j] == target) {
                return {i, j};
            }
        }
    }
    return {-1, -1};
}

// Brute Force: Maximum Subarray Sum
int maxSubarrayBrute(vector<int>& arr) {
    int n = arr.size();
    int maxSum = arr[0];
    for (int i = 0; i < n; i++) {
        int currentSum = 0;
        for (int j = i; j < n; j++) {
            currentSum += arr[j];
            maxSum = max(maxSum, currentSum);
        }
    }
    return maxSum;
}

// Brute Force: Count inversions
int countInversions(vector<int>& arr) {
    int n = arr.size(), count = 0;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (arr[i] > arr[j]) count++;
        }
    }
    return count;
}

int main() {
    vector<int> nums = {2, 7, 11, 15, 1, 8};
    auto res = twoSum(nums, 9);
    cout << "Two Sum indices: " << res[0] << ", " << res[1] << endl;

    vector<int> arr = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    cout << "Max subarray sum: " << maxSubarrayBrute(arr) << endl;

    vector<int> inv = {5, 3, 2, 4, 1};
    cout << "Inversions: " << countInversions(inv) << endl;
    return 0;
}\`,
    syntaxCard: { title: "PATTERN: Brute Force", content: \`// Template: try all pairs
for (int i = 0; i < n; i++)
  for (int j = i+1; j < n; j++)
    if (check(i, j)) handle();

// Template: try all subarrays
for (int i = 0; i < n; i++) {
  int sum = 0;
  for (int j = i; j < n; j++) {
    sum += arr[j];
    // process subarray [i..j]
  }
}

// WHEN TO USE: n <= 10^3 (O(n²))
// WARNING: Always check if TLE before submitting!\` },
    mistakes: [
      { wrong: "for (int j = 0; j < n; j++) // inner loop from 0", correct: "for (int j = i+1; j < n; j++) // inner loop from i+1", explanation: "Starting inner loop from 0 checks pairs twice (i,j and j,i) and checks i==i. Start from i+1 to avoid duplicates." },
      { wrong: "Thinking brute force is never acceptable", correct: "Brute force works when n is small (n≤1000 for O(n²))", explanation: "For n=1000, O(n²) = 1M operations which runs in ~1ms. Brute force is valid when constraints are small." },
      { wrong: "Skipping brute force and jumping to optimization", correct: "Always code brute force first to verify understanding", explanation: "Brute force ensures you understand the problem. It also provides test cases to verify your optimized solution." },
    ],
    leetcode: {
      problem: "LeetCode #1 — Two Sum\n\nGiven an array of integers and a target, return indices of two numbers that add up to target.",
      approach: "Brute force: for each element, check all elements after it. If any pair sums to target, return their indices. O(n²) time, O(1) space.",
      dryRun: "nums = [2,7,11,15], target = 9\ni=0: nums[0]=2, need 7 → check j=1: nums[1]=7 ✓\nReturn [0, 1]",
      code: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        int n = nums.size();\n        for (int i = 0; i < n; i++)\n            for (int j = i+1; j < n; j++)\n                if (nums[i] + nums[j] == target)\n                    return {i, j};\n        return {};\n    }\n};",
      complexity: "Time: O(n²), Space: O(1)"
    },
    checkpoint: { question: "When is brute force an acceptable approach?", options: ["Never, always optimize", "When n is small enough that O(n²) fits time limits", "Only for O(n) problems", "When the input is sorted"], answer: 1 }
  },

  "4.2": {
    id: "4.2",
    title: "Prefix Sum",
    phaseId: "phase-4",
    phaseTitle: "Problem Solving Patterns",
    subtopics: ["Cumulative sum array", "Range sum queries in O(1)", "2D prefix sums", "Difference array"],
    story: \`Imagine you're a **bank teller** tracking daily deposits. Instead of adding up every day's deposits from scratch each time someone asks "how much was deposited between Day 5 and Day 12?", you keep a **running total**. By Day 12 you know the total is $12,000. By Day 4 it was $3,500. So Day 5–12 deposits = $12,000 − $3,500 = $8,500. Instant answer!\n\nThat's exactly what a **prefix sum** does. You precompute a running total array once in O(n), then every range sum query [L, R] becomes prefix[R] − prefix[L−1] in O(1). Without prefix sums, each query would cost O(n) — for Q queries that's O(nQ). With prefix sums, it's O(n + Q). A massive speedup!\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│         PREFIX SUM — RANGE SUM IN O(1)                   │
│                                                          │
│  Array:     [3,  1,  4,  2,  5,  7,  6]                 │
│  Index:      0   1   2   3   4   5   6                   │
│                                                          │
│  Prefix:    [3,  4,  8, 10, 15, 22, 28]                 │
│             ↑   ↑   ↑   ↑   ↑   ↑   ↑                   │
│            sum  sum  sum sum sum sum  sum                │
│           [0] [0-1][0-2][0-3][0-4][0-5][0-6]            │
│                                                          │
│  Query: sum from index 2 to 5?                           │
│  Answer: prefix[5] - prefix[1] = 22 - 4 = 18            │
│  Verify: 4 + 2 + 5 + 7 = 18 ✓                           │
│                                                          │
│  FORMULA: sum(L,R) = prefix[R] - prefix[L-1]            │
│  BUILD:   O(n)  |  QUERY: O(1)                          │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "vector<int> prefix(n);", explanation: "Allocate prefix sum array of same size", memoryChange: "n integers allocated (all 0)", output: "None" },
      { line: "prefix[0] = arr[0];", explanation: "First prefix is just the first element", memoryChange: "prefix[0] = 3", output: "None" },
      { line: "for (int i = 1; i < n; i++) prefix[i] = prefix[i-1] + arr[i];", explanation: "Build running total: each prefix = previous prefix + current element", memoryChange: "prefix = [3,4,8,10,15,22,28]", output: "None" },
      { line: "int rangeSum(int L, int R) { return prefix[R] - (L>0 ? prefix[L-1] : 0); }", explanation: "Range sum = total up to R minus total before L", memoryChange: "No change", output: "Sum of [L,R]" },
      { line: "cout << rangeSum(2, 5);", explanation: "Query sum from index 2 to 5: 22-4=18", memoryChange: "No change", output: "18" },
    ],
    code: \`#include <iostream>
#include <vector>
using namespace std;

class PrefixSum {
    vector<long long> prefix;
public:
    PrefixSum(vector<int>& arr) {
        int n = arr.size();
        prefix.resize(n);
        prefix[0] = arr[0];
        for (int i = 1; i < n; i++)
            prefix[i] = prefix[i-1] + arr[i];
    }

    long long rangeSum(int L, int R) {
        if (L == 0) return prefix[R];
        return prefix[R] - prefix[L-1];
    }
};

// 2D Prefix Sum for matrix range queries
class PrefixSum2D {
    vector<vector<long long>> pref;
public:
    PrefixSum2D(vector<vector<int>>& mat) {
        int r = mat.size(), c = mat[0].size();
        pref.assign(r+1, vector<long long>(c+1, 0));
        for (int i = 1; i <= r; i++)
            for (int j = 1; j <= c; j++)
                pref[i][j] = mat[i-1][j-1]
                    + pref[i-1][j] + pref[i][j-1]
                    - pref[i-1][j-1];
    }

    long long rangeSum(int r1, int c1, int r2, int c2) {
        return pref[r2+1][c2+1] - pref[r1][c2+1]
             - pref[r2+1][c1] + pref[r1][c1];
    }
};

int main() {
    vector<int> arr = {3, 1, 4, 2, 5, 7, 6};
    PrefixSum ps(arr);
    cout << "Sum [2,5]: " << ps.rangeSum(2, 5) << endl;   // 18
    cout << "Sum [0,3]: " << ps.rangeSum(0, 3) << endl;   // 10
    cout << "Sum [4,6]: " << ps.rangeSum(4, 6) << endl;   // 18

    vector<vector<int>> mat = {{1,2,3},{4,5,6},{7,8,9}};
    PrefixSum2D ps2d(mat);
    cout << "Matrix [0,0]-[1,1]: " << ps2d.rangeSum(0,0,1,1) << endl; // 12
    return 0;
}\`,
    syntaxCard: { title: "PATTERN: Prefix Sum", content: \`// 1D Prefix Sum
prefix[0] = arr[0];
prefix[i] = prefix[i-1] + arr[i];
sum(L,R) = prefix[R] - prefix[L-1];  // L>0
sum(0,R) = prefix[R];                // L==0

// 2D Prefix Sum
pref[i][j] = mat[i-1][j-1] + pref[i-1][j]
            + pref[i][j-1] - pref[i-1][j-1];

// BUILD: O(n)  |  QUERY: O(1)
// USE FOR: range sum queries, submatrix sums\` },
    mistakes: [
      { wrong: "rangeSum(L, R) = prefix[R] - prefix[L]", correct: "rangeSum(L, R) = prefix[R] - prefix[L-1]", explanation: "Subtracting prefix[L] also removes arr[L] from the sum. You need prefix[L-1] to include arr[L] in the result." },
      { wrong: "Forgetting to handle L==0 case", correct: "if (L==0) return prefix[R]; else return prefix[R]-prefix[L-1];", explanation: "When L=0, there's no prefix[-1]. Must handle the edge case separately to avoid out-of-bounds access." },
      { wrong: "Using int for prefix sums with large arrays", correct: "Use long long for prefix sums", explanation: "n elements each up to 10^9 can give prefix sums up to 10^14 which overflows int. Always use long long." },
    ],
    leetcode: {
      problem: "LeetCode #303 — Range Sum Query - Immutable\n\nGiven an integer array, handle multiple queries of sumRange(left, right).",
      approach: "Build prefix sum in constructor. Each query is prefix[right] - prefix[left-1] in O(1).",
      dryRun: "nums = [-2,0,3,-5,2,-1]\nprefix = [-2,-2,1,-4,-2,-3]\nsumRange(2,5) = prefix[5]-prefix[1] = -3-(-2) = -1\nsumRange(0,5) = prefix[5] = -3",
      code: "class NumArray {\n    vector<long long> prefix;\npublic:\n    NumArray(vector<int>& nums) {\n        int n = nums.size();\n        prefix.resize(n);\n        prefix[0] = nums[0];\n        for (int i = 1; i < n; i++)\n            prefix[i] = prefix[i-1] + nums[i];\n    }\n    int sumRange(int left, int right) {\n        if (left == 0) return prefix[right];\n        return prefix[right] - prefix[left-1];\n    }\n};",
      complexity: "Build: O(n), Query: O(1), Space: O(n)"
    },
    checkpoint: { question: "What is the time complexity of answering a range sum query with prefix sums?", options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"], answer: 2 }
  },

  "4.3": {
    id: "4.3",
    title: "Sliding Window",
    phaseId: "phase-4",
    phaseTitle: "Problem Solving Patterns",
    subtopics: ["Fixed-size window", "Variable-size window", "Expand and shrink", "Window invariant"],
    story: \`Imagine you're looking through a **telescope** that can zoom in and out. You slide the telescope across the night sky, adjusting its width to capture exactly the right stars. That's the **sliding window** pattern — you maintain a "window" (a range of elements) and slide it across the array, expanding or shrinking to meet your condition.\n\nFor a **fixed-size** window of length k, you add the new element entering from the right and remove the element leaving from the left — O(1) per step instead of recalculating O(k). For a **variable-size** window, you expand right when the condition isn't met, and shrink left when it is. This two-pointer dance processes each element at most twice, giving O(n) total!\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│       SLIDING WINDOW — EXPAND & SHRINK                   │
│                                                          │
│  Problem: Longest subarray with sum ≤ k=8                │
│  Array:  [4,  1,  1,  1,  2,  3,  5]                    │
│                                                          │
│  Step 1: [4  1  1  1] sum=7 ≤8 → len=4                  │
│              ↑left      ↑right                            │
│                                                          │
│  Step 2: [4  1  1  1  2] sum=9 >8 → shrink!             │
│           ↑left         ↑right                           │
│                                                          │
│  Step 3: [1  1  1  2] sum=5 ≤8 → ok                     │
│           ↑left      ↑right                              │
│                                                          │
│  Step 4: [1  1  1  2  3] sum=8 ≤8 → len=5 ★MAX★         │
│           ↑left         ↑right                           │
│                                                          │
│  EACH ELEMENT: added once (right), removed once (left)   │
│  TOTAL OPERATIONS: O(n) — not O(n²)!                     │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "int left = 0, sum = 0, maxLen = 0;", explanation: "Initialize window boundaries and tracking variables", memoryChange: "left=0, sum=0, maxLen=0", output: "None" },
      { line: "for (int right = 0; right < n; right++) { sum += arr[right];", explanation: "Expand window by including arr[right]", memoryChange: "sum increases by arr[right]", output: "None" },
      { line: "  while (sum > k) { sum -= arr[left]; left++; }", explanation: "Shrink window from left while condition violated", memoryChange: "sum decreases, left moves right", output: "None" },
      { line: "  maxLen = max(maxLen, right - left + 1);", explanation: "Update answer with current valid window size", memoryChange: "maxLen updated if larger", output: "None" },
      { line: "}", explanation: "Loop ends, all positions processed", memoryChange: "Final maxLen stored", output: "Maximum length" },
    ],
    code: \`#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

// Variable-size window: longest subarray with sum <= k
int maxSubarrayLen(vector<int>& arr, int k) {
    int left = 0, sum = 0, maxLen = 0;
    for (int right = 0; right < (int)arr.size(); right++) {
        sum += arr[right];
        while (sum > k) {
            sum -= arr[left];
            left++;
        }
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}

// Fixed-size window: max sum of any subarray of size k
int maxSumWindowK(vector<int>& arr, int k) {
    int sum = 0;
    for (int i = 0; i < k; i++) sum += arr[i];
    int maxSum = sum;
    for (int i = k; i < (int)arr.size(); i++) {
        sum += arr[i] - arr[i - k];  // add new, remove old
        maxSum = max(maxSum, sum);
    }
    return maxSum;
}

// Longest substring with at most K distinct characters
int longestKDistinct(string s, int k) {
    unordered_map<char, int> freq;
    int left = 0, maxLen = 0;
    for (int right = 0; right < (int)s.size(); right++) {
        freq[s[right]]++;
        while ((int)freq.size() > k) {
            freq[s[left]]--;
            if (freq[s[left]] == 0) freq.erase(s[left]);
            left++;
        }
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}

int main() {
    vector<int> arr = {4, 1, 1, 1, 2, 3, 5};
    cout << "Max len (sum<=8): " << maxSubarrayLen(arr, 8) << endl;
    cout << "Max sum (k=3): " << maxSumWindowK(arr, 3) << endl;
    cout << "Longest 2-distinct: " << longestKDistinct("eceba", 2) << endl;
    return 0;
}\`,
    syntaxCard: { title: "PATTERN: Sliding Window", content: \`// Variable-size window template
int left = 0, sum = 0, ans = 0;
for (int right = 0; right < n; right++) {
    sum += arr[right];       // expand
    while (INVALID) {        // condition violated?
        sum -= arr[left];    // shrink from left
        left++;
    }
    ans = max(ans, right-left+1);  // update answer
}

// Fixed-size window template
for (int i = 0; i < k; i++) sum += arr[i];
for (int i = k; i < n; i++) {
    sum += arr[i] - arr[i-k];  // slide window
    ans = max(ans, sum);
}
// TIME: O(n) — each element processed at most twice\` },
    mistakes: [
      { wrong: "Using if instead of while to shrink window", correct: "Use while to shrink until condition is met", explanation: "With 'if', you only shrink by one element, but the window might still violate the condition. Use 'while' to shrink until valid." },
      { wrong: "Forgetting to update answer inside the loop", correct: "Update maxLen/maxSum after ensuring window is valid", explanation: "The answer must be updated after the while loop ensures the window is valid, not before." },
      { wrong: "Using sliding window on negative numbers for sum problems", correct: "Sliding window for sum works only with non-negative numbers", explanation: "With negative numbers, shrinking the window could increase the sum! Use prefix sums or Kadane's instead." },
    ],
    leetcode: {
      problem: "LeetCode #3 — Longest Substring Without Repeating Characters\n\nFind the length of the longest substring without duplicate characters.",
      approach: "Sliding window with hash map tracking last index of each character. When duplicate found, jump left pointer to after the previous occurrence.",
      dryRun: "s = \"abcabcbb\"\nWindow: [a]→[ab]→[abc]→dup! left→1→[bca]→...\nMax length = 3",
      code: "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        unordered_map<char,int> lastSeen;\n        int left = 0, maxLen = 0;\n        for (int right = 0; right < (int)s.size(); right++) {\n            if (lastSeen.count(s[right]) && lastSeen[s[right]] >= left)\n                left = lastSeen[s[right]] + 1;\n            lastSeen[s[right]] = right;\n            maxLen = max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n};",
      complexity: "Time: O(n), Space: O(min(n, charset))"
    },
    checkpoint: { question: "Why is sliding window O(n) and not O(n²)?", options: ["Because the window never shrinks", "Because each element enters once (right) and exits once (left)", "Because the window is always small", "Because we use a hash map"], answer: 1 }
  },

  "4.4": {
    id: "4.4",
    title: "Two Pointers",
    phaseId: "phase-4",
    phaseTitle: "Problem Solving Patterns",
    subtopics: ["Left-right pointers", "Same-direction pointers", "In-place modification", "Sorted array exploitation"],
    story: \`Think of two people walking from opposite ends of a **bridge** toward each other. The left person starts at the beginning, the right person starts at the end. They move toward each other, checking conditions at each step. When they meet in the middle, they're done!\n\nThat's the **two pointers** pattern. Instead of nested loops checking every pair O(n²), you place one pointer at each end and move them based on a condition. For sorted arrays, this is incredibly powerful — if the sum is too small, move the left pointer right (bigger). If too big, move the right pointer left (smaller). Each step eliminates half the remaining possibilities, giving O(n) instead of O(n²)!\n\nTwo pointers also work in the **same direction** — one reads, one writes — for in-place array modification.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│          TWO POINTERS — CONVERGE FROM ENDS               │
│                                                          │
│  Problem: Find pair summing to 26 in sorted array        │
│  Array:  [2,  7,  11, 15, 19, 24, 30]                   │
│           ↑left                    ↑right                │
│                                                          │
│  Step 1: 2 + 30 = 32 > 26 → right--                     │
│           ↑left                ↑right                    │
│                                                          │
│  Step 2: 2 + 24 = 26 = 26 → FOUND! ✓                    │
│           ↑left            ↑right                        │
│                                                          │
│  ┌───┬───┬───┬───┬───┬───┬───┐                          │
│  │ 2 │ 7 │11 │15 │19 │24 │30 │                          │
│  └─↑─┴───┴───┴───┴───┴─↑─┴───┘                          │
│    L                     R  →  sum=26 ✓                 │
│                                                          │
│  KEY: Sorted array → move pointer that helps!            │
│  sum too small → left++  |  sum too big → right--        │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "int left = 0, right = n - 1;", explanation: "Place pointers at both ends of sorted array", memoryChange: "left=0, right=n-1", output: "None" },
      { line: "while (left < right) {", explanation: "Continue until pointers meet", memoryChange: "No change", output: "None" },
      { line: "  int sum = arr[left] + arr[right];", explanation: "Check current pair's sum", memoryChange: "Temporary sum computed", output: "None" },
      { line: "  if (sum == target) return {left, right};", explanation: "Found exact pair!", memoryChange: "Result stored", output: "Indices" },
      { line: "  else if (sum < target) left++;", explanation: "Sum too small, need bigger number → move left right", memoryChange: "left increments", output: "None" },
      { line: "  else right--;", explanation: "Sum too big, need smaller number → move right left", memoryChange: "right decrements", output: "None" },
    ],
    code: \`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Two Sum on sorted array
vector<int> twoSumSorted(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) return {left, right};
        else if (sum < target) left++;
        else right--;
    }
    return {-1, -1};
}

// Remove duplicates from sorted array in-place
int removeDuplicates(vector<int>& nums) {
    if (nums.empty()) return 0;
    int write = 1;
    for (int read = 1; read < (int)nums.size(); read++) {
        if (nums[read] != nums[read - 1])
            nums[write++] = nums[read];
    }
    return write;
}

// Is string a palindrome?
bool isPalindrome(string s) {
    int left = 0, right = s.size() - 1;
    while (left < right) {
        if (s[left] != s[right]) return false;
        left++; right--;
    }
    return true;
}

// Container with most water
int maxArea(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int maxWater = 0;
    while (left < right) {
        int water = min(height[left], height[right]) * (right - left);
        maxWater = max(maxWater, water);
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxWater;
}

int main() {
    vector<int> arr = {2, 7, 11, 15, 19, 24, 30};
    auto res = twoSumSorted(arr, 26);
    cout << "Pair sum 26: [" << res[0] << "," << res[1] << "]" << endl;

    vector<int> dup = {1,1,2,2,3,4,4};
    int len = removeDuplicates(dup);
    cout << "After dedup: ";
    for (int i = 0; i < len; i++) cout << dup[i] << " ";
    cout << "\nPalindrome 'racecar': " << isPalindrome("racecar") << endl;

    vector<int> h = {1,8,6,2,5,4,8,3,7};
    cout << "Max area: " << maxArea(h) << endl;
    return 0;
}\`,
    syntaxCard: { title: "PATTERN: Two Pointers", content: \`// Opposite-direction template (sorted array)
int left = 0, right = n - 1;
while (left < right) {
    int sum = arr[left] + arr[right];
    if (sum == target) found!
    else if (sum < target) left++;
    else right--;
}

// Same-direction template (read/write)
int write = 0;
for (int read = 0; read < n; read++) {
    if (condition) arr[write++] = arr[read];
}

// REQUIRES: sorted array for pair problems
// TIME: O(n) | SPACE: O(1)\` },
    mistakes: [
      { wrong: "Using two pointers on unsorted array for pair-sum", correct: "Sort the array first, then use two pointers", explanation: "The logic of moving left or right based on sum comparison only works because the array is sorted. On unsorted data, moving a pointer doesn't guarantee increase/decrease." },
      { wrong: "while (left <= right) for pair finding", correct: "while (left < right) — same element can't form a pair", explanation: "When left == right, both pointers point to the same element. A pair requires two different elements." },
      { wrong: "Moving both pointers at once in container-with-most-water", correct: "Move only the pointer at the shorter side", explanation: "The area is limited by the shorter side. Moving the taller side can only decrease the area. Move the shorter side to potentially find a taller line." },
    ],
    leetcode: {
      problem: "LeetCode #11 — Container With Most Water\n\nFind two lines that together with x-axis form a container holding the most water.",
      approach: "Two pointers from both ends. Area = min(height[left], height[right]) * (right-left). Move the shorter pointer inward — only the shorter side limits improvement.",
      dryRun: "height = [1,8,6,2,5,4,8,3,7]\nL=0,R=8: area=min(1,7)*8=8, move L (1<7)\nL=1,R=8: area=min(8,7)*7=49, move R\n...\nMax = 49",
      code: "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        int left = 0, right = height.size()-1;\n        int maxWater = 0;\n        while (left < right) {\n            int water = min(height[left], height[right]) * (right-left);\n            maxWater = max(maxWater, water);\n            if (height[left] < height[right]) left++;\n            else right--;\n        }\n        return maxWater;\n    }\n};",
      complexity: "Time: O(n), Space: O(1)"
    },
    checkpoint: { question: "Why do we move the shorter pointer in the container problem?", options: ["It's faster", "Moving the taller side can't increase area since the shorter side limits it", "Both pointers should move together", "It doesn't matter which one moves"], answer: 1 }
  },

  "4.5": {
    id: "4.5",
    title: "Fast & Slow Pointers",
    phaseId: "phase-4",
    phaseTitle: "Problem Solving Patterns",
    subtopics: ["Cycle detection", "Floyd's Tortoise & Hare", "Find cycle start", "Find middle of list"],
    story: \`Imagine two runners on a **circular track** — one runs twice as fast as the other. The slow runner (tortoise) takes one step at a time. The fast runner (hare) takes two steps. If the track is circular, the fast runner will eventually **lap** the slow runner — they'll meet at the same spot! But if the track is straight, the fast runner simply reaches the end.\n\nThis is **Floyd's Tortoise and Hare** algorithm. In a linked list with a cycle, the two pointers are guaranteed to meet. To find WHERE the cycle starts, reset one pointer to the head and move both one step at a time — they'll meet at the cycle entrance! This works because the math guarantees it: the distance from head to cycle start equals the distance from meeting point to cycle start (going around the cycle).\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│    FAST & SLOW POINTERS — CYCLE DETECTION                │
│                                                          │
│  1 → 2 → 3 → 4 → 5                                      │
│              ↑       ↓                                    │
│              8 ← 7 ← 6                                   │
│                                                          │
│  Step 1: slow=2, fast=3                                  │
│  Step 2: slow=3, fast=5                                  │
│  Step 3: slow=4, fast=7                                  │
│  Step 4: slow=5, fast=4  (fast went around!)             │
│  Step 5: slow=6, fast=6  ← THEY MEET! ★                 │
│                                                          │
│  Find cycle start:                                       │
│  Reset slow to head, keep fast at meeting point          │
│  Move both one step: slow=1→2→3→4, fast=6→7→8→4         │
│  They meet at node 4 — cycle start! ✓                    │
│                                                          │
│  TIME: O(n)  |  SPACE: O(1) — no hash set needed!       │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "ListNode *slow = head, *fast = head;", explanation: "Both pointers start at the head of the list", memoryChange: "Two pointers initialized", output: "None" },
      { line: "while (fast && fast->next) {", explanation: "Continue while fast can take two steps", memoryChange: "No change", output: "None" },
      { line: "  slow = slow->next; fast = fast->next->next;", explanation: "Tortoise takes 1 step, hare takes 2 steps", memoryChange: "slow moves 1, fast moves 2", output: "None" },
      { line: "  if (slow == fast) return true; // cycle!", explanation: "If they meet, a cycle exists", memoryChange: "No change", output: "Cycle detected" },
      { line: "return false; // fast reached end", explanation: "Fast pointer hit nullptr — no cycle", memoryChange: "No change", output: "No cycle" },
    ],
    code: \`#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// Detect if cycle exists
bool hasCycle(ListNode *head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}

// Find cycle start node
ListNode *detectCycle(ListNode *head) {
    ListNode *slow = head, *fast = head;
    bool hasCycle = false;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) { hasCycle = true; break; }
    }
    if (!hasCycle) return nullptr;

    slow = head;
    while (slow != fast) {
        slow = slow->next;
        fast = fast->next;
    }
    return slow;  // cycle entrance
}

// Find middle of linked list
ListNode *findMiddle(ListNode *head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}

int main() {
    ListNode* n1 = new ListNode(1);
    ListNode* n2 = new ListNode(2);
    ListNode* n3 = new ListNode(3);
    ListNode* n4 = new ListNode(4);
    n1->next = n2; n2->next = n3;
    n3->next = n4; n4->next = n2; // cycle

    cout << "Has cycle: " << hasCycle(n1) << endl;
    cout << "Cycle starts at: " << detectCycle(n1)->val << endl;

    n4->next = nullptr; // remove cycle
    cout << "Middle: " << findMiddle(n1)->val << endl;
    return 0;
}\`,
    syntaxCard: { title: "PATTERN: Fast & Slow Pointers", content: \`// Cycle detection
ListNode *slow = head, *fast = head;
while (fast && fast->next) {
    slow = slow->next;
    fast = fast->next->next;
    if (slow == fast) return true; // CYCLE!
}
return false; // no cycle

// Find cycle start (after detecting cycle)
slow = head;
while (slow != fast) { slow = slow->next; fast = fast->next; }
return slow; // cycle entrance

// Find middle of list (same as cycle detection, no cycle)
// slow ends up at middle node
// TIME: O(n) | SPACE: O(1)\` },
    mistakes: [
      { wrong: "while (fast->next && fast->next->next)", correct: "while (fast && fast->next)", explanation: "You must check fast itself first before accessing fast->next. The correct order prevents null pointer dereference." },
      { wrong: "Moving fast before checking slow==fast", correct: "Move pointers, THEN check if they meet", explanation: "If you check before moving on the initial position (both at head), they'd trivially be equal and give a false positive." },
      { wrong: "Thinking slow and fast always meet in the middle of the cycle", correct: "They meet somewhere in the cycle, not necessarily the middle", explanation: "The meeting point depends on the cycle length and non-cycle length. To find the cycle START, you need the second phase with one pointer reset to head." },
    ],
    leetcode: {
      problem: "LeetCode #141 — Linked List Cycle\n\nDetermine if a linked list has a cycle.",
      approach: "Floyd's Tortoise and Hare: slow moves 1 step, fast moves 2 steps. If they meet, cycle exists. If fast reaches null, no cycle.",
      dryRun: "1→2→3→4→2 (cycle back to 2)\nslow: 1→2→3→4→2→3...\nfast: 1→3→2→4→3→4...\nThey meet! Cycle detected.",
      code: "class Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        ListNode *slow = head, *fast = head;\n        while (fast && fast->next) {\n            slow = slow->next;\n            fast = fast->next->next;\n            if (slow == fast) return true;\n        }\n        return false;\n    }\n};",
      complexity: "Time: O(n), Space: O(1)"
    },
    checkpoint: { question: "After slow and fast meet in a cycle, how do you find where the cycle starts?", options: ["Move both one step at a time from meeting point", "Reset one pointer to head, move both one step at a time until they meet", "Count steps from head to meeting point", "It's impossible to find the start"], answer: 1 }
  },

  "4.6": {
    id: "4.6",
    title: "Binary Search",
    phaseId: "phase-4",
    phaseTitle: "Problem Solving Patterns",
    subtopics: ["Search space halving", "Lower/upper bound", "Search on answer", "Rotated sorted array"],
    story: \`Imagine playing **Guess the Number** — I pick a number between 1 and 1000. Each time you guess, I say "too high" or "too low." Your best strategy? Always guess the **middle** — 500, then 250 or 750, etc. Each guess eliminates HALF the remaining numbers! In just 10 guesses, you can find any number in 1 to 1000 (2^10 = 1024).\n\nThat's **binary search** — repeatedly halving the search space. It works whenever there's a **monotonic** property: on one side all answers are "too low" and on the other "too high." This applies beyond sorted arrays — you can binary search on the **answer** itself ("What's the minimum speed to arrive on time?"). The key insight: if speed X works, any speed > X also works — that's a monotonic property!\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│        BINARY SEARCH — HALVE THE SEARCH SPACE            │
│                                                          │
│  Find 7 in sorted array:                                 │
│  [1, 3, 5, 7, 9, 11, 13]                                │
│   L        M          H                                  │
│                                                          │
│  Step 1: mid=3, arr[3]=7 == target ✓ FOUND!              │
│                                                          │
│  Find 8 (not in array):                                  │
│  Step 1: L=0, H=6, M=3, arr[3]=7 < 8 → L=4              │
│  Step 2: L=4, H=6, M=5, arr[5]=11 > 8 → H=4             │
│  Step 3: L=4, H=4, M=4, arr[4]=9 > 8 → H=3              │
│  Step 4: L=4 > H=3 → NOT FOUND                          │
│                                                          │
│  SEARCH ON ANSWER:                                       │
│  "Min speed to finish in time?"                          │
│  speed=1: fail → speed=100: pass                         │
│  Find leftmost pass using binary search!                 │
│                                                          │
│  TIME: O(log n) — each step halves the space             │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "int lo = 0, hi = n - 1;", explanation: "Initialize search boundaries covering entire array", memoryChange: "lo=0, hi=n-1", output: "None" },
      { line: "while (lo <= hi) {", explanation: "Continue while search space is valid", memoryChange: "No change", output: "None" },
      { line: "  int mid = lo + (hi - lo) / 2;", explanation: "Find middle (avoids overflow vs (lo+hi)/2)", memoryChange: "mid computed", output: "None" },
      { line: "  if (arr[mid] == target) return mid;", explanation: "Found target!", memoryChange: "No change", output: "Index" },
      { line: "  else if (arr[mid] < target) lo = mid + 1;", explanation: "Target is in right half, discard left", memoryChange: "lo updated", output: "None" },
      { line: "  else hi = mid - 1;", explanation: "Target is in left half, discard right", memoryChange: "hi updated", output: "None" },
    ],
    code: \`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Classic binary search
int binarySearch(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

// Find first element >= target (lower_bound)
int findLowerBound(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size();
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] < target) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}

// Search in rotated sorted array
int searchRotated(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        if (arr[lo] <= arr[mid]) {  // left half sorted
            if (arr[lo] <= target && target < arr[mid]) hi = mid - 1;
            else lo = mid + 1;
        } else {  // right half sorted
            if (arr[mid] < target && target <= arr[hi]) lo = mid + 1;
            else hi = mid - 1;
        }
    }
    return -1;
}

// Binary search on answer: min speed to finish in time
// (simplified: find smallest x where check(x) is true)
int searchOnAnswer(int lo, int hi, function<bool(int)> check) {
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (check(mid)) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}

int main() {
    vector<int> arr = {1, 3, 5, 7, 9, 11, 13};
    cout << "Find 7: " << binarySearch(arr, 7) << endl;
    cout << "Find 8: " << binarySearch(arr, 8) << endl;
    cout << "Lower bound 6: " << findLowerBound(arr, 6) << endl;

    vector<int> rot = {4, 5, 6, 7, 0, 1, 2};
    cout << "Find 0 in rotated: " << searchRotated(rot, 0) << endl;
    return 0;
}\`,
    syntaxCard: { title: "PATTERN: Binary Search", content: \`// Classic binary search
int lo = 0, hi = n - 1;
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;  // no overflow!
    if (arr[mid] == target) return mid;
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
}

// Lower bound (first >= target)
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid;
}

// Search on answer
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (check(mid)) hi = mid; else lo = mid + 1;
}
// TIME: O(log n) | SPACE: O(1)\` },
    mistakes: [
      { wrong: "int mid = (lo + hi) / 2;", correct: "int mid = lo + (hi - lo) / 2;", explanation: "lo + hi can overflow for large values (e.g., both near INT_MAX). The alternative formula avoids overflow." },
      { wrong: "while (lo < hi) for exact-match search", correct: "while (lo <= hi) when you need to check the final element", explanation: "With lo < hi, you skip checking when lo == hi. For exact match, you need lo <= hi to examine every position." },
      { wrong: "Binary searching on unsorted data", correct: "Binary search requires a monotonic property", explanation: "The array must be sorted (or have a monotonic property like 'all fails before all passes'). Without this, halving the search space doesn't work." },
    ],
    leetcode: {
      problem: "LeetCode #704 — Binary Search\n\nFind target in a sorted array of n integers. Return index or -1.",
      approach: "Classic binary search: maintain lo and hi, compute mid, narrow search space by half each iteration.",
      dryRun: "nums = [-1,0,3,5,9,12], target = 9\nlo=0,hi=5,mid=2: 3<9→lo=3\nlo=3,hi=5,mid=4: 9==9→return 4",
      code: "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int lo = 0, hi = nums.size()-1;\n        while (lo <= hi) {\n            int mid = lo + (hi-lo)/2;\n            if (nums[mid] == target) return mid;\n            else if (nums[mid] < target) lo = mid+1;\n            else hi = mid-1;\n        }\n        return -1;\n    }\n};",
      complexity: "Time: O(log n), Space: O(1)"
    },
    checkpoint: { question: "Why use \`lo + (hi - lo) / 2\` instead of \`(lo + hi) / 2\`?", options: ["It's faster", "It avoids integer overflow when lo and hi are large", "It gives a different result", "It works with negative numbers"], answer: 1 }
  },

  "4.7": {
    id: "4.7",
    title: "Greedy",
    phaseId: "phase-4",
    phaseTitle: "Problem Solving Patterns",
    subtopics: ["Locally optimal choices", "Activity selection", "Greedy exchange proof", "When greedy fails"],
    story: \`Imagine you're at a **buffet** with a plate that holds exactly 5 items. You want to maximize deliciousness. A greedy strategy: always pick the MOST delicious item available. Sometimes this works perfectly (pick the 5 tastiest dishes). Other times it fails — you skip a medium-tasty dish that would have paired perfectly with two others.\n\n**Greedy algorithms** make the best LOCAL choice at each step, never looking back or reconsidering. When they work, they're incredibly simple and fast. The challenge is **proving** they work — you must show that a locally optimal choice never prevents reaching a globally optimal solution. Use the **exchange argument**: if an optimal solution differs from greedy, swap one choice — it can only improve or stay the same.\n\nClassic example: giving minimum coins for change. With US coins (1,5,10,25), greedy works. With coins (1,3,4) and target 6, greedy gives 4+1+1=3 coins, but optimal is 3+3=2 coins. Greedy isn't always right!\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│          GREEDY — LOCAL = GLOBAL?                        │
│                                                          │
│  Activity Selection: choose max non-overlapping          │
│                                                          │
│  Activities:  A1  A2  A3  A4  A5  A6                    │
│  Start:       1   3   0   5   8   5                     │
│  End:         2   4   6   7   9   9                     │
│                                                          │
│  Sort by end time: A1(1-2) A2(3-4) A4(5-7) A5(8-9)     │
│                                                          │
│  Pick A1 → ends at 2 → pick A2 (start 3≥2) →           │
│  ends at 4 → pick A4 (start 5≥4) → ends at 7 →         │
│  pick A5 (start 8≥7) → DONE! 4 activities ★            │
│                                                          │
│  WHY IT WORKS: Picking earliest finish leaves            │
│  maximum room for remaining activities!                  │
│                                                          │
│  GREEDY CHOICE: always pick earliest finishing           │
│  TIME: O(n log n) for sorting  |  SPACE: O(1)           │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "sort(activities.begin(), activities.end(), sortByEnd);", explanation: "Sort activities by their end time (greedy criterion)", memoryChange: "Activities reordered by end time", output: "None" },
      { line: "int count = 1, lastEnd = activities[0].end;", explanation: "Pick the first (earliest finishing) activity", memoryChange: "count=1, lastEnd set", output: "None" },
      { line: "for (int i = 1; i < n; i++) {", explanation: "Consider each remaining activity", memoryChange: "No change", output: "None" },
      { line: "  if (activities[i].start >= lastEnd) {", explanation: "If this activity doesn't overlap with last picked", memoryChange: "No change", output: "None" },
      { line: "    count++; lastEnd = activities[i].end;", explanation: "Pick it! Update last end time", memoryChange: "count incremented, lastEnd updated", output: "None" },
      { line: "  }", explanation: "Skip overlapping activities", memoryChange: "No change", output: "Total count" },
    ],
    code: \`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Activity Selection: max non-overlapping intervals
int maxActivities(vector<pair<int,int>>& activities) {
    sort(activities.begin(), activities.end(),
         [](auto& a, auto& b) { return a.second < b.second; });
    int count = 1, lastEnd = activities[0].second;
    for (int i = 1; i < (int)activities.size(); i++) {
        if (activities[i].first >= lastEnd) {
            count++;
            lastEnd = activities[i].second;
        }
    }
    return count;
}

// Jump Game II: min jumps to reach end
int jump(vector<int>& nums) {
    int jumps = 0, farthest = 0, currentEnd = 0;
    for (int i = 0; i < (int)nums.size() - 1; i++) {
        farthest = max(farthest, i + nums[i]);
        if (i == currentEnd) {
            jumps++;
            currentEnd = farthest;
        }
    }
    return jumps;
}

// Fractional Knapsack
double fractionalKnapsack(vector<pair<int,int>>& items, int W) {
    // items: {weight, value}
    sort(items.begin(), items.end(),
         [](auto& a, auto& b) {
             return (double)a.second/a.first > (double)b.second/b.first;
         });
    double totalValue = 0;
    for (auto& [wt, val] : items) {
        if (W >= wt) { totalValue += val; W -= wt; }
        else { totalValue += val * ((double)W / wt); break; }
    }
    return totalValue;
}

int main() {
    vector<pair<int,int>> acts = {{1,2},{3,4},{0,6},{5,7},{8,9},{5,9}};
    cout << "Max activities: " << maxActivities(acts) << endl;

    vector<int> jumps = {2,3,1,1,4};
    cout << "Min jumps: " << jump(jumps) << endl;

    vector<pair<int,int>> items = {{10,60},{20,100},{30,120}};
    cout << "Max value: " << fractionalKnapsack(items, 50) << endl;
    return 0;
}\`,
    syntaxCard: { title: "PATTERN: Greedy", content: \`// Greedy template
1. Identify the greedy choice (what to optimize locally)
2. Sort by that criterion
3. Make the choice, update state, repeat

// Activity Selection: sort by end time, pick non-overlapping
sort by end time; pick if start >= lastEnd

// Jump Game: extend farthest reach, jump when needed

// PROVING GREEDY: Exchange argument
// Show swapping any optimal choice with greedy
// never makes the solution worse

// WARNING: Greedy doesn't always work!
// Counter-example: coin change with {1,3,4}, target=6
// Greedy: 4+1+1=3, Optimal: 3+3=2\` },
    mistakes: [
      { wrong: "Sorting activities by start time for activity selection", correct: "Sort by end time to maximize room for future activities", explanation: "Sorting by start time picks the earliest starting activity, but it might run long and block many others. Sorting by end time ensures you free up the maximum remaining time." },
      { wrong: "Assuming greedy always gives the optimal answer", correct: "Prove greedy works for each specific problem using exchange argument", explanation: "Greedy works for some problems (activity selection, Huffman) but fails for others (0/1 knapsack vs fractional knapsack). Always verify with proof or counter-example." },
      { wrong: "Using greedy for 0/1 Knapsack", correct: "0/1 Knapsack requires DP; only Fractional Knapsack uses greedy", explanation: "In 0/1 Knapsack you can't take fractions — picking the highest value/weight item greedily might waste capacity. Fractional Knapsack allows fractions, so greedy works." },
    ],
    leetcode: {
      problem: "LeetCode #55 — Jump Game\n\nGiven an array of max jump lengths, determine if you can reach the last index.",
      approach: "Greedy: track the farthest reachable index. If at any point current position exceeds farthest, stuck. If farthest reaches end, success.",
      dryRun: "nums = [2,3,1,1,4]\ni=0: farthest=2, i=1: farthest=4, i=2: farthest=4\ni=3: farthest=4 ≥ last index → true!",
      code: "class Solution {\npublic:\n    bool canJump(vector<int>& nums) {\n        int farthest = 0;\n        for (int i = 0; i < (int)nums.size(); i++) {\n            if (i > farthest) return false;\n            farthest = max(farthest, i + nums[i]);\n            if (farthest >= (int)nums.size()-1) return true;\n        }\n        return true;\n    }\n};",
      complexity: "Time: O(n), Space: O(1)"
    },
    checkpoint: { question: "What is the key to proving a greedy algorithm is correct?", options: ["It runs in O(n) time", "Exchange argument: swapping optimal with greedy never worsens the solution", "It always sorts the input first", "It uses no extra memory"], answer: 1 }
  },

  "4.8": {
    id: "4.8",
    title: "Hashing",
    phaseId: "phase-4",
    phaseTitle: "Problem Solving Patterns",
    subtopics: ["Frequency maps", "Hash sets for membership", "Counting patterns", "Rabin-Karp rolling hash"],
    story: \`Imagine you're a **bouncer** at a club with a VIP list. Instead of searching through a notebook page by page (O(n)), you have the names organized so you can instantly check if someone is on the list (O(1)). That's a **hash table** — it maps keys to positions for instant lookup.\n\nIn competitive programming, hashing is your ** Swiss army knife**. Need to count character frequencies? unordered_map<char,int>. Find duplicates? unordered_set. Two-sum in O(n)? Store each number, then for each target check if complement exists. Group anagrams? Hash by sorted string. The pattern: whenever you need **"have I seen this before?"** or **"how many times does this appear?"**, reach for a hash table.\n\nThe trade-off: hash tables use O(n) extra memory, and worst-case is O(n) per operation (hash collisions). But in practice, it's O(1) amortized.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│          HASHING — O(1) LOOKUP MAGIC                     │
│                                                          │
│  Problem: Two Sum (find pair summing to 9)                │
│  Array:  [2, 7, 11, 15]                                  │
│                                                          │
│  Hash Map (value → index):                               │
│  ┌───────┬───────┐                                       │
│  │ Key   │ Value │                                       │
│  ├───────┼───────┤                                       │
│  │ 2     │ 0     │  ← seen so far                        │
│  │ 7     │ 1     │                                       │
│  │ 11    │ 2     │                                       │
│  │ 15    │ 3     │                                       │
│  └───────┴───────┘                                       │
│                                                          │
│  For each num, check: is (target - num) in map?          │
│  i=0: need 7, not in map → add {2:0}                    │
│  i=1: need 2, FOUND at index 0! → return [0,1]          │
│                                                          │
│  BRUTE FORCE: O(n²)  |  HASHING: O(n)                   │
│  SPACE: O(n) for the hash map                            │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "unordered_map<int,int> seen;", explanation: "Create hash map to store value → index", memoryChange: "Empty hash map allocated", output: "None" },
      { line: "for (int i = 0; i < n; i++) {", explanation: "Process each element", memoryChange: "No change", output: "None" },
      { line: "  int complement = target - nums[i];", explanation: "Calculate what value we need to find", memoryChange: "complement computed", output: "None" },
      { line: "  if (seen.count(complement)) return {seen[complement], i};", explanation: "Check if complement already seen — O(1) lookup!", memoryChange: "No change", output: "Indices" },
      { line: "  seen[nums[i]] = i;", explanation: "Store current value and its index", memoryChange: "Hash map entry added", output: "None" },
    ],
    code: \`#include <iostream>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <string>
#include <algorithm>
using namespace std;

// Two Sum with hashing
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int,int> seen;
    for (int i = 0; i < (int)nums.size(); i++) {
        int comp = target - nums[i];
        if (seen.count(comp)) return {seen[comp], i};
        seen[nums[i]] = i;
    }
    return {};
}

// Character frequency map
unordered_map<char,int> charFreq(string s) {
    unordered_map<char,int> freq;
    for (char c : s) freq[c]++;
    return freq;
}

// Find all duplicates
vector<int> findDuplicates(vector<int>& nums) {
    unordered_set<int> seen;
    vector<int> dups;
    for (int x : nums) {
        if (seen.count(x)) dups.push_back(x);
        seen.insert(x);
    }
    return dups;
}

// Group anagrams
vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> groups;
    for (string& s : strs) {
        string key = s;
        sort(key.begin(), key.end());
        groups[key].push_back(s);
    }
    vector<vector<string>> result;
    for (auto& [key, group] : groups)
        result.push_back(group);
    return result;
}

// Longest consecutive sequence
int longestConsecutive(vector<int>& nums) {
    unordered_set<int> s(nums.begin(), nums.end());
    int longest = 0;
    for (int x : s) {
        if (!s.count(x - 1)) {  // start of sequence
            int len = 1;
            while (s.count(x + len)) len++;
            longest = max(longest, len);
        }
    }
    return longest;
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    auto res = twoSum(nums, 9);
    cout << "Two Sum: [" << res[0] << "," << res[1] << "]" << endl;

    auto freq = charFreq("hello world");
    cout << "Freq of 'l': " << freq['l'] << endl;

    vector<int> d = {1,2,3,2,4,3};
    auto dups = findDuplicates(d);
    cout << "Duplicates: ";
    for (int x : dups) cout << x << " ";
    cout << endl;
    return 0;
}\`,
    syntaxCard: { title: "PATTERN: Hashing", content: \`// Hash map: key → value (frequency, index, etc.)
unordered_map<int,int> freq;
freq[key]++;               // increment
freq.count(key)            // check existence
freq[key]                  // access (0 if not exists)

// Hash set: membership check
unordered_set<int> seen;
seen.insert(x);            // add
seen.count(x)              // check (0 or 1)
seen.erase(x)              // remove

// Common patterns:
// Two Sum: check complement in map
// Frequency: freq[key]++
// Duplicates: check set before inserting
// Group: hash by key (sorted string, etc.)
// TIME: O(1) average per operation | SPACE: O(n)\` },
    mistakes: [
      { wrong: "for (auto& [key, val] : freq) { ... } expecting ordered iteration", correct: "Use map (not unordered_map) for ordered keys", explanation: "unordered_map doesn't guarantee any iteration order. Use std::map for sorted key traversal." },
      { wrong: "if (freq[key]) to check existence in map", correct: "if (freq.count(key)) to check without inserting", explanation: "freq[key] creates a default entry (0) if key doesn't exist! Use count() or find() to check without side effects." },
      { wrong: "Assuming hash operations are always O(1)", correct: "Average O(1), worst case O(n) due to collisions", explanation: "Hash collisions can degrade performance. For guaranteed O(log n), use std::map (red-black tree) instead." },
    ],
    leetcode: {
      problem: "LeetCode #49 — Group Anagrams\n\nGroup strings that are anagrams of each other.",
      approach: "Sort each string to get a canonical key. All anagrams produce the same sorted string. Use hash map from sorted string → list of original strings.",
      dryRun: "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]\n\"eat\"→\"aet\", \"tea\"→\"aet\", \"tan\"→\"ant\"\nGroups: {\"aet\":[eat,tea,ate], \"ant\":[tan,nat], \"abt\":[bat]}",
      code: "class Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        unordered_map<string, vector<string>> groups;\n        for (string& s : strs) {\n            string key = s;\n            sort(key.begin(), key.end());\n            groups[key].push_back(s);\n        }\n        vector<vector<string>> result;\n        for (auto& [k, v] : groups) result.push_back(v);\n        return result;\n    }\n};",
      complexity: "Time: O(n * k log k) where k is max string length, Space: O(n * k)"
    },
    checkpoint: { question: "What's the danger of using \`freq[key]\` to check if a key exists?", options: ["It crashes if key doesn't exist", "It creates a default entry (0) for missing keys", "It returns the wrong value", "It's slower than count()"], answer: 1 }
  },

  "4.9": {
    id: "4.9",
    title: "Monotonic Stack",
    phaseId: "phase-4",
    phaseTitle: "Problem Solving Patterns",
    subtopics: ["Next greater element", "Next smaller element", "Previous greater/smaller", "Span problems"],
    story: \`Imagine a line of people of different heights standing in a row, all facing right. Each person wants to know: **"Who is the next person taller than me?"** They can only see people to their right who are visible (not blocked by someone taller in between).\n\nA **monotonic stack** solves this elegantly. Process elements left to right, maintaining a stack that's **always decreasing** (for "next greater"). When a new element arrives, it "knocks out" all stack elements smaller than it — for each knocked-out element, this new element is their **next greater**! The stack stays monotonic (decreasing) because any smaller element below a bigger one would have been knocked out.\n\nThis pattern extends to "next smaller" (increasing stack), "previous greater" (right-to-left processing), and more. Each element is pushed and popped at most once — O(n) total!\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│      MONOTONIC STACK — NEXT GREATER ELEMENT              │
│                                                          │
│  Array:  [4,  5,  2,  25,  7,  8]                       │
│  Index:   0   1   2   3   4   5                          │
│                                                          │
│  Processing (decreasing stack):                          │
│  i=0: stack=[4]                                         │
│  i=1: 5>4 → pop 4, NGE[0]=5. stack=[5]                  │
│  i=2: 2<5 → push. stack=[5,2]                           │
│  i=3: 25>2 → pop 2, NGE[2]=25                           │
│       25>5 → pop 5, NGE[1]=25. stack=[25]               │
│  i=4: 7<25 → push. stack=[25,7]                         │
│  i=5: 8>7 → pop 7, NGE[4]=8. stack=[25,8]              │
│                                                          │
│  Result: NGE = [5, 25, 25, -1, 8, -1]                   │
│                                                          │
│  Stack is always DECREASING from bottom to top            │
│  Each element: pushed once, popped once → O(n)           │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "vector<int> nge(n, -1); stack<int> st;", explanation: "Initialize result array and empty monotonic stack", memoryChange: "nge filled with -1, empty stack", output: "None" },
      { line: "for (int i = 0; i < n; i++) {", explanation: "Process each element from left to right", memoryChange: "No change", output: "None" },
      { line: "  while (!st.empty() && arr[st.top()] < arr[i]) {", explanation: "Current element is greater than stack top — it's the NGE!", memoryChange: "Comparison made", output: "None" },
      { line: "    nge[st.top()] = arr[i]; st.pop();", explanation: "Set NGE for popped element, remove from stack", memoryChange: "Result updated, stack shrinks", output: "None" },
      { line: "  st.push(i);", explanation: "Push current index onto stack (might be NGE for future elements)", memoryChange: "Stack grows", output: "None" },
    ],
    code: \`#include <iostream>
#include <vector>
#include <stack>
using namespace std;

// Next Greater Element
vector<int> nextGreater(vector<int>& arr) {
    int n = arr.size();
    vector<int> nge(n, -1);
    stack<int> st;  // stores indices
    for (int i = 0; i < n; i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) {
            nge[st.top()] = arr[i];
            st.pop();
        }
        st.push(i);
    }
    return nge;
}

// Next Smaller Element
vector<int> nextSmaller(vector<int>& arr) {
    int n = arr.size();
    vector<int> nse(n, -1);
    stack<int> st;
    for (int i = 0; i < n; i++) {
        while (!st.empty() && arr[st.top()] > arr[i]) {
            nse[st.top()] = arr[i];
            st.pop();
        }
        st.push(i);
    }
    return nse;
}

// Largest Rectangle in Histogram
int largestRectangle(vector<int>& heights) {
    stack<int> st;
    int maxArea = 0;
    int n = heights.size();
    for (int i = 0; i <= n; i++) {
        int h = (i == n) ? 0 : heights[i];
        while (!st.empty() && heights[st.top()] > h) {
            int height = heights[st.top()]; st.pop();
            int width = st.empty() ? i : i - st.top() - 1;
            maxArea = max(maxArea, height * width);
        }
        st.push(i);
    }
    return maxArea;
}

// Daily Temperatures: days until warmer
vector<int> dailyTemperatures(vector<int>& temps) {
    int n = temps.size();
    vector<int> ans(n, 0);
    stack<int> st;
    for (int i = 0; i < n; i++) {
        while (!st.empty() && temps[st.top()] < temps[i]) {
            ans[st.top()] = i - st.top();
            st.pop();
        }
        st.push(i);
    }
    return ans;
}

int main() {
    vector<int> arr = {4, 5, 2, 25, 7, 8};
    auto nge = nextGreater(arr);
    cout << "Next Greater: ";
    for (int x : nge) cout << x << " ";
    cout << endl;

    vector<int> h = {2, 1, 5, 6, 2, 3};
    cout << "Largest rect: " << largestRectangle(h) << endl;

    vector<int> temps = {73,74,75,71,69,72,76,73};
    auto dt = dailyTemperatures(temps);
    cout << "Days until warmer: ";
    for (int x : dt) cout << x << " ";
    cout << endl;
    return 0;
}\`,
    syntaxCard: { title: "PATTERN: Monotonic Stack", content: \`// Next Greater Element (decreasing stack)
vector<int> nge(n, -1);
stack<int> st;  // stores indices
for (int i = 0; i < n; i++) {
    while (!st.empty() && arr[st.top()] < arr[i]) {
        nge[st.top()] = arr[i];
        st.pop();
    }
    st.push(i);
}

// Next Smaller: change < to >
// Previous Greater: iterate right to left
// Largest Rectangle: push sentinel 0 at end

// INVARIANT: stack is always monotonic
// DECREASING stack → next greater
// INCREASING stack → next smaller
// TIME: O(n) — each element pushed/popped once\` },
    mistakes: [
      { wrong: "Storing values in stack instead of indices", correct: "Store indices in the stack, use arr[index] for comparisons", explanation: "Indices let you compute width (for histograms) and write results to the correct position. Values alone lose position information." },
      { wrong: "Using while (!st.empty() && arr[st.top()] >= arr[i])", correct: "Use strict < (not <=) for next greater, unless you want to skip equal elements", explanation: "Using >= pops equal elements too, meaning equal values won't have each other as NGE. This changes the semantics — be intentional about it." },
      { wrong: "Forgetting to handle remaining stack elements", correct: "Elements left in stack have no NGE — they should remain -1", explanation: "The result array initialized with -1 handles this automatically, but be aware that remaining elements have no greater element to their right." },
    ],
    leetcode: {
      problem: "LeetCode #739 — Daily Temperatures\n\nGiven temperatures, for each day return how many days until a warmer temperature.",
      approach: "Monotonic decreasing stack of indices. When a warmer day comes, all colder days on the stack get their answer: current_index - stack_top.",
      dryRun: "temps = [73,74,75,71,69,72,76,73]\ni=1: 74>73, ans[0]=1. i=5: 72>69,ans[4]=1; 72>71,ans[3]=2\ni=6: 76>72,ans[5]=1; 76>75,ans[2]=4",
      code: "class Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temps) {\n        int n = temps.size();\n        vector<int> ans(n, 0);\n        stack<int> st;\n        for (int i = 0; i < n; i++) {\n            while (!st.empty() && temps[st.top()] < temps[i]) {\n                ans[st.top()] = i - st.top();\n                st.pop();\n            }\n            st.push(i);\n        }\n        return ans;\n    }\n};",
      complexity: "Time: O(n), Space: O(n)"
    },
    checkpoint: { question: "Why does the monotonic stack algorithm run in O(n) and not O(n²)?", options: ["Because the stack is always small", "Because each element is pushed once and popped at most once", "Because we only iterate once", "Because comparisons are O(1)"], answer: 1 }
  },

  "4.10": {
    id: "4.10",
    title: "Monotonic Queue/Deque",
    phaseId: "phase-4",
    phaseTitle: "Problem Solving Patterns",
    subtopics: ["Sliding window maximum", "Sliding window minimum", "Deque operations", "Front-back maintenance"],
    story: \`Imagine a **conveyor belt** moving items past an inspection window. You can only see 3 items at a time through the window. You want to know the **largest** item visible at each position. A naive approach re-examines all 3 items every time — O(n*k). But a **monotonic deque** maintains only the candidates for maximum, in decreasing order, giving O(n)!\n\nThe trick: when a new item arrives, remove all items from the back that are smaller — they can NEVER be the maximum while the new item is in the window. The front of the deque is always the current maximum. When the front slides out of the window, remove it. Each item enters and exits the deque at most once, so total work is O(n) despite the nested-looking while loop!\n\nThis pattern applies to sliding window min/max, and any problem where you need the extreme value in a moving window.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│    MONOTONIC DEQUE — SLIDING WINDOW MAXIMUM              │
│                                                          │
│  Array:  [1,  3, -1, -3,  5,  3,  6,  7]  k=3          │
│                                                          │
│  Window [1,3,-1]:  deque=[3,-1]  max=3                   │
│  Window [3,-1,-3]: deque=[3,-1,-3] max=3                 │
│  Window [-1,-3,5]: 5 removes -3,-1; 3 out of window     │
│                     deque=[5]  max=5                      │
│  Window [-3,5,3]:  deque=[5,3]  max=5                    │
│  Window [5,3,6]:   6 removes 3,5; deque=[6]  max=6      │
│  Window [3,6,7]:   7 removes 6; deque=[7]  max=7        │
│                                                          │
│  Deque always DECREASING → front = current max           │
│  Back: remove smaller (they'll never win)                │
│  Front: remove if out of window (index < i-k+1)          │
│                                                          │
│  TIME: O(n) — each element added/removed once            │
│  SPACE: O(k) — deque holds at most k elements            │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "deque<int> dq;  // stores indices", explanation: "Initialize empty deque (will hold indices, not values)", memoryChange: "Empty deque", output: "None" },
      { line: "for (int i = 0; i < n; i++) {", explanation: "Process each element as right edge of window", memoryChange: "No change", output: "None" },
      { line: "  while (!dq.empty() && arr[dq.back()] < arr[i]) dq.pop_back();", explanation: "Remove from back: smaller elements can never be max while arr[i] is in window", memoryChange: "Deque shrinks from back", output: "None" },
      { line: "  dq.push_back(i);", explanation: "Add current index as a candidate", memoryChange: "Deque grows", output: "None" },
      { line: "  if (dq.front() <= i - k) dq.pop_front();", explanation: "Remove from front if index fell out of window", memoryChange: "Deque shrinks from front", output: "None" },
      { line: "  if (i >= k-1) result.push_back(arr[dq.front()]);", explanation: "Window fully formed — front of deque is the maximum", memoryChange: "Result updated", output: "Window max" },
    ],
    code: \`#include <iostream>
#include <vector>
#include <deque>
using namespace std;

// Sliding Window Maximum
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;  // stores indices, values decreasing
    vector<int> result;
    for (int i = 0; i < (int)nums.size(); i++) {
        // Remove smaller elements from back
        while (!dq.empty() && nums[dq.back()] < nums[i])
            dq.pop_back();
        dq.push_back(i);
        // Remove out-of-window from front
        if (dq.front() <= i - k) dq.pop_front();
        // Record max when window is fully formed
        if (i >= k - 1) result.push_back(nums[dq.front()]);
    }
    return result;
}

// Sliding Window Minimum (increasing deque)
vector<int> minSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;  // stores indices, values increasing
    vector<int> result;
    for (int i = 0; i < (int)nums.size(); i++) {
        while (!dq.empty() && nums[dq.back()] > nums[i])
            dq.pop_back();
        dq.push_back(i);
        if (dq.front() <= i - k) dq.pop_front();
        if (i >= k - 1) result.push_back(nums[dq.front()]);
    }
    return result;
}

// Shortest subarray with sum at least K (monotonic deque on prefix sums)
int shortestSubarray(vector<int>& nums, int k) {
    int n = nums.size();
    vector<long long> prefix(n + 1, 0);
    for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];
    deque<int> dq;
    int minLen = n + 1;
    for (int i = 0; i <= n; i++) {
        while (!dq.empty() && prefix[i] - prefix[dq.front()] >= k) {
            minLen = min(minLen, i - dq.front());
            dq.pop_front();
        }
        while (!dq.empty() && prefix[i] <= prefix[dq.back()])
            dq.pop_back();
        dq.push_back(i);
    }
    return minLen == n + 1 ? -1 : minLen;
}

int main() {
    vector<int> nums = {1, 3, -1, -3, 5, 3, 6, 7};
    auto res = maxSlidingWindow(nums, 3);
    cout << "Max sliding window: ";
    for (int x : res) cout << x << " ";
    cout << endl;

    auto minRes = minSlidingWindow(nums, 3);
    cout << "Min sliding window: ";
    for (int x : minRes) cout << x << " ";
    cout << endl;

    vector<int> arr = {2, -1, 2};
    cout << "Shortest subarray sum>=3: " << shortestSubarray(arr, 3) << endl;
    return 0;
}\`,
    syntaxCard: { title: "PATTERN: Monotonic Queue/Deque", content: \`// Sliding Window Maximum (decreasing deque)
deque<int> dq;  // stores indices
for (int i = 0; i < n; i++) {
    // 1. Remove smaller from back (they'll never be max)
    while (!dq.empty() && arr[dq.back()] < arr[i])
        dq.pop_back();
    dq.push_back(i);
    // 2. Remove out-of-window from front
    if (dq.front() <= i - k) dq.pop_front();
    // 3. Front of deque = current max
    if (i >= k-1) ans.push_back(arr[dq.front()]);
}

// For MINIMUM: change < to > in step 1
// TIME: O(n) — each index pushed/popped once
// SPACE: O(k) — at most k elements in deque\` },
    mistakes: [
      { wrong: "Using a regular queue or stack instead of deque", correct: "Use deque for O(1) push/pop from both ends", explanation: "You need to remove from both the front (out of window) and back (smaller elements). Only a deque supports both operations in O(1)." },
      { wrong: "Checking out-of-window before adding current element", correct: "Add current element first, then check if front is out of window", explanation: "The order matters: add current, then remove expired. If you remove expired first, you might remove an element that should be compared with the current one." },
      { wrong: "Storing values instead of indices in deque", correct: "Store indices so you can check if front is out of window", explanation: "Values alone don't tell you when an element exits the window. Indices let you compute i - k for the boundary check." },
    ],
    leetcode: {
      problem: "LeetCode #239 — Sliding Window Maximum\n\nGiven an array and window size k, return the max of each sliding window.",
      approach: "Monotonic decreasing deque of indices. Remove smaller elements from back (they can never be max). Remove out-of-window from front. Front is always the maximum.",
      dryRun: "nums = [1,3,-1,-3,5,3,6,7], k=3\ni=0: dq=[0]  i=1: dq=[1]  i=2: dq=[1,2] max=3\ni=3: dq=[1,2,3] max=3  i=4: dq=[4] max=5\ni=5: dq=[4,5] max=5  i=6: dq=[6] max=6  i=7: dq=[7] max=7",
      code: "class Solution {\npublic:\n    vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n        deque<int> dq;\n        vector<int> result;\n        for (int i = 0; i < (int)nums.size(); i++) {\n            while (!dq.empty() && nums[dq.back()] < nums[i]) dq.pop_back();\n            dq.push_back(i);\n            if (dq.front() <= i - k) dq.pop_front();\n            if (i >= k - 1) result.push_back(nums[dq.front()]);\n        }\n        return result;\n    }\n};",
      complexity: "Time: O(n), Space: O(k)"
    },
    checkpoint: { question: "Why do we remove smaller elements from the back of the deque?", options: ["To keep the deque small", "Because they can never be the maximum while a larger element behind them is in the window", "To sort the deque", "Because they are out of the window"], answer: 1 }
  },

  "4.11": {
    id: "4.11",
    title: "Recursion",
    phaseId: "phase-4",
    phaseTitle: "Problem Solving Patterns",
    subtopics: ["Base case", "Recursive case", "Call stack visualization", "Recurrence relations"],
    story: \`Imagine you're standing in a long line and want to know your position. You ask the person in front: "What's your position?" They ask the person in front of them, and so on, until someone at the front says "I'm position 1!" Then the answers ripple back: "I'm 2" → "I'm 3" → "I'm 4" — and finally you know you're 5th.\n\nThat's **recursion** — solving a problem by breaking it into a smaller version of the SAME problem, until you reach the **base case** (the simplest version you can answer directly). Every recursive function needs two things: (1) a **base case** that stops the recursion, and (2) a **recursive case** that makes progress toward the base case.\n\nThe magic: the function calls itself, and each call gets its own frame on the **call stack**. When a call returns, its result flows back to the caller. Without a base case, you get infinite recursion → stack overflow!\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│          RECURSION — CALL STACK UNWINDING                 │
│                                                          │
│  factorial(5) = 5 * factorial(4)                         │
│              = 5 * 4 * factorial(3)                      │
│              = 5 * 4 * 3 * factorial(2)                  │
│              = 5 * 4 * 3 * 2 * factorial(1)              │
│              = 5 * 4 * 3 * 2 * 1 ← BASE CASE            │
│                                                          │
│  Call Stack (growing down):                              │
│  ┌─────────────────┐                                     │
│  │ factorial(5)     │  waiting for factorial(4)...        │
│  │ factorial(4)     │  waiting for factorial(3)...        │
│  │ factorial(3)     │  waiting for factorial(2)...        │
│  │ factorial(2)     │  waiting for factorial(1)...        │
│  │ factorial(1) → 1 │  BASE CASE! Return immediately     │
│  └─────────────────┘                                     │
│                                                          │
│  Unwinding: f(2)=2*1=2, f(3)=3*2=6,                     │
│             f(4)=4*6=24, f(5)=5*24=120                   │
│                                                          │
│  KEY: Base case + progress toward it = valid recursion   │
│  SPACE: O(depth) for call stack                          │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "int factorial(int n) {", explanation: "Define recursive function", memoryChange: "New stack frame created", output: "None" },
      { line: "  if (n <= 1) return 1;", explanation: "BASE CASE: simplest version, answer directly", memoryChange: "No recursive call", output: "1" },
      { line: "  return n * factorial(n - 1);", explanation: "RECURSIVE CASE: reduce problem, trust the recursive call", memoryChange: "New stack frame for factorial(n-1)", output: "n * (n-1)!" },
      { line: "}", explanation: "Stack frame destroyed, result returned to caller", memoryChange: "Stack frame popped", output: "Result propagated" },
    ],
    code: \`#include <iostream>
#include <vector>
using namespace std;

// Factorial: classic recursion
int factorial(int n) {
    if (n <= 1) return 1;          // base case
    return n * factorial(n - 1);   // recursive case
}

// Fibonacci: multiple recursive calls
int fibonacci(int n) {
    if (n <= 1) return n;          // base case
    return fibonacci(n - 1) + fibonacci(n - 2);  // 2 calls
}

// Reverse string recursively
void reversePrint(const string& s, int i) {
    if (i == (int)s.length()) return;
    reversePrint(s, i + 1);        // go deeper first
    cout << s[i];                  // print on way back
}

// Power function (fast exponentiation)
long long power(long long base, int exp) {
    if (exp == 0) return 1;        // base case
    long long half = power(base, exp / 2);
    if (exp % 2 == 0) return half * half;
    return half * half * base;
}

// Sum of array recursively
int arraySum(vector<int>& arr, int i) {
    if (i == (int)arr.size()) return 0;  // base case
    return arr[i] + arraySum(arr, i + 1); // recursive case
}

// Generate all subsets recursively
void subsets(vector<int>& arr, int i, vector<int>& current, vector<vector<int>>& result) {
    if (i == (int)arr.size()) {
        result.push_back(current);
        return;
    }
    // Don't include arr[i]
    subsets(arr, i + 1, current, result);
    // Include arr[i]
    current.push_back(arr[i]);
    subsets(arr, i + 1, current, result);
    current.pop_back();
}

int main() {
    cout << "5! = " << factorial(5) << endl;       // 120
    cout << "fib(10) = " << fibonacci(10) << endl; // 55
    cout << "2^10 = " << power(2, 10) << endl;     // 1024
    cout << "Reverse 'hello': ";
    reversePrint("hello", 0);
    cout << endl;
    vector<int> arr = {1, 2, 3};
    cout << "Sum: " << arraySum(arr, 0) << endl;
    vector<int> cur;
    vector<vector<int>> subs;
    subsets(arr, 0, cur, subs);
    cout << "Subsets: " << subs.size() << endl;    // 8
    return 0;
}\`,
    syntaxCard: { title: "PATTERN: Recursion", content: \`// Template
ReturnType solve(Input params) {
    if (base_case_condition) return base_case_answer;  // BASE
    return combine(solve(smaller_input));              // RECURSE
}

// KEY RULES:
// 1. Must have base case (or infinite recursion → crash)
// 2. Must make progress toward base case (n → n-1, etc.)
// 3. Trust the recursive call — assume it works!

// COMMON PATTERNS:
// Linear: f(n) = ... f(n-1)          → O(n) calls
// Tree:   f(n) = ... f(n-1) + f(n-2) → O(2^n) calls
// Divide: f(n) = ... f(n/2)          → O(log n) calls

// SPACE: O(depth) for call stack
// TAIL RECURSION: recursive call is last operation (can optimize)\` },
    mistakes: [
      { wrong: "Forgetting the base case", correct: "Always define a base case that returns without recursion", explanation: "Without a base case, the function calls itself forever until the stack overflows. This is the #1 recursion mistake." },
      { wrong: "Not making progress toward the base case", correct: "Ensure each recursive call gets closer to the base case", explanation: "If you call factorial(n) without reducing n, it never reaches the base case. Always reduce the problem size." },
      { wrong: "Computing Fibonacci with naive recursion for large n", correct: "Use memoization or iterative DP for overlapping subproblems", explanation: "Naive fibonacci has O(2^n) time because it recomputes the same values many times. Use memoization to cache results." },
    ],
    leetcode: {
      problem: "LeetCode #509 — Fibonacci Number\n\nReturn the nth Fibonacci number.",
      approach: "Base case: F(0)=0, F(1)=1. Recursive case: F(n) = F(n-1) + F(n-2). For efficiency, use memoization or iterative approach.",
      dryRun: "fib(5) = fib(4) + fib(3)\n       = (fib(3)+fib(2)) + (fib(2)+fib(1))\n       = ((fib(2)+fib(1))+(fib(1)+fib(0))) + ...\n       = 5",
      code: "class Solution {\n    int memo[31];\npublic:\n    int fib(int n) {\n        if (n <= 1) return n;\n        if (memo[n]) return memo[n];\n        return memo[n] = fib(n-1) + fib(n-2);\n    }\n};",
      complexity: "Time: O(n) with memoization, Space: O(n)"
    },
    checkpoint: { question: "What are the two essential components of every recursive function?", options: ["A loop and a return statement", "A base case and a recursive case that makes progress", "A parameter and a return value", "A stack and a queue"], answer: 1 }
  },

  "4.12": {
    id: "4.12",
    title: "Backtracking",
    phaseId: "phase-4",
    phaseTitle: "Problem Solving Patterns",
    subtopics: ["Try-undo-retry", "Decision tree", "Pruning", "Permutations and combinations"],
    story: \`Imagine you're exploring a **maze**. At each intersection, you pick a direction and walk. If you hit a dead end, you **backtrack** — retrace your steps to the last intersection and try a different path. You keep doing this until you find the exit or exhaust all paths.\n\nThat's **backtracking** — a systematic way to explore all possibilities by making a choice, recursing deeper, then **undoing** the choice (backtracking) to try alternatives. It's essentially a depth-first search through a **decision tree**.\n\nThe key insight: after the recursive call returns, you MUST undo your choice (pop from vector, unmark cell, restore state) so the next branch starts from the same state. Without this "undo" step, choices bleed into other branches! You can also **prune** — skip branches that can't possibly lead to a solution — dramatically reducing the search space.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│        BACKTRACKING — TRY, UNDO, TRY AGAIN               │
│                                                          │
│  Permutations of [1, 2, 3]:                              │
│                                                          │
│              start: []                                   │
│           ╱      |      ╲                                │
│        [1]      [2]      [3]         ← pick 1st         │
│       ╱ ╲      ╱ ╲      ╱ ╲                             │
│    [1,2] [1,3] [2,1] [2,3] [3,1] [3,2]  ← pick 2nd    │
│      |     |     |     |     |     |                     │
│   [1,2,3] ...  ...  ...  ...  [3,2,1]   ← pick 3rd     │
│                                                          │
│  Pattern at each level:                                  │
│  for each candidate:                                     │
│    1. CHOOSE:   add candidate to path                    │
│    2. EXPLORE:  recurse with updated path                │
│    3. UNDO:     remove candidate from path (BACKTRACK!)  │
│                                                          │
│  PRUNING: skip invalid choices early                     │
│  (e.g., in N-Queens, skip columns under attack)         │
│                                                          │
│  TIME: O(n!) permutations, O(2^n) subsets               │
│  SPACE: O(n) for recursion depth + current path          │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "void backtrack(vector<int>& nums, vector<int>& path, vector<bool>& used) {", explanation: "Recursive function with path and used-tracking state", memoryChange: "New stack frame", output: "None" },
      { line: "  if (path.size() == nums.size()) { result.push_back(path); return; }", explanation: "BASE CASE: complete permutation found", memoryChange: "Result saved", output: "None" },
      { line: "    for (int i = 0; i < nums.size(); i++) {", explanation: "Try each unused number as next choice", memoryChange: "No change", output: "None" },
      { line: "      if (used[i]) continue;", explanation: "PRUNING: skip already-used numbers", memoryChange: "No change", output: "None" },
      { line: "      path.push_back(nums[i]); used[i] = true;", explanation: "CHOOSE: add number to current path", memoryChange: "Path grows, used updated", output: "None" },
      { line: "      backtrack(nums, path, used);", explanation: "EXPLORE: recurse deeper with this choice", memoryChange: "Deeper recursion", output: "None" },
    ],
    code: \`#include <iostream>
#include <vector>
#include <string>
using namespace std;

// Permutations
vector<vector<int>> permResult;
void permute(vector<int>& nums, vector<int>& path, vector<bool>& used) {
    if (path.size() == nums.size()) {
        permResult.push_back(path);
        return;
    }
    for (int i = 0; i < (int)nums.size(); i++) {
        if (used[i]) continue;              // pruning
        path.push_back(nums[i]);            // CHOOSE
        used[i] = true;
        permute(nums, path, used);          // EXPLORE
        path.pop_back();                    // UNDO (backtrack!)
        used[i] = false;
    }
}

// Subsets
vector<vector<int>> subsetResult;
void subsets(vector<int>& nums, int start, vector<int>& path) {
    subsetResult.push_back(path);
    for (int i = start; i < (int)nums.size(); i++) {
        path.push_back(nums[i]);            // CHOOSE
        subsets(nums, i + 1, path);         // EXPLORE
        path.pop_back();                    // UNDO
    }
}

// N-Queens: place n queens on n×n board
bool isSafe(vector<string>& board, int row, int col, int n) {
    for (int i = 0; i < row; i++)
        if (board[i][col] == 'Q') return false;
    for (int i = row-1, j = col-1; i>=0 && j>=0; i--, j--)
        if (board[i][j] == 'Q') return false;
    for (int i = row-1, j = col+1; i>=0 && j<n; i--, j++)
        if (board[i][j] == 'Q') return false;
    return true;
}

void solveNQueens(vector<string>& board, int row, int n,
                  vector<vector<string>>& results) {
    if (row == n) { results.push_back(board); return; }
    for (int col = 0; col < n; col++) {
        if (!isSafe(board, row, col, n)) continue;  // prune
        board[row][col] = 'Q';              // CHOOSE
        solveNQueens(board, row + 1, n, results);  // EXPLORE
        board[row][col] = '.';              // UNDO
    }
}

int main() {
    vector<int> nums = {1, 2, 3};
    vector<int> path;
    vector<bool> used(3, false);
    permute(nums, path, used);
    cout << "Permutations: " << permResult.size() << endl;  // 6

    subsets(nums, 0, path);
    cout << "Subsets: " << subsetResult.size() << endl;      // 8

    vector<string> board(4, string(4, '.'));
    vector<vector<string>> queens;
    solveNQueens(board, 0, 4, queens);
    cout << "4-Queens solutions: " << queens.size() << endl; // 2
    return 0;
}\`,
    syntaxCard: { title: "PATTERN: Backtracking", content: \`// Template: Choose → Explore → Undo
void backtrack(state) {
    if (COMPLETE) { save result; return; }
    for (each choice) {
        if (INVALID) continue;        // PRUNE
        apply(choice);                // CHOOSE
        backtrack(updated_state);     // EXPLORE
        remove(choice);               // UNDO (backtrack!)
    }
}

// Permutations: used[] array to track
// Subsets: start index to avoid duplicates
// Combinations: start index + fixed length check
// N-Queens: board + isSafe check (pruning)

// PRUNING is key to performance!
// Without pruning: explore all branches
// With pruning: skip dead ends early

// TIME: varies (O(n!), O(2^n), etc.)
// SPACE: O(n) for recursion + path\` },
    mistakes: [
      { wrong: "Forgetting to undo the choice after recursive call", correct: "Always undo (pop, unmark, restore) after the recursive call returns", explanation: "Without the undo step, the choice persists into sibling branches. The path/vector accumulates all choices instead of exploring alternatives independently." },
      { wrong: "Not pruning invalid branches", correct: "Add conditions to skip branches that can't lead to valid solutions", explanation: "Without pruning, backtracking explores every possibility, even obviously invalid ones. This causes TLE on larger inputs. Pruning can reduce runtime exponentially." },
      { wrong: "Using backtracking when DP is appropriate", correct: "Use DP when subproblems overlap; backtracking when they don't", explanation: "If the same subproblem is solved multiple times, memoize it (DP). Backtracking is for exhaustive enumeration where subproblems don't overlap." },
    ],
    leetcode: {
      problem: "LeetCode #46 — Permutations\n\nReturn all possible permutations of distinct integers.",
      approach: "Backtracking: maintain current path and used array. At each position, try every unused number. When path is complete, add to results. Undo choice after recursive call.",
      dryRun: "nums = [1,2,3]\nChoose 1 → choose 2 → choose 3 → [1,2,3] ✓\nUndo 3,2 → choose 3 → choose 2 → [1,3,2] ✓\nUndo all → choose 2 → ...",
      code: "class Solution {\npublic:\n    vector<vector<int>> permute(vector<int>& nums) {\n        vector<vector<int>> result;\n        vector<int> path;\n        vector<bool> used(nums.size(), false);\n        function<void()> backtrack = [&]() {\n            if (path.size() == nums.size()) { result.push_back(path); return; }\n            for (int i = 0; i < (int)nums.size(); i++) {\n                if (used[i]) continue;\n                path.push_back(nums[i]);\n                used[i] = true;\n                backtrack();\n                path.pop_back();\n                used[i] = false;\n            }\n        };\n        backtrack();\n        return result;\n    }\n};",
      complexity: "Time: O(n! * n), Space: O(n)"
    },
    checkpoint: { question: "What happens if you forget to undo your choice after the recursive call in backtracking?", options: ["The code won't compile", "Choices from one branch leak into other branches", "The result will have fewer answers", "The algorithm becomes faster"], answer: 1 }
  },

  "4.13": {
    id: "4.13",
    title: "Divide & Conquer",
    phaseId: "phase-4",
    phaseTitle: "Problem Solving Patterns",
    subtopics: ["Split problem", "Solve subproblems", "Merge results", "Master theorem"],
    story: \`Imagine you need to count the number of people in a **stadium**. Instead of counting everyone yourself (O(n)), you split the stadium into two halves and ask two assistants to count each half. They each split their half into two quarters and delegate further. When each section has just one person, they report "1!" The counts bubble back up: sections → quarters → halves → total.\n\nThat's **Divide & Conquer**: (1) **Divide** the problem into smaller subproblems, (2) **Conquer** each subproblem recursively, (3) **Merge** the solutions into the final answer.\n\nThis pattern powers merge sort (split array in half, sort each, merge), quick sort (partition around pivot, sort each side), binary search (split in half, search one side), and more. The **Master Theorem** tells you the complexity: T(n) = aT(n/b) + O(n^d). If d < log_b(a), the recursive work dominates. If d = log_b(a), they balance. If d > log_b(a), the merge work dominates.\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│      DIVIDE & CONQUER — SPLIT, SOLVE, MERGE              │
│                                                          │
│  Merge Sort on [38, 27, 43, 3, 9, 82, 10]:              │
│                                                          │
│  DIVIDE:          [38,27,43,3,9,82,10]                   │
│                  /                    \\                   │
│          [38,27,43,3]          [9,82,10]                  │
│          /         \\            /      \\                  │
│      [38,27]    [43,3]     [9,82]   [10]                 │
│      /   \\      /   \\      /   \\      |                  │
│    [38]  [27] [43]  [3]  [9]  [82]  [10]                │
│                                                          │
│  MERGE (conquer + combine):                              │
│    [38]+[27]→[27,38]  [43]+[3]→[3,43]  [9]+[82]→[9,82] │
│    [27,38]+[3,43]→[3,27,38,43]  [9,82]+[10]→[9,10,82]  │
│    [3,27,38,43]+[9,10,82]→[3,9,10,27,38,43,82]         │
│                                                          │
│  T(n) = 2T(n/2) + O(n) → O(n log n) by Master Thm      │
│  SPACE: O(n) for merge buffer                            │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "if (lo >= hi) return;  // base case: single element", explanation: "A single element is already sorted — base case", memoryChange: "No change", output: "None" },
      { line: "int mid = lo + (hi - lo) / 2;", explanation: "DIVIDE: find the middle point", memoryChange: "mid computed", output: "None" },
      { line: "mergeSort(arr, lo, mid);", explanation: "CONQUER left half recursively", memoryChange: "Left half sorted on stack", output: "None" },
      { line: "mergeSort(arr, mid + 1, hi);", explanation: "CONQUER right half recursively", memoryChange: "Right half sorted on stack", output: "None" },
      { line: "merge(arr, lo, mid, hi);", explanation: "MERGE: combine two sorted halves into one sorted array", memoryChange: "Elements rearranged into sorted order", output: "Sorted subarray" },
    ],
    code: \`#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

// Merge Sort
void merge(vector<int>& arr, int lo, int mid, int hi) {
    vector<int> left(arr.begin() + lo, arr.begin() + mid + 1);
    vector<int> right(arr.begin() + mid + 1, arr.begin() + hi + 1);
    left.push_back(INT_MAX); right.push_back(INT_MAX);
    int i = 0, j = 0;
    for (int k = lo; k <= hi; k++) {
        if (left[i] <= right[j]) arr[k] = left[i++];
        else arr[k] = right[j++];
    }
}

void mergeSort(vector<int>& arr, int lo, int hi) {
    if (lo >= hi) return;
    int mid = lo + (hi - lo) / 2;
    mergeSort(arr, lo, mid);       // DIVIDE + CONQUER left
    mergeSort(arr, mid + 1, hi);   // DIVIDE + CONQUER right
    merge(arr, lo, mid, hi);       // MERGE
}

// Maximum Subarray using D&C
int maxSubarrayDC(vector<int>& arr, int lo, int hi) {
    if (lo == hi) return arr[lo];
    int mid = lo + (hi - lo) / 2;
    int leftMax = maxSubarrayDC(arr, lo, mid);
    int rightMax = maxSubarrayDC(arr, mid + 1, hi);

    // Cross midpoint
    int leftSum = INT_MIN, sum = 0;
    for (int i = mid; i >= lo; i--) { sum += arr[i]; leftSum = max(leftSum, sum); }
    int rightSum = INT_MIN; sum = 0;
    for (int i = mid + 1; i <= hi; i++) { sum += arr[i]; rightSum = max(rightSum, sum); }

    return max({leftMax, rightMax, leftSum + rightSum});
}

// Count Inversions using D&C (modified merge sort)
long long countInversions(vector<int>& arr, int lo, int hi) {
    if (lo >= hi) return 0;
    int mid = lo + (hi - lo) / 2;
    long long count = countInversions(arr, lo, mid)
                    + countInversions(arr, mid + 1, hi);
    vector<int> left(arr.begin() + lo, arr.begin() + mid + 1);
    vector<int> right(arr.begin() + mid + 1, arr.begin() + hi + 1);
    int i = 0, j = 0, k = lo;
    while (i < (int)left.size() && j < (int)right.size()) {
        if (left[i] <= right[j]) arr[k++] = left[i++];
        else { arr[k++] = right[j++]; count += (left.size() - i); }
    }
    while (i < (int)left.size()) arr[k++] = left[i++];
    while (j < (int)right.size()) arr[k++] = right[j++];
    return count;
}

int main() {
    vector<int> arr = {38, 27, 43, 3, 9, 82, 10};
    mergeSort(arr, 0, arr.size() - 1);
    cout << "Sorted: ";
    for (int x : arr) cout << x << " ";
    cout << endl;

    vector<int> arr2 = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    cout << "Max subarray: " << maxSubarrayDC(arr2, 0, arr2.size()-1) << endl;

    vector<int> inv = {5, 3, 2, 4, 1};
    cout << "Inversions: " << countInversions(inv, 0, inv.size()-1) << endl;
    return 0;
}\`,
    syntaxCard: { title: "PATTERN: Divide & Conquer", content: \`// Template
ReturnType solve(Input, lo, hi) {
    if (base_case) return base_answer;   // CONQUER base
    int mid = lo + (hi - lo) / 2;        // DIVIDE
    auto left  = solve(Input, lo, mid);   // CONQUER left
    auto right = solve(Input, mid+1, hi); // CONQUER right
    return merge(left, right);            // MERGE
}

// Master Theorem: T(n) = aT(n/b) + O(n^d)
// if d < log_b(a):  T(n) = O(n^(log_b(a)))
// if d == log_b(a): T(n) = O(n^d * log n)
// if d > log_b(a):  T(n) = O(n^d)

// Examples:
// Merge Sort: 2T(n/2)+O(n) → O(n log n)
// Binary Search: 1T(n/2)+O(1) → O(log n)
// Strassen: 7T(n/2)+O(n^2) → O(n^2.81)\` },
    mistakes: [
      { wrong: "Not handling the merge step correctly", correct: "Merge must combine results from subproblems properly", explanation: "The merge step is where most bugs happen. In merge sort, you must compare and place elements in order. In max subarray D&C, you must handle the cross-midpoint case." },
      { wrong: "Using int mid = (lo + hi) / 2 in D&C", correct: "int mid = lo + (hi - lo) / 2", explanation: "lo + hi can overflow for large indices. The alternative avoids overflow while computing the same result." },
      { wrong: "Forgetting the cross-midpoint case in max subarray D&C", correct: "Must check subarrays that cross the midpoint separately", explanation: "The maximum subarray could span both halves. You must check subarrays that start in the left half and end in the right half." },
    ],
    leetcode: {
      problem: "LeetCode #912 — Sort an Array\n\nSort an array using merge sort.",
      approach: "Divide array in half, recursively sort each half, merge two sorted halves. Guarantees O(n log n) in all cases.",
      dryRun: "[5,2,3,1] → split [5,2] [3,1] → split [5][2] [3][1]\nmerge [2,5] [1,3] → merge [1,2,3,5]",
      code: "class Solution {\npublic:\n    void mergeSort(vector<int>& arr, int lo, int hi) {\n        if (lo >= hi) return;\n        int mid = lo + (hi-lo)/2;\n        mergeSort(arr, lo, mid);\n        mergeSort(arr, mid+1, hi);\n        vector<int> L(arr.begin()+lo, arr.begin()+mid+1);\n        vector<int> R(arr.begin()+mid+1, arr.begin()+hi+1);\n        int i=0, j=0, k=lo;\n        while (i<(int)L.size() && j<(int)R.size())\n            arr[k++] = L[i]<=R[j] ? L[i++] : R[j++];\n        while (i<(int)L.size()) arr[k++]=L[i++];\n        while (j<(int)R.size()) arr[k++]=R[j++];\n    }\n    vector<int> sortArray(vector<int>& nums) {\n        mergeSort(nums, 0, nums.size()-1);\n        return nums;\n    }\n};",
      complexity: "Time: O(n log n), Space: O(n)"
    },
    checkpoint: { question: "According to the Master Theorem, what is the complexity of T(n) = 2T(n/2) + O(n)?", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], answer: 1 }
  },

  "4.14": {
    id: "4.14",
    title: "Meet in the Middle",
    phaseId: "phase-4",
    phaseTitle: "Problem Solving Patterns",
    subtopics: ["Split problem in half", "Combine two halves", "Reduce 2^n to 2^(n/2)", "Subset sum variants"],
    story: \`Imagine you need to find two people in a **crowd of 40** whose combined heights equal exactly 12 feet. Checking all pairs would be 40×39/2 = 780 combinations — manageable. But what if it's **40 items** and you need to find a subset summing to a target? That's 2^40 ≈ 1 trillion subsets — impossible!\n\n**Meet in the Middle** cuts this in half. Split the 40 items into two groups of 20. Generate all 2^20 ≈ 1 million subset sums for each group (feasible!). Then for each sum in group A, check if (target - sum) exists in group B using binary search or a hash set. Instead of 2^40, you do 2^20 + 2^20 + lookups — dramatically faster!\n\nThe pattern: when brute force on the full problem is too expensive (2^n or n^n), split the input in half, solve each half independently, and combine. It turns O(2^n) into O(2^(n/2)) — an exponential speedup!\`,
    memoryViz: \`┌──────────────────────────────────────────────────────────┐
│     MEET IN THE MIDDLE — SPLIT, SOLVE, COMBINE           │
│                                                          │
│  Problem: Subset of [a1..a40] summing to target T        │
│                                                          │
│  Full brute force: 2^40 ≈ 1 trillion ✗ TOO SLOW          │
│                                                          │
│  Meet in the Middle:                                     │
│  ┌─────────────────┐  ┌─────────────────┐               │
│  │  Left: [a1..a20] │  │ Right: [a21..a40]│              │
│  │  2^20 ≈ 1M sums │  │ 2^20 ≈ 1M sums  │              │
│  └────────┬────────┘  └────────┬────────┘               │
│           │                     │                         │
│           ▼                     ▼                         │
│  sums_L = [0, a1, a2,     sums_R = [0, a21, ...]        │
│            a1+a2, ...]          sorted by value           │
│                     │                     │               │
│                     ▼                     ▼               │
│           For each sum_L:                                │
│             need = T - sum_L                              │
│             Binary search need in sums_R                  │
│             If found → solution exists! ★                │
│                                                          │
│  TIME: O(2^(n/2) * n) instead of O(2^n)                 │
│  SPACE: O(2^(n/2)) for storing half-subsets              │
│  SPEEDUP: 2^40 → 2^20 ≈ 10^12 → 10^6                   │
└──────────────────────────────────────────────────────────┘\`,
    stepByStep: [
      { line: "int mid = n / 2;", explanation: "Split array into two halves at midpoint", memoryChange: "mid computed", output: "None" },
      { line: "vector<long long> leftSums = generateSubsets(arr, 0, mid);", explanation: "Generate all 2^(n/2) subset sums for left half", memoryChange: "leftSums has 2^mid elements", output: "None" },
      { line: "vector<long long> rightSums = generateSubsets(arr, mid, n);", explanation: "Generate all 2^(n/2) subset sums for right half", memoryChange: "rightSums has 2^(n-mid) elements", output: "None" },
      { line: "sort(rightSums.begin(), rightSums.end());", explanation: "Sort right sums for binary search", memoryChange: "rightSums sorted", output: "None" },
      { line: "for (auto s : leftSums) { auto it = lower_bound(rightSums, target - s); }", explanation: "For each left sum, find complement in right sums using binary search", memoryChange: "No change", output: "Found or not" },
    ],
    code: \`#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

// Generate all subset sums for arr[lo..hi)
vector<long long> generateSubsets(vector<int>& arr, int lo, int hi) {
    vector<long long> sums = {0};
    for (int i = lo; i < hi; i++) {
        int sz = sums.size();
        for (int j = 0; j < sz; j++) {
            sums.push_back(sums[j] + arr[i]);
        }
    }
    return sums;
}

// Subset Sum: can any subset of arr sum to target?
bool subsetSum(vector<int>& arr, long long target) {
    int n = arr.size();
    int mid = n / 2;
    vector<long long> leftSums = generateSubsets(arr, 0, mid);
    vector<long long> rightSums = generateSubsets(arr, mid, n);
    sort(rightSums.begin(), rightSums.end());
    for (long long s : leftSums) {
        long long need = target - s;
        if (binary_search(rightSums.begin(), rightSums.end(), need))
            return true;
    }
    return false;
}

// Closest subset sum to target
long long closestSubsetSum(vector<int>& arr, long long target) {
    int n = arr.size();
    int mid = n / 2;
    vector<long long> leftSums = generateSubsets(arr, 0, mid);
    vector<long long> rightSums = generateSubsets(arr, mid, n);
    sort(rightSums.begin(), rightSums.end());

    long long closest = LLONG_MAX;
    for (long long s : leftSums) {
        long long need = target - s;
        auto it = lower_bound(rightSums.begin(), rightSums.end(), need);
        if (it != rightSums.end())
            closest = min(closest, abs(target - (s + *it)));
        if (it != rightSums.begin())
            closest = min(closest, abs(target - (s + *prev(it))));
    }
    return closest;
}

// Count subsets with sum <= target
int countSubsets(vector<int>& arr, long long target) {
    int n = arr.size();
    int mid = n / 2;
    vector<long long> leftSums = generateSubsets(arr, 0, mid);
    vector<long long> rightSums = generateSubsets(arr, mid, n);
    sort(rightSums.begin(), rightSums.end());

    long long count = 0;
    for (long long s : leftSums) {
        long long remaining = target - s;
        if (remaining >= 0)
            count += upper_bound(rightSums.begin(), rightSums.end(), remaining)
                   - rightSums.begin();
    }
    return (int)count;
}

int main() {
    vector<int> arr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                       11, 12, 13, 14, 15, 16, 17, 18, 19, 20};
    cout << "Can sum to 100? " << subsetSum(arr, 100) << endl;
    cout << "Closest to 97: " << closestSubsetSum(arr, 97) << endl;
    cout << "Subsets sum<=10: " << countSubsets(arr, 10) << endl;
    return 0;
}\`,
    syntaxCard: { title: "PATTERN: Meet in the Middle", content: \`// Template: Split, Solve halves, Combine
1. Split input into two halves (mid = n/2)
2. Generate all solutions for left half  → vector L
3. Generate all solutions for right half → vector R
4. Sort one side (usually R)
5. For each element in L:
     binary search complement in R

// Subset sum: generate all 2^(n/2) sums per side
// Check if target - leftSum exists in rightSums

// COMPLEXITY: O(2^(n/2) * log(2^(n/2)))
//           = O(2^(n/2) * n/2)
// vs brute: O(2^n) — exponential speedup!

// WHEN TO USE: n ≈ 40 (2^20 is fine, 2^40 is not)
// SPACE: O(2^(n/2)) for storing half-subsets\` },
    mistakes: [
      { wrong: "Using meet-in-the-middle when n is small", correct: "Use brute force for n ≤ 20; meet-in-the-middle for n ≈ 40", explanation: "For small n, brute force is simpler and fast enough. Meet-in-the-middle adds complexity that's unnecessary when 2^n is already manageable." },
      { wrong: "Forgetting to sort one of the halves before binary search", correct: "Sort one side before searching for complements", explanation: "Binary search requires sorted input. You must sort one of the generated lists before searching." },
      { wrong: "Using this for optimization problems without proper combination", correct: "For optimization (closest sum), check both lower_bound and its predecessor", explanation: "The exact complement might not exist. For closest-match problems, check both the element found by lower_bound AND the element before it." },
    ],
    leetcode: {
      problem: "LeetCode #1755 — Closest Subsequence Sum\n\nGiven an array, find the minimum possible |sum - goal| for any subsequence.",
      approach: "Meet in the Middle: split array into two halves. Generate all 2^(n/2) subset sums for each. Sort one half. For each sum in the other, binary search for the value closest to (goal - sum).",
      dryRun: "nums = [5,-7,3,5], goal = 6\nLeft sums: [0,5,-7,-2]  Right sums: [0,3,5,8]\nSorted right: [0,3,5,8]\nFor left=5, need=1: closest in right = 0 → |5+0-6|=1\nAnswer = 0 (5+(-7)+3+5=6)",
      code: "class Solution {\npublic:\n    int minAbsDifference(vector<int>& nums, int goal) {\n        int n = nums.size();\n        int mid = n / 2;\n        auto genSums = [&](int lo, int hi) {\n            vector<long long> sums = {0};\n            for (int i = lo; i < hi; i++) {\n                int sz = sums.size();\n                for (int j = 0; j < sz; j++)\n                    sums.push_back(sums[j] + nums[i]);\n            }\n            return sums;\n        };\n        auto L = genSums(0, mid);\n        auto R = genSums(mid, n);\n        sort(R.begin(), R.end());\n        long long ans = abs(goal);\n        for (long long s : L) {\n            long long need = (long long)goal - s;\n            auto it = lower_bound(R.begin(), R.end(), need);\n            if (it != R.end()) ans = min(ans, abs(s + *it - goal));\n            if (it != R.begin()) ans = min(ans, abs(s + *prev(it) - goal));\n        }\n        return (int)ans;\n    }\n};",
      complexity: "Time: O(2^(n/2) * n), Space: O(2^(n/2))"
    },
    checkpoint: { question: "What problem size is Meet in the Middle typically used for?", options: ["n ≤ 10", "n ≈ 20", "n ≈ 40", "n ≥ 1000"], answer: 2 }
  }
};
