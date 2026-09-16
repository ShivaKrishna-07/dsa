---
title: "Lemonade Change"
difficulty: "Easy"
youtube: "https://www.youtube.com/results?search_query=Lemonade+Change+leetcode+860"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/lemonade-change/"
---

### Problem Statement

At a lemonade stand, each lemonade costs `$5`. Customers are standing in a queue to buy from you and order one at a time (in the order specified by bills). Each customer will only buy one lemonade and pay with either a `$5`, `$10`, or `$20` bill. You must provide the correct change to each customer so that the net transaction is that the customer pays `$5`.

Note that you don't have any change in hand at first.

Given an integer array `bills` where `bills[i]` is the bill the `ith` customer pays, return `true` if you can provide every customer with correct change, or `false` otherwise.

**Example 1:**
```text
Input: bills = [5,5,5,10,20]
Output: true
Explanation: 
From the first 3 customers, we collect three $5 bills in order.
From the fourth customer, we collect a $10 bill and give back a $5.
From the fifth customer, we give a $10 bill and a $5 bill.
Since all customers got correct change, we output true.
```


**Example 2:**
```text
Input: bills = [5,5,10,10,20]
Output: false
Explanation: We collect two $5 bills, then give one back for the first $10. For the second $10, we give our last $5. For the $20, we have no $5 left to make change.
```

**Example 3: (Edge Case - No $5 at start)**
```text
Input: bills = [10, 10]
Output: false
Explanation: First customer pays $10, we have no $5 to return.
```

---

### Code

```cpp
class Solution {
public:
    bool lemonadeChange(vector<int>& bills) {
        int five = 0, ten = 0;
        
        for(int bill : bills) {
            if(bill == 5) {
                five++;
            } else if(bill == 10) {
                if(five == 0) return false;
                five--;
                ten++;
            } else { // bill == 20
                if(ten > 0 && five > 0) {
                    ten--;
                    five--;
                } else if(five >= 3) {
                    five -= 3;
                } else {
                    return false;
                }
            }
        }
        
        return true;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the length of the bills array, as we iterate through it once.
- **Space Complexity:** `O(1)` as we only use two integer variables (`five` and `ten`) to keep track of our available change.
