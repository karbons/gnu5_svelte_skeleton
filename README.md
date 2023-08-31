# Karbon builder(카본 빌더)

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## gnuboard5 api + sveltekit + tailwindcss project

카본빌더는 그누보드5 api를 사용하는 svelte 프론트엔드 빌더 입니다.
기본 css 프레임워크로 tailwindcss를 사용합니다.

## 카본빌더 설치

```bash
# 압축 파일을 다운로드 받으신후 사용 폴더에서 압축을 푸신후
npm install

```
s

## env 파일 생성
.env 파일은 민감정보를 분리하여 깃에 업로드 하지 않고 따로 관리하여 git 공유시
민감정보가 노출되지 않도록하는 관리기능입니다.
api key 값등 외부에 노출되면 안되는 정보를 따로 묶어서 변수로 활용할 수 있게하는 정보관리 기능입니다.

설치폴더에 .env.development을 생성후 아래 내용을 적용한다.
```
VITE_API_ENDPOINT ="{엔드포인트사이트 URL}/api/"
VITE_BASE_ENDPOINT ="http://localhost:3000"
VITE_SERVER_URL ="{엔드포인트사이트 URL}/"
VITE_SITE_NAME ="그누보드5"
VITE_DEBUG_MODE = true 
VITE_GOOGLE_RECAPTCHA_SITE_KEY = 
VITE_GOOGLE_RECAPTCHAA_SEC_KEY = 
```

설치폴더에 .env.production을 생성후 아래 내용을 적용합니다.
```
```
svelte나 js 파일에서 import.meta.env.{env파일에 선언한 키값}
벨류는 "" 쌍따옴표 또는 쌍따옴표 없이 값만 입력가능하다. 만약 홋따옴표 ''로 기록하면 홋따옴표를 포함에서 출력됩니다.
## 개발하기

실시간으로 개발 화면을 보면서 개발할 수 있는 가상서버가 작동됩니다.

```bash
npm run dev

```

## 빌드 및 배포 설정하기
빌드 및 배포는 다양한 방식을 지원하는 adapter 들이 있습니다.  
(https://kit.svelte.dev/docs/adapters) 에서 확인가능합니다.



## 빌드하기

svelte는 빌드과정을 통해 svelte 파일들을 일반 javascritp로 변환하게 됩니다.
그리고 설정된 adapter로 빌드가 이루어지게 됩니다. 
```bash
npm run build
```

빌드이후의 미리보기하려면 `npm run preview`.

## 배포하기
배포의 종류는 다양합니다. 하이브리드앱, node 일반서버 배포, 그외 클아우드 Saas 서비스 배포들을 지원합니다. 

## 하이브리드앱 배포
capacitor 를 이용하면 쉽게 하이브리드앱으로 배포할 수 있습니다.

## 일반 서버 대포(node)
git에 commit & push 를 하고
서버에서 git pull 하여 배포합니다.
그리고 서버에서 
```
npm i
npm run build
```
모듈을 설치하고, 빌드를 다시 진행합니다.
빌드저장 폴더의 실행파일인 index.js 파일을 실행합니다.


## 배포 자동화
