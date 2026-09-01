import Link from "next/link";

import { OptimizedImage } from "@/components/ui/optimized-image";
import { APP_NAME } from "@/lib/constants";
import { IMAGE_QUALITY_SHARP } from "@/lib/image-quality";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  imageClassName?: string;
  href?: string;
  src?: string;
  width?: number;
  height?: number;
  tagline?: string;
};

export function Logo({
  className,
  imageClassName,
  href = "/",
  src = "/landing/logo.png",
  width = 146,
  height = 34,
  tagline,
}: LogoProps) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <span className="flex flex-col">
        <OptimizedImage
          src={src}
          alt={APP_NAME}
          width={width}
          height={height}
          quality={IMAGE_QUALITY_SHARP}
          className={cn("h-8 w-auto sm:h-9", imageClassName)}
        />
        {tagline ? (
          <span className="mt-1 text-[10px] leading-tight font-medium text-primary">
            {tagline}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
