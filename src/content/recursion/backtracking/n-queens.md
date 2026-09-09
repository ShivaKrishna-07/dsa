---
title: "N-Queens"
difficulty: "Hard"
youtube: "https://www.youtube.com/results?search_query=take+U+forward+N-Queens"
time: "O(N!)"
space: "O(N^2)"
platforms:
  leetcode: "https://leetcode.com/problems/n-queens/"
  article: "https://takeuforward.org/data-structure/n-queen-problem-return-all-distinct-solutions-to-the-n-queens-puzzle/"
---

### Problem Statement

The **n-queens** puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other.

Given an integer `n`, return all distinct solutions to the **n-queens** puzzle. You may return the answer in **any order**.

Each solution contains a distinct board configuration of the n-queens' placement, where `'Q'` and `'.'` both indicate a queen and an empty space, respectively.

**Example 1:**
![N-Queens Example](/images/n-queens/n-queens.png)
```text
Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above.
```

**Example 2:**
```text
Input: n = 1
Output: [["Q"]]
```

**Constraints:**
- 1 <= n <= 9

---

### Code

```cpp
class Solution {
public:
    void findQueens(int col, vector<string>&board, int n, vector<vector<string>>&ans, vector<int>&leftRow, vector<int>&lowerDiagonal, vector<int>&upperDiagonal){
        // Base case: If all queens are placed
        if(col == n){
            ans.push_back(board);
            return;
        }
        
        // Try placing a queen in each row for the current column
        for(int row=0; row<n; row++){
            // Check if the current cell is safe from attacks
            if(leftRow[row]==0 && lowerDiagonal[row+col]==0 && upperDiagonal[n-1 +col-row]==0) {
                board[row][col] = 'Q';
                leftRow[row] = 1;
                lowerDiagonal[row+col] = 1;
                upperDiagonal[n-1 +col-row] = 1;
                
                findQueens(col+1, board, n, ans, leftRow, lowerDiagonal, upperDiagonal);
                
                // Backtrack: Remove the queen and mark the cell as safe
                board[row][col] = '.';
                leftRow[row] = 0;
                lowerDiagonal[row+col] = 0;
                upperDiagonal[n-1 +col-row] = 0;
            }
        }
    }
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>>ans;
        vector<string>board(n);
        string s(n, '.');
        for(int i=0; i<n; i++){
            board[i] = s;
        }

        vector<int>leftRow(n, 0), lowerDiagonal(2*n-1, 0), upperDiagonal(2*n-1, 0);

        findQueens(0, board, n, ans, leftRow, lowerDiagonal, upperDiagonal);

        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** O(N!): Placing the 1st queen has N possibilities, 2nd has N-1, etc. Using arrays for validation gives O(1) checks, bounding time to O(N!). 
- **Space Complexity:** O(N^2): Auxiliary space. Board takes O(N^2), recursion stack and tracking arrays take O(N).
