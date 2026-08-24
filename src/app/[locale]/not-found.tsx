import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-[86rem] flex-col items-start px-5 py-28 sm:px-8">
      <span className="num tracking-label text-[0.62rem] text-red">404</span>
      <h1 className="font-wide mt-4 max-w-2xl text-title font-semibold">
        Esta página no existe / This page does not exist
      </h1>
      <p className="mt-4 max-w-xl text-base text-ink-soft">
        Puede que la hayamos movido en la migración del sitio anterior.
        <br />
        We may have moved it during the migration from the old site.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/es/portafolio"
          className="tracking-label bg-ink px-7 py-4 text-[0.7rem] text-white transition-colors hover:bg-red"
        >
          Ver el portafolio
        </Link>
        <Link
          href="/es/contacto"
          className="tracking-label border border-ink/25 px-7 py-4 text-[0.7rem] transition-colors hover:border-ink"
        >
          Contacto
        </Link>
      </div>
    </div>
  );
}
