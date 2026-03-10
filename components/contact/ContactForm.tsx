"use client";

import React, { useState } from "react";

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const MAX_MESSAGE_LENGTH = 100;
const ACCEPTED_FILE_TYPES =
  ".pdf,.doc,.docx,image/jpeg,image/png,image/webp";

type FormErrors = Partial<Record<"name" | "email" | "phone" | "message" | "file", string>>;

function validateName(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Name is required";
  if (trimmed.length < 2) return "At least 2 characters";
  return null;
}

function validateEmail(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) return "Enter a valid email";
  return null;
}

function validatePhone(value: string): string | null {
  const trimmed = value.replace(/\s/g, "");
  if (!trimmed) return "Phone is required";
  const phoneRegex = /^[\d+\-()]{10,20}$/;
  if (!phoneRegex.test(trimmed)) return "Enter a valid phone number (10–20 digits)";
  return null;
}

function validateMessage(value: string): string | null {
  if (value.length > MAX_MESSAGE_LENGTH) {
    return `Max ${MAX_MESSAGE_LENGTH} characters`;
  }
  return null;
}

function validateFile(file: File | null): string | null {
  if (!file) return null;
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `Max file size is ${MAX_FILE_SIZE_MB}MB`;
  }
  return null;
}

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const endpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    const newErrors: FormErrors = {};

    const nameErr = validateName(name);
    if (nameErr) newErrors.name = nameErr;

    const emailErr = validateEmail(email);
    if (emailErr) newErrors.email = emailErr;

    const phoneErr = validatePhone(phone);
    if (phoneErr) newErrors.phone = phoneErr;

    const messageErr = validateMessage(message);
    if (messageErr) newErrors.message = messageErr;

    const fileErr = validateFile(file);
    if (fileErr) newErrors.file = fileErr;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (!endpoint) {
      setStatus("error");
      setApiError("Form endpoint not configured. Add NEXT_PUBLIC_CONTACT_FORM_ENDPOINT.");
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
        const msg = data.error || "Something went wrong. Try again.";
        setApiError(
          msg.toLowerCase().includes("file upload")
            ? `${msg} Remove the file and try again, or use a Formspree plan that allows file uploads.`
            : msg
        );
      }
    } catch {
      setStatus("error");
      setApiError("Network error. Try again later.");
    }
  };

  const inputBase =
    "w-full rounded-xl border-2 bg-dark/80 text-light placeholder:text-secondary/70 px-4 py-3 text-base outline-none transition-colors focus:border-primary";

  const inputError = "border-red-500/70 focus:border-red-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 box-border">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-secondary mb-1.5">
          Name *
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`${inputBase} ${errors.name ? inputError : "border-secondary/40"} box-border`}
          placeholder="Your name"
          autoComplete="name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-secondary mb-1.5">
          Email *
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${inputBase} ${errors.email ? inputError : "border-secondary/40"} box-border`}
          placeholder="your@email.com"
          autoComplete="email"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-phone" className="block text-sm font-medium text-secondary mb-1.5">
          Phone *
        </label>
        <input
          id="contact-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={`${inputBase} ${errors.phone ? inputError : "border-secondary/40"} box-border`}
          placeholder="+1 234 567 8900"
          autoComplete="tel"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-secondary mb-1.5">
          Message (max {MAX_MESSAGE_LENGTH} characters)
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={MAX_MESSAGE_LENGTH}
          rows={3}
          className={`${inputBase} resize-none box-border ${errors.message ? inputError : "border-secondary/40"}`}
          placeholder="Brief description of your project or question..."
          autoComplete="off"
        />
        {errors.message ? (
          <p className="mt-1 text-sm text-red-400">{errors.message}</p>
        ) : (
          <p className="mt-1 text-sm text-secondary">{message.length}/{MAX_MESSAGE_LENGTH}</p>
        )}
      </div>

      {/* <div>
        <label htmlFor="contact-file" className="block text-sm font-medium text-secondary mb-1.5">
          File (optional, max {MAX_FILE_SIZE_MB}MB)
        </label>
        <input
          id="contact-file"
          type="file"
          accept={ACCEPTED_FILE_TYPES}
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className={`${inputBase} py-2 file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-light file:text-sm ${errors.file ? inputError : "border-secondary/40"}`}
        />
        {file && (
          <p className="mt-1 text-sm text-secondary">
            {file.name} ({(file.size / 1024).toFixed(1)} KB)
          </p>
        )}
        {errors.file && (
          <p className="mt-1 text-sm text-red-400">{errors.file}</p>
        )}
      </div> */}

      {status === "success" && (
        <p className="rounded-xl bg-primary/20 border border-primary/50 text-primary px-4 py-3 text-sm">
          Message sent. I’ll get back to you soon.
        </p>
      )}
      {apiError && (
        <p className="rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 text-sm">
          {apiError}
        </p>
      )}
      {status === "error" && !apiError && !errors.name && !errors.email && !errors.phone && !errors.message && !errors.file && (
        <p className="text-sm text-red-400">Something went wrong. Try again.</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-xl border-2 border-primary bg-primary px-4 py-3 text-base font-medium text-light shadow-lg shadow-primary/25 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
