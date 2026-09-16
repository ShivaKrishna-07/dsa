---
title: "Fractional Knapsack"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Fractional+Knapsack+greedy+algorithm"
time: "O(N log N)"
space: "O(1)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1"
---

### Problem Statement

Given weights and values of `N` items, we need to put these items in a knapsack of capacity `W` to get the maximum total value in the knapsack.
Unlike 0/1 knapsack, you are allowed to break the item. 

**Example 1:**
```text
Input:
N = 3, W = 50
values[] = {60,100,120}
weight[] = {10,20,30}
Output:
240.00
Explanation:Total maximum value of item we can have is 240.00 from the given capacity of sack. 
```


**Example 2:**
```text
Input: N = 2, W = 50
values[] = {60, 100}
weight[] = {10, 20}
Output: 160.00
Explanation: We can take both items fully since 10+20 <= 50.
```

**Example 3: (Edge Case - Zero capacity)**
```text
Input: N = 3, W = 0
values[] = {60, 100, 120}
weight[] = {10, 20, 30}
Output: 0.00
Explanation: The knapsack has 0 capacity, so no items can be taken.
```

---

### Code

```cpp
struct Item{
    int value;
    int weight;
};

class Solution {
    static bool comp(Item a, Item b) {
        double r1 = (double)a.value / (double)a.weight;
        double r2 = (double)b.value / (double)b.weight;
        return r1 > r2;
    }
    
public:
    double fractionalKnapsack(int W, Item arr[], int n) {
        sort(arr, arr + n, comp);
        
        int currentWeight = 0;
        double finalValue = 0.0;
        
        for (int i = 0; i < n; i++) {
            if (currentWeight + arr[i].weight <= W) {
                currentWeight += arr[i].weight;
                finalValue += arr[i].value;
            } else {
                int remain = W - currentWeight;
                finalValue += (arr[i].value / (double)arr[i].weight) * (double)remain;
                break;
            }
        }
        
        return finalValue;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N log N)` because of the sorting based on value/weight ratio.
- **Space Complexity:** `O(1)` as we are using variables for calculation without any extra data structures.
