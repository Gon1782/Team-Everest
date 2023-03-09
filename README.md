![](/public/image/banner.jpg)

Sharpa는 사용자들에게 다양한 관광지와 행사 정보를 제공하며, <br />
좀 더 질적으로 우수한 관광지,행사 정보를 보여드리고자 후기 및 평점 기능까지 제공하고 있습니다. <br />

또한, 가고 싶지만 여러 환경으로 인해 못가는 경우를 대비하여 <br />
사용자에게 해당 관광지와 가장 유사한 다른 관광지 추천 기능도 있으며,<br />
관광지 정보를 저장 할 수 있는 북마크 기능,<br />
저장한 관광지 정보를 일정에 추가 할 수 있는 기능도 제공하고 있습니다.<br />

[배포링크](https://www.sharpa.co.kr/)
<br />

# 👥팀원 구성

| 이름   | 깃허브 주소                   |
| ------ | ----------------------------- |
| 지회수 | https://github.com/Newasborn  |
| 한상권 | https://github.com/Gon1782    |
| 김우상 | https://github.com/Freesian12 |

<br />

# 🤝우리팀 규칙 (코드컨벤션)

### git commit Message Convention

| feat     | 새로운 기능과 관련된 것을 의미한다.                                                              |
| -------- | ------------------------------------------------------------------------------------------------ |
| fix      | 오류와 같은 것을 수정했을 때 사용한다.                                                           |
| docs     | 문서와 관련하여 수정한 부분이 있을 때 사용한다.                                                  |
| style    | 코드의 변화와 관련없는 포맷이나 세미콜론을 놓친 것과 같은 부분들을 의미한다.                     |
| refactor | 코드의 리팩토링을 의미한다.                                                                      |
| test     | test를 추가하거나 수정했을 때를 의미한다.                                                        |
| chore    | build와 관련된 부분, 패키지 매니저 설정 등 여러가지 production code와 무관한 부분 들을 의미한다. |
| design   | css 등 스타일에 관련된 것을 의미한다.                                                            |

<br />

### github flow

메인 브랜치인 `main` 중점으로 도메인을 관리한다
`main` 브랜치는 항상 최신 버전을 유지하며 안정적이어야함.

- 기능 구현을 완료하면 dev 브랜치로 `Pull Request` 요청
- 자체 merge 허가
- 각자의 컴포넌트 브랜치에서 push&pull

### naming Convention

- camelcase로 변수 ,함수 사용

### css 초기화

- 에릭마이어의 reset.css를 통해 크로스브라우징작업

### prettier 포멧팅 설정

```jsx
{
  "arrowParens": "always",
  "bracketSpacing": true,
  "endOfLine": "auto",
  "htmlWhitespaceSensitivity": "css",
  "jsxBracketSameLine": false,
  "jsxSingleQuote": false,
  "printWidth": 80,
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "useTabs": false
}
```

<br />

# 🔧기술스택

### Client

`react` , `react-router` , `recoil` , `axios` , `styled-component` , `TypeScript`

### Server

`firebase`

### deploy

`vercel`

<br />

# 📁폴더구조

![](/public/image/folderStructure.png)

<br />

# 👨‍💻구현기능

- 메인 페이지
  - 관광지 정보 제공 페이지
  - 도시 검색 기능
- 지도 페이지
  - 도시별 위치 제공 기능
- 일정 만들기 페이지
  - 일정 만들기 기능
  - 관광지 검색 기능
  - 위치 정보 기능
- 마이페이지
  - 사용자의 일정,후기 정보 history 기능
  - 사용자 정보 수정 기능
    <br />
