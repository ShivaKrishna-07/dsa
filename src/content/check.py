import re
import json

with open(r'C:\Users\home\.gemini\antigravity-ide\brain\5ddaad51-a45e-4982-9038-ec3aff4cc2ae\.system_generated\steps\5\content.md', 'r', encoding='utf-8') as f:
    content = f.read()

heap_start = content.find('Heaps')
if heap_start == -1:
    heap_start = content.find('Heap')
    
end = content.find('category_id', heap_start + 100)
chunk = content[heap_start:end+1000]

matches = re.finditer(r'\"subcategory_name\":\"([^\"]+)\",\"problems\":\[(.*?)\]\}', chunk)
for m in matches:
    print('SUBCAT:', m.group(1))
    probs = re.findall(r'\"problem_name\":\"([^\"]+)\"', m.group(2))
    for p in probs:
        print(' -', p)
