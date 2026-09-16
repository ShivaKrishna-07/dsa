import os
import re

updates = {
    # Greedy - Easy
    "assign-cookies.md": """
**Example 2:**
```text
Input: g = [1,2], s = [1,2,3]
Output: 2
Explanation: You have 2 children and 3 cookies. The greed factors of 2 children are 1, 2. 
You can make both children content.
```

**Example 3: (Edge Case - No cookies large enough)**
```text
Input: g = [5,6,7], s = [1,2,3]
Output: 0
Explanation: No child can be content as all cookies are too small.
```
""",
    "fractional-knapsack.md": """
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
""",
    "minimum-number-of-coins.md": """
**Example 2:**
```text
Input: N = 1000
Output: 500 500
Explanation: Two 500 notes make 1000.
```

**Example 3: (Edge Case - Exactly one coin)**
```text
Input: N = 10
Output: 10
Explanation: Just one 10 coin is needed.
```
""",
    "lemonade-change.md": """
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
""",
    "valid-parenthesis-checker.md": """
**Example 2:**
```text
Input: s = "(*))"
Output: true
Explanation: The '*' can be treated as a '(' to make it valid.
```

**Example 3: (Edge Case - All stars)**
```text
Input: s = "***"
Output: true
Explanation: All stars can be empty strings.
```
""",
    # Greedy - Medium
    "n-meetings-in-one-room.md": """
**Example 2:**
```text
Input: N = 3
start[] = {10, 12, 20}
end[] = {20, 25, 30}
Output: 1
Explanation: No two meetings can be accommodated.
```

**Example 3: (Edge Case - Contiguous meetings)**
```text
Input: N = 2
start[] = {1, 2}
end[] = {2, 3}
Output: 1
Explanation: A meeting starting at the exact time another ends is generally not overlapping, but according to GFG constraints, start time cannot equal end time of chosen meeting, so only 1.
```
""",
    "minimum-platforms.md": """
**Example 2:**
```text
Input: n = 3
arr[] = {0900, 1100, 1235}
dep[] = {1000, 1200, 1240}
Output: 1
Explanation: No trains overlap.
```

**Example 3: (Edge Case - All overlap)**
```text
Input: n = 3
arr[] = {1000, 1000, 1000}
dep[] = {1100, 1100, 1100}
Output: 3
Explanation: All trains arrive at the same time and depart at the same time.
```
""",
    "shortest-job-first.md": """
**Example 2:**
```text
Input: n = 4, bt = [1, 2, 3, 4]
Output: 2
Explanation: Wait times are 0, 1, 3, 6. Average = 10 / 4 = 2.
```

**Example 3: (Edge Case - Single Job)**
```text
Input: n = 1, bt = [10]
Output: 0
Explanation: Only one job, so it doesn't wait.
```
""",
    "page-faults-in-lru.md": """
**Example 2:**
```text
Input: N = 4, C = 2
pages = {1, 2, 1, 3}
Output: 3
Explanation: Faults for 1, 2, and 3. The second 1 is in memory.
```

**Example 3: (Edge Case - Infinite capacity)**
```text
Input: N = 5, C = 10
pages = {1, 2, 3, 4, 5}
Output: 5
Explanation: Every unique page causes a fault exactly once.
```
""",
    "insert-interval.md": """
**Example 2:**
```text
Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
```

**Example 3: (Edge Case - Empty intervals)**
```text
Input: intervals = [], newInterval = [5,7]
Output: [[5,7]]
Explanation: The original list is empty, just insert the new interval.
```
""",
    "merge-intervals.md": """
**Example 2:**
```text
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
```

**Example 3: (Edge Case - Single interval)**
```text
Input: intervals = [[1,5]]
Output: [[1,5]]
Explanation: Only one interval provided, nothing to merge.
```
""",
    # Greedy - Hard
    "jump-game.md": """
**Example 2:**
```text
Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0.
```

**Example 3: (Edge Case - Single element)**
```text
Input: nums = [0]
Output: true
Explanation: You are already at the last index.
```
""",
    "jump-game-ii.md": """
**Example 2:**
```text
Input: nums = [2,3,0,1,4]
Output: 2
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
```

**Example 3: (Edge Case - Zero jumps needed)**
```text
Input: nums = [0]
Output: 0
Explanation: You are already at the last index, 0 jumps needed.
```
""",
    "job-sequencing-problem.md": """
**Example 2:**
```text
Input: N = 5, Jobs = {(1,2,100),(2,1,19),(3,2,27),(4,1,25),(5,1,15)}
Output: 2 127
Explanation: Job 1 and Job 4 can be completed for max profit.
```

**Example 3: (Edge Case - Identical deadlines)**
```text
Input: N = 3, Jobs = {(1,1,50),(2,1,10),(3,1,20)}
Output: 1 50
Explanation: All jobs have deadline 1, only the one with max profit can be chosen.
```
""",
    "candy.md": """
**Example 2:**
```text
Input: ratings = [1,2,2]
Output: 4
Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
```

**Example 3: (Edge Case - All same ratings)**
```text
Input: ratings = [2,2,2,2]
Output: 4
Explanation: All children have the same rating, so each gets exactly 1 candy.
```
""",
    # Heaps - Learning
    "min-heap-implementation.md": """
**Example 2:**
```text
Input: Insert 5, Insert 3, Insert 8, extractMin()
Output: 3
```

**Example 3: (Edge Case - Extract from empty)**
```text
Input: extractMin()
Output: -1
```
""",
    "extract-min.md": """
**Example 2:**
```text
Input: [2, 5, 8, 10, 15]
Output: 2
Heap after extraction: [5, 10, 8, 15]
```

**Example 3: (Edge Case - Single element heap)**
```text
Input: [42]
Output: 42
Heap after extraction: []
```
""",
    "check-min-heap.md": """
**Example 2:**
```text
Input: arr = [9, 15, 10, 7, 12, 11]
Output: false
Explanation: 9 is parent of 15 and 10, valid. But 15 is parent of 7, which is invalid since 15 > 7.
```

**Example 3: (Edge Case - Single element)**
```text
Input: arr = [5]
Output: true
Explanation: A single element array is always a valid min-heap.
```
""",
    "convert-min-to-max-heap.md": """
**Example 2:**
```text
Input: arr = [1, 2, 3, 4, 5]
Output: [5, 4, 3, 1, 2]
```

**Example 3: (Edge Case - Already valid for both / single element)**
```text
Input: arr = [7]
Output: [7]
```
""",
    # Heaps - Medium
    "kth-largest-element.md": """
**Example 2:**
```text
Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
```

**Example 3: (Edge Case - K equals array length)**
```text
Input: nums = [10, 9, 8], k = 3
Output: 8
Explanation: The 3rd largest element is the smallest element.
```
""",
    "kth-smallest-element.md": """
**Example 2:**
```text
Input: N = 5, arr[] = {1, 2, 3, 4, 5}, K = 1
Output: 1
```

**Example 3: (Edge Case - K is max length)**
```text
Input: N = 4, arr[] = {10, 5, 4, 3}, K = 4
Output: 10
```
""",
    "replace-elements-by-rank.md": """
**Example 2:**
```text
Input: arr = [100,100,100]
Output: [1,1,1]
Explanation: Same elements share the same rank.
```

**Example 3: (Edge Case - Empty array)**
```text
Input: arr = []
Output: []
```
""",
    "task-scheduler.md": """
**Example 2:**
```text
Input: tasks = ["A","A","A","B","B","B"], n = 0
Output: 6
Explanation: With no cooldown, tasks can run back to back: A -> B -> A -> B -> A -> B.
```

**Example 3: (Edge Case - High cooldown, one task dominating)**
```text
Input: tasks = ["A","A","A"], n = 2
Output: 7
Explanation: A -> idle -> idle -> A -> idle -> idle -> A.
```
""",
    "hand-of-straights.md": """
**Example 2:**
```text
Input: hand = [1,2,3,4,5], groupSize = 4
Output: false
Explanation: Alice's hand cannot be rearranged into groups of 4.
```

**Example 3: (Edge Case - Group size 1)**
```text
Input: hand = [1,5,3], groupSize = 1
Output: true
Explanation: Any hand can be grouped if the group size is 1.
```
""",
    # Heaps - Hard
    "merge-k-sorted-arrays.md": """
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
""",
    "merge-k-sorted-lists.md": """
**Example 2:**
```text
Input: lists = []
Output: []
```

**Example 3: (Edge Case - Lists containing empty lists)**
```text
Input: lists = [[]]
Output: []
```
""",
    "design-twitter.md": """
**Example 2:**
```text
Input: 
["Twitter", "postTweet", "getNewsFeed"]
[[], [1, 5], [1]]
Output: 
[null, null, [5]]
Explanation: User 1 posts tweet 5 and gets it in feed.
```

**Example 3: (Edge Case - Feed limit)**
```text
Input:
(Assuming user posts 12 tweets sequentially)
Output:
Only the 10 most recent tweets are returned in the news feed.
```
""",
    "kth-largest-element-in-a-stream.md": """
**Example 2:**
```text
Input: KthLargest(1, []), add(3), add(5)
Output: 3, 5
```

**Example 3: (Edge Case - Duplicates in stream)**
```text
Input: KthLargest(2, [1, 1]), add(1)
Output: 1
Explanation: With stream [1, 1, 1], the 2nd largest is 1.
```
""",
    "maximum-sum-combinations.md": """
**Example 2:**
```text
Input: N = 4, K = 3, A = [1, 4, 2, 3], B = [2, 5, 1, 6]
Output: 10, 9, 9
Explanation: 4+6=10, 3+6=9, 4+5=9.
```

**Example 3: (Edge Case - Same elements)**
```text
Input: N = 2, K = 2, A = [1, 1], B = [1, 1]
Output: 2, 2
```
""",
    "find-median-from-data-stream.md": """
**Example 2:**
```text
Input: addNum(1), addNum(2), findMedian(), addNum(3), findMedian()
Output: null, null, 1.5, null, 2.0
```

**Example 3: (Edge Case - Negative numbers)**
```text
Input: addNum(-1), addNum(-2), findMedian(), addNum(-3), findMedian()
Output: null, null, -1.5, null, -2.0
```
"""
}

def update_file(filepath, examples_str):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if "**Example 2:**" in content:
        return # already updated
        
    # Find the injection point: right before "---" that precedes "### Code"
    target = "\n---\n\n### Code"
    idx = content.find(target)
    if idx != -1:
        new_content = content[:idx] + "\n" + examples_str + content[idx:]
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
    else:
        print(f"Could not find insertion point in {filepath}")

base_dir = r"d:\shiva\dsa\src\content"
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file in updates:
            update_file(os.path.join(root, file), updates[file])

