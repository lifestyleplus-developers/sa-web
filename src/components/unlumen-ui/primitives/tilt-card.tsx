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

const BADGE_LABEL_CLASSES: Record<
  NonNullable<TiltCardProps["badgeVariant"]>,
  string
> = {
  success: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  warning: "bg-amber-500/20 text-amber-700 dark:text-amber-300",
};

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
        "flex flex-col gap-2",
        "h-32 sm:h-36 md:h-40 w-full",
        "hover:bg-black hover:border-black transition-colors duration-300",
        "hover:shadow-lg hover:scale-105 transition-all duration-400 ease-out",
        className,
      )}
    >
      <div className="flex flex-col transition-all duration-200 items-center justify-center text-center px-4 sm:px-6 py-2 sm:py-3 h-full z-20 relative">
        <div className="flex flex-col items-center justify-center gap-1 flex-1">
          <h2 className="text-base md:text-lg tracking-tight leading-tight font-medium text-black group-hover:text-white transition-colors duration-300">
            {title}
          </h2>
          {description && (
            <p className="text-black/70 group-hover:text-white/70 transition-colors duration-300 text-xs md:text-sm max-w-sm">{description}</p>
          )}
          {children && <div className="mt-1 text-black group-hover:text-white transition-colors duration-300">{children}</div>}
        </div>
        {price && badgeLabel ? (
          <div className="mt-2 inline-flex h-fit items-center text-xs whitespace-nowrap shrink-0 z-20 relative">
            <span className="rounded-l-full bg-gray-100 group-hover:bg-gray-800 text-black group-hover:text-white transition-colors duration-300 h-fit py-1 px-2 font-medium">
              {price}
            </span>
            <span
              className={cn(
                "rounded-r-full h-fit py-1 px-2 font-medium transition-colors duration-300",
                BADGE_LABEL_CLASSES[badgeVariant],
              )}
            >
              {badgeLabel}
            </span>
          </div>
        ) : price ? (
          <span className="mt-2 h-fit rounded-full bg-gray-100 group-hover:bg-gray-800 text-black group-hover:text-white transition-colors duration-300 px-3 py-1 text-xs font-medium whitespace-nowrap shrink-0 z-20 relative">
            {price}
          </span>
        ) : null}
      </div>

      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAlt}
          width={180}
          height={140}
          loading="lazy"
          decoding="async"
          className={cn(
            "absolute z-10 -bottom-4 -right-4 w-40 object-cover",
            "rotate-[-5deg] border-gray-200 border rounded-md shadow-sm",
            "transition-transform duration-300 ease-out opacity-20 group-hover:opacity-10",
            "group-hover:-rotate-3 group-hover:-translate-y-1 group-hover:-translate-x-0.5",
          )}
        />
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
