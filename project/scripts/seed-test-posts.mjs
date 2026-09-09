import "dotenv/config";
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prefix = "[TEST DATA]";
const topics = ["Next.js 서버 컴포넌트 정리", "Prisma 쿼리 최적화", "Redis 캐시 설계", "TypeScript 타입 좁히기", "React 상태 관리 비교", "Docker 개발 환경 구성", "PostgreSQL 인덱스 실험", "웹 접근성 체크리스트", "SSE 알림 구현기", "WebSocket 채팅 구조"];

function contentFor(index, title) {
  return JSON.stringify({ type: "doc", content: [
    { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: title }] },
    { type: "paragraph", content: [{ type: "text", text: index + "번째 테스트 게시글입니다. 목록 카드와 페이지네이션을 확인하기 위한 샘플 콘텐츠입니다." }] },
    { type: "heading", attrs: { level: 3 }, content: [{ type: "text", text: "정리" }] },
    { type: "paragraph", content: [{ type: "text", text: "실제 개발 기록처럼 제목, 본문, 태그, 작성일이 포함되어 있습니다." }] },
  ] });
}

const userSql = 'INSERT INTO "User" ("id", "name", "nickname", "email", "emailVerified", "updatedAt") VALUES (gen_random_uuid()::text, $1, $2, $3, NOW(), NOW()) ON CONFLICT ("email") DO UPDATE SET "name" = EXCLUDED."name", "nickname" = EXCLUDED."nickname", "updatedAt" = NOW() RETURNING "id"';
const categorySql = 'INSERT INTO "Category" ("id", "name", "order", "userId", "updatedAt") VALUES (gen_random_uuid()::text, $1, 999, $2, NOW()) ON CONFLICT DO NOTHING RETURNING "id"';
const postSql = "INSERT INTO \"Post\" (\"id\", \"title\", \"tags\", \"content\", \"visibility\", \"authorId\", \"categoryId\", \"createdAt\", \"updatedAt\") SELECT gen_random_uuid()::text, $1, $2, $3, 'PUBLIC', $4, $5, NOW() - ($6::int * INTERVAL '1 day'), NOW() - ($6::int * INTERVAL '1 day') WHERE NOT EXISTS (SELECT 1 FROM \"Post\" WHERE \"authorId\" = $4 AND \"title\" = $1)";

try {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const user = await client.query(userSql, ["테스트 작성자", "테스트작성자", "test-seed@example.com"]);
    const userId = user.rows[0].id;
    const categoryName = prefix + " 카테고리";
    const category = await client.query(categorySql, [categoryName, userId]);
    let categoryId = category.rows[0]?.id;
    if (!categoryId) {
      const existing = await client.query('SELECT "id" FROM "Category" WHERE "userId" = $1 AND "name" = $2 LIMIT 1', [userId, categoryName]);
      categoryId = existing.rows[0].id;
    }
    let inserted = 0;
    for (let index = 1; index <= 100; index += 1) {
      const title = prefix + " " + String(index).padStart(3, "0") + " · " + topics[(index - 1) % topics.length];
      const result = await client.query(postSql, [title, ["test-" + ((index % 10) + 1), "샘플"], contentFor(index, title), userId, categoryId, index]);
      inserted += result.rowCount || 0;
    }
    await client.query("COMMIT");
    console.log("테스트 게시글 " + inserted + "개를 추가했습니다. (이미 존재하는 데이터는 건너뜀)");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
} finally {
  await pool.end();
}
