import { Topic } from './curriculum';

export const phase5Content: Record<string, Topic> = {
  "5.1": {
    id: "5.1", title: "Arrays (Advanced)", phaseId: "phase-5", phaseTitle: "Data Structures Deep Dive",
    subtopics: ["Two pointers on arrays", "Prefix sum technique", "Difference array", "Sparse arrays"],
    story: `Think of an **advanced array** like a **chessboard** — you already know the basic moves (accessing elements, traversing), but now you're learning **strategic combinations** that make you much more powerful.\n\nA **prefix sum** is like a running receipt at a store — instead of recalculating "how much did I spend from day 3 to day 7?" every time, you keep a running total so any range query becomes instant (O(1)).\n\nA **difference array** is the reverse — instead of storing values, you store the CHANGES. It's like a ledger that only records deposits and withdrawals, making range updates (add 5 to everything from index 3 to 7) lightning fast!`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│           PREFIX SUM — INSTANT RANGE QUERIES             │
│                                                          │
│  arr  = [3, 1, 4, 1, 5, 9, 2, 6]                        │
│  pref = [3, 4, 8, 9,14,23,25,31]  ← running total       │
│                                                          │
│  Query: sum from index 2 to 5?                           │
│  = pref[5] - pref[1] = 23 - 4 = 19                      │
│  Verify: 4+1+5+9 = 19 ✓                                 │
│                                                          │
│  DIFFERENCE ARRAY — FAST RANGE UPDATES                   │
│  Add 3 to arr[2..5]:                                     │
│  diff[2] += 3, diff[6] -= 3                              │
│  Then prefix sum of diff gives updated array!             │
│                                                          │
│  COMPLEXITY: Build O(n), Query O(1), Update O(1)         │
└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "vector<int> arr = {3, 1, 4, 1, 5, 9};", explanation: "Original array", memoryChange: "Array stored", output: "None" },
      { line: "vector<int> pref(n); pref[0]=arr[0];", explanation: "Initialize prefix sum", memoryChange: "First prefix value set", output: "None" },
      { line: "for(int i=1;i<n;i++) pref[i]=pref[i-1]+arr[i];", explanation: "Build prefix sum array", memoryChange: "Running totals computed", output: "None" },
      { line: "int rangeSum = pref[r] - (l>0 ? pref[l-1] : 0);", explanation: "O(1) range query", memoryChange: "No change", output: "Sum of range [l,r]" },
    ],
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // PREFIX SUM
    vector<int> arr = {3, 1, 4, 1, 5, 9, 2, 6};
    int n = arr.size();
    vector<int> pref(n);
    pref[0] = arr[0];
    for (int i = 1; i < n; i++)
        pref[i] = pref[i-1] + arr[i];
    
    // Range query: sum from index 2 to 5
    int l = 2, r = 5;
    int rangeSum = pref[r] - (l > 0 ? pref[l-1] : 0);
    cout << "Sum[2..5] = " << rangeSum << endl;  // 19

    // DIFFERENCE ARRAY: add val to range [l, r]
    vector<int> diff(n + 1, 0);
    auto update = [&](int l, int r, int val) {
        diff[l] += val;
        diff[r + 1] -= val;
    };
    update(2, 5, 3);  // add 3 to indices 2-5
    
    // Reconstruct updated array
    vector<int> result = arr;
    int curr = 0;
    for (int i = 0; i < n; i++) {
        curr += diff[i];
        result[i] += curr;
        cout << result[i] << " ";
    }
    cout << endl;
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: Advanced Array Techniques", content: `// PREFIX SUM:
vector<int> pref(n);
pref[0] = arr[0];
for (int i = 1; i < n; i++) pref[i] = pref[i-1] + arr[i];
// Range sum [l,r]: pref[r] - (l>0 ? pref[l-1] : 0)

// DIFFERENCE ARRAY:
vector<int> diff(n+1, 0);
diff[l] += val; diff[r+1] -= val;  // range update
// Reconstruct: running sum of diff + original

// 2D PREFIX SUM:
pref[i][j] = arr[i][j] + pref[i-1][j] + pref[i][j-1] - pref[i-1][j-1]` },
    mistakes: [
      { wrong: "pref[r] - pref[l]  // for range sum", correct: "pref[r] - pref[l-1]  // or pref[r] - (l>0?pref[l-1]:0)", explanation: "The prefix sum at index l-1 is what needs to be subtracted to get the sum starting FROM l. If you subtract pref[l], you exclude arr[l] from the result." },
      { wrong: "Forgetting to handle l=0 case", correct: "Use: pref[r] - (l > 0 ? pref[l-1] : 0)", explanation: "When l=0, there's no pref[-1]. Always check the boundary condition." },
    ],
    leetcode: { problem: "LeetCode #303 — Range Sum Query\n\nGiven an integer array, handle multiple range sum queries efficiently.", approach: "Build prefix sum once, answer each query in O(1).", dryRun: "nums=[-2,0,3,-5,2,-1], sumRange(0,2)=1, sumRange(2,5)=-1", code: "class NumArray {\n    vector<int> pref;\npublic:\n    NumArray(vector<int>& nums) {\n        pref.resize(nums.size());\n        pref[0] = nums[0];\n        for (int i=1;i<nums.size();i++) pref[i]=pref[i-1]+nums[i];\n    }\n    int sumRange(int l, int r) {\n        return pref[r] - (l>0 ? pref[l-1] : 0);\n    }\n};", complexity: "Build: O(n), Query: O(1)" },
    checkpoint: { question: "What is the time complexity of a range sum query using prefix sum?", options: ["O(n)", "O(1)", "O(log n)", "O(n^2)"], answer: 1 }
  },

  "5.2": {
    id: "5.2", title: "Strings (Advanced)", phaseId: "phase-5", phaseTitle: "Data Structures Deep Dive",
    subtopics: ["KMP algorithm", "Rabin-Karp hashing", "Z-function", "Trie basics"],
    story: `Imagine searching for the word **"apple"** in a 1-million-character book. The naive approach slides the pattern along and checks each position — O(n*m) time. But what if you could **skip ahead** when you know a mismatch means the pattern can't match for several positions?\n\nThat's **KMP** (Knuth-Morris-Pratt)! It precomputes a **failure function** (LPS array) that tells you "when you fail at position j, jump to position LPS[j] instead of starting over." It's like a smart reader who bookmarks where partial matches end.\n\n**Rabin-Karp** takes a different approach — it computes a **hash** (fingerprint) of each substring and compares hashes instead of characters. If hashes don't match, the strings definitely don't match. If they do match, verify character by character.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│            KMP — LPS ARRAY CONSTRUCTION                  │
│                                                          │
│  Pattern: "AABAABAAA"                                    │
│  LPS:     [0,1,0,1,2,3,4,5,2]                            │
│                                                          │
│  LPS[i] = length of longest proper prefix                │
│           which is also a suffix for pattern[0..i]        │
│                                                          │
│  When mismatch at text[i] vs pattern[j]:                 │
│  Don't start over! Set j = LPS[j-1] and continue         │
│                                                          │
│  RABIN-KARP — ROLLING HASH:                              │
│  hash("abc") = a*p^2 + b*p^1 + c*p^0                    │
│  Next hash: remove left, add right in O(1)               │
│                                                          │
│  COMPLEXITY: KMP O(n+m), Rabin-Karp O(n+m) average       │
└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "string text = \"AABAACAADAABAABA\";", explanation: "Input text to search in", memoryChange: "String stored", output: "None" },
      { line: "string pat = \"AABA\";", explanation: "Pattern to find", memoryChange: "Pattern stored", output: "None" },
      { line: "// Build LPS array for pattern", explanation: "Precompute longest prefix-suffix array", memoryChange: "LPS array built", output: "None" },
      { line: "// KMP search using LPS to skip", explanation: "When mismatch, use LPS to avoid restarting from 0", memoryChange: "j jumps back using LPS", output: "Pattern found at index 0, 9, 12" },
    ],
    code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

vector<int> buildLPS(const string& pat) {
    int m = pat.size();
    vector<int> lps(m, 0);
    int len = 0, i = 1;
    while (i < m) {
        if (pat[i] == pat[len]) lps[i++] = ++len;
        else if (len) len = lps[len - 1];
        else lps[i++] = 0;
    }
    return lps;
}

void KMP(const string& text, const string& pat) {
    int n = text.size(), m = pat.size();
    vector<int> lps = buildLPS(pat);
    int i = 0, j = 0;
    while (i < n) {
        if (text[i] == pat[j]) { i++; j++; }
        if (j == m) {
            cout << "Found at index " << i - j << endl;
            j = lps[j - 1];
        } else if (i < n && text[i] != pat[j]) {
            j ? j = lps[j - 1] : i++;
        }
    }
}

