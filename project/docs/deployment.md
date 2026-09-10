# GitHub Actions 배포

`main` push 시 GitHub 러너(Node.js 22)에서 `npm ci`, Prisma Client 생성,
`npm run build`를 실행한다. 성공한 `.next` 결과물만 압축해 Oracle로 전송한다.
빌드 또는 전송 실패 시 서버의 배포 명령은 실행하지 않는다.

Oracle에서는 빌드와 동일한 커밋으로 소스를 갱신하고 Compose 서비스를 준비한다.
이후 `npm ci`, Prisma Client 생성, DB 마이그레이션을 실행하고 전송된 `.next`를
적용한 뒤 기존 `blog` PM2 프로세스를 재시작한다. 서버에서 Next.js 빌드는 실행하지
않지만 백업 컨테이너 이미지는 기존처럼 Compose로 빌드한다.

## 서버 설정

- 기존 Actions Secrets 4개와 GitHub Deploy key를 계속 사용한다.
- `/home/ubuntu/Developer-Blog/project/.env`가 운영 설정의 원본이다.
  GitHub에는 운영 DB, R2, OAuth 비밀 값을 복사하지 않는다.
- GitHub 빌드의 DB URL과 인증 키는 빌드용 임시 값이다. 현재 앱은 요청 시 운영
  환경변수를 읽는다. `NEXT_PUBLIC_*` 변수나 DB를 읽는 정적 페이지를 추가하면
  빌드 환경 설정도 검토해야 한다.
- 서버에도 프로젝트가 지원하는 Node.js와 npm, PM2, Docker Compose가 필요하다.
  GitHub와 동일한 Node.js 22 사용을 권장한다.
- `node_modules`는 전송하지 않고 서버에서 설치하므로 `sharp` 등의 네이티브
  의존성은 서버 아키텍처에 맞게 설치된다.
- 빌드와 서버 소스의 커밋이 일치하지 않으면 배포를 중단한다. 이미 더 최신 버전이
  배포된 경우 예전 Actions 실행을 재실행해 되돌릴 수 없다.

## 배포 확인

Actions에서 빌드, 전송, SSH 배포 단계를 각각 확인한다. 서버에서 `pm2 logs blog`
및 웹사이트 접속으로 기동을 확인한다. PM2 재시작 성공만으로 앱의 정상 응답까지
보장되지는 않으며, 이 구성은 무중단 배포나 자동 롤백을 제공하지 않는다.

교체된 `.next`는 `/home/ubuntu/developer-blog-deploy/<실행ID>-<시도번호>/previous.next`에
보관된다. 정상 배포 확인 후 필요 없는 이전 빌드는 정리해 디스크 사용량을 관리한다.
