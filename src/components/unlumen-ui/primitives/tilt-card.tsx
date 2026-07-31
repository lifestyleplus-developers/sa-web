"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { ClippedCircle } from "@/components/unlumen-ui/primitives/clipped-circle";
import { Tilt, type TiltProps } from "@/components/unlumen-ui/primitives/tilt";

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  price?: string;
  badgeLabel?: string;
  badgeVariant?: "success" | "warning";
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
  children?: React.ReactNode;
  tiltProps?: Omit<TiltProps, "children" | "className">;
}

// BADGE_LABEL_CLASSES removed

export function TiltCard({
  title,
  description,
  price,
  badgeLabel,
  badgeVariant = "success",
  imageSrc,
  imageAlt = "",
  href,
  children,
  tiltProps,
  className,
  ...props
}: TiltCardProps) {
  const inner = (
    <Tilt
      rotationFactor={11}
      {...tiltProps}
      className={cn(
        "relative group overflow-hidden",
        "bg-white border border-gray-200 rounded-lg",
        "flex flex-col",
        "h-48 sm:h-56 w-full",
        "hover:bg-black hover:border-black transition-colors duration-300",
        "hover:shadow-lg hover:scale-105 transition-all duration-400 ease-out",
        className,
      )}
    >
      <div className="flex flex-col transition-all duration-200 items-start text-left pl-8 sm:pl-12 pr-4 sm:pr-6 pt-8 sm:pt-10 z-20 relative">
        <div className="flex flex-col items-start gap-1 w-full">
          <h2 className="text-lg tracking-tight leading-tight font-medium text-black group-hover:text-white transition-colors duration-300 line-clamp-1">
            {title}
          </h2>
          {description && (
            <p className="text-black/70 group-hover:text-white/70 transition-colors duration-300 text-xs sm:text-sm max-w-[95%] line-clamp-2">{description}</p>
          )}
          {children && <div className="mt-1 text-black group-hover:text-white transition-colors duration-300">{children}</div>}
        </div>
      </div>

      {imageSrc && (
        <div className="flex-1 w-full relative mt-3 sm:mt-4 flex items-end justify-center px-4 pb-0 z-10 overflow-hidden">
          <img
            src={imageSrc}
            alt={imageAlt}
            width={400}
            height={300}
            loading="lazy"
            decoding="async"
            className={cn(
              "w-full h-full object-cover object-top rounded-t-lg shadow-sm border border-b-0 border-gray-200",
              "transition-transform duration-300 ease-out",
              "group-hover:-translate-y-1 group-hover:scale-105 group-hover:border-white/20",
            )}
          />
        </div>
      )}

      <ClippedCircle circleClassName="bg-white/10 dark:bg-white/5" circleSize={800} />
    </Tilt>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block cursor-pointer"
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {inner}
      </a>
    );
  }

  return <div {...props}>{inner}</div>;
}
