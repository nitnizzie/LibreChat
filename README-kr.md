<p align="center">
  <a href="https://librechat.ai">
    <img src="client/public/assets/logo.svg" height="256">
  </a>
  <h1 align="center">
    <a href="https://librechat.ai">LibreChat</a>
  </h1>
</p>

<p align="center">
  <a href="https://discord.librechat.ai"> 
    <img
      src="https://img.shields.io/discord/1086345563026489514?label=&logo=discord&style=for-the-badge&logoWidth=20&logoColor=white&labelColor=000000&color=blueviolet">
  </a>
  <a href="https://www.youtube.com/@LibreChat"> 
    <img
      src="https://img.shields.io/badge/YOUTUBE-red.svg?style=for-the-badge&logo=youtube&logoColor=white&labelColor=000000&logoWidth=20">
  </a>
  <a href="https://docs.librechat.ai"> 
    <img
      src="https://img.shields.io/badge/DOCS-blue.svg?style=for-the-badge&logo=read-the-docs&logoColor=white&labelColor=000000&logoWidth=20">
  </a>
</p>

# 📋 LibreChat - 오픈소스 AI 채팅 플랫폼

**LibreChat**은 ChatGPT와 유사한 인터페이스를 제공하는 오픈소스 AI 채팅 플랫폼입니다. 다양한 AI 모델들을 통합해서 사용할 수 있으며, 고급 기능들을 제공하는 완전한 웹 애플리케이션입니다.

## ✨ 주요 기능

### 🤖 **AI 모델 지원**
- **주요 AI 제공업체**: OpenAI (GPT-4, GPT-3.5), Anthropic (Claude), Google (Gemini), Azure OpenAI, AWS Bedrock, Vertex AI
- **커스텀 엔드포인트**: OpenAI 호환 API라면 무엇이든 사용 가능
- **로컬 & 원격 AI 제공업체**: Ollama, groq, Cohere, Mistral AI, Apple MLX, koboldcpp, together.ai, OpenRouter, Perplexity, ShuttleAI, Deepseek, Qwen 등

### 🔧 **고급 기능**
- **코드 인터프리터 API**: Python, Node.js, Go, C/C++, Java, PHP, Rust, Fortran에서 안전한 코드 실행
- **에이전트 & 도구 통합**: 노코드 커스텀 어시스턴트, MCP 서버 지원
- **웹 검색**: 인터넷 검색을 통한 컨텍스트 강화
- **생성형 UI**: React, HTML, Mermaid 다이어그램 생성
- **이미지 생성 & 편집**: DALL-E, Stable Diffusion, Flux 지원
- **멀티모달**: 이미지 업로드 및 분석, 파일과의 채팅
- **음성 기능**: 음성 인식 및 텍스트 음성 변환

### 🌍 **사용자 경험**
- **다국어 지원**: 한국어를 포함한 20개 언어 지원
- **대화 관리**: 프리셋 생성, 대화 분기, 메시지 포크
- **파일 처리**: 파일 업로드, 분석, 다운로드
- **멀티 사용자**: OAuth2, LDAP, 이메일 로그인 지원
- **데이터 관리**: 대화 가져오기/내보내기, 검색 기능

## 🏗️ 레포지토리 구조

### **핵심 애플리케이션**

```
📁 api/                           # 백엔드 API 서버
├── 📁 server/                    # Express.js 서버 코드
│   ├── 📁 controllers/           # API 컨트롤러
│   ├── 📁 middleware/            # 미들웨어
│   ├── 📁 routes/                # API 라우트
│   ├── 📁 services/              # 비즈니스 로직 서비스
│   └── 📁 utils/                 # 서버 유틸리티
├── 📁 app/clients/               # AI 모델 클라이언트
│   ├── AnthropicClient.js        # Anthropic Claude 클라이언트
│   ├── GoogleClient.js           # Google Gemini 클라이언트
│   └── 📁 agents/                # AI 에이전트
├── 📁 models/                    # 데이터베이스 모델 (MongoDB)
├── 📁 strategies/                # 인증 전략 (OAuth, LDAP 등)
└── 📁 config/                    # API 서버 설정

📁 client/                        # 프론트엔드 React 애플리케이션
├── 📁 src/
│   ├── 📁 components/            # React 컴포넌트
│   │   ├── 📁 Chat/              # 채팅 관련 컴포넌트
│   │   ├── 📁 Messages/          # 메시지 컴포넌트
│   │   ├── 📁 Nav/               # 네비게이션
│   │   ├── 📁 Auth/              # 인증 컴포넌트
│   │   └── 📁 Files/             # 파일 처리
│   ├── 📁 store/                 # 상태 관리 (Zustand)
│   ├── 📁 hooks/                 # React 훅스
│   ├── 📁 utils/                 # 유틸리티 함수
│   └── 📁 locales/               # 다국어 번역 파일
└── 📁 public/                    # 정적 파일
```

### **모노레포 패키지**

```
📁 packages/                      # 공유 패키지들
├── 📁 api/                       # API 공통 코드
├── 📁 client/                    # 클라이언트 공통 코드
├── 📁 data-provider/             # 데이터 프로바이더
└── 📁 data-schemas/              # 데이터 스키마 정의
```

### **설정 및 관리**

