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
        "rounded-lg",
        "h-48 sm:h-56 w-full",
        "hover:shadow-lg hover:scale-105 transition-all duration-400 ease-out",
        className,
      )}
    >
      <div className="absolute inset-0 bg-black group-hover:bg-white transition-colors duration-500 z-0" />

      <div className="relative z-10 flex flex-row w-full h-full">
        <div className="w-[55%] sm:w-[60%] h-full flex flex-col items-center justify-center text-center px-6 sm:px-8">
          <h2 className="text-xl tracking-tight leading-tight font-bold text-white group-hover:text-black transition-colors duration-500 line-clamp-1">
            {title}
          </h2>
          {description && (
            <p className="mt-2 text-white/70 group-hover:text-black/70 transition-colors duration-500 text-xs sm:text-sm max-w-[95%] line-clamp-3">
              {description}
            </p>
          )}
          {children && <div className="mt-2 text-white group-hover:text-black transition-colors duration-500">{children}</div>}
        </div>

        <div className="w-[45%] sm:w-[40%] h-full relative flex items-center justify-center py-3 pr-3">
          {imageSrc && (
            <img
              src={imageSrc}
              alt={imageAlt}
              width={400}
              height={300}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover rounded-md transition-transform duration-500 ease-out group-hover:scale-105"
              style={{
                WebkitMaskImage: "linear-gradient(to right, transparent, black 40%)",
                maskImage: "linear-gradient(to right, transparent, black 40%)",
              }}
            />
          )}
        </div>
      </div>
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
