"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { CONTACT, PRODUCTS } from "@/lib/content";
import { EASE } from "@/lib/motion";
import Field, { EMAIL_RE, FOCUS_RING, Spinner, wait } from "../ui/Field";
import { Check } from "../ui/Icons";
import { Eyebrow, Section, SectionTitle } from "../ui/Section";

type Status = "idle" | "sending" | "done";
type Errors = { name?: string; email?: string; message?: string };

export default function Contact() {
  const reduced = useReducedMotion() ?? false;
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState(PRODUCTS[0].id);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const chosen = PRODUCTS.find((item) => item.id === product);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const next: Errors = {};
    if (name.trim().length < 2) next.name = CONTACT.errors.name;
    if (!EMAIL_RE.test(email.trim())) next.email = CONTACT.errors.email;
    if (message.trim().length < 10) next.message = CONTACT.errors.message;
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus("sending");
    await wait(1000);
    setStatus("done");
  };

  const reset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setErrors({});
    setStatus("idle");
  };

  const swap = { duration: reduced ? 0.001 : 0.5, ease: EASE };

  return (
    <Section id="contact" className="border-t border-white/10">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Eyebrow index="06">{CONTACT.eyebrow}</Eyebrow>
          <SectionTitle lines={CONTACT.title} className="mt-7" />
          <p className="mt-6 max-w-[28rem] text-[16px] leading-[1.7] text-mist">{CONTACT.lede}</p>
          <dl className="mt-12 grid gap-8 sm:grid-cols-2">
            {CONTACT.details.map((item) => (
              <div key={item.term}>
                <dt className="text-[12px] uppercase tracking-[0.2em] text-white/40">{item.term}</dt>
                <dd className="mt-2 whitespace-pre-line text-[15px] leading-[1.6] text-mist">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-[40px] border border-white/10 bg-white/[0.03] p-7 sm:p-10 lg:col-span-7">
          <AnimatePresence mode="wait" initial={false}>
            {status === "done" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={swap}
                className="flex min-h-[420px] flex-col justify-center"
              >
                <span className="grid size-16 place-items-center rounded-full bg-white text-ink">
                  <Check className="size-7" />
                </span>
                <h3 className="display-tight mt-7 text-[clamp(1.6rem,3vw,2.2rem)] text-white">{CONTACT.doneTitle}</h3>
                <p className="mt-3 max-w-[30rem] text-[16px] leading-[1.7] text-mist">
                  {CONTACT.doneLine(name.trim().split(" ")[0], email.trim(), chosen?.name ?? CONTACT.fallbackProduct)}
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className={`mt-8 self-start rounded-full border border-white/30 px-6 py-3 text-[15px] text-white transition-colors duration-300 hover:border-white/70 ${FOCUS_RING}`}
                >
                  {CONTACT.again}
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                onSubmit={submit}
                initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={swap}
                className="grid gap-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field
                    id="contact-name"
                    label={CONTACT.fields.name}
                    value={name}
                    onChange={setName}
                    error={errors.name}
                    autoComplete="name"
                    placeholder={CONTACT.fields.namePlaceholder}
                  />
                  <Field
                    id="contact-email"
                    label={CONTACT.fields.email}
                    type="email"
                    value={email}
                    onChange={setEmail}
                    error={errors.email}
                    autoComplete="email"
                    placeholder={CONTACT.fields.emailPlaceholder}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-product"
                    className="mb-2 block text-[13px] uppercase tracking-[0.14em] text-white/45"
                  >
                    {CONTACT.fields.product}
                  </label>
                  <select
                    id="contact-product"
                    value={product}
                    onChange={(event) => setProduct(event.target.value)}
                    className="h-13 w-full rounded-2xl border border-white/15 bg-white/5 px-5 text-[15px] text-white outline-none transition-colors focus:border-white/60"
                  >
                    {PRODUCTS.map((item) => (
                      <option key={item.id} value={item.id} className="bg-panel">
                        {item.name} — {item.family} · {item.price}
                      </option>
                    ))}
                  </select>
                </div>
                <Field
                  id="contact-message"
                  label={CONTACT.fields.message}
                  value={message}
                  onChange={setMessage}
                  error={errors.message}
                  placeholder={CONTACT.fields.messagePlaceholder}
                  textarea
                />
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className={`flex h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-white px-8 text-[15px] font-medium text-ink disabled:opacity-80 ${FOCUS_RING}`}
                  >
                    {status === "sending" && <Spinner />}
                    {status === "sending" ? CONTACT.sending : CONTACT.submit}
                  </button>
                  <p className="max-w-[20rem] text-[13px] leading-[1.6] text-white/35">{CONTACT.note}</p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
