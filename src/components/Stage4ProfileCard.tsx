import { BookOpen, IdCard, LayoutGrid, RotateCcw } from 'lucide-react';
import { COLOR_THEMES, PROFILE_CARD_EXAMPLES } from '../data/curriculum';
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
  const promptText = buildStage4Prompt(state);

  const applyExample = (ex: ProfileCardExample) => {
    onUpdate({
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
                4단계 · ChatGPT 활용 · ‘나의 미래 프로필 카드’ 만들기
              </span>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">
                예시 자료 참고 및 빠른 불러오기 (12종)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                직업 예시를 눌러 구조를 참고한 뒤, 내 이름과 내용으로 고쳐서 사용하세요.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onOpenExamples()}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors self-start sm:self-auto whitespace-nowrap shrink-0"
          >
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            <span>예시 PDF 포스터 전체 보기</span>
          </button>
        </div>

        <div className="flex flex-nowrap items-center justify-between gap-1 pt-2 border-t border-amber-100 overflow-x-auto">
          {PROFILE_CARD_EXAMPLES.map((ex) => (
            <button
              key={ex.id}
              type="button"
              onClick={() => applyExample(ex)}
              className="px-2 py-1.5 text-[11px] font-medium bg-amber-50/65 border border-amber-200/80 rounded-md text-slate-700 hover:bg-amber-500 hover:border-amber-500 hover:text-slate-950 transition-colors whitespace-nowrap shrink-0"
            >
              {ex.number}. {ex.jobTitle}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Zone Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 bg-white border border-amber-200/90 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                <IdCard className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-semibold text-amber-700 block mb-0.5">
                  작성 영역 · 프로필 카드 내용 채우기
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  내 프로필 카드 정보 입력하기
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  모든 빈칸을 채워 나만의 학생 포트폴리오 포스터 프롬프트를 완성하세요.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleResetStage4}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-200/70 transition-colors self-start sm:self-center whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>입력 내용 초기화</span>
            </button>
          </div>

          {/* 기본 정보 */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">1. 기본 정보</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="s4-name"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  이름
                </label>
                <input
                  id="s4-name"
                  type="text"
                  value={state.studentName}
                  onChange={(e) => onUpdate({ studentName: e.target.value })}
                  placeholder="예: 김하늘"
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label
                  htmlFor="s4-job"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  미래 직업
                </label>
                <input
                  id="s4-job"
                  type="text"
                  value={state.chosenJob}
                  onChange={(e) => onUpdate({ chosenJob: e.target.value })}
                  placeholder="예: 게임 개발자"
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label
                  htmlFor="s4-age"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  나이
                </label>
                <input
                  id="s4-age"
                  type="text"
                  value={state.studentAge}
                  onChange={(e) => onUpdate({ studentAge: e.target.value })}
                  placeholder="예: 15세"
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
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
                  placeholder="예: ENTP"
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="s4-motto"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                좌우명
              </label>
              <input
                id="s4-motto"
                type="text"
                value={state.motto}
                onChange={(e) => onUpdate({ motto: e.target.value })}
                placeholder="예: 모든 일에 최선을 다하자!"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* 키워드 & 좋아하는 것 */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">2. 키워드와 관심사</h3>
            <div>
              <label
                htmlFor="s4-keywords"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                나를 표현하는 키워드 (쉼표로 구분)
              </label>
              <input
                id="s4-keywords"
                type="text"
                value={state.profileKeywords}
                onChange={(e) => onUpdate({ profileKeywords: e.target.value })}
                placeholder="예: 창의력, 문제해결력, 협동심, 끈기"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label
                htmlFor="s4-likes"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                좋아하는 것 (쉼표로 구분)
              </label>
              <input
                id="s4-likes"
                type="text"
                value={state.likes}
                onChange={(e) => onUpdate({ likes: e.target.value })}
                placeholder="예: 게임하기, 영화감상, 캐릭터 디자인, 웹툰 보기"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* 나의 강점 BEST */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h3 className="text-sm font-bold text-slate-900">3. 나의 강점 BEST (3가지)</h3>
            <div className="grid grid-cols-1 gap-2.5">
              {([0, 1, 2] as const).map((idx) => (
                <input
                  key={idx}
                  type="text"
                  aria-label={`나의 강점 ${idx + 1}`}
                  value={state.strengths[idx]}
                  onChange={(e) => updateArrayItem('strengths', idx, e.target.value)}
                  placeholder={`강점 ${idx + 1}`}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              ))}
            </div>
          </div>

          {/* AI가 본 나의 모습 */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <h3 className="text-sm font-bold text-slate-900">4. AI가 본 나의 모습</h3>
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
                AI가 자동으로 3~4줄 작성하게 하기
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
                내가 직접 문구 작성하기
              </button>
            </div>
            {!state.aiViewAuto && (
              <textarea
                rows={3}
                value={state.aiViewCustom}
                onChange={(e) => onUpdate({ aiViewCustom: e.target.value })}
                placeholder="예: 끊임없이 도전하며 사람들에게 즐거움을 전하는 멋진 개발자가 될 가능성이 높아요!"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            )}
          </div>

          {/* 미래 목표, 다짐, 한마디 */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              5. 미래 목표 · 앞으로의 다짐 · 미래의 나에게 한마디
            </h3>
            <div className="space-y-2">
              <span className="block text-xs font-semibold text-slate-700">
                미래 목표 (3가지)
              </span>
              {([0, 1, 2] as const).map((idx) => (
                <input
                  key={idx}
                  type="text"
                  aria-label={`미래 목표 ${idx + 1}`}
                  value={state.goals[idx]}
                  onChange={(e) => updateArrayItem('goals', idx, e.target.value)}
                  placeholder={`미래 목표 ${idx + 1}`}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              ))}
            </div>
            <div>
              <label
                htmlFor="s4-pledge"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                앞으로의 다짐
              </label>
              <textarea
                id="s4-pledge"
                rows={2}
                value={state.pledge}
                onChange={(e) => onUpdate({ pledge: e.target.value })}
                placeholder="예: 매일 배우고 도전하면서 멋진 전문가가 되겠습니다."
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label
                htmlFor="s4-msg"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                미래의 나에게 한마디
              </label>
              <textarea
                id="s4-msg"
                rows={2}
                value={state.messageToFuture}
                onChange={(e) => onUpdate({ messageToFuture: e.target.value })}
                placeholder="예: 오늘의 작은 노력이 미래의 멋진 나를 만들어 줄 거야!"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* 디자인 조건 */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">6. 디자인 조건</h3>
            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-2">
                포스터 색상 분위기
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
                    {theme}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Zone */}
        <div className="lg:col-span-5">
          <PromptPreviewPanel
            title="완성된 4단계 프로필 카드 프롬프트"
            subtitle="3단계 캐릭터를 ChatGPT에 먼저 올린 뒤 입력한 프롬프트를 붙여넣으세요."
            promptText={promptText}
            copyLabel="4단계 프롬프트 복사"
            toolLink="chatgpt"
            accent="amber"
          />
        </div>
      </div>
    </div>
  );
}