int main() {
    KMP("AABAACAADAABAABA", "AABA");
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: KMP / String Algorithms", content: `// KMP: build LPS, then search
// LPS[i] = longest proper prefix that is also suffix
vector<int> lps(m, 0);
// On mismatch: j = lps[j-1] instead of j=0
// Time: O(n+m)

// RABIN-KARP: rolling hash
// hash = s[0]*p^(m-1) + s[1]*p^(m-2) + ...
// Rolling: newHash = (oldHash - s[left]*p^(m-1))*p + s[right]

// Z-FUNCTION: z[i] = longest substring starting at i that matches prefix
// Time: O(n)` },
    mistakes: [
      { wrong: "Forgetting to update j using LPS on mismatch", correct: "On mismatch: if j>0 set j=lps[j-1], else i++", explanation: "The whole point of KMP is using the LPS array to skip unnecessary comparisons. Without it, you're just doing naive search." },
    ],
    leetcode: { problem: "LeetCode #28 — Find the Index of the First Occurrence\n\nReturn index of first occurrence of needle in haystack, or -1.", approach: "Use KMP for O(n+m) or naive for simplicity.", dryRun: "haystack=\"sadbutsad\", needle=\"sad\" → index 0", code: "class Solution {\npublic:\n    int strStr(string haystack, string needle) {\n        int n=haystack.size(), m=needle.size();\n        if (m==0) return 0;\n        vector<int> lps(m,0);\n        int len=0, i=1;\n        while(i<m) {\n            if (needle[i]==needle[len]) lps[i++]=++len;\n            else if (len) len=lps[len-1];\n            else lps[i++]=0;\n        }\n        i=0; int j=0;\n        while(i<n) {\n            if (haystack[i]==needle[j]) {i++;j++;}\n            if (j==m) return i-j;\n            else if (i<n && haystack[i]!=needle[j]) j ? j=lps[j-1] : i++;\n        }\n        return -1;\n    }\n};", complexity: "Time: O(n+m), Space: O(m)" },
    checkpoint: { question: "What does the LPS array in KMP represent?", options: ["Last position of search", "Longest proper prefix that is also suffix", "Letter position sequence", "Longest palindrome substring"], answer: 1 }
  },

  "5.3": {
    id: "5.3", title: "Linked Lists", phaseId: "phase-5", phaseTitle: "Data Structures Deep Dive",
    subtopics: ["Singly linked list", "Doubly linked list", "Fast-slow pointers", "Reverse linked list"],
    story: `Imagine a **treasure hunt** where each clue tells you where the next clue is hidden. That's a **singly linked list** — each node knows only the NEXT node. To find the 5th clue, you must follow clues 1→2→3→4→5. You can't skip or go backwards.\n\nA **doubly linked list** is like a two-way street — each clue tells you both the next AND previous clue. This makes going backwards easy but uses more memory.\n\nThe **fast-slow pointer** technique is brilliant: send two runners down the list — one moves 1 step at a time, the other moves 2 steps. If they ever meet, there's a **cycle** (the track loops). If the fast runner reaches the end, there's no cycle. This is Floyd's Cycle Detection!`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│           LINKED LIST — NODE STRUCTURE                   │
│                                                          │
│  Singly: [data|next] → [data|next] → [data|next] → NULL │
│                                                          │
│  Doubly: NULL ← [prev|data|next] ⇄ [prev|data|next] → NULL│\n│                                                          │
│  FLOYD'S CYCLE DETECTION:                                │
│  slow → 1 step, fast → 2 steps                           │
│  If they meet → CYCLE EXISTS!                            │
│  ┌──→ A → B → C → D ──┐                                 │
│  │         ↑       ↓    │                                 │
│  └──── G ← F ← E ←────┘                                 │
│  slow: A→B→C→D→E→F→G→B (cycle!)                         │
│  fast: A→C→E→G→C→E (met at C or E → cycle!)             │
│                                                          │
│  COMPLEXITY: Access O(n), Insert/Delete O(1) at head     │
└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "ListNode* head = new ListNode(1);", explanation: "Create first node", memoryChange: "Node allocated on heap", output: "None" },
      { line: "head->next = new ListNode(2);", explanation: "Link second node", memoryChange: "Second node allocated, linked", output: "None" },
      { line: "ListNode *slow=head, *fast=head;", explanation: "Initialize two pointers for cycle detection", memoryChange: "Two pointers set to head", output: "None" },
      { line: "while(fast && fast->next) { slow=slow->next; fast=fast->next->next; if(slow==fast) break; }", explanation: "Move slow by 1, fast by 2. If they meet, cycle exists.", memoryChange: "Pointers traversing list", output: "Cycle detected or not" },
    ],
    code: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// Reverse a linked list