```
📁 config/                        # 관리 스크립트
├── create-user.js                # 사용자 생성
├── add-balance.js                # 크레딧 추가
├── list-users.js                 # 사용자 목록
└── update.js                     # 시스템 업데이트

📁 e2e/                           # End-to-end 테스트
📁 helm/                          # Kubernetes Helm 차트
📁 utils/                         # 유틸리티 스크립트
```

### **주요 설정 파일**

- **`docker-compose.yml`** - Docker 컨테이너 구성
- **`librechat.example.yaml`** - LibreChat 설정 예시
- **`.env.example`** - 환경 변수 예시

## 🚀 설치 및 사용 방법

### **방법 1: Docker Compose 사용 (권장)**

#### 1. 저장소 클론
```bash
git clone https://github.com/danny-avila/LibreChat.git
cd LibreChat
```

#### 2. 환경 설정
```bash
# 환경 변수 파일 생성
cp .env.example .env

# .env 파일 편집 - 필요한 API 키들 입력
# OPENAI_API_KEY=your_openai_api_key
# ANTHROPIC_API_KEY=your_anthropic_api_key
# 등등...
```

#### 3. LibreChat 설정 (선택사항)
```bash
# 설정 파일 복사
cp librechat.example.yaml librechat.yaml

# 필요에 따라 librechat.yaml 편집
```

#### 4. 커스텀 Docker 설정 (선택사항)
```bash
# Docker 오버라이드 파일 생성
cp docker-compose.override.yml.example docker-compose.override.yml

# 필요한 설정만 주석 해제하고 편집
```

#### 5. 실행
```bash
# 배포 모드로 실행
npm run start:deployed

# 또는 직접 Docker Compose 사용
docker compose -f deploy-compose.yml up -d
```

### **방법 2: 개발 모드로 실행**

#### 1. 의존성 설치
```bash
npm install
```

#### 2. 데이터베이스 설정
- MongoDB 실행 필요
- Meilisearch 실행 필요 (선택사항, 검색 기능용)

#### 3. 서버 실행
```bash
# 백엔드 개발 서버 (포트 3080)
npm run backend:dev

# 프론트엔드 개발 서버 (별도 터미널, 포트 3000)
npm run frontend:dev
```

## 🐳 Docker 컨테이너 구성

LibreChat은 다음 서비스들로 구성됩니다:

| 서비스 | 설명 | 포트 |
|--------|------|------|
| **api** | LibreChat 메인 애플리케이션 | 3080 |
| **mongodb** | MongoDB 데이터베이스 | 27017 |
| **meilisearch** | 검색 엔진 (메시지 검색) | 7700 |
| **vectordb** | PostgreSQL + pgvector (RAG용) | 5432 |
| **rag_api** | RAG API 서버 | 8000 |

### **Docker 커스터마이징**

`docker-compose.override.yml` 파일을 사용하여 설정을 커스터마이징할 수 있습니다:

```yaml
# 설정 파일 마운트 예시
services:
  api:
    volumes:
    - type: bind
      source: ./librechat.yaml
      target: /app/librechat.yaml
```

## ⚙️ 환경 설정

### **필수 환경 변수**

```bash
# .env 파일 예시

# AI 모델 API 키
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
GOOGLE_API_KEY=your_google_api_key

# 데이터베이스
MONGO_URI=mongodb://mongodb:27017/LibreChat

# JWT 설정
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

# 기타
HOST=localhost
PORT=3080
```

### **LibreChat 설정 파일**

`librechat.yaml` 파일로 다양한 기능을 설정할 수 있습니다:

```yaml
# librechat.yaml 예시
version: 1.2.1
cache: true

interface:
  customWelcome: "LibreChat에 오신 것을 환영합니다!"
  fileSearch: true

endpoints:
  custom:
    - name: "Local Ollama"
      apiKey: "ollama"
      baseURL: "http://localhost:11434"
      models:
        default: ["llama2", "mistral"]
```

## 🛠️ 관리 명령어

### **사용자 관리**
```bash
# 새 사용자 생성
npm run create-user

# 사용자 목록 조회
npm run list-users

# 사용자 크레딧 추가
npm run add-balance

# 사용자 비밀번호 재설정
npm run reset-password

# 사용자 차단
npm run ban-user
```

### **시스템 관리**
```bash
# 시스템 업데이트
npm run update

# Docker 환경 업데이트
npm run update:docker

# 배포된 환경 업데이트
npm run update:deployed

# 사용자 통계
npm run user-stats
```

### **개발 도구**
```bash
# 코드 린팅
npm run lint

# 코드 포맷팅
npm run format

# 테스트 실행
npm run test:api
npm run test:client

# E2E 테스트
npm run e2e
```

## 📚 추가 리소스

- **공식 문서**: [https://docs.librechat.ai](https://docs.librechat.ai)
- **Discord 커뮤니티**: [https://discord.librechat.ai](https://discord.librechat.ai)
- **YouTube 채널**: [https://www.youtube.com/@LibreChat](https://www.youtube.com/@LibreChat)
- **GitHub**: [https://github.com/danny-avila/LibreChat](https://github.com/danny-avila/LibreChat)

## 🤝 기여하기

LibreChat은 오픈소스 프로젝트입니다. 기여를 환영합니다!

1. 저장소를 포크하세요
2. 기능 브랜치를 생성하세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성하세요

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

<p align="center">
  <strong>LibreChat</strong>으로 AI의 새로운 가능성을 경험해보세요! 🚀
</p>
