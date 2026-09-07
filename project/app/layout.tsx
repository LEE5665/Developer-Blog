import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "./components/SiteHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Developer Blog | 개발의 순간을 기록하다", template: "%s | Developer Blog" },
  description: "작은 발견부터 깊이 있는 이야기까지. 개발자의 배움과 생각을 기록하고 나누는 공간입니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var d=false;try{var t=localStorage.getItem('developer-blog-theme');d=t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches)}catch(e){d=matchMedia('(prefers-color-scheme: dark)').matches}document.documentElement.classList.toggle('dark',d)})()` }} />
      </head>
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">본문으로 건너뛰기</a>
        <SiteHeader />
        <div id="main-content" className="site-content" tabIndex={-1}>{children}</div>
        <footer className="site-footer"><span>© 2026 Developer Blog</span><span>배움의 순간을, 오래 남는 기록으로.</span></footer>
      </body>
    </html>
  );
}
