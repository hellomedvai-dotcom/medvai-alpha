with open('src/components/ApplicationModal.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

bad_str = '"What part would you proudly say, "I helped build this"?"'
good_str = '\'What part would you proudly say, "I helped build this"?\''

content = content.replace(bad_str, good_str)

with open('src/components/ApplicationModal.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
