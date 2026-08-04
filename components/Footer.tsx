"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { useTheme } from "nextra-theme-docs";
import Success from "./success";

const productLinks = [
  { label: "Documentation", href: "https://docs.useknit.io", external: true },
  { label: "Dashboard", href: "https://dashboard.useknit.io", external: true },
];

const resourceLinks = [
  { label: "Quickstart", href: "/quickstart" },
  { label: "Authentication", href: "/authentication" },
  { label: "Webhooks", href: "/webhooks" },
  { label: "Requests & responses", href: "/conventions" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/knit-labs/",
    external: true,
  },
];

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--knit-fg-faint)]">
        {heading}
      </h3>
      <div className="space-y-2.5">
        {links.map((link) => (
          <Link
            key={link.label}
            className="block text-sm font-medium"
            href={link.href}
            {...(link.external
              ? { target: "_blank", rel: "noreferrer noopener" }
              : {})}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const { resolvedTheme } = useTheme();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setStatus("");
    try {
      await axios.post("/api/send-email/", {
        subject: "From website: Subscription",
        from: email,
        text: `Subscription. Email: ${email}`,
        html: `<p> Subscription. Email: ${email}</p>`,
      });
      setSuccess(true);
      setEmail("");
    } catch (error) {
      console.error("Error:", error);
      setStatus("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="knit-footer px-4 py-4 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl py-10">
          <div className="grid grid-cols-2 items-start gap-6 sm:grid-cols-3 md:grid-cols-4">
            <FooterColumn heading="Product" links={productLinks} />
            <FooterColumn heading="Resources" links={resourceLinks} />
            <FooterColumn heading="Social" links={socialLinks} />

            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--knit-fg-faint)]">
                Contact
              </h3>
              <div className="space-y-2.5 text-sm text-[var(--knit-fg-subtle)]">
                <p className="font-medium">business@useknit.io</p>
                <p className="leading-relaxed">
                  Knit Business Financial Services Ltd.
                  <br />
                  3080 Yonge St
                  <br />
                  Toronto ON, M4N 3N1, Canada
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 block items-center justify-between border-y border-[var(--knit-border)] py-6 md:flex">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--knit-fg)]">
                Subscribe to our newsletter
              </h3>
              <p className="mt-1 text-sm text-[var(--knit-fg-subtle)]">
                A monthly digest of the latest news, articles, and resources.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="mt-6 grid items-center gap-2 md:mt-0 md:flex md:items-start"
            >
              <div>
                <label className="sr-only" htmlFor="knit-newsletter-email">
                  Email address
                </label>
                <input
                  id="knit-newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email address"
                  className="h-12 w-full rounded-xl border border-[var(--knit-border-strong)] bg-[var(--knit-bg)] px-4 text-sm text-[var(--knit-fg)] outline-none transition-colors placeholder:text-[var(--knit-fg-faint)] focus:border-[#4C38CB] focus:ring-1 focus:ring-[#4C38CB] md:w-80"
                />
                {status && (
                  <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                    {status}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="mx-auto flex h-12 w-full items-center justify-center rounded-xl border border-[#4C38CB] bg-[#4C38CB] px-7 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60 md:w-fit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <HashLoader
                    color="#fff"
                    loading
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
            <div className="relative h-8 w-16">
              <Image
                src={resolvedTheme === "dark" ? "/knit-white.svg" : "/knit.svg"}
                alt="Knit"
                fill
                className="object-contain"
              />
            </div>

            <p className="max-w-lg text-center text-xs leading-relaxed text-[var(--knit-fg-faint)] md:text-right">
              © KNIT BUSINESS FINANCIAL SERVICES LIMITED is duly registered by
              the Financial Transactions and Reports Analysis Centre of Canada
              (FINTRAC) as a Money Service Business (C100000256)
            </p>
          </div>
        </div>
      </div>

      {success && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setSuccess(false)}
        >
          <Success
            setShowModal={setSuccess}
            heading="You're subscribed!"
            desc="Thanks for joining our community! Keep an eye on your inbox for the latest news and updates"
          />
        </div>
      )}
    </>
  );
}