ListNode* reverseList(ListNode* head) {
    ListNode *prev = nullptr, *curr = head;
    while (curr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}

// Detect cycle using Floyd's algorithm
bool hasCycle(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}

// Find middle of linked list
ListNode* findMiddle(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}

int main() {
    ListNode* head = new ListNode(1);
    head->next = new ListNode(2);
    head->next->next = new ListNode(3);
    head->next->next->next = new ListNode(4);
    
    cout << "Has cycle: " << hasCycle(head) << endl;
    head = reverseList(head);
    cout << "Reversed head: " << head->val << endl;  // 4
    cout << "Middle: " << findMiddle(head)->val << endl;  // 2 or 3
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: Linked List Operations", content: `struct ListNode { int val; ListNode* next; ListNode(int x): val(x), next(nullptr) {} };\n// Reverse: prev,curr,next pointers\n// Cycle: slow(1x), fast(2x) → meet = cycle\n// Middle: slow(1x), fast(2x) → slow at middle\n// Merge: dummy head + two pointers` },
    mistakes: [
      { wrong: "Losing head pointer when reversing", correct: "Return the new head (prev) after reverse loop", explanation: "After reversal, the original head is the tail. The new head is the 'prev' pointer at loop end." },
      { wrong: "fast = fast->next->next without checking fast->next", correct: "while(fast && fast->next) before advancing", explanation: "If fast->next is null, fast->next->next dereferences null. Always check both fast and fast->next." },
    ],
    leetcode: { problem: "LeetCode #141 — Linked List Cycle\n\nDetermine if a linked list has a cycle.", approach: "Floyd's algorithm: slow moves 1 step, fast moves 2. If they meet, there's a cycle.", dryRun: "1→2→3→4→2 (cycle) → slow=2,fast=4→slow=3,fast=2→slow=4,fast=4 MEET!", code: "class Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        ListNode *slow=head, *fast=head;\n        while (fast && fast->next) {\n            slow=slow->next; fast=fast->next->next;\n            if (slow==fast) return true;\n        }\n        return false;\n    }\n};", complexity: "Time: O(n), Space: O(1)" },
    checkpoint: { question: "In Floyd's cycle detection, how do the two pointers move?", options: ["Both move 1 step", "Slow moves 1, fast moves 2 steps", "Slow moves 2, fast moves 1", "Both move 2 steps"], answer: 1 }
  },

  "5.4": {
    id: "5.4", title: "Trees", phaseId: "phase-5", phaseTitle: "Data Structures Deep Dive",
    subtopics: ["Binary tree", "BFS traversal", "DFS traversals", "Binary search tree"],
    story: `Imagine a **family tree** or an **org chart** — there's one boss at the top (root), each person can have subordinates (children), and the hierarchy flows downward. That's a **tree** in programming!\n\nA **binary tree** means each node has at most 2 children — like every person can have at most 2 direct reports. A **Binary Search Tree (BST)** adds a rule: left child is smaller, right child is larger. This makes searching as fast as binary search!\n\n**DFS** (Depth-First Search) explores as deep as possible before backtracking — like exploring a maze by always going left until you hit a wall. **BFS** (Breadth-First Search) explores level by level — like scanning each floor of a building from bottom to top.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│              BINARY TREE STRUCTURE                       │\n│                                                          │\n│         4           ← Level 0 (root)                    │\n│        / \\                                              │\n│       2   6         ← Level 1                          │\n│      / \\ / \\                                            │\n│     1  3 5  7       ← Level 2 (leaves)                 │\n│                                                          │\n│  DFS (inorder): 1,2,3,4,5,6,7  ← sorted for BST!       │\n│  DFS (preorder): 4,2,1,3,6,5,7                         │\n│  DFS (postorder): 1,3,2,5,7,6,4                        │\n│  BFS (level): 4,2,6,1,3,5,7                            │\n│                                                          │\n│  BST PROPERTY: left < root < right                      │\n│  Search in BST: O(log n) average, O(n) worst             │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "TreeNode* root = new TreeNode(4);", explanation: "Create root node", memoryChange: "Root allocated", output: "None" },
      { line: "root->left = new TreeNode(2); root->right = new TreeNode(6);", explanation: "Add children", memoryChange: "Two children linked", output: "None" },
      { line: "inorder(root);  // Left, Root, Right", explanation: "DFS inorder traversal gives sorted order for BST", memoryChange: "Stack frames for recursion", output: "1 2 3 4 5 6 7" },
    ],
    code: `#include <iostream>
#include <queue>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}

void bfs(TreeNode* root) {
    if (!root) return;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        TreeNode* node = q.front(); q.pop();
        cout << node->val << " ";
        if (node->left) q.push(node->left);
        if (node->right) q.push(node->right);
    }
}

int maxDepth(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(maxDepth(root->left), maxDepth(root->right));
}

int main() {
    TreeNode* root = new TreeNode(4);
    root->left = new TreeNode(2);
    root->right = new TreeNode(6);
    root->left->left = new TreeNode(1);
    root->left->right = new TreeNode(3);
    root->right->left = new TreeNode(5);
    root->right->right = new TreeNode(7);
    
    cout << "Inorder: "; inorder(root); cout << endl;
    cout << "BFS: "; bfs(root); cout << endl;
    cout << "Max depth: " << maxDepth(root) << endl;
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: Tree Traversals", content: `struct TreeNode { int val; TreeNode* left; TreeNode* right; };\n// Inorder (L,Rt,R): sorted for BST\n// Preorder (Rt,L,R): copy tree\n// Postorder (L,R,Rt): delete tree\n// BFS: level order using queue\n// Max depth: 1 + max(depth(left), depth(right))` },
    mistakes: [
      { wrong: "Forgetting null check before accessing node->left", correct: "if (!root) return; // always check null first", explanation: "Dereferencing a null pointer causes crashes. Always check if the node exists before accessing its members." },
    ],
    leetcode: { problem: "LeetCode #104 — Maximum Depth of Binary Tree", approach: "Recursive: 1 + max(depth(left), depth(right)). Base case: null returns 0.", dryRun: "Tree [3,9,20,null,null,15,7] → depth 3", code: "class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        if (!root) return 0;\n        return 1 + max(maxDepth(root->left), maxDepth(root->right));\n    }\n};", complexity: "Time: O(n), Space: O(h) where h=height" },
    checkpoint: { question: "What traversal of a BST gives elements in sorted order?", options: ["Preorder", "Postorder", "Inorder", "BFS"], answer: 2 }
  },

  "5.5": {
    id: "5.5", title: "Graphs", phaseId: "phase-5", phaseTitle: "Data Structures Deep Dive",
    subtopics: ["Adjacency list", "BFS on graphs", "DFS on graphs", "Shortest path (Dijkstra)"],
    story: `Think of a **graph** as a **road network** — cities are **nodes** (vertices) and roads connecting them are **edges**. Some roads are one-way (**directed graph**), others are two-way (**undirected**). Some roads have distance labels (**weighted edges**).\n\n**BFS** explores like a GPS finding nearby restaurants — it checks all cities 1 step away, then 2 steps, then 3 steps. It finds the **shortest path** in unweighted graphs!\n\n**DFS** explores like an adventurer going as deep as possible down each path before backtracking. It's great for finding connected components, cycles, and topological order.\n\n**Dijkstra's algorithm** is your GPS navigation — it always picks the closest unvisited city next, guaranteeing the shortest path in weighted graphs.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│            GRAPH — ADJACENCY LIST                        │\n│                                                          │\n│  0 --- 1 --- 2                                          │\n│  |     |     |                                          │\n│  3 --- 4 --- 5                                          │\n│                                                          │\n│  adj[0] = [1, 3]                                        │\n│  adj[1] = [0, 2, 4]                                     │\n│  adj[2] = [1, 5]                                        │\n│  adj[3] = [0, 4]                                        │\n│  adj[4] = [1, 3, 5]                                     │\n│  adj[5] = [2, 4]                                        │\n│                                                          │\n│  BFS from 0: 0,1,3,2,4,5  (level by level)              │\n│  DFS from 0: 0,1,2,5,4,3  (depth first)                 │\n│  Dijkstra: O((V+E)logV) with priority queue              │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "vector<vector<int>> adj(n);", explanation: "Create adjacency list", memoryChange: "n empty vectors", output: "None" },
      { line: "adj[u].push_back(v); adj[v].push_back(u);", explanation: "Add undirected edge", memoryChange: "Edge added both ways", output: "None" },
      { line: "queue<int> q; q.push(start); visited[start]=true;", explanation: "Initialize BFS", memoryChange: "Start node enqueued", output: "None" },
      { line: "while(!q.empty()) { int u=q.front(); q.pop(); for(int v:adj[u]) if(!visited[v]) { visited[v]=true; q.push(v); } }", explanation: "BFS explores level by level", memoryChange: "Nodes visited in BFS order", output: "BFS traversal" },
    ],
    code: `#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;

void BFS(int start, vector<vector<int>>& adj, vector<bool>& visited) {
    queue<int> q;
    q.push(start);
    visited[start] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        cout << u << " ";
        for (int v : adj[u]) {
            if (!visited[v]) { visited[v] = true; q.push(v); }
        }
    }
}

void DFS(int u, vector<vector<int>>& adj, vector<bool>& visited) {
    visited[u] = true;
    cout << u << " ";
    for (int v : adj[u])
        if (!visited[v]) DFS(v, adj, visited);
}

vector<int> dijkstra(int src, int n, vector<vector<pair<int,int>>>& adj) {
    vector<int> dist(n, INT_MAX);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    dist[src] = 0;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}

int main() {
    int n = 6;
    vector<vector<int>> adj(n);
    adj[0] = {1,3}; adj[1] = {0,2,4}; adj[2] = {1,5};
    adj[3] = {0,4}; adj[4] = {1,3,5}; adj[5] = {2,4};
    vector<bool> visited(n, false);
    cout << "BFS: "; BFS(0, adj, visited); cout << endl;
    fill(visited.begin(), visited.end(), false);
    cout << "DFS: "; DFS(0, adj, visited); cout << endl;
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: Graph Algorithms", content: `// Adjacency list: vector<vector<int>> adj(n);
// BFS: queue, level-by-level, shortest unweighted path
// DFS: recursion/stack, connected components, cycles
// Dijkstra: priority_queue, shortest weighted path
// Topological sort: DFS + stack or Kahn's algorithm` },
    mistakes: [
      { wrong: "Forgetting to mark visited when pushing to queue", correct: "Mark visited WHEN PUSHING, not when popping", explanation: "If you mark visited when popping, the same node can be added to the queue multiple times, causing incorrect results and TLE." },
    ],
    leetcode: { problem: "LeetCode #200 — Number of Islands\n\nCount islands in a 2D grid where '1' is land and '0' is water.", approach: "DFS/BFS from each unvisited land cell, marking all connected land as visited. Count how many times you start a new DFS.", dryRun: "grid=[['1','1','0'],['0','1','0'],['0','0','1']] → 2 islands", code: "class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        int count=0, m=grid.size(), n=grid[0].size();\n        for (int i=0;i<m;i++) for (int j=0;j<n;j++)\n            if (grid[i][j]=='1') { dfs(grid,i,j,m,n); count++; }\n        return count;\n    }\n    void dfs(vector<vector<char>>& g, int i, int j, int m, int n) {\n        if (i<0||i>=m||j<0||j>=n||g[i][j]!='1') return;\n        g[i][j]='0';\n        dfs(g,i+1,j,m,n); dfs(g,i-1,j,m,n);\n        dfs(g,i,j+1,m,n); dfs(g,i,j-1,m,n);\n    }\n};", complexity: "Time: O(m*n), Space: O(m*n) worst" },
    checkpoint: { question: "When should you mark a node as visited in BFS?", options: ["When popping from queue", "When pushing to queue", "At the end of the loop", "Never"], answer: 1 }
  }
};

