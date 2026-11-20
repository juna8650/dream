import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Copy,
  Download,
  Image as ImageIcon,
  Loader2,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LESSON_ASSETS, PROFILE_CARD_EXAMPLES } from '../data/curriculum';
import { PROFILE_CARD_EXAMPLES_EN } from '../i18n/translations';
import { ProfileCardExample } from '../types/lesson';
import { copyTextToClipboard } from '../utils/clipboard';
import { renderPosterImageFromPdf } from '../utils/pdfPosterExtractor';

interface ExamplesGalleryProps {
  selectedExampleId: string;
  onSelectExampleId: (id: string) => void;
}

export function ExamplesGallery({
  selectedExampleId,
  onSelectExampleId,
}: ExamplesGalleryProps) {
  const { lang } = useLanguage();
  const activeExample =
    PROFILE_CARD_EXAMPLES.find((ex) => ex.id === selectedExampleId) ??
    PROFILE_CARD_EXAMPLES[0];

  const activeEn = PROFILE_CARD_EXAMPLES_EN[activeExample.id];
  const activeJobTitle =
    lang === 'en' && activeEn ? activeEn.jobTitle : activeExample.jobTitle;
  const activePrompt =
    lang === 'en' && activeEn ? activeEn.rawPrompt : activeExample.rawPrompt;

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [loadingPoster, setLoadingPoster] = useState(true);
  const [posterError, setPosterError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoadingPoster(true);
    setPosterError(false);

    renderPosterImageFromPdf(activeExample.pdfPosterPage)
      .then((url) => {
        if (!cancelled) {
          setPosterUrl(url);
          setLoadingPoster(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPosterUrl(null);
          setPosterError(true);
          setLoadingPoster(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [activeExample.pdfPosterPage]);

  const handleSelectExample = (ex: ProfileCardExample) => {
    onSelectExampleId(ex.id);
  };

  const handleCopyPrompt = async (id: string, promptText: string) => {
    const ok = await copyTextToClipboard(promptText);
    if (ok) {
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white/95 border border-teal-200/80 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 border border-teal-200 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
            <BookOpen className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <span className="text-xs font-semibold text-teal-700">
              {lang === 'en'
                ? 'Reference · Future Profile Card Examples.pdf (27 pages)'
                : '참고 자료 · 나의 미래 프로필 카드 만들기.pdf (총 27쪽)'}
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">
              {lang === 'en'
                ? '12 Future Career Profile Card Examples'
                : '12가지 미래 직업 프로필 카드 예시 자료실'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {lang === 'en'
                ? 'Select a career on the left to inspect its completed profile card poster and sample prompt.'
                : '왼쪽에서 직업을 선택하면 완성된 프로필 카드 이미지 예시와 프롬프트를 바로 확인할 수 있습니다.'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <a
            href={LESSON_ASSETS.profileCardExamplesPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 whitespace-nowrap"
          >
            <span>{lang === 'en' ? 'Open PDF in New Tab' : 'PDF 새 창 열기'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
          <a
            href={LESSON_ASSETS.profileCardExamplesPdf}
            download="나의_미래_프로필_카드_만들기_예시.pdf"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{lang === 'en' ? 'Download Example PDF' : '예시 PDF 다운로드'}</span>
          </a>
        </div>
      </div>

      {/* Main Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 12 Job Selector + Selected Prompt */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 space-y-5">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2.5">
              {lang === 'en' ? 'Select Career Example (12)' : '직업 예시 선택 (12종)'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
              {PROFILE_CARD_EXAMPLES.map((ex) => {
                const isSelected = ex.id === activeExample.id;
                const title =
                  lang === 'en'
                    ? (PROFILE_CARD_EXAMPLES_EN[ex.id]?.jobTitle ?? ex.jobTitle)
                    : ex.jobTitle;
                return (
                  <button
                    key={ex.id}
                    type="button"
                    onClick={() => handleSelectExample(ex)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border text-left transition-colors flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-teal-50 border-teal-600 text-teal-900 font-semibold'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate">
                      {ex.number}. {title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {lang === 'en'
                  ? `${activeExample.number}. ${activeJobTitle} Sample Prompt`
                  : `${activeExample.number}. ${activeJobTitle} 예시 프롬프트`}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {lang === 'en'
                  ? `PDF p.${activeExample.pdfPromptPage} Prompt · p.${activeExample.pdfPosterPage} Poster`
                  : `PDF ${activeExample.pdfPromptPage}쪽 프롬프트 · ${activeExample.pdfPosterPage}쪽 완성 포스터`}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 max-h-[300px] overflow-y-auto">
              <pre className="whitespace-pre-wrap break-words text-xs leading-relaxed text-slate-800 font-sans">
                {activePrompt}
              </pre>
            </div>

            <button
              type="button"
              onClick={() => handleCopyPrompt(activeExample.id, activePrompt)}
              className={`w-full py-2.5 px-4 text-sm font-semibold text-white rounded-lg transition-colors flex items-center justify-center gap-2 ${
                copiedId === activeExample.id
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-teal-600 hover:bg-teal-700'
              }`}
            >
              {copiedId === activeExample.id ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>{lang === 'en' ? 'Copied!' : '복사 완료!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  <span>{lang === 'en' ? 'Copy Prompt' : '프롬프트 복사'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Profile Card Image Preview Only */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center shrink-0">
                <ImageIcon className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {lang === 'en'
                    ? `${activeExample.number}. ${activeJobTitle} — Future Profile Card Example`
                    : `${activeExample.number}. ${activeJobTitle} — 나의 미래 프로필 카드 이미지 예시`}
                </h3>
              </div>
            </div>
            <span className="text-xs font-mono tabular-nums text-slate-400 shrink-0">
              PDF p.{activeExample.pdfPosterPage}
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-4 flex items-center justify-center min-h-[540px]">
            {loadingPoster ? (
              <div className="flex flex-col items-center gap-2.5 text-slate-500 py-16">
                <Loader2 className="w-7 h-7 animate-spin text-teal-600" aria-hidden="true" />
                <span className="text-sm font-medium">
                  {lang === 'en'
                    ? 'Loading profile card example image...'
                    : '프로필 카드 이미지 예시를 불러오는 중입니다...'}
                </span>
              </div>
            ) : posterError || !posterUrl ? (
              <div className="text-center space-y-3 py-12 px-4">
                <p className="text-sm text-slate-600">
                  {lang === 'en'
                    ? 'Unable to preview the image here. Please use the “Open PDF in New Tab” button above.'
                    : '이미지를 불러오는 데 문제가 발생했습니다. 상단의 ‘PDF 새 창 열기’ 버튼을 이용해 확인해 주세요.'}
                </p>
                <a
                  href={`${LESSON_ASSETS.profileCardExamplesPdf}#page=${activeExample.pdfPosterPage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700"
                >
                  <span>
                    {lang === 'en' ? 'Open Poster in New Tab' : '새 창에서 포스터 열기'}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            ) : (
              <img
                src={posterUrl}
                alt={
                  lang === 'en'
                    ? `${activeJobTitle} Future Profile Card example image`
                    : `${activeJobTitle} 나의 미래 프로필 카드 예시 이미지`
                }
                className="w-full max-w-[520px] h-auto rounded-lg shadow-sm border border-slate-200 bg-white object-contain"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

