import { BookOpen, IdCard, LayoutGrid, RotateCcw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { COLOR_THEMES, PROFILE_CARD_EXAMPLES } from '../data/curriculum';
import {
  COLOR_THEME_EN,
  PROFILE_CARD_EXAMPLES_EN,
  translateValue,
} from '../i18n/translations';
import { ProfileCardExample, StudentWorkspaceState } from '../types/lesson';
import { buildStage4Prompt } from '../utils/promptBuilders';
import { PromptPreviewPanel } from './PromptPreviewPanel';

interface Stage4ProfileCardProps {
  state: StudentWorkspaceState;
  onUpdate: (patch: Partial<StudentWorkspaceState>) => void;
  onOpenExamples: (exampleId?: string) => void;
}

export function Stage4ProfileCard({
  state,
  onUpdate,
  onOpenExamples,
}: Stage4ProfileCardProps) {
  const { lang } = useLanguage();
  const promptText = buildStage4Prompt(state, lang);

  const applyExample = (ex: ProfileCardExample) => {
    const enEx = lang === 'en' ? PROFILE_CARD_EXAMPLES_EN[ex.id] : undefined;
    const source = enEx ?? ex;
    onUpdate({
      studentName: source.studentName,
      chosenJob: source.jobTitle,
      studentAge: source.age,
      mbti: ex.mbti,
      motto: source.motto,
      profileKeywords: source.keywords.join(', '),
      likes: source.likes.join(', '),
      strengths: [
        source.strengths[0] ?? '',
        source.strengths[1] ?? '',
        source.strengths[2] ?? '',
      ],
      goals: [
        source.goals[0] ?? '',
        source.goals[1] ?? '',
        source.goals[2] ?? '',
      ],
      pledge: source.pledge,
      messageToFuture: source.messageToFuture,
      colorTheme: ex.colorTheme,
    });
  };

  const handleResetStage4 = () => {
    onUpdate({
      studentName: '',
      chosenJob: '',
      studentAge: '',
      mbti: '',
      motto: '',
      profileKeywords: '',
      likes: '',
      strengths: ['', '', ''],
      aiViewAuto: true,
      aiViewCustom: '',
      goals: ['', '', ''],
      pledge: '',
      messageToFuture: '',
      colorTheme: '',
      designIcons: '',
    });
  };

  const updateArrayItem = (
    field: 'strengths' | 'goals',
    index: 0 | 1 | 2,
    value: string
  ) => {
    const next: [string, string, string] = [...state[field]] as [string, string, string];
    next[index] = value;
    onUpdate({ [field]: next });
  };

  return (
    <div className="space-y-6">
      {/* Top Example Quick-Load & PDF Reference Banner */}
      <div className="bg-white/95 border border-amber-200/90 rounded-2xl p-5 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <LayoutGrid className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs font-semibold text-amber-700">
                {lang === 'en'
                  ? 'Step 4 · ChatGPT · Create “My Future Profile Card”'
                  : '4단계 · ChatGPT 활용 · ‘나의 미래 프로필 카드’ 만들기'}
              </span>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">
                {lang === 'en'
                  ? 'Example Reference & Quick Fill (12 Careers)'
                  : '예시 자료 참고 및 빠른 불러오기 (12종)'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {lang === 'en'
                  ? 'Click any career example to load its structure, then customize it with your own name and details.'
                  : '직업 예시를 눌러 구조를 참고한 뒤, 내 이름과 내용으로 고쳐서 사용하세요.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onOpenExamples()}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors self-start sm:self-auto whitespace-nowrap shrink-0"
          >
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            <span>
              {lang === 'en'
                ? 'View All PDF Poster Examples'
                : '예시 PDF 포스터 전체 보기'}
            </span>
          </button>
        </div>

        <div className="flex flex-nowrap items-center justify-between gap-1 pt-2 border-t border-amber-100 overflow-x-auto">
          {PROFILE_CARD_EXAMPLES.map((ex) => {
            const jobTitle =
              lang === 'en'
                ? (PROFILE_CARD_EXAMPLES_EN[ex.id]?.jobTitle ?? ex.jobTitle)
                : ex.jobTitle;
            return (
              <button
                key={ex.id}
                type="button"
                onClick={() => applyExample(ex)}
                className="px-2 py-1.5 text-[12px] font-medium bg-amber-50/65 border border-amber-200/80 rounded-md text-slate-700 hover:bg-amber-500 hover:border-amber-500 hover:text-slate-950 transition-colors whitespace-nowrap shrink-0"
              >
                {ex.number}. {jobTitle}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 2-Zone Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 bg-white border-2 border-amber-300 rounded-2xl p-5 sm:p-6 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                <IdCard className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-semibold text-amber-700 block mb-0.5">
                  {lang === 'en'
                    ? 'Input Area · Fill Your Profile Card'
                    : '작성 영역 · 프로필 카드 내용 채우기'}
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  {lang === 'en'
                    ? 'Enter Your Profile Card Details'
                    : '내 프로필 카드 정보 입력하기'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {lang === 'en'
                    ? 'Fill in the sections below to complete your student portfolio poster prompt.'
                    : '모든 빈칸을 채워 나만의 학생 포트폴리오 포스터 프롬프트를 완성하세요.'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleResetStage4}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-200/70 transition-colors self-start sm:self-center whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{lang === 'en' ? 'Reset Fields' : '입력 내용 초기화'}</span>
            </button>
          </div>

          {/* 기본 정보 */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'en' ? '1. Basic Info' : '1. 기본 정보'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="s4-name"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  {lang === 'en' ? 'Name' : '이름'}
                </label>
                <input
                  id="s4-name"
                  type="text"
                  value={state.studentName}
                  onChange={(e) => onUpdate({ studentName: e.target.value })}
                  placeholder={lang === 'en' ? 'e.g., Haneul Kim' : '예: 김하늘'}
                  className="w-full px-3.5 py-2 text-sm bg-white border-[1.5px] border-slate-400/80 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
                />
              </div>
              <div>
                <label
                  htmlFor="s4-job"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  {lang === 'en' ? 'Future Career' : '미래 직업'}
                </label>
                <input
                  id="s4-job"
                  type="text"
                  value={state.chosenJob}
                  onChange={(e) => onUpdate({ chosenJob: e.target.value })}
                  placeholder={lang === 'en' ? 'e.g., Game Developer' : '예: 게임 개발자'}
                  className="w-full px-3.5 py-2 text-sm bg-white border-[1.5px] border-slate-400/80 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
                />
              </div>
              <div>
                <label
                  htmlFor="s4-age"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  {lang === 'en' ? 'Age' : '나이'}
                </label>
                <input
                  id="s4-age"
                  type="text"
                  value={state.studentAge}
                  onChange={(e) => onUpdate({ studentAge: e.target.value })}
                  placeholder={lang === 'en' ? 'e.g., 15' : '예: 15세'}
                  className="w-full px-3.5 py-2 text-sm bg-white border-[1.5px] border-slate-400/80 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
                />
              </div>
              <div>
                <label
                  htmlFor="s4-mbti"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  MBTI
                </label>
                <input
                  id="s4-mbti"
                  type="text"
                  value={state.mbti}
                  onChange={(e) => onUpdate({ mbti: e.target.value })}
                  placeholder={lang === 'en' ? 'e.g., ENTP' : '예: ENTP'}
                  className="w-full px-3.5 py-2 text-sm bg-white border-[1.5px] border-slate-400/80 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="s4-motto"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                {lang === 'en' ? 'Motto' : '좌우명'}
              </label>
              <input
                id="s4-motto"
                type="text"
                value={state.motto}
                onChange={(e) => onUpdate({ motto: e.target.value })}
                placeholder={
                  lang === 'en'
                    ? 'e.g., Give my best in everything I do!'
                    : '예: 모든 일에 최선을 다하자!'
                }
                className="w-full px-3.5 py-2 text-sm bg-white border-[1.5px] border-slate-400/80 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
              />
            </div>
          </div>

          {/* 키워드 & 좋아하는 것 */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'en' ? '2. Keywords & Interests' : '2. 키워드와 관심사'}
            </h3>
            <div>
              <label
                htmlFor="s4-keywords"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                {lang === 'en'
                  ? 'Keywords That Describe Me (comma-separated)'
                  : '나를 표현하는 키워드 (쉼표로 구분)'}
              </label>
              <input
                id="s4-keywords"
                type="text"
                value={state.profileKeywords}
                onChange={(e) => onUpdate({ profileKeywords: e.target.value })}
                placeholder={
                  lang === 'en'
                    ? 'e.g., Creativity, Problem-solving, Teamwork, Perseverance'
                    : '예: 창의력, 문제해결력, 협동심, 끈기'
                }
                className="w-full px-3.5 py-2 text-sm bg-white border-[1.5px] border-slate-400/80 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
              />
            </div>
            <div>
              <label
                htmlFor="s4-likes"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                {lang === 'en'
                  ? 'Things I Like (comma-separated)'
                  : '좋아하는 것 (쉼표로 구분)'}
              </label>
              <input
                id="s4-likes"
                type="text"
                value={state.likes}
                onChange={(e) => onUpdate({ likes: e.target.value })}
                placeholder={
                  lang === 'en'
                    ? 'e.g., Gaming, Watching movies, Character design, Reading webtoons'
                    : '예: 게임하기, 영화감상, 캐릭터 디자인, 웹툰 보기'
                }
                className="w-full px-3.5 py-2 text-sm bg-white border-[1.5px] border-slate-400/80 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
              />
            </div>
          </div>

          {/* 나의 강점 BEST */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'en' ? '3. My Top 3 Strengths' : '3. 나의 강점 BEST (3가지)'}
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {([0, 1, 2] as const).map((idx) => (
                <input
                  key={idx}
                  type="text"
                  aria-label={
                    lang === 'en' ? `My Strength ${idx + 1}` : `나의 강점 ${idx + 1}`
                  }
                  value={state.strengths[idx]}
                  onChange={(e) => updateArrayItem('strengths', idx, e.target.value)}
                  placeholder={lang === 'en' ? `Strength ${idx + 1}` : `강점 ${idx + 1}`}
                  className="w-full px-3.5 py-2 text-sm bg-white border-[1.5px] border-slate-400/80 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
                />
              ))}
            </div>
          </div>

          {/* AI가 본 나의 모습 */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'en' ? '4. How AI Sees Me' : '4. AI가 본 나의 모습'}
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onUpdate({ aiViewAuto: true })}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors ${
                  state.aiViewAuto
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {lang === 'en'
                  ? 'Let AI write 3–4 lines automatically'
                  : 'AI가 자동으로 3~4줄 작성하게 하기'}
              </button>
              <button
                type="button"
                onClick={() => onUpdate({ aiViewAuto: false })}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors ${
                  !state.aiViewAuto
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {lang === 'en' ? 'Write my own description' : '내가 직접 문구 작성하기'}
              </button>
            </div>
            {!state.aiViewAuto && (
              <textarea
                rows={3}
                value={state.aiViewCustom}
                onChange={(e) => onUpdate({ aiViewCustom: e.target.value })}
                placeholder={
                  lang === 'en'
                    ? 'e.g., A bold creator who keeps learning and brings joy to players around the world!'
                    : '예: 끊임없이 도전하며 사람들에게 즐거움을 전하는 멋진 개발자가 될 가능성이 높아요!'
                }
                className="w-full px-3.5 py-2 text-sm bg-white border-[1.5px] border-slate-400/80 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
              />
            )}
          </div>

          {/* 미래 목표, 다짐, 한마디 */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'en'
                ? '5. Future Goals · My Pledge · Message to Future Self'
                : '5. 미래 목표 · 앞으로의 다짐 · 미래의 나에게 한마디'}
            </h3>
            <div className="space-y-2">
              <span className="block text-xs font-semibold text-slate-700">
                {lang === 'en' ? 'Future Goals (3 items)' : '미래 목표 (3가지)'}
              </span>
              {([0, 1, 2] as const).map((idx) => (
                <input
                  key={idx}
                  type="text"
                  aria-label={
                    lang === 'en'
                      ? `Future Goal ${idx + 1}`
                      : `미래 목표 ${idx + 1}`
                  }
                  value={state.goals[idx]}
                  onChange={(e) => updateArrayItem('goals', idx, e.target.value)}
                  placeholder={
                    lang === 'en'
                      ? `Future Goal ${idx + 1}`
                      : `미래 목표 ${idx + 1}`
                  }
                  className="w-full px-3.5 py-2 text-sm bg-white border-[1.5px] border-slate-400/80 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
                />
              ))}
            </div>
            <div>
              <label
                htmlFor="s4-pledge"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                {lang === 'en' ? 'My Pledge' : '앞으로의 다짐'}
              </label>
              <textarea
                id="s4-pledge"
                rows={2}
                value={state.pledge}
                onChange={(e) => onUpdate({ pledge: e.target.value })}
                placeholder={
                  lang === 'en'
                    ? 'e.g., I will keep learning and challenging myself every day.'
                    : '예: 매일 배우고 도전하면서 멋진 전문가가 되겠습니다.'
                }
                className="w-full px-3.5 py-2 text-sm bg-white border-[1.5px] border-slate-400/80 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
              />
            </div>
            <div>
              <label
                htmlFor="s4-msg"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                {lang === 'en'
                  ? 'A Message to My Future Self'
                  : '미래의 나에게 한마디'}
              </label>
              <textarea
                id="s4-msg"
                rows={2}
                value={state.messageToFuture}
                onChange={(e) => onUpdate({ messageToFuture: e.target.value })}
                placeholder={
                  lang === 'en'
                    ? 'e.g., Every small step today builds the awesome future you!'
                    : '예: 오늘의 작은 노력이 미래의 멋진 나를 만들어 줄 거야!'
                }
                className="w-full px-3.5 py-2 text-sm bg-white border-[1.5px] border-slate-400/80 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
              />
            </div>
          </div>

          {/* 디자인 조건 */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'en' ? '6. Design Settings' : '6. 디자인 조건'}
            </h3>
            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-2">
                {lang === 'en' ? 'Poster Color Theme' : '포스터 색상 분위기'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {COLOR_THEMES.map((theme) => (
                  <button
                    key={theme}
                    type="button"
                    onClick={() => onUpdate({ colorTheme: theme })}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border text-left transition-colors ${
                      state.colorTheme === theme
                        ? 'bg-blue-50 border-blue-600 text-blue-800 font-semibold'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {translateValue(theme, COLOR_THEME_EN, lang)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Zone */}
        <div className="lg:col-span-5">
          <PromptPreviewPanel
            title={
              lang === 'en'
                ? 'Completed Step 4 Profile Card Prompt'
                : '완성된 4단계 프로필 카드 프롬프트'
            }
            subtitle={
              lang === 'en'
                ? 'Upload your Step 3 character to ChatGPT first, then paste this prompt.'
                : '3단계 캐릭터를 ChatGPT에 먼저 올린 뒤 입력한 프롬프트를 붙여넣으세요.'
            }
            promptText={promptText}
            copyLabel={
              lang === 'en' ? 'Copy Step 4 Prompt' : '4단계 프롬프트 복사'
            }
            toolLink="chatgpt"
            accent="amber"
          />
        </div>
      </div>
    </div>
  );
}

