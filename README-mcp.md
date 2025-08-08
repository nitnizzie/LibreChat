# LibreChat MCP 설정 가이드

이 문서는 LibreChat에서 MCP(Model Context Protocol) 서버를 설정하고 사용하는 방법을 설명합니다.

## MCP란 무엇인가?

MCP(Model Context Protocol)는 대형 언어 모델(LLM)에 컨텍스트를 제공하는 표준화된 오픈 프로토콜입니다. AI의 "USB-C"라고 생각하시면 됩니다 - USB-C가 전자기기의 범용 연결 표준인 것처럼, MCP는 AI 모델을 다양한 도구, 데이터 소스, 서비스에 연결하는 표준화된 방법을 제공합니다.

LibreChat는 MCP를 통해 AI 에이전트의 기능을 확장하여 파일 시스템 접근, 웹 브라우저, 특수 API, 맞춤형 비즈니스 도구 등 모든 것을 통합할 수 있습니다.

## LibreChat에서 MCP 사용 방법

LibreChat는 MCP 서버를 사용하는 두 가지 방법을 제공합니다:

### 1. 채팅 영역에서 사용

- 일반 엔드포인트(OpenAI, Anthropic, Google, Bedrock 등)를 먼저 선택하고 도구 호환 모델을 선택
- 텍스트 입력창 아래 드롭다운에서 MCP 서버가 표시됨
- 선택하면 해당 서버의 모든 도구가 현재 모델에서 사용 가능
- 에이전트 생성 없이도 MCP 도구에 빠르게 접근 가능

채팅 드롭다운에서 MCP 서버를 비활성화하려면 설정에서 `chatMenu: false`로 설정:

```yaml
mcpServers:
  internal-tools:
    command: npx
    args: ["-y", "internal-mcp-server"]
    chatMenu: false  # 에이전트 빌더에서만 사용 가능
```

### 2. 에이전트와 함께 사용

- 에이전트 생성 또는 편집
- 에이전트 빌더 패널에서 "도구 추가"를 클릭하여 도구 대화상자 열기
- MCP 서버를 선택하면 각각이 단일 항목으로 표시됨
- 추가 후 개별 도구를 활성화/비활성화하여 세밀하게 조정
- 에이전트 저장

## 기본 설정 방법

`librechat.yaml` 파일에 MCP 서버를 수동으로 추가:

```yaml
mcpServers:
  # 파일 시스템 접근
  filesystem:
    command: npx
    args:
      - -y
      - "@modelcontextprotocol/server-filesystem"
      - /path/to/your/documents
  
  # 웹 브라우저 자동화
  puppeteer:
    command: npx
    args:
      - -y
      - "@modelcontextprotocol/server-puppeteer"
  
  # 실제 운영용 클라우드 서비스
  business-api:
    type: streamable-http
    url: https://api.yourbusiness.com/mcp
    headers:
      X-User-ID: "{{LIBRECHAT_USER_ID}}"
      Authorization: "Bearer ${API_TOKEN}"
    timeout: 30000
    serverInstructions: true
```

## Smithery를 이용한 MCP 서버 추가