export const phase6Content: Record<string, Topic> = {
  "6.1": {
    id: "6.1", title: "Fibonacci", phaseId: "phase-6", phaseTitle: "Dynamic Programming",
    subtopics: ["Naive recursion", "Memoization (top-down)", "Tabulation (bottom-up)", "Space optimization"],
    story: `The **Fibonacci sequence** is the "Hello World" of dynamic programming! Each number is the sum of the two before it: 1, 1, 2, 3, 5, 8, 13, 21...\n\n**Naive recursion** is like a person who forgets everything they calculated — they compute fib(5) by computing fib(4) and fib(3), but fib(4) also needs fib(3), and fib(3) gets computed AGAIN. This leads to exponential time — O(2^n)!\n\n**Memoization** is like writing answers on a sticky note — once you compute fib(3), write it down. Next time you need it, just read the note instead of recalculating. This drops it to O(n)!\n\n**Tabulation** builds the answer from the bottom up — start with fib(1)=1, fib(2)=1, then compute fib(3), fib(4), etc. No recursion needed!\n\n**Space optimization**: you only need the last 2 values, so use 2 variables instead of an entire array!`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│           FIBONACCI — DP APPROACHES                      │
│                                                          │
│  Naive: fib(5) calls fib(4) and fib(3)                  │\n│  fib(4) calls fib(3) and fib(2)                         │\n│  fib(3) computed TWICE! → O(2^n)                        │\n│                                                          │\n│  Memo: fib(3) computed once, stored in dp[3]            │\n│  Next call: just return dp[3] → O(n)                    │\n│                                                          │\n│  Tabulation: dp = [0, 1, 1, 2, 3, 5, 8, 13...]          │\n│  dp[i] = dp[i-1] + dp[i-2]                              │\n│                                                          │\n│  Space optimized: only need prev2 variables              │\n│  a=0, b=1 → c=a+b=1 → a=b,b=c → repeat                 │\n│                                                          │\n│  COMPLEXITY: O(n) time, O(1) space (optimized)           │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "int a=0, b=1;", explanation: "Initialize first two Fibonacci numbers", memoryChange: "a=0, b=1 stored", output: "None" },
      { line: "for(int i=2;i<=n;i++) { int c=a+b; a=b; b=c; }", explanation: "Iteratively compute next Fibonacci number", memoryChange: "a and b updated each iteration", output: "None" },
      { line: "return b;", explanation: "b now holds fib(n)", memoryChange: "No change", output: "fib(n)" },
    ],
    code: `#include <iostream>
#include <vector>
using namespace std;

// Memoization (top-down)
int fibMemo(int n, vector<int>& dp) {
    if (n <= 1) return n;
    if (dp[n] != -1) return dp[n];
    return dp[n] = fibMemo(n-1, dp) + fibMemo(n-2, dp);
}

// Tabulation (bottom-up)
int fibTab(int n) {
    vector<int> dp(n+1);
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++)
        dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}

// Space optimized
int fibOpt(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int c = a + b;
        a = b; b = c;
    }
    return b;
}

int main() {
    int n = 10;
    vector<int> dp(n+1, -1);
    cout << "Memo: " << fibMemo(n, dp) << endl;
    cout << "Tab: " << fibTab(n) << endl;
    cout << "Opt: " << fibOpt(n) << endl;  // All print 55
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: DP - Fibonacci", content: `// Memoization: vector<int> dp(n+1, -1);
// if (dp[n] != -1) return dp[n];
// return dp[n] = f(n-1) + f(n-2);

// Tabulation: dp[0]=0, dp[1]=1, dp[i]=dp[i-1]+dp[i-2]
// Space optimized: two variables a, b rolling forward
// Time: O(n), Space: O(n) or O(1) optimized` },
    mistakes: [
      { wrong: "int fib(int n) { return fib(n-1)+fib(n-2); } // no memo", correct: "Use dp array to store computed values", explanation: "Without memoization, fib recalculates the same subproblems exponentially. Always use memo or tabulation." },
    ],
    leetcode: { problem: "LeetCode #509 — Fibonacci Number\n\nReturn the nth Fibonacci number.", approach: "Space-optimized DP: two variables, iterate from 2 to n.", dryRun: "n=6: 0,1,1,2,3,5,8 → return 8", code: "class Solution {\npublic:\n    int fib(int n) {\n        if (n<=1) return n;\n        int a=0, b=1;\n        for (int i=2;i<=n;i++) { int c=a+b; a=b; b=c; }\n        return b;\n    }\n};", complexity: "Time: O(n), Space: O(1)" },
    checkpoint: { question: "What is the time complexity of naive recursive Fibonacci?", options: ["O(n)", "O(2^n)", "O(n^2)", "O(log n)"], answer: 1 }
  },

  "6.2": {
    id: "6.2", title: "0/1 Knapsack", phaseId: "phase-6", phaseTitle: "Dynamic Programming",
    subtopics: ["Pick or skip", "2D DP table", "Space optimization to 1D"],
    story: `Imagine you're a **thief with a small backpack** (capacity W) in a store with items, each having a weight and value. You can either **pick** an item (add its value and weight) or **skip** it. Each item can be picked AT MOST ONCE — that's the "0/1" part.\n\nThe key insight: for each item, you have two choices. Take the MAX of both choices. This creates overlapping subproblems — the same remaining capacity appears in multiple branches. DP stores these results!`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│        0/1 KNAPSACK — DP TABLE                           │
│  Items: (wt=1,val=1), (wt=3,val=4), (wt=4,val=5), (wt=5,val=7) │\n│  Capacity W=7                                            │\n│                                                          │\n│  dp[i][w] = max value using first i items, capacity w   │\n│  dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i]]+val[i])   │\n│                                                          │\n│  COMPLEXITY: O(n*W) time and space                       │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i-1]] + val[i-1]);", explanation: "Choose: skip item i (keep previous value) or take it (add its value)", memoryChange: "DP table filled", output: "None" },
      { line: "return dp[n][W];", explanation: "Answer is max value with all items and full capacity", memoryChange: "No change", output: "Maximum value" },
    ],
    code: `#include <iostream>
#include <vector>
using namespace std;

int knapsack01(vector<int>& wt, vector<int>& val, int W) {
    int n = wt.size();
    vector<vector<int>> dp(n+1, vector<int>(W+1, 0));
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            dp[i][w] = dp[i-1][w];  // skip
            if (w >= wt[i-1])
                dp[i][w] = max(dp[i][w], dp[i-1][w-wt[i-1]] + val[i-1]);
        }
    }
    return dp[n][W];
}

// Space optimized: 1D array
int knapsackOpt(vector<int>& wt, vector<int>& val, int W) {
    vector<int> dp(W+1, 0);
    for (int i = 0; i < wt.size(); i++)
        for (int w = W; w >= wt[i]; w--)
            dp[w] = max(dp[w], dp[w-wt[i]] + val[i]);
    return dp[W];
}

int main() {
    vector<int> wt = {1,3,4,5}, val = {1,4,5,7};
    cout << knapsack01(wt, val, 7) << endl;  // 9
    cout << knapsackOpt(wt, val, 7) << endl;  // 9
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: 0/1 Knapsack", content: `// dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i]]+val[i])\n// Space optimized: iterate w from W down to wt[i]\n// dp[w] = max(dp[w], dp[w-wt[i]] + val[i])\n// Time: O(n*W), Space: O(W) optimized` },
    mistakes: [
      { wrong: "Iterating w from 0 to W in space-optimized version", correct: "Iterate w from W DOWN to wt[i]", explanation: "Going forward uses the current row's updated values (allowing unlimited picks = unbounded knapsack). Going backward ensures each item is used at most once." },
    ],
    leetcode: { problem: "LeetCode #416 — Partition Equal Subset Sum\n\nCan you partition array into two subsets with equal sum?", approach: "0/1 Knapsack variant: find subset with sum = total/2.", dryRun: "[1,5,11,5] → total=22, target=11 → yes (11 or 1+5+5)", code: "class Solution {\npublic:\n    bool canPartition(vector<int>& nums) {\n        int sum=0; for(int n:nums) sum+=n;\n        if (sum%2) return false;\n        int target=sum/2;\n        vector<bool> dp(target+1,false); dp[0]=true;\n        for (int n:nums)\n            for (int w=target;w>=n;w--)\n                dp[w]=dp[w]||dp[w-n];\n        return dp[target];\n    }\n};", complexity: "Time: O(n*sum), Space: O(sum)" },
    checkpoint: { question: "In space-optimized 0/1 Knapsack, why iterate capacity backwards?", options: ["For better cache performance", "To ensure each item is used at most once", "It doesn't matter", "To avoid negative indices"], answer: 1 }
  },

  "6.3": {
    id: "6.3", title: "Unbounded Knapsack", phaseId: "phase-6", phaseTitle: "Dynamic Programming",
    subtopics: ["Unlimited items", "Forward iteration", "Coin change variant"],
    story: `Unlike 0/1 Knapsack where each item can be picked at most once, **Unbounded Knapsack** lets you pick the SAME item unlimited times! It's like a **vending machine** — you can buy as many of the same snack as you want, as long as you have enough money.\n\nThe only change from 0/1 Knapsack: iterate capacity FORWARD instead of backward! Going forward means when you compute dp[w], dp[w-wt[i]] might already include item i (picked earlier in this same iteration), which is exactly what we want for unlimited picks.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│    UNBOUNDED KNAPSACK — FORWARD ITERATION                │
│                                                          │
│  0/1: for w from W DOWN to wt[i]  (each item once)      │\n│  Unbounded: for w from wt[i] UP to W  (unlimited)       │\n│                                                          │\n│  dp[w] = max(dp[w], dp[w-wt[i]] + val[i])               │\n│  dp[w-wt[i]] may ALREADY include item i!                 │\n│                                                          │\n│  COMPLEXITY: O(n*W)                                      │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "for(int w=wt[i]; w<=W; w++) dp[w]=max(dp[w], dp[w-wt[i]]+val[i]);", explanation: "Forward iteration allows unlimited picks of same item", memoryChange: "DP table updated", output: "None" },
    ],
    code: `#include <iostream>
#include <vector>
using namespace std;

int unboundedKnapsack(vector<int>& wt, vector<int>& val, int W) {
    vector<int> dp(W+1, 0);
    for (int i = 0; i < wt.size(); i++)
        for (int w = wt[i]; w <= W; w++)
            dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);
    return dp[W];
}

