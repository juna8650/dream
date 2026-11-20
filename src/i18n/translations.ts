import { Language } from '../contexts/LanguageContext';

export const JOB_FIELD_EN: Record<string, string> = {
  '분야 무관 (전체)': 'Any Field (All)',
  '정보 기술(IT) 분야': 'Information Technology (IT)',
  '의료 분야': 'Healthcare & Medicine',
  '예술·디자인 분야': 'Art & Design',
  '교육 분야': 'Education',
  '과학·연구 분야': 'Science & Research',
  '환경·생명 분야': 'Environment & Life Sciences',
  '스포츠 분야': 'Sports',
  '방송·미디어 분야': 'Broadcasting & Media',
  '경영·창업 분야': 'Business & Entrepreneurship',
  '미래 신기술 분야': 'Emerging Future Tech',
};

export const GENDER_EN: Record<string, string> = {
  남자: 'Male',
  여자: 'Female',
  '선택 안 함': 'Prefer not to specify',
};

export const ASPECT_RATIO_EN: Record<string, string> = {
  'A4 세로': 'A4 Portrait',
  'A4 가로': 'A4 Landscape',
  자유: 'Free Ratio',
};

export const STAGE2_MOOD_EN: Record<string, string> = {
  '미래적이고 창의적인': 'futuristic and creative',
  '밝고 활기찬': 'bright and energetic',
  '따뜻하고 편안한': 'warm and comfortable',
  '차분하고 진지한': 'calm and focused',
  '역동적이고 생동감 있는': 'dynamic and vibrant',
};

export const STAGE2_STYLE_EN: Record<string, string> = {
  '3D 애니메이션 스타일': '3D animation style',
  '3D 캐릭터 스타일': '3D character style',
  '고품질 디지털 아트 스타일': 'high-quality digital art style',
  '고품질 귀여운 스티커 일러스트 스타일': 'high-quality cute sticker illustration style',
  '웹툰 스타일': 'webtoon illustration style',
  '동화책 일러스트 스타일': 'storybook illustration style',
};

export const STAGE3_EXPRESSION_EN: Record<string, string> = {
  '밝고 자신감 있는 표정': 'a bright and confident expression',
  '따뜻하고 다정한 미소': 'a warm and friendly smile',
  '호기심 가득하고 반짝이는 표정': 'a curious and sparkling expression',
  '차분하고 믿음직한 표정': 'a calm and trustworthy expression',
  '열정적이고 에너지 넘치는 표정': 'a passionate and energetic expression',
};

export const STAGE3_STYLE_EN: Record<string, string> = {
  '큰 눈과 귀여운 비율의 고품질 3D 디자이너 토이 컬렉션 피규어 스타일':
    'high-quality 3D designer toy collectible figure style with big eyes and cute proportions',
  '깔끔하고 선명한 한국 웹툰 스타일': 'clean and vivid Korean webtoon style',
  '생동감 넘치는 3D 애니메이션 스타일': 'vibrant 3D animation style',
  '레트로 감성의 아기자기한 픽셀아트 스타일': 'charming retro pixel art style',
  '포근하고 따뜻한 동화책 일러스트 스타일': 'cozy and warm storybook illustration style',
  '첨단 감각의 미래 SF 스타일': 'sleek futuristic sci-fi style',
};

export const COLOR_THEME_EN: Record<string, string> = {
  '파스텔 블루와 화이트 계열': 'Pastel blue and white palette',
  '파스텔 오렌지와 블루 계열': 'Pastel orange and blue palette',
  '파스텔 블루와 퍼플 계열': 'Pastel blue and purple palette',
  '파스텔 핑크와 민트 계열': 'Pastel pink and mint palette',
  '따뜻한 파스텔 톤 전체 조화': 'Harmonious warm pastel tones',
};

export const PLACE_SUGGESTIONS_EN: Record<string, string> = {
  '대형 게임 회사': 'Major Game Studio',
  '최신 AI 연구소': 'Modern AI Research Lab',
  학교: 'School',
  병원: 'Hospital',
  '의류 회사': 'Fashion Design House',
  레스토랑: 'Restaurant',
  경기장: 'Sports Stadium',
  작업실: 'Creative Studio',
  공연장: 'Concert Hall',
};

export const WORKSHEET_CATEGORIES_EN: Record<
  string,
  { title: string; words: Array<{ ko: string; en: string }> }
