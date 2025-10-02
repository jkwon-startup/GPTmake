# GPT 활용 생산성 향상 워크샵 - 인터랙티브 슬라이드

6시간 워크샵을 위한 Apple 스타일의 인터랙티브 웹 슬라이드입니다.

## 🌟 주요 기능

- **Apple-style 디자인**: 미니멀하고 세련된 UI/UX
- **P5.js 애니메이션**: 동적인 파티클 배경 효과
- **좌측 네비게이션**: 슬라이드 전체 목차 및 빠른 이동
- **Gemini AI 채팅**: 슬라이드 내용에 대한 실시간 Q&A
- **16:9 비율**: 1920x1080 최적화
- **키보드 내비게이션**: 화살표 키, 스페이스바로 슬라이드 이동
- **모든 툴 링크**: 실제 서비스로 바로 이동 가능

## 📋 포함된 슬라이드

### 1. ChatGPT 기본 원리
- 프롬프트 작성법과 응용 사례
- GPT 3.5 vs GPT-4 비교
- GPTs 구성요소 (지침, Knowledge, Actions)

### 2. Creative Contents
- 이미지 생성 원리 및 로고 디자인 실습
- 음성/번역 챗봇 만들기
- 기업 홍보 영상 자동 생성

### 3. 업무 자동화
- 엑셀 데이터 정리/분류 봇
- GPTs와 Make 연동
- 이메일 자동화 챗봇
- SerpAPI 연동
- 네이버 뉴스레터 자동화 봇

## 🚀 시작하기

### 1. Gemini API 키 발급

1. [Google AI Studio](https://makersuite.google.com/app/apikey)에서 무료 API 키 발급
2. `script.js` 파일을 열고 다음 부분 수정:

```javascript
// 139번째 줄 근처
const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=YOUR_GEMINI_API_KEY', {
```

`YOUR_GEMINI_API_KEY`를 발급받은 실제 API 키로 교체하세요.

### 2. 로컬 서버 실행

**Python 사용:**
```bash
python -m http.server 8000
```

**Node.js 사용:**
```bash
npx http-server
```

**VS Code 사용:**
- Live Server 확장 설치 후 `index.html`에서 "Go Live" 클릭

### 3. 브라우저에서 열기

```
http://localhost:8000
```

## 🎨 디자인 특징

- **포인트 컬러**: Red (#ff3b30)
- **배경**: White (#ffffff)
- **글꼴**: Apple System Fonts (-apple-system)
- **애니메이션**: 부드러운 페이드인, 호버 효과
- **Glassmorphism**: 반투명 블러 효과

## 🎯 사용 방법

### 슬라이드 이동
- **좌측 네비게이션**: 클릭하여 원하는 슬라이드로 이동
- **하단 컨트롤**: ← / → 버튼 클릭
- **키보드**: 방향키(←/→) 또는 스페이스바

### AI 채팅 사용
1. 하단 채팅창 클릭 (자동 확장)
2. 질문 입력 후 전송
3. Gemini AI가 현재 슬라이드 컨텍스트 기반으로 답변
4. `_` 버튼으로 채팅창 축소/확장

## 📦 파일 구조

```
GPTmake/
├── index.html          # 메인 HTML (슬라이드 콘텐츠)
├── styles.css          # Apple-style 스타일시트
├── script.js           # 인터랙티브 기능 + Gemini API
└── README.md           # 이 파일
```

## 🔗 주요 툴 링크

슬라이드 내 모든 툴 버튼은 실제 서비스로 연결됩니다:

- [ChatGPT](https://chat.openai.com)
- [Make.com](https://www.make.com)
- [Synthesia](https://www.synthesia.io)
- [D-ID](https://www.d-id.com)
- [ElevenLabs](https://elevenlabs.io)
- [SerpAPI](https://serpapi.com)
- 기타 다수...

## 📚 참고 자료

모든 출처는 슬라이드 하단 "참고자료" 섹션에 하이퍼링크로 제공됩니다.

## ⚙️ 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, Animations, Backdrop Filter
- **JavaScript (ES6+)**: 인터랙티브 기능
- **P5.js**: 캔버스 애니메이션
- **Gemini API**: AI 채팅 기능

## 🎓 워크샵 진행 팁

1. **사전 준비**: 수강생들에게 ChatGPT Plus 계정 준비 안내
2. **실습 환경**: 각자 노트북 + 인터넷 연결 필수
3. **API 키**: Make, SerpAPI 등 실습용 API 키 미리 발급
4. **시간 배분**:
   - 이론 (40%): 각 슬라이드 설명
   - 실습 (50%): 핸즈온 프로젝트
   - Q&A (10%): AI 채팅 활용

## 🐛 문제 해결

### Gemini API 오류
- API 키가 올바르게 설정되었는지 확인
- 브라우저 콘솔(F12)에서 에러 메시지 확인
- CORS 문제 시 로컬 서버 사용 필수

### 슬라이드가 보이지 않음
- 로컬 서버가 실행 중인지 확인
- 브라우저 캐시 삭제 (Ctrl+Shift+R)

### P5.js 애니메이션 느림
- 성능이 낮은 기기에서는 particles 수 조절:
  - `script.js` 19번째 줄: `for (let i = 0; i < 50; i++)` → `< 20` 으로 감소

## 📄 라이선스

교육용 자료로 자유롭게 사용 가능합니다.

## 👨‍💻 제작

2025년 GPT 워크샵을 위해 제작된 인터랙티브 슬라이드입니다.

---

**즐거운 학습 되세요! 🎉**
