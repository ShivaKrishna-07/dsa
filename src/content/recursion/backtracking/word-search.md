---
title: "Word Search"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=take+U+forward+Word+Search"
time: "O(N * M * 4^L)"
space: "O(L)"
platforms:
  leetcode: "https://leetcode.com/problems/word-search/"
  article: "https://takeuforward.org/data-structure/word-search-leetcode/"
---

### Problem Statement

Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

**Example 1:**
![Word Search Example 1](/images/word-search/word-search-1.jpg)
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
![Word Search Example 2](/images/word-search/word-search-2.png)
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
![Word Search Example 3](/images/word-search/word-search-3.png)
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
        // Base case: Full word matched
        if(idx == word.size()) return true;
        
        // Out of bounds or character mismatch
        if(i<0 || i>=n || j<0 || j>=m || board[i][j] != word[idx]){
            return false;
        }
        
        char temp = board[i][j];
        board[i][j] = '$'; // Mark cell as visited
        
        // Explore all 4 directions
        for(int k=0; k<4; k++){
            int _i = i+dir[k][0];
            int _j = j+dir[k][1];
            if(findWord(idx+1, _i, _j, n, m, board, word)) return true;
        }
        
        board[i][j] = temp; // Backtrack
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

- **Time Complexity:** O(N * M * 4^L): Iterate over N*M cells. From each, explore up to 4 directions at each step, up to depth L (word length).
- **Space Complexity:** O(L): Auxiliary space. Max recursion depth is length of word L. Board is modified in-place to save space.
