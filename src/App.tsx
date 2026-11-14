import { useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { ExamplesGallery } from './components/ExamplesGallery';
import { Header } from './components/Header';
import { MentimeterModal } from './components/MentimeterModal';
import { Stage1JobExplore } from './components/Stage1JobExplore';
import { Stage2FutureImagine } from './components/Stage2FutureImagine';
import { Stage3CharacterDesign } from './components/Stage3CharacterDesign';
import { Stage4ProfileCard } from './components/Stage4ProfileCard';
import { StageStepper } from './components/StageStepper';
import { ToolkitModal } from './components/ToolkitModal';
import {
  INITIAL_WORKSPACE_STATE,
  PROFILE_CARD_EXAMPLES,
} from './data/curriculum';
import {
  ActiveTab,
  ProfileCardExample,
  StudentWorkspaceState,
} from './types/lesson';

const STORAGE_KEY = 'ai_future_career_lesson_v3';

function loadInitialState(): StudentWorkspaceState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_WORKSPACE_STATE;
    const parsed = JSON.parse(raw) as Partial<StudentWorkspaceState>;
    return { ...INITIAL_WORKSPACE_STATE, ...parsed };
  } catch {
    return INITIAL_WORKSPACE_STATE;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('stage1');
  const [workspace, setWorkspace] = useState<StudentWorkspaceState>(loadInitialState);
  const [selectedExampleId, setSelectedExampleId] = useState<string>(
    PROFILE_CARD_EXAMPLES[0].id
  );
  const [toolkitOpen, setToolkitOpen] = useState(false);
  const [mentimeterOpen, setMentimeterOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(workspace));
    } catch {
      // ignore storage quota errors
    }
  }, [workspace]);

  const handleUpdateWorkspace = (patch: Partial<StudentWorkspaceState>) => {
    setWorkspace((prev) => ({ ...prev, ...patch }));
  };

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenExamples = (exampleId?: string) => {
    if (exampleId) {
      setSelectedExampleId(exampleId);
    }
    handleSelectTab('examples');
  };

  const handleApplyExampleToStage4 = (ex: ProfileCardExample) => {
    handleUpdateWorkspace({
      studentName: ex.studentName,
      chosenJob: ex.jobTitle,
      studentAge: ex.age,
      mbti: ex.mbti,
      motto: ex.motto,
      profileKeywords: ex.keywords.join(', '),
      likes: ex.likes.join(', '),
      strengths: [
        ex.strengths[0] ?? '',
        ex.strengths[1] ?? '',
        ex.strengths[2] ?? '',
      ],
      goals: [ex.goals[0] ?? '', ex.goals[1] ?? '', ex.goals[2] ?? ''],
      pledge: ex.pledge,
      messageToFuture: ex.messageToFuture,
      colorTheme: ex.colorTheme,
    });
    handleSelectTab('stage4');
  };

  const handleResetWorkspace = () => {
    setWorkspace(INITIAL_WORKSPACE_STATE);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#EEF6FF] via-[#FDF4F8] to-[#F2F7FF] text-slate-900">
      <Header
        onSelectTab={handleSelectTab}
        onOpenMentimeter={() => setMentimeterOpen(true)}
      />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <StageStepper
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          keywords={workspace.keywords}
          chosenJob={workspace.chosenJob}
        />

        {activeTab === 'stage1' && (
          <Stage1JobExplore
            state={workspace}
            onUpdate={handleUpdateWorkspace}
            onNextStage={() => handleSelectTab('stage2')}
          />
        )}

        {activeTab === 'stage2' && (
          <Stage2FutureImagine
            state={workspace}
            onUpdate={handleUpdateWorkspace}
            onNextStage={() => handleSelectTab('stage3')}
          />
        )}

        {activeTab === 'stage3' && (
          <Stage3CharacterDesign
            state={workspace}
            onUpdate={handleUpdateWorkspace}
            onNextStage={() => handleSelectTab('stage4')}
          />
        )}

        {activeTab === 'stage4' && (
          <Stage4ProfileCard
            state={workspace}
            onUpdate={handleUpdateWorkspace}
            onOpenExamples={handleOpenExamples}
          />
        )}

        {activeTab === 'examples' && (
          <ExamplesGallery
            selectedExampleId={selectedExampleId}
            onSelectExampleId={setSelectedExampleId}
            onApplyToStage4={handleApplyExampleToStage4}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            AI와 함께 만드는 나의 미래 · 중학생 진로 탐색 수업용 프롬프트 생성기
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setToolkitOpen(true)}
              className="hover:text-slate-900 transition-colors"
            >
              수업 자료 및 공용 계정
            </button>
            <span aria-hidden="true" className="text-slate-300">|</span>
            <button
              type="button"
              onClick={handleResetWorkspace}
              className="inline-flex items-center gap-1 hover:text-slate-900 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>입력 내용 초기화</span>
            </button>
          </div>
        </div>
      </footer>

      <ToolkitModal
        isOpen={toolkitOpen}
        onClose={() => setToolkitOpen(false)}
      />
      <MentimeterModal
        isOpen={mentimeterOpen}
        onClose={() => setMentimeterOpen(false)}
      />
    </div>
  );
}
