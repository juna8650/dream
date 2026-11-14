import { ExternalLink, QrCode, Rocket } from 'lucide-react';
import { CLASSROOM_LINKS } from '../data/curriculum';
import { ActiveTab } from '../types/lesson';

interface HeaderProps {
  onSelectTab: (tab: ActiveTab) => void;
  onOpenMentimeter: () => void;
}

export function Header({ onSelectTab, onOpenMentimeter }: HeaderProps) {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-sky-200/70">
      <div className="h-1.5 w-full bg-gradient-to-r from-sky-400 via-rose-400 to-amber-300" />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onSelectTab('stage1')}
          className="inline-flex items-center gap-2.5 text-left font-bold text-lg tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-sky-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 rounded"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Rocket className="w-4 h-4" aria-hidden="true" />
          </span>
          <span>AI와 함께 만드는 나의 미래</span>
        </button>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenMentimeter}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-sky-900 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            <QrCode className="w-4 h-4 text-sky-600" aria-hidden="true" />
            <span>멘티미터 QR</span>
          </button>
          <a
            href={CLASSROOM_LINKS.padlet}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#1B2541] rounded-lg hover:bg-[#27355C] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 shadow-xs"
          >
            <ExternalLink className="w-4 h-4 text-amber-300" aria-hidden="true" />
            <span>패들렛 이동</span>
          </a>
        </div>
      </div>
    </header>
  );
}
