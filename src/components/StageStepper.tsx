import {
  BookOpen,
  Compass,
  GraduationCap,
  IdCard,
  Image,
  UserRound,
} from 'lucide-react';
import { ActiveTab } from '../types/lesson';

interface StageStepperProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  keywords: [string, string, string];
  chosenJob: string;
}

const STEPS: Array<{
  id: ActiveTab;
  num: string;
  title: string;
  tool: string;
  icon: typeof Compass;
  activeClass: string;
  idleClass: string;
  numIdleClass: string;
}> = [
  {
    id: 'stage1',
    num: '01',
    title: '핵심 키워드로 직업 탐색',
    tool: 'ChatGPT',
    icon: Compass,
    activeClass: 'bg-sky-600 border-sky-600 text-white shadow-sm',
    idleClass: 'bg-sky-50/70 border-sky-200/80 text-slate-800 hover:bg-sky-100/70 hover:border-sky-300',
    numIdleClass: 'text-sky-700',
  },
  {
    id: 'stage2',
    num: '02',
    title: '20년 후 미래 상상하기',
    tool: 'Canva · ChatGPT',
    icon: Image,
    activeClass: 'bg-rose-500 border-rose-500 text-white shadow-sm',
    idleClass: 'bg-rose-50/70 border-rose-200/80 text-slate-800 hover:bg-rose-100/70 hover:border-rose-300',
    numIdleClass: 'text-rose-700',
  },
  {
    id: 'stage3',
    num: '03',
    title: '미래의 나 캐릭터 만들기',
    tool: 'ChatGPT',
    icon: UserRound,
    activeClass: 'bg-violet-600 border-violet-600 text-white shadow-sm',
    idleClass: 'bg-violet-50/70 border-violet-200/80 text-slate-800 hover:bg-violet-100/70 hover:border-violet-300',
    numIdleClass: 'text-violet-700',
  },
  {
    id: 'stage4',
    num: '04',
    title: '나의 미래 프로필 카드',
    tool: 'ChatGPT',
    icon: IdCard,
    activeClass: 'bg-amber-500 border-amber-500 text-slate-950 shadow-sm',
    idleClass: 'bg-amber-50/75 border-amber-200/90 text-slate-800 hover:bg-amber-100/70 hover:border-amber-300',
    numIdleClass: 'text-amber-700',
  },
  {
    id: 'examples',
    num: '참고',
    title: '프로필 카드 예시 자료실',
    tool: 'PDF 12종',
    icon: BookOpen,
    activeClass: 'bg-teal-600 border-teal-600 text-white shadow-sm',
    idleClass: 'bg-teal-50/70 border-teal-200/80 text-slate-800 hover:bg-teal-100/70 hover:border-teal-300',
    numIdleClass: 'text-teal-700',
  },
];

export function StageStepper({
  activeTab,
  onSelectTab,
  keywords,
  chosenJob,
}: StageStepperProps) {
  const keywordPreview = keywords.filter((k) => k.trim()).join(', ') || '미입력';

  return (
    <section aria-label="활동 흐름 및 현재 설정" className="mb-6">
      <div className="bg-white/95 border border-sky-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-100 via-amber-50 to-sky-100 border border-rose-200/70 text-rose-600 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold text-rose-600">
                나를 발견하고, 미래를 상상하고, 꿈을 디자인하다
              </p>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                수업 단계별 프롬프트 생성기
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-slate-700 bg-gradient-to-r from-sky-50 via-white to-rose-50 border border-sky-200/80 rounded-xl px-4 py-2.5">
            <span>
              내 키워드: <strong className="font-semibold text-slate-900">{keywordPreview}</strong>
            </span>
            <span aria-hidden="true" className="text-slate-300">|</span>
            <span>
              선택한 직업: <strong className="font-semibold text-rose-700">{chosenJob || '미정'}</strong>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-4">
          {STEPS.map((step) => {
            const isActive = activeTab === step.id;
            const Icon = step.icon;
            const isAmberActive = isActive && step.id === 'stage4';

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onSelectTab(step.id)}
                className={`text-left p-3.5 rounded-xl border transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                  isActive ? step.activeClass : step.idleClass
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span
                    className={`inline-flex items-center gap-1.5 font-mono tabular-nums font-bold ${
                      isActive
                        ? isAmberActive
                          ? 'text-slate-900'
                          : 'text-white/95'
                        : step.numIdleClass
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{step.num}</span>
                  </span>
                  <span
                    className={`truncate ${
                      isActive
                        ? isAmberActive
                          ? 'text-slate-800'
                          : 'text-white/80'
                        : 'text-slate-500'
                    }`}
                  >
                    {step.tool}
                  </span>
                </div>
                <div
                  className={`mt-1.5 text-sm font-bold leading-snug truncate ${
                    isActive
                      ? isAmberActive
                        ? 'text-slate-950'
                        : 'text-white'
                      : 'text-slate-900'
                  }`}
                >
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
