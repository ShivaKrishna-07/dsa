---
title: "Word Search"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=take+U+forward+Word+Search"
time: "O(N * M * 4^L)"
space: "O(L)"
platforms:
  leetcode: "https://leetcode.com/problems/word-search/"
---

### Problem Statement

Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

**Example 1:**
```text
Input: 
board = [
  ["A","B","C","E"],
  ["S","F","C","S"],
  ["A","D","E","E"]
]
word = "ABCCED"
Output: true
```

**Example 2:**
```text
Input: 
board = [
  ["A","B","C","E"],
  ["S","F","C","S"],
  ["A","D","E","E"]
]
word = "SEE"
Output: true
```

**Example 3:**
```text
Input: 
board = [
  ["A","B","C","E"],
  ["S","F","C","S"],
  ["A","D","E","E"]
]
word = "ABCB"
Output: false
```

**Constraints:**
- m == board.length
- n == board[i].length
- 1 <= m, n <= 6
- 1 <= word.length <= 15
- `board` and `word` consists of only lowercase and uppercase English letters.

---

### Code

```cpp
class Solution {
public:
    vector<vector<int>>dir={{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    bool findWord(int idx, int i, int j, int n, int m, vector<vector<char>>&board, string word){
        if(idx == word.size()) return true;
        if(i<0 || i>=n || j<0 || j>=m || board[i][j] != word[idx]){
            return false;
        }
        char temp = board[i][j];
        board[i][j] = '$';
        for(int k=0; k<4; k++){
            int _i = i+dir[k][0];
            int _j = j+dir[k][1];
            if(findWord(idx+1, _i, _j, n, m, board, word)) return true;
        }
        board[i][j] = temp;
        return false;
    }
    bool exist(vector<vector<char>>& board, string word) {
        int n = board.size();
        int m = board[0].size();

        for(int i=0; i<n; i++){
            for(int j=0; j<m; j++){
                if(board[i][j] == word[0] && findWord(0, i, j, n, m, board, word)){
                    return true;
                }
            }
        }
        return false;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** O(N * M * 4^L), where N is the number of rows, M is the number of columns, and L is the length of the string `word`. The algorithm iterates over all N * M cells in the board. From each valid starting cell, the backtracking DFS explores up to 4 directions at each step, branching up to a depth of L.
- **Space Complexity:** O(L) auxiliary space. The maximum depth of the recursive call stack is exactly the length of the word L. Because the visited state is maintained by temporarily modifying the board in-place (`board[i][j] = '$'`), no additional O(N * M) visited array is needed!
