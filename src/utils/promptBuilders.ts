import { StudentWorkspaceState } from '../types/lesson';

export function buildStage1Prompt(state: StudentWorkspaceState): string {
  const k1 = state.keywords[0].trim() || '핵심 키워드1';
  const k2 = state.keywords[1].trim() || '핵심 키워드2';
  const k3 = state.keywords[2].trim() || '핵심 키워드3';
  const fieldPart =
    state.jobField === '분야 무관 (전체)' || !state.jobField.trim()
      ? ''
      : `${state.jobField.trim()} `;

  return [
    '너는 중학생의 진로 탐색을 도와주는 친절한 선생님이야.',
    `나의 핵심 키워드 3가지는 '${k1}', '${k2}', '${k3}'이야.`,
    `이 키워드와 관련된 ${fieldPart}미래 직업 5개를 추천해 줘.`,
    '각 직업이 하는 일, 추천한 이유, 필요한 능력, 중학생 때 해볼 수 있는 활동을 표로 정리해 줘.',
    '중학생이 이해하기 쉽게 설명하고, 추천 결과는 참고용이라는 점도 알려줘.',
  ].join('\n\n');
}

export function buildStage2Prompt(state: StudentWorkspaceState): string {
  const k1 = state.keywords[0].trim() || '[핵심 키워드1]';
  const k2 = state.keywords[1].trim() || '[핵심 키워드2]';
  const k3 = state.keywords[2].trim() || '[핵심 키워드3]';
  const job = state.chosenJob.trim() || '[미래 직업]';
  const place = state.workplace.trim() || '[일하는 장소]';
  const actionRaw = state.workAction.trim() || '[하고 있는 일]';
  const action = actionRaw.startsWith('[') || actionRaw.endsWith('.') ? actionRaw : `${actionRaw}.`;
  const mood = state.mood.trim() || '[그림의 분위기]';
  const style = state.imageStyle.trim() || '3D 애니메이션 스타일';

  const genderLine =
    !state.gender || state.gender === '선택 안 함'
      ? `20년 후 나는 ${job}(으)로 일하고 있는 한국인이다.`
      : `20년 후 나는 ${job}(으)로 일하고 있는 한국 ${state.gender}이다.`;

  const ratioClause =
    !state.aspectRatio || state.aspectRatio === '자유'
      ? '생성해 줘.'
      : `${state.aspectRatio} 비율로 생성해 줘.`;

  const lines = [
    `나의 핵심 키워드는 ${k1}, ${k2}, ${k3}이다.`,
    genderLine,
    `나는 ${place}에서 ${action}`,
    `분위기는 ${mood} 느낌이다.`,
    `${style}로 미래의 나를 표현한 이미지를 ${ratioClause}`,
    '직업의 특징이 잘 드러나는 의상과 소품을 포함해 줘.',
  ];

  return lines.join('\n');
}

