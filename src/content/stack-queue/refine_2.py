import os
import re

content_map = {
    "implement-stack-using-linked-list.md": """---
title: "Implement Stack using Linked List"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Implement+Stack+using+Linked+List"
time: "O(1)"
space: "O(N)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/implement-stack-using-linked-list/1"
---

### Problem Statement

Design a stack that supports push, pop, top, and empty operations using a linked list. 
- `push(x)`: Pushes element `x` onto the top of the stack.
- `pop()`: Removes the element on the top of the stack and returns it.

**Example 1:**
```text
Input:
push(2), push(3), pop(), push(4), pop()
Output:
3, 4
Explanation:
push(2) -> stack is 2
push(3) -> stack is 3 -> 2
pop()   -> returns 3, stack becomes 2
push(4) -> stack is 4 -> 2
pop()   -> returns 4
```

**Example 2:**
```text
Input:
pop() on an empty stack
Output:
-1
```

**Example 3: (Edge Case - Pushing many items)**
```text
Input: push(1), push(2), push(3), pop(), pop(), pop()
Output: 3, 2, 1
```

---

### Intuition

Unlike an array-based stack which can overflow, a linked list stack can grow dynamically. To achieve `O(1)` time complexity for all operations, we must insert and remove nodes at the **head** of the linked list. The head of the linked list essentially acts as the top of the stack.

---

### Code

```cpp
/*
struct StackNode {
    int data;
    StackNode *next;
    StackNode(int a) {
        data = a;
        next = NULL;
    }
};
*/

class MyStack {
private:
    StackNode *top;
    
public:
    MyStack() { top = NULL; }
    
    // Function to push an integer into the stack.
    void push(int x) {
        // Create new node and link it before the current top
        StackNode* newNode = new StackNode(x);
        newNode->next = top;
        top = newNode;
    }
    
    // Function to remove an item from top of the stack.
    int pop() {
        // Return -1 if stack is empty
        if (top == NULL) return -1;
        
        // Save data and delete the top node
        int poppedData = top->data;
        StackNode* temp = top;
        top = top->next;
        delete temp;
        
        return poppedData;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(1)` for both push and pop because we only manipulate the head pointer.
- **Space Complexity:** `O(N)` since we dynamically allocate memory for each inserted element.
""",

    "implement-queue-using-linked-list.md": """---
title: "Implement Queue using Linked List"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Implement+Queue+using+Linked+List"
time: "O(1)"
space: "O(N)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/implement-queue-using-linked-list/1"
---

### Problem Statement

Design a queue that supports push and pop operations using a linked list.
- `push(x)`: Adds an element `x` to the rear of the queue.
- `pop()`: Removes the element from the front of the queue and returns it.

**Example 1:**
```text
Input:
push(2), push(3), pop(), push(4), pop()
Output:
2, 3
Explanation:
push(2) -> queue is 2
push(3) -> queue is 2 -> 3
pop()   -> returns 2, queue becomes 3
push(4) -> queue is 3 -> 4
pop()   -> returns 3
```

**Example 2:**
```text
Input:
pop() on an empty queue
Output:
-1
```

**Example 3: (Edge Case - Alternating push and pop)**
```text
Input: push(10), pop(), push(20), pop()
Output: 10, 20
```

---

### Intuition

To maintain `O(1)` time complexity for both push and pop operations in a Queue (First-In-First-Out), we need to maintain two pointers: `front` and `rear`. 
We insert new nodes at the `rear` and remove nodes from the `front`. This avoids the need to traverse the entire linked list for every operation.

---

### Code

```cpp
/* Structure of a node in Queue
struct QueueNode {
    int data;
    QueueNode *next;
    QueueNode(int a) {
        data = a;
        next = NULL;
    }
};
*/

class MyQueue {
private:
    QueueNode *front;
    QueueNode *rear;
    
public:
    MyQueue() { front = rear = NULL; }
    
    // Function to push an element into the queue.
    void push(int x) {
        QueueNode* newNode = new QueueNode(x);
        
        // If queue is empty, new node is both front and rear
        if (front == NULL) {
            front = rear = newNode;
            return;
        }
        
        // Otherwise, add to the end and update rear
        rear->next = newNode;
        rear = newNode;
    }
    
    // Function to pop front element from the queue.
    int pop() {
        // Return -1 if queue is empty
        if (front == NULL) return -1;
        
        // Retrieve data and delete front node
        int poppedData = front->data;
        QueueNode* temp = front;
        front = front->next;
        
        // If queue becomes empty, update rear to NULL too
        if (front == NULL) {
            rear = NULL;
        }
        
        delete temp;
        return poppedData;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(1)` for both push and pop. We directly access `rear` for insertions and `front` for deletions.
- **Space Complexity:** `O(N)` because we dynamically create a node for every pushed element.
""",

    "balanced-parentheses.md": """---
title: "Balanced Parentheses"
difficulty: "Easy"
youtube: "https://www.youtube.com/results?search_query=Valid+Parentheses+leetcode+20"
time: "O(N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/valid-parentheses/"
  gfg: "https://practice.geeksforgeeks.org/problems/parenthesis-checker2744/1"
---

### Problem Statement

Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

**Example 1:**
```text
Input: s = "()[]{}"
Output: true
```

**Example 2:**
```text
Input: s = "(]"
Output: false
```

**Example 3: (Edge Case - Only open brackets)**
```text
Input: s = "((("
Output: false
Explanation: The brackets are never closed.
```

---

### Intuition

Since brackets must be closed in the reverse order they were opened (Last-In-First-Out), a Stack is the ideal data structure. As we iterate through the string, we push any opening brackets onto the stack. When we encounter a closing bracket, we check if the stack is empty (meaning no matching open bracket exists) or if the top of the stack matches the closing bracket. If everything matches perfectly and the stack ends up empty, the string is valid.

---

### Code

```cpp
class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        
        for (char ch : s) {
            // Push opening brackets onto the stack
            if (ch == '(' || ch == '{' || ch == '[') {
                st.push(ch);
            } 
            // Handle closing brackets
            else {
                // If stack is empty, there is no matching opening bracket
                if (st.empty()) return false;
                
                char top = st.top();
                // Check if the top matches the corresponding closing bracket
                if ((ch == ')' && top == '(') ||
                    (ch == '}' && top == '{') ||
                    (ch == ']' && top == '[')) {
                    st.pop();
                } else {
                    return false; // Mismatch found
                }
            }
        }
        
        // If stack is empty, all brackets were matched
        return st.empty();
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the length of the string. We iterate through the string exactly once.
- **Space Complexity:** `O(N)` in the worst case (e.g., all opening brackets) as we store characters in the stack.
""",

    "reverse-a-stack.md": """---
title: "Reverse a Stack"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Reverse+a+Stack+using+recursion"
time: "O(N^2)"
space: "O(N)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/reverse-a-stack/1"
---

### Problem Statement

You are given a stack `St`. You have to reverse the stack using recursion. 
You are not allowed to use any extra space like arrays or linked lists, although the recursive call stack is allowed.

**Example 1:**
```text
Input:
St = {3,2,1,7,6}
Output:
{6,7,1,2,3}
Explanation:
Input stack from top to bottom is 6, 7, 1, 2, 3. 
When reversed it becomes 3, 2, 1, 7, 6.
```

**Example 2:**
```text
Input:
St = {4,3,9,6}
Output:
{6,9,3,4}
```

**Example 3: (Edge Case - Single element)**
```text
Input: St = {1}
Output: {1}
```

---

### Intuition

To reverse a stack using recursion without extra data structures, we need two recursive functions. The first function `Reverse` pops elements and stores them in the call stack until the original stack is empty. The second function `insertAtBottom` is then called for each popped element as the recursion unwinds, which strategically pushes the element all the way down to the bottom of the stack!

---

### Code

```cpp
class Solution {
private:
    // Helper function to insert an element at the bottom of the stack
    void insertAtBottom(stack<int>& st, int element) {
        // Base case: if stack is empty, we found the bottom!
        if (st.empty()) {
            st.push(element);
            return;
        }
        
        // Pop the top element and hold it in the call stack
        int topElement = st.top();
        st.pop();
        
        // Recursively go deeper
        insertAtBottom(st, element);
        
        // Put the top element back after the target element was inserted at bottom
        st.push(topElement);
    }

public:
    void Reverse(stack<int>& st) {
        // Base case: if stack is empty, nothing to reverse
        if (st.empty()) {
            return;
        }
        
        // Pop the top element
        int topElement = st.top();
        st.pop();
        
        // Recursively reverse the remaining stack
        Reverse(st);
        
        // Insert the popped element at the bottom of the reversed stack
        insertAtBottom(st, topElement);
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N^2)`. The `Reverse` function is called `N` times. During each call, `insertAtBottom` takes `O(N)` time to traverse down to the bottom of the stack.
- **Space Complexity:** `O(N)` due to the recursive call stack for both `Reverse` and `insertAtBottom`.
""",

    "infix-to-postfix.md": """---
title: "Infix to Postfix"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Infix+to+Postfix+Conversion"
time: "O(N)"
space: "O(N)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/infix-to-postfix-1587115620/1"
---

### Problem Statement

Given an infix expression in the form of string `str`. Convert this infix expression to postfix expression.
- Infix expression: The operator is in between the operands (e.g., `A + B`).
- Postfix expression: The operator follows the operands (e.g., `A B +`).

The expression contains:
- Lowercase and uppercase English letters (operands).
- Operators: `+`, `-`, `*`, `/`, `^`.
- Parentheses: `(` and `)`.

**Example 1:**
```text
Input: str = "a+b*(c^d-e)^(f+g*h)-i"
Output: abcd^e-fgh*+^*+i-
```

**Example 2:**
```text
Input: str = "A*(B+C)/D"
Output: ABC+*D/
```

**Example 3: (Edge Case - Simple expression)**
```text
Input: str = "a+b"
Output: ab+
```

---

### Intuition

We use a Stack to keep track of operators and their precedence. As we read the infix expression from left to right:
1. Operands are immediately appended to our answer.
2. Opening parentheses `(` are pushed to the stack.
3. Closing parentheses `)` pop everything until an opening parenthesis `(` is found.
4. For operators, we must pop and output any operators on the stack that have strictly greater or equal precedence before pushing the current operator. This guarantees correct order of operations!

---

### Code

```cpp
class Solution {
private:
    // Helper function to define operator precedence
    int precedence(char c) {
        if (c == '^') return 3;
        else if (c == '*' || c == '/') return 2;
        else if (c == '+' || c == '-') return 1;
        return -1;
    }

public:
    string infixToPostfix(string s) {
        stack<char> st;
        string res = "";
        
        for (int i = 0; i < s.length(); i++) {
            char c = s[i];
            
            // If operand, add directly to result
            if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')) {
                res += c;
            }
            // If left parenthesis, push to stack
            else if (c == '(') {
                st.push('(');
            }
            // If right parenthesis, pop until left parenthesis
            else if (c == ')') {
                while (!st.empty() && st.top() != '(') {
                    res += st.top();
                    st.pop();
                }
                st.pop(); // Remove the '('
            }
            // If an operator is encountered
            else {
                // Pop operators with higher or equal precedence
                while (!st.empty() && precedence(c) <= precedence(st.top())) {
                    // Note: '^' is right-associative
                    if (c == '^' && st.top() == '^') break;
                    
                    res += st.top();
                    st.pop();
                }
                st.push(c);
            }
        }
        
        // Pop all remaining operators from the stack
        while (!st.empty()) {
            res += st.top();
            st.pop();
        }
        
        return res;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the length of the string. Each character is pushed and popped from the stack at most once.
- **Space Complexity:** `O(N)` for the stack to hold the operators.
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
