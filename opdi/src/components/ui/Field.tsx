"use client";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const FOCUS_RING = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export function Spinner() {
  return <span className="size-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />;
}

export default function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  textarea = false,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  textarea?: boolean;
}) {
  const control = `w-full rounded-2xl border bg-white/5 px-5 text-[15px] text-white placeholder:text-white/25 outline-none transition-colors focus:border-white/60 ${
    error ? "border-red-300/60" : "border-white/15"
  }`;
  const shared = {
    id,
    name: id,
    value,
    placeholder,
    autoComplete,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${id}-error` : undefined,
  };

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[13px] uppercase tracking-[0.14em] text-white/45">
        {label}
      </label>
      {textarea ? (
        <textarea
          {...shared}
          rows={4}
          onChange={(event) => onChange(event.target.value)}
          className={`${control} resize-none py-4`}
        />
      ) : (
        <input
          {...shared}
          type={type}
          onChange={(event) => onChange(event.target.value)}
          className={`${control} h-13 py-4`}
        />
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-[13px] text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
