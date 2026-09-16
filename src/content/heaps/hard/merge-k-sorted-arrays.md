---
title: "Merge K Sorted Arrays"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Merge+K+Sorted+Arrays"
time: "O(N * K * log K)"
space: "O(K)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/merge-k-sorted-arrays/1"
---

### Problem Statement

Given `K` sorted arrays arranged in the form of a matrix of size `K×K`. The task is to merge them into one sorted array.

**Example 1:**
```text
Input:
K = 3
arr[][] = {{1,2,3},{4,5,6},{7,8,9}}
Output: 1 2 3 4 5 6 7 8 9
Explanation:Above test case has 3 sorted
arrays of size 3, 3, 3
arr[][] = [[1, 2, 3],[4, 5, 6], 
[7, 8, 9]]
The merged list will be 
[1, 2, 3, 4, 5, 6, 7, 8, 9].
```


**Example 2:**
```text
Input: K = 2, arr[][] = {{1, 2}, {3, 4}}
Output: 1 2 3 4
```

**Example 3: (Edge Case - Arrays with duplicates)**
```text
Input: K = 2, arr[][] = {{1, 1}, {1, 1}}
Output: 1 1 1 1
```

---

### Code

```cpp
class Solution {
public:
    // Structure to represent an element with its value, array index, and position in array
    struct Node {
        int val, arrIdx, valIdx;
        Node(int v, int a, int i) : val(v), arrIdx(a), valIdx(i) {}
    };
    
    // Custom comparator for the min-heap
    struct Compare {
        bool operator()(Node const& a, Node const& b) {
            return a.val > b.val;
        }
    };
    
    vector<int> mergeKArrays(vector<vector<int>> arr, int K) {
        vector<int> result;
        priority_queue<Node, vector<Node>, Compare> minHeap;
        
        // Push the first element of each array into the min-heap
        for(int i = 0; i < K; i++) {
            minHeap.push(Node(arr[i][0], i, 0));
        }
        
        while(!minHeap.empty()) {
            Node curr = minHeap.top();
            minHeap.pop();
            
            result.push_back(curr.val);
            
            // If the array of the popped element has more elements, push the next one
            if(curr.valIdx + 1 < arr[curr.arrIdx].size()) {
                minHeap.push(Node(arr[curr.arrIdx][curr.valIdx + 1], curr.arrIdx, curr.valIdx + 1));
            }
        }
        
        return result;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N * K * log K)` where `N * K` is the total number of elements. The heap always contains `K` elements, so each insertion/extraction takes `O(log K)`.
- **Space Complexity:** `O(K)` for the priority queue plus `O(N * K)` for the result array.
