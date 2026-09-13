"use client";

import { Icon } from "@/app/components/Icon";

import { useState, useEffect, useCallback, useRef } from "react";

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  date: string; // "YYYY-MM-DD"
  createdAt: string;
}

export function TodoCalendar() {
  const today = new Date();
  const todayStr = formatDate(today);

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-indexed
  const [selectedDate, setSelectedDate] = useState(todayStr);

  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const requestVersion = useRef(0);
  const [newTitle, setNewTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // "YYYY-MM" 형식 구하기
  const monthStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`;

  // 해당 월의 Todo 목록 로드
  const fetchTodos = useCallback(() => {
    const version = ++requestVersion.current;
    return fetch(`/api/todos?month=${monthStr}`)
      .then(async (response) => {
        const data = await response.json();
        if (version !== requestVersion.current) return;
        setError(null);
        if (response.ok && data.todos) setTodos(data.todos);
        else setError(data.error || "할 일 목록을 불러오지 못했습니다.");
      })
      .catch(() => {
        if (version === requestVersion.current) setError("서버와 연결하지 못했습니다.");
      })
      .finally(() => {
        if (version === requestVersion.current) setLoading(false);
      });
  }, [monthStr]);

  useEffect(() => {
    void fetchTodos();
    return () => { requestVersion.current += 1; };
  }, [fetchTodos]);

  // 이전 달 / 다음 달 / 오늘 이동
  const handlePrevMonth = () => {
    setLoading(true);
    if (currentMonth === 0) {
      setCurrentYear((y) => y - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    setLoading(true);
    if (currentMonth === 11) {
      setCurrentYear((y) => y + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleGoToday = () => {
    const now = new Date();
    if (currentYear !== now.getFullYear() || currentMonth !== now.getMonth()) setLoading(true);
    setCurrentYear(now.getFullYear());
    setCurrentMonth(now.getMonth());
    setSelectedDate(todayStr);
  };

  // 할 일 추가 (POST /api/todos)
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle.trim(),
          date: selectedDate,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "할 일 추가에 실패했습니다.");
      } else if (data.todo) {
        setTodos((prev) => [...prev, data.todo]);
        setNewTitle("");
      }
    } catch (err) {
      console.error(err);
      setError("서버 통신 오류");
    } finally {
      setSubmitting(false);
    }
  };

  // 완료 토글 (PATCH /api/todos)
  const handleToggleTodo = async (todo: TodoItem) => {
    const updatedStatus = !todo.completed;

    // 낙관적 업데이트
    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? { ...t, completed: updatedStatus } : t))
    );

    try {
      const res = await fetch("/api/todos", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: todo.id,
          completed: updatedStatus,
        }),
      });
      if (!res.ok) {
        setTodos((prev) =>
          prev.map((t) => (t.id === todo.id ? { ...t, completed: !updatedStatus } : t))
        );
      }
    } catch (err) {
      console.error(err);
      setTodos((prev) =>
        prev.map((t) => (t.id === todo.id ? { ...t, completed: !updatedStatus } : t))
      );
    }
  };

  // 할 일 삭제 (DELETE /api/todos?id=...)
  const handleDeleteTodo = async (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));

    try {
      await fetch(`/api/todos?id=${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err);
      fetchTodos();
    }
  };

  // 캘린더 날짜 계산
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 = 일요일
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const prevMonthLastDate = new Date(currentYear, currentMonth, 0).getDate();

  // 이전 달 날짜 채우기
  const prevDays = [];
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    prevDays.push({
      day: prevMonthLastDate - i,
      isCurrentMonth: false,
      dateStr: "",
    });
  }

  // 이번 달 날짜 채우기
  const currentDays = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    currentDays.push({
      day: d,
      isCurrentMonth: true,
      dateStr,
    });
  }

  // 다음 달 날짜 채우기 (총 35 또는 42칸 맞추기)
  const totalCells = Math.ceil((prevDays.length + currentDays.length) / 7) * 7;
  const nextDays = [];
  const remainingCells = totalCells - (prevDays.length + currentDays.length);
  for (let d = 1; d <= remainingCells; d++) {
    nextDays.push({
      day: d,
      isCurrentMonth: false,
      dateStr: "",
    });
  }

  const allCalendarDays = [...prevDays, ...currentDays, ...nextDays];

  // 선택된 날짜의 할 일 목록
  const selectedDateTodos = todos.filter((t) => t.date === selectedDate);
  const selectedCompletedCount = selectedDateTodos.filter((t) => t.completed).length;

  return (
    <div className="space-y-6">
      {/* 타이틀 및 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            캘린더와 할 일
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            원하는 날짜를 선택하여 일정을 기록하고 완료 여부를 관리하세요.
          </p>
        </div>

        {/* 오늘 버튼 */}
        <button
          type="button"
          onClick={handleGoToday}
          className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 transition shadow-xs"
        >
          오늘로 이동
        </button>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400 text-sm font-medium">
          {error}
        </div>
      )}

      {/* 캘린더 + Todo 패널 2단 레이아웃 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 왼쪽: 캘린더 본체 (7/12) */}
        <div className="calendar-panel min-w-0 lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-xs">
          {/* 달력 상단 네비게이션 */}
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white font-mono">
              {currentYear}년 {currentMonth + 1}월
            </h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 text-xs font-bold transition shadow-xs"
                title="이전 달"
              >
                ◀
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 text-xs font-bold transition shadow-xs"
                title="다음 달"
              >
                ▶
              </button>
            </div>
          </div>

          {/* 요일 헤더 (일 ~ 토) - 명확하고 또렷한 글자색 */}
          <div className="grid grid-cols-7 text-center text-xs font-bold pb-2.5 border-b border-zinc-200 dark:border-zinc-800 mb-2">
            <div className="text-red-500 dark:text-red-400">일</div>
            <div className="text-zinc-700 dark:text-zinc-300">월</div>
            <div className="text-zinc-700 dark:text-zinc-300">화</div>
            <div className="text-zinc-700 dark:text-zinc-300">수</div>
            <div className="text-zinc-700 dark:text-zinc-300">목</div>
            <div className="text-zinc-700 dark:text-zinc-300">금</div>
            <div className="text-blue-500 dark:text-blue-400">토</div>
          </div>

          {/* 달력 일자 그리드 */}
          <div className="calendar-grid grid grid-cols-7 gap-1 sm:gap-1.5">
            {allCalendarDays.map((cell, idx) => {
              if (!cell.isCurrentMonth) {
                return (
                  <div
                    key={`empty-${idx}`}
                    className="h-16 sm:h-20 rounded-xl p-1.5 sm:p-2 text-zinc-300 dark:text-zinc-700 select-none flex flex-col justify-between"
                  >
                    <span className="text-xs font-medium">{cell.day}</span>
                  </div>
                );
              }

              const isSelected = cell.dateStr === selectedDate;
              const isToday = cell.dateStr === todayStr;
              const dayOfWeek = idx % 7;
              const cellTodos = todos.filter((t) => t.date === cell.dateStr);
              const cellCompleted = cellTodos.filter((t) => t.completed).length;

              return (
                <button
                  key={cell.dateStr}
                  type="button"
                  onClick={() => setSelectedDate(cell.dateStr)}
                  aria-label={cell.dateStr + (isToday ? ", 오늘" : "")}
                  aria-pressed={isSelected}
                  className={`h-16 sm:h-20 rounded-2xl p-1.5 sm:p-2 text-left transition flex flex-col justify-between border relative ${
                    isSelected
                      ? "border-zinc-900 dark:border-white bg-zinc-100 dark:bg-zinc-800 ring-2 ring-zinc-900/10 dark:ring-white/20 shadow-xs"
                      : "border-transparent hover:bg-zinc-100/70 dark:hover:bg-zinc-800/60"
                  }`}
                >
                  <div className="calendar-day-heading flex items-center justify-between w-full">
                    <span
                      className={`text-xs sm:text-sm font-bold ${
                        dayOfWeek === 0
                          ? "text-red-500 dark:text-red-400"
                          : dayOfWeek === 6
                          ? "text-blue-500 dark:text-blue-400"
                          : "text-zinc-900 dark:text-zinc-100"
                      }`}
                    >
                      {cell.day}
                    </span>
                    {isToday && (
                      <span className="calendar-today text-[10px] px-1.5 rounded-md font-semibold" aria-hidden="true">
                        오늘
                      </span>
                    )}
                  </div>

                  {/* 해당 일자의 Todo 개수 및 뱃지 표시 */}
                  {cellTodos.length > 0 && (
                    <div className="mt-auto pt-1">
                      <div
                        className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono font-semibold truncate flex items-center gap-1 ${
                          cellCompleted === cellTodos.length
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0"></span>
                        <span className="hidden sm:inline">
                          {cellCompleted}/{cellTodos.length}
                        </span>
                        <span className="sm:hidden">{cellTodos.length}</span>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 오른쪽: 선택된 일자 Todo 리스트 (5/12) */}
        <div className="min-w-0 lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5">
          {/* 선택 날짜 헤더 */}
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <div>
              <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">선택된 날짜</div>
              <div className="text-base font-bold text-zinc-900 dark:text-white font-mono mt-0.5">
                {selectedDate}
              </div>
            </div>
            {selectedDateTodos.length > 0 && (
              <div className="text-xs font-bold text-zinc-600 dark:text-zinc-300">
                {selectedCompletedCount} / {selectedDateTodos.length} 완료
              </div>
            )}
          </div>

          {/* 할 일 입력 폼 (명시적 텍스트 및 배경색 지정) */}
          <form onSubmit={handleAddTodo} className="flex gap-2">
            <input
              type="text"
              aria-label="새로운 할 일" value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="새로운 할 일 입력..."
              className="min-w-0 flex-1 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition"
            />
            <button
              type="submit"
              disabled={submitting || !newTitle.trim()}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold text-xs hover:opacity-90 disabled:opacity-40 transition shrink-0 shadow-xs"
            >
              추가
            </button>
          </form>

          {/* 할 일 리스트 */}
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {loading ? (
              <div className="p-8 text-center text-xs text-zinc-500 dark:text-zinc-400">
                일정을 불러오는 중...
              </div>
            ) : selectedDateTodos.length > 0 ? (
              selectedDateTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition ${
                    todo.completed
                      ? "bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 opacity-60"
                      : "bg-white dark:bg-zinc-850 border-zinc-200 dark:border-zinc-750 shadow-xs"
                  }`}
                >
                  <label className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(todo)}
                      className="w-4 h-4 rounded text-zinc-900 dark:text-zinc-100 accent-zinc-900 dark:accent-white cursor-pointer"
                    />
                    <span
                      className={`text-sm truncate ${
                        todo.completed
                          ? "line-through text-zinc-400 dark:text-zinc-500"
                          : "text-zinc-900 dark:text-zinc-100 font-medium"
                      }`}
                    >
                      {todo.title}
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="text-xs text-zinc-400 hover:text-rose-500 p-1 rounded transition shrink-0"
                    title="삭제"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg>
                  </button>
                </div>
              ))
            ) : (
              <div className="p-8 text-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                <Icon name="calendar" className="mx-auto mb-3 text-muted" width={24} height={24} />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  이 날짜에 등록된 일정이 없습니다.
                  <br />
                  상단 입력창에서 첫 번째 할 일을 등록해보세요!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
