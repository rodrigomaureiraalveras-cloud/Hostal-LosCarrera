"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";
import { LOGIN } from "@/lib/content";
import { EASE } from "@/lib/motion";
import Field, { EMAIL_RE, FOCUS_RING, Spinner, wait } from "../ui/Field";
import { Check, OpdiMark } from "../ui/Icons";
import Modal from "../ui/Modal";

type Mode = "login" | "register";
type Status = "idle" | "sending" | "done";

export default function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduced = useReducedMotion() ?? false;
  const [mode, setMode] = useState<Mode>("login");
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  /* El formulario vuelve a cero 400 ms después de cerrar, cuando ya no se ve. */
  useEffect(() => {
    if (open) return;
    const timer = setTimeout(() => {
      setMode("login");
      setStatus("idle");
      setEmail("");
      setPassword("");
      setRemember(true);
      setErrors({});
    }, 400);
    return () => clearTimeout(timer);
  }, [open]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const next: typeof errors = {};
    if (!email.trim()) next.email = LOGIN.errors.emailEmpty;
    else if (!EMAIL_RE.test(email.trim())) next.email = LOGIN.errors.emailInvalid;
    if (!password) next.password = LOGIN.errors.passwordEmpty;
    else if (password.length < 8) next.password = LOGIN.errors.passwordShort;
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus("sending");
    await wait(900);
    setStatus("done");
  };

  const swap = { duration: reduced ? 0.001 : 0.5, ease: EASE };

  return (
    <Modal open={open} onClose={onClose} title={LOGIN.title} maxWidth="480px">
      <AnimatePresence mode="wait" initial={false}>
        {status === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={swap}
          >
            <span className="grid size-14 place-items-center rounded-full bg-white text-ink">
              <Check className="size-6" />
            </span>
            <h2 className="display-tight mt-6 text-[28px] text-white">{LOGIN.done[mode]}</h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-mist">{LOGIN.doneLine[mode](email.trim())}</p>
            <button
              type="button"
              onClick={onClose}
              className={`mt-8 flex h-14 w-full items-center justify-center rounded-full bg-white text-[15px] font-medium text-ink ${FOCUS_RING}`}
            >
              {LOGIN.back}
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
          >
            <OpdiMark className="size-7 text-sky" />
            <h2 className="display-tight mt-5 text-[28px] text-white">{LOGIN.heading[mode]}</h2>
            <p className="mt-2 text-[15px] leading-[1.7] text-mist">{LOGIN.lede[mode]}</p>

            <div className="mt-8 grid gap-5">
              <Field
                id="login-email"
                label={LOGIN.email}
                type="email"
                value={email}
                onChange={setEmail}
                error={errors.email}
                autoComplete="email"
                placeholder="nombre@correo.com"
              />
              <Field
                id="login-password"
                label={LOGIN.password}
                type="password"
                value={password}
                onChange={setPassword}
                error={errors.password}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
              />
            </div>

            {mode === "login" && (
              <div className="mt-5 flex items-center justify-between gap-4 text-[14px] text-mist">
                <label className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) => setRemember(event.target.checked)}
                    className="size-4 accent-sky"
                  />
                  {LOGIN.remember}
                </label>
                <button type="button" className={`underline-offset-4 hover:text-white hover:underline ${FOCUS_RING}`}>
                  {LOGIN.forgot}
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className={`mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-white text-[15px] font-medium text-ink disabled:opacity-80 ${FOCUS_RING}`}
            >
              {status === "sending" && <Spinner />}
              {status === "sending" ? LOGIN.sending : LOGIN.submit[mode]}
            </button>

            <p className="mt-6 text-center text-[14px] text-mist">
              {LOGIN.switchPrompt[mode]}{" "}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "login" ? "register" : "login");
                  setErrors({});
                }}
                className={`font-medium text-white underline-offset-4 hover:underline ${FOCUS_RING}`}
              >
                {LOGIN.switchAction[mode]}
              </button>
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </Modal>
  );
}
