import { Language } from '../contexts/LanguageContext';

export interface JobRecommendationSet {
  workplaces: string[];
  actions: string[];
}

interface JobRecommendationRule {
  keywords: string[];
  workplaces: string[];
  actions: string[];
  workplacesEn: string[];
  actionsEn: string[];
}

const JOB_RECOMMENDATION_RULES: JobRecommendationRule[] = [
  {
    keywords: ['게임 개발', '게임개발', '게임 디자이너', '게임 기획', 'game dev', 'game designer'],
    workplaces: ['대형 게임 회사', '미래형 게임 개발 스튜디오', '인디 게임 창작실'],
    actions: [
      '새로운 게임을 개발하고 있으며 캐릭터와 게임 화면이 모니터에 나타나 있다',
      '팀원들과 함께 가상현실 게임의 새로운 스테이지를 테스트하고 있다',
      '대형 모니터 앞에서 독창적인 게임 캐릭터의 움직임을 구현하고 있다',
    ],
    workplacesEn: ['a major game company', 'a futuristic game studio', 'an indie game workshop'],
    actionsEn: [
      'developing a new game with characters and gameplay screens visible on the monitor',
      'testing a brand-new virtual reality game stage together with teammates',
      'animating an original game character in front of a wide display monitor',
    ],
  },
  {
    keywords: ['프로게이머', 'e스포츠', '이스포츠', 'esports', 'pro gamer'],
    workplaces: ['열기가 가득한 e스포츠 경기장', '프로 게임단 전용 연습실', '화려한 게임 대회 무대'],
    actions: [
      '팀원들과 헤드셋을 쓰고 호흡을 맞추며 전략적인 경기를 펼치고 있다',
      '게이밍 모니터에 집중하며 멋진 실력으로 대회를 치르고 있다',
      '경기를 마친 뒤 팬들을 향해 환하게 웃으며 손을 흔들고 있다',
    ],
    workplacesEn: ['an energetic esports arena', 'a pro gaming team practice room', 'a grand tournament stage'],
    actionsEn: [
      'wearing a headset and coordinating with teammates during a strategic match',
      'focusing intently on the gaming monitor during an exciting tournament',
      'smiling brightly and waving to cheering fans after finishing a match',
    ],
  },
  {
    keywords: ['게임', 'game'],
    workplaces: ['미래형 게임 회사', '게임 개발 스튜디오', 'e스포츠 경기장'],
    actions: [
      '새로운 게임을 개발하고 있으며 캐릭터와 게임 화면이 모니터에 나타나 있다',
      '게임 그래픽과 플레이 장면을 꼼꼼하게 점검하고 있다',
      '게이밍 장비 앞에서 창의적인 게임 아이디어를 구현하고 있다',
    ],
    workplacesEn: ['a futuristic game studio', 'a game development lab', 'an esports arena'],
    actionsEn: [
      'developing a new game with characters and gameplay screens visible on the monitor',
      'carefully reviewing game graphics and playtest scenes',
      'bringing creative game ideas to life in front of a workstation',
    ],
  },
  {
    keywords: ['ai', '인공지능', '개발자', '프로그래머', '코딩', '소프트웨어', '데이터', 'developer', 'programmer', 'coding', 'software', 'data'],
    workplaces: ['최신 AI 연구소', '첨단 IT 테크 기업', '스마트 소프트웨어 개발실'],
    actions: [
      '인공지능 프로그램을 개발하며 홀로그램 화면을 분석하고 있다',
      '사람들의 생활을 편리하게 만드는 새로운 앱과 프로그램을 코딩하고 있다',
      '대형 모니터 앞에서 데이터를 시각화하며 똑똑한 시스템을 설계하고 있다',
    ],
    workplacesEn: ['a cutting-edge AI research lab', 'an advanced IT tech company', 'a smart software engineering studio'],
    actionsEn: [
      'developing an AI program while analyzing holographic data screens',
      'coding new apps and tools that make everyday life more convenient',
      'designing intelligent systems while visualizing data on a wide monitor',
    ],
  },
  {
    keywords: ['우주', '항공', '비행', '파일럿', '천문', 'aerospace', 'space', 'astron', 'pilot', 'aviation'],
    workplaces: ['첨단 우주 항공 연구 센터', '우주선 발사 관제 센터', '항공우주 설계 연구소'],
    actions: [
      '인공위성과 우주선 설계도를 정밀하게 분석하고 있다',
      '로켓 모형과 홀로그램 화면을 보며 우주 탐사 장비를 점검하고 있다',
      '우주 관제 모니터 앞에서 위성의 비행 경로를 확인하고 있다',
    ],
    workplacesEn: ['an advanced aerospace research center', 'a spacecraft mission control center', 'an aerospace design lab'],
    actionsEn: [
      'closely analyzing satellite and spacecraft blueprints',
      'inspecting space exploration gear alongside a rocket model and hologram display',
      'tracking a satellite flight path at a mission control console',
    ],
  },
  {
    keywords: ['로봇', '기계', 'robot', 'mechanic', 'engineer'],
    workplaces: ['최첨단 로봇 연구소', '미래 공학 실험실', '첨단 기술 개발 센터'],
    actions: [
      '사람을 돕는 미래형 로봇을 조립하고 움직임을 테스트하고 있다',
      '태블릿으로 로봇의 정교한 동작 프로그램을 조종하며 점검하고 있다',
      '최신 설계도와 부품을 보며 새로운 기계를 연구하고 있다',
    ],
    workplacesEn: ['a high-tech robotics lab', 'a future engineering workshop', 'an advanced technology center'],
    actionsEn: [
      'assembling a helpful futuristic robot and testing its movements',
      'controlling and fine-tuning a robot’s motion program with a tablet',
      'studying blueprints and precision parts to invent new machines',
    ],
  },
  {
    keywords: ['수의사', '동물', '반려', 'vet', 'animal', 'pet'],
    workplaces: ['따뜻한 분위기의 동물병원', '야생동물 보호 센터', '반려동물 케어 클리닉'],
    actions: [
      '강아지와 고양이를 정성껏 진찰하고 다정하게 돌보고 있다',
      '청진기로 아픈 강아지를 진찰하며 따뜻한 미소를 짓고 있다',
      '반려동물의 건강 상태를 꼼꼼히 살피며 보호자에게 설명하고 있다',
    ],
    workplacesEn: ['a warm and welcoming animal hospital', 'a wildlife rescue center', 'a cozy pet care clinic'],
    actionsEn: [
      'gently examining and caring for puppies and kittens',
      'listening to a puppy’s heartbeat with a stethoscope and smiling warmly',
      'checking a pet’s health and explaining care tips to its owner',
    ],
  },
  {
    keywords: ['웹툰', '만화', '일러스트', '애니메이', '캐릭터 디자이너', 'webtoon', 'comic', 'illustrat', 'animat'],
    workplaces: ['아기자기한 웹툰 작업실', '창의적인 콘텐츠 스튜디오', '햇살이 드는 그림 작업실'],
    actions: [
      '액정 타블렛으로 새로운 웹툰의 명장면을 생동감 있게 그리고 있다',
      '캐릭터 스케치와 스토리 콘티를 펼쳐 놓고 아이디어를 구상하고 있다',
      '화려한 색감으로 주인공의 표정과 배경을 세밀하게 작업하고 있다',
    ],
    workplacesEn: ['a cozy webtoon studio', 'a creative content studio', 'a sunlit illustration workspace'],
    actionsEn: [
      'illustrating a dynamic new webtoon scene on a pen display tablet',
      'brainstorming ideas surrounded by character sketches and storyboards',
      'adding vibrant colors and expressive details to a main character',
    ],
  },
  {
    keywords: ['교사', '선생님', '교수', '강사', '교육', 'teacher', 'professor', 'educat', 'instructor'],
    workplaces: ['햇살이 드는 밝은 교실', '첨단 스마트 교실', '미래형 융합 배움터'],
    actions: [
      '학생들과 눈을 맞추며 재미있고 활기차게 수업을 진행하고 있다',
      '디지털 칠판 앞에서 학생들의 질문에 다정하게 답해 주고 있다',
      '모둠 활동을 하는 학생들 곁에서 환하게 웃으며 격려하고 있다',
    ],
    workplacesEn: ['a bright sunlit classroom', 'an interactive smart classroom', 'a future learning studio'],
    actionsEn: [
      'leading a lively class while making eye contact with students',
      'kindly answering students’ questions in front of a digital whiteboard',
      'encouraging students during group activities with a bright smile',
    ],
  },
  {
    keywords: ['요리', '셰프', '파티시에', '제과', '제빵', '바리스타', 'chef', 'cook', 'baker', 'pastry', 'barista'],
    workplaces: ['세련된 레스토랑 주방', '오픈 키친 쿠킹 스튜디오', '향기로운 베이커리 공방'],
    actions: [
      '정성을 담아 창의적이고 먹음직스러운 요리를 만들고 있다',
      '완성된 요리에 마지막 장식을 올리며 자신감 있게 미소 짓고 있다',
      '신선한 재료를 손질하며 나만의 특별한 레시피를 연구하고 있다',
    ],
    workplacesEn: ['a stylish restaurant kitchen', 'an open-kitchen culinary studio', 'a warm artisan bakery'],
    actionsEn: [
      'preparing a creative and delicious dish with care',
      'adding finishing touches to a plated dish with a confident smile',
      'prepping fresh ingredients while crafting a signature recipe',
    ],
  },
  {
    keywords: ['스포츠', '선수', '축구', '야구', '농구', '수영', '배구', '태권도', '피겨', 'athlete', 'sport', 'soccer', 'basketball'],
    workplaces: ['넓은 야외 경기장', '최첨단 스포츠 트레이닝 센터', '관중이 가득한 실내 경기장'],
    actions: [
      '경기를 마치고 승리를 향해 힘차게 도전하며 땀을 흘리고 있다',
      '동료들과 호흡을 맞추며 멋진 경기를 펼치고 있다',
      '우승 트로피를 바라보며 최고의 경기력을 위해 열정적으로 훈련하고 있다',
    ],
    workplacesEn: ['a wide outdoor stadium', 'a high-tech sports training center', 'a packed indoor arena'],
    actionsEn: [
      'striving energetically toward victory during an intense match',
      'teaming up seamlessly with teammates on the field',
      'training passionately with eyes set on the championship trophy',
    ],
  },
  {
    keywords: ['패션', '의상', '스타일', '옷', 'fashion', 'apparel', 'stylist'],
    workplaces: ['세련된 패션 디자인 스튜디오', '글로벌 의류 회사 작업실', '화려한 런웨이 백스테이지'],
    actions: [
      '마네킹에 새로운 친환경 의상을 입히며 디자인을 다듬고 있다',
      '원단 샘플과 스케치북을 보며 독창적인 옷을 구상하고 있다',
      '직접 디자인한 의상을 점검하며 뿌듯한 표정으로 웃고 있다',
    ],
    workplacesEn: ['a chic fashion design studio', 'a global apparel atelier', 'a glamorous runway backstage'],
    actionsEn: [
      'draping an eco-friendly outfit onto a mannequin and refining the silhouette',
      'sketching original clothing designs surrounded by fabric swatches',
      'admiring a finished original outfit with a proud smile',
    ],
  },
  {
    keywords: ['디자인', '디자이너', '미술', '화가', '뷰티', 'design', 'artist', 'beauty'],
    workplaces: ['감각적인 디자인 스튜디오', '창의적인 아트 작업실', '전시 갤러리 공간'],
    actions: [
      '태블릿과 스케치북으로 독창적인 디자인 작품을 구상하고 있다',
      '다양한 색상과 아이디어를 조합해 멋진 작품을 완성하고 있다',
      '작업실 책상에서 세밀한 스케치를 그리며 창작에 집중하고 있다',
    ],
    workplacesEn: ['a stylish design studio', 'a creative art workshop', 'a sunlit gallery studio'],
    actionsEn: [
      'brainstorming original designs using a tablet and sketchbook',
      'blending vibrant colors and fresh ideas into a finished piece',
      'focusing on detailed sketches at a creative desk',
    ],
  },
  {
    keywords: ['유튜버', '크리에이터', '방송', 'pd', '영상', '미디어', '아나운서', 'youtuber', 'creator', 'media', 'video', 'broadcast'],
    workplaces: ['조명이 빛나는 영상 촬영 스튜디오', '1인 미디어 방송실', '콘텐츠 편집 스튜디오'],
    actions: [
      '카메라 앞에서 밝고 유쾌하게 새로운 콘텐츠를 촬영하고 있다',
      '영상 편집 프로그램으로 재미있는 장면과 자막을 작업하고 있다',
      '마이크 앞에서 시청자들과 소통하며 즐겁게 방송을 진행하고 있다',
    ],
    workplacesEn: ['a brightly lit filming studio', 'a creator broadcast room', 'a video editing suite'],
    actionsEn: [
      'filming upbeat and engaging new content in front of a camera',
      'editing lively clips and captions on a timeline monitor',
      'hosting a show and connecting happily with viewers on a microphone',
    ],
  },
  {
    keywords: ['환경', '생태', '기후', '지구', '생물', '식물', 'environment', 'ecolog', 'climate', 'biolog'],
    workplaces: ['친환경 생태 연구소', '푸른 자연 속 현장 조사지', '신재생 에너지 연구 센터'],
    actions: [
      '지구를 지키는 친환경 에너지와 생태 데이터를 분석하고 있다',
      '푸른 숲과 하천에서 자연 표본을 채취하며 관찰하고 있다',
      '지속 가능한 미래를 위한 환경 보호 기술을 연구하고 있다',
    ],
    workplacesEn: ['an eco-friendly ecology lab', 'a lush green field research site', 'a renewable energy center'],
    actionsEn: [
      'analyzing clean energy and ecosystem data to protect the planet',
      'collecting and observing natural samples in a green forest',
      'researching green technologies for a sustainable future',
    ],
  },
  {
    keywords: ['심리', '상담', '멘토', 'psycholog', 'counsel', 'mentor', 'therap'],
    workplaces: ['따뜻하고 아늑한 심리 상담실', '마음 치유 커뮤니티 센터', '포근한 햇살이 드는 상담 공간'],
    actions: [
      '상대방의 이야기에 귀 기울이며 따뜻하게 공감하고 격려하고 있다',
      '편안한 분위기 속에서 마음의 고민을 나눌 수 있도록 돕고 있다',
      '차분하고 다정한 표정으로 희망적인 조언을 건네고 있다',
    ],
    workplacesEn: ['a warm and cozy counseling room', 'a welcoming community wellness center', 'a sunlit consultation lounge'],
    actionsEn: [
      'listening attentively and offering warm empathy and encouragement',
      'helping others share their thoughts in a comfortable, supportive space',
      'giving hopeful guidance with a calm and caring expression',
    ],
  },
  {
    keywords: ['음악', '작곡', '프로듀서', '가수', '연주', '피아노', '밴드', 'music', 'composer', 'producer', 'singer'],
    workplaces: ['방음 시설이 갖춰진 음악 작업실', '최신 녹음 스튜디오', '화려한 콘서트 무대'],
    actions: [
      '건반과 음향 장비 앞에서 감성적인 멜로디를 작곡하고 있다',
      '헤드폰을 쓰고 새로운 음악의 사운드를 세심하게 다듬고 있다',
      '무대 위에서 열정적으로 연주하고 노래하며 즐거워하고 있다',
    ],
    workplacesEn: ['a soundproof music studio', 'a modern recording booth', 'a dazzling concert stage'],
    actionsEn: [
      'composing an expressive melody at a keyboard and audio console',
      'wearing studio headphones while fine-tuning a brand-new track',
      'performing passionately on stage with pure joy',
    ],
  },
  {
    keywords: ['건축', '인테리어', '도시', 'architect', 'interior', 'urban'],
    workplaces: ['모형이 가득한 건축 설계 사무소', '친환경 공간 디자인 스튜디오', '미래형 건축 현장'],
    actions: [
      '친환경 미래 건물의 3D 모형과 도면을 꼼꼼히 살피고 있다',
      '태블릿에 새로운 공간의 아이디어를 정교하게 스케치하고 있다',
      '모두가 편안하게 머물 수 있는 멋진 건축물을 설계하고 있다',
    ],
    workplacesEn: ['an architecture firm filled with scale models', 'a green spatial design studio', 'a futuristic building site'],
    actionsEn: [
      'examining a 3D eco-building model and architectural blueprints',
      'sketching innovative spatial concepts carefully on a tablet',
      'designing welcoming spaces where everyone feels comfortable',
    ],
  },
  {
    keywords: ['의사', '간호사', '약사', '의료', '바이오', '보건', 'doctor', 'nurse', 'pharmacist', 'medic', 'bio', 'health'],
    workplaces: ['깨끗하고 밝은 종합병원', '최첨단 바이오 의료 연구소', '미래형 스마트 진료실'],
    actions: [
      '환자의 건강을 살피며 따뜻하고 믿음직하게 진료를 돕고 있다',
      '질병을 치료하는 새로운 의약품과 기술을 현미경으로 연구하고 있다',
      '의료 모니터를 보며 환자에게 친절하게 건강 상태를 설명하고 있다',
    ],
    workplacesEn: ['a bright, modern hospital', 'an advanced biomedical lab', 'a futuristic smart clinic'],
    actionsEn: [
      'caring for patients with warmth and dependable expertise',
      'studying new treatments and medicines under a microscope',
      'kindly explaining health results to a patient on a medical display',
    ],
  },
  {
    keywords: ['작가', '소설', '기자', '시인', '번역', 'writer', 'author', 'journalist', 'reporter', 'novelist'],
    workplaces: ['책이 가득한 아늑한 서재', '창의적인 출판·미디어 사무실', '조용한 북카페 작업 공간'],
    actions: [
      '노트북 앞에 앉아 사람들의 마음을 울리는 새로운 이야기를 쓰고 있다',
      '취재 수첩을 보며 세상의 흥미로운 소식을 기사로 정리하고 있다',
      '다양한 책을 참고하며 흥미진진한 다음 장면을 구상하고 있다',
    ],
    workplacesEn: ['a cozy library studio lined with books', 'a creative publishing and media office', 'a quiet book-cafe workspace'],
    actionsEn: [
      'typing a heartfelt new story on a laptop',
      'organizing exciting news stories from a reporter’s notebook',
      'brainstorming the next chapter surrounded by inspiring books',
    ],
  },
  {
    keywords: ['과학', '연구', '물리', '화학', '실험', 'science', 'scientist', 'research', 'physics', 'chem'],
    workplaces: ['최첨단 과학 실험실', '미래 과학 연구 센터', '스마트 연구소'],
    actions: [
      '실험 장비와 현미경을 활용해 새로운 과학 원리를 탐구하고 있다',
      '유리 플라스크와 데이터를 살펴보며 흥미로운 실험 결과를 기록하고 있다',
      '동료 연구원들과 함께 미래를 바꿀 새로운 발명을 연구하고 있다',
    ],
    workplacesEn: ['a state-of-the-art science laboratory', 'a future science research center', 'a smart research institute'],
    actionsEn: [
      'exploring new scientific discoveries with lab instruments and a microscope',
      'recording exciting experiment results beside glass flasks and data charts',
      'collaborating with fellow scientists on a world-changing invention',
    ],
  },
  {
    keywords: ['경찰', '소방', '구급', '변호사', '판사', '법', '배우', 'police', 'firefighter', 'lawyer', 'judge', 'actor'],
    workplaces: ['시민을 지키는 안전 센터', '지역 주민과 가까운 파출소', '정의로운 법률 사무소'],
    actions: [
      '사람들의 안전과 정의를 지키기 위해 책임감을 갖고 활동하고 있다',
      '어려움에 처한 이웃을 돕기 위해 든든하게 이야기를 듣고 지원하고 있다',
      '안전 장비를 점검하며 모두가 안심할 수 있는 사회를 만들고 있다',
    ],
    workplacesEn: ['a community safety center', 'a bright neighborhood station', 'a modern public service studio'],
    actionsEn: [
      'working responsibly to protect community safety and fairness',
      'listening attentively and supporting neighbors with steady confidence',
      'checking gear and helping build a safe, trustworthy community',
    ],
  },
];

