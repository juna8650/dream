import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  Copy,
  Image as ImageIcon,
  RefreshCw,
  Sparkles,
  Wand2,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  JOB_PRESETS,
  STAGE2_MOODS,
  STAGE2_STYLES,
} from '../data/curriculum';
import {
  ASPECT_RATIO_EN,
  GENDER_EN,
  JOB_PRESETS_EN,
  PLACE_SUGGESTIONS_EN,
  STAGE2_MOOD_EN,
  STAGE2_STYLE_EN,
  translateKnownText,
  translateValue,
} from '../i18n/translations';
import { GenderOption, StudentWorkspaceState } from '../types/lesson';
import { copyTextToClipboard } from '../utils/clipboard';
import { getJobRecommendations } from '../utils/jobRecommendations';
import { buildStage2Prompt } from '../utils/promptBuilders';
import { PromptPreviewPanel } from './PromptPreviewPanel';

interface Stage2FutureImagineProps {
  state: StudentWorkspaceState;
  onUpdate: (patch: Partial<StudentWorkspaceState>) => void;
  onNextStage: () => void;
}

const PLACE_SUGGESTIONS = [
  '대형 게임 회사',
  '최신 AI 연구소',
  '학교',
  '병원',
  '의류 회사',
  '레스토랑',
  '경기장',
  '작업실',
  '공연장',
];

