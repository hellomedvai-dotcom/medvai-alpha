export type ThemeMode = 'dark' | 'light';

export interface WaitlistForm {
  email: string;
  role: 'Patient' | 'Physician' | 'Researcher' | 'Caregiver';
}

export interface ReportAnalysisResult {
  simplifiedTranslation: string;
  keyFindings: Array<{
    metric: string;
    value: string;
    status: 'Normal' | 'Slightly Elevated' | 'Low' | 'Optimal' | 'Attention';
    explanation: string;
  }>;
  questionsForDoctor: string[];
  calmSummaryNote: string;
}

export interface DoctorBriefResult {
  chiefComplaint: string;
  timeline: string;
  keyContext: string;
  suggestedClinicalFocus: string;
  questionsToAsk: string[];
}

export interface WorkspaceCard {
  id: string;
  title: string;
  category: string;
  iconName: string;
  badge?: string;
}
