import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export function AuthStageLayout({
  children,
  onBack,
}: {
  children: ReactNode;
  onBack: () => void;
}) {
  return (
    <motion.div
      className="flex h-dvh items-stretch bg-[#F3F3F3] p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-[#003F3F]">
        <button
          type="button"
          onClick={onBack}
          className="absolute top-6 left-4 z-10 inline-flex cursor-pointer items-center gap-2 font-sans text-sm font-medium text-white hover:opacity-80 sm:left-8"
        >
          <ArrowLeft className="size-4" />
          Go Back
        </button>
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto px-4 py-16">
          <div className="w-full max-w-md rounded-2xl bg-white px-6 py-8 shadow-[0_16px_50px_rgba(0,0,0,0.18)] sm:px-8 sm:py-10">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
