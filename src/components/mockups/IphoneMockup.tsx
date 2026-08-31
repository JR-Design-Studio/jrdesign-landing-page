// Adapted from https://cuicui.day/other/mock-ups (Smartphone mock-up, iPhone14 variant, inspired by Devices CSS)
// The original hardcodes its screenshot; this version takes a `src` prop instead.

export function IphoneMockup({
  className,
  children,
  src,
}: Readonly<{
  className?: string;
  children?: React.ReactNode;
  src?: string;
}>) {
  return (
    <div className={`relative z-10 my-4 h-[868px] w-[428px] ${className ?? ""}`}>
      <div className="relative z-30 h-[868px] w-[428px] rounded-[68px] border border-[#1B1721] bg-black p-[19px] shadow-[inset_0_0_4px_2px_rgb(192,183,205),inset_0_0_0_6px_rgb(52,44,63)]">
        <div className="absolute top-[85px] left-0 z-20 h-[7px] w-5 bg-black/25" />
        <div className="absolute top-[85px] right-0 z-20 h-[7px] w-5 bg-black/25" />
        <div className="absolute bottom-[85px] left-0 z-20 h-[7px] w-5 bg-black/25" />
        <div className="absolute right-0 bottom-[85px] z-20 h-[7px] w-5 bg-black/25" />
        <div className="absolute top-0 right-[85px] z-20 h-5 w-[7px] bg-black/25" />
        <div className="absolute bottom-0 left-[85px] z-20 h-5 w-[7px] bg-black/25" />
        {children || (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt="iPhone 14 Pro background"
            className="relative z-20 block h-full w-full rounded-[49px] bg-black bg-center bg-cover object-cover"
            src={src}
          />
        )}
      </div>

      <div className="absolute top-[115px] left-[-2px] h-[32px] w-[3px] rounded-[2px] bg-[#1B1721]" />
      <div className="absolute top-[200px] right-[-2px] h-[100px] w-[3px] rounded-[2px] bg-[#1B1721]" />
      <div className="absolute top-[180px] left-[-2px] h-[70px] w-[3px] rounded-[2px] bg-[#1B1721]" />
      <div className="absolute top-[270px] left-[-2px] h-[70px] w-[3px] rounded-[2px] bg-[#1B1721]" />
    </div>
  );
}

export default IphoneMockup;
