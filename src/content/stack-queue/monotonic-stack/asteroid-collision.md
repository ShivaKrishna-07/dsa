---
title: "Asteroid Collision"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Asteroid+Collision+leetcode+735"
time: "O(N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/asteroid-collision/"
---

### Problem Statement

We are given an array `asteroids` of integers representing asteroids in a row.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

**Example 1:**
```text
Input: asteroids = [5,10,-5]
Output: [5,10]
Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.
```

**Example 2:**
```text
Input: asteroids = [8,-8]
Output: []
Explanation: The 8 and -8 collide exploding each other.
```

**Example 3: (Edge Case - Left moving asteroids first)**
```text
Input: asteroids = [-2,-1,1,2]
Output: [-2,-1,1,2]
Explanation: The negative asteroids move left and positive move right. They never meet.
```

---

### Intuition

A collision only happens when a Right-moving asteroid (positive) is followed by a Left-moving asteroid (negative). This screams Stack! 
We iterate through the asteroids and push them to the stack. If we encounter a left-moving asteroid (`< 0`) and the top of the stack is a right-moving asteroid (`> 0`), a collision occurs. We loop and pop from the stack as long as the stack's top is smaller. If they are equal, we pop once and both are destroyed.

---

### Code

```cpp
class Solution {
public:
    vector<int> asteroidCollision(vector<int>& asteroids) {
        vector<int> st; // We can use a vector to simulate a stack for easier return
        
        for (int a : asteroids) {
            bool destroyed = false;
            
            // Collision happens ONLY when stack top is positive (Right) and current is negative (Left)
            while (!st.empty() && st.back() > 0 && a < 0) {
                // If top is smaller, it gets destroyed. We continue checking.
                if (st.back() < abs(a)) {
                    st.pop_back();
                    continue;
                }
                // If they are equal, both are destroyed.
                else if (st.back() == abs(a)) {
                    st.pop_back();
                }
                
                // If top is larger, current asteroid is destroyed.
                destroyed = true;
                break;
            }
            
            // If the current asteroid survived, push it
            if (!destroyed) {
                st.push_back(a);
            }
        }
        
        return st;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the number of asteroids. Each asteroid is pushed to and popped from the stack at most once.
- **Space Complexity:** `O(N)` for the stack holding the surviving asteroids.
