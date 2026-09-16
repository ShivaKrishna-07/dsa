---
title: "Design Twitter"
difficulty: "Hard"
youtube: "https://www.youtube.com/results?search_query=Design+Twitter+leetcode+355"
time: "O(N log K)"
space: "O(U + T)"
platforms:
  leetcode: "https://leetcode.com/problems/design-twitter/"
---

### Problem Statement

Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the `10` most recent tweets in the user's news feed.

Implement the `Twitter` class:
- `Twitter()` Initializes your twitter object.
- `void postTweet(int userId, int tweetId)` Composes a new tweet with ID `tweetId` by the user `userId`. Each call to this function will be made with a unique `tweetId`.
- `List<Integer> getNewsFeed(int userId)` Retrieves the `10` most recent tweet IDs in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user themself. Tweets must be ordered from most recent to least recent.
- `void follow(int followerId, int followeeId)` The user with ID `followerId` started following the user with ID `followeeId`.
- `void unfollow(int followerId, int followeeId)` The user with ID `followerId` started unfollowing the user with ID `followeeId`.

---

### Code

```cpp
class Twitter {
    int time;
    unordered_map<int, unordered_set<int>> following;
    unordered_map<int, vector<pair<int, int>>> tweets; // userId -> {time, tweetId}

public:
    Twitter() {
        time = 0;
    }
    
    void postTweet(int userId, int tweetId) {
        tweets[userId].push_back({time++, tweetId});
    }
    
    vector<int> getNewsFeed(int userId) {
        priority_queue<pair<int, int>> pq; // max-heap by time
        
        // Add user's own tweets
        for (auto& t : tweets[userId]) {
            pq.push(t);
        }
        
        // Add followees' tweets
        for (int followeeId : following[userId]) {
            for (auto& t : tweets[followeeId]) {
                pq.push(t);
            }
        }
        
        vector<int> res;
        int count = 0;
        while (!pq.empty() && count < 10) {
            res.push_back(pq.top().second);
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
};
```

---

### Complexity Analysis

- **Time Complexity:** `getNewsFeed` is `O(N log N)` where `N` is the total number of tweets by the user and their followees. (This can be optimized to `O(U log K)` using K-way merge where U is followees). Other operations are `O(1)`.
- **Space Complexity:** `O(U + T)` where `U` is number of users/follows and `T` is number of total tweets in the system.
