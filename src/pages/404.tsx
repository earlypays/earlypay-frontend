import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { FileQuestion } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Custom404Page() {
  const router = useRouter();

  return (
    <motion.div
      className="flex min-h-screen items-center justify-center bg-hero px-6 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-full max-w-md space-y-8 rounded-lg border border-border bg-card p-10 shadow-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex size-20 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <FileQuestion size={40} strokeWidth={1.5} />
          </div>
          <div className="space-y-2">
            <h1 className="font-serif text-3xl font-semibold text-heading">
              404
            </h1>
            <h2 className="text-xl font-medium text-foreground">
              Page Not Found
            </h2>
            <p className="mx-auto mt-2 max-w-[250px] text-sm font-normal leading-relaxed text-muted-foreground">
              We couldn&apos;t find the page you&apos;re looking for. It might
              have been removed or you may have mistyped the address.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="button"
            className="w-full"
            size="lg"
            onClick={() => router.push("/")}
          >
            Return Home
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
