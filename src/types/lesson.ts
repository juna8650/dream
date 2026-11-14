export type ActiveTab = 'stage1' | 'stage2' | 'stage3' | 'stage4' | 'examples';

export type GenderOption = '남자' | '여자' | '선택 안 함' | '';

export interface StudentWorkspaceState {
  // Stage 1: Core Keywords & Job Exploration
  keywords: [string, string, string];
  jobField: string;
  jobCount: 3 | 5;
  chosenJob: string;

  // Stage 2: 20 Years Later Future Imagine
  gender: GenderOption;
  workplace: string;
  workAction: string;
  mood: string;
  imageStyle: string;
  aspectRatio: 'A4 세로' | 'A4 가로' | '자유' | '';

  // Stage 3: Character Design
  stage3Mode: 'coach' | 'direct';
  includeExtendedStyle: boolean;
  charExpression: string;
  charProps: string;
  charAction: string;
  charStyle: string;

  // Stage 4: Profile Card
  studentName: string;
  studentAge: string;
  mbti: string;
  motto: string;
  profileKeywords: string;
  likes: string;
  strengths: [string, string, string];
  aiViewAuto: boolean;
  aiViewCustom: string;
  goals: [string, string, string];
  pledge: string;
  messageToFuture: string;
  colorTheme: string;
  designIcons: string;
}

export interface ProfileCardExample {
  id: string;
  number: number;
  jobTitle: string;
  pdfPromptPage: number;
  pdfPosterPage: number;
  studentName: string;
  age: string;
  mbti: string;
  motto: string;
  keywords: string[];
  likes: string[];
  strengths: string[];
  aiSummary: string;
  goals: string[];
  pledge: string;
  messageToFuture: string;
  colorTheme: string;
  designIcons: string;
  accentHex: string;
  rawPrompt: string;
}
