import { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';
import { ExamplesGallery } from './components/ExamplesGallery';
import { Header } from './components/Header';
import { MentimeterModal } from './components/MentimeterModal';
import { Stage1JobExplore } from './components/Stage1JobExplore';
import { Stage2FutureImagine } from './components/Stage2FutureImagine';
import { Stage3CharacterDesign } from './components/Stage3CharacterDesign';
import { Stage4ProfileCard } from './components/Stage4ProfileCard';
import { StageStepper } from './components/StageStepper';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import {
  INITIAL_WORKSPACE_STATE,
  PROFILE_CARD_EXAMPLES,
} from './data/curriculum';
import {
  ActiveTab,
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

function InnerApp() {
  const { lang, setLang } = useLanguage();
  const [activeTab, setActiveTab] = useState<ActiveTab>('stage1');
  const [workspace, setWorkspace] = useState<StudentWorkspaceState>(loadInitialState);
  const [selectedExampleId, setSelectedExampleId] = useState<string>(
    PROFILE_CARD_EXAMPLES[0].id
  );
  const [mentimeterOpen, setMentimeterOpen] = useState(false);

  useEffect(() => {
    document.title =
      lang === 'en'
        ? 'My Future with AI — Career Prompt Generator'
        : 'AI와 함께 만드는 나의 미래 — 중학생 진로 프롬프트 생성기';
  }, [lang]);

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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#EEF6FF] via-[#FDF4F8] to-[#F2F7FF] text-slate-900">
      <Header
        onSelectTab={handleSelectTab}
        onOpenMentimeter={() => setMentimeterOpen(true)}
      />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
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
          />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p className="text-center sm:text-left">
            {lang === 'en'
              ? 'My Future with AI · Career Exploration Prompt Generator for Middle School Students'
              : 'AI와 함께 만드는 나의 미래 · 중학생 진로 탐색 수업용 프롬프트 생성기'}
          </p>

          <div
            role="group"
            aria-label={lang === 'en' ? 'Language setting' : '언어 설정'}
            className="inline-flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-lg shrink-0"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-0.5 shrink-0" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setLang('ko')}
              aria-pressed={lang === 'ko'}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                lang === 'ko'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              한국어
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                lang === 'en'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
          </div>
        </div>
      </footer>

      <MentimeterModal
        isOpen={mentimeterOpen}
        onClose={() => setMentimeterOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <InnerApp />
    </LanguageProvider>
  );
}

