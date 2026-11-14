import { useState } from 'react';
import { Check, Copy, ExternalLink, FileText, X } from 'lucide-react';
import {
  CLASSROOM_LINKS,
  LESSON_ASSETS,
  SHARED_ACCOUNTS,
} from '../data/curriculum';

interface ToolkitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ToolkitModal({ isOpen, onClose }: ToolkitModalProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
    setCopiedText(text);
    window.setTimeout(() => setCopiedText(null), 1800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="toolkit-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 rounded-xl w-full max-w-3xl max-h-[88vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
          <div>
            <h2 id="toolkit-modal-title" className="text-lg font-bold text-slate-900">
              수업 실습 도구 · 공용 계정 · 자료실
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              실습에 필요한 사이트와 수업 PDF 자료를 한곳에서 바로 열 수 있습니다.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="창 닫기"
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* 1. AI & Share Tools */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">1. 실습 사이트 바로가기</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={CLASSROOM_LINKS.chatgpt}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 border border-slate-200 rounded-lg hover:border-blue-400 hover:bg-blue-50/40 transition-colors flex items-center justify-between gap-2"
              >
                <div>
                  <div className="text-sm font-bold text-slate-900">ChatGPT</div>
                  <div className="text-xs text-slate-500">1·3·4단계 실습</div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
              </a>
              <a
                href={CLASSROOM_LINKS.canva}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 border border-slate-200 rounded-lg hover:border-blue-400 hover:bg-blue-50/40 transition-colors flex items-center justify-between gap-2"
              >
                <div>
                  <div className="text-sm font-bold text-slate-900">Canva (캔바)</div>
                  <div className="text-xs text-slate-500">2단계 이미지 생성</div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
              </a>
              <a
                href={CLASSROOM_LINKS.padlet}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 border border-blue-200 bg-blue-50/50 rounded-lg hover:border-blue-500 transition-colors flex items-center justify-between gap-2"
              >
                <div>
                  <div className="text-sm font-bold text-blue-900">패들렛 (Padlet)</div>
                  <div className="text-xs text-blue-700">{CLASSROOM_LINKS.padletDisplay}</div>
                </div>
                <ExternalLink className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </section>

          {/* 2. Lesson PDF Downloads */}
          <section className="pt-4 border-t border-slate-100 space-y-3">
            <h3 className="text-sm font-bold text-slate-900">2. 수업 PDF 자료 열기</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { label: '강의 슬라이드 (AI와 함께 만드는 나의 미래)', url: LESSON_ASSETS.slidesPdf },
                { label: '학생 활동지 (나를 표현하는 단어 찾기)', url: LESSON_ASSETS.worksheetPdf },
                { label: '3단계 AI 캐릭터 선택형 프롬프트 원문', url: LESSON_ASSETS.characterPromptPdf },
                { label: '4단계 나의 미래 프로필 카드 예시집 (12종)', url: LESSON_ASSETS.profileCardExamplesPdf },
              ].map((doc) => (
                <a
                  key={doc.url}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 flex items-center justify-between gap-2"
                >
                  <span className="inline-flex items-center gap-2 truncate">
                    <FileText className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
                    <span className="truncate">{doc.label}</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>

          {/* 3. Shared Accounts Table */}
          <section className="pt-4 border-t border-slate-100 space-y-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                3. 실습용 공용 계정 안내 (ChatGPT · Canva)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                개인 계정이 없을 경우 안내받은 번호의 공용 계정을 클릭해 복사하세요.
              </p>
            </div>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="px-3 py-2 font-semibold">번호</th>
                    <th className="px-3 py-2 font-semibold">아이디 (이메일)</th>
                    <th className="px-3 py-2 font-semibold">비밀번호</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono tabular-nums">
                  {SHARED_ACCOUNTS.map((acc, idx) => (
                    <tr key={acc.id} className="hover:bg-slate-50">
                      <td className="px-3 py-2 text-slate-500">{idx + 1}</td>
                      <td className="px-3 py-2">
                        <button
                          type="button"
                          onClick={() => handleCopy(acc.id)}
                          className="inline-flex items-center gap-1.5 text-slate-800 hover:text-blue-600"
                        >
                          <span>{acc.id}</span>
                          {copiedText === acc.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                          ) : (
                            <Copy className="w-3 h-3 text-slate-400" aria-hidden="true" />
                          )}
                        </button>
                      </td>
                      <td className="px-3 py-2">
                        <button
                          type="button"
                          onClick={() => handleCopy(acc.pw)}
                          className="inline-flex items-center gap-1.5 text-slate-700 hover:text-blue-600"
                        >
                          <span>{acc.pw}</span>
                          {copiedText === acc.pw ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                          ) : (
                            <Copy className="w-3 h-3 text-slate-400" aria-hidden="true" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
