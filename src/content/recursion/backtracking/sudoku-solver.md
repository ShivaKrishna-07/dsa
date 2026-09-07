---
title: "Sudoku Solver"
difficulty: "Hard"
youtube: "https://www.youtube.com/results?search_query=take+U+forward+Sudoku+Solver"
time: "O(9^(n^2))"
space: "O(n^2)"
platforms:
  leetcode: "https://leetcode.com/problems/sudoku-solver/"
---

### Problem Statement

Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy **all of the following rules:**
1. Each of the digits `1-9` must occur exactly once in each row.
2. Each of the digits `1-9` must occur exactly once in each column.
3. Each of the digits `1-9` must occur exactly once in each of the 9 `3x3` sub-boxes of the grid.

The `'.'` character indicates empty cells.

**Example 1:**
```text
Input: board = [
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
Output: [
  ["5","3","4","6","7","8","9","1","2"],
  ["6","7","2","1","9","5","3","4","8"],
  ["1","9","8","3","4","2","5","6","7"],
  ["8","5","9","7","6","1","4","2","3"],
  ["4","2","6","8","5","3","7","9","1"],
  ["7","1","3","9","2","4","8","5","6"],
  ["9","6","1","5","3","7","2","8","4"],
  ["2","8","7","4","1","9","6","3","5"],
  ["3","4","5","2","8","6","1","7","9"]
]
```

**Constraints:**
- `board.length == 9`
- `board[i].length == 9`
- `board[i][j]` is a digit or `'.'`.
- It is **guaranteed** that the input board has only one solution.

---

### Code

```cpp
class Solution {
public:
    void solveSudoku(vector<vector<char>>& board) {
        solve(board);
    }

    bool solve(vector<vector<char>>& board){
        for(int i=0; i<board.size(); i++){
            for(int j=0; j<board[0].size(); j++){
                if(board[i][j] == '.'){
                    for(char c='1'; c<='9'; c++){
                        if(isValid(board, i, j, c)){
                            board[i][j] = c;
                            if(solve(board) == true)
                                return true;
                            else
                                board[i][j] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    bool isValid(vector<vector<char>>& board, int row, int col, char c){
        for(int i=0; i<9; i++){
            if(board[row][i] == c)
                return false;
            if(board[i][col] == c)
                return false;
            if(board[3*(row/3) + i/3][3*(col/3) + i%3] == c)
                return false;
        }
        return true;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** O(9^(n^2)), where n=9 is the board dimension. For each empty cell (up to 81 cells max), we have 9 possible digits (1 through 9) to try. This gives a theoretical worst-case bound of 9^81 operations. However, because of the rigid rules of Sudoku, the number of valid branches decreases drastically at every step, allowing it to run efficiently in practice.
- **Space Complexity:** O(n^2) auxiliary space. Since the board dimensions are fixed to 9x9, the maximum depth the recursive call stack can reach is exactly the number of empty cells, which is 81. Thus, memory usage scales proportional to the empty cells tracking the backtracks.
