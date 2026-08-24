import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-32">
      <p className="num text-[0.7rem] text-red">404</p>
      <h1 className="font-wide mt-4 max-w-[20ch] text-title font-semibold">
        Esta página no existe / This page does not exist
      </h1>
      <p className="measure mt-4 text-base text-ink-soft">
        Puede que la hayamos movido en la migración del sitio anterior.
        <br />
        We may have moved it during the migration from the old site.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Link
          href="/es/portafolio"
          className="plate bg-red px-6 py-4 text-white transition-colors hover:bg-red-deep"
        >
          Ver el portafolio
        </Link>
        <Link
          href="/es/contacto"
          className="plate border border-ink/30 px-6 py-4 transition-colors hover:border-ink hover:bg-white"
        >
          Contacto
        </Link>
      </div>
    </div>
  );
}
