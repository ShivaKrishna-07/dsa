---
title: "Asteroid Collision"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
tags: ["Stack", "Simulation"]
---

### Problem Statement

Simulate collisions between asteroids moving in opposite directions and return the survivors.

### Examples

- **Input:** `[5, 10, -5]` **Output:** `[5, 10]`
- **Input:** `[8, -8]` **Output:** `[]`
- **Input:** `[10, 2, -5]` **Output:** `[10]`

### Constraints

- `2 <= asteroids.length <= 10^4`
- `-1000 <= asteroids[i] <= 1000`
- No two asteroids occupy the same position.

### Intuition

Only a positive asteroid followed by a negative asteroid can collide. Resolve that pair against the stack top before pushing the current asteroid.

### Code

```cpp
vector<int> asteroidCollision(vector<int>& asteroids) {
    vector<int> st;
    for (int asteroid : asteroids) {
        bool alive = true;
        while (alive && asteroid < 0 && !st.empty() && st.back() > 0) {
            if (st.back() < -asteroid) st.pop_back();
            else { alive = st.back() == -asteroid; st.pop_back(); }
        }
        if (alive) st.push_back(asteroid);
    }
    return st;
}
```

### Complexity Analysis

- **Time Complexity:** `O(N)` amortized because each asteroid is pushed and removed at most once.
- **Space Complexity:** `O(N)` for surviving asteroids.
