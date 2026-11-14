import { useEffect, useState } from 'react';
import { Check, Copy, ExternalLink, QrCode, X } from 'lucide-react';
import { CLASSROOM_LINKS, LESSON_ASSETS } from '../data/curriculum';

interface MentimeterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MentimeterModal({ isOpen, onClose }: MentimeterModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(CLASSROOM_LINKS.mentimeter);
    } catch {
      // ignore
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mentimeter-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 rounded-2xl w-full max-w-md overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-sky-500 via-indigo-500 to-teal-400" />
        <div className="flex items-center justify-between gap-3 px-6 pt-5 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-100 border border-sky-200 text-sky-700 flex items-center justify-center shrink-0">
              <QrCode className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2
              id="mentimeter-modal-title"
              className="text-base font-bold text-slate-900"
            >
              멘티미터(Mentimeter) QR코드
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="QR코드 창 닫기"
            className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 flex flex-col items-center text-center space-y-4">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            작성한 활동지를 보면서 스마트폰 카메라로 아래 QR코드를 스캔해 나의 키워드를 공유해 보세요.
          </p>

          <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-xs">
            <img
              src={LESSON_ASSETS.mentimeterQr}
              alt="멘티미터 접속 QR코드"
              className="w-60 h-60 sm:w-64 sm:h-64 object-contain"
            />
          </div>

          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-2">
            <span className="text-xs font-mono text-slate-700 truncate">
              {CLASSROOM_LINKS.mentimeter}
            </span>
            <button
              type="button"
              onClick={handleCopyUrl}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                  <span className="text-emerald-700">복사됨</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>주소 복사</span>
                </>
              )}
            </button>
          </div>

          <div className="w-full flex items-center gap-2.5 pt-1">
            <a
              href={CLASSROOM_LINKS.mentimeter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 text-sm font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition-colors whitespace-nowrap"
            >
              <span>멘티미터 바로 열기</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