> = {
  activity: {
    title: 'Activities I Enjoy',
    words: [
      { ko: '게임하기', en: 'Gaming' },
      { ko: '그림 그리기', en: 'Drawing' },
      { ko: '음악 듣기', en: 'Listening to music' },
      { ko: '운동하기', en: 'Working out' },
      { ko: '요리하기', en: 'Cooking' },
      { ko: '영상 만들기', en: 'Making videos' },
      { ko: '여행하기', en: 'Traveling' },
      { ko: '책 읽기', en: 'Reading books' },
    ],
  },
  strength: {
    title: "What I'm Good At & Confident In",
    words: [
      { ko: '친구 이야기 들어주기', en: 'Listening to friends' },
      { ko: '그림 그리기', en: 'Drawing' },
      { ko: '설명하기', en: 'Explaining clearly' },
      { ko: '문제 해결하기', en: 'Problem-solving' },
      { ko: '발표하기', en: 'Presenting' },
      { ko: '계획 세우기', en: 'Planning' },
      { ko: '관찰하기', en: 'Observing' },
    ],
  },
  verb: {
    title: 'Action Verbs That Describe Me',
    words: [
      { ko: '도전하다', en: 'Challenge' },
      { ko: '관찰하다', en: 'Observe' },
      { ko: '노력하다', en: 'Strive' },
      { ko: '계획하다', en: 'Plan' },
      { ko: '탐구하다', en: 'Explore' },
      { ko: '상상하다', en: 'Imagine' },
      { ko: '돕다', en: 'Help' },
      { ko: '만들다', en: 'Create' },
      { ko: '협력하다', en: 'Collaborate' },
      { ko: '기록하다', en: 'Record' },
    ],
  },
  adjective: {
    title: 'Adjectives Describing My Personality',
    words: [
      { ko: '다정한', en: 'Kind' },
      { ko: '신중한', en: 'Thoughtful' },
      { ko: '유쾌한', en: 'Cheerful' },
      { ko: '섬세한', en: 'Detail-oriented' },
      { ko: '창의적인', en: 'Creative' },
      { ko: '정직한', en: 'Honest' },
      { ko: '책임감 있는', en: 'Responsible' },
      { ko: '긍정적인', en: 'Positive' },
      { ko: '성실한', en: 'Diligent' },
      { ko: '도전적인', en: 'Adventurous' },
    ],
  },
  object: {
    title: 'Objects That Represent Me',
    words: [
      { ko: '나침반', en: 'Compass' },
      { ko: '연필', en: 'Pencil' },
      { ko: '전구', en: 'Light bulb' },
      { ko: '다리', en: 'Bridge' },
      { ko: '로봇', en: 'Robot' },
      { ko: '책', en: 'Book' },
      { ko: '카메라', en: 'Camera' },
      { ko: '별', en: 'Star' },
      { ko: '퍼즐', en: 'Puzzle' },
      { ko: '시계', en: 'Clock' },
    ],
  },
  impression: {
    title: 'How I Want to Be Remembered',
    words: [
      { ko: '편안한 사람', en: 'Approachable person' },
      { ko: '열정적인 사람', en: 'Passionate person' },
      { ko: '친절한 사람', en: 'Kind person' },
      { ko: '믿음직한 사람', en: 'Trustworthy person' },
      { ko: '배려하는 사람', en: 'Caring person' },
      { ko: '도전하는 사람', en: 'Bold challenger' },
      { ko: '함께하고 싶은 사람', en: 'Great teammate' },
    ],
  },
};

export const JOB_PRESETS_EN: Record<
  string,
  { job: string; workplace: string; action: string; props: string; charAction: string }
> = {
  '게임 개발자': {
    job: 'Game Developer',
    workplace: 'a major game studio',
    action: 'developing a new game with characters and game screens displayed on the monitor',
    props: 'laptop, game controller, pixel character, monitor',
    charAction: 'developing a game',
  },
  'AI 개발자': {
    job: 'AI Developer',
    workplace: 'a cutting-edge AI research lab',
    action: 'developing an artificial intelligence program',
    props: 'hologram monitor, laptop, miniature AI robot',
    charAction: 'coding and designing AI systems',
  },
  수의사: {
    job: 'Veterinarian',
    workplace: 'a warm and welcoming animal hospital',
    action: 'carefully examining and caring for puppies and kittens',
    props: 'stethoscope, medical chart, cute puppy and kitten',
    charAction: 'warmly caring for animals',
  },
  '웹툰 작가': {
    job: 'Webtoon Artist',
    workplace: 'a cozy creative studio',
    action: 'drawing a new webtoon scene on a pen display tablet',
    props: 'digital stylus, pen display tablet, idea sketchbook',
    charAction: 'passionately illustrating a webtoon',
  },
  교사: {
    job: 'Teacher',
    workplace: 'a bright sunlit classroom',
    action: 'making eye contact with students and leading an engaging lesson',
    props: 'tablet, education book, chalkboard',
    charAction: 'warmly explaining concepts to students',
  },
  요리사: {
    job: 'Chef',
    workplace: 'a stylish restaurant kitchen',
    action: 'preparing a creative dish with care and passion',
    props: 'chef hat, whisk, plated gourmet dish',
    charAction: 'confidently cooking a dish',
  },
  '스포츠 선수': {
    job: 'Athlete',
    workplace: 'a wide outdoor stadium',
    action: 'giving their best after a match and striving toward victory',
    props: 'gold medal, trophy, sports ball',
    charAction: 'smiling brightly while holding a championship trophy',
  },
  '우주 항공 엔지니어': {
    job: 'Aerospace Engineer',
    workplace: 'an advanced aerospace research center',
    action: 'analyzing satellite and spacecraft blueprints',
    props: 'tablet, spacecraft model, engineering blueprints',
    charAction: 'researching space exploration technology',
  },
};

