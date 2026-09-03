import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function AuthSplitLayout({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="grid h-dvh grid-cols-1 gap-4 bg-[#F3F3F3] p-4 sm:gap-6 sm:p-6 lg:grid-cols-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex min-h-0 overflow-y-auto rounded-md border border-[#E6E6E6] bg-white px-6 py-5 shadow-[0_16px_50px_rgba(16,70,64,0.12)] sm:px-10 lg:px-12">
        <div className="m-auto w-full">{children}</div>
      </div>
      <div className="relative hidden min-h-0 overflow-hidden rounded-md lg:block">
        <img
          src="/auth/panel.png"
          alt="Give your workforce more financial flexibility"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </motion.div>
  );
}
