# Developer-Blog

개발 과정에서 배운 내용과 경험을 기록하고, 다른 사용자와 공유할 수 있는 개발 블로그입니다.
글 작성과 카테고리 관리뿐 아니라 친구 공개, 1:1 채팅, 댓글 알림, 캘린더 기반 할 일 관리를 지원합니다.

# 프로젝트 정보
### 1. 제작 기간
> 2026.9.7 ~ 2024.9.13
### 2. 배포 중인 URL
> [이동하기](https://developer-blog.p-e.kr/)

# 사용 기술

- Next.js
- TypeScript
- NextAuth
- PostgreSQL, Prisma ORM
- Redis (Pub/Sub)
- Tiptap (리치 텍스트 에디터)
- Sharp (이미지 크기 조정 및 WebP 변환)
- Cloudflare R2 연동 / 로컬 파일 저장
- Nodemailer (이메일 인증 및 비밀번호 재설정)
- Docker, Oracle Cloud, PM2
- GitHub Actions (빌드 및 배포 자동화)

> PostgreSQL에 게시글과 사용자 데이터를 저장하고, Redis Pub/Sub과 SSE를 이용해 채팅 및 알림 변경 사항을 브라우저에 전달합니다.

# ERD

<details>
  <summary>ERD</summary>
  <img width="1732" height="710" alt="image" src="https://github.com/user-attachments/assets/fc6a515a-9176-4eae-93ca-a7859e73c881" />
</details>

# 기능

### 로그인 & 회원가입
- Google 소셜 로그인 및 이메일·비밀번호 로그인
- 이메일 인증을 통한 회원가입
- 이메일 링크를 통한 비밀번호 재설정
- 닉네임, 태그, 자기소개 등 프로필 관리


### 게시글 작성 & 관리

- Tiptap 기반 리치 텍스트 에디터
- 제목, 본문, 태그, 카테고리 설정
- 이미지 업로드, 크기 조정 및 여러 이미지 나란히 배치
- 서버 임시저장 및 이어서 작성
- 게시글 수정·삭제 및 여러 글 일괄 관리
- 전체 공개, 친구 공개, 나만 보기 설정

> 임시 글의 버전을 확인해 여러 창에서 작성할 때 저장 내용이 덮어써지는 것을 방지합니다. 업로드한 이미지는 크기를 조정하고 WebP로 변환하며, 게시글과 임시 글에서 사용하지 않는 이미지는 유예 기간 이후 정리합니다.

### 블로그 & 게시글 조회

- 사용자별 블로그 및 카테고리별 글 목록
- 카테고리 추가, 순서 변경, 구분선 관리
- 본문 제목을 기반으로 생성되는 목차
- 게시글 조회수 및 최근 7일 조회수 기반 인기 글
- 게시글 좋아요 및 좋아요한 글 모아보기

### 댓글 & 알림

- 회원 댓글 및 비밀번호를 설정한 익명 댓글
- 대댓글 작성
- 게시글 댓글 알림 및 친구 요청 확인
- 알림 확인·삭제 및 실시간 갱신

### 친구 & 1:1 채팅

- 친구 요청, 수락, 거절 및 친구 삭제
- 친구에게만 공개되는 게시글 열람
- 친구 간 1:1 채팅
- 이전 대화 조회, 읽음 상태 및 읽지 않은 메시지 수 표시

> 메시지와 읽음 상태는 PostgreSQL에 저장합니다. Redis Pub/Sub과 SSE로 변경 사항을 전달하고, 재연결과 주기적인 조회를 통해 놓친 변경 사항을 다시 확인합니다.

### 캘린더 & 할 일

- 날짜별 할 일 추가·수정·삭제
- 할 일 완료 상태 관리

### 화면 테마

- 라이트 모드, 다크 모드, 시스템 설정 지원
- 선택한 테마를 브라우저에 저장

# 스크린샷(기능 설명)

<details>
  <summary>로그인 & 회원가입</summary>

  이메일 로그인, Google 로그인
<img width="1222" height="745" alt="image" src="https://github.com/user-attachments/assets/fd69b4d2-d660-4856-9db7-b733c82ea15a" />
</details>

<details>
  <summary>메인 & 개인 블로그</summary>
  
  게시글 목록, 인기 글, 개인 블로그 및 카테고리별 조회 화면
<img width="1289" height="923" alt="image" src="https://github.com/user-attachments/assets/51b89dce-aa22-4fba-90e6-e193252e9740" />


</details>

<details>
  <summary>게시글 작성 & 수정</summary>

  에디터, 이미지 배치, 태그, 공개 범위 설정 및 임시저장 화면
<img width="1586" height="920" alt="image" src="https://github.com/user-attachments/assets/6fd688f0-8f6d-4d13-bca5-498aac5f02ce" />


</details>

<details>
  <summary>게시글 조회 & 댓글</summary>
<img width="1454" height="833" alt="image" src="https://github.com/user-attachments/assets/72bf31ce-4d59-4f77-ac3c-47072122cd31" />
<img width="980" height="730" alt="image" src="https://github.com/user-attachments/assets/6a37761f-33b1-4c33-b1bf-2c6300279cf2" />
</details>

<details>
  <summary>친구 & 채팅 & 알림</summary>

  친구 관리, 1:1 채팅 및 알림 화면
<img width="527" height="469" alt="image" src="https://github.com/user-attachments/assets/f19500e6-f268-4f33-a0af-f3c349880965" />
<img width="1597" height="719" alt="image" src="https://github.com/user-attachments/assets/48ba3b7a-c2ef-4549-ba83-079b0cf273fa" />

</details>

<details>
  <summary>마이페이지 & 캘린더</summary>

  프로필 수정, 카테고리 관리, 게시글 일괄 관리 및 날짜별 할 일 화면
<img width="1262" height="884" alt="image" src="https://github.com/user-attachments/assets/301f570b-9207-4b69-9f2c-8d6ef1bee9e5" />
<img width="1313" height="767" alt="image" src="https://github.com/user-attachments/assets/5e7dce04-5f0c-4c67-8faf-6587497a74fc" />


</details>

# 느낀 점
- 이미지 업로드는 파일을 저장하는 것에서 끝나지 않았다. 게시글과 임시 글에서 이미지가 사용되는 관계를 관리하고, 사용하지 않는 이미지만 유예 기간 이후 정리하도록 구현하면서 파일과 DB 데이터의 생명주기를 함께 설계하는 경험을 했다.
- 채팅과 알림을 구현하면서 데이터 저장과 실시간 전달의 역할을 구분하는 것이 중요했다. PostgreSQL에 실제 상태를 저장하고 Redis와 SSE로 변경 사항을 전달했으며, 연결이 끊겼다가 복구되어도 DB를 다시 조회해 상태를 맞출 수 있도록 구성했다.
- Prisma를 통한 데이터 접근뿐 아니라 트랜잭션, 중복 요청 처리, 데이터 간 관계를 함께 고려했다. 좋아요 중복 방지나 채팅 재전송 처리처럼 사용자의 반복 동작에서도 데이터가 일관되게 유지되도록 설계하는 것이 중요하다는 점을 배웠다.
- GitHub Actions에서 빌드하고 Oracle Cloud 서버에 결과물을 전달하는 배포 구성을 통해, 애플리케이션 구현 외에도 환경변수 관리와 DB 마이그레이션, 프로세스 재시작을 함께 고려해야 한다는 점을 배웠다.