[Smithery.ai](https://smithery.ai)는 LibreChat용 MCP 서버를 찾고 설치하는 간편한 방법을 제공합니다.

### 1단계: MCP 서버 검색
- [Smithery.ai](https://smithery.ai) 방문
- 원하는 기능으로 검색 (예: "파일 시스템", "웹 브라우징", "Github")

### 2단계: MCP 서버 선택
- 검색 결과에서 필요한 서버 선택

### 3단계: LibreChat용 구성
- "LibreChat"을 플랫폼으로 선택
- 자동 생성된 구성 복사

### 4단계: MCP 서버 설치
- 복사한 구성을 `librechat.yaml`의 `mcpServers` 섹션에 붙여넣기

### 5단계: 재시작 및 확인
- LibreChat 재시작하여 연결 초기화
- 채팅에서 MCP 서버가 사용 가능한지 확인

## MCP 서버 관리

### 연결 상태 표시기
LibreChat는 MCP 서버 상태를 시각적으로 표시합니다:
- ✅ 성공적으로 연결됨
- ❌ 연결 실패
- 🔄 초기화 중

### 서버 초기화
MCP 서버는 애플리케이션 시작 시 자동으로 초기화되며, 실패한 서버는 UI에서 수동으로 재초기화할 수 있습니다.

### MCP 설정 패널 표시
사용자는 우측 패널의 "MCP 설정"을 통해 모든 구성된 서버의 자격 증명을 관리할 수 있습니다.

## LibreChat 전용 기능

### 사용자별 연결
각 사용자는 다중 사용자 환경에서 독립적인 MCP 서버 연결을 유지합니다.

### 동적 사용자 컨텍스트
다음 변수를 사용하여 사용자별 컨텍스트를 제공:
- `{{LIBRECHAT_USER_ID}}` - 사용자 고유 ID
- `{{LIBRECHAT_USER_EMAIL}}` - 이메일 주소
- `{{LIBRECHAT_USER_ROLE}}` - 사용자 역할 (admin, user 등)
- `{{LIBRECHAT_USER_USERNAME}}` - 사용자명

### 서버 지시사항
`serverInstructions`는 MCP 서버의 도구가 선택될 때 동적으로 지시사항을 추가하는 LibreChat 기능입니다:

```yaml
mcpServers:
  filesystem:
    command: npx
    args: ["-y", "@modelcontextprotocol/server-filesystem", "/docs"]
    serverInstructions: |
      파일 접근 시:
      - 항상 파일 권한을 먼저 확인
      - 신뢰성을 위해 절대 경로 사용
      - 오류를 우아하게 처리
```

옵션:
- `true`: 서버 제공 지시사항 사용
- `false`: 지시사항 비활성화
- `string`: 맞춤형 지시사항 (위 예시와 같이)

### 타임아웃 구성
긴 실행 시간이 필요한 MCP 작업을 위해 초기화 및 도구 작업 모두에 적절한 타임아웃을 구성:

```yaml
mcpServers:
  data-processor:
    type: streamable-http
    url: https://api.example.com/mcp
    initTimeout: 15000    # 서버 초기화용 15초
    timeout: 60000        # 도구 작업용 60초
```

**참고**: 작업이 여전히 중단되는 경우, 기본 타임아웃으로 인해 연결을 조기에 끊을 수 있는 프록시 구성(예: nginx, traefik 등)을 확인하십시오.

## 사용자 제공 자격 증명

`customUserVars`를 통해 사용자가 MCP 서버용 자격 증명을 직접 제공할 수 있습니다. 이를 통해 구성 파일에 자격 증명을 저장하지 않고도 안전한 사용자별 인증이 가능합니다.

```yaml
mcpServers:
  my-api-server:
    type: streamable-http
    url: "https://api.example.com/mcp"
    headers:
      X-Auth-Token: "{{MY_API_KEY}}"  # 사용자 제공 값 사용
    customUserVars:
      MY_API_KEY:
        title: "API 키"
        description: "개인 API 키를 <a href='https://example.com/keys' target='_blank'>계정 설정</a>에서 입력하세요"
```

사용자는 다음 방법으로 자격 증명을 구성할 수 있습니다:
- **채팅 영역에서**: 도구 선택 드롭다운에서 구성 가능한 MCP 서버 옆의 설정 아이콘 클릭
- **MCP 설정 패널에서**: 우측 패널의 "MCP 설정"에 접근하여 모든 구성된 서버의 자격 증명 관리

### 사용자 자격 증명으로 MCP 서버 재초기화

사용자별 자격 증명이 필요한 MCP 서버의 경우 (예: GitHub 공식 MCP 서버의 `PAT_TOKEN`), LibreChat는 사용자가 이러한 자격 증명을 제공하고 전체 애플리케이션을 재시작하지 않고 UI에서 MCP 서버를 재초기화할 수 있게 합니다:

1. `customUserVars`를 사용하는 MCP를 선택하면 MCP 패널에서 선택된 MCP 서버의 `customUserVar` 값을 **저장** 또는 **취소**할 수 있습니다.
2. `customUserVar`에 대한 값을 저장한 후, 재초기화 버튼(MCP 패널의 각 서버 이름 옆에 있는 원형 화살표 아이콘)을 클릭합니다.
3. LibreChat는 제공된 자격 증명을 사용하여 서버에 연결을 시도하고 재초기화 과정이 성공 또는 실패했는지 토스트로 알려줍니다.

> _팁: 서버가 첫 시작 시 사용할 수 없는 자격 증명을 필요로 한다는 것을 알고 있다면, 구성에 `startup: false`를 추가할 수 있습니다. 이는 LibreChat에게 UI에서 수동으로 재초기화될 때까지 해당 서버에 연결을 시도하지 말라고 지시합니다._

**예시:**

```yaml
mcpServers:
  github-mcp:
    type: streamable-http
    url: "https://api.githubcopilot.com/mcp/"
    headers:
      Authorization: "{{PAT_TOKEN}}"
    customUserVars:
      PAT_TOKEN:
        title: "GitHub PAT 토큰"
        description: "GitHub 개인 액세스 토큰"
    startup: false
```

## OAuth 인증

LibreChat는 Anthropic의 안전한 MCP 연결 권장사항에 따라 MCP 서버용 OAuth 인증을 지원합니다. OAuth는 장기간 자격 증명을 저장하지 않고도 인증할 수 있는 표준화되고 안전한 방법을 제공합니다.

### 지원되는 OAuth 플로우

LibreChat MCP 서버는 다음과 같은 OAuth 2.0을 지원합니다:
- **PKCE를 사용한 인증 코드 플로우**: 최대 보안을 위해 권장
- **클라이언트 발견**: OAuth 제공자가 지원할 때 자동 클라이언트 등록
- **새로 고침 토큰**: 사용 가능할 때 자동 토큰 갱신

### 구성 예시

```yaml
mcpServers:
  # PayPal용 공개 원격 MCP 서버, OAuth 클라이언트 발견 사용
  # ❌ 새로 고침 토큰: 주기적으로 재인증이 필요할 수 있음
  # 자세한 정보: https://developer.paypal.com/tools/mcp-server/
  paypal:
    type: "sse"
    initTimeout: 150000 # 초기 인증을 허용하기 위한 높은 타임아웃
    url: "https://mcp.paypal.com/sse"
  
  # Spotify용 자체 호스팅 원격 MCP 서버 예시, OAuth 클라이언트 발견 사용
  # ✅ 새로 고침 토큰: 인증을 위해 토큰을 자동으로 새로 고침
  # Cloudflare Workers에서 호스팅, 자세한 정보: https://github.com/LibreChat-AI/spotify-mcp
  spotify:
    type: "streamable-http"
    initTimeout: 150000
    url: "https://mcp-spotify-oauth-example.account.workers.dev/mcp"
```

### OAuth 인증 플로우

OAuth가 활성화된 MCP 서버를 처음 구성할 때:

1. **초기 연결**: LibreChat가 MCP 서버에 연결을 시도
2. **인증 필요**: 유효한 토큰이 없으면 채팅 드롭다운에서 해당 서버에 대한 OAuth 인증 표시기가 나타남
3. **버튼 인터페이스**: 인증 표시기 버튼을 클릭하여 MCPConfigDialog를 열고 OAuth 플로우 시작
4. **구성 대화상자**: MCPConfigDialog에서 인증 버튼을 클릭하여 브라우저에서 OAuth 인증 페이지 열기
5. **브라우저 리디렉션**: LibreChat가 브라우저에서 OAuth 제공자를 열기
6. **반환 처리**: 인증 완료 후 LibreChat가 자동으로 OAuth 콜백을 처리
7. **토큰 저장**: LibreChat가 향후 사용을 위해 토큰을 안전하게 저장
8. **연결 설정**: 인증 완료 후 MCP 서버가 연결되어 채팅에서 사용 가능

### 토큰 관리

LibreChat는 OAuth 토큰을 지능적으로 처리합니다:
- **안전한 저장**: 토큰이 암호화되어 안전하게 저장됨
- **자동 새로 고침**: 새로 고침 토큰이 사용 가능할 때 만료된 액세스 토큰을 자동으로 갱신
- **세션 관리**: 각 사용자가 다중 사용자 환경에서 자체 OAuth 세션을 유지

각 사용자는 OAuth가 활성화된 MCP 서버를 처음 사용할 때 자체 OAuth 로그인으로 인증하라는 메시지가 표시됩니다. 이는 연결 및 인증 세부 정보가 각 사용자에게 고유하도록 보장하여 다중 사용자 환경에서 보안과 개인정보 보호를 유지합니다.

자동 토큰 새로 고침 예시:
```
[MCP][spotify] Access token missing
[MCP][spotify] Attempting to refresh token
[MCP][spotify] Successfully refreshed and stored OAuth tokens
[MCP][spotify] ✓ Initialized
```

### 모범 사례

1. **사용 가능할 때 OAuth 사용**: 더 나은 보안을 위해 API 키보다 OAuth를 선호
2. **적절한 타임아웃 구성**: OAuth 플로우를 위해 높은 `initTimeout` 설정 (예: 150000ms)
3. **토큰 만료 모니터링**: 인증 문제에 대한 로그 확인
4. **재인증 계획**: 일부 제공자는 새로 고침 토큰을 지원하지 않음

**참고**: 곧 UI 기반 OAuth 구성이 제공될 예정이며, 이는 LibreChat 인터페이스에서 직접 인증 과정을 간소화할 것입니다.

## 서버 전송 방식

MCP 서버는 다양한 전송 메커니즘을 사용하도록 구성할 수 있습니다:

### STDIO 서버
- 로컬, 단일 사용자 환경에 적합
- 원격 또는 클라우드 배포에는 확장성이 떨어짐

### SSE(Server-Sent Events) 서버
- 원격 전송 메커니즘이지만 프로덕션 환경에는 권장되지 않음

### Streamable HTTP 서버
- 메시지 전송에 HTTP POST를 사용하고 스트리밍 응답을 지원
- 여러 클라이언트 연결을 처리할 수 있는 독립적인 프로세스로 작동
- 기본 요청과 Server-Sent Events(SSE)를 통한 스트리밍 모두 지원
- 레거시 HTTP+SSE 전송에 비해 더 성능이 좋은 대안
- 적절한 다중 사용자 서버 구성을 지원

**프로덕션 환경의 경우**, "Streamable HTTP" 전송이 있는 MCP 서버만 권장됩니다. 장기 실행 연결을 유지하는 SSE와 달리 Streamable HTTP는 확장 가능한 다중 사용자 배포에 더 적합한 상태 비저장 옵션을 제공합니다.

## 중요 참고사항

1. **재시작 필요**: MCP 서버를 추가하거나 편집한 후에는 LibreChat를 재시작하여 연결을 초기화해야 합니다
2. **프로덕션 권장사항**: 프로덕션 환경에서는 "Streamable HTTP" 전송이 있는 MCP 서버만 권장됩니다
3. **보안**: OAuth 인증을 사용하면 더 안전한 연결이 가능합니다
4. **사용자 경험**: 사용자별 자격 증명을 통해 개인화된 서비스 이용이 가능합니다

LibreChat는 유연하고 확장 가능한 MCP 서버 통합을 구현하여 다양한 사용 시나리오를 지원하고 내일의 AI 워크플로우를 구축할 수 있도록 돕는 선두주자입니다.

---

**AI 기능을 확장할 준비가 되셨나요?** 첫 번째 MCP 서버를 구성하는 것부터 시작하여 LibreChat가 조직에 필요한 거의 모든 도구나 서비스에 연결할 수 있는 방법을 알아보세요.

## 추가 리소스

- [LibreChat MCP 공식 문서](https://www.librechat.ai/docs/features/mcp)
- [Smithery.ai MCP 서버 디렉토리](https://smithery.ai)
- [Model Context Protocol 공식 사이트](https://modelcontextprotocol.io)
