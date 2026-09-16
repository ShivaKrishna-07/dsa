import re
import json

with open(r'C:\Users\home\.gemini\antigravity-ide\brain\5ddaad51-a45e-4982-9038-ec3aff4cc2ae\.system_generated\steps\5\content.md', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's find all problem objects in the Heaps section
# The category name usually has "Heaps"
start_idx = content.find("Heap")
if start_idx != -1:
    end_idx = content.find("category_id", start_idx + 100)
    chunk = content[start_idx-100:end_idx + 2000]

    # Extract all problems in this chunk
    blocks = chunk.split('"problem_id":')[1:]
    result = []
    for b in blocks:
        name = re.search(r'\"problem_name\":\"([^\"]+)\"', b)
        article = re.search(r'\"article\":\"([^\"]*)\"', b)
        youtube = re.search(r'\"youtube\":\"([^\"]*)\"', b)
        leetcode = re.search(r'\"leetcode\":\"([^\"]*)\"', b)
        diff = re.search(r'\"difficulty\":\"([^\"]*)\"', b)
        if name:
            result.append({
                "name": name.group(1),
                "article": article.group(1) if article else "",
                "youtube": youtube.group(1) if youtube else "",
                "leetcode": leetcode.group(1) if leetcode else "",
                "difficulty": diff.group(1) if diff else ""
            })

    with open("heaps_problems.json", "w") as out:
        json.dump(result, out, indent=2)
    print(f"Extracted {len(result)} problems.")
else:
    print("Heap not found")
