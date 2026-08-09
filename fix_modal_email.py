import re

with open('src/components/ApplicationModal.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Refactor the Email Generation
email_block_old = '''    const emailBodyLines = [
      MEDVAI CAREER APPLICATION SUBMISSION,
      ====================================,
      Timestamp: ,
      `,
      CANDIDATE INFORMATION:,
      • Name: ,
      • Email: ,
      • Role Applied For: ,
      • LinkedIn: ,
      • GitHub: ,
      • Portfolio: ,
      • Resume Link: ,
      `,
      ====================================,
      APPLICATION RESPONSES:,
      `,
      Question 1 (Tell us about yourself):,
      ${(answers[1] as string) || 'N/A'},
      `,
      Question 2 (Why MEDVAI):,
      ${(answers[2] as string) || 'N/A'},
      `,
      Question 3 (5-Year Vision):,
      ${(answers[3] as string) || 'N/A'},
      `,
      Question 4 (Project Built):,
      ${(answers[4] as string) || 'N/A'},
      `,
      Question 5 (Hardest Technical/Operational Problem):,
      ${(answers[5] as string) || 'N/A'},
      `,
      Question 6 (Speed vs Responsibility):,
      ${(answers[6] as string) || 'N/A'},
      `,
      Question 7 (First Improvement to MEDVAI):,
      ${(answers[7] as string) || 'N/A'},
      `,
      Question 8 (Strongest Role Focus):,
      ${(answers[8] as string) || 'N/A'},
      `,
      Question 9 (Tech Stack / Skills):,
      ${Array.isArray(answers[9]) ? answers[9].join(', ') : ((answers[9] as string) || 'N/A')},
      `,
      Question 10 (Weekly Hours Commitment):,
      ${(answers[10] as string) || 'N/A'},
      `,
      Question 11 (Startup Experience):,
      ${(answers[11] as string) || 'N/A'},
      `,
      Question 12 (Primary Motivation):,
      ${(answers[12] as string) || 'N/A'},
      `,
      Question 13 (Resilience Under Stress):,
      ${(answers[13] as string) || 'N/A'},
      `,
      Question 14 (Why Should We Trust You):,
      ${(answers[14] as string) || 'N/A'},
      `,
      Question 15 (Extra Notes / Questions):,
      ${(answers[15] as string) || 'N/A'},
      `,
      ====================================,
      Sent automatically via MEDVAI Application Portal
    ];'''

email_block_new = '''    const emailBodyLines = [
      MEDVAI CAREER APPLICATION SUBMISSION,
      ====================================,
      Timestamp: ,
      `,
      CANDIDATE INFORMATION:,
      • Name: ,
      • Email: ,
      • Role Applied For: ,
      • LinkedIn: ,
      • GitHub: ,
      • Portfolio: ,
      • Resume Link: ,
      `,
      ====================================,
      APPLICATION RESPONSES:,
      `,
    ];

    if (isVideoEditor) {
      emailBodyLines.push(
        Question 1 (Video editing experience):,
        ${(answers[1] as string) || 'N/A'}, `,
        Question 2 (Editing software/tools):,
        ${(answers[2] as string) || 'N/A'}, `,
        Question 3 (2-3 examples of videos):,
        ${(answers[3] as string) || 'N/A'}, `,
        Question 4 (Content you enjoy most):,
        ${(answers[4] as string) || 'N/A'}, `,
        Question 5 (Startup idea to short-form video):,
        ${(answers[5] as string) || 'N/A'}, `,
        Question 6 (Hours per week):,
        ${(answers[6] as string) || 'N/A'}, `,
        Question 7 (Why work with MEDVAI):,
        ${(answers[7] as string) || 'N/A'}, `
      );
    } else {
      emailBodyLines.push(
        Question 1 (Tell us about yourself):, ${(answers[1] as string) || 'N/A'}, `,
        Question 2 (Why MEDVAI):, ${(answers[2] as string) || 'N/A'}, `,
        Question 3 (5-Year Vision):, ${(answers[3] as string) || 'N/A'}, `,
        Question 4 (Project Built):, ${(answers[4] as string) || 'N/A'}, `,
        Question 5 (Hardest Technical/Operational Problem):, ${(answers[5] as string) || 'N/A'}, `,
        Question 6 (Speed vs Responsibility):, ${(answers[6] as string) || 'N/A'}, `,
        Question 7 (First Improvement to MEDVAI):, ${(answers[7] as string) || 'N/A'}, `,
        Question 8 (Strongest Role Focus):, ${(answers[8] as string) || 'N/A'}, `,
        Question 9 (Tech Stack / Skills):, ${Array.isArray(answers[9]) ? answers[9].join(', ') : ((answers[9] as string) || 'N/A')}, `,
        Question 10 (Weekly Hours Commitment):, ${(answers[10] as string) || 'N/A'}, `,
        Question 11 (Startup Experience):, ${(answers[11] as string) || 'N/A'}, `,
        Question 12 (Primary Motivation):, ${(answers[12] as string) || 'N/A'}, `,
        Question 13 (Resilience Under Stress):, ${(answers[13] as string) || 'N/A'}, `,
        Question 14 (Why Should We Trust You):, ${(answers[14] as string) || 'N/A'}, `,
        Question 15 (Extra Notes / Questions):, ${(answers[15] as string) || 'N/A'}, `
      );
    }
    
    emailBodyLines.push(
      ====================================,
      Sent automatically via MEDVAI Application Portal
    );'''

content = content.replace(email_block_old, email_block_new)

with open('src/components/ApplicationModal.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
