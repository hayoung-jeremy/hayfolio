"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

type Fn = () => void | Promise<void>;

type BackButtonProps = {
  /** 이동 대상. 없으면 router.back() */
  to?: string;
  /** push 대신 replace 사용 여부 */
  replace?: boolean;
  /** 이동 전에 실행 (여러 개 가능) */
  onBeforeNavigate?: Fn | Fn[];
  /** 이동 후 실행 (라우팅되면 실행 못될 수 있음) */
  onAfterNavigate?: Fn | Fn[];
  /** 표시 텍스트 */
  label?: string;
  /** 추가 클래스 */
  className?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
};

export default function BackButton({
  to,
  replace,
  onBeforeNavigate,
  onAfterNavigate,
  label = "← Back",
  className,
  disabled,
}: BackButtonProps) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const runAll = async (fns?: Fn | Fn[]) => {
    if (!fns) return;
    const arr = Array.isArray(fns) ? fns : [fns];
    for (const fn of arr) await fn?.();
  };

  const handleClick = async () => {
    if (busy || disabled) return;
    setBusy(true);
    try {
      await runAll(onBeforeNavigate);
      if (to) {
        const options = { scroll: false as const };

        if (to === "/") {
          sessionStorage.setItem("home-restore", "1");
        }

        replace ? router.replace(to, options) : router.push(to, options);
      } else {
        router.back();
      }
      // NOTE: 이동 직후엔 보통 새 페이지로 넘어가므로 after 훅은 같은 페이지에선 실행되지 않을 수 있음
      await runAll(onAfterNavigate);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || busy}
      aria-label="Go back"
      className={clsx(
        "px-4 py-2 rounded backdrop-blur-2xl bg-black/50 text-white",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        className
      )}
    >
      {label}
    </button>
  );
}
