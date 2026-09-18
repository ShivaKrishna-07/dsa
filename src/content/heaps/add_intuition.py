import os
import re

intuitions = {
    "check-binary-tree-heap.md": "To check if a binary tree is a max-heap, we need to verify two things: first, that it is a complete binary tree, and second, that every parent node has a value greater than or equal to its children. We can do this efficiently by performing a level-order traversal (using a queue). If we ever encounter a node after we've seen a missing child, the tree is incomplete. At the same time, we check if any child is greater than its parent.",
    "check-min-heap.md": "An array represents a valid min-heap if every parent element is smaller than or equal to its children. Since a heap is a complete binary tree, the left child of an element at index `i` is at `2*i + 1` and the right child is at `2*i + 2`. We can simply iterate through all internal nodes (up to the middle of the array) and check if this property holds true.",
    "convert-min-to-max-heap.md": "A min-heap is already a complete binary tree, but the parent-child relationships are inverted compared to a max-heap. To convert it, we don't need to rebuild it from scratch. Instead, we can simply perform a bottom-up `maxHeapify` process, starting from the last internal node and moving up to the root. This reshuffles the elements in-place to satisfy the max-heap property.",
    "extract-min.md": "When we extract the minimum element from a min-heap, it's always the root. Removing the root directly would break the tree structure. Instead, we replace the root with the last element in the heap and reduce the heap size by 1. Since the new root might be larger than its children, we call `MinHeapify` on the root to 'bubble it down' to its correct position, restoring the heap property.",
    "min-heap-implementation.md": "A Min-Heap can be efficiently represented as an array where the root is at index 0. For any element at index `i`, its left child is at `2i+1`, right child at `2i+2`, and parent at `(i-1)/2`. To insert, we add at the end and 'bubble up'. To extract, we replace the root with the last element and 'bubble down' (heapify). This guarantees `O(log N)` time for both operations.",
    "hand-of-straights.md": "To form groups of consecutive cards, we should always greedily start the next group with the smallest available card. If we sort the cards or use a map to keep track of card frequencies, we can continuously pick the smallest remaining card and try to form a sequence of `groupSize`. If we can't find the required consecutive cards to complete the group, then it's impossible.",
    "kth-largest-element.md": "If we sort the array, we can easily pick the Kth largest element, but sorting takes `O(N log N)`. To optimize, we can use a Min-Heap of size K. As we iterate through the array, we add elements to the heap. If the heap grows larger than K, we pop the smallest element. By the end, the heap contains only the K largest elements, and the root (the smallest of them) will be exactly the Kth largest element.",
    "kth-smallest-element.md": "Similar to finding the Kth largest element, we can use a Max-Heap of size K. As we traverse the array, we insert elements into the heap. If the heap size exceeds K, we remove the maximum element (the root). By doing this, we discard elements that are too large, leaving only the K smallest elements in the heap. The root will then be the Kth smallest element.",
    "replace-elements-by-rank.md": "To assign ranks based on relative size, we need to know the sorted order of the elements. We can pair each element with its original index and push them into a Min-Heap. By popping from the Min-Heap, we process elements from smallest to largest, assigning ranks. If an element is the same as the previously popped element, it gets the same rank; otherwise, the rank increments.",
    "task-scheduler.md": "To minimize idle time, we should always prioritize scheduling the tasks that have the highest remaining frequency. We can use a Max-Heap to keep track of task counts. In each cycle (of length `n+1`), we greedily pick the most frequent available tasks, execute them, and then put them back in the queue for the next cycle if they still have remaining instances.",
    "design-twitter.md": "To generate a news feed containing the 10 most recent tweets from the user and their followees, we are essentially looking for the top 10 maximums from multiple sorted lists of tweets. A Max-Heap (or a Min-Heap of size 10) is perfect for this. We can push the latest tweets of the user and their followees into a priority queue based on a global timestamp, and then extract the top 10.",
    "find-median-from-data-stream.md": "To efficiently find the median in a continuous stream of numbers, we can divide the data into two halves. A Max-Heap stores the smaller half of the numbers, and a Min-Heap stores the larger half. We keep the heaps balanced so that their sizes differ by at most 1. The median will then either be the root of the larger heap, or the average of the roots of both heaps.",
    "kth-largest-element-in-a-stream.md": "To continuously track the Kth largest element as new numbers arrive, we can maintain a Min-Heap of exactly size K. The heap will always hold the top K largest elements seen so far. The smallest among these top K elements (which is the Kth largest overall) will always sit at the root of the min-heap. When a new element arrives, we push it in and pop the smallest if the size exceeds K.",
    "maximum-sum-combinations.md": "To find the top K maximum sums from two arrays, we can first sort both arrays in descending order. The absolute maximum sum is obviously `A[0] + B[0]`. We can push this sum and its indices into a Max-Heap. From there, the next potential maximums can only be `A[1] + B[0]` or `A[0] + B[1]`. We use the heap to iteratively extract the maximum sum and push the next adjacent combinations, keeping track of visited index pairs.",
    "merge-k-sorted-arrays.md": "To merge K sorted arrays efficiently, we don't need to combine them all and sort from scratch. Since each array is already sorted, the absolute smallest element must be one of the first elements of the K arrays. We can push the first element of each array into a Min-Heap. Then, we repeatedly extract the smallest element, add it to our result, and push the next element from the extracted element's original array into the heap.",
    "merge-k-sorted-lists.md": "Merging K sorted linked lists works on the exact same principle as merging K sorted arrays. We can push the head node of each linked list into a Min-Heap. We then extract the minimum node, append it to our merged list, and if that node has a `next` node, we push the `next` node into the heap. We continue this until the heap is empty."
}

base_dir = r"d:\shiva\dsa\src\content\heaps"
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file in intuitions:
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Find the insertion point before \n---\n\n### Code
            target = re.compile(r'\n---\n\n### Code')
            if not target.search(content):
                target = re.compile(r'\n---\r\n\r\n### Code') # Handle CRLF
            
            if target.search(content):
                intuition_md = f"\n---\n\n### Intuition\n\n{intuitions[file]}\n"
                new_content = target.sub(intuition_md + "\n---\n\n### Code", content, count=1)
                
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Added intuition to {file}")
            else:
                print(f"Could not find insertion point in {file}")
