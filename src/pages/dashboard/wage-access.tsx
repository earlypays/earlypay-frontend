import { useEffect } from "react";
import { useRouter } from "next/router";

export default function WageAccessRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard/withdraw");
  }, [router]);
  return null;
}
