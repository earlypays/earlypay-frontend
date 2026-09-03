import { useRef, type ClipboardEvent, type KeyboardEvent } from "react";

import { cn } from "@/lib/utils";

const LENGTH = 6;

export function OtpInput({
  value,
  onChange,
  invalid,
}: {
  value: string;
  onChange: (next: string) => void;
  invalid?: boolean;
}) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = value.padEnd(LENGTH, " ").slice(0, LENGTH).split("");

  const focusAt = (index: number) => {
    refs.current[index]?.focus();
    refs.current[index]?.select();
  };

  const setDigit = (index: number, digit: string) => {
    const next = value.padEnd(LENGTH, " ").split("");
    next[index] = digit;
    onChange(next.join("").replace(/ /g, "").slice(0, LENGTH));
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, LENGTH);
    if (!pasted) return;
    onChange(pasted);
    focusAt(Math.min(pasted.length, LENGTH - 1));
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.key === "Backspace" && !value[index] && index > 0) {
      setDigit(index - 1, "");
      focusAt(index - 1);
    }
    if (event.key === "ArrowLeft" && index > 0) focusAt(index - 1);
    if (event.key === "ArrowRight" && index < LENGTH - 1) focusAt(index + 1);
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(node) => {
            refs.current[index] = node;
          }}
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digit.trim()}
          aria-label={`Digit ${index + 1}`}
          onPaste={handlePaste}
          onKeyDown={(event) => handleKeyDown(event, index)}
          onChange={(event) => {
            const next = event.target.value.replace(/\D/g, "").slice(-1);
            setDigit(index, next);
            if (next && index < LENGTH - 1) focusAt(index + 1);
          }}
          className={cn(
            "size-11 rounded-lg border bg-white text-center font-sans text-lg font-semibold text-[#48484A] outline-none sm:size-12",
            invalid
              ? "border-[#E53935] focus:border-[#E53935]"
              : "border-[#D1D5DB] focus:border-[#008B8B]",
          )}
        />
      ))}
    </div>
  );
}
