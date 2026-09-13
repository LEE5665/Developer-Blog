# 전체 함수·콜백 위치 색인

2026-09-12 현재 Git 추적 TypeScript/TSX/MJS 소스를 TypeScript 구문 트리로 대조했습니다. 기능을 이해하려면 먼저 [CODE_GUIDE.md](CODE_GUIDE.md)를 읽으세요. 이 문서는 이름 없는 콜백까지 원문을 찾기 위한 보조 색인입니다.

직접 작성한 실행 함수·콜백 **736개**, 자동 생성 실행 함수·콜백 **4개**, 함수형 타입의 메서드/호출/생성 시그니처 **422개**를 기록했습니다. 중첩 함수도 각각 한 번씩 셉니다. 아래의 함수 개수는 기능 개수와 다릅니다.

구조 분류는 문법상 역할이며 구체적인 업무 기능은 안내 문서에 설명했습니다. 본문 발췌는 위치 확인용으로 길이를 제한했습니다. `행:열`은 같은 한 줄에 여러 콜백이 있는 경우를 구별합니다. 줄 링크는 GitHub 형식이며 로컬 Markdown 뷰어에서 줄 이동을 지원하지 않으면 파일을 열고 해당 행을 찾으세요. 프레임워크가 반환한 auth/signIn/GET 등과 문자열 안의 초기 테마 IIFE는 안내 문서에서 별도로 설명합니다.

## 파일별 바로가기

- [project/app/PopularPosts.tsx](#file-1) — 본문 5개, 시그니처 0개
- [project/app/PostCard.tsx](#file-2) — 본문 2개, 시그니처 0개
- [project/app/actions/auth.ts](#file-3) — 본문 5개, 시그니처 0개
- [project/app/api/auth/[...nextauth]/route.ts](#file-4) — 본문 0개, 시그니처 0개
- [project/app/api/categories/reorder/route.ts](#file-5) — 본문 2개, 시그니처 0개
- [project/app/api/categories/route.ts](#file-6) — 본문 4개, 시그니처 0개
- [project/app/api/chat/[id]/route.ts](#file-7) — 본문 5개, 시그니처 0개
- [project/app/api/chat/route.ts](#file-8) — 본문 4개, 시그니처 0개
- [project/app/api/drafts/route.ts](#file-9) — 본문 5개, 시그니처 0개
- [project/app/api/events/route.ts](#file-10) — 본문 9개, 시그니처 0개
- [project/app/api/friend-requests/[id]/route.ts](#file-11) — 본문 1개, 시그니처 0개
- [project/app/api/friends/[userId]/route.ts](#file-12) — 본문 3개, 시그니처 0개
- [project/app/api/friends/route.ts](#file-13) — 본문 2개, 시그니처 0개
- [project/app/api/images/[name]/route.ts](#file-14) — 본문 4개, 시그니처 0개
- [project/app/api/images/route.ts](#file-15) — 본문 2개, 시그니처 0개
- [project/app/api/maintenance/images/route.ts](#file-16) — 본문 1개, 시그니처 0개
- [project/app/api/notifications/route.ts](#file-17) — 본문 3개, 시그니처 0개
- [project/app/api/posts/[id]/comments/[commentId]/route.ts](#file-18) — 본문 3개, 시그니처 0개
- [project/app/api/posts/[id]/comments/route.ts](#file-19) — 본문 3개, 시그니처 0개
- [project/app/api/posts/[id]/engagement/route.ts](#file-20) — 본문 2개, 시그니처 0개
- [project/app/api/posts/[id]/likes/route.ts](#file-21) — 본문 3개, 시그니처 0개
- [project/app/api/posts/[id]/route.ts](#file-22) — 본문 4개, 시그니처 0개
- [project/app/api/posts/[id]/views/route.ts](#file-23) — 본문 1개, 시그니처 0개
- [project/app/api/posts/bulk/route.ts](#file-24) — 본문 6개, 시그니처 0개
- [project/app/api/posts/route.ts](#file-25) — 본문 3개, 시그니처 0개
- [project/app/api/todos/route.ts](#file-26) — 본문 4개, 시그니처 0개
- [project/app/api/user/password/route.ts](#file-27) — 본문 1개, 시그니처 0개
- [project/app/api/user/profile/route.ts](#file-28) — 본문 1개, 시그니처 0개
- [project/app/blog/[authorId]/page.tsx](#file-29) — 본문 2개, 시그니처 0개
- [project/app/components/ArticleToc.tsx](#file-30) — 본문 8개, 시그니처 0개
- [project/app/components/AuthIntro.tsx](#file-31) — 본문 1개, 시그니처 0개
- [project/app/components/Avatar.tsx](#file-32) — 본문 2개, 시그니처 0개
- [project/app/components/BlogExplorer.tsx](#file-33) — 본문 16개, 시그니처 0개
- [project/app/components/Chat.tsx](#file-34) — 본문 47개, 시그니처 0개
- [project/app/components/FriendButton.tsx](#file-35) — 본문 4개, 시그니처 0개
- [project/app/components/Icon.tsx](#file-36) — 본문 1개, 시그니처 0개
- [project/app/components/Modal.tsx](#file-37) — 본문 3개, 시그니처 0개
- [project/app/components/Notifications.tsx](#file-38) — 본문 23개, 시그니처 0개
- [project/app/components/PostContent.tsx](#file-39) — 본문 6개, 시그니처 0개
- [project/app/components/PostEngagement.tsx](#file-40) — 본문 38개, 시그니처 0개
- [project/app/components/PostImage.tsx](#file-41) — 본문 4개, 시그니처 0개
- [project/app/components/RealtimeEvents.tsx](#file-42) — 본문 6개, 시그니처 0개
- [project/app/components/SiteHeader.tsx](#file-43) — 본문 1개, 시그니처 0개
- [project/app/components/ThemeToggle.tsx](#file-44) — 본문 11개, 시그니처 0개
- [project/app/components/UserName.tsx](#file-45) — 본문 1개, 시그니처 0개
- [project/app/layout.tsx](#file-46) — 본문 1개, 시그니처 0개
- [project/app/login/page.tsx](#file-47) — 본문 1개, 시그니처 0개
- [project/app/mypage/BulkPostManager.tsx](#file-48) — 본문 17개, 시그니처 0개
- [project/app/mypage/CategoryManager.tsx](#file-49) — 본문 24개, 시그니처 0개
- [project/app/mypage/FriendManager.tsx](#file-50) — 본문 14개, 시그니처 0개
- [project/app/mypage/LikedPosts.tsx](#file-51) — 본문 2개, 시그니처 0개
- [project/app/mypage/MyPageTabs.tsx](#file-52) — 본문 4개, 시그니처 0개
- [project/app/mypage/ProfileEditor.tsx](#file-53) — 본문 9개, 시그니처 0개
- [project/app/mypage/TodoCalendar.tsx](#file-54) — 본문 37개, 시그니처 0개
- [project/app/mypage/page.tsx](#file-55) — 본문 3개, 시그니처 0개
- [project/app/page.tsx](#file-56) — 본문 3개, 시그니처 0개
- [project/app/posts/[id]/edit/page.tsx](#file-57) — 본문 1개, 시그니처 0개
- [project/app/posts/[id]/page.tsx](#file-58) — 본문 2개, 시그니처 0개
- [project/app/signup/page.tsx](#file-59) — 본문 2개, 시그니처 0개
- [project/app/verify-email/page.tsx](#file-60) — 본문 1개, 시그니처 0개
- [project/app/write/EditorToolbar.tsx](#file-61) — 본문 22개, 시그니처 0개
- [project/app/write/ImageGroup.tsx](#file-62) — 본문 46개, 시그니처 0개
- [project/app/write/ImageUpload.ts](#file-63) — 본문 6개, 시그니처 0개
- [project/app/write/ResizableImage.tsx](#file-64) — 본문 25개, 시그니처 0개
- [project/app/write/TagInput.tsx](#file-65) — 본문 7개, 시그니처 0개
- [project/app/write/WriteForm.tsx](#file-66) — 본문 70개, 시그니처 0개
- [project/app/write/page.tsx](#file-67) — 본문 1개, 시그니처 0개
- [project/eslint.config.mjs](#file-68) — 본문 0개, 시그니처 0개
- [project/generated/prisma/browser.ts](#file-69) — 본문 0개, 시그니처 0개
- [project/generated/prisma/client.ts](#file-70) — 본문 0개, 시그니처 0개
- [project/generated/prisma/commonInputTypes.ts](#file-71) — 본문 0개, 시그니처 0개
- [project/generated/prisma/enums.ts](#file-72) — 본문 0개, 시그니처 0개
- [project/generated/prisma/internal/class.ts](#file-73) — 본문 4개, 시그니처 10개
- [project/generated/prisma/internal/prismaNamespace.ts](#file-74) — 본문 0개, 시그니처 0개
- [project/generated/prisma/internal/prismaNamespaceBrowser.ts](#file-75) — 본문 0개, 시그니처 0개
- [project/generated/prisma/models.ts](#file-76) — 본문 0개, 시그니처 0개
- [project/generated/prisma/models/Account.ts](#file-77) — 본문 0개, 시그니처 21개
- [project/generated/prisma/models/ActionLimit.ts](#file-78) — 본문 0개, 시그니처 20개
- [project/generated/prisma/models/Category.ts](#file-79) — 본문 0개, 시그니처 22개
- [project/generated/prisma/models/Comment.ts](#file-80) — 본문 0개, 시그니처 25개
- [project/generated/prisma/models/Conversation.ts](#file-81) — 본문 0개, 시그니처 23개
- [project/generated/prisma/models/DraftImage.ts](#file-82) — 본문 0개, 시그니처 22개
- [project/generated/prisma/models/Friendship.ts](#file-83) — 본문 0개, 시그니처 22개
- [project/generated/prisma/models/ImageAsset.ts](#file-84) — 본문 0개, 시그니처 23개
- [project/generated/prisma/models/Message.ts](#file-85) — 본문 0개, 시그니처 22개
- [project/generated/prisma/models/Notification.ts](#file-86) — 본문 0개, 시그니처 22개
- [project/generated/prisma/models/Post.ts](#file-87) — 본문 0개, 시그니처 27개
- [project/generated/prisma/models/PostDraft.ts](#file-88) — 본문 0개, 시그니처 23개
- [project/generated/prisma/models/PostImage.ts](#file-89) — 본문 0개, 시그니처 22개
- [project/generated/prisma/models/PostLike.ts](#file-90) — 본문 0개, 시그니처 22개
- [project/generated/prisma/models/PostView.ts](#file-91) — 본문 0개, 시그니처 21개
- [project/generated/prisma/models/Todo.ts](#file-92) — 본문 0개, 시그니처 21개
- [project/generated/prisma/models/User.ts](#file-93) — 본문 0개, 시그니처 34개
- [project/generated/prisma/models/VerificationToken.ts](#file-94) — 본문 0개, 시그니처 20개
- [project/instrumentation.ts](#file-95) — 본문 1개, 시그니처 0개
- [project/lib/auth.ts](#file-96) — 본문 3개, 시그니처 0개
- [project/lib/blog-data.ts](#file-97) — 본문 4개, 시그니처 0개
- [project/lib/chat.ts](#file-98) — 본문 4개, 시그니처 0개
- [project/lib/display-name.ts](#file-99) — 본문 1개, 시그니처 0개
- [project/lib/engagement.ts](#file-100) — 본문 6개, 시그니처 0개
- [project/lib/friend-handle.ts](#file-101) — 본문 1개, 시그니처 0개
- [project/lib/friend-request.ts](#file-102) — 본문 2개, 시그니처 0개
- [project/lib/image-cleanup.ts](#file-103) — 본문 11개, 시그니처 0개
- [project/lib/image-storage.ts](#file-104) — 본문 14개, 시그니처 0개
- [project/lib/mail.ts](#file-105) — 본문 1개, 시그니처 0개
- [project/lib/post-access.ts](#file-106) — 본문 3개, 시그니처 0개
- [project/lib/post-content.ts](#file-107) — 본문 19개, 시그니처 0개
- [project/lib/post-service.ts](#file-108) — 본문 16개, 시그니처 0개
- [project/lib/post-stats.ts](#file-109) — 본문 5개, 시그니처 0개
- [project/lib/prisma.ts](#file-110) — 본문 0개, 시그니처 0개
- [project/lib/realtime.ts](#file-111) — 본문 6개, 시그니처 0개
- [project/lib/tag.ts](#file-112) — 본문 2개, 시그니처 0개
- [project/lib/tokens.ts](#file-113) — 본문 2개, 시그니처 0개
- [project/next.config.ts](#file-114) — 본문 0개, 시그니처 0개
- [project/postcss.config.mjs](#file-115) — 본문 0개, 시그니처 0개
- [project/prisma7.config.ts](#file-116) — 본문 0개, 시그니처 0개
- [project/scripts/seed-test-posts.mjs](#file-117) — 본문 1개, 시그니처 0개
- [project/tests/chat-realtime.test.mjs](#file-118) — 본문 22개, 시그니처 0개
- [project/tests/friend-handle.test.mjs](#file-119) — 본문 2개, 시그니처 0개
- [project/tests/image-group.test.mjs](#file-120) — 본문 6개, 시그니처 0개
- [project/tests/image-storage.test.mjs](#file-121) — 본문 3개, 시그니처 0개
- [project/tests/image-upload.test.mjs](#file-122) — 본문 1개, 시그니처 0개
- [project/tests/post-bulk.test.mjs](#file-123) — 본문 16개, 시그니처 0개
- [project/tests/post-formatting.test.mjs](#file-124) — 본문 3개, 시그니처 0개
- [project/tests/post-lifecycle.test.mjs](#file-125) — 본문 17개, 시그니처 0개
- [project/tests/post-outline.test.mjs](#file-126) — 본문 4개, 시그니처 0개

<a id="file-1"></a>

## project/app/PopularPosts.tsx

[원본 파일](project/app/PopularPosts.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [14:1](project/app/PopularPosts.tsx#L14) | PopularPosts | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const [period, setPeriod] = useState&lt;Period&gt;("week"); const selected = periods.find((item) =&gt; item.key === period)!; const posts = rankings[peri …</code> |
| [16:33](project/app/PopularPosts.tsx#L16) | periods.find 콜백 #1 | PopularPosts | 원소의 선택·검색·검사 조건 반환<br><code>item.key === period</code> |
| [24:24](project/app/PopularPosts.tsx#L24) | periods.map 콜백 #1 | PopularPosts | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>&lt;button key={item.key} type="button" aria-pressed={period === item.key} onClick={() =&gt; setPeriod(item.key)}&gt;{item.label}&lt;/button&gt;</code> |
| [24:115](project/app/PopularPosts.tsx#L24) | onClick | periods.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>setPeriod(item.key)</code> |
| [29:51](project/app/PopularPosts.tsx#L29) | posts.map 콜백 #1 | PopularPosts | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>&lt;li key={post.id}&gt;&lt;PostCard post={post} rank={index + 1} views={post.views} currentUserId={currentUserId} /&gt;&lt;/li&gt;</code> |

<a id="file-2"></a>

## project/app/PostCard.tsx

[원본 파일](project/app/PostCard.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [13:1](project/app/PostCard.tsx#L13) | PostCard | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ return &lt;article className="feed-post"&gt; &lt;Link href={href &#124;&#124; &#96;/posts/${post.id}#post-start&#96;} className="feed-post-link"&gt; {pos …</code> |
| [28:63](project/app/PostCard.tsx#L28) | post.tags.slice(0, 2).map 콜백 #1 | PostCard | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>&lt;span key={tag}&gt;#{tag}&lt;/span&gt;</code> |

<a id="file-3"></a>

## project/app/actions/auth.ts

[원본 파일](project/app/actions/auth.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [18:1](project/app/actions/auth.ts#L18) | signUpAction | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const name = formData.get("name")?.toString().trim(); const nickname = formData.get("nickname")?.toString().trim(); const email = formData.get("email")?. …</code> |
| [84:1](project/app/actions/auth.ts#L84) | loginAction | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const email = formData.get("email")?.toString().trim().toLowerCase(); const password = formData.get("password")?.toString(); if (!email &#124;&#124; !pas …</code> |
| [124:1](project/app/actions/auth.ts#L124) | googleLoginAction | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ await signIn("google", { redirectTo: "/" }); }</code> |
| [129:1](project/app/actions/auth.ts#L129) | logoutAction | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ await signOut({ redirectTo: "/" }); }</code> |
| [134:1](project/app/actions/auth.ts#L134) | resendVerificationEmailAction | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (!email) { return { error: "이메일 주소가 올바르지 않습니다." }; } const existingUser = await prisma.user.findUnique({ where: { email }, }); if (existingUser) { ret …</code> |

<a id="file-4"></a>

## project/app/api/auth/[...nextauth]/route.ts

[원본 파일](project/app/api/auth/%5B...nextauth%5D/route.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<a id="file-5"></a>

## project/app/api/categories/reorder/route.ts

[원본 파일](project/app/api/categories/reorder/route.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [6:1](project/app/api/categories/reorder/route.ts#L6) | PUT | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { const session = await auth(); if (!session?.user?.id) { return NextResponse.json( { error: "로그인이 필요합니다." }, { status: 401 } ); } const body = await …</code> |
| [30:23](project/app/api/categories/reorder/route.ts#L30) | categoryIds.map 콜백 #1 | PUT | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>prisma.category.updateMany({ where: { id, userId }, data: { order: index }, })</code> |

<a id="file-6"></a>

## project/app/api/categories/route.ts

[원본 파일](project/app/api/categories/route.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [7:1](project/app/api/categories/route.ts#L7) | POST | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { const session = await auth(); if (!session?.user?.id) { return NextResponse.json( { error: "로그인이 필요합니다." }, { status: 401 } ); } const body = await …</code> |
| [58:1](project/app/api/categories/route.ts#L58) | DELETE | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { const session = await auth(); if (!session?.user?.id) { return NextResponse.json( { error: "로그인이 필요합니다." }, { status: 401 } ); } const { searchPara …</code> |
| [89:28](project/app/api/categories/route.ts#L89) | mediaTransaction 콜백 #1 | DELETE | 트랜잭션 범위의 DB 작업<br><code>{ await tx.post.deleteMany({ where: { categoryId } }); await tx.postDraft.updateMany({ where: { userId: session.user!.id, categoryId }, data: { categoryId: …</code> |
| [110:1](project/app/api/categories/route.ts#L110) | PATCH | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { const session = await auth(); if (!session?.user?.id) { return NextResponse.json( { error: "로그인이 필요합니다." }, { status: 401 } ); } const body = await …</code> |

<a id="file-7"></a>

## project/app/api/chat/[id]/route.ts

[원본 파일](project/app/api/chat/%5Bid%5D/route.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [9:1](project/app/api/chat/%5Bid%5D/route.ts#L9) | GET | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { const userId = (await auth())?.user?.id; if (!userId) throw new PostError("로그인이 필요합니다.", 401); const { id } = await params; const room = await conv …</code> |
| [17:51](project/app/api/chat/%5Bid%5D/route.ts#L17) | [before, after].some 콜백 #1 | GET | 원소의 선택·검색·검사 조건 반환<br><code>value !== null && (!/^\d+$/.test(value) &#124;&#124; !Number.isSafeInteger(Number(value)) &#124;&#124; Number(value) &lt; 1)</code> |
| [26:1](project/app/api/chat/%5Bid%5D/route.ts#L26) | POST | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { checkMutation(request); const userId = (await auth())?.user?.id; if (!userId) throw new PostError("로그인이 필요합니다.", 401); const { id } = await params; …</code> |
| [37:47](project/app/api/chat/%5Bid%5D/route.ts#L37) | prisma.$transaction 콜백 #1 | POST | 트랜잭션 범위의 DB 작업<br><code>{ await lockPair(tx, room.userAId, room.userBId); await requireFriends(room.userAId, room.userBId, tx); const existing = await tx.message.findUnique({ wher …</code> |
| [54:1](project/app/api/chat/%5Bid%5D/route.ts#L54) | PATCH | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { checkMutation(request); const userId = (await auth())?.user?.id; if (!userId) throw new PostError("로그인이 필요합니다.", 401); const { id } = await params; …</code> |

<a id="file-8"></a>

## project/app/api/chat/route.ts

[원본 파일](project/app/api/chat/route.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [7:1](project/app/api/chat/route.ts#L7) | GET | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { const userId = (await auth())?.user?.id; if (!userId) throw new PostError("로그인이 필요합니다.", 401); const rows = await prisma.conversation.findMany({ wh …</code> |
| [12:54](project/app/api/chat/route.ts#L12) | rows.map 콜백 #1 | GET | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>({ id: row.id, peer: row.userAId === userId ? row.userB : row.userA, lastMessage: row.messages[0] &#124;&#124; null, unread: await prisma.message.count({ w …</code> |
| [19:1](project/app/api/chat/route.ts#L19) | POST | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { checkMutation(request); const userId = (await auth())?.user?.id; if (!userId) throw new PostError("로그인이 필요합니다.", 401); const body = await request.j …</code> |
| [27:52](project/app/api/chat/route.ts#L27) | prisma.$transaction 콜백 #1 | POST | 트랜잭션 범위의 DB 작업<br><code>{ await lockPair(tx, userAId, userBId); await requireFriends(userAId, userBId, tx); return tx.conversation.upsert({ where: { userAId_userBId: { userAId, us …</code> |

<a id="file-9"></a>

## project/app/api/drafts/route.ts

[원본 파일](project/app/api/drafts/route.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [5:1](project/app/api/drafts/route.ts#L5) | GET | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const session = await auth(); if (!session?.user?.id) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 }); const key = new URL(request.url).s …</code> |
| [12:1](project/app/api/drafts/route.ts#L12) | PUT | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const session = await auth(); if (!session?.user?.id) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 }); const userId = session.user.id; tr …</code> |
| [19:42](project/app/api/drafts/route.ts#L19) | mediaTransaction 콜백 #1 | PUT | 트랜잭션 범위의 DB 작업<br><code>{ if (key !== "new" && !await tx.post.findFirst({ where: { id: key, authorId: userId } })) throw new PostError("수정할 글을 찾을 수 없습니다.", 404); const existing =  …</code> |
| [32:1](project/app/api/drafts/route.ts#L32) | DELETE | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const session = await auth(); if (!session?.user?.id) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 }); const userId = session.user.id; tr …</code> |
| [38:28](project/app/api/drafts/route.ts#L38) | mediaTransaction 콜백 #1 | DELETE | 트랜잭션 범위의 DB 작업<br><code>{ const draft = await tx.postDraft.findUnique({ where: { userId_key: { userId, key: body.key &#124;&#124; "new" } } }); if (draft && body.version !== draft …</code> |

<a id="file-10"></a>

## project/app/api/events/route.ts

[원본 파일](project/app/api/events/route.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [7:1](project/app/api/events/route.ts#L7) | GET | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const userId = (await auth())?.user?.id; if (!userId) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 }); const subscriber = redisClient();  …</code> |
| [14:17](project/app/api/events/route.ts#L14) | cleanup | GET | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{}</code> |
| [16:5](project/app/api/events/route.ts#L16) | start | GET | 객체·클래스 메서드: 해당 API/확장 동작 구현<br><code>{ let closed = false; let heartbeat: ReturnType&lt;typeof setInterval&gt; &#124; undefined; let lifetime: ReturnType&lt;typeof setTimeout&gt; &#124; undefi …</code> |
| [20:20](project/app/api/events/route.ts#L20) | send | start | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ if (!closed) controller.enqueue(encoder.encode(text)); }</code> |
| [21:17](project/app/api/events/route.ts#L21) | cleanup 대입 | start | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ if (closed) return; closed = true; clearInterval(heartbeat); clearTimeout(lifetime); request.signal.removeEventListener("abort", cleanup); if (subscriber …</code> |
| [32:54](project/app/api/events/route.ts#L32) | subscriber.subscribe 콜백 #2 | start | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>send(&#96;event: update\ndata: ${message}\n\n&#96;)</code> |
| [32:117](project/app/api/events/route.ts#L32) | subscriber.subscribe(userChannel(userId), (message) =&gt; send(&#96;event: update\ndata: ${message}\n\n&#96;)).then 콜백 #1 | start | 앞 비동기 작업의 결과를 이어서 처리<br><code>{ if (closed) return; send("retry: 3000\nevent: ready\ndata: {}\n\n"); heartbeat = setInterval(() =&gt; send(": heartbeat\n\n"), 15000); // Reconnect perio …</code> |
| [35:33](project/app/api/events/route.ts#L35) | setInterval 콜백 #1 | subscriber.subscribe(userChannel(userId), (message) =&gt; send(&#96;event: update\ndata: $ … | 이전 React 상태를 받아 다음 상태 계산<br><code>send(": heartbeat\n\n")</code> |
| [40:5](project/app/api/events/route.ts#L40) | cancel | GET | 객체·클래스 메서드: 해당 API/확장 동작 구현<br><code>{ cleanup(); }</code> |

<a id="file-11"></a>

## project/app/api/friend-requests/[id]/route.ts

[원본 파일](project/app/api/friend-requests/%5Bid%5D/route.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [7:1](project/app/api/friend-requests/%5Bid%5D/route.ts#L7) | PATCH | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { checkMutation(request); const userId = (await auth())?.user?.id; if (!userId) throw new PostError("로그인이 필요합니다.", 401); const { id } = await params; …</code> |

<a id="file-12"></a>

## project/app/api/friends/[userId]/route.ts

[원본 파일](project/app/api/friends/%5BuserId%5D/route.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [9:1](project/app/api/friends/%5BuserId%5D/route.ts#L9) | DELETE | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { checkMutation(request); const userId = (await auth())?.user?.id; if (!userId) throw new PostError("로그인이 필요합니다.", 401); const { userId: friendId } = …</code> |
| [15:31](project/app/api/friends/%5BuserId%5D/route.ts#L15) | prisma.$transaction 콜백 #1 | DELETE | 트랜잭션 범위의 DB 작업<br><code>{ await lockPair(tx, userId, friendId); await tx.friendship.deleteMany({ where: { status: "ACCEPTED", OR: [{ userId, friendId }, { userId: friendId, friend …</code> |
| [24:1](project/app/api/friends/%5BuserId%5D/route.ts#L24) | POST | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { checkMutation(request); const senderId = (await auth())?.user?.id; if (!senderId) throw new PostError("로그인이 필요합니다.", 401); const { userId: recipien …</code> |

<a id="file-13"></a>

## project/app/api/friends/route.ts

[원본 파일](project/app/api/friends/route.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [8:1](project/app/api/friends/route.ts#L8) | POST | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { checkMutation(request); const senderId = (await auth())?.user?.id; if (!senderId) throw new PostError("로그인이 필요합니다.", 401); await limitAction(reques …</code> |
| [14:45](project/app/api/friends/route.ts#L14) | request.json().catch 콜백 #1 | POST | 비동기 실패 처리<br><code>null</code> |

<a id="file-14"></a>

## project/app/api/images/[name]/route.ts

[원본 파일](project/app/api/images/%5Bname%5D/route.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [10:1](project/app/api/images/%5Bname%5D/route.ts#L10) | GET | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const { name } = await params; try { const ownerId = await imageOwner(name); if (!ownerId) return new Response(null, { status: 404, headers }); const ses …</code> |
| [21:37](project/app/api/images/%5Bname%5D/route.ts#L21) | posts.filter 콜백 #1 | GET | 원소의 선택·검색·검사 조건 반환<br><code>{ const doc = readDocument(post.content); return doc && imageSources(doc).includes(url); }</code> |
| [25:31](project/app/api/images/%5Bname%5D/route.ts#L25) | matching.some 콜백 #1 | GET | 원소의 선택·검색·검사 조건 반환<br><code>post.visibility === "PUBLIC"</code> |
| [26:49](project/app/api/images/%5Bname%5D/route.ts#L26) | matching.some 콜백 #1 | GET | 원소의 선택·검색·검사 조건 반환<br><code>post.visibility === "FRIENDS"</code> |

<a id="file-15"></a>

## project/app/api/images/route.ts

[원본 파일](project/app/api/images/route.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [7:1](project/app/api/images/route.ts#L7) | POST | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const session = await auth(); if (!session?.user?.id) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 }); if (request.headers.get("sec-fetch …</code> |
| [34:43](project/app/api/images/route.ts#L34) | mediaTransaction 콜백 #1 | POST | 트랜잭션 범위의 DB 작업<br><code>{ const result = await saveImage(bytes, session.user!.id!); try { await tx.imageAsset.create({ data: { name: result.url.slice(12), ownerId: session.user!.i …</code> |

<a id="file-16"></a>

## project/app/api/maintenance/images/route.ts

[원본 파일](project/app/api/maintenance/images/route.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [5:1](project/app/api/maintenance/images/route.ts#L5) | POST | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const secret = process.env.CRON_SECRET; const provided = request.headers.get("authorization") &#124;&#124; ""; const expected = &#96;Bearer ${secret}&#96 …</code> |

<a id="file-17"></a>

## project/app/api/notifications/route.ts

[원본 파일](project/app/api/notifications/route.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [7:1](project/app/api/notifications/route.ts#L7) | GET | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { const userId = (await auth())?.user?.id; if (!userId) throw new PostError("로그인이 필요합니다.", 401); const [requests, comments] = await Promise.all([ pri …</code> |
| [15:61](project/app/api/notifications/route.ts#L15) | comments.map 콜백 #1 | GET | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>({ ...item, comment: { ...item.comment, nickname: item.comment.anonymous ? item.comment.nickname : item.comment.author?.nickname &#124;&#124; "개발자", tag: i …</code> |
| [19:1](project/app/api/notifications/route.ts#L19) | DELETE | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { checkMutation(request); const userId = (await auth())?.user?.id; if (!userId) throw new PostError("로그인이 필요합니다.", 401); const body = await request.j …</code> |

<a id="file-18"></a>

## project/app/api/posts/[id]/comments/[commentId]/route.ts

[원본 파일](project/app/api/posts/%5Bid%5D/comments/%5BcommentId%5D/route.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [7:1](project/app/api/posts/%5Bid%5D/comments/%5BcommentId%5D/route.ts#L7) | change | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { checkMutation(request); const { id, commentId } = await params; const userId = (await auth())?.user?.id; const post = await readablePost(id, userId …</code> |
| [29:1](project/app/api/posts/%5Bid%5D/comments/%5BcommentId%5D/route.ts#L29) | PATCH | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ return change(request, params, false); }</code> |
| [30:1](project/app/api/posts/%5Bid%5D/comments/%5BcommentId%5D/route.ts#L30) | DELETE | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ return change(request, params, true); }</code> |

<a id="file-19"></a>

## project/app/api/posts/[id]/comments/route.ts

[원본 파일](project/app/api/posts/%5Bid%5D/comments/route.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [7:1](project/app/api/posts/%5Bid%5D/comments/route.ts#L7) | POST | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { checkMutation(request); const { id } = await params; const userId = (await auth())?.user?.id; const post = await readablePost(id, userId); const bo …</code> |
| [31:77](project/app/api/posts/%5Bid%5D/comments/route.ts#L31) | [post.authorId, parent?.authorId].filter 콜백 #1 | POST | 원소의 선택·검색·검사 조건 반환<br><code>!!recipient && recipient !== userId</code> |
| [33:73](project/app/api/posts/%5Bid%5D/comments/route.ts#L33) | recipients.map 콜백 #1 | POST | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>({ recipientId })</code> |

<a id="file-20"></a>

## project/app/api/posts/[id]/engagement/route.ts

[원본 파일](project/app/api/posts/%5Bid%5D/engagement/route.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [5:1](project/app/api/posts/%5Bid%5D/engagement/route.ts#L5) | GET | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { const { id } = await params; let userId: string &#124; undefined; try { userId = (await auth())?.user?.id; } catch { userId = undefined; } const po …</code> |
| [26:44](project/app/api/posts/%5Bid%5D/engagement/route.ts#L26) | rows.slice(0, 30).map 콜백 #1 | GET | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>({ id: comment.id, parentId: comment.parentId, content: comment.content, nickname: comment.anonymous ? comment.nickname : comment.author?.nickname &#124;&# …</code> |

<a id="file-21"></a>

## project/app/api/posts/[id]/likes/route.ts

[원본 파일](project/app/api/posts/%5Bid%5D/likes/route.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [5:1](project/app/api/posts/%5Bid%5D/likes/route.ts#L5) | change | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { checkMutation(request); const userId = (await auth())?.user?.id; if (!userId) throw new PostError("좋아요는 로그인 후 이용할 수 있습니다.", 401); const { id } = aw …</code> |
| [17:1](project/app/api/posts/%5Bid%5D/likes/route.ts#L17) | PUT | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ return change(request, params, true); }</code> |
| [18:1](project/app/api/posts/%5Bid%5D/likes/route.ts#L18) | DELETE | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ return change(request, params, false); }</code> |

<a id="file-22"></a>

## project/app/api/posts/[id]/route.ts

[원본 파일](project/app/api/posts/%5Bid%5D/route.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [6:1](project/app/api/posts/%5Bid%5D/route.ts#L6) | PATCH | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const session = await auth(); if (!session?.user?.id) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 }); const userId = session.user.id; co …</code> |
| [13:41](project/app/api/posts/%5Bid%5D/route.ts#L13) | mediaTransaction 콜백 #1 | PATCH | 트랜잭션 범위의 DB 작업<br><code>{ const current = await tx.post.findFirst({ where: { id, authorId: userId } }); if (!current) throw new PostError("글을 찾을 수 없습니다.", 404); if (body.updatedAt …</code> |
| [27:1](project/app/api/posts/%5Bid%5D/route.ts#L27) | DELETE | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const session = await auth(); if (!session?.user?.id) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 }); const { id } = await params; try { …</code> |
| [32:28](project/app/api/posts/%5Bid%5D/route.ts#L32) | mediaTransaction 콜백 #1 | DELETE | 트랜잭션 범위의 DB 작업<br><code>{ const post = await tx.post.findFirst({ where: { id, authorId: session.user!.id } }); if (!post) throw new PostError("글을 찾을 수 없습니다.", 404); await tx.post. …</code> |

<a id="file-23"></a>

## project/app/api/posts/[id]/views/route.ts

[원본 파일](project/app/api/posts/%5Bid%5D/views/route.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [7:1](project/app/api/posts/%5Bid%5D/views/route.ts#L7) | POST | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { checkMutation(request); const { id } = await params; let userId: string &#124; undefined; try { userId = (await auth())?.user?.id; } catch { userId …</code> |

<a id="file-24"></a>

## project/app/api/posts/bulk/route.ts

[원본 파일](project/app/api/posts/bulk/route.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [4:1](project/app/api/posts/bulk/route.ts#L4) | PATCH | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const session = await auth(); if (!session?.user?.id) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 }); const userId = session.user.id; tr …</code> |
| [11:23](project/app/api/posts/bulk/route.ts#L11) | body.posts.some 콜백 #1 | PATCH | 원소의 선택·검색·검사 조건 반환<br><code>!post &#124;&#124; typeof post.id !== "string" &#124;&#124; !post.id &#124;&#124; typeof post.updatedAt !== "string" &#124;&#124; !Number.isFinite(Date.par …</code> |
| [15:27](project/app/api/posts/bulk/route.ts#L15) | posts.map 콜백 #1 | PATCH | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>post.id</code> |
| [26:42](project/app/api/posts/bulk/route.ts#L26) | mediaTransaction 콜백 #1 | PATCH | 트랜잭션 범위의 DB 작업<br><code>{ if (data.categoryId && !await tx.category.findFirst({ where: { id: data.categoryId, userId, isDivider: false } })) { throw new PostError("사용할 수 없는 카테고리입니 …</code> |
| [30:72](project/app/api/posts/bulk/route.ts#L30) | posts.map 콜백 #1 | mediaTransaction 콜백 #1 | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>post.id</code> |
| [33:50](project/app/api/posts/bulk/route.ts#L33) | posts.map 콜백 #1 | mediaTransaction 콜백 #1 | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>({ id: post.id, updatedAt: new Date(post.updatedAt) })</code> |

<a id="file-25"></a>

## project/app/api/posts/route.ts

[원본 파일](project/app/api/posts/route.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [5:1](project/app/api/posts/route.ts#L5) | POST | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const session = await auth(); if (!session?.user?.id) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 }); const userId = session.user.id; tr …</code> |
| [11:41](project/app/api/posts/route.ts#L11) | mediaTransaction 콜백 #1 | POST | 트랜잭션 범위의 DB 작업<br><code>{ const { data, names } = await validatePost(tx, body, userId); await consumeDraft(tx, userId, "new", body.draftVersion); const post = await tx.post.create …</code> |
| [23:1](project/app/api/posts/route.ts#L23) | GET | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const session = await auth(); if (!session?.user?.id) return Response.json({ error: "로그인이 필요합니다." }, { status: 401 }); const posts = await prisma.post.fi …</code> |

<a id="file-26"></a>

## project/app/api/todos/route.ts

[원본 파일](project/app/api/todos/route.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [6:1](project/app/api/todos/route.ts#L6) | GET | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { const session = await auth(); if (!session?.user?.id) { return NextResponse.json( { error: "로그인이 필요합니다." }, { status: 401 } ); } const { searchPara …</code> |
| [46:1](project/app/api/todos/route.ts#L46) | POST | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { const session = await auth(); if (!session?.user?.id) { return NextResponse.json( { error: "로그인이 필요합니다." }, { status: 401 } ); } const body = await …</code> |
| [86:1](project/app/api/todos/route.ts#L86) | PATCH | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { const session = await auth(); if (!session?.user?.id) { return NextResponse.json( { error: "로그인이 필요합니다." }, { status: 401 } ); } const body = await …</code> |
| [136:1](project/app/api/todos/route.ts#L136) | DELETE | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { const session = await auth(); if (!session?.user?.id) { return NextResponse.json( { error: "로그인이 필요합니다." }, { status: 401 } ); } const { searchPara …</code> |

<a id="file-27"></a>

## project/app/api/user/password/route.ts

[원본 파일](project/app/api/user/password/route.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [7:1](project/app/api/user/password/route.ts#L7) | PATCH | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { const session = await auth(); if (!session?.user?.id) { return NextResponse.json( { error: "로그인이 필요합니다." }, { status: 401 } ); } const body = await …</code> |

<a id="file-28"></a>

## project/app/api/user/profile/route.ts

[원본 파일](project/app/api/user/profile/route.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [7:1](project/app/api/user/profile/route.ts#L7) | PATCH | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { const session = await auth(); if (!session?.user?.id) { return NextResponse.json( { error: "로그인이 필요합니다." }, { status: 401 } ); } const body = await …</code> |

<a id="file-29"></a>

## project/app/blog/[authorId]/page.tsx

[원본 파일](project/app/blog/%5BauthorId%5D/page.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [6:1](project/app/blog/%5BauthorId%5D/page.tsx#L6) | BlogPage | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const { authorId } = await params; const { category, page } = await searchParams; const session = await auth(); const initial = await blogData(authorId,  …</code> |
| [12:76](project/app/blog/%5BauthorId%5D/page.tsx#L12) | initial.categories.some 콜백 #1 | BlogPage | 원소의 선택·검색·검사 조건 반환<br><code>item.id === category && !item.isDivider</code> |

<a id="file-30"></a>

## project/app/components/ArticleToc.tsx

[원본 파일](project/app/components/ArticleToc.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [6:1](project/app/components/ArticleToc.tsx#L6) | ArticleToc | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const [active, setActive] = useState(""); const navigationLock = useRef(0); useEffect(() =&gt; { let frame = 0; const update = () =&gt; { frame = 0; if ( …</code> |
| [9:13](project/app/components/ArticleToc.tsx#L9) | useEffect 콜백 #1 | ArticleToc | 컴포넌트 상태·외부 이벤트·타이머 연결<br><code>{ let frame = 0; const update = () =&gt; { frame = 0; if (Date.now() &lt; navigationLock.current) return; const offset = (document.querySelector(".site-hea …</code> |
| [11:20](project/app/components/ArticleToc.tsx#L11) | update | useEffect 콜백 #1 | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ frame = 0; if (Date.now() &lt; navigationLock.current) return; const offset = (document.querySelector(".site-header")?.getBoundingClientRect().height &#1 …</code> |
| [20:17](project/app/components/ArticleToc.tsx#L20) | setActive 콜백 #1 | update | 이전 React 상태를 받아 다음 상태 계산<br><code>previous === current ? previous : current</code> |
| [22:20](project/app/components/ArticleToc.tsx#L22) | scroll | useEffect 콜백 #1 | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ if (!frame) frame = requestAnimationFrame(update); }</code> |
| [26:12](project/app/components/ArticleToc.tsx#L26) | 익명 함수 | useEffect 콜백 #1 | 반환 함수: 상위 함수가 실행 시점·호출자를 결정<br><code>{ cancelAnimationFrame(frame); window.removeEventListener("scroll", scroll); window.removeEventListener("resize", scroll); }</code> |
| [29:118](project/app/components/ArticleToc.tsx#L29) | items.map 콜백 #1 | ArticleToc | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>&lt;li key={item.id} style={{ paddingLeft: (item.level - 2) * 12 }}&gt;&lt;a href={&#96;#${item.id}&#96;} aria-current={active === item.id ? "location" : u …</code> |
| [29:285](project/app/components/ArticleToc.tsx#L29) | onClick | items.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>{ event.preventDefault(); const target = document.getElementById(item.id); if (!target) return; window.history.replaceState(window.history.state, "", &#96; …</code> |

<a id="file-31"></a>

## project/app/components/AuthIntro.tsx

[원본 파일](project/app/components/AuthIntro.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [3:1](project/app/components/AuthIntro.tsx#L3) | AuthIntro | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ return ( &lt;aside className="auth-intro"&gt; &lt;span className="eyebrow"&gt;A SPACE FOR DEVELOPERS&lt;/span&gt; &lt;h2&gt;오늘의 배움이,&lt;br /&gt;내일의 나를&lt …</code> |

<a id="file-32"></a>

## project/app/components/Avatar.tsx

[원본 파일](project/app/components/Avatar.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [5:1](project/app/components/Avatar.tsx#L5) | Avatar | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const [failed, setFailed] = useState&lt;string &#124; null&gt;(null); return &lt;span className="profile-photo" style={{ width: size, height: size }}&gt; …</code> |
| [11:119](project/app/components/Avatar.tsx#L11) | onError | Avatar | UI/라이브러리 이벤트 처리<br><code>setFailed(src)</code> |

<a id="file-33"></a>

## project/app/components/BlogExplorer.tsx

[원본 파일](project/app/components/BlogExplorer.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [18:1](project/app/components/BlogExplorer.tsx#L18) | BlogExplorer | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const [managing, setManaging] = useState(false); const category = initialCategory; const postId = initialPostId &#124;&#124; null; const [deleteOpen, set …</code> |
| [22:32](project/app/components/BlogExplorer.tsx#L22) | data.posts.find 콜백 #1 | BlogExplorer | 원소의 선택·검색·검사 조건 반환<br><code>item.id === postId</code> |
| [24:27](project/app/components/BlogExplorer.tsx#L24) | useMemo 콜백 #1 | BlogExplorer | 의존 값으로 파생 데이터 계산<br><code>(post ? readDocument(post.content) : null)</code> |
| [25:27](project/app/components/BlogExplorer.tsx#L25) | useMemo 콜백 #1 | BlogExplorer | 의존 값으로 파생 데이터 계산<br><code>(postDoc?.attrs?.toc === "hidden" ? [] : documentOutline(postDoc, &#96;post-${post?.id}&#96;))</code> |
| [26:3](project/app/components/BlogExplorer.tsx#L26) | deletePost | BlogExplorer | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (!post &#124;&#124; deleting) return; setDeleting(true); setDeleteError(null); try { const response = await fetch("/api/posts/" + post.id, { method: " …</code> |
| [32:52](project/app/components/BlogExplorer.tsx#L32) | response.json().catch 콜백 #1 | deletePost | 비동기 실패 처리<br><code>null</code> |
| [43:25](project/app/components/BlogExplorer.tsx#L43) | categoryCount | BlogExplorer | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>data.categoryCounts.find((item) =&gt; (item.categoryId &#124;&#124; "uncategorized") === id)?.count &#124;&#124; 0</code> |
| [43:66](project/app/components/BlogExplorer.tsx#L43) | data.categoryCounts.find 콜백 #1 | categoryCount | 원소의 선택·검색·검사 조건 반환<br><code>(item.categoryId &#124;&#124; "uncategorized") === id</code> |
| [44:617](project/app/components/BlogExplorer.tsx#L44) | data.categories.map 콜백 #1 | BlogExplorer | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>item.isDivider ? &lt;hr key={item.id} /&gt; : &lt;Link key={item.id} href={(embedded ? "/mypage?tab=posts&category=" : blogUrl + "?category=") + encodeURIC …</code> |
| [44:1703](project/app/components/BlogExplorer.tsx#L44) | onClick | BlogExplorer | UI/라이브러리 이벤트 처리<br><code>setDeleteOpen(true)</code> |
| [44:2488](project/app/components/BlogExplorer.tsx#L44) | onClick | BlogExplorer | UI/라이브러리 이벤트 처리<br><code>setManaging(!managing)</code> |
| [44:2740](project/app/components/BlogExplorer.tsx#L44) | filtered.map 콜백 #1 | BlogExplorer | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>{ const doc = readDocument(item.content); return &lt;PostCard key={item.id} currentUserId={data.viewerId} views={item._count.views} href={(embedded ? listU …</code> |
| [44:3061](project/app/components/BlogExplorer.tsx#L44) | data.categories.find 콜백 #1 | filtered.map 콜백 #1 | 원소의 선택·검색·검사 조건 반환<br><code>cat.id === item.categoryId</code> |
| [44:3691](project/app/components/BlogExplorer.tsx#L44) | onClose | BlogExplorer | UI/라이브러리 이벤트 처리<br><code>{ if (!deleting) setDeleteOpen(false); }</code> |
| [44:3979](project/app/components/BlogExplorer.tsx#L44) | onClick | BlogExplorer | UI/라이브러리 이벤트 처리<br><code>setDeleteOpen(false)</code> |
| [44:4089](project/app/components/BlogExplorer.tsx#L44) | onClick | BlogExplorer | UI/라이브러리 이벤트 처리<br><code>void deletePost()</code> |

<a id="file-34"></a>

## project/app/components/Chat.tsx

[원본 파일](project/app/components/Chat.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [14:1](project/app/components/Chat.tsx#L14) | messageId | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ // getRandomValues also works on local-network HTTP development addresses. const bytes = crypto.getRandomValues(new Uint8Array(16)); bytes[6] = (bytes[6] …</code> |
| [19:33](project/app/components/Chat.tsx#L19) | Array.from 콜백 #2 | messageId | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>byte.toString(16).padStart(2, "0")</code> |
| [22:1](project/app/components/Chat.tsx#L22) | api | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const response = await fetch(url, { method, cache: "no-store", ...(body ? { headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } …</code> |
| [28:1](project/app/components/Chat.tsx#L28) | ChatIcon | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ return &lt;svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"&gt;&lt;path d="M21 11.5a …</code> |
| [29:1](project/app/components/Chat.tsx#L29) | CloseIcon | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ return &lt;svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"&gt;&lt;path d="m6 6 12 1 …</code> |
| [31:1](project/app/components/Chat.tsx#L31) | Chat | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const [open, setOpen] = useState(false); const [roomId, setRoomId] = useState&lt;string &#124; null&gt;(null); const [conversations, setConversations] =  …</code> |
| [41:28](project/app/components/Chat.tsx#L41) | load | Chat | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ const version = ++sequence.current; try { const result = await api&lt;{ conversations: Conversation[] }&gt;("/api/chat"); if (sequence.current === versio …</code> |
| [48:13](project/app/components/Chat.tsx#L48) | useEffect 콜백 #1 | Chat | 컴포넌트 상태·외부 이벤트·타이머 연결<br><code>{ const refresh = () =&gt; { void load(); }; const start = async (event: Event) =&gt; { const peerId = (event as CustomEvent&lt;{ userId?: string }&gt;).de …</code> |
| [49:21](project/app/components/Chat.tsx#L49) | refresh | useEffect 콜백 #1 | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ void load(); }</code> |
| [50:19](project/app/components/Chat.tsx#L50) | start | useEffect 콜백 #1 | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ const peerId = (event as CustomEvent&lt;{ userId?: string }&gt;).detail?.userId; if (!peerId) return; const version = ++opening.current; setOpen(true); s …</code> |
| [65:12](project/app/components/Chat.tsx#L65) | 익명 함수 | useEffect 콜백 #1 | 반환 함수: 상위 함수가 실행 시점·호출자를 결정<br><code>{ clearTimeout(timer); window.removeEventListener("chat-changed", refresh); window.removeEventListener("chat-list-changed", refresh); window.removeEventLis …</code> |
| [67:13](project/app/components/Chat.tsx#L67) | useEffect 콜백 #1 | Chat | 컴포넌트 상태·외부 이벤트·타이머 연결<br><code>{ if (!open) return; panel.current?.focus(); const escape = (event: KeyboardEvent) =&gt; { if (event.key === "Escape") { ++opening.current; setOpen(false); …</code> |
| [70:20](project/app/components/Chat.tsx#L70) | escape | useEffect 콜백 #1 | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ if (event.key === "Escape") { ++opening.current; setOpen(false); trigger.current?.focus(); } }</code> |
| [72:12](project/app/components/Chat.tsx#L72) | 익명 함수 | useEffect 콜백 #1 | 반환 함수: 상위 함수가 실행 시점·호출자를 결정<br><code>document.removeEventListener("keydown", escape)</code> |
| [74:38](project/app/components/Chat.tsx#L74) | conversations.reduce 콜백 #1 | Chat | 목록 값을 누적 계산<br><code>sum + room.unread</code> |
| [76:187](project/app/components/Chat.tsx#L76) | onClick | Chat | UI/라이브러리 이벤트 처리<br><code>{ ++opening.current; setOpen(!open); setLoading(false); if (!open) void load(); }</code> |
| [78:163](project/app/components/Chat.tsx#L78) | onClick | Chat | UI/라이브러리 이벤트 처리<br><code>{ setRoomId(null); void load(); }</code> |
| [78:284](project/app/components/Chat.tsx#L78) | onClick | Chat | UI/라이브러리 이벤트 처리<br><code>{ ++opening.current; setOpen(false); trigger.current?.focus(); }</code> |
| [81:123](project/app/components/Chat.tsx#L81) | onClick | Chat | UI/라이브러리 이벤트 처리<br><code>void load()</code> |
| [82:226](project/app/components/Chat.tsx#L82) | onClick | Chat | UI/라이브러리 이벤트 처리<br><code>setOpen(false)</code> |
| [83:28](project/app/components/Chat.tsx#L83) | conversations.map 콜백 #1 | Chat | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>&lt;button type="button" key={room.id} className="chat-conversation" disabled={loading} onClick={() =&gt; setRoomId(room.id)}&gt;&lt;Avatar src={room.peer. …</code> |
| [83:132](project/app/components/Chat.tsx#L83) | onClick | conversations.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>setRoomId(room.id)</code> |
| [89:1](project/app/components/Chat.tsx#L89) | ChatRoom | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const [messages, setMessages] = useState&lt;Message[]&gt;([]); const [peer, setPeer] = useState&lt;Peer &#124; null&gt;(null); const [peerRead, setPeerRe …</code> |
| [107:13](project/app/components/Chat.tsx#L107) | useEffect 콜백 #1 | ChatRoom | 컴포넌트 상태·외부 이벤트·타이머 연결<br><code>{ let cancelled = false, running = false, queued = false; const refresh = async () =&gt; { if (running) { queued = true; return; } running = true; try { do …</code> |
| [109:21](project/app/components/Chat.tsx#L109) | refresh | useEffect 콜백 #1 | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ if (running) { queued = true; return; } running = true; try { do { queued = false; const initial = newest.current === 0; let page: Page; const incoming:  …</code> |
| [128:23](project/app/components/Chat.tsx#L128) | setMessages 콜백 #1 | refresh | 이전 React 상태를 받아 다음 상태 계산<br><code>[...new Map([...current, ...incoming].map((message) =&gt; [message.id, message])).values()].sort((a, b) =&gt; a.id - b.id)</code> |
| [128:78](project/app/components/Chat.tsx#L128) | [...current, ...incoming].map 콜백 #1 | setMessages 콜백 #1 | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>[message.id, message]</code> |
| [128:130](project/app/components/Chat.tsx#L128) | [...new Map([...current, ...incoming].map((message) =&gt; [message.id, message])).values()].sort 콜백 #1 | setMessages 콜백 #1 | 정렬을 위한 두 원소 순서 비교<br><code>a.id - b.id</code> |
| [137:20](project/app/components/Chat.tsx#L137) | update | useEffect 콜백 #1 | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ void refresh(); }</code> |
| [142:12](project/app/components/Chat.tsx#L142) | 익명 함수 | useEffect 콜백 #1 | 반환 함수: 상위 함수가 실행 시점·호출자를 결정<br><code>{ cancelled = true; clearTimeout(timer); window.removeEventListener("chat-changed", update); window.removeEventListener("focus", update); document.removeEv …</code> |
| [144:13](project/app/components/Chat.tsx#L144) | useEffect 콜백 #1 | ChatRoom | 컴포넌트 상태·외부 이벤트·타이머 연결<br><code>{ if (bottom.current && scroll.current) scroll.current.scrollTop = scroll.current.scrollHeight; }</code> |
| [145:3](project/app/components/Chat.tsx#L145) | older | ChatRoom | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (!messages.length &#124;&#124; olderLoading) return; setOlderLoading(true); const container = scroll.current; const height = container?.scrollHeight & …</code> |
| [154:19](project/app/components/Chat.tsx#L154) | setMessages 콜백 #1 | older | 이전 React 상태를 받아 다음 상태 계산<br><code>[...new Map([...page.messages, ...current].map((message) =&gt; [message.id, message])).values()].sort((a, b) =&gt; a.id - b.id)</code> |
| [154:79](project/app/components/Chat.tsx#L154) | [...page.messages, ...current].map 콜백 #1 | setMessages 콜백 #1 | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>[message.id, message]</code> |
| [154:131](project/app/components/Chat.tsx#L154) | [...new Map([...page.messages, ...current].map((message) =&gt; [message.id, message])).values()].sort 콜백 #1 | setMessages 콜백 #1 | 정렬을 위한 두 원소 순서 비교<br><code>a.id - b.id</code> |
| [156:29](project/app/components/Chat.tsx#L156) | requestAnimationFrame 콜백 #1 | older | 예약 시점에 작업 수행<br><code>{ if (container) container.scrollTop = top + container.scrollHeight - height; }</code> |
| [160:3](project/app/components/Chat.tsx#L160) | send | ChatRoom | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ event.preventDefault(); if (sending &#124;&#124; !draft.trim() &#124;&#124; !canSend) return; setSending(true); setSendError(""); const content = draft.t …</code> |
| [171:19](project/app/components/Chat.tsx#L171) | setMessages 콜백 #1 | send | 이전 React 상태를 받아 다음 상태 계산<br><code>{ const next = new Map(current.map((message) =&gt; [message.id, message])); next.set(result.message.id, result.message); newest.current = Math.max(newest.c …</code> |
| [172:42](project/app/components/Chat.tsx#L172) | current.map 콜백 #1 | setMessages 콜백 #1 | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>[message.id, message]</code> |
| [175:40](project/app/components/Chat.tsx#L175) | [...next.values()].sort 콜백 #1 | setMessages 콜백 #1 | 정렬을 위한 두 원소 순서 비교<br><code>a.id - b.id</code> |
| [177:29](project/app/components/Chat.tsx#L177) | requestAnimationFrame 콜백 #1 | send | 예약 시점에 작업 수행<br><code>compose.current?.focus()</code> |
| [184:59](project/app/components/Chat.tsx#L184) | onScroll | ChatRoom | UI/라이브러리 이벤트 처리<br><code>{ const element = scroll.current; if (!element) return; const wasBottom = bottom.current; bottom.current = element.scrollHeight - element.scrollTop - eleme …</code> |
| [191:108](project/app/components/Chat.tsx#L191) | onClick | ChatRoom | UI/라이브러리 이벤트 처리<br><code>void older()</code> |
| [193:21](project/app/components/Chat.tsx#L193) | messages.map 콜백 #1 | ChatRoom | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>&lt;div key={message.id} className={&#96;chat-message ${message.senderId === userId ? "chat-message-mine" : ""}&#96;}&gt;&lt;p&gt;{message.content}&lt;/p&g …</code> |
| [195:121](project/app/components/Chat.tsx#L195) | onClick | ChatRoom | UI/라이브러리 이벤트 처리<br><code>window.dispatchEvent(new Event("chat-changed"))</code> |
| [199:226](project/app/components/Chat.tsx#L199) | onChange | ChatRoom | UI/라이브러리 이벤트 처리<br><code>setDraft(event.target.value)</code> |
| [199:278](project/app/components/Chat.tsx#L199) | onKeyDown | ChatRoom | UI/라이브러리 이벤트 처리<br><code>{ if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }</code> |

<a id="file-35"></a>

## project/app/components/FriendButton.tsx

[원본 파일](project/app/components/FriendButton.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [9:1](project/app/components/FriendButton.tsx#L9) | FriendButton | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const router = useRouter(); const [busy, setBusy] = useState(false); const [error, setError] = useState(""); if (authorId === viewerId) return null; if ( …</code> |
| [15:3](project/app/components/FriendButton.tsx#L15) | send | FriendButton | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (busy) return; setBusy(true); setError(""); try { const response = await fetch(&#96;/api/friends/${authorId}&#96;, { method: "POST", headers: { "Conte …</code> |
| [29:130](project/app/components/FriendButton.tsx#L29) | onClick | FriendButton | UI/라이브러리 이벤트 처리<br><code>window.dispatchEvent(new Event("open-notifications"))</code> |
| [31:120](project/app/components/FriendButton.tsx#L31) | onClick | FriendButton | UI/라이브러리 이벤트 처리<br><code>window.dispatchEvent(new CustomEvent("open-chat", { detail: { userId: authorId } }))</code> |

<a id="file-36"></a>

## project/app/components/Icon.tsx

[원본 파일](project/app/components/Icon.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [26:1](project/app/components/Icon.tsx#L26) | Icon | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ return &lt;svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round …</code> |

<a id="file-37"></a>

## project/app/components/Modal.tsx

[원본 파일](project/app/components/Modal.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [5:1](project/app/components/Modal.tsx#L5) | Modal | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const ref = useRef&lt;HTMLDialogElement&gt;(null); useEffect(() =&gt; { const dialog = ref.current; if (open && !dialog?.open) dialog?.showModal(); if (! …</code> |
| [7:13](project/app/components/Modal.tsx#L7) | useEffect 콜백 #1 | Modal | 컴포넌트 상태·외부 이벤트·타이머 연결<br><code>{ const dialog = ref.current; if (open && !dialog?.open) dialog?.showModal(); if (!open && dialog?.open) dialog?.close(); }</code> |
| [12:119](project/app/components/Modal.tsx#L12) | onCancel | Modal | UI/라이브러리 이벤트 처리<br><code>{ event.preventDefault(); if (closable) onClose?.(); }</code> |

<a id="file-38"></a>

## project/app/components/Notifications.tsx

[원본 파일](project/app/components/Notifications.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [14:1](project/app/components/Notifications.tsx#L14) | Notifications | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const router = useRouter(); const [open, setOpen] = useState(false); const [data, setData] = useState&lt;Inbox &#124; null&gt;(null); const [error, setEr …</code> |
| [23:13](project/app/components/Notifications.tsx#L23) | useEffect 콜백 #1 | Notifications | 컴포넌트 상태·외부 이벤트·타이머 연결<br><code>{ if (!open) return; const outside = (event: PointerEvent) =&gt; { if (event.target instanceof Node && !dropdown.current?.contains(event.target)) setOpen(f …</code> |
| [25:21](project/app/components/Notifications.tsx#L25) | outside | useEffect 콜백 #1 | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ if (event.target instanceof Node && !dropdown.current?.contains(event.target)) setOpen(false); }</code> |
| [28:20](project/app/components/Notifications.tsx#L28) | escape | useEffect 콜백 #1 | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); } }</code> |
| [33:12](project/app/components/Notifications.tsx#L33) | 익명 함수 | useEffect 콜백 #1 | 반환 함수: 상위 함수가 실행 시점·호출자를 결정<br><code>{ document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); }</code> |
| [38:28](project/app/components/Notifications.tsx#L38) | load | Notifications | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ const current = ++version.current; try { const response = await fetch("/api/notifications", { cache: "no-store" }); const result = await response.json(); …</code> |
| [47:13](project/app/components/Notifications.tsx#L47) | useEffect 콜백 #1 | Notifications | 컴포넌트 상태·외부 이벤트·타이머 연결<br><code>{ const refresh = () =&gt; { if (document.visibilityState === "visible") void load(); }; const show = () =&gt; { setOpen(true); void load(); }; const reque …</code> |
| [48:21](project/app/components/Notifications.tsx#L48) | refresh | useEffect 콜백 #1 | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ if (document.visibilityState === "visible") void load(); }</code> |
| [49:18](project/app/components/Notifications.tsx#L49) | show | useEffect 콜백 #1 | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ setOpen(true); void load(); }</code> |
| [56:12](project/app/components/Notifications.tsx#L56) | 익명 함수 | useEffect 콜백 #1 | 반환 함수: 상위 함수가 실행 시점·호출자를 결정<br><code>{ ++requestVersion.current; clearTimeout(initialLoad); window.removeEventListener("focus", refresh); document.removeEventListener("visibilitychange", refre …</code> |
| [65:3](project/app/components/Notifications.tsx#L65) | mutate | Notifications | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (busy) return; setBusy(true); setError(""); ++version.current; try { const response = await fetch(url, { method, headers: { "Content-Type": "applicati …</code> |
| [78:72](project/app/components/Notifications.tsx#L78) | onBlur | Notifications | UI/라이브러리 이벤트 처리<br><code>{ if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) setOpen(false); }</code> |
| [81:187](project/app/components/Notifications.tsx#L81) | onClick | Notifications | UI/라이브러리 이벤트 처리<br><code>{ setOpen(!open); if (!open) void load(); }</code> |
| [86:133](project/app/components/Notifications.tsx#L86) | onClick | Notifications | UI/라이브러리 이벤트 처리<br><code>{ setOpen(false); trigger.current?.focus(); }</code> |
| [88:123](project/app/components/Notifications.tsx#L88) | onClick | Notifications | UI/라이브러리 이벤트 처리<br><code>void load()</code> |
| [92:30](project/app/components/Notifications.tsx#L92) | data.requests.map 콜백 #1 | Notifications | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>&lt;article key={request.id} className="notification-item"&gt; &lt;Link href={&#96;/blog/${request.user.id}&#96;} className="notification-person" onClick={ …</code> |
| [93:94](project/app/components/Notifications.tsx#L93) | onClick | data.requests.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>setOpen(false)</code> |
| [95:132](project/app/components/Notifications.tsx#L95) | onClick | data.requests.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>void mutate(&#96;/api/friend-requests/${request.id}&#96;, "PATCH", { action: "accept" })</code> |
| [95:314](project/app/components/Notifications.tsx#L95) | onClick | data.requests.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>void mutate(&#96;/api/friend-requests/${request.id}&#96;, "PATCH", { action: "reject" })</code> |
| [99:158](project/app/components/Notifications.tsx#L99) | onClick | Notifications | UI/라이브러리 이벤트 처리<br><code>void mutate("/api/notifications", "DELETE", { all: true })</code> |
| [100:31](project/app/components/Notifications.tsx#L100) | data?.comments.map 콜백 #1 | Notifications | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>&lt;article key={notification.id} className="notification-item"&gt; &lt;Link href={&#96;/posts/${notification.comment.post.id}#comments&#96;} onClick={() = …</code> |
| [101:85](project/app/components/Notifications.tsx#L101) | onClick | data?.comments.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>setOpen(false)</code> |
| [106:284](project/app/components/Notifications.tsx#L106) | onClick | data?.comments.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>void mutate("/api/notifications", "DELETE", { id: notification.id })</code> |

<a id="file-39"></a>

## project/app/components/PostContent.tsx

[원본 파일](project/app/components/PostContent.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [5:1](project/app/components/PostContent.tsx#L5) | renderNode | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const headingId = node.type === "heading" ? &#96;${context.prefix}-section-${++context.heading}&#96; : undefined; const children = node.content?.map((chi …</code> |
| [7:38](project/app/components/PostContent.tsx#L7) | node.content?.map 콜백 #1 | renderNode | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>renderNode(child, index, context)</code> |
| [14:161](project/app/components/PostContent.tsx#L14) | imageGroupWidths(node.attrs?.widths, node.content!.length).map 콜백 #1 | renderNode | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>&#96;${w}fr&#96;</code> |
| [14:262](project/app/components/PostContent.tsx#L14) | children?.map 콜백 #1 | renderNode | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>&lt;div className="image-group-cell" key={index}&gt;{child}&lt;/div&gt;</code> |
| [51:1](project/app/components/PostContent.tsx#L51) | PostContent | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const doc = readDocument(content); const context = { heading: 0, prefix: idPrefix }; return &lt;div className="rich-prose"&gt;{doc ? doc.content?.map((no …</code> |
| [54:62](project/app/components/PostContent.tsx#L54) | doc.content?.map 콜백 #1 | PostContent | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>renderNode(node, index, context)</code> |

<a id="file-40"></a>

## project/app/components/PostEngagement.tsx

[원본 파일](project/app/components/PostEngagement.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [12:1](project/app/components/PostEngagement.tsx#L12) | requestJson | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const response = await fetch(url, { cache: "no-store", ...init }); const result = await response.json(); if (!response.ok) throw new Error(result.error & …</code> |
| [13:1](project/app/components/PostEngagement.tsx#L13) | orderComments | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const children = new Map&lt;string, CommentItem[]&gt;(); const known = new Set(comments.map((comment) =&gt; comment.id)); for (const comment of comments) …</code> |
| [15:38](project/app/components/PostEngagement.tsx#L15) | comments.map 콜백 #1 | orderComments | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>comment.id</code> |
| [20:17](project/app/components/PostEngagement.tsx#L20) | visit | orderComments | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ ordered.push(comment); for (const child of children.get(comment.id) &#124;&#124; []) visit(child); }</code> |
| [28:1](project/app/components/PostEngagement.tsx#L28) | PostEngagement | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const router = useRouter(); const base = "/api/posts/" + postId; const [data, setData] = useState&lt;Engagement &#124; null&gt;(null); const [error, setE …</code> |
| [34:13](project/app/components/PostEngagement.tsx#L34) | useEffect 콜백 #1 | PostEngagement | 컴포넌트 상태·외부 이벤트·타이머 연결<br><code>{ let cancelled = false; async function load() { try { const result: Engagement = await requestJson(base + "/engagement"); if (cancelled) return; setData({ …</code> |
| [34:44](project/app/components/PostEngagement.tsx#L34) | load | useEffect 콜백 #1 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { const result: Engagement = await requestJson(base + "/engagement"); if (cancelled) return; setData({ ...result, comments: orderComments(result.comm …</code> |
| [34:366](project/app/components/PostEngagement.tsx#L34) | setData 콜백 #1 | load | 이전 React 상태를 받아 다음 상태 계산<br><code>current ? { ...current, views: viewed.views } : current</code> |
| [34:609](project/app/components/PostEngagement.tsx#L34) | 익명 함수 | useEffect 콜백 #1 | 반환 함수: 상위 함수가 실행 시점·호출자를 결정<br><code>{ cancelled = true; }</code> |
| [35:3](project/app/components/PostEngagement.tsx#L35) | reload | PostEngagement | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const result: Engagement = await requestJson(base + "/engagement" + (more && data?.nextCursor ? "?cursor=" + data.nextCursor : "")); setData((current) =& …</code> |
| [35:182](project/app/components/PostEngagement.tsx#L35) | setData 콜백 #1 | reload | 이전 React 상태를 받아 다음 상태 계산<br><code>more && current ? { ...result, comments: orderComments([...current.comments, ...result.comments.filter((item) =&gt; !current.comments.some((previous) =&gt; …</code> |
| [35:298](project/app/components/PostEngagement.tsx#L35) | result.comments.filter 콜백 #1 | setData 콜백 #1 | 원소의 선택·검색·검사 조건 반환<br><code>!current.comments.some((previous) =&gt; previous.id === item.id)</code> |
| [35:331](project/app/components/PostEngagement.tsx#L35) | current.comments.some 콜백 #1 | result.comments.filter 콜백 #1 | 원소의 선택·검색·검사 조건 반환<br><code>previous.id === item.id</code> |
| [36:3](project/app/components/PostEngagement.tsx#L36) | like | PostEngagement | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (!data &#124;&#124; busy) return; setBusy(true); setError(""); try { const result = await requestJson(base + "/likes", { method: data.liked ? "DELETE" …</code> |
| [37:3](project/app/components/PostEngagement.tsx#L37) | startReply | PostEngagement | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ setReplyTo(comment); requestAnimationFrame(() =&gt; replyInput.current?.focus()); }</code> |
| [37:90](project/app/components/PostEngagement.tsx#L37) | requestAnimationFrame 콜백 #1 | startReply | 예약 시점에 작업 수행<br><code>replyInput.current?.focus()</code> |
| [38:3](project/app/components/PostEngagement.tsx#L38) | submit | PostEngagement | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ event.preventDefault(); if (busy) return; setBusy(true); setError(""); setNotice(""); try { await requestJson(base + "/comments", { method: "POST", heade …</code> |
| [39:3](project/app/components/PostEngagement.tsx#L39) | submitReply | PostEngagement | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ event.preventDefault(); if (busy &#124;&#124; !replyTo) return; setBusy(true); setError(""); setNotice(""); try { await requestJson(base + "/comments", { …</code> |
| [40:3](project/app/components/PostEngagement.tsx#L40) | openAction | PostEngagement | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ setAction({ comment, remove }); setEditContent(comment.content); setEditPassword(""); setActionError(""); }</code> |
| [41:3](project/app/components/PostEngagement.tsx#L41) | changeComment | PostEngagement | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ event.preventDefault(); if (!action &#124;&#124; busy) return; setBusy(true); setActionError(""); try { await requestJson(base + "/comments/" + action.co …</code> |
| [47:188](project/app/components/PostEngagement.tsx#L47) | onChange | PostEngagement | UI/라이브러리 이벤트 처리<br><code>setNickname(event.target.value)</code> |
| [47:414](project/app/components/PostEngagement.tsx#L47) | onChange | PostEngagement | UI/라이브러리 이벤트 처리<br><code>setPassword(event.target.value)</code> |
| [48:137](project/app/components/PostEngagement.tsx#L48) | onChange | PostEngagement | UI/라이브러리 이벤트 처리<br><code>setContent(event.target.value)</code> |
| [51:134](project/app/components/PostEngagement.tsx#L51) | onClick | PostEngagement | UI/라이브러리 이벤트 처리<br><code>{ try { await reload(); setError(""); } catch { /* 원래 오류를 유지한다. */ } }</code> |
| [54:55](project/app/components/PostEngagement.tsx#L54) | data?.comments.map 콜백 #1 | PostEngagement | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>&lt;article key={comment.id} className={&#96;comment-item${comment.parentId ? " comment-reply" : ""}&#96;}&gt;&lt;div className="comment-byline"&gt;{!comme …</code> |
| [54:815](project/app/components/PostEngagement.tsx#L54) | onClick | data?.comments.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>startReply(comment)</code> |
| [54:920](project/app/components/PostEngagement.tsx#L54) | onClick | data?.comments.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>openAction(comment, false)</code> |
| [54:1035](project/app/components/PostEngagement.tsx#L54) | onClick | data?.comments.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>openAction(comment, true)</code> |
| [54:1289](project/app/components/PostEngagement.tsx#L54) | onClick | data?.comments.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>setReplyTo(null)</code> |
| [54:1530](project/app/components/PostEngagement.tsx#L54) | onChange | data?.comments.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>setReplyNickname(event.target.value)</code> |
| [54:1738](project/app/components/PostEngagement.tsx#L54) | onChange | data?.comments.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>setReplyPassword(event.target.value)</code> |
| [54:1948](project/app/components/PostEngagement.tsx#L54) | onChange | data?.comments.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>setReplyContent(event.target.value)</code> |
| [56:109](project/app/components/PostEngagement.tsx#L56) | onClick | PostEngagement | UI/라이브러리 이벤트 처리<br><code>{ setBusy(true); try { await reload(true); } catch (caught) { setError(caught instanceof Error ? caught.message : "댓글을 불러오지 못했습니다."); } finally { setBusy(f …</code> |
| [57:37](project/app/components/PostEngagement.tsx#L57) | onClose | PostEngagement | UI/라이브러리 이벤트 처리<br><code>{ if (!busy) setAction(null); }</code> |
| [57:367](project/app/components/PostEngagement.tsx#L57) | onChange | PostEngagement | UI/라이브러리 이벤트 처리<br><code>setEditContent(event.target.value)</code> |
| [57:706](project/app/components/PostEngagement.tsx#L57) | onChange | PostEngagement | UI/라이브러리 이벤트 처리<br><code>setEditPassword(event.target.value)</code> |
| [57:951](project/app/components/PostEngagement.tsx#L57) | onClick | PostEngagement | UI/라이브러리 이벤트 처리<br><code>setAction(null)</code> |
| [60:1](project/app/components/PostEngagement.tsx#L60) | Heart | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ return &lt;svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" aria-hidden="tr …</code> |

<a id="file-41"></a>

## project/app/components/PostImage.tsx

[원본 파일](project/app/components/PostImage.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [6:1](project/app/components/PostImage.tsx#L6) | PostImage | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const [open, setOpen] = useState(false); return &lt;&gt; {/* eslint-disable-next-line @next/next/no-img-element */} &lt;img src={src} alt={alt} title={ti …</code> |
| [10:207](project/app/components/PostImage.tsx#L10) | onClick | PostImage | UI/라이브러리 이벤트 처리<br><code>setOpen(true)</code> |
| [10:239](project/app/components/PostImage.tsx#L10) | onKeyDown | PostImage | UI/라이브러리 이벤트 처리<br><code>{ if (event.key === "Enter" &#124;&#124; event.key === " ") { event.preventDefault(); setOpen(true); } }</code> |
| [11:33](project/app/components/PostImage.tsx#L11) | onClose | PostImage | UI/라이브러리 이벤트 처리<br><code>setOpen(false)</code> |

<a id="file-42"></a>

## project/app/components/RealtimeEvents.tsx

[원본 파일](project/app/components/RealtimeEvents.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [6:1](project/app/components/RealtimeEvents.tsx#L6) | RealtimeEvents | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const router = useRouter(); useEffect(() =&gt; { const events = new EventSource("/api/events"); const reconcile = () =&gt; { window.dispatchEvent(new Eve …</code> |
| [8:13](project/app/components/RealtimeEvents.tsx#L8) | useEffect 콜백 #1 | RealtimeEvents | 컴포넌트 상태·외부 이벤트·타이머 연결<br><code>{ const events = new EventSource("/api/events"); const reconcile = () =&gt; { window.dispatchEvent(new Event("notifications-changed")); window.dispatchEven …</code> |
| [10:23](project/app/components/RealtimeEvents.tsx#L10) | reconcile | useEffect 콜백 #1 | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ window.dispatchEvent(new Event("notifications-changed")); window.dispatchEvent(new Event("chat-changed")); }</code> |
| [15:39](project/app/components/RealtimeEvents.tsx#L15) | events.addEventListener 콜백 #2 | useEffect 콜백 #1 | 이벤트 수신 처리<br><code>{ try { const payload = JSON.parse((event as MessageEvent).data); if (payload.type === "notifications") window.dispatchEvent(new Event("notifications-chang …</code> |
| [23:41](project/app/components/RealtimeEvents.tsx#L23) | window.setInterval 콜백 #1 | useEffect 콜백 #1 | 예약 시점에 작업 수행<br><code>{ if (document.visibilityState === "visible") reconcile(); }</code> |
| [25:12](project/app/components/RealtimeEvents.tsx#L25) | 익명 함수 | useEffect 콜백 #1 | 반환 함수: 상위 함수가 실행 시점·호출자를 결정<br><code>{ events.close(); clearInterval(fallback); window.removeEventListener("focus", reconcile); }</code> |

<a id="file-43"></a>

## project/app/components/SiteHeader.tsx

[원본 파일](project/app/components/SiteHeader.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [10:1](project/app/components/SiteHeader.tsx#L10) | SiteHeader | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const session = await auth(); return ( &lt;header className="site-header"&gt; &lt;div className="header-inner"&gt; &lt;Link href="/" className="brand" ar …</code> |

<a id="file-44"></a>

## project/app/components/ThemeToggle.tsx

[원본 파일](project/app/components/ThemeToggle.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [14:1](project/app/components/ThemeToggle.tsx#L14) | ThemeToggle | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const [theme, setTheme] = useState&lt;Theme &#124; null&gt;(null); useEffect(() =&gt; { const media = window.matchMedia("(prefers-color-scheme: dark)");  …</code> |
| [17:13](project/app/components/ThemeToggle.tsx#L17) | useEffect 콜백 #1 | ThemeToggle | 컴포넌트 상태·외부 이벤트·타이머 연결<br><code>{ const media = window.matchMedia("(prefers-color-scheme: dark)"); const read = (): Theme =&gt; { try { const saved = localStorage.getItem(storageKey); ret …</code> |
| [19:18](project/app/components/ThemeToggle.tsx#L19) | read | useEffect 콜백 #1 | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ try { const saved = localStorage.getItem(storageKey); return saved === "light" &#124;&#124; saved === "dark" ? saved : "system"; } catch { return "system …</code> |
| [25:18](project/app/components/ThemeToggle.tsx#L25) | sync | useEffect 콜백 #1 | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ const selected = read(); document.documentElement.classList.toggle("dark", selected === "dark" &#124;&#124; (selected === "system" && media.matches)); se …</code> |
| [30:28](project/app/components/ThemeToggle.tsx#L30) | onSystemChange | useEffect 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>{ // Preserve an in-memory choice even when browser storage is unavailable. setTheme((selected) =&gt; { if (selected === "system") document.documentElement …</code> |
| [32:16](project/app/components/ThemeToggle.tsx#L32) | setTheme 콜백 #1 | onSystemChange | 이전 React 상태를 받아 다음 상태 계산<br><code>{ if (selected === "system") document.documentElement.classList.toggle("dark", media.matches); return selected; }</code> |
| [37:23](project/app/components/ThemeToggle.tsx#L37) | onStorage | useEffect 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>{ if (event.key === storageKey &#124;&#124; event.key === null) sync(); }</code> |
| [44:12](project/app/components/ThemeToggle.tsx#L44) | 익명 함수 | useEffect 콜백 #1 | 반환 함수: 상위 함수가 실행 시점·호출자를 결정<br><code>{ if (typeof media.removeEventListener === "function") media.removeEventListener("change", onSystemChange); else media.removeListener(onSystemChange); wind …</code> |
| [51:3](project/app/components/ThemeToggle.tsx#L51) | selectTheme | ThemeToggle | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ setTheme(value); document.documentElement.classList.toggle("dark", value === "dark" &#124;&#124; (value === "system" && window.matchMedia("(prefers-color …</code> |
| [59:20](project/app/components/ThemeToggle.tsx#L59) | options.map 콜백 #1 | ThemeToggle | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>( &lt;button type="button" key={value} aria-label={label} title={label} aria-pressed={theme === value} onClick={() =&gt; selectTheme(value)}&gt; &lt;Icon n …</code> |
| [60:116](project/app/components/ThemeToggle.tsx#L60) | onClick | options.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>selectTheme(value)</code> |

<a id="file-45"></a>

## project/app/components/UserName.tsx

[원본 파일](project/app/components/UserName.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [1:1](project/app/components/UserName.tsx#L1) | UserName | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ return &lt;span className="user-name" tabIndex={user.tag ? 0 : undefined}&gt;{user.nickname &#124;&#124; "개발자"}{user.tag && &lt;span className="user-name …</code> |

<a id="file-46"></a>

## project/app/layout.tsx

[원본 파일](project/app/layout.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [21:1](project/app/layout.tsx#L21) | RootLayout | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ return ( &lt;html lang="ko" suppressHydrationWarning className={&#96;${geistSans.variable} ${geistMono.variable} h-full antialiased&#96;} &gt; &lt;head&g …</code> |

<a id="file-47"></a>

## project/app/login/page.tsx

[원본 파일](project/app/login/page.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [8:1](project/app/login/page.tsx#L8) | LoginPage | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const [state, formAction, isPending] = useActionState(loginAction, null); return ( &lt;main className="auth-page"&gt; &lt;AuthIntro /&gt; &lt;div classNa …</code> |

<a id="file-48"></a>

## project/app/mypage/BulkPostManager.tsx

[원본 파일](project/app/mypage/BulkPostManager.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [10:1](project/app/mypage/BulkPostManager.tsx#L10) | BulkPostManager | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const router = useRouter(); const [selected, setSelected] = useState&lt;string[]&gt;([]); const [visibility, setVisibility] = useState(""); const [catego …</code> |
| [20:38](project/app/mypage/BulkPostManager.tsx#L20) | posts.filter 콜백 #1 | BulkPostManager | 원소의 선택·검색·검사 조건 반환<br><code>selected.includes(post.id)</code> |
| [23:3](project/app/mypage/BulkPostManager.tsx#L23) | apply | BulkPostManager | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (busy &#124;&#124; !selectedPosts.length &#124;&#124; (!visibility && !categoryId)) return; setSaving(true); setError(""); setMessage(""); try { const …</code> |
| [29:57](project/app/mypage/BulkPostManager.tsx#L29) | selectedPosts.map 콜백 #1 | apply | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>({ id, updatedAt })</code> |
| [36:23](project/app/mypage/BulkPostManager.tsx#L36) | startTransition 콜백 #1 | apply | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>router.refresh()</code> |
| [45:132](project/app/mypage/BulkPostManager.tsx#L45) | onChange | BulkPostManager | UI/라이브러리 이벤트 처리<br><code>setSelected(allSelected ? [] : posts.map((post) =&gt; post.id))</code> |
| [45:179](project/app/mypage/BulkPostManager.tsx#L45) | posts.map 콜백 #1 | onChange | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>post.id</code> |
| [49:158](project/app/mypage/BulkPostManager.tsx#L49) | onChange | BulkPostManager | UI/라이브러리 이벤트 처리<br><code>setVisibility(event.target.value)</code> |
| [49:275](project/app/mypage/BulkPostManager.tsx#L49) | Object.entries(visibilityLabels).map 콜백 #1 | BulkPostManager | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>&lt;option key={value} value={value}&gt;{label}&lt;/option&gt;</code> |
| [50:172](project/app/mypage/BulkPostManager.tsx#L50) | onChange | BulkPostManager | UI/라이브러리 이벤트 처리<br><code>setCategoryId(event.target.value)</code> |
| [50:303](project/app/mypage/BulkPostManager.tsx#L50) | categories.filter 콜백 #1 | BulkPostManager | 원소의 선택·검색·검사 조건 반환<br><code>!category.isDivider</code> |
| [50:342](project/app/mypage/BulkPostManager.tsx#L50) | categories.filter((category) =&gt; !category.isDivider).map 콜백 #1 | BulkPostManager | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>&lt;option key={category.id} value={category.id}&gt;{category.name}&lt;/option&gt;</code> |
| [51:147](project/app/mypage/BulkPostManager.tsx#L51) | onClick | BulkPostManager | UI/라이브러리 이벤트 처리<br><code>void apply()</code> |
| [53:81](project/app/mypage/BulkPostManager.tsx#L53) | posts.map 콜백 #1 | BulkPostManager | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>&lt;label key={post.id} className="flex items-center gap-3 py-4 cursor-pointer"&gt; &lt;input type="checkbox" checked={selected.includes(post.id)} onChange …</code> |
| [54:79](project/app/mypage/BulkPostManager.tsx#L54) | onChange | posts.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>setSelected(event.target.checked ? [...selected, post.id] : selected.filter((id) =&gt; id !== post.id))</code> |
| [54:166](project/app/mypage/BulkPostManager.tsx#L54) | selected.filter 콜백 #1 | onChange | 원소의 선택·검색·검사 조건 반환<br><code>id !== post.id</code> |
| [55:197](project/app/mypage/BulkPostManager.tsx#L55) | categories.find 콜백 #1 | posts.map 콜백 #1 | 원소의 선택·검색·검사 조건 반환<br><code>category.id === post.categoryId</code> |

<a id="file-49"></a>

## project/app/mypage/CategoryManager.tsx

[원본 파일](project/app/mypage/CategoryManager.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [18:1](project/app/mypage/CategoryManager.tsx#L18) | CategoryManager | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const router = useRouter(); const [categories, setCategories] = useState&lt;CategoryItem[]&gt;(initialCategories); const [selectedId, setSelectedId] = us …</code> |
| [37:33](project/app/mypage/CategoryManager.tsx#L37) | initialCategories.some 콜백 #1 | CategoryManager | 원소의 선택·검색·검사 조건 반환<br><code>category.id === selectedId</code> |
| [42:44](project/app/mypage/CategoryManager.tsx#L42) | categories.find 콜백 #1 | CategoryManager | 원소의 선택·검색·검사 조건 반환<br><code>category.id === selectedId</code> |
| [53:29](project/app/mypage/CategoryManager.tsx#L53) | handleAddCategory | CategoryManager | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ setError(null); setLoading(true); try { const res = await fetch("/api/categories", { method: "POST", headers: { "Content-Type": "application/json" }, bod …</code> |
| [69:23](project/app/mypage/CategoryManager.tsx#L69) | setCategories 콜백 #1 | handleAddCategory | 이전 React 상태를 받아 다음 상태 계산<br><code>[...prev, newCat]</code> |
| [83:28](project/app/mypage/CategoryManager.tsx#L83) | handleAddDivider | CategoryManager | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ setError(null); setLoading(true); try { const res = await fetch("/api/categories", { method: "POST", headers: { "Content-Type": "application/json" }, bod …</code> |
| [99:23](project/app/mypage/CategoryManager.tsx#L99) | setCategories 콜백 #1 | handleAddDivider | 이전 React 상태를 받아 다음 상태 계산<br><code>[...prev, newDiv]</code> |
| [112:22](project/app/mypage/CategoryManager.tsx#L112) | handleMove | CategoryManager | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ if (!selectedId) return; const index = categories.findIndex((c) =&gt; c.id === selectedId); if (index === -1) return; const targetIndex = direction === " …</code> |
| [115:40](project/app/mypage/CategoryManager.tsx#L115) | categories.findIndex 콜백 #1 | handleMove | 원소의 선택·검색·검사 조건 반환<br><code>c.id === selectedId</code> |
| [129:45](project/app/mypage/CategoryManager.tsx#L129) | newCategories.map 콜백 #1 | handleMove | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>c.id</code> |
| [143:28](project/app/mypage/CategoryManager.tsx#L143) | handleUpdateName | CategoryManager | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ e.preventDefault(); if (!selectedCategory &#124;&#124; selectedCategory.isDivider) return; const trimmed = editName.trim(); if (!trimmed) { setError("카테고 …</code> |
| [171:23](project/app/mypage/CategoryManager.tsx#L171) | setCategories 콜백 #1 | handleUpdateName | 이전 React 상태를 받아 다음 상태 계산<br><code>prev.map((c) =&gt; (c.id === selectedCategory.id ? { ...c, name: trimmed } : c))</code> |
| [172:20](project/app/mypage/CategoryManager.tsx#L172) | prev.map 콜백 #1 | setCategories 콜백 #1 | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>(c.id === selectedCategory.id ? { ...c, name: trimmed } : c)</code> |
| [186:24](project/app/mypage/CategoryManager.tsx#L186) | handleDelete | CategoryManager | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ const postCount = cat._count?.posts ?? 0; const message = cat.isDivider ? "구분선을 삭제하시겠습니까?" : &#96;[경고] "${cat.name}" 카테고리를 삭제하면 포함된 모든 게시글(${postCount}개) …</code> |
| [206:45](project/app/mypage/CategoryManager.tsx#L206) | categories.filter 콜백 #1 | handleDelete | 원소의 선택·검색·검사 조건 반환<br><code>item.id !== cat.id</code> |
| [219:46](project/app/mypage/CategoryManager.tsx#L219) | categories.findIndex 콜백 #1 | CategoryManager | 원소의 선택·검색·검사 조건 반환<br><code>c.id === selectedId</code> |
| [269:26](project/app/mypage/CategoryManager.tsx#L269) | onClick | CategoryManager | UI/라이브러리 이벤트 처리<br><code>handleMove("up")</code> |
| [278:26](project/app/mypage/CategoryManager.tsx#L278) | onClick | CategoryManager | UI/라이브러리 이벤트 처리<br><code>handleMove("down")</code> |
| [291:30](project/app/mypage/CategoryManager.tsx#L291) | categories.map 콜백 #1 | CategoryManager | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>{ const isSelected = cat.id === selectedId; // ── 구분선 항목인 경우: 글자 없이 순수 실선으로 표시 ── if (cat.isDivider) { return ( &lt;div key={cat.id} onClick={() =&gt; setS …</code> |
| [299:32](project/app/mypage/CategoryManager.tsx#L299) | onClick | categories.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>setSelectedId(cat.id)</code> |
| [322:30](project/app/mypage/CategoryManager.tsx#L322) | onClick | categories.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>setSelectedId(cat.id)</code> |
| [378:30](project/app/mypage/CategoryManager.tsx#L378) | onClick | CategoryManager | UI/라이브러리 이벤트 처리<br><code>handleDelete(selectedCategory)</code> |
| [413:33](project/app/mypage/CategoryManager.tsx#L413) | onChange | CategoryManager | UI/라이브러리 이벤트 처리<br><code>{ setEditName(e.target.value); setSaveSuccess(false); }</code> |
| [438:30](project/app/mypage/CategoryManager.tsx#L438) | onClick | CategoryManager | UI/라이브러리 이벤트 처리<br><code>handleDelete(selectedCategory)</code> |

<a id="file-50"></a>

## project/app/mypage/FriendManager.tsx

[원본 파일](project/app/mypage/FriendManager.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [14:1](project/app/mypage/FriendManager.tsx#L14) | FriendManager | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const router = useRouter(); const [query, setQuery] = useState(""); const [selected, setSelected] = useState&lt;FriendProfile &#124; null&gt;(null); cons …</code> |
| [24:3](project/app/mypage/FriendManager.tsx#L24) | addFriend | FriendManager | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ event.preventDefault(); if (sending) return; setAddError(""); setAddStatus(""); if (!parseFriendHandle(handle)) { setAddError("닉네임#태그 형식으로 입력해주세요. 태그는 숫자 …</code> |
| [40:35](project/app/mypage/FriendManager.tsx#L40) | friends.filter 콜백 #1 | FriendManager | 원소의 선택·검색·검사 조건 반환<br><code>&#96;${friend.nickname &#124;&#124; ""}#${friend.tag &#124;&#124; ""}&#96;.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())</code> |
| [41:3](project/app/mypage/FriendManager.tsx#L41) | remove | FriendManager | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (!selected &#124;&#124; busy) return; setBusy(true); setError(""); try { const response = await fetch(&#96;/api/friends/${selected.id}&#96;, { method: …</code> |
| [54:134](project/app/mypage/FriendManager.tsx#L54) | onClick | FriendManager | UI/라이브러리 이벤트 처리<br><code>window.dispatchEvent(new Event("open-notifications"))</code> |
| [57:233](project/app/mypage/FriendManager.tsx#L57) | onChange | FriendManager | UI/라이브러리 이벤트 처리<br><code>{ setHandle(event.target.value); setAddError(""); setAddStatus(""); }</code> |
| [61:89](project/app/mypage/FriendManager.tsx#L61) | onClick | FriendManager | UI/라이브러리 이벤트 처리<br><code>window.dispatchEvent(new Event("open-notifications"))</code> |
| [63:120](project/app/mypage/FriendManager.tsx#L63) | onChange | FriendManager | UI/라이브러리 이벤트 처리<br><code>setQuery(event.target.value)</code> |
| [64:67](project/app/mypage/FriendManager.tsx#L64) | filtered.map 콜백 #1 | FriendManager | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>&lt;article key={friend.id} className="friend-card"&gt; &lt;Link href={&#96;/blog/${friend.id}&#96;} className="friend-profile"&gt;&lt;Avatar src={friend.i …</code> |
| [67:123](project/app/mypage/FriendManager.tsx#L67) | onClick | filtered.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>window.dispatchEvent(new CustomEvent("open-chat", { detail: { userId: friend.id } }))</code> |
| [67:398](project/app/mypage/FriendManager.tsx#L67) | onClick | filtered.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>{ setSelected(friend); setError(""); }</code> |
| [69:39](project/app/mypage/FriendManager.tsx#L69) | onClose | FriendManager | UI/라이브러리 이벤트 처리<br><code>{ if (!busy) setSelected(null); }</code> |
| [69:378](project/app/mypage/FriendManager.tsx#L69) | onClick | FriendManager | UI/라이브러리 이벤트 처리<br><code>setSelected(null)</code> |
| [69:495](project/app/mypage/FriendManager.tsx#L69) | onClick | FriendManager | UI/라이브러리 이벤트 처리<br><code>void remove()</code> |

<a id="file-51"></a>

## project/app/mypage/LikedPosts.tsx

[원본 파일](project/app/mypage/LikedPosts.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [6:1](project/app/mypage/LikedPosts.tsx#L6) | LikedPosts | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const likes = await prisma.postLike.findMany({ where: { userId, post: await allVisiblePosts(userId) }, orderBy: { createdAt: "desc" }, include: { post: { …</code> |
| [8:208](project/app/mypage/LikedPosts.tsx#L8) | likes.map 콜백 #1 | LikedPosts | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>{ const doc = readDocument(post.content); return &lt;PostCard key={post.id} currentUserId={userId} views={post._count.views} post={{ ...post, createdAt: po …</code> |

<a id="file-52"></a>

## project/app/mypage/MyPageTabs.tsx

[원본 파일](project/app/mypage/MyPageTabs.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [29:1](project/app/mypage/MyPageTabs.tsx#L29) | MyPageTabs | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const [activeTab, setActiveTab] = useState&lt;TabType&gt;(initialTab === "friends" ? "friends" : initialTab === "likes" ? "likes" : initialTab === "posts …</code> |
| [37:86](project/app/mypage/MyPageTabs.tsx#L37) | categories.filter 콜백 #1 | MyPageTabs | 원소의 선택·검색·검사 조건 반환<br><code>!category.isDivider</code> |
| [44:19](project/app/mypage/MyPageTabs.tsx#L44) | tabs.map 콜백 #1 | MyPageTabs | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>( &lt;button key={tab.id} type="button" onClick={() =&gt; setActiveTab(tab.id)} aria-pressed={activeTab === tab.id} aria-controls="settings-panel"&gt; &lt; …</code> |
| [45:55](project/app/mypage/MyPageTabs.tsx#L45) | onClick | tabs.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>setActiveTab(tab.id)</code> |

<a id="file-53"></a>

## project/app/mypage/ProfileEditor.tsx

[원본 파일](project/app/mypage/ProfileEditor.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [18:1](project/app/mypage/ProfileEditor.tsx#L18) | ProfileEditor | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const router = useRouter(); // 기본 프로필 상태 const [name, setName] = useState(user.name &#124;&#124; ""); const [nickname, setNickname] = useState(user.nickn …</code> |
| [37:31](project/app/mypage/ProfileEditor.tsx#L37) | handleProfileSubmit | ProfileEditor | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ e.preventDefault(); setProfileStatus(null); const trimmedName = name.trim(); const trimmedNickname = nickname.trim(); if (!trimmedName &#124;&#124; !trim …</code> |
| [95:32](project/app/mypage/ProfileEditor.tsx#L95) | handlePasswordSubmit | ProfileEditor | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ e.preventDefault(); setPasswordStatus(null); if (newPassword.length &lt; 6) { setPasswordStatus({ type: "error", message: "새 비밀번호는 6자리 이상이어야 합니다." }); re …</code> |
| [207:27](project/app/mypage/ProfileEditor.tsx#L207) | onChange | ProfileEditor | UI/라이브러리 이벤트 처리<br><code>setName(e.target.value)</code> |
| [224:29](project/app/mypage/ProfileEditor.tsx#L224) | onChange | ProfileEditor | UI/라이브러리 이벤트 처리<br><code>setNickname(e.target.value)</code> |
| [243:25](project/app/mypage/ProfileEditor.tsx#L243) | onChange | ProfileEditor | UI/라이브러리 이벤트 처리<br><code>setBio(event.target.value)</code> |
| [314:25](project/app/mypage/ProfileEditor.tsx#L314) | onChange | ProfileEditor | UI/라이브러리 이벤트 처리<br><code>setCurrentPassword(e.target.value)</code> |
| [330:27](project/app/mypage/ProfileEditor.tsx#L330) | onChange | ProfileEditor | UI/라이브러리 이벤트 처리<br><code>setNewPassword(e.target.value)</code> |
| [345:27](project/app/mypage/ProfileEditor.tsx#L345) | onChange | ProfileEditor | UI/라이브러리 이벤트 처리<br><code>setConfirmPassword(e.target.value)</code> |

<a id="file-54"></a>

## project/app/mypage/TodoCalendar.tsx

[원본 파일](project/app/mypage/TodoCalendar.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [15:1](project/app/mypage/TodoCalendar.tsx#L15) | TodoCalendar | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const today = new Date(); const todayStr = formatDate(today); const [currentYear, setCurrentYear] = useState(today.getFullYear()); const [currentMonth, s …</code> |
| [34:34](project/app/mypage/TodoCalendar.tsx#L34) | fetchTodos | TodoCalendar | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ const version = ++requestVersion.current; return fetch(&#96;/api/todos?month=${monthStr}&#96;) .then(async (response) =&gt; { const data = await response …</code> |
| [37:13](project/app/mypage/TodoCalendar.tsx#L37) | fetch(&#96;/api/todos?month=${monthStr}&#96;) .then 콜백 #1 | fetchTodos | 앞 비동기 작업의 결과를 이어서 처리<br><code>{ const data = await response.json(); if (version !== requestVersion.current) return; setError(null); if (response.ok && data.todos) setTodos(data.todos);  …</code> |
| [44:14](project/app/mypage/TodoCalendar.tsx#L44) | fetch(&#96;/api/todos?month=${monthStr}&#96;) .then(async (response) =&gt; { const data = await response.json(); if (version !== requestVersion.current) return; setError(null); if (response. … | fetchTodos | 비동기 실패 처리<br><code>{ if (version === requestVersion.current) setError("서버와 연결하지 못했습니다."); }</code> |
| [47:16](project/app/mypage/TodoCalendar.tsx#L47) | fetch(&#96;/api/todos?month=${monthStr}&#96;) .then(async (response) =&gt; { const data = await response.json(); if (version !== requestVersion.current) return; setError(null); if (response. … | fetchTodos | 성공·실패 공통 종료 처리<br><code>{ if (version === requestVersion.current) setLoading(false); }</code> |
| [52:13](project/app/mypage/TodoCalendar.tsx#L52) | useEffect 콜백 #1 | TodoCalendar | 컴포넌트 상태·외부 이벤트·타이머 연결<br><code>{ void fetchTodos(); return () =&gt; { requestVersion.current += 1; }; }</code> |
| [54:12](project/app/mypage/TodoCalendar.tsx#L54) | 익명 함수 | useEffect 콜백 #1 | 반환 함수: 상위 함수가 실행 시점·호출자를 결정<br><code>{ requestVersion.current += 1; }</code> |
| [58:27](project/app/mypage/TodoCalendar.tsx#L58) | handlePrevMonth | TodoCalendar | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ setLoading(true); if (currentMonth === 0) { setCurrentYear((y) =&gt; y - 1); setCurrentMonth(11); } else { setCurrentMonth((m) =&gt; m - 1); } }</code> |
| [61:22](project/app/mypage/TodoCalendar.tsx#L61) | setCurrentYear 콜백 #1 | handlePrevMonth | 이전 React 상태를 받아 다음 상태 계산<br><code>y - 1</code> |
| [64:23](project/app/mypage/TodoCalendar.tsx#L64) | setCurrentMonth 콜백 #1 | handlePrevMonth | 이전 React 상태를 받아 다음 상태 계산<br><code>m - 1</code> |
| [68:27](project/app/mypage/TodoCalendar.tsx#L68) | handleNextMonth | TodoCalendar | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ setLoading(true); if (currentMonth === 11) { setCurrentYear((y) =&gt; y + 1); setCurrentMonth(0); } else { setCurrentMonth((m) =&gt; m + 1); } }</code> |
| [71:22](project/app/mypage/TodoCalendar.tsx#L71) | setCurrentYear 콜백 #1 | handleNextMonth | 이전 React 상태를 받아 다음 상태 계산<br><code>y + 1</code> |
| [74:23](project/app/mypage/TodoCalendar.tsx#L74) | setCurrentMonth 콜백 #1 | handleNextMonth | 이전 React 상태를 받아 다음 상태 계산<br><code>m + 1</code> |
| [78:25](project/app/mypage/TodoCalendar.tsx#L78) | handleGoToday | TodoCalendar | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ const now = new Date(); if (currentYear !== now.getFullYear() &#124;&#124; currentMonth !== now.getMonth()) setLoading(true); setCurrentYear(now.getFullY …</code> |
| [87:25](project/app/mypage/TodoCalendar.tsx#L87) | handleAddTodo | TodoCalendar | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ e.preventDefault(); if (!newTitle.trim()) return; setSubmitting(true); setError(null); try { const res = await fetch("/api/todos", { method: "POST", head …</code> |
| [108:18](project/app/mypage/TodoCalendar.tsx#L108) | setTodos 콜백 #1 | handleAddTodo | 이전 React 상태를 받아 다음 상태 계산<br><code>[...prev, data.todo]</code> |
| [120:28](project/app/mypage/TodoCalendar.tsx#L120) | handleToggleTodo | TodoCalendar | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ const updatedStatus = !todo.completed; // 낙관적 업데이트 setTodos((prev) =&gt; prev.map((t) =&gt; (t.id === todo.id ? { ...t, completed: updatedStatus } : t))  …</code> |
| [124:14](project/app/mypage/TodoCalendar.tsx#L124) | setTodos 콜백 #1 | handleToggleTodo | 이전 React 상태를 받아 다음 상태 계산<br><code>prev.map((t) =&gt; (t.id === todo.id ? { ...t, completed: updatedStatus } : t))</code> |
| [125:16](project/app/mypage/TodoCalendar.tsx#L125) | prev.map 콜백 #1 | setTodos 콜백 #1 | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>(t.id === todo.id ? { ...t, completed: updatedStatus } : t)</code> |
| [138:18](project/app/mypage/TodoCalendar.tsx#L138) | setTodos 콜백 #1 | handleToggleTodo | 이전 React 상태를 받아 다음 상태 계산<br><code>prev.map((t) =&gt; (t.id === todo.id ? { ...t, completed: !updatedStatus } : t))</code> |
| [139:20](project/app/mypage/TodoCalendar.tsx#L139) | prev.map 콜백 #1 | setTodos 콜백 #1 | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>(t.id === todo.id ? { ...t, completed: !updatedStatus } : t)</code> |
| [144:16](project/app/mypage/TodoCalendar.tsx#L144) | setTodos 콜백 #1 | handleToggleTodo | 이전 React 상태를 받아 다음 상태 계산<br><code>prev.map((t) =&gt; (t.id === todo.id ? { ...t, completed: !updatedStatus } : t))</code> |
| [145:18](project/app/mypage/TodoCalendar.tsx#L145) | prev.map 콜백 #1 | setTodos 콜백 #1 | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>(t.id === todo.id ? { ...t, completed: !updatedStatus } : t)</code> |
| [151:28](project/app/mypage/TodoCalendar.tsx#L151) | handleDeleteTodo | TodoCalendar | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ setTodos((prev) =&gt; prev.filter((t) =&gt; t.id !== id)); try { await fetch(&#96;/api/todos?id=${id}&#96;, { method: "DELETE", }); } catch (err) { conso …</code> |
| [152:14](project/app/mypage/TodoCalendar.tsx#L152) | setTodos 콜백 #1 | handleDeleteTodo | 이전 React 상태를 받아 다음 상태 계산<br><code>prev.filter((t) =&gt; t.id !== id)</code> |
| [152:36](project/app/mypage/TodoCalendar.tsx#L152) | prev.filter 콜백 #1 | setTodos 콜백 #1 | 원소의 선택·검색·검사 조건 반환<br><code>t.id !== id</code> |
| [205:42](project/app/mypage/TodoCalendar.tsx#L205) | todos.filter 콜백 #1 | TodoCalendar | 원소의 선택·검색·검사 조건 반환<br><code>t.date === selectedDate</code> |
| [206:59](project/app/mypage/TodoCalendar.tsx#L206) | selectedDateTodos.filter 콜백 #1 | TodoCalendar | 원소의 선택·검색·검사 조건 반환<br><code>t.completed</code> |
| [279:34](project/app/mypage/TodoCalendar.tsx#L279) | allCalendarDays.map 콜백 #1 | TodoCalendar | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>{ if (!cell.isCurrentMonth) { return ( &lt;div key={&#96;empty-${idx}&#96;} className="h-16 sm:h-20 rounded-xl p-1.5 sm:p-2 text-zinc-300 dark:text-zinc-70 …</code> |
| [294:46](project/app/mypage/TodoCalendar.tsx#L294) | todos.filter 콜백 #1 | allCalendarDays.map 콜백 #1 | 원소의 선택·검색·검사 조건 반환<br><code>t.date === cell.dateStr</code> |
| [295:54](project/app/mypage/TodoCalendar.tsx#L295) | cellTodos.filter 콜백 #1 | allCalendarDays.map 콜백 #1 | 원소의 선택·검색·검사 조건 반환<br><code>t.completed</code> |
| [301:28](project/app/mypage/TodoCalendar.tsx#L301) | onClick | allCalendarDays.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>setSelectedDate(cell.dateStr)</code> |
| [375:25](project/app/mypage/TodoCalendar.tsx#L375) | onChange | TodoCalendar | UI/라이브러리 이벤트 처리<br><code>setNewTitle(e.target.value)</code> |
| [395:37](project/app/mypage/TodoCalendar.tsx#L395) | selectedDateTodos.map 콜백 #1 | TodoCalendar | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>( &lt;div key={todo.id} className={&#96;p-3 rounded-xl border flex items-center justify-between gap-3 transition ${ todo.completed ? "bg-zinc-50 dark:bg-zi …</code> |
| [408:33](project/app/mypage/TodoCalendar.tsx#L408) | onChange | selectedDateTodos.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>handleToggleTodo(todo)</code> |
| [424:30](project/app/mypage/TodoCalendar.tsx#L424) | onClick | selectedDateTodos.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>handleDeleteTodo(todo.id)</code> |
| [449:1](project/app/mypage/TodoCalendar.tsx#L449) | formatDate | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const year = d.getFullYear(); const month = String(d.getMonth() + 1).padStart(2, "0"); const day = String(d.getDate()).padStart(2, "0"); return &#96;${ye …</code> |

<a id="file-55"></a>

## project/app/mypage/page.tsx

[원본 파일](project/app/mypage/page.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [11:1](project/app/mypage/page.tsx#L11) | MyPage | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const session = await auth(); if (!session?.user?.id) { redirect("/login"); } // 사용자 정보 상세 조회 const user = await prisma.user.findUnique({ where: { id: se …</code> |
| [52:35](project/app/mypage/page.tsx#L52) | friendships.map 콜백 #1 | MyPage | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>friendship.userId === user.id ? friendship.friend : friendship.user</code> |
| [95:41](project/app/mypage/page.tsx#L95) | user.categories.filter 콜백 #1 | MyPage | 원소의 선택·검색·검사 조건 반환<br><code>!category.isDivider</code> |

<a id="file-56"></a>

## project/app/page.tsx

[원본 파일](project/app/page.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [11:1](project/app/page.tsx#L11) | HomePage | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const session = await auth(); const currentUserId = session?.user?.id; const user = currentUserId ? await prisma.user.findUnique({ where: { id: currentUs …</code> |
| [27:33](project/app/page.tsx#L27) | friendships.map 콜백 #1 | HomePage | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>f.userId === currentUserId ? f.friendId : f.userId</code> |
| [100:26](project/app/page.tsx#L100) | posts.map 콜백 #1 | HomePage | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>{ const doc = readDocument(post.content); const images = doc ? imageSources(doc) : []; const thumbnail = images.length &gt; 0 ? images[0] : null; return (  …</code> |

<a id="file-57"></a>

## project/app/posts/[id]/edit/page.tsx

[원본 파일](project/app/posts/%5Bid%5D/edit/page.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [6:1](project/app/posts/%5Bid%5D/edit/page.tsx#L6) | EditPostPage | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const session = await auth(); if (!session?.user?.id) redirect("/login"); const { id } = await params; const post = await prisma.post.findFirst({ where:  …</code> |

<a id="file-58"></a>

## project/app/posts/[id]/page.tsx

[원본 파일](project/app/posts/%5Bid%5D/page.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [7:1](project/app/posts/%5Bid%5D/page.tsx#L7) | PostPage | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const { id } = await params; const session = await auth(); const post = await prisma.post.findUnique({ where: { id }, select: { authorId: true } }); if ( …</code> |
| [13:33](project/app/posts/%5Bid%5D/page.tsx#L13) | data.posts.some 콜백 #1 | PostPage | 원소의 선택·검색·검사 조건 반환<br><code>post.id === id</code> |

<a id="file-59"></a>

## project/app/signup/page.tsx

[원본 파일](project/app/signup/page.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [12:1](project/app/signup/page.tsx#L12) | SignupPage | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const [state, formAction, isPending] = useActionState(signUpAction, null); const [resendStatus, setResendStatus] = useState&lt;string &#124; null&gt;(nul …</code> |
| [76:28](project/app/signup/page.tsx#L76) | onClick | SignupPage | UI/라이브러리 이벤트 처리<br><code>{ setIsResending(true); setResendStatus("인증 메일을 재발송하는 중..."); const res = await resendVerificationEmailAction(state.email!); if (res.error) { setResendStat …</code> |

<a id="file-60"></a>

## project/app/verify-email/page.tsx

[원본 파일](project/app/verify-email/page.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [10:1](project/app/verify-email/page.tsx#L10) | VerifyEmailPage | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const { token } = await searchParams; if (!token) { return ( &lt;main className="verify-page"&gt; &lt;div className="auth-card text-center"&gt; &lt;div c …</code> |

<a id="file-61"></a>

## project/app/write/EditorToolbar.tsx

[원본 파일](project/app/write/EditorToolbar.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [25:1](project/app/write/EditorToolbar.tsx#L25) | EditorToolbar | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ function tool(label: string, text: React.ReactNode, action: () =&gt; void, active = false, disabled = false) { return &lt;button type="button" title={lab …</code> |
| [26:3](project/app/write/EditorToolbar.tsx#L26) | tool | EditorToolbar | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ return &lt;button type="button" title={label} aria-label={label} aria-pressed={active} disabled={!editor &#124;&#124; disabled} onMouseDown={(event) =&gt …</code> |
| [27:133](project/app/write/EditorToolbar.tsx#L27) | onMouseDown | tool | UI/라이브러리 이벤트 처리<br><code>event.preventDefault()</code> |
| [32:236](project/app/write/EditorToolbar.tsx#L32) | onChange | EditorToolbar | UI/라이브러리 이벤트 처리<br><code>{ if (event.target.value === "paragraph") editor?.chain().focus().setParagraph().run(); else editor?.chain().focus().toggleHeading({ level: Number(event.ta …</code> |
| [38:123](project/app/write/EditorToolbar.tsx#L38) | onChange | EditorToolbar | UI/라이브러리 이벤트 처리<br><code>{ if (event.target.value) editor?.chain().focus().setFontSize(event.target.value).run(); else editor?.chain().focus().unsetFontSize().run(); }</code> |
| [38:325](project/app/write/EditorToolbar.tsx#L38) | FONT_SIZES.map 콜백 #1 | EditorToolbar | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>&lt;option key={size} value={size}&gt;{size.replace("px", "")} px&lt;/option&gt;</code> |
| [39:121](project/app/write/EditorToolbar.tsx#L39) | onChange | EditorToolbar | UI/라이브러리 이벤트 처리<br><code>{ if (event.target.value) editor?.chain().focus().setHighlight({ color: event.target.value }).run(); else editor?.chain().focus().unsetHighlight().run(); }</code> |
| [39:343](project/app/write/EditorToolbar.tsx#L39) | HIGHLIGHT_COLORS.map 콜백 #1 | EditorToolbar | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>&lt;option key={color} value={color}&gt;{HIGHLIGHT_NAMES[color] &#124;&#124; color}&lt;/option&gt;</code> |
| [42:40](project/app/write/EditorToolbar.tsx#L42) | tool 콜백 #3 | EditorToolbar | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>editor?.chain().focus().toggleBold().run()</code> |
| [43:41](project/app/write/EditorToolbar.tsx#L43) | tool 콜백 #3 | EditorToolbar | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>editor?.chain().focus().toggleItalic().run()</code> |
| [44:40](project/app/write/EditorToolbar.tsx#L44) | tool 콜백 #3 | EditorToolbar | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>editor?.chain().focus().toggleUnderline().run()</code> |
| [45:32](project/app/write/EditorToolbar.tsx#L45) | tool 콜백 #3 | EditorToolbar | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>editor?.chain().focus().toggleStrike().run()</code> |
| [48:53](project/app/write/EditorToolbar.tsx#L48) | (["left", "center", "right"] as const).map 콜백 #1 | EditorToolbar | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>&lt;button type="button" key={align} title={{ left: "왼쪽 정렬", center: "가운데 정렬", right: "오른쪽 정렬" }[align]} aria-label={{ left: "왼쪽 정렬", center: "가운데 정렬", rig …</code> |
| [48:334](project/app/write/EditorToolbar.tsx#L48) | onMouseDown | (["left", "center", "right"] as const).map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>event.preventDefault()</code> |
| [48:378](project/app/write/EditorToolbar.tsx#L48) | onClick | (["left", "center", "right"] as const).map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>editor?.chain().focus().setTextAlign(align).run()</code> |
| [51:196](project/app/write/EditorToolbar.tsx#L51) | tool 콜백 #3 | EditorToolbar | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>editor?.chain().focus().toggleBulletList().run()</code> |
| [52:63](project/app/write/EditorToolbar.tsx#L52) | tool 콜백 #3 | EditorToolbar | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>editor?.chain().focus().toggleOrderedList().run()</code> |
| [53:57](project/app/write/EditorToolbar.tsx#L53) | tool 콜백 #3 | EditorToolbar | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>editor?.chain().focus().toggleBlockquote().run()</code> |
| [54:69](project/app/write/EditorToolbar.tsx#L54) | tool 콜백 #3 | EditorToolbar | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>editor?.chain().focus().toggleCodeBlock().run()</code> |
| [55:38](project/app/write/EditorToolbar.tsx#L55) | tool 콜백 #3 | EditorToolbar | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>editor?.chain().focus().setHorizontalRule().run()</code> |
| [62:49](project/app/write/EditorToolbar.tsx#L62) | tool 콜백 #3 | EditorToolbar | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>editor?.chain().focus().undo().run()</code> |
| [63:55](project/app/write/EditorToolbar.tsx#L63) | tool 콜백 #3 | EditorToolbar | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>editor?.chain().focus().redo().run()</code> |

<a id="file-62"></a>

## project/app/write/ImageGroup.tsx

[원본 파일](project/app/write/ImageGroup.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [8:1](project/app/write/ImageGroup.tsx#L8) | ImageGroupView | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const containerRef = useRef&lt;HTMLDivElement&gt;(null); const row = useRef&lt;HTMLDivElement&gt;(null); const [draft, setDraft] = useState&lt;number[] & …</code> |
| [16:58](project/app/write/ImageGroup.tsx#L16) | Array.from 콜백 #2 | ImageGroupView | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>node.child(i).toJSON()</code> |
| [22:41](project/app/write/ImageGroup.tsx#L22) | handlePointerDown | ImageGroupView | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>(e: React.PointerEvent) =&gt; { e.preventDefault(); e.stopPropagation(); const box = containerRef.current; if (!box) return; const startX = e.clientX; cons …</code> |
| [22:74](project/app/write/ImageGroup.tsx#L22) | 익명 함수 | handlePointerDown | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ e.preventDefault(); e.stopPropagation(); const box = containerRef.current; if (!box) return; const startX = e.clientX; const startWidth = box.getBounding …</code> |
| [39:27](project/app/write/ImageGroup.tsx#L39) | onPointerMove | 익명 함수 | UI/라이브러리 이벤트 처리<br><code>{ moveEvent.preventDefault(); const deltaX = moveEvent.clientX - startX; const change = direction === "right" ? deltaX * 2 : -deltaX * 2; const targetWidth …</code> |
| [49:25](project/app/write/ImageGroup.tsx#L49) | onPointerUp | 익명 함수 | UI/라이브러리 이벤트 처리<br><code>{ window.removeEventListener("pointermove", onPointerMove); window.removeEventListener("pointerup", onPointerUp); setIsResizing(false); if (activePercentRe …</code> |
| [64:33](project/app/write/ImageGroup.tsx#L64) | setPreset | ImageGroupView | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ updateAttributes({ width: &#96;${percent}%&#96; }); }</code> |
| [68:3](project/app/write/ImageGroup.tsx#L68) | replace | ImageGroupView | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const pos = getPos(); if (typeof pos !== "number") return; editor.chain().focus().insertContentAt({ from: pos, to: pos + node.nodeSize }, content.length  …</code> |
| [73:3](project/app/write/ImageGroup.tsx#L73) | resize | ImageGroupView | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const next = [...base]; const total = base[index] + base[index + 1]; next[index] = Math.max(15, Math.min(total - 15, base[index] + delta)); next[index +  …</code> |
| [99:98](project/app/write/ImageGroup.tsx#L99) | onClick | ImageGroupView | UI/라이브러리 이벤트 처리<br><code>updateAttributes({ mode: "fill" })</code> |
| [100:101](project/app/write/ImageGroup.tsx#L100) | onClick | ImageGroupView | UI/라이브러리 이벤트 처리<br><code>updateAttributes({ mode: "natural" })</code> |
| [106:109](project/app/write/ImageGroup.tsx#L106) | onMouseDown | ImageGroupView | UI/라이브러리 이벤트 처리<br><code>e.preventDefault()</code> |
| [106:143](project/app/write/ImageGroup.tsx#L106) | onClick | ImageGroupView | UI/라이브러리 이벤트 처리<br><code>setPreset(25)</code> |
| [107:109](project/app/write/ImageGroup.tsx#L107) | onMouseDown | ImageGroupView | UI/라이브러리 이벤트 처리<br><code>e.preventDefault()</code> |
| [107:143](project/app/write/ImageGroup.tsx#L107) | onClick | ImageGroupView | UI/라이브러리 이벤트 처리<br><code>setPreset(50)</code> |
| [108:109](project/app/write/ImageGroup.tsx#L108) | onMouseDown | ImageGroupView | UI/라이브러리 이벤트 처리<br><code>e.preventDefault()</code> |
| [108:143](project/app/write/ImageGroup.tsx#L108) | onClick | ImageGroupView | UI/라이브러리 이벤트 처리<br><code>setPreset(75)</code> |
| [109:110](project/app/write/ImageGroup.tsx#L109) | onMouseDown | ImageGroupView | UI/라이브러리 이벤트 처리<br><code>e.preventDefault()</code> |
| [109:144](project/app/write/ImageGroup.tsx#L109) | onClick | ImageGroupView | UI/라이브러리 이벤트 처리<br><code>setPreset(100)</code> |
| [111:38](project/app/write/ImageGroup.tsx#L111) | onClick | ImageGroupView | UI/라이브러리 이벤트 처리<br><code>updateAttributes({ widths: null })</code> |
| [112:38](project/app/write/ImageGroup.tsx#L112) | onClick | ImageGroupView | UI/라이브러리 이벤트 처리<br><code>{ const pos = getPos(); if (typeof pos === "number") editor.chain().focus().insertContentAt({ from: pos, to: pos + node.nodeSize }, images).run(); }</code> |
| [116:60](project/app/write/ImageGroup.tsx#L116) | onClick | ImageGroupView | UI/라이브러리 이벤트 처리<br><code>{ const pos = getPos(); if (typeof pos !== "number") return; const next = editor.state.doc.nodeAt(pos + node.nodeSize); if (next?.type.name === "image") ed …</code> |
| [128:153](project/app/write/ImageGroup.tsx#L128) | widths.map 콜백 #1 | ImageGroupView | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>&#96;${w}fr&#96;</code> |
| [129:21](project/app/write/ImageGroup.tsx#L129) | images.map 콜백 #1 | ImageGroupView | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>&lt;div className="image-group-cell" key={index}&gt; {/* eslint-disable-next-line @next/next/no-img-element */} &lt;img src={img.attrs?.src} alt={img.attrs …</code> |
| [133:104](project/app/write/ImageGroup.tsx#L133) | onClick | images.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>{ const copy = [...images]; [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]]; replace(copy); }</code> |
| [134:119](project/app/write/ImageGroup.tsx#L134) | onClick | images.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>{ const copy = [...images]; [copy[index + 1], copy[index]] = [copy[index], copy[index + 1]]; replace(copy); }</code> |
| [135:44](project/app/write/ImageGroup.tsx#L135) | onClick | images.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>replace(images.filter((_, i) =&gt; i !== index))</code> |
| [135:72](project/app/write/ImageGroup.tsx#L135) | images.filter 콜백 #1 | onClick | 원소의 선택·검색·검사 조건 반환<br><code>i !== index</code> |
| [136:44](project/app/write/ImageGroup.tsx#L136) | onClick | images.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>{ const pos = getPos(); if (typeof pos !== "number") return; const remaining = images.filter((_, i) =&gt; i !== index); editor.chain().focus().insertConten …</code> |
| [139:47](project/app/write/ImageGroup.tsx#L139) | images.filter 콜백 #1 | onClick | 원소의 선택·검색·검사 조건 반환<br><code>i !== index</code> |
| [144:24](project/app/write/ImageGroup.tsx#L144) | onKeyDown | images.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>{ if (["ArrowLeft", "ArrowRight"].includes(event.key)) { event.preventDefault(); updateAttributes({ widths: resize(index, event.key === "ArrowLeft" ? -2 :  …</code> |
| [145:28](project/app/write/ImageGroup.tsx#L145) | onPointerDown | images.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>{ event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId); const start = event.clientX; const base = [...widths]; const available =  …</code> |
| [147:28](project/app/write/ImageGroup.tsx#L147) | move | onPointerDown | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ latest = resize(index, (e.clientX - start) / available * 100, base); setDraft(latest); }</code> |
| [148:30](project/app/write/ImageGroup.tsx#L148) | finish | onPointerDown | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ target.removeEventListener("pointermove", move); target.removeEventListener("pointerup", finish); target.removeEventListener("pointercancel", finish); up …</code> |
| [158:24](project/app/write/ImageGroup.tsx#L158) | onDoubleClick | ImageGroupView | UI/라이브러리 이벤트 처리<br><code>setPreset(100)</code> |
| [166:24](project/app/write/ImageGroup.tsx#L166) | onDoubleClick | ImageGroupView | UI/라이브러리 이벤트 처리<br><code>setPreset(100)</code> |
| [182:3](project/app/write/ImageGroup.tsx#L182) | addAttributes | 모듈 최상위 | 객체·클래스 메서드: 해당 API/확장 동작 구현<br><code>{ return { widths: { default: null, parseHTML: element =&gt; element.getAttribute("data-widths"), renderHTML: attrs =&gt; ({ "data-widths": attrs.widths }) …</code> |
| [184:43](project/app/write/ImageGroup.tsx#L184) | parseHTML | addAttributes | HTML에서 편집기 노드·속성 읽기<br><code>element.getAttribute("data-widths")</code> |
| [184:103](project/app/write/ImageGroup.tsx#L184) | renderHTML | addAttributes | 편집기 노드·속성을 HTML 표현으로 변환<br><code>({ "data-widths": attrs.widths })</code> |
| [185:43](project/app/write/ImageGroup.tsx#L185) | parseHTML | addAttributes | HTML에서 편집기 노드·속성 읽기<br><code>element.getAttribute("data-mode") &#124;&#124; "fill"</code> |
| [185:111](project/app/write/ImageGroup.tsx#L185) | renderHTML | addAttributes | 편집기 노드·속성을 HTML 표현으로 변환<br><code>({ "data-mode": attrs.mode &#124;&#124; "fill" })</code> |
| [186:44](project/app/write/ImageGroup.tsx#L186) | parseHTML | addAttributes | HTML에서 편집기 노드·속성 읽기<br><code>element.getAttribute("data-width") &#124;&#124; "100%"</code> |
| [186:113](project/app/write/ImageGroup.tsx#L186) | renderHTML | addAttributes | 편집기 노드·속성을 HTML 표현으로 변환<br><code>({ "data-width": attrs.width &#124;&#124; "100%" })</code> |
| [189:3](project/app/write/ImageGroup.tsx#L189) | parseHTML | 모듈 최상위 | HTML에서 편집기 노드·속성 읽기<br><code>{ return [{ tag: 'div[data-image-group]' }]; }</code> |
| [190:3](project/app/write/ImageGroup.tsx#L190) | renderHTML | 모듈 최상위 | 편집기 노드·속성을 HTML 표현으로 변환<br><code>{ return ["div", mergeAttributes(HTMLAttributes, { "data-image-group": "" }), 0]; }</code> |
| [191:3](project/app/write/ImageGroup.tsx#L191) | addNodeView | 모듈 최상위 | 객체·클래스 메서드: 해당 API/확장 동작 구현<br><code>{ return ReactNodeViewRenderer(ImageGroupView); }</code> |

<a id="file-63"></a>

## project/app/write/ImageUpload.ts

[원본 파일](project/app/write/ImageUpload.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [8:3](project/app/write/ImageUpload.ts#L8) | addProseMirrorPlugins | 모듈 최상위 | 객체·클래스 메서드: 해당 API/확장 동작 구현<br><code>{ return [new Plugin({ key: uploadKey, state: { init: () =&gt; DecorationSet.empty, apply(tr, previous) { let decorations = previous.map(tr.mapping, tr.doc …</code> |
| [10:13](project/app/write/ImageUpload.ts#L10) | init | addProseMirrorPlugins | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>DecorationSet.empty</code> |
| [11:7](project/app/write/ImageUpload.ts#L11) | apply | addProseMirrorPlugins | 객체·클래스 메서드: 해당 API/확장 동작 구현<br><code>{ let decorations = previous.map(tr.mapping, tr.doc); const action = tr.getMeta(uploadKey); if (action?.add) decorations = decorations.add(tr.doc, [Decorat …</code> |
| [14:95](project/app/write/ImageUpload.ts#L14) | Decoration.widget 콜백 #2 | apply | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ const element = document.createElement("span"); element.className = "image-upload-progress"; element.textContent = "이미지 업로드 중…"; element.setAttribute("ro …</code> |
| [17:101](project/app/write/ImageUpload.ts#L17) | decorations.find 콜백 #3 | apply | 원소의 선택·검색·검사 조건 반환<br><code>spec.id === action.id</code> |
| [20:30](project/app/write/ImageUpload.ts#L20) | decorations | addProseMirrorPlugins | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>uploadKey.getState(state)</code> |

<a id="file-64"></a>

## project/app/write/ResizableImage.tsx

[원본 파일](project/app/write/ResizableImage.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [7:1](project/app/write/ResizableImage.tsx#L7) | ResizableImageComponent | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const containerRef = useRef&lt;HTMLDivElement&gt;(null); const imgRef = useRef&lt;HTMLImageElement&gt;(null); const [isResizing, setIsResizing] = useStat …</code> |
| [17:41](project/app/write/ResizableImage.tsx#L17) | handlePointerDown | ResizableImageComponent | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>(e: React.PointerEvent) =&gt; { e.preventDefault(); e.stopPropagation(); const img = imgRef.current; if (!img) return; const startX = e.clientX; const star …</code> |
| [17:74](project/app/write/ResizableImage.tsx#L17) | 익명 함수 | handlePointerDown | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ e.preventDefault(); e.stopPropagation(); const img = imgRef.current; if (!img) return; const startX = e.clientX; const startWidth = img.getBoundingClient …</code> |
| [34:27](project/app/write/ResizableImage.tsx#L34) | onPointerMove | 익명 함수 | UI/라이브러리 이벤트 처리<br><code>{ moveEvent.preventDefault(); const deltaX = moveEvent.clientX - startX; const change = direction === "right" ? deltaX * 2 : -deltaX * 2; const targetWidth …</code> |
| [44:25](project/app/write/ResizableImage.tsx#L44) | onPointerUp | 익명 함수 | UI/라이브러리 이벤트 처리<br><code>{ window.removeEventListener("pointermove", onPointerMove); window.removeEventListener("pointerup", onPointerUp); setIsResizing(false); if (activePercentRe …</code> |
| [59:33](project/app/write/ResizableImage.tsx#L59) | setPreset | ResizableImageComponent | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ updateAttributes({ width: &#96;${percent}%&#96; }); }</code> |
| [85:30](project/app/write/ResizableImage.tsx#L85) | onDoubleClick | ResizableImageComponent | UI/라이브러리 이벤트 처리<br><code>setPreset(100)</code> |
| [93:30](project/app/write/ResizableImage.tsx#L93) | onDoubleClick | ResizableImageComponent | UI/라이브러리 이벤트 처리<br><code>setPreset(100)</code> |
| [99:73](project/app/write/ResizableImage.tsx#L99) | onMouseDown | ResizableImageComponent | UI/라이브러리 이벤트 처리<br><code>e.preventDefault()</code> |
| [99:107](project/app/write/ResizableImage.tsx#L99) | onClick | ResizableImageComponent | UI/라이브러리 이벤트 처리<br><code>{ const pos = getPos(); if (typeof pos !== "number") return; const next = editor.state.doc.nodeAt(pos + node.nodeSize); if (next?.type.name === "image") ed …</code> |
| [104:29](project/app/write/ResizableImage.tsx#L104) | 익명 함수 | ResizableImageComponent | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ const pos = getPos(); return typeof pos !== "number" &#124;&#124; editor.state.doc.nodeAt(pos + node.nodeSize)?.type.name !== "image"; }</code> |
| [125:30](project/app/write/ResizableImage.tsx#L125) | onMouseDown | ResizableImageComponent | UI/라이브러리 이벤트 처리<br><code>e.preventDefault()</code> |
| [126:26](project/app/write/ResizableImage.tsx#L126) | onClick | ResizableImageComponent | UI/라이브러리 이벤트 처리<br><code>setPreset(25)</code> |
| [133:30](project/app/write/ResizableImage.tsx#L133) | onMouseDown | ResizableImageComponent | UI/라이브러리 이벤트 처리<br><code>e.preventDefault()</code> |
| [134:26](project/app/write/ResizableImage.tsx#L134) | onClick | ResizableImageComponent | UI/라이브러리 이벤트 처리<br><code>setPreset(50)</code> |
| [141:30](project/app/write/ResizableImage.tsx#L141) | onMouseDown | ResizableImageComponent | UI/라이브러리 이벤트 처리<br><code>e.preventDefault()</code> |
| [142:26](project/app/write/ResizableImage.tsx#L142) | onClick | ResizableImageComponent | UI/라이브러리 이벤트 처리<br><code>setPreset(75)</code> |
| [149:30](project/app/write/ResizableImage.tsx#L149) | onMouseDown | ResizableImageComponent | UI/라이브러리 이벤트 처리<br><code>e.preventDefault()</code> |
| [150:26](project/app/write/ResizableImage.tsx#L150) | onClick | ResizableImageComponent | UI/라이브러리 이벤트 처리<br><code>setPreset(100)</code> |
| [159:30](project/app/write/ResizableImage.tsx#L159) | onMouseDown | ResizableImageComponent | UI/라이브러리 이벤트 처리<br><code>e.preventDefault()</code> |
| [160:26](project/app/write/ResizableImage.tsx#L160) | onClick | ResizableImageComponent | UI/라이브러리 이벤트 처리<br><code>deleteNode()</code> |
| [180:3](project/app/write/ResizableImage.tsx#L180) | addAttributes | 모듈 최상위 | 객체·클래스 메서드: 해당 API/확장 동작 구현<br><code>{ return { ...this.parent?.(), width: { default: "100%", parseHTML: (element) =&gt; element.style.width &#124;&#124; element.getAttribute("width") &#124;&# …</code> |
| [185:20](project/app/write/ResizableImage.tsx#L185) | parseHTML | addAttributes | HTML에서 편집기 노드·속성 읽기<br><code>element.style.width &#124;&#124; element.getAttribute("width") &#124;&#124; "100%"</code> |
| [186:21](project/app/write/ResizableImage.tsx#L186) | renderHTML | addAttributes | 편집기 노드·속성을 HTML 표현으로 변환<br><code>{ const width = attributes.width &#124;&#124; "100%"; return { style: &#96;width: ${width}&#96;, width, }; }</code> |
| [196:3](project/app/write/ResizableImage.tsx#L196) | addNodeView | 모듈 최상위 | 객체·클래스 메서드: 해당 API/확장 동작 구현<br><code>{ return ReactNodeViewRenderer(ResizableImageComponent); }</code> |

<a id="file-65"></a>

## project/app/write/TagInput.tsx

[원본 파일](project/app/write/TagInput.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [3:1](project/app/write/TagInput.tsx#L3) | TagInput | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const [value, setValue] = useState(""); const [error, setError] = useState(""); function add() { const tag = value.trim().replace(/^#+/, ""); if (!tag) r …</code> |
| [6:3](project/app/write/TagInput.tsx#L6) | add | TagInput | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const tag = value.trim().replace(/^#+/, ""); if (!tag) return; if (tag.length &gt; 24 &#124;&#124; tags.length &gt;= 10) { setError("태그는 24자 이내로 최대 10개까지 …</code> |
| [12:75](project/app/write/TagInput.tsx#L12) | tags.map 콜백 #1 | TagInput | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>&lt;button type="button" disabled={disabled} key={tag} onClick={() =&gt; onChange(tags.filter((item) =&gt; item !== tag))} aria-label={tag + " 태그 삭제"}&gt;# …</code> |
| [12:145](project/app/write/TagInput.tsx#L12) | onClick | tags.map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>onChange(tags.filter((item) =&gt; item !== tag))</code> |
| [12:172](project/app/write/TagInput.tsx#L12) | tags.filter 콜백 #1 | onClick | 원소의 선택·검색·검사 조건 반환<br><code>item !== tag</code> |
| [12:420](project/app/write/TagInput.tsx#L12) | onChange | TagInput | UI/라이브러리 이벤트 처리<br><code>{ setValue(event.target.value); setError(""); }</code> |
| [12:504](project/app/write/TagInput.tsx#L12) | onKeyDown | TagInput | UI/라이브러리 이벤트 처리<br><code>{ if (!event.nativeEvent.isComposing && (event.key === "Enter" &#124;&#124; event.key === ",")) { event.preventDefault(); add(); } }</code> |

<a id="file-66"></a>

## project/app/write/WriteForm.tsx

[원본 파일](project/app/write/WriteForm.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [28:1](project/app/write/WriteForm.tsx#L28) | WriteForm | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const router = useRouter(); const draftKey = initialPost?.id &#124;&#124; "new"; const storageKey = &#96;developer-blog-draft:${userId}${initialPost ? ": …</code> |
| [32:138](project/app/write/WriteForm.tsx#L32) | initialPost.content.split("\n").map 콜백 #1 | WriteForm | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>({ type: "paragraph", content: text ? [{ type: "text", text }] : [] })</code> |
| [57:55](project/app/write/WriteForm.tsx#L57) | useRef 콜백 #1 | WriteForm | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{}</code> |
| [78:33](project/app/write/WriteForm.tsx#L78) | handlePaste | WriteForm | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ const files = Array.from(event.clipboardData?.items &#124;&#124; []).filter(item =&gt; item.kind === "file" && item.type.startsWith("image/")).map(item = …</code> |
| [79:73](project/app/write/WriteForm.tsx#L79) | Array.from(event.clipboardData?.items &#124;&#124; []).filter 콜백 #1 | handlePaste | 원소의 선택·검색·검사 조건 반환<br><code>item.kind === "file" && item.type.startsWith("image/")</code> |
| [79:141](project/app/write/WriteForm.tsx#L79) | Array.from(event.clipboardData?.items &#124;&#124; []).filter(item =&gt; item.kind === "file" && item.type.startsWith("image/")).map 콜백 #1 | handlePaste | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>item.getAsFile()</code> |
| [79:174](project/app/write/WriteForm.tsx#L79) | Array.from(event.clipboardData?.items &#124;&#124; []).filter(item =&gt; item.kind === "file" && item.type.startsWith("image/")).map(item =&gt; item.getAsFile()).filter 콜백 #1 | handlePaste | 원소의 선택·검색·검사 조건 반환<br><code>!!file</code> |
| [83:15](project/app/write/WriteForm.tsx#L83) | onUpdate | WriteForm | UI/라이브러리 이벤트 처리<br><code>{ dirty.current = true; revisionRef.current += 1; setRevision((value) =&gt; value + 1); }</code> |
| [83:83](project/app/write/WriteForm.tsx#L83) | setRevision 콜백 #1 | onUpdate | 이전 React 상태를 받아 다음 상태 계산<br><code>value + 1</code> |
| [86:58](project/app/write/WriteForm.tsx#L86) | selector | WriteForm | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>({ transaction: editor?.state, count: editor?.getText().length &#124;&#124; 0 })</code> |
| [88:13](project/app/write/WriteForm.tsx#L88) | useEffect 콜백 #1 | WriteForm | 컴포넌트 상태·외부 이벤트·타이머 연결<br><code>{ let cancelled = false; fetch(&#96;/api/drafts?key=${encodeURIComponent(draftKey)}&#96;, { cache: "no-store" }) .then(async (response) =&gt; { const resul …</code> |
| [91:13](project/app/write/WriteForm.tsx#L91) | fetch(&#96;/api/drafts?key=${encodeURIComponent(draftKey)}&#96;, { cache: "no-store" }) .then 콜백 #1 | useEffect 콜백 #1 | 앞 비동기 작업의 결과를 이어서 처리<br><code>{ const result = await response.json(); if (!response.ok) throw new Error(result.error &#124;&#124; "서버 임시 글을 불러오지 못했습니다."); if (cancelled) return; const d …</code> |
| [117:14](project/app/write/WriteForm.tsx#L117) | fetch(&#96;/api/drafts?key=${encodeURIComponent(draftKey)}&#96;, { cache: "no-store" }) .then(async (response) =&gt; { const result = await response.json(); if (!response.ok) throw new Error … | useEffect 콜백 #1 | 비동기 실패 처리<br><code>{ if (!cancelled) { setError(error.message); setDraftMessage("서버 임시저장을 불러오지 못했습니다. 새로고침해주세요."); } }</code> |
| [118:12](project/app/write/WriteForm.tsx#L118) | 익명 함수 | useEffect 콜백 #1 | 반환 함수: 상위 함수가 실행 시점·호출자를 결정<br><code>{ cancelled = true; }</code> |
| [121:33](project/app/write/WriteForm.tsx#L121) | saveDraft | WriteForm | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ if (!editor &#124;&#124; !draftReady &#124;&#124; storedDraft &#124;&#124; published.current &#124;&#124; savingPaused.current &#124;&#124; draftConflict …</code> |
| [126:52](project/app/write/WriteForm.tsx#L126) | pendingSave.current.then 콜백 #1 | saveDraft | 앞 비동기 작업의 결과를 이어서 처리<br><code>{ if (published.current &#124;&#124; draftConflict.current) return false; setDraftMessage("서버에 임시저장 중..."); try { const response = await fetch("/api/drafts …</code> |
| [142:13](project/app/write/WriteForm.tsx#L142) | useEffect 콜백 #1 | WriteForm | 컴포넌트 상태·외부 이벤트·타이머 연결<br><code>{ if (!dirty.current &#124;&#124; storedDraft &#124;&#124; !draftReady) return; const timer = window.setTimeout(() =&gt; void saveDraft(), 1200); return () …</code> |
| [144:37](project/app/write/WriteForm.tsx#L144) | window.setTimeout 콜백 #1 | useEffect 콜백 #1 | 예약 시점에 작업 수행<br><code>void saveDraft()</code> |
| [145:12](project/app/write/WriteForm.tsx#L145) | 익명 함수 | useEffect 콜백 #1 | 반환 함수: 상위 함수가 실행 시점·호출자를 결정<br><code>window.clearTimeout(timer)</code> |
| [148:13](project/app/write/WriteForm.tsx#L148) | useEffect 콜백 #1 | WriteForm | 컴포넌트 상태·외부 이벤트·타이머 연결<br><code>{ const warn = (event: BeforeUnloadEvent) =&gt; { if ((dirty.current &#124;&#124; uploadBusy.current) && !published.current) { event.preventDefault(); even …</code> |
| [149:18](project/app/write/WriteForm.tsx#L149) | warn | useEffect 콜백 #1 | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ if ((dirty.current &#124;&#124; uploadBusy.current) && !published.current) { event.preventDefault(); event.returnValue = ""; } }</code> |
| [153:12](project/app/write/WriteForm.tsx#L153) | 익명 함수 | useEffect 콜백 #1 | 반환 함수: 상위 함수가 실행 시점·호출자를 결정<br><code>window.removeEventListener("beforeunload", warn)</code> |
| [156:3](project/app/write/WriteForm.tsx#L156) | changed | WriteForm | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ dirty.current = true; revisionRef.current += 1; setRevision((value) =&gt; value + 1); }</code> |
| [156:84](project/app/write/WriteForm.tsx#L156) | setRevision 콜백 #1 | changed | 이전 React 상태를 받아 다음 상태 계산<br><code>value + 1</code> |
| [157:3](project/app/write/WriteForm.tsx#L157) | restoreDraft | WriteForm | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (!storedDraft &#124;&#124; !editor) return; setTitle(storedDraft.title); setTags(storedDraft.tags &#124;&#124; []); setCategoryId(categories.some((cat …</code> |
| [161:35](project/app/write/WriteForm.tsx#L161) | categories.some 콜백 #1 | restoreDraft | 원소의 선택·검색·검사 조건 반환<br><code>category.id === storedDraft.categoryId && !category.isDivider</code> |
| [170:3](project/app/write/WriteForm.tsx#L170) | discardDraft | WriteForm | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const confirmMessage = initialPost ? "임시 저장된 수정 내용을 삭제하고 수정 전 원래 글로 되돌릴까요?" : "작성 중이던 임시 글을 삭제할까요? 임시로 적었던 글이 제거되고 빈 글에서 새로 시작합니다."; if (!window.confirm( …</code> |
| [195:3](project/app/write/WriteForm.tsx#L195) | openInsert | WriteForm | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ setInsertUrl(mode === "link" ? editor?.getAttributes("link").href &#124;&#124; "" : ""); setImageAlt(""); setInsertError(null); setInsertMode(mode); }</code> |
| [199:3](project/app/write/WriteForm.tsx#L199) | insertFromUrl | WriteForm | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ event.preventDefault(); const url = insertMode === "image" ? safeImage(insertUrl.trim()) : safeLink(insertUrl.trim()); if (!url) { setInsertError("http:/ …</code> |
| [208:3](project/app/write/WriteForm.tsx#L208) | insertFiles | WriteForm | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (!files.length &#124;&#124; !editor &#124;&#124; uploadBusy.current &#124;&#124; !draftReady &#124;&#124; storedDraft &#124;&#124; loading) return; if …</code> |
| [210:20](project/app/write/WriteForm.tsx#L210) | files.some 콜백 #1 | insertFiles | 원소의 선택·검색·검사 조건 반환<br><code>!["image/png", "image/jpeg", "image/webp"].includes(file.type) &#124;&#124; file.size &gt; 10 * 1024 * 1024</code> |
| [228:88](project/app/write/WriteForm.tsx#L228) | uploadKey.getState(editor.state)?.find 콜백 #3 | insertFiles | 원소의 선택·검색·검사 조건 반환<br><code>spec.id === id</code> |
| [244:13](project/app/write/WriteForm.tsx#L244) | useEffect 콜백 #1 | WriteForm | 컴포넌트 상태·외부 이벤트·타이머 연결<br><code>{ pasteUpload.current = files =&gt; { void insertFiles(files); }; }</code> |
| [244:43](project/app/write/WriteForm.tsx#L244) | pasteUpload.current 대입 | useEffect 콜백 #1 | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ void insertFiles(files); }</code> |
| [246:3](project/app/write/WriteForm.tsx#L246) | preparePublish | WriteForm | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (uploadBusy.current) return; setError(null); if (!title.trim()) { setError("제목을 입력해주세요."); titleInput.current?.focus(); return; } if (!editor &#124;&# …</code> |
| [253:3](project/app/write/WriteForm.tsx#L253) | publish | WriteForm | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ event.preventDefault(); if (!editor &#124;&#124; loading &#124;&#124; uploadBusy.current) return; setLoading(true); setError(null); savingPaused.current  …</code> |
| [271:122](project/app/write/WriteForm.tsx#L271) | onClick | WriteForm | UI/라이브러리 이벤트 처리<br><code>{ if (dirty.current && !window.confirm("아직 저장하지 못한 내용이 있습니다. 나가시겠습니까?")) event.preventDefault(); }</code> |
| [272:99](project/app/write/WriteForm.tsx#L272) | onClick | WriteForm | UI/라이브러리 이벤트 처리<br><code>setFocusMode(!focusMode)</code> |
| [275:118](project/app/write/WriteForm.tsx#L275) | onChange | WriteForm | UI/라이브러리 이벤트 처리<br><code>{ setShowToc(event.target.checked); changed(); }</code> |
| [276:134](project/app/write/WriteForm.tsx#L276) | onChange | WriteForm | UI/라이브러리 이벤트 처리<br><code>{ setTocDepth(Number(event.target.value)); changed(); }</code> |
| [279:93](project/app/write/WriteForm.tsx#L279) | onLink | WriteForm | UI/라이브러리 이벤트 처리<br><code>openInsert("link")</code> |
| [279:128](project/app/write/WriteForm.tsx#L279) | onImage | WriteForm | UI/라이브러리 이벤트 처리<br><code>openInsert("image")</code> |
| [282:272](project/app/write/WriteForm.tsx#L282) | onChange | WriteForm | UI/라이브러리 이벤트 처리<br><code>{ setCategoryId(event.target.value); changed(); }</code> |
| [282:390](project/app/write/WriteForm.tsx#L282) | categories.filter 콜백 #1 | WriteForm | 원소의 선택·검색·검사 조건 반환<br><code>!category.isDivider</code> |
| [282:429](project/app/write/WriteForm.tsx#L282) | categories.filter((category) =&gt; !category.isDivider).map 콜백 #1 | WriteForm | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>&lt;option key={category.id} value={category.id}&gt;{category.name}&lt;/option&gt;</code> |
| [283:195](project/app/write/WriteForm.tsx#L283) | onChange | WriteForm | UI/라이브러리 이벤트 처리<br><code>{ setTitle(event.target.value); changed(); }</code> |
| [284:94](project/app/write/WriteForm.tsx#L284) | onChange | WriteForm | UI/라이브러리 이벤트 처리<br><code>{ setTags(value); changed(); }</code> |
| [286:235](project/app/write/WriteForm.tsx#L286) | documentOutline(editor?.getJSON() &#124;&#124; null, "editor", tocDepth).map 콜백 #1 | WriteForm | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>&lt;li key={item.id} style={{ paddingLeft: (item.level - 2) * 12 }}&gt;&lt;button type="button" onClick={() =&gt; { let index = 0; editor?.state.doc.descen …</code> |
| [286:341](project/app/write/WriteForm.tsx#L286) | onClick | documentOutline(editor?.getJSON() &#124;&#124; null, "editor", tocDepth).map 콜백 #1 | UI/라이브러리 이벤트 처리<br><code>{ let index = 0; editor?.state.doc.descendants((node, position) =&gt; { if (node.type.name === "heading" && ++index === item.index) editor.chain().focus(). …</code> |
| [288:43](project/app/write/WriteForm.tsx#L288) | editor?.state.doc.descendants 콜백 #1 | onClick | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ if (node.type.name === "heading" && ++index === item.index) editor.chain().focus().setTextSelection(position + 1).scrollIntoView().run(); }</code> |
| [295:116](project/app/write/WriteForm.tsx#L295) | onClick | WriteForm | UI/라이브러리 이벤트 처리<br><code>void insertFiles(failedUpload.files, failedUpload.grouped)</code> |
| [304:168](project/app/write/WriteForm.tsx#L304) | onClick | WriteForm | UI/라이브러리 이벤트 처리<br><code>void discardDraft()</code> |
| [304:387](project/app/write/WriteForm.tsx#L304) | onClick | WriteForm | UI/라이브러리 이벤트 처리<br><code>{ try { setPreviewContent(serializeDocument({ ...editor?.getJSON(), attrs: { toc: showToc ? "shown" : "hidden", tocDepth } })); } catch (err) { setError(er …</code> |
| [304:763](project/app/write/WriteForm.tsx#L304) | onClick | WriteForm | UI/라이브러리 이벤트 처리<br><code>void saveDraft()</code> |
| [324:80](project/app/write/WriteForm.tsx#L324) | onClick | WriteForm | UI/라이브러리 이벤트 처리<br><code>void discardDraft()</code> |
| [334:54](project/app/write/WriteForm.tsx#L334) | onClose | WriteForm | UI/라이브러리 이벤트 처리<br><code>setPreviewContent(null)</code> |
| [337:50](project/app/write/WriteForm.tsx#L337) | onClose | WriteForm | UI/라이브러리 이벤트 처리<br><code>{ if (!imageBusy) setInsertMode(null); }</code> |
| [339:94](project/app/write/WriteForm.tsx#L339) | onChange | WriteForm | UI/라이브러리 이벤트 처리<br><code>setImageLayout(event.target.value)</code> |
| [339:347](project/app/write/WriteForm.tsx#L339) | onClick | WriteForm | UI/라이브러리 이벤트 처리<br><code>fileInput.current?.click()</code> |
| [339:653](project/app/write/WriteForm.tsx#L339) | onChange | WriteForm | UI/라이브러리 이벤트 처리<br><code>void insertFiles(Array.from(event.target.files &#124;&#124; []), imageLayout === "group")</code> |
| [340:186](project/app/write/WriteForm.tsx#L340) | onChange | WriteForm | UI/라이브러리 이벤트 처리<br><code>setInsertUrl(event.target.value)</code> |
| [341:151](project/app/write/WriteForm.tsx#L341) | onChange | WriteForm | UI/라이브러리 이벤트 처리<br><code>setImageAlt(event.target.value)</code> |
| [343:163](project/app/write/WriteForm.tsx#L343) | onClick | WriteForm | UI/라이브러리 이벤트 처리<br><code>{ editor.chain().focus().extendMarkRange("link").unsetLink().run(); setInsertMode(null); }</code> |
| [346:42](project/app/write/WriteForm.tsx#L346) | onClose | WriteForm | UI/라이브러리 이벤트 처리<br><code>{ if (!loading) setPublishOpen(false); }</code> |
| [349:135](project/app/write/WriteForm.tsx#L349) | onChange | WriteForm | UI/라이브러리 이벤트 처리<br><code>{ setCategoryId(event.target.value); changed(); }</code> |
| [349:249](project/app/write/WriteForm.tsx#L349) | categories.filter 콜백 #1 | WriteForm | 원소의 선택·검색·검사 조건 반환<br><code>!category.isDivider</code> |
| [349:288](project/app/write/WriteForm.tsx#L349) | categories.filter((category) =&gt; !category.isDivider).map 콜백 #1 | WriteForm | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>&lt;option key={category.id} value={category.id}&gt;{category.name}&lt;/option&gt;</code> |
| [350:359](project/app/write/WriteForm.tsx#L350) | ([{ value: "PUBLIC", label: "전체 공개", description: "누구나 읽을 수 있어요", icon: "globe" }, { value: "FRIENDS", label: "친구 공개", description: "등록된 친구에게만 보여요", icon: "users" }, { value: "PRIVATE", labe … | WriteForm | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>&lt;label key={option.value} className={visibility === option.value ? "selected" : ""}&gt;&lt;input type="radio" name="publish-visibility" value={option.va …</code> |
| [350:570](project/app/write/WriteForm.tsx#L350) | onChange | ([{ value: "PUBLIC", label: "전체 공개", description: "누구나 읽을 수 있어요", icon: "globe" }, { value … | UI/라이브러리 이벤트 처리<br><code>{ setVisibility(option.value); changed(); }</code> |
| [352:128](project/app/write/WriteForm.tsx#L352) | onClick | WriteForm | UI/라이브러리 이벤트 처리<br><code>setPublishOpen(false)</code> |

<a id="file-67"></a>

## project/app/write/page.tsx

[원본 파일](project/app/write/page.tsx)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [6:1](project/app/write/page.tsx#L6) | WritePage | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const session = await auth(); if (!session?.user?.id) { redirect("/login"); } // 사용자가 마이페이지에서 설정한 카테고리 목록 조회 const categories = await prisma.category.fin …</code> |

<a id="file-68"></a>

## project/eslint.config.mjs

[원본 파일](project/eslint.config.mjs)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<a id="file-69"></a>

## project/generated/prisma/browser.ts

[원본 파일](project/generated/prisma/browser.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<a id="file-70"></a>

## project/generated/prisma/client.ts

[원본 파일](project/generated/prisma/client.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<a id="file-71"></a>

## project/generated/prisma/commonInputTypes.ts

[원본 파일](project/generated/prisma/commonInputTypes.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<a id="file-72"></a>

## project/generated/prisma/enums.ts

[원본 파일](project/generated/prisma/enums.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<a id="file-73"></a>

## project/generated/prisma/internal/class.ts

[원본 파일](project/generated/prisma/internal/class.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [41:1](project/generated/prisma/internal/class.ts#L41) | decodeBase64AsWasm | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const { Buffer } = await import('node:buffer') const wasmArray = Buffer.from(wasmBase64, 'base64') return new WebAssembly.Module(wasmArray) }</code> |
| [48:15](project/generated/prisma/internal/class.ts#L48) | getRuntime | 모듈 최상위 | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs")</code> |
| [50:31](project/generated/prisma/internal/class.ts#L50) | getQueryCompilerWasmModule | 모듈 최상위 | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs") return await decodeBase64AsWasm(wasm) }</code> |
| [372:1](project/generated/prisma/internal/class.ts#L372) | getPrismaClientClass | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ return runtime.getPrismaClient(config) as unknown as PrismaClientConstructor }</code> |

<details>
<summary>실행 본문이 없는 타입 시그니처 전체</summary>

| 위치 | 메서드/시그니처 | 선언 발췌 |
| --- | --- | --- |
| [80:3](project/generated/prisma/internal/class.ts#L80) | 익명 함수 | <code>new &lt; Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions&lt;Options&gt; = LogOptions&lt;Options&gt;, Om …</code> |
| [111:3](project/generated/prisma/internal/class.ts#L111) | $on | <code>$on&lt;V extends LogOpts&gt;(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) =&gt; void): PrismaClient;</code> |
| [116:3](project/generated/prisma/internal/class.ts#L116) | $connect | <code>$connect(): runtime.Types.Utils.JsPromise&lt;void&gt;;</code> |
| [121:3](project/generated/prisma/internal/class.ts#L121) | $disconnect | <code>$disconnect(): runtime.Types.Utils.JsPromise&lt;void&gt;;</code> |
| [132:3](project/generated/prisma/internal/class.ts#L132) | $executeRaw | <code>$executeRaw&lt;T = unknown&gt;(query: TemplateStringsArray &#124; Prisma.Sql, ...values: any[]): Prisma.PrismaPromise&lt;number&gt;;</code> |
| [144:3](project/generated/prisma/internal/class.ts#L144) | $executeRawUnsafe | <code>$executeRawUnsafe&lt;T = unknown&gt;(query: string, ...values: any[]): Prisma.PrismaPromise&lt;number&gt;;</code> |
| [155:3](project/generated/prisma/internal/class.ts#L155) | $queryRaw | <code>$queryRaw&lt;T = unknown&gt;(query: TemplateStringsArray &#124; Prisma.Sql, ...values: any[]): Prisma.PrismaPromise&lt;T&gt;;</code> |
| [167:3](project/generated/prisma/internal/class.ts#L167) | $queryRawUnsafe | <code>$queryRawUnsafe&lt;T = unknown&gt;(query: string, ...values: any[]): Prisma.PrismaPromise&lt;T&gt;;</code> |
| [183:3](project/generated/prisma/internal/class.ts#L183) | $transaction | <code>$transaction&lt;P extends Prisma.PrismaPromise&lt;any&gt;[]&gt;(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.Transa …</code> |
| [185:3](project/generated/prisma/internal/class.ts#L185) | $transaction | <code>$transaction&lt;R&gt;(fn: (prisma: Omit&lt;PrismaClient, runtime.ITXClientDenyList&gt;) =&gt; runtime.Types.Utils.JsPromise&lt;R&gt;, options?: { maxWait?: …</code> |

</details>

<a id="file-74"></a>

## project/generated/prisma/internal/prismaNamespace.ts

[원본 파일](project/generated/prisma/internal/prismaNamespace.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<a id="file-75"></a>

## project/generated/prisma/internal/prismaNamespaceBrowser.ts

[원본 파일](project/generated/prisma/internal/prismaNamespaceBrowser.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<a id="file-76"></a>

## project/generated/prisma/models.ts

[원본 파일](project/generated/prisma/models.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<a id="file-77"></a>

## project/generated/prisma/models/Account.ts

[원본 파일](project/generated/prisma/models/Account.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<details>
<summary>실행 본문이 없는 타입 시그니처 전체</summary>

| 위치 | 메서드/시그니처 | 선언 발췌 |
| --- | --- | --- |
| [820:3](project/generated/prisma/models/Account.ts#L820) | findUnique | <code>findUnique&lt;T extends AccountFindUniqueArgs&gt;(args: Prisma.SelectSubset&lt;T, AccountFindUniqueArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__AccountClient&l …</code> |
| [834:3](project/generated/prisma/models/Account.ts#L834) | findUniqueOrThrow | <code>findUniqueOrThrow&lt;T extends AccountFindUniqueOrThrowArgs&gt;(args: Prisma.SelectSubset&lt;T, AccountFindUniqueOrThrowArgs&lt;ExtArgs&gt;&gt;): Prisma.Pr …</code> |
| [849:3](project/generated/prisma/models/Account.ts#L849) | findFirst | <code>findFirst&lt;T extends AccountFindFirstArgs&gt;(args?: Prisma.SelectSubset&lt;T, AccountFindFirstArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__AccountClient&lt; …</code> |
| [865:3](project/generated/prisma/models/Account.ts#L865) | findFirstOrThrow | <code>findFirstOrThrow&lt;T extends AccountFindFirstOrThrowArgs&gt;(args?: Prisma.SelectSubset&lt;T, AccountFindFirstOrThrowArgs&lt;ExtArgs&gt;&gt;): Prisma.Pris …</code> |
| [883:3](project/generated/prisma/models/Account.ts#L883) | findMany | <code>findMany&lt;T extends AccountFindManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, AccountFindManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;runtime.Typ …</code> |
| [897:3](project/generated/prisma/models/Account.ts#L897) | create | <code>create&lt;T extends AccountCreateArgs&gt;(args: Prisma.SelectSubset&lt;T, AccountCreateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__AccountClient&lt;runtime.Ty …</code> |
| [911:3](project/generated/prisma/models/Account.ts#L911) | createMany | <code>createMany&lt;T extends AccountCreateManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, AccountCreateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Prism …</code> |
| [935:3](project/generated/prisma/models/Account.ts#L935) | createManyAndReturn | <code>createManyAndReturn&lt;T extends AccountCreateManyAndReturnArgs&gt;(args?: Prisma.SelectSubset&lt;T, AccountCreateManyAndReturnArgs&lt;ExtArgs&gt;&gt;): Pr …</code> |
| [949:3](project/generated/prisma/models/Account.ts#L949) | delete | <code>delete&lt;T extends AccountDeleteArgs&gt;(args: Prisma.SelectSubset&lt;T, AccountDeleteArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__AccountClient&lt;runtime.Ty …</code> |
| [966:3](project/generated/prisma/models/Account.ts#L966) | update | <code>update&lt;T extends AccountUpdateArgs&gt;(args: Prisma.SelectSubset&lt;T, AccountUpdateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__AccountClient&lt;runtime.Ty …</code> |
| [980:3](project/generated/prisma/models/Account.ts#L980) | deleteMany | <code>deleteMany&lt;T extends AccountDeleteManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, AccountDeleteManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Prism …</code> |
| [999:3](project/generated/prisma/models/Account.ts#L999) | updateMany | <code>updateMany&lt;T extends AccountUpdateManyArgs&gt;(args: Prisma.SelectSubset&lt;T, AccountUpdateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Prisma …</code> |
| [1029:3](project/generated/prisma/models/Account.ts#L1029) | updateManyAndReturn | <code>updateManyAndReturn&lt;T extends AccountUpdateManyAndReturnArgs&gt;(args: Prisma.SelectSubset&lt;T, AccountUpdateManyAndReturnArgs&lt;ExtArgs&gt;&gt;): Pri …</code> |
| [1048:3](project/generated/prisma/models/Account.ts#L1048) | upsert | <code>upsert&lt;T extends AccountUpsertArgs&gt;(args: Prisma.SelectSubset&lt;T, AccountUpsertArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__AccountClient&lt;runtime.Ty …</code> |
| [1064:3](project/generated/prisma/models/Account.ts#L1064) | count | <code>count&lt;T extends AccountCountArgs&gt;( args?: Prisma.Subset&lt;T, AccountCountArgs&gt;, ): Prisma.PrismaPromise&lt; T extends runtime.Types.Utils.Record& …</code> |
| [1098:3](project/generated/prisma/models/Account.ts#L1098) | aggregate | <code>aggregate&lt;T extends AccountAggregateArgs&gt;(args: Prisma.Subset&lt;T, AccountAggregateArgs&gt;): Prisma.PrismaPromise&lt;GetAccountAggregateType&lt;T&g …</code> |
| [1118:3](project/generated/prisma/models/Account.ts#L1118) | groupBy | <code>groupBy&lt; T extends AccountGroupByArgs, HasSelectOrTake extends Prisma.Or&lt; Prisma.Extends&lt;'skip', Prisma.Keys&lt;T&gt;&gt;, Prisma.Extends&lt;'take …</code> |
| [1190:3](project/generated/prisma/models/Account.ts#L1190) | user | <code>user&lt;T extends Prisma.UserDefaultArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.UserDefaultArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__User …</code> |
| [1197:3](project/generated/prisma/models/Account.ts#L1197) | then | <code>then&lt;TResult1 = T, TResult2 = never&gt;(onfulfilled?: ((value: T) =&gt; TResult1 &#124; PromiseLike&lt;TResult1&gt;) &#124; undefined &#124; null, onrej …</code> |
| [1203:3](project/generated/prisma/models/Account.ts#L1203) | catch | <code>catch&lt;TResult = never&gt;(onrejected?: ((reason: any) =&gt; TResult &#124; PromiseLike&lt;TResult&gt;) &#124; undefined &#124; null): runtime.Types.Util …</code> |
| [1210:3](project/generated/prisma/models/Account.ts#L1210) | finally | <code>finally(onfinally?: (() =&gt; void) &#124; undefined &#124; null): runtime.Types.Utils.JsPromise&lt;T&gt;</code> |

</details>

<a id="file-78"></a>

## project/generated/prisma/models/ActionLimit.ts

[원본 파일](project/generated/prisma/models/ActionLimit.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<details>
<summary>실행 본문이 없는 타입 시그니처 전체</summary>

| 위치 | 메서드/시그니처 | 선언 발췌 |
| --- | --- | --- |
| [367:3](project/generated/prisma/models/ActionLimit.ts#L367) | findUnique | <code>findUnique&lt;T extends ActionLimitFindUniqueArgs&gt;(args: Prisma.SelectSubset&lt;T, ActionLimitFindUniqueArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__ActionL …</code> |
| [381:3](project/generated/prisma/models/ActionLimit.ts#L381) | findUniqueOrThrow | <code>findUniqueOrThrow&lt;T extends ActionLimitFindUniqueOrThrowArgs&gt;(args: Prisma.SelectSubset&lt;T, ActionLimitFindUniqueOrThrowArgs&lt;ExtArgs&gt;&gt;): P …</code> |
| [396:3](project/generated/prisma/models/ActionLimit.ts#L396) | findFirst | <code>findFirst&lt;T extends ActionLimitFindFirstArgs&gt;(args?: Prisma.SelectSubset&lt;T, ActionLimitFindFirstArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__ActionLim …</code> |
| [412:3](project/generated/prisma/models/ActionLimit.ts#L412) | findFirstOrThrow | <code>findFirstOrThrow&lt;T extends ActionLimitFindFirstOrThrowArgs&gt;(args?: Prisma.SelectSubset&lt;T, ActionLimitFindFirstOrThrowArgs&lt;ExtArgs&gt;&gt;): Pri …</code> |
| [430:3](project/generated/prisma/models/ActionLimit.ts#L430) | findMany | <code>findMany&lt;T extends ActionLimitFindManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, ActionLimitFindManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;run …</code> |
| [444:3](project/generated/prisma/models/ActionLimit.ts#L444) | create | <code>create&lt;T extends ActionLimitCreateArgs&gt;(args: Prisma.SelectSubset&lt;T, ActionLimitCreateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__ActionLimitClient&l …</code> |
| [458:3](project/generated/prisma/models/ActionLimit.ts#L458) | createMany | <code>createMany&lt;T extends ActionLimitCreateManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, ActionLimitCreateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise& …</code> |
| [482:3](project/generated/prisma/models/ActionLimit.ts#L482) | createManyAndReturn | <code>createManyAndReturn&lt;T extends ActionLimitCreateManyAndReturnArgs&gt;(args?: Prisma.SelectSubset&lt;T, ActionLimitCreateManyAndReturnArgs&lt;ExtArgs&gt;& …</code> |
| [496:3](project/generated/prisma/models/ActionLimit.ts#L496) | delete | <code>delete&lt;T extends ActionLimitDeleteArgs&gt;(args: Prisma.SelectSubset&lt;T, ActionLimitDeleteArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__ActionLimitClient&l …</code> |
| [513:3](project/generated/prisma/models/ActionLimit.ts#L513) | update | <code>update&lt;T extends ActionLimitUpdateArgs&gt;(args: Prisma.SelectSubset&lt;T, ActionLimitUpdateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__ActionLimitClient&l …</code> |
| [527:3](project/generated/prisma/models/ActionLimit.ts#L527) | deleteMany | <code>deleteMany&lt;T extends ActionLimitDeleteManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, ActionLimitDeleteManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise& …</code> |
| [546:3](project/generated/prisma/models/ActionLimit.ts#L546) | updateMany | <code>updateMany&lt;T extends ActionLimitUpdateManyArgs&gt;(args: Prisma.SelectSubset&lt;T, ActionLimitUpdateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&l …</code> |
| [576:3](project/generated/prisma/models/ActionLimit.ts#L576) | updateManyAndReturn | <code>updateManyAndReturn&lt;T extends ActionLimitUpdateManyAndReturnArgs&gt;(args: Prisma.SelectSubset&lt;T, ActionLimitUpdateManyAndReturnArgs&lt;ExtArgs&gt;&g …</code> |
| [595:3](project/generated/prisma/models/ActionLimit.ts#L595) | upsert | <code>upsert&lt;T extends ActionLimitUpsertArgs&gt;(args: Prisma.SelectSubset&lt;T, ActionLimitUpsertArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__ActionLimitClient&l …</code> |
| [611:3](project/generated/prisma/models/ActionLimit.ts#L611) | count | <code>count&lt;T extends ActionLimitCountArgs&gt;( args?: Prisma.Subset&lt;T, ActionLimitCountArgs&gt;, ): Prisma.PrismaPromise&lt; T extends runtime.Types.Utils …</code> |
| [645:3](project/generated/prisma/models/ActionLimit.ts#L645) | aggregate | <code>aggregate&lt;T extends ActionLimitAggregateArgs&gt;(args: Prisma.Subset&lt;T, ActionLimitAggregateArgs&gt;): Prisma.PrismaPromise&lt;GetActionLimitAggregat …</code> |
| [665:3](project/generated/prisma/models/ActionLimit.ts#L665) | groupBy | <code>groupBy&lt; T extends ActionLimitGroupByArgs, HasSelectOrTake extends Prisma.Or&lt; Prisma.Extends&lt;'skip', Prisma.Keys&lt;T&gt;&gt;, Prisma.Extends&lt;' …</code> |
| [743:3](project/generated/prisma/models/ActionLimit.ts#L743) | then | <code>then&lt;TResult1 = T, TResult2 = never&gt;(onfulfilled?: ((value: T) =&gt; TResult1 &#124; PromiseLike&lt;TResult1&gt;) &#124; undefined &#124; null, onrej …</code> |
| [749:3](project/generated/prisma/models/ActionLimit.ts#L749) | catch | <code>catch&lt;TResult = never&gt;(onrejected?: ((reason: any) =&gt; TResult &#124; PromiseLike&lt;TResult&gt;) &#124; undefined &#124; null): runtime.Types.Util …</code> |
| [756:3](project/generated/prisma/models/ActionLimit.ts#L756) | finally | <code>finally(onfinally?: (() =&gt; void) &#124; undefined &#124; null): runtime.Types.Utils.JsPromise&lt;T&gt;</code> |

</details>

<a id="file-79"></a>

## project/generated/prisma/models/Category.ts

[원본 파일](project/generated/prisma/models/Category.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<details>
<summary>실행 본문이 없는 타입 시그니처 전체</summary>

| 위치 | 메서드/시그니처 | 선언 발췌 |
| --- | --- | --- |
| [770:3](project/generated/prisma/models/Category.ts#L770) | findUnique | <code>findUnique&lt;T extends CategoryFindUniqueArgs&gt;(args: Prisma.SelectSubset&lt;T, CategoryFindUniqueArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__CategoryClien …</code> |
| [784:3](project/generated/prisma/models/Category.ts#L784) | findUniqueOrThrow | <code>findUniqueOrThrow&lt;T extends CategoryFindUniqueOrThrowArgs&gt;(args: Prisma.SelectSubset&lt;T, CategoryFindUniqueOrThrowArgs&lt;ExtArgs&gt;&gt;): Prisma. …</code> |
| [799:3](project/generated/prisma/models/Category.ts#L799) | findFirst | <code>findFirst&lt;T extends CategoryFindFirstArgs&gt;(args?: Prisma.SelectSubset&lt;T, CategoryFindFirstArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__CategoryClient& …</code> |
| [815:3](project/generated/prisma/models/Category.ts#L815) | findFirstOrThrow | <code>findFirstOrThrow&lt;T extends CategoryFindFirstOrThrowArgs&gt;(args?: Prisma.SelectSubset&lt;T, CategoryFindFirstOrThrowArgs&lt;ExtArgs&gt;&gt;): Prisma.Pr …</code> |
| [833:3](project/generated/prisma/models/Category.ts#L833) | findMany | <code>findMany&lt;T extends CategoryFindManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, CategoryFindManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;runtime.T …</code> |
| [847:3](project/generated/prisma/models/Category.ts#L847) | create | <code>create&lt;T extends CategoryCreateArgs&gt;(args: Prisma.SelectSubset&lt;T, CategoryCreateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__CategoryClient&lt;runtime …</code> |
| [861:3](project/generated/prisma/models/Category.ts#L861) | createMany | <code>createMany&lt;T extends CategoryCreateManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, CategoryCreateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Pri …</code> |
| [885:3](project/generated/prisma/models/Category.ts#L885) | createManyAndReturn | <code>createManyAndReturn&lt;T extends CategoryCreateManyAndReturnArgs&gt;(args?: Prisma.SelectSubset&lt;T, CategoryCreateManyAndReturnArgs&lt;ExtArgs&gt;&gt;):  …</code> |
| [899:3](project/generated/prisma/models/Category.ts#L899) | delete | <code>delete&lt;T extends CategoryDeleteArgs&gt;(args: Prisma.SelectSubset&lt;T, CategoryDeleteArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__CategoryClient&lt;runtime …</code> |
| [916:3](project/generated/prisma/models/Category.ts#L916) | update | <code>update&lt;T extends CategoryUpdateArgs&gt;(args: Prisma.SelectSubset&lt;T, CategoryUpdateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__CategoryClient&lt;runtime …</code> |
| [930:3](project/generated/prisma/models/Category.ts#L930) | deleteMany | <code>deleteMany&lt;T extends CategoryDeleteManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, CategoryDeleteManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Pri …</code> |
| [949:3](project/generated/prisma/models/Category.ts#L949) | updateMany | <code>updateMany&lt;T extends CategoryUpdateManyArgs&gt;(args: Prisma.SelectSubset&lt;T, CategoryUpdateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Pris …</code> |
| [979:3](project/generated/prisma/models/Category.ts#L979) | updateManyAndReturn | <code>updateManyAndReturn&lt;T extends CategoryUpdateManyAndReturnArgs&gt;(args: Prisma.SelectSubset&lt;T, CategoryUpdateManyAndReturnArgs&lt;ExtArgs&gt;&gt;): P …</code> |
| [998:3](project/generated/prisma/models/Category.ts#L998) | upsert | <code>upsert&lt;T extends CategoryUpsertArgs&gt;(args: Prisma.SelectSubset&lt;T, CategoryUpsertArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__CategoryClient&lt;runtime …</code> |
| [1014:3](project/generated/prisma/models/Category.ts#L1014) | count | <code>count&lt;T extends CategoryCountArgs&gt;( args?: Prisma.Subset&lt;T, CategoryCountArgs&gt;, ): Prisma.PrismaPromise&lt; T extends runtime.Types.Utils.Recor …</code> |
| [1048:3](project/generated/prisma/models/Category.ts#L1048) | aggregate | <code>aggregate&lt;T extends CategoryAggregateArgs&gt;(args: Prisma.Subset&lt;T, CategoryAggregateArgs&gt;): Prisma.PrismaPromise&lt;GetCategoryAggregateType&lt; …</code> |
| [1068:3](project/generated/prisma/models/Category.ts#L1068) | groupBy | <code>groupBy&lt; T extends CategoryGroupByArgs, HasSelectOrTake extends Prisma.Or&lt; Prisma.Extends&lt;'skip', Prisma.Keys&lt;T&gt;&gt;, Prisma.Extends&lt;'tak …</code> |
| [1140:3](project/generated/prisma/models/Category.ts#L1140) | user | <code>user&lt;T extends Prisma.UserDefaultArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.UserDefaultArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__User …</code> |
| [1141:3](project/generated/prisma/models/Category.ts#L1141) | posts | <code>posts&lt;T extends Prisma.Category$postsArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.Category$postsArgs&lt;ExtArgs&gt;&gt;): Prisma.Prism …</code> |
| [1148:3](project/generated/prisma/models/Category.ts#L1148) | then | <code>then&lt;TResult1 = T, TResult2 = never&gt;(onfulfilled?: ((value: T) =&gt; TResult1 &#124; PromiseLike&lt;TResult1&gt;) &#124; undefined &#124; null, onrej …</code> |
| [1154:3](project/generated/prisma/models/Category.ts#L1154) | catch | <code>catch&lt;TResult = never&gt;(onrejected?: ((reason: any) =&gt; TResult &#124; PromiseLike&lt;TResult&gt;) &#124; undefined &#124; null): runtime.Types.Util …</code> |
| [1161:3](project/generated/prisma/models/Category.ts#L1161) | finally | <code>finally(onfinally?: (() =&gt; void) &#124; undefined &#124; null): runtime.Types.Utils.JsPromise&lt;T&gt;</code> |

</details>

<a id="file-80"></a>

## project/generated/prisma/models/Comment.ts

[원본 파일](project/generated/prisma/models/Comment.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<details>
<summary>실행 본문이 없는 타입 시그니처 전체</summary>

| 위치 | 메서드/시그니처 | 선언 발췌 |
| --- | --- | --- |
| [1260:3](project/generated/prisma/models/Comment.ts#L1260) | findUnique | <code>findUnique&lt;T extends CommentFindUniqueArgs&gt;(args: Prisma.SelectSubset&lt;T, CommentFindUniqueArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__CommentClient&l …</code> |
| [1274:3](project/generated/prisma/models/Comment.ts#L1274) | findUniqueOrThrow | <code>findUniqueOrThrow&lt;T extends CommentFindUniqueOrThrowArgs&gt;(args: Prisma.SelectSubset&lt;T, CommentFindUniqueOrThrowArgs&lt;ExtArgs&gt;&gt;): Prisma.Pr …</code> |
| [1289:3](project/generated/prisma/models/Comment.ts#L1289) | findFirst | <code>findFirst&lt;T extends CommentFindFirstArgs&gt;(args?: Prisma.SelectSubset&lt;T, CommentFindFirstArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__CommentClient&lt; …</code> |
| [1305:3](project/generated/prisma/models/Comment.ts#L1305) | findFirstOrThrow | <code>findFirstOrThrow&lt;T extends CommentFindFirstOrThrowArgs&gt;(args?: Prisma.SelectSubset&lt;T, CommentFindFirstOrThrowArgs&lt;ExtArgs&gt;&gt;): Prisma.Pris …</code> |
| [1323:3](project/generated/prisma/models/Comment.ts#L1323) | findMany | <code>findMany&lt;T extends CommentFindManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, CommentFindManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;runtime.Typ …</code> |
| [1337:3](project/generated/prisma/models/Comment.ts#L1337) | create | <code>create&lt;T extends CommentCreateArgs&gt;(args: Prisma.SelectSubset&lt;T, CommentCreateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__CommentClient&lt;runtime.Ty …</code> |
| [1351:3](project/generated/prisma/models/Comment.ts#L1351) | createMany | <code>createMany&lt;T extends CommentCreateManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, CommentCreateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Prism …</code> |
| [1375:3](project/generated/prisma/models/Comment.ts#L1375) | createManyAndReturn | <code>createManyAndReturn&lt;T extends CommentCreateManyAndReturnArgs&gt;(args?: Prisma.SelectSubset&lt;T, CommentCreateManyAndReturnArgs&lt;ExtArgs&gt;&gt;): Pr …</code> |
| [1389:3](project/generated/prisma/models/Comment.ts#L1389) | delete | <code>delete&lt;T extends CommentDeleteArgs&gt;(args: Prisma.SelectSubset&lt;T, CommentDeleteArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__CommentClient&lt;runtime.Ty …</code> |
| [1406:3](project/generated/prisma/models/Comment.ts#L1406) | update | <code>update&lt;T extends CommentUpdateArgs&gt;(args: Prisma.SelectSubset&lt;T, CommentUpdateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__CommentClient&lt;runtime.Ty …</code> |
| [1420:3](project/generated/prisma/models/Comment.ts#L1420) | deleteMany | <code>deleteMany&lt;T extends CommentDeleteManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, CommentDeleteManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Prism …</code> |
| [1439:3](project/generated/prisma/models/Comment.ts#L1439) | updateMany | <code>updateMany&lt;T extends CommentUpdateManyArgs&gt;(args: Prisma.SelectSubset&lt;T, CommentUpdateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Prisma …</code> |
| [1469:3](project/generated/prisma/models/Comment.ts#L1469) | updateManyAndReturn | <code>updateManyAndReturn&lt;T extends CommentUpdateManyAndReturnArgs&gt;(args: Prisma.SelectSubset&lt;T, CommentUpdateManyAndReturnArgs&lt;ExtArgs&gt;&gt;): Pri …</code> |
| [1488:3](project/generated/prisma/models/Comment.ts#L1488) | upsert | <code>upsert&lt;T extends CommentUpsertArgs&gt;(args: Prisma.SelectSubset&lt;T, CommentUpsertArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__CommentClient&lt;runtime.Ty …</code> |
| [1504:3](project/generated/prisma/models/Comment.ts#L1504) | count | <code>count&lt;T extends CommentCountArgs&gt;( args?: Prisma.Subset&lt;T, CommentCountArgs&gt;, ): Prisma.PrismaPromise&lt; T extends runtime.Types.Utils.Record& …</code> |
| [1538:3](project/generated/prisma/models/Comment.ts#L1538) | aggregate | <code>aggregate&lt;T extends CommentAggregateArgs&gt;(args: Prisma.Subset&lt;T, CommentAggregateArgs&gt;): Prisma.PrismaPromise&lt;GetCommentAggregateType&lt;T&g …</code> |
| [1558:3](project/generated/prisma/models/Comment.ts#L1558) | groupBy | <code>groupBy&lt; T extends CommentGroupByArgs, HasSelectOrTake extends Prisma.Or&lt; Prisma.Extends&lt;'skip', Prisma.Keys&lt;T&gt;&gt;, Prisma.Extends&lt;'take …</code> |
| [1630:3](project/generated/prisma/models/Comment.ts#L1630) | post | <code>post&lt;T extends Prisma.PostDefaultArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.PostDefaultArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__Post …</code> |
| [1631:3](project/generated/prisma/models/Comment.ts#L1631) | author | <code>author&lt;T extends Prisma.Comment$authorArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.Comment$authorArgs&lt;ExtArgs&gt;&gt;): Prisma.Pris …</code> |
| [1632:3](project/generated/prisma/models/Comment.ts#L1632) | parent | <code>parent&lt;T extends Prisma.Comment$parentArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.Comment$parentArgs&lt;ExtArgs&gt;&gt;): Prisma.Pris …</code> |
| [1633:3](project/generated/prisma/models/Comment.ts#L1633) | replies | <code>replies&lt;T extends Prisma.Comment$repliesArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.Comment$repliesArgs&lt;ExtArgs&gt;&gt;): Prisma.P …</code> |
| [1634:3](project/generated/prisma/models/Comment.ts#L1634) | notifications | <code>notifications&lt;T extends Prisma.Comment$notificationsArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.Comment$notificationsArgs&lt;ExtArgs& …</code> |
| [1641:3](project/generated/prisma/models/Comment.ts#L1641) | then | <code>then&lt;TResult1 = T, TResult2 = never&gt;(onfulfilled?: ((value: T) =&gt; TResult1 &#124; PromiseLike&lt;TResult1&gt;) &#124; undefined &#124; null, onrej …</code> |
| [1647:3](project/generated/prisma/models/Comment.ts#L1647) | catch | <code>catch&lt;TResult = never&gt;(onrejected?: ((reason: any) =&gt; TResult &#124; PromiseLike&lt;TResult&gt;) &#124; undefined &#124; null): runtime.Types.Util …</code> |
| [1654:3](project/generated/prisma/models/Comment.ts#L1654) | finally | <code>finally(onfinally?: (() =&gt; void) &#124; undefined &#124; null): runtime.Types.Utils.JsPromise&lt;T&gt;</code> |

</details>

<a id="file-81"></a>

## project/generated/prisma/models/Conversation.ts

[원본 파일](project/generated/prisma/models/Conversation.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<details>
<summary>실행 본문이 없는 타입 시그니처 전체</summary>

| 위치 | 메서드/시그니처 | 선언 발췌 |
| --- | --- | --- |
| [903:3](project/generated/prisma/models/Conversation.ts#L903) | findUnique | <code>findUnique&lt;T extends ConversationFindUniqueArgs&gt;(args: Prisma.SelectSubset&lt;T, ConversationFindUniqueArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__Conve …</code> |
| [917:3](project/generated/prisma/models/Conversation.ts#L917) | findUniqueOrThrow | <code>findUniqueOrThrow&lt;T extends ConversationFindUniqueOrThrowArgs&gt;(args: Prisma.SelectSubset&lt;T, ConversationFindUniqueOrThrowArgs&lt;ExtArgs&gt;&gt;): …</code> |
| [932:3](project/generated/prisma/models/Conversation.ts#L932) | findFirst | <code>findFirst&lt;T extends ConversationFindFirstArgs&gt;(args?: Prisma.SelectSubset&lt;T, ConversationFindFirstArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__Convers …</code> |
| [948:3](project/generated/prisma/models/Conversation.ts#L948) | findFirstOrThrow | <code>findFirstOrThrow&lt;T extends ConversationFindFirstOrThrowArgs&gt;(args?: Prisma.SelectSubset&lt;T, ConversationFindFirstOrThrowArgs&lt;ExtArgs&gt;&gt;): P …</code> |
| [966:3](project/generated/prisma/models/Conversation.ts#L966) | findMany | <code>findMany&lt;T extends ConversationFindManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, ConversationFindManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;r …</code> |
| [980:3](project/generated/prisma/models/Conversation.ts#L980) | create | <code>create&lt;T extends ConversationCreateArgs&gt;(args: Prisma.SelectSubset&lt;T, ConversationCreateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__ConversationClien …</code> |
| [994:3](project/generated/prisma/models/Conversation.ts#L994) | createMany | <code>createMany&lt;T extends ConversationCreateManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, ConversationCreateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromis …</code> |
| [1018:3](project/generated/prisma/models/Conversation.ts#L1018) | createManyAndReturn | <code>createManyAndReturn&lt;T extends ConversationCreateManyAndReturnArgs&gt;(args?: Prisma.SelectSubset&lt;T, ConversationCreateManyAndReturnArgs&lt;ExtArgs&gt …</code> |
| [1032:3](project/generated/prisma/models/Conversation.ts#L1032) | delete | <code>delete&lt;T extends ConversationDeleteArgs&gt;(args: Prisma.SelectSubset&lt;T, ConversationDeleteArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__ConversationClien …</code> |
| [1049:3](project/generated/prisma/models/Conversation.ts#L1049) | update | <code>update&lt;T extends ConversationUpdateArgs&gt;(args: Prisma.SelectSubset&lt;T, ConversationUpdateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__ConversationClien …</code> |
| [1063:3](project/generated/prisma/models/Conversation.ts#L1063) | deleteMany | <code>deleteMany&lt;T extends ConversationDeleteManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, ConversationDeleteManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromis …</code> |
| [1082:3](project/generated/prisma/models/Conversation.ts#L1082) | updateMany | <code>updateMany&lt;T extends ConversationUpdateManyArgs&gt;(args: Prisma.SelectSubset&lt;T, ConversationUpdateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise …</code> |
| [1112:3](project/generated/prisma/models/Conversation.ts#L1112) | updateManyAndReturn | <code>updateManyAndReturn&lt;T extends ConversationUpdateManyAndReturnArgs&gt;(args: Prisma.SelectSubset&lt;T, ConversationUpdateManyAndReturnArgs&lt;ExtArgs&gt; …</code> |
| [1131:3](project/generated/prisma/models/Conversation.ts#L1131) | upsert | <code>upsert&lt;T extends ConversationUpsertArgs&gt;(args: Prisma.SelectSubset&lt;T, ConversationUpsertArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__ConversationClien …</code> |
| [1147:3](project/generated/prisma/models/Conversation.ts#L1147) | count | <code>count&lt;T extends ConversationCountArgs&gt;( args?: Prisma.Subset&lt;T, ConversationCountArgs&gt;, ): Prisma.PrismaPromise&lt; T extends runtime.Types.Uti …</code> |
| [1181:3](project/generated/prisma/models/Conversation.ts#L1181) | aggregate | <code>aggregate&lt;T extends ConversationAggregateArgs&gt;(args: Prisma.Subset&lt;T, ConversationAggregateArgs&gt;): Prisma.PrismaPromise&lt;GetConversationAggre …</code> |
| [1201:3](project/generated/prisma/models/Conversation.ts#L1201) | groupBy | <code>groupBy&lt; T extends ConversationGroupByArgs, HasSelectOrTake extends Prisma.Or&lt; Prisma.Extends&lt;'skip', Prisma.Keys&lt;T&gt;&gt;, Prisma.Extends&lt; …</code> |
| [1273:3](project/generated/prisma/models/Conversation.ts#L1273) | userA | <code>userA&lt;T extends Prisma.UserDefaultArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.UserDefaultArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__Use …</code> |
| [1274:3](project/generated/prisma/models/Conversation.ts#L1274) | userB | <code>userB&lt;T extends Prisma.UserDefaultArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.UserDefaultArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__Use …</code> |
| [1275:3](project/generated/prisma/models/Conversation.ts#L1275) | messages | <code>messages&lt;T extends Prisma.Conversation$messagesArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.Conversation$messagesArgs&lt;ExtArgs&gt;&g …</code> |
| [1282:3](project/generated/prisma/models/Conversation.ts#L1282) | then | <code>then&lt;TResult1 = T, TResult2 = never&gt;(onfulfilled?: ((value: T) =&gt; TResult1 &#124; PromiseLike&lt;TResult1&gt;) &#124; undefined &#124; null, onrej …</code> |
| [1288:3](project/generated/prisma/models/Conversation.ts#L1288) | catch | <code>catch&lt;TResult = never&gt;(onrejected?: ((reason: any) =&gt; TResult &#124; PromiseLike&lt;TResult&gt;) &#124; undefined &#124; null): runtime.Types.Util …</code> |
| [1295:3](project/generated/prisma/models/Conversation.ts#L1295) | finally | <code>finally(onfinally?: (() =&gt; void) &#124; undefined &#124; null): runtime.Types.Utils.JsPromise&lt;T&gt;</code> |

</details>

<a id="file-82"></a>

## project/generated/prisma/models/DraftImage.ts

[원본 파일](project/generated/prisma/models/DraftImage.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<details>
<summary>실행 본문이 없는 타입 시그니처 전체</summary>

| 위치 | 메서드/시그니처 | 선언 발췌 |
| --- | --- | --- |
| [530:3](project/generated/prisma/models/DraftImage.ts#L530) | findUnique | <code>findUnique&lt;T extends DraftImageFindUniqueArgs&gt;(args: Prisma.SelectSubset&lt;T, DraftImageFindUniqueArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__DraftImag …</code> |
| [544:3](project/generated/prisma/models/DraftImage.ts#L544) | findUniqueOrThrow | <code>findUniqueOrThrow&lt;T extends DraftImageFindUniqueOrThrowArgs&gt;(args: Prisma.SelectSubset&lt;T, DraftImageFindUniqueOrThrowArgs&lt;ExtArgs&gt;&gt;): Pri …</code> |
| [559:3](project/generated/prisma/models/DraftImage.ts#L559) | findFirst | <code>findFirst&lt;T extends DraftImageFindFirstArgs&gt;(args?: Prisma.SelectSubset&lt;T, DraftImageFindFirstArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__DraftImageC …</code> |
| [575:3](project/generated/prisma/models/DraftImage.ts#L575) | findFirstOrThrow | <code>findFirstOrThrow&lt;T extends DraftImageFindFirstOrThrowArgs&gt;(args?: Prisma.SelectSubset&lt;T, DraftImageFindFirstOrThrowArgs&lt;ExtArgs&gt;&gt;): Prism …</code> |
| [593:3](project/generated/prisma/models/DraftImage.ts#L593) | findMany | <code>findMany&lt;T extends DraftImageFindManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, DraftImageFindManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;runti …</code> |
| [607:3](project/generated/prisma/models/DraftImage.ts#L607) | create | <code>create&lt;T extends DraftImageCreateArgs&gt;(args: Prisma.SelectSubset&lt;T, DraftImageCreateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__DraftImageClient&lt;r …</code> |
| [621:3](project/generated/prisma/models/DraftImage.ts#L621) | createMany | <code>createMany&lt;T extends DraftImageCreateManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, DraftImageCreateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt …</code> |
| [645:3](project/generated/prisma/models/DraftImage.ts#L645) | createManyAndReturn | <code>createManyAndReturn&lt;T extends DraftImageCreateManyAndReturnArgs&gt;(args?: Prisma.SelectSubset&lt;T, DraftImageCreateManyAndReturnArgs&lt;ExtArgs&gt;&gt …</code> |
| [659:3](project/generated/prisma/models/DraftImage.ts#L659) | delete | <code>delete&lt;T extends DraftImageDeleteArgs&gt;(args: Prisma.SelectSubset&lt;T, DraftImageDeleteArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__DraftImageClient&lt;r …</code> |
| [676:3](project/generated/prisma/models/DraftImage.ts#L676) | update | <code>update&lt;T extends DraftImageUpdateArgs&gt;(args: Prisma.SelectSubset&lt;T, DraftImageUpdateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__DraftImageClient&lt;r …</code> |
| [690:3](project/generated/prisma/models/DraftImage.ts#L690) | deleteMany | <code>deleteMany&lt;T extends DraftImageDeleteManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, DraftImageDeleteManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt …</code> |
| [709:3](project/generated/prisma/models/DraftImage.ts#L709) | updateMany | <code>updateMany&lt;T extends DraftImageUpdateManyArgs&gt;(args: Prisma.SelectSubset&lt;T, DraftImageUpdateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt; …</code> |
| [739:3](project/generated/prisma/models/DraftImage.ts#L739) | updateManyAndReturn | <code>updateManyAndReturn&lt;T extends DraftImageUpdateManyAndReturnArgs&gt;(args: Prisma.SelectSubset&lt;T, DraftImageUpdateManyAndReturnArgs&lt;ExtArgs&gt;&gt; …</code> |
| [758:3](project/generated/prisma/models/DraftImage.ts#L758) | upsert | <code>upsert&lt;T extends DraftImageUpsertArgs&gt;(args: Prisma.SelectSubset&lt;T, DraftImageUpsertArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__DraftImageClient&lt;r …</code> |
| [774:3](project/generated/prisma/models/DraftImage.ts#L774) | count | <code>count&lt;T extends DraftImageCountArgs&gt;( args?: Prisma.Subset&lt;T, DraftImageCountArgs&gt;, ): Prisma.PrismaPromise&lt; T extends runtime.Types.Utils.R …</code> |
| [808:3](project/generated/prisma/models/DraftImage.ts#L808) | aggregate | <code>aggregate&lt;T extends DraftImageAggregateArgs&gt;(args: Prisma.Subset&lt;T, DraftImageAggregateArgs&gt;): Prisma.PrismaPromise&lt;GetDraftImageAggregateTy …</code> |
| [828:3](project/generated/prisma/models/DraftImage.ts#L828) | groupBy | <code>groupBy&lt; T extends DraftImageGroupByArgs, HasSelectOrTake extends Prisma.Or&lt; Prisma.Extends&lt;'skip', Prisma.Keys&lt;T&gt;&gt;, Prisma.Extends&lt;'t …</code> |
| [900:3](project/generated/prisma/models/DraftImage.ts#L900) | draft | <code>draft&lt;T extends Prisma.PostDraftDefaultArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.PostDraftDefaultArgs&lt;ExtArgs&gt;&gt;): Prisma.P …</code> |
| [901:3](project/generated/prisma/models/DraftImage.ts#L901) | image | <code>image&lt;T extends Prisma.ImageAssetDefaultArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.ImageAssetDefaultArgs&lt;ExtArgs&gt;&gt;): Prisma …</code> |
| [908:3](project/generated/prisma/models/DraftImage.ts#L908) | then | <code>then&lt;TResult1 = T, TResult2 = never&gt;(onfulfilled?: ((value: T) =&gt; TResult1 &#124; PromiseLike&lt;TResult1&gt;) &#124; undefined &#124; null, onrej …</code> |
| [914:3](project/generated/prisma/models/DraftImage.ts#L914) | catch | <code>catch&lt;TResult = never&gt;(onrejected?: ((reason: any) =&gt; TResult &#124; PromiseLike&lt;TResult&gt;) &#124; undefined &#124; null): runtime.Types.Util …</code> |
| [921:3](project/generated/prisma/models/DraftImage.ts#L921) | finally | <code>finally(onfinally?: (() =&gt; void) &#124; undefined &#124; null): runtime.Types.Utils.JsPromise&lt;T&gt;</code> |

</details>

<a id="file-83"></a>

## project/generated/prisma/models/Friendship.ts

[원본 파일](project/generated/prisma/models/Friendship.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<details>
<summary>실행 본문이 없는 타입 시그니처 전체</summary>

| 위치 | 메서드/시그니처 | 선언 발췌 |
| --- | --- | --- |
| [653:3](project/generated/prisma/models/Friendship.ts#L653) | findUnique | <code>findUnique&lt;T extends FriendshipFindUniqueArgs&gt;(args: Prisma.SelectSubset&lt;T, FriendshipFindUniqueArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__Friendshi …</code> |
| [667:3](project/generated/prisma/models/Friendship.ts#L667) | findUniqueOrThrow | <code>findUniqueOrThrow&lt;T extends FriendshipFindUniqueOrThrowArgs&gt;(args: Prisma.SelectSubset&lt;T, FriendshipFindUniqueOrThrowArgs&lt;ExtArgs&gt;&gt;): Pri …</code> |
| [682:3](project/generated/prisma/models/Friendship.ts#L682) | findFirst | <code>findFirst&lt;T extends FriendshipFindFirstArgs&gt;(args?: Prisma.SelectSubset&lt;T, FriendshipFindFirstArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__FriendshipC …</code> |
| [698:3](project/generated/prisma/models/Friendship.ts#L698) | findFirstOrThrow | <code>findFirstOrThrow&lt;T extends FriendshipFindFirstOrThrowArgs&gt;(args?: Prisma.SelectSubset&lt;T, FriendshipFindFirstOrThrowArgs&lt;ExtArgs&gt;&gt;): Prism …</code> |
| [716:3](project/generated/prisma/models/Friendship.ts#L716) | findMany | <code>findMany&lt;T extends FriendshipFindManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, FriendshipFindManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;runti …</code> |
| [730:3](project/generated/prisma/models/Friendship.ts#L730) | create | <code>create&lt;T extends FriendshipCreateArgs&gt;(args: Prisma.SelectSubset&lt;T, FriendshipCreateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__FriendshipClient&lt;r …</code> |
| [744:3](project/generated/prisma/models/Friendship.ts#L744) | createMany | <code>createMany&lt;T extends FriendshipCreateManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, FriendshipCreateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt …</code> |
| [768:3](project/generated/prisma/models/Friendship.ts#L768) | createManyAndReturn | <code>createManyAndReturn&lt;T extends FriendshipCreateManyAndReturnArgs&gt;(args?: Prisma.SelectSubset&lt;T, FriendshipCreateManyAndReturnArgs&lt;ExtArgs&gt;&gt …</code> |
| [782:3](project/generated/prisma/models/Friendship.ts#L782) | delete | <code>delete&lt;T extends FriendshipDeleteArgs&gt;(args: Prisma.SelectSubset&lt;T, FriendshipDeleteArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__FriendshipClient&lt;r …</code> |
| [799:3](project/generated/prisma/models/Friendship.ts#L799) | update | <code>update&lt;T extends FriendshipUpdateArgs&gt;(args: Prisma.SelectSubset&lt;T, FriendshipUpdateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__FriendshipClient&lt;r …</code> |
| [813:3](project/generated/prisma/models/Friendship.ts#L813) | deleteMany | <code>deleteMany&lt;T extends FriendshipDeleteManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, FriendshipDeleteManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt …</code> |
| [832:3](project/generated/prisma/models/Friendship.ts#L832) | updateMany | <code>updateMany&lt;T extends FriendshipUpdateManyArgs&gt;(args: Prisma.SelectSubset&lt;T, FriendshipUpdateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt; …</code> |
| [862:3](project/generated/prisma/models/Friendship.ts#L862) | updateManyAndReturn | <code>updateManyAndReturn&lt;T extends FriendshipUpdateManyAndReturnArgs&gt;(args: Prisma.SelectSubset&lt;T, FriendshipUpdateManyAndReturnArgs&lt;ExtArgs&gt;&gt; …</code> |
| [881:3](project/generated/prisma/models/Friendship.ts#L881) | upsert | <code>upsert&lt;T extends FriendshipUpsertArgs&gt;(args: Prisma.SelectSubset&lt;T, FriendshipUpsertArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__FriendshipClient&lt;r …</code> |
| [897:3](project/generated/prisma/models/Friendship.ts#L897) | count | <code>count&lt;T extends FriendshipCountArgs&gt;( args?: Prisma.Subset&lt;T, FriendshipCountArgs&gt;, ): Prisma.PrismaPromise&lt; T extends runtime.Types.Utils.R …</code> |
| [931:3](project/generated/prisma/models/Friendship.ts#L931) | aggregate | <code>aggregate&lt;T extends FriendshipAggregateArgs&gt;(args: Prisma.Subset&lt;T, FriendshipAggregateArgs&gt;): Prisma.PrismaPromise&lt;GetFriendshipAggregateTy …</code> |
| [951:3](project/generated/prisma/models/Friendship.ts#L951) | groupBy | <code>groupBy&lt; T extends FriendshipGroupByArgs, HasSelectOrTake extends Prisma.Or&lt; Prisma.Extends&lt;'skip', Prisma.Keys&lt;T&gt;&gt;, Prisma.Extends&lt;'t …</code> |
| [1023:3](project/generated/prisma/models/Friendship.ts#L1023) | user | <code>user&lt;T extends Prisma.UserDefaultArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.UserDefaultArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__User …</code> |
| [1024:3](project/generated/prisma/models/Friendship.ts#L1024) | friend | <code>friend&lt;T extends Prisma.UserDefaultArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.UserDefaultArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__Us …</code> |
| [1031:3](project/generated/prisma/models/Friendship.ts#L1031) | then | <code>then&lt;TResult1 = T, TResult2 = never&gt;(onfulfilled?: ((value: T) =&gt; TResult1 &#124; PromiseLike&lt;TResult1&gt;) &#124; undefined &#124; null, onrej …</code> |
| [1037:3](project/generated/prisma/models/Friendship.ts#L1037) | catch | <code>catch&lt;TResult = never&gt;(onrejected?: ((reason: any) =&gt; TResult &#124; PromiseLike&lt;TResult&gt;) &#124; undefined &#124; null): runtime.Types.Util …</code> |
| [1044:3](project/generated/prisma/models/Friendship.ts#L1044) | finally | <code>finally(onfinally?: (() =&gt; void) &#124; undefined &#124; null): runtime.Types.Utils.JsPromise&lt;T&gt;</code> |

</details>

<a id="file-84"></a>

## project/generated/prisma/models/ImageAsset.ts

[원본 파일](project/generated/prisma/models/ImageAsset.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<details>
<summary>실행 본문이 없는 타입 시그니처 전체</summary>

| 위치 | 메서드/시그니처 | 선언 발췌 |
| --- | --- | --- |
| [687:3](project/generated/prisma/models/ImageAsset.ts#L687) | findUnique | <code>findUnique&lt;T extends ImageAssetFindUniqueArgs&gt;(args: Prisma.SelectSubset&lt;T, ImageAssetFindUniqueArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__ImageAsse …</code> |
| [701:3](project/generated/prisma/models/ImageAsset.ts#L701) | findUniqueOrThrow | <code>findUniqueOrThrow&lt;T extends ImageAssetFindUniqueOrThrowArgs&gt;(args: Prisma.SelectSubset&lt;T, ImageAssetFindUniqueOrThrowArgs&lt;ExtArgs&gt;&gt;): Pri …</code> |
| [716:3](project/generated/prisma/models/ImageAsset.ts#L716) | findFirst | <code>findFirst&lt;T extends ImageAssetFindFirstArgs&gt;(args?: Prisma.SelectSubset&lt;T, ImageAssetFindFirstArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__ImageAssetC …</code> |
| [732:3](project/generated/prisma/models/ImageAsset.ts#L732) | findFirstOrThrow | <code>findFirstOrThrow&lt;T extends ImageAssetFindFirstOrThrowArgs&gt;(args?: Prisma.SelectSubset&lt;T, ImageAssetFindFirstOrThrowArgs&lt;ExtArgs&gt;&gt;): Prism …</code> |
| [750:3](project/generated/prisma/models/ImageAsset.ts#L750) | findMany | <code>findMany&lt;T extends ImageAssetFindManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, ImageAssetFindManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;runti …</code> |
| [764:3](project/generated/prisma/models/ImageAsset.ts#L764) | create | <code>create&lt;T extends ImageAssetCreateArgs&gt;(args: Prisma.SelectSubset&lt;T, ImageAssetCreateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__ImageAssetClient&lt;r …</code> |
| [778:3](project/generated/prisma/models/ImageAsset.ts#L778) | createMany | <code>createMany&lt;T extends ImageAssetCreateManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, ImageAssetCreateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt …</code> |
| [802:3](project/generated/prisma/models/ImageAsset.ts#L802) | createManyAndReturn | <code>createManyAndReturn&lt;T extends ImageAssetCreateManyAndReturnArgs&gt;(args?: Prisma.SelectSubset&lt;T, ImageAssetCreateManyAndReturnArgs&lt;ExtArgs&gt;&gt …</code> |
| [816:3](project/generated/prisma/models/ImageAsset.ts#L816) | delete | <code>delete&lt;T extends ImageAssetDeleteArgs&gt;(args: Prisma.SelectSubset&lt;T, ImageAssetDeleteArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__ImageAssetClient&lt;r …</code> |
| [833:3](project/generated/prisma/models/ImageAsset.ts#L833) | update | <code>update&lt;T extends ImageAssetUpdateArgs&gt;(args: Prisma.SelectSubset&lt;T, ImageAssetUpdateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__ImageAssetClient&lt;r …</code> |
| [847:3](project/generated/prisma/models/ImageAsset.ts#L847) | deleteMany | <code>deleteMany&lt;T extends ImageAssetDeleteManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, ImageAssetDeleteManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt …</code> |
| [866:3](project/generated/prisma/models/ImageAsset.ts#L866) | updateMany | <code>updateMany&lt;T extends ImageAssetUpdateManyArgs&gt;(args: Prisma.SelectSubset&lt;T, ImageAssetUpdateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt; …</code> |
| [896:3](project/generated/prisma/models/ImageAsset.ts#L896) | updateManyAndReturn | <code>updateManyAndReturn&lt;T extends ImageAssetUpdateManyAndReturnArgs&gt;(args: Prisma.SelectSubset&lt;T, ImageAssetUpdateManyAndReturnArgs&lt;ExtArgs&gt;&gt; …</code> |
| [915:3](project/generated/prisma/models/ImageAsset.ts#L915) | upsert | <code>upsert&lt;T extends ImageAssetUpsertArgs&gt;(args: Prisma.SelectSubset&lt;T, ImageAssetUpsertArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__ImageAssetClient&lt;r …</code> |
| [931:3](project/generated/prisma/models/ImageAsset.ts#L931) | count | <code>count&lt;T extends ImageAssetCountArgs&gt;( args?: Prisma.Subset&lt;T, ImageAssetCountArgs&gt;, ): Prisma.PrismaPromise&lt; T extends runtime.Types.Utils.R …</code> |
| [965:3](project/generated/prisma/models/ImageAsset.ts#L965) | aggregate | <code>aggregate&lt;T extends ImageAssetAggregateArgs&gt;(args: Prisma.Subset&lt;T, ImageAssetAggregateArgs&gt;): Prisma.PrismaPromise&lt;GetImageAssetAggregateTy …</code> |
| [985:3](project/generated/prisma/models/ImageAsset.ts#L985) | groupBy | <code>groupBy&lt; T extends ImageAssetGroupByArgs, HasSelectOrTake extends Prisma.Or&lt; Prisma.Extends&lt;'skip', Prisma.Keys&lt;T&gt;&gt;, Prisma.Extends&lt;'t …</code> |
| [1057:3](project/generated/prisma/models/ImageAsset.ts#L1057) | owner | <code>owner&lt;T extends Prisma.UserDefaultArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.UserDefaultArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__Use …</code> |
| [1058:3](project/generated/prisma/models/ImageAsset.ts#L1058) | posts | <code>posts&lt;T extends Prisma.ImageAsset$postsArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.ImageAsset$postsArgs&lt;ExtArgs&gt;&gt;): Prisma.P …</code> |
| [1059:3](project/generated/prisma/models/ImageAsset.ts#L1059) | drafts | <code>drafts&lt;T extends Prisma.ImageAsset$draftsArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.ImageAsset$draftsArgs&lt;ExtArgs&gt;&gt;): Prism …</code> |
| [1066:3](project/generated/prisma/models/ImageAsset.ts#L1066) | then | <code>then&lt;TResult1 = T, TResult2 = never&gt;(onfulfilled?: ((value: T) =&gt; TResult1 &#124; PromiseLike&lt;TResult1&gt;) &#124; undefined &#124; null, onrej …</code> |
| [1072:3](project/generated/prisma/models/ImageAsset.ts#L1072) | catch | <code>catch&lt;TResult = never&gt;(onrejected?: ((reason: any) =&gt; TResult &#124; PromiseLike&lt;TResult&gt;) &#124; undefined &#124; null): runtime.Types.Util …</code> |
| [1079:3](project/generated/prisma/models/ImageAsset.ts#L1079) | finally | <code>finally(onfinally?: (() =&gt; void) &#124; undefined &#124; null): runtime.Types.Utils.JsPromise&lt;T&gt;</code> |

</details>

<a id="file-85"></a>

## project/generated/prisma/models/Message.ts

[원본 파일](project/generated/prisma/models/Message.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<details>
<summary>실행 본문이 없는 타입 시그니처 전체</summary>

| 위치 | 메서드/시그니처 | 선언 발췌 |
| --- | --- | --- |
| [726:3](project/generated/prisma/models/Message.ts#L726) | findUnique | <code>findUnique&lt;T extends MessageFindUniqueArgs&gt;(args: Prisma.SelectSubset&lt;T, MessageFindUniqueArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__MessageClient&l …</code> |
| [740:3](project/generated/prisma/models/Message.ts#L740) | findUniqueOrThrow | <code>findUniqueOrThrow&lt;T extends MessageFindUniqueOrThrowArgs&gt;(args: Prisma.SelectSubset&lt;T, MessageFindUniqueOrThrowArgs&lt;ExtArgs&gt;&gt;): Prisma.Pr …</code> |
| [755:3](project/generated/prisma/models/Message.ts#L755) | findFirst | <code>findFirst&lt;T extends MessageFindFirstArgs&gt;(args?: Prisma.SelectSubset&lt;T, MessageFindFirstArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__MessageClient&lt; …</code> |
| [771:3](project/generated/prisma/models/Message.ts#L771) | findFirstOrThrow | <code>findFirstOrThrow&lt;T extends MessageFindFirstOrThrowArgs&gt;(args?: Prisma.SelectSubset&lt;T, MessageFindFirstOrThrowArgs&lt;ExtArgs&gt;&gt;): Prisma.Pris …</code> |
| [789:3](project/generated/prisma/models/Message.ts#L789) | findMany | <code>findMany&lt;T extends MessageFindManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, MessageFindManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;runtime.Typ …</code> |
| [803:3](project/generated/prisma/models/Message.ts#L803) | create | <code>create&lt;T extends MessageCreateArgs&gt;(args: Prisma.SelectSubset&lt;T, MessageCreateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__MessageClient&lt;runtime.Ty …</code> |
| [817:3](project/generated/prisma/models/Message.ts#L817) | createMany | <code>createMany&lt;T extends MessageCreateManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, MessageCreateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Prism …</code> |
| [841:3](project/generated/prisma/models/Message.ts#L841) | createManyAndReturn | <code>createManyAndReturn&lt;T extends MessageCreateManyAndReturnArgs&gt;(args?: Prisma.SelectSubset&lt;T, MessageCreateManyAndReturnArgs&lt;ExtArgs&gt;&gt;): Pr …</code> |
| [855:3](project/generated/prisma/models/Message.ts#L855) | delete | <code>delete&lt;T extends MessageDeleteArgs&gt;(args: Prisma.SelectSubset&lt;T, MessageDeleteArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__MessageClient&lt;runtime.Ty …</code> |
| [872:3](project/generated/prisma/models/Message.ts#L872) | update | <code>update&lt;T extends MessageUpdateArgs&gt;(args: Prisma.SelectSubset&lt;T, MessageUpdateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__MessageClient&lt;runtime.Ty …</code> |
| [886:3](project/generated/prisma/models/Message.ts#L886) | deleteMany | <code>deleteMany&lt;T extends MessageDeleteManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, MessageDeleteManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Prism …</code> |
| [905:3](project/generated/prisma/models/Message.ts#L905) | updateMany | <code>updateMany&lt;T extends MessageUpdateManyArgs&gt;(args: Prisma.SelectSubset&lt;T, MessageUpdateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Prisma …</code> |
| [935:3](project/generated/prisma/models/Message.ts#L935) | updateManyAndReturn | <code>updateManyAndReturn&lt;T extends MessageUpdateManyAndReturnArgs&gt;(args: Prisma.SelectSubset&lt;T, MessageUpdateManyAndReturnArgs&lt;ExtArgs&gt;&gt;): Pri …</code> |
| [954:3](project/generated/prisma/models/Message.ts#L954) | upsert | <code>upsert&lt;T extends MessageUpsertArgs&gt;(args: Prisma.SelectSubset&lt;T, MessageUpsertArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__MessageClient&lt;runtime.Ty …</code> |
| [970:3](project/generated/prisma/models/Message.ts#L970) | count | <code>count&lt;T extends MessageCountArgs&gt;( args?: Prisma.Subset&lt;T, MessageCountArgs&gt;, ): Prisma.PrismaPromise&lt; T extends runtime.Types.Utils.Record& …</code> |
| [1004:3](project/generated/prisma/models/Message.ts#L1004) | aggregate | <code>aggregate&lt;T extends MessageAggregateArgs&gt;(args: Prisma.Subset&lt;T, MessageAggregateArgs&gt;): Prisma.PrismaPromise&lt;GetMessageAggregateType&lt;T&g …</code> |
| [1024:3](project/generated/prisma/models/Message.ts#L1024) | groupBy | <code>groupBy&lt; T extends MessageGroupByArgs, HasSelectOrTake extends Prisma.Or&lt; Prisma.Extends&lt;'skip', Prisma.Keys&lt;T&gt;&gt;, Prisma.Extends&lt;'take …</code> |
| [1096:3](project/generated/prisma/models/Message.ts#L1096) | conversation | <code>conversation&lt;T extends Prisma.ConversationDefaultArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.ConversationDefaultArgs&lt;ExtArgs&gt;&g …</code> |
| [1097:3](project/generated/prisma/models/Message.ts#L1097) | sender | <code>sender&lt;T extends Prisma.UserDefaultArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.UserDefaultArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__Us …</code> |
| [1104:3](project/generated/prisma/models/Message.ts#L1104) | then | <code>then&lt;TResult1 = T, TResult2 = never&gt;(onfulfilled?: ((value: T) =&gt; TResult1 &#124; PromiseLike&lt;TResult1&gt;) &#124; undefined &#124; null, onrej …</code> |
| [1110:3](project/generated/prisma/models/Message.ts#L1110) | catch | <code>catch&lt;TResult = never&gt;(onrejected?: ((reason: any) =&gt; TResult &#124; PromiseLike&lt;TResult&gt;) &#124; undefined &#124; null): runtime.Types.Util …</code> |
| [1117:3](project/generated/prisma/models/Message.ts#L1117) | finally | <code>finally(onfinally?: (() =&gt; void) &#124; undefined &#124; null): runtime.Types.Utils.JsPromise&lt;T&gt;</code> |

</details>

<a id="file-86"></a>

## project/generated/prisma/models/Notification.ts

[원본 파일](project/generated/prisma/models/Notification.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<details>
<summary>실행 본문이 없는 타입 시그니처 전체</summary>

| 위치 | 메서드/시그니처 | 선언 발췌 |
| --- | --- | --- |
| [609:3](project/generated/prisma/models/Notification.ts#L609) | findUnique | <code>findUnique&lt;T extends NotificationFindUniqueArgs&gt;(args: Prisma.SelectSubset&lt;T, NotificationFindUniqueArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__Notif …</code> |
| [623:3](project/generated/prisma/models/Notification.ts#L623) | findUniqueOrThrow | <code>findUniqueOrThrow&lt;T extends NotificationFindUniqueOrThrowArgs&gt;(args: Prisma.SelectSubset&lt;T, NotificationFindUniqueOrThrowArgs&lt;ExtArgs&gt;&gt;): …</code> |
| [638:3](project/generated/prisma/models/Notification.ts#L638) | findFirst | <code>findFirst&lt;T extends NotificationFindFirstArgs&gt;(args?: Prisma.SelectSubset&lt;T, NotificationFindFirstArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__Notific …</code> |
| [654:3](project/generated/prisma/models/Notification.ts#L654) | findFirstOrThrow | <code>findFirstOrThrow&lt;T extends NotificationFindFirstOrThrowArgs&gt;(args?: Prisma.SelectSubset&lt;T, NotificationFindFirstOrThrowArgs&lt;ExtArgs&gt;&gt;): P …</code> |
| [672:3](project/generated/prisma/models/Notification.ts#L672) | findMany | <code>findMany&lt;T extends NotificationFindManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, NotificationFindManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;r …</code> |
| [686:3](project/generated/prisma/models/Notification.ts#L686) | create | <code>create&lt;T extends NotificationCreateArgs&gt;(args: Prisma.SelectSubset&lt;T, NotificationCreateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__NotificationClien …</code> |
| [700:3](project/generated/prisma/models/Notification.ts#L700) | createMany | <code>createMany&lt;T extends NotificationCreateManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, NotificationCreateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromis …</code> |
| [724:3](project/generated/prisma/models/Notification.ts#L724) | createManyAndReturn | <code>createManyAndReturn&lt;T extends NotificationCreateManyAndReturnArgs&gt;(args?: Prisma.SelectSubset&lt;T, NotificationCreateManyAndReturnArgs&lt;ExtArgs&gt …</code> |
| [738:3](project/generated/prisma/models/Notification.ts#L738) | delete | <code>delete&lt;T extends NotificationDeleteArgs&gt;(args: Prisma.SelectSubset&lt;T, NotificationDeleteArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__NotificationClien …</code> |
| [755:3](project/generated/prisma/models/Notification.ts#L755) | update | <code>update&lt;T extends NotificationUpdateArgs&gt;(args: Prisma.SelectSubset&lt;T, NotificationUpdateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__NotificationClien …</code> |
| [769:3](project/generated/prisma/models/Notification.ts#L769) | deleteMany | <code>deleteMany&lt;T extends NotificationDeleteManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, NotificationDeleteManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromis …</code> |
| [788:3](project/generated/prisma/models/Notification.ts#L788) | updateMany | <code>updateMany&lt;T extends NotificationUpdateManyArgs&gt;(args: Prisma.SelectSubset&lt;T, NotificationUpdateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise …</code> |
| [818:3](project/generated/prisma/models/Notification.ts#L818) | updateManyAndReturn | <code>updateManyAndReturn&lt;T extends NotificationUpdateManyAndReturnArgs&gt;(args: Prisma.SelectSubset&lt;T, NotificationUpdateManyAndReturnArgs&lt;ExtArgs&gt; …</code> |
| [837:3](project/generated/prisma/models/Notification.ts#L837) | upsert | <code>upsert&lt;T extends NotificationUpsertArgs&gt;(args: Prisma.SelectSubset&lt;T, NotificationUpsertArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__NotificationClien …</code> |
| [853:3](project/generated/prisma/models/Notification.ts#L853) | count | <code>count&lt;T extends NotificationCountArgs&gt;( args?: Prisma.Subset&lt;T, NotificationCountArgs&gt;, ): Prisma.PrismaPromise&lt; T extends runtime.Types.Uti …</code> |
| [887:3](project/generated/prisma/models/Notification.ts#L887) | aggregate | <code>aggregate&lt;T extends NotificationAggregateArgs&gt;(args: Prisma.Subset&lt;T, NotificationAggregateArgs&gt;): Prisma.PrismaPromise&lt;GetNotificationAggre …</code> |
| [907:3](project/generated/prisma/models/Notification.ts#L907) | groupBy | <code>groupBy&lt; T extends NotificationGroupByArgs, HasSelectOrTake extends Prisma.Or&lt; Prisma.Extends&lt;'skip', Prisma.Keys&lt;T&gt;&gt;, Prisma.Extends&lt; …</code> |
| [979:3](project/generated/prisma/models/Notification.ts#L979) | recipient | <code>recipient&lt;T extends Prisma.UserDefaultArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.UserDefaultArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma_ …</code> |
| [980:3](project/generated/prisma/models/Notification.ts#L980) | comment | <code>comment&lt;T extends Prisma.CommentDefaultArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.CommentDefaultArgs&lt;ExtArgs&gt;&gt;): Prisma.Pri …</code> |
| [987:3](project/generated/prisma/models/Notification.ts#L987) | then | <code>then&lt;TResult1 = T, TResult2 = never&gt;(onfulfilled?: ((value: T) =&gt; TResult1 &#124; PromiseLike&lt;TResult1&gt;) &#124; undefined &#124; null, onrej …</code> |
| [993:3](project/generated/prisma/models/Notification.ts#L993) | catch | <code>catch&lt;TResult = never&gt;(onrejected?: ((reason: any) =&gt; TResult &#124; PromiseLike&lt;TResult&gt;) &#124; undefined &#124; null): runtime.Types.Util …</code> |
| [1000:3](project/generated/prisma/models/Notification.ts#L1000) | finally | <code>finally(onfinally?: (() =&gt; void) &#124; undefined &#124; null): runtime.Types.Utils.JsPromise&lt;T&gt;</code> |

</details>

<a id="file-87"></a>

## project/generated/prisma/models/Post.ts

[원본 파일](project/generated/prisma/models/Post.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<details>
<summary>실행 본문이 없는 타입 시그니처 전체</summary>

| 위치 | 메서드/시그니처 | 선언 발췌 |
| --- | --- | --- |
| [1457:3](project/generated/prisma/models/Post.ts#L1457) | findUnique | <code>findUnique&lt;T extends PostFindUniqueArgs&gt;(args: Prisma.SelectSubset&lt;T, PostFindUniqueArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostClient&lt;runtime …</code> |
| [1471:3](project/generated/prisma/models/Post.ts#L1471) | findUniqueOrThrow | <code>findUniqueOrThrow&lt;T extends PostFindUniqueOrThrowArgs&gt;(args: Prisma.SelectSubset&lt;T, PostFindUniqueOrThrowArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__ …</code> |
| [1486:3](project/generated/prisma/models/Post.ts#L1486) | findFirst | <code>findFirst&lt;T extends PostFindFirstArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostFindFirstArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostClient&lt;runtime.T …</code> |
| [1502:3](project/generated/prisma/models/Post.ts#L1502) | findFirstOrThrow | <code>findFirstOrThrow&lt;T extends PostFindFirstOrThrowArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostFindFirstOrThrowArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__Po …</code> |
| [1520:3](project/generated/prisma/models/Post.ts#L1520) | findMany | <code>findMany&lt;T extends PostFindManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostFindManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;runtime.Types.Res …</code> |
| [1534:3](project/generated/prisma/models/Post.ts#L1534) | create | <code>create&lt;T extends PostCreateArgs&gt;(args: Prisma.SelectSubset&lt;T, PostCreateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostClient&lt;runtime.Types.Resul …</code> |
| [1548:3](project/generated/prisma/models/Post.ts#L1548) | createMany | <code>createMany&lt;T extends PostCreateManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostCreateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Prisma.Batc …</code> |
| [1572:3](project/generated/prisma/models/Post.ts#L1572) | createManyAndReturn | <code>createManyAndReturn&lt;T extends PostCreateManyAndReturnArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostCreateManyAndReturnArgs&lt;ExtArgs&gt;&gt;): Prisma.P …</code> |
| [1586:3](project/generated/prisma/models/Post.ts#L1586) | delete | <code>delete&lt;T extends PostDeleteArgs&gt;(args: Prisma.SelectSubset&lt;T, PostDeleteArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostClient&lt;runtime.Types.Resul …</code> |
| [1603:3](project/generated/prisma/models/Post.ts#L1603) | update | <code>update&lt;T extends PostUpdateArgs&gt;(args: Prisma.SelectSubset&lt;T, PostUpdateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostClient&lt;runtime.Types.Resul …</code> |
| [1617:3](project/generated/prisma/models/Post.ts#L1617) | deleteMany | <code>deleteMany&lt;T extends PostDeleteManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostDeleteManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Prisma.Batc …</code> |
| [1636:3](project/generated/prisma/models/Post.ts#L1636) | updateMany | <code>updateMany&lt;T extends PostUpdateManyArgs&gt;(args: Prisma.SelectSubset&lt;T, PostUpdateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Prisma.Batch …</code> |
| [1666:3](project/generated/prisma/models/Post.ts#L1666) | updateManyAndReturn | <code>updateManyAndReturn&lt;T extends PostUpdateManyAndReturnArgs&gt;(args: Prisma.SelectSubset&lt;T, PostUpdateManyAndReturnArgs&lt;ExtArgs&gt;&gt;): Prisma.Pr …</code> |
| [1685:3](project/generated/prisma/models/Post.ts#L1685) | upsert | <code>upsert&lt;T extends PostUpsertArgs&gt;(args: Prisma.SelectSubset&lt;T, PostUpsertArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostClient&lt;runtime.Types.Resul …</code> |
| [1701:3](project/generated/prisma/models/Post.ts#L1701) | count | <code>count&lt;T extends PostCountArgs&gt;( args?: Prisma.Subset&lt;T, PostCountArgs&gt;, ): Prisma.PrismaPromise&lt; T extends runtime.Types.Utils.Record&lt;'se …</code> |
| [1735:3](project/generated/prisma/models/Post.ts#L1735) | aggregate | <code>aggregate&lt;T extends PostAggregateArgs&gt;(args: Prisma.Subset&lt;T, PostAggregateArgs&gt;): Prisma.PrismaPromise&lt;GetPostAggregateType&lt;T&gt;&gt;</code> |
| [1755:3](project/generated/prisma/models/Post.ts#L1755) | groupBy | <code>groupBy&lt; T extends PostGroupByArgs, HasSelectOrTake extends Prisma.Or&lt; Prisma.Extends&lt;'skip', Prisma.Keys&lt;T&gt;&gt;, Prisma.Extends&lt;'take',  …</code> |
| [1827:3](project/generated/prisma/models/Post.ts#L1827) | author | <code>author&lt;T extends Prisma.UserDefaultArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.UserDefaultArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__Us …</code> |
| [1828:3](project/generated/prisma/models/Post.ts#L1828) | category | <code>category&lt;T extends Prisma.Post$categoryArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.Post$categoryArgs&lt;ExtArgs&gt;&gt;): Prisma.Pris …</code> |
| [1829:3](project/generated/prisma/models/Post.ts#L1829) | drafts | <code>drafts&lt;T extends Prisma.Post$draftsArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.Post$draftsArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaProm …</code> |
| [1830:3](project/generated/prisma/models/Post.ts#L1830) | images | <code>images&lt;T extends Prisma.Post$imagesArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.Post$imagesArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaProm …</code> |
| [1831:3](project/generated/prisma/models/Post.ts#L1831) | likes | <code>likes&lt;T extends Prisma.Post$likesArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.Post$likesArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise …</code> |
| [1832:3](project/generated/prisma/models/Post.ts#L1832) | comments | <code>comments&lt;T extends Prisma.Post$commentsArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.Post$commentsArgs&lt;ExtArgs&gt;&gt;): Prisma.Pris …</code> |
| [1833:3](project/generated/prisma/models/Post.ts#L1833) | views | <code>views&lt;T extends Prisma.Post$viewsArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.Post$viewsArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise …</code> |
| [1840:3](project/generated/prisma/models/Post.ts#L1840) | then | <code>then&lt;TResult1 = T, TResult2 = never&gt;(onfulfilled?: ((value: T) =&gt; TResult1 &#124; PromiseLike&lt;TResult1&gt;) &#124; undefined &#124; null, onrej …</code> |
| [1846:3](project/generated/prisma/models/Post.ts#L1846) | catch | <code>catch&lt;TResult = never&gt;(onrejected?: ((reason: any) =&gt; TResult &#124; PromiseLike&lt;TResult&gt;) &#124; undefined &#124; null): runtime.Types.Util …</code> |
| [1853:3](project/generated/prisma/models/Post.ts#L1853) | finally | <code>finally(onfinally?: (() =&gt; void) &#124; undefined &#124; null): runtime.Types.Utils.JsPromise&lt;T&gt;</code> |

</details>

<a id="file-88"></a>

## project/generated/prisma/models/PostDraft.ts

[원본 파일](project/generated/prisma/models/PostDraft.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<details>
<summary>실행 본문이 없는 타입 시그니처 전체</summary>

| 위치 | 메서드/시그니처 | 선언 발췌 |
| --- | --- | --- |
| [1120:3](project/generated/prisma/models/PostDraft.ts#L1120) | findUnique | <code>findUnique&lt;T extends PostDraftFindUniqueArgs&gt;(args: Prisma.SelectSubset&lt;T, PostDraftFindUniqueArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostDraftCl …</code> |
| [1134:3](project/generated/prisma/models/PostDraft.ts#L1134) | findUniqueOrThrow | <code>findUniqueOrThrow&lt;T extends PostDraftFindUniqueOrThrowArgs&gt;(args: Prisma.SelectSubset&lt;T, PostDraftFindUniqueOrThrowArgs&lt;ExtArgs&gt;&gt;): Prism …</code> |
| [1149:3](project/generated/prisma/models/PostDraft.ts#L1149) | findFirst | <code>findFirst&lt;T extends PostDraftFindFirstArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostDraftFindFirstArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostDraftClie …</code> |
| [1165:3](project/generated/prisma/models/PostDraft.ts#L1165) | findFirstOrThrow | <code>findFirstOrThrow&lt;T extends PostDraftFindFirstOrThrowArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostDraftFindFirstOrThrowArgs&lt;ExtArgs&gt;&gt;): Prisma. …</code> |
| [1183:3](project/generated/prisma/models/PostDraft.ts#L1183) | findMany | <code>findMany&lt;T extends PostDraftFindManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostDraftFindManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;runtime …</code> |
| [1197:3](project/generated/prisma/models/PostDraft.ts#L1197) | create | <code>create&lt;T extends PostDraftCreateArgs&gt;(args: Prisma.SelectSubset&lt;T, PostDraftCreateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostDraftClient&lt;runt …</code> |
| [1211:3](project/generated/prisma/models/PostDraft.ts#L1211) | createMany | <code>createMany&lt;T extends PostDraftCreateManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostDraftCreateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;P …</code> |
| [1235:3](project/generated/prisma/models/PostDraft.ts#L1235) | createManyAndReturn | <code>createManyAndReturn&lt;T extends PostDraftCreateManyAndReturnArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostDraftCreateManyAndReturnArgs&lt;ExtArgs&gt;&gt;) …</code> |
| [1249:3](project/generated/prisma/models/PostDraft.ts#L1249) | delete | <code>delete&lt;T extends PostDraftDeleteArgs&gt;(args: Prisma.SelectSubset&lt;T, PostDraftDeleteArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostDraftClient&lt;runt …</code> |
| [1266:3](project/generated/prisma/models/PostDraft.ts#L1266) | update | <code>update&lt;T extends PostDraftUpdateArgs&gt;(args: Prisma.SelectSubset&lt;T, PostDraftUpdateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostDraftClient&lt;runt …</code> |
| [1280:3](project/generated/prisma/models/PostDraft.ts#L1280) | deleteMany | <code>deleteMany&lt;T extends PostDraftDeleteManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostDraftDeleteManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;P …</code> |
| [1299:3](project/generated/prisma/models/PostDraft.ts#L1299) | updateMany | <code>updateMany&lt;T extends PostDraftUpdateManyArgs&gt;(args: Prisma.SelectSubset&lt;T, PostDraftUpdateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Pr …</code> |
| [1329:3](project/generated/prisma/models/PostDraft.ts#L1329) | updateManyAndReturn | <code>updateManyAndReturn&lt;T extends PostDraftUpdateManyAndReturnArgs&gt;(args: Prisma.SelectSubset&lt;T, PostDraftUpdateManyAndReturnArgs&lt;ExtArgs&gt;&gt;): …</code> |
| [1348:3](project/generated/prisma/models/PostDraft.ts#L1348) | upsert | <code>upsert&lt;T extends PostDraftUpsertArgs&gt;(args: Prisma.SelectSubset&lt;T, PostDraftUpsertArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostDraftClient&lt;runt …</code> |
| [1364:3](project/generated/prisma/models/PostDraft.ts#L1364) | count | <code>count&lt;T extends PostDraftCountArgs&gt;( args?: Prisma.Subset&lt;T, PostDraftCountArgs&gt;, ): Prisma.PrismaPromise&lt; T extends runtime.Types.Utils.Rec …</code> |
| [1398:3](project/generated/prisma/models/PostDraft.ts#L1398) | aggregate | <code>aggregate&lt;T extends PostDraftAggregateArgs&gt;(args: Prisma.Subset&lt;T, PostDraftAggregateArgs&gt;): Prisma.PrismaPromise&lt;GetPostDraftAggregateType& …</code> |
| [1418:3](project/generated/prisma/models/PostDraft.ts#L1418) | groupBy | <code>groupBy&lt; T extends PostDraftGroupByArgs, HasSelectOrTake extends Prisma.Or&lt; Prisma.Extends&lt;'skip', Prisma.Keys&lt;T&gt;&gt;, Prisma.Extends&lt;'ta …</code> |
| [1490:3](project/generated/prisma/models/PostDraft.ts#L1490) | user | <code>user&lt;T extends Prisma.UserDefaultArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.UserDefaultArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__User …</code> |
| [1491:3](project/generated/prisma/models/PostDraft.ts#L1491) | post | <code>post&lt;T extends Prisma.PostDraft$postArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.PostDraft$postArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma …</code> |
| [1492:3](project/generated/prisma/models/PostDraft.ts#L1492) | images | <code>images&lt;T extends Prisma.PostDraft$imagesArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.PostDraft$imagesArgs&lt;ExtArgs&gt;&gt;): Prisma. …</code> |
| [1499:3](project/generated/prisma/models/PostDraft.ts#L1499) | then | <code>then&lt;TResult1 = T, TResult2 = never&gt;(onfulfilled?: ((value: T) =&gt; TResult1 &#124; PromiseLike&lt;TResult1&gt;) &#124; undefined &#124; null, onrej …</code> |
| [1505:3](project/generated/prisma/models/PostDraft.ts#L1505) | catch | <code>catch&lt;TResult = never&gt;(onrejected?: ((reason: any) =&gt; TResult &#124; PromiseLike&lt;TResult&gt;) &#124; undefined &#124; null): runtime.Types.Util …</code> |
| [1512:3](project/generated/prisma/models/PostDraft.ts#L1512) | finally | <code>finally(onfinally?: (() =&gt; void) &#124; undefined &#124; null): runtime.Types.Utils.JsPromise&lt;T&gt;</code> |

</details>

<a id="file-89"></a>

## project/generated/prisma/models/PostImage.ts

[원본 파일](project/generated/prisma/models/PostImage.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<details>
<summary>실행 본문이 없는 타입 시그니처 전체</summary>

| 위치 | 메서드/시그니처 | 선언 발췌 |
| --- | --- | --- |
| [530:3](project/generated/prisma/models/PostImage.ts#L530) | findUnique | <code>findUnique&lt;T extends PostImageFindUniqueArgs&gt;(args: Prisma.SelectSubset&lt;T, PostImageFindUniqueArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostImageCl …</code> |
| [544:3](project/generated/prisma/models/PostImage.ts#L544) | findUniqueOrThrow | <code>findUniqueOrThrow&lt;T extends PostImageFindUniqueOrThrowArgs&gt;(args: Prisma.SelectSubset&lt;T, PostImageFindUniqueOrThrowArgs&lt;ExtArgs&gt;&gt;): Prism …</code> |
| [559:3](project/generated/prisma/models/PostImage.ts#L559) | findFirst | <code>findFirst&lt;T extends PostImageFindFirstArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostImageFindFirstArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostImageClie …</code> |
| [575:3](project/generated/prisma/models/PostImage.ts#L575) | findFirstOrThrow | <code>findFirstOrThrow&lt;T extends PostImageFindFirstOrThrowArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostImageFindFirstOrThrowArgs&lt;ExtArgs&gt;&gt;): Prisma. …</code> |
| [593:3](project/generated/prisma/models/PostImage.ts#L593) | findMany | <code>findMany&lt;T extends PostImageFindManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostImageFindManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;runtime …</code> |
| [607:3](project/generated/prisma/models/PostImage.ts#L607) | create | <code>create&lt;T extends PostImageCreateArgs&gt;(args: Prisma.SelectSubset&lt;T, PostImageCreateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostImageClient&lt;runt …</code> |
| [621:3](project/generated/prisma/models/PostImage.ts#L621) | createMany | <code>createMany&lt;T extends PostImageCreateManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostImageCreateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;P …</code> |
| [645:3](project/generated/prisma/models/PostImage.ts#L645) | createManyAndReturn | <code>createManyAndReturn&lt;T extends PostImageCreateManyAndReturnArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostImageCreateManyAndReturnArgs&lt;ExtArgs&gt;&gt;) …</code> |
| [659:3](project/generated/prisma/models/PostImage.ts#L659) | delete | <code>delete&lt;T extends PostImageDeleteArgs&gt;(args: Prisma.SelectSubset&lt;T, PostImageDeleteArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostImageClient&lt;runt …</code> |
| [676:3](project/generated/prisma/models/PostImage.ts#L676) | update | <code>update&lt;T extends PostImageUpdateArgs&gt;(args: Prisma.SelectSubset&lt;T, PostImageUpdateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostImageClient&lt;runt …</code> |
| [690:3](project/generated/prisma/models/PostImage.ts#L690) | deleteMany | <code>deleteMany&lt;T extends PostImageDeleteManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostImageDeleteManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;P …</code> |
| [709:3](project/generated/prisma/models/PostImage.ts#L709) | updateMany | <code>updateMany&lt;T extends PostImageUpdateManyArgs&gt;(args: Prisma.SelectSubset&lt;T, PostImageUpdateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Pr …</code> |
| [739:3](project/generated/prisma/models/PostImage.ts#L739) | updateManyAndReturn | <code>updateManyAndReturn&lt;T extends PostImageUpdateManyAndReturnArgs&gt;(args: Prisma.SelectSubset&lt;T, PostImageUpdateManyAndReturnArgs&lt;ExtArgs&gt;&gt;): …</code> |
| [758:3](project/generated/prisma/models/PostImage.ts#L758) | upsert | <code>upsert&lt;T extends PostImageUpsertArgs&gt;(args: Prisma.SelectSubset&lt;T, PostImageUpsertArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostImageClient&lt;runt …</code> |
| [774:3](project/generated/prisma/models/PostImage.ts#L774) | count | <code>count&lt;T extends PostImageCountArgs&gt;( args?: Prisma.Subset&lt;T, PostImageCountArgs&gt;, ): Prisma.PrismaPromise&lt; T extends runtime.Types.Utils.Rec …</code> |
| [808:3](project/generated/prisma/models/PostImage.ts#L808) | aggregate | <code>aggregate&lt;T extends PostImageAggregateArgs&gt;(args: Prisma.Subset&lt;T, PostImageAggregateArgs&gt;): Prisma.PrismaPromise&lt;GetPostImageAggregateType& …</code> |
| [828:3](project/generated/prisma/models/PostImage.ts#L828) | groupBy | <code>groupBy&lt; T extends PostImageGroupByArgs, HasSelectOrTake extends Prisma.Or&lt; Prisma.Extends&lt;'skip', Prisma.Keys&lt;T&gt;&gt;, Prisma.Extends&lt;'ta …</code> |
| [900:3](project/generated/prisma/models/PostImage.ts#L900) | post | <code>post&lt;T extends Prisma.PostDefaultArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.PostDefaultArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__Post …</code> |
| [901:3](project/generated/prisma/models/PostImage.ts#L901) | image | <code>image&lt;T extends Prisma.ImageAssetDefaultArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.ImageAssetDefaultArgs&lt;ExtArgs&gt;&gt;): Prisma …</code> |
| [908:3](project/generated/prisma/models/PostImage.ts#L908) | then | <code>then&lt;TResult1 = T, TResult2 = never&gt;(onfulfilled?: ((value: T) =&gt; TResult1 &#124; PromiseLike&lt;TResult1&gt;) &#124; undefined &#124; null, onrej …</code> |
| [914:3](project/generated/prisma/models/PostImage.ts#L914) | catch | <code>catch&lt;TResult = never&gt;(onrejected?: ((reason: any) =&gt; TResult &#124; PromiseLike&lt;TResult&gt;) &#124; undefined &#124; null): runtime.Types.Util …</code> |
| [921:3](project/generated/prisma/models/PostImage.ts#L921) | finally | <code>finally(onfinally?: (() =&gt; void) &#124; undefined &#124; null): runtime.Types.Utils.JsPromise&lt;T&gt;</code> |

</details>

<a id="file-90"></a>

## project/generated/prisma/models/PostLike.ts

[원본 파일](project/generated/prisma/models/PostLike.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<details>
<summary>실행 본문이 없는 타입 시그니처 전체</summary>

| 위치 | 메서드/시그니처 | 선언 발췌 |
| --- | --- | --- |
| [569:3](project/generated/prisma/models/PostLike.ts#L569) | findUnique | <code>findUnique&lt;T extends PostLikeFindUniqueArgs&gt;(args: Prisma.SelectSubset&lt;T, PostLikeFindUniqueArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostLikeClien …</code> |
| [583:3](project/generated/prisma/models/PostLike.ts#L583) | findUniqueOrThrow | <code>findUniqueOrThrow&lt;T extends PostLikeFindUniqueOrThrowArgs&gt;(args: Prisma.SelectSubset&lt;T, PostLikeFindUniqueOrThrowArgs&lt;ExtArgs&gt;&gt;): Prisma. …</code> |
| [598:3](project/generated/prisma/models/PostLike.ts#L598) | findFirst | <code>findFirst&lt;T extends PostLikeFindFirstArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostLikeFindFirstArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostLikeClient& …</code> |
| [614:3](project/generated/prisma/models/PostLike.ts#L614) | findFirstOrThrow | <code>findFirstOrThrow&lt;T extends PostLikeFindFirstOrThrowArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostLikeFindFirstOrThrowArgs&lt;ExtArgs&gt;&gt;): Prisma.Pr …</code> |
| [632:3](project/generated/prisma/models/PostLike.ts#L632) | findMany | <code>findMany&lt;T extends PostLikeFindManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostLikeFindManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;runtime.T …</code> |
| [646:3](project/generated/prisma/models/PostLike.ts#L646) | create | <code>create&lt;T extends PostLikeCreateArgs&gt;(args: Prisma.SelectSubset&lt;T, PostLikeCreateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostLikeClient&lt;runtime …</code> |
| [660:3](project/generated/prisma/models/PostLike.ts#L660) | createMany | <code>createMany&lt;T extends PostLikeCreateManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostLikeCreateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Pri …</code> |
| [684:3](project/generated/prisma/models/PostLike.ts#L684) | createManyAndReturn | <code>createManyAndReturn&lt;T extends PostLikeCreateManyAndReturnArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostLikeCreateManyAndReturnArgs&lt;ExtArgs&gt;&gt;):  …</code> |
| [698:3](project/generated/prisma/models/PostLike.ts#L698) | delete | <code>delete&lt;T extends PostLikeDeleteArgs&gt;(args: Prisma.SelectSubset&lt;T, PostLikeDeleteArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostLikeClient&lt;runtime …</code> |
| [715:3](project/generated/prisma/models/PostLike.ts#L715) | update | <code>update&lt;T extends PostLikeUpdateArgs&gt;(args: Prisma.SelectSubset&lt;T, PostLikeUpdateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostLikeClient&lt;runtime …</code> |
| [729:3](project/generated/prisma/models/PostLike.ts#L729) | deleteMany | <code>deleteMany&lt;T extends PostLikeDeleteManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostLikeDeleteManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Pri …</code> |
| [748:3](project/generated/prisma/models/PostLike.ts#L748) | updateMany | <code>updateMany&lt;T extends PostLikeUpdateManyArgs&gt;(args: Prisma.SelectSubset&lt;T, PostLikeUpdateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Pris …</code> |
| [778:3](project/generated/prisma/models/PostLike.ts#L778) | updateManyAndReturn | <code>updateManyAndReturn&lt;T extends PostLikeUpdateManyAndReturnArgs&gt;(args: Prisma.SelectSubset&lt;T, PostLikeUpdateManyAndReturnArgs&lt;ExtArgs&gt;&gt;): P …</code> |
| [797:3](project/generated/prisma/models/PostLike.ts#L797) | upsert | <code>upsert&lt;T extends PostLikeUpsertArgs&gt;(args: Prisma.SelectSubset&lt;T, PostLikeUpsertArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostLikeClient&lt;runtime …</code> |
| [813:3](project/generated/prisma/models/PostLike.ts#L813) | count | <code>count&lt;T extends PostLikeCountArgs&gt;( args?: Prisma.Subset&lt;T, PostLikeCountArgs&gt;, ): Prisma.PrismaPromise&lt; T extends runtime.Types.Utils.Recor …</code> |
| [847:3](project/generated/prisma/models/PostLike.ts#L847) | aggregate | <code>aggregate&lt;T extends PostLikeAggregateArgs&gt;(args: Prisma.Subset&lt;T, PostLikeAggregateArgs&gt;): Prisma.PrismaPromise&lt;GetPostLikeAggregateType&lt; …</code> |
| [867:3](project/generated/prisma/models/PostLike.ts#L867) | groupBy | <code>groupBy&lt; T extends PostLikeGroupByArgs, HasSelectOrTake extends Prisma.Or&lt; Prisma.Extends&lt;'skip', Prisma.Keys&lt;T&gt;&gt;, Prisma.Extends&lt;'tak …</code> |
| [939:3](project/generated/prisma/models/PostLike.ts#L939) | post | <code>post&lt;T extends Prisma.PostDefaultArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.PostDefaultArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__Post …</code> |
| [940:3](project/generated/prisma/models/PostLike.ts#L940) | user | <code>user&lt;T extends Prisma.UserDefaultArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.UserDefaultArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__User …</code> |
| [947:3](project/generated/prisma/models/PostLike.ts#L947) | then | <code>then&lt;TResult1 = T, TResult2 = never&gt;(onfulfilled?: ((value: T) =&gt; TResult1 &#124; PromiseLike&lt;TResult1&gt;) &#124; undefined &#124; null, onrej …</code> |
| [953:3](project/generated/prisma/models/PostLike.ts#L953) | catch | <code>catch&lt;TResult = never&gt;(onrejected?: ((reason: any) =&gt; TResult &#124; PromiseLike&lt;TResult&gt;) &#124; undefined &#124; null): runtime.Types.Util …</code> |
| [960:3](project/generated/prisma/models/PostLike.ts#L960) | finally | <code>finally(onfinally?: (() =&gt; void) &#124; undefined &#124; null): runtime.Types.Utils.JsPromise&lt;T&gt;</code> |

</details>

<a id="file-91"></a>

## project/generated/prisma/models/PostView.ts

[원본 파일](project/generated/prisma/models/PostView.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<details>
<summary>실행 본문이 없는 타입 시그니처 전체</summary>

| 위치 | 메서드/시그니처 | 선언 발췌 |
| --- | --- | --- |
| [497:3](project/generated/prisma/models/PostView.ts#L497) | findUnique | <code>findUnique&lt;T extends PostViewFindUniqueArgs&gt;(args: Prisma.SelectSubset&lt;T, PostViewFindUniqueArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostViewClien …</code> |
| [511:3](project/generated/prisma/models/PostView.ts#L511) | findUniqueOrThrow | <code>findUniqueOrThrow&lt;T extends PostViewFindUniqueOrThrowArgs&gt;(args: Prisma.SelectSubset&lt;T, PostViewFindUniqueOrThrowArgs&lt;ExtArgs&gt;&gt;): Prisma. …</code> |
| [526:3](project/generated/prisma/models/PostView.ts#L526) | findFirst | <code>findFirst&lt;T extends PostViewFindFirstArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostViewFindFirstArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostViewClient& …</code> |
| [542:3](project/generated/prisma/models/PostView.ts#L542) | findFirstOrThrow | <code>findFirstOrThrow&lt;T extends PostViewFindFirstOrThrowArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostViewFindFirstOrThrowArgs&lt;ExtArgs&gt;&gt;): Prisma.Pr …</code> |
| [560:3](project/generated/prisma/models/PostView.ts#L560) | findMany | <code>findMany&lt;T extends PostViewFindManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostViewFindManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;runtime.T …</code> |
| [574:3](project/generated/prisma/models/PostView.ts#L574) | create | <code>create&lt;T extends PostViewCreateArgs&gt;(args: Prisma.SelectSubset&lt;T, PostViewCreateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostViewClient&lt;runtime …</code> |
| [588:3](project/generated/prisma/models/PostView.ts#L588) | createMany | <code>createMany&lt;T extends PostViewCreateManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostViewCreateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Pri …</code> |
| [612:3](project/generated/prisma/models/PostView.ts#L612) | createManyAndReturn | <code>createManyAndReturn&lt;T extends PostViewCreateManyAndReturnArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostViewCreateManyAndReturnArgs&lt;ExtArgs&gt;&gt;):  …</code> |
| [626:3](project/generated/prisma/models/PostView.ts#L626) | delete | <code>delete&lt;T extends PostViewDeleteArgs&gt;(args: Prisma.SelectSubset&lt;T, PostViewDeleteArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostViewClient&lt;runtime …</code> |
| [643:3](project/generated/prisma/models/PostView.ts#L643) | update | <code>update&lt;T extends PostViewUpdateArgs&gt;(args: Prisma.SelectSubset&lt;T, PostViewUpdateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostViewClient&lt;runtime …</code> |
| [657:3](project/generated/prisma/models/PostView.ts#L657) | deleteMany | <code>deleteMany&lt;T extends PostViewDeleteManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, PostViewDeleteManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Pri …</code> |
| [676:3](project/generated/prisma/models/PostView.ts#L676) | updateMany | <code>updateMany&lt;T extends PostViewUpdateManyArgs&gt;(args: Prisma.SelectSubset&lt;T, PostViewUpdateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Pris …</code> |
| [706:3](project/generated/prisma/models/PostView.ts#L706) | updateManyAndReturn | <code>updateManyAndReturn&lt;T extends PostViewUpdateManyAndReturnArgs&gt;(args: Prisma.SelectSubset&lt;T, PostViewUpdateManyAndReturnArgs&lt;ExtArgs&gt;&gt;): P …</code> |
| [725:3](project/generated/prisma/models/PostView.ts#L725) | upsert | <code>upsert&lt;T extends PostViewUpsertArgs&gt;(args: Prisma.SelectSubset&lt;T, PostViewUpsertArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__PostViewClient&lt;runtime …</code> |
| [741:3](project/generated/prisma/models/PostView.ts#L741) | count | <code>count&lt;T extends PostViewCountArgs&gt;( args?: Prisma.Subset&lt;T, PostViewCountArgs&gt;, ): Prisma.PrismaPromise&lt; T extends runtime.Types.Utils.Recor …</code> |
| [775:3](project/generated/prisma/models/PostView.ts#L775) | aggregate | <code>aggregate&lt;T extends PostViewAggregateArgs&gt;(args: Prisma.Subset&lt;T, PostViewAggregateArgs&gt;): Prisma.PrismaPromise&lt;GetPostViewAggregateType&lt; …</code> |
| [795:3](project/generated/prisma/models/PostView.ts#L795) | groupBy | <code>groupBy&lt; T extends PostViewGroupByArgs, HasSelectOrTake extends Prisma.Or&lt; Prisma.Extends&lt;'skip', Prisma.Keys&lt;T&gt;&gt;, Prisma.Extends&lt;'tak …</code> |
| [867:3](project/generated/prisma/models/PostView.ts#L867) | post | <code>post&lt;T extends Prisma.PostDefaultArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.PostDefaultArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__Post …</code> |
| [874:3](project/generated/prisma/models/PostView.ts#L874) | then | <code>then&lt;TResult1 = T, TResult2 = never&gt;(onfulfilled?: ((value: T) =&gt; TResult1 &#124; PromiseLike&lt;TResult1&gt;) &#124; undefined &#124; null, onrej …</code> |
| [880:3](project/generated/prisma/models/PostView.ts#L880) | catch | <code>catch&lt;TResult = never&gt;(onrejected?: ((reason: any) =&gt; TResult &#124; PromiseLike&lt;TResult&gt;) &#124; undefined &#124; null): runtime.Types.Util …</code> |
| [887:3](project/generated/prisma/models/PostView.ts#L887) | finally | <code>finally(onfinally?: (() =&gt; void) &#124; undefined &#124; null): runtime.Types.Utils.JsPromise&lt;T&gt;</code> |

</details>

<a id="file-92"></a>

## project/generated/prisma/models/Todo.ts

[원본 파일](project/generated/prisma/models/Todo.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<details>
<summary>실행 본문이 없는 타입 시그니처 전체</summary>

| 위치 | 메서드/시그니처 | 선언 발췌 |
| --- | --- | --- |
| [592:3](project/generated/prisma/models/Todo.ts#L592) | findUnique | <code>findUnique&lt;T extends TodoFindUniqueArgs&gt;(args: Prisma.SelectSubset&lt;T, TodoFindUniqueArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__TodoClient&lt;runtime …</code> |
| [606:3](project/generated/prisma/models/Todo.ts#L606) | findUniqueOrThrow | <code>findUniqueOrThrow&lt;T extends TodoFindUniqueOrThrowArgs&gt;(args: Prisma.SelectSubset&lt;T, TodoFindUniqueOrThrowArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__ …</code> |
| [621:3](project/generated/prisma/models/Todo.ts#L621) | findFirst | <code>findFirst&lt;T extends TodoFindFirstArgs&gt;(args?: Prisma.SelectSubset&lt;T, TodoFindFirstArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__TodoClient&lt;runtime.T …</code> |
| [637:3](project/generated/prisma/models/Todo.ts#L637) | findFirstOrThrow | <code>findFirstOrThrow&lt;T extends TodoFindFirstOrThrowArgs&gt;(args?: Prisma.SelectSubset&lt;T, TodoFindFirstOrThrowArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__To …</code> |
| [655:3](project/generated/prisma/models/Todo.ts#L655) | findMany | <code>findMany&lt;T extends TodoFindManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, TodoFindManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;runtime.Types.Res …</code> |
| [669:3](project/generated/prisma/models/Todo.ts#L669) | create | <code>create&lt;T extends TodoCreateArgs&gt;(args: Prisma.SelectSubset&lt;T, TodoCreateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__TodoClient&lt;runtime.Types.Resul …</code> |
| [683:3](project/generated/prisma/models/Todo.ts#L683) | createMany | <code>createMany&lt;T extends TodoCreateManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, TodoCreateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Prisma.Batc …</code> |
| [707:3](project/generated/prisma/models/Todo.ts#L707) | createManyAndReturn | <code>createManyAndReturn&lt;T extends TodoCreateManyAndReturnArgs&gt;(args?: Prisma.SelectSubset&lt;T, TodoCreateManyAndReturnArgs&lt;ExtArgs&gt;&gt;): Prisma.P …</code> |
| [721:3](project/generated/prisma/models/Todo.ts#L721) | delete | <code>delete&lt;T extends TodoDeleteArgs&gt;(args: Prisma.SelectSubset&lt;T, TodoDeleteArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__TodoClient&lt;runtime.Types.Resul …</code> |
| [738:3](project/generated/prisma/models/Todo.ts#L738) | update | <code>update&lt;T extends TodoUpdateArgs&gt;(args: Prisma.SelectSubset&lt;T, TodoUpdateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__TodoClient&lt;runtime.Types.Resul …</code> |
| [752:3](project/generated/prisma/models/Todo.ts#L752) | deleteMany | <code>deleteMany&lt;T extends TodoDeleteManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, TodoDeleteManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Prisma.Batc …</code> |
| [771:3](project/generated/prisma/models/Todo.ts#L771) | updateMany | <code>updateMany&lt;T extends TodoUpdateManyArgs&gt;(args: Prisma.SelectSubset&lt;T, TodoUpdateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Prisma.Batch …</code> |
| [801:3](project/generated/prisma/models/Todo.ts#L801) | updateManyAndReturn | <code>updateManyAndReturn&lt;T extends TodoUpdateManyAndReturnArgs&gt;(args: Prisma.SelectSubset&lt;T, TodoUpdateManyAndReturnArgs&lt;ExtArgs&gt;&gt;): Prisma.Pr …</code> |
| [820:3](project/generated/prisma/models/Todo.ts#L820) | upsert | <code>upsert&lt;T extends TodoUpsertArgs&gt;(args: Prisma.SelectSubset&lt;T, TodoUpsertArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__TodoClient&lt;runtime.Types.Resul …</code> |
| [836:3](project/generated/prisma/models/Todo.ts#L836) | count | <code>count&lt;T extends TodoCountArgs&gt;( args?: Prisma.Subset&lt;T, TodoCountArgs&gt;, ): Prisma.PrismaPromise&lt; T extends runtime.Types.Utils.Record&lt;'se …</code> |
| [870:3](project/generated/prisma/models/Todo.ts#L870) | aggregate | <code>aggregate&lt;T extends TodoAggregateArgs&gt;(args: Prisma.Subset&lt;T, TodoAggregateArgs&gt;): Prisma.PrismaPromise&lt;GetTodoAggregateType&lt;T&gt;&gt;</code> |
| [890:3](project/generated/prisma/models/Todo.ts#L890) | groupBy | <code>groupBy&lt; T extends TodoGroupByArgs, HasSelectOrTake extends Prisma.Or&lt; Prisma.Extends&lt;'skip', Prisma.Keys&lt;T&gt;&gt;, Prisma.Extends&lt;'take',  …</code> |
| [962:3](project/generated/prisma/models/Todo.ts#L962) | user | <code>user&lt;T extends Prisma.UserDefaultArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.UserDefaultArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__User …</code> |
| [969:3](project/generated/prisma/models/Todo.ts#L969) | then | <code>then&lt;TResult1 = T, TResult2 = never&gt;(onfulfilled?: ((value: T) =&gt; TResult1 &#124; PromiseLike&lt;TResult1&gt;) &#124; undefined &#124; null, onrej …</code> |
| [975:3](project/generated/prisma/models/Todo.ts#L975) | catch | <code>catch&lt;TResult = never&gt;(onrejected?: ((reason: any) =&gt; TResult &#124; PromiseLike&lt;TResult&gt;) &#124; undefined &#124; null): runtime.Types.Util …</code> |
| [982:3](project/generated/prisma/models/Todo.ts#L982) | finally | <code>finally(onfinally?: (() =&gt; void) &#124; undefined &#124; null): runtime.Types.Utils.JsPromise&lt;T&gt;</code> |

</details>

<a id="file-93"></a>

## project/generated/prisma/models/User.ts

[원본 파일](project/generated/prisma/models/User.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<details>
<summary>실행 본문이 없는 타입 시그니처 전체</summary>

| 위치 | 메서드/시그니처 | 선언 발췌 |
| --- | --- | --- |
| [2798:3](project/generated/prisma/models/User.ts#L2798) | findUnique | <code>findUnique&lt;T extends UserFindUniqueArgs&gt;(args: Prisma.SelectSubset&lt;T, UserFindUniqueArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__UserClient&lt;runtime …</code> |
| [2812:3](project/generated/prisma/models/User.ts#L2812) | findUniqueOrThrow | <code>findUniqueOrThrow&lt;T extends UserFindUniqueOrThrowArgs&gt;(args: Prisma.SelectSubset&lt;T, UserFindUniqueOrThrowArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__ …</code> |
| [2827:3](project/generated/prisma/models/User.ts#L2827) | findFirst | <code>findFirst&lt;T extends UserFindFirstArgs&gt;(args?: Prisma.SelectSubset&lt;T, UserFindFirstArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__UserClient&lt;runtime.T …</code> |
| [2843:3](project/generated/prisma/models/User.ts#L2843) | findFirstOrThrow | <code>findFirstOrThrow&lt;T extends UserFindFirstOrThrowArgs&gt;(args?: Prisma.SelectSubset&lt;T, UserFindFirstOrThrowArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__Us …</code> |
| [2861:3](project/generated/prisma/models/User.ts#L2861) | findMany | <code>findMany&lt;T extends UserFindManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, UserFindManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;runtime.Types.Res …</code> |
| [2875:3](project/generated/prisma/models/User.ts#L2875) | create | <code>create&lt;T extends UserCreateArgs&gt;(args: Prisma.SelectSubset&lt;T, UserCreateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__UserClient&lt;runtime.Types.Resul …</code> |
| [2889:3](project/generated/prisma/models/User.ts#L2889) | createMany | <code>createMany&lt;T extends UserCreateManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, UserCreateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Prisma.Batc …</code> |
| [2913:3](project/generated/prisma/models/User.ts#L2913) | createManyAndReturn | <code>createManyAndReturn&lt;T extends UserCreateManyAndReturnArgs&gt;(args?: Prisma.SelectSubset&lt;T, UserCreateManyAndReturnArgs&lt;ExtArgs&gt;&gt;): Prisma.P …</code> |
| [2927:3](project/generated/prisma/models/User.ts#L2927) | delete | <code>delete&lt;T extends UserDeleteArgs&gt;(args: Prisma.SelectSubset&lt;T, UserDeleteArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__UserClient&lt;runtime.Types.Resul …</code> |
| [2944:3](project/generated/prisma/models/User.ts#L2944) | update | <code>update&lt;T extends UserUpdateArgs&gt;(args: Prisma.SelectSubset&lt;T, UserUpdateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__UserClient&lt;runtime.Types.Resul …</code> |
| [2958:3](project/generated/prisma/models/User.ts#L2958) | deleteMany | <code>deleteMany&lt;T extends UserDeleteManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, UserDeleteManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Prisma.Batc …</code> |
| [2977:3](project/generated/prisma/models/User.ts#L2977) | updateMany | <code>updateMany&lt;T extends UserUpdateManyArgs&gt;(args: Prisma.SelectSubset&lt;T, UserUpdateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise&lt;Prisma.Batch …</code> |
| [3007:3](project/generated/prisma/models/User.ts#L3007) | updateManyAndReturn | <code>updateManyAndReturn&lt;T extends UserUpdateManyAndReturnArgs&gt;(args: Prisma.SelectSubset&lt;T, UserUpdateManyAndReturnArgs&lt;ExtArgs&gt;&gt;): Prisma.Pr …</code> |
| [3026:3](project/generated/prisma/models/User.ts#L3026) | upsert | <code>upsert&lt;T extends UserUpsertArgs&gt;(args: Prisma.SelectSubset&lt;T, UserUpsertArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__UserClient&lt;runtime.Types.Resul …</code> |
| [3042:3](project/generated/prisma/models/User.ts#L3042) | count | <code>count&lt;T extends UserCountArgs&gt;( args?: Prisma.Subset&lt;T, UserCountArgs&gt;, ): Prisma.PrismaPromise&lt; T extends runtime.Types.Utils.Record&lt;'se …</code> |
| [3076:3](project/generated/prisma/models/User.ts#L3076) | aggregate | <code>aggregate&lt;T extends UserAggregateArgs&gt;(args: Prisma.Subset&lt;T, UserAggregateArgs&gt;): Prisma.PrismaPromise&lt;GetUserAggregateType&lt;T&gt;&gt;</code> |
| [3096:3](project/generated/prisma/models/User.ts#L3096) | groupBy | <code>groupBy&lt; T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or&lt; Prisma.Extends&lt;'skip', Prisma.Keys&lt;T&gt;&gt;, Prisma.Extends&lt;'take',  …</code> |
| [3168:3](project/generated/prisma/models/User.ts#L3168) | accounts | <code>accounts&lt;T extends Prisma.User$accountsArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.User$accountsArgs&lt;ExtArgs&gt;&gt;): Prisma.Pris …</code> |
| [3169:3](project/generated/prisma/models/User.ts#L3169) | posts | <code>posts&lt;T extends Prisma.User$postsArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.User$postsArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise …</code> |
| [3170:3](project/generated/prisma/models/User.ts#L3170) | drafts | <code>drafts&lt;T extends Prisma.User$draftsArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.User$draftsArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaProm …</code> |
| [3171:3](project/generated/prisma/models/User.ts#L3171) | images | <code>images&lt;T extends Prisma.User$imagesArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.User$imagesArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaProm …</code> |
| [3172:3](project/generated/prisma/models/User.ts#L3172) | likes | <code>likes&lt;T extends Prisma.User$likesArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.User$likesArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise …</code> |
| [3173:3](project/generated/prisma/models/User.ts#L3173) | comments | <code>comments&lt;T extends Prisma.User$commentsArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.User$commentsArgs&lt;ExtArgs&gt;&gt;): Prisma.Pris …</code> |
| [3174:3](project/generated/prisma/models/User.ts#L3174) | categories | <code>categories&lt;T extends Prisma.User$categoriesArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.User$categoriesArgs&lt;ExtArgs&gt;&gt;): Prism …</code> |
| [3175:3](project/generated/prisma/models/User.ts#L3175) | todos | <code>todos&lt;T extends Prisma.User$todosArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.User$todosArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPromise …</code> |
| [3176:3](project/generated/prisma/models/User.ts#L3176) | sentFriendRequests | <code>sentFriendRequests&lt;T extends Prisma.User$sentFriendRequestsArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.User$sentFriendRequestsArgs&lt …</code> |
| [3177:3](project/generated/prisma/models/User.ts#L3177) | receivedFriendRequests | <code>receivedFriendRequests&lt;T extends Prisma.User$receivedFriendRequestsArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.User$receivedFriendReq …</code> |
| [3178:3](project/generated/prisma/models/User.ts#L3178) | notifications | <code>notifications&lt;T extends Prisma.User$notificationsArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.User$notificationsArgs&lt;ExtArgs&gt;&gt …</code> |
| [3179:3](project/generated/prisma/models/User.ts#L3179) | conversationsA | <code>conversationsA&lt;T extends Prisma.User$conversationsAArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.User$conversationsAArgs&lt;ExtArgs&gt; …</code> |
| [3180:3](project/generated/prisma/models/User.ts#L3180) | conversationsB | <code>conversationsB&lt;T extends Prisma.User$conversationsBArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.User$conversationsBArgs&lt;ExtArgs&gt; …</code> |
| [3181:3](project/generated/prisma/models/User.ts#L3181) | messages | <code>messages&lt;T extends Prisma.User$messagesArgs&lt;ExtArgs&gt; = {}&gt;(args?: Prisma.Subset&lt;T, Prisma.User$messagesArgs&lt;ExtArgs&gt;&gt;): Prisma.Pris …</code> |
| [3188:3](project/generated/prisma/models/User.ts#L3188) | then | <code>then&lt;TResult1 = T, TResult2 = never&gt;(onfulfilled?: ((value: T) =&gt; TResult1 &#124; PromiseLike&lt;TResult1&gt;) &#124; undefined &#124; null, onrej …</code> |
| [3194:3](project/generated/prisma/models/User.ts#L3194) | catch | <code>catch&lt;TResult = never&gt;(onrejected?: ((reason: any) =&gt; TResult &#124; PromiseLike&lt;TResult&gt;) &#124; undefined &#124; null): runtime.Types.Util …</code> |
| [3201:3](project/generated/prisma/models/User.ts#L3201) | finally | <code>finally(onfinally?: (() =&gt; void) &#124; undefined &#124; null): runtime.Types.Utils.JsPromise&lt;T&gt;</code> |

</details>

<a id="file-94"></a>

## project/generated/prisma/models/VerificationToken.ts

[원본 파일](project/generated/prisma/models/VerificationToken.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<details>
<summary>실행 본문이 없는 타입 시그니처 전체</summary>

| 위치 | 메서드/시그니처 | 선언 발췌 |
| --- | --- | --- |
| [329:3](project/generated/prisma/models/VerificationToken.ts#L329) | findUnique | <code>findUnique&lt;T extends VerificationTokenFindUniqueArgs&gt;(args: Prisma.SelectSubset&lt;T, VerificationTokenFindUniqueArgs&lt;ExtArgs&gt;&gt;): Prisma.Pri …</code> |
| [343:3](project/generated/prisma/models/VerificationToken.ts#L343) | findUniqueOrThrow | <code>findUniqueOrThrow&lt;T extends VerificationTokenFindUniqueOrThrowArgs&gt;(args: Prisma.SelectSubset&lt;T, VerificationTokenFindUniqueOrThrowArgs&lt;ExtArgs …</code> |
| [358:3](project/generated/prisma/models/VerificationToken.ts#L358) | findFirst | <code>findFirst&lt;T extends VerificationTokenFindFirstArgs&gt;(args?: Prisma.SelectSubset&lt;T, VerificationTokenFindFirstArgs&lt;ExtArgs&gt;&gt;): Prisma.Prism …</code> |
| [374:3](project/generated/prisma/models/VerificationToken.ts#L374) | findFirstOrThrow | <code>findFirstOrThrow&lt;T extends VerificationTokenFindFirstOrThrowArgs&gt;(args?: Prisma.SelectSubset&lt;T, VerificationTokenFindFirstOrThrowArgs&lt;ExtArgs&g …</code> |
| [392:3](project/generated/prisma/models/VerificationToken.ts#L392) | findMany | <code>findMany&lt;T extends VerificationTokenFindManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, VerificationTokenFindManyArgs&lt;ExtArgs&gt;&gt;): Prisma.PrismaPr …</code> |
| [406:3](project/generated/prisma/models/VerificationToken.ts#L406) | create | <code>create&lt;T extends VerificationTokenCreateArgs&gt;(args: Prisma.SelectSubset&lt;T, VerificationTokenCreateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__Verific …</code> |
| [420:3](project/generated/prisma/models/VerificationToken.ts#L420) | createMany | <code>createMany&lt;T extends VerificationTokenCreateManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, VerificationTokenCreateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.Pr …</code> |
| [444:3](project/generated/prisma/models/VerificationToken.ts#L444) | createManyAndReturn | <code>createManyAndReturn&lt;T extends VerificationTokenCreateManyAndReturnArgs&gt;(args?: Prisma.SelectSubset&lt;T, VerificationTokenCreateManyAndReturnArgs&lt; …</code> |
| [458:3](project/generated/prisma/models/VerificationToken.ts#L458) | delete | <code>delete&lt;T extends VerificationTokenDeleteArgs&gt;(args: Prisma.SelectSubset&lt;T, VerificationTokenDeleteArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__Verific …</code> |
| [475:3](project/generated/prisma/models/VerificationToken.ts#L475) | update | <code>update&lt;T extends VerificationTokenUpdateArgs&gt;(args: Prisma.SelectSubset&lt;T, VerificationTokenUpdateArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__Verific …</code> |
| [489:3](project/generated/prisma/models/VerificationToken.ts#L489) | deleteMany | <code>deleteMany&lt;T extends VerificationTokenDeleteManyArgs&gt;(args?: Prisma.SelectSubset&lt;T, VerificationTokenDeleteManyArgs&lt;ExtArgs&gt;&gt;): Prisma.Pr …</code> |
| [508:3](project/generated/prisma/models/VerificationToken.ts#L508) | updateMany | <code>updateMany&lt;T extends VerificationTokenUpdateManyArgs&gt;(args: Prisma.SelectSubset&lt;T, VerificationTokenUpdateManyArgs&lt;ExtArgs&gt;&gt;): Prisma.Pri …</code> |
| [538:3](project/generated/prisma/models/VerificationToken.ts#L538) | updateManyAndReturn | <code>updateManyAndReturn&lt;T extends VerificationTokenUpdateManyAndReturnArgs&gt;(args: Prisma.SelectSubset&lt;T, VerificationTokenUpdateManyAndReturnArgs&lt;E …</code> |
| [557:3](project/generated/prisma/models/VerificationToken.ts#L557) | upsert | <code>upsert&lt;T extends VerificationTokenUpsertArgs&gt;(args: Prisma.SelectSubset&lt;T, VerificationTokenUpsertArgs&lt;ExtArgs&gt;&gt;): Prisma.Prisma__Verific …</code> |
| [573:3](project/generated/prisma/models/VerificationToken.ts#L573) | count | <code>count&lt;T extends VerificationTokenCountArgs&gt;( args?: Prisma.Subset&lt;T, VerificationTokenCountArgs&gt;, ): Prisma.PrismaPromise&lt; T extends runtime …</code> |
| [607:3](project/generated/prisma/models/VerificationToken.ts#L607) | aggregate | <code>aggregate&lt;T extends VerificationTokenAggregateArgs&gt;(args: Prisma.Subset&lt;T, VerificationTokenAggregateArgs&gt;): Prisma.PrismaPromise&lt;GetVerific …</code> |
| [627:3](project/generated/prisma/models/VerificationToken.ts#L627) | groupBy | <code>groupBy&lt; T extends VerificationTokenGroupByArgs, HasSelectOrTake extends Prisma.Or&lt; Prisma.Extends&lt;'skip', Prisma.Keys&lt;T&gt;&gt;, Prisma.Extend …</code> |
| [705:3](project/generated/prisma/models/VerificationToken.ts#L705) | then | <code>then&lt;TResult1 = T, TResult2 = never&gt;(onfulfilled?: ((value: T) =&gt; TResult1 &#124; PromiseLike&lt;TResult1&gt;) &#124; undefined &#124; null, onrej …</code> |
| [711:3](project/generated/prisma/models/VerificationToken.ts#L711) | catch | <code>catch&lt;TResult = never&gt;(onrejected?: ((reason: any) =&gt; TResult &#124; PromiseLike&lt;TResult&gt;) &#124; undefined &#124; null): runtime.Types.Util …</code> |
| [718:3](project/generated/prisma/models/VerificationToken.ts#L718) | finally | <code>finally(onfinally?: (() =&gt; void) &#124; undefined &#124; null): runtime.Types.Utils.JsPromise&lt;T&gt;</code> |

</details>

<a id="file-95"></a>

## project/instrumentation.ts

[원본 파일](project/instrumentation.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [1:1](project/instrumentation.ts#L1) | register | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (process.env.NEXT_RUNTIME === "nodejs" && process.env.NEXT_PHASE !== "phase-production-build") { const { startImageCleanup } = await import("./lib/ima …</code> |

<a id="file-96"></a>

## project/lib/auth.ts

[원본 파일](project/lib/auth.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [33:7](project/lib/auth.ts#L33) | authorize | 모듈 최상위 | 객체·클래스 메서드: 해당 API/확장 동작 구현<br><code>{ if ( typeof credentials?.email !== "string" &#124;&#124; typeof credentials?.password !== "string" ) { return null; } const user = await prisma.user.find …</code> |
| [76:5](project/lib/auth.ts#L76) | jwt | 모듈 최상위 | 객체·클래스 메서드: 해당 API/확장 동작 구현<br><code>{ if (user?.id) { token.id = user.id; const dbUser = await prisma.user.findUnique({ where: { id: user.id }, }); if (dbUser) { token.name = dbUser.name; //  …</code> |
| [117:5](project/lib/auth.ts#L117) | session | 모듈 최상위 | 객체·클래스 메서드: 해당 API/확장 동작 구현<br><code>{ if (session.user && token.id) { session.user.id = token.id as string; session.user.name = token.name as string; // 실명 (session.user as unknown as { nickn …</code> |

<a id="file-97"></a>

## project/lib/blog-data.ts

[원본 파일](project/lib/blog-data.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [4:1](project/lib/blog-data.ts#L4) | blogData | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const author = await prisma.user.findUnique({ where: { id: authorId }, select: { id: true, name: true, nickname: true, tag: true, image: true, bio: true  …</code> |
| [19:71](project/lib/blog-data.ts#L19) | posts.map 콜백 #1 | blogData | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>({ ...post, createdAt: post.createdAt.toISOString(), updatedAt: post.updatedAt.toISOString() })</code> |
| [19:252](project/lib/blog-data.ts#L19) | categoryCounts.map 콜백 #1 | blogData | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>({ categoryId: item.categoryId, count: item._count._all })</code> |
| [19:342](project/lib/blog-data.ts#L19) | drafts.map 콜백 #1 | blogData | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>({ ...draft, updatedAt: draft.updatedAt.toISOString() })</code> |

<a id="file-98"></a>

## project/lib/chat.ts

[원본 파일](project/lib/chat.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [6:1](project/lib/chat.ts#L6) | pairWhere | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ return { OR: [{ userId: a, friendId: b }, { userId: b, friendId: a }] }; }</code> |
| [7:1](project/lib/chat.ts#L7) | lockPair | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const pair = JSON.stringify([a, b].sort()); await tx.$queryRaw&#96;SELECT pg_advisory_xact_lock(hashtextextended(${pair}, 0))::text&#96;; }</code> |
| [11:1](project/lib/chat.ts#L11) | requireFriends | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (a === b &#124;&#124; !await db.friendship.findFirst({ where: { ...pairWhere(a, b), status: "ACCEPTED" }, select: { id: true } })) throw new PostError …</code> |
| [14:1](project/lib/chat.ts#L14) | conversationFor | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const conversation = await prisma.conversation.findFirst({ where: { id, OR: [{ userAId: userId }, { userBId: userId }] }, include: { userA: { select: cha …</code> |

<a id="file-99"></a>

## project/lib/display-name.ts

[원본 파일](project/lib/display-name.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [2:1](project/lib/display-name.ts#L2) | displayName | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (!name &#124;&#124; typeof tag !== "string" &#124;&#124; !/^[0-9]{4}$/.test(tag) &#124;&#124; !name.endsWith("#" + tag)) return name; return name.slic …</code> |

<a id="file-100"></a>

## project/lib/engagement.ts

[원본 파일](project/lib/engagement.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [6:1](project/lib/engagement.ts#L6) | readablePost | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const post = await prisma.post.findUnique({ where: { id }, select: { id: true, authorId: true } }); if (!post &#124;&#124; !await prisma.post.findFirst({ …</code> |
| [11:1](project/lib/engagement.ts#L11) | checkMutation | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const origin = request.headers.get("origin"); const host = request.headers.get("x-forwarded-host") &#124;&#124; request.headers.get("host"); const secFet …</code> |
| [33:1](project/lib/engagement.ts#L33) | fingerprint | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const secret = process.env.AUTH_SECRET; if (!secret) throw new Error("AUTH_SECRET is required"); return createHmac("sha256", secret).update(value).digest …</code> |
| [38:1](project/lib/engagement.ts#L38) | limitAction | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ // Only trust forwarded addresses when the deployment proxy overwrites them. const address = process.env.TRUST_PROXY === "true" ? request.headers.get("x- …</code> |
| [49:1](project/lib/engagement.ts#L49) | commentContent | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (typeof value !== "string" &#124;&#124; !value.trim() &#124;&#124; value.trim().length &gt; 2000) throw new PostError("댓글은 1~2,000자로 입력해주세요."); return …</code> |
| [53:1](project/lib/engagement.ts#L53) | commentPassword | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (typeof value !== "string" &#124;&#124; value.length &lt; 4 &#124;&#124; Buffer.byteLength(value, "utf8") &gt; 72) throw new PostError("댓글 비밀번호는 4자 이상 …</code> |

<a id="file-101"></a>

## project/lib/friend-handle.ts

[원본 파일](project/lib/friend-handle.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [1:1](project/lib/friend-handle.ts#L1) | parseFriendHandle | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (typeof value !== "string" &#124;&#124; value.length &gt; 100) return null; const match = value.trim().match(/^(.+)#([0-9]{4})$/u); if (!match) return …</code> |

<a id="file-102"></a>

## project/lib/friend-request.ts

[원본 파일](project/lib/friend-request.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [6:1](project/lib/friend-request.ts#L6) | sendFriendRequest | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (senderId === recipientId) throw new PostError("자신에게 친구 요청을 보낼 수 없습니다."); const friendship = await prisma.$transaction(async tx =&gt; { await lockPair …</code> |
| [8:48](project/lib/friend-request.ts#L8) | prisma.$transaction 콜백 #1 | sendFriendRequest | 트랜잭션 범위의 DB 작업<br><code>{ await lockPair(tx, senderId, recipientId); if (!await tx.user.findUnique({ where: { id: recipientId }, select: { id: true } })) throw new PostError("사용자를 …</code> |

<a id="file-103"></a>

## project/lib/image-cleanup.ts

[원본 파일](project/lib/image-cleanup.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [7:1](project/lib/image-cleanup.ts#L7) | cleanupImages | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ return mediaTransaction(async (tx) =&gt; { // Import files created before the registry existed. Start their grace period now. for (const name of await st …</code> |
| [8:27](project/lib/image-cleanup.ts#L8) | mediaTransaction 콜백 #1 | cleanupImages | 트랜잭션 범위의 DB 작업<br><code>{ // Import files created before the registry existed. Start their grace period now. for (const name of await storedImages()) { if (await tx.imageAsset.fin …</code> |
| [18:106](project/lib/image-cleanup.ts#L18) | (await tx.imageAsset.findMany({ select: { name: true, ownerId: true } })).map 콜백 #1 | mediaTransaction 콜백 #1 | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>[asset.name, asset.ownerId]</code> |
| [19:22](project/lib/image-cleanup.ts#L19) | namesFor | mediaTransaction 콜백 #1 | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ const doc = readDocument(content); return [...new Set((doc ? imageSources(doc) : []).filter((url) =&gt; url.startsWith("/api/images/")).map((url) =&gt; u …</code> |
| [21:64](project/lib/image-cleanup.ts#L21) | (doc ? imageSources(doc) : []).filter 콜백 #1 | namesFor | 원소의 선택·검색·검사 조건 반환<br><code>url.startsWith("/api/images/")</code> |
| [21:109](project/lib/image-cleanup.ts#L21) | (doc ? imageSources(doc) : []).filter((url) =&gt; url.startsWith("/api/images/")).map 콜백 #1 | namesFor | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>url.slice(12)</code> |
| [21:140](project/lib/image-cleanup.ts#L21) | (doc ? imageSources(doc) : []).filter((url) =&gt; url.startsWith("/api/images/")).map((url) =&gt; url.slice(12)).filter 콜백 #1 | namesFor | 원소의 선택·검색·검사 조건 반환<br><code>assets.get(name) === owner</code> |
| [37:1](project/lib/image-cleanup.ts#L37) | startImageCleanup | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const state = globalThis as typeof globalThis & { imageCleanupTimer?: ReturnType&lt;typeof setInterval&gt; }; if (state.imageCleanupTimer) return; let ru …</code> |
| [41:15](project/lib/image-cleanup.ts#L41) | run | startImageCleanup | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ if (running) return; running = true; try { await cleanupImages(); } catch (error) { console.error("이미지 정리 실패:", error); } finally { running = false; } }</code> |
| [47:14](project/lib/image-cleanup.ts#L47) | setTimeout 콜백 #1 | startImageCleanup | 이전 React 상태를 받아 다음 상태 계산<br><code>void run()</code> |
| [48:41](project/lib/image-cleanup.ts#L48) | setInterval 콜백 #1 | startImageCleanup | 이전 React 상태를 받아 다음 상태 계산<br><code>void run()</code> |

<a id="file-104"></a>

## project/lib/image-storage.ts

[원본 파일](project/lib/image-storage.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [10:19](project/lib/image-storage.ts#L10) | directory | 모듈 최상위 | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>path.resolve(process.env.UPLOAD_DIR &#124;&#124; path.join(process.cwd(), "storage", "uploads"))</code> |
| [11:15](project/lib/image-storage.ts#L11) | useR2 | 모듈 최상위 | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>Boolean(process.env.R2_ENDPOINT && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY && process.env.R2_BUCKET)</code> |
| [12:12](project/lib/image-storage.ts#L12) | r2 | 모듈 최상위 | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>new S3Client({ region: "auto", endpoint: process.env.R2_ENDPOINT, credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID!, secretAccessKey: process.env.R …</code> |
| [13:16](project/lib/image-storage.ts#L13) | bucket | 모듈 최상위 | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>process.env.R2_BUCKET!</code> |
| [16:1](project/lib/image-storage.ts#L16) | saveImage | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (!bytes.length &#124;&#124; bytes.length &gt; MAX_IMAGE_BYTES) throw new ImageUploadError("이미지는 10MB 이하로 선택해주세요."); let output: Buffer; try { const im …</code> |
| [22:338](project/lib/image-storage.ts#L22) | unlink(path.join(root, name)).catch 콜백 #1 | saveImage | 비동기 실패 처리<br><code>undefined</code> |
| [25:1](project/lib/image-storage.ts#L25) | imageOwner | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (!IMAGE_NAME_PATTERN.test(name)) return null; try { if (useR2()) { const result = await r2().send(new HeadObjectCommand({ Bucket: bucket(), Key: name  …</code> |
| [29:1](project/lib/image-storage.ts#L29) | readImage | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (!IMAGE_NAME_PATTERN.test(name)) throw new ImageUploadError("올바르지 않은 이미지 경로입니다."); if (useR2()) { const result = await r2().send(new GetObjectCommand( …</code> |
| [34:1](project/lib/image-storage.ts#L34) | storedImages | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (useR2()) { const result = await r2().send(new ListObjectsV2Command({ Bucket: bucket() })); return (result.Contents &#124;&#124; []).map((item) =&gt;  …</code> |
| [34:170](project/lib/image-storage.ts#L34) | (result.Contents &#124;&#124; []).map 콜백 #1 | storedImages | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>item.Key &#124;&#124; ""</code> |
| [34:203](project/lib/image-storage.ts#L34) | (result.Contents &#124;&#124; []).map((item) =&gt; item.Key &#124;&#124; "").filter 콜백 #1 | storedImages | 원소의 선택·검색·검사 조건 반환<br><code>IMAGE_NAME_PATTERN.test(name)</code> |
| [34:296](project/lib/image-storage.ts#L34) | (await readdir(directory())).filter 콜백 #1 | storedImages | 원소의 선택·검색·검사 조건 반환<br><code>IMAGE_NAME_PATTERN.test(name)</code> |
| [35:1](project/lib/image-storage.ts#L35) | removeImage | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (!IMAGE_NAME_PATTERN.test(name)) throw new ImageUploadError("올바르지 않은 이미지 경로입니다."); if (useR2()) { await r2().send(new DeleteObjectCommand({ Bucket: bu …</code> |
| [35:337](project/lib/image-storage.ts#L35) | unlink(path.join(directory(), filename)).catch 콜백 #1 | removeImage | 비동기 실패 처리<br><code>{ if (error.code !== "ENOENT") throw error; }</code> |

<a id="file-105"></a>

## project/lib/mail.ts

[원본 파일](project/lib/mail.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [12:1](project/lib/mail.ts#L12) | sendVerificationEmail | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const baseUrl = process.env.NEXTAUTH_URL &#124;&#124; "http://localhost:3000"; const confirmLink = &#96;${baseUrl}/verify-email?token=${token}&#96;; // S …</code> |

<a id="file-106"></a>

## project/lib/post-access.ts

[원본 파일](project/lib/post-access.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [4:1](project/lib/post-access.ts#L4) | visiblePosts | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (viewerId === authorId) return { authorId }; const friendship = viewerId && await prisma.friendship.findFirst({ where: { status: "ACCEPTED", OR: [{ us …</code> |
| [10:1](project/lib/post-access.ts#L10) | allVisiblePosts | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (!viewerId) return { visibility: "PUBLIC" }; const friendships = await prisma.friendship.findMany({ where: { status: "ACCEPTED", OR: [{ userId: viewer …</code> |
| [13:35](project/lib/post-access.ts#L13) | friendships.map 콜백 #1 | allVisiblePosts | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>item.userId === viewerId ? item.friendId : item.userId</code> |

<a id="file-107"></a>

## project/lib/post-content.ts

[원본 파일](project/lib/post-content.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [24:1](project/lib/post-content.ts#L24) | safeLink | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (typeof value !== "string") return null; try { const url = new URL(value); return ["https:", "http:", "mailto:"].includes(url.protocol) ? url.href : n …</code> |
| [32:1](project/lib/post-content.ts#L32) | safeImage | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (typeof value !== "string") return null; if (/^\/api\/images\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.webp$/.test(value)) …</code> |
| [39:1](project/lib/post-content.ts#L39) | safeWidth | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (typeof value !== "string" && typeof value !== "number") return null; const str = String(value).trim(); if (/^([1-9][0-9]?&#124;100)%$/.test(str)) ret …</code> |
| [50:1](project/lib/post-content.ts#L50) | imageGroupWidths | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const widths = typeof value === "string" ? value.split(",").map(Number) : []; if (widths.length !== count &#124;&#124; widths.some(w =&gt; !Number.isFini …</code> |
| [52:46](project/lib/post-content.ts#L52) | widths.some 콜백 #1 | imageGroupWidths | 원소의 선택·검색·검사 조건 반환<br><code>!Number.isFinite(w) &#124;&#124; w &lt; 15 &#124;&#124; w &gt; 85</code> |
| [52:118](project/lib/post-content.ts#L52) | widths.reduce 콜백 #1 | imageGroupWidths | 목록 값을 누적 계산<br><code>a + b</code> |
| [60:1](project/lib/post-content.ts#L60) | normalizeDocument | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ let count = 0; function visit(value: unknown, depth: number): PostNode { if (!value &#124;&#124; typeof value !== "object" &#124;&#124; depth &gt; 32 &#1 …</code> |
| [62:3](project/lib/post-content.ts#L62) | visit | normalizeDocument | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (!value &#124;&#124; typeof value !== "object" &#124;&#124; depth &gt; 32 &#124;&#124; ++count &gt; 10000) throw new Error("올바르지 않은 본문 형식입니다."); const …</code> |
| [88:94](project/lib/post-content.ts#L88) | node.marks.slice(0, 10).flatMap 콜백 #1 | visit | 원소를 배열로 변환하고 결과를 한 단계 펼침<br><code>{ if (!mark &#124;&#124; typeof mark.type !== "string" &#124;&#124; !markTypes.has(mark.type)) return []; if (mark.type === "link") { const href = safeLink …</code> |
| [99:72](project/lib/post-content.ts#L99) | node.content.map 콜백 #1 | visit | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>visit(child, depth + 1)</code> |
| [101:108](project/lib/post-content.ts#L101) | result.content.some 콜백 #1 | visit | 원소의 선택·검색·검사 조건 반환<br><code>child.type !== "image"</code> |
| [113:1](project/lib/post-content.ts#L113) | serializeDocument | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const content = RICH_CONTENT_PREFIX + JSON.stringify(normalizeDocument(doc)); if (content.length &gt; MAX_CONTENT_LENGTH) throw new Error("본문 용량이 너무 큽니다. …</code> |
| [119:1](project/lib/post-content.ts#L119) | readDocument | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (!content.startsWith(RICH_CONTENT_PREFIX) &#124;&#124; content.length &gt; MAX_CONTENT_LENGTH) return null; try { return normalizeDocument(JSON.parse( …</code> |
| [124:1](project/lib/post-content.ts#L124) | documentText | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (node.type === "image") return ""; if (node.type === "text") return node.text &#124;&#124; ""; if (node.type === "hardBreak") return "\n"; const text  …</code> |
| [132:1](project/lib/post-content.ts#L132) | hasDocumentContent | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ return Boolean(documentText(doc).trim()) &#124;&#124; doc.type === "image" &#124;&#124; Boolean(doc.content?.some(hasDocumentContent)); }</code> |
| [136:1](project/lib/post-content.ts#L136) | postExcerpt | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const doc = readDocument(content); return doc ? documentText(doc).trim() &#124;&#124; "이미지가 포함된 글입니다." : content; }</code> |
| [141:1](project/lib/post-content.ts#L141) | imageSources | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ return node.type === "image" ? [String(node.attrs?.src &#124;&#124; "")] : (node.content &#124;&#124; []).flatMap(imageSources); }</code> |
| [146:1](project/lib/post-content.ts#L146) | documentOutline | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const items: OutlineItem[] = []; let index = 0; function visit(node: PostNode) { if (node.type === "heading") { index += 1; const text = documentText(nod …</code> |
| [149:3](project/lib/post-content.ts#L149) | visit | documentOutline | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (node.type === "heading") { index += 1; const text = documentText(node).trim(); const level = Number(node.attrs?.level &#124;&#124; 2); if (text && le …</code> |

<a id="file-108"></a>

## project/lib/post-service.ts

[원본 파일](project/lib/post-service.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [7:3](project/lib/post-service.ts#L7) | constructor | 모듈 최상위 | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ super(message); }</code> |
| [12:1](project/lib/post-service.ts#L12) | mediaTransaction | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ return prisma.$transaction(async (tx) =&gt; { await tx.$executeRaw&#96;SELECT pg_advisory_xact_lock(74209136)&#96;; return fn(tx); }, { maxWait: 15000, t …</code> |
| [13:30](project/lib/post-service.ts#L13) | prisma.$transaction 콜백 #1 | mediaTransaction | 트랜잭션 범위의 DB 작업<br><code>{ await tx.$executeRaw&#96;SELECT pg_advisory_xact_lock(74209136)&#96;; return fn(tx); }</code> |
| [19:1](project/lib/post-service.ts#L19) | ensureImages | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const doc = readDocument(content); const names = [...new Set((doc ? imageSources(doc) : []).filter((src) =&gt; src.startsWith("/api/images/")).map((src)  …</code> |
| [21:67](project/lib/post-service.ts#L21) | (doc ? imageSources(doc) : []).filter 콜백 #1 | ensureImages | 원소의 선택·검색·검사 조건 반환<br><code>src.startsWith("/api/images/")</code> |
| [21:112](project/lib/post-service.ts#L21) | (doc ? imageSources(doc) : []).filter((src) =&gt; src.startsWith("/api/images/")).map 콜백 #1 | ensureImages | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>src.slice(12)</code> |
| [29:1](project/lib/post-service.ts#L29) | refreshOrphans | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ await tx.imageAsset.updateMany({ where: { orphanedAt: null, posts: { none: {} }, drafts: { none: {} } }, data: { orphanedAt: new Date() } }); await tx.im …</code> |
| [34:1](project/lib/post-service.ts#L34) | setPostImages | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ await tx.postImage.deleteMany({ where: { postId } }); if (names.length) await tx.postImage.createMany({ data: names.map((name) =&gt; ({ postId, name }))  …</code> |
| [36:69](project/lib/post-service.ts#L36) | names.map 콜백 #1 | setPostImages | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>({ postId, name })</code> |
| [38:1](project/lib/post-service.ts#L38) | setDraftImages | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ await tx.draftImage.deleteMany({ where: { draftId } }); if (names.length) await tx.draftImage.createMany({ data: names.map((name) =&gt; ({ draftId, name  …</code> |
| [40:70](project/lib/post-service.ts#L40) | names.map 콜백 #1 | setDraftImages | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>({ draftId, name })</code> |
| [43:1](project/lib/post-service.ts#L43) | validatePost | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const title = typeof input.title === "string" ? input.title.trim() : ""; let content = typeof input.content === "string" ? input.content.trim() : ""; if  …</code> |
| [57:70](project/lib/post-service.ts#L57) | rawTags.some 콜백 #1 | validatePost | 원소의 선택·검색·검사 조건 반환<br><code>typeof tag !== "string" &#124;&#124; !tag.trim() &#124;&#124; tag.trim().length &gt; 24</code> |
| [58:54](project/lib/post-service.ts#L58) | (rawTags as string[]).map 콜백 #1 | validatePost | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>tag.trim().replace(/^#+/, "")</code> |
| [63:1](project/lib/post-service.ts#L63) | consumeDraft | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const draft = await tx.postDraft.findUnique({ where: { userId_key: { userId, key } } }); if (!draft) { if (version !== undefined && version !== null) thr …</code> |
| [73:1](project/lib/post-service.ts#L73) | postFailure | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ if (error instanceof PostError) return Response.json({ error: error.message }, { status: error.status }); if (error instanceof SyntaxError) return Respon …</code> |

<a id="file-109"></a>

## project/lib/post-stats.ts

[원본 파일](project/lib/post-stats.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [3:1](project/lib/post-stats.ts#L3) | popularRankings | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const now = Date.now(); const [day, week, month] = await Promise.all([popularPosts(1, now, viewerId), popularPosts(7, now, viewerId), popularPosts(30, no …</code> |
| [8:1](project/lib/post-stats.ts#L8) | popularPosts | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const ranked = await prisma.postView.groupBy({ by: ["postId"], where: { createdAt: { gte: new Date(now - days * 86400_000) }, post: { visibility: "PUBLIC …</code> |
| [10:76](project/lib/post-stats.ts#L10) | ranked.map 콜백 #1 | popularPosts | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>item.postId</code> |
| [11:25](project/lib/post-stats.ts#L11) | ranked.flatMap 콜백 #1 | popularPosts | 원소를 배열로 변환하고 결과를 한 단계 펼침<br><code>{ const post = posts.find((post) =&gt; post.id === item.postId); if (!post) return []; const { content, _count, createdAt, ...details } = post; const doc = …</code> |
| [12:29](project/lib/post-stats.ts#L12) | posts.find 콜백 #1 | ranked.flatMap 콜백 #1 | 원소의 선택·검색·검사 조건 반환<br><code>post.id === item.postId</code> |

<a id="file-110"></a>

## project/lib/prisma.ts

[원본 파일](project/lib/prisma.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<a id="file-111"></a>

## project/lib/realtime.ts

[원본 파일](project/lib/realtime.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [4:1](project/lib/realtime.ts#L4) | redisClient | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const client = createClient({ url: process.env.REDIS_URL &#124;&#124; "redis://127.0.0.1:6379", disableOfflineQueue: true, socket: { connectTimeout: 2000 …</code> |
| [6:22](project/lib/realtime.ts#L6) | client.on 콜백 #2 | redisClient | 이벤트 수신 처리<br><code>{ /* The caller handles failure without exposing connection credentials. */ }</code> |
| [10:1](project/lib/realtime.ts#L10) | userChannel | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ return &#96;${process.env.REDIS_CHANNEL_PREFIX &#124;&#124; "developer-blog"}:user:${userId}&#96;; }</code> |
| [11:1](project/lib/realtime.ts#L11) | publishUserEvents | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ try { const client = shared.realtimePublisher ??= redisClient(); if (!client.isReady) { shared.realtimeConnecting ??= client.connect().finally(() =&gt; { …</code> |
| [15:62](project/lib/realtime.ts#L15) | client.connect().finally 콜백 #1 | publishUserEvents | 성공·실패 공통 종료 처리<br><code>{ shared.realtimeConnecting = undefined; }</code> |
| [18:49](project/lib/realtime.ts#L18) | [...new Set(userIds)].map 콜백 #1 | publishUserEvents | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>client.publish(userChannel(id), JSON.stringify(event))</code> |

<a id="file-112"></a>

## project/lib/tag.ts

[원본 파일](project/lib/tag.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [7:1](project/lib/tag.ts#L7) | generateUniqueTag | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const trimmedNickname = nickname.trim(); // 해당 닉네임으로 이미 사용 중인 태그 목록 조회 const existingUsers = await prisma.user.findMany({ where: { nickname: trimmedNickn …</code> |
| [16:47](project/lib/tag.ts#L16) | existingUsers.map 콜백 #1 | generateUniqueTag | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>u.tag</code> |

<a id="file-113"></a>

## project/lib/tokens.ts

[원본 파일](project/lib/tokens.ts)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [16:1](project/lib/tokens.ts#L16) | createSignupVerificationToken | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const token = crypto.randomUUID(); // 24시간 유효 const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 이전에 동일한 이메일로 요청했던 대기 토큰이 있다면 삭제 const existi …</code> |
| [71:1](project/lib/tokens.ts#L71) | verifyAndCreateUser | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const existingToken = await prisma.verificationToken.findUnique({ where: { token }, }); if (!existingToken) { return { error: "유효하지 않거나 이미 만료/사용된 인증 링크입니 …</code> |

<a id="file-114"></a>

## project/next.config.ts

[원본 파일](project/next.config.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<a id="file-115"></a>

## project/postcss.config.mjs

[원본 파일](project/postcss.config.mjs)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<a id="file-116"></a>

## project/prisma7.config.ts

[원본 파일](project/prisma7.config.ts)

실행 함수 본문이 없습니다. 설정 객체·타입 선언·재내보내기가 역할이며 CODE_GUIDE의 설정/생성 코드 설명을 참고하세요.

<a id="file-117"></a>

## project/scripts/seed-test-posts.mjs

[원본 파일](project/scripts/seed-test-posts.mjs)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [9:1](project/scripts/seed-test-posts.mjs#L9) | contentFor | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ return JSON.stringify({ type: "doc", content: [ { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: title }] }, { type: "paragraph",  …</code> |

<a id="file-118"></a>

## project/tests/chat-realtime.test.mjs

[원본 파일](project/tests/chat-realtime.test.mjs)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [13:96](project/tests/chat-realtime.test.mjs#L13) | test: 'friends-only chat and Redis events across two application servers' | 모듈 최상위 | 테스트 시나리오: 기대 동작을 assert로 검사<br><code>{ const admin = new Client({ connectionString: process.env.DATABASE_URL }); await admin.connect(); const databaseName = 'developer_blog_chat_test_' + rando …</code> |
| [23:21](project/tests/chat-realtime.test.mjs#L23) | redis.on 콜백 #2 | test: 'friends-only chat and Redis events across two application servers' | 이벤트 수신 처리<br><code>{}</code> |
| [35:32](project/tests/chat-realtime.test.mjs#L35) | server.stdout.on 콜백 #2 | test: 'friends-only chat and Redis events across two application servers' | 이벤트 수신 처리<br><code>{ log += data; }</code> |
| [35:86](project/tests/chat-realtime.test.mjs#L35) | server.stderr.on 콜백 #2 | test: 'friends-only chat and Redis events across two application servers' | 이벤트 수신 처리<br><code>{ log += data; }</code> |
| [39:27](project/tests/chat-realtime.test.mjs#L39) | Promise 콜백 #1 | test: 'friends-only chat and Redis events across two application servers' | 비동기 완료/실패를 연결<br><code>setTimeout(resolve, 100)</code> |
| [45:18](project/tests/chat-realtime.test.mjs#L45) | call | test: 'friends-only chat and Redis events across two application servers' | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ const response = await fetch(&#96;http://localhost:${port}${path}&#96;, { method, headers: { ...(user ? { cookie: cookies.get(user) } : {}), ...(body ? { …</code> |
| [49:21](project/tests/chat-realtime.test.mjs#L49) | connect | test: 'friends-only chat and Redis events across two application servers' | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ const abort = new AbortController(); const response = await fetch('http://localhost:3116/api/events?userId=' + outsider, { headers: { cookie: cookies.get …</code> |
| [57:21](project/tests/chat-realtime.test.mjs#L57) | 익명 함수 | connect | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ try { while (true) { const { done, value } = await reader.read(); if (done) break; buffer += decoder.decode(value, { stream: true }); let boundary; while …</code> |
| [72:20](project/tests/chat-realtime.test.mjs#L72) | wait | connect | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ for (let i = 0; i &lt; 100; i++) { const result = events.slice(from).find(predicate); if (result) return result; await new Promise((resolve) =&gt; setTim …</code> |
| [76:29](project/tests/chat-realtime.test.mjs#L76) | Promise 콜백 #1 | wait | 비동기 완료/실패를 연결<br><code>setTimeout(resolve, 30)</code> |
| [80:45](project/tests/chat-realtime.test.mjs#L80) | close | connect | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ abort.abort(); await pump; }</code> |
| [82:18](project/tests/chat-realtime.test.mjs#L82) | wait 콜백 #1 | connect | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>event.event === 'ready'</code> |
| [90:24](project/tests/chat-realtime.test.mjs#L90) | streamA.wait 콜백 #1 | test: 'friends-only chat and Redis events across two application servers' | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>event.data.conversationId === 'direct-publish'</code> |
| [91:36](project/tests/chat-realtime.test.mjs#L91) | streamA.events.some 콜백 #1 | test: 'friends-only chat and Redis events across two application servers' | 원소의 선택·검색·검사 조건 반환<br><code>event.data.conversationId === 'private-outsider'</code> |
| [95:24](project/tests/chat-realtime.test.mjs#L95) | streamB.wait 콜백 #1 | test: 'friends-only chat and Redis events across two application servers' | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>event.data.type === 'friends'</code> |
| [111:24](project/tests/chat-realtime.test.mjs#L111) | streamB.wait 콜백 #1 | test: 'friends-only chat and Redis events across two application servers' | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>event.data.type === 'chat' && event.data.conversationId === id</code> |
| [128:64](project/tests/chat-realtime.test.mjs#L128) | [...older.messages, ...latest.messages].map 콜백 #1 | test: 'friends-only chat and Redis events across two application servers' | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>message.id</code> |
| [129:56](project/tests/chat-realtime.test.mjs#L129) | [...new Set(allIds)].sort 콜백 #1 | test: 'friends-only chat and Redis events across two application servers' | 정렬을 위한 두 원소 순서 비교<br><code>a - b</code> |
| [141:24](project/tests/chat-realtime.test.mjs#L141) | streamB.wait 콜백 #1 | test: 'friends-only chat and Redis events across two application servers' | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>event.data.type === 'notifications'</code> |
| [145:24](project/tests/chat-realtime.test.mjs#L145) | streamB.wait 콜백 #1 | test: 'friends-only chat and Redis events across two application servers' | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>event.data.type === 'notifications'</code> |
| [154:35](project/tests/chat-realtime.test.mjs#L154) | streams.map 콜백 #1 | test: 'friends-only chat and Redis events across two application servers' | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>stream.close()</code> |
| [156:136](project/tests/chat-realtime.test.mjs#L156) | Promise 콜백 #1 | test: 'friends-only chat and Redis events across two application servers' | 비동기 완료/실패를 연결<br><code>setTimeout(resolve, 3000)</code> |

<a id="file-119"></a>

## project/tests/friend-handle.test.mjs

[원본 파일](project/tests/friend-handle.test.mjs)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [5:83](project/tests/friend-handle.test.mjs#L5) | test: "friend handle preserves leading zeros and supports nicknames containing #" | 모듈 최상위 | 테스트 시나리오: 기대 동작을 assert로 검사<br><code>{ assert.deepEqual(parseFriendHandle(" 개발자#0001 "), { nickname: "개발자", tag: "0001" }); assert.deepEqual(parseFriendHandle("C# 개발자#1234"), { nickname: "C# 개 …</code> |
| [9:68](project/tests/friend-handle.test.mjs#L9) | test: "friend handle rejects missing nicknames and malformed tags" | 모듈 최상위 | 테스트 시나리오: 기대 동작을 assert로 검사<br><code>{ for (const value of [null, {}, "", "#1234", " #1234", "개발자", "개발자#123", "개발자#12345", "개발자#abcd", "a".repeat(101)]) assert.equal(parseFriendHandle(value), …</code> |

<a id="file-120"></a>

## project/tests/image-group.test.mjs

[원본 파일](project/tests/image-group.test.mjs)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [5:30](project/tests/image-group.test.mjs#L5) | [1, 2, 3].map 콜백 #1 | 모듈 최상위 | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>({ type: "image", attrs: { src: &#96;https://example.com/${i}.png&#96;, width: "50%" } })</code> |
| [6:89](project/tests/image-group.test.mjs#L6) | test: "image groups preserve ratios, image references and original single-image widths" | 모듈 최상위 | 테스트 시나리오: 기대 동작을 assert로 검사<br><code>{ const doc = readDocument(serializeDocument({ type: "doc", content: [{ type: "imageGroup", attrs: { widths: "20,30,50" }, content: images }] })); assert.e …</code> |
| [9:50](project/tests/image-group.test.mjs#L9) | images.map 콜백 #1 | test: "image groups preserve ratios, image references and original single-image widths" | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>image.attrs.src</code> |
| [12:75](project/tests/image-group.test.mjs#L12) | test: "image groups reject malformed children and more than three photos" | 모듈 최상위 | 테스트 시나리오: 기대 동작을 assert로 검사<br><code>{ for (const content of [[], images.slice(0, 1), [...images, images[0]], [images[0], { type: "paragraph" }]]) { assert.throws(() =&gt; serializeDocument({  …</code> |
| [14:19](project/tests/image-group.test.mjs#L14) | assert.throws 콜백 #1 | test: "image groups reject malformed children and more than three photos" | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>serializeDocument({ type: "doc", content: [{ type: "imageGroup", content }] })</code> |
| [17:63](project/tests/image-group.test.mjs#L17) | test: "invalid or excessive ratios fall back to equal widths" | 모듈 최상위 | 테스트 시나리오: 기대 동작을 assert로 검사<br><code>{ for (const value of [null, "NaN,50", "1,99", "50,60", "50,50;background:red"]) assert.deepEqual(imageGroupWidths(value, 2), [50, 50]); assert.deepEqual(i …</code> |

<a id="file-121"></a>

## project/tests/image-storage.test.mjs

[원본 파일](project/tests/image-storage.test.mjs)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [10:80](project/tests/image-storage.test.mjs#L10) | test: "uploaded files are re-encoded, resized and stored outside the document" | 모듈 최상위 | 테스트 시나리오: 기대 동작을 assert로 검사<br><code>{ const folder = await mkdtemp(path.join(os.tmpdir(), "developer-blog-image-test-")); const previous = process.env.UPLOAD_DIR; process.env.UPLOAD_DIR = fol …</code> |
| [43:93](project/tests/image-storage.test.mjs#L43) | test: "new documents reject embedded images and unsafe URLs; old documents remain readable" | 모듈 최상위 | 테스트 시나리오: 기대 동작을 assert로 검사<br><code>{ const doc = { type: "doc", content: [{ type: "image", attrs: { src: "data:image/png;base64,aGVsbG8=" } }] }; assert.equal(safeImage(doc.content[0].attrs. …</code> |
| [46:17](project/tests/image-storage.test.mjs#L46) | assert.throws 콜백 #1 | test: "new documents reject embedded images and unsafe URLs; old documents remain readable … | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>serializeDocument(doc)</code> |

<a id="file-122"></a>

## project/tests/image-upload.test.mjs

[원본 파일](project/tests/image-upload.test.mjs)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [7:88](project/tests/image-upload.test.mjs#L7) | test: "upload placeholders follow edits, stay out of saved content and can be removed" | 모듈 최상위 | 테스트 시나리오: 기대 동작을 assert로 검사<br><code>{ const schema = new Schema({ nodes: { doc: { content: "paragraph+" }, paragraph: { content: "text*" }, text: {} } }); const doc = schema.node("doc", null, …</code> |

<a id="file-123"></a>

## project/tests/post-bulk.test.mjs

[원본 파일](project/tests/post-bulk.test.mjs)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [13:1](project/tests/post-bulk.test.mjs#L13) | setup | 모듈 최상위 | 선언 함수: 구체 기능은 CODE_GUIDE의 해당 파일 설명 참조<br><code>{ const writes = []; let rolledBack = false; class PostError extends Error { constructor(message, status = 400) { super(message); this.status = status; } } …</code> |
| [16:35](project/tests/post-bulk.test.mjs#L16) | constructor | setup | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ super(message); this.status = status; }</code> |
| [19:18](project/tests/post-bulk.test.mjs#L19) | postFailure | setup | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>Response.json({ error: error.message }, { status: error.status &#124;&#124; 400 })</code> |
| [20:23](project/tests/post-bulk.test.mjs#L20) | mediaTransaction | setup | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ try { return await callback({ category: { findFirst: async ({ where }) =&gt; { assert.equal(where.userId, "owner"); assert.equal(where.isDivider, false); …</code> |
| [22:32](project/tests/post-bulk.test.mjs#L22) | findFirst | mediaTransaction | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ assert.equal(where.userId, "owner"); assert.equal(where.isDivider, false); return category; }</code> |
| [23:24](project/tests/post-bulk.test.mjs#L23) | count | mediaTransaction | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ assert.equal(where.authorId, "owner"); return owned; }</code> |
| [24:23](project/tests/post-bulk.test.mjs#L24) | updateMany | mediaTransaction | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ writes.push(args); return { count: changed }; }</code> |
| [29:66](project/tests/post-bulk.test.mjs#L29) | require | setup | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>name === "@/lib/auth" ? { auth: async () =&gt; user ? { user: { id: user } } : null } : services</code> |
| [29:108](project/tests/post-bulk.test.mjs#L29) | auth | require | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>user ? { user: { id: user } } : null</code> |
| [30:32](project/tests/post-bulk.test.mjs#L30) | rolledBack | setup | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>rolledBack</code> |
| [30:56](project/tests/post-bulk.test.mjs#L30) | call | setup | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>exports.PATCH(new Request("http://localhost/api/posts/bulk", { method: "PATCH", body: JSON.stringify(body) }))</code> |
| [33:71](project/tests/post-bulk.test.mjs#L33) | test: "bulk updates both settings with owner and version constraints" | 모듈 최상위 | 테스트 시나리오: 기대 동작을 assert로 검사<br><code>{ const api = setup(); const result = await api.call({ posts, visibility: "FRIENDS", categoryId: "category" }); assert.equal(result.status, 200); assert.eq …</code> |
| [44:78](project/tests/post-bulk.test.mjs#L44) | test: "category-only update supports uncategorized and preserves visibility" | 모듈 최상위 | 테스트 시나리오: 기대 동작을 assert로 검사<br><code>{ const api = setup(); assert.equal((await api.call({ posts, categoryId: null })).status, 200); assert.equal(api.writes[0].data.categoryId, null); assert.e …</code> |
| [51:76](project/tests/post-bulk.test.mjs#L51) | test: "rejects unauthenticated, unowned and unavailable category requests" | 모듈 최상위 | 테스트 시나리오: 기대 동작을 assert로 검사<br><code>{ for (const [options, expected] of [[{ user: null }, 401], [{ owned: 1 }, 404], [{ category: false }, 400]]) { const api = setup(options); assert.equal((a …</code> |
| [59:53](project/tests/post-bulk.test.mjs#L59) | test: "invalid and empty bulk requests never write" | 모듈 최상위 | 테스트 시나리오: 기대 동작을 assert로 검사<br><code>{ for (const body of [null, {}, { posts }, { posts: [], visibility: "PUBLIC" }, { posts, visibility: "INVALID" }, { posts, categoryId: 42 }, { posts: [post …</code> |
| [67:49](project/tests/post-bulk.test.mjs#L67) | test: "version conflicts abort the transaction" | 모듈 최상위 | 테스트 시나리오: 기대 동작을 assert로 검사<br><code>{ const api = setup({ changed: 1 }); assert.equal((await api.call({ posts, visibility: "PRIVATE" })).status, 409); assert.equal(api.rolledBack(), true); }</code> |

<a id="file-124"></a>

## project/tests/post-formatting.test.mjs

[원본 파일](project/tests/post-formatting.test.mjs)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [5:82](project/tests/post-formatting.test.mjs#L5) | test: "font size and highlight survive save while arbitrary styles are stripped" | 모듈 최상위 | 테스트 시나리오: 기대 동작을 assert로 검사<br><code>{ const marks = [{ type: "textStyle", attrs: { fontSize: "24px", color: "red" } }, { type: "highlight", attrs: { color: "#bbf7d0" } }, { type: "bold" }]; c …</code> |
| [18:81](project/tests/post-formatting.test.mjs#L18) | test: "image width survives save while arbitrary sizes or scripts are stripped" | 모듈 최상위 | 테스트 시나리오: 기대 동작을 assert로 검사<br><code>{ const doc = readDocument(serializeDocument({ type: "doc", content: [{ type: "image", attrs: { src: "https://example.com/photo.webp", width: "50%" } }, {  …</code> |
| [24:78](project/tests/post-formatting.test.mjs#L24) | test: "legacy discriminator is removed only when it matches the account tag" | 모듈 최상위 | 테스트 시나리오: 기대 동작을 assert로 검사<br><code>{ assert.equal(displayName("개발자#1234", "1234"), "개발자"); assert.equal(displayName("개발자#5678", "1234"), "개발자#5678"); assert.equal(displayName("C# 개발자", "1234 …</code> |

<a id="file-125"></a>

## project/tests/post-lifecycle.test.mjs

[원본 파일](project/tests/post-lifecycle.test.mjs)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [16:17](project/tests/post-lifecycle.test.mjs#L16) | content | 모듈 최상위 | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>prefix + JSON.stringify({ type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text }] }, ...(url ? [{ type: 'image', attrs: { src: url, a …</code> |
| [18:84](project/tests/post-lifecycle.test.mjs#L18) | test: 'post, draft, permission, category and image lifecycle' | 모듈 최상위 | 테스트 시나리오: 기대 동작을 assert로 검사<br><code>{ const directory = await mkdtemp(path.join(os.tmpdir(), 'developer-blog-lifecycle-')); const admin = new Client({ connectionString: process.env.DATABASE_U …</code> |
| [48:28](project/tests/post-lifecycle.test.mjs#L48) | server.stdout.on 콜백 #2 | test: 'post, draft, permission, category and image lifecycle' | 이벤트 수신 처리<br><code>{ log += data; }</code> |
| [48:80](project/tests/post-lifecycle.test.mjs#L48) | server.stderr.on 콜백 #2 | test: 'post, draft, permission, category and image lifecycle' | 이벤트 수신 처리<br><code>{ log += data; }</code> |
| [55:132](project/tests/post-lifecycle.test.mjs#L55) | Promise 콜백 #1 | test: 'post, draft, permission, category and image lifecycle' | 비동기 완료/실패를 연결<br><code>setTimeout(resolve,200)</code> |
| [57:20](project/tests/post-lifecycle.test.mjs#L57) | cookie | test: 'post, draft, permission, category and image lifecycle' | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>'authjs.session-token=' + await encode({ token: { id, sub:id, name:'LifecycleUser' }, secret:authSecret, salt:'authjs.session-token', maxAge:3600 })</code> |
| [59:18](project/tests/post-lifecycle.test.mjs#L59) | call | test: 'post, draft, permission, category and image lifecycle' | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ const response=await fetch(base+url,{method,headers:{...(session?{cookie:session}:{}),...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.st …</code> |
| [61:71](project/tests/post-lifecycle.test.mjs#L61) | response.json().catch 콜백 #1 | call | 비동기 실패 처리<br><code>null</code> |
| [99:18](project/tests/post-lifecycle.test.mjs#L99) | upload | test: 'post, draft, permission, category and image lifecycle' | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{ const form=new FormData();form.append('file',new File([bytes],'test.png',{type:'image/png'}));const r=await fetch(base+'/api/images',{method:'POST',heade …</code> |
| [112:19](project/tests/post-lifecycle.test.mjs#L112) | cleanup | test: 'post, draft, permission, category and image lifecycle' | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>{const r=await fetch(base+'/api/maintenance/images',{method:'POST',headers:{authorization:'Bearer '+secret}});assert.equal(r.status,200,await r.clone().tex …</code> |
| [204:36](project/tests/post-lifecycle.test.mjs#L204) | stats.comments.find 콜백 #1 | test: 'post, draft, permission, category and image lifecycle' | 원소의 선택·검색·검사 조건 반환<br><code>item.id===anonId</code> |
| [225:38](project/tests/post-lifecycle.test.mjs#L225) | stats.comments.find 콜백 #1 | test: 'post, draft, permission, category and image lifecycle' | 원소의 선택·검색·검사 조건 반환<br><code>item.id===memberId</code> |
| [241:35](project/tests/post-lifecycle.test.mjs#L241) | more.comments.some 콜백 #1 | test: 'post, draft, permission, category and image lifecycle' | 원소의 선택·검색·검사 조건 반환<br><code>stats.comments.some(previous=&gt;previous.id===item.id)</code> |
| [241:61](project/tests/post-lifecycle.test.mjs#L241) | stats.comments.some 콜백 #1 | more.comments.some 콜백 #1 | 원소의 선택·검색·검사 조건 반환<br><code>previous.id===item.id</code> |
| [242:150](project/tests/post-lifecycle.test.mjs#L242) | (await db.query('SELECT id FROM "Comment" WHERE "postId"=$1 ORDER BY "createdAt" ASC, id ASC',[post.id])).rows.map 콜백 #1 | test: 'post, draft, permission, category and image lifecycle' | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>item.id</code> |
| [243:63](project/tests/post-lifecycle.test.mjs#L243) | [...stats.comments,...more.comments].map 콜백 #1 | test: 'post, draft, permission, category and image lifecycle' | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>item.id</code> |
| [313:84](project/tests/post-lifecycle.test.mjs#L313) | Promise 콜백 #1 | test: 'post, draft, permission, category and image lifecycle' | 비동기 완료/실패를 연결<br><code>setTimeout(resolve,3000)</code> |

<a id="file-126"></a>

## project/tests/post-outline.test.mjs

[원본 파일](project/tests/post-outline.test.mjs)

| 위치 | 함수·콜백 | 상위 함수 | 문법상 역할 / 본문 발췌 |
| --- | --- | --- | --- |
| [5:17](project/tests/post-outline.test.mjs#L5) | heading | 모듈 최상위 | 보조 함수/콜백: 아래 본문 발췌와 해당 파일 설명 참조<br><code>({ type: "heading", attrs: { level }, content: text ? [{ type: "text", text }] : [] })</code> |
| [7:82](project/tests/post-outline.test.mjs#L7) | test: "outline IDs match document order, including duplicate and empty headings" | 모듈 최상위 | 테스트 시나리오: 기대 동작을 assert로 검사<br><code>{ const doc = normalizeDocument({ type: "doc", attrs: { toc: "shown", tocDepth: 3 }, content: [heading(2, "같은 제목"), heading(3, "같은 제목"), heading(4, "세부 내용" …</code> |
| [9:58](project/tests/post-outline.test.mjs#L9) | documentOutline(doc, "post-test").map 콜백 #1 | test: "outline IDs match document order, including duplicate and empty headings" | 배열 원소를 데이터 또는 화면 요소로 변환<br><code>({ id, text, level })</code> |
| [16:83](project/tests/post-outline.test.mjs#L16) | test: "outline visibility and depth survive saving; older documents use defaults" | 모듈 최상위 | 테스트 시나리오: 기대 동작을 assert로 검사<br><code>{ const doc = readDocument(serializeDocument({ type: "doc", attrs: { toc: "hidden", tocDepth: 2, injected: "ignored" }, content: [heading(2, "Heading")] }) …</code> |

## 함수형 코드 외의 추적 파일

설정·DB·이미지·문서 등은 아래 목록과 CODE_GUIDE의 대응 절에서 확인합니다. 바이너리, lock 파일과 SVG에는 프로젝트의 JavaScript 함수가 없습니다.

- [.gitattributes](.gitattributes)
- [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
- [README.md](README.md)
- [docker-compose.yml](docker-compose.yml)
- [project/.agents/skills/prisma-cli/SKILL.md](project/.agents/skills/prisma-cli/SKILL.md)
- [project/.agents/skills/prisma-cli/references/agent-safety.md](project/.agents/skills/prisma-cli/references/agent-safety.md)
- [project/.agents/skills/prisma-cli/references/complete.md](project/.agents/skills/prisma-cli/references/complete.md)
- [project/.agents/skills/prisma-cli/references/db-execute.md](project/.agents/skills/prisma-cli/references/db-execute.md)
- [project/.agents/skills/prisma-cli/references/db-pull.md](project/.agents/skills/prisma-cli/references/db-pull.md)
- [project/.agents/skills/prisma-cli/references/db-push.md](project/.agents/skills/prisma-cli/references/db-push.md)
- [project/.agents/skills/prisma-cli/references/db-seed.md](project/.agents/skills/prisma-cli/references/db-seed.md)
- [project/.agents/skills/prisma-cli/references/debug.md](project/.agents/skills/prisma-cli/references/debug.md)
- [project/.agents/skills/prisma-cli/references/dev.md](project/.agents/skills/prisma-cli/references/dev.md)
- [project/.agents/skills/prisma-cli/references/format.md](project/.agents/skills/prisma-cli/references/format.md)
- [project/.agents/skills/prisma-cli/references/generate.md](project/.agents/skills/prisma-cli/references/generate.md)
- [project/.agents/skills/prisma-cli/references/init.md](project/.agents/skills/prisma-cli/references/init.md)
- [project/.agents/skills/prisma-cli/references/mcp.md](project/.agents/skills/prisma-cli/references/mcp.md)
- [project/.agents/skills/prisma-cli/references/migrate-deploy.md](project/.agents/skills/prisma-cli/references/migrate-deploy.md)
- [project/.agents/skills/prisma-cli/references/migrate-dev.md](project/.agents/skills/prisma-cli/references/migrate-dev.md)
- [project/.agents/skills/prisma-cli/references/migrate-diff.md](project/.agents/skills/prisma-cli/references/migrate-diff.md)
- [project/.agents/skills/prisma-cli/references/migrate-reset.md](project/.agents/skills/prisma-cli/references/migrate-reset.md)
- [project/.agents/skills/prisma-cli/references/migrate-resolve.md](project/.agents/skills/prisma-cli/references/migrate-resolve.md)
- [project/.agents/skills/prisma-cli/references/migrate-status.md](project/.agents/skills/prisma-cli/references/migrate-status.md)
- [project/.agents/skills/prisma-cli/references/studio.md](project/.agents/skills/prisma-cli/references/studio.md)
- [project/.agents/skills/prisma-cli/references/validate.md](project/.agents/skills/prisma-cli/references/validate.md)
- [project/.agents/skills/prisma-client-api/SKILL.md](project/.agents/skills/prisma-client-api/SKILL.md)
- [project/.agents/skills/prisma-client-api/references/client-methods.md](project/.agents/skills/prisma-client-api/references/client-methods.md)
- [project/.agents/skills/prisma-client-api/references/constructor.md](project/.agents/skills/prisma-client-api/references/constructor.md)
- [project/.agents/skills/prisma-client-api/references/filters.md](project/.agents/skills/prisma-client-api/references/filters.md)
- [project/.agents/skills/prisma-client-api/references/model-queries.md](project/.agents/skills/prisma-client-api/references/model-queries.md)
- [project/.agents/skills/prisma-client-api/references/query-options.md](project/.agents/skills/prisma-client-api/references/query-options.md)
- [project/.agents/skills/prisma-client-api/references/raw-queries.md](project/.agents/skills/prisma-client-api/references/raw-queries.md)
- [project/.agents/skills/prisma-client-api/references/relations.md](project/.agents/skills/prisma-client-api/references/relations.md)
- [project/.agents/skills/prisma-client-api/references/transactions.md](project/.agents/skills/prisma-client-api/references/transactions.md)
- [project/.agents/skills/prisma-compute/SKILL.md](project/.agents/skills/prisma-compute/SKILL.md)
- [project/.agents/skills/prisma-compute/references/app-deploy-cli.md](project/.agents/skills/prisma-compute/references/app-deploy-cli.md)
- [project/.agents/skills/prisma-compute/references/compute-config.md](project/.agents/skills/prisma-compute/references/compute-config.md)
- [project/.agents/skills/prisma-compute/references/create-prisma.md](project/.agents/skills/prisma-compute/references/create-prisma.md)
- [project/.agents/skills/prisma-compute/references/frameworks.md](project/.agents/skills/prisma-compute/references/frameworks.md)
- [project/.agents/skills/prisma-compute/references/sdk-api.md](project/.agents/skills/prisma-compute/references/sdk-api.md)
- [project/.agents/skills/prisma-compute/references/troubleshooting.md](project/.agents/skills/prisma-compute/references/troubleshooting.md)
- [project/.agents/skills/prisma-database-setup/SKILL.md](project/.agents/skills/prisma-database-setup/SKILL.md)
- [project/.agents/skills/prisma-database-setup/references/cockroachdb.md](project/.agents/skills/prisma-database-setup/references/cockroachdb.md)
- [project/.agents/skills/prisma-database-setup/references/mongodb.md](project/.agents/skills/prisma-database-setup/references/mongodb.md)
- [project/.agents/skills/prisma-database-setup/references/mysql.md](project/.agents/skills/prisma-database-setup/references/mysql.md)
- [project/.agents/skills/prisma-database-setup/references/postgresql.md](project/.agents/skills/prisma-database-setup/references/postgresql.md)
- [project/.agents/skills/prisma-database-setup/references/prisma-client-setup.md](project/.agents/skills/prisma-database-setup/references/prisma-client-setup.md)
- [project/.agents/skills/prisma-database-setup/references/prisma-postgres.md](project/.agents/skills/prisma-database-setup/references/prisma-postgres.md)
- [project/.agents/skills/prisma-database-setup/references/sqlite.md](project/.agents/skills/prisma-database-setup/references/sqlite.md)
- [project/.agents/skills/prisma-database-setup/references/sqlserver.md](project/.agents/skills/prisma-database-setup/references/sqlserver.md)
- [project/.agents/skills/prisma-driver-adapter-implementation/SKILL.md](project/.agents/skills/prisma-driver-adapter-implementation/SKILL.md)
- [project/.agents/skills/prisma-mongodb-upgrade/SKILL.md](project/.agents/skills/prisma-mongodb-upgrade/SKILL.md)
- [project/.agents/skills/prisma-mongodb-upgrade/references/client-api-mapping.md](project/.agents/skills/prisma-mongodb-upgrade/references/client-api-mapping.md)
- [project/.agents/skills/prisma-mongodb-upgrade/references/decision-stay-or-migrate.md](project/.agents/skills/prisma-mongodb-upgrade/references/decision-stay-or-migrate.md)
- [project/.agents/skills/prisma-mongodb-upgrade/references/migrations-mapping.md](project/.agents/skills/prisma-mongodb-upgrade/references/migrations-mapping.md)
- [project/.agents/skills/prisma-mongodb-upgrade/references/schema-contract-mapping.md](project/.agents/skills/prisma-mongodb-upgrade/references/schema-contract-mapping.md)
- [project/.agents/skills/prisma-mongodb-upgrade/references/verify-cutover-checklist.md](project/.agents/skills/prisma-mongodb-upgrade/references/verify-cutover-checklist.md)
- [project/.agents/skills/prisma-postgres-setup/SKILL.md](project/.agents/skills/prisma-postgres-setup/SKILL.md)
- [project/.agents/skills/prisma-postgres-setup/references/api-basics.md](project/.agents/skills/prisma-postgres-setup/references/api-basics.md)
- [project/.agents/skills/prisma-postgres-setup/references/auth.md](project/.agents/skills/prisma-postgres-setup/references/auth.md)
- [project/.agents/skills/prisma-postgres-setup/references/endpoints.md](project/.agents/skills/prisma-postgres-setup/references/endpoints.md)
- [project/.agents/skills/prisma-postgres-setup/references/prisma7-client.md](project/.agents/skills/prisma-postgres-setup/references/prisma7-client.md)
- [project/.agents/skills/prisma-postgres/SKILL.md](project/.agents/skills/prisma-postgres/SKILL.md)
- [project/.agents/skills/prisma-postgres/references/console-and-connections.md](project/.agents/skills/prisma-postgres/references/console-and-connections.md)
- [project/.agents/skills/prisma-postgres/references/create-db-cli.md](project/.agents/skills/prisma-postgres/references/create-db-cli.md)
- [project/.agents/skills/prisma-postgres/references/management-api-sdk.md](project/.agents/skills/prisma-postgres/references/management-api-sdk.md)
- [project/.agents/skills/prisma-postgres/references/management-api.md](project/.agents/skills/prisma-postgres/references/management-api.md)
- [project/.agents/skills/prisma-upgrade-v7/SKILL.md](project/.agents/skills/prisma-upgrade-v7/SKILL.md)
- [project/.agents/skills/prisma-upgrade-v7/references/accelerate-users.md](project/.agents/skills/prisma-upgrade-v7/references/accelerate-users.md)
- [project/.agents/skills/prisma-upgrade-v7/references/driver-adapters.md](project/.agents/skills/prisma-upgrade-v7/references/driver-adapters.md)
- [project/.agents/skills/prisma-upgrade-v7/references/env-variables.md](project/.agents/skills/prisma-upgrade-v7/references/env-variables.md)
- [project/.agents/skills/prisma-upgrade-v7/references/esm-support.md](project/.agents/skills/prisma-upgrade-v7/references/esm-support.md)
- [project/.agents/skills/prisma-upgrade-v7/references/prisma-config.md](project/.agents/skills/prisma-upgrade-v7/references/prisma-config.md)
- [project/.agents/skills/prisma-upgrade-v7/references/removed-features.md](project/.agents/skills/prisma-upgrade-v7/references/removed-features.md)
- [project/.agents/skills/prisma-upgrade-v7/references/schema-changes.md](project/.agents/skills/prisma-upgrade-v7/references/schema-changes.md)
- [project/.claude/skills/prisma-cli/SKILL.md](project/.claude/skills/prisma-cli/SKILL.md)
- [project/.claude/skills/prisma-cli/references/agent-safety.md](project/.claude/skills/prisma-cli/references/agent-safety.md)
- [project/.claude/skills/prisma-cli/references/complete.md](project/.claude/skills/prisma-cli/references/complete.md)
- [project/.claude/skills/prisma-cli/references/db-execute.md](project/.claude/skills/prisma-cli/references/db-execute.md)
- [project/.claude/skills/prisma-cli/references/db-pull.md](project/.claude/skills/prisma-cli/references/db-pull.md)
- [project/.claude/skills/prisma-cli/references/db-push.md](project/.claude/skills/prisma-cli/references/db-push.md)
- [project/.claude/skills/prisma-cli/references/db-seed.md](project/.claude/skills/prisma-cli/references/db-seed.md)
- [project/.claude/skills/prisma-cli/references/debug.md](project/.claude/skills/prisma-cli/references/debug.md)
- [project/.claude/skills/prisma-cli/references/dev.md](project/.claude/skills/prisma-cli/references/dev.md)
- [project/.claude/skills/prisma-cli/references/format.md](project/.claude/skills/prisma-cli/references/format.md)
- [project/.claude/skills/prisma-cli/references/generate.md](project/.claude/skills/prisma-cli/references/generate.md)
- [project/.claude/skills/prisma-cli/references/init.md](project/.claude/skills/prisma-cli/references/init.md)
- [project/.claude/skills/prisma-cli/references/mcp.md](project/.claude/skills/prisma-cli/references/mcp.md)
- [project/.claude/skills/prisma-cli/references/migrate-deploy.md](project/.claude/skills/prisma-cli/references/migrate-deploy.md)
- [project/.claude/skills/prisma-cli/references/migrate-dev.md](project/.claude/skills/prisma-cli/references/migrate-dev.md)
- [project/.claude/skills/prisma-cli/references/migrate-diff.md](project/.claude/skills/prisma-cli/references/migrate-diff.md)
- [project/.claude/skills/prisma-cli/references/migrate-reset.md](project/.claude/skills/prisma-cli/references/migrate-reset.md)
- [project/.claude/skills/prisma-cli/references/migrate-resolve.md](project/.claude/skills/prisma-cli/references/migrate-resolve.md)
- [project/.claude/skills/prisma-cli/references/migrate-status.md](project/.claude/skills/prisma-cli/references/migrate-status.md)
- [project/.claude/skills/prisma-cli/references/studio.md](project/.claude/skills/prisma-cli/references/studio.md)
- [project/.claude/skills/prisma-cli/references/validate.md](project/.claude/skills/prisma-cli/references/validate.md)
- [project/.claude/skills/prisma-client-api/SKILL.md](project/.claude/skills/prisma-client-api/SKILL.md)
- [project/.claude/skills/prisma-client-api/references/client-methods.md](project/.claude/skills/prisma-client-api/references/client-methods.md)
- [project/.claude/skills/prisma-client-api/references/constructor.md](project/.claude/skills/prisma-client-api/references/constructor.md)
- [project/.claude/skills/prisma-client-api/references/filters.md](project/.claude/skills/prisma-client-api/references/filters.md)
- [project/.claude/skills/prisma-client-api/references/model-queries.md](project/.claude/skills/prisma-client-api/references/model-queries.md)
- [project/.claude/skills/prisma-client-api/references/query-options.md](project/.claude/skills/prisma-client-api/references/query-options.md)
- [project/.claude/skills/prisma-client-api/references/raw-queries.md](project/.claude/skills/prisma-client-api/references/raw-queries.md)
- [project/.claude/skills/prisma-client-api/references/relations.md](project/.claude/skills/prisma-client-api/references/relations.md)
- [project/.claude/skills/prisma-client-api/references/transactions.md](project/.claude/skills/prisma-client-api/references/transactions.md)
- [project/.claude/skills/prisma-compute/SKILL.md](project/.claude/skills/prisma-compute/SKILL.md)
- [project/.claude/skills/prisma-compute/references/app-deploy-cli.md](project/.claude/skills/prisma-compute/references/app-deploy-cli.md)
- [project/.claude/skills/prisma-compute/references/compute-config.md](project/.claude/skills/prisma-compute/references/compute-config.md)
- [project/.claude/skills/prisma-compute/references/create-prisma.md](project/.claude/skills/prisma-compute/references/create-prisma.md)
- [project/.claude/skills/prisma-compute/references/frameworks.md](project/.claude/skills/prisma-compute/references/frameworks.md)
- [project/.claude/skills/prisma-compute/references/sdk-api.md](project/.claude/skills/prisma-compute/references/sdk-api.md)
- [project/.claude/skills/prisma-compute/references/troubleshooting.md](project/.claude/skills/prisma-compute/references/troubleshooting.md)
- [project/.claude/skills/prisma-database-setup/SKILL.md](project/.claude/skills/prisma-database-setup/SKILL.md)
- [project/.claude/skills/prisma-database-setup/references/cockroachdb.md](project/.claude/skills/prisma-database-setup/references/cockroachdb.md)
- [project/.claude/skills/prisma-database-setup/references/mongodb.md](project/.claude/skills/prisma-database-setup/references/mongodb.md)
- [project/.claude/skills/prisma-database-setup/references/mysql.md](project/.claude/skills/prisma-database-setup/references/mysql.md)
- [project/.claude/skills/prisma-database-setup/references/postgresql.md](project/.claude/skills/prisma-database-setup/references/postgresql.md)
- [project/.claude/skills/prisma-database-setup/references/prisma-client-setup.md](project/.claude/skills/prisma-database-setup/references/prisma-client-setup.md)
- [project/.claude/skills/prisma-database-setup/references/prisma-postgres.md](project/.claude/skills/prisma-database-setup/references/prisma-postgres.md)
- [project/.claude/skills/prisma-database-setup/references/sqlite.md](project/.claude/skills/prisma-database-setup/references/sqlite.md)
- [project/.claude/skills/prisma-database-setup/references/sqlserver.md](project/.claude/skills/prisma-database-setup/references/sqlserver.md)
- [project/.claude/skills/prisma-driver-adapter-implementation/SKILL.md](project/.claude/skills/prisma-driver-adapter-implementation/SKILL.md)
- [project/.claude/skills/prisma-mongodb-upgrade/SKILL.md](project/.claude/skills/prisma-mongodb-upgrade/SKILL.md)
- [project/.claude/skills/prisma-mongodb-upgrade/references/client-api-mapping.md](project/.claude/skills/prisma-mongodb-upgrade/references/client-api-mapping.md)
- [project/.claude/skills/prisma-mongodb-upgrade/references/decision-stay-or-migrate.md](project/.claude/skills/prisma-mongodb-upgrade/references/decision-stay-or-migrate.md)
- [project/.claude/skills/prisma-mongodb-upgrade/references/migrations-mapping.md](project/.claude/skills/prisma-mongodb-upgrade/references/migrations-mapping.md)
- [project/.claude/skills/prisma-mongodb-upgrade/references/schema-contract-mapping.md](project/.claude/skills/prisma-mongodb-upgrade/references/schema-contract-mapping.md)
- [project/.claude/skills/prisma-mongodb-upgrade/references/verify-cutover-checklist.md](project/.claude/skills/prisma-mongodb-upgrade/references/verify-cutover-checklist.md)
- [project/.claude/skills/prisma-postgres-setup/SKILL.md](project/.claude/skills/prisma-postgres-setup/SKILL.md)
- [project/.claude/skills/prisma-postgres-setup/references/api-basics.md](project/.claude/skills/prisma-postgres-setup/references/api-basics.md)
- [project/.claude/skills/prisma-postgres-setup/references/auth.md](project/.claude/skills/prisma-postgres-setup/references/auth.md)
- [project/.claude/skills/prisma-postgres-setup/references/endpoints.md](project/.claude/skills/prisma-postgres-setup/references/endpoints.md)
- [project/.claude/skills/prisma-postgres-setup/references/prisma7-client.md](project/.claude/skills/prisma-postgres-setup/references/prisma7-client.md)
- [project/.claude/skills/prisma-postgres/SKILL.md](project/.claude/skills/prisma-postgres/SKILL.md)
- [project/.claude/skills/prisma-postgres/references/console-and-connections.md](project/.claude/skills/prisma-postgres/references/console-and-connections.md)
- [project/.claude/skills/prisma-postgres/references/create-db-cli.md](project/.claude/skills/prisma-postgres/references/create-db-cli.md)
- [project/.claude/skills/prisma-postgres/references/management-api-sdk.md](project/.claude/skills/prisma-postgres/references/management-api-sdk.md)
- [project/.claude/skills/prisma-postgres/references/management-api.md](project/.claude/skills/prisma-postgres/references/management-api.md)
- [project/.claude/skills/prisma-upgrade-v7/SKILL.md](project/.claude/skills/prisma-upgrade-v7/SKILL.md)
- [project/.claude/skills/prisma-upgrade-v7/references/accelerate-users.md](project/.claude/skills/prisma-upgrade-v7/references/accelerate-users.md)
- [project/.claude/skills/prisma-upgrade-v7/references/driver-adapters.md](project/.claude/skills/prisma-upgrade-v7/references/driver-adapters.md)
- [project/.claude/skills/prisma-upgrade-v7/references/env-variables.md](project/.claude/skills/prisma-upgrade-v7/references/env-variables.md)
- [project/.claude/skills/prisma-upgrade-v7/references/esm-support.md](project/.claude/skills/prisma-upgrade-v7/references/esm-support.md)
- [project/.claude/skills/prisma-upgrade-v7/references/prisma-config.md](project/.claude/skills/prisma-upgrade-v7/references/prisma-config.md)
- [project/.claude/skills/prisma-upgrade-v7/references/removed-features.md](project/.claude/skills/prisma-upgrade-v7/references/removed-features.md)
- [project/.claude/skills/prisma-upgrade-v7/references/schema-changes.md](project/.claude/skills/prisma-upgrade-v7/references/schema-changes.md)
- [project/.dockerignore](project/.dockerignore)
- [project/.env.example](project/.env.example)
- [project/.gitignore](project/.gitignore)
- [project/.windsurf/skills/prisma-cli/SKILL.md](project/.windsurf/skills/prisma-cli/SKILL.md)
- [project/.windsurf/skills/prisma-cli/references/agent-safety.md](project/.windsurf/skills/prisma-cli/references/agent-safety.md)
- [project/.windsurf/skills/prisma-cli/references/complete.md](project/.windsurf/skills/prisma-cli/references/complete.md)
- [project/.windsurf/skills/prisma-cli/references/db-execute.md](project/.windsurf/skills/prisma-cli/references/db-execute.md)
- [project/.windsurf/skills/prisma-cli/references/db-pull.md](project/.windsurf/skills/prisma-cli/references/db-pull.md)
- [project/.windsurf/skills/prisma-cli/references/db-push.md](project/.windsurf/skills/prisma-cli/references/db-push.md)
- [project/.windsurf/skills/prisma-cli/references/db-seed.md](project/.windsurf/skills/prisma-cli/references/db-seed.md)
- [project/.windsurf/skills/prisma-cli/references/debug.md](project/.windsurf/skills/prisma-cli/references/debug.md)
- [project/.windsurf/skills/prisma-cli/references/dev.md](project/.windsurf/skills/prisma-cli/references/dev.md)
- [project/.windsurf/skills/prisma-cli/references/format.md](project/.windsurf/skills/prisma-cli/references/format.md)
- [project/.windsurf/skills/prisma-cli/references/generate.md](project/.windsurf/skills/prisma-cli/references/generate.md)
- [project/.windsurf/skills/prisma-cli/references/init.md](project/.windsurf/skills/prisma-cli/references/init.md)
- [project/.windsurf/skills/prisma-cli/references/mcp.md](project/.windsurf/skills/prisma-cli/references/mcp.md)
- [project/.windsurf/skills/prisma-cli/references/migrate-deploy.md](project/.windsurf/skills/prisma-cli/references/migrate-deploy.md)
- [project/.windsurf/skills/prisma-cli/references/migrate-dev.md](project/.windsurf/skills/prisma-cli/references/migrate-dev.md)
- [project/.windsurf/skills/prisma-cli/references/migrate-diff.md](project/.windsurf/skills/prisma-cli/references/migrate-diff.md)
- [project/.windsurf/skills/prisma-cli/references/migrate-reset.md](project/.windsurf/skills/prisma-cli/references/migrate-reset.md)
- [project/.windsurf/skills/prisma-cli/references/migrate-resolve.md](project/.windsurf/skills/prisma-cli/references/migrate-resolve.md)
- [project/.windsurf/skills/prisma-cli/references/migrate-status.md](project/.windsurf/skills/prisma-cli/references/migrate-status.md)
- [project/.windsurf/skills/prisma-cli/references/studio.md](project/.windsurf/skills/prisma-cli/references/studio.md)
- [project/.windsurf/skills/prisma-cli/references/validate.md](project/.windsurf/skills/prisma-cli/references/validate.md)
- [project/.windsurf/skills/prisma-client-api/SKILL.md](project/.windsurf/skills/prisma-client-api/SKILL.md)
- [project/.windsurf/skills/prisma-client-api/references/client-methods.md](project/.windsurf/skills/prisma-client-api/references/client-methods.md)
- [project/.windsurf/skills/prisma-client-api/references/constructor.md](project/.windsurf/skills/prisma-client-api/references/constructor.md)
- [project/.windsurf/skills/prisma-client-api/references/filters.md](project/.windsurf/skills/prisma-client-api/references/filters.md)
- [project/.windsurf/skills/prisma-client-api/references/model-queries.md](project/.windsurf/skills/prisma-client-api/references/model-queries.md)
- [project/.windsurf/skills/prisma-client-api/references/query-options.md](project/.windsurf/skills/prisma-client-api/references/query-options.md)
- [project/.windsurf/skills/prisma-client-api/references/raw-queries.md](project/.windsurf/skills/prisma-client-api/references/raw-queries.md)
- [project/.windsurf/skills/prisma-client-api/references/relations.md](project/.windsurf/skills/prisma-client-api/references/relations.md)
- [project/.windsurf/skills/prisma-client-api/references/transactions.md](project/.windsurf/skills/prisma-client-api/references/transactions.md)
- [project/.windsurf/skills/prisma-compute/SKILL.md](project/.windsurf/skills/prisma-compute/SKILL.md)
- [project/.windsurf/skills/prisma-compute/references/app-deploy-cli.md](project/.windsurf/skills/prisma-compute/references/app-deploy-cli.md)
- [project/.windsurf/skills/prisma-compute/references/compute-config.md](project/.windsurf/skills/prisma-compute/references/compute-config.md)
- [project/.windsurf/skills/prisma-compute/references/create-prisma.md](project/.windsurf/skills/prisma-compute/references/create-prisma.md)
- [project/.windsurf/skills/prisma-compute/references/frameworks.md](project/.windsurf/skills/prisma-compute/references/frameworks.md)
- [project/.windsurf/skills/prisma-compute/references/sdk-api.md](project/.windsurf/skills/prisma-compute/references/sdk-api.md)
- [project/.windsurf/skills/prisma-compute/references/troubleshooting.md](project/.windsurf/skills/prisma-compute/references/troubleshooting.md)
- [project/.windsurf/skills/prisma-database-setup/SKILL.md](project/.windsurf/skills/prisma-database-setup/SKILL.md)
- [project/.windsurf/skills/prisma-database-setup/references/cockroachdb.md](project/.windsurf/skills/prisma-database-setup/references/cockroachdb.md)
- [project/.windsurf/skills/prisma-database-setup/references/mongodb.md](project/.windsurf/skills/prisma-database-setup/references/mongodb.md)
- [project/.windsurf/skills/prisma-database-setup/references/mysql.md](project/.windsurf/skills/prisma-database-setup/references/mysql.md)
- [project/.windsurf/skills/prisma-database-setup/references/postgresql.md](project/.windsurf/skills/prisma-database-setup/references/postgresql.md)
- [project/.windsurf/skills/prisma-database-setup/references/prisma-client-setup.md](project/.windsurf/skills/prisma-database-setup/references/prisma-client-setup.md)
- [project/.windsurf/skills/prisma-database-setup/references/prisma-postgres.md](project/.windsurf/skills/prisma-database-setup/references/prisma-postgres.md)
- [project/.windsurf/skills/prisma-database-setup/references/sqlite.md](project/.windsurf/skills/prisma-database-setup/references/sqlite.md)
- [project/.windsurf/skills/prisma-database-setup/references/sqlserver.md](project/.windsurf/skills/prisma-database-setup/references/sqlserver.md)
- [project/.windsurf/skills/prisma-driver-adapter-implementation/SKILL.md](project/.windsurf/skills/prisma-driver-adapter-implementation/SKILL.md)
- [project/.windsurf/skills/prisma-mongodb-upgrade/SKILL.md](project/.windsurf/skills/prisma-mongodb-upgrade/SKILL.md)
- [project/.windsurf/skills/prisma-mongodb-upgrade/references/client-api-mapping.md](project/.windsurf/skills/prisma-mongodb-upgrade/references/client-api-mapping.md)
- [project/.windsurf/skills/prisma-mongodb-upgrade/references/decision-stay-or-migrate.md](project/.windsurf/skills/prisma-mongodb-upgrade/references/decision-stay-or-migrate.md)
- [project/.windsurf/skills/prisma-mongodb-upgrade/references/migrations-mapping.md](project/.windsurf/skills/prisma-mongodb-upgrade/references/migrations-mapping.md)
- [project/.windsurf/skills/prisma-mongodb-upgrade/references/schema-contract-mapping.md](project/.windsurf/skills/prisma-mongodb-upgrade/references/schema-contract-mapping.md)
- [project/.windsurf/skills/prisma-mongodb-upgrade/references/verify-cutover-checklist.md](project/.windsurf/skills/prisma-mongodb-upgrade/references/verify-cutover-checklist.md)
- [project/.windsurf/skills/prisma-postgres-setup/SKILL.md](project/.windsurf/skills/prisma-postgres-setup/SKILL.md)
- [project/.windsurf/skills/prisma-postgres-setup/references/api-basics.md](project/.windsurf/skills/prisma-postgres-setup/references/api-basics.md)
- [project/.windsurf/skills/prisma-postgres-setup/references/auth.md](project/.windsurf/skills/prisma-postgres-setup/references/auth.md)
- [project/.windsurf/skills/prisma-postgres-setup/references/endpoints.md](project/.windsurf/skills/prisma-postgres-setup/references/endpoints.md)
- [project/.windsurf/skills/prisma-postgres-setup/references/prisma7-client.md](project/.windsurf/skills/prisma-postgres-setup/references/prisma7-client.md)
- [project/.windsurf/skills/prisma-postgres/SKILL.md](project/.windsurf/skills/prisma-postgres/SKILL.md)
- [project/.windsurf/skills/prisma-postgres/references/console-and-connections.md](project/.windsurf/skills/prisma-postgres/references/console-and-connections.md)
- [project/.windsurf/skills/prisma-postgres/references/create-db-cli.md](project/.windsurf/skills/prisma-postgres/references/create-db-cli.md)
- [project/.windsurf/skills/prisma-postgres/references/management-api-sdk.md](project/.windsurf/skills/prisma-postgres/references/management-api-sdk.md)
- [project/.windsurf/skills/prisma-postgres/references/management-api.md](project/.windsurf/skills/prisma-postgres/references/management-api.md)
- [project/.windsurf/skills/prisma-upgrade-v7/SKILL.md](project/.windsurf/skills/prisma-upgrade-v7/SKILL.md)
- [project/.windsurf/skills/prisma-upgrade-v7/references/accelerate-users.md](project/.windsurf/skills/prisma-upgrade-v7/references/accelerate-users.md)
- [project/.windsurf/skills/prisma-upgrade-v7/references/driver-adapters.md](project/.windsurf/skills/prisma-upgrade-v7/references/driver-adapters.md)
- [project/.windsurf/skills/prisma-upgrade-v7/references/env-variables.md](project/.windsurf/skills/prisma-upgrade-v7/references/env-variables.md)
- [project/.windsurf/skills/prisma-upgrade-v7/references/esm-support.md](project/.windsurf/skills/prisma-upgrade-v7/references/esm-support.md)
- [project/.windsurf/skills/prisma-upgrade-v7/references/prisma-config.md](project/.windsurf/skills/prisma-upgrade-v7/references/prisma-config.md)
- [project/.windsurf/skills/prisma-upgrade-v7/references/removed-features.md](project/.windsurf/skills/prisma-upgrade-v7/references/removed-features.md)
- [project/.windsurf/skills/prisma-upgrade-v7/references/schema-changes.md](project/.windsurf/skills/prisma-upgrade-v7/references/schema-changes.md)
- [project/AGENTS.md](project/AGENTS.md)
- [project/CLAUDE.md](project/CLAUDE.md)
- [project/Dockerfile.backup](project/Dockerfile.backup)
- [project/README.md](project/README.md)
- [project/app/favicon.ico](project/app/favicon.ico)
- [project/app/globals.css](project/app/globals.css)
- [project/backup-loop.sh](project/backup-loop.sh)
- [project/docs/deployment.md](project/docs/deployment.md)
- [project/docs/image-storage.md](project/docs/image-storage.md)
- [project/docs/post-reading.md](project/docs/post-reading.md)
- [project/package-lock.json](project/package-lock.json)
- [project/package.json](project/package.json)
- [project/prisma/migrations/20260907113259/migration.sql](project/prisma/migrations/20260907113259/migration.sql)
- [project/prisma/migrations/20260908000000_user_profile/migration.sql](project/prisma/migrations/20260908000000_user_profile/migration.sql)
- [project/prisma/migrations/20260908000100_blog_features/migration.sql](project/prisma/migrations/20260908000100_blog_features/migration.sql)
- [project/prisma/migrations/20260908000200_drafts_images/migration.sql](project/prisma/migrations/20260908000200_drafts_images/migration.sql)
- [project/prisma/migrations/20260908000300_post_engagement/migration.sql](project/prisma/migrations/20260908000300_post_engagement/migration.sql)
- [project/prisma/migrations/20260909000000_user_bio/migration.sql](project/prisma/migrations/20260909000000_user_bio/migration.sql)
- [project/prisma/migrations/20260909000100_notifications/migration.sql](project/prisma/migrations/20260909000100_notifications/migration.sql)
- [project/prisma/migrations/20260909000200_chat/migration.sql](project/prisma/migrations/20260909000200_chat/migration.sql)
- [project/prisma/migrations/20260909000300_comment_replies/migration.sql](project/prisma/migrations/20260909000300_comment_replies/migration.sql)
- [project/prisma/migrations/migration_lock.toml](project/prisma/migrations/migration_lock.toml)
- [project/prisma/schema.prisma](project/prisma/schema.prisma)
- [project/public/file.svg](project/public/file.svg)
- [project/public/globe.svg](project/public/globe.svg)
- [project/public/next.svg](project/public/next.svg)
- [project/public/vercel.svg](project/public/vercel.svg)
- [project/public/window.svg](project/public/window.svg)
- [project/skills-lock.json](project/skills-lock.json)
- [project/tsconfig.json](project/tsconfig.json)