int main() {
    vector<int> wt = {1, 3, 4, 5}, val = {1, 4, 5, 7};
    cout << unboundedKnapsack(wt, val, 7) << endl;  // 9 (e.g., 1+4+4)
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: Unbounded Knapsack", content: `// Same as 0/1 but iterate FORWARD\nfor (int w = wt[i]; w <= W; w++)\n    dp[w] = max(dp[w], dp[w-wt[i]] + val[i]);\n// Time: O(n*W), Space: O(W)` },
    mistakes: [
      { wrong: "Iterating backwards (same as 0/1)", correct: "Iterate FORWARD for unbounded", explanation: "Backward iteration ensures each item is used at most once (0/1). Forward iteration allows unlimited reuse (unbounded)." },
    ],
    leetcode: { problem: "LeetCode #322 — Coin Change\n\nFind minimum coins to make amount.", approach: "Unbounded knapsack variant: dp[w] = min(dp[w], dp[w-coin]+1).", dryRun: "coins=[1,2,5], amount=11 → 3 (5+5+1)", code: "class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        vector<int> dp(amount+1, amount+1);\n        dp[0] = 0;\n        for (int c : coins)\n            for (int w=c; w<=amount; w++)\n                dp[w] = min(dp[w], dp[w-c]+1);\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n};", complexity: "Time: O(n*amount), Space: O(amount)" },
    checkpoint: { question: "What iteration direction is used for unbounded knapsack?", options: ["Backward (W to wt[i])", "Forward (wt[i] to W)", "Both work the same", "Neither"], answer: 1 }
  },

  "6.4": {
    id: "6.4", title: "LCS", phaseId: "phase-6", phaseTitle: "Dynamic Programming",
    subtopics: ["Longest Common Subsequence", "2D DP table", "Reconstruction"],
    story: `Imagine two students wrote essays on the same topic. You want to find the **longest sequence of words that appears in both essays** (in the same order, but not necessarily consecutive). That's the **Longest Common Subsequence (LCS)**!\n\nIf characters match, the LCS grows by 1. If they don't match, take the better of skipping from either string. This creates a beautiful 2D DP table where dp[i][j] = LCS of first i chars of string A and first j chars of string B.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│         LCS — 2D DP TABLE                                │
│  A = "ABCBDAB", B = "BDCAB"                             │\n│  dp[i][j]:                                               │\n│  if A[i-1]==B[j-1]: dp[i][j]=dp[i-1][j-1]+1            │\n│  else: dp[i][j]=max(dp[i-1][j], dp[i][j-1])             │\n│  Answer: dp[m][n] = 4 ("BCAB")                          │\n│  COMPLEXITY: O(m*n)                                      │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "if(A[i-1]==B[j-1]) dp[i][j]=dp[i-1][j-1]+1;", explanation: "Characters match — extend LCS by 1", memoryChange: "dp[i][j] updated", output: "None" },
      { line: "else dp[i][j]=max(dp[i-1][j], dp[i][j-1]);", explanation: "Skip from A or skip from B", memoryChange: "dp[i][j] updated", output: "None" },
    ],
    code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int LCS(string A, string B) {
    int m = A.size(), n = B.size();
    vector<vector<int>> dp(m+1, vector<int>(n+1, 0));
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++) {
            if (A[i-1] == B[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
            else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    return dp[m][n];
}

int main() {
    cout << LCS("ABCBDAB", "BDCAB") << endl;  // 4
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: LCS", content: `// dp[i][j] = LCS of A[0..i-1] and B[0..j-1]\nif (A[i-1]==B[j-1]) dp[i][j]=dp[i-1][j-1]+1;\nelse dp[i][j]=max(dp[i-1][j], dp[i][j-1]);\n// Time: O(m*n), Space: O(m*n) or O(min(m,n))` },
    mistakes: [
      { wrong: "dp[i][j]=dp[i-1][j-1]+1 when A[i-1]!=B[j-1]", correct: "Only add 1 when characters MATCH", explanation: "The +1 only applies when characters are equal. When they differ, take the max of the two skip options." },
    ],
    leetcode: { problem: "LeetCode #1143 — Longest Common Subsequence\n\nFind LCS of two strings.", approach: "Standard 2D DP LCS algorithm.", dryRun: "text1=\"abcde\", text2=\"ace\" → 3", code: "class Solution {\npublic:\n    int longestCommonSubsequence(string text1, string text2) {\n        int m=text1.size(), n=text2.size();\n        vector<vector<int>> dp(m+1, vector<int>(n+1,0));\n        for (int i=1;i<=m;i++) for (int j=1;j<=n;j++) {\n            if (text1[i-1]==text2[j-1]) dp[i][j]=dp[i-1][j-1]+1;\n            else dp[i][j]=max(dp[i-1][j],dp[i][j-1]);\n        }\n        return dp[m][n];\n    }\n};", complexity: "Time: O(m*n), Space: O(m*n)" },
    checkpoint: { question: "In LCS, what happens when the two characters match?", options: ["Take max of two skips", "Add 1 to diagonal value dp[i-1][j-1]", "Copy from left", "Copy from above"], answer: 1 }
  },

  "6.5": {
    id: "6.5", title: "LIS", phaseId: "phase-6", phaseTitle: "Dynamic Programming",
    subtopics: ["Longest Increasing Subsequence", "O(n^2) DP", "O(n log n) binary search"],
    story: `Imagine a **line of people** with different heights. You want to find the **longest subsequence** where each person is taller than the previous — but they don't need to be standing next to each other!\n\nThe O(n^2) DP approach: for each element, check all previous elements and extend the longest subsequence that can include it. The O(n log n) approach uses a **patience sorting** trick — maintain a "tails" array where tails[i] = smallest ending element of an increasing subsequence of length i+1. Use binary search to find where each element belongs!`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│    LIS — PATIENCE SORTING (O(n log n))                   │
│  nums = [10, 9, 2, 5, 3, 7, 101, 18]                    │\n│  tails evolves:                                          │\n│  10 → 9 → 2 → 2,5 → 2,3 → 2,3,7 → 2,3,7,101 → 2,3,7,18│\n│  LIS length = 4 (2,3,7,18 or 2,3,7,101)                  │\n│  COMPLEXITY: O(n log n)                                  │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "vector<int> tails;", explanation: "Track smallest ending element for each LIS length", memoryChange: "Empty tails array", output: "None" },
      { line: "auto it = lower_bound(tails.begin(), tails.end(), nums[i]);", explanation: "Find position for current number", memoryChange: "Iterator found", output: "None" },
      { line: "if(it==tails.end()) tails.push_back(nums[i]); else *it=nums[i];", explanation: "Extend or improve existing subsequence", memoryChange: "Tails updated", output: "None" },
    ],
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int lengthOfLIS(vector<int>& nums) {
    vector<int> tails;
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return tails.size();
}

int main() {
    vector<int> nums = {10, 9, 2, 5, 3, 7, 101, 18};
    cout << "LIS length: " << lengthOfLIS(nums) << endl;  // 4
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: LIS", content: `// O(n log n): maintain tails array\nfor (int x : nums) {\n    auto it = lower_bound(tails.begin(), tails.end(), x);\n    if (it == tails.end()) tails.push_back(x);\n    else *it = x;\n}\n// tails.size() = LIS length\n// Time: O(n log n), Space: O(n)` },
    mistakes: [
      { wrong: "Using upper_bound instead of lower_bound", correct: "Use lower_bound for strictly increasing", explanation: "upper_bound allows equal elements (non-decreasing). For strictly increasing, use lower_bound." },
    ],
    leetcode: { problem: "LeetCode #300 — Longest Increasing Subsequence\n\nFind length of LIS.", approach: "Patience sorting with binary search on tails array.", dryRun: "[10,9,2,5,3,7,101,18] → LIS length 4", code: "class Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        vector<int> tails;\n        for (int x : nums) {\n            auto it = lower_bound(tails.begin(), tails.end(), x);\n            if (it==tails.end()) tails.push_back(x);\n            else *it=x;\n        }\n        return tails.size();\n    }\n};", complexity: "Time: O(n log n), Space: O(n)" },
    checkpoint: { question: "What is the time complexity of the efficient LIS algorithm using binary search?", options: ["O(n^2)", "O(n log n)", "O(n)", "O(log n)"], answer: 1 }
  },

  "6.6": {
    id: "6.6", title: "Coin Change", phaseId: "phase-6", phaseTitle: "Dynamic Programming",
    subtopics: ["Minimum coins", "Number of ways", "Unbounded knapsack variant"],
    story: `You're at a **cash register** and need to make change for $11 using coins of $1, $2, and $5. You want the **fewest coins** possible. This is the Coin Change problem — an unbounded knapsack variant!\n\ndp[w] = minimum coins to make amount w. For each coin, try using it: dp[w] = min(dp[w], dp[w-coin]+1). Initialize dp[0]=0 (0 coins to make $0) and everything else to infinity.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│  coins=[1,2,5], amount=11                               │\n│  dp[0]=0, rest=INF                                      │\n│  dp[1]=1, dp[2]=1, dp[5]=1, dp[6]=2, dp[10]=2, dp[11]=3 │\n│  Answer: 3 coins (5+5+1)                                │\n│  COMPLEXITY: O(n*amount)                                 │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "vector<int> dp(amount+1, amount+1); dp[0]=0;", explanation: "Initialize DP array with infinity, base case dp[0]=0", memoryChange: "DP array created", output: "None" },
      { line: "for(int c:coins) for(int w=c;w<=amount;w++) dp[w]=min(dp[w],dp[w-c]+1);", explanation: "Try each coin for each amount", memoryChange: "DP values filled", output: "None" },
    ],
    code: `#include <iostream>
#include <vector>
using namespace std;

int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount+1, amount+1);
    dp[0] = 0;
    for (int c : coins)
        for (int w = c; w <= amount; w++)
            dp[w] = min(dp[w], dp[w-c] + 1);
    return dp[amount] > amount ? -1 : dp[amount];
}

