import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Palette, UserRound } from 'lucide-react';
import {
  JOB_PRESETS,
  STAGE3_EXPRESSIONS,
  STAGE3_STYLES,
} from '../data/curriculum';
import { GenderOption, StudentWorkspaceState } from '../types/lesson';
import {
  buildStage3CoachPrompt,
  buildStage3DirectPrompt,
} from '../utils/promptBuilders';
import { PromptPreviewPanel } from './PromptPreviewPanel';

interface Stage3CharacterDesignProps {
  state: StudentWorkspaceState;
  onUpdate: (patch: Partial<StudentWorkspaceState>) => void;
  onNextStage: () => void;
}

const QUESTION_STEPS = [
  { num: '1', title: '나의 꿈', desc: '핵심 키워드 3개 · 미래 직업 1개' },
  { num: '2', title: '외모', desc: '성별 · 피부색 · 얼굴형 · 헤어스타일' },
  { num: '3', title: '의상', desc: '직업에 어울리는 옷 선택' },
  { num: '4', title: '행동·소품', desc: '자세 1개 · 핵심 소품 1~2개' },
  { num: '5', title: '표정·분위기', desc: '표정과 느낌 1개 선택' },
  { num: '6', title: '색상', desc: '의상 색상 · 전체 이미지 느낌' },
  { num: '7', title: '추가 스타일', desc: '웹툰·애니·픽셀·동화책·미래SF' },
  { num: '8', title: '완성', desc: '캐릭터 설정표 & 최종 프롬프트' },
];