export function getJobRecommendations(
  jobInput: string,
  lang: Language = 'ko'
): JobRecommendationSet {
  const normalized = jobInput.trim().toLowerCase();

  if (normalized) {
    for (const rule of JOB_RECOMMENDATION_RULES) {
      if (rule.keywords.some((kw) => normalized.includes(kw.toLowerCase()))) {
        return {
          workplaces: lang === 'en' ? rule.workplacesEn : rule.workplaces,
          actions: lang === 'en' ? rule.actionsEn : rule.actions,
        };
      }
    }
  }

  if (lang === 'en') {
    const label = jobInput.trim() || 'Future Specialist';
    return {
      workplaces: [
        `a modern ${label} studio`,
        `a futuristic ${label} innovation lab`,
        `a warm and lively ${label} workspace`,
      ],
      actions: [
        `planning creative new ideas and crafting great results as a ${label}`,
        `skillfully using specialized tools and enjoying meaningful work as a ${label}`,
        `collaborating warmly with teammates in the ${label} field`,
      ],
    };
  }

  const label = jobInput.trim() || '미래 전문가';
  return {
    workplaces: [
      `${label} 전문 스튜디오`,
      `첨단 미래형 ${label} 연구 공간`,
      `따뜻하고 활기찬 ${label} 일터`,
    ],
    actions: [
      `${label}(으)로서 새로운 아이디어를 기획하고 멋진 결과물을 만들어 내고 있다`,
      `전문 장비를 활용해 ${label}의 일을 멋지게 해내며 보람을 느끼고 있다`,
      `사람들과 소통하고 협력하며 ${label} 분야에서 활발하게 활동하고 있다`,
    ],
  };
}

