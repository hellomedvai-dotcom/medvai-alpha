import re

with open('src/components/ApplicationModal.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add isVideoEditor
content = content.replace('  const totalQuestions = 15;', '''  const isVideoEditor = details.role === 'Video Editor';
  const totalQuestions = isVideoEditor ? 7 : 15;
  const finalQuestionStep = isVideoEditor ? 8 : 16;
  const confirmationStep = isVideoEditor ? 9 : 17;''')

# Update handleNext
content = content.replace('''    if (step < 16) {
      setStep(prev => prev + 1);
    } else if (step === 16) {
      submitApplication();
    }''', '''    if (step < finalQuestionStep) {
      setStep(prev => prev + 1);
    } else if (step === finalQuestionStep) {
      submitApplication();
    }''')

# Update step < 17 in render
content = content.replace('step < 17 && (', 'step < confirmationStep && (')
content = content.replace('step === 17 ? 100 : Math.round((step / 16) * 100)', 'step === confirmationStep ? 100 : Math.round((step / finalQuestionStep) * 100)')
content = content.replace('setStep(17);', 'setStep(confirmationStep);')
content = content.replace('step === 16 ? (', 'step === finalQuestionStep ? (')
content = content.replace('step === 17 && (', 'step === confirmationStep && (')

with open('src/components/ApplicationModal.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
