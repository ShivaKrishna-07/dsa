import os
import re

updates = {
    "convert-min-to-max-heap.md": """class Solution {
    void maxHeapify(vector<int>& arr, int i, int n) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        
        // Find the largest among root, left child, and right child
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
        
        // If root is not largest, swap and recursively heapify the affected subtree
        if (largest != i) {
            swap(arr[i], arr[largest]);
            maxHeapify(arr, largest, n);
        }
    }
    
public:
    void convertMinToMaxHeap(vector<int>& arr, int n) {
        // Start from the last internal node and heapify all internal nodes bottom-up
        for (int i = (n - 2) / 2; i >= 0; --i) {
            maxHeapify(arr, i, n);
        }
    }
};""",
    "min-heap-implementation.md": """class MinHeap {
    int *harr;
    int capacity;
    int heap_size;
public:
    MinHeap(int cap) {
        heap_size = 0;
        capacity = cap;
        harr = new int[cap];
    }
    
    // Utility functions to get parent and child indices
    int parent(int i) { return (i - 1) / 2; }
    int left(int i) { return (2 * i + 1); }
    int right(int i) { return (2 * i + 2); }
    
    void insertKey(int k) {
        if (heap_size == capacity) return;
        
        // Insert the new key at the end
        heap_size++;
        int i = heap_size - 1;
        harr[i] = k;
        
        // Fix the min heap property if it is violated
        while (i != 0 && harr[parent(i)] > harr[i]) {
            swap(harr[i], harr[parent(i)]);
            i = parent(i);
        }
    }
    
    void MinHeapify(int i) {
        int l = left(i);
        int r = right(i);
        int smallest = i;
        
        // Find the smallest among node and its children
        if (l < heap_size && harr[l] < harr[i]) smallest = l;
        if (r < heap_size && harr[r] < harr[smallest]) smallest = r;
        
        if (smallest != i) {
            swap(harr[i], harr[smallest]);
            MinHeapify(smallest);
        }
    }
    
    int extractMin() {
        if (heap_size <= 0) return -1;
        if (heap_size == 1) {
            heap_size--;
            return harr[0];
        }
        
        // Store minimum value and replace root with last element
        int root = harr[0];
        harr[0] = harr[heap_size - 1];
        heap_size--;
        
        // Restore min heap property
        MinHeapify(0);
        return root;
    }
    
    void decreaseKey(int i, int new_val) {
        harr[i] = new_val;
        // Float up the node to its correct position
        while (i != 0 && harr[parent(i)] > harr[i]) {
            swap(harr[i], harr[parent(i)]);
            i = parent(i);
        }
    }
    
    void deleteKey(int i) {
        if (i < heap_size) {
            // Decrease key to negative infinity so it floats to top
            decreaseKey(i, INT_MIN);
            // Extract the minimum element (the one we just pushed to top)
            extractMin();
        }
    }
};""",
    "hand-of-straights.md": """class Solution {
public:
    bool isNStraightHand(vector<int>& hand, int groupSize) {
        // Total cards must be a multiple of groupSize
        if (hand.size() % groupSize != 0) return false;
        
        // Count frequencies of each card, keeping them sorted
        map<int, int> counts;
        for (int card : hand) {
            counts[card]++;
        }
        
        // Group cards starting from the smallest available card
        while (!counts.empty()) {
            int first = counts.begin()->first;
            
            // Try to form a consecutive sequence of groupSize
            for (int i = 0; i < groupSize; i++) {
                if (counts.find(first + i) == counts.end()) {
                    return false; // A required card is missing
                }
                counts[first + i]--;
                
                // Remove the card from map if its count drops to 0
                if (counts[first + i] == 0) {
                    counts.erase(first + i);
                }
            }
        }
        
        return true;
    }
};""",
    "kth-largest-element.md": """class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        // Min-heap to maintain the top K largest elements seen so far
        priority_queue<int, vector<int>, greater<int>> minHeap;
        
        for (int num : nums) {
            minHeap.push(num);
            
            // If heap size exceeds k, pop the smallest element
            if (minHeap.size() > k) {
                minHeap.pop();
            }
        }
        
        // The root of the min-heap is the kth largest element
        return minHeap.top();
    }
};""",
    "kth-smallest-element.md": """class Solution{
public:
    int kthSmallest(int arr[], int l, int r, int k) {
        // Max-heap to maintain the top K smallest elements seen so far
        priority_queue<int> maxHeap;
        
        for (int i = l; i <= r; i++) {
            maxHeap.push(arr[i]);
            
            // If heap size exceeds k, pop the largest element
            if (maxHeap.size() > k) {
                maxHeap.pop(); 
            }
        }
        
        // The root of the max-heap is the kth smallest element
        return maxHeap.top();
    }
};""",
    "replace-elements-by-rank.md": """class Solution {
public:
    vector<int> arrayRankTransform(vector<int>& arr) {
        int n = arr.size();
        if (n == 0) return {};
        
        // Min-heap to sort elements while tracking their original indices
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        for (int i = 0; i < n; i++) {
            pq.push({arr[i], i});
        }
        
        vector<int> res(n);
        int rank = 1;
        int prev = pq.top().first; // Track previous value to handle duplicates
        
        while (!pq.empty()) {
            auto curr = pq.top();
            pq.pop();
            
            // Increment rank only if the current value is strictly greater than the previous
            if (curr.first > prev) {
                rank++;
            }
            
            res[curr.second] = rank;
            prev = curr.first;
        }
        
        return res;
    }
};""",
    "task-scheduler.md": """class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        // Count frequencies of all tasks
        unordered_map<char, int> counts;
        for (char t : tasks) {
            counts[t]++;
        }
        
        // Max-heap to process the most frequent tasks first
        priority_queue<int> maxHeap;
        for (auto& pair : counts) {
            maxHeap.push(pair.second);
        }
        
        int time = 0;
        
        while (!maxHeap.empty()) {
            vector<int> temp;
            int cycle = n + 1; // Number of slots in one cooldown cycle
            
            // Schedule tasks for the current cycle
            while (cycle > 0 && !maxHeap.empty()) {
                int max_freq = maxHeap.top();
                maxHeap.pop();
                
                // If a task is not completely finished, queue it for the next cycle
                if (max_freq > 1) {
                    temp.push_back(max_freq - 1);
                }
                
                time++;
                cycle--;
            }
            
            // Push unfinished tasks back into the heap
            for (int t : temp) {
                maxHeap.push(t);
            }
            
            // If heap is not empty, it means we need idle time to finish the cycle
            if (!maxHeap.empty()) {
                time += cycle; 
            }
        }
        
        return time;
    }
};""",
    "design-twitter.md": """class Twitter {
    int time; // Global timestamp for all tweets
    unordered_map<int, unordered_set<int>> following; // userId -> set of followees
    unordered_map<int, vector<pair<int, int>>> tweets; // userId -> list of {time, tweetId}

public:
    Twitter() {
        time = 0;
    }
    
    void postTweet(int userId, int tweetId) {
        tweets[userId].push_back({time++, tweetId});
    }
    
    vector<int> getNewsFeed(int userId) {
        // Max-heap to sort tweets by timestamp in descending order
        priority_queue<pair<int, int>> pq; 
        
        // Add user's own tweets to the heap
        for (auto& t : tweets[userId]) {
            pq.push(t);
        }
        
        // Add followees' tweets to the heap
        for (int followeeId : following[userId]) {
            for (auto& t : tweets[followeeId]) {
                pq.push(t);
            }
        }
        
        // Extract the 10 most recent tweets
        vector<int> res;
        int count = 0;
        while (!pq.empty() && count < 10) {
            res.push_back(pq.top().second); // Add tweetId to result
            pq.pop();
            count++;
        }
        return res;
    }
    
    void follow(int followerId, int followeeId) {
        if (followerId != followeeId) {
            following[followerId].insert(followeeId);
        }
    }
    
    void unfollow(int followerId, int followeeId) {
        following[followerId].erase(followeeId);
    }
};""",
    "find-median-from-data-stream.md": """class MedianFinder {
    priority_queue<int> maxHeap; // Stores the smaller half of the numbers
    priority_queue<int, vector<int>, greater<int>> minHeap; // Stores the larger half
    
public:
    MedianFinder() {
        
    }
    
    void addNum(int num) {
        maxHeap.push(num);
        
        // Step 1: Ensure every element in maxHeap is <= elements in minHeap
        minHeap.push(maxHeap.top());
        maxHeap.pop();
        
        // Step 2: Balance heaps so maxHeap always has equal or 1 more element than minHeap
        if (maxHeap.size() < minHeap.size()) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }
    
    double findMedian() {
        // If maxHeap is larger, total elements is odd; root of maxHeap is the median
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.top();
        } else {
            // Even elements; median is average of the two roots
            return (maxHeap.top() + minHeap.top()) / 2.0;
        }
    }
};""",
    "kth-largest-element-in-a-stream.md": """class KthLargest {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    int k;
public:
    KthLargest(int k, vector<int>& nums) {
        this->k = k;
        // Initialize the stream by adding all given elements
        for (int num : nums) {
            add(num);
        }
    }
    
    int add(int val) {
        minHeap.push(val);
        
        // Maintain a heap size of exactly K
        if (minHeap.size() > k) {
            minHeap.pop();
        }
        
        // The Kth largest element is always at the root of the min-heap
        return minHeap.top();
    }
};""",
    "maximum-sum-combinations.md": """class Solution {
public:
    vector<int> maxCombinations(int N, int K, vector<int> &A, vector<int> &B) {
        // Sort both arrays in descending order to easily track maximum combinations
        sort(A.begin(), A.end(), greater<int>());
        sort(B.begin(), B.end(), greater<int>());
        
        // Max heap stores the sum and the current indices of A and B
        priority_queue<pair<int, pair<int, int>>> pq;
        set<pair<int, int>> visited; // Set to avoid processing duplicate pairs
        
        pq.push({A[0] + B[0], {0, 0}});
        visited.insert({0, 0});
        
        vector<int> res;
        
        // Extract K maximum sums
        while(K--) {
            auto curr = pq.top();
            pq.pop();
            
            res.push_back(curr.first);
            
            int i = curr.second.first;
            int j = curr.second.second;
            
            // Push next valid combinations by incrementing indices
            if (i + 1 < N && visited.find({i + 1, j}) == visited.end()) {
                pq.push({A[i + 1] + B[j], {i + 1, j}});
                visited.insert({i + 1, j});
            }
            if (j + 1 < N && visited.find({i, j + 1}) == visited.end()) {
                pq.push({A[i] + B[j + 1], {i, j + 1}});
                visited.insert({i, j + 1});
            }
        }
        
        return res;
    }
};""",
    "merge-k-sorted-arrays.md": """class Solution {
public:
    // Structure to represent a node for the min-heap
    struct Node {
        int val;     // The value of the element
        int arrIdx;  // Which array the element came from
        int valIdx;  // The position of the element in its array
        Node(int v, int a, int i) : val(v), arrIdx(a), valIdx(i) {}
    };
    
    // Custom comparator for prioritizing the smallest element
    struct Compare {
        bool operator()(Node const& a, Node const& b) {
            return a.val > b.val;
        }
    };
    
    vector<int> mergeKArrays(vector<vector<int>> arr, int K) {
        vector<int> result;
        priority_queue<Node, vector<Node>, Compare> minHeap;
        
        // Push the first element of all K arrays into the min-heap
        for(int i = 0; i < K; i++) {
            minHeap.push(Node(arr[i][0], i, 0));
        }
        
        while(!minHeap.empty()) {
            Node curr = minHeap.top();
            minHeap.pop();
            
            // Add the smallest element to the result
            result.push_back(curr.val);
            
            // If the popped element's array has more elements, push the next element to the heap
            if(curr.valIdx + 1 < arr[curr.arrIdx].size()) {
                minHeap.push(Node(arr[curr.arrIdx][curr.valIdx + 1], curr.arrIdx, curr.valIdx + 1));
            }
        }
        
        return result;
    }
};""",
    "merge-k-sorted-lists.md": """/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
    // Custom comparator for min-heap to keep the smallest node at the top
    struct compare {
        bool operator()(ListNode* a, ListNode* b) {
            return a->val > b->val;
        }
    };
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        priority_queue<ListNode*, vector<ListNode*>, compare> pq;
        
        // Push the head of all K lists into the min-heap
        for (int i = 0; i < lists.size(); i++) {
            if (lists[i] != nullptr) {
                pq.push(lists[i]);
            }
        }
        
        ListNode* dummy = new ListNode(-1);
        ListNode* tail = dummy;
        
        // Iteratively extract the minimum element and push its next element
        while (!pq.empty()) {
            ListNode* minNode = pq.top();
            pq.pop();
            
            tail->next = minNode;
            tail = minNode;
            
            // Push the next node in the list if it exists
            if (minNode->next != nullptr) {
                pq.push(minNode->next);
            }
        }
        
        return dummy->next;
    }
};"""
}

import re
base_dir = r"d:\shiva\dsa\src\content\heaps"
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file in updates:
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # replace the code block
            regex = re.compile(r'```cpp\n[\s\S]*?\n```')
            new_code = "```cpp\n" + updates[file] + "\n```"
            new_content = regex.sub(new_code, content, count=1)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {file}")