export interface ProfileCardExampleTranslation {
  jobTitle: string;
  studentName: string;
  age: string;
  motto: string;
  keywords: string[];
  likes: string[];
  strengths: string[];
  aiSummary: string;
  goals: string[];
  pledge: string;
  messageToFuture: string;
  rawPrompt: string;
}

export const PROFILE_CARD_EXAMPLES_EN: Record<string, ProfileCardExampleTranslation> = {
  'game-dev': {
    jobTitle: 'Game Developer',
    studentName: 'Haneul Kim',
    age: '15',
    motto: 'Give my best in everything I do!',
    keywords: ['Creativity', 'Problem-solving', 'Teamwork', 'Perseverance'],
    likes: ['Gaming', 'Watching movies', 'Character design', 'Reading webtoons', 'Coding'],
    strengths: ['Imagination', 'Focus', 'Fast learning'],
    aiSummary: 'A future AI game designer changing the world with creative ideas!',
    goals: [
      'Create a game enjoyed by players all around the world',
      'Develop innovative games powered by AI technology',
      'Host an esports tournament with a game I created',
    ],
    pledge:
      'By learning, challenging myself, and gaining experience every day, I will build an amazing game the world has never seen.',
    messageToFuture:
      'Every effort you make right now will shape your future as a top game designer! Never give up, enjoy the journey, and keep moving forward!',
    rawPrompt: `Create a "My Future Profile Card." Design the overall layout as a clean, polished student portfolio poster like one made in Canva.

■ Title: My Future Profile Card
■ Basic Info
- Name: Haneul Kim
- Future Career: Game Developer
- Age: 15
- MBTI: ENTP
- Motto: Give my best in everything I do!
■ Core Keywords That Describe Me
- Creativity, Problem-solving, Teamwork, Perseverance
■ Things I Like
- Gaming, Watching movies, Character design, Reading webtoons, Coding
■ My Top Strengths
- Imagination, Focus, Fast learning
■ How AI Sees Me
■ Future Goals
- Create a game enjoyed by players all around the world
- Develop innovative games powered by AI technology
- Host an esports tournament with a game I created
- Lead a game studio and collaborate with talented creators
■ My Pledge
- By learning, challenging myself, and gaining experience every day, I will build an amazing game the world has never seen.
■ A Message to My Future Self
- Every effort you make right now will shape your future as a top game designer!
- Never give up, enjoy the journey, and keep moving forward!

Clean Canva-like layout, cute sticker style, clear and natural English typography, high resolution, plenty of whitespace, student exhibition poster aesthetic.
Generate the Future Profile Card image featuring the uploaded character.`,
  },
  vet: {
    jobTitle: 'Veterinarian',
    studentName: 'Haneul Kim',
    age: '14',
    motto: 'Every small life is precious',
    keywords: ['Caring', 'Responsibility', 'Attention to detail', 'Empathy', 'Kindness'],
    likes: ['Puppies', 'Cats', 'Caring for animals', 'Going for walks', 'Photography'],
    strengths: ['Observation', 'Focus', 'Communication'],
    aiSummary: 'A trustworthy veterinarian bringing happiness to both animals and people with a warm heart!',
    goals: [
      'Help build a world where every animal is happy',
      'Treat and protect abandoned animals',
      'Research advanced veterinary medicine for pets',
    ],
    pledge:
      'I will never lose my love for animals and will keep learning and growing to become a dependable veterinarian.',
    messageToFuture:
      'Today’s small efforts will build the amazing veterinarian you become! Always keep your warm heart.',
    rawPrompt: `Design a "My Future Profile Card." Create a clean, polished layout like a student portfolio made in Canva.

■ Design Concept
- Pastel blue and white palette, student exhibition style, cute 3D sticker aesthetic, bright and hopeful mood
- Generous whitespace, high resolution, clear and legible English text, A4 portrait aspect ratio
Place a large title "My Future Profile Card" at the top, the uploaded 3D character prominently on the left, and neat rounded cards on the right with the details below.

■ Basic Info
- Name: Haneul Kim
- Future Career: Veterinarian
- Age: 14
- MBTI: ISFJ
- Motto: Every small life is precious
■ Keywords: Caring, Responsibility, Attention to detail, Empathy, Kindness
■ Things I Like: Puppies, Cats, Caring for animals, Going for walks, Photography
■ My Top Strengths: Observation, Focus, Communication
■ How AI Sees Me
■ Future Goals
- Help build a world where every animal is happy
- Treat and protect abandoned animals
- Research advanced veterinary medicine for pets
■ My Pledge
- I will never lose my love for animals and will keep learning and growing to become a dependable veterinarian.
■ A Message to My Future Self
- Today’s small efforts will build the amazing veterinarian you become! Always keep your warm heart.
■ Design Elements
- Prominent character placement, cute icon next to the title, rounded card sections
- Paw print, heart, and star icons, blue accent colors, cute puppy and cat illustrations around the character`,
  },
  teacher: {
    jobTitle: 'Teacher',
    studentName: 'Haneul Kim',
    age: '15',
    motto: 'Understand others’ hearts and grow together',
    keywords: ['Kindness', 'Explaining clearly', 'Empathy'],
    likes: ['Reading', 'Watching movies', 'Learning new things'],
    strengths: [
      'Attentive listening and deep empathy',
      'Ability to explain complex ideas simply',
      'Trustworthy diligence and responsibility',
    ],
    aiSummary: 'A warm, thoughtful growth-oriented leader who loves learning and sharing with others!',
    goals: [
      'Become a warm and skilled teacher who connects with students',
      'Create an education study group to grow together',
      'Publish an essay on education to inspire others',
    ],
    pledge: 'Learn something new every day and bring positive energy to everyone around me.',
    messageToFuture: 'Haneul, enjoy every step toward your dream and never forget your sincerity.',
    rawPrompt: `Create a "My Future Profile Card." Design the overall layout as a clean, polished student portfolio poster like one made in Canva.

■ Title: My Future Profile Card
■ Basic Info
- Name: Haneul Kim
- Future Career: Teacher
- Age: 15
- MBTI: ISFJ
- Motto: Understand others’ hearts and grow together
■ Keywords That Describe Me
- Kindness, Explaining clearly, Empathy
■ Things I Like
- Reading, Watching movies, Learning new things
■ My Top Strengths
- Attentive listening and deep empathy
- Ability to explain complex ideas simply
- Trustworthy diligence and responsibility
■ How AI Sees Me
■ Future Goals
- Become a warm and skilled teacher who connects with students
- Create an education study group to grow together
- Publish an essay on education to inspire others
■ My Pledge
- Learn something new every day and bring positive energy to everyone around me.
■ A Message to My Future Self
- Haneul, enjoy every step toward your dream and never forget your sincerity.
■ Design Conditions
- Feature the uploaded character prominently, cute 3D sticker style, clean Canva-like layout
- Clear English typography, pastel tones, A4 portrait, student exhibition poster feel
- High resolution, rounded card design, tasteful cute icons`,
  },
  athlete: {
    jobTitle: 'Athlete',
    studentName: 'Haneul Kim',
    age: '15',
    motto: 'Hard work and sweat never betray me.',
    keywords: ['Passion', 'Challenge', 'Perseverance', 'Teamwork', 'Confidence'],
    likes: ['Sports', 'Watching matches', 'Training', 'Team activities'],
    strengths: [
      'Strong sense of responsibility and diligence',
      'Unwavering perseverance that never gives up',
      'Positive energy and self-confidence',
    ],
    aiSummary:
      'An inspiring athlete with remarkable passion and determination who constantly grows and brings hope to others!',
    goals: [
      'Win the national championship',
      'Represent the national team',
      'Compete on the world stage',
    ],
    pledge:
      'I will train steadily every day, grow with a resilient mindset, and give my all to become a top athlete.',
    messageToFuture:
      '"Haneul, every drop of sweat today builds tomorrow’s victory and dream. Believe in yourself and keep running!"',
    rawPrompt: `Create a "My Future Profile Card." Design the overall layout as a clean, polished student portfolio poster like one made in Canva.

■ Title: 🏅 My Future Profile Card
■ Basic Info
- Name: Haneul Kim
- Future Career: Athlete
- Age: 15
- MBTI: ESTP
- Motto: Hard work and sweat never betray me.
■ Keywords That Describe Me
- Passion, Challenge, Perseverance, Teamwork, Confidence
■ Things I Like
- Sports, Watching matches, Training, Team activities
■ My Top Strengths
- Strong sense of responsibility and diligence
- Unwavering perseverance that never gives up
- Positive energy and self-confidence
■ How AI Sees Me
- Write 3–4 natural lines based on the profile above, highlighting an athlete who pushes beyond limits and inspires others with hope.
■ Future Goals
- Win the national championship
- Represent the national team
- Compete on the world stage
■ My Pledge
- I will train steadily every day, grow with a resilient mindset, and give my all to become a top athlete.
■ A Message to My Future Self
- "Haneul, every drop of sweat today builds tomorrow’s victory and dream. Believe in yourself and keep running!"
■ Design Conditions
- Feature the uploaded character prominently, cute 3D sticker style, clean Canva student portfolio layout
- Clear English typography, pastel orange and blue palette, A4 portrait aspect ratio
- Student exhibition poster aesthetic, high-resolution rounded cards
- Include medal, trophy, sneakers, stadium, sports ball, starting line, and cheering flag icons`,
  },
  aerospace: {
    jobTitle: 'Aerospace Engineer',
    studentName: 'Hanggong Lee',
    age: '15',
    motto: 'Imagination is the first step to turning the future into reality.',
    keywords: ['Creativity', 'Challenge', 'Problem-solving', 'Curiosity', 'Perseverance'],
    likes: ['Space exploration', 'Science experiments', 'Rockets & satellites', 'Learning tech'],
    strengths: [
      'Sharp logical thinking',
      'Passion for learning new technologies',
      'Persistence to see problems through',
    ],
    aiSummary:
      'An inquisitive leader full of curiosity and determination—destined to become an outstanding engineer pushing boundaries for humanity!',
    goals: [
      'Develop next-generation space exploration tech',
      'Design satellites and spacecraft',
      'Become a world-class aerospace engineer',
    ],
    pledge:
      'I will study science and engineering every day, never fear failure, and build technology that advances humanity’s future.',
    messageToFuture:
      '"Today’s small curiosity will someday become a giant leap toward the stars. Dream endlessly and keep reaching!"',
    rawPrompt: `Create a "My Future Profile Card." Design the overall layout as a clean, polished student portfolio poster like one made in Canva.

■ Title: My Future Profile Card
■ Basic Info
- Name: Hanggong Lee
- Future Career: Aerospace Engineer
- Age: 15
- MBTI: INTJ
- Motto: Imagination is the first step to turning the future into reality.
■ Keywords That Describe Me
- Creativity, Challenge, Problem-solving, Curiosity, Perseverance
■ Things I Like
- Space exploration, Science experiments, Rockets & satellites, Learning tech
■ My Top Strengths
- Sharp logical thinking
- Passion for learning new technologies
- Persistence to see problems through
■ How AI Sees Me
■ Future Goals
- Develop next-generation space exploration tech
- Design satellites and spacecraft
- Become a world-class aerospace engineer
■ My Pledge
- I will study science and engineering every day, never fear failure, and build technology that advances humanity’s future.
■ A Message to My Future Self
- "Today’s small curiosity will someday become a giant leap toward the stars. Dream endlessly and keep reaching!"
■ Design Conditions
- Feature the uploaded character prominently, cute 3D sticker style, clean Canva student portfolio layout
- Clear English typography, pastel blue and purple palette, A4 portrait aspect ratio
- Tasteful rocket, spacesuit, satellite, Earth, star, planet, tablet, and blueprint icons`,
  },
  webtoon: {
    jobTitle: 'Webtoon Artist',
    studentName: 'Haneul Kim',
    age: '14',
    motto: 'Dreams exist to come true.',
    keywords: ['Creativity', 'Curiosity', 'Passion', 'Growth', 'Challenge'],
    likes: ['Storyboarding', 'Drawing', 'Reading books'],
    strengths: ['Outstanding creativity', 'Quick learning ability', 'Positive energy'],
    aiSummary:
      'Gifted with vivid imagination and keen observation—capable of creating webtoons that deeply move readers!',
    goals: [
      'Serialize a popular webtoon',
      'Touch readers’ hearts with memorable stories',
      'Build my own creative brand',
    ],
    pledge:
      'I will jot down new ideas daily, practice drawing consistently, and craft a unique webtoon filled with my voice.',
    messageToFuture:
      'Haneul, today’s little doodles and daydreams will one day become stories that bring hope and courage to countless readers.',
    rawPrompt: `Create a "My Future Profile Card." Design the overall layout as a clean, polished student portfolio poster like one made in Canva.

■ Title: My Future Profile Card
■ Basic Info
- Name: Haneul Kim
- Future Career: Webtoon Artist
- Age: 14
- MBTI: ISFJ
- Motto: Dreams exist to come true.
■ Keywords That Describe Me
- Creativity, Curiosity, Passion, Growth, Challenge
■ Things I Like
- Storyboarding, Drawing, Reading books
■ My Top Strengths
- Outstanding creativity
- Quick learning ability
- Positive energy
■ How AI Sees Me
■ Future Goals
- Serialize a popular webtoon
- Touch readers’ hearts with memorable stories
- Build my own creative brand
■ My Pledge
- Record new ideas every day, practice drawing consistently, and build my own artistic universe.
■ A Message to My Future Self
■ Design Conditions
- Feature the uploaded character prominently, cute 3D sticker style, clean Canva-like layout
- Clear English typography, pastel tones, A4 portrait, student exhibition poster, high resolution
- Rounded card design with tasteful creative icons`,
  },
  police: {
    jobTitle: 'Police Officer',
    studentName: 'Deundeun Kim',
    age: '15',
    motto: 'Justice begins with small actions.',
    keywords: ['Justice', 'Responsibility', 'Courage', 'Care', 'Teamwork'],
    likes: ['Working out', 'Volunteering', 'Mystery solving', 'Helping people'],
    strengths: [
      'Strong sense of responsibility',
      'Calm under pressure in emergencies',
      'Thoughtful and considerate toward others',
    ],
    aiSummary:
      'Destined to become a trusted police officer who practices justice and protects the safety of the community.',
    goals: [
      'Help build a safer community',
      'Earn deep trust from citizens',
      'Lead neighborhood crime-prevention efforts',
    ],
    pledge:
      'Guided by honesty and responsibility, I will become a police officer who always puts citizens first.',
    messageToFuture:
      'Never forget your commitment to justice, and keep stepping forward with courage.',
    rawPrompt: `Create a "My Future Profile Card." Design the overall layout as a clean, polished student portfolio poster like one made in Canva.

■ Title: My Future Profile Card
■ Basic Info
- Name: Deundeun Kim
- Future Career: Police Officer
- Age: 15
- MBTI: ENTP
- Motto: Justice begins with small actions.
■ Keywords That Describe Me
- Justice, Responsibility, Courage, Care, Teamwork
■ Things I Like
- Working out, Volunteering, Mystery solving, Helping people
■ My Top Strengths
- Strong sense of responsibility
- Calm under pressure in emergencies
- Thoughtful and considerate toward others
■ Future Goals
- Help build a safer community
- Earn deep trust from citizens
- Lead neighborhood crime-prevention efforts
■ My Pledge
- Guided by honesty and responsibility, I will become a police officer who always puts citizens first.
■ A Message to My Future Self
- Never forget your commitment to justice, and keep stepping forward with courage.
■ Design Conditions
- Feature the uploaded character prominently, cute 3D sticker style, clean Canva-like layout
- Clear English typography, pastel tones, A4 portrait, student exhibition poster, high resolution, rounded card design`,
  },
  nurse: {
    jobTitle: 'Nurse',
    studentName: 'Haneul Lee',
    age: '15',
    motto: 'A warm heart is the best medicine.',
    keywords: ['Care', 'Empathy', 'Responsibility', 'Kindness', 'Diligence'],
    likes: ['Helping others', 'Health & wellness', 'Reading', 'Volunteering'],
    strengths: [
      'Deep empathy for others',
      'Careful attention to detail',
      'Strong sense of responsibility',
    ],
    aiSummary:
      'A compassionate nurse who truly understands patients’ feelings and cares for them with warmth and skill.',
    goals: [
      'Become a nurse who brings hope to patients',
      'Respond calmly and skillfully in emergencies',
      'Participate in medical volunteer outreach',
    ],
    pledge:
      'I will always care for people with a warm heart while continuously learning and growing.',
    messageToFuture:
      'I’m cheering for you to become a caring nurse who gives strength to everyone you meet.',
    rawPrompt: `Create a "My Future Profile Card." Design the overall layout as a clean, polished student portfolio poster like one made in Canva.

■ Title: My Future Profile Card
■ Basic Info
- Name: Haneul Lee
- Future Career: Nurse
- Age: 15
- MBTI: ISFJ
- Motto: A warm heart is the best medicine.
■ Keywords That Describe Me
- Care, Empathy, Responsibility, Kindness, Diligence
■ Things I Like
- Helping others, Health & wellness, Reading, Volunteering
■ My Top Strengths
- Deep empathy for others
- Careful attention to detail
- Strong sense of responsibility
■ How AI Sees Me
■ Future Goals
- Become a nurse who brings hope to patients
- Respond calmly and skillfully in emergencies
- Participate in medical volunteer outreach
■ My Pledge
- I will always care for people with a warm heart while continuously learning and growing.
■ A Message to My Future Self
- I’m cheering for you to become a caring nurse who gives strength to everyone you meet.
■ Design Conditions
- Feature the uploaded character prominently, cute 3D sticker style, clean Canva-like layout
- Clear English typography, pastel tones, A4 portrait, student exhibition poster, high resolution, rounded card design`,
  },
  actor: {
    jobTitle: 'Actor',
    studentName: 'Baewoo Kim',
    age: '15',
    motto: 'Move the audience’s hearts with every performance!',
    keywords: ['Expressiveness', 'Passion', 'Challenge', 'Creativity', 'Confidence'],
    likes: ['Acting', 'Watching movies', 'Musicals', 'Stage performances'],
    strengths: ['Rich expressiveness', 'Self-confidence', 'Positive energy'],
    aiSummary:
      'A gifted actor capable of expressing deep emotions naturally and touching audiences around the world.',
    goals: [
      'Star in a leading role',
      'Appear in deeply moving films and plays',
      'Become an internationally acclaimed actor',
    ],
    pledge: 'I will practice every day and grow steadily toward becoming an extraordinary actor.',
    messageToFuture: 'Shine brightly on the stage you’ve always dreamed of.',
    rawPrompt: `Create a "My Future Profile Card." Design the overall layout as a clean, polished student portfolio poster like one made in Canva.

■ Title: My Future Profile Card
■ Basic Info
- Name: Baewoo Kim
- Future Career: Actor
- Age: 15
- MBTI: ENFP
- Motto: Move the audience’s hearts with every performance!
■ Keywords That Describe Me
- Expressiveness, Passion, Challenge, Creativity, Confidence
■ Things I Like
- Acting, Watching movies, Musicals, Stage performances
■ My Top Strengths
- Rich expressiveness
- Self-confidence
- Positive energy
■ How AI Sees Me
■ Future Goals
- Star in a leading role
- Appear in deeply moving films and plays
- Become an internationally acclaimed actor
■ My Pledge
- I will practice every day and grow steadily toward becoming an extraordinary actor.
■ A Message to My Future Self
- Shine brightly on the stage you’ve always dreamed of.
■ Design Conditions
- Feature the uploaded character prominently, cute 3D sticker style, clean Canva-like layout
- Clear English typography, pastel tones, A4 portrait, student exhibition poster, high resolution, rounded card design`,
  },
  beauty: {
    jobTitle: 'Beauty Designer',
    studentName: 'Haneul Kim',
    age: '15',
    motto: 'Design beauty that inspires confidence!',
    keywords: ['Creativity', 'Precision', 'Artistic sense', 'Kindness', 'Passion'],
    likes: ['Makeup', 'Hair styling', 'Fashion', 'Drawing'],
    strengths: ['Aesthetic sensibility', 'Delicate craftsmanship', 'Creative ideas'],
    aiSummary:
      'A talented beauty designer who crafts inspiring looks and gifts confidence to everyone they work with.',
    goals: [
      'Launch my own beauty brand',
      'Become a renowned beauty artist',
      'Compete in international beauty design competitions',
    ],
    pledge: 'I will keep learning tirelessly to become an outstanding beauty designer.',
    messageToFuture: 'Let’s make the world shine even brighter through creativity and beauty.',
    rawPrompt: `Create a "My Future Profile Card." Design the overall layout as a clean, polished student portfolio poster like one made in Canva.

■ Title: My Future Profile Card
■ Basic Info
- Future Career: Beauty Designer
- Age: 15
- MBTI: ENTP
- Motto: Design beauty that inspires confidence!
■ Keywords That Describe Me
- Creativity, Precision, Artistic sense, Kindness, Passion
■ Things I Like
- Makeup, Hair styling, Fashion, Drawing
■ My Top Strengths
- Aesthetic sensibility
- Delicate craftsmanship
- Creative ideas
■ How AI Sees Me
■ Future Goals
- Launch my own beauty brand
- Become a renowned beauty artist
- Compete in international beauty design competitions
■ My Pledge
- I will keep learning tirelessly to become an outstanding beauty designer.
■ A Message to My Future Self
- Let’s make the world shine even brighter through creativity and beauty.
■ Design Conditions
- Feature the uploaded character prominently, cute 3D sticker style, clean Canva-like layout
- Clear English typography, pastel tones, A4 portrait, student exhibition poster, high resolution, rounded card design`,
  },
  baker: {
    jobTitle: 'Pastry & Bread Baker',
    studentName: 'Haneul Kim',
    age: '15',
    motto: 'Careful mastery of the basics shapes every flavor and aroma.',
    keywords: ['Creativity', 'Responsibility', 'Diligence', 'Care'],
    likes: ['Baking bread', 'Cooking', 'Desserts', 'Cafes'],
    strengths: ['Attention to detail', 'Creative recipes', 'Patience'],
    aiSummary:
      'A warm-hearted artisan baker who brings joy to people with creative desserts and meticulous craftsmanship!',
    goals: [
      'Run a beloved neighborhood bakery',
      'Invent signature new desserts',
      'Earn master confectioner certification',
    ],
    pledge: 'I will become a baker who shares warmth, care, and smiles in every loaf.',
    messageToFuture: 'Every small practice today is baking the finest bread of tomorrow.',
    rawPrompt: `Create a "My Future Profile Card." Design the overall layout as a clean, polished student portfolio poster like one made in Canva.

■ Title: My Future Profile Card
■ Basic Info
- Future Career: Pastry & Bread Baker
- Age: 15
- MBTI: ENTP
- Motto: Careful mastery of the basics shapes every flavor and aroma.
■ Keywords That Describe Me
- Creativity, Responsibility, Diligence, Care
■ Things I Like
- Baking bread, Cooking, Desserts, Cafes
■ My Top Strengths
- Attention to detail
- Creative recipes
- Patience
■ How AI Sees Me
■ Future Goals
- Run a beloved neighborhood bakery
- Invent signature new desserts
- Earn master confectioner certification
■ My Pledge
- I will become a baker who shares warmth, care, and smiles in every loaf.
■ A Message to My Future Self
- Every small practice today is baking the finest bread of tomorrow.
■ Design Conditions
- Feature the uploaded character prominently, cute 3D sticker style, clean Canva-like layout
- Clear English typography, pastel tones, A4 portrait, student exhibition poster, high resolution, rounded card design`,
  },
  pharmacist: {
    jobTitle: 'Pharmacist',
    studentName: 'Haneul Kim',
    age: '16',
    motto: 'A pharmacist who listens to both the body and heart.',
    keywords: ['Responsibility', 'Accuracy', 'Care', 'Diligence', 'Trust'],
    likes: ['Science', 'Health', 'Reading', 'Helping people'],
    strengths: ['Attention to detail', 'Sound judgment', 'Reliability'],
    aiSummary:
      'A knowledgeable and compassionate future pharmacist dedicated to giving every patient safe, trustworthy care!',
    goals: [
      'Protect community health and wellness',
      'Provide clear and caring medication guidance',
      'Become a specialized clinical pharmacist',
    ],
    pledge: 'I will keep learning throughout life to be a pharmacist people can always trust.',
    messageToFuture: 'Cheering for you to stand strong as a trusted guardian of health.',
    rawPrompt: `Create a "My Future Profile Card." Design the overall layout as a clean, polished student portfolio poster like one made in Canva.

■ Title: My Future Profile Card
■ Basic Info
- Future Career: Pharmacist
- Age: 16
- MBTI: ENTJ
- Motto: A pharmacist who listens to both the body and heart.
■ Keywords That Describe Me
- Responsibility, Accuracy, Care, Diligence, Trust
■ Things I Like
- Science, Health, Reading, Helping people
■ My Top Strengths
- Attention to detail
- Sound judgment
- Reliability
■ How AI Sees Me
■ Future Goals
- Protect community health and wellness
- Provide clear and caring medication guidance
- Become a specialized clinical pharmacist
■ My Pledge
- I will keep learning throughout life to be a pharmacist people can always trust.
■ A Message to My Future Self
- Cheering for you to stand strong as a trusted guardian of health.
■ Design Conditions
- Feature the uploaded character prominently, cute 3D sticker style, clean Canva-like layout
- Clear English typography, pastel tones, A4 portrait, student exhibition poster, high resolution, rounded card design`,
  },
};

