import Image from "next/image";
import { MacbookMockup } from "./MacbookMockup";
import { IphoneMockup } from "./IphoneMockup";

// Natural footprint of each mockup component, used to scale it to fit a slot
export const MACBOOK_SIZE = { width: 740, height: 432 };
export const IPHONE_SIZE = { width: 428, height: 868 };

export type Device = "laptop" | "phone";

export function naturalSize(device: Device) {
  return device === "phone" ? IPHONE_SIZE : MACBOOK_SIZE;
}

/** Fits a fixed-size mockup into an arbitrary slot without distorting it. */
export function ScaledMockup({
  width,
  height,
  natural,
  className,
  children,
  onMouseMove,
  onMouseLeave,
}: {
  width: number;
  height: number;
  natural: { width: number; height: number };
  className?: string;
  children: React.ReactNode;
  onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}) {
  const scale = Math.min(width / natural.width, height / natural.height);
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className ?? ""}`}
      style={{ width, height }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div style={{ width: natural.width, height: natural.height, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}

/**
 * A screenshot inside its device frame. The image reads the --shot-* custom
 * properties, so any ancestor can drive a parallax without this knowing about
 * it; unset, they resolve to an identity transform.
 */
export function DeviceMockup({
  device,
  src,
  alt,
  sizes = "800px",
  priority,
}: {
  device: Device;
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
}) {
  const screenshot = (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={90}
        priority={priority}
        className="object-cover will-change-transform transition-transform duration-[1200ms] ease-out motion-reduce:transition-none"
        style={{
          transform:
            "translate3d(var(--shot-x, 0px), var(--shot-y, 0px), 0) scale(var(--shot-s, 1))",
        }}
      />
    </div>
  );

  // Both mockups carry a `my-4` of their own, which pushes them off-centre
  // inside the slot and lets them overflow its bottom edge. Cancel it here so
  // the declared natural size is the whole footprint.
  if (device === "phone") {
    return (
      <div className="-my-4">
        <IphoneMockup>
          <div className="relative z-20 h-full w-full overflow-hidden rounded-[49px]">{screenshot}</div>
        </IphoneMockup>
      </div>
    );
  }

  return (
    <div className="-my-4">
      <MacbookMockup>
        <div className="relative h-[375px] w-full overflow-hidden rounded-t-[10px]">{screenshot}</div>
      </MacbookMockup>
    </div>
  );
}
