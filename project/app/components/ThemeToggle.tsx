"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";

type Theme = "light" | "dark" | "system";
const storageKey = "developer-blog-theme";
const options = [
  { value: "light", label: "라이트 모드", icon: "sun" },
  { value: "dark", label: "다크 모드", icon: "moon" },
  { value: "system", label: "시스템 설정", icon: "monitor" },
] as const;

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const read = (): Theme => {
      try {
        const saved = localStorage.getItem(storageKey);
        return saved === "light" || saved === "dark" ? saved : "system";
      } catch { return "system"; }
    };
    const sync = () => {
      const selected = read();
      document.documentElement.classList.toggle("dark", selected === "dark" || (selected === "system" && media.matches));
      setTheme(selected);
    };
    const onSystemChange = () => {
      // Preserve an in-memory choice even when browser storage is unavailable.
      setTheme((selected) => {
        if (selected === "system") document.documentElement.classList.toggle("dark", media.matches);
        return selected;
      });
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null) sync();
    };
    sync();
    media.addEventListener("change", onSystemChange);
    window.addEventListener("storage", onStorage);
    return () => {
      media.removeEventListener("change", onSystemChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  function selectTheme(value: Theme) {
    setTheme(value);
    document.documentElement.classList.toggle("dark", value === "dark" || (value === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches));
    try { localStorage.setItem(storageKey, value); } catch { /* The current tab still supports switching themes. */ }
  }

  return (
    <div className="theme-switch" role="group" aria-label="화면 테마">
      {options.map(({ value, label, icon }) => (
        <button type="button" key={value} aria-label={label} title={label} aria-pressed={theme === value} onClick={() => selectTheme(value)}>
          <Icon name={icon} width={16} height={16} />
        </button>
      ))}
    </div>
  );
}