export function buildStage3CoachPrompt(state: StudentWorkspaceState): string {
  const filledKeywords = state.keywords.map((k) => k.trim()).filter(Boolean);
  const job = state.chosenJob.trim();

  let seedNote = '이제 핵심 키워드 3가지 선택부터 시작해 줘!';
  if (filledKeywords.length > 0 && job) {
    seedNote = `(참고: 나의 현재 핵심 키워드는 '${filledKeywords.join(', ')}'이고, 희망하는 미래 직업은 '${job}'이야. 1단계 '나의 꿈'은 이 내용으로 바로 확정하고 2단계 외모 질문부터 시작해도 좋고, 바꾸고 싶으면 물어봐 줘!)`;
  } else if (filledKeywords.length > 0) {
    seedNote = `(참고: 나의 현재 핵심 키워드는 '${filledKeywords.join(', ')}'이야. 이 키워드를 반영해 미래 직업 선택부터 이어서 진행해 줘!)`;
  } else if (job) {
    seedNote = `(참고: 내가 희망하는 미래 직업은 '${job}'이야. 이 직업을 바탕으로 핵심 키워드 3가지를 정한 뒤 이어서 진행해 줘!)`;
  }

  const extendedRule = state.includeExtendedStyle
    ? `\n\n확장형: 선택한 추가 스타일\n• 기본형의 얼굴, 외모, 의상, 자세, 소품과 독창적인 개성을 유지하고 그림체만 변경한다.`
    : '';

  const extendedQuestion = state.includeExtendedStyle
    ? `\n7. 추가 스타일: 웹툰, 애니메이션, 픽셀아트, 동화책, 미래 SF 중 1개`
    : '';

  const extendedResultLine = state.includeExtendedStyle
    ? `\n4. 확장형 이미지 생성 프롬프트: ChatGPT용, Canva용`
    : '';

  return `🌟 미래의 나, AI 캐릭터 디자인

너는 중학생의 진로 캐릭터 제작을 도와주는 친절한 AI 디자인 코치야.
나의 핵심 키워드 3가지와 미래 직업을 바탕으로 20년 후 미래의 나를 귀엽고 개성 있는 캐릭터로 만들어 줘.

1. 진행 방법
• 한 번에 질문을 하나씩 해 줘.
• 모든 질문에 1~5번 선택지와 '6. 직접 입력하기'를 보여줘.
• 질문마다 선택 개수를 명시해 줘.
• 번호나 내용을 입력하면 기억하고 다음 질문으로 넘어가 줘.
• 선택 개수를 초과하면 다시 선택하도록 안내해 줘.
• 기존 선택은 언제든 수정할 수 있고, 이미 정한 내용은 다시 묻지 마.
• 미래 직업에 어울리는 선택지를 추천해 줘.

2. 질문 순서
1. 나의 꿈: 핵심 키워드(3개), 미래 직업(1개)
2. 외모: 성별 표현, 피부색, 얼굴형, 헤어스타일(각 1개)
3. 의상: 직업에 어울리는 옷(1개)
4. 행동과 소품: 자세(1개), 핵심 소품(1~2개)
5. 표정과 분위기: 1개
6. 색상: 의상 색상, 전체 이미지 느낌(각 1개)${extendedQuestion}

3. 이미지 제작 조건
기본형: 고품질 3D 디자이너 토이 컬렉션 피규어
• 한국인 성인형 캐릭터로, 큰 눈과 귀여운 비율을 유지하되 지나치게 유아적이지 않게 표현한다.
• 학생이 선택한 직업, 외모, 의상, 자세, 표정을 정확히 반영한다.
• 얼굴형, 눈매, 헤어스타일, 체형, 의상 디테일을 개성 있게 표현하여 다른 캐릭터와 구별되는 독창적인 외형으로 디자인한다.
• 직업 활동이 드러나는 생동감 있는 자세와 핵심 소품 1~2개를 중심으로 구성하고, 필요할 때만 작은 장식을 추가한다.
• 고급 디자이너 토이의 정교한 입체 질감과 고품질 3D 렌더링을 적용한다.
• Canva 스타일의 세련된 레이아웃, 흰색 배경, 전신 구도, 선명한 색감, 부드러운 조명으로 스티커처럼 활용하기 좋게 완성한다.${extendedRule}

4. 최종 결과
모든 선택을 마치면 다음 내용을 보여줘.
1. 캐릭터 설정표 (AI가 추가한 소품·장식 포함)
2. 캐릭터 이름 3개와 한 줄 소개
3. 기본형 이미지 생성 프롬프트: ChatGPT용, Canva용${extendedResultLine}

이미지 생성 프롬프트는 각 도구의 특성에 맞는 구체적인 한국어 문장으로 작성하고, 확정된 설정과 이미지 제작 조건을 모두 반영해 줘.
아직 이미지는 생성하지 말고, 마지막에 다음 메뉴를 보여줘.
1. 기본형 이미지 생성
2. 확장형 이미지 생성
3. 일부 설정 수정
4. 처음부터 다시 선택

${seedNote}`;
}

