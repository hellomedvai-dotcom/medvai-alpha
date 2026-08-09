with open('src/components/ApplicationModal.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("const isVideoEditor = details.role === 'Video Editor';", "const isVideoEditor = selectedRole === 'Video Editor';")

with open('src/components/ApplicationModal.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
