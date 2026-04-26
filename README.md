# study-express-with-docs 🛤

> Express를 [공식 문서](https://expressjs.com/)와 good practice를 따라가며 익히는 학습 repo. 검색 결과 짜깁기로 빠르게 기능을 붙이기보다, **docs를 1차 자료로 두는 습관**을 들이는 데 목적이 있습니다.

## 📌 다룬 주제

| 주제 | 위치 | 내용 |
|---|---|---|
| **Session 기반 인증** | `auth/` | 로그인/세션 미들웨어, EJS 뷰로 form 처리 |
| **Cookie** | `cookies/` | 쿠키 옵션, Set-Cookie/응답 헤더 동작 검증 + `practice/` 별도 |

## 🗂 구조

```
study-express-with-docs/
├── auth/
│   ├── index.js                 # express + session 진입점
│   ├── package.json             # 모듈별 독립 의존성
│   └── views/
│       ├── head.ejs, foot.ejs   # 레이아웃 분리
│       └── login.ejs
├── cookies/
│   ├── cookies.md               # docs를 따라가며 적은 메모
│   ├── index.js
│   └── practice/
│       └── index.js             # 변형해서 직접 짜본 코드
├── package.json                 # 루트
└── .prettierrc, .prettierignore
```

- **주제별 독립 폴더 + 각자 `package.json`**: 한 주제를 독립적으로 켜고 끌 수 있게.
- **`cookies.md`처럼 docs 메모를 같이 커밋**: 시간이 지나서 봤을 때, 코드만으로는 알 수 없는 의도를 함께 남기기 위함.

## 🛠 기술 스택

- **Node.js + Express**
- **EJS** (서버사이드 렌더링)
- **Prettier** (코드 스타일 일관성)

## 🚀 실행

```bash
# auth 예제
cd auth
npm install
node index.js

# cookies 예제
cd cookies
node index.js
```

## 💭 이 repo의 학습 철학

- **공식 문서가 가장 정확하다**: 블로그 글은 작성 시점의 버전·맥락이 다를 수 있습니다. Express 버전이 바뀌어도 docs는 그에 맞춰 업데이트되니 1차 자료로 두는 게 안전합니다.
- **"읽었다"가 아니라 "쳤다"가 학습이다**: docs를 읽고 끝내지 않고, 폴더를 따로 만들어 변형 코드(`practice/`)를 직접 작성합니다.
