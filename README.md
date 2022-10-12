

# 1. 어린이를 위한 핀테크 서비스, 뱅키즈

![thumbnail_bankidz](README.assets/thumbnail_bankidz.png)

|                 Web                 |                             iOS                              |                           Android                            |
| :---------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| [bankidz.com](https://bankidz.com/) | <a href="https://play.google.com/store/apps/details?id="><img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/ko-kr?size=250x83&amp;releaseDate=1654300800&h=dd4ccd7fb22c609cf9132f37bf23c390" alt="Download on the App Store" style="border-radius: 13px; width: 250px; height: 83px;"></a> | <a href='https://play.google.com/store/apps/details?id='><img alt='다운로드하기 Google Play' width='285px' src='https://play.google.com/intl/en_us/badges/static/images/badges/ko_badge_web_generic.png'/></a> |

* 뱅키즈는 웹뷰 환경에 최적화 되어 있습니다. 기타 웹 브라우저 환경에서는 일부 기능이 작동하지 않습니다.
* 뱅키즈 앱은 현재 App Store, Google Play 출시를 위해 심사중입니다.

<br/>

# 2. 뱅키즈를 만드는 사람

| <img src="https://avatars.githubusercontent.com/24siefil" width=150px> | <img src="https://avatars.githubusercontent.com/9yujin" width=150px> | <img src="https://avatars.githubusercontent.com/rms5213" width=150px> | <img src="https://avatars.githubusercontent.com/sanbonai06" width=150px> | <img src="https://avatars.githubusercontent.com/ozzing" width=150px> |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|            [신성우](https://github.com/24siefil)             |             [한규진](https://github.com/9yujin)              |             [이근우](https://github.com/rms5213)             |           [김민준](https://github.com/sanbonai06)            |           [주어진사랑](https://github.com/ozzing)            |
|                   Web-client<br />Engineer                   |                   Web-client<br />Engineer                   |                   Web-client<br />Engineer                   |                     Server<br />Engineer                     |                     Server<br />Engineer                     |
|               [안도영](mailto:ado20@naver.com)               |           [박소정](mailto:the1sojeong@ewhain.net)            |             [김수빈](mailto:beeny9958@gmail.com)             |            [최지혜](mailto:sbbhfl6135@gmail.com)             |                                                              |
|                             CEO                              |                              PO                              |                           Designer                           |                           Designer                           |                                                              |

<br/>

# 3. 뱅키즈를 만드는 기술

뱅키즈는 가설 검증 주기를 최소화 하기 위해 모든 비즈니스 로직을 웹 기술로 구현합니다. 이를 통해 사용자에게 항상 최신의 서비스를 제공하고 피드백에 기민하게 대응합니다. 푸시알림 제공과 서비스 접속에 대한 접근성 향상을 위해 웹 서비스를 웹뷰로 이식한 앱으로 최종 프로덕트를 제작합니다.

- **코어**: React, TypeScript

- **상태관리**: Redux, React Query

- **디자인 시스템**: Storybook (링크), Theme Provider

- **스타일링**: Styled-components

- **코드품질**: ESLint, Prettier

- **CI/CD**: Github Action, Docker-compose

- **버전관리**: Git with Github, Git-flow

- **웹뷰 앱**: React Native with EXPO

- **협업**: Figma (링크), Slack, Notion

<details>
<summary>디랙토리 구조</summary>
<div markdown="1">

  ```
  .
  ├── App.tsx
  ├── assets
  ├── components # business logic
  ├── index.tsx
  ├── lib
  │   ├── apis # api call, server-side type
  │   ├── constants # macros
  │   ├── hooks # custom hooks, custom queries
  │   ├── styles # theme provider
  │   ├── types # client-side type
  │   └── utils # reusable functions
  ├── pages # routing
  └── store
      ├── app # Redux store
      └── slices # RTK slices
  ```
</div>
</details>

<details>
<summary>Architecture</summary>
<div markdown="1">

  <img src="README.assets/178255707-814eb2ac-be3a-4350-940c-f060890c2420.jpeg" alt="KakaoTalk_Photo_2022-07-11-20-35-48" style="zoom: 67%;" />

</div>
</details>

<br/>

# 4. 주요 기능

## 4.1. 회원관리, 온보딩 (공통)

1. 애플 소셜 로그인 → 로그아웃 → 카카오 소셜 로그인 → 회원 탈퇴
2. 생년월일 → 프로필 → 푸시알림 동의 → 튜토리얼 → 홈

<details>
<summary>자세히</summary>
<div markdown="1">

  - 카카오, 애플 소셜 로그인을 사용한다.
  - 서버로부터 받은 accessToken은 memory (Redux Store)를 통해 관리되며, refreshToken은 httpOnly & secure cookie를 통해 관리되어 Client단에서의 직접 접근을 차단하고 보안성을 제고한다.
  - 웹뷰 이식 과정에서 EXPO 관련 호환성 문제로 token은 localStorage를 통해 관리되는 것으로 정책이 변경되었다.

<img src="README.assets/image.svg" alt="https://velog.velcdn.com/images/24siefil/post/945daeaa-533b-4cde-95ef-a677dc4ea940/image.svg" style="zoom:67%;" />

</div>
</details>

| <img src="README.assets/195259808-422811dd-eaef-4b72-a15a-8dbea38511d3.gif" alt="돈길 걷기" style="zoom:33%;" /> | <img src="README.assets/195259808-422811dd-eaef-4b72-a15a-8dbea38511d3-20221012144456485.gif" alt="돈길 걷기" style="zoom:33%;" /> |
| ------------------------------------------------------------ | ------------------------------------------------------------ |

## 4.2. 홈 탭 (자녀)

1. 걷고있는 돈길 → 돈길 포기하기 → 실패한 돈길 삭제
2. 대기중인 돈길 → 거절된 돈길 삭제
3. 알림내역

<details>
<summary>자세히</summary>
<div markdown="1">

  - 홈 탭에서는 다양한 종류의 돈길에 대한 CRUD가 가능하다.
  - 홈 탭의 데이터는 ReactQuery 기반의 interval refetch 로직을 통해 최신상태를 유지한다.
  - 알림내역은 무한스크롤 기반으로 데이터를 지속적으로 fetch 한다.

</div>
</details>

| <img src="README.assets/%E1%84%8C%E1%85%A1%E1%84%82%E1%85%A7%20%E1%84%92%E1%85%A9%E1%86%B7%20%E1%84%80%E1%85%A5%E1%86%AE%E1%84%80%E1%85%A9%E1%84%8B%E1%85%B5%E1%86%BB%E1%84%82%E1%85%B3%E1%86%AB%20%E1%84%83%E1%85%A9%E1%86%AB%E1%84%80%E1%85%B5%E1%86%AF.gif" alt="자녀 홈 걷고있는 돈길" style="zoom:33%;" /> | <img src="README.assets/%E1%84%8C%E1%85%A1%E1%84%82%E1%85%A7%20%E1%84%92%E1%85%A9%E1%86%B7%20%E1%84%83%E1%85%A2%E1%84%80%E1%85%B5%E1%84%8C%E1%85%AE%E1%86%BC%E1%84%8B%E1%85%B5%E1%86%AB%20%E1%84%83%E1%85%A9%E1%86%AB%E1%84%80%E1%85%B5%E1%86%AF.gif" alt="자녀 홈 대기중인 돈길" style="zoom:33%;" /> | <img src="README.assets/%E1%84%8B%E1%85%A1%E1%86%AF%E1%84%85%E1%85%B5%E1%86%B7%20%E1%84%82%E1%85%A2%E1%84%8B%E1%85%A7%E1%86%A8.gif" alt="알림 내역" style="zoom:33%;" /> |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |

## 4.3. 돈길 계약하기, 돈길 걷기 탭 (자녀)

1. 계약 대상 → 계약 상품 → 이름, 목표금액 → 이자율, 매주 저금액 → 서명 → 계약서 확인
2. 돈길 걷기

<details>
<summary>자세히</summary>
<div markdown="1">

  …

</div>
</details>

| <img src="README.assets/%E1%84%83%E1%85%A9%E1%86%AB%E1%84%80%E1%85%B5%E1%86%AF%20%E1%84%80%E1%85%A8%E1%84%8B%E1%85%A3%E1%86%A8%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5%20%E1%84%8B%E1%85%B5%E1%84%8C%E1%85%A1%E1%84%87%E1%85%AE%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5%20%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC%20%E1%84%86%E1%85%A9%E1%84%83%E1%85%A1%E1%86%AF%20%E1%84%91%E1%85%A9%E1%84%92%E1%85%A1%E1%86%B7.gif" alt="돈길 계약하기 이자부스터 설명 모달 포함" style="zoom:33%;" /> | <img src="README.assets/%E1%84%83%E1%85%A9%E1%86%AB%E1%84%80%E1%85%B5%E1%86%AF%20%E1%84%80%E1%85%A5%E1%86%AE%E1%84%80%E1%85%B5.gif" alt="돈길 걷기" style="zoom:33%;" /> |
| ------------------------------------------------------------ | ------------------------------------------------------------ |

## 4.4. 홈 탭, 이자 내역 탭 (부모)

1. 각 자녀의 제안받은 돈길, 금주의 돈길
2. 제안받은 돈길 → 수락하기 → 거절하기
3. 지급이 필요한 이자 → 자세히 보기 → 지급 완료하기

<details>
<summary>자세히</summary>
<div markdown="1">

  - 선택된 자녀의 데이터만 optimistic하게 fetch 하여 리소스 사용을 최적화 한다.
  - fetch된 데이터는 Cache 되어 로딩을 최적화 한다.
  - 홈 탭에서는 다양한 종류의 돈길에 대한 CRUD가 가능하다.
  - 홈 탭의 데이터는 ReactQuery 기반의 interval refetch 로직을 통해 최신상태를 유지한다.

</div>
</details>

| <img src="README.assets/%E1%84%87%E1%85%AE%E1%84%86%E1%85%A9%20%E1%84%92%E1%85%A9%E1%86%B7%20%E1%84%83%E1%85%A1%E1%84%8C%E1%85%A1%E1%84%82%E1%85%A7.gif" alt="부모 홈 다자녀" style="zoom:33%;" /> | <img src="README.assets/%E1%84%87%E1%85%AE%E1%84%86%E1%85%A9%20%E1%84%92%E1%85%A9%E1%86%B7%20%E1%84%8C%E1%85%A6%E1%84%8B%E1%85%A1%E1%86%AB%E1%84%87%E1%85%A1%E1%86%AE%E1%84%8B%E1%85%B3%E1%86%AB%20%E1%84%83%E1%85%A9%E1%86%AB%E1%84%80%E1%85%B5%E1%86%AF.gif" alt="부모 홈 제안받은 돈길" style="zoom:33%;" /> | <img src="README.assets/%E1%84%8B%E1%85%B5%E1%84%8C%E1%85%A1%E1%84%82%E1%85%A2%E1%84%8B%E1%85%A7%E1%86%A8%20%E1%84%8B%E1%85%B5%E1%84%8C%E1%85%A1%E1%84%8C%E1%85%B5%E1%84%80%E1%85%B3%E1%86%B8.gif" alt="이자내역 이자지급" style="zoom:33%;" /> |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |

## 4.5. 마이페이지 탭 및 가족 초대 (공통)

1. 설정
2. 가족초대

<details>
<summary>자세히</summary>
<div markdown="1">

  …

</div>
</details>

| <img src="README.assets/%E1%84%89%E1%85%A5%E1%86%AF%E1%84%8C%E1%85%A5%E1%86%BC%20%E1%84%8C%E1%85%A1%E1%84%82%E1%85%A7.gif" alt="설정 자녀" style="zoom:33%;" /> |      |
| ------------------------------------------------------------ | ---- |



## 4.6. 기타

1. React-transition-group 기반 Routing Animation
2. Skeleton UI, Caching
3. 우선순위에 따른 전역 API 에러처리
4. 알림 설정 localStorage Caching

| <img src="README.assets/%E1%84%90%E1%85%B3%E1%84%85%E1%85%A2%E1%86%AB%E1%84%8C%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%20%E1%84%80%E1%85%B3%E1%84%85%E1%85%AE%E1%86%B8%20%E1%84%83%E1%85%A9%E1%86%AB%E1%84%80%E1%85%B5%E1%86%AF%20%E1%84%80%E1%85%A8%E1%84%8B%E1%85%A3%E1%86%A8%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5.gif" alt="트랜지션 그룹 돈길 계약하기" style="zoom:33%;" /> | <img src="README.assets/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%A6%E1%86%AF%E1%84%85%E1%85%A6%E1%84%90%E1%85%A9%E1%86%AB%20%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%8E%E1%85%A6%20%E1%84%90%E1%85%A2%E1%86%B8.gif" alt="스켈레톤 전체 탭" style="zoom:33%;" /> | <img src="README.assets/%E1%84%8B%E1%85%A6%E1%84%85%E1%85%A5%E1%84%8E%E1%85%A5%E1%84%85%E1%85%B5%20%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%91%E1%85%B5%E1%86%AF%20%E1%84%89%E1%85%A5%E1%86%AB%E1%84%90%E1%85%A2%E1%86%A8.gif" alt="에러처리 프로필 선택" style="zoom:33%;" /> | <img src="README.assets/%E1%84%8B%E1%85%A1%E1%86%AF%E1%84%85%E1%85%B5%E1%86%B7%20%E1%84%89%E1%85%A5%E1%86%AF%E1%84%8C%E1%85%A5%E1%86%BC%20%E1%84%8F%E1%85%A2%E1%84%89%E1%85%B5%E1%86%BC.gif" alt="알림 설정 캐싱" style="zoom:33%;" /> |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |

<br/>

# 4. 역할 분담

### 신성우

- **회원 관리 및 온보딩 (공통)**
- **홈 탭 (자녀, 부모)**
- **이자 내역 탭 (부모)**
- Boiler-plate 세팅
- Coding Convention 정립
- OAuth 전략, JWT 운용
- Skeleton UI, Caching
- 우선순위에 따른 전역 API 에러처리
- 전역상태로 관리되는 모달
- Google Analytics 연동

### 한규진

- **돈길 계약하기 및 돈길 걷기 탭 (자녀)**
- **마이페이지 탭 및** 가**족 초대 (공통)**
- **알림 내역 (공통)**
- Docker-compose, github Actions 기반 CI/CD 구축
- storybook, Theme-provider 기반 Design System 세팅
- 전역상태로 관리되는 바텀시트
- React-transition-group 기반 Routing Animation
- Routing, Layout, Craco 기반 절대경로 세팅

<br/>

# 5. 개발 후기

- **신성우** | [우당탕 뱅키즈 개발기](https://24siefil.oopy.io/bankidz)
- **한규진** | [Antifreeze!/뱅키즈](https://9yujin.tistory.com/category/🐬 프로젝트/CEOS)

<br/>

# 6. 수상 실적

| 수상 일자 | 대회명                               | 최종실적                                    | 상금 (만원) |
| :-------- | :----------------------------------- | :------------------------------------------ | :---------- |
| 22.07.14  | SC제일은행 ‘Women in Fintech’        | 최종선정, Creator상 수상 (2위)              | 500         |
| 22.08.05  | 신촌 연합 IT 창업 학회 CEOS 데모데이 | 우수상 수상                                 | 10          |
| 22.08.16  | 신한은행 ‘퓨쳐스랩 8기 뱅크플러스’   | 1차 서류 합격, 2차 면접 탈락                | -           |
| 22.08.19  | 오렌지 플래닛 ‘오렌지 가든’ 6기      | 1차 서류 합격, 2차 인터뷰 합격, 3차 PT 탈락 | -           |
| 22.08.28  | 전국 대학생 창업컨퍼런스 ‘시도’      | 결승진출                                    | -           |
| 22.08.31  | 예비창업패키지 프리스쿨              | 최종선정                                    | 460         |

<br/>

*Copyright ⓒ All rights reserved by 신성우, 한규진*
