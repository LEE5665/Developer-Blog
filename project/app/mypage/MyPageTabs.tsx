"use client";

import { useState, type ReactNode } from "react";
import { Icon, type IconName } from "@/app/components/Icon";
import { ProfileEditor } from "./ProfileEditor";
import { CategoryManager, CategoryItem } from "./CategoryManager";
import { TodoCalendar } from "./TodoCalendar";

interface MyPageTabsProps {
  user: {
    id: string;
    name: string | null;
    nickname: string | null;
    tag: string | null;
    email: string | null;
    image: string | null;
  };
  categories: CategoryItem[];
  posts: ReactNode;
  initialTab?: string;
}

type TabType = "profile" | "posts" | "category" | "todo";

export function MyPageTabs({ user, categories, posts, initialTab }: MyPageTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab === "posts" ? "posts" : "profile");

  const tabs: { id: TabType; label: string; icon: IconName; badge?: string }[] = [
    { id: "profile", label: "프로필 설정", icon: "user" },
    { id: "posts", label: "내 포스트", icon: "file" },
    { id: "category", label: "카테고리", icon: "folder", badge: String(categories.filter((category) => !category.isDivider).length) },
    { id: "todo", label: "캘린더", icon: "calendar" },
  ];

  return (
    <div>
      <div className="workspace-tabs" role="group" aria-label="마이페이지 메뉴">
        {tabs.map((tab) => (
          <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} aria-pressed={activeTab === tab.id} aria-controls="settings-panel">
            <Icon name={tab.icon} width={18} height={18} /><span>{tab.label}</span>
            {tab.badge !== undefined && <span className="tab-count">{tab.badge}</span>}
          </button>
        ))}
      </div>
      <div id="settings-panel" className="settings-panel">
        {activeTab === "profile" && <ProfileEditor user={user} />}
        {activeTab === "posts" && posts}
        {activeTab === "category" && <CategoryManager categories={categories} />}
        {activeTab === "todo" && <TodoCalendar />}
      </div>
    </div>
  );
}
