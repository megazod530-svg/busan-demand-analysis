# 수요 분석 자료 (2026.01 ~ 2026.06)

지방권(부산팩토리 서비스 권역)과 수도권 수요를 비교하는 React + Vite 기반 웹 대시보드입니다.

## 접속 정보

- 접속 비밀번호: busan2026!
- 인터넷만 있으면 접속 가능하게 하려면 GitHub 저장소를 Vercel에 연결해 배포합니다.
- PC가 꺼져 있어도 Vercel 서버에서 계속 접속됩니다.

## 보안 참고

현재 비밀번호는 정적 웹앱 내부에서 SHA-256 해시로 비교합니다. 내부 공유용 화면 가림 목적에는 충분하지만, 강한 보안이 필요한 자료라면 Vercel Password Protection, Vercel Authentication, 사내 SSO 같은 서버/플랫폼 인증을 함께 적용하는 것을 권장합니다.

## 로컬 실행

~~~bash
npm install
npm run dev
~~~

브라우저에서 아래 주소로 접속합니다.

~~~text
http://localhost:3000
~~~

## 검증

~~~bash
npm run lint
npm run build
~~~

npm run build가 성공하면 dist/ 폴더가 생성됩니다. 이 폴더는 GitHub에 올리지 않습니다.

## GitHub 업로드 방법

이 폴더(busan-demand-dashboard)를 GitHub 저장소 루트로 사용합니다.

~~~bash
git init
git add .
git commit -m "Deploy demand analysis dashboard"
git branch -M main
git remote add origin https://github.com/계정명/저장소명.git
git push -u origin main
~~~

## Vercel 배포 방법

1. Vercel에 로그인합니다.
2. Add New Project를 선택합니다.
3. 위 GitHub 저장소를 선택합니다.
4. Framework Preset은 Vite로 둡니다.
5. Build Command: npm run build
6. Output Directory: dist
7. Deploy를 누릅니다.
8. 배포 완료 후 Vercel URL로 접속하고 비밀번호 busan2026!를 입력합니다.

## 주요 파일

- src/App.tsx: 비밀번호 입력 화면과 대시보드 표시 로직
- src/dashboardHtml.ts: 확정된 대시보드 HTML 본문
- src/index.css: 비밀번호 화면과 대시보드 스타일
- vercel.json: Vercel 배포 설정
- .gitignore: GitHub에 올리지 않을 파일 정리
