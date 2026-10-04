import re

with open('src/data/blogPosts.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the pilates-for-athletes post
pattern = r"(\n  \{\n    slug: 'pilates-for-athletes',.*?\n  \},)"
match = re.search(pattern, content, re.DOTALL)

if match:
    athletes_post = match.group(1)
    # Remove it from current location
    content_without = content[:match.start()] + content[match.end():]
    
    # Insert it after pilates-for-seniors
    seniors_pattern = r"(  \{\n    slug: 'pilates-for-seniors',.*?\n  \},)"
    seniors_match = re.search(seniors_pattern, content_without, re.DOTALL)
    
    if seniors_match:
        insert_pos = seniors_match.end()
        new_content = content_without[:insert_pos] + athletes_post + content_without[insert_pos:]
        
        with open('src/data/blogPosts.jsx', 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("✅ Reordered successfully")
    else:
        print("❌ Could not find seniors post")
else:
    print("❌ Could not find athletes post")
