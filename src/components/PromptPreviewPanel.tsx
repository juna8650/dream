import { useEffect, useId, useRef, useState } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  FileCheck2,
  ImagePlus,
  Pencil,
  RotateCcw,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { CLASSROOM_LINKS } from '../data/curriculum';
import { copyTextToClipboard } from '../utils/clipboard';

interface PromptPreviewPanelProps {
  title: string;
  subtitle: string;
  promptText: string;
  copyLabel?: string;
  toolLink?: 'chatgpt' | 'canva' | 'both';
  showPadletLink?: boolean;
  reminderBanner?: string;
  accent?: 'sky' | 'rose' | 'violet' | 'amber';
}

const ACCENT_MAP = {
  sky: {
    bar: 'from-sky-400 to-cyan-300',
    iconBox: 'bg-sky-400/20 text-sky-300 border-sky-400/30',
    kicker: 'text-sky-300',
    focusBorder: 'focus-within:border-sky-400/75',
    btn: 'bg-sky-400 text-slate-950 hover:bg-sky-300 focus-visible:outline-sky-300',
  },
  rose: {
    bar: 'from-rose-400 to-amber-300',
    iconBox: 'bg-rose-400/20 text-rose-300 border-rose-400/30',
    kicker: 'text-rose-300',
    focusBorder: 'focus-within:border-rose-400/75',
    btn: 'bg-rose-400 text-slate-950 hover:bg-rose-300 focus-visible:outline-rose-300',
  },
  violet: {
    bar: 'from-violet-400 to-sky-400',
    iconBox: 'bg-violet-400/20 text-violet-300 border-violet-400/30',
    kicker: 'text-violet-300',
    focusBorder: 'focus-within:border-violet-400/75',
    btn: 'bg-violet-400 text-slate-950 hover:bg-violet-300 focus-visible:outline-violet-300',
  },
  amber: {
    bar: 'from-amber-300 to-rose-400',
    iconBox: 'bg-amber-400/20 text-amber-300 border-amber-400/30',
    kicker: 'text-amber-300',
    focusBorder: 'focus-within:border-amber-300/75',
    btn: 'bg-amber-300 text-slate-950 hover:bg-amber-200 focus-visible:outline-amber-300',
  },
};

