import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Palette, PartyPopper, UserRound } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  JOB_PRESETS,
  STAGE3_EXPRESSIONS,
  STAGE3_STYLES,
} from '../data/curriculum';
import {
  GENDER_EN,
  JOB_PRESETS_EN,
  STAGE3_EXPRESSION_EN,
  STAGE3_STYLE_EN,
  translateKnownText,
  translateValue,
} from '../i18n/translations';
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

const QUESTION_STEPS: Array<{
  title: string;
  titleEn: string;
  lines: string[];
  linesEn: string[];
  tone: 'violet' | 'sky';
  isCelebration?: boolean;
}> = [
  {
    title: '① 나의 꿈',
    titleEn: '① My Dream',
    lines: ['핵심 키워드 : 3개', '미래 직업 : 1개'],
    linesEn: ['Core keywords: 3', 'Future career: 1'],
    tone: 'violet',
  },
  {
    title: '② 외모',
    titleEn: '② Appearance',
    lines: ['성별, 피부색, 얼굴형,', '헤어스타일 선택'],
    linesEn: ['Gender, skin tone, face shape,', '& hairstyle'],
    tone: 'sky',
  },
  {
    title: '③ 의상',
    titleEn: '③ Outfit',
    lines: ['직업에 어울리는', '의상 선택'],
    linesEn: ['Choose an outfit', 'for your career'],
    tone: 'violet',
  },
  {
    title: '④ 행동·소품',
    titleEn: '④ Pose & Props',
    lines: ['자세 1개', '소품 1~2개 선택'],
    linesEn: ['1 pose', '1–2 key props'],
    tone: 'sky',
  },
  {
    title: '⑤ 표정·분위기',
    titleEn: '⑤ Expression & Mood',
    lines: ['표정과 느낌 1개 선택'],
    linesEn: ['Pick 1 expression & mood'],
    tone: 'sky',
  },
  {
    title: '⑥ 색상',
    titleEn: '⑥ Colors',
    lines: ['의상 색상', '전체 이미지 느낌 선택'],
    linesEn: ['Outfit colors &', 'overall tone'],
    tone: 'violet',
  },
  {
    title: '완성!',
    titleEn: 'Done!',
    lines: ['캐릭터 설정과', '최종 프롬프트 완성'],
    linesEn: ['Character spec sheet &', 'final prompts ready'],
    tone: 'sky',
    isCelebration: true,
  },
  {
    title: '다양한 스타일',
    titleEn: 'Various Styles',
    lines: ['웹툰, 애니메이션, 픽셀아트, 동화책, 미래 SF스타일 반영'],
    linesEn: ['Webtoon, animation, pixel art, storybook & sci-fi styles'],
    tone: 'violet',
  },
];

