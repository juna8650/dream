import { useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Compass,
  Copy,
  Lightbulb,
  MessageSquarePlus,
} from 'lucide-react';
import { JOB_FIELDS, JOB_PRESETS, WORKSHEET_CATEGORIES } from '../data/curriculum';
import { StudentWorkspaceState } from '../types/lesson';
import { copyTextToClipboard } from '../utils/clipboard';
import { buildStage1Prompt } from '../utils/promptBuilders';
import { PromptPreviewPanel } from './PromptPreviewPanel';

interface Stage1JobExploreProps {
  state: StudentWorkspaceState;
  onUpdate: (patch: Partial<StudentWorkspaceState>) => void;
  onNextStage: () => void;
}

export function Stage1JobExplore({
  state,
  onUpdate,
  onNextStage,
}: Stage1JobExploreProps) {
  const [showWordHelper, setShowWordHelper] = useState(false);
  const [activeSlot, setActiveSlot] = useState<0 | 1 | 2>(0);
  const [followUpJob, setFollowUpJob] = useState(state.chosenJob || '');
  const [copiedFollowUp, setCopiedFollowUp] = useState<'retry' | 'detail' | null>(null);

  const promptText = buildStage1Prompt(state);

  const handleKeywordChange = (index: 0 | 1 | 2, value: string) => {
    const next: [string, string, string] = [...state.keywords] as [string, string, string];
    next[index] = value;
    onUpdate({
      keywords: next,
      profileKeywords: next.filter((k) => k.trim()).join(', '),
    });
  };

  const handlePickWorksheetWord = (word: string) => {
    handleKeywordChange(activeSlot, word);
    setActiveSlot(((activeSlot + 1) % 3) as 0 | 1 | 2);
  };

  const handleCopyFollowUp = async (type: 'retry' | 'detail', text: string) => {
    const ok = await copyTextToClipboard(text);
    if (ok) {
      setCopiedFollowUp(type);
      window.setTimeout(() => setCopiedFollowUp(null), 2000);
    }
  };

  const retryPrompt =
    '추천한 직업이 너무 어려워. 중학생이 쉽게 이해할 수 있는 말로 다시 설명해 줘. 방금 추천한 직업을 제외하고 내 핵심 키워드와 관련된 새로운 직업 3개를 더 추천해 줘.';
  const detailPrompt = `나는 ${followUpJob.trim() || '[관심 직업]'}라는 직업이 가장 궁금해. 어떤 일을 하고, 어떤 능력이 필요하며, 지금부터 무엇을 준비하면 좋을지 알려줘.`;

  return (
    <div className="space-y-6">
      {/* 4가지 질문 비법 요약 */}
      <div className="bg-white/95 border border-amber-200/80 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-amber-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100/80 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
              <Lightbulb className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs font-semibold text-amber-700">
                1단계 · ChatGPT 활용 · 나의 핵심 키워드로 미래 직업 탐색하기
              </span>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">
                AI에게 질문을 잘하는 4가지 방법
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowWordHelper((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors self-start sm:self-auto whitespace-nowrap"
          >
            <span>활동지 단어 찾기 도우미</span>
            {showWordHelper ? (
              <ChevronUp className="w-4 h-4" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 text-sm">
          <div>
            <div className="font-semibold text-slate-900">1. 역할 정하기</div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              “너는 누구야?” — 중학생 진로 탐색을 도와주는 친절한 선생님 역할 부여
            </p>
          </div>
          <div>
            <div className="font-semibold text-slate-900">2. 나의 정보 알려주기</div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              “나는 어떤 사람이야?” — 나의 관심사와 강점 핵심 키워드 3가지 입력
            </p>
          </div>
          <div>
            <div className="font-semibold text-slate-900">3. 원하는 것 요청하기</div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              “무엇을 해줘?” — 관심 분야와 어울리는 미래 직업 5가지 추천 요청
            </p>
          </div>
          <div>
            <div className="font-semibold text-slate-900">4. 답변 방법 정하기</div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              “어떻게 알려줘?” — 중학생 눈높이 설명과 보기 쉬운 표 정리 요청
            </p>
          </div>
        </div>

        {showWordHelper && (
          <div className="mt-5 pt-5 border-t border-sky-100">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  나를 표현하는 단어 찾기 (활동지 예시)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  채울 번호를 고른 뒤, 마음에 드는 단어를 클릭하면 핵심 키워드에 바로 들어갑니다.
                </p>
              </div>
              <div className="flex items-center gap-1 p-1 bg-sky-50 border border-sky-200 rounded-lg">
                {([0, 1, 2] as const).map((idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSlot(idx)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      activeSlot === idx
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    키워드 {idx + 1} 채우기
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {WORKSHEET_CATEGORIES.map((category) => (
                <div key={category.id} className="pt-2">
                  <div className="text-xs font-semibold text-slate-700 mb-2">
                    {category.title}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.words.map((word) => {
                      const isSelected = state.keywords.includes(word);
                      return (
                        <button
                          key={word}
                          type="button"
                          onClick={() => handlePickWorksheetWord(word)}
                          className={`px-2.5 py-1.5 text-xs rounded-md border transition-colors ${
                            isSelected
                              ? 'bg-sky-600 border-sky-600 text-white font-medium'
                              : 'bg-sky-50/50 border-sky-200/80 text-slate-700 hover:bg-sky-100/70'
                          }`}
                        >
                          {word}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main 2-Zone Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone: Writing Area (Crisp White + Multi-tone Pastel Accents) */}
        <div className="lg:col-span-7 bg-white border-2 border-sky-300 rounded-2xl p-5 sm:p-6 space-y-6 shadow-sm">
          <div className="flex items-start gap-3 pb-4 border-b border-sky-100">
            <div className="w-10 h-10 rounded-xl bg-sky-100 border border-sky-200 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
              <Compass className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs font-semibold text-sky-700 block mb-0.5">
                작성 영역 · 내 키워드와 관심사 입력
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                핵심 키워드로 직업 탐색 프롬프트 생성기
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                키워드 3개와 관심 분야를 입력하면 오른쪽 완성된 프롬프트가 실시간으로 바뀝니다.
              </p>
            </div>
          </div>

          {/* 3-Column Multi-Pastel Keyword Inputs */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900">
                1. 나의 핵심 키워드 3가지
              </span>
              <span className="text-xs text-slate-400">성격 · 강점 · 좋아하는 일</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {([0, 1, 2] as const).map((idx) => {
                const cardStyles = [
                  'bg-sky-50/75 border-sky-300 focus-within:border-sky-600 focus-within:ring-sky-500/15',
                  'bg-rose-50/75 border-rose-300 focus-within:border-rose-500 focus-within:ring-rose-400/15',
                  'bg-amber-50/75 border-amber-300 focus-within:border-amber-500 focus-within:ring-amber-500/15',
                ][idx];
                const labelStyles = ['text-sky-800', 'text-rose-800', 'text-amber-800'][idx];
                const numStyles = ['text-sky-500', 'text-rose-500', 'text-amber-600'][idx];
                const inputBorder = [
                  'border-sky-300 focus:border-sky-600',
                  'border-rose-300 focus:border-rose-500',
                  'border-amber-300 focus:border-amber-500',
                ][idx];

                return (
                  <div
                    key={idx}
                    className={`border-[1.5px] rounded-xl p-3 focus-within:bg-white focus-within:ring-2 transition-all ${cardStyles}`}
                  >
                    <label
                      htmlFor={`stage1-kw-${idx}`}
                      className={`flex items-center justify-between text-xs font-semibold mb-1.5 ${labelStyles}`}
                    >
                      <span>키워드 {idx + 1}</span>
                      <span className={`font-mono tabular-nums ${numStyles}`}>
                        0{idx + 1}
                      </span>
                    </label>
                    <input
                      id={`stage1-kw-${idx}`}
                      type="text"
                      value={state.keywords[idx]}
                      onChange={(e) => handleKeywordChange(idx, e.target.value)}
                      placeholder={
                        idx === 0
                          ? '예: 게임하기'
                          : idx === 1
                            ? '예: 그림 그리기'
                            : '예: 창의성'
                      }
                      className={`w-full px-2.5 py-2 text-sm font-medium bg-white border-[1.5px] rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none ${inputBorder}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interest Field Grid */}
          <div className="pt-5 border-t border-sky-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900">
                2. 관심 있는 분야 선택
              </span>
              <span className="text-xs text-sky-700 font-medium">
                {state.jobField}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {JOB_FIELDS.map((field) => {
                const active = state.jobField === field;
                return (
                  <button
                    key={field}
                    type="button"
                    onClick={() => onUpdate({ jobField: field })}
                    className={`px-3 py-2.5 text-xs font-medium rounded-lg border text-left transition-colors flex items-center justify-between gap-2 ${
                      active
                        ? 'bg-sky-600 border-sky-600 text-white font-semibold shadow-xs'
                        : 'bg-sky-50/35 border-slate-300 text-slate-700 hover:bg-sky-50 hover:border-sky-400'
                    }`}
                  >
                    <span className="truncate">{field}</span>
                    {active && <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 선택한 미래 직업 기록 -> 2,3,4단계 자동 연동 */}
          <div className="pt-5 border-t border-sky-100 space-y-3">
            <label
              htmlFor="chosen-job-input"
              className="block text-sm font-bold text-slate-900"
            >
              3. AI 추천 중 내가 선택한 미래 직업 (다음 단계로 자동 연결됩니다)
            </label>
            <input
              id="chosen-job-input"
              type="text"
              value={state.chosenJob}
              onChange={(e) => onUpdate({ chosenJob: e.target.value })}
              placeholder="예: 게임 개발자, 수의사, 웹툰 작가"
              className="w-full px-3.5 py-2.5 text-sm bg-white border-[1.5px] border-sky-300 rounded-lg text-slate-900 focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-500/15"
            />
            <div className="flex flex-wrap gap-1.5">
              {JOB_PRESETS.slice(0, 6).map((preset) => (
                <button
                  key={preset.job}
                  type="button"
                  onClick={() =>
                    onUpdate({
                      chosenJob: preset.job,
                    })
                  }
                  className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                    state.chosenJob === preset.job
                      ? 'bg-sky-600 border-sky-600 text-white font-medium'
                      : 'bg-sky-50/40 border-slate-300 text-slate-700 hover:bg-sky-100/60'
                  }`}
                >
                  {preset.job}
                </button>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={onNextStage}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors whitespace-nowrap"
              >
                <span>2단계: 20년 후 미래 상상하기로 이동</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Zone: Distinct Dark Studio Prompt Output */}
        <div className="lg:col-span-5">
          <PromptPreviewPanel
            title="완성된 1단계 프롬프트"
            subtitle="복사 버튼을 눌러 ChatGPT에 바로 붙여넣으세요."
            promptText={promptText}
            copyLabel="1단계 프롬프트 복사"
            toolLink="chatgpt"
          />
        </div>
      </div>

      {/* Separate Optional Follow-up Section (Slide 16) */}
      <section
        aria-label="선택 활동 추가 질문"
        className="bg-violet-50/80 border border-violet-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-violet-200/70">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-100 border border-violet-200 text-violet-700 flex items-center justify-center shrink-0 mt-0.5">
              <MessageSquarePlus className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs font-semibold text-violet-700 block">
                선택 활동 · ChatGPT 답변을 받은 뒤 필요할 때만 사용하세요
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                AI 답변이 마음에 들지 않으면? 추가 질문하기
              </h3>
            </div>
          </div>
          <span className="text-xs text-violet-700/80 font-medium self-start sm:self-center">
            필수 입력 항목이 아닙니다
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-violet-200/80 rounded-xl p-4 flex flex-col justify-between gap-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-900">
                  예시 1. 더 쉬운 말로 새로운 직업 3개 추천받기
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyFollowUp('retry', retryPrompt)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-violet-50 border border-violet-200 rounded-md hover:bg-violet-100 whitespace-nowrap"
                >
                  {copiedFollowUp === 'retry' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                      <span className="text-emerald-700">복사됨</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>복사</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{retryPrompt}</p>
            </div>
          </div>

          <div className="bg-white border border-violet-200/80 rounded-xl p-4 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-900">
                예시 2. 관심 직업 하나 정해서 자세히 물어보기
              </span>
              <button
                type="button"
                onClick={() => handleCopyFollowUp('detail', detailPrompt)}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-violet-50 border border-violet-200 rounded-md hover:bg-violet-100 whitespace-nowrap"
              >
                {copiedFollowUp === 'detail' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                    <span className="text-emerald-700">복사됨</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>복사</span>
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="followup-job" className="text-xs text-slate-600 shrink-0">
                궁금한 직업:
              </label>
              <input
                id="followup-job"
                type="text"
                value={followUpJob}
                onChange={(e) => setFollowUpJob(e.target.value)}
                placeholder="예: 캐릭터 디자이너"
                className="flex-1 px-2.5 py-1.5 text-xs bg-violet-50/40 border border-violet-200 rounded-md focus:bg-white focus:outline-none focus:border-violet-500"
              />
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{detailPrompt}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