export function Stage3CharacterDesign({
  state,
  onUpdate,
  onNextStage,
}: Stage3CharacterDesignProps) {
  const [keywordsInput, setKeywordsInput] = useState(() =>
    state.keywords.filter((k) => k.trim()).join(', ')
  );

  const joinedStateKeywords = state.keywords.filter((k) => k.trim()).join(', ');
  const prevJoinedRef = useRef(joinedStateKeywords);
  useEffect(() => {
    if (prevJoinedRef.current !== joinedStateKeywords) {
      prevJoinedRef.current = joinedStateKeywords;
      setKeywordsInput(joinedStateKeywords);
    }
  }, [joinedStateKeywords]);

  const handleKeywordsChange = (raw: string) => {
    setKeywordsInput(raw);
    const parts = raw.split(',').map((s) => s.trim());
    const next: [string, string, string] = [
      parts[0] ?? '',
      parts[1] ?? '',
      parts[2] ?? '',
    ];
    prevJoinedRef.current = next.filter((k) => k.trim()).join(', ');
    onUpdate({
      keywords: next,
      profileKeywords: next.filter((k) => k.trim()).join(', '),
    });
  };

  const promptText =
    state.stage3Mode === 'coach'
      ? buildStage3CoachPrompt(state)
      : buildStage3DirectPrompt(state);

  return (
    <div className="space-y-6">
      {/* Mode Selector Header */}
      <div className="bg-white/95 border border-violet-200/80 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-100 border border-violet-200 text-violet-700 flex items-center justify-center shrink-0 mt-0.5">
            <Palette className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <span className="text-xs font-semibold text-violet-700">
              3단계 · ChatGPT 활용 · ‘미래의 나’ 캐릭터 만들기
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">
              캐릭터 제작 방식을 선택하세요
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              AI가 하나씩 질문해주는 ‘선택형 코치 모드’ 또는 바로 이미지를 그리는 ‘직접 작성 모드’를 고를 수 있습니다.
            </p>
          </div>
        </div>

        <div className="inline-flex p-1 bg-violet-50 border border-violet-200 rounded-lg self-start md:self-auto shrink-0">
          <button
            type="button"
            onClick={() => onUpdate({ stage3Mode: 'coach' })}
            className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              state.stage3Mode === 'coach'
                ? 'bg-violet-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            선택형 코치 프롬프트 (추천)
          </button>
          <button
            type="button"
            onClick={() => onUpdate({ stage3Mode: 'direct' })}
            className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              state.stage3Mode === 'direct'
                ? 'bg-violet-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            직접 작성형 프롬프트
          </button>
        </div>
      </div>

      {/* Main 2-Zone Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 bg-white border border-violet-200/80 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xs">
          {state.stage3Mode === 'coach' ? (
            <>
              <div className="flex items-start gap-3 pb-3 border-b border-violet-100">
                <div className="w-10 h-10 rounded-xl bg-violet-100 border border-violet-200 text-violet-700 flex items-center justify-center shrink-0 mt-0.5">
                  <UserRound className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-violet-700 block mb-0.5">
                    작성 영역 · 코치 프롬프트 설정
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">
                    AI 디자인 코치 선택형 프롬프트 설정
                  </h2>
                  <p className="text-sm text-slate-500 mt-0.5">
                    프롬프트를 복사해 ChatGPT에 붙여넣으면, AI가 1~5번 선택지를 주며 단계별로 캐릭터를 함께 만들어 줍니다.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1.5">
                    <label
                      htmlFor="stage3-coach-kw"
                      className="block text-sm font-semibold text-slate-800"
                    >
                      내 핵심 키워드 3가지
                    </label>
                    <span className="text-xs font-medium text-violet-700">
                      {joinedStateKeywords
                        ? '1·2단계 자동 입력됨'
                        : '1·2단계 입력 시 자동 채움'}
                    </span>
                  </div>
                  <input
                    id="stage3-coach-kw"
                    type="text"
                    value={keywordsInput}
                    onChange={(e) => handleKeywordsChange(e.target.value)}
                    placeholder="1·2단계에서 입력하면 자동으로 채워집니다"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1.5">
                    <label
                      htmlFor="stage3-coach-job"
                      className="block text-sm font-semibold text-slate-800"
                    >
                      나의 미래 직업
                    </label>
                    <span className="text-xs font-medium text-violet-700">
                      {state.chosenJob.trim()
                        ? '1·2단계 자동 입력됨'
                        : '1·2단계 입력 시 자동 채움'}
                    </span>
                  </div>
                  <input
                    id="stage3-coach-job"
                    type="text"
                    value={state.chosenJob}
                    onChange={(e) => onUpdate({ chosenJob: e.target.value })}
                    placeholder="1·2단계에서 입력하면 자동으로 채워집니다"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <label className="flex items-start gap-2.5 text-sm text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state.includeExtendedStyle}
                    onChange={(e) =>
                      onUpdate({ includeExtendedStyle: e.target.checked })
                    }
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                  />
                  <span>
                    <strong className="font-semibold">확장형 추가 스타일 포함</strong>
                    <span className="block text-xs text-slate-500 mt-0.5">
                      기본형(고품질 3D 디자이너 토이 피규어) 외에 웹툰·애니메이션·픽셀아트 등 그림체 변형 프롬프트도 함께 받습니다.
                    </span>
                  </span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">
                  ChatGPT가 물어볼 7단계 질문 순서 미리보기
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {QUESTION_STEPS.map((q) => (
                    <div
                      key={q.num}
                      className="bg-slate-50 border border-slate-200 rounded-lg p-3"
                    >
                      <div className="text-xs font-mono tabular-nums font-semibold text-blue-700">
                        STEP {q.num}
                      </div>
                      <div className="text-sm font-semibold text-slate-900 mt-0.5">
                        {q.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-1 leading-snug">
                        {q.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  직접 작성형 캐릭터 프롬프트 만들기
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  질문 대화 없이 한 번에 3D 컬렉션 피규어 스타일 캐릭터 이미지를 만들고 싶을 때 사용하세요.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1.5">
                    <label
                      htmlFor="stage3-dir-job"
                      className="block text-sm font-semibold text-slate-800"
                    >
                      미래 직업
                    </label>
                    <span className="text-xs font-medium text-violet-700">
                      {state.chosenJob.trim()
                        ? '1·2단계 자동 입력됨'
                        : '1·2단계 입력 시 자동 채움'}
                    </span>
                  </div>
                  <input
                    id="stage3-dir-job"
                    type="text"
                    value={state.chosenJob}
                    onChange={(e) => onUpdate({ chosenJob: e.target.value })}
                    placeholder="1·2단계에서 입력하면 자동으로 채워집니다"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1.5">
                    <label
                      htmlFor="stage3-dir-kw"
                      className="block text-sm font-semibold text-slate-800"
                    >
                      상징 키워드 3가지
                    </label>
                    <span className="text-xs font-medium text-violet-700">
                      {joinedStateKeywords
                        ? '1·2단계 자동 입력됨'
                        : '1·2단계 입력 시 자동 채움'}
                    </span>
                  </div>
                  <input
                    id="stage3-dir-kw"
                    type="text"
                    value={keywordsInput}
                    onChange={(e) => handleKeywordsChange(e.target.value)}
                    placeholder="1·2단계에서 입력하면 자동으로 채워집니다"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {JOB_PRESETS.slice(0, 6).map((p) => (
                  <button
                    key={p.job}
                    type="button"
                    onClick={() =>
                      onUpdate({
                        chosenJob: p.job,
                        charProps: p.props,
                        charAction: p.charAction,
                      })
                    }
                    className="px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-700 hover:bg-slate-100"
                  >
                    {p.job} 소품 채우기
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="block text-sm font-semibold text-slate-800 mb-2">
                  캐릭터 성별
                </span>
                <div className="flex flex-wrap gap-2">
                  {(['남자', '여자', '선택 안 함'] as GenderOption[]).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => onUpdate({ gender: g })}
                      className={`px-4 py-2 text-xs font-medium rounded-lg border transition-colors ${
                        state.gender === g
                          ? 'bg-slate-900 border-slate-900 text-white'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div>
                  <label
                    htmlFor="stage3-props"
                    className="block text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    직업을 나타내는 핵심 소품 (1~3개)
                  </label>
                  <input
                    id="stage3-props"
                    type="text"
                    value={state.charProps}
                    onChange={(e) => onUpdate({ charProps: e.target.value })}
                    placeholder="예: 노트북, 게임 컨트롤러, 픽셀 캐릭터, 모니터"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label
                    htmlFor="stage3-action"
                    className="block text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    캐릭터 행동 및 자세
                  </label>
                  <input
                    id="stage3-action"
                    type="text"
                    value={state.charAction}
                    onChange={(e) => onUpdate({ charAction: e.target.value })}
                    placeholder="예: 게임을 개발하는 모습"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="block text-sm font-semibold text-slate-800">
                  표정과 분위기
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {STAGE3_EXPRESSIONS.map((exp) => (
                    <button
                      key={exp}
                      type="button"
                      onClick={() => onUpdate({ charExpression: exp })}
                      className={`px-3 py-2 text-xs font-medium rounded-lg border text-left transition-colors ${
                        state.charExpression === exp
                          ? 'bg-blue-50 border-blue-600 text-blue-800 font-semibold'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {exp}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="block text-sm font-semibold text-slate-800">
                  캐릭터 스타일
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {STAGE3_STYLES.map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => onUpdate({ charStyle: style })}
                      className={`px-3.5 py-2 text-xs font-medium rounded-lg border text-left transition-colors ${
                        state.charStyle === style
                          ? 'bg-blue-50 border-blue-600 text-blue-800 font-semibold'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="pt-4 border-t border-sky-100 flex justify-end">
            <button
              type="button"
              onClick={onNextStage}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors whitespace-nowrap"
            >
              <span>4단계: 나의 미래 프로필 카드 만들기로 이동</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Right Zone */}
        <div className="lg:col-span-5">
          <PromptPreviewPanel
            title={
              state.stage3Mode === 'coach'
                ? '완성된 3단계 선택형 코치 프롬프트'
                : '완성된 3단계 직접 작성 프롬프트'
            }
            subtitle={
              state.stage3Mode === 'coach'
                ? 'ChatGPT에 붙여넣으면 AI가 차례대로 질문을 시작합니다.'
                : 'ChatGPT에 붙여넣어 흰색 배경의 스티커형 캐릭터를 바로 생성하세요.'
            }
            promptText={promptText}
            copyLabel="3단계 프롬프트 복사"
            toolLink="chatgpt"
            accent="violet"
          />
        </div>
      </div>
    </div>
  );
}
