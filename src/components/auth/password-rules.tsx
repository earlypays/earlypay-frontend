import { Check, X } from "lucide-react";

import { PASSWORD_RULES } from "@/lib/password-rules";
import { cn } from "@/lib/utils";

export function PasswordRules({ value }: { value: string }) {
  return (
    <ul className="space-y-1">
      {PASSWORD_RULES.map((rule) => {
        const met = rule.test(value);
        return (
          <li
            key={rule.id}
            className="flex items-center gap-2 font-sans text-xs text-[#6B6B6B] sm:text-sm"
          >
            <span
              className={cn(
                "flex size-4 shrink-0 items-center justify-center rounded-full",
                met ? "bg-[#008B8B]" : "bg-[#E53935]",
              )}
            >
              {met ? (
                <Check className="size-2.5 text-white" strokeWidth={3} />
              ) : (
                <X className="size-2.5 text-white" strokeWidth={3} />
              )}
            </span>
            {rule.label}
          </li>
        );
      })}
    </ul>
  );
}
