import { useState } from "react";
import { m } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  contactData,
  profileData,
  socialLinks,
} from "../data/portfolioData";

const EASE = [0.16, 1, 0.3, 1] as const;

const contactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

type SubmitStatus =
  | { state: "idle" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim();

const inputClasses =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-3.5 text-sm text-white placeholder-neutral-600 transition-colors duration-200 hover:border-white/20";

export default function Contact() {
  const [status, setStatus] = useState<SubmitStatus>({ state: "idle" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus({ state: "idle" });

    try {
      if (contactEndpoint) {
        const response = await fetch(contactEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        reset();
        setStatus({
          state: "success",
          message: contactData.form.successMessage,
        });
        return;
      }

      // No endpoint configured yet: hand the message to the visitor's email app.
      const subject = encodeURIComponent(
        `Portfolio enquiry from ${data.fullName}`,
      );
      const body = encodeURIComponent(
        `${data.message}\n\n— ${data.fullName}\n${data.email}`,
      );

      window.location.assign(
        `mailto:${profileData.email}?subject=${subject}&body=${body}`,
      );
      setStatus({
        state: "success",
        message: contactData.form.mailtoMessage,
      });
    } catch {
      setStatus({
        state: "error",
        message: contactData.form.errorMessage.replace(
          "{email}",
          profileData.email,
        ),
      });
    }
  };

  return (
    <section
      id="contact"
      className="relative border-t border-white/[0.06] py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-[90rem] px-6 sm:px-12 lg:px-16">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-14 flex items-center gap-4 border-b border-white/[0.08] pb-4 md:mb-20"
        >
          <span className="h-px w-8 bg-neutral-700" aria-hidden="true" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Get in Touch
          </span>
          <span
            className="ml-auto font-mono text-[10px] tracking-[0.2em] text-neutral-600"
            aria-hidden="true"
          >
            (05)
          </span>
        </m.div>

        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          {/* Left: CTA */}
          <div>
            <h2 className="mb-6 font-display text-4xl font-bold leading-none tracking-tighter text-white md:text-5xl lg:text-6xl">
              {contactData.headline}
            </h2>
            <p className="max-w-md text-base leading-relaxed text-neutral-400">
              {contactData.subtext}
            </p>

            <div className="mt-10 space-y-3">
              <a
                href={`mailto:${profileData.email}`}
                className="group flex w-fit items-center gap-3 text-sm text-neutral-400 transition-colors duration-200 hover:text-white"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-neutral-500 transition-colors duration-200 group-hover:border-white/25 group-hover:text-white">
                  <Mail size={16} aria-hidden="true" />
                </span>
                {profileData.email}
              </a>

              <div className="flex items-center gap-3 text-sm text-neutral-400">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-neutral-500">
                  <MapPin size={16} aria-hidden="true" />
                </span>
                {profileData.location}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 transition-colors duration-200 hover:text-white"
                >
                  {link.platform}
                  <ArrowUpRight
                    size={12}
                    className="-translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <m.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            viewport={{ once: true }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-500 ease-out hover:border-white/[0.15] hover:bg-white/[0.06] md:p-8"
            noValidate
          >
            {/* Name */}
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500"
              >
                {contactData.form.nameLabel}
              </label>
              <input
                id="fullName"
                type="text"
                placeholder={contactData.form.namePlaceholder}
                autoComplete="name"
                aria-invalid={errors.fullName ? "true" : "false"}
                aria-describedby={
                  errors.fullName ? "fullName-error" : undefined
                }
                {...register("fullName")}
                className={inputClasses}
              />
              {errors.fullName && (
                <p id="fullName-error" className="mt-1.5 text-xs text-red-400">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500"
              >
                {contactData.form.emailLabel}
              </label>
              <input
                id="email"
                type="email"
                placeholder={contactData.form.emailPlaceholder}
                autoComplete="email"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
                className={inputClasses}
              />
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-xs text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500"
              >
                {contactData.form.messageLabel}
              </label>
              <textarea
                id="message"
                placeholder={contactData.form.messagePlaceholder}
                rows={5}
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={
                  errors.message ? "message-error" : undefined
                }
                {...register("message")}
                className={`${inputClasses} resize-none`}
              />
              {errors.message && (
                <p id="message-error" className="mt-1.5 text-xs text-red-400">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium tracking-wide text-black transition-all duration-300 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
              {isSubmitting
                ? contactData.form.sendingLabel
                : contactData.form.submitLabel}
            </button>

            {/* Inline status */}
            {status.state !== "idle" && (
              <div
                role="status"
                aria-live="polite"
                className={`flex items-start gap-2.5 rounded-xl border px-4 py-3 text-xs leading-relaxed ${
                  status.state === "success"
                    ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-300"
                    : "border-red-500/30 bg-red-500/5 text-red-300"
                }`}
              >
                {status.state === "success" ? (
                  <CheckCircle2
                    size={15}
                    className="mt-px flex-shrink-0"
                    aria-hidden="true"
                  />
                ) : (
                  <AlertCircle
                    size={15}
                    className="mt-px flex-shrink-0"
                    aria-hidden="true"
                  />
                )}
                <span>{status.message}</span>
              </div>
            )}
          </m.form>
        </div>
      </div>
    </section>
  );
}