export function PromptPreviewPanel({
  title,
  subtitle,
  promptText,
  copyLabel,
  toolLink = 'chatgpt',
  showPadletLink = false,
  reminderBanner,
  accent = 'sky',
}: PromptPreviewPanelProps) {
  const { lang } = useLanguage();
  const editorId = useId();
  const [copied, setCopied] = useState(false);
  const [editedText, setEditedText] = useState(promptText);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const theme = ACCENT_MAP[accent];

  const isCustomized = editedText !== promptText;
  const effectiveCopyLabel =
    copyLabel ?? (lang === 'en' ? 'Copy Completed Prompt' : '완성된 프롬프트 복사');

  useEffect(() => {
    setEditedText(promptText);
  }, [promptText]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(Math.max(el.scrollHeight, 220), 430)}px`;
  }, [editedText]);

  const handleCopy = async () => {
    const ok = await copyTextToClipboard(editedText);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div className="bg-[#162038] border border-[#28385C] text-white rounded-2xl overflow-hidden flex flex-col lg:sticky lg:top-6 shadow-md">
      <div className={`h-1.5 w-full bg-gradient-to-r ${theme.bar}`} />
      <div className="p-5 sm:p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4 pb-3 border-b border-white/10">
          <div className="flex items-start gap-3">
            <div
              className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${theme.iconBox}`}
            >
              <FileCheck2 className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <span className={`text-xs font-semibold block mb-0.5 ${theme.kicker}`}>
                {lang === 'en'
                  ? 'Prompt Output · Edit directly and copy'
                  : '완성된 프롬프트 영역 · 직접 수정 후 복사 가능'}
              </span>
              <h2 className="text-lg font-bold text-white">{title}</h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">{subtitle}</p>
            </div>
          </div>
          <span className="text-xs font-mono tabular-nums text-slate-300 shrink-0 pt-1">
            {lang === 'en' ? `${editedText.length} chars` : `${editedText.length}자`}
          </span>
        </div>

        {reminderBanner && (
          <div className="flex items-start gap-3 bg-gradient-to-r from-amber-400/25 via-orange-400/20 to-amber-400/15 border border-amber-300/80 text-amber-50 rounded-xl px-3.5 py-3 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-amber-300 text-slate-950 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <ImagePlus className="w-4 h-4 stroke-[2.25]" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-amber-300 mb-0.5">
                {lang === 'en' ? 'Important Step' : '필수 확인'}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-white leading-snug">
                {reminderBanner}
              </p>
            </div>
          </div>
        )}

        <div
          className={`bg-[#0B1222] border border-[#2B3D63] rounded-xl p-3.5 transition-colors ${theme.focusBorder}`}
        >
          <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-white/10">
            <label
              htmlFor={editorId}
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 cursor-text"
            >
              <Pencil className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
              <span>
                {isCustomized
                  ? lang === 'en'
                    ? 'Custom edits are applied'
                    : '직접 수정한 내용이 적용되어 있습니다'
                  : lang === 'en'
                    ? 'Click here to edit the prompt directly'
                    : '이 칸을 눌러 내용을 직접 고칠 수 있어요'}
              </span>
            </label>
            {isCustomized && (
              <button
                type="button"
                onClick={() => setEditedText(promptText)}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-200 bg-white/10 hover:bg-white/15 rounded-md transition-colors whitespace-nowrap"
              >
                <RotateCcw className="w-3 h-3" aria-hidden="true" />
                <span>{lang === 'en' ? 'Reset' : '원래대로'}</span>
              </button>
            )}
          </div>
          <textarea
            id={editorId}
            ref={textareaRef}
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            aria-label={title}
            spellCheck={false}
            className="w-full bg-transparent text-sm leading-relaxed text-slate-100 font-sans resize-y focus:outline-none min-h-[220px] max-h-[430px]"
          />
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
            copied
              ? 'bg-emerald-500 text-white hover:bg-emerald-400 focus-visible:outline-emerald-400'
              : theme.btn
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>
                {lang === 'en'
                  ? 'Copied! Paste (Ctrl+V) into your AI tool'
                  : '복사 완료! AI 사이트에 붙여넣기(Ctrl+V) 하세요'}
              </span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{effectiveCopyLabel}</span>
            </>
          )}
        </button>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          {(toolLink === 'chatgpt' || toolLink === 'both') && (
            <a
              href={CLASSROOM_LINKS.chatgpt}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-100 bg-[#1F2D4D] border border-[#344873] rounded-lg hover:bg-[#293B63] transition-colors whitespace-nowrap"
            >
              <span>{lang === 'en' ? 'Open ChatGPT' : 'ChatGPT 바로가기'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-sky-300" aria-hidden="true" />
            </a>
          )}
          {(toolLink === 'canva' || toolLink === 'both') && (
            <a
              href={CLASSROOM_LINKS.canva}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-100 bg-[#1F2D4D] border border-[#344873] rounded-lg hover:bg-[#293B63] transition-colors whitespace-nowrap"
            >
              <span>{lang === 'en' ? 'Open Canva' : 'Canva 바로가기'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-sky-300" aria-hidden="true" />
            </a>
          )}
          {showPadletLink && (
            <a
              href={CLASSROOM_LINKS.padlet}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-100 bg-rose-500/20 border border-rose-400/40 rounded-lg hover:bg-rose-500/30 transition-colors whitespace-nowrap"
            >
              <span>{lang === 'en' ? 'Upload to Padlet' : '패들렛 작품 올리기'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-rose-200" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

