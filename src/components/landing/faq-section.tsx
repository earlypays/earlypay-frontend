"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { Container } from "@/components/ui/container";
import { FAQ_ITEMS } from "@/lib/landing";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white py-4" data-aos="fade-up">
      <Container className="">
        <div className="space-y-4 text-center">
          <h2 className="font-georgia text-3xl font-bold text-heading sm:text-[56px]">
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="text-sm font-normal text-muted-foreground sm:text-2xl">
            Please refer to the frequently asked questions for your quick help
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const open = openIndex === index;
            return (
              <div
                key={item.question}
                className="rounded-md bg-white shadow-[0_8px_24px_rgba(16,70,64,0.06)]"
              >
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? -1 : index)}
                >
                  <span className="font-sans text-sm font-semibold text-heading sm:text-[16px]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 text-heading transition-transform",
                      open && "rotate-180",
                    )}
                  />
                </button>
                {open ? (
                  <p className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted-foreground sm:px-6">
                    {item.answer}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