export function Stage2FutureImagine({
  state,
  onUpdate,
  onNextStage,
}: Stage2FutureImagineProps) {
  const { lang } = useLanguage();
  const [customJobMode, setCustomJobMode] = useState(true);
  const [customMoodMode, setCustomMoodMode] = useState(
    state.mood.trim().length > 0 && !STAGE2_MOODS.includes(state.mood)
  );
  const [copiedFix, setCopiedFix] = useState<string | null>(null);
  const [placeRecIndex, setPlaceRecIndex] = useState(0);
  const [actionRecIndex, setActionRecIndex] = useState(0);
  const [showActionSuggestions, setShowActionSuggestions] = useState(false);
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

  useEffect(() => {
    setShowActionSuggestions(false);
    setPlaceRecIndex(0);
    setActionRecIndex(0);
  }, [state.chosenJob, lang]);

  const promptText = buildStage2Prompt(state, lang);
  const jobLabel =
    translateKnownText(state.chosenJob, lang).trim() ||
    (lang === 'en' ? 'Future Career' : '미래 직업');
  const jobRecommendations = getJobRecommendations(state.chosenJob, lang);

  const handleRecommendWorkplace = () => {
    const list = jobRecommendations.workplaces;
    let nextIdx = placeRecIndex % list.length;
    if (list[nextIdx] === state.workplace && list.length > 1) {
      nextIdx = (nextIdx + 1) % list.length;
    }
    onUpdate({ workplace: list[nextIdx] });
    setPlaceRecIndex((nextIdx + 1) % list.length);
  };

  const handleRecommendAction = () => {
    const list = jobRecommendations.actions;
    let nextIdx = actionRecIndex % list.length;
    if (list[nextIdx] === state.workAction && list.length > 1) {
      nextIdx = (nextIdx + 1) % list.length;
    }
    onUpdate({ workAction: list[nextIdx] });
    setActionRecIndex((nextIdx + 1) % list.length);
    setShowActionSuggestions(true);
  };

  const handleSelectPresetJob = (preset: (typeof JOB_PRESETS)[number]) => {
    setCustomJobMode(false);
    const displayJob =
      lang === 'en' ? (JOB_PRESETS_EN[preset.job]?.job ?? preset.job) : preset.job;
    onUpdate({
      chosenJob: displayJob,
      workplace: '',
      workAction: '',
    });
  };

  const fixSuggestions =
    lang === 'en'
      ? [
          {
            id: 'bg',
            label: 'Change Background',
            text: 'Change the background to a brighter, more inviting creative studio.',
          },
          {
            id: 'face',
            label: 'Change Expression',
            text: 'Make the character’s facial expression brighter and more confident.',
          },
          {
            id: 'props',
            label: 'Add Props',
            text: 'Update the pose so they are holding a tablet and stylus.',
          },
          {
            id: 'style',
            label: 'Change Style',
            text: 'Use a webtoon illustration style instead of 3D animation style.',
          },
        ]
      : [
          {
            id: 'bg',
            label: '배경 바꾸기',
            text: '배경을 더 밝은 분위기의 작업실로 바꿔줘.',
          },
          {
            id: 'face',
            label: '표정 바꾸기',
            text: '인물의 표정을 더 자신감 있고 밝게 바꿔줘.',
          },
          {
            id: 'props',
            label: '소품 추가하기',
            text: '손에 태블릿과 펜을 들고 있는 모습으로 바꿔줘.',
          },
          {
            id: 'style',
            label: '스타일 바꾸기',
            text: '3D 애니메이션 스타일 대신 웹툰 스타일로 바꿔줘.',
          },
        ];

  const handleCopyFix = async (id: string, text: string) => {
    const ok = await copyTextToClipboard(text);
    if (ok) {
      setCopiedFix(id);
      window.setTimeout(() => setCopiedFix(null), 1800);
    }
  };

  return (
    <div className="space-y-6">
      {/* Formula Header */}
      <div className="bg-white/95 border border-rose-200/80 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-100 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
            <Wand2 className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <span className="text-xs font-semibold text-rose-600">
              {lang === 'en'
                ? 'Step 2 · Canva · ChatGPT · Generate Portrait / Landscape Images'
                : '2단계 · Canva · ChatGPT 활용 · 가로/세로 이미지 생성'}
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">
              {lang === 'en'
                ? 'Image Prompt Formula'
                : '이미지 프롬프트 작성 공식'}
            </h2>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-slate-800 bg-rose-50/70 border border-rose-200/80 rounded-xl px-4 py-2.5">
          <span>{lang === 'en' ? 'Core Keywords' : '핵심 키워드'}</span>
          <span className="text-rose-400">+</span>
          <span>{lang === 'en' ? 'Future Career' : '미래 직업'}</span>
          <span className="text-rose-400">+</span>
          <span>{lang === 'en' ? 'Workplace' : '장소'}</span>
          <span className="text-rose-400">+</span>
          <span>{lang === 'en' ? 'Action' : '하는 일'}</span>
          <span className="text-rose-400">+</span>
          <span>{lang === 'en' ? 'Mood' : '분위기'}</span>
          <span className="text-rose-400">+</span>
          <span>{lang === 'en' ? 'Image Style' : '이미지 스타일'}</span>
        </div>
      </div>

      {/* Main 2-Zone Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 bg-white border-2 border-rose-300 rounded-2xl p-5 sm:p-6 space-y-6 shadow-sm">
          <div className="flex items-start gap-3 pb-3 border-b border-rose-100">
            <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
              <ImageIcon className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs font-semibold text-rose-600 block mb-0.5">
                {lang === 'en'
                  ? 'Input Area · Choose Scene & Style'
                  : '작성 영역 · 장면과 스타일 선택'}
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                {lang === 'en'
                  ? 'Create an Image of “Future Me” 20 Years Later'
                  : '20년 후 ‘미래의 나’ 이미지 만들기'}
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                {lang === 'en'
                  ? 'Pick or type each detail below to update the completed prompt on the right in real time.'
                  : '각 항목을 선택하거나 직접 입력하면 오른쪽 완성된 프롬프트가 실시간으로 바뀝니다.'}
              </p>
            </div>
          </div>

          {/* 핵심 키워드 */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <label
                htmlFor="stage2-keywords"
                className="block text-sm font-semibold text-slate-800"
              >
                {lang === 'en' ? 'My 3 Core Keywords' : '나의 핵심 키워드 3가지'}
              </label>
              <span className="text-xs font-medium text-rose-600">
                {joinedStateKeywords
                  ? lang === 'en'
                    ? 'Auto-filled from Step 1'
                    : '1단계에서 입력한 키워드가 자동 입력됨'
                  : lang === 'en'
                    ? 'Auto-fills when entered in Step 1'
                    : '1단계에서 입력하면 자동으로 채워져요'}
              </span>
            </div>
            <input
              id="stage2-keywords"
              type="text"
              value={keywordsInput}
              onChange={(e) => {
                const raw = e.target.value;
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
              }}
              placeholder={
                lang === 'en'
                  ? 'Auto-fills when entered in Step 1'
                  : '1단계에서 입력하면 자동으로 채워집니다'
              }
              className="w-full px-3.5 py-2.5 text-sm bg-white border-[1.5px] border-slate-400/80 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
            />
          </div>

          {/* ① 미래 직업 */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <span className="block text-sm font-semibold text-slate-800">
              {lang === 'en' ? '① Future Career' : '① 미래 직업'}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {JOB_PRESETS.map((preset) => {
                const enJob = JOB_PRESETS_EN[preset.job]?.job ?? preset.job;
                const displayJob = lang === 'en' ? enJob : preset.job;
                const active =
                  !customJobMode &&
                  (state.chosenJob === preset.job || state.chosenJob === enJob);
                return (
                  <button
                    key={preset.job}
                    type="button"
                    onClick={() => handleSelectPresetJob(preset)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border text-left transition-colors flex items-center gap-2 ${
                      active
                        ? 'bg-blue-50 border-blue-600 text-blue-800 font-semibold'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full border shrink-0 flex items-center justify-center ${
                        active ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                      }`}
                    >
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                    <span className="truncate">{displayJob}</span>
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setCustomJobMode(true)}
                className={`px-3 py-2 text-xs font-medium rounded-lg border text-left transition-colors flex items-center gap-2 ${
                  customJobMode
                    ? 'bg-blue-50 border-blue-600 text-blue-800 font-semibold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full border shrink-0 flex items-center justify-center ${
                    customJobMode ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                  }`}
                >
                  {customJobMode && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </span>
                <span>{lang === 'en' ? 'Type my own' : '직접 입력하기'}</span>
              </button>
            </div>

            {customJobMode && (
              <input
                type="text"
                value={state.chosenJob}
                onChange={(e) => onUpdate({ chosenJob: e.target.value })}
                placeholder={
                  lang === 'en'
                    ? 'Enter your desired future career (e.g., Robotics Engineer)'
                    : '원하는 미래 직업을 입력하세요 (예: 로봇 공학자)'
                }
                className="w-full px-3.5 py-2.5 text-sm bg-white border-[1.5px] border-slate-400/80 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
              />
            )}
          </div>

          {/* 성별 표현 */}
          <div className="pt-4 border-t border-slate-100">
            <span className="block text-sm font-semibold text-slate-800 mb-2">
              {lang === 'en' ? 'Character Gender Presentation' : '캐릭터 성별 표현'}
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

          {/* ② 일하는 장소 */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label
                htmlFor="stage2-place"
                className="block text-sm font-semibold text-slate-800"
              >
                {lang === 'en' ? '② Workplace' : '② 일하는 장소'}
              </label>
              <button
                type="button"
                onClick={handleRecommendWorkplace}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>
                  {lang === 'en'
                    ? `Suggest workplace for ‘${jobLabel}’`
                    : `‘${jobLabel}’ 어울리는 장소 추천받기`}
                </span>
              </button>
            </div>
            <input
              id="stage2-place"
              type="text"
              value={state.workplace}
              onChange={(e) => onUpdate({ workplace: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-white border-[1.5px] border-slate-400/80 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
            />
            <div className="flex flex-wrap gap-1.5">
              {PLACE_SUGGESTIONS.map((p) => {
                const enPlace = PLACE_SUGGESTIONS_EN[p] ?? p;
                const displayPlace = lang === 'en' ? enPlace : p;
                const active = state.workplace === p || state.workplace === enPlace;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => onUpdate({ workplace: displayPlace })}
                    className={`px-2.5 py-1 text-xs border rounded-md transition-colors ${
                      active
                        ? 'bg-rose-50 border-rose-300 text-rose-800 font-medium'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {displayPlace}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ③ 하고 있는 일 */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label
                htmlFor="stage2-action"
                className="block text-sm font-semibold text-slate-800"
              >
                {lang === 'en'
                  ? '③ What I Am Doing (Scene Description)'
                  : '③ 하고 있는 일 (구체적 장면 묘사)'}
              </label>
              <button
                type="button"
                onClick={handleRecommendAction}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>
                  {lang === 'en'
                    ? `Suggest action for ‘${jobLabel}’`
                    : `‘${jobLabel}’ 어울리는 일 추천받기`}
                </span>
              </button>
            </div>
            <input
              id="stage2-action"
              type="text"
              value={state.workAction}
              onChange={(e) => onUpdate({ workAction: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-white border-[1.5px] border-slate-400/80 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
            />
            {showActionSuggestions && (
              <div className="flex flex-wrap gap-1.5">
                {jobRecommendations.actions.map((recAction) => {
                  const active = state.workAction === recAction;
                  return (
                    <button
                      key={recAction}
                      type="button"
                      onClick={() => onUpdate({ workAction: recAction })}
                      className={`px-2.5 py-1.5 text-xs rounded-md border text-left transition-colors ${
                        active
                          ? 'bg-rose-50 border-rose-300 text-rose-800 font-medium'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {recAction}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ④ 그림의 분위기 */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <span className="block text-sm font-semibold text-slate-800">
              {lang === 'en' ? '④ Image Mood' : '④ 그림의 분위기'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {STAGE2_MOODS.map((mood) => {
                const active = !customMoodMode && state.mood === mood;
                const label = translateValue(mood, STAGE2_MOOD_EN, lang);
                return (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => {
                      setCustomMoodMode(false);
                      onUpdate({ mood });
                    }}
                    className={`px-3.5 py-2 text-xs font-medium rounded-lg border text-left transition-colors flex items-center gap-2 ${
                      active
                        ? 'bg-blue-50 border-blue-600 text-blue-800 font-semibold'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full border shrink-0 flex items-center justify-center ${
                        active ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                      }`}
                    >
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                    <span className="capitalize">{label}</span>
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setCustomMoodMode(true)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg border text-left transition-colors flex items-center gap-2 ${
                  customMoodMode
                    ? 'bg-blue-50 border-blue-600 text-blue-800 font-semibold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full border shrink-0 flex items-center justify-center ${
                    customMoodMode ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                  }`}
                >
                  {customMoodMode && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </span>
                <span>{lang === 'en' ? 'Type my own' : '직접 입력하기'}</span>
              </button>
            </div>
            {customMoodMode && (
              <input
                type="text"
                value={state.mood}
                onChange={(e) => onUpdate({ mood: e.target.value })}
                placeholder={
                  lang === 'en'
                    ? 'Enter your preferred mood'
                    : '원하는 분위기를 입력하세요'
                }
                className="w-full px-3.5 py-2 text-sm bg-white border-[1.5px] border-slate-400/80 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
              />
            )}
          </div>

          {/* ⑤ 이미지 스타일 */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <span className="block text-sm font-semibold text-slate-800">
              {lang === 'en' ? '⑤ Image Style' : '⑤ 이미지 스타일'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {STAGE2_STYLES.map((style) => {
                const active = state.imageStyle === style;
                const label = translateValue(style, STAGE2_STYLE_EN, lang);
                return (
                  <button
                    key={style}
                    type="button"
                    onClick={() => onUpdate({ imageStyle: style })}
                    className={`px-3.5 py-2.5 text-xs font-medium rounded-lg border text-left transition-colors flex items-center gap-2 ${
                      active
                        ? 'bg-blue-50 border-blue-600 text-blue-800 font-semibold'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full border shrink-0 flex items-center justify-center ${
                        active ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                      }`}
                    >
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                    <span className="truncate capitalize">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ⑥ 이미지 비율 */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <span className="block text-sm font-semibold text-slate-800">
              {lang === 'en'
                ? '⑥ Aspect Ratio (generate portrait & landscape in Canva)'
                : '⑥ 이미지 비율 (캔바 실습 시 가로·세로 각각 생성)'}
            </span>
            <div className="flex flex-wrap gap-2">
              {(['A4 세로', 'A4 가로', '자유'] as const).map((ratio) => (
                <button
                  key={ratio}
                  type="button"
                  onClick={() => onUpdate({ aspectRatio: ratio })}
                  className={`px-4 py-2 text-xs font-medium rounded-lg border transition-colors ${
                    state.aspectRatio === ratio
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {translateValue(ratio, ASPECT_RATIO_EN, lang)}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={onNextStage}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors whitespace-nowrap"
            >
              <span>
                {lang === 'en'
                  ? 'Go to Step 3: Design Future Character'
                  : '3단계: ‘미래의 나’ 캐릭터 만들기로 이동'}
              </span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Right Zone */}
        <div className="lg:col-span-5">
          <PromptPreviewPanel
            title={
              lang === 'en'
                ? 'Completed Step 2 Image Prompt'
                : '완성된 2단계 이미지 프롬프트'
            }
            subtitle={
              lang === 'en'
                ? 'Paste into Canva or ChatGPT to generate portrait and landscape images.'
                : 'Canva(캔바) 또는 ChatGPT에 붙여넣어 가로·세로 이미지를 만들어 보세요.'
            }
            promptText={promptText}
            copyLabel={
              lang === 'en' ? 'Copy Step 2 Prompt' : '2단계 프롬프트 복사'
            }
            toolLink="both"
            accent="rose"
          />
        </div>
      </div>

      {/* Separate Optional Image Refinement Section (Slide 21) */}
      <section
        aria-label={
          lang === 'en'
            ? 'Optional image refinement prompts'
            : '선택 활동 이미지 수정 요청'
        }
        className="bg-amber-50/75 border border-amber-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-amber-200/70">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs font-semibold text-amber-800 block">
                {lang === 'en'
                  ? 'Optional · Use only when you want to edit the generated image'
                  : '선택 활동 · 생성된 이미지를 수정하고 싶을 때만 사용하세요'}
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                {lang === 'en'
                  ? 'Want to adjust the image? Copy a quick edit prompt'
                  : '이미지가 마음에 들지 않을 때? 수정 요청 프롬프트'}
              </h3>
            </div>
          </div>
          <span className="text-xs text-amber-800/80 font-medium self-start sm:self-center">
            {lang === 'en' ? 'Copy only when needed' : '필요할 때만 복사해서 사용하세요'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {fixSuggestions.map((fix) => (
            <div
              key={fix.id}
              className="bg-white border border-amber-200/80 rounded-xl p-3.5 flex flex-col justify-between gap-2.5"
            >
              <div>
                <div className="text-xs font-bold text-slate-900">{fix.label}</div>
                <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {fix.text}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCopyFix(fix.id, fix.text)}
                className="self-end inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-amber-50 border border-amber-200 rounded-md hover:bg-amber-100"
              >
                {copiedFix === fix.id ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" aria-hidden="true" />
                    <span className="text-emerald-700">
                      {lang === 'en' ? 'Copied' : '복사됨'}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" aria-hidden="true" />
                    <span>{lang === 'en' ? 'Copy' : '복사'}</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

