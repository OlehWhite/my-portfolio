"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import { useLocale } from "@/components/locale/LocaleProvider";
import { getMessages, Messages } from "@/constants/messages";

type FormCopy = Messages["form"];

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const MAX_MESSAGE_LENGTH = 100;

type FormErrors = Partial<
  Record<"name" | "email" | "phone" | "message" | "file", string>
>;

function validateName(value: string, form: FormCopy): string | null {
  const trimmed = value.trim();
  if (!trimmed) return form.nameRequired;
  if (trimmed.length < 2) return form.nameShort;
  return null;
}

function validateEmail(value: string, form: FormCopy): string | null {
  const trimmed = value.trim();
  if (!trimmed) return form.emailRequired;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) return form.emailInvalid;
  return null;
}

function validatePhone(value: string, form: FormCopy): string | null {
  const trimmed = value.replace(/\s/g, "");
  if (!trimmed) return form.phoneRequired;
  const phoneRegex = /^[\d+\-()]{10,20}$/;
  if (!phoneRegex.test(trimmed)) return form.phoneInvalid;
  return null;
}

function validateMessage(value: string, form: FormCopy): string | null {
  if (value.length > MAX_MESSAGE_LENGTH) return form.messageLong;
  return null;
}

function validateFile(file: File | null, form: FormCopy): string | null {
  if (!file) return null;
  if (file.size > MAX_FILE_SIZE_BYTES) return form.fileLarge;
  return null;
}

export default function ContactForm() {
  const form = getMessages(useLocale()).form;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );

  const endpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;

  useEffect(() => {
    setErrors((prev) => {
      if (Object.keys(prev).length === 0) return prev;
      const next: FormErrors = {};
      if (prev.name) {
        const err = validateName(name, form);
        if (err) next.name = err;
      }
      if (prev.email) {
        const err = validateEmail(email, form);
        if (err) next.email = err;
      }
      if (prev.phone) {
        const err = validatePhone(phone, form);
        if (err) next.phone = err;
      }
      if (prev.message) {
        const err = validateMessage(message, form);
        if (err) next.message = err;
      }
      if (prev.file) {
        const err = validateFile(file, form);
        if (err) next.file = err;
      }
      return next;
    });
    setApiError(null);
  }, [form, name, email, phone, message, file]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    const newErrors: FormErrors = {};

    const nameErr = validateName(name, form);
    if (nameErr) newErrors.name = nameErr;

    const emailErr = validateEmail(email, form);
    if (emailErr) newErrors.email = emailErr;

    const phoneErr = validatePhone(phone, form);
    if (phoneErr) newErrors.phone = phoneErr;

    const messageErr = validateMessage(message, form);
    if (messageErr) newErrors.message = messageErr;

    const fileErr = validateFile(file, form);
    if (fileErr) newErrors.file = fileErr;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (!endpoint) {
      setStatus("error");
      setApiError(form.endpointMissing);
      return;
    }

    setStatus("sending");

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("email", email.trim());
      formData.append("phone", phone.replace(/\s/g, ""));
      if (message.trim()) formData.append("message", message.trim());
      if (file) formData.append("file", file);

      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        setApiError(null);
        setName("");
        setEmail("");
        setPhone("");
        setFile(null);
        setMessage("");
        setErrors({});
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        const msg = data.error || form.genericError;
        setApiError(
          msg.toLowerCase().includes("file upload")
            ? `${msg} ${form.fileUpload}`
            : msg,
        );
      }
    } catch {
      setStatus("error");
      setApiError(form.network);
    }
  };

  const inputBase =
    "w-full rounded-lg border bg-card text-ink placeholder:text-muted/70 px-4 py-3 text-base outline-none transition-colors focus:border-accent";

  const inputError = "border-red-600 focus:border-red-600";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label
          htmlFor="contact-name"
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          {form.name}
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`${inputBase} ${errors.name ? inputError : "border-line"}`}
          placeholder={form.namePlaceholder}
          autoComplete="name"
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-700">{errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          {form.email}
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${inputBase} ${errors.email ? inputError : "border-line"}`}
          placeholder={form.emailPlaceholder}
          autoComplete="email"
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-700">{errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-phone"
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          {form.phone}
        </label>
        <input
          id="contact-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={`${inputBase} ${errors.phone ? inputError : "border-line"}`}
          placeholder={form.phonePlaceholder}
          autoComplete="tel"
          aria-invalid={!!errors.phone}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-700">{errors.phone}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          {form.message}
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={MAX_MESSAGE_LENGTH}
          rows={4}
          className={`${inputBase} resize-none ${errors.message ? inputError : "border-line"}`}
          placeholder={form.messagePlaceholder}
          autoComplete="off"
          aria-invalid={!!errors.message}
        />
        {errors.message ? (
          <p className="mt-1 text-sm text-red-700">{errors.message}</p>
        ) : (
          <p className="mt-1 text-sm text-muted">
            {message.length}/{MAX_MESSAGE_LENGTH}
          </p>
        )}
      </div>

      {status === "success" && (
        <p className="rounded-lg border border-emerald-600/30 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {form.success}
        </p>
      )}
      {apiError && (
        <p className="rounded-lg border border-red-600/30 bg-red-50 px-4 py-3 text-sm text-red-800">
          {apiError}
        </p>
      )}
      {status === "error" &&
        !apiError &&
        !errors.name &&
        !errors.email &&
        !errors.phone &&
        !errors.message &&
        !errors.file && (
          <p className="text-sm text-red-700">{form.genericError}</p>
        )}

      <Button type="submit" disabled={status === "sending"} className="w-full">
        {status === "sending" ? form.sending : form.submit}
      </Button>
    </form>
  );
}
