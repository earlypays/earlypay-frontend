"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  widthClass?: string;
  children: React.ReactNode;
};

export function Modal({
  open,
  onClose,
  title,
  widthClass = "max-w-lg",
  children,
}: ModalProps) {
  React.useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black/40 p-2 sm:p-4"
      onClick={onClose}
    >
      <div className="flex min-h-[calc(100dvh-1rem)] items-center justify-center py-2 sm:min-h-[calc(100dvh-2rem)] sm:py-4">
        <div
          className={cn(
            "flex w-full max-w-[calc(100vw-1rem)] min-w-0 max-h-[calc(100dvh-1rem)] flex-col overflow-x-hidden rounded-2xl bg-card p-4 shadow-xl outline-none sm:max-h-[90dvh] sm:p-6",
            widthClass,
          )}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-4 flex shrink-0 items-center justify-between gap-4">
            {title ? (
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            ) : (
              <span />
            )}
            <button
              type="button"
              aria-label="Close dialog"
              onClick={onClose}
              className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-muted text-foreground hover:bg-muted/80"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain [scrollbar-gutter:stable] [-webkit-overflow-scrolling:touch]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
