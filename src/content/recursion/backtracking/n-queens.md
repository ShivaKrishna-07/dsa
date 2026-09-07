---
title: "N-Queens"
difficulty: "Hard"
youtube: "https://www.youtube.com/results?search_query=take+U+forward+N-Queens"
time: "O(N!)"
space: "O(N^2)"
platforms:
  leetcode: "https://leetcode.com/problems/n-queens/"
---

### Problem Statement

The **n-queens** puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other.

Given an integer `n`, return all distinct solutions to the **n-queens** puzzle. You may return the answer in **any order**.

Each solution contains a distinct board configuration of the n-queens' placement, where `'Q'` and `'.'` both indicate a queen and an empty space, respectively.

**Example 1:**
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
        if(col == n){
            ans.push_back(board);
            return;
        }
        for(int row=0; row<n; row++){
            if(leftRow[row]==0 && lowerDiagonal[row+col]==0 && upperDiagonal[n-1 +col-row]==0) {
                board[row][col] = 'Q';
                leftRow[row] = 1;
                lowerDiagonal[row+col] = 1;
                upperDiagonal[n-1 +col-row] = 1;
                findQueens(col+1, board, n, ans, leftRow, lowerDiagonal, upperDiagonal);
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

- **Time Complexity:** O(N!). Placing the 1st queen has N possibilities, the 2nd queen has at most N-1, the 3rd at most N-2, etc. Since we use `leftRow`, `lowerDiagonal`, and `upperDiagonal` hashing arrays to validate positions in O(1) constant time, the overall time complexity perfectly bounds to factorial exponential time O(N!). 
- **Space Complexity:** O(N^2) auxiliary space. The `board` structure stores strings of size N leading to O(N^2) space. The recursion stack can reach a maximum depth of N, and our three tracking arrays use O(N) space each.
