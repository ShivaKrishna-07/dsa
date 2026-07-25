const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '../src/content/arrays');

const arrayData = {
  'two-pointers': {
    'remove-duplicates-in-sorted-arr': {
      title: 'Remove Duplicates from Sorted Array',
      difficulty: 'Easy',
      time: 'O(N)',
      space: 'O(1)',
      platform: { leetcode: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/' },
      ps: 'Given an integer array `nums` sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same.\n\nReturn the number of unique elements in `nums`.',
      examples: `**Example 1:**\n\`\`\`text\nInput: nums = [1,1,2]\nOutput: 2, nums = [1,2,_]\nExplanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.\n\`\`\``,
      code: `function removeDuplicates(nums) {\n  let i = 0;\n  for (let j = 1; j < nums.length; j++) {\n    if (nums[j] !== nums[i]) {\n      i++;\n      nums[i] = nums[j];\n    }\n  }\n  return i + 1;\n}`
    },
    'move-zeroes-to-end': {
      title: 'Move Zeroes',
      difficulty: 'Easy',
      time: 'O(N)',
      space: 'O(1)',
      platform: { leetcode: 'https://leetcode.com/problems/move-zeroes/' },
      ps: 'Given an integer array `nums`, move all `0`s to the end of it while maintaining the relative order of the non-zero elements.\n\nNote that you must do this in-place without making a copy of the array.',
      examples: `**Example 1:**\n\`\`\`text\nInput: nums = [0,1,0,3,12]\nOutput: [1,3,12,0,0]\n\`\`\``,
      code: `function moveZeroes(nums) {\n  let left = 0;\n  for (let right = 0; right < nums.length; right++) {\n    if (nums[right] !== 0) {\n      [nums[left], nums[right]] = [nums[right], nums[left]];\n      left++;\n    }\n  }\n}`
    },
    'rearrange-by-sign': {
      title: 'Rearrange Array Elements by Sign',
      difficulty: 'Medium',
      time: 'O(N)',
      space: 'O(N)',
      platform: { leetcode: 'https://leetcode.com/problems/rearrange-array-elements-by-sign/' },
      ps: 'You are given a 0-indexed integer array `nums` of even length consisting of an equal number of positive and negative integers.\n\nYou should rearrange the elements of `nums` such that the modified array follows the given conditions:\n1. Every consecutive pair of integers have opposite signs.\n2. For all integers with the same sign, the order in which they were present in `nums` is preserved.\n3. The rearranged array begins with a positive integer.',
      examples: `**Example 1:**\n\`\`\`text\nInput: nums = [3,1,-2,-5,2,-4]\nOutput: [3,-2,1,-5,2,-4]\n\`\`\``,
      code: `function rearrangeArray(nums) {\n  let n = nums.length;\n  let ans = new Array(n);\n  let posIndex = 0, negIndex = 1;\n  for (let i = 0; i < n; i++) {\n    if (nums[i] > 0) {\n      ans[posIndex] = nums[i];\n      posIndex += 2;\n    } else {\n      ans[negIndex] = nums[i];\n      negIndex += 2;\n    }\n  }\n  return ans;\n}`
    },
    'sort-1-2-3-dnf-': {
      title: 'Sort Colors (DNF)',
      difficulty: 'Medium',
      time: 'O(N)',
      space: 'O(1)',
      platform: { leetcode: 'https://leetcode.com/problems/sort-colors/' },
      ps: 'Given an array `nums` with `n` objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.\n\nWe will use the integers `0`, `1`, and `2` to represent the color red, white, and blue, respectively.',
      examples: `**Example 1:**\n\`\`\`text\nInput: nums = [2,0,2,1,1,0]\nOutput: [0,0,1,1,2,2]\n\`\`\``,
      code: `function sortColors(nums) {\n  let low = 0, mid = 0, high = nums.length - 1;\n  while (mid <= high) {\n    if (nums[mid] === 0) {\n      [nums[low], nums[mid]] = [nums[mid], nums[low]];\n      low++;\n      mid++;\n    } else if (nums[mid] === 1) {\n      mid++;\n    } else {\n      [nums[mid], nums[high]] = [nums[high], nums[mid]];\n      high--;\n    }\n  }\n}`
    },
    'majority-element-i-ii-moore-voting-algo-': {
      title: 'Majority Element I & II',
      difficulty: 'Medium',
      time: 'O(N)',
      space: 'O(1)',
      platform: { leetcode: 'https://leetcode.com/problems/majority-element/' },
      ps: 'Given an array `nums` of size `n`, return the majority element.\n\nThe majority element is the element that appears more than `⌊n / 2⌋` times. You may assume that the majority element always exists in the array.',
      examples: `**Example 1:**\n\`\`\`text\nInput: nums = [3,2,3]\nOutput: 3\n\`\`\``,
      code: `function majorityElement(nums) {\n  let count = 0;\n  let candidate = null;\n  for (let num of nums) {\n    if (count === 0) candidate = num;\n    count += (num === candidate) ? 1 : -1;\n  }\n  return candidate;\n}`
    }
  },
  'prefix-sum': {
    'longest-subarr-sum': {
      title: 'Subarray Sum Equals K',
      difficulty: 'Medium',
      time: 'O(N)',
      space: 'O(N)',
      platform: { leetcode: 'https://leetcode.com/problems/subarray-sum-equals-k/' },
      ps: 'Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals to `k`.\n\nA subarray is a contiguous non-empty sequence of elements within an array.',
      examples: `**Example 1:**\n\`\`\`text\nInput: nums = [1,1,1], k = 2\nOutput: 2\n\`\`\``,
      code: `function subarraySum(nums, k) {\n  let map = new Map();\n  map.set(0, 1);\n  let count = 0, sum = 0;\n  for (let num of nums) {\n    sum += num;\n    if (map.has(sum - k)) {\n      count += map.get(sum - k);\n    }\n    map.set(sum, (map.get(sum) || 0) + 1);\n  }\n  return count;\n}`
    },
    'cnt-subarr-with-xor-k': {
      title: 'Count Subarrays with Given XOR',
      difficulty: 'Medium',
      time: 'O(N)',
      space: 'O(N)',
      platform: { gfg: 'https://www.geeksforgeeks.org/problems/count-subarray-with-given-xor/1' },
      ps: 'Given an array of integers `A` and an integer `B`. Find the total number of subarrays having bitwise XOR of all elements equals to `B`.',
      examples: `**Example 1:**\n\`\`\`text\nInput: A = [4, 2, 2, 6, 4], B = 6\nOutput: 4\n\`\`\``,
      code: `function solve(A, B) {\n  let map = new Map();\n  map.set(0, 1);\n  let count = 0, xor = 0;\n  for (let num of A) {\n    xor ^= num;\n    let target = xor ^ B;\n    if (map.has(target)) {\n      count += map.get(target);\n    }\n    map.set(xor, (map.get(xor) || 0) + 1);\n  }\n  return count;\n}`
    },
    'longest-consecutive-sequence': {
      title: 'Longest Consecutive Sequence',
      difficulty: 'Medium',
      time: 'O(N)',
      space: 'O(N)',
      platform: { leetcode: 'https://leetcode.com/problems/longest-consecutive-sequence/' },
      ps: 'Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence.\n\nYou must write an algorithm that runs in `O(n)` time.',
      examples: `**Example 1:**\n\`\`\`text\nInput: nums = [100,4,200,1,3,2]\nOutput: 4\nExplanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.\n\`\`\``,
      code: `function longestConsecutive(nums) {\n  let set = new Set(nums);\n  let longestStreak = 0;\n  for (let num of set) {\n    if (!set.has(num - 1)) {\n      let currentNum = num;\n      let currentStreak = 1;\n      while (set.has(currentNum + 1)) {\n        currentNum += 1;\n        currentStreak += 1;\n      }\n      longestStreak = Math.max(longestStreak, currentStreak);\n    }\n  }\n  return longestStreak;\n}`
    },
    'find-missing-repeating-number': {
      title: 'Missing and Repeating Number',
      difficulty: 'Medium',
      time: 'O(N)',
      space: 'O(1)',
      platform: { gfg: 'https://www.geeksforgeeks.org/problems/find-missing-and-repeating2512/1' },
      ps: 'Given an unsorted array `Arr` of size `N` of positive integers. One number `A` from set `{1, 2,....,N}` is missing and one number `B` occurs twice in array. Find these two numbers.',
      examples: `**Example 1:**\n\`\`\`text\nInput: N = 2, Arr[] = [2, 2]\nOutput: 2 1\n\`\`\``,
      code: `function findTwoElement(arr, n) {\n  let S = (n * (n + 1)) / 2;\n  let P = (n * (n + 1) * (2 * n + 1)) / 6;\n  let missingNumber = 0, repeating = 0;\n  for (let i = 0; i < n; i++) {\n    S -= arr[i];\n    P -= arr[i] * arr[i];\n  }\n  missingNumber = (S + P / S) / 2;\n  repeating = missingNumber - S;\n  return [repeating, missingNumber];\n}`
    }
  },
  'kadanes': {
    'max-subarr-sum': {
      title: 'Maximum Subarray',
      difficulty: 'Medium',
      time: 'O(N)',
      space: 'O(1)',
      platform: { leetcode: 'https://leetcode.com/problems/maximum-subarray/' },
      ps: 'Given an integer array `nums`, find the subarray with the largest sum, and return its sum.',
      examples: `**Example 1:**\n\`\`\`text\nInput: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6\nExplanation: The subarray [4,-1,2,1] has the largest sum 6.\n\`\`\``,
      code: `function maxSubArray(nums) {\n  let maxSoFar = nums[0];\n  let currentMax = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currentMax = Math.max(nums[i], currentMax + nums[i]);\n    maxSoFar = Math.max(maxSoFar, currentMax);\n  }\n  return maxSoFar;\n}`
    },
    'max-sum-circular-subarr': {
      title: 'Maximum Sum Circular Subarray',
      difficulty: 'Medium',
      time: 'O(N)',
      space: 'O(1)',
      platform: { leetcode: 'https://leetcode.com/problems/maximum-sum-circular-subarray/' },
      ps: 'Given a circular integer array `nums` of length `n`, return the maximum possible sum of a non-empty subarray of `nums`.',
      examples: `**Example 1:**\n\`\`\`text\nInput: nums = [1,-2,3,-2]\nOutput: 3\nExplanation: Subarray [3] has maximum sum 3.\n\`\`\``,
      code: `function maxSubarraySumCircular(nums) {\n  let total = 0, maxSum = nums[0], curMax = 0, minSum = nums[0], curMin = 0;\n  for (let a of nums) {\n    curMax = Math.max(curMax + a, a);\n    maxSum = Math.max(maxSum, curMax);\n    curMin = Math.min(curMin + a, a);\n    minSum = Math.min(minSum, curMin);\n    total += a;\n  }\n  return maxSum > 0 ? Math.max(maxSum, total - minSum) : maxSum;\n}`
    },
    'max-absolute-sum-of-any-subarr': {
      title: 'Maximum Absolute Sum of Any Subarray',
      difficulty: 'Medium',
      time: 'O(N)',
      space: 'O(1)',
      platform: { leetcode: 'https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/' },
      ps: 'You are given an integer array `nums`. The absolute sum of a subarray `[numsl, numsl+1, ..., numsr-1, numsr]` is `abs(numsl + numsl+1 + ... + numsr-1 + numsr)`.\n\nReturn the maximum absolute sum of any (possibly empty) subarray of `nums`.',
      examples: `**Example 1:**\n\`\`\`text\nInput: nums = [1,-3,2,3,-4]\nOutput: 5\nExplanation: The subarray [2,3] has absolute sum = abs(2+3) = abs(5) = 5.\n\`\`\``,
      code: `function maxAbsoluteSum(nums) {\n  let maxSoFar = 0, minSoFar = 0, currentMax = 0, currentMin = 0;\n  for (let x of nums) {\n    currentMax = Math.max(currentMax + x, x);\n    maxSoFar = Math.max(maxSoFar, currentMax);\n    currentMin = Math.min(currentMin + x, x);\n    minSoFar = Math.min(minSoFar, currentMin);\n  }\n  return Math.max(maxSoFar, Math.abs(minSoFar));\n}`
    },
    'largest-sum-contiguous-subarr': {
      title: 'Largest Sum Contiguous Subarray',
      difficulty: 'Medium',
      time: 'O(N)',
      space: 'O(1)',
      platform: { gfg: 'https://www.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/1' },
      ps: 'Given an array `arr` of `N` integers. Find the contiguous sub-array(containing at least one number) which has the maximum sum and return its sum.',
      examples: `**Example 1:**\n\`\`\`text\nInput: arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]\nOutput: 6\n\`\`\``,
      code: `function maxSubarraySum(arr, N){\n  let maxSum = arr[0], currSum = 0;\n  for(let i=0; i<N; i++){\n    currSum += arr[i];\n    if(currSum > maxSum) maxSum = currSum;\n    if(currSum < 0) currSum = 0;\n  }\n  return maxSum;\n}`
    }
  },
  'matrix': {
    'pascal-triangle': {
      title: 'Pascal\'s Triangle',
      difficulty: 'Easy',
      time: 'O(N^2)',
      space: 'O(N^2)',
      platform: { leetcode: 'https://leetcode.com/problems/pascals-triangle/' },
      ps: 'Given an integer `numRows`, return the first numRows of Pascal\'s triangle.',
      examples: `**Example 1:**\n\`\`\`text\nInput: numRows = 5\nOutput: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]\n\`\`\``,
      code: `function generate(numRows) {\n  let res = [];\n  for (let i = 0; i < numRows; i++) {\n    let row = new Array(i + 1).fill(1);\n    for (let j = 1; j < i; j++) {\n      row[j] = res[i - 1][j - 1] + res[i - 1][j];\n    }\n    res.push(row);\n  }\n  return res;\n}`
    },
    'spiral-matrix': {
      title: 'Spiral Matrix',
      difficulty: 'Medium',
      time: 'O(M*N)',
      space: 'O(M*N)',
      platform: { leetcode: 'https://leetcode.com/problems/spiral-matrix/' },
      ps: 'Given an `m x n` `matrix`, return all elements of the `matrix` in spiral order.',
      examples: `**Example 1:**\n\`\`\`text\nInput: matrix = [[1,2,3],[4,5,6],[7,8,9]]\nOutput: [1,2,3,6,9,8,7,4,5]\n\`\`\``,
      code: `function spiralOrder(matrix) {\n  let res = [];\n  if (matrix.length === 0) return res;\n  let top = 0, bottom = matrix.length - 1;\n  let left = 0, right = matrix[0].length - 1;\n  while (top <= bottom && left <= right) {\n    for (let i = left; i <= right; i++) res.push(matrix[top][i]);\n    top++;\n    for (let i = top; i <= bottom; i++) res.push(matrix[i][right]);\n    right--;\n    if (top <= bottom) {\n      for (let i = right; i >= left; i--) res.push(matrix[bottom][i]);\n      bottom--;\n    }\n    if (left <= right) {\n      for (let i = bottom; i >= top; i--) res.push(matrix[i][left]);\n      left++;\n    }\n  }\n  return res;\n}`
    }
  },
  'observation': {
    'left-rotate-by-k': {
      title: 'Rotate Array',
      difficulty: 'Medium',
      time: 'O(N)',
      space: 'O(1)',
      platform: { leetcode: 'https://leetcode.com/problems/rotate-array/' },
      ps: 'Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.',
      examples: `**Example 1:**\n\`\`\`text\nInput: nums = [1,2,3,4,5,6,7], k = 3\nOutput: [5,6,7,1,2,3,4]\n\`\`\``,
      code: `function rotate(nums, k) {\n  k %= nums.length;\n  let reverse = (i, j) => {\n    while (i < j) {\n      let temp = nums[i];\n      nums[i] = nums[j];\n      nums[j] = temp;\n      i++; j--;\n    }\n  };\n  reverse(0, nums.length - 1);\n  reverse(0, k - 1);\n  reverse(k, nums.length - 1);\n}`
    },
    'max-conse-ones': {
      title: 'Max Consecutive Ones',
      difficulty: 'Easy',
      time: 'O(N)',
      space: 'O(1)',
      platform: { leetcode: 'https://leetcode.com/problems/max-consecutive-ones/' },
      ps: 'Given a binary array `nums`, return the maximum number of consecutive `1`s in the array.',
      examples: `**Example 1:**\n\`\`\`text\nInput: nums = [1,1,0,1,1,1]\nOutput: 3\n\`\`\``,
      code: `function findMaxConsecutiveOnes(nums) {\n  let max = 0, count = 0;\n  for (let n of nums) {\n    if (n === 1) count++;\n    else {\n      max = Math.max(max, count);\n      count = 0;\n    }\n  }\n  return Math.max(max, count);\n}`
    },
    'stock-buy-sell': {
      title: 'Best Time to Buy and Sell Stock',
      difficulty: 'Easy',
      time: 'O(N)',
      space: 'O(1)',
      platform: { leetcode: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
      ps: 'You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.',
      examples: `**Example 1:**\n\`\`\`text\nInput: prices = [7,1,5,3,6,4]\nOutput: 5\n\`\`\``,
      code: `function maxProfit(prices) {\n  let minPrice = Infinity;\n  let maxProf = 0;\n  for (let p of prices) {\n    minPrice = Math.min(minPrice, p);\n    maxProf = Math.max(maxProf, p - minPrice);\n  }\n  return maxProf;\n}`
    }
  }
};

for (const [patternSlug, problemsObj] of Object.entries(arrayData)) {
  for (const [problemSlug, data] of Object.entries(problemsObj)) {
    const filePath = path.join(contentDir, patternSlug, problemSlug + '.md');
    
    // Construct platform YAML
    let platformYaml = Object.entries(data.platform)
      .map(([k, v]) => `  ${k}: "${v}"`)
      .join('\n');

    const mdContent = `---
title: "${data.title}"
difficulty: "${data.difficulty}"
time: "${data.time}"
space: "${data.space}"
platforms:
${platformYaml}
tags:
  - "Arrays"
  - "${patternSlug}"
---

### Problem Statement

${data.ps}

### Examples

${data.examples}

---

### Code

\`\`\`javascript
${data.code}
\`\`\`
`;
    fs.writeFileSync(filePath, mdContent, 'utf8');
  }
}

console.log('Arrays topic fully populated with real data!');
