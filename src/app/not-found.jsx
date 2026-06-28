import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-start justify-center px-5">
      <p className="text-sm font-medium text-accent-300">404</p>
      <h1 className="mt-3 text-3xl font-semibold">This page does not exist.</h1>
      <p className="mt-3 text-ink-300">
        The sheet is generated from JSON, so this route may not have a matching topic,
        pattern, or problem yet.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md border border-ink-700 px-4 py-2 text-sm font-medium hover:border-accent-400"
      >
        Back to sheet
      </Link>
    </section>
  );
}