export function translateValue(
  value: string,
  map: Record<string, string>,
  lang: Language
): string {
  if (lang === 'ko' || !value) return value;
  return map[value] ?? value;
}

const ALL_WORD_TRANSLATIONS: Record<string, string> = (() => {
  const dict: Record<string, string> = {};
  Object.values(WORKSHEET_CATEGORIES_EN).forEach((cat) => {
    cat.words.forEach((w) => {
      dict[w.ko] = w.en;
    });
  });
  Object.entries(JOB_PRESETS_EN).forEach(([ko, val]) => {
    dict[ko] = val.job;
  });
  Object.entries(PLACE_SUGGESTIONS_EN).forEach(([ko, en]) => {
    dict[ko] = en;
  });
  Object.entries(JOB_FIELD_EN).forEach(([ko, en]) => {
    dict[ko] = en;
  });
  Object.entries(STAGE2_MOOD_EN).forEach(([ko, en]) => {
    dict[ko] = en;
  });
  Object.entries(STAGE2_STYLE_EN).forEach(([ko, en]) => {
    dict[ko] = en;
  });
  Object.entries(STAGE3_EXPRESSION_EN).forEach(([ko, en]) => {
    dict[ko] = en;
  });
  Object.entries(STAGE3_STYLE_EN).forEach(([ko, en]) => {
    dict[ko] = en;
  });
  Object.entries(COLOR_THEME_EN).forEach(([ko, en]) => {
    dict[ko] = en;
  });
  Object.entries(GENDER_EN).forEach(([ko, en]) => {
    dict[ko] = en;
  });
  Object.entries(ASPECT_RATIO_EN).forEach(([ko, en]) => {
    dict[ko] = en;
  });
  return dict;
})();

export function translateKnownText(text: string, lang: Language): string {
  if (lang === 'ko' || !text.trim()) return text;
  const trimmed = text.trim();
  if (ALL_WORD_TRANSLATIONS[trimmed]) {
    return ALL_WORD_TRANSLATIONS[trimmed];
  }
  if (trimmed.includes(',')) {
    return trimmed
      .split(',')
      .map((part) => {
        const p = part.trim();
        return ALL_WORD_TRANSLATIONS[p] ?? p;
      })
      .join(', ');
  }
  return text;
}
