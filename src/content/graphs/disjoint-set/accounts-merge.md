---
title: "Accounts Merge"
difficulty: "Medium"
time: "O(N * M * log(N * M))"
space: "O(N * M)"
platforms:
  leetcode: "https://leetcode.com/problems/accounts-merge/"
  youtube: "https://www.youtube.com/watch?v=FMwpt_aQOGw"
  article: "https://takeuforward.org/practice/dsa/accounts-merge"
---

### Problem Statement

Given a list of `accounts` where each element `accounts[i]` is a list of strings, where the first element `accounts[i][0]` is a name, and the rest of the elements are emails representing emails of the account.

Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. After merging the accounts, return the accounts in any order, with emails sorted in lexicographical order.

**Example 1:**
```text
Input: accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
Output: [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
```

---

### Intuition

Map each unique email to the account index `i`. If an email was already seen in another account `j`, union the two account indices using DSU: `ds.unionBySize(i, j)`. Then group all emails by their ultimate parent account index, sort emails, and attach the owner's name.

---

### Code

```cpp
class DisjointSet {
public:
    // parent[i]: representative root; size[i]: component size
    vector<int> parent, size;
    DisjointSet(int n) {
        parent.resize(n);
        size.resize(n, 1);
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int findUPar(int node) {
        if (node == parent[node]) return node;
        return parent[node] = findUPar(parent[node]);
    }
    void unionBySize(int u, int v) {
        int ulp_u = findUPar(u), ulp_v = findUPar(v);
        if (ulp_u == ulp_v) return;
        if (size[ulp_u] < size[ulp_v]) {
            parent[ulp_u] = ulp_v;
            size[ulp_v] += size[ulp_u];
        } else {
            parent[ulp_v] = ulp_u;
            size[ulp_u] += size[ulp_v];
        }
    }
};

class Solution {
public:
    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
        int n = accounts.size();
        DisjointSet ds(n);
        unordered_map<string, int> emailToId;

        for (int i = 0; i < n; i++) {
            for (int j = 1; j < accounts[i].size(); j++) {
                string email = accounts[i][j];
                if (!emailToId.count(email)) {
                    emailToId[email] = i;
                } else {
                    ds.unionBySize(i, emailToId[email]);
                }
            }
        }

        vector<vector<string>> mergedEmails(n);
        for (auto& [email, id] : emailToId) {
            int root = ds.findUPar(id);
            mergedEmails[root].push_back(email);
        }

        vector<vector<string>> ans;
        for (int i = 0; i < n; i++) {
            if (mergedEmails[i].empty()) continue;
            sort(mergedEmails[i].begin(), mergedEmails[i].end());
            vector<string> temp;
            temp.push_back(accounts[i][0]);
            for (auto& email : mergedEmails[i]) temp.push_back(email);
            ans.push_back(temp);
        }
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N * M * log(N * M))` — Iterating through emails and sorting merged email lists.
- **Space Complexity:** `O(N * M)` — Hash map and DSU storage.
