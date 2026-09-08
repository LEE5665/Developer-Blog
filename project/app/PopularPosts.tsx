"use client";

import { useState } from "react";
import { PostCard, type PostCardData } from "./PostCard";

type PopularPost = PostCardData & { views: number };
const periods = [
  { key: "day", label: "일", description: "최근 24시간" },
  { key: "week", label: "주", description: "최근 7일" },
  { key: "month", label: "월", description: "최근 30일" },
] as const;
type Period = typeof periods[number]["key"];

export function PopularPosts({ rankings, currentUserId }: { rankings: Record<Period, PopularPost[]>; currentUserId?: string }) {
  const [period, setPeriod] = useState<Period>("week");
  const selected = periods.find((item) => item.key === period)!;
  const posts = rankings[period];

  return (
    <section className="weekly-popular" aria-labelledby="popular-title">
      <div className="section-heading popular-heading">
        <h2 id="popular-title">많이 읽은 글</h2>
        <div className="popular-periods" role="group" aria-label="인기 글 조회 기간">
          {periods.map((item) => <button key={item.key} type="button" aria-pressed={period === item.key} onClick={() => setPeriod(item.key)}>{item.label}</button>)}
        </div>
      </div>
      <div aria-live="polite" aria-atomic="true">
        <p className="comment-hint">{selected.description} 조회수순</p>
        <ol className="home-post-grid">{posts.map((post, index) => <li key={post.id}><PostCard post={post} rank={index + 1} views={post.views} currentUserId={currentUserId} /></li>)}</ol>
        {!posts.length && <p className="comment-hint">{selected.description} 동안 읽힌 공개 글이 아직 없습니다.</p>}
      </div>
    </section>
  );
}
