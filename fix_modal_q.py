import re

with open('src/components/ApplicationModal.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

def replace_q(q_num, default_title, default_desc, vid_title, vid_desc):
    global content
    old_h2 = f'''<h2 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                  {default_title}
                </h2>'''
    new_h2 = f'''<h2 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                  {{isVideoEditor ? "{vid_title}" : "{default_title}"}}
                </h2>'''
    
    old_p = f'''<p className="text-sm text-[#8A92A3]">
                  {default_desc}
                </p>'''
    new_p = f'''<p className="text-sm text-[#8A92A3]">
                  {{isVideoEditor ? "{vid_desc}" : "{default_desc}"}}
                </p>'''
                
    content = content.replace(old_h2, new_h2)
    content = content.replace(old_p, new_p)

replace_q(1, "Tell us about yourself.", "Not your resume. Who are you outside work?", "Tell us briefly about your video editing experience.", "What kind of projects have you worked on?")
replace_q(2, "Why MEDVAI?", "Why did you decide to apply here instead of another startup?", "Which editing software/tools are you comfortable using?", "Premiere, After Effects, CapCut, etc.")
replace_q(3, "Imagine MEDVAI succeeds five years from now.", 'What part would you proudly say, "I helped build this"?', "Share 2–3 examples of videos you have edited or created.", "Paste links to your best work.")
replace_q(4, "Show us something you've built.", "GitHub, Portfolio, Figma, Video, Anything.", "What type of content do you enjoy editing most?", "Educational, storytelling, fast-paced, etc.")
replace_q(5, "Tell us about the hardest problem you've solved.", "Technical, Design, Business, Personal. Explain your thinking.", "How would you turn a simple startup idea into an engaging short-form video?", "Walk us through your creative process.")

old_q6_h2 = '''<h2 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                  Healthcare affects real people.
                </h2>'''
new_q6_h2 = '''<h2 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                  {isVideoEditor ? "How many hours per week can you realistically contribute?" : "Healthcare affects real people."}
                </h2>'''
old_q6_p = '''<p className="text-sm text-[#8A92A3]">
                  How do you balance speed with responsibility?
                </p>'''
new_q6_p = '''<p className="text-sm text-[#8A92A3]">
                  {isVideoEditor ? "Be honest about your availability." : "How do you balance speed with responsibility?"}
                </p>'''
content = content.replace(old_q6_h2, new_q6_h2)
content = content.replace(old_q6_p, new_q6_p)

old_q7_h2 = '''<h2 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                  If you joined tomorrow, what is the first thing you would improve?
                </h2>'''
new_q7_h2 = '''<h2 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
                  {isVideoEditor ? "Why do you want to work with MEDVAI?" : "If you joined tomorrow, what is the first thing you would improve?"}
                </h2>'''
content = content.replace(old_q7_h2, new_q7_h2)

with open('src/components/ApplicationModal.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
