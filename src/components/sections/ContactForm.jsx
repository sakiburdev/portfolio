"use client";

import { useState } from "react";
import { AlertCircle, ExternalLink, Send } from "lucide-react";
import cn from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_VALUES = { name: "", email: "", subject: "", message: "" };

const INPUT_CLASSES =
  "w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100 dark:placeholder-zinc-500";

const LABEL_CLASSES = "mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300";
const ERROR_CLASSES = "mt-1 text-xs text-red-600 dark:text-red-400";

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  }
  if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (values.subject.trim().length < 3) {
    errors.subject = "Please add a short subject (at least 3 characters).";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Please write a message of at least 10 characters.";
  }
  return errors;
}

function buildMailto(email, values) {
  const subject = `Portfolio inquiry: ${values.subject.trim()}`;
  const body = [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    "",
    values.message.trim(),
  ].join("\n");
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactForm({ email }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sent

  const handleChange = (field) => (event) => {
    const nextValues = { ...values, [field]: event.target.value };
    setValues(nextValues);
    if (status === "sent") setStatus("idle");
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        const revalidated = validate(nextValues);
        if (revalidated[field]) next[field] = revalidated[field];
        else delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      // Honest delivery path: open the visitor's mail client, prefilled.
      window.location.assign(buildMailto(email, values));
      setStatus("sent");
    }
  };

  const fieldProps = (field) => ({
    id: `contact-${field}`,
    name: field,
    value: values[field],
    onChange: handleChange(field),
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
    className: cn(INPUT_CLASSES, errors[field] && "border-red-400 focus:border-red-500 focus:ring-red-500/25 dark:border-red-500/60"),
  });

  return (
    <form onSubmit={handleSubmit} noValidate className="min-w-0 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-8">
      <p className="mb-6 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs leading-relaxed text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800/40 dark:text-zinc-400">
       If you wish, you can contact me using the method below.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={LABEL_CLASSES}>
            Name
          </label>
          <input type="text" autoComplete="name" placeholder="Your name" {...fieldProps("name")} />
          {errors.name ? (
            <p id="contact-name-error" role="alert" className={ERROR_CLASSES}>
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="contact-email" className={LABEL_CLASSES}>
            Email
          </label>
          <input type="email" autoComplete="email" placeholder="you@example.com" {...fieldProps("email")} />
          {errors.email ? (
            <p id="contact-email-error" role="alert" className={ERROR_CLASSES}>
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="contact-subject" className={LABEL_CLASSES}>
          Subject
        </label>
        <input type="text" placeholder="What is this about?" {...fieldProps("subject")} />
        {errors.subject ? (
          <p id="contact-subject-error" role="alert" className={ERROR_CLASSES}>
            {errors.subject}
          </p>
        ) : null}
      </div>

      <div className="mt-4">
        <label htmlFor="contact-message" className={LABEL_CLASSES}>
          Message
        </label>
        <textarea rows={5} maxLength={2000} placeholder="Tell me about your project or idea…" {...fieldProps("message")} />
        {errors.message ? (
          <p id="contact-message-error" role="alert" className={ERROR_CLASSES}>
            {errors.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-[0.99] dark:bg-amber-500 dark:text-zinc-950 dark:hover:bg-amber-400 dark:focus-visible:ring-offset-zinc-900"
      >
        <Send size={16} aria-hidden="true" />
        Send Message
      </button>

      {status === "sent" ? (
        <div
          role="status"
          className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-relaxed text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200"
        >
          <p className="flex items-start gap-2">
            <AlertCircle size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
            <span>
              Your details are valid and your email app should have opened with
              the message ready to send. If it did not open,{" "}
              <a
                href={buildMailto(email, values)}
                className="font-semibold underline underline-offset-2"
              >
                open it manually
              </a>
              . For automated in-site delivery, a backend or email provider
              (e.g. Resend, Formspree) still needs to be connected.
            </span>
          </p>
          <span className="mt-2 inline-flex items-center gap-1 text-xs opacity-80">
            <ExternalLink size={12} aria-hidden="true" />
            Uses your mail app — no data is stored by this website
          </span>
        </div>
      ) : null}
    </form>
  );
}
