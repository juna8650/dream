import { ExternalLink, QrCode, Rocket } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { CLASSROOM_LINKS } from '../data/curriculum';
import { ActiveTab } from '../types/lesson';

interface HeaderProps {
  onSelectTab: (tab: ActiveTab) => void;
  onOpenMentimeter: () => void;
}

export function Header({ onSelectTab, onOpenMentimeter }: HeaderProps) {
  const { lang } = useLanguage();

  return (
    <header className="bg-gradient-to-r from-[#162038] via-[#1C2D54] to-[#243B70] border-b border-[#2D437A] shadow-sm">
      <div className="h-1 w-full bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400" />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onSelectTab('stage1')}
          className="inline-flex items-center gap-2.5 text-left font-bold text-lg tracking-tight text-white whitespace-nowrap shrink-0 hover:text-sky-200 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300 rounded"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-400 text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
            <Rocket className="w-4 h-4" aria-hidden="true" />
          </span>
          <span>
            {lang === 'en' ? 'My Future with AI' : 'AI와 함께 만드는 나의 미래'}
          </span>
        </button>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenMentimeter}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-sky-950 bg-sky-50 border border-sky-200 rounded-lg hover:bg-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 shadow-xs"
          >
            <QrCode className="w-4 h-4 text-sky-600" aria-hidden="true" />
            <span>{lang === 'en' ? 'Mentimeter QR' : '멘티미터 QR'}</span>
          </button>
          <a
            href={CLASSROOM_LINKS.padlet}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 shadow-xs"
          >
            <ExternalLink className="w-4 h-4 text-slate-900" aria-hidden="true" />
            <span>{lang === 'en' ? 'Go to Padlet' : '패들렛 이동'}</span>
          </a>
        </div>
      </div>
    </header>
  );
}

