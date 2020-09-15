본 저장소는 TeeSpace Talk App에 대한 코드를 관리합니다.

## 앱 모듈 개발 관련하여 주의 사항

본 저장소는 독립적으로 구동될 수 있으며, TeeSpace 뿐만 아니라 다른 프로젝트에서 구동할 수 있어야 합니다. TeeSpace 와 관련되어 있는 모듈은 `teespace-core` 에서 제공하는 store와 유틸리티를 사용해주시면 됩니다. 별도의 axios나 웹소켓 관련 라이브러리를 사용하지 않고 `teespace-core`에서 제공하는 `API`와 `WebSocket` 모듈을 사용하시면 됩니다.

또한, 본 저장소에서 사용하고 있는 NPM 라이브러리(`dependencies`)는 반드시 packages.json 파일 내 `peerDependencies` 필드에 존재하여야 합니다. 자세한 것은 packages.json 파일을 참고 해주시기 바랍니다.

teespace-core 최신 버전으로 테스트 필요 시 [teespace-core 저장소](http://192.168.158.12:9000/teespace/teespace-core)의 `모듈 연동 방법` 항목을 참고 해주세요.

개발 시 `yarn lib:start` 명령을 통해서 정상적으로 모듈이 컴파일 되는지 주기적으로 확인이 필요합니다.

**중요**

`src/external.js` 파일에서 외부로 노출할 모듈 설정이 가능합니다. UI 컴포넌트와 Store 부분을 노출하여 외부 프로젝트에서 가져다가 사용할 수 있도록 해주세요.

## 초기 설정 (Visual Studio Code)

[Visual Studio Code](https://code.visualstudio.com)를 설치합니다.

VSCode 설치가 완료되었다면, 다음과 같은 Extension 을 설치 합니다.

- prettier - Code formatter
- ESLint
- auto import

[NodeJS](https://nodejs.org) LTS 버전과 [yarn](https://nodejs.org/en/) 패키지를 설치합니다.

설치가 완료되면, 다음과 같이 의존 라이브러리를 설치합니다.

```
$ yarn install
```

## 사용 가능한 명령어

### `yarn start`

리액트 앱을 개발모드로 실행합니다. <br />
화면을 보기 위해서는 [http://localhost:3000](http://localhost:3000) 주소를 브라우저에서 접속하시면 됩니다. (포트 번호는 기본적으로 3000이며, 여러개의 어플리케이션을 실행하는 경우 포트는 변동될 수 있습니다)

코드를 수정하면 자동으로 화면을 다시 그립니다. 또한, 콘솔에서 코드 컨벤션 오류를 확인할 수 있습니다.

### `yarn lib:start`

본 프로젝트에 대한 모듈을 빌드합니다. 수정되는 소스코드를 계속 확인하며 새롭게 빌드를 합니다.

### `yarn lib:build`

본 프로젝트에 대한 모듈을 빌드합니다. 정식 버전으로 빌드를 한번만 수행합니다.

### `yarn test`

테스트 러너를 실행합니다.<br />
테스트 하는 방법은 [running tests](https://facebook.github.io/create-react-app/docs/running-tests) 을 참고하세요.

### `yarn build`

리액트 프로젝트를 운영환경으로 빌드 합니다. 최고의 성능을 낼 수 있도록 코드를 최적화 합니다.

배포에 대한 자세한 내용은 [deployment](https://facebook.github.io/create-react-app/docs/deployment) 을 참고하세요.

## 기여 방법

### git commit 메세지 컨벤션

git commit 메세지 컨벤션은 [본 문서](https://www.conventionalcommits.org/ko/v1.0.0/)를 기반으로 작성되었습니다.

커밋 메세지는 `타입(모듈): 설명` 형태로 작성이 됩니다. 커밋할 때 자동으로 형식을 검사합니다. 유효하지 않은 형태로 커밋 메세지 작성 시 정상적으로 커밋이 되지 않습니다. 각 타입에 대한 설명은 다음과 같습니다.

| 타입     | 설명                                               |
| -------- | -------------------------------------------------- |
| feat     | 기능 추가, 라이브러리 추가, API 변경 시 사용       |
| refactor | 코드 구조 변경 시 사용                             |
| fix      | 버그 수정 시 사용                                  |
| docs     | 문서 수정 시 사용                                  |
| test     | 테스트 코드 작성 시 사용                           |
| chore    | 자잘한 수정이 있을 시 사용 (예. 설정 파일 변경 등) |

코드 수정하여 다른 코드에 영향을 줄 수 있는 것은 `BREAKING CHANGE` 를 사용하여 작성합니다. 이에 대한 설명은 다음과 같습니다.

```
feat(common): TeeSpace를 위한 API 클래스 구현

BREAKING CHANGE: axios를 직접 사용하지 않고, API 클래스를 사용하여 구현 필요
```

### Merge Request

작성 예정

### Code Review

작성 예정

## 주의

- 깨진 코드 (빌드 되지 않거나 동작하지 않는 코드)를 develop 브랜치에 머지 되면 안됩니다.
- pull 받으실 때는 꼭 rebase pull 을 사용하세요. (git pull --rebase origin)
- `develop` 브랜치에서 기능 브랜치를 생성하는 경우, 주기적으로 `develop` 브랜치를 rebase 하여 충돌을 최소화 해주세요. (git rebase develop)
- 가급적 merge commit은 자제하여 깨끗한 커밋 로그를 남길 수 있도록 합니다.