export function Stage3CharacterDesign({
  state,
  onUpdate,
  onNextStage,
}: Stage3CharacterDesignProps) {
  const { lang } = useLanguage();
  const [keywordsInput, setKeywordsInput] = useState(() =>
    state.keywords
      .map((k) => translateKnownText(k, lang).trim())
      .filter(Boolean)
      .join(', ')
  );

  const joinedStateKeywords = state.keywords.filter((k) => k.trim()).join(', ');
  const prevJoinedRef = useRef(joinedStateKeywords);
  const prevLangRef = useRef(lang);
  useEffect(() => {
    if (prevJoinedRef.current !== joinedStateKeywords || prevLangRef.current !== lang) {
      prevJoinedRef.current = joinedStateKeywords;
      prevLangRef.current = lang;
      setKeywordsInput(
        state.keywords
          .map((k) => translateKnownText(k, lang).trim())
          .filter(Boolean)
          .join(', ')
      );
    }
  }, [joinedStateKeywords, lang, state.keywords]);

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
      ? buildStage3CoachPrompt(state, lang)
      : buildStage3DirectPrompt(state, lang);

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
              {lang === 'en'
                ? 'Step 3 · ChatGPT · Design Your “Future Me” Character'
                : '3단계 · ChatGPT 활용 · ‘미래의 나’ 캐릭터 만들기'}
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">
              {lang === 'en'
                ? 'Choose How to Create Your Character'
                : '캐릭터 제작 방식을 선택하세요'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === 'en'
                ? 'Pick Choice-Guided Mode where AI asks step by step, or Direct Mode to generate your image right away.'
                : 'AI가 하나씩 질문해주는 ‘선택형 모드’ 또는 바로 이미지를 그리는 ‘직접 작성 모드’를 고를 수 있습니다.'}
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
            {lang === 'en'
              ? 'Choice-Guided Prompt (Recommended)'
              : '선택형 프롬프트 (추천)'}
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
            {lang === 'en' ? 'Direct Prompt' : '직접 작성형 프롬프트'}
          </button>
        </div>
      </div>

      {/* Main 2-Zone Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 bg-white border-2 border-violet-300 rounded-2xl p-5 sm:p-6 space-y-6 shadow-sm">
          {state.stage3Mode === 'coach' ? (
            <>
              <div className="flex items-start gap-3 pb-3 border-b border-violet-100">
                <div className="w-10 h-10 rounded-xl bg-violet-100 border border-violet-200 text-violet-700 flex items-center justify-center shrink-0 mt-0.5">
                  <UserRound className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-violet-700 block mb-0.5">
                    {lang === 'en'
                      ? 'Input Area · Choice-Guided Prompt Setup'
                      : '작성 영역 · 선택형 프롬프트 설정'}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">
                    {lang === 'en'
                      ? 'AI Design Choice-Guided Prompt Settings'
                      : 'AI 디자인 선택형 프롬프트 설정'}
                  </h2>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {lang === 'en'
                      ? 'Copy and paste this prompt into ChatGPT—AI will guide you step by step with choices 1–5.'
                      : '프롬프트를 복사해 ChatGPT에 붙여넣으면, AI가 1~5번 선택지를 주며 단계별로 캐릭터를 함께 만들어 줍니다.'}
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
                      {lang === 'en' ? 'My 3 Core Keywords' : '내 핵심 키워드 3가지'}
                    </label>
                    <span className="text-xs font-medium text-violet-700">
                      {joinedStateKeywords
                        ? lang === 'en'
                          ? 'Auto-filled from Steps 1–2'
                          : '1·2단계 자동 입력됨'
                        : lang === 'en'
                          ? 'Auto-fills from Steps 1–2'
                          : '1·2단계 입력 시 자동 채움'}
                    </span>
                  </div>
                  <input
                    id="stage3-coach-kw"
                    type="text"
                    value={keywordsInput}
                    onChange={(e) => handleKeywordsChange(e.target.value)}
                    placeholder={
                      lang === 'en'
                        ? 'Auto-fills when entered in Steps 1–2'
                        : '1·2단계에서 입력하면 자동으로 채워집니다'
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-white border-[1.5px] border-slate-400/80 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1.5">
                    <label
                      htmlFor="stage3-coach-job"
                      className="block text-sm font-semibold text-slate-800"
                    >
                      {lang === 'en' ? 'My Future Career' : '나의 미래 직업'}
                    </label>
                    <span className="text-xs font-medium text-violet-700">
                      {state.chosenJob.trim()
                        ? lang === 'en'
                          ? 'Auto-filled from Steps 1–2'
                          : '1·2단계 자동 입력됨'
                        : lang === 'en'
                          ? 'Auto-fills from Steps 1–2'
                          : '1·2단계 입력 시 자동 채움'}
                    </span>
                  </div>
                  <input
                    id="stage3-coach-job"
                    type="text"
                    value={state.chosenJob}
                    onChange={(e) => onUpdate({ chosenJob: e.target.value })}
                    placeholder={
                      lang === 'en'
                        ? 'Auto-fills when entered in Steps 1–2'
                        : '1·2단계에서 입력하면 자동으로 채워집니다'
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-white border-[1.5px] border-slate-400/80 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">
                  {lang === 'en'
                    ? 'Preview of Questions ChatGPT Will Ask'
                    : 'ChatGPT가 물어볼 질문 순서 미리보기'}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {QUESTION_STEPS.map((q) => {
                    const title = lang === 'en' ? q.titleEn : q.title;
                    const lines = lang === 'en' ? q.linesEn : q.lines;
                    return (
                      <div
                        key={q.title}
                        className={`rounded-xl border p-3.5 ${
                          q.tone === 'violet'
                            ? 'bg-violet-50/80 border-violet-200'
                            : 'bg-sky-50/80 border-sky-200'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-sm font-bold text-blue-700">
                          {q.isCelebration && (
                            <PartyPopper className="w-4 h-4 text-rose-500 shrink-0" aria-hidden="true" />
                          )}
                          <span>{title}</span>
                        </div>
                        <div className="mt-2 space-y-0.5 text-xs text-slate-800 leading-snug">
                          {lines.map((line) => (
                            <p key={line}>{line}</p>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {lang === 'en'
                    ? 'Direct Character Prompt Builder'
                    : '직접 작성형 캐릭터 프롬프트 만들기'}
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  {lang === 'en'
                    ? 'Use this mode when you want to generate a 3D collectible figure character right away without a Q&A chat.'
                    : '질문 대화 없이 한 번에 3D 컬렉션 피규어 스타일 캐릭터 이미지를 만들고 싶을 때 사용하세요.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1.5">
                    <label
                      htmlFor="stage3-dir-job"
                      className="block text-sm font-semibold text-slate-800"
                    >
                      {lang === 'en' ? 'Future Career' : '미래 직업'}
                    </label>
                    <span className="text-xs font-medium text-violet-700">
                      {state.chosenJob.trim()
                        ? lang === 'en'
                          ? 'Auto-filled from Steps 1–2'
                          : '1·2단계 자동 입력됨'
                        : lang === 'en'
                          ? 'Auto-fills from Steps 1–2'
                          : '1·2단계 입력 시 자동 채움'}
                    </span>
                  </div>
                  <input
                    id="stage3-dir-job"
                    type="text"
                    value={state.chosenJob}
                    onChange={(e) => onUpdate({ chosenJob: e.target.value })}
                    placeholder={
                      lang === 'en'
                        ? 'Auto-fills when entered in Steps 1–2'
                        : '1·2단계에서 입력하면 자동으로 채워집니다'
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-white border-[1.5px] border-slate-400/80 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1.5">
                    <label
                      htmlFor="stage3-dir-kw"
                      className="block text-sm font-semibold text-slate-800"
                    >
                      {lang === 'en' ? '3 Core Keywords' : '핵심 키워드 3가지'}
                    </label>
                    <span className="text-xs font-medium text-violet-700">
                      {joinedStateKeywords
                        ? lang === 'en'
                          ? 'Auto-filled from Steps 1–2'
                          : '1·2단계 자동 입력됨'
                        : lang === 'en'
                          ? 'Auto-fills from Steps 1–2'
                          : '1·2단계 입력 시 자동 채움'}
                    </span>
                  </div>
                  <input
                    id="stage3-dir-kw"
                    type="text"
                    value={keywordsInput}
                    onChange={(e) => handleKeywordsChange(e.target.value)}
                    placeholder={
                      lang === 'en'
                        ? 'Auto-fills when entered in Steps 1–2'
                        : '1·2단계에서 입력하면 자동으로 채워집니다'
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-white border-[1.5px] border-slate-400/80 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {JOB_PRESETS.slice(0, 6).map((p) => {
                  const enPreset = JOB_PRESETS_EN[p.job];
                  const jobLabel = lang === 'en' && enPreset ? enPreset.job : p.job;
                  const propsVal = lang === 'en' && enPreset ? enPreset.props : p.props;
                  const actionVal =
                    lang === 'en' && enPreset ? enPreset.charAction : p.charAction;
                  return (
                    <button
                      key={p.job}
                      type="button"
                      onClick={() =>
                        onUpdate({
                          chosenJob: jobLabel,
                          charProps: propsVal,
                          charAction: actionVal,
                        })
                      }
                      className="px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-700 hover:bg-slate-100"
                    >
                      {lang === 'en'
                        ? `Fill ${jobLabel} Props`
                        : `${p.job} 소품 채우기`}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="block text-sm font-semibold text-slate-800 mb-2">
                  {lang === 'en' ? 'Character Gender' : '캐릭터 성별'}
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
                      {translateValue(g, GENDER_EN, lang)}
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
                    {lang === 'en'
                      ? 'Key Career Props (1–3 items)'
                      : '직업을 나타내는 핵심 소품 (1~3개)'}
                  </label>
                  <input
                    id="stage3-props"
                    type="text"
                    value={state.charProps}
                    onChange={(e) => onUpdate({ charProps: e.target.value })}
                    placeholder={
                      lang === 'en'
                        ? 'e.g., laptop, game controller, pixel character, monitor'
                        : '예: 노트북, 게임 컨트롤러, 픽셀 캐릭터, 모니터'
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-white border-[1.5px] border-slate-400/80 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
                  />
                </div>
                <div>
                  <label
                    htmlFor="stage3-action"
                    className="block text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    {lang === 'en' ? 'Character Pose & Action' : '캐릭터 행동 및 자세'}
                  </label>
                  <input
                    id="stage3-action"
                    type="text"
                    value={state.charAction}
                    onChange={(e) => onUpdate({ charAction: e.target.value })}
                    placeholder={
                      lang === 'en'
                        ? 'e.g., developing a game'
                        : '예: 게임을 개발하는 모습'
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-white border-[1.5px] border-slate-400/80 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="block text-sm font-semibold text-slate-800">
                  {lang === 'en' ? 'Expression & Mood' : '표정과 분위기'}
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
                      {translateValue(exp, STAGE3_EXPRESSION_EN, lang)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="block text-sm font-semibold text-slate-800">
                  {lang === 'en' ? 'Character Style' : '캐릭터 스타일'}
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
                      {translateValue(style, STAGE3_STYLE_EN, lang)}
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
              <span>
                {lang === 'en'
                  ? 'Go to Step 4: My Future Profile Card'
                  : '4단계: 나의 미래 프로필 카드 만들기로 이동'}
              </span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Right Zone */}
        <div className="lg:col-span-5">
          <PromptPreviewPanel
            title={
              state.stage3Mode === 'coach'
                ? lang === 'en'
                  ? 'Completed Step 3 Choice-Guided Prompt'
                  : '완성된 3단계 선택형 프롬프트'
                : lang === 'en'
                  ? 'Completed Step 3 Direct Prompt'
                  : '완성된 3단계 직접 작성 프롬프트'
            }
            subtitle={
              state.stage3Mode === 'coach'
                ? lang === 'en'
                  ? 'Paste into ChatGPT and AI will begin asking questions one by one.'
                  : 'ChatGPT에 붙여넣으면 AI가 차례대로 질문을 시작합니다.'
                : lang === 'en'
                  ? 'Paste into ChatGPT to generate a sticker-style character on a white background.'
                  : 'ChatGPT에 붙여넣어 흰색 배경의 스티커형 캐릭터를 바로 생성하세요.'
            }
            promptText={promptText}
            copyLabel={
              lang === 'en' ? 'Copy Step 3 Prompt' : '3단계 프롬프트 복사'
            }
            toolLink="chatgpt"
            accent="violet"
          />
        </div>
      </div>
    </div>
  );
}