export function buildStage3DirectPrompt(state: StudentWorkspaceState): string {
  const k1 = state.keywords[0].trim() || '[핵심 키워드1]';
  const k2 = state.keywords[1].trim() || '[핵심 키워드2]';
  const k3 = state.keywords[2].trim() || '[핵심 키워드3]';
  const job = state.chosenJob.trim() || '[미래 직업]';
  const props = state.charProps.trim() || '[직업 관련 소품]';
  const action = state.charAction.trim() || '[행동 및 자세]';
  const expression = state.charExpression.trim() || '[표정과 분위기]';
  const genderPart =
    !state.gender || state.gender === '선택 안 함' ? '' : `${state.gender} `;
  const style = state.charStyle.trim() || '[캐릭터 스타일]';

  return [
    `나의 미래 직업은 ${job}이다.`,
    `${k1}, ${k2}, ${k3}을(를) 상징하는 귀여운 캐릭터를 만들어 줘.`,
    `직업을 나타내는 ${props}을(를) 활용하고, ${action}으로 표현해 줘.`,
    `${expression}의 ${genderPart}한국인 성인형 캐릭터이며,`,
    `${style}로 만들어 줘.`,
    '흰색 배경, 전신 구도, 고품질 렌더링, 스티커처럼 사용할 수 있는 디자인으로 생성해 줘.',
  ].join('\n');
}

export function buildStage4Prompt(state: StudentWorkspaceState): string {
  const name = state.studentName.trim() || '[이름]';
  const job = state.chosenJob.trim() || '[미래 직업]';
  const age = state.studentAge.trim() || '[나이]';
  const mbti = state.mbti.trim() || '[MBTI]';
  const motto = state.motto.trim() || '[좌우명]';
  const keywords =
    state.profileKeywords.trim() ||
    state.keywords.filter((k) => k.trim()).join(', ') ||
    '[나를 표현하는 키워드]';
  const likes = state.likes.trim() || '[좋아하는 것]';
  const strengthsList = state.strengths.filter((s) => s.trim().length > 0);
  const goalsList = state.goals.filter((g) => g.trim().length > 0);
  const pledge = state.pledge.trim() || '[앞으로의 다짐]';
  const message = state.messageToFuture.trim() || '[미래의 나에게 한마디]';
  const colorTheme = state.colorTheme.trim() || '[포스터 색상 분위기]';

  const aiSection = state.aiViewAuto
    ? '- 위 내용을 바탕으로 3~4줄로 자연스럽게 작성해 줘.'
    : `- ${state.aiViewCustom.trim() || '위 내용을 바탕으로 자연스럽게 작성해 줘.'}`;

  const strengthLines =
    strengthsList.length > 0
      ? strengthsList.map((s) => `- ${s}`).join('\n')
      : '- [강점 1]\n- [강점 2]\n- [강점 3]';

  const goalLines =
    goalsList.length > 0
      ? goalsList.map((g) => `- ${g}`).join('\n')
      : '- [미래 목표 1]\n- [미래 목표 2]\n- [미래 목표 3]';

  return `'나의 미래 프로필 카드'를 만들어 줘. 전체 스타일은 Canva에서 만든 것처럼 깔끔하고 세련된 학생 포트폴리오 디자인으로 만들어 줘.

■ 제목 : 나의 미래 프로필 카드

■ 기본 정보
- 이름 : ${name}
- 미래 직업 : ${job}
- 나이 : ${age}
- MBTI : ${mbti}
- 좌우명 : ${motto}

■ 나를 표현하는 키워드
- ${keywords}

■ 좋아하는 것
- ${likes}

■ 나의 강점 BEST
${strengthLines}

■ AI가 본 나의 모습
${aiSection}

■ 미래 목표
${goalLines}

■ 앞으로의 다짐
- ${pledge}

■ 미래의 나에게 한마디
- ${message}

■ 디자인 조건
- 첨부한 캐릭터를 크게 배치
- 귀여운 3D 스티커 스타일
- Canva 느낌의 깔끔한 레이아웃
- 한국어가 자연스럽게 잘 보이도록 표현
- ${colorTheme}
- A4 세로 비율, 학생 작품 전시용 포스터 느낌
- 고해상도, 둥근 카드 디자인, 여백이 충분한 레이아웃
- 직업에 어울리는 귀여운 아이콘과 소품 일러스트를 적절히 활용

업로드한 캐릭터를 반영해서 미래 프로필 카드를 이미지로 생성해 줘.`;
}