int main() {
    vector<int> coins = {1, 2, 5};
    cout << coinChange(coins, 11) << endl;  // 3
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: Coin Change", content: `// dp[w] = min coins to make amount w\ndp[0] = 0;  // base case\nfor (int c : coins)\n    for (int w = c; w <= amount; w++)\n        dp[w] = min(dp[w], dp[w-c]+1);\n// Time: O(n*amount), Space: O(amount)` },
    mistakes: [
      { wrong: "dp[0] = 1 instead of 0", correct: "dp[0] = 0 (0 coins needed for amount 0)", explanation: "Amount 0 requires 0 coins. Starting with dp[0]=1 corrupts all subsequent calculations." },
    ],
    leetcode: { problem: "LeetCode #322 — Coin Change", approach: "Unbounded knapsack DP: dp[w] = min(dp[w], dp[w-coin]+1).", dryRun: "coins=[1,2,5], amount=11 → 3", code: "class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        vector<int> dp(amount+1, amount+1);\n        dp[0] = 0;\n        for (int c : coins) for (int w=c; w<=amount; w++) dp[w]=min(dp[w],dp[w-c]+1);\n        return dp[amount]>amount?-1:dp[amount];\n    }\n};", complexity: "Time: O(n*amount), Space: O(amount)" },
    checkpoint: { question: "What should dp[0] be initialized to in Coin Change?", options: ["1", "0", "Infinity", "-1"], answer: 1 }
  },

  "6.7": {
    id: "6.7", title: "Edit Distance", phaseId: "phase-6", phaseTitle: "Dynamic Programming",
    subtopics: ["Insert", "Delete", "Replace", "2D DP"],
    story: `Imagine transforming the word **"horse"** into **"ros"**. You can do three operations: insert a character, delete a character, or replace one character with another. Each operation costs 1. What's the minimum cost?\n\nThis is **Edit Distance** (Levenshtein Distance). The DP insight: if the last characters match, no operation needed (dp[i][j] = dp[i-1][j-1]). If they differ, try all three operations and take the minimum.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│  dp[i][j] = edit distance of A[0..i-1] and B[0..j-1]    │
│  if A[i-1]==B[j-1]: dp[i][j]=dp[i-1][j-1]               │
│  else: dp[i][j]=1+min(dp[i-1][j-1],dp[i-1][j],dp[i][j-1])│\n│  replace,     delete,      insert                        │
│  "horse"→"ros": delete h, replace o→r, delete e, delete e│\n│  Answer: 3                                                │\n│  COMPLEXITY: O(m*n)                                      │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "if(word1[i-1]==word2[j-1]) dp[i][j]=dp[i-1][j-1];", explanation: "Characters match — no operation needed", memoryChange: "Diagonal copy", output: "None" },
      { line: "else dp[i][j]=1+min({dp[i-1][j-1],dp[i-1][j],dp[i][j-1]});", explanation: "Try replace, delete, insert — take minimum", memoryChange: "dp[i][j] computed", output: "None" },
    ],
    code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int minDistance(string word1, string word2) {
    int m = word1.size(), n = word2.size();
    vector<vector<int>> dp(m+1, vector<int>(n+1));
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++) {
            if (word1[i-1] == word2[j-1]) dp[i][j] = dp[i-1][j-1];
            else dp[i][j] = 1 + min({dp[i-1][j-1], dp[i-1][j], dp[i][j-1]});
        }
    return dp[m][n];
}

int main() {
    cout << minDistance("horse", "ros") << endl;  // 3
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: Edit Distance", content: `// Base: dp[i][0]=i, dp[0][j]=j\nif (match) dp[i][j]=dp[i-1][j-1];\nelse dp[i][j]=1+min(replace,delete,insert);\n// O(m*n)` },
    mistakes: [
      { wrong: "Forgetting base cases dp[i][0]=i and dp[0][j]=j", correct: "Initialize base cases: converting to/from empty string", explanation: "dp[i][0]=i means deleting all i characters. dp[0][j]=j means inserting all j characters. Without these, the DP recurrence has no foundation." },
    ],
    leetcode: { problem: "LeetCode #72 — Edit Distance\n\nMinimum operations to convert word1 to word2.", approach: "2D DP with insert/delete/replace operations.", dryRun: "\"horse\"→\"ros\" → 3 operations", code: "class Solution {\npublic:\n    int minDistance(string word1, string word2) {\n        int m=word1.size(), n=word2.size();\n        vector<vector<int>> dp(m+1,vector<int>(n+1));\n        for (int i=0;i<=m;i++) dp[i][0]=i;\n        for (int j=0;j<=n;j++) dp[0][j]=j;\n        for (int i=1;i<=m;i++) for (int j=1;j<=n;j++) {\n            if (word1[i-1]==word2[j-1]) dp[i][j]=dp[i-1][j-1];\n            else dp[i][j]=1+min({dp[i-1][j-1],dp[i-1][j],dp[i][j-1]});\n        }\n        return dp[m][n];\n    }\n};", complexity: "Time: O(m*n), Space: O(m*n)" },
    checkpoint: { question: "In Edit Distance, what does dp[i-1][j] represent?", options: ["Replace", "Insert", "Delete from word1", "Match"], answer: 2 }
  },

  "6.8": {
    id: "6.8", title: "Matrix Chain Multiplication", phaseId: "phase-6", phaseTitle: "Dynamic Programming",
    subtopics: ["Optimal parenthesization", "Interval DP", "Chain multiplication"],
    story: `Imagine you need to multiply matrices A(10x30) × B(30x5) × C(5x60). Matrix multiplication is associative — (AB)C = A(BC) — but the **number of operations differs** wildly!\n\n(AB)C: 10×30×5 + 10×5×60 = 1500 + 3000 = 4500\nA(BC): 30×5×60 + 10×30×60 = 9000 + 18000 = 27000\n\nSame result, but the first way is **6x faster**! Matrix Chain Multiplication finds the optimal parenthesization using interval DP: try every possible split point and take the minimum.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│  dp[i][j] = min cost to multiply matrices i through j    │
│  dp[i][j] = min over k of: dp[i][k]+dp[k+1][j]+dim[i-1]*dim[k]*dim[j]│\n│  Fill diagonally: len from 2 to n                        │\n│  COMPLEXITY: O(n^3)                                      │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "for(int len=2;len<n;len++)", explanation: "Try all chain lengths", memoryChange: "Outer loop iteration", output: "None" },
      { line: "for(int k=i;k<j;k++) dp[i][j]=min(dp[i][j],dp[i][k]+dp[k+1][j]+dims[i-1]*dims[k]*dims[j]);", explanation: "Try every split point k", memoryChange: "dp[i][j] computed", output: "None" },
    ],
    code: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int matrixChain(vector<int>& dims) {
    int n = dims.size() - 1;
    vector<vector<int>> dp(n, vector<int>(n, 0));
    for (int len = 2; len <= n; len++)
        for (int i = 0; i <= n - len; i++) {
            int j = i + len - 1;
            dp[i][j] = INT_MAX;
            for (int k = i; k < j; k++)
                dp[i][j] = min(dp[i][j], dp[i][k] + dp[k+1][j] + dims[i]*dims[k+1]*dims[j+1]);
        }
    return dp[0][n-1];
}

int main() {
    vector<int> dims = {10, 30, 5, 60};
    cout << matrixChain(dims) << endl;  // 4500
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: Matrix Chain Multiplication", content: `// Interval DP: dp[i][j] = min cost for range [i,j]\nfor (int len=2; len<=n; len++)\n  for (int i=0; i<=n-len; i++) {\n    int j=i+len-1;\n    for (int k=i; k<j; k++)\n      dp[i][j] = min(dp[i][j], dp[i][k]+dp[k+1][j]+cost);\n  }\n// O(n^3)` },
    mistakes: [
      { wrong: "Filling dp table row by row", correct: "Fill diagonally by chain length", explanation: "Interval DP must be filled by increasing chain length because dp[i][j] depends on smaller intervals [i,k] and [k+1,j]." },
    ],
    leetcode: { problem: "LeetCode #1039 — Minimum Score Triangulation of Polygon", approach: "Same interval DP pattern as matrix chain multiplication.", dryRun: "values=[1,2,3] → 6", code: "class Solution {\npublic:\n    int minScoreTriangulation(vector<int>& values) {\n        int n=values.size();\n        vector<vector<int>> dp(n,vector<int>(n,0));\n        for (int len=3;len<=n;len++)\n            for (int i=0;i<=n-len;i++) {\n                int j=i+len-1; dp[i][j]=INT_MAX;\n                for (int k=i+1;k<j;k++)\n                    dp[i][j]=min(dp[i][j],dp[i][k]+dp[k][j]+values[i]*values[k]*values[j]);\n            }\n        return dp[0][n-1];\n    }\n};", complexity: "Time: O(n^3), Space: O(n^2)" },
    checkpoint: { question: "What is the time complexity of Matrix Chain Multiplication DP?", options: ["O(n^2)", "O(n^3)", "O(2^n)", "O(n log n)"], answer: 1 }
  },

  "6.9": {
    id: "6.9", title: "Partition Equal Subset Sum", phaseId: "phase-6", phaseTitle: "Dynamic Programming",
    subtopics: ["Subset sum variant", "0/1 Knapsack application"],
    story: `Can you split an array into two groups with equal sum? This is a 0/1 Knapsack variant: find a subset with sum = total/2. If total is odd, it's impossible. Otherwise, use the knapsack DP to check if any subset sums to exactly half.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐\n│  nums=[1,5,11,5], total=22, target=11                    │\n│  dp[w] = can we make sum w?                              │\n│  dp[0]=true, try each number like 0/1 knapsack           │\n│  Answer: dp[11]=true (1+5+5=11)                          │\n│  COMPLEXITY: O(n*sum)                                    │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "int sum=0; for(int n:nums) sum+=n; if(sum%2) return false;", explanation: "Check if total is even", memoryChange: "Sum computed", output: "None" },
      { line: "vector<bool> dp(target+1,false); dp[0]=true;", explanation: "Initialize subset sum DP", memoryChange: "DP array created", output: "None" },
    ],
    code: `#include <iostream>
#include <vector>
using namespace std;

bool canPartition(vector<int>& nums) {
    int sum = 0;
    for (int n : nums) sum += n;
    if (sum % 2) return false;
    int target = sum / 2;
    vector<bool> dp(target + 1, false);
    dp[0] = true;
    for (int n : nums)
        for (int w = target; w >= n; w--)
            dp[w] = dp[w] || dp[w - n];
    return dp[target];
}

int main() {
    vector<int> nums = {1, 5, 11, 5};
    cout << canPartition(nums) << endl;  // 1 (true)
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: Partition Equal Subset Sum", content: `// 0/1 Knapsack: target = total/2\nvector<bool> dp(target+1, false);\ndp[0] = true;\nfor (int n : nums)\n    for (int w = target; w >= n; w--)\n        dp[w] = dp[w] || dp[w-n];\nreturn dp[target];` },
    mistakes: [
      { wrong: "Forward iteration for 0/1 knapsack", correct: "Backward iteration to prevent reuse", explanation: "Same as 0/1 knapsack — backward iteration ensures each number is used at most once." },
    ],
    leetcode: { problem: "LeetCode #416 — Partition Equal Subset Sum", approach: "0/1 Knapsack with target=total/2.", dryRun: "[1,5,11,5] → total=22, target=11 → true", code: "class Solution {\npublic:\n    bool canPartition(vector<int>& nums) {\n        int sum=0; for(int n:nums) sum+=n;\n        if (sum%2) return false;\n        int target=sum/2;\n        vector<bool> dp(target+1,false); dp[0]=true;\n        for (int n:nums) for (int w=target;w>=n;w--) dp[w]=dp[w]||dp[w-n];\n        return dp[target];\n    }\n};", complexity: "Time: O(n*sum), Space: O(sum)" },
    checkpoint: { question: "If total sum is odd, can the array be partitioned into equal sum subsets?", options: ["Yes, always", "No, impossible", "Maybe", "Only if sorted"], answer: 1 }
  },

  "6.10": {
    id: "6.10", title: "Rod Cutting", phaseId: "phase-6", phaseTitle: "Dynamic Programming",
    subtopics: ["Maximize profit", "Unbounded knapsack variant", "Cut or don't cut"],
    story: `You have a rod of length n and a price list for each length. How do you cut the rod to **maximize profit**? You can make multiple cuts of the same length — it's an **unbounded knapsack** variant where weight = length and value = price.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐\n│  prices = [0,1,5,8,9,10,17,17,20]  (index=length)       │\n│  dp[i] = max profit for rod of length i                  │\n│  dp[i] = max(dp[i], dp[i-j] + prices[j]) for all j<=i   │\n│  COMPLEXITY: O(n^2)                                      │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "dp[i] = max(dp[i], dp[i-j] + price[j]);", explanation: "Try cutting piece of length j, take maximum profit", memoryChange: "DP table updated", output: "None" },
    ],
    code: `#include <iostream>
#include <vector>
using namespace std;

int rodCutting(vector<int>& price, int n) {
    vector<int> dp(n+1, 0);
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= i; j++)
            dp[i] = max(dp[i], dp[i-j] + price[j]);
    return dp[n];
}

int main() {
    vector<int> price = {0, 1, 5, 8, 9, 10, 17, 17, 20};
    cout << rodCutting(price, 8) << endl;  // 22
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: Rod Cutting", content: `// Unbounded knapsack variant\nfor (int i=1; i<=n; i++)\n    for (int j=1; j<=i; j++)\n        dp[i] = max(dp[i], dp[i-j] + price[j]);\n// O(n^2)` },
    mistakes: [
      { wrong: "Treating as 0/1 knapsack", correct: "It's unbounded — same cut can be used multiple times", explanation: "A rod of length 4 can be cut as 2+2, so length 2 is used twice. Forward iteration allows this." },
    ],
    leetcode: { problem: "Similar to LeetCode #343 — Integer Break\n\nBreak integer n into positive integers to maximize product.", approach: "Same pattern: dp[i] = max product from breaking integer i.", dryRun: "n=10 → 36 (3+3+4, product=36)", code: "class Solution {\npublic:\n    int integerBreak(int n) {\n        vector<int> dp(n+1,0);\n        for (int i=2;i<=n;i++)\n            for (int j=1;j<i;j++)\n                dp[i]=max(dp[i],max(j*(i-j),j*dp[i-j]));\n        return dp[n];\n    }\n};", complexity: "Time: O(n^2), Space: O(n)" },
    checkpoint: { question: "Rod Cutting is a variant of which knapsack problem?", options: ["0/1 Knapsack", "Unbounded Knapsack", "Fractional Knapsack", "None"], answer: 1 }
  },

  "6.11": {
    id: "6.11", title: "DP on Trees", phaseId: "phase-6", phaseTitle: "Dynamic Programming",
    subtopics: ["Rerooting technique", "Tree diameter", "Maximum path sum"],
    story: `DP on trees is like planning a **company retreat** — you need to consider each department (subtree) independently, then combine results at the manager (parent) level. The key insight: process children first (post-order), then combine their results at the parent.\n\nThe **rerooting technique** solves "find the best answer when any node can be the root" — compute answers for one root, then efficiently reroot by removing the contribution from the old parent direction and adding from the new parent direction.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐\n│  DP ON TREES — POST-ORDER PROCESSING                     │\n│  1. Process all children first (get subtree results)      │\n│  2. Combine children's results at parent                  │\n│  3. Return result upward                                  │\n│                                                          │\n│  REROOTING:                                              │\n│  dp[root] computed → dp[new_root] in O(1) per edge       │\n│  Remove old parent's contribution, add new one            │\n│  Total: O(n) for all roots                               │\n│  COMPLEXITY: O(n) for tree DP                            │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "int dfs(TreeNode* root) {", explanation: "Post-order traversal of tree", memoryChange: "Stack frame created", output: "None" },
      { line: "int left = dfs(root->left), right = dfs(root->right);", explanation: "Get results from both subtrees", memoryChange: "Subtree DP values computed", output: "None" },
      { line: "return max(left, right) + 1;", explanation: "Combine and return to parent", memoryChange: "Result returned upward", output: "Tree DP answer" },
    ],
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int maxPathSum(TreeNode* root, int& result) {
    if (!root) return 0;
    int left = max(0, maxPathSum(root->left, result));
    int right = max(0, maxPathSum(root->right, result));
    result = max(result, left + right + root->val);
    return max(left, right) + root->val;
}

int main() {
    // Build tree and call maxPathSum
    int result = INT_MIN;
    // maxPathSum(root, result);
    cout << "Max path sum: " << result << endl;
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: DP on Trees", content: `// Post-order: process children, combine at parent\n// Rerooting: compute for one root, then adjust\n// Tree DP: O(n) time, O(h) recursion space` },
    mistakes: [
      { wrong: "Processing parent before children in tree DP", correct: "Always process children first (post-order)", explanation: "Tree DP requires children's results before computing the parent's. Use post-order traversal." },
    ],
    leetcode: { problem: "LeetCode #124 — Binary Tree Maximum Path Sum\n\nFind the maximum path sum in a binary tree.", approach: "Post-order DP: at each node, compute max path through that node. Track global maximum.", dryRun: "Tree with -10,9,20,null,null,15,7 → max path = 42", code: "class Solution {\n    int result = INT_MIN;\npublic:\n    int maxPathSum(TreeNode* root) {\n        dfs(root);\n        return result;\n    }\n    int dfs(TreeNode* root) {\n        if (!root) return 0;\n        int l=max(0,dfs(root->left)), r=max(0,dfs(root->right));\n        result=max(result,l+r+root->val);\n        return max(l,r)+root->val;\n    }\n};", complexity: "Time: O(n), Space: O(h)" },
    checkpoint: { question: "What traversal order is used for DP on trees?", options: ["Pre-order", "In-order", "Post-order", "Level-order"], answer: 2 }
  },

  "6.12": {
    id: "6.12", title: "DP on Graphs", phaseId: "phase-6", phaseTitle: "Dynamic Programming",
    subtopics: ["Shortest paths in DAG", "Counting paths", "DAG dp"],
    story: `DP on graphs works beautifully on **DAGs (Directed Acyclic Graphs)** — graphs with no cycles. Since there are no cycles, we can always find a **topological order** where every edge goes from earlier to later. Process nodes in this order and the DP naturally flows from left to right!\n\nFor counting paths in a DAG, dp[v] = sum of dp[u] for all edges u→v. Since we process in topological order, all dp[u] are already computed when we reach v.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐\n│  DAG DP — TOPOLOGICAL ORDER                              │\n│  A → B → D                                              │\n│  A → C → D                                              │\n│  B → C                                                  │\n│  Topo order: A, B, C, D                                 │\n│  dp[A]=1, dp[B]=1, dp[C]=2, dp[D]=3                     │\n│  3 paths from A to D!                                    │\n│  COMPLEXITY: O(V+E)                                      │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "vector<int> order = topologicalSort(adj);", explanation: "Get processing order", memoryChange: "Topo order computed", output: "None" },
      { line: "for(int u : order) for(int v : adj[u]) dp[v] += dp[u];", explanation: "Propagate DP values along edges", memoryChange: "dp values updated in topological order", output: "None" },
    ],
    code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int countPaths(int n, vector<vector<int>>& adj, int src, int dest) {
    vector<int> indegree(n, 0);
    for (auto& list : adj) for (int v : list) indegree[v]++;
    queue<int> q;
    for (int i = 0; i < n; i++) if (indegree[i] == 0) q.push(i);
    vector<int> dp(n, 0); dp[src] = 1;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            dp[v] += dp[u];
            if (--indegree[v] == 0) q.push(v);
        }
    }
    return dp[dest];
}`,
    syntaxCard: { title: "SYNTAX: DP on Graphs", content: `// Only works on DAGs!\n// 1. Topological sort\n// 2. Process in topo order\n// 3. dp[v] = aggregate dp[u] for all u->v\n// O(V+E)` },
    mistakes: [
      { wrong: "Applying DP on graphs with cycles", correct: "Only apply on DAGs, or convert to DAG first", explanation: "Cycles create circular dependencies in DP. For graphs with cycles, use different approaches like Bellman-Ford." },
    ],
    leetcode: { problem: "LeetCode #all-paths", approach: "Count paths in DAG using topological DP.", dryRun: "Graph A→B→D, A→C→D → 2 paths", code: "// Use topological sort + DP counting", complexity: "Time: O(V+E), Space: O(V)" },
    checkpoint: { question: "DP on graphs requires which property?", options: ["Weighted edges", "No cycles (DAG)", "Undirected", "Complete graph"], answer: 1 }
  },

  "6.13": {
    id: "6.13", title: "Bitmask DP", phaseId: "phase-6", phaseTitle: "Dynamic Programming",
    subtopics: ["State as bitmask", "Assignment problem", "TSP variant"],
    story: `Imagine you have **n tasks** and **n workers**, and you need to assign each worker exactly one task to minimize total cost. The state is "which tasks are already taken?" — and you can represent this as a **bitmask** where bit i = 1 means task i is taken!\n\nFor 4 tasks, the mask can be 0000 (none taken) to 1111 (all taken) — just 16 states instead of 4! permutations. dp[mask] = minimum cost when the tasks in 'mask' are already assigned. This is the **Assignment Problem** solved with Bitmask DP.`,
    memoryViz: `┌──────────────────────────────────────────────────────────┐
│  BITMASK DP — ASSIGNMENT PROBLEM                         │
│  mask = 0b1010 means tasks 1 and 3 are taken             │\n│  dp[mask] = min cost when tasks in mask are assigned     │\n│  For each unassigned task, try assigning current worker  │\n│                                                          │\n│  4 tasks: 2^4 = 16 states instead of 4! = 24            │\n│  20 tasks: 2^20 ≈ 1M instead of 20! ≈ 10^18             │\n│                                                          │\n│  COMPLEXITY: O(n * 2^n)                                  │\n└──────────────────────────────────────────────────────────┘`,
    stepByStep: [
      { line: "for(int mask=0; mask<(1<<n); mask++)", explanation: "Iterate over all possible subsets", memoryChange: "Mask iterated", output: "None" },
      { line: "int worker = __builtin_popcount(mask);", explanation: "Number of set bits = number of assigned workers", memoryChange: "Worker index determined", output: "None" },
      { line: "for(int j=0;j<n;j++) if(!(mask&(1<<j))) dp[mask|(1<<j)]=min(dp[mask|(1<<j)],dp[mask]+cost[worker][j]);", explanation: "Try assigning current worker to each unassigned task", memoryChange: "DP updated for new mask", output: "None" },
    ],
    code: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int assignmentProblem(vector<vector<int>>& cost) {
    int n = cost.size();
    vector<int> dp(1 << n, INT_MAX);
    dp[0] = 0;
    for (int mask = 0; mask < (1 << n); mask++) {
        int worker = __builtin_popcount(mask);
        if (worker >= n) continue;
        for (int j = 0; j < n; j++) {
            if (mask & (1 << j)) continue;
            int newMask = mask | (1 << j);
            dp[newMask] = min(dp[newMask], dp[mask] + cost[worker][j]);
        }
    }
    return dp[(1 << n) - 1];
}

int main() {
    vector<vector<int>> cost = {{9,2,7,8},{6,4,3,7},{5,8,1,8},{7,6,9,4}};
    cout << assignmentProblem(cost) << endl;  // 13
    return 0;
}`,
    syntaxCard: { title: "SYNTAX: Bitmask DP", content: `// mask: bit i = 1 means item i is selected\nfor (int mask=0; mask<(1<<n); mask++)\n    for (int j=0; j<n; j++)\n        if (!(mask&(1<<j)))  // if j not in mask\n            dp[mask|(1<<j)] = min(dp[mask|(1<<j)], dp[mask]+cost)\n// __builtin_popcount(mask) = number of set bits\n// Time: O(n * 2^n)` },
    mistakes: [
      { wrong: "Using on n > 20", correct: "Bitmask DP only feasible for n <= 20", explanation: "2^20 is about 1 million. For n=25, that's 33 million. For n=30, over 1 billion. Bitmask DP has exponential time." },
    ],
    leetcode: { problem: "LeetCode #847 — Shortest Path Visiting All Nodes\n\nFind shortest path that visits every node in a graph.", approach: "BFS with bitmask state: (node, visited_mask).", dryRun: "graph=[[1,2,3],[0],[0],[0]] → 4", code: "class Solution {\npublic:\n    int shortestPathLength(vector<vector<int>>& graph) {\n        int n=graph.size(), all=(1<<n)-1;\n        vector<vector<int>> dist(n,vector<int>(1<<n,INT_MAX));\n        queue<pair<int,int>> q;\n        for (int i=0;i<n;i++) { dist[i][1<<i]=0; q.push({i,1<<i}); }\n        while (!q.empty()) {\n            auto [u,mask]=q.front(); q.pop();\n            for (int v:graph[u]) {\n                int nmask=mask|(1<<v);\n                if (dist[v][nmask]>dist[u][mask]+1) {\n                    dist[v][nmask]=dist[u][mask]+1;\n                    q.push({v,nmask});\n                }\n            }\n        }\n        int ans=INT_MAX;\n        for (int i=0;i<n;i++) ans=min(ans,dist[i][all]);\n        return ans;\n    }\n};", complexity: "Time: O(n * 2^n), Space: O(n * 2^n)" },
    checkpoint: { question: "What is the practical limit for n in Bitmask DP?", options: ["n <= 10", "n <= 20", "n <= 100", "n <= 1000"], answer: 1 }
  }
};
