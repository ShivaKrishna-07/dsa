import os
import re

content_map = {
    "infix-to-prefix.md": """---
title: "Infix to Prefix"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Infix+to+Prefix+Conversion"
time: "O(N)"
space: "O(N)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/infix-to-prefix/1"
---

### Problem Statement

Given an infix expression in the form of string `str`, convert this infix expression to prefix expression.
- Infix expression: The operator is in between the operands (e.g., `A + B`).
- Prefix expression: The operator precedes the operands (e.g., `+ A B`).

The expression contains:
- Lowercase and uppercase English letters (operands).
- Operators: `+`, `-`, `*`, `/`, `^`.
- Parentheses: `(` and `)`.

**Example 1:**
```text
Input: str = "x+y*z/w+u"
Output: ++x/*yzwu
```

**Example 2:**
```text
Input: str = "a+b*(c^d-e)^(f+g*h)-i"
Output: -+a*b^-^cde+f*ghi
```

**Example 3: (Edge Case - simple grouping)**
```text
Input: str = "(A+B)*C"
Output: *+ABC
```

---

### Intuition

Converting infix to prefix is very similar to converting infix to postfix! We can cleverly reuse the same logic with a simple trick:
1. **Reverse** the given infix string (also swap `(` with `)` and vice versa).
2. Compute the **postfix** expression for this reversed string.
3. **Reverse** the resulting postfix expression. The result is perfectly formatted prefix!
*Note on step 2:* Because we reversed the string, the associativity of operators like `^` is flipped, so we adjust our strictly greater/less precedence checks slightly.

---

### Code

```cpp
class Solution {
private:
    int precedence(char c) {
        if (c == '^') return 3;
        else if (c == '*' || c == '/') return 2;
        else if (c == '+' || c == '-') return 1;
        return -1;
    }

public:
    string infixToPrefix(string s) {
        // Step 1: Reverse the infix expression and swap brackets
        reverse(s.begin(), s.end());
        for (int i = 0; i < s.length(); i++) {
            if (s[i] == '(') s[i] = ')';
            else if (s[i] == ')') s[i] = '(';
        }
        
        stack<char> st;
        string res = "";
        
        // Step 2: Compute postfix of the modified string
        for (int i = 0; i < s.length(); i++) {
            char c = s[i];
            
            // Operands go directly to result
            if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')) {
                res += c;
            }
            else if (c == '(') {
                st.push('(');
            }
            else if (c == ')') {
                while (!st.empty() && st.top() != '(') {
                    res += st.top();
                    st.pop();
                }
                st.pop();
            }
            else {
                // Notice the strict inequality here for right-associativity since we reversed
                while (!st.empty() && precedence(c) < precedence(st.top())) {
                    res += st.top();
                    st.pop();
                }
                
                // If precedence is equal, we pop if it's left-associative (which is true for ^ originally, but flipped here)
                if (!st.empty() && precedence(c) == precedence(st.top()) && c == '^') {
                    while (!st.empty() && precedence(c) == precedence(st.top())) {
                        res += st.top();
                        st.pop();
                    }
                }
                st.push(c);
            }
        }
        
        while (!st.empty()) {
            res += st.top();
            st.pop();
        }
        
        // Step 3: Reverse the final result
        reverse(res.begin(), res.end());
        return res;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the string length. Reversing strings takes `O(N)`, and the single stack pass takes `O(N)`.
- **Space Complexity:** `O(N)` for the operator stack and the resultant string.
""",

    "prefix-to-infix.md": """---
title: "Prefix to Infix"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Prefix+to+Infix+Conversion"
time: "O(N)"
space: "O(N)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/prefix-to-infix-conversion/1"
---

### Problem Statement

You are given a string `s` representing a prefix expression. Convert it to an infix expression.
- Prefix expression: The operator precedes the operands (e.g., `* A B`).
- Infix expression: The operator is between the operands (e.g., `(A * B)`).

*Note:* Ensure that the resulting infix expression is properly parenthesized to preserve the exact order of operations.

**Example 1:**
```text
Input: s = "*-A/BC-/AKL"
Output: ((A-(B/C))*((A/K)-L))
```

**Example 2:**
```text
Input: s = "*+AB-CD"
Output: ((A+B)*(C-D))
```

**Example 3: (Edge Case - simple operands)**
```text
Input: s = "+AB"
Output: (A+B)
```

---

### Intuition

To evaluate or convert a Prefix expression, we read it **backwards** (from right to left). 
We use a stack of strings. When we see an operand (a letter or number), we push it onto the stack. When we see an operator, we pop the top two operands from the stack, put the operator between them, wrap the whole thing in parentheses, and push the newly formed string back onto the stack!

---

### Code

```cpp
class Solution {
public:
    string preToInfix(string s) {
        stack<string> st;
        
        // Read string from right to left
        for (int i = s.length() - 1; i >= 0; i--) {
            char c = s[i];
            
            // If operand, push as string to stack
            if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')) {
                st.push(string(1, c));
            } 
            // If operator, pop two elements, combine and push back
            else {
                // Top element is operand1 (since we read right-to-left)
                string op1 = st.top(); st.pop();
                // Next element is operand2
                string op2 = st.top(); st.pop();
                
                // Form the new sub-expression
                string temp = "(" + op1 + c + op2 + ")";
                
                // Push it back to stack
                st.push(temp);
            }
        }
        
        // The final element in the stack is our complete infix expression
        return st.top();
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the length of the string. We process each character once. String concatenations can theoretically take more time, but for typical expression lengths, it's considered linear.
- **Space Complexity:** `O(N)` for the stack of strings.
""",

    "prefix-to-postfix.md": """---
title: "Prefix to Postfix"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Prefix+to+Postfix+Conversion"
time: "O(N)"
space: "O(N)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/prefix-to-postfix-conversion/1"
---

### Problem Statement

You are given a string `s` representing a prefix expression. Convert it to a postfix expression.
- Prefix expression: The operator precedes the operands (e.g., `* A B`).
- Postfix expression: The operator follows the operands (e.g., `A B *`).

**Example 1:**
```text
Input: s = "*-A/BC-/AKL"
Output: ABC/-AK/L-*
```

**Example 2:**
```text
Input: s = "*+AB-CD"
Output: AB+CD-*
```

**Example 3: (Edge Case - one operator)**
```text
Input: s = "/XY"
Output: XY/
```

---

### Intuition

Just like converting Prefix to Infix, we read the Prefix expression **backwards** (from right to left). 
We use a stack of strings. When we see an operand, we push it onto the stack. When we see an operator, we pop the top two operands from the stack, append the operator at the end of them (`operand1 + operand2 + operator`), and push the new combined string back onto the stack!

---

### Code

```cpp
class Solution {
public:
    string preToPost(string s) {
        stack<string> st;
        
        // Traverse the prefix expression from right to left
        for (int i = s.length() - 1; i >= 0; i--) {
            char c = s[i];
            
            // If character is an operand, push to stack
            if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')) {
                st.push(string(1, c));
            } 
            // If operator, pop two operands and format as postfix
            else {
                string op1 = st.top(); st.pop();
                string op2 = st.top(); st.pop();
                
                // Postfix format: Operand1 + Operand2 + Operator
                string temp = op1 + op2 + c;
                
                // Push the combined string back
                st.push(temp);
            }
        }
        
        // Final element is the complete postfix expression
        return st.top();
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the length of the string. We loop through the string exactly once from right to left.
- **Space Complexity:** `O(N)` to store the strings in the stack during processing.
""",

    "postfix-to-infix.md": """---
title: "Postfix to Infix"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Postfix+to+Infix+Conversion"
time: "O(N)"
space: "O(N)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/postfix-to-infix-conversion/1"
---

### Problem Statement

You are given a string `s` representing a postfix expression. Convert it to an infix expression.
- Postfix expression: The operator follows the operands (e.g., `A B *`).
- Infix expression: The operator is between the operands (e.g., `(A * B)`).

*Note:* Ensure that the resulting infix expression is properly parenthesized to preserve the exact order of operations.

**Example 1:**
```text
Input: s = "ab*c+"
Output: ((a*b)+c)
```

**Example 2:**
```text
Input: s = "ABC/-AK/L-*"
Output: ((A-(B/C))*((A/K)-L))
```

**Example 3: (Edge Case - simple operands)**
```text
Input: s = "ab+"
Output: (a+b)
```

---

### Intuition

To evaluate or convert a Postfix expression, we read it **forwards** (from left to right). 
We use a stack of strings. When we see an operand, we push it onto the stack. When we see an operator, we pop the top two operands from the stack (the first one popped is `operand2`, the second is `operand1`), put the operator between them, wrap the whole thing in parentheses, and push the newly formed string back onto the stack!

---

### Code

```cpp
class Solution {
public:
    string postToInfix(string s) {
        stack<string> st;
        
        // Read string from left to right for postfix
        for (int i = 0; i < s.length(); i++) {
            char c = s[i];
            
            // If operand, push as string to stack
            if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')) {
                st.push(string(1, c));
            } 
            // If operator, pop two elements, combine and push back
            else {
                // Top element is operand2 (since we read left-to-right)
                string op2 = st.top(); st.pop();
                // Next element is operand1
                string op1 = st.top(); st.pop();
                
                // Form the new sub-expression (Infix format)
                string temp = "(" + op1 + c + op2 + ")";
                
                // Push it back to stack
                st.push(temp);
            }
        }
        
        // The final element in the stack is our complete infix expression
        return st.top();
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the length of the string. We iterate linearly left-to-right.
- **Space Complexity:** `O(N)` for the string stack.
""",

    "postfix-to-prefix.md": """---
title: "Postfix to Prefix"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Postfix+to+Prefix+Conversion"
time: "O(N)"
space: "O(N)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/postfix-to-prefix-conversion/1"
---

### Problem Statement

You are given a string `s` representing a postfix expression. Convert it to a prefix expression.
- Postfix expression: The operator follows the operands (e.g., `A B *`).
- Prefix expression: The operator precedes the operands (e.g., `* A B`).

**Example 1:**
```text
Input: s = "ABC/-AK/L-*"
Output: *-A/BC-/AKL
```

**Example 2:**
```text
Input: s = "ab+c*"
Output: *+abc
```

**Example 3: (Edge Case - simple operands)**
```text
Input: s = "ab+"
Output: +ab
```

---

### Intuition

For Postfix expressions, we read them **forwards** (from left to right). 
We use a stack of strings. When we see an operand, we push it onto the stack. When we see an operator, we pop the top two operands from the stack (first popped is `operand2`, second is `operand1`), prefix them with the operator (`operator + operand1 + operand2`), and push the new combined string back onto the stack!

---

### Code

```cpp
class Solution {
public:
    string postToPre(string s) {
        stack<string> st;
        
        // Traverse the postfix expression from left to right
        for (int i = 0; i < s.length(); i++) {
            char c = s[i];
            
            // If character is an operand, push to stack
            if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')) {
                st.push(string(1, c));
            } 
            // If operator, pop two operands and format as prefix
            else {
                // Because we read left-to-right, the top is operand2
                string op2 = st.top(); st.pop();
                string op1 = st.top(); st.pop();
                
                // Prefix format: Operator + Operand1 + Operand2
                string temp = c + op1 + op2;
                
                // Push the combined string back
                st.push(temp);
            }
        }
        
        // Final element is the complete prefix expression
        return st.top();
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the length of the string. Processed completely in one pass.
- **Space Complexity:** `O(N)` for the stack.
"""
}

base_dir = r"d:\shiva\dsa\src\content\stack-queue"
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file in content_map:
            filepath = os.path.join(root, file)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content_map[file])
            print(f"Updated {file}")
